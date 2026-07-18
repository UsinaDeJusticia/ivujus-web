import type { Metadata } from 'next';

import { simposio2026 } from '@/lib/simposio2026';
import { buildLocalizedMetadata } from '@/lib/seo';
import { Eyebrow, SectionHeader } from '@/components/ui/SectionHeader';

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
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-[var(--container-default)] space-y-14 px-6 py-16 sm:px-10">
        <SectionHeader
          eyebrow="Simposios"
          title="Archivo de encuentros, declaraciones y producción derivada."
          lead="El Simposio 2026 es hoy la pieza más desarrollada del archivo público del IVUJUS y funciona como punto de partida para la arquitectura internacional del sitio."
        />

        <a
          className="group relative grid gap-8 overflow-hidden rounded-md border border-gris-200 bg-white p-8 shadow-[var(--shadow-1)] transition-shadow duration-[var(--motion-base)] ease-[var(--easing-standard)] hover:shadow-[var(--shadow-3)] lg:grid-cols-[minmax(0,1fr)_18rem]"
          href="./simposios/2026-buenos-aires"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-dorado-600 transition-transform duration-200 ease-[var(--easing-out)] group-hover:scale-x-100"
          />

          <div>
            <Eyebrow>{simposio2026.dates}</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-balance text-[length:clamp(26px,3.2vw,36px)] transition-colors duration-[var(--motion-fast)] group-hover:text-azul-700">
              {simposio2026.title}
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-gris-700">
              {simposio2026.subtitle}. Declaración de Buenos Aires, programa por jornadas, videos y cobertura
              en medios nacionales.
            </p>
          </div>

          <div className="space-y-3 border-t border-gris-200 pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            {simposio2026.highlights.map((item) => (
              <div
                key={item}
                className="border-b border-gris-200 pb-3 text-sm leading-6 text-azul-900 last:border-b-0"
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
