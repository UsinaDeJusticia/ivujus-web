// Datos curados de la sección Formación (hub, diplomatura y archivo de
// ciclos/jornadas). Igual que src/lib/instituto.ts y src/lib/simposio2026.ts,
// es contenido único en español: las rutas /en y /fr reutilizan estos mismos
// datos sin traducción de cuerpo (solo cambian labels de navegación y
// metadata de la página) — es el mismo criterio que ya usan instituto/*  y
// simposios/2026-buenos-aires (ver docs/CLAUDE.md, "Estado actual de
// frontend y migracion").
//
// REGLA DE ORO de esta ola: nada de lo que sigue es inventado. Cada campo
// sale de una fuente real y verificable:
//
// 1. WP vivo de ivujus.org.ar (REST API pública, consultada el 2026-07-20):
//    - https://ivujus.org.ar/wp-json/wp/v2/pages?slug=campus-virtual (id 24055)
//    - https://ivujus.org.ar/wp-json/wp/v2/pages?slug=capacitacion-y-actividades (id 21399)
// 2. Contenido reservado de Usina (docs/reference/usina-source-content/):
//    - posts-completos.md (19 posts, IDs de usinadejusticia.org.ar)
//    - paginas-planas.md (15851 capacitacion, 18480/18452 inscripcion)
// 3. docs/reference/design-system-oficial/README.md (URL del campus y una
//    cita textual de la descripción de la Diplomatura, ya usada por el
//    equipo de diseño para construir el sistema visual).
//
// Nota: las URLs de usinadejusticia.org.ar citadas en `source_url` abajo
// hoy redirigen (301) a https://ivujus.org.ar/ en el repo hermano
// `usina-de-justicia` — ver docs/USINA-CONTENIDO-RESERVADO.md §4. Se dejan
// tal cual porque documentan el origen real del contenido, no el destino
// del redirect.

export type FuenteContenido = 'migracion_usina' | 'migracion_wp';

// Fuente: docs/reference/design-system-oficial/README.md, sección
// "Superficies del producto" ("Campus virtual | https://usinadejusticiacampus.org.ar").
// Confirmable con Jair antes de considerarla definitiva para prensa/redes.
export const CAMPUS_VIRTUAL_URL = 'https://usinadejusticiacampus.org.ar';

// Fuente: href real dentro del HTML de la página `campus-virtual` de
// ivujus.org.ar (id 24055), enlace de texto "Programa Diplomatura en
// Victimología y leyes de víctimas".
export const DIPLOMATURA_PROGRAMA_PDF_URL =
  'https://ivujus.org.ar/wp-content/uploads/2025/09/Diplomatura.pdf';

export type Diplomatura = {
  titulo: string;
  nombreHistorico?: string;
  descripcion: string;
  metricas: {
    inscriptos: number;
    certificados: number;
    valoracion: string;
  };
  resenas: string[];
  programaPdfUrl: string;
  campusUrl: string;
  fuente: FuenteContenido;
  source_wp_id: number;
  source_url: string;
};

