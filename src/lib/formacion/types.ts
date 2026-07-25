// Tipos del dataset de Formación (hub, Diplomatura y archivo de ciclos y
// jornadas). Compartidos por es.ts / en.ts / fr.ts — ver el comentario de
// cabecera de index.ts para el origen del contenido y las fuentes citadas.

export type FuenteContenido = 'migracion_usina' | 'migracion_wp';

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
