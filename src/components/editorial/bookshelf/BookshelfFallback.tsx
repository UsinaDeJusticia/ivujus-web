import Link from 'next/link';
import type { BookshelfCopy } from '@/lib/publicaciones/bookshelf-copy';
import type { BookViewModel } from './types';
import { BookCover } from './BookCover';
import s from './bookshelf.module.css';

export function BookshelfFallback({ books, copy, onSelect }: { books: BookViewModel[]; copy: BookshelfCopy; onSelect: (id: string) => void }) {
  return <section className={`${s.catalog} bookshelf-catalog`} aria-label={copy.catalog}>
    <h2>{copy.catalog}</h2>
    <ul>{books.map((book) => <li key={book.id}>
      <BookCover book={book} />
      <article>
        <span className={s.bookType}>{copy.types[book.type]}{book.year ? ` · ${book.year}` : ''}</span>
        <h3><Link href={book.href}>{book.title}</Link></h3>
        {book.subtitle && <p className={s.subtitle}>{book.subtitle}</p>}
        <p className={s.catalogAuthors}>{book.authorsLabel || book.authors.join(' · ')}</p>
        {book.summary && <p className={s.catalogSummary}>{book.summary}</p>}
        <div className={s.catalogActions}><button type="button" onClick={() => onSelect(book.id)}>{copy.open}</button><Link href={book.href}>{copy.details}</Link></div>
      </article>
    </li>)}</ul>
  </section>;
}
