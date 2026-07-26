import type { Metadata } from 'next';

import { getInstitutoData } from '@/lib/instituto';
import type { Locale } from '@/lib/i18n';
import { pickLocale, resolveLocale } from '@/lib/i18n';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow } from '@/components/ui/SectionHeader';

// Copys de interfaz por locale. El aviso de traducción de cortesía
// (courtesyNotice) viene del propio dataset — src/lib/instituto/{en,fr}.ts —
// y solo está poblado en inglés y francés (docs/GLOSARIO-TRADUCCION.md §7).
const PAGE_LABELS: Record<
  Locale,
  { metaTitle: string; metaDescription: string; eyebrow: string; heading: string }
> = {
  es: {
    metaTitle: 'Estatuto',
    metaDescription:
      'Base institucional, definiciones fundacionales y objetivos del Instituto de Victimología de Usina de Justicia.',
    eyebrow: 'Instituto / Estatuto',
    heading: 'Base institucional y objetivos del IVUJUS.',
  },
  en: {
    metaTitle: 'Statute',
    metaDescription:
      'Institutional foundation, founding definitions and objectives of the Institute of Victimology of Usina de Justicia.',
    eyebrow: 'Institute / Statute',
    heading: 'Institutional foundation and objectives of IVUJUS.',
  },
  fr: {
    metaTitle: 'Statuts',
    metaDescription:
      "Fondement institutionnel, définitions fondatrices et objectifs de l'Institut de Victimologie d'Usina de Justicia.",
    eyebrow: 'Institut / Statuts',
    heading: "Fondement institutionnel et objectifs de l'IVUJUS.",
  },
};

const HOME_LABEL: Record<Locale, string> = { es: 'Inicio', en: 'Home', fr: 'Accueil' };
const INSTITUTO_LABEL: Record<Locale, string> = { es: 'Instituto', en: 'Institute', fr: 'Institut' };
const ESTATUTO_LABEL: Record<Locale, string> = { es: 'Estatuto', en: 'Statute', fr: 'Statuts' };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const labels = pickLocale(PAGE_LABELS, locale);

  return buildLocalizedMetadata({
    locale,
    path: '/instituto/estatuto',
    title: labels.metaTitle,
    description: labels.metaDescription,
  });
}

export default async function InstituteStatutePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = resolveLocale(locale);
  const institutoData = getInstitutoData(locale);
  const labels = pickLocale(PAGE_LABELS, locale);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    inLanguage: resolvedLocale,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: HOME_LABEL[resolvedLocale], item: `${getSiteUrl()}/${locale}` },
      {
        '@type': 'ListItem',
        position: 2,
        name: INSTITUTO_LABEL[resolvedLocale],
        item: `${getSiteUrl()}/${locale}/instituto`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: ESTATUTO_LABEL[resolvedLocale],
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
          <Eyebrow>{labels.eyebrow}</Eyebrow>
          <h1 className="text-balance text-[length:clamp(30px,4.5vw,48px)]">{labels.heading}</h1>
        </header>

        {institutoData.estatuto.courtesyNotice ? (
          <p className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-muted)] p-4 text-sm font-medium leading-6 text-[color:var(--ui-ink-3)]">
            {institutoData.estatuto.courtesyNotice}
          </p>
        ) : null}

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
