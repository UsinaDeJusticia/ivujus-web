import type { Metadata } from 'next';

const SITE_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL ?? 'https://ivujus.org.ar';
const LOCALES = ['es', 'en', 'fr'] as const;

export function getSiteUrl() {
  return SITE_URL;
}

export function buildLocalizedMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const canonical = `/${locale}${normalizedPath}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        LOCALES.map((entryLocale) => [entryLocale, `/${entryLocale}${normalizedPath}`]),
      ),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'IVUJUS',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function buildJsonLdScript(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data),
  };
}

// --- Builders JSON-LD tipados -----------------------------------------
//
// Consolidan la forma de los objetos `jsonLd` que hoy arman inline las
// páginas de src/app/(frontend) (instituto, consejo-directivo, comite-
// cientifico, simposios, formación, novedades, publicaciones). Cada builder
// devuelve un objeto listo para pasar a `buildJsonLdScript`. No se tocan
// páginas en esta ola: son solo funciones nuevas, sin uso todavía.

/** Referencia embebida a una organización (worksFor, affiliation, publisher, organizer, provider, author). */
export interface OrganizationRefJsonLd {
  '@type': 'NGO' | 'Organization';
  name: string;
  url?: string;
}

export interface OrganizationJsonLd {
  '@context': 'https://schema.org';
  '@type': 'NGO';
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs: string[];
}

export function buildOrganizationJsonLd({
  name,
  url,
  logo,
  description,
  // Las redes sociales reales del IVUJUS (no las de Usina de Justicia, que
  // es lo que hoy aparece hardcodeado en instituto/page.tsx) todavía no
  // están confirmadas por Jair — default vacío para no inventar URLs;
  // se cablean en una ola posterior.
  sameAs = [],
}: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}): OrganizationJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name,
    url,
    ...(logo ? { logo } : {}),
    ...(description ? { description } : {}),
    sameAs,
  };
}

export interface WebSiteJsonLd {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  inLanguage: string;
}

export function buildWebSiteJsonLd({
  name,
  url,
  inLanguage,
}: {
  name: string;
  url: string;
  inLanguage: string;
}): WebSiteJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    inLanguage,
  };
}

/**
 * Datos de una persona tal como los exponen hoy `InstitutePerson`
 * (src/lib/instituto.ts): `role` cubre tanto "cargo" (consejo directivo)
 * como "país" (comité científico, donde `role` y `country` suelen coincidir
 * — ver comentario en comite-cientifico/[slug]/page.tsx). `sameAs` es
 * opcional porque ninguna persona del dataset actual lo tiene todavía.
 */
export interface PersonJsonLdInput {
  name: string;
  jobTitle?: string;
  country?: string;
  summary?: string;
  image?: string;
  url?: string;
  sameAs?: string[];
}

export interface PersonJsonLdOrganization {
  name: string;
  url: string;
  /** worksFor: pertenencia orgánica (consejo directivo). affiliation: vínculo de autoridad académica (comité científico). Default 'worksFor'. */
  relation?: 'worksFor' | 'affiliation';
}

export interface PersonJsonLd {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  url?: string;
  nationality?: string;
  sameAs?: string[];
  worksFor?: OrganizationRefJsonLd;
  affiliation?: OrganizationRefJsonLd;
}

export function buildPersonJsonLd(
  person: PersonJsonLdInput,
  locale: string,
  organization?: PersonJsonLdOrganization,
): PersonJsonLd {
  const relation = organization?.relation ?? 'worksFor';
  const orgRef: OrganizationRefJsonLd | undefined = organization
    ? { '@type': 'NGO', name: organization.name, url: organization.url }
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    ...(person.jobTitle ? { jobTitle: person.jobTitle } : {}),
    ...(person.summary ? { description: person.summary } : {}),
    ...(person.image ? { image: person.image } : {}),
    ...(person.url ? { url: person.url } : {}),
    ...(person.country ? { nationality: person.country } : {}),
    ...(person.sameAs && person.sameAs.length > 0 ? { sameAs: person.sameAs } : {}),
    ...(orgRef ? { [relation]: orgRef } : {}),
    // `locale` no se serializa: hoy los perfiles (instituto.ts) no traen
    // contenido localizado, solo labels de UI (ver LABELS en
    // consejo-directivo/[slug]/page.tsx). Se recibe igual para que el
    // builder pueda distinguir a futuro cuándo el `Person` sí tenga campos
    // traducidos y necesite variar `description`/`jobTitle` por idioma.
  } satisfies PersonJsonLd;
}

export interface EventJsonLdLocation {
  name: string;
  addressLocality?: string;
  addressCountry?: string;
}

export interface EventJsonLdOrganizer {
  name: string;
  url: string;
}

export interface EventJsonLd {
  '@context': 'https://schema.org';
  '@type': 'Event';
  name: string;
  description: string;
  url: string;
  startDate: string;
  endDate?: string;
  eventAttendanceMode?: string;
  eventStatus?: string;
  location?: {
    '@type': 'Place';
    name: string;
    address?: {
      '@type': 'PostalAddress';
      addressLocality?: string;
      addressCountry?: string;
    };
  };
  organizer?: OrganizationRefJsonLd;
}

export function buildEventJsonLd({
  name,
  description,
  url,
  startDate,
  endDate,
  eventAttendanceMode = 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus = 'https://schema.org/EventCompleted',
  location,
  organizer,
}: {
  name: string;
  description: string;
  url: string;
  startDate: string;
  endDate?: string;
  eventAttendanceMode?: string;
  eventStatus?: string;
  location?: EventJsonLdLocation;
  organizer?: EventJsonLdOrganizer;
}): EventJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    url,
    startDate,
    ...(endDate ? { endDate } : {}),
    eventAttendanceMode,
    eventStatus,
    ...(location
      ? {
          location: {
            '@type': 'Place',
            name: location.name,
            ...(location.addressLocality || location.addressCountry
              ? {
                  address: {
                    '@type': 'PostalAddress',
                    ...(location.addressLocality ? { addressLocality: location.addressLocality } : {}),
                    ...(location.addressCountry ? { addressCountry: location.addressCountry } : {}),
                  },
                }
              : {}),
          },
        }
      : {}),
    ...(organizer
      ? { organizer: { '@type': 'NGO', name: organizer.name, url: organizer.url } }
      : {}),
  };
}

export interface CourseJsonLdProvider {
  name: string;
  url: string;
}

export interface CourseJsonLdInstance {
  courseMode: string;
  url: string;
}

export interface CourseJsonLd {
  '@context': 'https://schema.org';
  '@type': 'Course';
  name: string;
  description: string;
  url: string;
  provider?: OrganizationRefJsonLd;
  hasCourseInstance?: {
    '@type': 'CourseInstance';
    courseMode: string;
    url: string;
  };
}

export function buildCourseJsonLd({
  name,
  description,
  url,
  provider,
  courseInstance,
}: {
  name: string;
  description: string;
  url: string;
  provider?: CourseJsonLdProvider;
  courseInstance?: CourseJsonLdInstance;
}): CourseJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    url,
    ...(provider ? { provider: { '@type': 'NGO', name: provider.name, url: provider.url } } : {}),
    ...(courseInstance
      ? {
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: courseInstance.courseMode,
            url: courseInstance.url,
          },
        }
      : {}),
  };
}

/** Cubre novedades (src/lib/novedades.ts, campo `Novedad`). */
export interface NewsArticleJsonLdPublisher {
  name: string;
  url: string;
}

export interface NewsArticleJsonLd {
  '@context': 'https://schema.org';
  '@type': 'NewsArticle';
  headline: string;
  description: string;
  datePublished: string;
  url: string;
  image?: string[];
  publisher?: OrganizationRefJsonLd;
}

export function buildNewsArticleJsonLd({
  headline,
  description,
  datePublished,
  url,
  image,
  publisher,
}: {
  headline: string;
  description: string;
  datePublished: string;
  url: string;
  image?: string;
  publisher?: NewsArticleJsonLdPublisher;
}): NewsArticleJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline,
    description,
    datePublished,
    url,
    ...(image ? { image: [image] } : {}),
    ...(publisher
      ? { publisher: { '@type': 'NGO', name: publisher.name, url: publisher.url } }
      : {}),
  };
}

/**
 * Genérico para piezas doctrinarias/editoriales que no son novedades del
 * blog: declaración de simposio (CreativeWork, ver
 * declaracion-de-buenos-aires/page.tsx), o un artículo de opinión/doctrina
 * (Article) si se necesita a futuro. `type` por defecto 'Article'.
 */
export interface ArticleJsonLdAuthor {
  name: string;
  url?: string;
  type?: 'Organization' | 'Person';
}

export interface ArticleJsonLdEncoding {
  contentUrl: string;
  encodingFormat: string;
}

export interface ArticleJsonLd {
  '@context': 'https://schema.org';
  '@type': 'Article' | 'CreativeWork';
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  inLanguage?: string[];
  about?: string;
  author?: OrganizationRefJsonLd | { '@type': 'Person'; name: string; url?: string };
  encoding?: {
    '@type': 'MediaObject';
    contentUrl: string;
    encodingFormat: string;
  };
}

export function buildArticleJsonLd({
  type = 'Article',
  name,
  description,
  url,
  datePublished,
  inLanguage,
  about,
  author,
  encoding,
}: {
  type?: 'Article' | 'CreativeWork';
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  inLanguage?: string[];
  about?: string;
  author?: ArticleJsonLdAuthor;
  encoding?: ArticleJsonLdEncoding;
}): ArticleJsonLd {
  const authorType = author?.type ?? 'Organization';

  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    ...(datePublished ? { datePublished } : {}),
    ...(inLanguage ? { inLanguage } : {}),
    ...(about ? { about } : {}),
    ...(author
      ? {
          author:
            authorType === 'Person'
              ? { '@type': 'Person', name: author.name, ...(author.url ? { url: author.url } : {}) }
              : { '@type': 'Organization', name: author.name, ...(author.url ? { url: author.url } : {}) },
        }
      : {}),
    ...(encoding
      ? {
          encoding: {
            '@type': 'MediaObject',
            contentUrl: encoding.contentUrl,
            encodingFormat: encoding.encodingFormat,
          },
        }
      : {}),
  };
}

export interface BreadcrumbItemJsonLd {
  name: string;
  url: string;
}

export interface BreadcrumbListJsonLd {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItemJsonLd[]): BreadcrumbListJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Sin uso todavía: preparado para un futuro glosario de términos de
 * victimología/derecho victimal (no existe esa sección en el sitio aún).
 * `inDefinedTermSet` queda opcional porque tampoco existe todavía un
 * `DefinedTermSet` publicado al que apuntar.
 */
export interface DefinedTermJsonLd {
  '@context': 'https://schema.org';
  '@type': 'DefinedTerm';
  name: string;
  description?: string;
  url?: string;
  inDefinedTermSet?: string;
}

export function buildDefinedTermJsonLd({
  name,
  description,
  url,
  inDefinedTermSet,
}: {
  name: string;
  description?: string;
  url?: string;
  inDefinedTermSet?: string;
}): DefinedTermJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name,
    ...(description ? { description } : {}),
    ...(url ? { url } : {}),
    ...(inDefinedTermSet ? { inDefinedTermSet } : {}),
  };
}
