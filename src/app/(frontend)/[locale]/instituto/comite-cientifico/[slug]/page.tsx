import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';

import { institutoData, type InstitutePerson } from '@/lib/instituto';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow } from '@/components/ui/SectionHeader';
import { LinkArrow } from '@/components/ui/Buttons';

// Copys de interfaz por locale. El contenido de la persona en sí
// (nombre, rol, país, bio) viene de src/lib/instituto.ts y queda en
// español, igual que el resto del contenido migrado (ver docs/CLAUDE.md,
// "Fase 3: traducción automática" — este dataset no pasa por ese
// pipeline). Solo estas etiquetas de UI varían por idioma, mismo patrón
// que MOBILE_MENU_LABELS en components/layout/Header.tsx.
const LABELS: Record<
  string,
  { eyebrow: string; back: string; portraitAlt: (name: string) => string }
> = {
  es: {
    eyebrow: 'Instituto / Comité científico',
    back: 'Volver al comité científico',
    portraitAlt: (name) => `Retrato de ${name}`,
  },
  en: {
    eyebrow: 'Institute / Scientific committee',
    back: 'Back to the scientific committee',
    portraitAlt: (name) => `Portrait of ${name}`,
  },
  fr: {
    eyebrow: 'Institut / Comité scientifique',
    back: 'Retour au comité scientifique',
    portraitAlt: (name) => `Portrait de ${name}`,
  },
};

function getLabels(locale: string) {
  return LABELS[locale] ?? LABELS.es;
}

function getPersonBySlug(slug: string): InstitutePerson | undefined {
  return institutoData.comiteCientifico.find((person) => person.slug === slug);
}

export function generateStaticParams() {
  return institutoData.comiteCientifico.map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const person = getPersonBySlug(slug);

  if (!person) {
    return buildLocalizedMetadata({
      locale,
      path: `/instituto/comite-cientifico/${slug}`,
      title: 'Perfil no encontrado',
      description: 'El perfil solicitado no existe.',
    });
  }

  return buildLocalizedMetadata({
    locale,
    path: `/instituto/comite-cientifico/${person.slug}`,
    title: person.name,
    description: person.summary.slice(0, 155),
  });
}

export default async function ComiteCientificoPersonPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const person = getPersonBySlug(slug);

  if (!person) {
    notFound();
  }

  const labels = getLabels(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    nationality: person.country,
    description: person.summary,
    image: person.image,
    url: `${getSiteUrl()}/${locale}/instituto/comite-cientifico/${person.slug}`,
    affiliation: {
      '@type': 'NGO',
      name: institutoData.title,
      url: `${getSiteUrl()}/${locale}/instituto`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${getSiteUrl()}/${locale}` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Instituto',
        item: `${getSiteUrl()}/${locale}/instituto`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Comité científico',
        item: `${getSiteUrl()}/${locale}/instituto/comite-cientifico`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: person.name,
        item: `${getSiteUrl()}/${locale}/instituto/comite-cientifico/${person.slug}`,
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
        <header className="space-y-8 border-b border-[color:var(--ui-border)] pb-10">
          <Eyebrow>{labels.eyebrow}</Eyebrow>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
            <div className="relative aspect-square h-32 w-32 shrink-0 overflow-hidden rounded-full border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-muted)] shadow-[var(--shadow-1)] sm:h-40 sm:w-40">
              <Image
                src={person.image}
                alt={labels.portraitAlt(person.name)}
                fill
                sizes="(min-width: 640px) 160px, 128px"
                quality={75}
                priority
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <h1 className="max-w-2xl text-balance break-words text-[length:clamp(30px,4.4vw,48px)]">
                {person.name}
              </h1>
              <p className="text-sm font-semibold text-[color:var(--ui-accent-ink)]">{person.role}</p>
              {/* País solo si aporta info nueva: en el Comité Científico `role`
                  suele ser el país, así que mostrarlo de nuevo daría "Canadá /
                  CANADÁ". Se omite cuando coincide con el rol. */}
              {person.country && person.country !== person.role ? (
                <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--ui-ink-4)]">
                  {person.country}
                </p>
              ) : null}
            </div>
          </div>
        </header>

        <div className="space-y-5">
          <p className="text-pretty text-base leading-[1.8] text-[color:var(--ui-ink-3)]">{person.bio}</p>
        </div>

        <div>
          <LinkArrow href={`/${locale}/instituto/comite-cientifico`}>{labels.back}</LinkArrow>
        </div>
      </div>
    </main>
  );
}
