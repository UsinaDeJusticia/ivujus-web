// English translation of the Formación dataset (hub, Diploma Programme and
// the debate-series / conference-day archive). Follows
// docs/GLOSARIO-TRADUCCION.md: nothing here is summarised or expanded
// compared to es.ts; slugs, URLs, video URLs, speaker names and technical
// fields are copied verbatim from es.ts, never retyped by hand.
//
// Terminology notes specific to this file (see final report for the ones
// flagged as open questions rather than decided unilaterally):
// - "Diplomatura en Victimología y leyes de víctimas" uses the glossary's
//   fixed translation (§5): "Diploma Programme in Victimology and Victims'
//   Rights Legislation".
// - "Ley de Derechos y Garantías de las Personas Víctimas de Delitos N.º
//   27.372" is the official name of an Argentine law (§6, "nombres de leyes
//   argentinas por su denominación oficial"): kept in Spanish, unaltered,
//   in the Fuerzas de Seguridad entry.
// - "Ley de Salud Mental" in the ciclo-ley-salud-mental-2021 entry is used
//   thematically, not as the law's official denomination (no number given),
//   so it is translated descriptively ("Mental Health Law"), per the
//   "Ley de Datos Genéticos" example in §5 quater.
// - "Secretaria Letrada" (Flora Acselrad) has no clean one-word English
//   equivalent: translated descriptively with the Spanish original in
//   parentheses at first appearance (§5 ter).
// - University/institution proper names without an established acronym in
//   the glossary whitelist (Universidad de Buenos Aires, Universidad
//   Nacional de Asunción, Universidad Argentina de la Empresa, Universidad
//   Privada UdeMM, Asociación Civil Usina de Justicia) are kept as written
//   in Spanish, by extension of the same rule that protects UBA/UADE/UdeMM;
//   only their surrounding descriptive words are translated.

import { CAMPUS_VIRTUAL_URL, DIPLOMATURA_PROGRAMA_PDF_URL } from './constants';
import type { Ciclo, Diplomatura, FormacionContent, FormacionHub } from './types';

