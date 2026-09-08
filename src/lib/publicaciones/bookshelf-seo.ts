import type { BookViewModel } from '@/components/editorial/bookshelf/types';
import { getSiteUrl } from '@/lib/seo';

export function bookJsonLd(book: BookViewModel) {
  return {
    '@type': book.type === 'articulo_cientifico' ? 'ScholarlyArticle' : book.type === 'capitulo_libro' ? 'Chapter' : book.type === 'dossier' ? 'CreativeWork' : 'Book',
    name: book.title, alternateName: book.subtitle, url: `${getSiteUrl()}${book.href}`,
    author: book.authors.length ? book.authors.map((name) => ({ '@type': 'Person', name })) : undefined,
    description: book.summary, datePublished: book.year?.toString(), isbn: book.isbn,
    identifier: book.doi, image: book.coverUrl,
    publisher: book.publisher ? { '@type': 'Organization', name: book.publisher } : undefined,
  };
}

export function safeJsonLd(value: unknown) {
  return { __html: JSON.stringify(value).replace(/</g, '\\u003c') };
}
