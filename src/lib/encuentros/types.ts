// Tipos del dataset "Encuentros y conferencias", la subsección de Eventos
// académicos que reúne actividades del IVUJUS distintas del Simposio 2026
// (presentaciones de libros, jornadas externas con participación de
// miembros del instituto). Ver comentario de cabecera en index.ts para las
// fuentes de cada entrada.

export type EncuentroImagen = {
  // Ruta local (public/eventos/...) o URL remota hotlinkeada — invariante en
  // los tres idiomas.
  src: string;
  alt: string;
};

export type EncuentroEnlace = {
  label: string;
  url: string;
  // Presente solo si el enlace lleva a un artículo redactado en español (ver
  // docs/GLOSARIO-TRADUCCION.md §7): "Article published in Spanish." / etc.
  // Ausente en español.
  notaIdioma?: string;
};

export type Encuentro = {
  slug: string;
  titulo: string;
  // Texto libre por idioma ("24 de abril de 2025" / "24 April 2025" / "24
  // avril 2025"), igual que Dossier.fecha: son fechas de un evento puntual,
  // no ISO.
  fecha: string;
  lugar?: string;
  modalidad?: string;
  // Ausente cuando el evento ya tiene su propia página en el sitio (ver
  // `enlaceInterno`): ese contenido no se duplica acá, se enlaza (regla de
  // gobernanza "fuente única, sin duplicar").
  resumen?: string;
  // Presente solo cuando `resumen` incluye una cita textual de una persona
  // real, pronunciada en español (glosario §7, "Citas textuales de
  // personas"): lleva el aviso de traducción de cortesía en inglés/francés.
  // Ausente en español.
  notaCita?: string;
  // Nombres de personas: invariantes por definición (glosario §6), pero el
  // campo se llama `oradores` para que scripts/check-i18n.ts los reconozca
  // como nombres propios (no exige traducción ni prohíbe la igualdad entre
  // idiomas).
  oradores?: string[];
  imagenes?: EncuentroImagen[];
  // Citas externas (prensa de terceros) — url invariante, label traducido.
  // Array porque un mismo evento puede tener cobertura de más de un medio.
  enlacesExternos?: EncuentroEnlace[];
  // Cross-link a una página propia del sitio que ya cubre este evento en
  // detalle (por ejemplo una novedad o la ficha de un libro). `href` es
  // invariante (mismo slug en los tres idiomas), `label` se traduce.
  enlaceInterno?: { label: string; href: string };
  sourcePosts?: Array<{ id: number; url: string }>;
};

export type EncuentrosLabels = {
  eventosAcademicos: string;
  encuentros: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  lead: string;
  modalidadLabel: string;
  lugarLabel: string;
  oradoresLabel: string;
  verEnlace: string;
  librosCardTitle: string;
  librosCardCta: string;
};

export type EncuentrosLocaleContent = {
  labels: EncuentrosLabels;
  items: Encuentro[];
};
