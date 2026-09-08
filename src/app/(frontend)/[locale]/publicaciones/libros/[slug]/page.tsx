import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { buildLocalizedMetadata } from '@/lib/seo';
import { getBookshelfPublications } from '@/lib/publicaciones/bookshelf';
import { getBookshelfCopy } from '@/lib/publicaciones/bookshelf-copy';
import { bookJsonLd, safeJsonLd } from '@/lib/publicaciones/bookshelf-seo';
import { BookCover } from '@/components/editorial/bookshelf/BookCover';
import { BookMetadata } from '@/components/editorial/bookshelf/BookMetadata';
import LegacyBookPage from '@/components/editorial/bookshelf/LegacyBookPage';
import s from '@/components/editorial/bookshelf/bookshelf.module.css';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const book = (await getBookshelfPublications(locale)).find((item) => item.slug === slug);
  if (!book) return { title: getBookshelfCopy(locale).missing };
  return buildLocalizedMetadata({ locale, path: `/publicaciones/libros/${encodeURIComponent(slug)}`, title: book.title,
    description: book.summary?.slice(0, 170) || book.subtitle || book.title });
}

export default async function BookPage({ params }: Props) {
  const { locale, slug } = await params;
  const book = (await getBookshelfPublications(locale)).find((item) => item.slug === slug);
  if (!book) notFound();
  if (book.id.startsWith('curated:')) return <LegacyBookPage params={Promise.resolve({ locale })} />;
  const copy = getBookshelfCopy(locale);
  return <main className={s.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={safeJsonLd({ '@context': 'https://schema.org', ...bookJsonLd(book) })} />
    <div className={s.detailPage}>
      <Link href={`/${locale}/publicaciones/libros`} className={s.backLink}>← {copy.title}</Link>
      <div className={s.detailPageGrid}><BookCover book={book} sizes="230px" />
        <article><p className={s.bookType}>{copy.types[book.type]}</p><h1>{book.title}</h1>
          {book.subtitle && <p className={s.subtitle}>{book.subtitle}</p>}<BookMetadata book={book} copy={copy} />
        </article>
      </div>
    </div>
  </main>;
}
