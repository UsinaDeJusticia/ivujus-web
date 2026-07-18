import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Cinzel, Montserrat } from 'next/font/google';

import { Header, type HeaderNavItem } from '@/components/layout/Header';
import { Footer, type FooterColumn } from '@/components/layout/Footer';

const LOCALES = ['es', 'en', 'fr'] as const;
type Locale = (typeof LOCALES)[number];

// Labels de navegación verificados contra el diccionario `copy` de
// [locale]/page.tsx (quickLinks/cards), para no introducir una segunda
// traducción divergente de las mismas dos palabras. Solo Instituto y
// Simposios: son las únicas dos ramas con rutas reales navegables (ver
// docs/CLAUDE.md, "Estado actual de frontend y migracion"). Enlaces a
// /formacion, /publicaciones, /novedades, /red, /indice-legislativo, etc.
// existen en el diccionario de la home pero no tienen ruta implementada
// todavía — no se agregan acá para no romper la navegación.
const NAV_COPY: Record<Locale, { instituto: string; simposios: string; navegacion: string }> = {
  es: { instituto: 'Instituto', simposios: 'Simposios', navegacion: 'Navegación' },
  en: { instituto: 'Institute', simposios: 'Symposiums', navegacion: 'Navigation' },
  fr: { instituto: 'Institut', simposios: 'Symposiums', navegacion: 'Navigation' },
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
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
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
    { label: nav.simposios, href: `${homeHref}/simposios` },
  ];

  const footerColumns: FooterColumn[] = [
    {
      title: nav.navegacion,
      links: navItems,
    },
  ];

  return (
    <html lang={locale} className={`${cinzel.variable} ${montserrat.variable}`}>
      <body>
        <Header
          homeHref={homeHref}
          items={navItems}
          // Sin CTA de "Acceder al Campus": la URL del campus virtual
          // (usinadejusticiacampus.org.ar según el design system, pero no
          // confirmada por Jair para este sitio) todavía no está aprobada.
          // Agregar `cta` acá en cuanto se confirme el link real.
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
      </body>
    </html>
  );
}
