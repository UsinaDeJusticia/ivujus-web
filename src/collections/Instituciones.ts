import type { CollectionConfig } from 'payload';

import { commonFields } from './fields/commonFields';
import { generateSlug } from '../hooks/generateSlug';
import { revalidateOnChange, revalidateOnDelete } from '../hooks/revalidateRoutes';
import { translateContent } from '../hooks/translateContent';

export const Instituciones: CollectionConfig = {
  slug: 'instituciones',
  labels: { singular: 'Institución', plural: 'Instituciones' },
  admin: {
    useAsTitle: 'nombre_oficial',
    defaultColumns: ['nombre_oficial', 'tipo', 'pais', 'tipo_relacion'],
    group: 'Red Americano-Europea',
  },
  versions: { drafts: true },
  hooks: {
    beforeChange: [generateSlug('nombre_oficial')],
    afterChange: [translateContent, revalidateOnChange],
    afterDelete: [revalidateOnDelete],
  },
  fields: [
    { name: 'nombre_oficial', label: 'Nombre oficial', type: 'text', required: true },
    { name: 'slug', label: 'Slug', type: 'text', required: true, unique: true, index: true },
    { name: 'nombre_corto', label: 'Nombre corto', type: 'text' },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'select',
      options: [
        { label: 'Universidad', value: 'universidad' },
        { label: 'Instituto de investigación', value: 'instituto_investigacion' },
        { label: 'Oficina de asistencia a víctimas', value: 'oficina_asistencia' },
        { label: 'Colegio profesional', value: 'colegio_profesional' },
        { label: 'Organismo público', value: 'organismo_publico' },
        { label: 'Organización civil', value: 'organizacion_civil' },
      ],
    },
    { name: 'pais', label: 'País', type: 'text', required: true },
    { name: 'ciudad', label: 'Ciudad', type: 'text' },
    { name: 'sitio_web', label: 'Sitio web', type: 'text' },
    { name: 'logo', label: 'Logo', type: 'upload', relationTo: 'media' },
    { name: 'descripcion', label: 'Descripción', type: 'richText', localized: true },
    { name: 'fecha_adhesion', label: 'Fecha de adhesión', type: 'date' },
    {
      name: 'referente',
      label: 'Referente institucional',
      type: 'group',
      fields: [
        { name: 'nombre', label: 'Nombre', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'cargo', label: 'Cargo', type: 'text' },
      ],
    },
    {
      name: 'convenio_especifico',
      label: 'Tiene convenio específico',
      type: 'checkbox',
      admin: { description: 'Activar si tiene convenio activo con cupones 100% u otras condiciones.' },
    },
    {
      name: 'tipo_relacion',
      label: 'Tipo de relación',
      type: 'select',
      options: [
        { label: 'Miembro de la Red', value: 'miembro_red' },
        { label: 'Convenio formativo', value: 'convenio_formativo' },
        { label: 'Colaboración puntual', value: 'colaboracion' },
      ],
    },
    ...commonFields,
  ],
};
