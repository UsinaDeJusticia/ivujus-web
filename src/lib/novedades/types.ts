// Tipos compartidos por las tres versiones de idioma de Novedades (es/en/fr).
// Ver `index.ts` para el porqué de la estructura en directorio y
// `docs/GLOSARIO-TRADUCCION.md` para las reglas de traducción aplicadas a
// `es.ts`, `en.ts` y `fr.ts`.
//
// NOTA DE ARQUITECTURA (Fase 3): esta estructura curada es un puente hacia
// la colección `Novedades` que ya existe en el schema de Payload (ver
// docs/CLAUDE.md). En Fase 3, la fuente de este listado pasará a ser la
// REST API del WP en vivo de ivujus.org.ar consumida con ISR (revalidate),
// reemplazando estos arrays estáticos por un fetch con caché — el tipo
// `Novedad` de abajo está pensado para mapear 1 a 1 contra los campos que
// ya devuelve `wp/v2/posts` (title, date, content/excerpt, featured media,
// id, link), así que no debería cambiar de forma drástica cuando eso pase.
//
// REGLA DE ORO de esta ola: nada de lo que sigue es inventado. Los 6 posts
// de `es.ts` son los mapeados a `novedades` en la sección "Posts" de
// docs/CONTENT-MIGRATION-LEDGER.md, bajados el 2026-07-21 vía la REST API
// pública del WP vivo de ivujus.org.ar:
//   https://ivujus.org.ar/wp-json/wp/v2/posts/<id>?_fields=id,slug,date,title,content,excerpt,link,featured_media
// y sus imágenes destacadas vía:
//   https://ivujus.org.ar/wp-json/wp/v2/media/<id>?_fields=id,source_url,alt_text,media_details
// `en.ts` y `fr.ts` son traducciones fieles de ese mismo contenido (ola de
// trilingüe de 2026-07-25, ver docs/GLOSARIO-TRADUCCION.md).

export type FuenteContenido = 'migracion_wp';

export type EnlaceExterno = {
  /**
   * Label/botón del enlace. En este dataset es siempre un texto propio de
   * IVUJUS (una llamada a la acción: "Accedé a la nota en DEF", "Leer el
   * newsletter completo (PDF)"), no el título real del artículo enlazado —
   * por eso SÍ se traduce en `en.ts`/`fr.ts` (ver docs/GLOSARIO-TRADUCCION.md,
   * punto 7, "Títulos de notas de prensa": esa regla protege el título real
   * de un artículo publicado, que acá no está guardado en ningún campo).
   */
  titulo: string;
  url: string;
  /**
   * Nota sobre el idioma del contenido enlazado, solo cuando el destino está
   * en español y la versión actual no lo está (ver
   * docs/GLOSARIO-TRADUCCION.md, punto 7). Vacío/ausente en `es.ts`.
   */
  notaIdioma?: string;
};

export type Novedad = {
  slug: string;
  titulo: string;
  /** Fecha de publicación original en WP, formato ISO (YYYY-MM-DD) para poder ordenar y para `datePublished` en JSON-LD. Idéntica en los tres idiomas. */
  fecha: string;
  /** Bajada / resumen: primer párrafo real del posteo original, no una síntesis inventada. */
  bajada: string;
  /** Cuerpo editorial limpio, en párrafos. */
  contenido: string[];
  /** URL de la imagen destacada real del post en wp-content, si existe. Idéntica en los tres idiomas. */
  imagen?: string;
  /** Links reales citados por el post original (nota de prensa, PDF, etc.). Las `url` son idénticas en los tres idiomas. */
  enlacesExternos?: EnlaceExterno[];
  fuente: FuenteContenido;
  source_wp_id: number;
  /** URL real del post de origen en el WP vivo. Idéntica en los tres idiomas: es el origen real del contenido, no una ruta traducida. */
  source_url: string;
};
