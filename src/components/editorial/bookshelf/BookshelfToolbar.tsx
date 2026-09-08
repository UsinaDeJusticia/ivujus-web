import type { BookshelfCopy } from '@/lib/publicaciones/bookshelf-copy';
import type { BookViewModel, PublicationType } from './types';
import s from './bookshelf.module.css';

type Props = { books: BookViewModel[]; copy: BookshelfCopy; query: string; type: PublicationType | ''; year: string;
  view: 'shelf' | 'list'; onQuery: (value: string) => void; onType: (value: PublicationType | '') => void;
  onYear: (value: string) => void; onView: (value: 'shelf' | 'list') => void };

export function BookshelfToolbar({ books, copy, query, type, year, view, onQuery, onType, onYear, onView }: Props) {
  const years = [...new Set(books.flatMap((book) => book.year ? [book.year] : []))].sort((a, b) => b - a);
  const types = [...new Set(books.map((book) => book.type))];
  return <div className={s.toolbar} data-bookshelf-controls>
    <label className={s.search}>
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.6" /></svg>
      <span className={s.srOnly}>{copy.search}</span>
      <input type="search" value={query} onChange={(event) => onQuery(event.target.value)} placeholder={copy.searchPlaceholder} autoComplete="off" />
    </label>
    <select aria-label={copy.type} value={type} onChange={(event) => onType(event.target.value as PublicationType | '')}>
      <option value="">{copy.allTypes}</option>{types.map((value) => <option value={value} key={value}>{copy.types[value]}</option>)}
    </select>
    {years.length > 1 && <select aria-label={copy.year} value={year} onChange={(event) => onYear(event.target.value)}>
      <option value="">{copy.allYears}</option>{years.map((value) => <option value={value} key={value}>{value}</option>)}
    </select>}
    <div className={s.viewToggle}>
      <button type="button" aria-pressed={view === 'shelf'} onClick={() => onView('shelf')} aria-label={copy.shelf} title={copy.shelf}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M3 3h18v18H3zM3 12h18M7 6v6m4-6v6m5-6 2 6M7 15v6m5-6v6m5-6v6" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
      </button>
      <button type="button" aria-pressed={view === 'list'} onClick={() => onView('list')}>
        <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h1M3 12h1M3 18h1" stroke="currentColor" strokeWidth="1.6" /></svg>
        <span>{copy.list}</span>
      </button>
    </div>
  </div>;
}
