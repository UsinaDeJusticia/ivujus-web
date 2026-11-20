import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';

import { Header, type HeaderNavItem } from '@/components/layout/Header';
import { Footer, type FooterColumn } from '@/components/layout/Footer';
import { CAMPUS_VIRTUAL_URL } from '@/lib/formacion';

const LOCALES = ['es', 'en', 'fr'] as const;
type Locale = (typeof LOCALES)[number];

// Labels de navegación verificados contra el diccionario `copy` de
// [locale]/page.tsx (quickLinks/cards), para no introducir una segunda
// traducción divergente de las mismas palabras. Instituto, Formación,
// Simposios y Novedades: las cuatro ramas con rutas reales navegables (ver
// docs/CLAUDE.md, "Estado actual de frontend y migracion", actualizado en
// la ola Novedades con las rutas de src/lib/novedades.ts). Enlaces a
// /publicaciones, /red, /indice-legislativo, etc. existen en el
// diccionario de la home pero no tienen ruta implementada todavía — no se
// agregan acá para no romper la navegación.
const NAV_COPY: Record<
  Locale,
  {
    instituto: string;
    formacion: string;
    publicaciones: string;
    simposios: string;
    novedades: string;
    contacto: string;
    privacidad: string;
    navegacion: string;
    institucional: string;
    accederCampus: string;
  }
> = {
  es: {
    instituto: 'Instituto',
    formacion: 'Formación',
    publicaciones: 'Publicaciones',
    // Etiqueta corta a propósito: el nombre completo de la sección
    // («Eventos académicos») vive en el h1, el breadcrumb y la metadata. En el
    // nav tiene que ser breve o la fila del header desborda entre 768 y 1024px.
    simposios: 'Eventos',
    novedades: 'Novedades',
    contacto: 'Contacto',
    privacidad: 'Privacidad',
    navegacion: 'Navegación',
    institucional: 'Institucional',
    accederCampus: 'Acceder al Campus',
  },
  en: {
    instituto: 'Institute',
    formacion: 'Training',
    publicaciones: 'Publications',
    simposios: 'Events',
    novedades: 'Updates',
    contacto: 'Contact',
    privacidad: 'Privacy',
    navegacion: 'Navigation',
    institucional: 'Institutional',
    accederCampus: 'Access the Campus',
  },
  fr: {
    instituto: 'Institut',
    formacion: 'Formation',
    publicaciones: 'Publications',
    simposios: 'Événements',
    novedades: 'Actualités',
    contacto: 'Contact',
    privacidad: 'Confidentialité',
    navegacion: 'Navigation',
    institucional: 'Institutionnel',
    accederCampus: 'Accéder au Campus',
  },
};

// Tagline y nombre institucional del footer: tomados verbatim del manual
// oficial (docs/reference/design-system-oficial/README.md), no traducidos
// por locale — son la denominación legal y el eslogan de marca, no copy de
// UI. Ninguna de las 3 páginas existentes tenía footer propio del que
// heredar otra línea legal.
const FOOTER_TAGLINE = 'Conocimiento que ilumina, formación que transforma.';
const FOOTER_LEGAL_NAME = 'Instituto de Victimología de Usina de Justicia';

// Fuentes oficiales IVUJUS: Cinzel para display/titulares, Montserrat para
// cuerpo/UI. Ver docs/reference/design-system-oficial/colors_and_type.css.
//
// Autohospedadas en src/fonts (archivos variables, subconjunto latin, bajados
// de Google Fonts el 20-nov-2026; licencia SIL OFL). Antes se usaba
// next/font/google, que descarga las fuentes en cada build: el 20-nov un
// deploy de producción falló porque Google no respondió. Con archivos
// locales el build no depende de la red. Mismos rangos de peso que antes.
const cinzel = localFont({
  src: '../../../fonts/Cinzel-latin-var.woff2',
  weight: '400 700',
  style: 'normal',
  variable: '--font-display',
  display: 'swap',
});

const montserrat = localFont({
  src: [
    { path: '../../../fonts/Montserrat-latin-var.woff2', weight: '300 700', style: 'normal' },
    { path: '../../../fonts/Montserrat-Italic-latin-var.woff2', weight: '300 700', style: 'italic' },
  ],
  variable: '--font-body',
  display: 'swap',
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const nav = NAV_COPY[locale as Locale];
  const homeHref = `/${locale}`;

  const navItems: HeaderNavItem[] = [
    { label: nav.instituto, href: `${homeHref}/instituto` },
    { label: nav.formacion, href: `${homeHref}/formacion` },
    { label: nav.publicaciones, href: `${homeHref}/publicaciones` },
    { label: nav.simposios, href: `${homeHref}/simposios` },
    { label: nav.novedades, href: `${homeHref}/novedades` },
  ];

  // Footer: la columna "Navegación" reutiliza el nav principal; la columna
  // "Institucional" agrega las rutas que no van en el nav superior
  // (Contacto y la política de privacidad).
  const footerColumns: FooterColumn[] = [
    {
      title: nav.navegacion,
      links: navItems,
    },
    {
      title: nav.institucional,
      links: [
        { label: nav.contacto, href: `${homeHref}/contacto` },
        { label: nav.privacidad, href: `${homeHref}/terms-privacy` },
      ],
    },
  ];

  return (
    <html lang={locale} className={`${cinzel.variable} ${montserrat.variable}`}>
      <head>
        {/* Anti-flash de tema: aplica el tema guardado antes del primer
            paint, para que sepia/oscuro no parpadeen desde claro. Debe ser
            inline y síncrono; corre antes de que React hidrate. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('ivujus-theme');if(t==='sepia'||t==='dark'||t==='light'){document.documentElement.dataset.theme=t;}}catch(e){}})();",
          }}
        />
      </head>
      <body>
        <Header
          homeHref={homeHref}
          items={navItems}
          locale={locale}
          // CTA "Acceder al Campus": URL tomada de
          // docs/reference/design-system-oficial/README.md ("Superficies del
          // producto"), la misma que usa src/lib/formacion.ts para el CTA de
          // /formacion/diplomatura. Confirmable con Jair antes de darla por
          // definitiva para prensa/redes; no bloquea mostrarla en el sitio
          // porque ya es la fuente oficial disponible.
          cta={{ label: nav.accederCampus, href: CAMPUS_VIRTUAL_URL, target: '_blank', rel: 'noreferrer' }}
        />
        {children}
        <Footer
          homeHref={homeHref}
          tagline={FOOTER_TAGLINE}
          columns={footerColumns}
          legal={FOOTER_LEGAL_NAME}
          // Sin socialLinks: no hay URLs de redes oficiales confirmadas
          // (ver Footer.tsx, prop socialLinks, y el README del design system).
        />
        {/* Vercel Web Analytics: sin cookies ni datos personales; mide visitas para vigilar el consumo. */}
        <Analytics />
      </body>
    </html>
  );
}
