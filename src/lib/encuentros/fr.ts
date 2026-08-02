import type { EncuentrosLocaleContent } from './types';

// Version française. Voir es.ts pour les sources et les deux divergences de
// sources déjà résolues (l'année de l'événement et le prénom de l'intervenant).
export const fr: EncuentrosLocaleContent = {
  labels: {
    eventosAcademicos: 'Événements académiques',
    encuentros: 'Rencontres et conférences',
    metaTitle: 'Rencontres et conférences',
    metaDescription:
      "Présentations de livres, journées et autres activités académiques de l'Institut de Victimologie d'Usina de Justicia, en plus du Symposium 2026.",
    eyebrow: 'Événements académiques / Rencontres et conférences',
    heading: "Autres activités académiques de l'Institut.",
    lead: "Présentations de livres, journées et rencontres avec la participation de membres de l'IVUJUS, en plus du Symposium 2026.",
    modalidadLabel: 'Modalité',
    lugarLabel: 'Lieu',
    oradoresLabel: 'Participants',
    verEnlace: 'En savoir plus',
    librosCardTitle: 'Présentation du livre à DAIN Usina Cultural',
    librosCardCta: 'Voir la fiche complète du livre',
  },
  items: [
    {
      slug: 'decimo-aniversario-usina-de-justicia-2024',
      titulo: "Usina de Justicia a célébré son 10e anniversaire au Teatro Colón",
      fecha: '12 novembre 2024',
      lugar: 'Salón Dorado, Teatro Colón, Ville de Buenos Aires',
      modalidad: 'En présentiel',
      resumen:
        "Usina de Justicia a célébré dix ans de travail lors d'un événement au Salón Dorado du Teatro Colón, mêlant réflexion et musique, en présence d'une organisation française partageant un idéaire similaire. Sa présidente, Diana Cohen Agrest, s'est exprimée sur la décennie de lutte de l'institution. « Nous sommes très heureux des progrès réalisés sur les objectifs que nous poursuivons depuis ces années. Nous avons travaillé sans relâche pour les victimes d'homicides et de féminicides, en accompagnant leurs proches », avait déclaré avant l'événement Guillermo Bargna, fondateur d'Usina de Justicia.",
      oradores: ['Diana Cohen Agrest', 'Guillermo Bargna'],
      notaCita: "Les déclarations ont été faites en espagnol ; les citations sont des traductions de courtoisie.",
      imagenes: [
        {
          src: 'https://usinadejusticia.org.ar/wp-content/uploads/2024/11/MG_0500-1.webp',
          alt: "Participants à l'événement pour le 10e anniversaire d'Usina de Justicia, au Salón Dorado du Teatro Colón",
        },
        {
          src: 'https://usinadejusticia.org.ar/wp-content/uploads/2024/11/MG_0287.webp',
          alt: "Diana Cohen Agrest s'exprime au pupitre lors de l'événement pour les 10 ans d'Usina de Justicia au Teatro Colón",
        },
      ],
      enlacesExternos: [
        {
          label: "Voir l'article sur Infobae",
          url: 'https://www.infobae.com/sociedad/2024/11/16/usina-de-justicia-a-10-anos-de-transformar-el-dolor-en-lucha-se-sigue-privilegiando-a-unas-victimas-en-desmedro-de-otras/',
          notaIdioma: 'Article publié en espagnol.',
        },
        {
          label: "Voir l'article sur La Nación",
          url: 'https://www.lanacion.com.ar/politica/la-usina-de-justicia-conmemoro-10-anos-de-lucha-en-defensa-de-las-victimas-y-contra-el-abolicionismo-nid12112024/',
          notaIdioma: 'Article publié en espagnol.',
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
      titulo: 'Présentation de « Nuevos Paradigmas para la Justicia Penal » à la Facultad de Derecho',
      fecha: '24 avril 2025',
      lugar: 'Salón Verde, Facultad de Derecho, Universidad de Buenos Aires (UBA)',
      modalidad: 'En présentiel',
      resumen:
        "TAEDA et l'association civile Usina de Justicia ont présenté le livre « Nuevos Paradigmas para la Justicia Penal. Hacia una era con perspectiva de víctima » (Nouveaux paradigmes pour la justice pénale. Vers une ère avec une perspective centrée sur la victime) dans le Salón Verde de la Facultad de Derecho, Universidad de Buenos Aires (UBA). L'ouvrage, publié par TAEDA en collaboration avec Usina de Justicia, aborde la nécessité d'améliorer la qualité de la justice pénale argentine, en mettant l'accent sur les droits humains des victimes et de leurs proches.",
      oradores: ['Diana Cohen Agrest', 'María Jimena Molina'],
      imagenes: [
        {
          src: 'https://usinadejusticia.org.ar/wp-content/uploads/2025/04/todos.avif',
          alt: 'Présentation du livre Nuevos Paradigmas para la Justicia Penal à la Facultad de Derecho, UBA',
        },
      ],
      enlacesExternos: [
        {
          label: 'Voir la couverture photo sur Infobae',
          url: 'https://www.infobae.com/fotos/2025/04/25/31-fotos-taeda-y-usina-de-justicia-presentaron-el-libro-nuevos-paradigmas-para-la-justicia-penal-en-la-facultad-de-derecho/',
          notaIdioma: 'Article publié en espagnol.',
        },
      ],
      sourcePosts: [
        { id: 21686, url: 'https://usinadejusticia.org.ar/2025/04/25/taeda-y-usina-de-justicia-presentaron-el-libro-nuevos-paradigmas-para-la-justicia-penal-en-la-facultad-de-derecho/' },
        { id: 21728, url: 'https://usinadejusticia.org.ar/2025/04/29/la-mirada-de-un-nuevo-libro-sobre-una-reforma-de-la-justicia-penal-en-favor-de-las-victimas/' },
      ],
    },
    {
      slug: 'jornadas-edad-imputabilidad-2026',
      titulo: 'Journées « Âge de la responsabilité pénale »',
      fecha: '23 et 24 février 2026',
      modalidad: 'En ligne (Zoom)',
      oradores: ['María Jimena Molina', 'Roberto Picozzi', 'Francisco Javier Pascua'],
      imagenes: [
        {
          src: '/eventos/jornadas-imputabilidad-2026-flyer-1.jpg',
          alt: 'Flyer des Journées Âge de la responsabilité pénale, Grupo Diálogo y Debate, avec la table des intervenants',
        },
        {
          src: '/eventos/jornadas-imputabilidad-2026-flyer-2.jpg',
          alt: 'Flyer des Journées Âge de la responsabilité pénale, Ciclo 2026, avec les intervenants du 23 février',
        },
      ],
      enlaceInterno: {
        label: "Lire l'actualité complète",
        href: '/novedades/el-ivujus-presente-en-el-ciclo-de-formacion-2026',
      },
    },
  ],
};
