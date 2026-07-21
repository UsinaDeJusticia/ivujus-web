import type { Metadata } from 'next';

import {
  declaracionBuenosAiresPayloadDraft,
  simposio2026,
} from '@/lib/simposio2026';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { getPublicacionesLabels } from '@/lib/publicaciones';
import { Eyebrow, SectionHeader } from '@/components/ui/SectionHeader';
import { ButtonPrincipal, LinkArrow } from '@/components/ui/Buttons';

// Sin builder dedicado en src/lib/seo.ts (no existe buildBreadcrumbJsonLd
// todavía); mismo patrón manual + buildJsonLdScript que en el resto de
// subpáginas de publicaciones/.
const HOME_LABEL: Record<string, string> = { es: 'Inicio', en: 'Home', fr: 'Accueil' };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildLocalizedMetadata({
    locale,
    path: '/publicaciones/declaraciones/declaracion-de-buenos-aires',
    title: 'Declaración de Buenos Aires',
    description: declaracionBuenosAiresPayloadDraft.texto_completo_resumen,
  });
}

// Contenido reutilizado tal cual de src/lib/simposio2026.ts (declaration +
// declaracionBuenosAiresPayloadDraft) — no se re-fetchea ni se duplica el
// texto de la declaración acá.
export default async function DeclaracionBuenosAiresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const labels = getPublicacionesLabels(locale);
  const { declaration } = simposio2026;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: declaration.title,
    description: declaracionBuenosAiresPayloadDraft.texto_completo_resumen,
    datePublished: declaracionBuenosAiresPayloadDraft.fecha,
    inLanguage: ['es', 'en', 'fr', 'pt'],
    author: {
      '@type': 'Organization',
      name: simposio2026.organizingInstitution,
      url: `${getSiteUrl()}/es/instituto`,
    },
    about: simposio2026.title,
    url: `${getSiteUrl()}/es/publicaciones/declaraciones/declaracion-de-buenos-aires`,
    encoding: {
      '@type': 'MediaObject',
      contentUrl: declaration.pdfUrl,
      encodingFormat: 'application/pdf',
    },
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
        name: labels.declaraciones,
        item: `${getSiteUrl()}/${locale}/publicaciones/declaraciones`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: declaration.title,
        item: `${getSiteUrl()}/${locale}/publicaciones/declaraciones/declaracion-de-buenos-aires`,
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
      <div className="mx-auto max-w-[var(--container-default)] space-y-16 px-6 py-16 sm:px-10">
        <header className="max-w-4xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>{`${labels.publicaciones} / ${labels.declaraciones}`}</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[length:clamp(34px,5vw,60px)]">
            {declaration.title}
          </h1>
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            {declaration.intro}
          </p>
        </header>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_20rem]">
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Artículos"
              title="Una pieza doctrinaria y política para la victimología científica."
            />
            <div className="space-y-4">
              {declaration.standards.map((standard) => (
                <div key={standard} className="flex gap-3 border-l-2 border-dorado-600 pl-4">
                  <p className="text-sm leading-7 text-[color:var(--ui-ink-3)]">{standard}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)]">
            <Eyebrow>{labels.documentoOficial}</Eyebrow>
            <p className="mt-4 text-sm leading-7 text-[color:var(--ui-ink-3)]">
              Cierre doctrinario del Primer Simposio Americano y Europeo de Victimología Penal, firmado por
              académicos, profesionales y operadores del sistema de justicia.
            </p>
            <ButtonPrincipal
              href={declaration.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 w-full justify-center"
            >
              {labels.descargarDeclaracion}
            </ButtonPrincipal>
            <p className="mt-3 text-sm leading-6 text-[color:var(--ui-ink-4)]">{declaration.pdfNote}</p>
            <div className="mt-6 space-y-2 border-t border-[color:var(--ui-border)] pt-4 text-sm leading-7 text-[color:var(--ui-ink-3)]">
              <p>
                <strong className="text-[color:var(--ui-display-ink)]">{labels.organizacion}:</strong>{' '}
                {simposio2026.organizingInstitution}
              </p>
              <p>
                <strong className="text-[color:var(--ui-display-ink)]">{labels.sede}:</strong>{' '}
                {simposio2026.location}
              </p>
              <p>
                <strong className="text-[color:var(--ui-display-ink)]">{labels.fecha}:</strong>{' '}
                {simposio2026.dates}
              </p>
            </div>
          </aside>
        </section>

        <div className="flex flex-wrap gap-6">
          <LinkArrow href={`/${locale}/publicaciones/declaraciones`}>
            {`${labels.volverA} ${labels.declaraciones.toLowerCase()}`}
          </LinkArrow>
          <LinkArrow href={`/${locale}/simposios/2026-buenos-aires`}>
            {`${labels.volverA} ${simposio2026.title}`}
          </LinkArrow>
        </div>
      </div>
    </main>
  );
}
