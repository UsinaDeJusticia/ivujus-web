// Biblioteca: la vidriera de todo el material editorial del IVUJUS.
//
// Este módulo es deliberadamente chico. La Biblioteca no guarda copias del
// material: la página lo compone desde los datasets que ya lo tienen
// (`getLibroNuevosParadigmas`, `getDossiers` y `declaracionesIndex` de
// `src/lib/publicaciones`, más el título de la declaración desde
// `src/lib/simposio2026`) y enlaza a la página canónica de cada pieza.
// Duplicar acá esos textos los pondría a divergir en la primera corrección
// que alguien haga en un solo lado.
//
// Lo único propio son los libros recomendados, que no existen en ningún otro
// dataset. Ver el comentario de es.ts sobre por qué ese array está vacío.
import { pickLocale, type Locale } from '../i18n';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import type { BibliotecaLabels, BibliotecaLocaleContent, LibroRecomendado } from './types';

export type { BibliotecaLabels, BibliotecaLocaleContent, LibroRecomendado };

// Exportado para que `scripts/check-i18n.ts` compare los tres idiomas.
export const bibliotecaByLocale: Record<Locale, BibliotecaLocaleContent> = { es, en, fr };

export function getBibliotecaLabels(locale: string): BibliotecaLabels {
  return pickLocale(bibliotecaByLocale, locale).labels;
}

export function getLibrosRecomendados(locale: string): LibroRecomendado[] {
  return pickLocale(bibliotecaByLocale, locale).librosRecomendados;
}
