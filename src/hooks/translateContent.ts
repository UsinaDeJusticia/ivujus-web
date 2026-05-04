import { after } from 'next/server';
import type { CollectionAfterChangeHook, Field } from 'payload';

import { MissingApiKeyError, translateBatchEsToEn } from '../lib/translate';

const SOURCE_LOCALE = 'es';
const TARGET_LOCALE = 'en';

type TextLeafType = 'text' | 'textarea' | 'richText';

interface LocalizedLeaf {
  path: string[];
  type: TextLeafType;
  value: unknown;
}

// Recorre el árbol de fields + data en paralelo y junta los leaves localizados
// de tipos textuales. Soporta top-level y group; arrays/blocks quedan diferidos
// (ver docs/CLAUDE.md, sección "Fase 3: traducción automática").
function findLocalizedLeaves(
  fields: Field[] | undefined,
  data: Record<string, unknown> | null | undefined,
  parentPath: string[] = [],
): LocalizedLeaf[] {
  if (!fields || !data) return [];
  const out: LocalizedLeaf[] = [];
  for (const f of fields) {
    if (!('name' in f) || typeof f.name !== 'string') continue;
    const path = [...parentPath, f.name];
    const value = data[f.name];
    const isTextType =
      f.type === 'text' || f.type === 'textarea' || f.type === 'richText';
    if ('localized' in f && f.localized && isTextType) {
      if (value !== undefined && value !== null && value !== '') {
        out.push({ path, type: f.type as TextLeafType, value });
      }
    } else if (
      f.type === 'group' &&
      'fields' in f &&
      Array.isArray(f.fields) &&
      value &&
      typeof value === 'object'
    ) {
      out.push(
        ...findLocalizedLeaves(
          f.fields as Field[],
          value as Record<string, unknown>,
          path,
        ),
      );
    }
  }
  return out;
}

function setAt(
  target: Record<string, unknown>,
  path: string[],
  value: unknown,
): void {
  let cur: Record<string, unknown> = target;
  for (let i = 0; i < path.length - 1; i++) {
    const k = path[i];
    const next = cur[k];
    if (typeof next !== 'object' || next === null || Array.isArray(next)) {
      const fresh: Record<string, unknown> = {};
      cur[k] = fresh;
      cur = fresh;
    } else {
      cur = next as Record<string, unknown>;
    }
  }
  cur[path[path.length - 1]] = value;
}

// Lexical text-node helpers: recolectar y reaplicar texto preservando la estructura.
function collectTextNodes(node: unknown, out: string[] = []): string[] {
  if (!node || typeof node !== 'object') return out;
  if (Array.isArray(node)) {
    node.forEach((n) => collectTextNodes(n, out));
    return out;
  }
  const obj = node as Record<string, unknown>;
  if (obj.type === 'text' && typeof obj.text === 'string') {
    out.push(obj.text);
    return out;
  }
  for (const k of Object.keys(obj)) {
    collectTextNodes(obj[k], out);
  }
  return out;
}

function applyTextNodes(
  node: unknown,
  translations: string[],
  cursor: { i: number },
): unknown {
  if (!node || typeof node !== 'object') return node;
  if (Array.isArray(node)) {
    return node.map((n) => applyTextNodes(n, translations, cursor));
  }
  const obj = node as Record<string, unknown>;
  if (obj.type === 'text' && typeof obj.text === 'string') {
    const tr = translations[cursor.i++];
    return { ...obj, text: tr ?? obj.text };
  }
  const result: Record<string, unknown> = {};
  for (const k of Object.keys(obj)) {
    result[k] = applyTextNodes(obj[k], translations, cursor);
  }
  return result;
}

