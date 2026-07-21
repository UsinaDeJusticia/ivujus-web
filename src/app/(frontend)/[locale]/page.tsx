import Image from 'next/image';

import { simposio2026 } from '@/lib/simposio2026';
import { Eyebrow, SectionHeader } from '@/components/ui/SectionHeader';
import { ButtonPrincipal, ButtonSecundario, LinkArrow } from '@/components/ui/Buttons';
import { ContentCard } from '@/components/cards/ContentCard';

type Locale = 'es' | 'en' | 'fr';

type GridCard = {
  title: string;
  body: string;
  href: string;
};

type HomeCopy = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    tagline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  event: {
    eyebrow: string;
    labelFechas: string;
    labelSede: string;
    labelOrganiza: string;
    cta: string;
  };
  grid: {
    eyebrow: string;
    title: string;
    lead: string;
    cards: GridCard[];
  };
  newsletter: {
    eyebrow: string;
    title: string;
    lead: string;
    cta: string;
    verNovedades: string;
  };
};

// Endpoint real de alta a la lista de novedades de Usina de Justicia en
// Perfit (docs/ARQUITECTURA.md §2.1 y §4.2). El formulario propio con POST
// al proxy interno (`/api/perfit-subscribe`) llega en Fase 3; por ahora este
// es un link externo directo al alta pública.
const PERFIT_SUBSCRIBE_URL = 'https://optin.myperfit.com/subscribe/usinadejusticia/RUknaImy';

