import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';

import { galeriaCopy, getSimposio2026, resolveGaleriaLocale } from '@/lib/simposio2026';
import { type Locale, pickLocale, resolveLocale } from '@/lib/i18n';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow, SectionHeader } from '@/components/ui/SectionHeader';
import { ButtonPrincipal } from '@/components/ui/Buttons';

// Copys de interfaz por idioma. El contenido del simposio (título, programa,
// declaración, prensa) viene ya traducido de getSimposio2026(locale).
const LABELS: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    seccion: string;
    declaracionTitle: string;
    documentoOficial: string;
    documentoLead: string;
    descargar: string;
    organizacion: string;
    sede: string;
    programaEyebrow: string;
    programaTitle: string;
    expositores: string;
    verDetalle: string;
    coberturaEyebrow: string;
    coberturaTitle: string;
    breadcrumbHome: string;
  }
> = {
  es: {
    metaTitle: 'Simposio 2026 Buenos Aires',
    metaDescription:
      'Programa, declaración final y cobertura del Primer Simposio Americano y Europeo de Victimología Penal realizado en Buenos Aires en 2026.',
    seccion: 'Eventos académicos',
    declaracionTitle: 'Una pieza doctrinaria y política para la victimología científica.',
    documentoOficial: 'Documento oficial',
    documentoLead:
      'Cierre doctrinario del encuentro y pieza central para la proyección internacional de la red académica que IVUJUS busca consolidar.',
    descargar: 'Descargar declaración',
    organizacion: 'Organización:',
    sede: 'Sede:',
    programaEyebrow: 'Programa',
    programaTitle: 'Dos jornadas, doce momentos de debate y una agenda de archivo.',
    expositores: 'Expositores:',
    verDetalle: 'Ver detalle',
    coberturaEyebrow: 'Cobertura',
    coberturaTitle: 'El simposio en los medios.',
    breadcrumbHome: 'Inicio',
  },
  en: {
    metaTitle: 'Symposium 2026 Buenos Aires',
    metaDescription:
      'Programme, final declaration and media coverage of the First American and European Symposium on Criminal Victimology, held in Buenos Aires in 2026.',
    seccion: 'Academic Events',
    declaracionTitle: 'A doctrinal and political milestone for scientific victimology.',
    documentoOficial: 'Official document',
    documentoLead:
      'The doctrinal conclusion of the gathering and a central piece for the international projection of the academic network IVUJUS seeks to consolidate.',
    descargar: 'Download the declaration',
    organizacion: 'Organised by:',
    sede: 'Venue:',
    programaEyebrow: 'Programme',
    programaTitle: 'Two conference days, twelve moments of debate and an archive agenda.',
    expositores: 'Speakers:',
    verDetalle: 'View details',
    coberturaEyebrow: 'Coverage',
    coberturaTitle: 'The symposium in the media.',
    breadcrumbHome: 'Home',
  },
  fr: {
    metaTitle: 'Symposium 2026 Buenos Aires',
    metaDescription:
      "Programme, déclaration finale et couverture médiatique du Premier Symposium américain et européen de victimologie pénale, tenu à Buenos Aires en 2026.",
    seccion: 'Événements académiques',
    declaracionTitle: 'Une pièce doctrinale et politique pour la victimologie scientifique.',
    documentoOficial: 'Document officiel',
    documentoLead:
      "Conclusion doctrinale de la rencontre et pièce centrale pour le rayonnement international du réseau académique qu'IVUJUS cherche à consolider.",
    descargar: 'Télécharger la déclaration',
    organizacion: 'Organisation :',
    sede: 'Lieu :',
    programaEyebrow: 'Programme',
    programaTitle: "Deux journées, douze moments de débat et un fonds d'archive.",
    expositores: 'Intervenants :',
    verDetalle: 'Voir le détail',
    coberturaEyebrow: 'Couverture',
    coberturaTitle: 'Le symposium dans les médias.',
    breadcrumbHome: 'Accueil',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const labels = pickLocale(LABELS, locale);

  return buildLocalizedMetadata({
    locale,
    path: '/simposios/2026-buenos-aires',
    title: labels.metaTitle,
    description: labels.metaDescription,
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

export default async function Symposium2026Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const labels = pickLocale(LABELS, rawLocale);
  const simposio2026 = getSimposio2026(rawLocale);
  const galeriaLabels = galeriaCopy[resolveGaleriaLocale(rawLocale)];

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
      url: `${getSiteUrl()}/${locale}/instituto`,
    },
    url: `${getSiteUrl()}/${locale}/simposios/2026-buenos-aires`,
    inLanguage: locale,
  };

  // Home > Simposios > Simposio 2026.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: labels.breadcrumbHome,
        item: `${getSiteUrl()}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: labels.seccion,
        item: `${getSiteUrl()}/${locale}/simposios`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: simposio2026.title,
        item: `${getSiteUrl()}/${locale}/simposios/2026-buenos-aires`,
      },
    ],
    inLanguage: locale,
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={buildJsonLdScript(breadcrumbJsonLd)}
      />
      <div className="mx-auto max-w-[var(--container-default)] space-y-24 px-6 py-16 sm:px-10">
        <header className="max-w-5xl space-y-4 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>{`${labels.seccion} / ${simposio2026.location}`}</Eyebrow>
          <h1 className="max-w-5xl text-balance text-[length:clamp(34px,5vw,60px)]">
            {simposio2026.title}
          </h1>
          <p className="text-pretty text-xl leading-[1.7] text-[color:var(--ui-ink-3)]">{simposio2026.subtitle}</p>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--ui-link)]">
            <time dateTime="2026-04-09">{simposio2026.dates}</time> / {simposio2026.location}
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
              title={labels.declaracionTitle}
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
            <Eyebrow>{labels.documentoOficial}</Eyebrow>
            <p className="mt-4 text-sm leading-7 text-[color:var(--ui-ink-3)]">
              {labels.documentoLead}
            </p>
            <ButtonPrincipal
              href={simposio2026.declaration.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 w-full justify-center"
            >
              {labels.descargar}
            </ButtonPrincipal>
            <p className="mt-3 text-sm leading-6 text-[color:var(--ui-ink-4)]">{simposio2026.declaration.pdfNote}</p>
            <div className="mt-6 space-y-2 border-t border-[color:var(--ui-border)] pt-4 text-sm leading-7 text-[color:var(--ui-ink-3)]">
              <p>
                <strong className="text-[color:var(--ui-display-ink)]">{labels.organizacion}</strong> {simposio2026.organizingInstitution}
              </p>
              <p>
                <strong className="text-[color:var(--ui-display-ink)]">{labels.sede}</strong> {simposio2026.location}
              </p>
            </div>
          </aside>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow={labels.programaEyebrow}
            title={labels.programaTitle}
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
                                <strong className="text-[color:var(--ui-display-ink)]">{labels.expositores}</strong> {session.speakers}
                              </p>
                            ) : null}
                          </div>
                          <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ui-ink-3)] group-open:text-[color:var(--ui-accent-ink)]">
                            {labels.verDetalle}
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
          <SectionHeader eyebrow={galeriaLabels.eyebrow} title={galeriaLabels.title} />

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {simposio2026.galeria.map((foto) => (
              <figure key={foto.imagen} className="space-y-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-subtle)] shadow-[var(--shadow-1)]">
                  <Image
                    src={foto.imagen}
                    alt={foto.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    quality={75}
                    className="object-cover"
                  />
                </div>
                {foto.epigrafe ? (
                  <figcaption className="text-sm leading-6 text-[color:var(--ui-ink-4)]">{foto.epigrafe}</figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader eyebrow={labels.coberturaEyebrow} title={labels.coberturaTitle} />

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
                    quality={75}
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
                  {/* Los títulos de prensa no se traducen: son artículos
                      publicados en español y se citan por su título real. Esta
                      nota avisa en qué idioma está el artículo. */}
                  {article.notaIdioma ? (
                    <p className="text-[11px] leading-5 text-[color:var(--ui-ink-4)]">
                      {article.notaIdioma}
                    </p>
                  ) : null}
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
