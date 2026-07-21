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
// Libros — "Nuevos Paradigmas para la Justicia Penal": contenido tomado de
// dos posts reales y vivos de la REST API pública de ivujus.org.ar
// (constatado 2026-07-21):
// - https://ivujus.org.ar/wp-json/wp/v2/posts/24509
//   ("Usina de Justicia presenta el libro...", anuncio + datos de la
//   presentación en Dain Usina Cultural)
// - https://ivujus.org.ar/wp-json/wp/v2/posts/24540
//   ("Resumen de la presentación...", citas textuales de los oradores del
//   evento y video de resumen)
// Imagen de portada: media id 24510 del mismo WP
// (https://ivujus.org.ar/wp-content/uploads/2025/11/jimena_diana.jpg).
//
// REGLA DE ORO: nada de lo que sigue es inventado. Los párrafos de
// `announcementParagraphs` son una transcripción fiel (HTML → texto plano)
// del post 24509; las citas de `quotes` son transcripción fiel de las citas
// atribuidas en el post 24540, no paráfrasis.

export type Locale = 'es' | 'en' | 'fr';

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
  descargarDeclaracion: string;
  verDeclaracionCompleta: string;
  verLibro: string;
  leerNotaCompleta: string;
  volverA: string;
  fuente: string;
};

const LABELS: Record<Locale, PublicacionesLabels> = {
  es: {
    publicaciones: 'Publicaciones',
    declaraciones: 'Declaraciones',
    libros: 'Libros',
    documentoOficial: 'Documento oficial',
    organizacion: 'Organización',
    sede: 'Sede',
    fecha: 'Fecha',
    lugar: 'Lugar',
    autores: 'Autoras',
    presentacion: 'Presentación',
    descargarDeclaracion: 'Descargar declaración',
    verDeclaracionCompleta: 'Ver declaración completa',
    verLibro: 'Ver libro',
    leerNotaCompleta: 'Leer la nota completa',
    volverA: 'Volver a',
    fuente: 'Fuente',
  },
  en: {
    publicaciones: 'Publications',
    declaraciones: 'Declarations',
    libros: 'Books',
    documentoOficial: 'Official document',
    organizacion: 'Organization',
    sede: 'Venue',
    fecha: 'Date',
    lugar: 'Location',
    autores: 'Authors',
    presentacion: 'Presentation',
    descargarDeclaracion: 'Download declaration',
    verDeclaracionCompleta: 'Read full declaration',
    verLibro: 'View book',
    leerNotaCompleta: 'Read the full article',
    volverA: 'Back to',
    fuente: 'Source',
  },
  fr: {
    publicaciones: 'Publications',
    declaraciones: 'Déclarations',
    libros: 'Livres',
    documentoOficial: 'Document officiel',
    organizacion: 'Organisation',
    sede: 'Lieu',
    fecha: 'Date',
    lugar: 'Lieu',
    autores: 'Autrices',
    presentacion: 'Présentation',
    descargarDeclaracion: 'Télécharger la déclaration',
    verDeclaracionCompleta: 'Lire la déclaration complète',
    verLibro: 'Voir le livre',
    leerNotaCompleta: "Lire l'article complet",
    volverA: 'Retour à',
    fuente: 'Source',
  },
};

export function getPublicacionesLabels(locale: string): PublicacionesLabels {
  return LABELS[locale as Locale] ?? LABELS.es;
}

export type DeclaracionSummary = {
  slug: string;
  fecha: string;
};

// El índice de declaraciones solo referencia el slug: título, resumen y
// artículos siguen viviendo en simposio2026.ts para no duplicar contenido.
export const declaracionesIndex: DeclaracionSummary[] = [
  {
    slug: 'declaracion-de-buenos-aires',
    fecha: '2026-04-10',
  },
];

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
  videoUrl?: string;
  sourcePosts: Array<{ id: number; url: string }>;
};

