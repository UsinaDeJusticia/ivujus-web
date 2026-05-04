import type { CollectionConfig } from 'payload';

import { commonFields } from './fields/commonFields';
import { generateSlug } from '../hooks/generateSlug';
import { revalidateOnChange, revalidateOnDelete } from '../hooks/revalidateRoutes';
import { translateContent } from '../hooks/translateContent';

export const PaginasEstaticas: CollectionConfig = {
  slug: 'paginas-estaticas',
  labels: { singular: 'Página estática', plural: 'Páginas estáticas' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'slug', 'publicada'],
    group: 'Sitio',
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
      name: 'contenido',
      label: 'Contenido',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'publicada',
      label: 'Publicada',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    ...commonFields,
  ],
};
