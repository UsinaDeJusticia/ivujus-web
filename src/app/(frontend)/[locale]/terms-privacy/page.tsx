import type { Metadata } from 'next';

import { termsPrivacyData } from '@/lib/legal';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow } from '@/components/ui/SectionHeader';

// Sin builder dedicado en src/lib/seo.ts (no existe buildBreadcrumbJsonLd
// todavía); JSON-LD armado a mano, serializado con el buildJsonLdScript
// existente, mismo patrón que ya usan libros/page.tsx y
// declaracion-de-buenos-aires/page.tsx.
const HOME_LABEL: Record<string, string> = { es: 'Inicio', en: 'Home', fr: 'Accueil' };

// Metadata en español fijo para las 3 rutas de locale, igual que
// instituto/page.tsx, simposios/page.tsx y formacion/page.tsx: el cuerpo
// legal de esta página no se traduce en v1 — proviene verbatim de la
// fuente WordPress en español (ver src/lib/legal.ts) y traducirlo sin
// revisión jurídica violaría la regla de no inventar contenido.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildLocalizedMetadata({
    locale,
    path: '/terms-privacy',
    title: termsPrivacyData.documentTitle,
    description:
      'Política de privacidad del Instituto de Victimología de Usina de Justicia: información recopilada, uso, cookies y derechos del usuario.',
  });
}

export default async function TermsPrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // El contenido legal solo existe en español en la fuente (ver
  // src/lib/legal.ts): para EN/FR mostramos el mismo texto con un aviso,
  // en vez de traducir sin fuente ni revisión jurídica.
  const showUntranslatedNotice = locale !== 'es';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: termsPrivacyData.documentTitle,
    description: termsPrivacyData.subtitle,
    url: `${getSiteUrl()}/${locale}/terms-privacy`,
    inLanguage: 'es',
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
        name: termsPrivacyData.documentTitle,
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
            {termsPrivacyData.documentTitle}
          </h1>
          <p className="max-w-2xl text-pretty text-base leading-7 text-[color:var(--ui-ink-3)]">
            {termsPrivacyData.subtitle}
          </p>
        </header>

        {showUntranslatedNotice ? (
          <p className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-muted)] p-4 text-sm leading-6 text-[color:var(--ui-ink-3)]">
            This document is only available in Spanish, its language of legal record. / Ce
            document n’est disponible qu’en espagnol, sa langue de référence juridique.
          </p>
        ) : null}

        <div className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)] sm:p-8">
          <p className="break-words text-base leading-8 text-[color:var(--ui-ink-3)]">{termsPrivacyData.intro}</p>

          <div className="mt-8 space-y-8">
            {termsPrivacyData.sections.map((section) => (
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
          {termsPrivacyData.source.label} · consultado el {termsPrivacyData.source.fetchedAt}.
        </p>
      </div>
    </main>
  );
}
