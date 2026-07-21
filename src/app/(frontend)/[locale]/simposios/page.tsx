import type { Metadata } from 'next';

import { simposio2026 } from '@/lib/simposio2026';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow } from '@/components/ui/SectionHeader';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildLocalizedMetadata({
    locale,
    path: '/simposios',
    title: 'Simposios',
    description:
      'Archivo de encuentros, declaraciones y producción derivada del Instituto de Victimología de Usina de Justicia.',
  });
}

export default function SymposiumIndexPage() {
  // Home > Simposios.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${getSiteUrl()}/es` },
      { '@type': 'ListItem', position: 2, name: 'Simposios', item: `${getSiteUrl()}/es/simposios` },
    ],
  };

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={buildJsonLdScript(breadcrumbJsonLd)}
      />
      <div className="mx-auto max-w-[var(--container-default)] space-y-14 px-6 py-16 sm:px-10">
        {/* Antes esta cabecera se renderizaba con <SectionHeader> (h2), que
            dejaba la página sin ningún <h1> (el <h2> de la card de abajo
            quedaba como único encabezado). Mismo patrón de cabecera que
            formacion/page.tsx y formacion/ciclos/page.tsx, mismo texto. */}
        <header className="max-w-4xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>Simposios</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[length:clamp(34px,5vw,60px)]">
            Archivo de encuentros, declaraciones y producción derivada.
          </h1>
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            El Simposio 2026 es hoy la pieza más desarrollada del archivo público del IVUJUS y funciona
            como punto de partida para la arquitectura internacional del sitio.
          </p>
        </header>

        <a
          className="group relative grid gap-8 overflow-hidden rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-8 shadow-[var(--shadow-1)] transition-shadow duration-[var(--motion-base)] ease-[var(--easing-standard)] hover:shadow-[var(--shadow-3)] lg:grid-cols-[minmax(0,1fr)_18rem]"
          href="./simposios/2026-buenos-aires"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-dorado-600 transition-transform duration-200 ease-[var(--easing-out)] group-hover:scale-x-100"
          />

          <div>
            <Eyebrow>{simposio2026.dates}</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-balance text-[length:clamp(26px,3.2vw,36px)] transition-colors duration-[var(--motion-fast)] group-hover:text-[color:var(--ui-link)]">
              {simposio2026.title}
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[color:var(--ui-ink-3)]">
              {simposio2026.subtitle}. Declaración de Buenos Aires, programa por jornadas, videos y cobertura
              en medios nacionales.
            </p>
          </div>

          <div className="space-y-3 border-t border-[color:var(--ui-border)] pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            {simposio2026.highlights.map((item) => (
              <div
                key={item}
                className="border-b border-[color:var(--ui-border)] pb-3 text-sm leading-6 text-[color:var(--ui-display-ink)] last:border-b-0"
              >
                {item}
              </div>
            ))}
          </div>
        </a>
      </div>
    </main>
  );
}
