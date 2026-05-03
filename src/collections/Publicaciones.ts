import type { CollectionConfig } from 'payload';

import { commonFields } from './fields/commonFields';
import { generateSlug } from '../hooks/generateSlug';
import { revalidateOnChange, revalidateOnDelete } from '../hooks/revalidateRoutes';

export const Publicaciones: CollectionConfig = {
  slug: 'publicaciones',
  labels: { singular: 'Publicación', plural: 'Publicaciones' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'tipo', 'anio_publicacion', 'estado'],
    group: 'Producción editorial',
  },
  versions: { drafts: true },
  hooks: {
    beforeChange: [generateSlug('titulo')],
    afterChange: [revalidateOnChange],
    afterDelete: [revalidateOnDelete],
  },
  fields: [
    { name: 'titulo', label: 'Título', type: 'text', required: true, localized: true },
    { name: 'subtitulo', label: 'Subtítulo', type: 'text', localized: true },
    { name: 'slug', label: 'Slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'select',
      required: true,
      options: [
        { label: 'Libro', value: 'libro' },
        { label: 'Coedición', value: 'coedicion' },
        { label: 'Capítulo de libro', value: 'capitulo_libro' },
        { label: 'Artículo científico', value: 'articulo_cientifico' },
        { label: 'Dossier', value: 'dossier' },
      ],
    },
    {
      name: 'autores_texto',
      label: 'Autores (texto libre)',
      type: 'text',
      admin: {
        description:
          'Usar cuando los autores no estén todos en la colección Autores (publicaciones externas, traducciones, etc.).',
      },
    },
    {
      name: 'autores_relacionados',
      label: 'Autores',
      type: 'relationship',
      relationTo: 'autores',
      hasMany: true,
    },
    {
      name: 'coeditores',
      label: 'Coeditores',
      type: 'relationship',
      relationTo: 'instituciones',
      hasMany: true,
    },
    { name: 'editorial', label: 'Editorial', type: 'text' },
    { name: 'anio_publicacion', label: 'Año de publicación', type: 'number' },
    { name: 'isbn', label: 'ISBN', type: 'text' },
    { name: 'doi', label: 'DOI', type: 'text' },
    { name: 'resumen', label: 'Resumen', type: 'richText', required: true, localized: true },
    { name: 'portada', label: 'Portada', type: 'upload', relationTo: 'media' },
    {
      name: 'pdf_completo',
      label: 'PDF completo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Subir solo si los derechos de autor lo permiten.' },
    },
    {
      name: 'pdf_fragmento',
      label: 'PDF de muestra',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Vista previa o capítulo de muestra.' },
    },
    {
      name: 'enlaces_compra',
      label: 'Enlaces de compra',
      type: 'array',
      fields: [
        { name: 'libreria', label: 'Librería', type: 'text' },
        { name: 'url', label: 'URL', type: 'text' },
      ],
    },
    {
      name: 'presentaciones',
      label: 'Presentaciones',
      type: 'array',
      fields: [
        { name: 'fecha', label: 'Fecha', type: 'date' },
        { name: 'lugar', label: 'Lugar', type: 'text', localized: true },
        {
          name: 'oradores',
          label: 'Oradores',
          type: 'relationship',
          relationTo: 'autores',
          hasMany: true,
        },
      ],
    },
    ...commonFields,
  ],
};
