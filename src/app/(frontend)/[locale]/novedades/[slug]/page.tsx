import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';

import { novedadesData, getNovedadBySlug } from '@/lib/novedades';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow } from '@/components/ui/SectionHeader';
import { LinkArrow, ButtonPrincipal } from '@/components/ui/Buttons';

export function generateStaticParams() {
  return novedadesData.map((novedad) => ({ slug: novedad.slug }));
}

function formatFecha(fecha: string): string {
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
  const novedad = getNovedadBySlug(slug);

  if (!novedad) {
    return buildLocalizedMetadata({
      locale,
      path: `/novedades/${slug}`,
      title: 'Novedad no encontrada',
      description: 'La novedad solicitada no existe.',
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
  const novedad = getNovedadBySlug(slug);

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

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <div className="mx-auto max-w-[var(--container-narrow)] space-y-12 px-6 py-16 sm:px-10">
        <header className="space-y-5 border-b border-[color:var(--ui-border)] pb-10">
          <Eyebrow>{`Novedades / ${formatFecha(novedad.fecha)}`}</Eyebrow>
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
            <Eyebrow>Fuente externa</Eyebrow>
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
          <LinkArrow href={`/${locale}/novedades`}>Volver a Novedades</LinkArrow>
        </div>
      </div>
    </main>
  );
}
