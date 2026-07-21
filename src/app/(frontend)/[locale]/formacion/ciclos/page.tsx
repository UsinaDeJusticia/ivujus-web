import type { Metadata } from 'next';

import { ciclosData } from '@/lib/formacion';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow } from '@/components/ui/SectionHeader';
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

  // Home > Formación > Ciclos y jornadas.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${getSiteUrl()}/es` },
      { '@type': 'ListItem', position: 2, name: 'Formación', item: `${getSiteUrl()}/es/formacion` },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Ciclos y jornadas',
        item: `${getSiteUrl()}/es/formacion/ciclos`,
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
        {/* Antes esta cabecera se renderizaba con <SectionHeader> (h2), que
            dejaba la página sin ningún <h1>. Se reemplaza por el mismo patrón
            de cabecera que ya usan formacion/page.tsx y
            formacion/diplomatura/page.tsx (Eyebrow + h1 + lead), mismo texto,
            para tener jerarquía de encabezados correcta. */}
        <header className="max-w-4xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>Formación / Ciclos y jornadas</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[length:clamp(34px,5vw,60px)]">
            Archivo de ciclos de debate, jornadas y capacitaciones.
          </h1>
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            Diez años de actividad institucional del Instituto y de Usina de Justicia: convenios
            universitarios, jornadas con organismos públicos y ciclos de debate propios, con video y
            dossier cuando están disponibles.
          </p>
        </header>

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
