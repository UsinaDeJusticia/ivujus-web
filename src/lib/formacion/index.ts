// Dataset de la sección Formación (hub, Diplomatura y archivo de ciclos y
// jornadas), ahora trilingüe (español, inglés, francés).
//
// Se reestructuró de un único archivo (`formacion.ts`) a un directorio
// porque cada idioma necesita su propio módulo de contenido curado a mano
// (ver docs/GLOSARIO-TRADUCCION.md). La ruta de import `@/lib/formacion`
// sigue resolviendo acá sin tocar los consumidores existentes.
//
// Todos los exports que ya existían (`diplomaturaData`, `formacionHubData`,
// `ciclosData`, `getCicloBySlug`, `CAMPUS_VIRTUAL_URL`,
// `DIPLOMATURA_PROGRAMA_PDF_URL`) se mantienen apuntando a la versión en
// español para no romper las páginas que ya los consumen sin pasar
// `locale` (ver docs/CLAUDE.md). El contenido en los otros idiomas se
// expone vía `formacionByLocale` y los getters `getFormacion(locale)` /
// `getDiplomatura(locale)` / `getFormacionHub(locale)` / `getCiclos(locale)`,
// para cuando alguna página empiece a consumir la traducción.

import { pickLocale, type Locale } from '@/lib/i18n';
import { content as es } from './es';
import { content as en } from './en';
import { content as fr } from './fr';
import type { Ciclo, Diplomatura, FormacionContent, FormacionHub } from './types';

export type { Ciclo, DossierCiclo, Diplomatura, FormacionContent, FormacionHub, FuenteContenido, SesionCiclo } from './types';

export { CAMPUS_VIRTUAL_URL, DIPLOMATURA_PROGRAMA_PDF_URL } from './constants';

export const formacionByLocale: Record<Locale, FormacionContent> = { es, en, fr };

export function getFormacion(locale: string): FormacionContent {
  return pickLocale(formacionByLocale, locale);
}

export function getDiplomatura(locale: string): Diplomatura {
  return pickLocale(formacionByLocale, locale).diplomatura;
}

export function getFormacionHub(locale: string): FormacionHub {
  return pickLocale(formacionByLocale, locale).hub;
}

export function getCiclos(locale: string): Ciclo[] {
  return pickLocale(formacionByLocale, locale).ciclos;
}

// --- Compatibilidad hacia atrás: mismos nombres que exportaba
// src/lib/formacion.ts, apuntando siempre a la versión en español ---
export const diplomaturaDataEs: Diplomatura = formacionByLocale.es.diplomatura;
export const formacionHubDataEs: FormacionHub = formacionByLocale.es.hub;
export const ciclosDataEs: Ciclo[] = formacionByLocale.es.ciclos;

/**
 * Busca un ciclo por slug. Sin `locale` (o con un valor inválido) devuelve
 * la versión española, igual que el `getCicloBySlug(slug)` original — las
 * llamadas existentes (`formacion/ciclos/[slug]/page.tsx`) siguen
 * funcionando sin cambios.
 */
export function getCicloBySlug(slug: string, locale: string = 'es'): Ciclo | undefined {
  return getCiclos(locale).find((ciclo) => ciclo.slug === slug);
}
