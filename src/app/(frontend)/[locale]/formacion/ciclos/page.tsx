import type { Metadata } from 'next';

import { ciclosData } from '@/lib/formacion';
import { buildLocalizedMetadata } from '@/lib/seo';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContentCard } from '@/components/cards/ContentCard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildLocalizedMetadata({
    locale,
    path: '/formacion/ciclos',
    title: 'Ciclos y jornadas',
    description:
      'Archivo de ciclos de debate, jornadas y capacitaciones del Instituto de Victimología de Usina de Justicia, con videos y dossiers.',
  });
}

export default async function FormacionCiclosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <div className="mx-auto max-w-[var(--container-default)] space-y-14 px-6 py-16 sm:px-10">
        <SectionHeader
          eyebrow="Formación / Ciclos y jornadas"
          title="Archivo de ciclos de debate, jornadas y capacitaciones."
          lead="Diez años de actividad institucional del Instituto y de Usina de Justicia: convenios universitarios, jornadas con organismos públicos y ciclos de debate propios, con video y dossier cuando están disponibles."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ciclosData.map((ciclo) => (
            <ContentCard
              key={ciclo.slug}
              href={`/${locale}/formacion/ciclos/${ciclo.slug}`}
              eyebrow={ciclo.fecha}
              title={ciclo.titulo}
              description={ciclo.resumen}
              meta={
                ciclo.dossier || ciclo.video_url || ciclo.sesiones ? (
                  <span>
                    {[
                      ciclo.video_url || ciclo.sesiones ? 'Video' : null,
                      ciclo.dossier ? 'Dossier' : null,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                ) : undefined
              }
            />
          ))}
        </div>
      </div>
    </main>
  );
}
