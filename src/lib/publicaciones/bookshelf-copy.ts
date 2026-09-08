import { pickLocale, type Locale } from '@/lib/i18n';
import type { PublicationType } from '@/components/editorial/bookshelf/types';

export type BookshelfCopy = {
  title: string; lead: string; meta: string; back: string; search: string; searchPlaceholder: string;
  clear: string; type: string; year: string; allTypes: string; allYears: string; shelf: string; list: string;
  loading: string; loadingScene: string; fallback: string; retry: string; empty: string; noResults: string;
  noResultsHint: string; countOne: string; countMany: string; instruction: string; touchInstruction: string;
  decorativeNote: string; open: string; close: string; details: string; full: string; excerpt: string;
  purchase: string; source: string; summary: string; authors: string; publisher: string; originalCover: string;
  previous: string; next: string; page: string; of: string; catalog: string; missing: string;
  types: Record<PublicationType, string>;
};

export const bookshelfCopy: Record<Locale, BookshelfCopy> = {
  es: {
    title: 'Biblioteca académica', lead: 'Obras, ideas y nuevas perspectivas para una justicia centrada en las víctimas.',
    meta: 'Explore los libros y publicaciones académicas de IVUJUS, consulte sus fichas editoriales y acceda a sus documentos.',
    back: 'Publicaciones', search: 'Buscar publicaciones', searchPlaceholder: 'Título o autor…', clear: 'Limpiar filtros',
    type: 'Tipo de publicación', year: 'Año', allTypes: 'Todos los tipos', allYears: 'Todos los años',
    shelf: 'Ver biblioteca', list: 'Ver como lista', loading: 'Preparando la biblioteca…', loadingScene: 'Abriendo los estantes…',
    fallback: 'Puede explorar todas las publicaciones en el catálogo.', retry: 'Volver a abrir la biblioteca',
    empty: 'El catálogo está en preparación.', noResults: 'No encontramos esa publicación.',
    noResultsHint: 'Pruebe con otro título, apellido o tipo de publicación.', countOne: 'publicación', countMany: 'publicaciones',
    instruction: 'Seleccione una cubierta para descubrir la obra.', touchInstruction: 'Toque una cubierta para explorar la obra.',
    decorativeNote: 'Las cubiertas identificadas pertenecen al catálogo. Los lomos sin título ambientan la biblioteca.',
    open: 'Explorar obra', close: 'Cerrar ficha', details: 'Ver publicación completa', full: 'Leer PDF completo',
    excerpt: 'Leer fragmento', purchase: 'Consultar en librería', source: 'Leer la fuente', summary: 'Sobre la obra',
    authors: 'Autoría', publisher: 'Editorial', originalCover: 'Cubierta de catálogo', previous: 'Anterior', next: 'Siguiente',
    page: 'Estantería', of: 'de', catalog: 'Catálogo de publicaciones', missing: 'Publicación no disponible',
    types: { libro: 'Libro', coedicion: 'Coedición', capitulo_libro: 'Capítulo de libro', articulo_cientifico: 'Artículo científico', dossier: 'Dossier' },
  },
  en: {
    title: 'Academic library', lead: 'Books, ideas and new perspectives on justice centred on victims.',
    meta: 'Explore IVUJUS books and academic publications, read their bibliographic records and access their documents.',
    back: 'Publications', search: 'Search publications', searchPlaceholder: 'Title or author…', clear: 'Clear filters',
    type: 'Publication type', year: 'Year', allTypes: 'All types', allYears: 'All years',
    shelf: 'View library', list: 'View as list', loading: 'Preparing the library…', loadingScene: 'Opening the shelves…',
    fallback: 'You can explore every publication in the catalogue.', retry: 'Reopen the library',
    empty: 'The catalogue is being prepared.', noResults: 'No matching publication.',
    noResultsHint: 'Try another title, surname or publication type.', countOne: 'publication', countMany: 'publications',
    instruction: 'Select a cover to discover the publication.', touchInstruction: 'Tap a cover to explore the publication.',
    decorativeNote: 'Identified covers belong to the catalogue. Untitled spines furnish the library.',
    open: 'Explore publication', close: 'Close details', details: 'View full publication', full: 'Read full PDF',
    excerpt: 'Read excerpt', purchase: 'View at bookshop', source: 'Read source', summary: 'About the work',
    authors: 'Authorship', publisher: 'Publisher', originalCover: 'Catalogue cover', previous: 'Previous', next: 'Next',
    page: 'Bookcase', of: 'of', catalog: 'Publication catalogue', missing: 'Publication unavailable',
    types: { libro: 'Book', coedicion: 'Co-publication', capitulo_libro: 'Book chapter', articulo_cientifico: 'Research article', dossier: 'Dossier' },
  },
  fr: {
    title: 'Bibliothèque académique', lead: 'Ouvrages, idées et nouvelles perspectives pour une justice centrée sur les victimes.',
    meta: 'Explorez les livres et publications académiques de l’IVUJUS, consultez leurs notices et accédez à leurs documents.',
    back: 'Publications', search: 'Rechercher des publications', searchPlaceholder: 'Titre ou auteur…', clear: 'Effacer les filtres',
    type: 'Type de publication', year: 'Année', allTypes: 'Tous les types', allYears: 'Toutes les années',
    shelf: 'Voir la bibliothèque', list: 'Voir la liste', loading: 'Préparation de la bibliothèque…', loadingScene: 'Ouverture des rayonnages…',
    fallback: 'Toutes les publications restent accessibles dans le catalogue.', retry: 'Rouvrir la bibliothèque',
    empty: 'Le catalogue est en préparation.', noResults: 'Aucune publication correspondante.',
    noResultsHint: 'Essayez un autre titre, nom ou type de publication.', countOne: 'publication', countMany: 'publications',
    instruction: 'Sélectionnez une couverture pour découvrir l’ouvrage.', touchInstruction: 'Touchez une couverture pour explorer l’ouvrage.',
    decorativeNote: 'Les couvertures identifiées appartiennent au catalogue. Les dos sans titre composent le décor.',
    open: 'Explorer l’ouvrage', close: 'Fermer la notice', details: 'Voir la publication complète', full: 'Lire le PDF intégral',
    excerpt: 'Lire un extrait', purchase: 'Consulter en librairie', source: 'Lire la source', summary: 'À propos de l’ouvrage',
    authors: 'Auteurs', publisher: 'Éditeur', originalCover: 'Couverture du catalogue', previous: 'Précédent', next: 'Suivant',
    page: 'Rayonnage', of: 'sur', catalog: 'Catalogue des publications', missing: 'Publication indisponible',
    types: { libro: 'Livre', coedicion: 'Coédition', capitulo_libro: 'Chapitre de livre', articulo_cientifico: 'Article scientifique', dossier: 'Dossier' },
  },
};

export const getBookshelfCopy = (locale: string) => pickLocale(bookshelfCopy, locale);
