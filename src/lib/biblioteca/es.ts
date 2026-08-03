import type { BibliotecaLocaleContent } from './types';

// `librosRecomendados` está vacío a propósito.
//
// No hay todavía material real de libros recomendados: faltan los títulos, las
// tapas y los enlaces de compra oficiales (docs/PLAN-CONTENIDO.md). Inventar
// entradas de relleno rompería la regla 1 de gobernanza, así que el array
// queda vacío y la página omite la sección entera hasta que llegue el
// material — una sección vacía en pantalla es peor que ninguna (regla 2).
//
// El resto de la vidriera no depende de esto: se compone con las piezas reales
// que el sitio ya tiene publicadas y verificadas (el libro «Nuevos Paradigmas»,
// los tres dossiers y la Declaración de Buenos Aires).
export const es: BibliotecaLocaleContent = {
  labels: {
    biblioteca: 'Biblioteca',
    metaTitle: 'Biblioteca',
    metaDescription:
      'Todo el material editorial del Instituto de Victimología de Usina de Justicia: libros, dossiers temáticos y declaraciones, con su resumen y su acceso.',
    eyebrow: 'Publicaciones / Biblioteca',
    heading: 'Todo el material del Instituto, en un solo lugar.',
    lead: 'Libros, dossiers temáticos y declaraciones. De cada pieza publicamos un resumen y el enlace para acceder al documento completo o adquirirlo en su sitio oficial.',
    vidrieraNota:
      'La estantería es una vista decorativa del material. El listado completo, con el resumen y el enlace de cada pieza, está debajo.',
    librosPropiosTitle: 'Libros del IVUJUS',
    librosPropiosLead: 'Obras editadas por el instituto o con su participación directa.',
    librosRecomendadosTitle: 'Libros recomendados',
    librosRecomendadosLead:
      'Obras de terceros que el instituto recomienda. No son publicaciones propias: de cada una damos un resumen y el enlace a su sitio oficial de compra.',
    dossiersTitle: 'Dossiers temáticos',
    dossiersLead: 'Documentos de trabajo del instituto sobre un tema puntual, de descarga libre.',
    declaracionesTitle: 'Declaraciones',
    declaracionesLead: 'Documentos oficiales suscritos en el marco de las actividades del instituto.',
    verFicha: 'Ver la ficha completa',
    verDossiers: 'Ver todos los dossiers',
    verDeclaracion: 'Ver la declaración completa',
  },
  librosRecomendados: [],
};
