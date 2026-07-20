import type { Metadata } from 'next';

import { diplomaturaData } from '@/lib/formacion';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow, SectionHeader } from '@/components/ui/SectionHeader';
import { ButtonPrincipal, ButtonSecundario } from '@/components/ui/Buttons';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildLocalizedMetadata({
    locale,
    path: '/formacion/diplomatura',
    title: 'Diplomatura en Victimología y leyes de víctimas',
    description:
      'Diplomatura en Victimología y leyes de víctimas del IVUJUS: descripción, programa descargable y acceso al Campus Virtual.',
  });
}

export default async function FormacionDiplomaturaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: diplomaturaData.titulo,
    description: diplomaturaData.descripcion,
    provider: {
      '@type': 'NGO',
      name: 'Instituto de Victimología de Usina de Justicia',
      sameAs: `${getSiteUrl()}/es/instituto`,
    },
    url: `${getSiteUrl()}/es/formacion/diplomatura`,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      url: diplomaturaData.campusUrl,
    },
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <div className="mx-auto max-w-[var(--container-default)] space-y-20 px-6 py-16 sm:px-10">
        <header className="max-w-4xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>Formación / Diplomatura</Eyebrow>
          {/* break-words: mismo cuidado que el <h1> de /formacion/ciclos/[slug]
              (Ola 7 / bug de la home) — palabras largas en español al piso
              de la clamp a 360px. */}
          <h1 className="max-w-4xl text-balance break-words text-[length:clamp(32px,4.6vw,52px)]">
            {diplomaturaData.titulo}
          </h1>
          {diplomaturaData.nombreHistorico ? (
            <p className="text-sm italic leading-6 text-[color:var(--ui-ink-4)]">
              También ofrecida bajo el nombre «{diplomaturaData.nombreHistorico}».
            </p>
          ) : null}
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            {diplomaturaData.descripcion}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <ButtonSecundario href={diplomaturaData.campusUrl} target="_blank" rel="noreferrer">
              Acceder al Campus
            </ButtonSecundario>
            <ButtonPrincipal href={diplomaturaData.programaPdfUrl} target="_blank" rel="noreferrer">
              Descargar programa
            </ButtonPrincipal>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-muted)] px-6 py-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ui-accent-ink)]">
              Inscriptos
            </p>
            <p className="mt-2 text-[length:clamp(28px,3.4vw,38px)] text-[color:var(--ui-display-ink)]">
              {diplomaturaData.metricas.inscriptos}
            </p>
          </div>
          <div className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-muted)] px-6 py-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ui-accent-ink)]">
              Certificados
            </p>
            <p className="mt-2 text-[length:clamp(28px,3.4vw,38px)] text-[color:var(--ui-display-ink)]">
              {diplomaturaData.metricas.certificados}
            </p>
          </div>
          <div className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-muted)] px-6 py-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ui-accent-ink)]">
              Valoración
            </p>
            <p className="mt-2 text-[length:clamp(28px,3.4vw,38px)] text-[color:var(--ui-display-ink)]">
              {diplomaturaData.metricas.valoracion}
            </p>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Testimonios"
            title="Reseñas reales de cursantes de la Diplomatura."
            lead="Testimonios anónimos publicados en la página oficial del Campus Virtual."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {diplomaturaData.resenas.map((resena) => (
              <blockquote
                key={resena}
                className="m-0 rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 text-sm leading-7 text-[color:var(--ui-ink-3)] shadow-[var(--shadow-1)]"
              >
                “{resena}”
              </blockquote>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-white/10 bg-azul-900 p-8 text-white shadow-[var(--shadow-2)] sm:p-10">
          <Eyebrow invert>Ciclos y jornadas</Eyebrow>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-azul-200">
            El Instituto también organiza ciclos de debate, jornadas y capacitaciones puntuales, con archivo de
            videos y dossiers descargables.
          </p>
          <ButtonSecundario href={`/${locale}/formacion/ciclos`} className="mt-6">
            Ver ciclos y jornadas
          </ButtonSecundario>
        </section>
      </div>
    </main>
  );
}
