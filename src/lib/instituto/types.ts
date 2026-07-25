export type InstitutePurpose = {
  title: string;
  body: string;
};

export type InstitutePerson = {
  slug: string;
  name: string;
  role: string;
  country?: string;
  summary: string;
  bio: string;
  image: string;
};

export type InstituteSection = {
  title: string;
  body: string;
  href: string;
};

export type InstituteStatute = {
  heading: string;
  /**
   * Aviso de traducción de cortesía (docs/GLOSARIO-TRADUCCION.md §7). Solo se
   * completa en EN/FR: el español es el texto con validez legal y no
   * necesita la aclaración, así que queda `undefined` en `es.ts`.
   */
  courtesyNotice?: string;
  articles: string[];
};

export type InstitutoData = {
  title: string;
  intro: string;
  purposes: InstitutePurpose[];
  consejoDirectivo: InstitutePerson[];
  comiteCientifico: InstitutePerson[];
  estatuto: InstituteStatute;
  sections: InstituteSection[];
};
