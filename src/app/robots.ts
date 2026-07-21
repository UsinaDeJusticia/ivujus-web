import type { MetadataRoute } from 'next';

import { getSiteUrl } from '@/lib/seo';

// Crawlers de LLM que el brief (docs/ARQUITECTURA.md §8.1) pide permitir
// explícitamente para GEO (Generative Engine Optimization), además del
// acceso general que ya cubre la regla `userAgent: '*'`.
const LLM_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'anthropic-ai',
  'Claude-Web',
  'PerplexityBot',
  'Google-Extended',
  'Amazonbot',
  'Applebot-Extended',
] as const;

const DISALLOW = ['/admin', '/api'];

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW,
      },
      ...LLM_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
