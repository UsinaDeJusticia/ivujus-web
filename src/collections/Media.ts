import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Archivo',
    plural: 'Biblioteca de medios',
  },
  admin: {
    useAsTitle: 'filename',
  },
  upload: true,
  fields: [
    {
      name: 'alt',
      label: 'Texto alternativo',
      type: 'text',
      localized: true,
      admin: {
        description: 'Crítico para accesibilidad y SEO. Describir la imagen en una oración.',
      },
    },
    {
      name: 'credito',
      label: 'Crédito / fuente',
      type: 'text',
      localized: true,
    },
  ],
};
