export type PublicationType = 'libro' | 'coedicion' | 'capitulo_libro' | 'articulo_cientifico' | 'dossier';

export type BookLink = {
  kind: 'full' | 'excerpt' | 'purchase' | 'source';
  url: string;
  label?: string;
};

export type BookViewModel = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  authors: string[];
  authorsLabel?: string;
  year?: number;
  publisher?: string;
  isbn?: string;
  doi?: string;
  summary?: string;
  coverUrl?: string;
  type: PublicationType;
  href: string;
  links: BookLink[];
};

export type BookPlacement = {
  id: string;
  position: [number, number, number];
  rotation: number;
  width: number;
  height: number;
  thickness: number;
  color: string;
  row: number;
};
