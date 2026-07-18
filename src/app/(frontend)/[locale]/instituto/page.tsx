import type { Metadata } from 'next';

import { institutoData } from '@/lib/instituto';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow, SectionHeader } from '@/components/ui/SectionHeader';
import { ContentCard } from '@/components/cards/ContentCard';

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
    <details className="group rounded-md border border-gris-200 bg-white p-5 shadow-[var(--shadow-1)] transition-shadow duration-[var(--motion-base)] ease-[var(--easing-standard)] open:shadow-[var(--shadow-2)]">
      <summary className="cursor-pointer list-none">
        <div className="flex gap-4">
          <img src={image} alt={name} className="h-20 w-20 rounded-full object-cover" />
          <div className="space-y-1">
            <h3 className="text-[19px] leading-[1.25] tracking-[0.02em]">{name}</h3>
            <p className="text-sm font-semibold text-dorado-700">{role}</p>
            {country ? (
              <p className="text-[11px] uppercase tracking-[0.18em] text-gris-600">{country}</p>
            ) : null}
            <p className="pt-1 text-sm leading-6 text-gris-700">{summary}</p>
          </div>
        </div>
      </summary>

      <p className="mt-5 border-t border-gris-200 pt-4 text-sm leading-7 text-gris-700">{bio}</p>
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
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <div className="mx-auto max-w-[var(--container-default)] space-y-24 px-6 py-16 sm:px-10">
        <header className="max-w-4xl space-y-5 border-b border-gris-200 pb-14">
          <Eyebrow>Instituto</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[length:clamp(34px,5vw,60px)]">
            {institutoData.title}
          </h1>
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-gris-700">
            {institutoData.intro}
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {institutoData.sections.map((section) => (
            <ContentCard
              key={section.href}
              href={section.href}
              title={section.title}
              description={section.body}
            />
          ))}
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Finalidades"
            title="Un instituto pensado para producir doctrina, formar operadores y sostener una red académica."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {institutoData.purposes.map((purpose) => (
              <article
                key={purpose.title}
                className="rounded-md border border-gris-200 bg-white p-6 shadow-[var(--shadow-1)]"
              >
                <h3 className="text-[19px] leading-[1.25] tracking-[0.02em]">{purpose.title}</h3>
                <p className="mt-4 text-sm leading-7 text-gris-700">{purpose.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Consejo directivo"
            title="Dirección institucional, jurídica, académica y tecnológica."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {institutoData.consejoDirectivo.map((person) => (
              <PersonCard key={person.name} {...person} />
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-8">
            <SectionHeader eyebrow="Estatuto" title="Base institucional y objetivos del instituto." />

            <div className="rounded-md border border-gris-200 bg-white p-6 shadow-[var(--shadow-1)] sm:p-8">
              <h3 className="text-[length:var(--text-lg)] font-semibold uppercase tracking-[var(--tracking-wide)] text-azul-900">
                {institutoData.estatuto.heading}
              </h3>
              <div className="mt-5 space-y-4">
                {institutoData.estatuto.articles.map((article) => (
                  <p key={article} className="text-sm leading-7 text-gris-700">
                    {article}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-md border border-white/10 bg-azul-900 p-6 text-white shadow-[var(--shadow-2)] sm:p-8">
            <Eyebrow invert>Estructura</Eyebrow>
            <div className="mt-5 space-y-4 text-sm leading-7 text-azul-200">
              <p>Consejo directivo con perfiles individuales y roles institucionales.</p>
              <p>Comité científico internacional como soporte de autoridad académica.</p>
              <p>Estatuto y finalidades como base para SEO, GEO y legitimidad institucional.</p>
            </div>
          </aside>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Comité científico"
            title="Referentes internacionales para sostener excelencia académica y legitimidad comparada."
          />

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
