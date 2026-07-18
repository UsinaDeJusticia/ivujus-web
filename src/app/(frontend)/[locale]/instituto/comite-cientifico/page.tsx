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
    path: '/instituto/comite-cientifico',
    title: 'Comité Científico',
    description:
      'Referentes internacionales del comité científico del Instituto de Victimología de Usina de Justicia.',
  });
}

export default function InstituteScientificCommitteePage() {
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
      affiliation: {
        '@type': 'NGO',
        name: institutoData.title,
        url: `${getSiteUrl()}/es/instituto`,
      },
    })),
  };

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <div className="mx-auto max-w-[var(--container-default)] space-y-10 px-6 py-16 sm:px-10">
        <header className="max-w-3xl space-y-4 border-b border-gris-200 pb-8">
          <Eyebrow>Instituto / Comité científico</Eyebrow>
          <h1 className="text-balance text-[length:clamp(30px,4.5vw,48px)]">
            Referentes internacionales para la autoridad académica del instituto.
          </h1>
          <p className="text-pretty text-lg leading-[1.7] text-gris-700">
            El comité científico aporta legitimidad comparada, investigación especializada y articulación con
            redes de victimología y criminología en distintos países.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          {institutoData.comiteCientifico.map((person) => (
            <article
              key={person.slug}
              className="rounded-md border border-gris-200 bg-white p-6 shadow-[var(--shadow-1)]"
            >
              <div className="flex gap-4">
                <img src={person.image} alt={person.name} className="h-20 w-20 rounded-full object-cover" />
                <div className="space-y-1">
                  <h2 className="text-[length:var(--text-lg)] leading-[1.25] tracking-[0.02em]">
                    {person.name}
                  </h2>
                  <p className="text-sm font-semibold text-dorado-700">{person.role}</p>
                  {person.country ? (
                    <p className="text-[11px] uppercase tracking-[0.18em] text-gris-600">{person.country}</p>
                  ) : null}
                  <p className="text-sm leading-6 text-gris-700">{person.summary}</p>
                </div>
              </div>
              <p className="mt-5 border-t border-gris-200 pt-4 text-sm leading-7 text-gris-700">
                {person.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
