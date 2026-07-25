// Dataset del Simposio 2026, ahora trilingüe (español, inglés, francés).
//
// Se reestructuró de un único archivo (`simposio2026.ts`) a un directorio
// porque cada idioma necesita su propio módulo de contenido curado a mano
// (ver docs/GLOSARIO-TRADUCCION.md). La ruta de import `@/lib/simposio2026`
// sigue resolviendo acá sin tocar los consumidores existentes.
//
// Todos los exports que ya existían (`simposio2026`, `galeriaCopy`,
// `resolveGaleriaLocale`, los tipos, los payload drafts) se mantienen
// apuntando a español para no romper las páginas que ya los consumen. El
// contenido en los otros idiomas se expone vía `simposio2026ByLocale` y
// `getSimposio2026(locale)`.
//
// El mini-sistema de idiomas propio de este dataset (`GALERIA_LOCALES`,
// `GaleriaLocale`, `resolveGaleriaLocale`) se migró al `Locale`/`pickLocale`
// compartido de `src/lib/i18n.ts` (ver el comentario en ese archivo sobre por
// qué existían tres resolvers equivalentes). `resolveGaleriaLocale` queda
// como alias de `resolveLocale` porque `simposios/2026-buenos-aires/page.tsx`
// lo importa por nombre.

import { pickLocale, resolveLocale, type Locale } from '@/lib/i18n';
import { content as es } from './es';
import { content as en } from './en';
import { content as fr } from './fr';
import type { DeclaracionPayloadDraft, GaleriaCopy, Simposio2026Content, SimposioPayloadDraft } from './types';

export type {
  DeclaracionPayloadDraft,
  GaleriaCopy,
  GaleriaImagen,
  PressArticle,
  Simposio2026Content,
  SimposioPayloadDraft,
  SymposiumDay,
  SymposiumSession,
} from './types';

export const simposio2026ByLocale: Record<Locale, Simposio2026Content> = { es, en, fr };

export function getSimposio2026(locale: string): Simposio2026Content {
  return pickLocale(simposio2026ByLocale, locale);
}

// Export histórico: contenido en español. Para contenido localizado según el
// `locale` de la ruta, usar `getSimposio2026(locale)`.
export const simposio2026 = simposio2026ByLocale.es;

// Solo copy/labels de UI (mismo patrón que contactoCopy en
// src/lib/contacto.ts): las epígrafes de cada foto viven en
// `simposio2026ByLocale[locale].galeria`, ya traducidas.
export const galeriaCopy: Record<Locale, GaleriaCopy> = {
  es: {
    eyebrow: 'Galería',
    title: 'Imágenes del encuentro en el CPACF.',
  },
  en: {
    eyebrow: 'Gallery',
    title: 'Images from the gathering at CPACF.',
  },
  fr: {
    eyebrow: 'Galerie',
    title: 'Images de la rencontre au CPACF.',
  },
};

// Alias de `resolveLocale` (src/lib/i18n.ts): mantenido porque
// `simposios/2026-buenos-aires/page.tsx` lo importa por nombre.
export const resolveGaleriaLocale = resolveLocale;

export const simposio2026PayloadDraft: SimposioPayloadDraft = {
  titulo: simposio2026.title,
  slug: simposio2026.slug,
  numero_edicion: 1,
  anio: 2026,
  fecha_inicio: '2026-04-09',
  fecha_fin: '2026-04-10',
  sede: {
    institucion_organizadora: simposio2026.organizingInstitution,
    ciudad: 'Buenos Aires',
    pais: 'Argentina',
  },
  resumen: simposio2026.summary,
  temario: [
    {
      titulo: 'Derechos de las víctimas y justicia penal',
      descripcion:
        'Bloques dedicados a políticas públicas de atención, derecho penal, etapa de ejecución y defensa de víctimas.',
    },
    {
      titulo: 'Victimología científica y evidencia',
      descripcion:
        'Paneles sobre ciencia, medición cualitativa, análisis basado en evidencia y datos genéticos.',
    },
    {
      titulo: 'Debates contemporáneos',
      descripcion:
        'Abolicionismo penal, juicio en ausencia, política criminal y nuevas perspectivas para América y Europa.',
    },
  ],
  sitio_externo: 'https://simposiousinadejusticia.org.ar',
  fuente: 'humano',
};

export const declaracionBuenosAiresPayloadDraft: DeclaracionPayloadDraft = {
  titulo: 'Declaración de Buenos Aires',
  slug: 'declaracion-de-buenos-aires',
  fecha: '2026-04-10',
  simposio_origen_slug_referencia: simposio2026.slug,
  texto_completo_resumen:
    'Documento oficial firmado al cierre del Primer Simposio Americano y Europeo de Victimología Penal, orientado a fijar bases para una victimología científica y una justicia penal con perspectiva de víctima.',
  texto_completo_puntos: simposio2026.declaration.standards,
  pdf_url: simposio2026.declaration.pdfUrl,
  fuente: 'humano',
};
