import { readFile } from 'node:fs/promises';

import { buildDefaultEditorState } from '@payloadcms/richtext-lexical';
import { getPayload } from 'payload';

import config from '../src/payload.config';

type SymposiumDraftFile = {
  kind: 'payload-draft';
  collection: 'simposios';
  approved_for_import: boolean;
  notes: string[];
  data: {
    titulo: string;
    slug: string;
    numero_edicion: number;
    anio: number;
    fecha_inicio: string;
    fecha_fin: string;
    sede: {
      institucion_organizadora: { es: string } | string;
      ciudad: string;
      pais: string;
      direccion?: string;
    };
    resumen_plaintext: string;
    temario: Array<{
      titulo: { es: string } | string;
      descripcion: { es: string } | string;
    }>;
    sitio_externo?: string;
    videos?: Array<{
      titulo: { es: string } | string;
      url_youtube: string;
      descripcion?: { es: string } | string;
    }>;
    declaracion_final_slug_referencia?: string;
    estado: 'borrador';
    fuente: 'humano';
    traduccion_estado: 'pendiente';
    requiere_revision_autor: boolean;
  };
};

type DeclarationDraftFile = {
  kind: 'payload-draft';
  collection: 'declaraciones';
  approved_for_import: boolean;
  notes: string[];
  data: {
    titulo: string;
    slug: string;
    fecha: string;
    simposio_origen_slug_referencia: string;
    texto_completo_resumen: string;
    texto_completo_puntos: string[];
    pdf_url: string;
    estado: 'borrador';
    fuente: 'humano';
    traduccion_estado: 'pendiente';
    requiere_revision_autor: boolean;
  };
};

function hasFlag(flag: string): boolean {
  return process.argv.includes(flag);
}

function getLocaleText(value: { es: string } | string | undefined): string | undefined {
  if (!value) return undefined;
  return typeof value === 'string' ? value : value.es;
}

function toLexical(textBlocks: string[]): ReturnType<typeof buildDefaultEditorState> {
  return buildDefaultEditorState({
    text: textBlocks.filter(Boolean).join('\n\n'),
  });
}

async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw) as T;
}

