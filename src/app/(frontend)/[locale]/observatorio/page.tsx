import type { Metadata } from 'next';

import { resolveLocale } from '@/lib/i18n';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { getHerramientas, getObservatorioLabels } from '@/lib/observatorio';
import { Eyebrow, SectionHeader } from '@/components/ui/SectionHeader';
import { ContentCard } from '@/components/cards/ContentCard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const labels = getObservatorioLabels(locale);
  return buildLocalizedMetadata({
    locale,
    path: '/observatorio',
    title: labels.metaTitle,
    description: labels.metaDescription,
  });
}

// Portada del Observatorio: lista todas las herramientas del dataset. Una
// herramienta nueva en src/lib/observatorio aparece acá sin tocar esta página.
export default async function ObservatorioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = resolveLocale(locale);
  const labels = getObservatorioLabels(locale);
  const herramientas = getHerramientas(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: labels.metaTitle,
    description: labels.metaDescription,
    url: `${getSiteUrl()}/${resolvedLocale}/observatorio`,
    inLanguage: resolvedLocale,
    hasPart: herramientas.map((herramienta) => ({
      '@type': 'WebApplication',
      name: herramienta.nombre,
      description: herramienta.resumen,
      url: `${getSiteUrl()}/${resolvedLocale}/observatorio/${herramienta.slug}`,
    })),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: labels.breadcrumbHome, item: `${getSiteUrl()}/${resolvedLocale}` },
        { '@type': 'ListItem', position: 2, name: labels.eyebrow, item: `${getSiteUrl()}/${resolvedLocale}/observatorio` },
      ],
    },
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <div className="mx-auto max-w-[var(--container-default)] space-y-16 px-6 py-16 sm:px-10">
        <header className="max-w-4xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>{labels.eyebrow}</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[length:clamp(34px,5vw,60px)]">{labels.heading}</h1>
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">{labels.lead}</p>
        </header>

        <section className="space-y-10">
          <SectionHeader eyebrow={labels.eyebrow} title={labels.herramientasHeading} />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {herramientas.map((herramienta) => (
              <ContentCard
                key={herramienta.slug}
                href={`/${resolvedLocale}/observatorio/${herramienta.slug}`}
                eyebrow={herramienta.autoria}
                title={herramienta.nombre}
                description={herramienta.resumen}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