export const diplomaturaData: Diplomatura = {
  // Título tal cual aparece en la página `campus-virtual` de ivujus.org.ar.
  titulo: 'Diplomatura en Victimología y leyes de víctimas',
  // Nombre bajo el que se promocionó el mismo curso en paginas-planas.md
  // (WP IDs 18480 "inscripcion-al-curso-de-victimologia" y 18452
  // "preinscripcion-al-curso", fusionadas por ser casi idénticas según
  // docs/USINA-CONTENIDO-RESERVADO.md §3).
  nombreHistorico: 'Las leyes de víctimas en el marco de la Victimología',
  // Cita textual de docs/reference/design-system-oficial/README.md, sección
  // "Ejemplos reales" ("descripción de la Diplomatura"), tomada del propio
  // material institucional del IVUJUS.
  descripcion:
    'Nuestra propuesta de capacitación profesional se orienta a que el cursante adquiera un exhaustivo conocimiento acerca de las leyes de víctimas vigentes hasta el momento en el país, así como también la legislación internacional que protege los derechos humanos de las víctimas, en el contexto de la Victimología, una disciplina científica en constante evolución.',
  // Contadores. `inscriptos` (500) y `valoracion` (9,7 de 10) provienen de
  // los widgets en vivo de la página `campus-virtual` (Elementor), consultados
  // el 2026-07-20.
  // EXCEPCIÓN EDITORIAL: `certificados` se fija en 500 por decisión de Emanuel
  // (20-jul), a revisar con el equipo. ANULA de forma deliberada el valor real
  // de la fuente viva, que es 0. Se documenta explícitamente para no disfrazar
  // el override como dato de fuente (regla "nunca inventar contenido").
  metricas: {
    inscriptos: 500,
    certificados: 500,
    valoracion: '9,7 de 10',
  },
  // Testimonios anónimos reales extraídos del widget de reseñas de la misma
  // página; el markup no asocia nombre de autor a ninguna reseña.
  resenas: [
    'Me gustó mucho, y lo hice en poco tiempo por qué realmente me enganché con la temática.',
    'Me gustó la practicidad con que dictan estos temas tan complicados y difíciles.',
    'Sigan así. Excelente el curso y el material aportado. Me encantó.',
    'La temática: es la primera vez que veo un curso que hable de los derechos de la víctima.',
  ],
  programaPdfUrl: DIPLOMATURA_PROGRAMA_PDF_URL,
  campusUrl: CAMPUS_VIRTUAL_URL,
  fuente: 'migracion_wp',
  source_wp_id: 24055,
  source_url: 'https://ivujus.org.ar/campus-virtual/',
};

// PENDIENTE: no se encontró en ninguna fuente disponible (WP vivo ni
// contenido reservado de Usina) un desglose real de módulos/unidades de la
// Diplomatura. La única fuente autorizada del programa es el PDF
// descargable (`DIPLOMATURA_PROGRAMA_PDF_URL`); no se inventa una lista de
// módulos para no contradecir ese documento. Si en el futuro se consigue el
// texto del programa, agregar un campo `modulos: { titulo: string }[]` acá.

// PENDIENTE: la mini-FAQ que sugiere el brief para /formacion/diplomatura no
// se agrega: la única FAQ real detectada (`/preguntas-frecuentes/` de
// ivujus.org.ar) es enteramente operativa del campus/LMS (pagos, cuentas,
// certificados) y está explícitamente excluida por
// docs/MIGRATION-MATRIX.md §5 y docs/CONTENT-MIGRATION-LEDGER.md (WP ID
// 21312, "no migrar").

export type SesionCiclo = {
  oradores?: string[];
  video_url?: string;
};

export type DossierCiclo = {
  titulo: string;
  url: string;
};

export type Ciclo = {
  slug: string;
  titulo: string;
  fecha: string;
  resumen: string;
  oradores?: string[];
  video_url?: string;
  // Más de una charla/sesión con oradores y video propios (ej. un ciclo con
  // dos jornadas grabadas por separado).
  sesiones?: SesionCiclo[];
  dossier?: DossierCiclo;
  fuente: FuenteContenido;
  // Array cuando dos o más posts documentan el mismo evento y se fusionaron
  // en una sola entrada (ver nota puntual en cada caso).
  source_wp_id: number | number[];
  source_url: string;
};

