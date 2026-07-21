import type { Metadata } from 'next';

import { simposio2026 } from '@/lib/simposio2026';
import { buildLocalizedMetadata } from '@/lib/seo';
import { declaracionesIndex, getPublicacionesLabels } from '@/lib/publicaciones';
import { Eyebrow, SectionHeader } from '@/components/ui/SectionHeader';
import { ContentCard } from '@/components/cards/ContentCard';

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

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <div className="mx-auto max-w-[var(--container-default)] space-y-14 px-6 py-16 sm:px-10">
        <SectionHeader
          eyebrow={`${labels.publicaciones} / ${labels.declaraciones}`}
          title="Documentos oficiales del IVUJUS y de sus encuentros académicos."
          lead="La Declaración de Buenos Aires es hoy la primera pieza de este archivo: cierre doctrinario del Primer Simposio Americano y Europeo de Victimología Penal."
        />

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
