import type { Metadata } from 'next';

import { getDiplomatura } from '@/lib/formacion';
import { resolveLocale, type Locale } from '@/lib/i18n';
import { buildJsonLdScript, buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { Eyebrow, SectionHeader } from '@/components/ui/SectionHeader';
import { ButtonPrincipal, ButtonSecundario } from '@/components/ui/Buttons';

// Copys de interfaz por locale. El contenido de fondo (título, descripción,
// reseñas) viene de getDiplomatura(locale) (@/lib/formacion), ya trilingüe.
// El nombre de la institución sigue la forma fijada en
// docs/GLOSARIO-TRADUCCION.md §3.
const LABELS: Record<
  Locale,
  {
    metaDescription: string;
    institutionName: string;
    eyebrow: string;
    historicNamePrefix: (name: string) => string;
    accessCampus: string;
    downloadProgram: string;
    enrolled: string;
    certificates: string;
    rating: string;
    testimonialsEyebrow: string;
    testimonialsTitle: string;
    testimonialsLead: string;
    cyclesEyebrow: string;
    cyclesText: string;
    cyclesCta: string;
    breadcrumbHome: string;
    breadcrumbFormacion: string;
  }
> = {
  es: {
    metaDescription:
      'Diplomatura en Victimología y leyes de víctimas del IVUJUS: descripción, programa descargable y acceso al Campus Virtual.',
    institutionName: 'Instituto de Victimología de Usina de Justicia',
    eyebrow: 'Formación / Diplomatura',
    historicNamePrefix: (name) => `También ofrecida bajo el nombre «${name}».`,
    accessCampus: 'Acceder al Campus',
    downloadProgram: 'Descargar programa',
    enrolled: 'Inscriptos',
    certificates: 'Certificados',
    rating: 'Valoración',
    testimonialsEyebrow: 'Testimonios',
    testimonialsTitle: 'Reseñas reales de cursantes de la Diplomatura.',
    testimonialsLead: 'Testimonios anónimos publicados en la página oficial del Campus Virtual.',
    cyclesEyebrow: 'Ciclos y jornadas',
    cyclesText:
      'El Instituto también organiza ciclos de debate, jornadas y capacitaciones puntuales, con archivo de videos y dossiers descargables.',
    cyclesCta: 'Ver ciclos y jornadas',
    breadcrumbHome: 'Inicio',
    breadcrumbFormacion: 'Formación',
  },
  en: {
    metaDescription:
      "IVUJUS's Diploma Programme in Victimology and Victims' Rights Legislation: description, downloadable programme and access to the Virtual Campus.",
    institutionName: 'Institute of Victimology of Usina de Justicia',
    eyebrow: 'Training / Diploma Programme',
    historicNamePrefix: (name) => `Also offered under the name “${name}”.`,
    accessCampus: 'Access the Campus',
    downloadProgram: 'Download programme',
    enrolled: 'Enrolled',
    certificates: 'Certificates',
    rating: 'Rating',
    testimonialsEyebrow: 'Testimonials',
    testimonialsTitle: 'Real reviews from Diploma Programme participants.',
    testimonialsLead: 'Anonymous testimonials published on the official Virtual Campus page.',
    cyclesEyebrow: 'Debate series and conference days',
    cyclesText:
      'The Institute also organises debate series, conference days and one-off training sessions, with an archive of videos and downloadable dossiers.',
    cyclesCta: 'View debate series and conference days',
    breadcrumbHome: 'Home',
    breadcrumbFormacion: 'Training',
  },
  fr: {
    metaDescription:
      "Diplôme en victimologie et droit des victimes de l'IVUJUS : description, programme téléchargeable et accès au Campus virtuel.",
    institutionName: "Institut de Victimologie d'Usina de Justicia",
    eyebrow: 'Formation / Diplôme',
    historicNamePrefix: (name) => `Également proposée sous le nom « ${name} ».`,
    accessCampus: 'Accéder au Campus',
    downloadProgram: 'Télécharger le programme',
    enrolled: 'Inscrits',
    certificates: 'Certificats',
    rating: 'Évaluation',
    testimonialsEyebrow: 'Témoignages',
    testimonialsTitle: 'Avis réels de participants au Diplôme.',
    testimonialsLead: 'Témoignages anonymes publiés sur la page officielle du Campus virtuel.',
    cyclesEyebrow: 'Cycles de débats et journées',
    cyclesText:
      "L'Institut organise également des cycles de débats, des journées et des formations ponctuelles, avec une archive de vidéos et de dossiers téléchargeables.",
    cyclesCta: 'Voir les cycles de débats et journées',
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
  const diplomaturaData = getDiplomatura(locale);
  const labels = LABELS[resolveLocale(locale)];

  return buildLocalizedMetadata({
    locale,
    path: '/formacion/diplomatura',
    title: diplomaturaData.titulo,
    description: labels.metaDescription,
  });
}

export default async function FormacionDiplomaturaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = resolveLocale(locale);
  const labels = LABELS[resolvedLocale];
  const diplomaturaData = getDiplomatura(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: diplomaturaData.titulo,
    description: diplomaturaData.descripcion,
    provider: {
      '@type': 'NGO',
      name: labels.institutionName,
      sameAs: `${getSiteUrl()}/${resolvedLocale}/instituto`,
    },
    url: `${getSiteUrl()}/${resolvedLocale}/formacion/diplomatura`,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      url: diplomaturaData.campusUrl,
    },
    inLanguage: resolvedLocale,
  };

  // Home > Formación > Diplomatura.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: labels.breadcrumbHome, item: `${getSiteUrl()}/${resolvedLocale}` },
      {
        '@type': 'ListItem',
        position: 2,
        name: labels.breadcrumbFormacion,
        item: `${getSiteUrl()}/${resolvedLocale}/formacion`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: diplomaturaData.titulo,
        item: `${getSiteUrl()}/${resolvedLocale}/formacion/diplomatura`,
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
      <div className="mx-auto max-w-[var(--container-default)] space-y-20 px-6 py-16 sm:px-10">
        <header className="max-w-4xl space-y-5 border-b border-[color:var(--ui-border)] pb-14">
          <Eyebrow>{labels.eyebrow}</Eyebrow>
          {/* break-words: mismo cuidado que el <h1> de /formacion/ciclos/[slug]
              (Ola 7 / bug de la home) — palabras largas en español al piso
              de la clamp a 360px. */}
          <h1 className="max-w-4xl text-balance break-words text-[length:clamp(32px,4.6vw,52px)]">
            {diplomaturaData.titulo}
          </h1>
          {diplomaturaData.nombreHistorico ? (
            <p className="text-sm italic leading-6 text-[color:var(--ui-ink-4)]">
              {labels.historicNamePrefix(diplomaturaData.nombreHistorico)}
            </p>
          ) : null}
          <p className="max-w-3xl text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
            {diplomaturaData.descripcion}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <ButtonSecundario href={diplomaturaData.campusUrl} target="_blank" rel="noreferrer">
              {labels.accessCampus}
            </ButtonSecundario>
            <ButtonPrincipal href={diplomaturaData.programaPdfUrl} target="_blank" rel="noreferrer">
              {labels.downloadProgram}
            </ButtonPrincipal>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-muted)] px-6 py-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ui-accent-ink)]">
              {labels.enrolled}
            </p>
            <p className="mt-2 text-[length:clamp(28px,3.4vw,38px)] text-[color:var(--ui-display-ink)]">
              {diplomaturaData.metricas.inscriptos}
            </p>
          </div>
          <div className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-muted)] px-6 py-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ui-accent-ink)]">
              {labels.certificates}
            </p>
            <p className="mt-2 text-[length:clamp(28px,3.4vw,38px)] text-[color:var(--ui-display-ink)]">
              {diplomaturaData.metricas.certificados}
            </p>
          </div>
          <div className="rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-muted)] px-6 py-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ui-accent-ink)]">
              {labels.rating}
            </p>
            <p className="mt-2 text-[length:clamp(28px,3.4vw,38px)] text-[color:var(--ui-display-ink)]">
              {diplomaturaData.metricas.valoracion}
            </p>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow={labels.testimonialsEyebrow}
            title={labels.testimonialsTitle}
            lead={labels.testimonialsLead}
          />

          <div className="grid gap-6 md:grid-cols-2">
            {diplomaturaData.resenas.map((resena) => (
              <blockquote
                key={resena}
                className="m-0 rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-6 text-sm leading-7 text-[color:var(--ui-ink-3)] shadow-[var(--shadow-1)]"
              >
                “{resena}”
              </blockquote>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-white/10 bg-azul-900 p-8 text-white shadow-[var(--shadow-2)] sm:p-10">
          <Eyebrow invert>{labels.cyclesEyebrow}</Eyebrow>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-azul-200">
            {labels.cyclesText}
          </p>
          <ButtonSecundario href={`/${locale}/formacion/ciclos`} className="mt-6">
            {labels.cyclesCta}
          </ButtonSecundario>
        </section>
      </div>
    </main>
  );
}
