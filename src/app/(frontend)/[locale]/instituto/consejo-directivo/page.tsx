import type { Metadata } from 'next';

import { institutoData } from '@/lib/instituto';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildLocalizedMetadata({
    locale,
    path: '/instituto/consejo-directivo',
    title: 'Consejo Directivo',
    description:
      'Perfiles y cargos del consejo directivo del Instituto de Victimología de Usina de Justicia.',
  });
}

export default function InstituteBoardPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Consejo Directivo del IVUJUS',
    itemListElement: institutoData.consejoDirectivo.map((person, index) => ({
      '@type': 'Person',
      position: index + 1,
      name: person.name,
      jobTitle: person.role,
      description: person.summary,
      image: person.image,
      worksFor: {
        '@type': 'NGO',
        name: institutoData.title,
        url: `${getSiteUrl()}/es/instituto`,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[var(--color-usina-paper)] px-6 py-10 text-[var(--color-usina-ink)] sm:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="border-b border-[var(--color-usina-line)] pb-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
            Instituto / Consejo directivo
          </p>
          <h1
            className="mt-4 text-4xl leading-tight text-[var(--color-usina-navy)] sm:text-5xl"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Conducción institucional del IVUJUS.
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:color-mix(in_srgb,var(--color-usina-ink)_80%,white)]">
            Perfiles de la dirección, la coordinación académica y las áreas institucionales que sostienen el instituto.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          {institutoData.consejoDirectivo.map((person) => (
            <article key={person.slug} className="border border-[var(--color-usina-line)] bg-white/70 p-6">
              <div className="flex gap-4">
                <img src={person.image} alt={person.name} className="h-20 w-20 rounded-full object-cover" />
                <div className="space-y-1">
                  <h2
                    className="text-2xl leading-tight text-[var(--color-usina-navy)]"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    {person.name}
                  </h2>
                  <p className="text-sm font-medium text-[var(--color-usina-accent)]">{person.role}</p>
                  <p className="text-sm leading-6 text-[color:color-mix(in_srgb,var(--color-usina-ink)_76%,white)]">
                    {person.summary}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-[color:color-mix(in_srgb,var(--color-usina-ink)_82%,white)]">
                {person.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
