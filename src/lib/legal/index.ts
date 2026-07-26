// index.ts — dataset de /[locale]/terms-privacy, trilingüe.
//
// Igual que src/lib/publicaciones/index.ts: cada idioma vive en su propio
// archivo (es.ts, en.ts, fr.ts) para que las traducciones se puedan revisar
// sin desplazarse por un archivo único; ver el comentario de cabecera de
// es.ts para la procedencia del contenido y las reglas de traducción
// aplicadas (docs/GLOSARIO-TRADUCCION.md §7).
//
// `termsPrivacyData` se mantiene apuntando a la versión española por
// compatibilidad: `terms-privacy/page.tsx` (y cualquier otro consumidor que
// no pase por locale) sigue funcionando sin cambios.
import { pickLocale, type Locale } from '../i18n';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import type { LegalDocument } from './types';

export type { LegalBlock, LegalSection, LegalDocument } from './types';

export const termsPrivacyByLocale: Record<Locale, LegalDocument> = { es, en, fr };

export const termsPrivacyDataEs: LegalDocument = termsPrivacyByLocale.es;

export function getTermsPrivacyData(locale: string): LegalDocument {
  return pickLocale(termsPrivacyByLocale, locale);
}
