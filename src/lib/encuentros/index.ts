// Dataset "Encuentros y conferencias", subsección de Eventos académicos.
// Mismo patrón que el resto del sitio: contenido curado a mano, un archivo
// por idioma, `index.ts` como único punto de entrada. Ver es.ts para las
// fuentes citadas y las dos discrepancias resueltas entre fuentes.
import { pickLocale, type Locale } from '../i18n';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import type { Encuentro, EncuentroEnlace, EncuentroImagen, EncuentrosLabels, EncuentrosLocaleContent } from './types';

export type { Encuentro, EncuentroEnlace, EncuentroImagen, EncuentrosLabels, EncuentrosLocaleContent };

// Exportado para que scripts/check-i18n.ts compare los tres idiomas.
export const encuentrosByLocale: Record<Locale, EncuentrosLocaleContent> = { es, en, fr };

export function getEncuentrosLabels(locale: string): EncuentrosLabels {
  return pickLocale(encuentrosByLocale, locale).labels;
}

export function getEncuentros(locale: string): Encuentro[] {
  return pickLocale(encuentrosByLocale, locale).items;
}
