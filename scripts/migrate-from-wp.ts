import { mkdir, writeFile } from 'node:fs/promises';

type MigrationStatus = 'migrar' | 'no_migrar' | 'revisar';
type Priority = 'muy_alta' | 'alta' | 'media' | 'baja';

type PageDecision = {
  id: number;
  status: MigrationStatus;
  destination: string;
  priority: Priority;
  note: string;
};

type PostDecision = {
  id: number;
  status: MigrationStatus;
  destination: string;
  priority: Priority;
  note: string;
};

type WpRendered = { rendered: string };

type WpPage = {
  id: number;
  slug: string;
  link: string;
  title: WpRendered;
  excerpt: WpRendered;
  modified: string;
};

type WpCategory = {
  id: number;
  slug: string;
  name: string;
};

type WpPost = {
  id: number;
  slug: string;
  link: string;
  title: WpRendered;
  excerpt: WpRendered;
  date: string;
  modified: string;
  categories: number[];
};

type ReportItem = {
  source_wp_id: number;
  source_wp_type: 'page' | 'post';
  source_wp_url: string;
  slug: string;
  title: string;
  excerpt: string;
  categories?: string[];
  modified_at: string;
  migration_status: MigrationStatus;
  destination: string;
  priority: Priority;
  migration_notes: string;
};

type Report = {
  generatedAt: string;
  sourceBaseUrl: string;
  summary: {
    pages: number;
    posts: number;
    migrar: number;
    no_migrar: number;
    revisar: number;
  };
  pages: ReportItem[];
  posts: ReportItem[];
};

type BucketItem = {
  source_wp_id: number;
  source_wp_type: 'page' | 'post';
  title: string;
  slug: string;
  url: string;
  categories?: string[];
  priority: Priority;
  note: string;
};

type Buckets = {
  generatedAt: string;
  destinations: Record<string, BucketItem[]>;
};

type PayloadExportRecord = {
  source_wp_id: number;
  source_wp_url: string;
  titulo: string;
  slug: string;
  estado: 'borrador';
  fuente: 'migracion_wp';
  traduccion_estado: 'pendiente';
  requiere_revision_manual: boolean;
  notas_migracion: string;
  extra?: Record<string, unknown>;
};

type EditorialStatus =
  | 'discarded'
  | 'manual_split_required'
  | 'editorial_review_required'
  | 'proposed_seed_only'
  | 'import_ready';

type CollectionKey =
  | 'paginasEstaticas'
  | 'ciclos'
  | 'declaraciones'
  | 'novedades'
  | 'publicaciones';

type EditorialDecisionRecord = ReportItem & {
  inventory_status: 'discovered';
  editorial_status: EditorialStatus;
  approved_for_import: boolean;
  target_collection: CollectionKey | null;
  import_blockers: string[];
};

type ProposedPayloadExports = {
  generatedAt: string;
  collections: Record<CollectionKey, PayloadExportRecord[]>;
  backlog: {
    home: PayloadExportRecord[];
    indiceLegislativoSinEntradaCanonica: PayloadExportRecord[];
    institutoDesagregado: PayloadExportRecord[];
  };
  gaps: string[];
};

type ImportReadyPayloadExports = {
  generatedAt: string;
  collections: Record<CollectionKey, PayloadExportRecord[]>;
};

const SOURCE_BASE_URL = 'https://ivujus.org.ar/wp-json/wp/v2';

