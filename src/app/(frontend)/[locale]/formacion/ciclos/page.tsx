import type { Metadata } from 'next';

import { getCiclos } from '@/lib/formacion';
import { type Locale, pickLocale, resolveLocale } from '@/lib/i18n';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow } from '@/components/ui/SectionHeader';
import { ContentCard } from '@/components/cards/ContentCard';

// Copys de interfaz por idioma. Los ciclos en sí (título, resumen, fecha)
// vienen ya traducidos de getCiclos(locale).
const LABELS: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    heading: string;
    lead: string;
    video: string;
    dossier: string;
    breadcrumbHome: string;
    breadcrumbFormacion: string;
  }
> = {
  es: {
    metaTitle: 'Ciclos y jornadas',
    metaDescription:
      'Archivo de ciclos de debate, jornadas y capacitaciones del Instituto de Victimología de Usina de Justicia, con videos y dossiers.',
    eyebrow: 'Formación / Ciclos y jornadas',
    heading: 'Archivo de ciclos de debate, jornadas y capacitaciones.',
    lead: 'Diez años de actividad institucional del Instituto y de Usina de Justicia: convenios universitarios, jornadas con organismos públicos y ciclos de debate propios, con video y dossier cuando están disponibles.',
    video: 'Video',
    dossier: 'Dossier',
    breadcrumbHome: 'Inicio',
    breadcrumbFormacion: 'Formación',
  },
  en: {
    metaTitle: 'Debate series and conference days',
    metaDescription:
      'Archive of debate series, conference days and training activities of the Institute of Victimology of Usina de Justicia, with videos and dossiers.',
    eyebrow: 'Training / Debate series and conference days',
    heading: 'Archive of debate series, conference days and training activities.',
    lead: 'Ten years of institutional activity by the Institute and Usina de Justicia: university agreements, conference days with public bodies and our own debate series, with video and dossier where available.',
    video: 'Video',
    dossier: 'Dossier',
    breadcrumbHome: 'Home',
    breadcrumbFormacion: 'Training',
  },
  fr: {
    metaTitle: 'Cycles de débats et journées',
    metaDescription:
      "Archive des cycles de débats, journées et formations de l'Institut de Victimologie d'Usina de Justicia, avec vidéos et dossiers.",
    eyebrow: 'Formation / Cycles de débats et journées',
    heading: 'Archive des cycles de débats, journées et formations.',
    lead: "Dix ans d'activité institutionnelle de l'Institut et d'Usina de Justicia : conventions universitaires, journées avec des organismes publics et cycles de débats propres, avec vidéo et dossier lorsqu'ils sont disponibles.",
    video: 'Vidéo',
    dossier: 'Dossier',
    breadcrumbHome: 'Accueil',
    breadcrumbFormacion: 'Formation',
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
    path: '/formacion/ciclos',
    title: labels.metaTitle,
    description: labels.metaDescription,
  });
}

export default async function FormacionCiclosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = resolveLocale(locale);
  const labels = pickLocale(LABELS, locale);
  const ciclosData = getCiclos(locale);

  // Home > Formación > Ciclos y jornadas.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: labels.breadcrumbHome,
        item: `${getSiteUrl()}/${resolvedLocale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: labels.breadcrumbFormacion,
        item: `${getSiteUrl()}/${resolvedLocale}/formacion`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: labels.metaTitle,
        item: `${getSiteUrl()}/${resolvedLocale}/formacion/ciclos`,
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
            dejaba la página sin ningún <h1>. Se reemplaza por el mismo patrón
            de cabecera que ya usan formacion/page.tsx y
            formacion/diplomatura/page.tsx (Eyebrow + h1 + lead), mismo texto,
            para tener jerarquía de encabezados correcta. */}
        <header className="max-w-4xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>{labels.eyebrow}</Eyebrow>
          <h1 className="max-w-4xl text-balance text-[length:clamp(34px,5vw,60px)]">
            {labels.heading}
          </h1>
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            {labels.lead}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ciclosData.map((ciclo) => (
            <ContentCard
              key={ciclo.slug}
              href={`/${locale}/formacion/ciclos/${ciclo.slug}`}
              eyebrow={ciclo.fecha}
              title={ciclo.titulo}
              description={ciclo.resumen}
              meta={
                ciclo.dossier || ciclo.video_url || ciclo.sesiones ? (
                  <span>
                    {[
                      ciclo.video_url || ciclo.sesiones ? labels.video : null,
                      ciclo.dossier ? labels.dossier : null,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                ) : undefined
              }
            />
          ))}
        </div>
      </div>
    </main>
  );
}
