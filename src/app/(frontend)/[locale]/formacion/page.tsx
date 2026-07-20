import type { Metadata } from 'next';

import { formacionHubData } from '@/lib/formacion';
import { buildLocalizedMetadata } from '@/lib/seo';
import { Eyebrow, SectionHeader } from '@/components/ui/SectionHeader';
import { ContentCard } from '@/components/cards/ContentCard';

// Metadata en español fijo para las 3 rutas de locale, igual que
// instituto/page.tsx y simposios/page.tsx: el cuerpo de esta sección no se
// traduce en v1 (ver docs/CLAUDE.md, "Fase 3: traducción automática" y
// src/lib/formacion.ts, comentario de cabecera).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildLocalizedMetadata({
    locale,
    path: '/formacion',
    title: 'Formación',
    description:
      'Diplomatura en Victimología y leyes de víctimas, y archivo de ciclos y jornadas del Instituto de Victimología de Usina de Justicia.',
  });
}

export default async function FormacionHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <div className="mx-auto max-w-[var(--container-default)] space-y-16 px-6 py-16 sm:px-10">
        <header className="max-w-4xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>Formación</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[length:clamp(34px,5vw,60px)]">
            {formacionHubData.title}
          </h1>
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            {formacionHubData.intro}
          </p>
        </header>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Oferta"
            title="Diplomatura de posgrado y archivo de ciclos y jornadas académicas."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {formacionHubData.sections.map((section) => (
              <ContentCard
                key={section.href}
                href={`/${locale}${section.href}`}
                title={section.title}
                description={section.body}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
