import type { Metadata } from 'next';

import { simposio2026 } from '@/lib/simposio2026';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { declaracionesIndex, getPublicacionesLabels } from '@/lib/publicaciones';
import { Eyebrow } from '@/components/ui/SectionHeader';
import { ContentCard } from '@/components/cards/ContentCard';

// Sin builder dedicado en src/lib/seo.ts (no existe buildBreadcrumbJsonLd
// todavía); mismo patrón manual + buildJsonLdScript que en publicaciones/page.tsx.
const HOME_LABEL: Record<string, string> = { es: 'Inicio', en: 'Home', fr: 'Accueil' };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildLocalizedMetadata({
    locale,
    path: '/publicaciones/declaraciones',
    title: 'Declaraciones',
    description:
      'Archivo de declaraciones institucionales del Instituto de Victimología de Usina de Justicia, empezando por la Declaración de Buenos Aires.',
  });
}

// Listado de declaraciones. Hoy solo hay una (Declaración de Buenos Aires,
// cerrada en simposio2026.ts); el índice en src/lib/publicaciones.ts
// referencia el slug para no duplicar título/resumen/artículos.
export default async function DeclaracionesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const labels = getPublicacionesLabels(locale);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: HOME_LABEL[locale] ?? HOME_LABEL.es, item: `${getSiteUrl()}/${locale}` },
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
    ],
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={buildJsonLdScript(breadcrumbJsonLd)}
      />
      <div className="mx-auto max-w-[var(--container-default)] space-y-14 px-6 py-16 sm:px-10">
        <header className="max-w-4xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>{`${labels.publicaciones} / ${labels.declaraciones}`}</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[length:clamp(34px,5vw,60px)]">
            Documentos oficiales del IVUJUS y de sus encuentros académicos.
          </h1>
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            La Declaración de Buenos Aires es hoy la primera pieza de este archivo: cierre doctrinario del
            Primer Simposio Americano y Europeo de Victimología Penal.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {declaracionesIndex.map((declaracion) => (
            <ContentCard
              key={declaracion.slug}
              href={`/${locale}/publicaciones/declaraciones/${declaracion.slug}`}
              eyebrow={declaracion.fecha}
              title={simposio2026.declaration.title}
              description={simposio2026.declaration.intro}
              meta={<span>{labels.verDeclaracionCompleta}</span>}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
