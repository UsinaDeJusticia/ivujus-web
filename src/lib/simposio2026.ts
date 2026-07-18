export type SymposiumSession = {
  time: string;
  title: string;
  speakers?: string;
  summary?: string;
  youtubeUrl?: string;
  notes?: string;
};

export type SymposiumDay = {
  id: string;
  shortLabel: string;
  title: string;
  summary: string;
  sessions: SymposiumSession[];
};

export type PressArticle = {
  outlet: string;
  title: string;
  href: string;
  image: string;
  alt: string;
};

export type SimposioPayloadDraft = {
  titulo: string;
  slug: string;
  numero_edicion: number;
  anio: number;
  fecha_inicio: string;
  fecha_fin: string;
  sede: {
    institucion_organizadora: string;
    ciudad: string;
    pais: string;
  };
  resumen: string;
  temario: Array<{ titulo: string; descripcion: string }>;
  sitio_externo?: string;
  fuente: 'humano';
};

export type DeclaracionPayloadDraft = {
  titulo: string;
  slug: string;
  fecha: string;
  simposio_origen_slug_referencia: string;
  texto_completo_resumen: string;
  texto_completo_puntos: string[];
  pdf_url: string;
  fuente: 'humano';
};

export const simposio2026 = {
  slug: '2026-buenos-aires',
  title: 'Primer Simposio Americano y Europeo de Victimología Penal',
  subtitle: 'Las víctimas de homicidio en contexto de inseguridad',
  location: 'Ciudad Autónoma de Buenos Aires',
  dates: '9 y 10 de abril de 2026',
  organizingInstitution: 'Usina de Justicia y CPACF',
  summary:
    'Encuentro académico e institucional que reunió referentes de América y Europa para discutir derechos de las víctimas, victimología científica y nuevas bases para un derecho penal con perspectiva de víctima.',
  highlights: [
    'Declaración de Buenos Aires',
    'Doce bloques de programa con archivo audiovisual',
    'Cobertura en medios nacionales y especializados',
  ],
  declaration: {
    title: 'Declaración de Buenos Aires',
    intro:
      'Documento oficial firmado por académicos, profesionales y operadores del sistema de justicia al cierre del simposio.',
    standards: [
      'Artículo 1: Reivindicación de la Declaración de la ONU de 1985 como estándar mínimo e irrenunciable.',
      'Artículo 2: Nuevo paradigma del sistema penal enfocado en una era con perspectiva de víctima.',
      'Artículo 3: Transición hacia un Derecho Penal y Procesal Científico basado en evidencias.',
      'Artículo 4: Exhortación a la OEA para sancionar una Convención Interamericana inspirada en la Directiva 2012/29/UE.',
      'Artículo 5: Compromiso académico e institucional para financiar y desarrollar el paradigma de la victimología científica.',
    ],
    pdfUrl:
      'https://ivujus.org.ar/wp-content/uploads/2026/04/Declaracion-de-Buenos-Aires-Traduccion-al-Ingles-Frances-y-Portugues.pdf',
    pdfNote: 'Incluye versiones en español, inglés, francés y portugués.',
  },
  days: [
    {
      id: 'jueves',
      shortLabel: '9 ABR',
      title: 'Jornada inaugural',
      summary:
        'Apertura del simposio y posicionamiento de la victimología penal como ciencia autónoma e independiente.',
      sessions: [
        {
          time: '15:00 hs',
          title: 'Palabras de apertura',
          speakers:
            'Ricardo Gil Lavedra, Diana Cohen Agrest, José Console, María Jimena Molina.',
        },
        {
          time: '15:20 hs',
          title: 'Panel I: Políticas públicas en la atención y en la asistencia a las víctimas',
          speakers: 'María de la Luz Lima Malvido.',
          youtubeUrl: 'https://www.youtube.com/embed/Adi-yBGunbw',
        },
        {
          time: '16:05 hs',
          title: 'Panel II: La víctima y el derecho penal',
          speakers: 'Francisco Castex, José Console.',
          youtubeUrl: 'https://www.youtube.com/embed/LFcAFOmdHas',
        },
        {
          time: '16:35 hs',
          title: 'Panel III: La víctima y la ciencia',
          speakers: 'Daniel Roggero, Noelia Marelyn Juárez.',
          youtubeUrl: 'https://www.youtube.com/embed/3mv5NoXD6pQ',
        },
        {
          time: '17:15 hs',
          title: 'Panel IV: Trabajo de campo y Ley de Datos Genéticos',
          speakers: 'Raquel Slotolow, Guillermo Bargna.',
          summary: 'Testimonios de familiares y análisis de la Ley 27.759.',
          youtubeUrl: 'https://www.youtube.com/embed/9Arb38RS-6U',
        },
        {
          time: '17:45 hs',
          title: 'Panel V: La figura del defensor de víctima (Panamá)',
          speakers: 'Darío Solís.',
          youtubeUrl: 'https://www.youtube.com/embed/Ozv_7gJu5t8',
        },
        {
          time: '18:30 hs',
          title: 'Entrega de distinciones y cierre de la jornada',
          notes: 'Reservar fotografía oficial del cierre cuando el asset definitivo esté disponible.',
        },
      ],
    },
    {
      id: 'viernes',
      shortLabel: '10 ABR',
      title: 'Jornada de cierre',
      summary:
        'Profundización sobre el rol del Ministerio Público, el abolicionismo penal y la firma de la Declaración de Buenos Aires.',
      sessions: [
        {
          time: '15:00 hs',
          title: 'Panel I: Los derechos de las víctimas',
          speakers: 'María Jimena Molina.',
          summary: 'Ponencia central sobre principios fundamentales de justicia.',
          youtubeUrl: 'https://www.youtube.com/embed/dpYH04fdXew',
        },
        {
          time: '15:45 hs',
          title: 'Panel II: La víctima, el Ministerio Público y la política criminal',
          speakers: 'Germán Garavano, Martín Casares.',
          youtubeUrl: 'https://www.youtube.com/embed/hQqwZlV_mcs',
        },
        {
          time: '16:15 hs',
          title: 'Panel III: El juicio en ausencia y el abolicionismo penal',
          speakers: 'Diana Cohen Agrest, Franco Fiumara.',
          summary: 'Incluye participación en video de Franco Fiumara.',
          youtubeUrl: 'https://www.youtube.com/embed/Zfeha2pQOiM',
          notes: 'Video individual de Franco Fiumara: https://www.youtube.com/embed/nBpQHVXIOr0',
        },
        {
          time: '16:45 hs',
          title: 'Panel IV: La víctima en la etapa de ejecución',
          speakers: 'Marcelo Peluzzi.',
          youtubeUrl: 'https://www.youtube.com/embed/t8K0Z0vCH-s',
        },
        {
          time: '17:10 hs',
          title: 'Panel V: Abolicionismo penal. En contra del dogma imperante',
          speakers: 'Francisco Javier Pascua, María Jimena Molina.',
          youtubeUrl: 'https://www.youtube.com/embed/Zfeha2pQOiM',
        },
        {
          time: '17:40 hs',
          title: 'Panel VI: Críticas a la criminología crítica',
          speakers: 'Marcelo Aebi.',
          youtubeUrl: 'https://www.youtube.com/embed/PgRiWq_X0D8',
        },
        {
          time: '18:25 hs',
          title: 'Lectura y firma de la Declaración de Buenos Aires',
          summary: 'Entrega de distinciones y cierre oficial del simposio.',
          youtubeUrl: 'https://www.youtube.com/embed/nnGiCHyhgzw',
          notes: 'Reservar fotografía oficial de la firma cuando el asset definitivo esté disponible.',
        },
      ],
    },
  ] satisfies SymposiumDay[],
  press: [
    {
      outlet: 'Infobae / DEF',
      title: 'Victimología penal: una discusión internacional histórica con sede en Argentina',
      href: 'https://www.infobae.com/def/2026/04/11/victimologia-penal-una-discusion-internacional-historica-con-sede-en-argentina/',
      image:
        'https://www.infobae.com/resizer/v2/MULE7IV3V5CDFIW3L3DDKLIS5E.jpeg?auth=7f880a1198911b63e26665e77e7ef84925c05217f493c050a21321e16f88e228&smart=true&width=800&height=420&quality=85',
      alt: 'Cobertura de Infobae sobre el Simposio 2026',
    },
    {
      outlet: 'DEF Online',
      title: 'Un espacio que reclama por las víctimas de América y Europa',
      href: 'https://defonline.com.ar/seguridad/simposio-de-victimologia-penal-un-espacio-que-reclama-por-las-victimas-de-america-y-europa/',
      image: 'https://defonline.com.ar/wp-content/uploads/2026/04/Portada-1.jpeg',
      alt: 'Cobertura de DEF Online sobre el Simposio 2026',
    },
    {
      outlet: 'Revista Quórum',
      title: 'Victimología penal: hacia una justicia centrada en la víctima',
      href: 'https://revistaquorum.com.ar/2026/04/13/victimologia-penal-hacia-una-justicia-centrada-en-la-victima/',
      image:
        'https://revistaquorum.com.ar/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-10-at-8.12.29-PM-1068x481.jpeg',
      alt: 'Cobertura de Revista Quórum sobre el Simposio 2026',
    },
    {
      outlet: 'DEF Online',
      title: 'Hito en la Justicia argentina: se organizará el Primer Simposio Americano y Europeo',
      href: 'https://defonline.com.ar/seguridad/hito-en-la-justicia-argentina-se-organizara-el-primer-simposio-americano-y-europeo-de-victimologia-penal/',
      image: 'https://defonline.com.ar/wp-content/uploads/2026/04/colegio-abogados-caba-1392x927.jpg',
      alt: 'Cobertura previa de DEF Online sobre el Simposio 2026',
    },
    {
      outlet: 'DEF Online',
      title: 'Victimología penal: por qué el sistema judicial le sigue fallando a las víctimas',
      href: 'https://defonline.com.ar/internacionales/victimologia-penal-por-que-el-sistema-judicial-le-sigue-fallando-a-las-victimas/',
      image:
        'https://defonline.com.ar/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-10-at-18.26.35.jpeg',
      alt: 'Cobertura de DEF Online sobre víctimas y justicia',
    },
    {
      outlet: 'Revista Quórum',
      title: 'La victimología penal como modelo a seguir',
      href: 'https://revistaquorum.com.ar/2026/03/13/la-victimologia-penal-como-modelo-a-seguir/',
      image:
        'https://revistaquorum.com.ar/wp-content/uploads/2026/03/25062513_Diseno-sin-titulo-3-1068x726.jpg',
      alt: 'Cobertura de Revista Quórum sobre victimología penal',
    },
  ] satisfies PressArticle[],
};

