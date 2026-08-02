import type { EncuentrosLocaleContent } from './types';

// Fuentes constatadas el 2-ago-2026 vía la REST API pública de
// usinadejusticia.org.ar e ivujus.org.ar. Nada de lo que sigue es inventado;
// donde una fuente entra en conflicto con otra se documenta la resolución.
//
// Presentación en la Facultad de Derecho (UBA), 24 de abril de 2025:
// corroborada por CUATRO posts independientes de usinadejusticia.org.ar:
// - /wp-json/wp/v2/posts/21686 ("TAEDA y Usina de Justicia presentaron el
//   libro... en la Facultad de Derecho"), con imagen destacada (media 21688,
//   https://usinadejusticia.org.ar/wp-content/uploads/2025/04/todos.avif).
// - /wp-json/wp/v2/posts/21728 (confirma "Salón Verde de la Facultad de
//   Derecho de la UBA" y que la obra "fue editada por TAEDA en colaboración
//   con la asociación civil Usina de Justicia").
// - /wp-json/wp/v2/posts/21691 y /wp-json/wp/v2/posts/21697 (cobertura
//   adicional del mismo evento).
// El enlace "Leer nota" del post 21686 apunta a una galería de Infobae
// (host ya permitido en next.config.ts para prensa del Simposio 2026).
//
// Jornadas "Edad de Imputabilidad", 23 y 24 de febrero de 2026: fuente
// primaria es el post EN VIVO de ivujus.org.ar
// /wp-json/wp/v2/posts/24591 ("El IVUJUS presente en el Ciclo de Formación
// 2026", publicado 2026-02-06), que da fecha, horario, modalidad y a los
// tres miembros del IVUJUS que participan.
//
// Dos discrepancias resueltas con la fuente más fiable en cada caso:
// 1. El documento "PARA_PÁGINA_DE_IVUJUS.doc" que envió Jimena (2-ago-2026)
//    decía "Fecha: 23 de febrero de 2025" para esta jornada. El propio post
//    de ivujus.org.ar (publicado en vivo el 6-feb-2026, siete días antes del
//    evento) y los dos flyers de "Grupo Diálogo y Debate" que Jimena había
//    enviado antes coinciden en "2026". Se usa 2026: es un typo aislado
//    contra tres fuentes independientes que coinciden, incluida la propia
//    institución.
// 2. El primer flyer nombraba al expositor como "Ricardo Picozzi"; se usa
//    "Roberto Picozzi", que es como lo nombran tres posts propios de
//    usinadejusticia.org.ar (id 22406, 21784, 22539) y el post de ivujus.org.ar.
export const es: EncuentrosLocaleContent = {
  labels: {
    eventosAcademicos: 'Eventos académicos',
    encuentros: 'Encuentros y conferencias',
    metaTitle: 'Encuentros y conferencias',
    metaDescription:
      'Presentaciones de libros, jornadas y otras actividades académicas del Instituto de Victimología de Usina de Justicia, además del Simposio 2026.',
    eyebrow: 'Eventos académicos / Encuentros y conferencias',
    heading: 'Otras actividades académicas del Instituto.',
    lead: 'Presentaciones de libros, jornadas y encuentros con participación de miembros del IVUJUS, además del Simposio 2026.',
    modalidadLabel: 'Modalidad',
    lugarLabel: 'Lugar',
    oradoresLabel: 'Participaron',
    verEnlace: 'Ver más',
    librosCardTitle: 'Presentación del libro en DAIN Usina Cultural',
    librosCardCta: 'Ver la ficha completa del libro',
  },
  items: [
    {
      slug: 'uba-facultad-de-derecho-2025',
      titulo: 'Presentación del libro «Nuevos Paradigmas para la Justicia Penal» en la Facultad de Derecho',
      fecha: '24 de abril de 2025',
      lugar: 'Salón Verde, Facultad de Derecho, Universidad de Buenos Aires (UBA)',
      modalidad: 'Presencial',
      resumen:
        'TAEDA y la asociación civil Usina de Justicia presentaron el libro «Nuevos Paradigmas para la Justicia Penal. Hacia una era con perspectiva de víctima» en el Salón Verde de la Facultad de Derecho de la UBA. La obra, editada por TAEDA en colaboración con Usina de Justicia, aborda la necesidad de mejorar la calidad de la justicia penal argentina, con foco en los derechos humanos de las víctimas y sus allegados.',
      oradores: ['Diana Cohen Agrest', 'María Jimena Molina'],
      imagenes: [
        {
          src: 'https://usinadejusticia.org.ar/wp-content/uploads/2025/04/todos.avif',
          alt: 'Presentación del libro Nuevos Paradigmas para la Justicia Penal en la Facultad de Derecho de la UBA',
        },
      ],
      enlaceExterno: {
        label: 'Ver cobertura fotográfica en Infobae',
        url: 'https://www.infobae.com/fotos/2025/04/25/31-fotos-taeda-y-usina-de-justicia-presentaron-el-libro-nuevos-paradigmas-para-la-justicia-penal-en-la-facultad-de-derecho/',
      },
      sourcePosts: [
        { id: 21686, url: 'https://usinadejusticia.org.ar/2025/04/25/taeda-y-usina-de-justicia-presentaron-el-libro-nuevos-paradigmas-para-la-justicia-penal-en-la-facultad-de-derecho/' },
        { id: 21728, url: 'https://usinadejusticia.org.ar/2025/04/29/la-mirada-de-un-nuevo-libro-sobre-una-reforma-de-la-justicia-penal-en-favor-de-las-victimas/' },
      ],
    },
    {
      // Este evento ya tiene su propia novedad completa y traducida en
      // src/lib/novedades/{es,en,fr}.ts (slug
      // "el-ivujus-presente-en-el-ciclo-de-formacion-2026", fuente
      // ivujus.org.ar post 24591). No se duplica el resumen acá: esta
      // entrada solo agrega los dos flyers reales que Jimena envió (la
      // novedad usaba de imagen destacada una foto de perfil, sin flyer
      // propio) y enlaza a la novedad para el texto completo.
      slug: 'jornadas-edad-imputabilidad-2026',
      titulo: 'Jornadas «Edad de Imputabilidad»',
      fecha: '23 y 24 de febrero de 2026',
      modalidad: 'Virtual (Zoom)',
      oradores: ['María Jimena Molina', 'Roberto Picozzi', 'Francisco Javier Pascua'],
      imagenes: [
        {
          src: '/eventos/jornadas-imputabilidad-2026-flyer-1.jpg',
          alt: 'Flyer de las Jornadas Edad de Imputabilidad, Grupo Diálogo y Debate, con la mesa de expositores',
        },
        {
          src: '/eventos/jornadas-imputabilidad-2026-flyer-2.jpg',
          alt: 'Flyer de las Jornadas Edad de Imputabilidad, Ciclo 2026, con los expositores del 23 de febrero',
        },
      ],
      enlaceInterno: {
        label: 'Ver la novedad completa',
        href: '/novedades/el-ivujus-presente-en-el-ciclo-de-formacion-2026',
      },
    },
  ],
};
