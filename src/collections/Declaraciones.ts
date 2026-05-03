import type { CollectionConfig } from 'payload';

import { commonFields } from './fields/commonFields';
import { generateSlug } from '../hooks/generateSlug';
import { revalidateOnChange, revalidateOnDelete } from '../hooks/revalidateRoutes';

export const Declaraciones: CollectionConfig = {
  slug: 'declaraciones',
  labels: { singular: 'Declaración', plural: 'Declaraciones' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'fecha', 'estado'],
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
    { name: 'slug', label: 'Slug', type: 'text', required: true, unique: true, index: true },
    { name: 'fecha', label: 'Fecha', type: 'date', required: true },
    {
      name: 'simposio_origen',
      label: 'Simposio de origen',
      type: 'relationship',
      relationTo: 'simposios',
    },
    {
      name: 'texto_completo',
      label: 'Texto completo',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'firmantes',
      label: 'Firmantes (personas)',
      type: 'relationship',
      relationTo: 'autores',
      hasMany: true,
    },
    {
      name: 'firmantes_institucionales',
      label: 'Firmantes (instituciones)',
      type: 'relationship',
      relationTo: 'instituciones',
      hasMany: true,
    },
    { name: 'pdf', label: 'PDF', type: 'upload', relationTo: 'media' },
    ...commonFields,
  ],
};
