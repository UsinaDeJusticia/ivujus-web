import type { InstitutoData } from './types';

// English version. Follows docs/GLOSARIO-TRADUCCION.md: slugs and images are
// copied verbatim from es.ts, person names are never translated, country
// names take their English form, and academic/institutional titles are
// adapted to their nearest understandable equivalent without inventing
// official equivalences that don't exist.
//
// "Auxiliar Letrado Relator" (María Jimena Molina's bio) has no official
// equivalent outside the Argentine judiciary: translated descriptively, with
// the original Spanish title kept in parentheses (glosario §5 ter).
//
// Irvin Waller's book "Ciencia y Secretos para Acabar con los Delitos
// Violentos" is a Spanish translation of his original English book; the
// original title is used here rather than a re-translation (glosario §5 ter).
export const institutoEn: InstitutoData = {
  title: 'Institute of Victimology of Usina de Justicia',
  intro:
    'IVUJUS coordinates training, publishing, research and international cooperation activities around Criminal Victimology and victim law.',
  purposes: [
    {
      title: 'Studies and research',
      body: 'Promote studies related to victimology, victim law, criminality and crime prevention.',
    },
    {
      title: 'Training and courses',
      body: "Develop professional development and training courses for public and private organisations.",
    },
    {
      title: 'Events and conferences',
      body: 'Organise and manage agreements, conferences, national and international meetings and seminars.',
    },
    {
      title: 'Scientific awards',
      body: 'Recognise outstanding contributions in the field of Criminal Victimology.',
    },
    {
      title: 'Publications',
      body: 'Encourage the publication of scientific articles, books and comparative studies.',
    },
    {
      title: 'Collaboration',
      body: 'Facilitate scientific exchange with national and international victimology societies.',
    },
  ],
  consejoDirectivo: [
    {
      slug: 'maria-jimena-molina',
      name: 'María Jimena Molina',
      role: 'Director',
      summary: 'Lawyer and specialist in criminal law, ethics and public policy with a victim-centred perspective.',
      bio: "Lawyer (UCALP). Master's in Ethics, Political Philosophy and Anthropology (TECH, Spain). Specialist in Criminal Law (UNLP). Diploma in Freedom of Expression and Safety of Journalists (Bonavero Institute of Human Rights, University of Oxford, UNESCO). Legal Clerk and Reporting Officer (Auxiliar Letrado Relator) at the Public Prosecutor's Office of the Court of Cassation of the Province of Buenos Aires.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/12/jimena_molina_profiles.jpg',
    },
    {
      slug: 'diana-cohen-agrest',
      name: 'Diana Cohen Agrest',
      role: 'Honorary Director',
      summary: 'PhD in Philosophy and founder of Usina de Justicia.',
      bio: 'PhD in Philosophy (UBA). Founder and president of the Asociación Civil Usina de Justicia. Researcher and university lecturer, recognised nationally and internationally for her work in the protection of crime victims.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-14-at-10.33.50.jpeg',
    },
    {
      slug: 'daniel-roggero',
      name: 'Daniel Roggero',
      role: 'Academic Advisor',
      summary: 'Lawyer, communicator and author specialising in the human rights of victims.',
      bio: 'Lawyer (UBA). Graduate in Social Communication and Social Psychology. Author of the Manual de Derechos Humanos y Garantías de las Personas Víctimas de Delito (Manual on Human Rights and Guarantees for Crime Victims). Coordinator of various international hearings on public policy and the future.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-14-at-11.41.02.jpeg',
    },
    {
      slug: 'noelia-juarez',
      name: 'Noelia Juárez',
      role: 'Secretary',
      summary: 'Lawyer specialising in constitutional and administrative law.',
      bio: 'Lawyer (UNLaM). Secretary General of Usina de Justicia. Specialist in Constitutional and Administrative Law. Author of several articles on juvenile delinquency and migration law.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/12/noelia_juarez_profiles.jpg',
    },
    {
      slug: 'mariana-romano',
      name: 'Mariana Romano',
      role: 'Institutional Relations',
      summary: 'Lawyer and leading expert in international judicial relations and cybercrime.',
      bio: "Lawyer (UBA). Representative of Usina de Justicia before the OAS. Expert in Cybercrime and Digital Evidence. Fellow at Georgetown University and expert in international judicial relations.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-14-at-10.49.35-1.jpeg',
    },
    {
      slug: 'jair-castillo',
      name: 'Jair Castillo',
      role: 'Technology and Communications',
      summary: 'Specialist in digital communication, web development and artificial intelligence.',
      bio: 'Specialist in digital communication and Artificial Intelligence. Web developer and digital positioning strategist for IVUJUS.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2026/02/jair_ivujus.jpg',
    },
  ],
  comiteCientifico: [
    {
      slug: 'irvin-waller',
      name: 'Irvin Waller',
      role: 'Canada',
      country: 'Canada',
      summary: 'Professor Emeritus of Criminology and intellectual author of the 1985 UN Declaration on justice for victims.',
      bio: 'Professor Emeritus of Criminology at the University of Ottawa. With a Ph.D. from the University of Cambridge, he is internationally recognised as the author of the Declaration on the Basic Principles of Justice for Victims of Crime (UN, 1985). He was the founding executive director of the International Centre for the Prevention of Crime (ICPC) and helped found the World Society of Victimology. He has advised more than 50 governments, including Nelson Mandela in South Africa. Author of key works such as "Science and Secrets of Ending Violent Crime", his work has transformed public safety and victims\' rights worldwide.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2026/02/Irvin-Waller_HD.jpeg',
    },
    {
      slug: 'hilda-marchiori',
      name: 'Hilda Marchiori',
      role: 'Argentina',
      country: 'Argentina',
      summary: 'A historic figure in Latin American victimology.',
      bio: 'Former Professor of Criminology and of the Postgraduate Programme in Victimology (UNC). Member of the International Society of Criminology (Paris) and the World Society of Victimology. Founder of the Asociación Argentina de Victimología (Argentine Society of Victimology) and author of more than 40 books in the field.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/hildam.jpeg',
    },
    {
      slug: 'beatrice-coscas-williams',
      name: 'Beatrice Coscas-Williams',
      role: 'Israel',
      country: 'Israel',
      summary: 'Specialist in victim participation and collective memory.',
      bio: 'Expert in victim participation in criminal justice systems and collective memory. She chairs the victimology working group of the European Society of Criminology. Her research focuses on culturally informed legal processes and conflict resolution.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/beatrice.jpeg',
    },
    {
      slug: 'marcelo-aebi',
      name: 'Marcelo Aebi',
      role: 'Argentina-Switzerland',
      country: 'Argentina-Switzerland',
      summary: "Professor of Criminology and head of the Council of Europe's SPACE statistics.",
      bio: "Head of the Council of Europe's Annual Penal Statistics (SPACE) and Executive Secretary of the European Society of Criminology. Author of more than 150 scientific publications on prisons, juvenile delinquency and criminological methodology.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/marcelo-aebi.jpg',
    },
    {
      slug: 'maria-de-la-luz-lima-malvido',
      name: 'María de la Luz Lima Malvido',
      role: 'Mexico',
      country: 'Mexico',
      summary: 'Jurist and regional leading expert in victim assistance and family violence.',
      bio: 'Former Sex Crimes Prosecutor and Deputy Attorney General of Mexico. Honorary President of the Sociedad Mexicana de Victimología (Mexican Society of Victimology). She has led international standards on victim assistance and family violence at the United Nations.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/Maria-de-la-Luz-Lima-Malvido-229x285-1.png',
    },
    {
      slug: 'dario-solis-garcia',
      name: 'Darío Solís García',
      role: 'Panama',
      country: 'Panama',
      summary: 'Specialist in the adversarial criminal justice system, victimology and human rights.',
      bio: 'Specialist in the Adversarial Criminal Justice System, trained in Panama and Europe. Active collaborator with the Sociedad Vasca de Victimología (Basque Society of Victimology) and the World Society of Victimology. He has managed scientific exchange projects with Usina de Justicia.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/dario.jpeg',
    },
    {
      slug: 'catherine-rossi',
      name: 'Catherine Rossi',
      role: 'Canada',
      country: 'Canada',
      summary: 'Researcher in violence, justice and victim assistance.',
      bio: "Director of the 'Violence-Justice' Research Team. A specialist in intimate partner and family violence, she chairs the Quebec Sexual Assault Assistance Centre and is a member of the Quebec Order of Criminologists.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/catherine.jpeg',
    },
    {
      slug: 'pierre-marie-seve',
      name: 'Pierre-Marie Sève',
      role: 'France',
      country: 'France',
      summary: 'Jurist and director of the Institut pour la Justice.',
      bio: 'He leads an influential French think tank dedicated to reforming the criminal justice system. An expert in civic transparency and the fight against corruption, he is a regular presence in European media.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/pierre.jpeg',
    },
  ],
  estatuto: {
    heading: 'Name, headquarters, objectives and composition',
    courtesyNotice: 'Courtesy translation. The Spanish version is the only legally binding text.',
    articles: [
      'Art. 1. The Institute of Victimology of Usina de Justicia (hereinafter IVUJUS) is established, with the same headquarters as the Asociación Civil Usina de Justicia.',
      'Art. 2. The Institute, like the Association, has no political or trade-union purposes.',
      "Art. 3. The Institute has the following objectives: 1) To promote studies related to Victimology, victim law, criminality and crime prevention. 2) To develop professional development and training courses to be delivered at public and private, national and international organisations related to the Institute's field of study. 3) To organise and manage agreements, conferences, national and international meetings, conferences, debates and seminars on the scientific issues pertaining to the discipline. 4) To promote scientific awards, subject to approval by the Association's Executive Board and the members of the Institute. 5) To encourage the publication of scientific articles, books, statistics and comparative studies on the discipline. 6) To facilitate collaboration and scientific exchange with national and international victimology and criminology societies, study groups and entities dedicated to the subject.",
      'Art. 4. The Institute has its own website, integrated into the digital ecosystem of Usina de Justicia.',
      'Art. 5. The Institute is composed of a Board of Directors that ensures compliance with the institutional objectives.',
      'Art. 6. The Institute has a Scientific Committee composed of internationally renowned experts to ensure academic excellence.',
    ],
  },
  sections: [
    {
      title: 'Statute',
      body: 'Institutional foundation, founding definitions and objectives of the institute.',
      href: '/instituto/estatuto',
    },
    {
      title: 'Board of Directors',
      body: "Profiles, roles and institutional accountability of IVUJUS's leadership.",
      href: '/instituto/consejo-directivo',
    },
    {
      title: 'Scientific Committee',
      body: 'International experts and academic authority lending comparative legitimacy to the institute.',
      href: '/instituto/comite-cientifico',
    },
  ],
};
