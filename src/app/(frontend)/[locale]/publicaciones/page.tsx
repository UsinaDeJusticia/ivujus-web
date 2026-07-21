import type { Metadata } from 'next';

import { buildLocalizedMetadata } from '@/lib/seo';
import { getPublicacionesLabels } from '@/lib/publicaciones';
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
    path: '/publicaciones',
    title: 'Publicaciones',
    description:
      'Declaraciones institucionales y producción editorial del Instituto de Victimología de Usina de Justicia.',
  });
}

// Hub mínimo: solo lista categorías con contenido real hoy. "Libros" existe
// porque /publicaciones/libros tiene contenido trazable (ver
// src/lib/publicaciones.ts); si en el futuro esa página se retira, esta
// tarjeta debe retirarse con ella — no dejar categorías vacías.
export default async function PublicacionesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const labels = getPublicacionesLabels(locale);

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <div className="mx-auto max-w-[var(--container-default)] space-y-16 px-6 py-16 sm:px-10">
        <header className="max-w-4xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>{labels.publicaciones}</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[length:clamp(34px,5vw,60px)]">
            Publicaciones del Instituto de Victimología.
          </h1>
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            Declaraciones institucionales, tomas de posición y producción editorial que documentan la
            actividad académica de Usina de Justicia y del IVUJUS.
          </p>
        </header>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Archivo"
            title="Dos frentes de producción: declaraciones y libros."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <ContentCard
              href={`/${locale}/publicaciones/declaraciones`}
              eyebrow={labels.declaraciones}
              title="Declaraciones institucionales"
              description="Documentos oficiales firmados al cierre de encuentros académicos, como la Declaración de Buenos Aires."
            />
            <ContentCard
              href={`/${locale}/publicaciones/libros`}
              eyebrow={labels.libros}
              title="Nuevos Paradigmas para la Justicia Penal"
              description="Libro compilado por Diana Cohen Agrest y María Jimena Molina, con artículos de referentes del ámbito jurídico y académico."
            />
          </div>
        </section>
      </div>
    </main>
  );
}
