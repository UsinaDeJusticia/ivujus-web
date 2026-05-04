type Locale = 'es' | 'en' | 'fr';

type HomeCard = {
  title: string;
  body: string;
  href: string;
};

type HomeCopy = {
  localeLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  quickLinks: Array<{ label: string; href: string }>;
  pillarsLabel: string;
  pillars: Array<{ title: string; body: string }>;
  mapLabel: string;
  mapTitle: string;
  mapIntro: string;
  cards: HomeCard[];
  featuredLabel: string;
  featuredTitle: string;
  featuredBody: string;
  featuredItems: string[];
  accessTitle: string;
  accessBody: string;
  accessLinks: Array<{ label: string; href: string }>;
  adminLabel: string;
};

const copy: Record<Locale, HomeCopy> = {
  es: {
    localeLabel: 'Espanol',
    eyebrow: 'Instituto de Victimologia de Usina de Justicia',
    title: 'Un portal academico para formacion, investigacion y derecho victimal.',
    intro:
      'IVUJUS se esta construyendo como el nodo digital de una red academica internacional: una plataforma para presentar la institucion, ordenar la produccion editorial y conectar simposios, formacion y agenda publica.',
    primaryCta: 'Explorar el instituto',
    secondaryCta: 'Ingresar al campus',
    quickLinks: [
      { label: 'Instituto', href: '/instituto' },
      { label: 'Formacion', href: '/formacion' },
      { label: 'Publicaciones', href: '/publicaciones' },
      { label: 'Simposios', href: '/simposios' },
    ],
    pillarsLabel: 'Finalidades',
    pillars: [
      {
        title: 'Estudios e investigacion',
        body: 'Impulsar la victimologia, el derecho victimal, la criminalidad y la prevencion del delito desde una base academica legible y publica.',
      },
      {
        title: 'Capacitacion y cursos',
        body: 'Articular diplomaturas, ciclos y convenios sin mezclar el campus con el sitio institucional.',
      },
      {
        title: 'Eventos y publicaciones',
        body: 'Sostener congresos, debates, libros, dossiers y declaraciones con un tratamiento editorial consistente.',
      },
    ],
    mapLabel: 'Mapa del sitio',
    mapTitle: 'Las secciones necesarias ya estan claras.',
    mapIntro:
      'El brief, el sitio actual y el trabajo del repo convergen en una arquitectura publica precisa. La home debe anticipar ese recorrido y hacerlo entendible desde el primer scroll.',
    cards: [
      {
        title: 'Instituto',
        body: 'Estatuto, consejo directivo, comite cientifico y la presentacion institucional del IVUJUS.',
        href: '/instituto',
      },
      {
        title: 'Red',
        body: 'La futura Red Americano-Europea y su estructura flexible para instituciones, reglamento y adhesion.',
        href: '/red',
      },
      {
        title: 'Simposios',
        body: 'Archivo de ediciones, programa, medios, premios y la Declaracion de Buenos Aires.',
        href: '/simposios',
      },
      {
        title: 'Formacion',
        body: 'Diplomatura, ciclos Usina Debate, convenios y actividades de capacitacion.',
        href: '/formacion',
      },
      {
        title: 'Publicaciones',
        body: 'Articulos, libros, dossiers, declaraciones y glosario especializado.',
        href: '/publicaciones',
      },
      {
        title: 'Indice legislativo',
        body: 'Analisis de normas y metodologia del primer indice argentino enfocado en victimas.',
        href: '/indice-legislativo',
      },
    ],
    featuredLabel: 'Simposio 2026',
    featuredTitle: 'Buenos Aires como punto de encuentro para la victimologia penal.',
    featuredBody:
      'El Primer Simposio Americano y Europeo de Victimologia Penal no es una nota lateral: organiza parte del relato publico del sitio y conecta produccion academica, agenda institucional y proyeccion internacional.',
    featuredItems: [
      'Declaracion de Buenos Aires',
      'Programa y archivo de jornadas',
      'Cobertura en medios y produccion derivada',
    ],
    accessTitle: 'Novedades, contacto y administracion',
    accessBody:
      'Ademas del mapa principal, la portada necesita dejar visibles los accesos operativos: novedades editoriales, contacto institucional y gestion interna del contenido.',
    accessLinks: [
      { label: 'Novedades', href: '/novedades' },
      { label: 'Contacto', href: '/contacto' },
      { label: 'Politicas de privacidad', href: '/terms-privacy' },
    ],
    adminLabel: 'Acceso de administracion',
  },
  en: {
    localeLabel: 'English',
    eyebrow: 'Victimology Institute of Usina de Justicia',
    title: 'An academic platform for training, research, and victims rights.',
    intro:
      'IVUJUS is being shaped as the digital node of an international academic network: a platform to present the institute, organize editorial production, and connect symposiums, training, and public work.',
    primaryCta: 'Explore the institute',
    secondaryCta: 'Go to campus',
    quickLinks: [
      { label: 'Institute', href: '/instituto' },
      { label: 'Training', href: '/formacion' },
      { label: 'Publications', href: '/publicaciones' },
      { label: 'Symposiums', href: '/simposios' },
    ],
    pillarsLabel: 'Mission',
    pillars: [
      {
        title: 'Research',
        body: 'Advance victimology, victims rights, criminality, and crime prevention through a public academic platform.',
      },
      {
        title: 'Training',
        body: 'Connect diplomas, cycles, and agreements without mixing the LMS with the institutional website.',
      },
      {
        title: 'Events and publications',
        body: 'Sustain symposiums, debates, books, dossiers, and declarations through a coherent editorial language.',
      },
    ],
    mapLabel: 'Site map',
    mapTitle: 'The public sections are already defined.',
    mapIntro:
      'The brief, the current website, and the repository point to the same structure. The homepage should make that architecture visible from the beginning.',
    cards: [
      {
        title: 'Institute',
        body: 'Statute, board, scientific committee, and the institutional presentation of IVUJUS.',
        href: '/instituto',
      },
      {
        title: 'Network',
        body: 'The future American-European Network and its flexible structure for institutions and affiliation.',
        href: '/red',
      },
      {
        title: 'Symposiums',
        body: 'Archive of editions, programs, media coverage, awards, and the Buenos Aires Declaration.',
        href: '/simposios',
      },
      {
        title: 'Training',
        body: 'Diploma program, debate cycles, agreements, and training activities.',
        href: '/formacion',
      },
      {
        title: 'Publications',
        body: 'Papers, books, dossiers, declarations, and the specialist glossary.',
        href: '/publicaciones',
      },
      {
        title: 'Legislative index',
        body: 'Analysis of laws and the methodology behind the first Argentine index focused on victims.',
        href: '/indice-legislativo',
      },
    ],
    featuredLabel: 'Symposium 2026',
    featuredTitle: 'Buenos Aires as a meeting point for criminal victimology.',
    featuredBody:
      'The First American and European Symposium on Criminal Victimology is not a side note. It shapes part of the site narrative and links academic output, institutional agenda, and international projection.',
    featuredItems: [
      'Buenos Aires Declaration',
      'Program and archive',
      'Media coverage and related output',
    ],
    accessTitle: 'Updates, contact, and administration',
    accessBody:
      'Alongside the main map, the homepage should keep operational entry points visible: editorial updates, institutional contact, and internal content management.',
    accessLinks: [
      { label: 'Updates', href: '/novedades' },
      { label: 'Contact', href: '/contacto' },
      { label: 'Privacy policy', href: '/terms-privacy' },
    ],
    adminLabel: 'Administration access',
  },
  fr: {
    localeLabel: 'Francais',
    eyebrow: 'Institut de victimologie de Usina de Justicia',
    title: 'Une plateforme academique pour la formation, la recherche et les droits des victimes.',
    intro:
      'IVUJUS se construit comme le noeud numerique d un reseau academique international: une plateforme pour presenter l institut, ordonner la production editoriale et articuler symposiums, formation et travail public.',
    primaryCta: 'Explorer l institut',
    secondaryCta: 'Acceder au campus',
    quickLinks: [
      { label: 'Institut', href: '/instituto' },
      { label: 'Formation', href: '/formacion' },
      { label: 'Publications', href: '/publicaciones' },
      { label: 'Symposiums', href: '/simposios' },
    ],
    pillarsLabel: 'Finalites',
    pillars: [
      {
        title: 'Recherche',
        body: 'Developper la victimologie, les droits des victimes, la criminalite et la prevention du crime depuis une base academique publique.',
      },
      {
        title: 'Formation',
        body: 'Relier diplomes, cycles et accords sans melanger le LMS avec le site institutionnel.',
      },
      {
        title: 'Evenements et publications',
        body: 'Soutenir symposiums, debats, livres, dossiers et declarations avec une ligne editoriale coherente.',
      },
    ],
    mapLabel: 'Carte du site',
    mapTitle: 'Les sections publiques sont deja definies.',
    mapIntro:
      'Le brief, le site actuel et le depot de travail convergent vers la meme architecture. La page d accueil doit rendre cette structure visible des le premier scroll.',
    cards: [
      {
        title: 'Institut',
        body: 'Statut, conseil directeur, comite scientifique et presentation institutionnelle de IVUJUS.',
        href: '/instituto',
      },
      {
        title: 'Reseau',
        body: 'La future Reseau Americain-Europeen et sa structure flexible pour institutions et adhesion.',
        href: '/red',
      },
      {
        title: 'Symposiums',
        body: 'Archive des editions, programme, medias, distinctions et Declaration de Buenos Aires.',
        href: '/simposios',
      },
      {
        title: 'Formation',
        body: 'Diplome, cycles de debat, accords et activites de formation.',
        href: '/formacion',
      },
      {
        title: 'Publications',
        body: 'Articles, livres, dossiers, declarations et glossaire specialise.',
        href: '/publicaciones',
      },
      {
        title: 'Indice legislatif',
        body: 'Analyse des normes et methodologie du premier indice argentin centre sur les victimes.',
        href: '/indice-legislativo',
      },
    ],
    featuredLabel: 'Symposium 2026',
    featuredTitle: 'Buenos Aires comme point de rencontre pour la victimologie penale.',
    featuredBody:
      'Le Premier Symposium americain et europeen de victimologie penale n est pas un element secondaire. Il structure une partie du recit public du site et relie production academique, agenda institutionnel et projection internationale.',
    featuredItems: [
      'Declaration de Buenos Aires',
      'Programme et archive',
      'Couverture mediatique et production derivee',
    ],
    accessTitle: 'Actualites, contact et administration',
    accessBody:
      'En plus du parcours principal, la page d accueil doit laisser visibles les acces operationnels: actualites editoriales, contact institutionnel et gestion interne du contenu.',
    accessLinks: [
      { label: 'Actualites', href: '/novedades' },
      { label: 'Contact', href: '/contacto' },
      { label: 'Politique de confidentialite', href: '/terms-privacy' },
    ],
    adminLabel: 'Acces administration',
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
    <main className="min-h-screen bg-[var(--color-usina-paper)] text-[var(--color-usina-ink)]">
      <section className="border-b border-[var(--color-usina-line)] px-6 py-8 text-xs uppercase tracking-[0.28em] text-[color:color-mix(in_srgb,var(--color-usina-navy)_72%,white)] sm:px-10">
        IVUJUS / {content.localeLabel}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
          <div className="space-y-8">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
              {content.eyebrow}
            </p>
            <div className="space-y-6">
              <h1
                className="max-w-5xl text-5xl leading-none tracking-tight text-[var(--color-usina-navy)] sm:text-6xl lg:text-7xl"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                {content.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[color:color-mix(in_srgb,var(--color-usina-ink)_78%,white)] sm:text-xl">
                {content.intro}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                className="inline-flex items-center justify-center border border-[var(--color-usina-navy)] bg-[var(--color-usina-navy)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[color:color-mix(in_srgb,var(--color-usina-navy)_88%,black)]"
                href={`/${locale}/instituto`}
              >
                {content.primaryCta}
              </a>
              <a
                className="inline-flex items-center justify-center border border-[var(--color-usina-line)] px-6 py-3 text-sm font-medium text-[var(--color-usina-navy)] transition hover:border-[var(--color-usina-accent)] hover:text-[var(--color-usina-accent)]"
                href={`/${locale}/formacion/diplomatura`}
              >
                {content.secondaryCta}
              </a>
            </div>
          </div>

          <aside className="border border-[var(--color-usina-line)] bg-white/70 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
              Navegacion rapida
            </p>
            <div className="mt-5 space-y-3">
              {content.quickLinks.map((link) => (
                <a
                  key={link.href}
                  className="flex items-center justify-between border-b border-[var(--color-usina-line)] py-3 text-sm text-[var(--color-usina-navy)] transition hover:text-[var(--color-usina-accent)]"
                  href={`/${locale}${link.href}`}
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true">/</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-px border-y border-[var(--color-usina-line)] bg-[var(--color-usina-line)] px-6 sm:px-10 lg:grid-cols-3">
        {content.pillars.map((pillar) => (
          <article key={pillar.title} className="bg-[var(--color-usina-paper)] px-0 py-10 lg:px-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
              {content.pillarsLabel}
            </p>
            <h2
              className="mt-4 text-2xl text-[var(--color-usina-navy)]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {pillar.title}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[color:color-mix(in_srgb,var(--color-usina-ink)_78%,white)]">
              {pillar.body}
            </p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
            {content.mapLabel}
          </p>
          <h2
            className="text-3xl leading-tight text-[var(--color-usina-navy)] sm:text-4xl"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            {content.mapTitle}
          </h2>
          <p className="text-lg leading-8 text-[color:color-mix(in_srgb,var(--color-usina-ink)_80%,white)]">
            {content.mapIntro}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {content.cards.map((card) => (
            <a
              key={card.href}
              className="group border border-[var(--color-usina-line)] bg-white/70 p-6 transition hover:border-[var(--color-usina-accent)]"
              href={`/${locale}${card.href}`}
            >
              <h3
                className="text-2xl text-[var(--color-usina-navy)] transition group-hover:text-[var(--color-usina-accent)]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[color:color-mix(in_srgb,var(--color-usina-ink)_78%,white)]">
                {card.body}
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
                Abrir seccion
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-6 sm:px-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="border border-[var(--color-usina-line)] bg-white/70 p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-usina-accent)]">
            {content.featuredLabel}
          </p>
          <h2
            className="mt-4 max-w-3xl text-3xl leading-tight text-[var(--color-usina-navy)] sm:text-4xl"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            {content.featuredTitle}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:color-mix(in_srgb,var(--color-usina-ink)_80%,white)]">
            {content.featuredBody}
          </p>
          <div className="mt-8 grid gap-px border border-[var(--color-usina-line)] bg-[var(--color-usina-line)] sm:grid-cols-3">
            {content.featuredItems.map((item) => (
              <div key={item} className="bg-[var(--color-usina-paper)] px-4 py-5 text-sm leading-6 text-[var(--color-usina-navy)]">
                {item}
              </div>
            ))}
          </div>
          <a
            className="mt-6 inline-flex items-center justify-center border border-[var(--color-usina-navy)] px-5 py-3 text-sm font-medium text-[var(--color-usina-navy)] transition hover:border-[var(--color-usina-accent)] hover:text-[var(--color-usina-accent)]"
            href={`/${locale}/simposios/2026-buenos-aires`}
          >
            Ver simposio 2026
          </a>
        </div>

        <div className="border border-[var(--color-usina-line)] bg-[var(--color-usina-navy)] p-6 text-white sm:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[color:color-mix(in_srgb,var(--color-usina-paper)_84%,white)]">
            {content.adminLabel}
          </p>
          <a className="mt-4 inline-block text-2xl" href="/admin" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            /admin
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 sm:px-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <div className="space-y-4">
          <h2
            className="text-3xl leading-tight text-[var(--color-usina-navy)] sm:text-4xl"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            {content.accessTitle}
          </h2>
          <p className="max-w-3xl text-lg leading-8 text-[color:color-mix(in_srgb,var(--color-usina-ink)_80%,white)]">
            {content.accessBody}
          </p>
        </div>
        <div className="border border-[var(--color-usina-line)] bg-white/70 p-6">
          {content.accessLinks.map((link, index) => (
            <a
              key={link.href}
              className={`block py-3 text-sm text-[var(--color-usina-navy)] transition hover:text-[var(--color-usina-accent)] ${index > 0 ? 'border-t border-[var(--color-usina-line)]' : ''}`}
              href={`/${locale}${link.href}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