const pageDecisions: PageDecision[] = [
  {
    id: 6,
    status: 'migrar',
    destination: 'home',
    priority: 'alta',
    note: 'No copiar literal. Solo usar como referencia de contenido y jerarquia.',
  },
  {
    id: 24152,
    status: 'migrar',
    destination:
      'instituto | instituto/estatuto | instituto/consejo-directivo | instituto/comite-cientifico',
    priority: 'muy_alta',
    note: 'Fuente canonica para finalidades, consejo, estatuto y comite cientifico.',
  },
  {
    id: 24231,
    status: 'no_migrar',
    destination: 'absorber en instituto/comite-cientifico',
    priority: 'media',
    note: 'Duplica contenido de nosotros con menos detalle.',
  },
  {
    id: 21399,
    status: 'migrar',
    destination: 'formacion/ciclos + Ciclos + Dossiers/Publicaciones',
    priority: 'alta',
    note: 'Desarmar por actividad, video y PDF.',
  },
  {
    id: 24055,
    status: 'migrar',
    destination: 'formacion/diplomatura',
    priority: 'alta',
    note: 'Solo landing institucional. Excluir tienda, login y operacion LMS.',
  },
  {
    id: 24632,
    status: 'migrar',
    destination: 'simposios/2026-buenos-aires + publicaciones/declaraciones',
    priority: 'muy_alta',
    note: 'Pieza central para simposio, declaracion y cobertura relacionada.',
  },
  {
    id: 19975,
    status: 'migrar',
    destination: 'contacto',
    priority: 'media',
    note: 'Rehacer como pagina limpia con formulario nuevo.',
  },
  {
    id: 18848,
    status: 'migrar',
    destination: 'terms-privacy',
    priority: 'media',
    note: 'Reescribir o limpiar markup WordPress.',
  },
  {
    id: 22720,
    status: 'no_migrar',
    destination: 'CTA o proxy a Perfit',
    priority: 'baja',
    note: 'Perfit se mantiene; no hace falta clonar la pagina completa.',
  },
  {
    id: 9,
    status: 'migrar',
    destination: 'novedades',
    priority: 'alta',
    note: 'Importa el listado de posts, no la page de WordPress.',
  },
  {
    id: 19637,
    status: 'migrar',
    destination: 'formacion/ciclos o archivo audiovisual secundario',
    priority: 'baja',
    note: 'Tiene videos reales; migrar solo si aporta valor al archivo institucional.',
  },
  {
    id: 21312,
    status: 'no_migrar',
    destination: 'fuera del frontend principal',
    priority: 'media',
    note: 'FAQ operativa del LMS, pagos, usuarios y certificados.',
  },
  {
    id: 19075,
    status: 'no_migrar',
    destination: 'fuera de alcance',
    priority: 'alta',
    note: 'WooCommerce y pagos. Excluido por brief.',
  },
  {
    id: 19900,
    status: 'no_migrar',
    destination: 'fuera de alcance',
    priority: 'alta',
    note: 'Carrito de WooCommerce.',
  },
  {
    id: 19896,
    status: 'no_migrar',
    destination: 'fuera de alcance',
    priority: 'alta',
    note: 'Checkout de WooCommerce.',
  },
  {
    id: 19897,
    status: 'no_migrar',
    destination: 'fuera de alcance',
    priority: 'alta',
    note: 'Login del campus / WordPress.',
  },
  {
    id: 20157,
    status: 'no_migrar',
    destination: 'fuera de alcance',
    priority: 'baja',
    note: 'Flujo auxiliar del sistema actual.',
  },
  {
    id: 21874,
    status: 'no_migrar',
    destination: 'fuera de alcance',
    priority: 'baja',
    note: 'Pieza operativa del campus.',
  },
  {
    id: 21422,
    status: 'no_migrar',
    destination: 'fuera del frontend principal',
    priority: 'baja',
    note: 'Guia rapida del campus; soporte operativo del LMS.',
  },
  {
    id: 23174,
    status: 'no_migrar',
    destination: 'fuera del frontend principal',
    priority: 'baja',
    note: 'Pagina contingente de caida tecnica del campus.',
  },
];

