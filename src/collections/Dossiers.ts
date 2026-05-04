import type { CollectionConfig } from 'payload';

import { commonFields } from './fields/commonFields';
import { generateSlug } from '../hooks/generateSlug';
import { revalidateOnChange, revalidateOnDelete } from '../hooks/revalidateRoutes';
import { translateContent } from '../hooks/translateContent';

export const Dossiers: CollectionConfig = {
  slug: 'dossiers',
  labels: { singular: 'Dossier', plural: 'Dossiers' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'tema', 'fecha_publicacion', 'estado'],
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
    { name: 'tema', label: 'Tema', type: 'text', localized: true },
    { name: 'resumen', label: 'Resumen', type: 'richText', required: true, localized: true },
    {
      name: 'contenido',
      label: 'Contenido',
      type: 'richText',
      localized: true,
      admin: { description: 'Solo si el dossier tiene versión web además del PDF.' },
    },
    { name: 'pdf', label: 'PDF', type: 'upload', relationTo: 'media', required: true },
    { name: 'portada', label: 'Portada', type: 'upload', relationTo: 'media' },
    {
      name: 'autores',
      label: 'Autores',
      type: 'relationship',
      relationTo: 'autores',
      hasMany: true,
    },
    { name: 'fecha_publicacion', label: 'Fecha de publicación', type: 'date', required: true },
    ...commonFields,
  ],
};