async function main() {
  const write = hasFlag('--write');
  const allowProposed = hasFlag('--allow-proposed');

  const symposiumDraftPath = 'C:\\Users\\Emanuel\\Projects\\ivujus-web\\docs\\proposed-seeds\\simposio-2026-payload-draft.json';
  const declarationDraftPath = 'C:\\Users\\Emanuel\\Projects\\ivujus-web\\docs\\proposed-seeds\\declaracion-buenos-aires-payload-draft.json';

  const symposiumDraft = await readJsonFile<SymposiumDraftFile>(symposiumDraftPath);
  const declarationDraft = await readJsonFile<DeclarationDraftFile>(declarationDraftPath);

  if (write && (!symposiumDraft.approved_for_import || !declarationDraft.approved_for_import) && !allowProposed) {
    throw new Error(
      'Los drafts no estan aprobados para import. Usar --allow-proposed solo si queres forzar una importacion controlada desde proposed seeds.',
    );
  }

  const symposiumData = {
    titulo: symposiumDraft.data.titulo,
    slug: symposiumDraft.data.slug,
    numero_edicion: symposiumDraft.data.numero_edicion,
    anio: symposiumDraft.data.anio,
    fecha_inicio: symposiumDraft.data.fecha_inicio,
    fecha_fin: symposiumDraft.data.fecha_fin,
    sede: {
      institucion_organizadora: getLocaleText(symposiumDraft.data.sede.institucion_organizadora),
      ciudad: symposiumDraft.data.sede.ciudad,
      pais: symposiumDraft.data.sede.pais,
      direccion: symposiumDraft.data.sede.direccion || '',
    },
    resumen: toLexical([symposiumDraft.data.resumen_plaintext]),
    temario: symposiumDraft.data.temario.map((item) => ({
      titulo: getLocaleText(item.titulo),
      descripcion: getLocaleText(item.descripcion),
    })),
    videos:
      symposiumDraft.data.videos?.map((video) => ({
        titulo: getLocaleText(video.titulo),
        url_youtube: video.url_youtube,
        descripcion: getLocaleText(video.descripcion) || '',
      })) || [],
    sitio_externo: symposiumDraft.data.sitio_externo || '',
    estado: symposiumDraft.data.estado,
    fuente: symposiumDraft.data.fuente,
    traduccion_estado: symposiumDraft.data.traduccion_estado,
    requiere_revision_autor: symposiumDraft.data.requiere_revision_autor,
  };

  const declarationTextBlocks = [
    declarationDraft.data.texto_completo_resumen,
    ...declarationDraft.data.texto_completo_puntos,
  ];

  const declarationData = {
    titulo: declarationDraft.data.titulo,
    slug: declarationDraft.data.slug,
    fecha: declarationDraft.data.fecha,
    texto_completo: toLexical(declarationTextBlocks),
    estado: declarationDraft.data.estado,
    fuente: declarationDraft.data.fuente,
    traduccion_estado: declarationDraft.data.traduccion_estado,
    requiere_revision_autor: declarationDraft.data.requiere_revision_autor,
  };

  console.log('[import-simposio-2026] modo:', write ? 'write' : 'dry-run');
  console.log('[import-simposio-2026] simposio draft:', symposiumDraftPath);
  console.log('[import-simposio-2026] declaracion draft:', declarationDraftPath);
  console.log('[import-simposio-2026] nota: este importador no crea uploads ni relaciones complejas de autores/instituciones.');

  if (!write) {
    console.log('\n--- Simposio payload draft ---');
    console.log(JSON.stringify(symposiumData, null, 2));
    console.log('\n--- Declaracion payload draft ---');
    console.log(JSON.stringify(declarationData, null, 2));
    console.log('\n[import-simposio-2026] dry-run completado. Para escribir en Payload usar --write --allow-proposed');
    return;
  }

  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    throw new Error('Faltan DATABASE_URI o PAYLOAD_SECRET en el entorno.');
  }

  const payload = await getPayload({ config });

  const existingSymposium = await payload.find({
    collection: 'simposios',
    where: { slug: { equals: symposiumDraft.data.slug } },
    limit: 1,
    depth: 0,
  });

  const symposiumDoc = existingSymposium.docs[0]
    ? await payload.update({
        collection: 'simposios',
        id: existingSymposium.docs[0].id,
        data: symposiumData,
        context: { disableRevalidate: true },
      })
    : await payload.create({
        collection: 'simposios',
        data: symposiumData,
        context: { disableRevalidate: true },
      });

  const existingDeclaration = await payload.find({
    collection: 'declaraciones',
    where: { slug: { equals: declarationDraft.data.slug } },
    limit: 1,
    depth: 0,
  });

  const declarationDoc = existingDeclaration.docs[0]
    ? await payload.update({
        collection: 'declaraciones',
        id: existingDeclaration.docs[0].id,
        data: {
          ...declarationData,
          simposio_origen: symposiumDoc.id,
        },
        context: { disableRevalidate: true },
      })
    : await payload.create({
        collection: 'declaraciones',
        data: {
          ...declarationData,
          simposio_origen: symposiumDoc.id,
        },
        context: { disableRevalidate: true },
      });

  await payload.update({
    collection: 'simposios',
    id: symposiumDoc.id,
    data: {
      declaracion_final: declarationDoc.id,
    },
    context: { disableRevalidate: true },
  });

  console.log(`\n[import-simposio-2026] simposio upserted: ${symposiumDoc.id}`);
  console.log(`[import-simposio-2026] declaracion upserted: ${declarationDoc.id}`);
  console.log('[import-simposio-2026] importacion controlada completada.');
}

main().catch((error) => {
  console.error('[import-simposio-2026] error:', error);
  process.exit(1);
});
