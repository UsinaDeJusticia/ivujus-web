'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import shelfPoster from '../../../../public/models/ivujus-bookshelf-poster.webp';
import { Component, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { BOOKS_PER_PAGE, MOBILE_BOOKS_PER_PAGE, INSTITUTE_NAME, filterBooks } from '@/lib/publicaciones/bookshelf-layout';
import type { BookshelfCopy } from '@/lib/publicaciones/bookshelf-copy';
import { BookDetailPanel } from './BookDetailPanel';
import { BookshelfFallback } from './BookshelfFallback';
import { BookshelfToolbar } from './BookshelfToolbar';
import type { BookViewModel, PublicationType } from './types';
import s from './bookshelf.module.css';

const Canvas = dynamic(() => import('./BookshelfCanvas'), { ssr: false });
const subscribeHydration = () => () => {};

function subscribeMedia(query: string, callback: () => void) {
  const media = matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
function useMedia(query: string) {
  const subscribe = useCallback((callback: () => void) => subscribeMedia(query, callback), [query]);
  return useSyncExternalStore(subscribe, () => matchMedia(query).matches, () => false);
}

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function BookshelfExperience({ books, copy }: { books: BookViewModel[]; copy: BookshelfCopy }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<PublicationType | ''>('');
  const [year, setYear] = useState('');
  const [view, setView] = useState<'shelf' | 'list'>('shelf');
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [eligible, setEligible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  // El catálogo nace visible en HTML; solo se oculta cuando React toma el control.
  const hydrated = useSyncExternalStore(subscribeHydration, () => true, () => false);
  const compact = useMedia('(max-width: 640px)');
  const reducedMotion = useMedia('(prefers-reduced-motion: reduce)');
  const deferredQuery = useDeferredValue(query);
  const matchingBooks = useMemo(() => filterBooks(books, deferredQuery, type, year), [books, deferredQuery, type, year]);
  const pageSize = compact ? MOBILE_BOOKS_PER_PAGE : BOOKS_PER_PAGE;
  const pages = Math.max(1, Math.ceil(matchingBooks.length / pageSize));
  const currentPage = Math.min(page, pages - 1);
  const visibleBooks = useMemo(() => matchingBooks.slice(currentPage * pageSize, (currentPage + 1) * pageSize), [matchingBooks, currentPage, pageSize]);
  const selectedIndex = matchingBooks.findIndex((book) => book.id === selectedId);
  const selected = selectedIndex < 0 ? null : matchingBooks[selectedIndex];
  const activeFilter = Boolean(query || type || year);
  const onFailure = useCallback(() => { setFailed(true); setReady(false); }, []);
  const onReady = useCallback(() => setReady(true), []);
  const onClose = useCallback(() => setSelectedId(null), []);
  const onSelect = useCallback((id: string) => {
    if (compact && view === 'shelf') stage.current?.scrollIntoView({ block: 'start', behavior: reducedMotion ? 'instant' : 'smooth' });
    setSelectedId(id);
  }, [compact, view, reducedMotion]);

  useEffect(() => {
    const target = stage.current;
    if (!target) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { setEligible(true); observer.disconnect(); }
    }, { rootMargin: '120px' });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!eligible || ready || failed || view !== 'shelf') return;
    const timeout = setTimeout(onFailure, 25000);
    return () => clearTimeout(timeout);
  }, [eligible, ready, failed, view, onFailure, attempt]);

  const resetSelection = () => { setSelectedId(null); setPage(0); };
  const clear = () => { setQuery(''); setType(''); setYear(''); resetSelection(); };
  const changeView = (next: 'shelf' | 'list') => { setView(next); setSelectedId(null); setReady(false); };
  const stepBook = (index: number) => { setSelectedId(matchingBooks[index].id); setPage(Math.floor(index / pageSize)); };

  return <section className={s.experience} aria-label={copy.title}>
    <BookshelfToolbar books={books} copy={copy} query={query} type={type} year={year} view={view}
      onQuery={(value) => { setQuery(value); resetSelection(); }} onType={(value) => { setType(value); resetSelection(); }}
      onYear={(value) => { setYear(value); resetSelection(); }} onView={changeView} />
    <div className={s.statusBar} data-bookshelf-controls>
      <p role="status" aria-live="polite">{matchingBooks.length} {matchingBooks.length === 1 ? copy.countOne : copy.countMany}</p>
      {activeFilter ? <button type="button" onClick={clear}>{copy.clear}</button> : <p className={s.instruction}>{compact ? copy.touchInstruction : copy.instruction}</p>}
    </div>
    <div ref={stage} id="biblioteca" className={`${s.stage} bookshelf-stage`} hidden={view !== 'shelf' || failed} aria-busy={!ready && !failed}>
      {!ready && <div className={s.loading} role="status"><Image src={shelfPoster} alt="" fill sizes="(max-width: 640px) 100vw, 1320px" className={s.poster} />
        <span>{eligible ? copy.loadingScene : copy.loading}</span></div>}
      {eligible && view === 'shelf' && !failed && <SceneBoundary key={attempt} onError={onFailure}>
        <Canvas books={visibleBooks} selectedId={selectedId} compact={compact} reducedMotion={reducedMotion} copy={copy} onSelect={onSelect} onReady={onReady} onFailure={onFailure} />
      </SceneBoundary>}
      {ready && matchingBooks.length === 0 && <div className={s.emptyScene}><h2>{books.length ? copy.noResults : copy.empty}</h2>
        {books.length > 0 && <><p>{copy.noResultsHint}</p><button type="button" onClick={clear}>{copy.clear}</button></>}</div>}
      <div className={s.roomCaption} aria-hidden="true"><span>{INSTITUTE_NAME}</span><span>{copy.title}</span></div>
    </div>
    {failed && <div className={s.fallbackNotice} role="status"><p>{copy.fallback}</p><button type="button" onClick={async () => {
      const { clearBlenderShelfCache } = await import('./BlenderShelf');
      clearBlenderShelfCache();
      setFailed(false); setReady(false); setAttempt((value) => value + 1); setView('shelf');
    }}>{copy.retry}</button></div>}
    <div hidden={hydrated && view !== 'list' && !failed} className="bookshelf-catalog-container">
      <BookshelfFallback books={matchingBooks} copy={copy} onSelect={onSelect} />
      {!matchingBooks.length && <div className={s.emptyList}><h2>{books.length ? copy.noResults : copy.empty}</h2><p>{copy.noResultsHint}</p>{activeFilter && <button type="button" onClick={clear}>{copy.clear}</button>}</div>}
    </div>
    {view === 'shelf' && !failed && <div className={s.sceneFooter} data-bookshelf-controls>
      <p>{copy.decorativeNote}</p>
      {pages > 1 && <nav aria-label={copy.page}><button type="button" disabled={currentPage === 0} onClick={() => { setPage(currentPage - 1); setSelectedId(null); }}>{copy.previous}</button>
        <span>{currentPage + 1} {copy.of} {pages}</span><button type="button" disabled={currentPage + 1 === pages} onClick={() => { setPage(currentPage + 1); setSelectedId(null); }}>{copy.next}</button></nav>}
    </div>}
    <BookDetailPanel book={selected} copy={copy} onClose={onClose}
      onPrevious={selectedIndex > 0 ? () => stepBook(selectedIndex - 1) : undefined}
      onNext={selectedIndex >= 0 && selectedIndex < matchingBooks.length - 1 ? () => stepBook(selectedIndex + 1) : undefined} />
    <noscript><style>{'.bookshelf-stage,[data-bookshelf-controls],.bookshelf-catalog button{display:none!important}'}</style></noscript>
  </section>;
}
