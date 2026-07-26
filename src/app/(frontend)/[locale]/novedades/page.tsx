import type { Metadata } from 'next';

import { getNovedadesOrdenadas } from '@/lib/novedades';
import { type Locale, pickLocale, resolveLocale, formatDateLong } from '@/lib/i18n';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow } from '@/components/ui/SectionHeader';
import { ContentCard } from '@/components/cards/ContentCard';

// Sin builder dedicado en src/lib/seo.ts (no existe buildBreadcrumbJsonLd
// todavía); mismo patrón manual + buildJsonLdScript que en publicaciones/.

// Copys de interfaz por idioma. Las novedades en sí ya vienen traducidas.
const LABELS: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    heading: string;
    lead: string;
    listHeading: string;
    breadcrumbHome: string;
  }
> = {
  es: {
    metaTitle: 'Novedades',
    metaDescription:
      'Agenda pública y difusión institucional del Instituto de Victimología de Usina de Justicia (IVUJUS).',
    eyebrow: 'Novedades',
    heading: 'Agenda pública y difusión institucional del IVUJUS.',
    lead: 'Noticias, encuentros institucionales y reconocimientos del Instituto de Victimología de Usina de Justicia y de Usina de Justicia.',
    listHeading: 'Últimas novedades',
    breadcrumbHome: 'Inicio',
  },
  en: {
    metaTitle: 'Updates',
    metaDescription:
      'Public agenda and institutional communications of the Institute of Victimology of Usina de Justicia (IVUJUS).',
    eyebrow: 'Updates',
    heading: 'Public agenda and institutional communications of IVUJUS.',
    lead: 'News, institutional gatherings and recognitions of the Institute of Victimology of Usina de Justicia and of Usina de Justicia.',
    listHeading: 'Latest updates',
    breadcrumbHome: 'Home',
  },
  fr: {
    metaTitle: 'Actualités',
    metaDescription:
      "Agenda public et communication institutionnelle de l'Institut de Victimologie d'Usina de Justicia (IVUJUS).",
    eyebrow: 'Actualités',
    heading: "Agenda public et communication institutionnelle de l'IVUJUS.",
    lead: "Nouvelles, rencontres institutionnelles et distinctions de l'Institut de Victimologie d'Usina de Justicia et d'Usina de Justicia.",
    listHeading: 'Dernières actualités',
    breadcrumbHome: 'Accueil',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildLocalizedMetadata({
    locale,
    path: '/novedades',
    title: pickLocale(LABELS, locale).metaTitle,
    description: pickLocale(LABELS, locale).metaDescription,
  });
}


export default async function NovedadesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = resolveLocale(locale);
  const labels = pickLocale(LABELS, locale);
  const novedades = getNovedadesOrdenadas(locale);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: labels.breadcrumbHome,
        item: `${getSiteUrl()}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: labels.eyebrow,
        item: `${getSiteUrl()}/${locale}/novedades`,
      },
    ],
    inLanguage: resolvedLocale,
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={buildJsonLdScript(breadcrumbJsonLd)}
      />
      <div className="mx-auto max-w-[var(--container-default)] space-y-14 px-6 py-16 sm:px-10">
        <header className="max-w-4xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>{labels.eyebrow}</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[length:clamp(34px,5vw,60px)]">
            {labels.heading}
          </h1>
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            {labels.lead}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* h2 accesible para no saltar de h1 a los h3 de las tarjetas
              (heading-order de Lighthouse); la grilla no lleva título visible. */}
          <h2 className="sr-only">{labels.listHeading}</h2>
          {novedades.map((novedad) => (
            <ContentCard
              key={novedad.slug}
              href={`/${locale}/novedades/${novedad.slug}`}
              eyebrow={formatDateLong(novedad.fecha, locale)}
              title={novedad.titulo}
              description={novedad.bajada}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
