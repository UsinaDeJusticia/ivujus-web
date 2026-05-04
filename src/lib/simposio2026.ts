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
  title: 'Primer Simposio Americano y Europeo de Victimologia Penal',
  subtitle: 'Las victimas de homicidio en contexto de inseguridad',
  location: 'Ciudad Autonoma de Buenos Aires',
  dates: '9 y 10 de abril de 2026',
  organizingInstitution: 'Usina de Justicia y CPACF',
  summary:
    'Encuentro academico e institucional que reunio referentes de America y Europa para discutir derechos de las victimas, victimologia cientifica y nuevas bases para un derecho penal con perspectiva de victima.',
  highlights: [
    'Declaracion de Buenos Aires',
    'Doce bloques de programa con archivo audiovisual',
    'Cobertura en medios nacionales y especializados',
  ],
  declaration: {
    title: 'Declaracion de Buenos Aires',
    intro:
      'Documento oficial firmado por academicos, profesionales y operadores del sistema de justicia al cierre del simposio.',
    standards: [
      'Articulo 1: Reivindicacion de la Declaracion de la ONU de 1985 como estandar minimo e irrenunciable.',
      'Articulo 2: Nuevo paradigma del sistema penal enfocado en una era con perspectiva de victima.',
      'Articulo 3: Transicion hacia un Derecho Penal y Procesal Cientifico basado en evidencias.',
      'Articulo 4: Exhortacion a la OEA para sancionar una Convencion Interamericana inspirada en la Directiva 2012/29/UE.',
      'Articulo 5: Compromiso academico e institucional para financiar y desarrollar el paradigma de la victimologia cientifica.',
    ],
    pdfUrl:
      'https://ivujus.org.ar/wp-content/uploads/2026/04/Declaracion-de-Buenos-Aires-Traduccion-al-Ingles-Frances-y-Portugues.pdf',
    pdfNote: 'Incluye versiones en espanol, ingles, frances y portugues.',
  },
  days: [
    {
      id: 'jueves',
      shortLabel: '9 ABR',
      title: 'Jornada inaugural',
      summary:
        'Apertura del simposio y posicionamiento de la victimologia penal como ciencia autonoma e independiente.',
      sessions: [
        {
          time: '15:00 hs',
          title: 'Palabras de apertura',
          speakers:
            'Ricardo Gil Lavedra, Diana Cohen Agrest, Jose Console, Maria Jimena Molina.',
        },
        {
          time: '15:20 hs',
          title: 'Panel I: Politicas publicas en la atencion y en la asistencia a las victimas',
          speakers: 'Maria de la Luz Lima Malvido.',
          youtubeUrl: 'https://www.youtube.com/embed/Adi-yBGunbw',
        },
        {
          time: '16:05 hs',
          title: 'Panel II: La victima y el derecho penal',
          speakers: 'Francisco Castex, Jose Console.',
          youtubeUrl: 'https://www.youtube.com/embed/LFcAFOmdHas',
        },
        {
          time: '16:35 hs',
          title: 'Panel III: La victima y la ciencia',
          speakers: 'Daniel Roggero, Noelia Marelyn Juarez.',
          youtubeUrl: 'https://www.youtube.com/embed/3mv5NoXD6pQ',
        },
        {
          time: '17:15 hs',
          title: 'Panel IV: Trabajo de campo y Ley de Datos Geneticos',
          speakers: 'Raquel Slotolow, Guillermo Bargna.',
          summary: 'Testimonios de familiares y analisis de la Ley 27.759.',
          youtubeUrl: 'https://www.youtube.com/embed/9Arb38RS-6U',
        },
        {
          time: '17:45 hs',
          title: 'Panel V: La figura del defensor de victima (Panama)',
          speakers: 'Dario Solis.',
          youtubeUrl: 'https://www.youtube.com/embed/Ozv_7gJu5t8',
        },
        {
          time: '18:30 hs',
          title: 'Entrega de distinciones y cierre de la jornada',
          notes: 'Reservar fotografia oficial del cierre cuando el asset definitivo este disponible.',
        },
      ],
    },
    {
      id: 'viernes',
      shortLabel: '10 ABR',
      title: 'Jornada de cierre',
      summary:
        'Profundizacion sobre el rol del Ministerio Publico, el abolicionismo penal y la firma de la Declaracion de Buenos Aires.',
      sessions: [
        {
          time: '15:00 hs',
          title: 'Panel I: Los derechos de las victimas',
          speakers: 'Maria Jimena Molina.',
          summary: 'Ponencia central sobre principios fundamentales de justicia.',
          youtubeUrl: 'https://www.youtube.com/embed/dpYH04fdXew',
        },
        {
          time: '15:45 hs',
          title: 'Panel II: La victima, el Ministerio Publico y la politica criminal',
          speakers: 'German Garavano, Martin Casares.',
          youtubeUrl: 'https://www.youtube.com/embed/hQqwZlV_mcs',
        },
        {
          time: '16:15 hs',
          title: 'Panel III: El juicio en ausencia y el abolicionismo penal',
          speakers: 'Diana Cohen Agrest, Franco Fiumara.',
          summary: 'Incluye participacion en video de Franco Fiumara.',
          youtubeUrl: 'https://www.youtube.com/embed/Zfeha2pQOiM',
          notes: 'Video individual de Franco Fiumara: https://www.youtube.com/embed/nBpQHVXIOr0',
        },
        {
          time: '16:45 hs',
          title: 'Panel IV: La victima en la etapa de ejecucion',
          speakers: 'Marcelo Peluzzi.',
          youtubeUrl: 'https://www.youtube.com/embed/t8K0Z0vCH-s',
        },
        {
          time: '17:10 hs',
          title: 'Panel V: Abolicionismo penal. En contra del dogma imperante',
          speakers: 'Francisco Javier Pascua, Maria Jimena Molina.',
          youtubeUrl: 'https://www.youtube.com/embed/Zfeha2pQOiM',
        },
        {
          time: '17:40 hs',
          title: 'Panel VI: Criticas a la criminologia critica',
          speakers: 'Marcelo Aebi.',
          youtubeUrl: 'https://www.youtube.com/embed/PgRiWq_X0D8',
        },
        {
          time: '18:25 hs',
          title: 'Lectura y firma de la Declaracion de Buenos Aires',
          summary: 'Entrega de distinciones y cierre oficial del simposio.',
          youtubeUrl: 'https://www.youtube.com/embed/nnGiCHyhgzw',
          notes: 'Reservar fotografia oficial de la firma cuando el asset definitivo este disponible.',
        },
      ],
    },
  ] satisfies SymposiumDay[],
  press: [
    {
      outlet: 'Infobae / DEF',
      title: 'Victimologia penal: una discusion internacional historica con sede en Argentina',
      href: 'https://www.infobae.com/def/2026/04/11/victimologia-penal-una-discusion-internacional-historica-con-sede-en-argentina/',
      image:
        'https://www.infobae.com/resizer/v2/MULE7IV3V5CDFIW3L3DDKLIS5E.jpeg?auth=7f880a1198911b63e26665e77e7ef84925c05217f493c050a21321e16f88e228&smart=true&width=800&height=420&quality=85',
      alt: 'Cobertura de Infobae sobre el Simposio 2026',
    },
    {
      outlet: 'DEF Online',
      title: 'Un espacio que reclama por las victimas de America y Europa',
      href: 'https://defonline.com.ar/seguridad/simposio-de-victimologia-penal-un-espacio-que-reclama-por-las-victimas-de-america-y-europa/',
      image: 'https://defonline.com.ar/wp-content/uploads/2026/04/Portada-1.jpeg',
      alt: 'Cobertura de DEF Online sobre el Simposio 2026',
    },
    {
      outlet: 'Revista Quorum',
      title: 'Victimologia penal: hacia una justicia centrada en la victima',
      href: 'https://revistaquorum.com.ar/2026/04/13/victimologia-penal-hacia-una-justicia-centrada-en-la-victima/',
      image:
        'https://revistaquorum.com.ar/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-10-at-8.12.29-PM-1068x481.jpeg',
      alt: 'Cobertura de Revista Quorum sobre el Simposio 2026',
    },
    {
      outlet: 'DEF Online',
      title: 'Hito en la Justicia argentina: se organizara el Primer Simposio Americano y Europeo',
      href: 'https://defonline.com.ar/seguridad/hito-en-la-justicia-argentina-se-organizara-el-primer-simposio-americano-y-europeo-de-victimologia-penal/',
      image: 'https://defonline.com.ar/wp-content/uploads/2026/04/colegio-abogados-caba-1392x927.jpg',
      alt: 'Cobertura previa de DEF Online sobre el Simposio 2026',
    },
    {
      outlet: 'DEF Online',
      title: 'Victimologia penal: por que el sistema judicial le sigue fallando a las victimas',
      href: 'https://defonline.com.ar/internacionales/victimologia-penal-por-que-el-sistema-judicial-le-sigue-fallando-a-las-victimas/',
      image:
        'https://defonline.com.ar/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-10-at-18.26.35.jpeg',
      alt: 'Cobertura de DEF Online sobre victimas y justicia',
    },
    {
      outlet: 'Revista Quorum',
      title: 'La victimologia penal como modelo a seguir',
      href: 'https://revistaquorum.com.ar/2026/03/13/la-victimologia-penal-como-modelo-a-seguir/',
      image:
        'https://revistaquorum.com.ar/wp-content/uploads/2026/03/25062513_Diseno-sin-titulo-3-1068x726.jpg',
      alt: 'Cobertura de Revista Quorum sobre victimologia penal',
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
      titulo: 'Derechos de las victimas y justicia penal',
      descripcion:
        'Bloques dedicados a politicas publicas de atencion, derecho penal, etapa de ejecucion y defensa de victimas.',
    },
    {
      titulo: 'Victimologia cientifica y evidencia',
      descripcion:
        'Paneles sobre ciencia, medicion cualitativa, analisis basado en evidencia y datos geneticos.',
    },
    {
      titulo: 'Debates contemporaneos',
      descripcion:
        'Abolicionismo penal, juicio en ausencia, politica criminal y nuevas perspectivas para America y Europa.',
    },
  ],
  sitio_externo: 'https://simposiousinadejusticia.org.ar',
  fuente: 'humano',
};

export const declaracionBuenosAiresPayloadDraft: DeclaracionPayloadDraft = {
  titulo: 'Declaracion de Buenos Aires',
  slug: 'declaracion-de-buenos-aires',
  fecha: '2026-04-10',
  simposio_origen_slug_referencia: simposio2026.slug,
  texto_completo_resumen:
    'Documento oficial firmado al cierre del Primer Simposio Americano y Europeo de Victimologia Penal, orientado a fijar bases para una victimologia cientifica y una justicia penal con perspectiva de victima.',
  texto_completo_puntos: simposio2026.declaration.standards,
  pdf_url: simposio2026.declaration.pdfUrl,
  fuente: 'humano',
};
