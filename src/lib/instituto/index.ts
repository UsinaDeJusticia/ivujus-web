// Dataset trilingüe de la sección Instituto (hub, Estatuto, Consejo Directivo
// y Comité Científico). Igual que src/lib/publicaciones/index.ts, es
// contenido curado a mano por idioma — no hay colección de Payload
// equivalente todavía (ver docs/CLAUDE.md, "Estado actual de frontend y
// migracion": no reescribir/reemplazar este dataset sin coordinar antes su
// equivalente persistible).
//
// El contenido de cada idioma vive en su propio archivo (es.ts, en.ts, fr.ts)
// siguiendo las reglas de docs/GLOSARIO-TRADUCCION.md.
import type { Locale } from '../i18n';
import { pickLocale } from '../i18n';

import { institutoEn } from './en';
import { institutoEs } from './es';
import { institutoFr } from './fr';
import type { InstitutoData } from './types';

export * from './types';

export const institutoByLocale: Record<Locale, InstitutoData> = {
  es: institutoEs,
  en: institutoEn,
  fr: institutoFr,
};

export function getInstitutoData(locale: string): InstitutoData {
  return pickLocale(institutoByLocale, locale);
}

// Compatibilidad: las páginas todavía importan `institutoData` como valor
// fijo (sin locale). Se migran a `getInstitutoData` en otra ola.
export const institutoData = institutoEs;