const postDecisions: PostDecision[] = [
  {
    id: 24625,
    status: 'migrar',
    destination: 'novedades relacionado a simposios',
    priority: 'alta',
    note: 'Vincular con la ficha del simposio 2026.',
  },
  {
    id: 24591,
    status: 'migrar',
    destination: 'novedades',
    priority: 'media',
    note: 'Noticia institucional de agenda y presencia publica.',
  },
  {
    id: 24544,
    status: 'migrar',
    destination: 'novedades + relacion con perfil del comite cientifico',
    priority: 'media',
    note: 'Aporta autoridad academica para perfil de Marcelo Aebi.',
  },
  {
    id: 24526,
    status: 'migrar',
    destination: 'indice-legislativo + novedades',
    priority: 'alta',
    note: 'Cronica del evento de presentacion del indice. No es un ciclo autonomo.',
  },
  {
    id: 24523,
    status: 'migrar',
    destination: 'indice-legislativo',
    priority: 'muy_alta',
    note: 'Debe reforzar la seccion del indice legislativo, no quedar como post generico.',
  },
  {
    id: 24540,
    status: 'migrar',
    destination: 'publicaciones/libros relacionado + novedades',
    priority: 'alta',
    note: 'Pieza satelite del libro Nuevos Paradigmas con video resumen.',
  },
  {
    id: 24509,
    status: 'migrar',
    destination: 'publicaciones/libros relacionado + novedades',
    priority: 'muy_alta',
    note: 'Anuncio del libro. Debe conectarse al objeto editorial principal.',
  },
  {
    id: 24513,
    status: 'migrar',
    destination: 'novedades',
    priority: 'media',
    note: 'Limpiar slug y titulo al migrar.',
  },
  {
    id: 24517,
    status: 'migrar',
    destination: 'novedades',
    priority: 'baja',
    note: 'Confirmar relevancia institucional al redactar version final.',
  },
  {
    id: 24504,
    status: 'migrar',
    destination: 'novedades',
    priority: 'baja',
    note: 'Noticia institucional convencional.',
  },
  {
    id: 24493,
    status: 'migrar',
    destination: 'indice-legislativo relacionado + perfil de Marcelo Aebi',
    priority: 'alta',
    note: 'Video corto que cruza indice legislativo y autoridad academica del comite.',
  },
];

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '-')
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/\s+/g, ' ')
    .trim();
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${SOURCE_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Error fetching ${path}: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as T;
}

function buildPageItem(page: WpPage, decision: PageDecision): ReportItem {
  return {
    source_wp_id: page.id,
    source_wp_type: 'page',
    source_wp_url: page.link,
    slug: page.slug,
    title: stripHtml(page.title.rendered),
    excerpt: stripHtml(page.excerpt.rendered),
    modified_at: page.modified,
    migration_status: decision.status,
    destination: decision.destination,
    priority: decision.priority,
    migration_notes: decision.note,
  };
}

function buildPostItem(
  post: WpPost,
  decision: PostDecision,
  categoryById: Map<number, string>,
): ReportItem {
  return {
    source_wp_id: post.id,
    source_wp_type: 'post',
    source_wp_url: post.link,
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    categories: post.categories
      .map((categoryId) => categoryById.get(categoryId))
      .filter((value): value is string => Boolean(value)),
    modified_at: post.modified,
    migration_status: decision.status,
    destination: decision.destination,
    priority: decision.priority,
    migration_notes: decision.note,
  };
}

function countStatuses(items: ReportItem[]) {
  return items.reduce(
    (acc, item) => {
      acc[item.migration_status] += 1;
      return acc;
    },
    { migrar: 0, no_migrar: 0, revisar: 0 },
  );
}

