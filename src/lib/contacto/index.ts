// contacto — dataset y copy localizado de /[locale]/contacto.
//
// Correo institucional tomado verbatim de la fuente oficial del design
// system: docs/reference/design-system-oficial/README.md, sección
// "Superficies del producto" → "Contacto: `info@ivujus.org.ar`". Es un
// identificador invariante (ver GLOSARIO-TRADUCCION.md §6): idéntico en los
// tres idiomas.
//
// Locale compartido: este módulo tenía su propio mini-sistema de locales
// (`LOCALES`, `ContactoLocale`, `resolveContactoLocale`), duplicado del de
// `src/lib/publicaciones.ts` y `src/lib/simposio2026.ts`. Ahora usa el
// `Locale` y el `pickLocale` de `src/lib/i18n.ts`; `resolveContactoLocale`
// se mantiene como alias fino de `resolveLocale` por si algún archivo
// todavía lo importa por ese nombre.
import { pickLocale, resolveLocale, type Locale } from '../i18n';
import { copy as en } from './en';
import { copy as es } from './es';
import { copy as fr } from './fr';
import type { ContactoCopy } from './types';

export type { ContactoCopy };

// Alias retrocompatible: antes del pase a tres idiomas, `ContactoLocale` era
// el tipo propio de este módulo (idéntico en forma a `Locale`).
export type ContactoLocale = Locale;

export const INSTITUTIONAL_EMAIL = 'info@ivujus.org.ar';

// Solo copy/labels de UI (siguiendo el patrón de NAV_COPY en
// src/app/(frontend)/[locale]/layout.tsx): el cuerpo institucional en
// prosa se mantiene corto, como en el resto de las rutas ya existentes (ver
// comentario en formacion/page.tsx sobre Fase 3 v1: ES → EN vía pipeline
// automático, FR ya traducido a mano acá).
export const contactoCopy: Record<Locale, ContactoCopy> = { es, en, fr };

/** Alias de `resolveLocale` con el nombre histórico de este módulo. */
export function resolveContactoLocale(locale: string): ContactoLocale {
  return resolveLocale(locale);
}

export function getContactoCopy(locale: string): ContactoCopy {
  return pickLocale(contactoCopy, locale);
}
