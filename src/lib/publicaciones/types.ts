// Tipos del dataset de Publicaciones (hub, Declaraciones y Libros).
// Ver comentario de cabecera en index.ts para el origen del contenido y las
// fuentes citadas.

export type PublicacionesLabels = {
  publicaciones: string;
  declaraciones: string;
  libros: string;
  documentoOficial: string;
  organizacion: string;
  sede: string;
  fecha: string;
  lugar: string;
  autores: string;
  presentacion: string;
  anuncioEyebrow: string;
  anuncioTitle: string;
  presentacionEyebrow: string;
  presentacionTitle: string;
  descargarDeclaracion: string;
  verDeclaracionCompleta: string;
  verLibro: string;
  leerNotaCompleta: string;
  volverA: string;
  fuente: string;
};

export type DeclaracionSummary = {
  slug: string;
  fecha: string;
};

export type LibroQuote = {
  autor: string;
  rol: string;
  cita: string;
};

export type Libro = {
  slug: string;
  title: string;
  subtitle: string;
  authors: string;
  coverImage: string;
  coverAlt: string;
  fecha: string;
  announcementParagraphs: string[];
  presentacion: {
    lugar: string;
    fecha: string;
    horario: string;
  };
  summaryIntro: string;
  quotes: LibroQuote[];
  // Las citas de `quotes` fueron pronunciadas en español (ver
  // docs/GLOSARIO-TRADUCCION.md §7, "Citas textuales de personas"). Este
  // campo lleva la nota de traducción de cortesía en inglés y francés;
  // queda ausente en la versión en español.
  quotesNote?: string;
  videoUrl?: string;
  sourcePosts: Array<{ id: number; url: string }>;
};

export type PublicacionesLocaleContent = {
  labels: PublicacionesLabels;
  libro: Libro;
};
