'use client';

import Image from 'next/image';
import { useState } from 'react';
import { bookDimensions } from '@/lib/publicaciones/bookshelf-layout';
import type { BookViewModel } from './types';
import s from './bookshelf.module.css';

export function BookCover({ book, sizes = '160px' }: { book: BookViewModel; sizes?: string }) {
  const [failed, setFailed] = useState(false);
  return <div className={s.cover} style={{ backgroundColor: bookDimensions(book.id).color }}>
    {book.coverUrl && !failed ? <Image src={book.coverUrl} alt={book.title} fill sizes={sizes} onError={() => setFailed(true)} className={s.coverImage} /> :
      <div className={s.generatedCover}>
        <span className={s.coverBrand}>IVUJUS</span>
        <span className={s.coverTitle}>{book.title}</span>
        <span className={s.coverAuthors}>{book.authorsLabel || book.authors.join(' · ')}</span>
      </div>}
  </div>;
}
