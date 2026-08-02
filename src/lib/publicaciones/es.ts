import type { PublicacionesLocaleContent } from './types';

// Libro "Nuevos Paradigmas para la Justicia Penal": contenido tomado de dos
// posts reales y vivos de la REST API pública de ivujus.org.ar (constatado
// 2026-07-21):
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
export const es: PublicacionesLocaleContent = {
  labels: {
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
    anuncioEyebrow: 'Anuncio',
    anuncioTitle: 'Un libro para colocar a las víctimas en el centro del proceso penal.',
    presentacionEyebrow: 'Presentación',
    presentacionTitle: 'Voces de la presentación del libro.',
    descargarDeclaracion: 'Descargar declaración',
    verDeclaracionCompleta: 'Ver declaración completa',
    verLibro: 'Ver libro',
    leerNotaCompleta: 'Leer la nota completa',
    volverA: 'Volver a',
    fuente: 'Fuente',
    dossiers: 'Dossiers',
    dossiersMetaTitle: 'Dossiers temáticos',
    dossiersMetaDescription:
      'Dossiers de investigación del Instituto de Victimología de Usina de Justicia sobre prisión perpetua, salud mental y responsabilidad penal juvenil.',
    dossiersEyebrow: 'Publicaciones / Dossiers',
    dossiersTitle: 'Dossiers temáticos del Instituto.',
    dossiersLead:
      'Documentos de investigación elaborados en el marco de los ciclos de debate del Instituto, con foco en tres discusiones centrales de la política criminal argentina.',
    descargarDossier: 'Descargar dossier',
  },
  libro: {
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
    videoUrl:
      'https://ivujus.org.ar/wp-content/uploads/2025/11/WhatsApp-Video-2025-11-12-at-12.38.13-1.mp4',
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
  },
  // Dossiers: título, fecha y resumen tomados literalmente del documento
  // "PARA_PÁGINA_DE_IVUJUS.doc" que Jimena envió el 2-ago-2026 (dossier de
  // prisión perpetua y de salud mental ya estaban referenciados en
  // src/lib/formacion/es.ts con el mismo pdfUrl; este archivo agrega el
  // resumen y la fecha propia del dossier, que no es la fecha del ciclo de
  // debate que lo originó). El PDF de responsabilidad penal juvenil se
  // verificó en la biblioteca de medios de ivujus.org.ar (media id 24350,
  // constatado 2026-08-02, HTTP 200, 1.8 MB) — no existía en el sitio hasta
  // ahora.
  dossiers: [
    {
      slug: 'prision-perpetua',
      titulo: 'Publicación académica: la constitucionalidad de la prisión perpetua',
      fecha: 'enero de 2021',
      resumen:
        'Realizado en colaboración con el Instituto de Altos Estudios de Mendoza, este texto se centra en la disputa legal sobre la prisión perpetua dentro del marco jurídico argentino. Recopila los análisis surgidos de un foro multidisciplinario tras una audiencia de la Suprema Corte de Justicia mendocina, con perspectivas éticas, filosóficas y penales. El prólogo destaca que el tribunal provincial validó la legalidad de esta sanción, marcando un precedente para la justicia del país.',
      pdfUrl: 'https://ivujus.org.ar/wp-content/uploads/2023/07/prision-perpetua.pdf',
    },
    {
      slug: 'salud-mental',
      titulo: 'Dossier de Salud Mental',
      fecha: 'noviembre de 2021',
      resumen:
        'Presenta una crítica a la Ley Nacional de Salud Mental 26.657, argumentando que su enfoque abolicionista desprotege tanto a los pacientes como a la sociedad. Sostiene que la normativa prioriza la ideología política sobre el conocimiento científico, promoviendo el cierre de instituciones especializadas sin ofrecer alternativas efectivas de contención, y advierte sobre la rigidez jurídica de la ley frente a los avances médicos modernos.',
      pdfUrl: 'https://ivujus.org.ar/wp-content/uploads/2023/07/Dossier-Salud-Mental.pdf',
    },
    {
      slug: 'responsabilidad-penal-juvenil',
      titulo: 'Dossier de responsabilidad penal juvenil',
      fecha: 'agosto de 2025',
      resumen:
        'Presenta argumentos a favor de reformar el sistema penal juvenil en Argentina, centrándose en la baja de la edad de imputabilidad y en un cambio de paradigma que priorice a la víctima. Defiende la baja de la edad mínima de responsabilidad penal a los 14 o 13 años, apoyándose en evidencia de neurociencia sobre el desarrollo del juicio moral entre los 10 y 12 años, y señala que Argentina integra una minoría de jurisdicciones con edad mínima de 16 años o más frente a un promedio global de 12. Concluye que la baja de la edad de imputabilidad no es una medida meramente punitiva, sino una necesidad social y técnica para proteger a las víctimas y brindar una intervención institucional real a los menores en conflicto con la ley.',
      pdfUrl:
        'https://ivujus.org.ar/wp-content/uploads/2025/09/Dossier.-La-responsabilidad-penal-de-los-menores-delincuentes_IVUJUS-1.pdf',
    },
  ],
};
