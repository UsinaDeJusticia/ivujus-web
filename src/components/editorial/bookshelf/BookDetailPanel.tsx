'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import type { BookshelfCopy } from '@/lib/publicaciones/bookshelf-copy';
import { BookCover } from './BookCover';
import { BookMetadata } from './BookMetadata';
import type { BookViewModel } from './types';
import s from './bookshelf.module.css';

type Props = { book: BookViewModel | null; copy: BookshelfCopy; onClose: () => void; onNext?: () => void; onPrevious?: () => void };

export function BookDetailPanel({ book, copy, onClose, onNext, onPrevious }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const wasOpen = Boolean(book);
  useEffect(() => {
    const element = dialog.current;
    if (!element || !wasOpen) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    element.showModal();
    return () => { element.close(); if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, [wasOpen]);
  useEffect(() => { if (dialog.current) dialog.current.scrollTop = 0; }, [book?.id]);

  return <dialog ref={dialog} className={s.detailPanel} aria-labelledby="book-detail-title"
    onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
    }}>
    {book && <>
      <div className={s.detailBar}><span>{copy.types[book.type]}</span><button autoFocus type="button" onClick={onClose} aria-label={copy.close} className={s.closeButton}>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
      </button></div>
      <div className={s.panelCover}><BookCover key={book.id} book={book} /></div>
      <h2 id="book-detail-title" className={s.detailTitle}>{book.title}</h2>
      {book.subtitle && <p className={s.subtitle}>{book.subtitle}</p>}
      <BookMetadata book={book} copy={copy} />
      <Link className={s.primaryLink} href={book.href}>{copy.details}<span aria-hidden="true"> →</span></Link>
      {(onPrevious || onNext) && <nav className={s.bookNavigation} aria-label={copy.catalog}>
        <button type="button" disabled={!onPrevious} onClick={onPrevious}>{copy.previous}</button>
        <button type="button" disabled={!onNext} onClick={onNext}>{copy.next}</button>
      </nav>}
    </>}
  </dialog>;
}
