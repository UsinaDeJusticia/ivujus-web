export type InstitutePurpose = {
  title: string;
  body: string;
};

export type InstitutePerson = {
  slug: string;
  name: string;
  role: string;
  country?: string;
  summary: string;
  bio: string;
  image: string;
};

export const institutoData = {
  title: 'Instituto de Victimología de Usina de Justicia',
  intro:
    'El IVUJUS articula investigación, formación, producción editorial y cooperación internacional en torno a la victimología, el derecho victimal y los derechos de las víctimas.',
  purposes: [
    {
      title: 'Estudios e investigación',
      body: 'Impulsar los estudios relacionados con la victimología, el derecho victimal, la criminalidad y la prevención del delito.',
    },
    {
      title: 'Capacitación y cursos',
      body: 'Desarrollar cursos de perfeccionamiento y capacitación para organismos públicos y privados.',
    },
    {
      title: 'Eventos y congresos',
      body: 'Organizar y gestionar convenios, congresos, reuniones nacionales e internacionales y seminarios.',
    },
    {
      title: 'Premios científicos',
      body: 'Incentivar premios científicos, según aprobación de la Comisión Directiva.',
    },
    {
      title: 'Publicaciones',
      body: 'Fomentar la publicación de artículos científicos, libros y estudios comparativos.',
    },
    {
      title: 'Colaboración',
      body: 'Facilitar el intercambio científico con sociedades de victimología nacionales e internacionales.',
    },
  ] satisfies InstitutePurpose[],
  consejoDirectivo: [
    {
      slug: 'maria-jimena-molina',
      name: 'María Jimena Molina',
      role: 'Directora',
      summary: 'Abogada y especialista en derecho penal, ética y políticas públicas con perspectiva de víctima.',
      bio: 'Abogada (UCALP). Magíster en Ética, Filosofía Política y Antropología (TECH, España). Especialista en Derecho Penal (UNLP). Diplomada en Libertad de Expresión y Seguridad de Periodistas (Instituto Bonavero de Derechos Humanos, Universidad de Oxford, UNESCO). Auxiliar Letrado Relator de la Fiscalía del Tribunal de Casación de la Provincia de Buenos Aires.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/12/jimena_molina_profiles.jpg',
    },
    {
      slug: 'diana-cohen-agrest',
      name: 'Diana Cohen Agrest',
      role: 'Directora honoraria',
      summary: 'Doctora en Filosofía y fundadora de Usina de Justicia.',
      bio: 'Doctora en Filosofía (UBA). Fundadora y presidenta de la Asociación Civil Usina de Justicia. Investigadora y docente universitaria, reconocida nacional e internacionalmente por su labor en la protección de las víctimas de delitos.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-14-at-10.33.50.jpeg',
    },
    {
      slug: 'daniel-roggero',
      name: 'Daniel Roggero',
      role: 'Consejero académico',
      summary: 'Abogado, comunicador y autor especializado en derechos humanos de las víctimas.',
      bio: 'Abogado (UBA). Licenciado en Comunicación Social y Psicología Social. Autor del Manual de Derechos Humanos y Garantías de las Personas Víctimas de Delito. Coordinador de diversas audiencias internacionales sobre políticas públicas y futuro.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-14-at-11.41.02.jpeg',
    },
    {
      slug: 'noelia-juarez',
      name: 'Noelia Juárez',
      role: 'Secretaria',
      summary: 'Abogada con especialización en derecho constitucional y administrativo.',
      bio: 'Abogada (UNLaM). Secretaria General de Usina de Justicia. Especialista en Derecho Constitucional y Administrativo. Autora de diversos artículos sobre delincuencia juvenil y régimen migratorio.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/12/noelia_juarez_profiles.jpg',
    },
    {
      slug: 'mariana-romano',
      name: 'Mariana Romano',
      role: 'Relaciones Institucionales',
      summary: 'Abogada y referente en relaciones internacionales judiciales y ciberdelincuencia.',
      bio: 'Abogada (UBA). Representante ante la OEA de Usina de Justicia. Experta en Ciberdelincuencia y Evidencia Digital. Becaria de Georgetown University y experta en Relaciones Internacionales judiciales.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-14-at-10.49.35-1.jpeg',
    },
    {
      slug: 'patricia-borras',
      name: 'Patricia Borras',
      role: 'Tecnología y comunicación',
      summary: 'Licenciada en Sistemas con trayectoria en gestión tecnológica institucional.',
      bio: 'Licenciada en Sistemas (UTN). Ex funcionaria del Consejo de la Magistratura. Especialista en gestión tecnológica y soporte digital institucional.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/12/patricia_borras_profiles.jpg',
    },
    {
      slug: 'jair-castillo',
      name: 'Jair Castillo',
      role: 'Tecnología y comunicación',
      summary: 'Especialista en comunicación digital, desarrollo web e inteligencia artificial.',
      bio: 'Especialista en comunicación digital e Inteligencia Artificial. Desarrollador web y estratega de posicionamiento digital del IVUJUS.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2026/02/jair_ivujus.jpg',
    },
  ] satisfies InstitutePerson[],
  comiteCientifico: [
    {
      slug: 'irvin-waller',
      name: 'Irvin Waller',
      role: 'Canadá',
      country: 'Canadá',
      summary: 'Profesor Emérito de Criminología y autor intelectual de la Declaración de la ONU de 1985 sobre justicia para las víctimas.',
      bio: 'Profesor Emérito de Criminología en la Universidad de Ottawa. Con un Ph.D. de la Universidad de Cambridge, es mundialmente reconocido como el autor de la Declaración sobre los principios fundamentales de justicia para las víctimas de delitos (ONU, 1985). Fue director ejecutivo fundador del Centro Internacional para la Prevención del Delito (CIPC) y ayudó a fundar la Sociedad Mundial de Victimología. Ha asesorado a más de 50 gobiernos, incluyendo a Nelson Mandela en Sudáfrica. Autor de obras fundamentales como "Ciencia y Secretos para Acabar con los Delitos Violentos", su trabajo ha transformado la seguridad pública y los derechos victimales a nivel global.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2026/02/Irvin-Waller_HD.jpeg',
    },
    {
      slug: 'hilda-marchiori',
      name: 'Hilda Marchiori',
      role: 'Argentina',
      country: 'Argentina',
      summary: 'Referente histórica de la victimología en América Latina.',
      bio: 'Ex Profesora de Criminología y del Post-Grado de Victimología (UNC). Miembro de la Sociedad Internacional de Criminología (París) y la World Society of Victimology. Fundadora de la Asociación Argentina de Victimología y autora de más de 40 libros de la especialidad.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/hildam.jpeg',
    },
    {
      slug: 'beatrice-coscas-williams',
      name: 'Beatrice Coscas-Williams',
      role: 'Israel',
      country: 'Israel',
      summary: 'Especialista en participación de víctimas y memoria colectiva.',
      bio: 'Experta en participación de las víctimas en sistemas de justicia penal y memoria colectiva. Preside el grupo de trabajo de victimología de la Sociedad Europea de Criminología. Su investigación se enfoca en procesos legales culturalmente informados y resolución de conflictos.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/beatrice.jpeg',
    },
    {
      slug: 'marcelo-aebi',
      name: 'Marcelo Aebi',
      role: 'Argentina-Suiza',
      country: 'Argentina-Suiza',
      summary: 'Catedrático de Criminología y responsable de las estadísticas SPACE del Consejo de Europa.',
      bio: 'Responsable de las Estadísticas Penales Anuales del Consejo de Europa (SPACE) y secretario ejecutivo de la Sociedad Europea de Criminología. Autor de más de 150 publicaciones científicas sobre prisiones, delincuencia juvenil y metodología criminológica.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/marcelo-aebi.jpg',
    },
    {
      slug: 'maria-de-la-luz-lima-malvido',
      name: 'María de la Luz Lima Malvido',
      role: 'México',
      country: 'México',
      summary: 'Jurista y referente regional en asistencia a víctimas y violencia familiar.',
      bio: 'Ex Fiscal de Delitos Sexuales y Subprocuradora de la República Mexicana. Presidenta honoraria de la Sociedad Mexicana de Victimología. Ha liderado estándares internacionales sobre asistencia a víctimas y violencia familiar en las Naciones Unidas.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/Maria-de-la-Luz-Lima-Malvido-229x285-1.png',
    },
    {
      slug: 'dario-solis-garcia',
      name: 'Darío Solís García',
      role: 'Panamá',
      country: 'Panamá',
      summary: 'Especialista en sistema penal acusatorio, victimología y derechos humanos.',
      bio: 'Especialista en Sistema Penal Acusatorio con formación en Panamá y Europa. Colaborador activo de la Sociedad Vasca de Victimología y la World Society of Victimology. Ha gestionado proyectos de intercambio científico con Usina de Justicia.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/dario.jpeg',
    },
    {
      slug: 'catherine-rossi',
      name: 'Catherine Rossi',
      role: 'Canadá',
      country: 'Canadá',
      summary: 'Investigadora en violencia, justicia y asistencia a víctimas.',
      bio: "Directora del Equipo de Investigación 'Violencia-Justicia'. Especialista en violencia íntima y familiar, preside el Centro de Asistencia contra la Agresión Sexual de Quebec y es miembro del Colegio de Criminólogos de Quebec.",
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/catherine.jpeg',
    },
    {
      slug: 'pierre-marie-seve',
      name: 'Pierre-Marie Sève',
      role: 'Francia',
      country: 'Francia',
      summary: 'Jurista y director del Institut pour la Justice.',
      bio: 'Lidera un influyente think tank francés dedicado a la reforma del sistema de justicia penal. Experto en transparencia ciudadana y combate a la corrupción, con una presencia regular en medios de comunicación europeos.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/pierre.jpeg',
    },
  ] satisfies InstitutePerson[],
  estatuto: {
    heading: 'Denominación, sede, objetivos y conformación',
    articles: [
      'Art. 1. Se constituye el Instituto de Victimología de Usina de Justicia (en adelante IVUJUS), cuya sede es la misma de la Asociación Civil Usina de Justicia.',
      'Art. 2. El Instituto, al igual que la Asociación no poseen fines políticos ni sindicales.',
      'Art. 3. El Instituto posee las siguientes finalidades: 1) Impulsar los estudios relacionados con la Victimología, el derecho victimal, la criminalidad y la prevención del delito. 2) Desarrollar cursos de perfeccionamiento y capacitación para ser brindados en organismos públicos y privados, nacionales e internacionales relacionados con el campo de estudio del Instituto. 3) Organizar y gestionar convenios, congresos, reuniones nacionales e internacionales, conferencias, debates y seminarios sobre la problemática científica atinente a la disciplina. 4) Incentivar premios científicos, según aprobación de la Comisión Directiva de la Asociación y de los integrantes del Instituto. 5) Fomentar la publicación de artículos científicos, libros, estadísticas y estudios comparativos sobre la disciplina. 6) Facilitar la colaboración e intercambio científico con sociedades de victimología y criminología nacionales e internacionales, grupos de estudio y entidades abocadas a la temática.',
      'Art. 4. El Instituto dispone de un sitio web propio integrado en el ecosistema digital de Usina de Justicia.',
      'Art. 5. El Instituto está conformado por un Consejo Directivo que vela por el cumplimiento de los objetivos institucionales.',
      'Art. 6. El Instituto cuenta con un Comité Científico integrado por expertos internacionales de renombre para garantizar la excelencia académica.',
    ],
  },
  sections: [
    {
      title: 'Estatuto',
      body: 'Base institucional, definiciones fundacionales y objetivos del instituto.',
      href: '/instituto/estatuto',
    },
    {
      title: 'Consejo directivo',
      body: 'Perfiles, cargos y trazabilidad institucional de la conducción del IVUJUS.',
      href: '/instituto/consejo-directivo',
    },
    {
      title: 'Comité científico',
      body: 'Referentes internacionales y autoridad académica para la legitimidad comparada del instituto.',
      href: '/instituto/comite-cientifico',
    },
  ],
};
