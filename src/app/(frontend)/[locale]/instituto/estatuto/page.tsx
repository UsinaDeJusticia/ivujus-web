import type { Metadata } from 'next';

import { institutoData } from '@/lib/instituto';
import { buildLocalizedMetadata } from '@/lib/seo';

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

export default function InstituteStatutePage() {
  return (
    <main className="min-h-screen bg-[var(--color-usina-paper)] px-6 py-10 text-[var(--color-usina-ink)] sm:px-10">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="border-b border-[var(--color-usina-line)] pb-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
            Instituto / Estatuto
          </p>
          <h1
            className="mt-4 text-4xl leading-tight text-[var(--color-usina-navy)] sm:text-5xl"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Base institucional y objetivos del IVUJUS.
          </h1>
        </header>

        <section className="border border-[var(--color-usina-line)] bg-white/70 p-6 sm:p-8">
          <h2 className="text-lg font-medium text-[var(--color-usina-navy)]">
            {institutoData.estatuto.heading}
          </h2>
          <div className="mt-6 space-y-5">
            {institutoData.estatuto.articles.map((article) => (
              <p
                key={article}
                className="text-base leading-8 text-[color:color-mix(in_srgb,var(--color-usina-ink)_82%,white)]"
              >
                {article}
              </p>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
