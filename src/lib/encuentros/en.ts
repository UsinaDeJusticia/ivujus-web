import type { EncuentrosLocaleContent } from './types';

// English version. See es.ts for sourcing notes and the two discrepancies
// resolved there (event year and the speaker's first name). Fields that
// never translate (slug, image src, external/internal URLs, source posts)
// are copied verbatim from es.ts.
export const en: EncuentrosLocaleContent = {
  labels: {
    eventosAcademicos: 'Academic Events',
    encuentros: 'Meetings and Conferences',
    metaTitle: 'Meetings and Conferences',
    metaDescription:
      'Book launches, conference days and other academic activities of the Institute of Victimology of Usina de Justicia, in addition to Symposium 2026.',
    eyebrow: 'Academic Events / Meetings and Conferences',
    heading: "Other academic activities of the Institute.",
    lead: 'Book launches, conference days and gatherings with the participation of IVUJUS members, in addition to Symposium 2026.',
    modalidadLabel: 'Format',
    lugarLabel: 'Venue',
    oradoresLabel: 'Participants',
    verEnlace: 'Learn more',
    librosCardTitle: 'Book launch at DAIN Usina Cultural',
    librosCardCta: 'View the full book page',
  },
  items: [
    {
      slug: 'uba-facultad-de-derecho-2025',
      titulo: 'Launch of «Nuevos Paradigmas para la Justicia Penal» at the Facultad de Derecho',
      fecha: '24 April 2025',
      lugar: 'Salón Verde, Facultad de Derecho, Universidad de Buenos Aires (UBA)',
      modalidad: 'In person',
      resumen:
        'TAEDA and the civil association Usina de Justicia presented the book «Nuevos Paradigmas para la Justicia Penal. Hacia una era con perspectiva de víctima» (New Paradigms for Criminal Justice. Towards an Era with a Victim-Centred Perspective) at the Salón Verde of the Facultad de Derecho, Universidad de Buenos Aires (UBA). The work, edited by TAEDA in collaboration with Usina de Justicia, addresses the need to improve the quality of Argentine criminal justice, with a focus on the human rights of victims and their families.',
      oradores: ['Diana Cohen Agrest', 'María Jimena Molina'],
      imagenes: [
        {
          src: 'https://usinadejusticia.org.ar/wp-content/uploads/2025/04/todos.avif',
          alt: 'Launch of the book Nuevos Paradigmas para la Justicia Penal at the Facultad de Derecho, UBA',
        },
      ],
      enlaceExterno: {
        label: 'View photo coverage on Infobae',
        url: 'https://www.infobae.com/fotos/2025/04/25/31-fotos-taeda-y-usina-de-justicia-presentaron-el-libro-nuevos-paradigmas-para-la-justicia-penal-en-la-facultad-de-derecho/',
        notaIdioma: 'Article published in Spanish.',
      },
      sourcePosts: [
        { id: 21686, url: 'https://usinadejusticia.org.ar/2025/04/25/taeda-y-usina-de-justicia-presentaron-el-libro-nuevos-paradigmas-para-la-justicia-penal-en-la-facultad-de-derecho/' },
        { id: 21728, url: 'https://usinadejusticia.org.ar/2025/04/29/la-mirada-de-un-nuevo-libro-sobre-una-reforma-de-la-justicia-penal-en-favor-de-las-victimas/' },
      ],
    },
    {
      slug: 'jornadas-edad-imputabilidad-2026',
      titulo: 'Age of Criminal Responsibility Conference',
      fecha: '23 and 24 February 2026',
      modalidad: 'Online (Zoom)',
      oradores: ['María Jimena Molina', 'Roberto Picozzi', 'Francisco Javier Pascua'],
      imagenes: [
        {
          src: '/eventos/jornadas-imputabilidad-2026-flyer-1.jpg',
          alt: 'Flyer for the Age of Criminal Responsibility Conference, Grupo Diálogo y Debate, with the panel of speakers',
        },
        {
          src: '/eventos/jornadas-imputabilidad-2026-flyer-2.jpg',
          alt: 'Flyer for the Age of Criminal Responsibility Conference, Ciclo 2026, with the 23 February speakers',
        },
      ],
      enlaceInterno: {
        label: 'Read the full update',
        href: '/novedades/el-ivujus-presente-en-el-ciclo-de-formacion-2026',
      },
    },
  ],
};
