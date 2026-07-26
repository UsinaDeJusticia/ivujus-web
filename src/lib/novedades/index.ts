// Punto de entrada de Novedades. Reexporta todo lo que antes vivía en
// src/lib/novedades.ts (un solo archivo) para que `@/lib/novedades` siga
// resolviendo igual desde las páginas — ver docs/GLOSARIO-TRADUCCION.md para
// las reglas seguidas al traducir `es.ts`/`en.ts`/`fr.ts`, y `types.ts` para
// la forma de `Novedad`.
//
// Todas las páginas actuales (`novedades/page.tsx`,
// `novedades/[slug]/page.tsx`, `sitemap.ts`, `llms.txt/route.ts`) llaman a
// `getNovedadesOrdenadas()` / `getNovedadBySlug(slug)` / `novedadesData` sin
// pasar `locale` (ver docs/CLAUDE.md, "Fase 3: traducción automática": el
// cuerpo de Novedades no está cableado a locale en las rutas todavía). Por
// eso el parámetro `locale` de los getters es opcional y por defecto
// español: ningún call site existente se rompe, y cuando esas páginas
// empiecen a pasar `params.locale`, alcanza con reenviarlo acá.

import type { Locale } from '@/lib/i18n';
import { resolveLocale } from '@/lib/i18n';
import type { Novedad } from './types';
import { novedadesEs } from './es';
import { novedadesEn } from './en';
import { novedadesFr } from './fr';

export type { FuenteContenido, EnlaceExterno, Novedad } from './types';

/** Dataset completo por idioma. TypeScript exige que las tres versiones
 * existan (`Record<Locale, Novedad[]>`); el script `scripts/check-i18n.ts`
 * (ver docs/GLOSARIO-TRADUCCION.md, punto 9) verifica además que tengan la
 * misma cantidad de elementos y de enlaces, y que los campos invariantes
 * (slug, fecha, imagen, URLs) coincidan entre idiomas. */
export const novedadesByLocale: Record<Locale, Novedad[]> = {
  es: novedadesEs,
  en: novedadesEn,
  fr: novedadesFr,
};

/** Alias en español: mismo nombre y forma que el `novedadesData` original. */
export const novedadesDataEs: Novedad[] = novedadesEs;

export function getNovedadBySlug(slug: string, locale: string = 'es'): Novedad | undefined {
  return novedadesByLocale[resolveLocale(locale)].find((novedad) => novedad.slug === slug);
}

/** Copia ordenada por fecha descendente (más reciente primero). */
export function getNovedadesOrdenadas(locale: string = 'es'): Novedad[] {
  return [...novedadesByLocale[resolveLocale(locale)]].sort((a, b) => b.fecha.localeCompare(a.fecha));
}
