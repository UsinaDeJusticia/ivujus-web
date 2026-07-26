import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { getInstitutoData } from '@/lib/instituto';
import type { Locale } from '@/lib/i18n';
import { pickLocale, resolveLocale } from '@/lib/i18n';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow } from '@/components/ui/SectionHeader';

// Copys de interfaz por locale. El contenido de cada persona viene de
// getInstitutoData(locale) — src/lib/instituto/{es,en,fr}.ts.
const PAGE_LABELS: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    jsonLdName: string;
    eyebrow: string;
    heading: string;
    lead: string;
    portraitAlt: (name: string) => string;
  }
> = {
  es: {
    metaTitle: 'Consejo Directivo',
    metaDescription:
      'Perfiles y cargos del consejo directivo del Instituto de Victimología de Usina de Justicia.',
    jsonLdName: 'Consejo Directivo del IVUJUS',
    eyebrow: 'Instituto / Consejo directivo',
    heading: 'Conducción institucional del IVUJUS.',
    lead:
      'Perfiles de la dirección, la coordinación académica y las áreas institucionales que sostienen el instituto.',
    portraitAlt: (name) => `Retrato de ${name}`,
  },
  en: {
    metaTitle: 'Board of Directors',
    metaDescription:
      'Profiles and roles of the board of directors of the Institute of Victimology of Usina de Justicia.',
    jsonLdName: 'IVUJUS Board of Directors',
    eyebrow: 'Institute / Board of directors',
    heading: 'Institutional leadership of IVUJUS.',
    lead:
      'Profiles of the leadership, academic coordination and institutional areas that sustain the institute.',
    portraitAlt: (name) => `Portrait of ${name}`,
  },
  fr: {
    metaTitle: "Conseil d'administration",
    metaDescription:
      "Profils et fonctions du conseil d'administration de l'Institut de Victimologie d'Usina de Justicia.",
    jsonLdName: "Conseil d'administration de l'IVUJUS",
    eyebrow: "Institut / Conseil d'administration",
    heading: "Direction institutionnelle de l'IVUJUS.",
    lead:
      "Profils de la direction, de la coordination académique et des domaines institutionnels qui soutiennent l'institut.",
    portraitAlt: (name) => `Portrait de ${name}`,
  },
};

const HOME_LABEL: Record<Locale, string> = { es: 'Inicio', en: 'Home', fr: 'Accueil' };
const INSTITUTO_LABEL: Record<Locale, string> = { es: 'Instituto', en: 'Institute', fr: 'Institut' };
const CONSEJO_LABEL: Record<Locale, string> = {
  es: 'Consejo directivo',
  en: 'Board of directors',
  fr: "Conseil d'administration",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const labels = pickLocale(PAGE_LABELS, locale);

  return buildLocalizedMetadata({
    locale,
    path: '/instituto/consejo-directivo',
    title: labels.metaTitle,
    description: labels.metaDescription,
  });
}

export default async function InstituteBoardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = resolveLocale(locale);
  const institutoData = getInstitutoData(locale);
  const labels = pickLocale(PAGE_LABELS, locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: labels.jsonLdName,
    inLanguage: resolvedLocale,
    itemListElement: institutoData.consejoDirectivo.map((person, index) => ({
      '@type': 'Person',
      position: index + 1,
      name: person.name,
      jobTitle: person.role,
      description: person.summary,
      image: person.image,
      url: `${getSiteUrl()}/${locale}/instituto/consejo-directivo/${person.slug}`,
      worksFor: {
        '@type': 'NGO',
        name: institutoData.title,
        url: `${getSiteUrl()}/${locale}/instituto`,
      },
    })),
  };

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
        name: CONSEJO_LABEL[resolvedLocale],
        item: `${getSiteUrl()}/${locale}/instituto/consejo-directivo`,
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
          <Eyebrow>{labels.eyebrow}</Eyebrow>
          <h1 className="text-balance text-[length:clamp(30px,4.5vw,48px)]">{labels.heading}</h1>
          <p className="text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">{labels.lead}</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          {institutoData.consejoDirectivo.map((person) => (
            <Link
              key={person.slug}
              href={`/${locale}/instituto/consejo-directivo/${person.slug}`}
              className="group block rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 no-underline shadow-[var(--shadow-1)] transition-shadow duration-[var(--motion-base)] ease-[var(--easing-standard)] hover:shadow-[var(--shadow-3)]"
            >
              <div className="flex gap-4">
                <div className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[color:var(--ui-bg-muted)]">
                  <Image
                    src={person.image}
                    alt={labels.portraitAlt(person.name)}
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
