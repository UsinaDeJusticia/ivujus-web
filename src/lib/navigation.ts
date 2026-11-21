// Estructura de navegación del sitio: una sola fuente para el menú de
// escritorio (desplegables), el menú del celular (acordeón) y el pie.
//
// Orden aprobado por Emanuel el 21-nov-2026, según el recorrido de quien
// visita: quiénes somos → qué ofrecemos → qué producimos → qué medimos →
// qué está pasando. Cinco secciones para que la barra entre completa en
// pantallas medianas en los tres idiomas (ver docs/ARQUITECTURA-CONTENIDO.md).
//
// Las direcciones no cambian: «Actualidad» agrupa /novedades y /simposios,
// que siguen en sus URLs de siempre.
//
// El Observatorio lista sus herramientas desde src/lib/observatorio: una
// herramienta nueva aparece sola en el menú.
import { resolveLocale, type Locale } from './i18n';
import { getHerramientas } from './observatorio';

export type NavLink = {
  label: string;
  /** Una línea que dice qué hay ahí. Se muestra en el desplegable. */
  description?: string;
  /** Ruta sin prefijo de idioma (p. ej. '/instituto') o URL absoluta si `external`. */
  href: string;
  external?: boolean;
};

export type NavSection = {
  id: 'instituto' | 'formacion' | 'publicaciones' | 'observatorio' | 'actualidad';
  label: string;
  /** Página de portada de la sección, para «Ver todo». Ausente si la sección no tiene portada propia. */
  href?: string;
  /** Texto de «Ver todo …». */
  overview?: string;
  links: NavLink[];
};

type SectionCopy = Record<Locale, Omit<NavSection, 'links'> & { links: NavLink[] }>;

const INSTITUTO: SectionCopy = {
  es: {
    id: 'instituto',
    label: 'Instituto',
    href: '/instituto',
    overview: 'Ver todo Instituto',
    links: [
      { label: 'Quiénes somos', description: 'Finalidades y trayectoria del IVUJUS', href: '/instituto' },
      { label: 'Consejo Directivo', description: 'Autoridades del instituto', href: '/instituto/consejo-directivo' },
      { label: 'Comité Científico', description: 'Especialistas nacionales e internacionales', href: '/instituto/comite-cientifico' },
      { label: 'Estatuto', description: 'Texto del estatuto', href: '/instituto/estatuto' },
      { label: 'Contacto', description: 'Escribirnos', href: '/contacto' },
    ],
  },
  en: {
    id: 'instituto',
    label: 'Institute',
    href: '/instituto',
    overview: 'All about the Institute',
    links: [
      { label: 'About us', description: 'Purpose and background of IVUJUS', href: '/instituto' },
      { label: 'Board of Directors', description: 'The Institute’s leadership', href: '/instituto/consejo-directivo' },
      { label: 'Scientific Committee', description: 'National and international experts', href: '/instituto/comite-cientifico' },
      { label: 'Statute', description: 'Text of the Statute', href: '/instituto/estatuto' },
      { label: 'Contact', description: 'Get in touch', href: '/contacto' },
    ],
  },
  fr: {
    id: 'instituto',
    label: 'Institut',
    href: '/instituto',
    overview: 'Tout sur l’Institut',
    links: [
      { label: 'Qui sommes-nous', description: 'Missions et parcours de l’IVUJUS', href: '/instituto' },
      { label: 'Conseil d\'administration', description: 'Les instances de l’Institut', href: '/instituto/consejo-directivo' },
      { label: 'Comité scientifique', description: 'Spécialistes nationaux et internationaux', href: '/instituto/comite-cientifico' },
      { label: 'Statuts', description: 'Texte des statuts', href: '/instituto/estatuto' },
      { label: 'Contact', description: 'Nous écrire', href: '/contacto' },
    ],
  },
};

const FORMACION: SectionCopy = {
  es: {
    id: 'formacion',
    label: 'Formación',
    href: '/formacion',
    overview: 'Ver todo Formación',
    links: [
      { label: 'Diplomatura', description: 'Victimología y leyes de víctimas, cursada virtual', href: '/formacion/diplomatura' },
      { label: 'Ciclos de formación', description: 'Clases, jornadas y entrevistas grabadas', href: '/formacion/ciclos' },
    ],
  },
  en: {
    id: 'formacion',
    label: 'Training',
    href: '/formacion',
    overview: 'All training',
    links: [
      { label: 'Diploma programme', description: 'Victimology and victims’ rights law, online', href: '/formacion/diplomatura' },
      { label: 'Training cycles', description: 'Recorded classes, sessions and interviews', href: '/formacion/ciclos' },
    ],
  },
  fr: {
    id: 'formacion',
    label: 'Formation',
    href: '/formacion',
    overview: 'Toute la formation',
    links: [
      { label: 'Diplôme', description: 'Victimologie et droits des victimes, en ligne', href: '/formacion/diplomatura' },
      { label: 'Cycles de formation', description: 'Cours, journées et entretiens enregistrés', href: '/formacion/ciclos' },
    ],
  },
};

