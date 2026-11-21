import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { resolveLocale } from '@/lib/i18n';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { getHerramienta, getObservatorioLabels, herramientasDataEs } from '@/lib/observatorio';
import { Eyebrow } from '@/components/ui/SectionHeader';
import { ButtonPrincipal, LinkArrow } from '@/components/ui/Buttons';

export function generateStaticParams() {
  return herramientasDataEs.map((herramienta) => ({ slug: herramienta.slug }));
}

// Solo existen las herramientas del dataset: cualquier otro slug es 404.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const herramienta = getHerramienta(slug, locale);
  if (!herramienta) return {};
  return buildLocalizedMetadata({
    locale,
    path: `/observatorio/${herramienta.slug}`,
    title: herramienta.nombre,
    description: herramienta.resumen,
  });
}

export default async function HerramientaPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const resolvedLocale = resolveLocale(locale);
  const labels = getObservatorioLabels(locale);
  const herramienta = getHerramienta(slug, locale);
  if (!herramienta) notFound();

  const pageUrl = `${getSiteUrl()}/${resolvedLocale}/observatorio/${herramienta.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: herramienta.nombre,
    description: herramienta.resumen,
    url: herramienta.url,
    mainEntityOfPage: pageUrl,
    applicationCategory: 'ReferenceApplication',
    operatingSystem: 'Web',
    isAccessibleForFree: true,
    creator: { '@type': 'NGO', name: herramienta.autoria },
    provider: {
      '@type': 'NGO',
      name: 'Instituto de Victimología de Usina de Justicia',
      url: `${getSiteUrl()}/${resolvedLocale}/instituto`,
    },
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: labels.breadcrumbHome, item: `${getSiteUrl()}/${resolvedLocale}` },
      { '@type': 'ListItem', position: 2, name: labels.eyebrow, item: `${getSiteUrl()}/${resolvedLocale}/observatorio` },
      { '@type': 'ListItem', position: 3, name: herramienta.nombre, item: pageUrl },
    ],
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(breadcrumbJsonLd)} />
      <div className="mx-auto max-w-[var(--container-narrow)] space-y-12 px-6 py-16 sm:px-10">
        <header className="space-y-5 border-b border-[color:var(--ui-border)] pb-10">
          <Eyebrow>{labels.eyebrow}</Eyebrow>
          <h1 className="max-w-3xl text-balance break-words text-[length:clamp(30px,4.4vw,48px)]">
            {herramienta.nombre}
          </h1>
          <p className="text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">{herramienta.resumen}</p>
          <p className="text-sm font-semibold text-[color:var(--ui-ink-2)]">{herramienta.credito}</p>
        </header>

        <div className="space-y-5">
          {herramienta.descripcion.map((parrafo, index) => (
            <p key={index} className="text-pretty text-base leading-[1.8] text-[color:var(--ui-ink-3)]">
              {parrafo}
            </p>
          ))}
        </div>

        <section className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)] sm:p-8">
          <h2 className="text-[length:clamp(20px,2.4vw,26px)]">{labels.fichaHeading}</h2>
          <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-[max-content_1fr]">
            {herramienta.ficha.map((item) => (
              <div key={item.etiqueta} className="contents">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ui-ink-3)]">
                  {item.etiqueta}
                </dt>
                <dd className="text-base text-[color:var(--ui-ink-1)]">{item.valor}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 space-y-3">
            <ButtonPrincipal href={herramienta.url} target="_blank" rel="noopener">
              {herramienta.abrir}
            </ButtonPrincipal>
            <p className="text-sm text-[color:var(--ui-ink-3)]">
              {labels.abreEnPestana}
              {herramienta.notaIdioma ? ` ${herramienta.notaIdioma}` : ''}
            </p>
          </div>
        </section>

        <div>
          <LinkArrow href={`/${resolvedLocale}/observatorio`}>{labels.volver}</LinkArrow>
        </div>
      </div>
    </main>
  );
}
