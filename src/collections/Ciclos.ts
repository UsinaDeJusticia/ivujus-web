import type { CollectionConfig } from 'payload';

import { commonFields } from './fields/commonFields';
import { generateSlug } from '../hooks/generateSlug';
import { revalidateOnChange, revalidateOnDelete } from '../hooks/revalidateRoutes';

export const Ciclos: CollectionConfig = {
  slug: 'ciclos',
  labels: { singular: 'Ciclo', plural: 'Ciclos' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'nombre_ciclo', 'fecha', 'estado'],
    group: 'Eventos',
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
    {
      name: 'nombre_ciclo',
      label: 'Nombre del ciclo',
      type: 'text',
      admin: { description: 'Ej.: "Usina Debate", "Jornadas CPACF".' },
    },
    { name: 'resumen', label: 'Resumen', type: 'richText', required: true, localized: true },
    { name: 'fecha', label: 'Fecha', type: 'date', required: true },
    {
      name: 'oradores',
      label: 'Oradores',
      type: 'relationship',
      relationTo: 'autores',
      hasMany: true,
    },
    {
      name: 'sede',
      label: 'Sede',
      type: 'group',
      fields: [
        { name: 'institucion', label: 'Institución', type: 'text', localized: true },
        { name: 'ciudad', label: 'Ciudad', type: 'text' },
      ],
    },
    { name: 'video_url', label: 'URL del video', type: 'text' },
    {
      name: 'dossier_relacionado',
      label: 'Dossier relacionado',
      type: 'relationship',
      relationTo: 'dossiers',
    },
    {
      name: 'materiales_adjuntos',
      label: 'Materiales adjuntos',
      type: 'array',
      fields: [
        { name: 'titulo', label: 'Título', type: 'text', localized: true },
        { name: 'archivo', label: 'Archivo', type: 'upload', relationTo: 'media' },
      ],
    },
    ...commonFields,
  ],
};
