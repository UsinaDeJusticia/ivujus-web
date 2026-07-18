import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Cinzel, Montserrat } from 'next/font/google';

const LOCALES = ['es', 'en', 'fr'] as const;
type Locale = (typeof LOCALES)[number];

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

  return (
    <html lang={locale} className={`${cinzel.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
