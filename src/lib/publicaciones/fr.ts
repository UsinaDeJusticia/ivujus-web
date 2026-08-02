import type { PublicacionesLocaleContent } from './types';

// Version française. Voir es.ts pour les notes de source et la règle de
// fidélité qui régit ce jeu de contenu. Les champs jamais traduits (slug,
// coverImage, fecha, videoUrl, sourcePosts) sont copiés tels quels depuis
// es.ts.
//
// Titre du livre : « Nuevos Paradigmas para la Justicia Penal » est un
// ouvrage publié en espagnol ; le titre original est donc conservé dans
// chaque langue (voir docs/GLOSARIO-TRADUCCION.md §5 ter). Une traduction de
// courtoisie du titre et du sous-titre est ajoutée entre parenthèses la
// première fois qu'ils sont cités dans le texte, dans `announcementParagraphs[0]`.
//
// Citations : les déclarations de `quotes` ont été prononcées en espagnol
// par des personnes réelles lors de la présentation du livre. Elles sont
// traduites pour être comprises ; `quotesNote` porte l'avis de traduction de
// courtoisie exigé par le §7 du glossaire.
export const fr: PublicacionesLocaleContent = {
  labels: {
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
    anuncioEyebrow: 'Annonce',
    anuncioTitle: 'Un livre pour placer les victimes au centre de la procédure pénale.',
    presentacionEyebrow: 'Présentation',
    presentacionTitle: 'Voix de la présentation du livre.',
    descargarDeclaracion: 'Télécharger la déclaration',
    verDeclaracionCompleta: 'Lire la déclaration complète',
    verLibro: 'Voir le livre',
    leerNotaCompleta: "Lire l'article complet",
    volverA: 'Retour à',
    fuente: 'Source',
    dossiers: 'Dossiers',
    dossiersMetaTitle: 'Dossiers thématiques',
    dossiersMetaDescription:
      "Dossiers de recherche de l'Institut de Victimologie d'Usina de Justicia sur la réclusion à perpétuité, la santé mentale et la responsabilité pénale des mineurs.",
    dossiersEyebrow: 'Publications / Dossiers',
    dossiersTitle: "Les dossiers thématiques de l'Institut.",
    dossiersLead:
      "Documents de recherche produits dans le cadre des cycles de débats de l'Institut, centrés sur trois discussions clés de la politique criminelle argentine.",
    descargarDossier: 'Télécharger le dossier',
  },
  libro: {
    slug: 'nuevos-paradigmas-para-la-justicia-penal',
    title: 'Nuevos Paradigmas para la Justicia Penal',
    subtitle: 'Vers une ère avec une perspective de victime',
    authors: 'Diana Cohen Agrest et María Jimena Molina (directrices de l\'ouvrage)',
    coverImage: 'https://ivujus.org.ar/wp-content/uploads/2025/11/jimena_diana.jpg',
    coverAlt:
      "Diana Cohen Agrest et María Jimena Molina, directrices de l'ouvrage Nuevos Paradigmas para la Justicia Penal",
    fecha: '2025-11-04',
    announcementParagraphs: [
      "L'association civile Usina de Justicia, fondée et présidée par Diana Cohen Agrest, a annoncé la présentation de son nouveau livre : « Nuevos Paradigmas para la Justicia Penal. Hacia una era con perspectiva de víctima » (Nouveaux paradigmes pour la justice pénale. Vers une ère avec une perspective de victime).",
      "Le livre, écrit par Cohen Agrest et María Jimena Molina, propose une transformation profonde du système judiciaire argentin. L'axe central de l'ouvrage est la nécessité de favoriser un débat qui place les victimes au centre de la procédure pénale, en garantissant leurs droits et en répondant à leurs besoins.",
      "Le texte réunit des articles de divers référents du milieu juridique et universitaire, offrant un regard critique sur le système pénal actuel. L'objectif est de promouvoir un modèle de justice plus humain, équitable et sensible aux conséquences du délit.",
    ],
    presentacion: {
      lugar: 'Dain Usina Cultural, Palermo, Ciudad Autónoma de Buenos Aires',
      fecha: '10 novembre 2025',
      horario: '18h à 20h',
    },
    summaryIntro:
      "Résumé de la présentation du livre, compilé par Diana Cohen Agrest et María Jimena Molina, avec les mots d'ouverture de Silvia Fesquet (Clarín) et Florencia Abramzon (Quórum).",
    quotes: [
      {
        autor: 'Silvia Fesquet',
        rol: 'Rédactrice en chef de Clarín',
        cita: "Le grand mérite du livre et d'Usina de Justicia est de « remettre les victimes au centre du débat » et de mettre fin au « mauvais traitement d'un système » qui les ignore.",
      },
      {
        autor: 'Diana Cohen Agrest',
        rol: "Philosophe et directrice de l'ouvrage",
        cita: "Contrairement au droit traditionnel, l'ouvrage est écrit dans un « langage simple, presque familier » destiné à tous les publics, décortiquant les « sophismes et tromperies du droit abolitionniste ».",
      },
      {
        autor: 'María Jimena Molina',
        rol: "Directrice de l'ouvrage",
        cita: "Elle a souligné le travail d'Usina de Justicia à travers le Diplôme en victimologie et droit des victimes, créé pour « former tous les acteurs du système », des employés aux magistrats.",
      },
      {
        autor: 'Marcelo Peluzzi',
        rol: "Juge chargé de l'exécution des peines pénales (Juez de Ejecución Penal)",
        cita: "Un appel au pouvoir judiciaire et aux ministères publics à « faire preuve de solidarité envers les victimes » lorsqu'elles viennent porter plainte, et à leur offrir un « traitement plus humain, plus proche ».",
      },
      {
        autor: 'Florencia Abramzon',
        rol: 'Avocate, fondatrice de Quórum',
        cita: "Elle a défini le livre comme un « changement de paradigme » urgent, car « il n'est pas possible que le délinquant ait toutes les cartes en main » pendant que « nous oublions la victime ».",
      },
    ],
    quotesNote:
      'Les déclarations ont été faites en espagnol ; les citations sont des traductions de courtoisie.',
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
  dossiers: [
    {
      slug: 'prision-perpetua',
      titulo: 'Publication académique : la constitutionnalité de la réclusion à perpétuité',
      fecha: 'janvier 2021',
      resumen:
        "Réalisé en collaboration avec l'Instituto de Altos Estudios de Mendoza, ce texte porte sur le débat juridique relatif à la réclusion à perpétuité dans le droit argentin. Il rassemble les analyses issues d'un forum pluridisciplinaire tenu après un arrêt de la Cour suprême de justice de Mendoza, abordant des perspectives éthiques, philosophiques et pénales. La préface souligne que le tribunal provincial a validé la légalité de cette sanction, établissant un précédent pour la justice du pays.",
      pdfUrl: 'https://ivujus.org.ar/wp-content/uploads/2023/07/prision-perpetua.pdf',
    },
    {
      slug: 'salud-mental',
      titulo: 'Dossier sur la santé mentale',
      fecha: 'novembre 2021',
      resumen:
        "Propose une critique de la loi nationale sur la santé mentale n° 26 657, soutenant que son approche abolitionniste ne protège ni les patients ni la société. Le texte affirme que la norme privilégie l'idéologie politique au détriment des connaissances scientifiques, en favorisant la fermeture d'institutions spécialisées sans offrir d'alternatives efficaces de prise en charge, et alerte sur la rigidité juridique de la loi face aux avancées médicales actuelles.",
      pdfUrl: 'https://ivujus.org.ar/wp-content/uploads/2023/07/Dossier-Salud-Mental.pdf',
    },
    {
      slug: 'responsabilidad-penal-juvenil',
      titulo: 'Dossier sur la responsabilité pénale des mineurs',
      fecha: 'août 2025',
      resumen:
        "Présente des arguments en faveur d'une réforme du système pénal des mineurs en Argentine, centrée sur l'abaissement de l'âge de la responsabilité pénale et sur un changement de paradigme plaçant la victime au premier plan. Il défend l'abaissement de l'âge minimal de responsabilité pénale à 14 ou 13 ans, en s'appuyant sur des données de neurosciences selon lesquelles le jugement moral se développe entre 10 et 12 ans, et souligne que l'Argentine fait partie d'une minorité de juridictions ayant un âge minimal de 16 ans ou plus, contre une moyenne mondiale de 12 ans. Il conclut que l'abaissement de l'âge de la responsabilité pénale n'est pas une simple mesure punitive, mais une nécessité sociale et technique pour protéger les victimes et offrir une véritable intervention institutionnelle aux mineurs en conflit avec la loi.",
      pdfUrl:
        'https://ivujus.org.ar/wp-content/uploads/2025/09/Dossier.-La-responsabilidad-penal-de-los-menores-delincuentes_IVUJUS-1.pdf',
    },
  ],
};