export const simposio2026PayloadDraft: SimposioPayloadDraft = {
  titulo: simposio2026.title,
  slug: simposio2026.slug,
  numero_edicion: 1,
  anio: 2026,
  fecha_inicio: '2026-04-09',
  fecha_fin: '2026-04-10',
  sede: {
    institucion_organizadora: simposio2026.organizingInstitution,
    ciudad: 'Buenos Aires',
    pais: 'Argentina',
  },
  resumen: simposio2026.summary,
  temario: [
    {
      titulo: 'Derechos de las víctimas y justicia penal',
      descripcion:
        'Bloques dedicados a políticas públicas de atención, derecho penal, etapa de ejecución y defensa de víctimas.',
    },
    {
      titulo: 'Victimología científica y evidencia',
      descripcion:
        'Paneles sobre ciencia, medición cualitativa, análisis basado en evidencia y datos genéticos.',
    },
    {
      titulo: 'Debates contemporáneos',
      descripcion:
        'Abolicionismo penal, juicio en ausencia, política criminal y nuevas perspectivas para América y Europa.',
    },
  ],
  sitio_externo: 'https://simposiousinadejusticia.org.ar',
  fuente: 'humano',
};

export const declaracionBuenosAiresPayloadDraft: DeclaracionPayloadDraft = {
  titulo: 'Declaración de Buenos Aires',
  slug: 'declaracion-de-buenos-aires',
  fecha: '2026-04-10',
  simposio_origen_slug_referencia: simposio2026.slug,
  texto_completo_resumen:
    'Documento oficial firmado al cierre del Primer Simposio Americano y Europeo de Victimología Penal, orientado a fijar bases para una victimología científica y una justicia penal con perspectiva de víctima.',
  texto_completo_puntos: simposio2026.declaration.standards,
  pdf_url: simposio2026.declaration.pdfUrl,
  fuente: 'humano',
};
