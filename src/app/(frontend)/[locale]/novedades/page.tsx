import type { Metadata } from 'next';

import { getNovedadesOrdenadas } from '@/lib/novedades';
import { buildLocalizedMetadata } from '@/lib/seo';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContentCard } from '@/components/cards/ContentCard';

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

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <div className="mx-auto max-w-[var(--container-default)] space-y-14 px-6 py-16 sm:px-10">
        <SectionHeader
          eyebrow="Novedades"
          title="Agenda pública y difusión institucional del IVUJUS."
          lead="Noticias, encuentros institucionales y reconocimientos del Instituto de Victimología de Usina de Justicia y de Usina de Justicia."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