const diplomaturaData: Diplomatura = {
  titulo: 'Diploma Programme in Victimology and Victims’ Rights Legislation',
  nombreHistorico: 'Victims’ Rights Legislation within the Framework of Victimology',
  descripcion:
    'Our professional training programme is designed so that participants acquire thorough knowledge of the victims’ laws currently in force in the country, as well as the international legislation that protects the human rights of victims, within the context of Victimology, a scientific discipline in constant evolution.',
  metricas: {
    inscriptos: 500,
    certificados: 500,
    valoracion: '9.7 out of 10',
  },
  resenas: [
    'I liked it a lot, and I finished it in a short time because I really got hooked on the subject matter.',
    'I liked the practicality with which these such complicated and difficult topics are taught.',
    'Keep it up. Excellent course and excellent material provided. I loved it.',
    'The subject matter: it’s the first time I’ve seen a course that talks about the rights of the victim.',
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
    titulo: 'Conference Day "Towards a Scientific Law": Qualitative Measurement in the Age of the Algorithm',
    fecha: 'November 2025',
    resumen:
      'Conference day organised by the Institute of Victimology of Usina de Justicia (IVUJUS) in the Auditorium Hall of the Public Bar Association of the City of Buenos Aires (CPACF), opened by the President of Usina de Justicia, Dr Diana Cohen Agrest. During the event, the country’s first index using artificial intelligence to assess the quality of laws from a victim-centred perspective was formally presented. Advisor Dr Jimena de la Torre spoke on the National Council of Magistracy and AI, and Dr Flora Acselrad, Legal Secretary (Secretaria Letrada) of the Supreme Court of Justice of the Nation, spoke on the challenges and opportunities of AI for human rights. The closing remarks were given by Dr Daniel Roggero.',
    oradores: ['Diana Cohen Agrest', 'Jimena de la Torre', 'Flora Acselrad', 'Daniel Roggero'],
    fuente: 'migracion_usina',
    source_wp_id: [22365, 22362],
    source_url:
      'https://usinadejusticia.org.ar/2025/11/12/%e2%9a%96%ef%b8%8f%f0%9f%92%bb-asi-vivimos-la-jornada-hacia-un-derecho-cientifico-en-el-cpacf/',
  },
  {
    slug: 'encuentro-una-paraguay-2024',
    titulo: 'Meeting with the Universidad Nacional de Asunción on Training in Victimology',
    fecha: '1 July 2024',
    resumen:
      'Meeting at the Universidad Nacional de Asunción (Paraguay) to discuss training in Victimology, with Dean Miryam Peña Candia, Cabinet Director Lorena Alvarenga, Director of International Affairs Inés Martínez Valinotti, Agreements Officer Janice Goldenberg, and Student and Faculty Mobility Officer Sara Bogarin.',
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
    titulo: 'Training on Crime Victims — Public Bar Association of the City of Buenos Aires',
    fecha: '16 March to 21 September 2023',
    resumen:
      'Course on victims taught at the Public Bar Association of the City of Buenos Aires (CPACF), free, open enrolment and virtual, under an agreement with Usina de Justicia. The opening on 16 March was given by Diana Cohen Agrest, introduced by Mariana Romano, with more than 150 people enrolled; the last conference day was held on 21 September. Daniel Roggero, Luis Cevasco, Raquel Slotolow, Fernando Soto, Ricardo Risso, Javier Pascua, Guillermo Bargna, Mónica Rodríguez and Andy Blake actively took part in teaching it.',
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
    titulo: 'Training Programme on Crime Victims — UADE',
    fecha: '13 April to 4 May 2023',
    resumen:
      'The country’s first university programme on crime victims, taught by the Asociación Civil Usina de Justicia together with the Facultad de Ciencias Jurídicas y Sociales of the Universidad Argentina de la Empresa (UADE). In person and free of charge, coordinated by lawyer Daniel Roggero, it was taught over four consecutive Thursdays, from 13 April to 4 May 2023, from 15:00 to 18:00.',
    oradores: ['Daniel Roggero'],
    fuente: 'migracion_usina',
    source_wp_id: [17322, 17918, 18399],
    source_url:
      'https://usinadejusticia.org.ar/2023/04/08/nota-en-infobae-se-lanzo-por-primera-vez-en-el-pais-un-programa-universitario-de-capacitacion-en-victimas-de-delitos/',
  },
  {
    slug: 'lanzamiento-campus-virtual-2023',
    titulo: 'Launch of the Usina de Justicia Virtual Campus',
    fecha: '1 July 2023',
    resumen:
      'Usina de Justicia launched its Virtual Campus on 1 July 2023, with the course "Victims’ Rights Legislation within the Framework of Victimology" aimed at professionals from partner agencies under agreement (the Attorney General’s Offices of Corrientes, Chubut, Entre Ríos, La Rioja, Mendoza, San Luis, Santa Fe, Santiago del Estero, Catamarca and Río Negro) and at individual professionals through independent enrolment. Public Prosecutor’s Offices, other related bodies and individual professionals joined the training.',
    fuente: 'migracion_usina',
    source_wp_id: [19478, 19657],
    source_url: 'https://usinadejusticia.org.ar/2023/07/01/usina-de-justicia-lanzo-su-nuevo-campus-virtual/',
  },
  {
    slug: 'clases-uba-derechos-victimas-2019',
    titulo: 'Classes on Victims’ Rights — Faculty of Law (UBA)',
    fecha: '30 October 2019',
    resumen:
      'Usina de Justicia gave classes on Victims’ Rights within the Professional Practice programme of the Facultad de Derecho of the Universidad de Buenos Aires (UBA), in coordination with the Undersecretariat of Justice of the Government of the City of Buenos Aires.',
    fuente: 'migracion_usina',
    source_wp_id: 8888,
    source_url: 'https://usinadejusticia.org.ar/2019/10/30/uj-dicto-clases-en-la-facultad-de-derecho-uba/',
  },
  {
    slug: 'capacitacion-subsecretaria-justicia-caba-2019',
    titulo: 'Training on Victims — Undersecretariat of Justice of CABA',
    fecha: '3 October 2019',
    resumen:
      'Members of Usina de Justicia took part in the presentation of the City’s Victim Advocate and in training on victim-related matters, organised by the Undersecretariat of Justice of CABA, headed by Dr Hernán Najenson, in the neighbourhood of Recoleta.',
    fuente: 'migracion_usina',
    source_wp_id: 8884,
    source_url:
      'https://usinadejusticia.org.ar/2019/10/03/uj-estuvo-presente-en-la-capacitacion-de-victimas-de-la-subsecretaria-de-justicia-caba/',
  },
  {
    slug: 'jornada-dialogando-ba-2019',
    titulo: 'Conference Day "Dialogando BA: Victim Protection" — Faculty of Law (UBA)',
    fecha: '7 March 2019',
    resumen:
      'Conference day held in the Salón Azul of the Facultad de Derecho of the Universidad de Buenos Aires to reflect on the actions and measures needed to promote, protect and guarantee the rights and safety of residents. Participants included Undersecretary of Justice Hernán Najenson, Undersecretary of Political Reform and Legislative Affairs Hernán Charosky, Secretary of Justice and Security Marcelo D’Alessandro, City Minister of Security and Justice Diego Santilli, Attorney General Luis Cevasco, Dean of the Facultad de Derecho of the UBA Alberto Bueres, and National Secretary of Justice Santiago Otamendi. Speaking for Usina de Justicia was Donata Chesi and, for Fundación VEI, Lilia del Valle Saavedra, both relatives of victims of violence. Legislator Ariel Álvarez Palma acted as moderator.',
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
    titulo: 'Training for National Security Forces',
    fecha: '8 November 2017',
    resumen:
      'The Asociación Civil Usina de Justicia and the Ministry of National Security held a training session for agents and officials of the Argentine Federal Police, the Argentine Naval Prefecture, the Argentine National Gendarmerie and the Airport Security Police, in the Auditorium of the Ministry of National Security. The goal was to raise awareness among federal security forces about socio-legal support for relatives of homicide victims, under Argentina’s Ley de Derechos y Garantías de las Personas Víctimas de Delitos (N.º 27.372). The training took an interdisciplinary approach (legal, emotional and psychological), led by Daniel Roggero, Diana Cohen Agrest and Marcela Dal Verme, with testimonies from relatives of victims: Raquel Berthi, Karina Massa and Eduardo Tonello.',
    oradores: ['Daniel Roggero', 'Diana Cohen Agrest', 'Marcela Dal Verme'],
    fuente: 'migracion_usina',
    source_wp_id: 9877,
    source_url: 'https://usinadejusticia.org.ar/2017/11/08/ministerio-seguridad-la-nacion-capacitacion-fuerzas-seguridad/',
  },
  {
    slug: 'seminario-udemm-2016',
    titulo: 'Seminar "Security and Justice" — UdeMM',
    fecha: '5 April 2016',
    resumen:
      'Seminar "Security and Justice" proposed and coordinated by Prof. Ester Ruth Tuchsznaider at the Universidad Privada UdeMM, opened by its rector, Norberto Fraga, with the participation of the programme director, Ignacio Rebaudi. The seminar addressed legal regulations, case law rulings, various theories on punishment, garantismo and impunity, the shortcomings of the criminal procedural system, reform proposals and the sentence-enforcement regime, with special attention to the role of the victim and access to justice.',
    fuente: 'migracion_usina',
    source_wp_id: 9998,
    source_url: 'https://usinadejusticia.org.ar/2016/05/05/seminario-en-la-udemm/',
  },
  {
    slug: 'ciclo-ley-salud-mental-2021',
    titulo: 'Usina Debate Series: Mental Health Law — The Dismantling of Citizen Protection',
    fecha: '1 and 9 September 2021',
    resumen:
      'Debate series on the Mental Health Law organised by Usina de Justicia, with two recorded sessions (1 and 9 September 2021) and a downloadable reference dossier. The source does not allow determining with certainty which panel corresponds to which of the two dates, so they are listed separately without an individual date.',
    sesiones: [
      { oradores: ['Marcela Dal Verme', 'Ricardo Risso', 'Andrés Mega'], video_url: 'https://youtu.be/tr77UQi5Doc' },
      { oradores: ['André S. Blake', 'Gabriela Casas'], video_url: 'https://youtu.be/A5F0XAFFIzE' },
    ],
    dossier: {
      titulo: 'Mental Health Dossier',
      url: 'https://ivujus.org.ar/wp-content/uploads/2023/07/Dossier-Salud-Mental.pdf',
    },
    fuente: 'migracion_wp',
    source_wp_id: 21399,
    source_url: 'https://ivujus.org.ar/capacitacion-y-actividades/',
  },
  {
    slug: 'ciclo-juicio-por-jurados-2021',
    titulo: 'Usina Debate Series: Trial by Jury',
    fecha: '3 May 2021',
    resumen:
      'Debate series on trial by jury organised by Usina de Justicia, with the participation of Luis Cevasco, Andrés Harfuch and Francisco Pascua. It includes a joint academic publication by the Asociación Civil Usina de Justicia and the Instituto de Altos Estudios de Derecho de la Provincia de Mendoza on the constitutionality of life imprisonment.',
    oradores: ['Luis Cevasco', 'Andrés Harfuch', 'Francisco Pascua'],
    video_url: 'https://youtu.be/2MlqecC0tv8',
    dossier: {
      titulo: 'Academic publication: the constitutionality of life imprisonment',
      url: 'https://ivujus.org.ar/wp-content/uploads/2023/07/prision-perpetua.pdf',
    },
    fuente: 'migracion_wp',
    source_wp_id: 21399,
    source_url: 'https://ivujus.org.ar/capacitacion-y-actividades/',
  },
];

const formacionHubData: FormacionHub = {
  title: 'Training',
  intro:
    'The Institute’s function is to develop training, continuing education and professional development activities on the comprehensive study of the victim, the victimization process, and institutional and social responses to crime. Through Criminal Victimology, it seeks to make visible the victim’s role within the justice system, promoting public policies that stop treating the victim as an item of evidence and instead recognise them as a rights-holder.',
  sections: [
    {
      title: 'Diploma Programme in Victimology and Victims’ Rights Legislation',
      body: 'Postgraduate training through the Virtual Campus, with a downloadable syllabus and direct access to enrolment.',
      href: '/formacion/diplomatura',
    },
    {
      title: 'Debate Series and Conference Days',
      body: 'Archive of the Institute’s debate series, conference days and training activities, with videos and dossiers where available.',
      href: '/formacion/ciclos',
    },
  ],
};

export const content: FormacionContent = {
  hub: formacionHubData,
  diplomatura: diplomaturaData,
  ciclos: ciclosData,
};