export const translateContent: CollectionAfterChangeHook = async (args) => {
  const { doc, previousDoc, collection, req, operation } = args;

  // 1. Loop guard: si el update vino del propio traductor, salir.
  if (req?.context?.skipTranslation) return doc;

  // 2. Solo procesar saves cuyo locale base sea ES (o sin locale → defaultLocale).
  if (req?.locale && req.locale !== SOURCE_LOCALE) return doc;

  const docId = (doc as { id?: string | number } | undefined)?.id;
  if (docId === undefined || docId === null) return doc;

  // 3. Gating editorial: contenido firmado que requiere revisión del autor
  // no se traduce automáticamente; queda en pendiente para flujo manual.
  if ((doc as { requiere_revision_autor?: boolean })?.requiere_revision_autor === true) {
    if ((doc as { traduccion_estado?: string })?.traduccion_estado !== 'pendiente') {
      try {
        await req.payload.update({
          collection: collection.slug,
          id: docId,
          data: { traduccion_estado: 'pendiente' },
          context: { skipTranslation: true },
          overrideAccess: true,
        });
      } catch (err) {
        console.warn('[translateContent] no se pudo marcar pendiente:', err);
      }
    }
    return doc;
  }

  // 4. Detectar cambios en campos localizados ES.
  const currentLeaves = findLocalizedLeaves(
    collection.fields as Field[],
    doc as Record<string, unknown>,
  );
  if (currentLeaves.length === 0) return doc;

  const prevLeaves =
    operation === 'update'
      ? findLocalizedLeaves(
          collection.fields as Field[],
          previousDoc as Record<string, unknown>,
        )
      : [];
  const prevByPath = new Map(
    prevLeaves.map((l) => [l.path.join('.'), JSON.stringify(l.value)]),
  );

  const changedLeaves = currentLeaves.filter((l) => {
    const prev = prevByPath.get(l.path.join('.'));
    return prev !== JSON.stringify(l.value);
  });

  if (changedLeaves.length === 0) return doc;

  // 5. Despachar trabajo a after() para no bloquear la respuesta del admin.
  // Si no hay contexto App Router (seeds, scripts), el catch silencia y se
  // espera que el caller haya pasado context.skipTranslation.
  try {
    after(async () => {
      const collectionSlug = collection.slug;
      try {
        const strings: string[] = [];
        const slices: { leaf: LocalizedLeaf; start: number; len: number }[] = [];
        for (const leaf of changedLeaves) {
          const start = strings.length;
          if (leaf.type === 'richText') {
            const nodes = collectTextNodes(leaf.value);
            strings.push(...nodes);
            slices.push({ leaf, start, len: nodes.length });
          } else {
            const v = typeof leaf.value === 'string' ? leaf.value : '';
            strings.push(v);
            slices.push({ leaf, start, len: 1 });
          }
        }

        if (strings.length === 0) return;

        const translations = await translateBatchEsToEn(strings);

        const enData: Record<string, unknown> = {};
        for (const { leaf, start, len } of slices) {
          const sliceTr = translations.slice(start, start + len);
          if (leaf.type === 'richText') {
            const cursor = { i: 0 };
            setAt(enData, leaf.path, applyTextNodes(leaf.value, sliceTr, cursor));
          } else {
            setAt(enData, leaf.path, sliceTr[0] ?? '');
          }
        }
        enData.traduccion_estado = 'automatica';

        await req.payload.update({
          collection: collectionSlug,
          id: docId,
          locale: TARGET_LOCALE,
          data: enData,
          context: { skipTranslation: true },
          overrideAccess: true,
        });
      } catch (err) {
        if (err instanceof MissingApiKeyError) {
          console.warn(`[translateContent] ${err.message}`);
        } else {
          console.warn('[translateContent] error en traducción async:', err);
        }
        try {
          await req.payload.update({
            collection: collectionSlug,
            id: docId,
            data: { traduccion_estado: 'pendiente' },
            context: { skipTranslation: true },
            overrideAccess: true,
          });
        } catch (e) {
          console.warn('[translateContent] no se pudo marcar pendiente tras fallo:', e);
        }
      }
    });
  } catch (err) {
    // after() falla fuera de App Router (seeds, scripts). En ese caso saltamos
    // la traducción automática; el caller debería pasar skipTranslation: true
    // para hacerlo explícito.
    console.warn(
      '[translateContent] after() no disponible; salteo traducción:',
      err instanceof Error ? err.message : err,
    );
  }

  return doc;
};
