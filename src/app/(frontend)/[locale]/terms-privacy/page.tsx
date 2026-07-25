import type { Metadata } from 'next';

import { getTermsPrivacyData } from '@/lib/legal';
import { resolveLocale } from '@/lib/i18n';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow } from '@/components/ui/SectionHeader';

// Sin builder dedicado en src/lib/seo.ts (no existe buildBreadcrumbJsonLd
// todavía); JSON-LD armado a mano, serializado con el buildJsonLdScript
// existente, mismo patrón que ya usan libros/page.tsx y
// declaracion-de-buenos-aires/page.tsx.
const HOME_LABEL: Record<string, string> = { es: 'Inicio', en: 'Home', fr: 'Accueil' };

// El cuerpo legal en sí es trilingüe (ver src/lib/legal/*.ts), pero la
// atribución de fuente ("consultado el ...") es una nota de trazabilidad
// corta que no vive en el dataset — se resuelve acá con el mismo patrón que
// HOME_LABEL.
const RETRIEVED_LABEL: Record<string, string> = {
  es: 'consultado el',
  en: 'retrieved on',
  fr: 'consulté le',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const data = getTermsPrivacyData(locale);

  return buildLocalizedMetadata({
    locale,
    path: '/terms-privacy',
    title: data.documentTitle,
    description: data.intro,
  });
}

export default async function TermsPrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = resolveLocale(locale);
  const data = getTermsPrivacyData(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.documentTitle,
    description: data.subtitle,
    url: `${getSiteUrl()}/${locale}/terms-privacy`,
    inLanguage: resolvedLocale,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: HOME_LABEL[locale] ?? HOME_LABEL.es,
        item: `${getSiteUrl()}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: data.documentTitle,
        item: `${getSiteUrl()}/${locale}/terms-privacy`,
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
      <div className="mx-auto max-w-[var(--container-narrow)] space-y-10 px-6 py-16 sm:px-10">
        <header className="space-y-4 border-b border-[color:var(--ui-border)] pb-8">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="text-balance text-[length:clamp(30px,4.5vw,48px)]">
            {data.documentTitle}
          </h1>
          <p className="max-w-2xl text-pretty text-base leading-7 text-[color:var(--ui-ink-3)]">
            {data.subtitle}
          </p>
        </header>

        {data.nota ? (
          <p className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-muted)] p-4 text-sm font-medium leading-6 text-[color:var(--ui-ink-3)]">
            {data.nota}
          </p>
        ) : null}

        <div className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)] sm:p-8">
          <p className="break-words text-base leading-8 text-[color:var(--ui-ink-3)]">{data.intro}</p>

          <div className="mt-8 space-y-8">
            {data.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="text-[length:var(--text-lg)] font-semibold uppercase tracking-[var(--tracking-wide)] text-[color:var(--ui-display-ink)]">
                  {section.heading}
                </h2>

                {section.blocks.map((block, index) => {
                  if (block.type === 'list') {
                    return (
                      <ul
                        key={`${section.heading}-list-${index}`}
                        className="list-disc space-y-3 break-words pl-5 text-sm leading-7 text-[color:var(--ui-ink-3)]"
                      >
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p
                      key={`${section.heading}-p-${index}`}
                      className="break-words text-base leading-8 text-[color:var(--ui-ink-3)]"
                    >
                      {block.text}
                    </p>
                  );
                })}
              </section>
            ))}
          </div>
        </div>

        <p className="text-xs leading-6 text-[color:var(--ui-ink-4)]">
          {data.source.label} · {RETRIEVED_LABEL[resolvedLocale]} {data.source.fetchedAt}.
        </p>
      </div>
    </main>
  );
}