function slugifyDestination(destination: string): string {
  return destination
    .toLowerCase()
    .replace(/\s*\+\s*/g, ' y ')
    .replace(/[|]/g, ' o ')
    .replace(/[^a-z0-9/]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');
}

function toBucketItem(item: ReportItem): BucketItem {
  return {
    source_wp_id: item.source_wp_id,
    source_wp_type: item.source_wp_type,
    title: item.title,
    slug: item.slug,
    url: item.source_wp_url,
    categories: item.categories,
    priority: item.priority,
    note: item.migration_notes,
  };
}

function buildBuckets(items: ReportItem[]): Buckets {
  const destinations: Record<string, BucketItem[]> = {};

  for (const item of items) {
    if (item.migration_status !== 'migrar') continue;
    const key = slugifyDestination(item.destination);
    if (!destinations[key]) destinations[key] = [];
    destinations[key].push(toBucketItem(item));
  }

  for (const key of Object.keys(destinations)) {
    destinations[key].sort((a, b) => a.title.localeCompare(b.title));
  }

  return {
    generatedAt: new Date().toISOString(),
    destinations,
  };
}

function getEditorialDecision(item: ReportItem): EditorialDecisionRecord {
  const base: EditorialDecisionRecord = {
    ...item,
    inventory_status: 'discovered',
    editorial_status: 'editorial_review_required',
    approved_for_import: false,
    target_collection: null,
    import_blockers: ['Requiere validacion editorial antes de importar.'],
  };

  switch (item.source_wp_id) {
    case 18848:
    case 19975:
      return {
        ...base,
        editorial_status: 'proposed_seed_only',
        target_collection: 'paginasEstaticas',
        import_blockers: ['Hace falta limpiar o reescribir el contenido antes del import.'],
      };
    case 21399:
    case 24632:
    case 24152:
    case 24055:
    case 6:
      return {
        ...base,
        editorial_status: 'manual_split_required',
        import_blockers: ['El contenido origen debe desarmarse en multiples piezas antes de importar.'],
      };
    case 19637:
      return {
        ...base,
        editorial_status: 'proposed_seed_only',
        target_collection: 'ciclos',
        import_blockers: ['Archivo secundario; confirmar si realmente entra al sitio nuevo.'],
      };
    case 24231:
    case 22720:
    case 21312:
    case 19075:
    case 19900:
    case 19896:
    case 19897:
    case 20157:
    case 21874:
    case 21422:
    case 23174:
      return {
        ...base,
        editorial_status: 'discarded',
        import_blockers: ['Descartado para import al nuevo sitio.'],
      };
    case 24625:
    case 24591:
    case 24544:
    case 24513:
    case 24517:
    case 24504:
      return {
        ...base,
        editorial_status: 'proposed_seed_only',
        target_collection: 'novedades',
        import_blockers: ['La pieza sigue necesitando limpieza editorial antes del import.'],
      };
    case 24526:
    case 24523:
    case 24493:
      return {
        ...base,
        editorial_status: 'editorial_review_required',
        import_blockers: ['Todavia no existe una entrada canonica del indice legislativo para vincular esta pieza.'],
      };
    case 24509:
    case 24540:
      return {
        ...base,
        editorial_status: 'editorial_review_required',
        target_collection: 'publicaciones',
        import_blockers: ['Antes de importar hay que consolidar ambos posts en un unico objeto editorial del libro.'],
      };
    case 9:
      return {
        ...base,
        editorial_status: 'discarded',
        import_blockers: ['La pagina blog no se importa; solo importa el listado de posts.'],
      };
    default:
      return base;
  }
}

function byId(items: ReportItem[]): Map<number, ReportItem> {
  return new Map(items.map((item) => [item.source_wp_id, item]));
}

function toPayloadExportRecord(
  item: ReportItem,
  overrides?: Partial<PayloadExportRecord>,
): PayloadExportRecord {
  return {
    source_wp_id: item.source_wp_id,
    source_wp_url: item.source_wp_url,
    titulo: item.title,
    slug: item.slug,
    estado: 'borrador',
    fuente: 'migracion_wp',
    traduccion_estado: 'pendiente',
    requiere_revision_manual: true,
    notas_migracion: item.migration_notes,
    ...overrides,
  };
}

function emptyCollectionMap(): Record<CollectionKey, PayloadExportRecord[]> {
  return {
    paginasEstaticas: [],
    ciclos: [],
    declaraciones: [],
    novedades: [],
    publicaciones: [],
  };
}

function buildProposedPayloadExports(items: ReportItem[]): ProposedPayloadExports {
  const itemsById = byId(items);

  const contacto = itemsById.get(19975);
  const terms = itemsById.get(18848);
  const home = itemsById.get(6);
  const nosotros = itemsById.get(24152);
  const capacitacion = itemsById.get(21399);
  const campus = itemsById.get(24055);
  const simposio = itemsById.get(24632);
  const comite = itemsById.get(24231);
  const entrevistas = itemsById.get(19637);

  const post24509 = itemsById.get(24509);
  const post24540 = itemsById.get(24540);
  const post24523 = itemsById.get(24523);
  const post24526 = itemsById.get(24526);
  const post24493 = itemsById.get(24493);

  const paginasEstaticas = [contacto, terms]
    .filter((item): item is ReportItem => Boolean(item))
    .map((item) =>
      toPayloadExportRecord(item, {
        notas_migracion: `${item.migration_notes} Exportar como pagina estatica limpia sin markup WordPress.`,
      }),
    );

  const ciclos = [capacitacion, entrevistas]
    .filter((item): item is ReportItem => Boolean(item))
    .flatMap((item) => {
      if (item.source_wp_id === 21399) {
        return [
          toPayloadExportRecord(item, {
            titulo: 'Ciclo Usina Debate - Ley de Salud Mental',
            slug: 'usina-debate-ley-de-salud-mental',
            notas_migracion:
              'Crear entrada de Ciclos desde la pagina agrupadora de WordPress. Extraer resumen, dos videos y dossier asociado.',
            extra: {
              nombre_ciclo: 'Usina Debate',
              video_urls: ['https://youtu.be/tr77UQi5Doc', 'https://youtu.be/A5F0XAFFIzE'],
              materiales_urls: [
                'https://ivujus.org.ar/wp-content/uploads/2023/07/Dossier-Salud-Mental.pdf',
              ],
            },
          }),
          toPayloadExportRecord(item, {
            titulo: 'Ciclo Usina Debate - Juicio por Jurados',
            slug: 'usina-debate-juicio-por-jurados',
            notas_migracion:
              'Crear entrada de Ciclos desde la pagina agrupadora de WordPress. Extraer resumen, video y publicacion asociada.',
            extra: {
              nombre_ciclo: 'Usina Debate',
              video_urls: ['https://youtu.be/2MlqecC0tv8'],
              materiales_urls: ['https://ivujus.org.ar/wp-content/uploads/2023/07/prision-perpetua.pdf'],
            },
          }),
        ];
      }

      return [
        toPayloadExportRecord(item, {
          titulo: 'Entrevistas en radios',
          slug: 'entrevistas-en-radios',
          notas_migracion:
            'Archivo audiovisual secundario. Migrar solo si se decide preservar entrevistas como parte de formacion o archivo institucional.',
          extra: {
            nombre_ciclo: 'Archivo audiovisual',
            video_urls: [
              'https://youtu.be/3S0naw77slk',
              'https://www.youtube.com/watch?v=s4c-S2EAVAo',
              'https://youtu.be/_jvPJ9cZ8nY',
            ],
          },
        }),
      ];
    });

  const declaraciones = simposio
    ? [
        toPayloadExportRecord(simposio, {
          titulo: 'Declaracion de Buenos Aires',
          slug: 'declaracion-de-buenos-aires',
          notas_migracion:
            'Crear Declaracion vinculada al simposio 2026. Extraer texto completo desde la page o desde el PDF oficial.',
          extra: {
            fecha: '2026-04-10',
            simposio_slug_referencia: '2026-buenos-aires',
            pdf_url:
              'https://ivujus.org.ar/wp-content/uploads/2026/04/Declaracion-de-Buenos-Aires-Traduccion-al-Ingles-Frances-y-Portugues.pdf',
          },
        }),
      ]
    : [];

  const publicaciones = [post24509, post24540]
    .filter((item): item is ReportItem => Boolean(item))
    .map((item) =>
      toPayloadExportRecord(item, {
        titulo: 'Nuevos Paradigmas para la Justicia Penal',
        slug: 'nuevos-paradigmas-para-la-justicia-penal',
        notas_migracion:
          'Consolidar ambos posts alrededor de un unico objeto editorial de tipo libro. Resolver autores, presentacion y assets asociados.',
        extra: {
          tipo: 'libro',
          source_posts_relacionados: [24509, 24540],
        },
      }),
    )
    .filter((item, index) => index === 0);

  const novedades = items.filter(
    (item) =>
      item.migration_status === 'migrar' &&
      item.destination.includes('novedades') &&
      ![24509, 24540].includes(item.source_wp_id),
  ).map((item) => {
    const extra: Record<string, unknown> = {};

    if (item.source_wp_id === 24625) {
      extra.tipo = 'evento';
      extra.simposio_slug_referencia = '2026-buenos-aires';
    } else if (item.source_wp_id === 24544) {
      extra.tipo = 'reconocimiento';
    } else if (item.source_wp_id === 24591 || item.source_wp_id === 24513) {
      extra.tipo = 'difusion';
    } else {
      extra.tipo = 'institucional';
    }

    return toPayloadExportRecord(item, { extra });
  });

  const indiceLegislativoSinEntradaCanonica = [post24523, post24526, post24493]
    .filter((item): item is ReportItem => Boolean(item))
    .map((item) =>
      toPayloadExportRecord(item, {
        notas_migracion:
          'Relacionar con la futura seccion del indice legislativo. Todavia no representa una entrada canonica de norma individual.',
      }),
    );

  const institutoDesagregado = [nosotros, comite, campus]
    .filter((item): item is ReportItem => Boolean(item))
    .map((item) =>
      toPayloadExportRecord(item, {
        notas_migracion:
          'Contenido de pagina monolitica o agrupadora que debe desarmarse en multiples piezas antes de importarlo.',
      }),
    );

  return {
    generatedAt: new Date().toISOString(),
    collections: {
      paginasEstaticas,
      ciclos,
      declaraciones,
      novedades,
      publicaciones,
    },
    backlog: {
      home: home ? [toPayloadExportRecord(home)] : [],
      indiceLegislativoSinEntradaCanonica,
      institutoDesagregado,
    },
    gaps: [
      'La seccion indice-legislativo todavia no tiene una entrada canonica de norma individual para estos posts; son anuncios y piezas derivadas.',
      'La page nosotros debe desarmarse en entidades separadas antes de importarse a Payload.',
    ],
  };
}

function buildImportReadyPayloadExports(
  proposed: ProposedPayloadExports,
  decisions: EditorialDecisionRecord[],
): ImportReadyPayloadExports {
  const approvedIds = new Set(
    decisions.filter((item) => item.approved_for_import).map((item) => item.source_wp_id),
  );

  const collections = emptyCollectionMap();

  (Object.keys(proposed.collections) as CollectionKey[]).forEach((key) => {
    collections[key] = proposed.collections[key].filter((item) => approvedIds.has(item.source_wp_id));
  });

  return {
    generatedAt: new Date().toISOString(),
    collections,
  };
}

async function main() {
  const [pages, posts, categories] = await Promise.all([
    getJson<WpPage[]>('/pages?per_page=100&_fields=id,slug,link,title,excerpt,modified'),
    getJson<WpPost[]>('/posts?per_page=100&_fields=id,slug,link,title,excerpt,date,modified,categories'),
    getJson<WpCategory[]>('/categories?per_page=100&_fields=id,slug,name'),
  ]);

  const pageById = new Map(pages.map((page) => [page.id, page]));
  const postById = new Map(posts.map((post) => [post.id, post]));
  const categoryById = new Map(categories.map((category) => [category.id, category.slug]));

  const reportPages = pageDecisions
    .map((decision) => {
      const page = pageById.get(decision.id);
      if (!page) throw new Error(`Pagina no encontrada en WP: ${decision.id}`);
      return buildPageItem(page, decision);
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const reportPosts = postDecisions
    .map((decision) => {
      const post = postById.get(decision.id);
      if (!post) throw new Error(`Post no encontrado en WP: ${decision.id}`);
      return buildPostItem(post, decision, categoryById);
    })
    .sort((a, b) => b.modified_at.localeCompare(a.modified_at));

  const pageCounts = countStatuses(reportPages);
  const postCounts = countStatuses(reportPosts);
  const editorialDecisions = [...reportPages, ...reportPosts].map(getEditorialDecision);

  const report: Report = {
    generatedAt: new Date().toISOString(),
    sourceBaseUrl: SOURCE_BASE_URL,
    summary: {
      pages: reportPages.length,
      posts: reportPosts.length,
      migrar: pageCounts.migrar + postCounts.migrar,
      no_migrar: pageCounts.no_migrar + postCounts.no_migrar,
      revisar: pageCounts.revisar + postCounts.revisar,
    },
    pages: reportPages,
    posts: reportPosts,
  };

  const buckets = buildBuckets([...reportPages, ...reportPosts]);
  const proposedPayloadExports = buildProposedPayloadExports([...reportPages, ...reportPosts]);
  const importReadyPayloadExports = buildImportReadyPayloadExports(
    proposedPayloadExports,
    editorialDecisions,
  );

  await writeFile(
    new URL('../docs/wp-migration-report.json', import.meta.url),
    `${JSON.stringify(report, null, 2)}\n`,
    'utf8',
  );

  await writeFile(
    new URL('../docs/wp-migration-buckets.json', import.meta.url),
    `${JSON.stringify(buckets, null, 2)}\n`,
    'utf8',
  );

  await writeFile(
    new URL('../docs/wp-editorial-decisions.json', import.meta.url),
    `${JSON.stringify(editorialDecisions, null, 2)}\n`,
    'utf8',
  );

  await writeFile(
    new URL('../docs/wp-proposed-payload-exports.json', import.meta.url),
    `${JSON.stringify(proposedPayloadExports, null, 2)}\n`,
    'utf8',
  );

  await writeFile(
    new URL('../docs/wp-import-ready-payload-exports.json', import.meta.url),
    `${JSON.stringify(importReadyPayloadExports, null, 2)}\n`,
    'utf8',
  );

  const proposedSeedsDir = new URL('../docs/proposed-seeds/', import.meta.url);
  const importReadySeedsDir = new URL('../docs/import-ready-seeds/', import.meta.url);
  await mkdir(proposedSeedsDir, { recursive: true });
  await mkdir(importReadySeedsDir, { recursive: true });

  const seedFiles: Array<[string, unknown]> = [
    ['paginas-estaticas.json', proposedPayloadExports.collections.paginasEstaticas],
    ['ciclos.json', proposedPayloadExports.collections.ciclos],
    ['declaraciones.json', proposedPayloadExports.collections.declaraciones],
    ['novedades.json', proposedPayloadExports.collections.novedades],
    ['publicaciones.json', proposedPayloadExports.collections.publicaciones],
    ['backlog-home.json', proposedPayloadExports.backlog.home],
    ['backlog-indice-legislativo.json', proposedPayloadExports.backlog.indiceLegislativoSinEntradaCanonica],
    ['backlog-instituto.json', proposedPayloadExports.backlog.institutoDesagregado],
  ];

  await Promise.all(
    seedFiles.map(([fileName, payload]) =>
      writeFile(new URL(fileName, proposedSeedsDir), `${JSON.stringify(payload, null, 2)}\n`, 'utf8'),
    ),
  );

  const importReadySeedFiles: Array<[string, unknown]> = [
    ['paginas-estaticas.json', importReadyPayloadExports.collections.paginasEstaticas],
    ['ciclos.json', importReadyPayloadExports.collections.ciclos],
    ['declaraciones.json', importReadyPayloadExports.collections.declaraciones],
    ['novedades.json', importReadyPayloadExports.collections.novedades],
    ['publicaciones.json', importReadyPayloadExports.collections.publicaciones],
  ];

  await Promise.all(
    importReadySeedFiles.map(([fileName, payload]) =>
      writeFile(new URL(fileName, importReadySeedsDir), `${JSON.stringify(payload, null, 2)}\n`, 'utf8'),
    ),
  );

  console.log(`Reporte generado: docs/wp-migration-report.json`);
  console.log(`Buckets generados: docs/wp-migration-buckets.json`);
  console.log(`Decisiones editoriales: docs/wp-editorial-decisions.json`);
  console.log(`Exports propuestos: docs/wp-proposed-payload-exports.json`);
  console.log(`Exports import-ready: docs/wp-import-ready-payload-exports.json`);
  console.log(`Proposed seeds: docs/proposed-seeds/*.json`);
  console.log(`Import-ready seeds: docs/import-ready-seeds/*.json`);
  console.log(`Paginas: ${report.summary.pages}`);
  console.log(`Posts: ${report.summary.posts}`);
  console.log(`Migrar: ${report.summary.migrar}`);
  console.log(`No migrar: ${report.summary.no_migrar}`);
  console.log(`Revisar: ${report.summary.revisar}`);
}

await main();
