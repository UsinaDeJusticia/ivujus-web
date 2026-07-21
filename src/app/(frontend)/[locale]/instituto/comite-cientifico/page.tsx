import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

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
    path: '/instituto/comite-cientifico',
    title: 'Comité Científico',
    description:
      'Referentes internacionales del comité científico del Instituto de Victimología de Usina de Justicia.',
  });
}

export default async function InstituteScientificCommitteePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Comité Científico del IVUJUS',
    itemListElement: institutoData.comiteCientifico.map((person, index) => ({
      '@type': 'Person',
      position: index + 1,
      name: person.name,
      nationality: person.country,
      description: person.summary,
      image: person.image,
      url: `${getSiteUrl()}/${locale}/instituto/comite-cientifico/${person.slug}`,
      affiliation: {
        '@type': 'NGO',
        name: institutoData.title,
        url: `${getSiteUrl()}/${locale}/instituto`,
      },
    })),
  };

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
        name: 'Comité científico',
        item: `${getSiteUrl()}/${locale}/instituto/comite-cientifico`,
      },
    ],
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={buildJsonLdScript(breadcrumbJsonLd)}
      />
      <div className="mx-auto max-w-[var(--container-default)] space-y-10 px-6 py-16 sm:px-10">
        <header className="max-w-3xl space-y-4 border-b border-[color:var(--ui-border)] pb-8">
          <Eyebrow>Instituto / Comité científico</Eyebrow>
          <h1 className="text-balance text-[length:clamp(30px,4.5vw,48px)]">
            Referentes internacionales para la autoridad académica del instituto.
          </h1>
          <p className="text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            El comité científico aporta legitimidad comparada, investigación especializada y articulación con
            redes de victimología y criminología en distintos países.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          {institutoData.comiteCientifico.map((person) => (
            <Link
              key={person.slug}
              href={`/${locale}/instituto/comite-cientifico/${person.slug}`}
              className="group block rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 no-underline shadow-[var(--shadow-1)] transition-shadow duration-[var(--motion-base)] ease-[var(--easing-standard)] hover:shadow-[var(--shadow-3)]"
            >
              <div className="flex gap-4">
                <div className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[color:var(--ui-bg-muted)]">
                  <Image
                    src={person.image}
                    alt={`Retrato de ${person.name}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h2 className="text-[length:var(--text-lg)] leading-[1.25] tracking-[0.02em] transition-colors duration-[var(--motion-fast)] group-hover:text-[color:var(--ui-link)]">
                    {person.name}
                  </h2>
                  <p className="text-sm font-semibold text-[color:var(--ui-accent-ink)]">{person.role}</p>
                  {person.country && person.country !== person.role ? (
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--ui-ink-4)]">{person.country}</p>
                  ) : null}
                  <p className="text-sm leading-6 text-[color:var(--ui-ink-3)]">{person.summary}</p>
                </div>
              </div>
              <p className="mt-5 border-t border-[color:var(--ui-border)] pt-4 text-sm leading-7 text-[color:var(--ui-ink-3)]">
                {person.bio}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
