// Novedades en vivo desde el WordPress de IVUJUS (Fase 3).
//
// El equipo sigue publicando en WordPress como siempre; este módulo lee
// `wp/v2/posts` y convierte cada post al tipo `Novedad` que ya usan las
// páginas. Las páginas mezclan este resultado con el dataset curado de
// `src/lib/novedades` (ver `getNovedades` en ese index): el curado gana
// cuando el post ya existe ahí, porque tiene traducción EN/FR revisada.
//
// Si WordPress no responde, se devuelve una lista vacía y el sitio sigue
// mostrando el dataset curado: una caída del CMS nunca rompe la página.
import 'server-only';

import type { EnlaceExterno, Novedad } from '@/lib/novedades/types';
import { WP_HOSTNAME, WP_ORIGIN } from './origin';

/** Segundos que una lista leída de WordPress se reutiliza antes de volver a pedirla. */
export const WP_REVALIDATE_SECONDS = 300;

const FETCH_TIMEOUT_MS = 8000;

type WpRendered = { rendered: string };
type WpPost = {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: WpRendered;
  excerpt: WpRendered;
  content: WpRendered;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url?: string }>;
  };
};

export type WpNovedad = Novedad & {
  /** Viene solo de WordPress: está en español aunque la página se vea en EN/FR. */
  soloEspanol: true;
};

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  hellip: '…',
  ndash: '–',
  mdash: '—',
  laquo: '«',
  raquo: '»',
  ldquo: '“',
  rdquo: '”',
  lsquo: '‘',
  rsquo: '’',
};

export function decodeEntities(value: string): string {
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === '#') {
      const point = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(point) && point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : match;
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? match;
  });
}

export function htmlToText(html: string): string {
  return decodeEntities(html.replace(/<br\s*\/?>|<\/(p|div|li|h[1-6])>/gi, ' ').replace(/<[^>]+>/g, ''))
    .replace(/\s+/g, ' ')
    .trim();
}

/** Bloques de texto del cuerpo, en orden: párrafos, subtítulos e ítems de lista. */
export function htmlToParagraphs(html: string): string[] {
  const withoutScripts = html.replace(/<(script|style|iframe)[\s\S]*?<\/\1>/gi, '');
  const blocks = withoutScripts.match(/<(p|h[1-6]|li|blockquote)\b[^>]*>[\s\S]*?<\/\1>/gi) ?? [];
  return blocks.map(htmlToText).filter((text) => text.length > 0);
}

function isSafeHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Enlaces citados en el post. Se descartan los que apuntan a páginas del
 * propio WordPress (su tema viejo no es destino para el visitante), pero se
 * conservan los archivos de `wp-content` (PDF, etc.).
 */
export function extractLinks(html: string): EnlaceExterno[] {
  const links: EnlaceExterno[] = [];
  const seen = new Set<string>();
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    const url = decodeEntities(match[1]).trim();
    const titulo = htmlToText(match[2]);
    if (!titulo || !isSafeHttpUrl(url) || seen.has(url)) continue;
    const parsed = new URL(url);
    const ownSite = parsed.hostname === WP_HOSTNAME || parsed.hostname === `www.${WP_HOSTNAME}`;
    if (ownSite && !parsed.pathname.startsWith('/wp-content/')) continue;
    seen.add(url);
    links.push({ titulo, url });
  }
  return links;
}

/** Slug apto para URL: WordPress entrega los emojis del título percent-encoded. */
export function cleanSlug(wpSlug: string): string {
  let decoded = wpSlug;
  try {
    decoded = decodeURIComponent(wpSlug);
  } catch {
    // slug mal codificado: se limpia tal cual llega
  }
  return decoded
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');
}

export function wpPostToNovedad(post: WpPost): WpNovedad | null {
  const slug = cleanSlug(post.slug);
  const titulo = htmlToText(post.title.rendered);
  const contenido = htmlToParagraphs(post.content.rendered);
  if (!slug || !titulo) return null;
  // Bajada = primer párrafo real del post (mismo criterio que el dataset
  // curado); el extracto de WordPress solo si el cuerpo viene vacío.
  const bajada = contenido[0] || htmlToText(post.excerpt.rendered).replace(/\s*\[…\]\s*$/, '…') || titulo;
  const imagen = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const enlaces = extractLinks(post.content.rendered);
  return {
    slug,
    titulo,
    fecha: post.date.slice(0, 10),
    bajada,
    contenido: contenido.length > 0 ? contenido : [bajada],
    imagen: imagen && isSafeHttpUrl(imagen) ? imagen : undefined,
    enlacesExternos: enlaces.length > 0 ? enlaces : undefined,
    fuente: 'migracion_wp',
    source_wp_id: post.id,
    source_url: post.link,
    soloEspanol: true,
  };
}

/** Todos los posts publicados del WordPress. Lista vacía si el CMS no responde. */
export async function fetchWpNovedades(): Promise<WpNovedad[]> {
  const fields = 'id,date,slug,link,title,excerpt,content,_links,_embedded';
  const url = `${WP_ORIGIN}/wp-json/wp/v2/posts?per_page=100&_embed=wp:featuredmedia&_fields=${fields}`;
  try {
    const response = await fetch(url, {
      next: { revalidate: WP_REVALIDATE_SECONDS, tags: ['wp-posts'] },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: { accept: 'application/json' },
    });
    if (!response.ok) {
      console.warn(`[wordpress] posts respondió ${response.status}; se usa solo el contenido curado.`);
      return [];
    }
    const data: unknown = await response.json();
    if (!Array.isArray(data)) return [];
    return (data as WpPost[]).flatMap((post) => {
      const novedad = wpPostToNovedad(post);
      return novedad ? [novedad] : [];
    });
  } catch (error) {
    console.warn('[wordpress] no se pudieron leer los posts; se usa solo el contenido curado.', error);
    return [];
  }
}
