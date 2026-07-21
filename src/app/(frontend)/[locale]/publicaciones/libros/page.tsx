import type { Metadata } from 'next';
import Image from 'next/image';

import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { getPublicacionesLabels, libroNuevosParadigmas } from '@/lib/publicaciones';
import { Eyebrow, SectionHeader } from '@/components/ui/SectionHeader';
import { LinkArrow } from '@/components/ui/Buttons';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildLocalizedMetadata({
    locale,
    path: '/publicaciones/libros',
    title: 'Libros',
    description:
      'Nuevos Paradigmas para la Justicia Penal, libro compilado por Diana Cohen Agrest y María Jimena Molina.',
  });
}

// Contenido tomado de dos posts reales de la REST API pública de
// ivujus.org.ar (ids 24509 y 24540) — ver comentario de cabecera en
// src/lib/publicaciones.ts para el detalle de fuentes.
export default async function LibrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const labels = getPublicacionesLabels(locale);
  const libro = libroNuevosParadigmas;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: libro.title,
    alternateName: libro.subtitle,
    author: [
      { '@type': 'Person', name: 'Diana Cohen Agrest' },
      { '@type': 'Person', name: 'María Jimena Molina' },
    ],
    datePublished: libro.fecha,
    image: libro.coverImage,
    url: `${getSiteUrl()}/es/publicaciones/libros`,
    publisher: {
      '@type': 'Organization',
      name: 'Usina de Justicia',
      url: `${getSiteUrl()}/es/instituto`,
    },
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <div className="mx-auto max-w-[var(--container-default)] space-y-16 px-6 py-16 sm:px-10">
        <header className="max-w-4xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>{`${labels.publicaciones} / ${labels.libros}`}</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[length:clamp(34px,5vw,60px)]">{libro.title}</h1>
          <p className="text-pretty text-xl leading-[1.7] text-[color:var(--ui-ink-3)]">{libro.subtitle}</p>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--ui-link)]">
            {labels.autores}: {libro.authors}
          </p>
        </header>

        <section className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-muted)] shadow-[var(--shadow-1)]">
            <Image
              src={libro.coverImage}
              alt={libro.coverAlt}
              fill
              sizes="(min-width: 1024px) 18rem, 100vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <SectionHeader eyebrow="Anuncio" title="Un libro para colocar a las víctimas en el centro del proceso penal." />
            <div className="space-y-4">
              {libro.announcementParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-[1.75] text-[color:var(--ui-ink-3)]">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-muted)] p-5 text-sm leading-7 text-[color:var(--ui-ink-3)]">
              <p>
                <strong className="text-[color:var(--ui-display-ink)]">{labels.presentacion}:</strong>{' '}
                {libro.presentacion.fecha}, {libro.presentacion.horario}
              </p>
              <p>
                <strong className="text-[color:var(--ui-display-ink)]">{labels.lugar}:</strong>{' '}
                {libro.presentacion.lugar}
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader eyebrow="Presentación" title="Voces de la presentación del libro." lead={libro.summaryIntro} />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {libro.quotes.map((quote) => (
              <article
                key={`${quote.autor}-${quote.cita.slice(0, 20)}`}
                className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)]"
              >
                <p className="text-sm leading-7 text-[color:var(--ui-ink-3)]">&ldquo;{quote.cita}&rdquo;</p>
                <p className="mt-4 text-[13px] font-semibold text-[color:var(--ui-display-ink)]">{quote.autor}</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--ui-ink-4)]">{quote.rol}</p>
              </article>
            ))}
          </div>

          {libro.videoUrl ? (
            <div className="max-w-sm">
              <video
                controls
                className="w-full rounded-md border border-[color:var(--ui-border)] bg-azul-950 shadow-[var(--shadow-1)]"
                src={libro.videoUrl}
              >
                <track kind="captions" />
              </video>
            </div>
          ) : null}
        </section>

        <section className="space-y-4">
          <Eyebrow>{labels.fuente}</Eyebrow>
          <div className="flex flex-wrap gap-6">
            {libro.sourcePosts.map((source) => (
              <LinkArrow key={source.id} href={source.url}>
                {labels.leerNotaCompleta}
              </LinkArrow>
            ))}
          </div>
        </section>

        <div>
          <LinkArrow href={`/${locale}/publicaciones`}>{`${labels.volverA} ${labels.publicaciones.toLowerCase()}`}</LinkArrow>
        </div>
      </div>
    </main>
  );
}
