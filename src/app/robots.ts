import type { MetadataRoute } from 'next';

const siteUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL ?? 'https://ivujus.org.ar';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/graphql-playground'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin', '/api', '/graphql-playground'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/admin', '/api', '/graphql-playground'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin', '/api', '/graphql-playground'],
      },
      {
        userAgent: 'GoogleOther',
        allow: '/',
        disallow: ['/admin', '/api', '/graphql-playground'],
      },
      {
        userAgent: 'Amazonbot',
        allow: '/',
        disallow: ['/admin', '/api', '/graphql-playground'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
