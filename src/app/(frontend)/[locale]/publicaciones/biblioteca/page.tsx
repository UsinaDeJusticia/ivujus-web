import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { formatDateLong, resolveLocale } from '@/lib/i18n';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { getBibliotecaLabels, getLibrosRecomendados } from '@/lib/biblioteca';
import {
  declaracionesIndex,
  getDossiers,
  getLibroNuevosParadigmas,
  getPublicacionesLabels,
} from '@/lib/publicaciones';
import { getSimposio2026 } from '@/lib/simposio2026';
import { Eyebrow } from '@/components/ui/SectionHeader';
import { ButtonSecundario, LinkArrow } from '@/components/ui/Buttons';
import { VidrieraSlot } from '@/components/vidriera/VidrieraSlot';
import type { PiezaVidriera } from '@/components/vidriera/piezas';

const HOME_LABEL: Record<string, string> = { es: 'Inicio', en: 'Home', fr: 'Accueil' };

/** Las fechas de dossier son texto libre por idioma («enero de 2021»); el año se extrae. */
function anioDe(fecha: string): string {
  return /\d{4}/.exec(fecha)?.[0] ?? '';
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const labels = getBibliotecaLabels(locale);

  return buildLocalizedMetadata({
    locale,
    path: '/publicaciones/biblioteca',
    title: labels.metaTitle,
    description: labels.metaDescription,
  });
}

