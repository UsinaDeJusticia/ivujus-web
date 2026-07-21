import type { Metadata } from 'next';

import { institutoData } from '@/lib/instituto';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow } from '@/components/ui/SectionHeader';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildLocalizedMetadata({
    locale,
    path: '/instituto/estatuto',
    title: 'Estatuto',
    description:
      'Base institucional, definiciones fundacionales y objetivos del Instituto de Victimología de Usina de Justicia.',
  });
}

export default async function InstituteStatutePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${getSiteUrl()}/${locale}` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Instituto',
        item: `${getSiteUrl()}/${locale}/instituto`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Estatuto',
        item: `${getSiteUrl()}/${locale}/instituto/estatuto`,
      },
    ],
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={buildJsonLdScript(breadcrumbJsonLd)}
      />
      <div className="mx-auto max-w-[var(--container-narrow)] space-y-10 px-6 py-16 sm:px-10">
        <header className="space-y-4 border-b border-[color:var(--ui-border)] pb-8">
          <Eyebrow>Instituto / Estatuto</Eyebrow>
          <h1 className="text-balance text-[length:clamp(30px,4.5vw,48px)]">
            Base institucional y objetivos del IVUJUS.
          </h1>
        </header>

        <section className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)] sm:p-8">
          <h2 className="text-[length:var(--text-lg)] font-semibold uppercase tracking-[var(--tracking-wide)] text-[color:var(--ui-display-ink)]">
            {institutoData.estatuto.heading}
          </h2>
          <div className="mt-6 space-y-5">
            {institutoData.estatuto.articles.map((article) => (
              <p key={article} className="text-base leading-8 text-[color:var(--ui-ink-3)]">
                {article}
              </p>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
