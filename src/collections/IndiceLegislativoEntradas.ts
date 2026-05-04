import type { CollectionConfig } from 'payload';

import { commonFields } from './fields/commonFields';
import { generateSlug } from '../hooks/generateSlug';
import { revalidateOnChange, revalidateOnDelete } from '../hooks/revalidateRoutes';
import { translateContent } from '../hooks/translateContent';

export const IndiceLegislativoEntradas: CollectionConfig = {
  slug: 'indice-legislativo-entradas',
  labels: {
    singular: 'Entrada del Índice Legislativo',
    plural: 'Entradas del Índice Legislativo',
  },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'tipo_norma', 'jurisdiccion', 'puntaje', 'estado'],
    group: 'Índice Legislativo',
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
      name: 'tipo_norma',
      label: 'Tipo de norma',
      type: 'select',
      options: [
        { label: 'Ley nacional', value: 'ley_nacional' },
        { label: 'Ley provincial', value: 'ley_provincial' },
        { label: 'Decreto', value: 'decreto' },
        { label: 'Proyecto de ley', value: 'proyecto_ley' },
        { label: 'Fallo judicial', value: 'fallo_judicial' },
      ],
    },
    { name: 'numero_norma', label: 'Número de norma', type: 'text' },
    { name: 'jurisdiccion', label: 'Jurisdicción', type: 'text' },
    { name: 'fecha_sancion', label: 'Fecha de sanción', type: 'date' },
    {
      name: 'puntaje',
      label: 'Puntaje del Índice',
      type: 'number',
      admin: { description: 'Escala a definir junto con la metodología pública.' },
    },
    {
      name: 'dimensiones_evaluadas',
      label: 'Dimensiones evaluadas',
      type: 'array',
      fields: [
        { name: 'dimension', label: 'Dimensión', type: 'text', localized: true },
        { name: 'puntaje_dimension', label: 'Puntaje de la dimensión', type: 'number' },
        { name: 'fundamentacion', label: 'Fundamentación', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'analisis_completo',
      label: 'Análisis completo',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'autores_analisis',
      label: 'Autores del análisis',
      type: 'relationship',
      relationTo: 'autores',
      hasMany: true,
    },
    ...commonFields,
  ],
};
