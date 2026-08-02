import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { resolveLocale } from '@/lib/i18n';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { getEncuentros, getEncuentrosLabels } from '@/lib/encuentros';
import { getLibroNuevosParadigmas } from '@/lib/publicaciones';
import { Eyebrow, SectionHeader } from '@/components/ui/SectionHeader';
import { LinkArrow } from '@/components/ui/Buttons';

const HOME_LABEL: Record<string, string> = { es: 'Inicio', en: 'Home', fr: 'Accueil' };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const labels = getEncuentrosLabels(locale);

  return buildLocalizedMetadata({
    locale,
    path: '/simposios/encuentros',
    title: labels.metaTitle,
    description: labels.metaDescription,
  });
}

// Encuentros y conferencias: subsección de Eventos académicos para
// actividades del IVUJUS distintas del Simposio 2026 (presentaciones de
// libros, jornadas externas). Contenido en src/lib/encuentros/{es,en,fr}.ts.
// La presentación en DAIN Usina Cultural NO se duplica acá: ya tiene su
// contenido completo en /publicaciones/libros (src/lib/publicaciones), así
// que esta página solo arma una tarjeta que enlaza para allá (regla de
// gobernanza "fuente única, sin duplicar").
export default async function EncuentrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = resolveLocale(locale);
  const labels = getEncuentrosLabels(locale);
  const encuentros = getEncuentros(locale);
  const libro = getLibroNuevosParadigmas(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: labels.metaTitle,
    inLanguage: resolvedLocale,
    itemListElement: [
      ...encuentros.map((encuentro, index) => ({
        '@type': 'Event',
        position: index + 1,
        name: encuentro.titulo,
        startDate: encuentro.fecha,
        location: encuentro.lugar
          ? { '@type': 'Place', name: encuentro.lugar }
          : { '@type': 'VirtualLocation', url: `${getSiteUrl()}/${locale}/simposios/encuentros` },
        eventAttendanceMode: encuentro.lugar
          ? 'https://schema.org/OfflineEventAttendanceMode'
          : 'https://schema.org/OnlineEventAttendanceMode',
        organizer: { '@type': 'NGO', name: 'Instituto de Victimología de Usina de Justicia' },
        url: encuentro.enlaceInterno
          ? `${getSiteUrl()}/${locale}${encuentro.enlaceInterno.href}`
          : (encuentro.enlacesExternos?.[0]?.url ?? `${getSiteUrl()}/${locale}/simposios/encuentros`),
      })),
      {
        '@type': 'Event',
        position: encuentros.length + 1,
        name: labels.librosCardTitle,
        startDate: libro.presentacion.fecha,
        location: { '@type': 'Place', name: libro.presentacion.lugar },
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        organizer: { '@type': 'NGO', name: 'Instituto de Victimología de Usina de Justicia' },
        url: `${getSiteUrl()}/${locale}/publicaciones/libros`,
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: HOME_LABEL[locale] ?? HOME_LABEL.es,
        item: `${getSiteUrl()}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: labels.eventosAcademicos,
        item: `${getSiteUrl()}/${locale}/simposios`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: labels.encuentros,
        item: `${getSiteUrl()}/${locale}/simposios/encuentros`,
      },
    ],
    inLanguage: resolvedLocale,
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={buildJsonLdScript(breadcrumbJsonLd)}
      />
      <div className="mx-auto max-w-[var(--container-default)] space-y-14 px-6 py-16 sm:px-10">
        <header className="max-w-4xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>{labels.eyebrow}</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[length:clamp(34px,5vw,60px)]">{labels.heading}</h1>
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            {labels.lead}
          </p>
        </header>

        <div className="space-y-10">
          {encuentros.map((encuentro) => (
            <article
              key={encuentro.slug}
              className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)] sm:p-8"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ui-accent-ink)]">
                {encuentro.fecha}
              </p>
              <h2 className="mt-2 text-[length:clamp(20px,2.6vw,28px)] leading-[1.25]">{encuentro.titulo}</h2>

              <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm leading-6 text-[color:var(--ui-ink-3)]">
                {encuentro.lugar ? (
                  <div className="flex gap-2">
                    <dt className="font-semibold text-[color:var(--ui-display-ink)]">{labels.lugarLabel}:</dt>
                    <dd>{encuentro.lugar}</dd>
                  </div>
                ) : null}
                {encuentro.modalidad ? (
                  <div className="flex gap-2">
                    <dt className="font-semibold text-[color:var(--ui-display-ink)]">{labels.modalidadLabel}:</dt>
                    <dd>{encuentro.modalidad}</dd>
                  </div>
                ) : null}
                {encuentro.oradores && encuentro.oradores.length > 0 ? (
                  <div className="flex gap-2">
                    <dt className="font-semibold text-[color:var(--ui-display-ink)]">{labels.oradoresLabel}:</dt>
                    <dd>{encuentro.oradores.join(', ')}</dd>
                  </div>
                ) : null}
              </dl>

              {encuentro.resumen ? (
                <p className="mt-4 text-base leading-[1.75] text-[color:var(--ui-ink-3)]">{encuentro.resumen}</p>
              ) : null}
              {encuentro.notaCita ? (
                <p className="mt-1 text-[11px] leading-5 text-[color:var(--ui-ink-4)]">{encuentro.notaCita}</p>
              ) : null}

              {encuentro.imagenes && encuentro.imagenes.length > 0 ? (
                <div
                  className={[
                    'mt-6 grid gap-4',
                    encuentro.imagenes.length > 1 ? 'sm:grid-cols-2' : 'sm:max-w-md',
                  ].join(' ')}
                >
                  {encuentro.imagenes.map((imagen) => (
                    <div
                      key={imagen.src}
                      className="relative aspect-[4/3] overflow-hidden rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-subtle)] shadow-[var(--shadow-1)]"
                    >
                      <Image
                        src={imagen.src}
                        alt={imagen.alt}
                        fill
                        sizes="(min-width: 640px) 45vw, 90vw"
                        quality={75}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 space-y-1">
                {encuentro.enlaceInterno ? (
                  <LinkArrow href={`/${locale}${encuentro.enlaceInterno.href}`}>
                    {encuentro.enlaceInterno.label}
                  </LinkArrow>
                ) : null}
                {encuentro.enlacesExternos?.map((enlace) => (
                  <div key={enlace.url}>
                    <a
                      href={enlace.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-[color:var(--ui-link)] underline decoration-dorado-600 decoration-2 underline-offset-4 transition-colors duration-[var(--motion-base)] hover:text-[color:var(--ui-link-hover)]"
                    >
                      {enlace.label}
                    </a>
                    {enlace.notaIdioma ? (
                      <p className="mt-1 text-[11px] leading-5 text-[color:var(--ui-ink-4)]">
                        {enlace.notaIdioma}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </article>
          ))}

          {/* Presentación en DAIN Usina Cultural: no duplicada acá, se compone
              con los datos ya existentes del libro (src/lib/publicaciones). */}
          <article className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)] sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-subtle)] shadow-[var(--shadow-1)] sm:w-48">
                <Image
                  src={libro.coverImage}
                  alt={libro.coverAlt}
                  fill
                  sizes="(min-width: 640px) 192px, 90vw"
                  quality={75}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ui-accent-ink)]">
                  {libro.presentacion.fecha}
                </p>
                <h2 className="mt-2 text-[length:clamp(20px,2.6vw,28px)] leading-[1.25]">
                  {labels.librosCardTitle}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[color:var(--ui-ink-3)]">{libro.presentacion.lugar}</p>
                <div className="mt-4">
                  <LinkArrow href={`/${locale}/publicaciones/libros`}>{labels.librosCardCta}</LinkArrow>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div>
          <Link
            href={`/${locale}/simposios`}
            className="text-sm font-semibold text-[color:var(--ui-link)] no-underline hover:text-[color:var(--ui-link-hover)]"
          >
            ← {labels.eventosAcademicos}
          </Link>
        </div>
      </div>
    </main>
  );
}
