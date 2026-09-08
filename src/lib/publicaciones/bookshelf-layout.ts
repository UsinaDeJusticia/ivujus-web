import type { BookPlacement, BookViewModel, PublicationType } from '@/components/editorial/bookshelf/types';

export const SHELF_ROWS = 5;
export const BOOKS_PER_PAGE = 25;
export const MOBILE_BOOKS_PER_PAGE = 5;
export const SHELF_INNER_WIDTH = 2;
export const INSTITUTE_NAME = 'Instituto de Victimología de Usina de Justicia';
export const SHELF_TOP = 2.22;
export const SHELF_PITCH = .48;
const COLORS = ['#193d53', '#375450', '#765044', '#86724f', '#39485a', '#5e624b', '#4b3631'];

export function hashBook(value: string): number {
  let hash = 2166136261;
  for (const char of value) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return hash >>> 0;
}

export function bookDimensions(id: string) {
  const seed = hashBook(id);
  return {
    width: .225 + (seed % 19) / 450,
    height: .325 + ((seed >>> 5) % 17) / 300,
    thickness: .037 + ((seed >>> 10) % 13) / 500,
    color: COLORS[seed % COLORS.length],
  };
}

/** Distribución por filas equilibradas; el ancho físico determina el espaciado. */
export function packBooks(books: Pick<BookViewModel, 'id'>[], compact = false): BookPlacement[] {
  const rowOrder = [1, 2, 0, 3, 4];
  const rows = Array.from({ length: rowOrder.length }, () => [] as BookPlacement[]);
  books.forEach((book, index) => {
    const row = index % rowOrder.length;
    const seed = hashBook(book.id);
    rows[row].push({ id: book.id, ...bookDimensions(book.id), row: rowOrder[row],
      position: [0, 0, .13], rotation: ((seed % 5) - 2) * .022 });
  });
  return rows.flatMap((items) => {
    const gap = compact ? .18 : .14;
    const width = items.reduce((sum, item) => sum + item.width, 0) + Math.max(0, items.length - 1) * gap;
    let x = -width / 2;
    return items.map((item) => {
      item.position = [x + item.width / 2, SHELF_TOP - item.row * SHELF_PITCH + item.height / 2, .17];
      x += item.width + gap;
      return item;
    });
  });
}

export function makeDecorations(placements: BookPlacement[]): BookPlacement[] {
  const decorations: BookPlacement[] = [];
  for (let row = 0; row < SHELF_ROWS; row++) {
    for (let slot = 0; slot < 25; slot++) {
      const id = `decor-${row}-${slot}`;
      const seed = hashBook(id);
      const x = (slot - 12) * .0785;
      if (placements.some((book) => book.row === row && Math.abs(book.position[0] - x) < book.width / 2 + .08)) continue;
      // Pequeños silencios entre grupos, sin títulos ni metadatos ficticios.
      if ((slot + row * 3) % 17 > 13) continue;
      const height = .245 + (seed % 70) / 650;
      decorations.push({ id, row, position: [x, SHELF_TOP - row * SHELF_PITCH + height / 2, .055],
        rotation: 0, width: .041 + (seed % 15) / 600, height, thickness: .235 + (seed % 6) / 400,
        color: COLORS[seed % COLORS.length] });
    }
  }
  return decorations;
}

export function normalizeSearch(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().trim();
}

export function filterBooks(books: BookViewModel[], query: string, type: PublicationType | '', year: string) {
  const words = normalizeSearch(query).split(/\s+/).filter(Boolean);
  return books.filter((book) => {
    const text = normalizeSearch(`${book.title} ${book.subtitle ?? ''} ${book.authors.join(' ')} ${book.authorsLabel ?? ''}`);
    return words.every((word) => text.includes(word)) && (!type || book.type === type) && (!year || String(book.year) === year);
  });
}
