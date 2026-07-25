export type SymposiumSession = {
  time: string;
  title: string;
  speakers?: string;
  summary?: string;
  youtubeUrl?: string;
  notes?: string;
};

export type SymposiumDay = {
  id: string;
  shortLabel: string;
  title: string;
  summary: string;
  sessions: SymposiumSession[];
};

export type PressArticle = {
  outlet: string;
  title: string;
  href: string;
  image: string;
  alt: string;
  // Los títulos de estas notas NUNCA se traducen (docs/GLOSARIO-TRADUCCION.md
  // §7, "Títulos de notas de prensa"): son artículos reales publicados en
  // español. En inglés y francés se agrega esta nota indicando el idioma del
  // artículo original; en español queda ausente.
  notaIdioma?: string;
};

export type GaleriaImagen = {
  imagen: string;
  alt: string;
  epigrafe?: string;
};

export type GaleriaCopy = {
  eyebrow: string;
  title: string;
};

export type SymposiumDeclaration = {
  title: string;
  intro: string;
  standards: string[];
  pdfUrl: string;
  pdfNote: string;
};

export type Simposio2026Content = {
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  dates: string;
  organizingInstitution: string;
  summary: string;
  highlights: string[];
  declaration: SymposiumDeclaration;
  days: SymposiumDay[];
  press: PressArticle[];
  galeria: GaleriaImagen[];
};

export type SimposioPayloadDraft = {
  titulo: string;
  slug: string;
  numero_edicion: number;
  anio: number;
  fecha_inicio: string;
  fecha_fin: string;
  sede: {
    institucion_organizadora: string;
    ciudad: string;
    pais: string;
  };
  resumen: string;
  temario: Array<{ titulo: string; descripcion: string }>;
  sitio_externo?: string;
  fuente: 'humano';
};

export type DeclaracionPayloadDraft = {
  titulo: string;
  slug: string;
  fecha: string;
  simposio_origen_slug_referencia: string;
  texto_completo_resumen: string;
  texto_completo_puntos: string[];
  pdf_url: string;
  fuente: 'humano';
};
