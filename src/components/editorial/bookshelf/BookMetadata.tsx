import type { BookshelfCopy } from '@/lib/publicaciones/bookshelf-copy';
import type { BookViewModel } from './types';
import s from './bookshelf.module.css';

export function BookMetadata({ book, copy }: { book: BookViewModel; copy: BookshelfCopy }) {
  return <>
    <dl className={s.metadata}>
      {(book.authorsLabel || book.authors.length > 0) && <div><dt>{copy.authors}</dt><dd>{book.authorsLabel || book.authors.join(' · ')}</dd></div>}
      {book.year && <div><dt>{copy.year}</dt><dd>{book.year}</dd></div>}
      {book.publisher && <div><dt>{copy.publisher}</dt><dd>{book.publisher}</dd></div>}
      {book.isbn && <div><dt>ISBN</dt><dd>{book.isbn}</dd></div>}
      {book.doi && <div><dt>DOI</dt><dd>{book.doi}</dd></div>}
    </dl>
    {book.summary && <div className={s.summary}><h3>{copy.summary}</h3>{book.summary.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>}
    {book.links.length > 0 && <ul className={s.resources}>{book.links.map((link, index) => <li key={`${link.url}-${index}`}>
      <a href={link.url} target="_blank" rel="noopener noreferrer">{copy[link.kind]}{link.label ? ` · ${link.label}` : ''}<span aria-hidden="true"> ↗</span></a>
    </li>)}</ul>}
  </>;
}