// Orden cronológico descendente (más reciente primero), igual que un
// archivo editorial. Los 10 ciclos con fuente 'migracion_usina' vienen de
// docs/reference/usina-source-content/posts-completos.md (WP IDs de
// usinadejusticia.org.ar, reservados para IVUJUS según
// docs/USINA-CONTENIDO-RESERVADO.md §2). Los 2 ciclos con fuente
// 'migracion_wp' vienen del widget Elementor vivo de
// https://ivujus.org.ar/capacitacion-y-actividades/ (id 21399).
export const ciclosData: Ciclo[] = [
  {
    slug: 'jornada-cpacf-derecho-cientifico-2025',
    titulo: 'Jornada «Hacia un Derecho Científico»: Medición Cualitativa en la Era del Algoritmo',
    fecha: 'Noviembre de 2025',
    resumen:
      'Jornada organizada por el Instituto de Victimología de Usina de Justicia (IVUJUS) en el Salón Auditorio del Colegio Público de la Abogacía de la Capital Federal (CPACF), con apertura a cargo de la presidenta de Usina de Justicia, Dra. Diana Cohen Agrest. Durante el encuentro se presentó formalmente el primer índice del país que utiliza inteligencia artificial para evaluar la calidad de las leyes desde la perspectiva de las víctimas. Expusieron la consejera Dra. Jimena de la Torre, sobre el Consejo de la Magistratura de la Nación y la IA, y la Dra. Flora Acselrad, Secretaria Letrada de la Corte Suprema de Justicia de la Nación, sobre los desafíos y oportunidades de la IA para los derechos humanos. El cierre estuvo a cargo del Dr. Daniel Roggero.',
    oradores: ['Diana Cohen Agrest', 'Jimena de la Torre', 'Flora Acselrad', 'Daniel Roggero'],
    fuente: 'migracion_usina',
    // Posts 22365 ("Así vivimos la jornada...", crónica posterior) y 22362
    // ("Hacia un Derecho Científico...", anuncio previo) documentan el mismo
    // evento; fusionados en un único ciclo según
    // docs/USINA-CONTENIDO-RESERVADO.md §2 y la nota de
    // docs/CONTENT-MIGRATION-LEDGER.md sobre el WP ID 22365
    // ("posible duplicado editorial — revisar antes de importar ambos").
    source_wp_id: [22365, 22362],
    source_url:
      'https://usinadejusticia.org.ar/2025/11/12/%e2%9a%96%ef%b8%8f%f0%9f%92%bb-asi-vivimos-la-jornada-hacia-un-derecho-cientifico-en-el-cpacf/',
  },
  {
    slug: 'encuentro-una-paraguay-2024',
    titulo: 'Encuentro con la Universidad Nacional de Asunción sobre formación en Victimología',
    fecha: '1 de julio de 2024',
    resumen:
      'Encuentro en la Universidad Nacional de Asunción (Paraguay) para conversar sobre la formación en Victimología, con la decana Miryam Peña Candia, la directora de gabinete Lorena Alvarenga, la directora de Asuntos Internacionales Inés Martínez Valinotti, la encargada de Convenios Janice Goldenberg y la encargada de Movilidad Estudiantil y Docente Sara Bogarin.',
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
    titulo: 'Capacitación en Víctimas de Delito — Colegio Público de la Abogacía de la Capital Federal',
    fecha: '16 de marzo al 21 de septiembre de 2023',
    resumen:
      'Curso sobre víctimas dictado en el Colegio Público de Abogados de la Capital Federal (CPACF), gratuito, libre y virtual, en el marco de un convenio con Usina de Justicia. La apertura del 16 de marzo estuvo a cargo de Diana Cohen Agrest, presentada por Mariana Romano, con más de 150 personas inscriptas; la última jornada se dictó el 21 de septiembre. Participaron activamente del dictado Daniel Roggero, Luis Cevasco, Raquel Slotolow, Fernando Soto, Ricardo Risso, Javier Pascua, Guillermo Bargna, Mónica Rodríguez y Andy Blake.',
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
    // Fusiona 4 posts que documentan el mismo curso en distintas fechas:
    // 17210 (16 mar, apertura), 17243 (17 mar, primera clase), 18724 (20 abr,
    // convenio y nómina de participantes) y 19693 (21 sep, cierre).
    source_wp_id: [17210, 17243, 18724, 19693],
    source_url:
      'https://usinadejusticia.org.ar/2023/09/21/hoy-ultima-jornada-donde-usina-de-justicia-participa-activamente-en-el-dictado-del-curso-sobre-victimas-en-el-colegio-publico-de-abogados-de-la-capital-federal-cpacf/',
  },
  {
    slug: 'capacitacion-victimas-uade-2023',
    titulo: 'Programa de Capacitación en Víctimas de Delitos — UADE',
    fecha: '13 de abril al 4 de mayo de 2023',
    resumen:
      'Primer programa universitario del país sobre víctimas de delitos, dictado por la Asociación Civil Usina de Justicia junto a la Facultad de Ciencias Jurídicas y Sociales de la Universidad Argentina de la Empresa (UADE). Presencial y gratuito, coordinado por el abogado Daniel Roggero, se dictó durante cuatro jueves consecutivos, del 13 de abril al 4 de mayo de 2023, de 15 a 18 hs.',
    oradores: ['Daniel Roggero'],
    fuente: 'migracion_usina',
    // Fusiona 3 posts sobre el mismo programa: 17322 (anuncio de inicio),
    // 17918 (nota en Infobae) y 18399 (nota en Agencia Universitaria de
    // Noticias).
    source_wp_id: [17322, 17918, 18399],
    source_url:
      'https://usinadejusticia.org.ar/2023/04/08/nota-en-infobae-se-lanzo-por-primera-vez-en-el-pais-un-programa-universitario-de-capacitacion-en-victimas-de-delitos/',
  },
  {
    slug: 'lanzamiento-campus-virtual-2023',
    titulo: 'Lanzamiento del Campus Virtual de Usina de Justicia',
    fecha: '1 de julio de 2023',
    resumen:
      'Usina de Justicia lanzó su Campus Virtual el 1° de julio de 2023, con el curso "Las leyes de víctimas en el marco de la Victimología" dirigido a profesionales de organismos con convenio (las Procuraciones de Corrientes, Chubut, Entre Ríos, La Rioja, Mendoza, San Luis, Santa Fe, Santiago del Estero, Catamarca y Río Negro) y a profesionales particulares por inscripción independiente. Ministerios Públicos Fiscales, otras entidades afines y profesionales particulares se sumaron a la capacitación.',
    fuente: 'migracion_usina',
    // Fusiona 19478 (lanzamiento) y 19657 (nota de adhesión posterior de
    // Ministerios Públicos Fiscales al mismo curso).
    source_wp_id: [19478, 19657],
    source_url: 'https://usinadejusticia.org.ar/2023/07/01/usina-de-justicia-lanzo-su-nuevo-campus-virtual/',
    // PENDIENTE: el post original menciona un PDF de programa ("Programaminimopdf")
    // pero la fuente disponible (docs/reference/usina-source-content/posts-completos.md)
    // no conserva la URL real del archivo — no se inventa un enlace.
  },
  {
    slug: 'clases-uba-derechos-victimas-2019',
    titulo: 'Clases sobre Derechos de las Víctimas — Facultad de Derecho (UBA)',
    fecha: '30 de octubre de 2019',
    resumen:
      'Usina de Justicia dictó clases sobre Derechos de las Víctimas en las Prácticas Profesionales de la Facultad de Derecho de la Universidad de Buenos Aires (UBA), en articulación con la Subsecretaría de Justicia del Gobierno de la Ciudad de Buenos Aires.',
    fuente: 'migracion_usina',
    source_wp_id: 8888,
    source_url: 'https://usinadejusticia.org.ar/2019/10/30/uj-dicto-clases-en-la-facultad-de-derecho-uba/',
  },
  {
    slug: 'capacitacion-subsecretaria-justicia-caba-2019',
    titulo: 'Capacitación en víctimas — Subsecretaría de Justicia de CABA',
    fecha: '3 de octubre de 2019',
    resumen:
      'Miembros de Usina de Justicia participaron de la presentación del Defensor de la Víctima de la Ciudad y de una capacitación en materia de víctimas, organizada por la Subsecretaría de Justicia de CABA a cargo del Dr. Hernán Najenson, en el barrio de Recoleta.',
    fuente: 'migracion_usina',
    source_wp_id: 8884,
    source_url:
      'https://usinadejusticia.org.ar/2019/10/03/uj-estuvo-presente-en-la-capacitacion-de-victimas-de-la-subsecretaria-de-justicia-caba/',
  },
  {
    slug: 'jornada-dialogando-ba-2019',
    titulo: 'Jornada «Dialogando BA: Protección de Víctimas» — Facultad de Derecho (UBA)',
    fecha: '7 de marzo de 2019',
    resumen:
      'Jornada realizada en el Salón Azul de la Facultad de Derecho de la Universidad de Buenos Aires para reflexionar sobre las acciones y medidas necesarias para promover, proteger y garantizar los derechos y la seguridad de los vecinos. Participaron el Subsecretario de Justicia Hernán Najenson, el Subsecretario de Reforma Política y Asuntos Legislativos Hernán Charosky, el Secretario de Justicia y Seguridad Marcelo D’Alessandro, el Ministro de Seguridad y Justicia de la Ciudad Diego Santilli, el Fiscal General Luis Cevasco, el Decano de la Facultad de Derecho de la UBA Alberto Bueres y el Secretario de Justicia de la Nación Santiago Otamendi. Por Usina de Justicia expusieron Donata Chesi y, por la Fundación VEI, Lilia del Valle Saavedra, ambas familiares de víctimas de violencia. Ofició de moderador el legislador Ariel Álvarez Palma.',
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
    titulo: 'Capacitación a Fuerzas de Seguridad de la Nación',
    fecha: '8 de noviembre de 2017',
    resumen:
      'La Asociación Civil Usina de Justicia y el Ministerio de Seguridad de la Nación realizaron una capacitación dirigida a agentes y funcionarios de la Policía Federal Argentina, la Prefectura Naval Argentina, la Gendarmería Nacional Argentina y la Policía de Seguridad Aeroportuaria, en el Auditorio del Ministerio de Seguridad de la Nación. El objetivo fue sensibilizar a las fuerzas de seguridad federales en el acompañamiento socio-jurídico de familiares de víctimas de homicidios, en el marco de la Ley de Derechos y Garantías de las Personas Víctimas de Delitos N.º 27.372. La capacitación tuvo una perspectiva interdisciplinaria (jurídica, emocional y psicológica), a cargo de Daniel Roggero, Diana Cohen Agrest y la Lic. Marcela Dal Verme, con testimonios de familiares de víctimas: Raquel Berthi, Karina Massa y Eduardo Tonello.',
    oradores: ['Daniel Roggero', 'Diana Cohen Agrest', 'Marcela Dal Verme'],
    fuente: 'migracion_usina',
    source_wp_id: 9877,
    source_url: 'https://usinadejusticia.org.ar/2017/11/08/ministerio-seguridad-la-nacion-capacitacion-fuerzas-seguridad/',
  },
  {
    slug: 'seminario-udemm-2016',
    titulo: 'Seminario «Seguridad y Justicia» — UdeMM',
    fecha: '5 de abril de 2016',
    resumen:
      'Seminario "Seguridad y Justicia" propuesto y coordinado por la Prof. Ester Ruth Tuchsznaider en la Universidad Privada UdeMM, con la apertura de su rector, Norberto Fraga, y la participación del director de la carrera, Ignacio Rebaudi. Se abordaron la normativa legal, fallos jurisprudenciales, distintas teorías acerca del castigo, garantismo e impunidad, las falencias del sistema procesal penal, las propuestas de reforma y el régimen de ejecución de las penas, con especial atención al rol de la víctima y al acceso a la justicia.',
    fuente: 'migracion_usina',
    source_wp_id: 9998,
    source_url: 'https://usinadejusticia.org.ar/2016/05/05/seminario-en-la-udemm/',
  },
  {
    slug: 'ciclo-ley-salud-mental-2021',
    titulo: 'Ciclo Usina Debate: Ley de Salud Mental — El desmantelamiento de la protección ciudadana',
    fecha: '1 y 9 de septiembre de 2021',
    resumen:
      'Ciclo de debate sobre la Ley de Salud Mental organizado por Usina de Justicia, con dos sesiones grabadas (1 y 9 de septiembre de 2021) y un dossier de referencia descargable. La fuente no permite determinar con certeza qué panel corresponde a cuál de las dos fechas, por eso se listan por separado sin fecha individual.',
    sesiones: [
      { oradores: ['Marcela Dal Verme', 'Ricardo Risso', 'Andrés Mega'], video_url: 'https://youtu.be/tr77UQi5Doc' },
      { oradores: ['André S. Blake', 'Gabriela Casas'], video_url: 'https://youtu.be/A5F0XAFFIzE' },
    ],
    dossier: {
      titulo: 'Dossier de Salud Mental',
      url: 'https://ivujus.org.ar/wp-content/uploads/2023/07/Dossier-Salud-Mental.pdf',
    },
    fuente: 'migracion_wp',
    source_wp_id: 21399,
    source_url: 'https://ivujus.org.ar/capacitacion-y-actividades/',
  },
  {
    slug: 'ciclo-juicio-por-jurados-2021',
    titulo: 'Ciclo Usina Debate: Juicio por Jurados',
    fecha: '3 de mayo de 2021',
    resumen:
      'Ciclo de debate sobre juicio por jurados organizado por Usina de Justicia, con la participación de Luis Cevasco, Andrés Harfuch y Francisco Pascua. Incluye una publicación académica conjunta de la Asociación Civil Usina de Justicia y el Instituto de Altos Estudios de Derecho de la Provincia de Mendoza sobre la constitucionalidad de la prisión perpetua.',
    oradores: ['Luis Cevasco', 'Andrés Harfuch', 'Francisco Pascua'],
    video_url: 'https://youtu.be/2MlqecC0tv8',
    dossier: {
      titulo: 'Publicación académica: la constitucionalidad de la prisión perpetua',
      url: 'https://ivujus.org.ar/wp-content/uploads/2023/07/prision-perpetua.pdf',
    },
    fuente: 'migracion_wp',
    source_wp_id: 21399,
    source_url: 'https://ivujus.org.ar/capacitacion-y-actividades/',
  },
];

