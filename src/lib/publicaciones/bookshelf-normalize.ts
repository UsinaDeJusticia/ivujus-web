import type { Publicacione } from '@/payload-types';
import type { BookLink, BookViewModel } from '@/components/editorial/bookshelf/types';
import type { Locale } from '@/lib/i18n';

export type BookshelfPublication = Omit<Publicacione, 'fuente' | 'createdAt' | 'updatedAt'>;

export function safeBookUrl(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return;
  if (/^\/(?!\/)/.test(value) && !value.includes('\\')) return value;
  try {
    const url = new URL(value);
    if (['https:', 'http:'].includes(url.protocol) && !url.username && !url.password) return url.href;
  } catch { /* Los enlaces incompletos del CMS no se publican. */ }
}

export function richTextToPlainText(value: unknown): string {
  if (!value || typeof value !== 'object') return '';
  const node = value as { text?: unknown; children?: unknown[]; root?: unknown; type?: string };
  if (typeof node.text === 'string') return node.text;
  if (node.root) return richTextToPlainText(node.root);
  if (Array.isArray(node.children)) {
    const separator = node.type === 'root' ? '\n\n' : '';
    return node.children.map(richTextToPlainText).join(separator);
  }
  return '';
}

export function isPublicBook(doc: Pick<Publicacione, 'estado' | '_status'>): boolean {
  return doc.estado === 'publicado' && doc._status === 'published';
}

function mediaUrl(value: unknown): string | undefined {
  return value && typeof value === 'object' && 'url' in value ? safeBookUrl(value.url) : undefined;
}

/** Solo sale del servidor información bibliográfica, nunca el documento completo de Payload. */
export function normalizePublication(doc: BookshelfPublication, locale: Locale, translation?: BookshelfPublication): BookViewModel {
  const links: BookLink[] = [];
  const full = mediaUrl(doc.pdf_completo);
  const excerpt = mediaUrl(doc.pdf_fragmento);
  if (full) links.push({ kind: 'full', url: full });
  if (excerpt) links.push({ kind: 'excerpt', url: excerpt });
  for (const link of doc.enlaces_compra ?? []) {
    const url = safeBookUrl(link.url);
    if (url) links.push({ kind: 'purchase', url, label: link.libreria || undefined });
  }
  const authors = (doc.autores_relacionados ?? []).flatMap((author) => typeof author === 'object' ? [author.nombre_completo] : []);
  const translationAllowed = !doc.requiere_revision_autor || ['revisada_humano', 'publicada'].includes(doc.traduccion_estado ?? '');
  return {
    id: String(doc.id), slug: doc.slug, title: doc.titulo, subtitle: doc.subtitulo || undefined,
    authors: [...new Set(authors)], authorsLabel: doc.autores_texto || undefined,
    year: doc.anio_publicacion || undefined, publisher: doc.editorial || undefined,
    isbn: doc.isbn || undefined, doi: doc.doi || undefined,
    summary: richTextToPlainText(translationAllowed && translation ? translation.resumen : doc.resumen) || undefined,
    coverUrl: mediaUrl(doc.portada), type: doc.tipo,
    href: `/${locale}/publicaciones/libros/${encodeURIComponent(doc.slug)}`, links,
  };
}

export function mergeBooks(cms: BookViewModel[], legacy: BookViewModel[], knownSlugs: Set<string>): BookViewModel[] {
  // Un registro retirado en CMS también sustituye a su copia curada, para no resucitarlo.
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const seen = new Set<string>();
  return [...cms, ...legacy.filter((book) => !knownSlugs.has(book.slug))].filter((book) => {
    const keys = [`slug:${book.slug}`, `title:${normalize(book.title)}`, ...(book.isbn ? [`isbn:${normalize(book.isbn)}`] : [])];
    if (keys.some((key) => seen.has(key))) return false;
    keys.forEach((key) => seen.add(key));
    return true;
  }).sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title));
}
