import type { CollectionConfig } from 'payload';

import { commonFields } from './fields/commonFields';
import { generateSlug } from '../hooks/generateSlug';
import { revalidateOnChange, revalidateOnDelete } from '../hooks/revalidateRoutes';
import { translateContent } from '../hooks/translateContent';

export const Simposios: CollectionConfig = {
  slug: 'simposios',
  labels: { singular: 'Simposio', plural: 'Simposios' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'numero_edicion', 'anio', 'estado'],
    group: 'Eventos',
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
      name: 'numero_edicion',
      label: 'Número de edición',
      type: 'number',
      required: true,
      admin: { description: '1, 2, 3...' },
    },
    { name: 'anio', label: 'Año', type: 'number', required: true },
    { name: 'fecha_inicio', label: 'Fecha de inicio', type: 'date', required: true },
    { name: 'fecha_fin', label: 'Fecha de fin', type: 'date', required: true },
    {
      name: 'sede',
      label: 'Sede',
      type: 'group',
      fields: [
        {
          name: 'institucion_organizadora',
          label: 'Institución organizadora',
          type: 'text',
          localized: true,
        },
        { name: 'ciudad', label: 'Ciudad', type: 'text' },
        { name: 'pais', label: 'País', type: 'text' },
        { name: 'direccion', label: 'Dirección', type: 'text' },
      ],
    },
    { name: 'resumen', label: 'Resumen', type: 'richText', required: true, localized: true },
    {
      name: 'temario',
      label: 'Temario',
      type: 'array',
      fields: [
        { name: 'titulo', label: 'Título', type: 'text', localized: true },
        { name: 'descripcion', label: 'Descripción', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'oradores',
      label: 'Oradores',
      type: 'relationship',
      relationTo: 'autores',
      hasMany: true,
    },
    {
      name: 'instituciones_convocantes',
      label: 'Instituciones convocantes',
      type: 'relationship',
      relationTo: 'instituciones',
      hasMany: true,
    },
    {
      name: 'programa_pdf',
      label: 'Programa (PDF)',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'sitio_externo',
      label: 'Sitio externo',
      type: 'text',
      admin: {
        description: 'Ej.: simposiousinadejusticia.org.ar para la edición 2026.',
      },
    },
    {
      name: 'declaracion_final',
      label: 'Declaración final',
      type: 'relationship',
      relationTo: 'declaraciones',
      admin: { description: 'Ej.: Declaración de Buenos Aires.' },
    },
    {
      name: 'premios_entregados',
      label: 'Premios entregados',
      type: 'array',
      labels: { singular: 'Premio', plural: 'Premios' },
      admin: {
        description:
          'Premios Oficina de Justicia y similares. Modelado como bloque opcional dentro del simposio (sin sección /premios/ propia).',
      },
      fields: [
        { name: 'categoria', label: 'Categoría', type: 'text', localized: true },
        { name: 'ganador_nombre', label: 'Ganador (nombre)', type: 'text' },
        {
          name: 'ganador_relacionado',
          label: 'Ganador (perfil)',
          type: 'relationship',
          relationTo: 'autores',
        },
        { name: 'fundamentacion', label: 'Fundamentación', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'galeria',
      label: 'Galería',
      type: 'array',
      fields: [
        { name: 'imagen', label: 'Imagen', type: 'upload', relationTo: 'media', required: true },
        { name: 'epigrafe', label: 'Epígrafe', type: 'text', localized: true },
      ],
    },
    {
      name: 'videos',
      label: 'Videos',
      type: 'array',
      fields: [
        { name: 'titulo', label: 'Título', type: 'text', localized: true },
        { name: 'url_youtube', label: 'URL de YouTube', type: 'text', required: true },
        { name: 'descripcion', label: 'Descripción', type: 'textarea', localized: true },
      ],
    },
    ...commonFields,
  ],
};
