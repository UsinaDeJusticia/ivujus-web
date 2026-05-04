import type { Metadata } from 'next';

import { simposio2026 } from '@/lib/simposio2026';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';

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
    <div className="relative aspect-video overflow-hidden rounded border border-[var(--color-usina-line)] bg-black shadow-sm">
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
    <main className="min-h-screen bg-[var(--color-usina-paper)] px-6 py-10 text-[var(--color-usina-ink)] sm:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <div className="mx-auto max-w-6xl space-y-14">
        <header className="border-b border-[var(--color-usina-line)] pb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
            Simposios / {simposio2026.location}
          </p>
          <div className="mt-5 max-w-5xl space-y-4">
            <h1
              className="text-4xl leading-tight text-[var(--color-usina-navy)] sm:text-6xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {simposio2026.title}
            </h1>
            <p className="text-xl leading-8 text-[color:color-mix(in_srgb,var(--color-usina-ink)_82%,white)]">
              {simposio2026.subtitle}
            </p>
            <p className="text-sm uppercase tracking-[0.24em] text-[color:color-mix(in_srgb,var(--color-usina-navy)_72%,white)]">
              {simposio2026.dates} / {simposio2026.location}
            </p>
            <p className="max-w-4xl text-lg leading-8 text-[color:color-mix(in_srgb,var(--color-usina-ink)_80%,white)]">
              {simposio2026.summary}
            </p>
          </div>
        </header>

        <section className="grid gap-px border border-[var(--color-usina-line)] bg-[var(--color-usina-line)] md:grid-cols-3">
          {simposio2026.highlights.map((item) => (
            <div key={item} className="bg-white/70 px-5 py-4 text-sm leading-6 text-[var(--color-usina-navy)]">
              {item}
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_20rem]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
              {simposio2026.declaration.title}
            </p>
            <h2
              className="text-3xl leading-tight text-[var(--color-usina-navy)] sm:text-4xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Una pieza doctrinaria y politica para la victimologia cientifica.
            </h2>
            <p className="text-lg leading-8 text-[color:color-mix(in_srgb,var(--color-usina-ink)_80%,white)]">
              {simposio2026.declaration.intro}
            </p>
            <div className="space-y-4">
              {simposio2026.declaration.standards.map((standard) => (
                <div key={standard} className="flex gap-3 border-l-2 border-[var(--color-usina-accent)] pl-4">
                  <p className="text-sm leading-7 text-[color:color-mix(in_srgb,var(--color-usina-ink)_82%,white)]">
                    {standard}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="border border-[var(--color-usina-line)] bg-white/70 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
              Documento oficial
            </p>
            <p className="mt-4 text-sm leading-7 text-[color:color-mix(in_srgb,var(--color-usina-ink)_76%,white)]">
              Cierre doctrinario del encuentro y pieza central para la proyeccion internacional de
              la red academica que IVUJUS busca consolidar.
            </p>
            <a
              className="mt-4 inline-flex w-full items-center justify-center border border-[var(--color-usina-navy)] bg-[var(--color-usina-navy)] px-4 py-3 text-sm font-medium text-white transition hover:bg-[color:color-mix(in_srgb,var(--color-usina-navy)_88%,black)]"
              href={simposio2026.declaration.pdfUrl}
              target="_blank"
              rel="noreferrer"
            >
              Descargar declaracion
            </a>
            <p className="mt-3 text-sm leading-6 text-[color:color-mix(in_srgb,var(--color-usina-ink)_74%,white)]">
              {simposio2026.declaration.pdfNote}
            </p>
            <div className="mt-6 border-t border-[var(--color-usina-line)] pt-4 text-sm leading-7 text-[color:color-mix(in_srgb,var(--color-usina-ink)_74%,white)]">
              <p>
                <strong>Organizacion:</strong> {simposio2026.organizingInstitution}
              </p>
              <p>
                <strong>Sede:</strong> {simposio2026.location}
              </p>
            </div>
          </aside>
        </section>

        <section className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
              Programa
            </p>
            <h2
              className="text-3xl leading-tight text-[var(--color-usina-navy)] sm:text-4xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Dos jornadas, doce momentos de debate y una agenda de archivo.
            </h2>
          </div>

          <div className="space-y-10">
            {simposio2026.days.map((day) => (
              <section key={day.id} className="border border-[var(--color-usina-line)] bg-white/70 p-6 sm:p-8">
                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
                      {day.shortLabel}
                    </p>
                    <h3
                      className="mt-2 text-2xl text-[var(--color-usina-navy)] sm:text-3xl"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                      {day.title}
                    </h3>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-[color:color-mix(in_srgb,var(--color-usina-ink)_76%,white)]">
                    {day.summary}
                  </p>
                </div>

                <div className="space-y-6">
                  {day.sessions.map((session) => (
                    <details key={`${day.id}-${session.time}-${session.title}`} className="group border border-[var(--color-usina-line)] bg-[var(--color-usina-paper)] p-4 open:bg-white">
                      <summary className="cursor-pointer list-none">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="space-y-1">
                            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
                              {session.time}
                            </p>
                            <h4
                              className="text-xl leading-tight text-[var(--color-usina-navy)]"
                              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                            >
                              {session.title}
                            </h4>
                            {session.speakers ? (
                              <p className="text-sm leading-6 text-[color:color-mix(in_srgb,var(--color-usina-ink)_78%,white)]">
                                <strong>Expositores:</strong> {session.speakers}
                              </p>
                            ) : null}
                          </div>
                          <span className="text-xs uppercase tracking-[0.24em] text-[color:color-mix(in_srgb,var(--color-usina-navy)_72%,white)] group-open:text-[var(--color-usina-accent)]">
                            Ver detalle
                          </span>
                        </div>
                      </summary>

                      <div className="mt-5 space-y-4">
                        {session.summary ? (
                          <p className="text-sm leading-7 text-[color:color-mix(in_srgb,var(--color-usina-ink)_80%,white)]">
                            {session.summary}
                          </p>
                        ) : null}
                        {session.youtubeUrl ? (
                          <VideoFrame src={session.youtubeUrl} title={session.title} />
                        ) : null}
                        {session.notes ? (
                          <p className="text-sm leading-7 text-[color:color-mix(in_srgb,var(--color-usina-ink)_72%,white)]">
                            {session.notes}
                          </p>
                        ) : null}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
              Cobertura
            </p>
            <h2
              className="text-3xl leading-tight text-[var(--color-usina-navy)] sm:text-4xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              El simposio en los medios.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {simposio2026.press.map((article) => (
              <a
                key={article.href}
                href={article.href}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden border border-[var(--color-usina-line)] bg-white/70 transition hover:border-[var(--color-usina-accent)]"
              >
                <div className="h-48 overflow-hidden bg-[var(--color-usina-line)]">
                  <img
                    src={article.image}
                    alt={article.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
                    {article.outlet}
                  </p>
                  <h3 className="text-base leading-6 text-[var(--color-usina-navy)]">
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