const PUBLICACIONES: SectionCopy = {
  es: {
    id: 'publicaciones',
    label: 'Publicaciones',
    href: '/publicaciones',
    overview: 'Ver todo Publicaciones',
    links: [
      { label: 'Biblioteca', description: 'Todo el material del instituto en un lugar', href: '/publicaciones/biblioteca' },
      { label: 'Libros', description: 'Obras editadas por el IVUJUS', href: '/publicaciones/libros' },
      { label: 'Dossiers temáticos', description: 'Análisis con PDF descargable', href: '/publicaciones/dossiers' },
      { label: 'Declaraciones', description: 'Posiciones institucionales', href: '/publicaciones/declaraciones' },
    ],
  },
  en: {
    id: 'publicaciones',
    label: 'Publications',
    href: '/publicaciones',
    overview: 'All publications',
    links: [
      { label: 'Library', description: 'All of the Institute’s material in one place', href: '/publicaciones/biblioteca' },
      { label: 'Books', description: 'Works edited by IVUJUS', href: '/publicaciones/libros' },
      { label: 'Thematic dossiers', description: 'Analyses with downloadable PDF', href: '/publicaciones/dossiers' },
      { label: 'Declarations', description: 'Institutional positions', href: '/publicaciones/declaraciones' },
    ],
  },
  fr: {
    id: 'publicaciones',
    label: 'Publications',
    href: '/publicaciones',
    overview: 'Toutes les publications',
    links: [
      { label: 'Bibliothèque', description: 'Tout le matériel de l’Institut', href: '/publicaciones/biblioteca' },
      { label: 'Livres', description: 'Ouvrages édités par l’IVUJUS', href: '/publicaciones/libros' },
      { label: 'Dossiers thématiques', description: 'Analyses avec PDF à télécharger', href: '/publicaciones/dossiers' },
      { label: 'Déclarations', description: 'Positions institutionnelles', href: '/publicaciones/declaraciones' },
    ],
  },
};

const OBSERVATORIO: Record<Locale, Omit<NavSection, 'links'>> = {
  es: { id: 'observatorio', label: 'Observatorio', href: '/observatorio', overview: 'Ver todo Observatorio' },
  en: { id: 'observatorio', label: 'Observatory', href: '/observatorio', overview: 'All tools' },
  fr: { id: 'observatorio', label: 'Observatoire', href: '/observatorio', overview: 'Tous les outils' },
};

// «Actualidad» no tiene portada propia: agrupa dos secciones que ya existen.
// En francés se llama «Agenda» porque «Actualités» ya es el nombre de
// Novedades (glosario) y quedarían dos rótulos casi iguales.
const ACTUALIDAD: SectionCopy = {
  es: {
    id: 'actualidad',
    label: 'Actualidad',
    links: [
      { label: 'Novedades', description: 'Noticias del instituto', href: '/novedades' },
      { label: 'Eventos académicos', description: 'Simposios, encuentros y conferencias', href: '/simposios' },
      { label: 'Simposio 2026', description: 'Primer Simposio Americano y Europeo de Victimología Penal', href: '/simposios/2026-buenos-aires' },
      { label: 'Encuentros y conferencias', description: 'Presentaciones y jornadas', href: '/simposios/encuentros' },
    ],
  },
  en: {
    id: 'actualidad',
    label: 'News & Events',
    links: [
      { label: 'Updates', description: 'News from the Institute', href: '/novedades' },
      { label: 'Academic Events', description: 'Symposia, meetings and lectures', href: '/simposios' },
      { label: 'Symposium 2026', description: 'First American and European Symposium on Criminal Victimology', href: '/simposios/2026-buenos-aires' },
      { label: 'Meetings and Conferences', description: 'Presentations and sessions', href: '/simposios/encuentros' },
    ],
  },
  fr: {
    id: 'actualidad',
    label: 'Agenda',
    links: [
      { label: 'Actualités', description: 'Les nouvelles de l’Institut', href: '/novedades' },
      { label: 'Événements académiques', description: 'Symposiums, rencontres et conférences', href: '/simposios' },
      { label: 'Symposium 2026', description: 'Premier Symposium américain et européen de victimologie pénale', href: '/simposios/2026-buenos-aires' },
      { label: 'Rencontres et conférences', description: 'Présentations et journées', href: '/simposios/encuentros' },
    ],
  },
};

export function getNavSections(localeValue: string): NavSection[] {
  const locale = resolveLocale(localeValue);
  return [
    INSTITUTO[locale],
    FORMACION[locale],
    PUBLICACIONES[locale],
    {
      ...OBSERVATORIO[locale],
      links: getHerramientas(locale).map((herramienta) => ({
        label: herramienta.nombre,
        description: herramienta.resumen,
        href: `/observatorio/${herramienta.slug}`,
      })),
    },
    ACTUALIDAD[locale],
  ];
}
