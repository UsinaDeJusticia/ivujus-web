import type { CollectionConfig } from 'payload';

import { commonFields } from './fields/commonFields';
import { generateSlug } from '../hooks/generateSlug';
import { revalidateOnChange, revalidateOnDelete } from '../hooks/revalidateRoutes';
import { translateContent } from '../hooks/translateContent';

export const Articulos: CollectionConfig = {
  slug: 'articulos',
  labels: { singular: 'Artículo', plural: 'Artículos' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'tipo', 'estado', 'publicado_en'],
    group: 'Producción editorial',
  },
  versions: { drafts: true },
  hooks: {
    beforeChange: [generateSlug('titulo')],
    afterChange: [translateContent, revalidateOnChange],
    afterDelete: [revalidateOnDelete],
  },
  fields: [
    { name: 'titulo', label: 'Título', type: 'text', required: true, localized: true },
    { name: 'slug', label: 'Slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'bajada',
      label: 'Bajada',
      type: 'textarea',
      localized: true,
      maxLength: 300,
      admin: {
        description:
          'Primera oración citable. Se usa como resumen del artículo en listados, snippets y por los LLMs.',
      },
    },
    { name: 'contenido', label: 'Contenido', type: 'richText', required: true, localized: true },
    {
      name: 'autor',
      label: 'Autor / autores',
      type: 'relationship',
      relationTo: 'autores',
      hasMany: true,
      required: true,
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'select',
      options: [
        { label: 'Artículo', value: 'articulo' },
        { label: 'Ensayo', value: 'ensayo' },
        { label: 'Columna', value: 'columna' },
        { label: 'Reseña de libro', value: 'resena_libro' },
        { label: 'Comentario de caso', value: 'comentario_caso' },
      ],
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'array',
      fields: [{ name: 'tag', label: 'Tag', type: 'text' }],
    },
    { name: 'imagen_destacada', label: 'Imagen destacada', type: 'upload', relationTo: 'media' },
    { name: 'tiempo_lectura_min', label: 'Tiempo de lectura (min)', type: 'number' },
    {
      name: 'citas_bibliograficas',
      label: 'Citas bibliográficas',
      type: 'array',
      fields: [
        { name: 'referencia_apa', label: 'Referencia APA', type: 'textarea', required: true },
        { name: 'url', label: 'URL', type: 'text' },
      ],
    },
    {
      name: 'fichas_relacionadas',
      label: 'Fichas del glosario relacionadas',
      type: 'relationship',
      relationTo: 'fichas-glosario',
      hasMany: true,
    },
    {
      name: 'articulos_relacionados',
      label: 'Artículos relacionados',
      type: 'relationship',
      relationTo: 'articulos',
      hasMany: true,
    },
    ...commonFields,
  ],
};