export function getCicloBySlug(slug: string): Ciclo | undefined {
  return ciclosData.find((ciclo) => ciclo.slug === slug);
}

export type FormacionHub = {
  title: string;
  intro: string;
  sections: Array<{ title: string; body: string; href: string }>;
};

export const formacionHubData: FormacionHub = {
  title: 'Formación',
  // Párrafo institucional real de la página plana "capacitacion" de
  // usinadejusticia.org.ar (WP ID 15851), insumo explícito para /formacion
  // según docs/USINA-CONTENIDO-RESERVADO.md §3.
  intro:
    'Llevamos adelante estudios de legislaciones, análisis de casos y buenas prácticas nacionales e internacionales vinculados a la Justicia y la Seguridad. Estos procesos permiten generar información clave que se traslada a tomadores de decisión de los poderes Ejecutivo, Legislativo y Judicial, a organizaciones de la sociedad civil y a la comunidad en general, a través de presentaciones, charlas, mesas de diálogo, talleres y seminarios.',
  sections: [
    {
      title: 'Diplomatura en Victimología y leyes de víctimas',
      body: 'Formación de posgrado a través del Campus Virtual, con programa descargable y acceso directo a la inscripción.',
      href: '/formacion/diplomatura',
    },
    {
      title: 'Ciclos y jornadas',
      body: 'Archivo de ciclos de debate, jornadas y capacitaciones del Instituto, con videos y dossiers cuando están disponibles.',
      href: '/formacion/ciclos',
    },
  ],
};
