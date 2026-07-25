import type { ContactoCopy } from './types';

// Solo copy/labels de UI (siguiendo el patrón de NAV_COPY en
// src/app/(frontend)/[locale]/layout.tsx): esta ruta no tiene cuerpo
// institucional en prosa más allá de este copy corto.
export const copy: ContactoCopy = {
  eyebrow: 'Contacto',
  title: 'Escribir al Instituto de Victimología de Usina de Justicia.',
  directHeading: 'Vía directa',
  directLead:
    'Para consultas institucionales, académicas o de prensa, puede escribir directamente a la casilla oficial del Instituto.',
  formHeading: 'Formulario de contacto',
  formLead:
    'Este formulario todavía no envía el mensaje de forma automática. Mientras tanto, use la vía directa por correo electrónico.',
  labels: {
    nombre: 'Nombre',
    email: 'Correo electrónico',
    asunto: 'Asunto',
    mensaje: 'Mensaje',
    enviar: 'Enviar',
  },
};