export const libroNuevosParadigmas: Libro = {
  slug: 'nuevos-paradigmas-para-la-justicia-penal',
  title: 'Nuevos Paradigmas para la Justicia Penal',
  subtitle: 'Hacia una era con perspectiva de víctima',
  authors: 'Diana Cohen Agrest y María Jimena Molina (compiladoras)',
  coverImage: 'https://ivujus.org.ar/wp-content/uploads/2025/11/jimena_diana.jpg',
  coverAlt:
    'Diana Cohen Agrest y María Jimena Molina, compiladoras del libro Nuevos Paradigmas para la Justicia Penal',
  fecha: '2025-11-04',
  announcementParagraphs: [
    'La asociación civil Usina de Justicia, fundada y presidida por Diana Cohen Agrest, anunció la presentación de su nuevo libro: "Nuevos Paradigmas para la Justicia Penal. Hacia una era con perspectiva de víctima".',
    'El libro, escrito por Cohen Agrest y María Jimena Molina, propone una profunda transformación del sistema judicial argentino. El eje central de la obra es la necesidad de impulsar un debate que coloque a las víctimas en el centro del proceso penal, garantizando sus derechos y atendiendo sus necesidades.',
    'El texto reúne artículos de diversos referentes del ámbito jurídico y académico, ofreciendo una mirada crítica al sistema penal actual. El objetivo es promover un modelo de justicia más humano, equitativo y sensible ante las consecuencias del delito.',
  ],
  presentacion: {
    lugar: 'Dain Usina Cultural, Palermo, Ciudad Autónoma de Buenos Aires',
    fecha: '10 de noviembre de 2025',
    horario: '18 a 20 hs',
  },
  summaryIntro:
    'Resumen de la presentación del libro, compilado por Diana Cohen Agrest y María Jimena Molina, con palabras de apertura a cargo de Silvia Fesquet (Clarín) y Florencia Abramzon (Quórum).',
  quotes: [
    {
      autor: 'Silvia Fesquet',
      rol: 'Jefa de Redacción de Clarín',
      cita: 'El gran mérito del libro y de Usina de Justicia es "volver a poner a las víctimas en el centro del debate" y terminar con el "destrato de un sistema" que las ignora.',
    },
    {
      autor: 'Diana Cohen Agrest',
      rol: 'Filósofa y compiladora',
      cita: 'La obra, a diferencia del derecho tradicional, está escrita en "lenguaje llano, casi coloquial" para todo público, desgranando las "falacias y engaños del derecho abolicionista".',
    },
    {
      autor: 'María Jimena Molina',
      rol: 'Compiladora',
      cita: 'Destacó la labor de Usina de Justicia a través de la Diplomatura en Leyes de Víctimas y Victimología, creada para "capacitar a todos los operadores del sistema", desde empleados hasta magistrados.',
    },
    {
      autor: 'Marcelo Peluzzi',
      rol: 'Juez de Ejecución Penal',
      cita: 'Llamado al Poder Judicial y a los ministerios públicos a "solidarizarse con las víctimas" cuando se acercan a denunciar y darles un "trato más humano, más cercano".',
    },
    {
      autor: 'Florencia Abramzon',
      rol: 'Abogada, fundadora de Quórum',
      cita: 'Definió el libro como un "cambio de paradigma" urgente, porque "no puede ser que el delincuente tenga todas las de ganar" mientras "nos olvidamos de la víctima".',
    },
  ],
  videoUrl: 'https://ivujus.org.ar/wp-content/uploads/2025/11/WhatsApp-Video-2025-11-12-at-12.38.13-1.mp4',
  sourcePosts: [
    {
      id: 24509,
      url: 'https://ivujus.org.ar/usina-de-justicia-presenta-el-libro-nuevos-paradigmas-para-la-justicia-penal/',
    },
    {
      id: 24540,
      url: 'https://ivujus.org.ar/%f0%9f%93%96-resumen-de-la-presentacion-nuevos-paradigmas-para-la-justicia-penal/',
    },
  ],
};
