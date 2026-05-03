import type { Field } from 'payload';

export const commonFields: Field[] = [
  {
    name: 'estado',
    label: 'Estado',
    type: 'select',
    required: true,
    defaultValue: 'borrador',
    options: [
      { label: 'Borrador', value: 'borrador' },
      { label: 'En revisión', value: 'en_revision' },
      { label: 'Pendiente revisión autor', value: 'pendiente_autor' },
      { label: 'Publicado', value: 'publicado' },
      { label: 'Archivado', value: 'archivado' },
    ],
  },
  {
    name: 'fuente',
    label: 'Origen del contenido',
    type: 'select',
    required: true,
    defaultValue: 'humano',
    admin: {
      description: 'Origen del contenido. Crítico para auditoría futura.',
      position: 'sidebar',
    },
    options: [
      { label: 'Humano', value: 'humano' },
      { label: 'Agente IA', value: 'agente_ai' },
      { label: 'Migración WordPress', value: 'migracion_wp' },
      { label: 'Migración desde Usina', value: 'migracion_usina' },
    ],
  },
  {
    name: 'agente_metadata',
    label: 'Metadatos del agente',
    type: 'json',
    admin: {
      description:
        'Modelo, versión del prompt, timestamp y costo del agente que generó el contenido. Solo aplica si el origen es "Agente IA".',
      condition: (data) => data?.fuente === 'agente_ai',
      position: 'sidebar',
    },
  },
  {
    name: 'revisado_por',
    label: 'Revisado por',
    type: 'relationship',
    relationTo: 'users',
    admin: {
      description: 'Usuario humano que aprobó el contenido. Vacío hasta que pase a publicado.',
      position: 'sidebar',
    },
  },
  {
    name: 'traduccion_estado',
    label: 'Estado de traducción',
    type: 'select',
    defaultValue: 'pendiente',
    admin: { position: 'sidebar' },
    options: [
      { label: 'Pendiente', value: 'pendiente' },
      { label: 'Traducción automática', value: 'automatica' },
      { label: 'Revisada por humano', value: 'revisada_humano' },
      { label: 'Publicada', value: 'publicada' },
    ],
  },
  {
    name: 'requiere_revision_autor',
    label: 'Requiere revisión del autor',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      description:
        'Marcar para artículos firmados por autores externos. Bloquea la publicación automática de la traducción.',
      position: 'sidebar',
    },
  },
  {
    name: 'publicado_en',
    label: 'Publicado en',
    type: 'date',
    admin: {
      description: 'Fecha de publicación pública. Puede diferir de la fecha de creación.',
      position: 'sidebar',
      date: { pickerAppearance: 'dayAndTime' },
    },
  },
];
