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
    path: '/instituto',
    title: 'Instituto',
    description:
      'Finalidades, consejo directivo, estatuto y comité científico del Instituto de Victimología de Usina de Justicia.',
  });
}

function PersonCard({
  name,
  role,
  summary,
  bio,
  image,
  country,
}: {
  name: string;
  role: string;
  summary: string;
  bio: string;
  image: string;
  country?: string;
}) {
  return (
    <details className="group border border-[var(--color-usina-line)] bg-white/70 p-5 open:bg-white">
      <summary className="cursor-pointer list-none">
        <div className="flex gap-4">
          <img src={image} alt={name} className="h-20 w-20 rounded-full object-cover" />
          <div className="space-y-1">
            <h3
              className="text-xl leading-tight text-[var(--color-usina-navy)]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {name}
            </h3>
            <p className="text-sm font-medium text-[var(--color-usina-accent)]">{role}</p>
            {country ? (
              <p className="text-xs uppercase tracking-[0.24em] text-[color:color-mix(in_srgb,var(--color-usina-navy)_70%,white)]">
                {country}
              </p>
            ) : null}
            <p className="pt-1 text-sm leading-6 text-[color:color-mix(in_srgb,var(--color-usina-ink)_76%,white)]">
              {summary}
            </p>
          </div>
        </div>
      </summary>

      <p className="mt-5 text-sm leading-7 text-[color:color-mix(in_srgb,var(--color-usina-ink)_82%,white)]">
        {bio}
      </p>
    </details>
  );
}

export default function InstitutePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: institutoData.title,
    description: institutoData.intro,
    url: `${getSiteUrl()}/es/instituto`,
    sameAs: [
      'https://www.facebook.com/usinadejusticia',
      'https://twitter.com/UsinadeJusticia',
      'https://www.youtube.com/channel/UCZfY-nSSkiglbSGtN102Drg',
      'https://www.instagram.com/usinadejusticia/?hl=es-la',
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--color-usina-paper)] px-6 py-10 text-[var(--color-usina-ink)] sm:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <div className="mx-auto max-w-6xl space-y-14">
        <header className="border-b border-[var(--color-usina-line)] pb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
            Instituto
          </p>
          <div className="mt-5 max-w-5xl space-y-4">
            <h1
              className="text-4xl leading-tight text-[var(--color-usina-navy)] sm:text-6xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {institutoData.title}
            </h1>
            <p className="max-w-4xl text-lg leading-8 text-[color:color-mix(in_srgb,var(--color-usina-ink)_80%,white)]">
              {institutoData.intro}
            </p>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {institutoData.sections.map((section) => (
            <a
              key={section.href}
              href={section.href}
              className="border border-[var(--color-usina-line)] bg-white/70 p-6 transition hover:border-[var(--color-usina-accent)]"
            >
              <h2
                className="text-2xl leading-tight text-[var(--color-usina-navy)]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                {section.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[color:color-mix(in_srgb,var(--color-usina-ink)_78%,white)]">
                {section.body}
              </p>
            </a>
          ))}
        </section>

        <section className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
              Finalidades
            </p>
            <h2
              className="text-3xl leading-tight text-[var(--color-usina-navy)] sm:text-4xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Un instituto pensado para producir doctrina, formar operadores y sostener una red académica.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {institutoData.purposes.map((purpose) => (
              <article key={purpose.title} className="border border-[var(--color-usina-line)] bg-white/70 p-6">
                <h3
                  className="text-2xl leading-tight text-[var(--color-usina-navy)]"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  {purpose.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[color:color-mix(in_srgb,var(--color-usina-ink)_78%,white)]">
                  {purpose.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
              Consejo directivo
            </p>
            <h2
              className="text-3xl leading-tight text-[var(--color-usina-navy)] sm:text-4xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Dirección institucional, jurídica, académica y tecnológica.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {institutoData.consejoDirectivo.map((person) => (
              <PersonCard key={person.name} {...person} />
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-8">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
                Estatuto
              </p>
              <h2
                className="text-3xl leading-tight text-[var(--color-usina-navy)] sm:text-4xl"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Base institucional y objetivos del instituto.
              </h2>
            </div>

            <div className="border border-[var(--color-usina-line)] bg-white/70 p-6 sm:p-8">
              <h3 className="text-lg font-medium text-[var(--color-usina-navy)]">{institutoData.estatuto.heading}</h3>
              <div className="mt-5 space-y-4">
                {institutoData.estatuto.articles.map((article) => (
                  <p key={article} className="text-sm leading-7 text-[color:color-mix(in_srgb,var(--color-usina-ink)_82%,white)]">
                    {article}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <aside className="border border-[var(--color-usina-line)] bg-[var(--color-usina-navy)] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[color:color-mix(in_srgb,var(--color-usina-paper)_84%,white)]">
              Estructura
            </p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-[color:color-mix(in_srgb,white_88%,var(--color-usina-paper))]">
              <p>Consejo directivo con perfiles individuales y roles institucionales.</p>
              <p>Comité científico internacional como soporte de autoridad académica.</p>
              <p>Estatuto y finalidades como base para SEO, GEO y legitimidad institucional.</p>
            </div>
          </aside>
        </section>

        <section className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
              Comité científico
            </p>
            <h2
              className="text-3xl leading-tight text-[var(--color-usina-navy)] sm:text-4xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Referentes internacionales para sostener excelencia académica y legitimidad comparada.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {institutoData.comiteCientifico.map((person) => (
              <PersonCard key={person.name} {...person} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
