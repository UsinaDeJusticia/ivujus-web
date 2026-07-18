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
  title: 'Instituto de Victimologia de Usina de Justicia',
  intro:
    'El IVUJUS articula investigacion, formacion, produccion editorial y cooperacion internacional en torno a la victimologia, el derecho victimal y los derechos de las victimas.',
  purposes: [
    {
      title: 'Estudios e investigacion',
      body: 'Impulsar los estudios relacionados con la victimologia, el derecho victimal, la criminalidad y la prevencion del delito.',
    },
    {
      title: 'Capacitacion y cursos',
      body: 'Desarrollar cursos de perfeccionamiento y capacitacion para organismos publicos y privados.',
    },
    {
      title: 'Eventos y congresos',
      body: 'Organizar y gestionar convenios, congresos, reuniones nacionales e internacionales y seminarios.',
    },
    {
      title: 'Premios cientificos',
      body: 'Incentivar premios cientificos, segun aprobacion de la Comision Directiva.',
    },
    {
      title: 'Publicaciones',
      body: 'Fomentar la publicacion de articulos cientificos, libros y estudios comparativos.',
    },
    {
      title: 'Colaboracion',
      body: 'Facilitar el intercambio cientifico con sociedades de victimologia nacionales e internacionales.',
    },
  ] satisfies InstitutePurpose[],
  consejoDirectivo: [
    {
      slug: 'maria-jimena-molina',
      name: 'Maria Jimena Molina',
      role: 'Directora',
      summary: 'Abogada y especialista en derecho penal, etica y politicas publicas con perspectiva de victima.',
      bio: 'Abogada (UCALP). Magister en Etica, Filosofia Politica y Antropologia (TECH, Espana). Especialista en Derecho Penal (UNLP). Diplomada en Libertad de Expresion y Seguridad de Periodistas (Instituto Bonavero de Derechos Humanos, Universidad de Oxford, UNESCO). Auxiliar Letrado Relator de la Fiscalia del Tribunal de Casacion de la Provincia de Buenos Aires.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/12/jimena_molina_profiles.jpg',
    },
    {
      slug: 'diana-cohen-agrest',
      name: 'Diana Cohen Agrest',
      role: 'Directora honoraria',
      summary: 'Doctora en Filosofia y fundadora de Usina de Justicia.',
      bio: 'Doctora en Filosofia (UBA). Fundadora y presidenta de la Asociacion Civil Usina de Justicia. Investigadora y docente universitaria, reconocida nacional e internacionalmente por su labor en la proteccion de las victimas de delitos.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-14-at-10.33.50.jpeg',
    },
    {
      slug: 'daniel-roggero',
      name: 'Daniel Roggero',
      role: 'Consejero academico',
      summary: 'Abogado, comunicador y autor especializado en derechos humanos de las victimas.',
      bio: 'Abogado (UBA). Licenciado en Comunicacion Social y Psicologia Social. Autor del Manual de Derechos Humanos y Garantias de las Personas Victimas de Delito. Coordinador de diversas audiencias internacionales sobre politicas publicas y futuro.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-14-at-11.41.02.jpeg',
    },
    {
      slug: 'noelia-juarez',
      name: 'Noelia Juarez',
      role: 'Secretaria',
      summary: 'Abogada con especializacion en derecho constitucional y administrativo.',
      bio: 'Abogada (UNLaM). Secretaria General de Usina de Justicia. Especialista en Derecho Constitucional y Administrativo. Autora de diversos articulos sobre delincuencia juvenil y regimen migratorio.',
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
      role: 'Tecnologia y comunicacion',
      summary: 'Licenciada en Sistemas con trayectoria en gestion tecnologica institucional.',
      bio: 'Licenciada en Sistemas (UTN). Ex funcionaria del Consejo de la Magistratura. Especialista en gestion tecnologica y soporte digital institucional.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/12/patricia_borras_profiles.jpg',
    },
    {
      slug: 'jair-castillo',
      name: 'Jair Castillo',
      role: 'Tecnologia y comunicacion',
      summary: 'Especialista en comunicacion digital, desarrollo web e inteligencia artificial.',
      bio: 'Especialista en comunicacion digital e Inteligencia Artificial. Desarrollador web y estratega de posicionamiento digital del IVUJUS.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2026/02/jair_ivujus.jpg',
    },
  ] satisfies InstitutePerson[],
  comiteCientifico: [
    {
      slug: 'irvin-waller',
      name: 'Irvin Waller',
      role: 'Canada',
      country: 'Canada',
      summary: 'Profesor Emerito de Criminologia y autor intelectual de la Declaracion de la ONU de 1985 sobre justicia para las victimas.',
      bio: 'Profesor Emerito de Criminologia en la Universidad de Ottawa. Con un Ph.D. de la Universidad de Cambridge, es mundialmente reconocido como el autor de la Declaracion sobre los principios fundamentales de justicia para las victimas de delitos (ONU, 1985). Fue director ejecutivo fundador del Centro Internacional para la Prevencion del Delito (CIPC) y ayudo a fundar la Sociedad Mundial de Victimologia. Ha asesorado a mas de 50 gobiernos, incluyendo a Nelson Mandela en Sudafrica. Autor de obras fundamentales como "Ciencia y Secretos para Acabar con los Delitos Violentos", su trabajo ha transformado la seguridad publica y los derechos victimales a nivel global.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2026/02/Irvin-Waller_HD.jpeg',
    },
    {
      slug: 'hilda-marchiori',
      name: 'Hilda Marchiori',
      role: 'Argentina',
      country: 'Argentina',
      summary: 'Referente historica de la victimologia en America Latina.',
      bio: 'Ex Profesora de Criminologia y del Post-Grado de Victimologia (UNC). Miembro de la Sociedad Internacional de Criminologia (Paris) y la World Society of Victimology. Fundadora de la Asociacion Argentina de Victimologia y autora de mas de 40 libros de la especialidad.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/hildam.jpeg',
    },
    {
      slug: 'beatrice-coscas-williams',
      name: 'Beatrice Coscas-Williams',
      role: 'Israel',
      country: 'Israel',
      summary: 'Especialista en participacion de victimas y memoria colectiva.',
      bio: 'Experta en participacion de las victimas en sistemas de justicia penal y memoria colectiva. Preside el grupo de trabajo de victimologia de la Sociedad Europea de Criminologia. Su investigacion se enfoca en procesos legales culturalmente informados y resolucion de conflictos.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/beatrice.jpeg',
    },
    {
      slug: 'marcelo-aebi',
      name: 'Marcelo Aebi',
      role: 'Argentina-Suiza',
      country: 'Argentina-Suiza',
      summary: 'Catedratico de Criminologia y responsable de las estadisticas SPACE del Consejo de Europa.',
      bio: 'Responsable de las Estadisticas Penales Anuales del Consejo de Europa (SPACE) y secretario ejecutivo de la Sociedad Europea de Criminologia. Autor de mas de 150 publicaciones cientificas sobre prisiones, delincuencia juvenil y metodologia criminologica.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/marcelo-aebi.jpg',
    },
    {
      slug: 'maria-de-la-luz-lima-malvido',
      name: 'Maria de la Luz Lima Malvido',
      role: 'Mexico',
      country: 'Mexico',
      summary: 'Jurista y referente regional en asistencia a victimas y violencia familiar.',
      bio: 'Ex Fiscal de Delitos Sexuales y Subprocuradora de la Republica Mexicana. Presidenta honoraria de la Sociedad Mexicana de Victimologia. Ha liderado estandares internacionales sobre asistencia a victimas y violencia familiar en las Naciones Unidas.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/Maria-de-la-Luz-Lima-Malvido-229x285-1.png',
    },
    {
      slug: 'dario-solis-garcia',
      name: 'Dario Solis Garcia',
      role: 'Panama',
      country: 'Panama',
      summary: 'Especialista en sistema penal acusatorio, victimologia y derechos humanos.',
      bio: 'Especialista en Sistema Penal Acusatorio con formacion en Panama y Europa. Colaborador activo de la Sociedad Vasca de Victimologia y la World Society of Victimology. Ha gestionado proyectos de intercambio cientifico con Usina de Justicia.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/dario.jpeg',
    },
    {
      slug: 'catherine-rossi',
      name: 'Catherine Rossi',
      role: 'Canada',
      country: 'Canada',
      summary: 'Investigadora en violencia, justicia y asistencia a victimas.',
      bio: 'Directora del Equipo de Investigacion Violencia-Justicia. Especialista en violencia intima y familiar, preside el Centro de Asistencia contra la Agresion Sexual de Quebec y es miembro del Colegio de Criminologos de Quebec.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/catherine.jpeg',
    },
    {
      slug: 'pierre-marie-seve',
      name: 'Pierre-Marie Seve',
      role: 'Francia',
      country: 'Francia',
      summary: 'Jurista y director del Institut pour la Justice.',
      bio: 'Lidera un influyente think tank frances dedicado a la reforma del sistema de justicia penal. Experto en transparencia ciudadana y combate a la corrupcion, con una presencia regular en medios de comunicacion europeos.',
      image: 'https://ivujus.org.ar/wp-content/uploads/2025/09/pierre.jpeg',
    },
  ] satisfies InstitutePerson[],
  estatuto: {
    heading: 'Denominacion, sede, objetivos y conformacion',
    articles: [
      'Art. 1. Se constituye el Instituto de Victimologia de Usina de Justicia (en adelante IVUJUS), cuya sede es la misma de la Asociacion Civil Usina de Justicia.',
      'Art. 2. El Instituto, al igual que la Asociacion no poseen fines politicos ni sindicales.',
      'Art. 3. El Instituto posee las siguientes finalidades: 1) Impulsar los estudios relacionados con la Victimologia, el derecho victimal, la criminalidad y la prevencion del delito. 2) Desarrollar cursos de perfeccionamiento y capacitacion para ser brindados en organismos publicos y privados, nacionales e internacionales relacionados con el campo de estudio del Instituto. 3) Organizar y gestionar convenios, congresos, reuniones nacionales e internacionales, conferencias, debates y seminarios sobre la problematica cientifica atinente a la disciplina. 4) Incentivar premios cientificos, segun aprobacion de la Comision Directiva de la Asociacion y de los integrantes del Instituto. 5) Fomentar la publicacion de articulos cientificos, libros, estadisticas y estudios comparativos sobre la disciplina. 6) Facilitar la colaboracion e intercambio cientifico con sociedades de victimologia y criminologia nacionales e internacionales, grupos de estudio y entidades abocadas a la tematica.',
      'Art. 4. El Instituto dispone de un sitio web propio integrado en el ecosistema digital de Usina de Justicia.',
      'Art. 5. El Instituto esta conformado por un Consejo Directivo que vela por el cumplimiento de los objetivos institucionales.',
      'Art. 6. El Instituto cuenta con un Comite Cientifico integrado por expertos internacionales de renombre para garantizar la excelencia academica.',
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
      body: 'Perfiles, cargos y trazabilidad institucional de la conduccion del IVUJUS.',
      href: '/instituto/consejo-directivo',
    },
    {
      title: 'Comite cientifico',
      body: 'Referentes internacionales y autoridad academica para la legitimidad comparada del instituto.',
      href: '/instituto/comite-cientifico',
    },
  ],
};
