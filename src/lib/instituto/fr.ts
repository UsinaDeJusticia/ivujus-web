import type { InstitutoData } from './types';

// Version française. Suit docs/GLOSARIO-TRADUCCION.md : slugs et images sont
// copiés tels quels depuis es.ts, les noms de personnes ne sont jamais
// traduits, les noms de pays prennent leur forme française, et les titres
// universitaires sont adaptés à l'équivalent le plus compréhensible sans
// inventer d'équivalence officielle inexistante.
//
// « Auxiliar Letrado Relator » (biographie de María Jimena Molina) n'a pas
// d'équivalent officiel hors de la magistrature argentine : traduit de
// façon descriptive, avec le titre original en espagnol entre parenthèses
// (glosario §5 ter).
//
// Le livre d'Irvin Waller « Ciencia y Secretos para Acabar con los Delitos
// Violentos » est la traduction espagnole de son ouvrage original en
// anglais ; aucune édition française connue n'existe, donc le titre
// original en anglais est cité tel quel plutôt qu'une retraduction
// (glosario §5 ter).
export const institutoFr: InstitutoData = {
  title: "Institut de Victimologie d'Usina de Justicia",
  intro:
    "L'IVUJUS articule des activités de formation, de production éditoriale, de recherche et de coopération internationale autour de la victimologie pénale et du droit des victimes.",
  purposes: [
    {
      title: 'Études et recherche',
      body: 'Promouvoir les études relatives à la victimologie, au droit des victimes, à la criminalité et à la prévention de la délinquance.',
    },
    {
      title: 'Formation et cours',
      body: 'Développer des cours de perfectionnement et de formation pour les organismes publics et privés.',
    },
    {
      title: 'Événements et congrès',
      body: 'Organiser et gérer des accords, congrès, rencontres nationales et internationales et séminaires.',
    },
    {
      title: 'Prix scientifiques',
      body: 'Distinguer les contributions exceptionnelles dans le domaine de la victimologie pénale.',
    },
    {
      title: 'Publications',
      body: "Encourager la publication d'articles scientifiques, de livres et d'études comparatives.",
    },
    {
      title: 'Collaboration',
      body: "Faciliter l'échange scientifique avec des sociétés de victimologie nationales et internationales.",
    },
  ],
  consejoDirectivo: [
    {
      slug: 'maria-jimena-molina',
      name: 'María Jimena Molina',
      role: 'Directrice',
      summary: "Avocate et spécialiste en droit pénal, éthique et politiques publiques dans une perspective centrée sur la victime.",
      bio: "Avocate (UCALP). Master en éthique, philosophie politique et anthropologie (TECH, Espagne). Spécialiste en droit pénal (UNLP). Diplômée en liberté d'expression et sécurité des journalistes (Institut Bonavero des droits de l'homme, Université d'Oxford, UNESCO). Auxiliaire juridique et rapporteure (Auxiliar Letrado Relator) au parquet de la Cour de cassation de la province de Buenos Aires.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/12/jimena_molina_profiles.jpg',
    },
    {
      slug: 'diana-cohen-agrest',
      name: 'Diana Cohen Agrest',
      role: 'Directrice honoraire',
      summary: "Docteure en philosophie et fondatrice d'Usina de Justicia.",
      bio: "Docteure en philosophie (UBA). Fondatrice et présidente de l'Asociación Civil Usina de Justicia. Chercheuse et enseignante universitaire, reconnue au niveau national et international pour son travail en faveur de la protection des victimes d'actes délictueux.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-14-at-10.33.50.jpeg',
    },
    {
      slug: 'daniel-roggero',
      name: 'Daniel Roggero',
      role: 'Conseiller académique',
      summary: 'Avocat, communicateur et auteur spécialisé dans les droits humains des victimes.',
      bio: "Avocat (UBA). Licencié en communication sociale et psychologie sociale. Auteur du Manual de Derechos Humanos y Garantías de las Personas Víctimas de Delito (Manuel des droits humains et des garanties des personnes victimes d'actes délictueux). Coordinateur de diverses audiences internationales sur les politiques publiques et l'avenir.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-14-at-11.41.02.jpeg',
    },
    {
      slug: 'noelia-juarez',
      name: 'Noelia Juárez',
      role: 'Secrétaire',
      summary: 'Avocate spécialisée en droit constitutionnel et administratif.',
      bio: "Avocate (UNLaM). Secrétaire générale d'Usina de Justicia. Spécialiste en droit constitutionnel et administratif. Auteure de plusieurs articles sur la délinquance juvénile et le régime migratoire.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/12/noelia_juarez_profiles.jpg',
    },
    {
      slug: 'mariana-romano',
      name: 'Mariana Romano',
      role: 'Relations institutionnelles',
      summary: 'Avocate et référente en relations judiciaires internationales et cybercriminalité.',
      bio: "Avocate (UBA). Représentante d'Usina de Justicia auprès de l'OEA. Experte en cybercriminalité et preuve numérique. Boursière de la Georgetown University et experte en relations judiciaires internationales.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-14-at-10.49.35-1.jpeg',
    },
    {
      slug: 'jair-castillo',
      name: 'Jair Castillo',
      role: 'Technologie et communication',
      summary: 'Spécialiste en communication numérique, développement web et intelligence artificielle.',
      bio: "Spécialiste en communication numérique et intelligence artificielle. Développeur web et stratège du positionnement numérique de l'IVUJUS.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2026/02/jair_ivujus.jpg',
    },
  ],
  comiteCientifico: [
    {
      slug: 'irvin-waller',
      name: 'Irvin Waller',
      role: 'Canada',
      country: 'Canada',
      summary: "Professeur émérite de criminologie et auteur intellectuel de la Déclaration de l'ONU de 1985 sur la justice pour les victimes.",
      bio: "Professeur émérite de criminologie à l'Université d'Ottawa. Titulaire d'un Ph.D. de l'Université de Cambridge, il est mondialement reconnu comme l'auteur de la Déclaration sur les principes fondamentaux de justice pour les victimes de la criminalité (ONU, 1985). Il a été directeur exécutif fondateur du Centre international pour la prévention de la criminalité (CIPC) et a contribué à la fondation de la Société mondiale de victimologie. Il a conseillé plus de 50 gouvernements, dont celui de Nelson Mandela en Afrique du Sud. Auteur d'ouvrages fondamentaux tels que « Science and Secrets of Ending Violent Crime », son travail a transformé la sécurité publique et les droits des victimes à l'échelle mondiale.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2026/02/Irvin-Waller_HD.jpeg',
    },
    {
      slug: 'hilda-marchiori',
      name: 'Hilda Marchiori',
      role: 'Argentine',
      country: 'Argentine',
      summary: 'Figure historique de la victimologie en Amérique latine.',
      bio: "Ancienne professeure de criminologie et du troisième cycle de victimologie (UNC). Membre de la Société internationale de criminologie (Paris) et de la World Society of Victimology. Fondatrice de l'Asociación Argentina de Victimología (Société argentine de victimologie) et auteure de plus de 40 ouvrages dans la spécialité.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/hildam.jpeg',
    },
    {
      slug: 'beatrice-coscas-williams',
      name: 'Beatrice Coscas-Williams',
      role: 'Israël',
      country: 'Israël',
      summary: 'Spécialiste de la participation des victimes et de la mémoire collective.',
      bio: "Experte en participation des victimes dans les systèmes de justice pénale et en mémoire collective. Elle préside le groupe de travail sur la victimologie de la Société européenne de criminologie. Ses recherches portent sur les processus judiciaires culturellement informés et la résolution des conflits.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/beatrice.jpeg',
    },
    {
      slug: 'marcelo-aebi',
      name: 'Marcelo Aebi',
      role: 'Argentine-Suisse',
      country: 'Argentine-Suisse',
      summary: "Professeur de criminologie et responsable des statistiques SPACE du Conseil de l'Europe.",
      bio: "Responsable des statistiques pénales annuelles du Conseil de l'Europe (SPACE) et secrétaire exécutif de la Société européenne de criminologie. Auteur de plus de 150 publications scientifiques sur les prisons, la délinquance juvénile et la méthodologie criminologique.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/marcelo-aebi.jpg',
    },
    {
      slug: 'maria-de-la-luz-lima-malvido',
      name: 'María de la Luz Lima Malvido',
      role: 'Mexique',
      country: 'Mexique',
      summary: "Juriste et référente régionale en matière d'assistance aux victimes et de violence familiale.",
      bio: "Ancienne procureure spécialisée en délits sexuels et sous-procureure générale du Mexique. Présidente honoraire de la Sociedad Mexicana de Victimología (Société mexicaine de victimologie). Elle a dirigé l'élaboration de normes internationales sur l'assistance aux victimes et la violence familiale au sein des Nations unies.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/Maria-de-la-Luz-Lima-Malvido-229x285-1.png',
    },
    {
      slug: 'dario-solis-garcia',
      name: 'Darío Solís García',
      role: 'Panama',
      country: 'Panama',
      summary: 'Spécialiste du système pénal accusatoire, de la victimologie et des droits humains.',
      bio: "Spécialiste du système pénal accusatoire, formé au Panama et en Europe. Collaborateur actif de la Sociedad Vasca de Victimología (Société basque de victimologie) et de la World Society of Victimology. Il a géré des projets d'échange scientifique avec Usina de Justicia.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/dario.jpeg',
    },
    {
      slug: 'catherine-rossi',
      name: 'Catherine Rossi',
      role: 'Canada',
      country: 'Canada',
      summary: 'Chercheuse en violence, justice et assistance aux victimes.',
      bio: "Directrice de l'équipe de recherche « Violence-Justice ». Spécialiste des violences intimes et familiales, elle préside le Centre d'aide aux victimes d'agression sexuelle du Québec et est membre de l'Ordre des criminologues du Québec.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/catherine.jpeg',
    },
    {
      slug: 'pierre-marie-seve',
      name: 'Pierre-Marie Sève',
      role: 'France',
      country: 'France',
      summary: "Juriste et directeur de l'Institut pour la Justice.",
      bio: "Il dirige un think tank français influent, consacré à la réforme du système de justice pénale. Expert en transparence citoyenne et en lutte contre la corruption, il est régulièrement présent dans les médias européens.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/pierre.jpeg',
    },
  ],
  estatuto: {
    heading: 'Dénomination, siège, objectifs et composition',
    courtesyNotice: 'Traduction de courtoisie. Seule la version espagnole a valeur juridique.',
    articles: [
      "Art. 1. Il est constitué l'Institut de Victimologie d'Usina de Justicia (ci-après IVUJUS), dont le siège est le même que celui de l'Asociación Civil Usina de Justicia.",
      "Art. 2. L'Institut, tout comme l'Association, ne poursuit aucune finalité politique ni syndicale.",
      "Art. 3. L'Institut a les finalités suivantes : 1) Promouvoir les études relatives à la victimologie, au droit des victimes, à la criminalité et à la prévention de la délinquance. 2) Développer des cours de perfectionnement et de formation destinés aux organismes publics et privés, nationaux et internationaux, en lien avec le domaine d'étude de l'Institut. 3) Organiser et gérer des accords, congrès, rencontres nationales et internationales, conférences, débats et séminaires sur les questions scientifiques relatives à la discipline. 4) Encourager des prix scientifiques, sous réserve de l'approbation de la Commission directrice de l'Association et des membres de l'Institut. 5) Encourager la publication d'articles scientifiques, de livres, de statistiques et d'études comparatives sur la discipline. 6) Faciliter la collaboration et l'échange scientifique avec des sociétés de victimologie et de criminologie nationales et internationales, des groupes d'étude et des entités consacrées à cette thématique.",
      "Art. 4. L'Institut dispose d'un site web propre, intégré à l'écosystème numérique d'Usina de Justicia.",
      "Art. 5. L'Institut est composé d'un Conseil d'administration qui veille au respect des objectifs institutionnels.",
      "Art. 6. L'Institut dispose d'un Comité scientifique composé d'experts internationaux de renom, afin de garantir l'excellence académique.",
    ],
  },
  sections: [
    {
      title: 'Statuts',
      body: "Fondement institutionnel, définitions fondatrices et objectifs de l'institut.",
      href: '/instituto/estatuto',
    },
    {
      title: "Conseil d'administration",
      body: "Profils, fonctions et traçabilité institutionnelle de la direction de l'IVUJUS.",
      href: '/instituto/consejo-directivo',
    },
    {
      title: 'Comité scientifique',
      body: "Références internationales et autorité académique pour la légitimité comparée de l'institut.",
      href: '/instituto/comite-cientifico',
    },
  ],
};
