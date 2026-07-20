import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';

import { simposio2026 } from '@/lib/simposio2026';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow, SectionHeader } from '@/components/ui/SectionHeader';
import { ButtonPrincipal } from '@/components/ui/Buttons';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildLocalizedMetadata({
    locale,
    path: '/simposios/2026-buenos-aires',
    title: 'Simposio 2026 Buenos Aires',
    description:
      'Programa, declaración final y cobertura del Primer Simposio Americano y Europeo de Victimología Penal realizado en Buenos Aires en 2026.',
  });
}

function VideoFrame({ src, title }: { src: string; title: string }) {
  return (
    // bg-azul-950 es superficie de marca fija (fondo de video del simposio,
    // ver docs/CLAUDE.md/globals.css Ola 6) — solo el borde (chrome, no
    // marca) se tematiza.
    <div className="relative aspect-video overflow-hidden rounded-md border border-[color:var(--ui-border)] bg-azul-950 shadow-[var(--shadow-1)]">
      <iframe
        src={src}
        title={title}
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

// Micro-label liviano para metadatos repetidos (hora de sesión, jornada) —
// sin la regla dorada de 32px de <Eyebrow>, para no saturar visualmente
// listas densas de una docena de sesiones. <Eyebrow> queda reservado a
// encabezados de sección.
function MetaLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ui-accent-ink)]">{children}</p>
  );
}

export default function Symposium2026Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: simposio2026.title,
    description: simposio2026.summary,
    startDate: '2026-04-09',
    endDate: '2026-04-10',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventCompleted',
    location: {
      '@type': 'Place',
      name: simposio2026.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Buenos Aires',
        addressCountry: 'AR',
      },
    },
    organizer: {
      '@type': 'NGO',
      name: simposio2026.organizingInstitution,
      url: `${getSiteUrl()}/es/instituto`,
    },
    url: `${getSiteUrl()}/es/simposios/2026-buenos-aires`,
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <div className="mx-auto max-w-[var(--container-default)] space-y-24 px-6 py-16 sm:px-10">
        <header className="max-w-5xl space-y-4 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>{`Simposios / ${simposio2026.location}`}</Eyebrow>
          <h1 className="max-w-5xl text-balance text-[length:clamp(34px,5vw,60px)]">
            {simposio2026.title}
          </h1>
          <p className="text-pretty text-xl leading-[1.7] text-[color:var(--ui-ink-3)]">{simposio2026.subtitle}</p>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--ui-link)]">
            {simposio2026.dates} / {simposio2026.location}
          </p>
          <p className="max-w-4xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            {simposio2026.summary}
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {simposio2026.highlights.map((item) => (
            <div
              key={item}
              className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-muted)] px-5 py-6 text-sm leading-6 text-[color:var(--ui-display-ink)]"
            >
              {item}
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_20rem]">
          <div className="space-y-6">
            <SectionHeader
              eyebrow={simposio2026.declaration.title}
              title="Una pieza doctrinaria y política para la victimología científica."
              lead={simposio2026.declaration.intro}
            />
            <div className="space-y-4">
              {simposio2026.declaration.standards.map((standard) => (
                <div key={standard} className="flex gap-3 border-l-2 border-dorado-600 pl-4">
                  <p className="text-sm leading-7 text-[color:var(--ui-ink-3)]">{standard}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)]">
            <Eyebrow>Documento oficial</Eyebrow>
            <p className="mt-4 text-sm leading-7 text-[color:var(--ui-ink-3)]">
              Cierre doctrinario del encuentro y pieza central para la proyección internacional de la red
              académica que IVUJUS busca consolidar.
            </p>
            <ButtonPrincipal
              href={simposio2026.declaration.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 w-full justify-center"
            >
              Descargar declaración
            </ButtonPrincipal>
            <p className="mt-3 text-sm leading-6 text-[color:var(--ui-ink-4)]">{simposio2026.declaration.pdfNote}</p>
            <div className="mt-6 space-y-2 border-t border-[color:var(--ui-border)] pt-4 text-sm leading-7 text-[color:var(--ui-ink-3)]">
              <p>
                <strong className="text-[color:var(--ui-display-ink)]">Organización:</strong> {simposio2026.organizingInstitution}
              </p>
              <p>
                <strong className="text-[color:var(--ui-display-ink)]">Sede:</strong> {simposio2026.location}
              </p>
            </div>
          </aside>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Programa"
            title="Dos jornadas, doce momentos de debate y una agenda de archivo."
          />

          <div className="space-y-10">
            {simposio2026.days.map((day) => (
              <section
                key={day.id}
                className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)] sm:p-8"
              >
                <div className="mb-8 flex flex-col gap-3 border-b border-[color:var(--ui-border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <MetaLabel>{day.shortLabel}</MetaLabel>
                    <h3 className="mt-2 text-[length:clamp(22px,2.6vw,30px)]">{day.title}</h3>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-[color:var(--ui-ink-3)]">{day.summary}</p>
                </div>

                <div className="space-y-4">
                  {day.sessions.map((session) => (
                    <details
                      key={`${day.id}-${session.time}-${session.title}`}
                      className="group rounded-sm border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-muted)] p-4 open:bg-[color:var(--ui-bg-surface)]"
                    >
                      <summary className="cursor-pointer list-none">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="space-y-1">
                            <MetaLabel>{session.time}</MetaLabel>
                            <h4 className="text-[19px] leading-[1.3] text-[color:var(--ui-display-ink)]">{session.title}</h4>
                            {session.speakers ? (
                              <p className="text-sm leading-6 text-[color:var(--ui-ink-3)]">
                                <strong className="text-[color:var(--ui-display-ink)]">Expositores:</strong> {session.speakers}
                              </p>
                            ) : null}
                          </div>
                          <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ui-ink-4)] group-open:text-[color:var(--ui-accent-ink)]">
                            Ver detalle
                          </span>
                        </div>
                      </summary>

                      <div className="mt-5 space-y-4 border-t border-[color:var(--ui-border)] pt-4">
                        {session.summary ? (
                          <p className="text-sm leading-7 text-[color:var(--ui-ink-3)]">{session.summary}</p>
                        ) : null}
                        {session.youtubeUrl ? <VideoFrame src={session.youtubeUrl} title={session.title} /> : null}
                        {session.notes ? (
                          <p className="text-sm leading-7 text-[color:var(--ui-ink-4)]">{session.notes}</p>
                        ) : null}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader eyebrow="Cobertura" title="El simposio en los medios." />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {simposio2026.press.map((article) => (
              <a
                key={article.href}
                href={article.href}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] shadow-[var(--shadow-1)] transition-shadow duration-[var(--motion-base)] ease-[var(--easing-standard)] hover:shadow-[var(--shadow-3)]"
              >
                <div className="relative h-48 overflow-hidden bg-[color:var(--ui-bg-subtle)]">
                  <Image
                    src={article.image}
                    alt={article.alt}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ui-accent-ink)]">
                    {article.outlet}
                  </p>
                  <h3 className="text-base leading-6 transition-colors duration-[var(--motion-fast)] group-hover:text-[color:var(--ui-link)]">
                    {article.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
