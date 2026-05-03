import type { CollectionConfig } from 'payload';

import { commonFields } from './fields/commonFields';
import { generateSlug } from '../hooks/generateSlug';
import { revalidateOnChange, revalidateOnDelete } from '../hooks/revalidateRoutes';

export const FichasGlosario: CollectionConfig = {
  slug: 'fichas-glosario',
  labels: { singular: 'Ficha del glosario', plural: 'Fichas del glosario' },
  admin: {
    useAsTitle: 'termino',
    defaultColumns: ['termino', 'disciplina', 'estado'],
    group: 'Producción editorial',
  },
  versions: { drafts: true },
  hooks: {
    beforeChange: [generateSlug('termino')],
    afterChange: [revalidateOnChange],
    afterDelete: [revalidateOnDelete],
  },
  fields: [
    { name: 'termino', label: 'Término', type: 'text', required: true, localized: true },
    { name: 'slug', label: 'Slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'definicion_canonica',
      label: 'Definición canónica',
      type: 'textarea',
      required: true,
      localized: true,
      maxLength: 500,
      admin: {
        description:
          'Primera oración de autoridad. Crítica para GEO: es la que los LLMs usan como definición.',
      },
    },
    { name: 'contenido_extendido', label: 'Contenido extendido', type: 'richText', localized: true },
    {
      name: 'disciplina',
      label: 'Disciplina',
      type: 'select',
      options: [
        { label: 'Victimología', value: 'victimologia' },
        { label: 'Criminología', value: 'criminologia' },
        { label: 'Derecho penal', value: 'derecho_penal' },
        { label: 'Derecho victimal', value: 'derecho_victimal' },
        { label: 'Psicología forense', value: 'psicologia_forense' },
      ],
    },
    {
      name: 'terminos_relacionados',
      label: 'Términos relacionados',
      type: 'relationship',
      relationTo: 'fichas-glosario',
      hasMany: true,
    },
    {
      name: 'autores_referencia',
      label: 'Autores de referencia',
      type: 'relationship',
      relationTo: 'autores',
      hasMany: true,
    },
    {
      name: 'articulos_relacionados',
      label: 'Artículos relacionados',
      type: 'relationship',
      relationTo: 'articulos',
      hasMany: true,
    },
    { name: 'equivalente_ingles', label: 'Equivalente en inglés', type: 'text' },
    { name: 'equivalente_frances', label: 'Equivalente en francés', type: 'text' },
    {
      name: 'nota_traduccion',
      label: 'Nota para el traductor',
      type: 'textarea',
      admin: {
        description:
          'Notas para el agente traductor. Ej.: "Derecho victimal no es victim law, es concepto acuñado por Lima Malvido. Mantener en español con gloss."',
      },
    },
    ...commonFields,
  ],
};
