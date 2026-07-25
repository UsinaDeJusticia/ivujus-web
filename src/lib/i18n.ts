// Base compartida de localización del contenido.
//
// Antes existían tres implementaciones equivalentes de lo mismo, cada una con
// su propio nombre y su propia lista de locales: `resolveContactoLocale`
// (contacto.ts), `resolveGaleriaLocale` (simposio2026.ts) y
// `getPublicacionesLabels` (publicaciones.ts). Al pasar todo el contenido a
// tres idiomas esa duplicación se volvía insostenible: cada dataset nuevo
// agregaba una cuarta, quinta y sexta copia del mismo resolver, y nada
// garantizaba que todas soportaran el mismo conjunto de locales.
//
// `Locale` es la fuente única. El segmento [locale] de la ruta ya restringe los
// valores posibles, pero el tipo de `params` es `string`, así que igual hace
// falta un resolver que caiga a español ante cualquier valor inesperado.

export const LOCALES = ['es', 'en', 'fr'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Normaliza el `locale` que llega de los params de la ruta. */
export function resolveLocale(locale: string): Locale {
  return isLocale(locale) ? locale : DEFAULT_LOCALE;
}

/**
 * Devuelve la variante del contenido para el idioma pedido.
 *
 * Se usa con datasets declarados como `Record<Locale, T>`, de modo que
 * TypeScript exige que las tres versiones existan y tengan la misma forma: si
 * a una traducción le falta un campo, el proyecto no compila.
 */
export function pickLocale<T>(byLocale: Record<Locale, T>, locale: string): T {
  return byLocale[resolveLocale(locale)];
}
