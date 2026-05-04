import type { CollectionConfig } from 'payload';

import { commonFields } from './fields/commonFields';
import { generateSlug } from '../hooks/generateSlug';
import { revalidateOnChange, revalidateOnDelete } from '../hooks/revalidateRoutes';
import { translateContent } from '../hooks/translateContent';

export const Novedades: CollectionConfig = {
  slug: 'novedades',
  labels: { singular: 'Novedad', plural: 'Novedades' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'tipo', 'fecha', 'estado'],
    group: 'Novedades',
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
          'Primera oración citable. Se usa como resumen en listados, snippets y para GEO.',
      },
    },
    {
      name: 'contenido',
      label: 'Contenido',
      type: 'richText',
      required: true,
      localized: true,
    },
    { name: 'fecha', label: 'Fecha', type: 'date', required: true },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'select',
      defaultValue: 'institucional',
      options: [
        { label: 'Institucional', value: 'institucional' },
        { label: 'Evento', value: 'evento' },
        { label: 'Reconocimiento', value: 'reconocimiento' },
        { label: 'Difusión', value: 'difusion' },
        { label: 'Prensa', value: 'prensa' },
      ],
    },
    {
      name: 'imagen_destacada',
      label: 'Imagen destacada',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'simposio_relacionado',
      label: 'Simposio relacionado',
      type: 'relationship',
      relationTo: 'simposios',
    },
    {
      name: 'publicacion_relacionada',
      label: 'Publicación relacionada',
      type: 'relationship',
      relationTo: 'publicaciones',
    },
    {
      name: 'ciclo_relacionado',
      label: 'Ciclo relacionado',
      type: 'relationship',
      relationTo: 'ciclos',
    },
    {
      name: 'enlace_externo',
      label: 'Enlace externo',
      type: 'text',
      admin: {
        description:
          'Usar cuando la novedad resume o deriva a una cobertura en medios u otra fuente externa.',
      },
    },
    ...commonFields,
  ],
};
