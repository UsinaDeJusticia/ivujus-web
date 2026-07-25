// Traduction française du dataset Formación (hub, Diplôme et archive des
// cycles de débats / journées). Suit docs/GLOSARIO-TRADUCCION.md : rien
// n'est ici résumé ni amplifié par rapport à es.ts ; slugs, URL, URL de
// vidéo, noms d'intervenants et champs techniques sont copiés tels quels
// depuis es.ts, jamais retapés à la main.
//
// Notes de terminologie propres à ce fichier (voir le rapport final pour
// celles signalées comme questions ouvertes plutôt que tranchées seule) :
// - « Diplomatura en Victimología y leyes de víctimas » utilise la
//   traduction fixe du glossaire (§5) : « Diplôme en victimologie et droit
//   des victimes ».
// - « Ley de Derechos y Garantías de las Personas Víctimas de Delitos N.º
//   27.372 » est la dénomination officielle d'une loi argentine (§6,
//   « nombres de leyes argentinas por su denominación oficial ») : conservée
//   en espagnol, inchangée, dans l'entrée Fuerzas de Seguridad.
// - « Ley de Salud Mental » dans l'entrée ciclo-ley-salud-mental-2021 est
//   utilisée de façon thématique, pas comme dénomination officielle (aucun
//   numéro de loi cité), donc traduite de façon descriptive (« loi sur la
//   santé mentale »), suivant l'exemple « Ley de Datos Genéticos » du §5
//   quater.
// - « Secretaria Letrada » (Flora Acselrad) n'a pas d'équivalent français en
//   un mot : traduit de façon descriptive avec l'original espagnol entre
//   parenthèses à la première apparition (§5 ter).
// - Les noms propres d'universités/institutions sans sigle répertorié dans
//   la liste blanche du glossaire (Universidad de Buenos Aires, Universidad
//   Nacional de Asunción, Universidad Argentina de la Empresa, Universidad
//   Privada UdeMM, Asociación Civil Usina de Justicia) restent tels quels en
//   espagnol, par extension de la même règle qui protège UBA/UADE/UdeMM ;
//   seuls les mots descriptifs qui les entourent sont traduits.

import { CAMPUS_VIRTUAL_URL, DIPLOMATURA_PROGRAMA_PDF_URL } from './constants';
import type { Ciclo, Diplomatura, FormacionContent, FormacionHub } from './types';

const diplomaturaData: Diplomatura = {
  titulo: 'Diplôme en victimologie et droit des victimes',
  nombreHistorico: 'Le droit des victimes dans le cadre de la victimologie',
  descripcion:
    'Notre offre de formation professionnelle vise à ce que la personne inscrite acquière une connaissance approfondie des lois relatives aux victimes en vigueur à ce jour dans le pays, ainsi que de la législation internationale qui protège les droits humains des victimes, dans le cadre de la Victimologie, une discipline scientifique en constante évolution.',
  metricas: {
    inscriptos: 500,
    certificados: 500,
    valoracion: '9,7 sur 10',
  },
  resenas: [
    'Cela m’a beaucoup plu, et je l’ai terminé en peu de temps, car le sujet m’a vraiment passionné.',
    'J’ai aimé le côté pratique avec lequel ces sujets si compliqués et difficiles sont enseignés.',
    'Continuez ainsi. Excellent cours et excellent matériel fourni. J’ai adoré.',
    'Le sujet : c’est la première fois que je vois un cours qui parle des droits de la victime.',
  ],
  programaPdfUrl: DIPLOMATURA_PROGRAMA_PDF_URL,
  campusUrl: CAMPUS_VIRTUAL_URL,
  fuente: 'migracion_wp',
  source_wp_id: 24055,
  source_url: 'https://ivujus.org.ar/campus-virtual/',
};

