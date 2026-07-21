// contacto.ts — dataset y copy localizado de /[locale]/contacto.
//
// Correo institucional tomado verbatim de la fuente oficial del design
// system: docs/reference/design-system-oficial/README.md, sección
// "Superficies del producto" → "Contacto: `info@ivujus.org.ar`".
export const INSTITUTIONAL_EMAIL = 'info@ivujus.org.ar';

const LOCALES = ['es', 'en', 'fr'] as const;
export type ContactoLocale = (typeof LOCALES)[number];

export type ContactoCopy = {
  eyebrow: string;
  title: string;
  directHeading: string;
  directLead: string;
  formHeading: string;
  formLead: string;
  labels: {
    nombre: string;
    email: string;
    asunto: string;
    mensaje: string;
    enviar: string;
  };
};

// Solo copy/labels de UI (siguiendo el patrón de NAV_COPY en
// src/app/(frontend)/[locale]/layout.tsx): el cuerpo institucional en
// prosa se mantiene en español, como en el resto de las rutas ya
// existentes (ver comentario en formacion/page.tsx sobre Fase 3 v1: ES →
// EN vía pipeline automático, FR sin traducir todavía).
export const contactoCopy: Record<ContactoLocale, ContactoCopy> = {
  es: {
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
  },
  en: {
    eyebrow: 'Contact',
    title: 'Write to the Institute of Victimology of Usina de Justicia.',
    directHeading: 'Direct channel',
    directLead:
      'For institutional, academic or press inquiries, you can write directly to the Institute’s official inbox.',
    formHeading: 'Contact form',
    formLead:
      'This form does not send the message automatically yet. In the meantime, please use the direct email channel.',
    labels: {
      nombre: 'Name',
      email: 'Email address',
      asunto: 'Subject',
      mensaje: 'Message',
      enviar: 'Send',
    },
  },
  fr: {
    eyebrow: 'Contact',
    title: 'Écrire à l’Institut de Victimologie d’Usina de Justicia.',
    directHeading: 'Voie directe',
    directLead:
      'Pour toute demande institutionnelle, académique ou de presse, vous pouvez écrire directement à l’adresse officielle de l’Institut.',
    formHeading: 'Formulaire de contact',
    formLead:
      'Ce formulaire n’envoie pas encore le message automatiquement. En attendant, utilisez la voie directe par courrier électronique.',
    labels: {
      nombre: 'Nom',
      email: 'Adresse e-mail',
      asunto: 'Objet',
      mensaje: 'Message',
      enviar: 'Envoyer',
    },
  },
};

export function resolveContactoLocale(locale: string): ContactoLocale {
  return (LOCALES as readonly string[]).includes(locale) ? (locale as ContactoLocale) : 'es';
}
