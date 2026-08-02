import type { Metadata } from 'next';

import { getSimposio2026 } from '@/lib/simposio2026';
import { getEncuentrosLabels } from '@/lib/encuentros';
import { resolveLocale, type Locale } from '@/lib/i18n';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow } from '@/components/ui/SectionHeader';
import { ContentCard } from '@/components/cards/ContentCard';

// Copys de interfaz por locale. El contenido de fondo del Simposio 2026
// (title/subtitle/dates/highlights) viene de getSimposio2026(locale)
// (@/lib/simposio2026), ya trilingüe. Mismo patrón LABELS que
// instituto/comite-cientifico/[slug]/page.tsx. Nota: en el menú "Eventos
// académicos" se abrevia a "Eventos", pero el nombre completo de sección se
// usa acá (docs/GLOSARIO-TRADUCCION.md §4).
const LABELS: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    heading: string;
    intro: string;
    cardIntroSuffix: string;
    breadcrumbHome: string;
  }
> = {
  es: {
    metaTitle: 'Eventos académicos',
    metaDescription:
      'Congresos, simposios y jornadas formativas que organiza y avala el Instituto de Victimología de Usina de Justicia.',
    eyebrow: 'Eventos académicos',
    heading: 'Espacios de conocimiento e innovación.',
    intro:
      'IVUJUS promueve el desarrollo académico y científico mediante la organización y el aval de encuentros de alto nivel nacional e internacional. A través de sus congresos, simposios y jornadas formativas, la institución consolida plataformas estratégicas para la divulgación de investigaciones de vanguardia y el intercambio de experiencias entre expertos.',
    cardIntroSuffix: 'Declaración de Buenos Aires, programa por jornadas, videos y cobertura en medios nacionales.',
    breadcrumbHome: 'Inicio',
  },
  en: {
    metaTitle: 'Academic Events',
    metaDescription:
      'Congresses, symposia and training conference days organised and endorsed by the Institute of Victimology of Usina de Justicia.',
    eyebrow: 'Academic Events',
    heading: 'Spaces for knowledge and innovation.',
    intro:
      'IVUJUS promotes academic and scientific development by organising and endorsing high-level national and international gatherings. Through its congresses, symposia and training conference days, the institution consolidates strategic platforms for disseminating cutting-edge research and exchanging experience among experts.',
    cardIntroSuffix: 'Buenos Aires Declaration, day-by-day programme, videos and coverage in national media.',
    breadcrumbHome: 'Home',
  },
  fr: {
    metaTitle: 'Événements académiques',
    metaDescription:
      "Congrès, symposiums et journées de formation organisés et parrainés par l'Institut de Victimologie d'Usina de Justicia.",
    eyebrow: 'Événements académiques',
    heading: 'Espaces de connaissance et d’innovation.',
    intro:
      "IVUJUS favorise le développement académique et scientifique en organisant et en parrainant des rencontres de haut niveau national et international. À travers ses congrès, symposiums et journées de formation, l'institution consolide des plateformes stratégiques pour la diffusion de recherches de pointe et l'échange d'expériences entre experts.",
    cardIntroSuffix: 'Déclaration de Buenos Aires, programme par journées, vidéos et couverture dans les médias nationaux.',
    breadcrumbHome: 'Accueil',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const labels = LABELS[resolveLocale(locale)];

  return buildLocalizedMetadata({
    locale,
    path: '/simposios',
    title: labels.metaTitle,
    description: labels.metaDescription,
  });
}

export default async function SymposiumIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = resolveLocale(locale);
  const labels = LABELS[resolvedLocale];
  const simposio2026 = getSimposio2026(locale);
  const encuentrosLabels = getEncuentrosLabels(locale);

  // Home > Eventos académicos. La ruta sigue siendo /simposios: solo cambian
  // las etiquetas visibles, para no romper URLs indexadas ni pedir redirects.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: labels.breadcrumbHome, item: `${getSiteUrl()}/${resolvedLocale}` },
      {
        '@type': 'ListItem',
        position: 2,
        name: labels.eyebrow,
        item: `${getSiteUrl()}/${resolvedLocale}/simposios`,
      },
    ],
    inLanguage: resolvedLocale,
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
          <Eyebrow>{labels.eyebrow}</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[length:clamp(34px,5vw,60px)]">
            {labels.heading}
          </h1>
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            {labels.intro}
          </p>
        </header>

        <a
          className="group relative grid gap-8 overflow-hidden rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-8 shadow-[var(--shadow-1)] transition-shadow duration-[var(--motion-base)] ease-[var(--easing-standard)] hover:shadow-[var(--shadow-3)] lg:grid-cols-[minmax(0,1fr)_18rem]"
          href={`/${locale}/simposios/2026-buenos-aires`}
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
              {simposio2026.subtitle}. {labels.cardIntroSuffix}
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

        <ContentCard
          href={`/${locale}/simposios/encuentros`}
          eyebrow={encuentrosLabels.encuentros}
          title={encuentrosLabels.heading}
          description={encuentrosLabels.lead}
        />
      </div>
    </main>
  );
}
