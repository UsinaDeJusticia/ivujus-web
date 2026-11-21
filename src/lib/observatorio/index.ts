// Punto de entrada del Observatorio. Ver types.ts para cómo sumar una
// herramienta nueva.
import { pickLocale, type Locale } from '../i18n';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import type { Herramienta, ObservatorioContent, ObservatorioLabels } from './types';

export type { Herramienta, ObservatorioContent, ObservatorioLabels };
export { MAPA_DEL_DELITO_URL } from './constants';

// Exportado para que scripts/check-i18n.ts compare los tres idiomas.
export const observatorioByLocale: Record<Locale, ObservatorioContent> = { es, en, fr };

/** Slugs en español: la fuente de verdad para rutas, sitemap y llms.txt. */
export const herramientasDataEs: Herramienta[] = es.herramientas;

export function getObservatorioLabels(locale: string): ObservatorioLabels {
  return pickLocale(observatorioByLocale, locale).labels;
}

export function getHerramientas(locale: string): Herramienta[] {
  return pickLocale(observatorioByLocale, locale).herramientas;
}

export function getHerramienta(slug: string, locale: string): Herramienta | undefined {
  return getHerramientas(locale).find((herramienta) => herramienta.slug === slug);
}
