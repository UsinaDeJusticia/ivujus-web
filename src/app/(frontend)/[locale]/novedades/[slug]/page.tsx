import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';

import { novedadesData, getNovedadBySlug } from '@/lib/novedades';
import { type Locale, pickLocale, resolveLocale } from '@/lib/i18n';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow } from '@/components/ui/SectionHeader';
import { LinkArrow, ButtonPrincipal } from '@/components/ui/Buttons';

export function generateStaticParams() {
  return novedadesData.map((novedad) => ({ slug: novedad.slug }));
}

// Copys de interfaz por idioma. El contenido de la novedad ya viene traducido.
const LABELS: Record<
  Locale,
  {
    seccion: string;
    noEncontradaTitle: string;
    noEncontradaDescription: string;
    fuenteExterna: string;
    volver: string;
    breadcrumbHome: string;
  }
> = {
  es: {
    seccion: 'Novedades',
    noEncontradaTitle: 'Novedad no encontrada',
    noEncontradaDescription: 'La novedad solicitada no existe.',
    fuenteExterna: 'Fuente externa',
    volver: 'Volver a Novedades',
    breadcrumbHome: 'Inicio',
  },
  en: {
    seccion: 'Updates',
    noEncontradaTitle: 'Update not found',
    noEncontradaDescription: 'The requested update does not exist.',
    fuenteExterna: 'External source',
    volver: 'Back to Updates',
    breadcrumbHome: 'Home',
  },
  fr: {
    seccion: 'Actualités',
    noEncontradaTitle: 'Actualité introuvable',
    noEncontradaDescription: "L'actualité demandée n'existe pas.",
    fuenteExterna: 'Source externe',
    volver: 'Retour aux actualités',
    breadcrumbHome: 'Accueil',
  },
};

function formatFecha(fecha: string, locale: Locale): string {
  return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${fecha}T00:00:00Z`),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const labels = pickLocale(LABELS, locale);
  const novedad = getNovedadBySlug(slug, locale);

  if (!novedad) {
    return buildLocalizedMetadata({
      locale,
      path: `/novedades/${slug}`,
      title: labels.noEncontradaTitle,
      description: labels.noEncontradaDescription,
    });
  }

  return buildLocalizedMetadata({
    locale,
    path: `/novedades/${novedad.slug}`,
    title: novedad.titulo,
    description: novedad.bajada.slice(0, 155),
  });
}

export default async function NovedadDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const resolvedLocale = resolveLocale(locale);
  const labels = pickLocale(LABELS, locale);
  const novedad = getNovedadBySlug(slug, locale);

  if (!novedad) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: novedad.titulo,
    description: novedad.bajada,
    datePublished: novedad.fecha,
    image: novedad.imagen ? [novedad.imagen] : undefined,
    publisher: {
      '@type': 'NGO',
      name: 'Instituto de Victimología de Usina de Justicia',
      url: `${getSiteUrl()}/es/instituto`,
    },
    mainEntityOfPage: `${getSiteUrl()}/es/novedades/${novedad.slug}`,
  };

  // Sin builder dedicado en src/lib/seo.ts (no existe buildBreadcrumbJsonLd
  // todavía); mismo patrón manual + buildJsonLdScript que en el resto de
  // subpáginas (ver publicaciones/declaraciones/*).
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
        item: `${getSiteUrl()}/${locale}/novedades`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: novedad.titulo,
        item: `${getSiteUrl()}/${locale}/novedades/${novedad.slug}`,
      },
    ],
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={buildJsonLdScript(breadcrumbJsonLd)}
      />
      <div className="mx-auto max-w-[var(--container-narrow)] space-y-12 px-6 py-16 sm:px-10">
        <header className="space-y-5 border-b border-[color:var(--ui-border)] pb-10">
          <Eyebrow>
            {`${labels.seccion} / `}
            <time dateTime={novedad.fecha}>{formatFecha(novedad.fecha, resolvedLocale)}</time>
          </Eyebrow>
          {/* break-words: mismo cuidado que en formacion/ciclos/[slug] y en
              el <h1> de la home — títulos editoriales largos en español no
              siempre caben a 360px sin permitir el corte dentro de la
              palabra. */}
          <h1 className="max-w-3xl text-balance break-words text-[length:clamp(30px,4.4vw,48px)]">
            {novedad.titulo}
          </h1>
        </header>

        {novedad.imagen ? (
          <div className="relative aspect-video overflow-hidden rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-muted)] shadow-[var(--shadow-1)]">
            <Image
              src={novedad.imagen}
              alt={novedad.titulo}
              fill
              sizes="(min-width: 1024px) 720px, 100vw"
              quality={75}
              priority
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="space-y-5">
          {novedad.contenido.map((parrafo, index) => (
            <p key={index} className="text-pretty text-base leading-[1.8] text-[color:var(--ui-ink-3)]">
              {parrafo}
            </p>
          ))}
        </div>

        {novedad.enlacesExternos && novedad.enlacesExternos.length > 0 ? (
          <section className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)] sm:p-8">
            <Eyebrow>{labels.fuenteExterna}</Eyebrow>
            <div className="mt-5 flex flex-wrap gap-4">
              {novedad.enlacesExternos.map((enlace) => (
                <ButtonPrincipal key={enlace.url} href={enlace.url} target="_blank" rel="noreferrer">
                  {enlace.titulo}
                </ButtonPrincipal>
              ))}
            </div>
          </section>
        ) : null}

        <div>
          <LinkArrow href={`/${locale}/novedades`}>{labels.volver}</LinkArrow>
        </div>
      </div>
    </main>
  );
}
