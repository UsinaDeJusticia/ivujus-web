import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ciclosData, getCicloBySlug } from '@/lib/formacion';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow, SectionHeader } from '@/components/ui/SectionHeader';
import { ButtonPrincipal, LinkArrow } from '@/components/ui/Buttons';

export function generateStaticParams() {
  return ciclosData.map((ciclo) => ({ slug: ciclo.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const ciclo = getCicloBySlug(slug);

  if (!ciclo) {
    return buildLocalizedMetadata({
      locale,
      path: `/formacion/ciclos/${slug}`,
      title: 'Ciclo no encontrado',
      description: 'El ciclo o jornada solicitado no existe.',
    });
  }

  return buildLocalizedMetadata({
    locale,
    path: `/formacion/ciclos/${ciclo.slug}`,
    title: ciclo.titulo,
    description: ciclo.resumen.slice(0, 155),
  });
}

const MESES_ES: Record<string, string> = {
  enero: '01',
  febrero: '02',
  marzo: '03',
  abril: '04',
  mayo: '05',
  junio: '06',
  julio: '07',
  agosto: '08',
  septiembre: '09',
  octubre: '10',
  noviembre: '11',
  diciembre: '12',
};

// `ciclo.fecha` es un string curado en español, no siempre un día exacto
// (ver comentario de `Ciclo` en src/lib/formacion.ts): a veces es
// "mes de año" ("Noviembre de 2025"), a veces un rango ("16 de marzo al 21
// de septiembre de 2023") y a veces varios días del mismo mes ("1 y 9 de
// septiembre de 2021"). Para el atributo `dateTime` de <time> y el
// `datePublished` del JSON-LD alcanza con un ISO 8601 parcial (año, año-mes
// o año-mes-día): se toma el primer día y el primer mes mencionados —el
// inicio del evento cuando es un rango— y el año (siempre presente y sin
// ambigüedad en este dataset).
function parseCicloFechaISO(fecha: string): string {
  const yearMatch = fecha.match(/(\d{4})/);
  const year = yearMatch?.[1];
  if (!year) return fecha;

  const monthMatch = fecha
    .toLowerCase()
    .match(/\b(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\b/);
  const month = monthMatch ? MESES_ES[monthMatch[1]] : undefined;
  if (!month) return year;

  const dayMatch = fecha.match(/^(\d{1,2})/);
  const day = dayMatch ? dayMatch[1].padStart(2, '0') : undefined;
  if (!day) return `${year}-${month}`;

  return `${year}-${month}-${day}`;
}

// Convierte un link corto de YouTube (`youtu.be/ID`) o un link de
// `watch?v=ID` al formato `embed/ID` que requiere el <iframe>. Los
// `video_url` de src/lib/formacion.ts vienen tal cual figuran en la fuente
// (links `youtu.be/...` reales), así que la conversión ocurre solo acá, en
// el punto de render.
function toYoutubeEmbedUrl(url: string): string {
  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  const watchMatch = url.match(/[?&]v=([\w-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  return url;
}

function VideoFrame({ src, title }: { src: string; title: string }) {
  return (
    // bg-azul-950 es superficie de marca fija, igual que en
    // simposios/2026-buenos-aires/page.tsx — solo el borde se tematiza.
    <div className="relative aspect-video overflow-hidden rounded-md border border-[color:var(--ui-border)] bg-azul-950 shadow-[var(--shadow-1)]">
      <iframe
        src={toYoutubeEmbedUrl(src)}
        title={title}
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default async function FormacionCicloDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const ciclo = getCicloBySlug(slug);

  if (!ciclo) {
    notFound();
  }

  const fechaISO = parseCicloFechaISO(ciclo.fecha);
  const cicloUrl = `${getSiteUrl()}/es/formacion/ciclos/${ciclo.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: ciclo.titulo,
    description: ciclo.resumen,
    datePublished: fechaISO,
    author: {
      '@type': 'Organization',
      name: 'Instituto de Victimología de Usina de Justicia',
      url: `${getSiteUrl()}/es/instituto`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Instituto de Victimología de Usina de Justicia',
      url: `${getSiteUrl()}/es/instituto`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': cicloUrl,
    },
    url: cicloUrl,
  };

  // Home > Formación > Ciclos y jornadas > {ciclo}.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${getSiteUrl()}/es` },
      { '@type': 'ListItem', position: 2, name: 'Formación', item: `${getSiteUrl()}/es/formacion` },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Ciclos y jornadas',
        item: `${getSiteUrl()}/es/formacion/ciclos`,
      },
      { '@type': 'ListItem', position: 4, name: ciclo.titulo, item: cicloUrl },
    ],
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={buildJsonLdScript(breadcrumbJsonLd)}
      />
      <div className="mx-auto max-w-[var(--container-default)] space-y-16 px-6 py-16 sm:px-10">
        <header className="max-w-4xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>
            Formación / Ciclos / <time dateTime={fechaISO}>{ciclo.fecha}</time>
          </Eyebrow>
          {/* break-words: algunos títulos de ciclos tienen palabras largas
              en español ("desmantelamiento") que a 360px, con el piso de la
              clamp (30px) en mayúsculas Cinzel, no entran en el ancho de
              columna sin permitir el corte dentro de la palabra — mismo bug
              que describe el comentario del <h1> de la home (Ola 7). */}
          <h1 className="max-w-4xl text-balance break-words text-[length:clamp(30px,4.4vw,48px)]">
            {ciclo.titulo}
          </h1>
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            {ciclo.resumen}
          </p>
          {ciclo.oradores && ciclo.oradores.length > 0 ? (
            <p className="text-sm leading-7 text-[color:var(--ui-ink-3)]">
              <strong className="text-[color:var(--ui-display-ink)]">Participantes:</strong>{' '}
              {ciclo.oradores.join(', ')}
            </p>
          ) : null}
        </header>

        {ciclo.video_url ? (
          <section className="space-y-6">
            <SectionHeader eyebrow="Video" title="Registro audiovisual del ciclo." />
            <VideoFrame src={ciclo.video_url} title={ciclo.titulo} />
          </section>
        ) : null}

        {ciclo.sesiones && ciclo.sesiones.length > 0 ? (
          <section className="space-y-10">
            <SectionHeader eyebrow="Sesiones" title="Charlas grabadas de este ciclo." />
            <div className="grid gap-8 lg:grid-cols-2">
              {ciclo.sesiones.map((sesion, index) => (
                <div key={sesion.video_url ?? index} className="space-y-4">
                  {sesion.oradores && sesion.oradores.length > 0 ? (
                    <p className="text-sm leading-7 text-[color:var(--ui-ink-3)]">
                      <strong className="text-[color:var(--ui-display-ink)]">Expositores:</strong>{' '}
                      {sesion.oradores.join(', ')}
                    </p>
                  ) : null}
                  {sesion.video_url ? (
                    <VideoFrame src={sesion.video_url} title={`${ciclo.titulo} — sesión ${index + 1}`} />
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {ciclo.dossier ? (
          <section className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 shadow-[var(--shadow-1)] sm:p-8">
            <Eyebrow>Dossier</Eyebrow>
            <p className="mt-4 text-base leading-7 text-[color:var(--ui-display-ink)]">
              {ciclo.dossier.titulo}
            </p>
            <ButtonPrincipal href={ciclo.dossier.url} target="_blank" rel="noreferrer" className="mt-5">
              Descargar dossier
            </ButtonPrincipal>
          </section>
        ) : null}

        <div>
          <LinkArrow href={`/${locale}/formacion/ciclos`}>Volver al archivo de ciclos</LinkArrow>
        </div>
      </div>
    </main>
  );
}
