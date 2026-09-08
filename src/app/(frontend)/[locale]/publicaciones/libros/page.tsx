import Link from 'next/link';
import type { Metadata } from 'next';
import { buildLocalizedMetadata, getSiteUrl } from '@/lib/seo';
import { resolveLocale } from '@/lib/i18n';
import { getBookshelfPublications } from '@/lib/publicaciones/bookshelf';
import { getBookshelfCopy } from '@/lib/publicaciones/bookshelf-copy';
import { bookJsonLd, safeJsonLd } from '@/lib/publicaciones/bookshelf-seo';
import { BookshelfExperience } from '@/components/editorial/bookshelf/BookshelfExperience';
import s from '@/components/editorial/bookshelf/bookshelf.module.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = getBookshelfCopy(locale);
  return buildLocalizedMetadata({ locale, path: '/publicaciones/libros', title: copy.title, description: copy.meta });
}

export default async function LibrosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const books = await getBookshelfPublications(locale);
  const copy = getBookshelfCopy(locale);
  const jsonLd = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: copy.title,
    url: `${getSiteUrl()}/${locale}/publicaciones/libros`,
    mainEntity: { '@type': 'ItemList', numberOfItems: books.length, itemListElement: books.map((book, index) => ({
      '@type': 'ListItem', position: index + 1, item: bookJsonLd(book),
    })) },
  };
  const breadcrumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'IVUJUS', item: `${getSiteUrl()}/${locale}` },
    { '@type': 'ListItem', position: 2, name: copy.back, item: `${getSiteUrl()}/${locale}/publicaciones` },
    { '@type': 'ListItem', position: 3, name: copy.title, item: `${getSiteUrl()}/${locale}/publicaciones/libros` },
  ] };
  return <main className={s.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={safeJsonLd(jsonLd)} />
    <script type="application/ld+json" dangerouslySetInnerHTML={safeJsonLd(breadcrumbs)} />
    <div className={s.pageInner}>
      <Link className={s.backLink} href={`/${locale}/publicaciones`}><span aria-hidden="true">←</span>{copy.back}</Link>
      <header className={s.intro}><h1>{copy.title}</h1><p>{copy.lead}</p></header>
      <BookshelfExperience books={books} copy={copy} />
    </div>
  </main>;
}
