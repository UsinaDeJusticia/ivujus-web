import type { Metadata } from 'next';

import { getFormacionHub } from '@/lib/formacion';
import { resolveLocale, type Locale } from '@/lib/i18n';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow, SectionHeader } from '@/components/ui/SectionHeader';
import { ContentCard } from '@/components/cards/ContentCard';

// Copys de interfaz por locale. El contenido de fondo (title/intro/sections)
// viene de getFormacionHub(locale) (@/lib/formacion), ya trilingüe. Mismo
// patrón LABELS que instituto/comite-cientifico/[slug]/page.tsx.
const LABELS: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    offerEyebrow: string;
    offerTitle: string;
    breadcrumbHome: string;
    breadcrumbFormacion: string;
  }
> = {
  es: {
    metaTitle: 'Formación',
    metaDescription:
      'Diplomatura en Victimología y leyes de víctimas, y archivo de ciclos y jornadas del Instituto de Victimología de Usina de Justicia.',
    eyebrow: 'Formación',
    offerEyebrow: 'Oferta',
    offerTitle: 'Diplomatura y archivo de ciclos y jornadas académicas.',
    breadcrumbHome: 'Inicio',
    breadcrumbFormacion: 'Formación',
  },
  en: {
    metaTitle: 'Training',
    metaDescription:
      "Diploma Programme in Victimology and Victims' Rights Legislation, and archive of debate series and conference days of the Institute of Victimology of Usina de Justicia.",
    eyebrow: 'Training',
    offerEyebrow: 'Offer',
    offerTitle: 'Diploma Programme and archive of academic debate series and conference days.',
    breadcrumbHome: 'Home',
    breadcrumbFormacion: 'Training',
  },
  fr: {
    metaTitle: 'Formation',
    metaDescription:
      "Diplôme en victimologie et droit des victimes, et archive des cycles de débats et journées de l'Institut de Victimologie d'Usina de Justicia.",
    eyebrow: 'Formation',
    offerEyebrow: 'Offre',
    offerTitle: 'Diplôme et archive des cycles de débats et journées académiques.',
    breadcrumbHome: 'Accueil',
    breadcrumbFormacion: 'Formation',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const labels = LABELS[resolveLocale(locale)];

  return buildLocalizedMetadata({
    locale,
    path: '/formacion',
    title: labels.metaTitle,
    description: labels.metaDescription,
  });
}

export default async function FormacionHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = resolveLocale(locale);
  const labels = LABELS[resolvedLocale];
  const formacionHubData = getFormacionHub(locale);

  // Home > Formación.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: labels.breadcrumbHome, item: `${getSiteUrl()}/${resolvedLocale}` },
      {
        '@type': 'ListItem',
        position: 2,
        name: labels.breadcrumbFormacion,
        item: `${getSiteUrl()}/${resolvedLocale}/formacion`,
      },
    ],
    inLanguage: resolvedLocale,
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={buildJsonLdScript(breadcrumbJsonLd)}
      />
      <div className="mx-auto max-w-[var(--container-default)] space-y-16 px-6 py-16 sm:px-10">
        <header className="max-w-4xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>{labels.eyebrow}</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[length:clamp(34px,5vw,60px)]">
            {formacionHubData.title}
          </h1>
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            {formacionHubData.intro}
          </p>
        </header>

        <section className="space-y-10">
          <SectionHeader eyebrow={labels.offerEyebrow} title={labels.offerTitle} />

          <div className="grid gap-6 md:grid-cols-2">
            {formacionHubData.sections.map((section) => (
              <ContentCard
                key={section.href}
                href={`/${locale}${section.href}`}
                title={section.title}
                description={section.body}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
