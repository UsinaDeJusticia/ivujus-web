// Dataset y labels para la sección Publicaciones (hub, Declaraciones y
// Libros). Igual que src/lib/instituto.ts y src/lib/formacion.ts, es
// contenido curado a mano — no hay colección de Payload equivalente todavía.
//
// Declaración de Buenos Aires: el contenido YA EXISTE en
// `src/lib/simposio2026.ts` (`simposio2026.declaration` y
// `declaracionBuenosAiresPayloadDraft`). Este archivo NO lo duplica: las
// páginas de /publicaciones/declaraciones importan esos datos directamente
// desde simposio2026.ts (solo lectura, sin editar ese módulo) y usan de acá
// únicamente los labels de navegación/CTA que cambian por idioma.
//
// Locale compartido: antes este dataset tenía su propio `type Locale` y su
// propio resolver de idioma (`getPublicacionesLabels` caía a `LABELS.es` a
// mano). Ahora usa el `Locale` y el `pickLocale` de `src/lib/i18n.ts`, la
// base común para todos los datasets del sitio.
//
// El contenido de cada idioma vive en su propio archivo (es.ts, en.ts,
// fr.ts) para que las traducciones se puedan revisar sin desplazarse por un
// archivo único de 200+ líneas; ver el comentario de cabecera de es.ts para
// las fuentes citadas del libro "Nuevos Paradigmas para la Justicia Penal".
import { pickLocale, type Locale } from '../i18n';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import type {
  DeclaracionSummary,
  Libro,
  LibroQuote,
  PublicacionesLabels,
  PublicacionesLocaleContent,
} from './types';

export type {
  DeclaracionSummary,
  Libro,
  LibroQuote,
  PublicacionesLabels,
  PublicacionesLocaleContent,
};

// Exportado (además de usarse acá) para que `scripts/check-i18n.ts` pueda
// comparar los tres idiomas entre sí: es el único modo de detectar un campo
// invariante traducido por error o un texto que quedó sin traducir.
export const publicacionesByLocale: Record<Locale, PublicacionesLocaleContent> = { es, en, fr };

const CONTENT = publicacionesByLocale;

export function getPublicacionesLabels(locale: string): PublicacionesLabels {
  return pickLocale(CONTENT, locale).labels;
}

/** Devuelve el libro "Nuevos Paradigmas para la Justicia Penal" en el idioma pedido. */
export function getLibroNuevosParadigmas(locale: string): Libro {
  return pickLocale(CONTENT, locale).libro;
}

// Export previo: varias páginas ya importaban `libroNuevosParadigmas` como
// valor fijo (sin locale). Se mantiene apuntando a la versión en español
// para no romper ningún consumidor que todavía no pase por
// `getLibroNuevosParadigmas`; `libros/page.tsx` sí fue migrado a la versión
// localizada.
export const libroNuevosParadigmas: Libro = CONTENT.es.libro;

// El índice de declaraciones solo referencia el slug: título, resumen y
// artículos siguen viviendo en simposio2026.ts para no duplicar contenido.
// slug y fecha son invariantes por definición (ver GLOSARIO-TRADUCCION.md
// §6), así que no hace falta un Record<Locale, ...> acá: es el mismo array
// en los tres idiomas.
export const declaracionesIndex: DeclaracionSummary[] = [
  {
    slug: 'declaracion-de-buenos-aires',
    fecha: '2026-04-10',
  },
];
