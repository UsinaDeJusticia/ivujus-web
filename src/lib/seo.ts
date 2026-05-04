import type { Metadata } from 'next';

const SITE_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL ?? 'https://ivujus.org.ar';
const LOCALES = ['es', 'en', 'fr'] as const;

export function getSiteUrl() {
  return SITE_URL;
}

export function buildLocalizedMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const canonical = `/${locale}${normalizedPath}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        LOCALES.map((entryLocale) => [entryLocale, `/${entryLocale}${normalizedPath}`]),
      ),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'IVUJUS',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function buildJsonLdScript(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data),
  };
}
