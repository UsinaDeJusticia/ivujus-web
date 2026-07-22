import type { Metadata } from 'next';

import { getNovedadesOrdenadas } from '@/lib/novedades';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow } from '@/components/ui/SectionHeader';
import { ContentCard } from '@/components/cards/ContentCard';

// Sin builder dedicado en src/lib/seo.ts (no existe buildBreadcrumbJsonLd
// todavía); mismo patrón manual + buildJsonLdScript que en publicaciones/.
const HOME_LABEL: Record<string, string> = { es: 'Inicio', en: 'Home', fr: 'Accueil' };

// Metadata en español fijo para las 3 rutas de locale, igual que
// instituto/page.tsx y formacion/page.tsx: el cuerpo de esta sección no se
// traduce en v1 (ver docs/CLAUDE.md, "Fase 3: traducción automática" y
// src/lib/novedades.ts, comentario de cabecera).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildLocalizedMetadata({
    locale,
    path: '/novedades',
    title: 'Novedades',
    description:
      'Agenda pública y difusión institucional del Instituto de Victimología de Usina de Justicia (IVUJUS).',
  });
}

// Formato de fecha larga en español, consistente para toda la sección
// (listado y detalle). `fecha` en src/lib/novedades.ts es ISO (YYYY-MM-DD).
function formatFecha(fecha: string): string {
  return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${fecha}T00:00:00Z`),
  );
}

export default async function NovedadesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const novedades = getNovedadesOrdenadas();

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
      { '@type': 'ListItem', position: 2, name: 'Novedades', item: `${getSiteUrl()}/${locale}/novedades` },
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
          <Eyebrow>Novedades</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[length:clamp(34px,5vw,60px)]">
            Agenda pública y difusión institucional del IVUJUS.
          </h1>
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            Noticias, encuentros institucionales y reconocimientos del Instituto de Victimología de Usina de
            Justicia y de Usina de Justicia.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* h2 accesible para no saltar de h1 a los h3 de las tarjetas
              (heading-order de Lighthouse); la grilla no lleva título visible. */}
          <h2 className="sr-only">Últimas novedades</h2>
          {novedades.map((novedad) => (
            <ContentCard
              key={novedad.slug}
              href={`/${locale}/novedades/${novedad.slug}`}
              eyebrow={formatFecha(novedad.fecha)}
              title={novedad.titulo}
              description={novedad.bajada}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
