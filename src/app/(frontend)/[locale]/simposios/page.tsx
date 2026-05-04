import type { Metadata } from 'next';

import { simposio2026 } from '@/lib/simposio2026';
import { buildLocalizedMetadata } from '@/lib/seo';

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
    <main className="min-h-screen bg-[var(--color-usina-paper)] px-6 py-16 text-[var(--color-usina-ink)] sm:px-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
            Simposios
          </p>
          <h1
            className="text-4xl leading-tight text-[var(--color-usina-navy)] sm:text-5xl"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Archivo de encuentros, declaraciones y produccion derivada.
          </h1>
          <p className="text-lg leading-8 text-[color:color-mix(in_srgb,var(--color-usina-ink)_80%,white)]">
            El Simposio 2026 es hoy la pieza mas desarrollada del archivo publico del IVUJUS y
            funciona como punto de partida para la arquitectura internacional del sitio.
          </p>
        </header>

        <section className="grid gap-8 border border-[var(--color-usina-line)] bg-white/70 p-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <a
            className="block transition hover:text-[var(--color-usina-accent)]"
            href="./simposios/2026-buenos-aires"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
              {simposio2026.dates}
            </p>
            <h2
              className="mt-4 text-3xl leading-tight text-[var(--color-usina-navy)]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {simposio2026.title}
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[color:color-mix(in_srgb,var(--color-usina-ink)_78%,white)]">
              {simposio2026.subtitle}. Declaracion de Buenos Aires, programa por jornadas,
              videos y cobertura en medios nacionales.
            </p>
          </a>

          <div className="space-y-3 border-l border-[var(--color-usina-line)] pl-0 lg:pl-6">
            {simposio2026.highlights.map((item) => (
              <div key={item} className="border-b border-[var(--color-usina-line)] pb-3 text-sm leading-6 text-[var(--color-usina-navy)] last:border-b-0">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
