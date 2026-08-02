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
      slug: 'decimo-aniversario-usina-de-justicia-2024',
      titulo: 'Usina de Justicia marked its 10th anniversary at the Teatro Colón',
      fecha: '12 November 2024',
      lugar: 'Salón Dorado, Teatro Colón, City of Buenos Aires',
      modalidad: 'In person',
      resumen:
        'Usina de Justicia marked ten years of work with an event at the Salón Dorado of the Teatro Colón, combining reflection and music, with the presence of a French organisation sharing a similar outlook. Its president, Diana Cohen Agrest, spoke about the institution’s decade-long fight. "We are very pleased with the progress on the goals we have pursued over these years. We have worked tirelessly for victims of homicide and femicide, supporting their families," Guillermo Bargna, founder of Usina de Justicia, had said ahead of the event.',
      oradores: ['Diana Cohen Agrest', 'Guillermo Bargna'],
      notaCita: 'Statements were made in Spanish; quotations are courtesy translations.',
      imagenes: [
        {
          src: 'https://usinadejusticia.org.ar/wp-content/uploads/2024/11/MG_0500-1.webp',
          alt: 'Attendees at the event marking the 10th anniversary of Usina de Justicia, at the Salón Dorado of the Teatro Colón',
        },
        {
          src: 'https://usinadejusticia.org.ar/wp-content/uploads/2024/11/MG_0287.webp',
          alt: 'Diana Cohen Agrest speaks at the lectern during the event marking 10 years of Usina de Justicia at the Teatro Colón',
        },
      ],
      enlacesExternos: [
        {
          label: 'View the article on Infobae',
          url: 'https://www.infobae.com/sociedad/2024/11/16/usina-de-justicia-a-10-anos-de-transformar-el-dolor-en-lucha-se-sigue-privilegiando-a-unas-victimas-en-desmedro-de-otras/',
          notaIdioma: 'Article published in Spanish.',
        },
        {
          label: 'View the article on La Nación',
          url: 'https://www.lanacion.com.ar/politica/la-usina-de-justicia-conmemoro-10-anos-de-lucha-en-defensa-de-las-victimas-y-contra-el-abolicionismo-nid12112024/',
          notaIdioma: 'Article published in Spanish.',
        },
      ],
      sourcePosts: [
        { id: 21370, url: 'https://usinadejusticia.org.ar/2024/11/11/usina-de-justicia-cumple-diez-anos-celebrando-avances/' },
        { id: 21372, url: 'https://usinadejusticia.org.ar/2024/11/16/usina-de-justicia-a-10-anos-de-transformar-el-dolor-en-lucha-se-sigue-privilegiando-a-unas-victimas-en-desmedro-de-otras/' },
        { id: 22026, url: 'https://usinadejusticia.org.ar/2024/11/14/usina-de-justicia-conmemoro-10-anos-de-lucha-en-defensa-de-las-victimas-y-contra-el-abolicionismo-penal/' },
        { id: 21404, url: 'https://usinadejusticia.org.ar/2024/11/14/la-presidenta-de-usina-de-justicia-diana-cohen-agrest-hablo-sobre-los-10-anos-de-lucha-de-la-institucion/' },
      ],
    },
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
      enlacesExternos: [
        {
          label: 'View photo coverage on Infobae',
          url: 'https://www.infobae.com/fotos/2025/04/25/31-fotos-taeda-y-usina-de-justicia-presentaron-el-libro-nuevos-paradigmas-para-la-justicia-penal-en-la-facultad-de-derecho/',
          notaIdioma: 'Article published in Spanish.',
        },
      ],
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
