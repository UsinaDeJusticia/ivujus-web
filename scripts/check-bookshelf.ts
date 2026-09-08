import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { bookDimensions, BOOKS_PER_PAGE, MOBILE_BOOKS_PER_PAGE, SHELF_INNER_WIDTH, filterBooks, makeDecorations, packBooks } from '../src/lib/publicaciones/bookshelf-layout';
import { isPublicBook, mergeBooks, normalizePublication, richTextToPlainText, safeBookUrl } from '../src/lib/publicaciones/bookshelf-normalize';
import { bookshelfCopy } from '../src/lib/publicaciones/bookshelf-copy';
import { safeJsonLd } from '../src/lib/publicaciones/bookshelf-seo';
import type { BookViewModel } from '../src/components/editorial/bookshelf/types';

let assertions = 0;
function check(name: string, run: () => void) { run(); assertions++; console.log(`✓ ${name}`); }
const fixture = (id: number): BookViewModel => ({ id: `fixture-${id}`, slug: `fixture-${id}`, title: `Publicación de prueba ${id}`,
  authors: ['María Núñez'], type: id % 2 ? 'libro' : 'coedicion', year: 2020 + id % 5, links: [], href: `/es/publicaciones/libros/fixture-${id}` });

for (const count of [0, 1, 5, 20, 50, 101, 240]) check(`Layout completo, sin colisiones ni pérdidas: ${count} publicaciones`, () => {
  const books = Array.from({ length: count }, (_, index) => fixture(index));
  const placed: string[] = [];
  for (let page = 0; page < Math.ceil(count / BOOKS_PER_PAGE); page++) {
    const subset = books.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE);
    const layout = packBooks(subset);
    assert.deepEqual(layout, packBooks(subset));
    for (const placement of layout) {
      placed.push(placement.id);
      assert.ok(Math.abs(placement.position[0]) + placement.width / 2 < SHELF_INNER_WIDTH / 2);
      assert.ok(placement.height < .416);
      for (const other of layout) {
        if (other.id !== placement.id && other.row === placement.row) assert.ok(Math.abs(other.position[0] - placement.position[0]) > (other.width + placement.width) / 2);
      }
    }
    for (const decor of makeDecorations(layout)) assert.ok(!layout.some((item) => item.row === decor.row && Math.abs(item.position[0] - decor.position[0]) < (item.width + decor.width) / 2));
  }
  assert.equal(new Set(placed).size, count);
});
check('Dimensiones estables por ID y adaptación móvil', () => {
  assert.deepEqual(bookDimensions('abc'), bookDimensions('abc'));
  assert.notDeepEqual(bookDimensions('abc'), bookDimensions('xyz'));
  const mobile = packBooks(Array.from({ length: MOBILE_BOOKS_PER_PAGE }, (_, i) => fixture(i)), true);
  assert.equal(new Set(mobile.map((item) => item.row)).size, MOBILE_BOOKS_PER_PAGE);
  assert.ok(mobile.every((item) => Math.abs(item.position[0]) + item.width / 2 < SHELF_INNER_WIDTH / 2));
  assert.ok(makeDecorations(packBooks([])).length > makeDecorations(packBooks(Array.from({ length: BOOKS_PER_PAGE }, (_, i) => fixture(i)))).length);
});
check('Búsqueda por autor, acentos, título y filtros combinados', () => {
  const books = Array.from({ length: 50 }, (_, index) => fixture(index));
  assert.equal(filterBooks(books, 'maria nunez', '', '').length, 50);
  assert.equal(filterBooks(books, 'publicacion 17', 'libro', '2022').length, 1);
  assert.equal(filterBooks(books, 'inexistente', '', '').length, 0);
  assert.equal(filterBooks(books, '', '', '').length, 50);
});
check('Estado público exige publicación editorial y versión publicada', () => {
  assert.equal(isPublicBook({ estado: 'publicado', _status: 'draft' }), false);
  assert.equal(isPublicBook({ estado: 'archivado', _status: 'published' }), false);
  assert.equal(isPublicBook({ estado: 'publicado', _status: 'published' }), true);
});
check('CMS prevalece; obra retirada no reaparece desde el catálogo curado', () => {
  const legacy = fixture(1);
  assert.equal(mergeBooks([], [legacy], new Set([legacy.slug])).length, 0);
  assert.equal(mergeBooks([{ ...legacy, id: 'cms' }], [legacy], new Set()).length, 1);
  assert.equal(mergeBooks([{ ...legacy, id: 'cms', slug: 'otro-slug' }], [legacy], new Set()).length, 1);
});
check('Enlaces seguros, relaciones no pobladas y texto Lexical', () => {
  for (const value of ['javascript:alert(1)', 'data:text/html,test', '//evil.test', '/\\evil.test', 'https://user:pass@example.org']) assert.equal(safeBookUrl(value), undefined);
  assert.equal(safeBookUrl('/api/media/file/book.pdf'), '/api/media/file/book.pdf');
  assert.equal(richTextToPlainText({ root: { type: 'root', children: [{ children: [{ text: 'Uno' }] }, { children: [{ text: 'Dos' }] }] } }), 'Uno\n\nDos');
  const base = { id: 4, titulo: 'Título original', slug: 'original', tipo: 'libro' as const, resumen: { root: { type: 'root', children: [{ type: 'text', version: 1, text: 'Original' }], direction: null, format: '' as const, indent: 0, version: 1 } }, estado: 'publicado' as const, _status: 'published' as const,
    fuente: 'humano' as const, createdAt: '', updatedAt: '', autores_relacionados: [42], portada: 5, requiere_revision_autor: true, traduccion_estado: 'automatica' as const };
  const normalized = normalizePublication(base, 'en', { ...base, titulo: 'Wrong translated title', resumen: { ...base.resumen, root: { ...base.resumen.root, children: [{ type: 'text', version: 1, text: 'Translated' }] } } });
  assert.equal(normalized.title, 'Título original');
  assert.equal(normalized.summary, 'Original');
  assert.equal(normalized.coverUrl, undefined);
  assert.deepEqual(normalized.authors, []);
  assert.ok(!('fuente' in normalized));
});
check('Copy completo ES/EN/FR y JSON-LD resistente a cierre de script', () => {
  assert.deepEqual(Object.keys(bookshelfCopy.es).sort(), Object.keys(bookshelfCopy.en).sort());
  assert.deepEqual(Object.keys(bookshelfCopy.es).sort(), Object.keys(bookshelfCopy.fr).sort());
  assert.ok(!safeJsonLd({ title: '</script><script>alert(1)</script>' }).__html.includes('<'));
});
check('GLB válido, sin cámaras, luces ni placeholders', () => {
  const bytes = readFileSync(new URL('../public/models/ivujus-bookshelf.glb', import.meta.url));
  assert.equal(bytes.toString('utf8', 0, 4), 'glTF');
  assert.equal(bytes.readUInt32LE(4), 2);
  assert.equal(bytes.readUInt32LE(8), bytes.length);
  const json = JSON.parse(bytes.toString('utf8', 20, 20 + bytes.readUInt32LE(12)));
  assert.ok(json.meshes.length > 20);
  assert.ok(!json.cameras?.length);
  assert.ok(!json.nodes.some((node: { name?: string }) => /Placeholder|Studio|Camera|Light/i.test(node.name || '')));
  assert.ok(bytes.length < 2_000_000);
  console.log(`  GLB: ${json.meshes.length} meshes, ${json.materials.length} materiales, ${bytes.length} bytes.`);
});
console.log(`${assertions} comprobaciones de biblioteca completadas.`);
