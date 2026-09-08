import 'server-only';
import { unstable_cache } from 'next/cache';
import type { BookshelfPublication } from './bookshelf-normalize';
import type { BookViewModel } from '@/components/editorial/bookshelf/types';
import { resolveLocale, type Locale } from '@/lib/i18n';
import { getLibroNuevosParadigmas } from '@/lib/publicaciones';
import { isPublicBook, mergeBooks, normalizePublication } from './bookshelf-normalize';

function curatedBooks(locale: Locale): BookViewModel[] {
  const book = getLibroNuevosParadigmas(locale);
  const original = getLibroNuevosParadigmas('es');
  return [{
    id: `curated:${book.slug}`, slug: book.slug, title: original.title, subtitle: original.subtitle,
    authors: ['Diana Cohen Agrest', 'María Jimena Molina'], authorsLabel: book.authors,
    // La fecha curada corresponde al anuncio, no prueba el año editorial de la obra.
    summary: book.announcementParagraphs.join('\n\n'), type: 'libro',
    href: `/${locale}/publicaciones/libros/${book.slug}`,
    // coverImage es una fotografía de las compiladoras, no una portada.
    links: book.sourcePosts.map((source) => ({ kind: 'source', url: source.url })),
  }];
}

const readCmsBooks = unstable_cache(async (locale: Locale) => {
  const [{ getPayload }, { default: config }] = await Promise.all([import('payload'), import('@payload-config')]);
  const payload = await getPayload({ config });
  const docs: BookshelfPublication[] = [];
  let page = 1;
  do {
    const result = await payload.find({
      collection: 'publicaciones', locale, fallbackLocale: 'es', depth: 1,
      draft: false, overrideAccess: false, limit: 100, page, sort: 'id',
      select: { titulo: true, subtitulo: true, slug: true, tipo: true, autores_texto: true,
        autores_relacionados: true, anio_publicacion: true, editorial: true, isbn: true, doi: true,
        resumen: true, portada: true, pdf_completo: true, pdf_fragmento: true, enlaces_compra: true,
        estado: true, _status: true, requiere_revision_autor: true, traduccion_estado: true },
    });
    docs.push(...result.docs);
    if (!result.hasNextPage) break;
    page++;
  } while (true);
  return docs;
}, ['bookshelf-publications-v1'], { tags: ['collection:publicaciones', 'collection:media', 'collection:autores'], revalidate: 300 });

export async function getBookshelfPublications(localeValue: string): Promise<BookViewModel[]> {
  const locale = resolveLocale(localeValue);
  const legacy = curatedBooks(locale);
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) return legacy;
  try {
    const [base, translated] = await Promise.all([readCmsBooks('es'), locale === 'es' ? Promise.resolve([]) : readCmsBooks(locale)]);
    const translations = new Map(translated.map((doc) => [doc.id, doc]));
    const cms = base.filter(isPublicBook).map((doc) => normalizePublication(doc, locale, translations.get(doc.id)));
    return mergeBooks(cms, legacy, new Set(base.map((doc) => doc.slug)));
  } catch {
    console.warn('[bookshelf] El CMS no respondió. Se muestra el contenido editorial curado.');
    return legacy;
  }
}
