import type { Metadata } from 'next';

import { pickLocale, resolveLocale, type Locale } from '@/lib/i18n';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { getPublicacionesLabels } from '@/lib/publicaciones';
import { Eyebrow, SectionHeader } from '@/components/ui/SectionHeader';
import { ContentCard } from '@/components/cards/ContentCard';

// Sin builder dedicado en src/lib/seo.ts (no existe buildBreadcrumbJsonLd
// todavía); se arma el objeto BreadcrumbList a mano, serializado con el
// buildJsonLdScript existente, igual patrón que ya usan libros/page.tsx y
// declaracion-de-buenos-aires/page.tsx para su JSON-LD.
const HOME_LABEL: Record<string, string> = { es: 'Inicio', en: 'Home', fr: 'Accueil' };

// Copy propio de esta página (no vive en src/lib/publicaciones porque son
// textos fijos del hub, no contenido curado del dataset). El título de la
// tarjeta de "Libros" queda igual en los tres idiomas a propósito: es el
// título real del libro, publicado en español (ver docs/GLOSARIO-TRADUCCION.md
// §5 ter).
const PAGE_COPY: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    bajada: string;
    archivoEyebrow: string;
    archivoTitle: string;
    declaracionesCardTitle: string;
    declaracionesCardDescription: string;
    librosCardDescription: string;
    dossiersCardDescription: string;
  }
> = {
  es: {
    metaTitle: 'Publicaciones',
    metaDescription:
      'Declaraciones institucionales y producción editorial del Instituto de Victimología de Usina de Justicia.',
    h1: 'Publicaciones del Instituto de Victimología',
    bajada:
      'Declaraciones institucionales, tomas de posición y producción editorial que documentan la actividad académica del IVUJUS.',
    archivoEyebrow: 'Archivo',
    archivoTitle: 'Fuentes de producción: declaraciones, libros, dossier.',
    declaracionesCardTitle: 'Declaraciones institucionales',
    declaracionesCardDescription:
      'Documentos oficiales firmados al cierre de encuentros académicos, como la Declaración de Buenos Aires.',
    librosCardDescription:
      'Libro compilado por Diana Cohen Agrest y María Jimena Molina, con artículos de referentes del ámbito jurídico y académico.',
    dossiersCardDescription:
      'Investigaciones del Instituto sobre prisión perpetua, salud mental y responsabilidad penal juvenil, con el documento completo para descargar.',
  },
  en: {
    metaTitle: 'Publications',
    metaDescription:
      'Institutional declarations and editorial output from the Institute of Victimology of Usina de Justicia.',
    h1: 'Publications of the Institute of Victimology',
    bajada:
      "Institutional declarations, position statements and editorial output documenting IVUJUS's academic activity.",
    archivoEyebrow: 'Archive',
    archivoTitle: 'Production sources: declarations, books, dossier.',
    declaracionesCardTitle: 'Institutional declarations',
    declaracionesCardDescription:
      'Official documents signed at the close of academic gatherings, such as the Buenos Aires Declaration.',
    librosCardDescription:
      'Book edited by Diana Cohen Agrest and María Jimena Molina, with articles by leading figures from the legal and academic fields.',
    dossiersCardDescription:
      "Institute research on life imprisonment, mental health and juvenile criminal responsibility, with the full document available for download.",
  },
  fr: {
    metaTitle: 'Publications',
    metaDescription:
      "Déclarations institutionnelles et production éditoriale de l'Institut de Victimologie d'Usina de Justicia.",
    h1: "Publications de l'Institut de Victimologie",
    bajada:
      "Déclarations institutionnelles, prises de position et production éditoriale qui documentent l'activité académique de l'IVUJUS.",
    archivoEyebrow: 'Archives',
    archivoTitle: 'Sources de production : déclarations, livres, dossier.',
    declaracionesCardTitle: 'Déclarations institutionnelles',
    declaracionesCardDescription:
      'Documents officiels signés à la clôture de rencontres académiques, comme la Déclaration de Buenos Aires.',
    librosCardDescription:
      "Livre sous la direction de Diana Cohen Agrest et María Jimena Molina, avec des articles de référents des milieux juridique et universitaire.",
    dossiersCardDescription:
      "Recherches de l'Institut sur la réclusion à perpétuité, la santé mentale et la responsabilité pénale des mineurs, avec le document complet à télécharger.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = pickLocale(PAGE_COPY, locale);

  return buildLocalizedMetadata({
    locale,
    path: '/publicaciones',
    title: copy.metaTitle,
    description: copy.metaDescription,
  });
}

// Hub mínimo: solo lista categorías con contenido real hoy. "Libros" existe
// porque /publicaciones/libros tiene contenido trazable (ver
// src/lib/publicaciones.ts); si en el futuro esa página se retira, esta
// tarjeta debe retirarse con ella — no dejar categorías vacías.
export default async function PublicacionesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const labels = getPublicacionesLabels(locale);
  // Bug encontrado al agregar la tarjeta de Dossiers: PAGE_COPY ya tenía las
  // tres traducciones completas, pero el cuerpo de la página nunca las leía
  // (solo generateMetadata las usaba) — el h1, la bajada y las dos tarjetas
  // quedaban siempre en español sin importar el idioma. Corregido acá.
  const copy = pickLocale(PAGE_COPY, locale);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: HOME_LABEL[locale] ?? HOME_LABEL.es, item: `${getSiteUrl()}/${locale}` },
      {
        '@type': 'ListItem',
        position: 2,
        name: labels.publicaciones,
        item: `${getSiteUrl()}/${locale}/publicaciones`,
      },
    ],
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={buildJsonLdScript(breadcrumbJsonLd)}
      />
      <div className="mx-auto max-w-[var(--container-default)] space-y-16 px-6 py-16 sm:px-10">
        <header className="max-w-4xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>{labels.publicaciones}</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[length:clamp(34px,5vw,60px)]">{copy.h1}</h1>
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            {copy.bajada}
          </p>
        </header>

        <section className="space-y-10">
          <SectionHeader eyebrow={copy.archivoEyebrow} title={copy.archivoTitle} />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <ContentCard
              href={`/${locale}/publicaciones/declaraciones`}
              eyebrow={labels.declaraciones}
              title={copy.declaracionesCardTitle}
              description={copy.declaracionesCardDescription}
            />
            <ContentCard
              href={`/${locale}/publicaciones/libros`}
              eyebrow={labels.libros}
              title="Nuevos Paradigmas para la Justicia Penal"
              description={copy.librosCardDescription}
            />
            <ContentCard
              href={`/${locale}/publicaciones/dossiers`}
              eyebrow={labels.dossiers}
              title={labels.dossiersTitle}
              description={copy.dossiersCardDescription}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
