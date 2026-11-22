// Tipos del dataset de Formación (hub, Diplomatura y archivo de ciclos y
// jornadas). Compartidos por es.ts / en.ts / fr.ts — ver el comentario de
// cabecera de index.ts para el origen del contenido y las fuentes citadas.

export type FuenteContenido = 'migracion_usina' | 'migracion_wp';

/** Un tramo de texto de una respuesta: texto plano o un enlace. */
export type FaqSegmento = string | { texto: string; url: string };

export type FaqItem = {
  pregunta: string;
  /** Párrafos de la respuesta; cada párrafo es una lista de tramos. */
  respuesta: FaqSegmento[][];
};

/**
 * Preguntas frecuentes de la Diplomatura. Fuente: la página
 * `preguntas-frecuentes` del WordPress (cms.ivujus.org.ar, WP 21312),
 * adaptada a cómo funciona hoy el sitio (aprobado por Emanuel, 22-nov-2026).
 */
export type DiplomaturaFaq = {
  eyebrow: string;
  titulo: string;
  bajada: string;
  /** Aviso de que el Campus está en español. Vacío en `es`. */
  notaIdioma?: string;
  items: FaqItem[];
  source_wp_id: number;
  source_url: string;
};

export type Diplomatura = {
  titulo: string;
  nombreHistorico?: string;
  descripcion: string;
  metricas: {
    inscriptos: number;
    certificados: number;
    valoracion: string;
  };
  resenas: string[];
  programaPdfUrl: string;
  campusUrl: string;
  faq: DiplomaturaFaq;
  fuente: FuenteContenido;
  source_wp_id: number;
  source_url: string;
};

export type SesionCiclo = {
  oradores?: string[];
  video_url?: string;
};

export type DossierCiclo = {
  titulo: string;
  url: string;
};

export type Ciclo = {
  slug: string;
  titulo: string;
  fecha: string;
  resumen: string;
  oradores?: string[];
  video_url?: string;
  // Más de una charla/sesión con oradores y video propios (ej. un ciclo con
  // dos jornadas grabadas por separado).
  sesiones?: SesionCiclo[];
  dossier?: DossierCiclo;
  fuente: FuenteContenido;
  // Array cuando dos o más posts documentan el mismo evento y se fusionaron
  // en una sola entrada (ver nota puntual en cada caso, dentro de es.ts).
  source_wp_id: number | number[];
  source_url: string;
};

export type FormacionHub = {
  title: string;
  intro: string;
  sections: Array<{ title: string; body: string; href: string }>;
};

/** Contenido traducible completo de la sección Formación, por idioma. */
export type FormacionContent = {
  hub: FormacionHub;
  diplomatura: Diplomatura;
  ciclos: Ciclo[];
};