const ciclosData: Ciclo[] = [
  {
    slug: 'jornada-cpacf-derecho-cientifico-2025',
    titulo: 'Journée « Vers un droit scientifique » : mesure qualitative à l’ère de l’algorithme',
    fecha: 'Novembre 2025',
    resumen:
      'Journée organisée par l’Institut de Victimologie d’Usina de Justicia (IVUJUS) dans la Salle Auditorium du Collège public des avocats de la Capitale fédérale (CPACF), ouverte par la présidente d’Usina de Justicia, la Dre Diana Cohen Agrest. Au cours de la rencontre a été présenté officiellement le premier indice du pays utilisant l’intelligence artificielle pour évaluer la qualité des lois dans une perspective centrée sur la victime. Sont intervenues la conseillère, la Dre Jimena de la Torre, sur le Conseil de la magistrature de la Nation et l’IA, et la Dre Flora Acselrad, secrétaire juridique (Secretaria Letrada) de la Cour suprême de justice de la Nation, sur les défis et opportunités de l’IA pour les droits humains. La clôture a été assurée par le Dr Daniel Roggero.',
    oradores: ['Diana Cohen Agrest', 'Jimena de la Torre', 'Flora Acselrad', 'Daniel Roggero'],
    fuente: 'migracion_usina',
    source_wp_id: [22365, 22362],
    source_url:
      'https://usinadejusticia.org.ar/2025/11/12/%e2%9a%96%ef%b8%8f%f0%9f%92%bb-asi-vivimos-la-jornada-hacia-un-derecho-cientifico-en-el-cpacf/',
  },
  {
    slug: 'encuentro-una-paraguay-2024',
    titulo: 'Rencontre avec l’Universidad Nacional de Asunción sur la formation en victimologie',
    fecha: '1er juillet 2024',
    resumen:
      'Rencontre à l’Universidad Nacional de Asunción (Paraguay) pour échanger sur la formation en victimologie, avec la doyenne Miryam Peña Candia, la directrice de cabinet Lorena Alvarenga, la directrice des Affaires internationales Inés Martínez Valinotti, la responsable des Conventions Janice Goldenberg et la responsable de la Mobilité étudiante et enseignante Sara Bogarin.',
    oradores: [
      'Miryam Peña Candia',
      'Lorena Alvarenga',
      'Inés Martínez Valinotti',
      'Janice Goldenberg',
      'Sara Bogarin',
    ],
    fuente: 'migracion_usina',
    source_wp_id: 21108,
    source_url:
      'https://usinadejusticia.org.ar/2024/07/01/encuentro-con-la-universidad-nacional-de-asuncion-para-conversar-sobre-la-formacion-en-victimologia/',
  },
  {
    slug: 'capacitacion-victimas-cpacf-2023',
    titulo: 'Formation sur les victimes d’infractions — Collège public des avocats de la Capitale fédérale',
    fecha: '16 mars au 21 septembre 2023',
    resumen:
      'Cours sur les victimes dispensé au Collège public des avocats de la Capitale fédérale (CPACF), gratuit, en accès libre et en ligne, dans le cadre d’une convention avec Usina de Justicia. L’ouverture du 16 mars a été assurée par Diana Cohen Agrest, présentée par Mariana Romano, avec plus de 150 personnes inscrites ; la dernière journée a eu lieu le 21 septembre. Ont activement participé à l’enseignement Daniel Roggero, Luis Cevasco, Raquel Slotolow, Fernando Soto, Ricardo Risso, Javier Pascua, Guillermo Bargna, Mónica Rodríguez et Andy Blake.',
    oradores: [
      'Diana Cohen Agrest',
      'Mariana Romano',
      'Daniel Roggero',
      'Luis Cevasco',
      'Raquel Slotolow',
      'Fernando Soto',
      'Ricardo Risso',
      'Javier Pascua',
      'Guillermo Bargna',
      'Mónica Rodríguez',
      'Andy Blake',
    ],
    fuente: 'migracion_usina',
    source_wp_id: [17210, 17243, 18724, 19693],
    source_url:
      'https://usinadejusticia.org.ar/2023/09/21/hoy-ultima-jornada-donde-usina-de-justicia-participa-activamente-en-el-dictado-del-curso-sobre-victimas-en-el-colegio-publico-de-abogados-de-la-capital-federal-cpacf/',
  },
  {
    slug: 'capacitacion-victimas-uade-2023',
    titulo: 'Programme de formation sur les victimes d’infractions — UADE',
    fecha: '13 avril au 4 mai 2023',
    resumen:
      'Premier programme universitaire du pays sur les victimes d’infractions, dispensé par l’Asociación Civil Usina de Justicia avec la Facultad de Ciencias Jurídicas y Sociales de la Universidad Argentina de la Empresa (UADE). En présentiel et gratuit, coordonné par l’avocat Daniel Roggero, il a été dispensé pendant quatre jeudis consécutifs, du 13 avril au 4 mai 2023, de 15h à 18h.',
    oradores: ['Daniel Roggero'],
    fuente: 'migracion_usina',
    source_wp_id: [17322, 17918, 18399],
    source_url:
      'https://usinadejusticia.org.ar/2023/04/08/nota-en-infobae-se-lanzo-por-primera-vez-en-el-pais-un-programa-universitario-de-capacitacion-en-victimas-de-delitos/',
  },
  {
    slug: 'lanzamiento-campus-virtual-2023',
    titulo: 'Lancement du Campus virtuel d’Usina de Justicia',
    fecha: '1er juillet 2023',
    resumen:
      'Usina de Justicia a lancé son Campus virtuel le 1er juillet 2023, avec le cours « Le droit des victimes dans le cadre de la victimologie » destiné aux professionnels d’organismes conventionnés (les parquets généraux de Corrientes, Chubut, Entre Ríos, La Rioja, Mendoza, San Luis, Santa Fe, Santiago del Estero, Catamarca et Río Negro) et aux professionnels à titre individuel sur inscription indépendante. Des ministères publics, d’autres entités apparentées et des professionnels à titre individuel ont rejoint la formation.',
    fuente: 'migracion_usina',
    source_wp_id: [19478, 19657],
    source_url: 'https://usinadejusticia.org.ar/2023/07/01/usina-de-justicia-lanzo-su-nuevo-campus-virtual/',
  },
  {
    slug: 'clases-uba-derechos-victimas-2019',
    titulo: 'Cours sur les droits des victimes — Faculté de droit (UBA)',
    fecha: '30 octobre 2019',
    resumen:
      'Usina de Justicia a donné des cours sur les droits des victimes dans le cadre des Pratiques professionnelles de la Facultad de Derecho de la Universidad de Buenos Aires (UBA), en coordination avec le Secrétariat adjoint à la Justice du Gouvernement de la Ville de Buenos Aires.',
    fuente: 'migracion_usina',
    source_wp_id: 8888,
    source_url: 'https://usinadejusticia.org.ar/2019/10/30/uj-dicto-clases-en-la-facultad-de-derecho-uba/',
  },
  {
    slug: 'capacitacion-subsecretaria-justicia-caba-2019',
    titulo: 'Formation sur les victimes — Secrétariat adjoint à la Justice de la CABA',
    fecha: '3 octobre 2019',
    resumen:
      'Des membres d’Usina de Justicia ont participé à la présentation du défenseur des victimes de la Ville et à une formation sur les questions relatives aux victimes, organisée par le Secrétariat adjoint à la Justice de la CABA, dirigé par le Dr Hernán Najenson, dans le quartier de Recoleta.',
    fuente: 'migracion_usina',
    source_wp_id: 8884,
    source_url:
      'https://usinadejusticia.org.ar/2019/10/03/uj-estuvo-presente-en-la-capacitacion-de-victimas-de-la-subsecretaria-de-justicia-caba/',
  },
  {
    slug: 'jornada-dialogando-ba-2019',
    titulo: 'Journée « Dialogando BA : protection des victimes » — Faculté de droit (UBA)',
    fecha: '7 mars 2019',
    resumen:
      'Journée organisée dans le Salón Azul de la Facultad de Derecho de la Universidad de Buenos Aires pour réfléchir aux actions et mesures nécessaires pour promouvoir, protéger et garantir les droits et la sécurité des riverains. Ont participé le secrétaire adjoint à la Justice Hernán Najenson, le secrétaire adjoint à la Réforme politique et aux Affaires législatives Hernán Charosky, le secrétaire à la Justice et à la Sécurité Marcelo D’Alessandro, le ministre de la Sécurité et de la Justice de la Ville Diego Santilli, le procureur général Luis Cevasco, le doyen de la Facultad de Derecho de l’UBA Alberto Bueres et le secrétaire à la Justice de la Nation Santiago Otamendi. Pour Usina de Justicia sont intervenues Donata Chesi et, pour la Fundación VEI, Lilia del Valle Saavedra, toutes deux proches de victimes de violence. Le législateur Ariel Álvarez Palma a assuré la modération.',
    oradores: [
      'Hernán Najenson',
      'Hernán Charosky',
      'Marcelo D’Alessandro',
      'Diego Santilli',
      'Luis Cevasco',
      'Alberto Bueres',
      'Santiago Otamendi',
      'Donata Chesi',
      'Lilia del Valle Saavedra',
      'Ariel Álvarez Palma',
    ],
    fuente: 'migracion_usina',
    source_wp_id: 9818,
    source_url:
      'https://usinadejusticia.org.ar/2019/03/07/participamos-en-la-jornada-dialogando-ba-proteccion-de-victimas-en-la-facultad-de-derecho-de-la-universidad-de-buenos-aires/',
  },
  {
    slug: 'capacitacion-fuerzas-seguridad-nacion-2017',
    titulo: 'Formation destinée aux forces de sécurité de la Nation',
    fecha: '8 novembre 2017',
    resumen:
      'L’Asociación Civil Usina de Justicia et le ministère de la Sécurité de la Nation ont organisé une formation destinée aux agents et fonctionnaires de la Police fédérale argentine, de la Préfecture navale argentine, de la Gendarmerie nationale argentine et de la Police de sécurité aéroportuaire, dans l’Auditorium du ministère de la Sécurité de la Nation. L’objectif était de sensibiliser les forces de sécurité fédérales à l’accompagnement socio-juridique des proches de victimes d’homicides, dans le cadre de la loi argentine Ley de Derechos y Garantías de las Personas Víctimas de Delitos (n° 27.372). La formation a adopté une approche interdisciplinaire (juridique, émotionnelle et psychologique), assurée par Daniel Roggero, Diana Cohen Agrest et Marcela Dal Verme, avec des témoignages de proches de victimes : Raquel Berthi, Karina Massa et Eduardo Tonello.',
    oradores: ['Daniel Roggero', 'Diana Cohen Agrest', 'Marcela Dal Verme'],
    fuente: 'migracion_usina',
    source_wp_id: 9877,
    source_url: 'https://usinadejusticia.org.ar/2017/11/08/ministerio-seguridad-la-nacion-capacitacion-fuerzas-seguridad/',
  },
  {
    slug: 'seminario-udemm-2016',
    titulo: 'Séminaire « Sécurité et justice » — UdeMM',
    fecha: '5 avril 2016',
    resumen:
      'Séminaire « Sécurité et justice » proposé et coordonné par la Pr Ester Ruth Tuchsznaider à l’Universidad Privada UdeMM, ouvert par son recteur, Norberto Fraga, avec la participation du directeur de la filière, Ignacio Rebaudi. Ont été abordés la réglementation légale, les décisions jurisprudentielles, différentes théories sur la peine, le garantisme et l’impunité, les lacunes du système de procédure pénale, les propositions de réforme et le régime d’exécution des peines, avec une attention particulière portée au rôle de la victime et à l’accès à la justice.',
    fuente: 'migracion_usina',
    source_wp_id: 9998,
    source_url: 'https://usinadejusticia.org.ar/2016/05/05/seminario-en-la-udemm/',
  },
  {
    slug: 'ciclo-ley-salud-mental-2021',
    titulo: 'Cycle Usina Debate : loi sur la santé mentale — Le démantèlement de la protection citoyenne',
    fecha: '1er et 9 septembre 2021',
    resumen:
      'Cycle de débats sur la loi sur la santé mentale organisé par Usina de Justicia, avec deux sessions enregistrées (1er et 9 septembre 2021) et un dossier de référence téléchargeable. La source ne permet pas de déterminer avec certitude quel panel correspond à laquelle des deux dates ; elles sont donc présentées séparément sans date individuelle.',
    sesiones: [
      { oradores: ['Marcela Dal Verme', 'Ricardo Risso', 'Andrés Mega'], video_url: 'https://youtu.be/tr77UQi5Doc' },
      { oradores: ['André S. Blake', 'Gabriela Casas'], video_url: 'https://youtu.be/A5F0XAFFIzE' },
    ],
    dossier: {
      titulo: 'Dossier sur la santé mentale',
      url: 'https://ivujus.org.ar/wp-content/uploads/2023/07/Dossier-Salud-Mental.pdf',
    },
    fuente: 'migracion_wp',
    source_wp_id: 21399,
    source_url: 'https://ivujus.org.ar/capacitacion-y-actividades/',
  },
  {
    slug: 'ciclo-juicio-por-jurados-2021',
    titulo: 'Cycle Usina Debate : procès devant jury',
    fecha: '3 mai 2021',
    resumen:
      'Cycle de débats sur le procès devant jury organisé par Usina de Justicia, avec la participation de Luis Cevasco, Andrés Harfuch et Francisco Pascua. Il comprend une publication académique conjointe de l’Asociación Civil Usina de Justicia et de l’Instituto de Altos Estudios de Derecho de la Provincia de Mendoza sur la constitutionnalité de la réclusion à perpétuité.',
    oradores: ['Luis Cevasco', 'Andrés Harfuch', 'Francisco Pascua'],
    video_url: 'https://youtu.be/2MlqecC0tv8',
    dossier: {
      titulo: 'Publication académique : la constitutionnalité de la réclusion à perpétuité',
      url: 'https://ivujus.org.ar/wp-content/uploads/2023/07/prision-perpetua.pdf',
    },
    fuente: 'migracion_wp',
    source_wp_id: 21399,
    source_url: 'https://ivujus.org.ar/capacitacion-y-actividades/',
  },
];

const formacionHubData: FormacionHub = {
  title: 'Formation',
  intro:
    'L’institut a pour fonction de développer des instances de formation, de mise à niveau et de perfectionnement sur l’étude intégrale de la victime, le processus de victimisation et les réponses institutionnelles et sociales face au délit. À travers la Victimologie pénale, il s’agit de rendre visible le rôle de la victime dans le système de justice, en promouvant des politiques publiques qui cessent de la considérer comme un objet de preuve pour la reconnaître comme un sujet de droits.',
  sections: [
    {
      title: 'Diplôme en victimologie et droit des victimes',
      body: 'Formation de troisième cycle dispensée via le Campus virtuel, avec programme téléchargeable et accès direct à l’inscription.',
      href: '/formacion/diplomatura',
    },
    {
      title: 'Cycles de débats et journées',
      body: 'Archive des cycles de débats, journées et formations de l’Institut, avec vidéos et dossiers lorsqu’ils sont disponibles.',
      href: '/formacion/ciclos',
    },
  ],
};

export const content: FormacionContent = {
  hub: formacionHubData,
  diplomatura: diplomaturaData,
  ciclos: ciclosData,
};