// Los 7 accesos institucionales apuntan únicamente a rutas que ya existen
// (ver docs/CLAUDE.md, "Estado actual de frontend y migracion"). Los cuerpos
// en español son copia verbatim de `institutoData.intro` / `institutoData.
// sections` (src/lib/instituto.ts), de `formacionHubData` (src/lib/
// formacion.ts) y del card "Simposios" que ya traía el diccionario anterior
// de esta página; EN/FR son traducción fiel de esos mismos textos, no
// contenido nuevo. La card "Formación" se había quitado en una ola previa
// porque la ruta todavía no existía; se restaura ahora que
// /formacion está implementada. La card "Novedades" se agrega en la ola
// Novedades, con src/lib/novedades.ts ya implementado.
const copy: Record<Locale, HomeCopy> = {
  es: {
    hero: {
      eyebrow: 'Instituto de Victimología de Usina de Justicia',
      title: 'Un portal académico para formación, investigación y derecho victimal.',
      lead: 'IVUJUS se está construyendo como el nodo digital de una red académica internacional: una plataforma para presentar la institución, ordenar la producción editorial y conectar simposios, formación y agenda pública.',
      tagline: 'Conocimiento que ilumina, formación que transforma.',
      ctaPrimary: 'Explorar el instituto',
      ctaSecondary: 'Conocer el Simposio 2026',
    },
    event: {
      eyebrow: 'Simposio 2026',
      labelFechas: 'Fechas',
      labelSede: 'Sede',
      labelOrganiza: 'Organiza',
      cta: 'Ver simposio 2026',
    },
    grid: {
      eyebrow: 'Institucional',
      title: 'Recorrer el Instituto y sus instancias de gobierno.',
      lead: 'Estatuto, consejo directivo, comité científico y el archivo de simposios en un mismo lugar.',
      cards: [
        {
          title: 'Instituto',
          body: 'El IVUJUS articula investigación, formación, producción editorial y cooperación internacional en torno a la victimología, el derecho victimal y los derechos de las víctimas.',
          href: '/instituto',
        },
        {
          title: 'Formación',
          body: 'Diplomatura en Victimología y leyes de víctimas, y archivo de ciclos, jornadas y capacitaciones del Instituto.',
          href: '/formacion',
        },
        {
          title: 'Consejo directivo',
          body: 'Perfiles, cargos y trazabilidad institucional de la conducción del IVUJUS.',
          href: '/instituto/consejo-directivo',
        },
        {
          title: 'Comité científico',
          body: 'Referentes internacionales y autoridad académica para la legitimidad comparada del instituto.',
          href: '/instituto/comite-cientifico',
        },
        {
          title: 'Estatuto',
          body: 'Base institucional, definiciones fundacionales y objetivos del instituto.',
          href: '/instituto/estatuto',
        },
        {
          title: 'Simposios',
          body: 'Archivo de ediciones, programa, medios, premios y la Declaración de Buenos Aires.',
          href: '/simposios',
        },
        {
          title: 'Novedades',
          body: 'Agenda pública y difusión institucional: noticias, encuentros y reconocimientos del Instituto.',
          href: '/novedades',
        },
      ],
    },
    newsletter: {
      eyebrow: 'Novedades',
      title: 'Recibir las novedades del Instituto',
      lead: 'Suscripción por correo electrónico a la agenda pública y la producción editorial del IVUJUS, a través del sistema de novedades de Usina de Justicia.',
      cta: 'Suscribirse a las novedades',
      verNovedades: 'Ver todas las novedades',
    },
  },
  en: {
    hero: {
      eyebrow: 'Victimology Institute of Usina de Justicia',
      title: 'An academic platform for training, research, and victims rights.',
      lead: 'IVUJUS is being shaped as the digital node of an international academic network: a platform to present the institute, organize editorial production, and connect symposiums, training, and public work.',
      tagline: 'Conocimiento que ilumina, formación que transforma.',
      ctaPrimary: 'Explore the institute',
      ctaSecondary: 'Discover Symposium 2026',
    },
    event: {
      eyebrow: 'Symposium 2026',
      labelFechas: 'Dates',
      labelSede: 'Venue',
      labelOrganiza: 'Organized by',
      cta: 'View Symposium 2026',
    },
    grid: {
      eyebrow: 'Institutional',
      title: 'Explore the Institute and its governing bodies.',
      lead: 'Statute, governing board, scientific committee, and the symposium archive in one place.',
      cards: [
        {
          title: 'Institute',
          body: "IVUJUS brings together research, training, editorial production, and international cooperation around victimology, victims' law, and victims' rights.",
          href: '/instituto',
        },
        {
          title: 'Training',
          body: "Victimology and victims'-law diploma program, plus the archive of the Institute's training cycles, academic days, and workshops.",
          href: '/formacion',
        },
        {
          title: 'Governing board',
          body: "Profiles, roles, and institutional record of the Institute's leadership.",
          href: '/instituto/consejo-directivo',
        },
        {
          title: 'Scientific committee',
          body: "International references and academic authority behind the Institute's comparative standing.",
          href: '/instituto/comite-cientifico',
        },
        {
          title: 'Statute',
          body: 'Institutional foundation, founding definitions, and objectives of the Institute.',
          href: '/instituto/estatuto',
        },
        {
          title: 'Symposiums',
          body: 'Archive of editions, programs, media coverage, awards, and the Buenos Aires Declaration.',
          href: '/simposios',
        },
        {
          title: 'Updates',
          body: "Public agenda and institutional outreach: news, meetings, and recognitions from the Institute.",
          href: '/novedades',
        },
      ],
    },
    newsletter: {
      eyebrow: 'Updates',
      title: 'Receive the Institute updates',
      lead: "Email subscription to the public agenda and editorial output of IVUJUS, through Usina de Justicia's updates system.",
      cta: 'Subscribe to updates',
      verNovedades: 'See all updates',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Institut de victimologie de Usina de Justicia',
      title: 'Une plateforme académique pour la formation, la recherche et les droits des victimes.',
      lead: "IVUJUS se construit comme le nœud numérique d'un réseau académique international : une plateforme pour présenter l'institut, organiser la production éditoriale et relier symposiums, formation et agenda public.",
      tagline: 'Conocimiento que ilumina, formación que transforma.',
      ctaPrimary: "Explorer l'institut",
      ctaSecondary: 'Découvrir le Symposium 2026',
    },
    event: {
      eyebrow: 'Symposium 2026',
      labelFechas: 'Dates',
      labelSede: 'Lieu',
      labelOrganiza: 'Organisé par',
      cta: 'Voir le Symposium 2026',
    },
    grid: {
      eyebrow: 'Institutionnel',
      title: "Parcourir l'Institut et ses instances de gouvernance.",
      lead: "Statuts, conseil directeur, comité scientifique et l'archive des symposiums réunis au même endroit.",
      cards: [
        {
          title: 'Institut',
          body: "L'IVUJUS articule recherche, formation, production éditoriale et coopération internationale autour de la victimologie, du droit victimal et des droits des victimes.",
          href: '/instituto',
        },
        {
          title: 'Formation',
          body: "Diplôme en victimologie et droit des victimes, et archive des cycles, journées et formations de l'Institut.",
          href: '/formacion',
        },
        {
          title: 'Conseil directeur',
          body: "Profils, fonctions et traçabilité institutionnelle de la direction de l'IVUJUS.",
          href: '/instituto/consejo-directivo',
        },
        {
          title: 'Comité scientifique',
          body: "Références internationales et autorité académique pour la légitimité comparée de l'institut.",
          href: '/instituto/comite-cientifico',
        },
        {
          title: 'Statuts',
          body: "Base institutionnelle, définitions fondatrices et objectifs de l'institut.",
          href: '/instituto/estatuto',
        },
        {
          title: 'Symposiums',
          body: 'Archive des éditions, programme, médias, distinctions et Déclaration de Buenos Aires.',
          href: '/simposios',
        },
        {
          title: 'Actualités',
          body: "Agenda public et diffusion institutionnelle : actualités, rencontres et distinctions de l'Institut.",
          href: '/novedades',
        },
      ],
    },
    newsletter: {
      eyebrow: 'Actualités',
      title: "Recevoir les actualités de l'Institut",
      lead: "Abonnement par courrier électronique à l'agenda public et à la production éditoriale de l'IVUJUS, via le système d'actualités de Usina de Justicia.",
      cta: "S'abonner aux actualités",
      verNovedades: 'Voir toutes les actualités',
    },
  },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = copy[(locale as Locale) ?? 'es'] ?? copy.es;

  return (
    <main className="bg-[color:var(--ui-bg-page)]">
      {/* Hero institucional — fondo con gradiente sutilísimo, tematizado por
          Ola 6 vía --ui-hero-gradient (cambia de blanco→azul-50 en claro a
          navy oscuro en oscuro; ver globals.css). */}
      <section className="bg-[image:var(--ui-hero-gradient)]">
        <div className="mx-auto grid max-w-[var(--container-default)] gap-16 px-6 py-24 sm:px-10 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:py-28">
          {/* min-w-0: sin esto, el `inline-flex` (nowrap) de <Eyebrow> con el
              texto largo del subtítulo institucional fuerza el ancho
              intrínseco (max-content) de la columna única del grid en
              mobile, desbordando el viewport — bug detectado en la
              verificación de scroll horizontal de la Ola 7. */}
          <div className="min-w-0 space-y-7">
            <Eyebrow>{content.hero.eyebrow}</Eyebrow>
            {/* break-words: a 360px el piso de la clamp (40px) más una
                palabra larga en español ("investigación,") no entran en el
                ancho de columna (312px) sin permitir el corte dentro de la
                palabra — sin esto el h1 desborda el documento aunque su
                propia caja (getBoundingClientRect) mida bien, porque el
                overflow por defecto es visible. Detectado en la
                verificación de scroll horizontal de la Ola 7. */}
            <h1 className="max-w-3xl text-balance break-words text-[length:clamp(40px,5.2vw,64px)] leading-[1.08]">
              {content.hero.title}
            </h1>
            <p className="max-w-[52ch] text-pretty text-lg leading-[1.7] text-[color:var(--ui-ink-3)]">
              {content.hero.lead}
            </p>
            <p className="max-w-[40ch] border-l-2 border-dorado-600 pl-4 text-sm italic leading-[1.6] text-[color:var(--ui-link)]">
              {content.hero.tagline}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <ButtonPrincipal href={`/${locale}/instituto`}>{content.hero.ctaPrimary}</ButtonPrincipal>
              <ButtonSecundario href={`/${locale}/simposios/2026-buenos-aires`}>
                {content.hero.ctaSecondary}
              </ButtonSecundario>
            </div>
          </div>

          {/* Logo focal con swap por tema (mismo patrón que el Header): en
              claro/sepia el arte a color con mix-blend-mode:multiply (funde
              el fondo blanco opaco del asset contra la superficie clara); en
              oscuro la versión blanca transparente. Ver globals.css. */}
          <div className="flex justify-center">
            <Image
              src="/logos/logo-ivujus-mark.png"
              alt="IVUJUS"
              width={360}
              height={293}
              priority
              className="logo-theme-light h-auto w-full max-w-[300px]"
            />
            <Image
              src="/logos/logo-ivujus-mark-white.png"
              alt="IVUJUS"
              width={360}
              height={293}
              priority
              className="logo-theme-dark h-auto w-full max-w-[300px]"
            />
          </div>
        </div>
      </section>

      {/* Banda del Simposio 2026 — superficie de marca (azul-900 pleno,
          siempre, no cambia con tema), datos reales de src/lib/simposio2026.ts. */}
      <section className="bg-azul-900 text-white">
        <div className="mx-auto grid max-w-[var(--container-default)] gap-16 px-6 py-24 sm:px-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          {/* min-w-0 por la misma razón que en el hero de arriba (ver
              comentario ahí): protege este grid item de que un futuro
              eyebrow largo repita el desborde en mobile. */}
          <div className="min-w-0 space-y-6">
            <Eyebrow invert>{content.event.eyebrow}</Eyebrow>
            <h2 className="max-w-2xl text-balance text-[length:clamp(30px,4vw,46px)] leading-[1.15] text-white">
              {simposio2026.title}
            </h2>
            <p className="max-w-[54ch] text-lg leading-[1.6] text-azul-200">{simposio2026.subtitle}</p>
            <p className="max-w-[54ch] text-pretty text-base leading-[1.7] text-azul-200">
              {simposio2026.summary}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <ButtonSecundario href={`/${locale}/simposios/2026-buenos-aires`}>
                {content.event.cta}
              </ButtonSecundario>
            </div>
          </div>

          <dl className="space-y-6 rounded-md border border-dorado-600/30 bg-white/[0.04] p-8">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-dorado-400">
                {content.event.labelFechas}
              </dt>
              <dd className="mt-1 text-sm leading-[1.5] text-white">{simposio2026.dates}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-dorado-400">
                {content.event.labelSede}
              </dt>
              <dd className="mt-1 text-sm leading-[1.5] text-white">{simposio2026.location}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-dorado-400">
                {content.event.labelOrganiza}
              </dt>
              <dd className="mt-1 text-sm leading-[1.5] text-white">
                {simposio2026.organizingInstitution}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Grilla de acceso institucional — solo rutas navegables hoy. */}
      <section className="mx-auto max-w-[var(--container-default)] px-6 py-24 sm:px-10">
        <SectionHeader
          eyebrow={content.grid.eyebrow}
          title={content.grid.title}
          lead={content.grid.lead}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {content.grid.cards.map((card) => (
            <ContentCard
              key={card.href}
              href={`/${locale}${card.href}`}
              title={card.title}
              description={card.body}
            />
          ))}
        </div>
      </section>

      {/* Franja newsletter — suscripción real vía Perfit. El form propio con
          POST al proxy interno llega en Fase 3; por ahora, CTA como link
          externo directo al alta pública (ver constante PERFIT_SUBSCRIBE_URL). */}
      <section className="bg-[color:var(--ui-bg-muted)] py-24">
        <div className="mx-auto flex max-w-[var(--container-narrow)] flex-col items-center gap-6 px-6 text-center sm:px-10">
          <Eyebrow>{content.newsletter.eyebrow}</Eyebrow>
          <h2 className="max-w-[20ch] text-balance text-[length:clamp(28px,3.4vw,38px)]">
            {content.newsletter.title}
          </h2>
          <p className="max-w-[54ch] text-pretty text-[15px] leading-[1.7] text-[color:var(--ui-ink-3)]">
            {content.newsletter.lead}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <ButtonPrincipal href={PERFIT_SUBSCRIBE_URL} target="_blank" rel="noreferrer noopener">
              {content.newsletter.cta}
            </ButtonPrincipal>
            {/* Acceso directo al archivo propio de novedades del sitio,
                distinto del alta de mail vía Perfit de arriba: ver
                src/lib/novedades.ts. */}
            <LinkArrow href={`/${locale}/novedades`}>{content.newsletter.verNovedades}</LinkArrow>
          </div>
        </div>
      </section>
    </main>
  );
}
