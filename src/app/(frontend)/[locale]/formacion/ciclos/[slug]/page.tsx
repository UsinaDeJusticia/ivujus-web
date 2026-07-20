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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: ciclo.titulo,
    description: ciclo.resumen,
    organizer: {
      '@type': 'NGO',
      name: 'Instituto de Victimología de Usina de Justicia',
      url: `${getSiteUrl()}/es/instituto`,
    },
    url: `${getSiteUrl()}/es/formacion/ciclos/${ciclo.slug}`,
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={buildJsonLdScript(jsonLd)} />
      <div className="mx-auto max-w-[var(--container-default)] space-y-16 px-6 py-16 sm:px-10">
        <header className="max-w-4xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>{`Formación / Ciclos / ${ciclo.fecha}`}</Eyebrow>
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
