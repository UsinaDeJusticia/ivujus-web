// Tipos del dataset de Términos y política de privacidad.
// Ver comentario de cabecera en es.ts para la procedencia del contenido.

export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  documentTitle: string;
  subtitle: string;
  source: {
    label: string;
    url: string;
    fetchedAt: string;
  };
  // Aviso de traducción de cortesía (docs/GLOSARIO-TRADUCCION.md §7,
  // "Documentos legales — traducción de cortesía"). Presente en EN y FR;
  // ausente en ES, que es la única versión con validez legal.
  nota?: string;
  intro: string;
  sections: LegalSection[];
};
