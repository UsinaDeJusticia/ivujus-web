import type { MetadataRoute } from 'next';

const siteUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL ?? 'https://ivujus.org.ar';
const lastModified = new Date('2026-05-04T00:00:00.000Z');
const locales = ['es', 'en', 'fr'] as const;
const localizedRoutes = [
  '',
  '/instituto',
  '/instituto/estatuto',
  '/instituto/consejo-directivo',
  '/instituto/comite-cientifico',
  '/simposios',
  '/simposios/2026-buenos-aires',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    localizedRoutes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified,
      alternates: {
        languages: Object.fromEntries(
          locales.map((entryLocale) => [entryLocale, `${siteUrl}/${entryLocale}${route}`]),
        ),
      },
    })),
  );
}