// Biblioteca: la vidriera de todo el material editorial del instituto.
//
// Dos criterios que explican por qué esta página está armada así:
//
// 1. No guarda contenido propio salvo los libros recomendados. El libro, los
//    dossiers y la declaración se leen de los datasets que ya los tienen y se
//    enlaza a su página canónica. Duplicar esos textos acá los pondría a
//    divergir en la primera corrección que alguien haga de un solo lado.
//    Sí se muestra el resumen de cada pieza: es el comportamiento normal de
//    una página índice (mostrar el extracto y enlazar al detalle), y la acción
//    que define a la página canónica —la descarga del PDF— sigue estando solo
//    allá, no acá.
//
// 2. La vidriera 3D es decorado. Todo lo que aparece en la escena está también
//    en el listado de abajo como texto y enlaces reales, renderizados en el
//    servidor. Si WebGL no arranca —móvil, sin JavaScript, `prefers-reduced-motion`,
//    GPU que falla— no se pierde ni un dato ni un enlace.
export default async function BibliotecaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = resolveLocale(locale);
  const labels = getBibliotecaLabels(locale);
  const publicaciones = getPublicacionesLabels(locale);
  const libro = getLibroNuevosParadigmas(locale);
  const dossiers = getDossiers(locale);
  const recomendados = getLibrosRecomendados(locale);
  const declaracion = getSimposio2026(locale).declaration;
  const declaracionRef = declaracionesIndex[0];
  const declaracionHref = `/${locale}/publicaciones/declaraciones/${declaracionRef.slug}`;

  const piezas: PiezaVidriera[] = [
    {
      id: libro.slug,
      titulo: libro.title,
      tipo: 'libro',
      anio: anioDe(libro.fecha),
      href: `/${locale}/publicaciones/libros`,
    },
    ...recomendados.map<PiezaVidriera>((rec) => ({
      id: rec.slug,
      titulo: rec.titulo,
      tipo: 'libro',
      anio: rec.anio,
      href: rec.compraUrl,
    })),
    ...dossiers.map<PiezaVidriera>((dossier) => ({
      id: dossier.slug,
      titulo: dossier.titulo,
      tipo: 'dossier',
      anio: anioDe(dossier.fecha),
      href: `/${locale}/publicaciones/dossiers`,
    })),
    {
      id: declaracionRef.slug,
      titulo: declaracion.title,
      tipo: 'declaracion',
      anio: anioDe(declaracionRef.fecha),
      href: declaracionHref,
    },
  ];

  // Tipos por pieza según la regla 5 de docs/GOBERNANZA-CONTENIDO.md: Book
  // para libros, Report para dossiers. Los libros propios llevan `publisher`;
  // los recomendados NO — decir que los publicamos nosotros sería falso.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: labels.metaTitle,
    description: labels.metaDescription,
    inLanguage: resolvedLocale,
    url: `${getSiteUrl()}/${locale}/publicaciones/biblioteca`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: piezas.length,
      itemListElement: [
        {
          '@type': 'Book',
          position: 1,
          name: libro.title,
          author: libro.authors,
          datePublished: libro.fecha,
          url: `${getSiteUrl()}/${locale}/publicaciones/libros`,
          publisher: {
            '@type': 'NGO',
            name: 'Instituto de Victimología de Usina de Justicia',
            url: `${getSiteUrl()}/${locale}/instituto`,
          },
        },
        ...recomendados.map((rec, i) => ({
          '@type': 'Book',
          position: 2 + i,
          name: rec.titulo,
          author: rec.autores.join(', '),
          datePublished: rec.anio,
          description: rec.resumen,
          url: rec.compraUrl,
        })),
        ...dossiers.map((dossier, i) => ({
          '@type': 'Report',
          position: 2 + recomendados.length + i,
          name: dossier.titulo,
          description: dossier.resumen,
          url: `${getSiteUrl()}/${locale}/publicaciones/dossiers`,
          publisher: {
            '@type': 'NGO',
            name: 'Instituto de Victimología de Usina de Justicia',
            url: `${getSiteUrl()}/${locale}/instituto`,
          },
        })),
        {
          '@type': 'CreativeWork',
          position: 2 + recomendados.length + dossiers.length,
          name: declaracion.title,
          description: declaracion.intro,
          datePublished: declaracionRef.fecha,
          url: `${getSiteUrl()}${declaracionHref}`,
        },
      ],
    },
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
        name: publicaciones.publicaciones,
        item: `${getSiteUrl()}/${locale}/publicaciones`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: labels.biblioteca,
        item: `${getSiteUrl()}/${locale}/publicaciones/biblioteca`,
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

      <div className="mx-auto max-w-[var(--container-default)] px-6 pt-16 sm:px-10">
        <header className="max-w-4xl space-y-5">
          <Eyebrow>{labels.eyebrow}</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[length:clamp(34px,5vw,60px)]">
            {labels.heading}
          </h1>
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            {labels.lead}
          </p>
        </header>
      </div>

      {/* Franja de la vidriera. Alto acotado a propósito: si ocupara la
          pantalla entera empujaría el contenido real fuera del primer scroll y
          se comería el LCP, que tiene que seguir siendo el h1. */}
      <div className="mt-12 border-y border-[color:var(--ui-border)] bg-[color:var(--ui-bg-subtle)]">
        {/* El canvas va a sangre, sin el padding del contenedor: si no, el
            estante termina a 40px de cada borde y se ve como una tabla suelta
            en vez de un estante que sigue más allá del encuadre. */}
        <div className="h-[clamp(250px,38vh,400px)] w-full">
          <VidrieraSlot piezas={piezas} />
        </div>
        <p className="mx-auto max-w-[var(--container-default)] px-6 pb-5 pt-2 text-center text-[11px] leading-5 text-[color:var(--ui-ink-4)] sm:px-10">
          {labels.vidrieraNota}
        </p>
      </div>

      <div className="mx-auto max-w-[var(--container-default)] space-y-16 px-6 py-16 sm:px-10">
        {/* --- Libros del IVUJUS --- */}
        <section className="space-y-8" aria-labelledby="biblioteca-propios">
          <div className="max-w-3xl space-y-3 border-b border-[color:var(--ui-border)] pb-6">
            <h2
              id="biblioteca-propios"
              className="text-[length:clamp(24px,3.2vw,34px)] leading-[1.2]"
            >
              {labels.librosPropiosTitle}
            </h2>
            <p className="text-pretty leading-[1.7] text-[color:var(--ui-ink-3)]">
              {labels.librosPropiosLead}
            </p>
          </div>

          <article className="flex flex-col gap-6 rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)] sm:flex-row sm:items-start sm:p-8">
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-subtle)] sm:w-52">
              <Image
                src={libro.coverImage}
                alt={libro.coverAlt}
                fill
                sizes="(min-width: 640px) 208px, 90vw"
                quality={75}
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ui-accent-ink)]">
                {formatDateLong(libro.fecha, locale)}
              </p>
              <h3 className="mt-2 text-[length:clamp(19px,2.4vw,26px)] leading-[1.25]">
                {libro.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-[color:var(--ui-ink-3)]">{libro.subtitle}</p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--ui-ink-3)]">
                {publicaciones.autores}: {libro.authors}
              </p>
              <div className="mt-5">
                <LinkArrow href={`/${locale}/publicaciones/libros`}>{labels.verFicha}</LinkArrow>
              </div>
            </div>
          </article>
        </section>

        {/* --- Libros recomendados ---
            La sección entera se omite mientras no haya material real. Una
            sección vacía en pantalla es peor que ninguna (regla 2 de
            gobernanza) y no se inventan libros de relleno (regla 1). */}
        {recomendados.length > 0 ? (
          <section className="space-y-8" aria-labelledby="biblioteca-recomendados">
            <div className="max-w-3xl space-y-3 border-b border-[color:var(--ui-border)] pb-6">
              <h2
                id="biblioteca-recomendados"
                className="text-[length:clamp(24px,3.2vw,34px)] leading-[1.2]"
              >
                {labels.librosRecomendadosTitle}
              </h2>
              <p className="text-pretty leading-[1.7] text-[color:var(--ui-ink-3)]">
                {labels.librosRecomendadosLead}
              </p>
            </div>

            <ul className="grid list-none gap-6 p-0 md:grid-cols-2">
              {recomendados.map((rec) => (
                <li key={rec.slug}>
                  <article className="flex h-full flex-col gap-5 rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)] sm:flex-row sm:items-start">
                    <div className="relative aspect-[2/3] w-full shrink-0 overflow-hidden rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-subtle)] sm:w-28">
                      <Image
                        src={rec.coverImage}
                        alt={rec.coverAlt}
                        fill
                        sizes="(min-width: 640px) 112px, 90vw"
                        quality={75}
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[length:clamp(17px,2vw,21px)] leading-[1.3]">
                        {rec.titulo}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-[color:var(--ui-ink-3)]">
                        {rec.autores.join(', ')} · {rec.anio}
                        {rec.editorial ? ` · ${rec.editorial}` : ''}
                      </p>
                      <p className="mt-3 text-sm leading-[1.7] text-[color:var(--ui-ink-3)]">
                        {rec.resumen}
                      </p>
                      <div className="mt-5">
                        <ButtonSecundario
                          href={rec.compraUrl}
                          size="sm"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {rec.compraLabel}
                        </ButtonSecundario>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* --- Dossiers --- */}
        <section className="space-y-8" aria-labelledby="biblioteca-dossiers">
          <div className="max-w-3xl space-y-3 border-b border-[color:var(--ui-border)] pb-6">
            <h2
              id="biblioteca-dossiers"
              className="text-[length:clamp(24px,3.2vw,34px)] leading-[1.2]"
            >
              {labels.dossiersTitle}
            </h2>
            <p className="text-pretty leading-[1.7] text-[color:var(--ui-ink-3)]">
              {labels.dossiersLead}
            </p>
          </div>

          <ul className="grid list-none gap-6 p-0 md:grid-cols-3">
            {dossiers.map((dossier) => (
              <li key={dossier.slug}>
                <article className="flex h-full flex-col rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ui-accent-ink)]">
                    {dossier.fecha}
                  </p>
                  <h3 className="mt-2 text-[length:clamp(17px,2vw,21px)] leading-[1.3]">
                    {dossier.titulo}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.7] text-[color:var(--ui-ink-3)]">
                    {dossier.resumen}
                  </p>
                </article>
              </li>
            ))}
          </ul>

          {/* La descarga del PDF vive en la página de Dossiers, que es la
              canónica de esa rama. Acá solo se enlaza. */}
          <LinkArrow href={`/${locale}/publicaciones/dossiers`}>{labels.verDossiers}</LinkArrow>
        </section>

        {/* --- Declaraciones --- */}
        <section className="space-y-8" aria-labelledby="biblioteca-declaraciones">
          <div className="max-w-3xl space-y-3 border-b border-[color:var(--ui-border)] pb-6">
            <h2
              id="biblioteca-declaraciones"
              className="text-[length:clamp(24px,3.2vw,34px)] leading-[1.2]"
            >
              {labels.declaracionesTitle}
            </h2>
            <p className="text-pretty leading-[1.7] text-[color:var(--ui-ink-3)]">
              {labels.declaracionesLead}
            </p>
          </div>

          <article className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)] sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ui-accent-ink)]">
              {formatDateLong(declaracionRef.fecha, locale)}
            </p>
            <h3 className="mt-2 text-[length:clamp(19px,2.4vw,26px)] leading-[1.25]">
              {declaracion.title}
            </h3>
            <p className="mt-3 max-w-3xl text-base leading-[1.75] text-[color:var(--ui-ink-3)]">
              {declaracion.intro}
            </p>
            <div className="mt-5">
              <LinkArrow href={declaracionHref}>{labels.verDeclaracion}</LinkArrow>
            </div>
          </article>
        </section>

        <div>
          <Link
            href={`/${locale}/publicaciones`}
            className="text-sm font-semibold text-[color:var(--ui-link)] no-underline hover:text-[color:var(--ui-link-hover)]"
          >
            ← {publicaciones.publicaciones}
          </Link>
        </div>
      </div>
    </main>
  );
}
