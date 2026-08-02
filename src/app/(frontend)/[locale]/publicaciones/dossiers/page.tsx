import type { Metadata } from 'next';

import { type Locale, pickLocale } from '@/lib/i18n';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { getDossiers, getPublicacionesLabels } from '@/lib/publicaciones';
import { Eyebrow } from '@/components/ui/SectionHeader';
import { ButtonSecundario } from '@/components/ui/Buttons';

// Igual que declaraciones/page.tsx: sin builder dedicado en src/lib/seo.ts
// todavía, JSON-LD armado a mano + buildJsonLdScript.
const HOME_LABEL: Record<string, string> = { es: 'Inicio', en: 'Home', fr: 'Accueil' };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const labels = getPublicacionesLabels(locale);

  return buildLocalizedMetadata({
    locale,
    path: '/publicaciones/dossiers',
    title: labels.dossiersMetaTitle,
    description: labels.dossiersMetaDescription,
  });
}

// Los 3 dossiers viven en src/lib/publicaciones/{es,en,fr}.ts (título, fecha,
// resumen y el PDF real). Cada uno se presenta con su resumen en la propia
// página — un PDF sin la página que lo explica no lo indexan ni los
// buscadores ni los asistentes con IA (docs/GOBERNANZA-CONTENIDO.md, regla 2).
// Se listan los 3 en una sola página: no justifican una ruta [slug] propia
// por su tamaño (una sola pantalla de resumen cada uno).
export default async function DossiersIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = locale as Locale;
  const labels = getPublicacionesLabels(locale);
  const dossiers = getDossiers(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: labels.dossiersMetaTitle,
    inLanguage: resolvedLocale,
    itemListElement: dossiers.map((dossier, index) => ({
      '@type': 'Report',
      position: index + 1,
      name: dossier.titulo,
      description: dossier.resumen,
      url: dossier.pdfUrl,
      datePublished: dossier.fecha,
      publisher: {
        '@type': 'NGO',
        name: 'Instituto de Victimología de Usina de Justicia',
        url: `${getSiteUrl()}/${locale}/instituto`,
      },
    })),
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
        name: labels.publicaciones,
        item: `${getSiteUrl()}/${locale}/publicaciones`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: labels.dossiers,
        item: `${getSiteUrl()}/${locale}/publicaciones/dossiers`,
      },
    ],
    inLanguage: resolvedLocale,
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={buildJsonLdScript(breadcrumbJsonLd)}
      />
      <div className="mx-auto max-w-[var(--container-narrow)] space-y-14 px-6 py-16 sm:px-10">
        <header className="max-w-3xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>{labels.dossiersEyebrow}</Eyebrow>
          <h1 className="text-balance text-[length:clamp(30px,4.5vw,48px)]">{labels.dossiersTitle}</h1>
          <p className="text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">{labels.dossiersLead}</p>
        </header>

        <div className="space-y-6">
          {dossiers.map((dossier) => (
            <article
              key={dossier.slug}
              className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)] sm:p-8"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ui-accent-ink)]">
                {dossier.fecha}
              </p>
              <h2 className="mt-2 text-[length:clamp(20px,2.6vw,28px)] leading-[1.25]">{dossier.titulo}</h2>
              <p className="mt-4 text-base leading-[1.75] text-[color:var(--ui-ink-3)]">{dossier.resumen}</p>
              <div className="mt-6">
                <ButtonSecundario href={dossier.pdfUrl} target="_blank" rel="noreferrer">
                  {labels.descargarDossier}
                </ButtonSecundario>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
