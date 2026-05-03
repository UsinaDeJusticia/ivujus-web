import type { CollectionConfig } from 'payload';

import { generateSlug } from '../hooks/generateSlug';
import { revalidateOnChange, revalidateOnDelete } from '../hooks/revalidateRoutes';

export const Autores: CollectionConfig = {
  slug: 'autores',
  labels: { singular: 'Autor', plural: 'Autores' },
  admin: {
    useAsTitle: 'nombre_completo',
    defaultColumns: ['nombre_completo', 'rol_ivujus', 'pais', 'activo'],
    group: 'Personas',
  },
  hooks: {
    beforeChange: [generateSlug('nombre_completo')],
    afterChange: [revalidateOnChange],
    afterDelete: [revalidateOnDelete],
  },
  fields: [
    { name: 'nombre_completo', label: 'Nombre completo', type: 'text', required: true },
    { name: 'slug', label: 'Slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'titulo_academico',
      label: 'Título académico',
      type: 'text',
      localized: true,
      admin: { description: 'Ej.: "Doctora en Derecho".' },
    },
    {
      name: 'afiliacion_institucional',
      label: 'Afiliación institucional',
      type: 'text',
      localized: true,
    },
    { name: 'pais', label: 'País', type: 'text' },
    {
      name: 'bio_corta',
      label: 'Bio corta',
      type: 'textarea',
      localized: true,
      maxLength: 400,
    },
    { name: 'bio_completa', label: 'Bio completa', type: 'richText', localized: true },
    { name: 'foto', label: 'Foto', type: 'upload', relationTo: 'media' },
    {
      name: 'rol_ivujus',
      label: 'Rol en el IVUJUS',
      type: 'select',
      options: [
        { label: 'Consejo Directivo', value: 'consejo_directivo' },
        { label: 'Comité Científico', value: 'comite_cientifico' },
        { label: 'Autor invitado', value: 'invitado' },
      ],
    },
    {
      name: 'cargo',
      label: 'Cargo',
      type: 'text',
      localized: true,
      admin: {
        description: 'Solo si es Consejo Directivo. Ej.: "Directora", "Secretaria".',
        condition: (data) => data?.rol_ivujus === 'consejo_directivo',
      },
    },
    {
      name: 'enlaces_academicos',
      label: 'Enlaces académicos',
      type: 'group',
      fields: [
        { name: 'google_scholar', label: 'Google Scholar', type: 'text' },
        { name: 'orcid', label: 'ORCID', type: 'text' },
        { name: 'researchgate', label: 'ResearchGate', type: 'text' },
        { name: 'academia_edu', label: 'Academia.edu', type: 'text' },
        { name: 'wikipedia', label: 'Wikipedia', type: 'text' },
        {
          name: 'wikidata_id',
          label: 'Wikidata ID',
          type: 'text',
          admin: { description: 'Ej.: Q12345. Crítico para GEO.' },
        },
        { name: 'sitio_personal', label: 'Sitio personal', type: 'text' },
      ],
    },
    {
      name: 'orden',
      label: 'Orden',
      type: 'number',
      admin: {
        description: 'Orden de aparición en listados del Consejo y Comité.',
        position: 'sidebar',
      },
    },
    {
      name: 'activo',
      label: 'Activo',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
};
