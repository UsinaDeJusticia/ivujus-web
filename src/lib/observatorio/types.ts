// Tipos del Observatorio del IVUJUS: el catálogo de herramientas de datos y
// análisis que el instituto presenta. Está pensado para crecer: cada
// herramienta nueva (el wrapped, el explicador de fallos, el Índice
// Legislativo, las estadísticas…) es una entrada más en `herramientas`, y con
// eso aparece sola en la portada del Observatorio, en su página propia, en el
// menú, en el sitemap y en llms.txt. No hace falta tocar componentes.
//
// Regla de la gobernanza (docs/GOBERNANZA-CONTENIDO.md): solo se suma una
// herramienta cuando existe y funciona. Nada de «próximamente».

export type Herramienta = {
  /** Ruta: /[locale]/observatorio/<slug>. Idéntico en los tres idiomas. */
  slug: string;
  /** Nombre propio de la herramienta. */
  nombre: string;
  /** Una línea: qué es. Se usa en el menú y en las tarjetas. */
  resumen: string;
  /** Párrafos de la página propia: qué hace, de dónde salen los datos. Solo hechos verificables. */
  descripcion: string[];
  /** Pares etiqueta/valor que se muestran como ficha (fuente, cobertura, etc.). */
  ficha: Array<{ etiqueta: string; valor: string }>;
  /** Quién la desarrolla y es su titular. */
  autoria: string;
  /** Línea de crédito visible, p. ej. «Una herramienta de Usina de Justicia presentada por el Observatorio del IVUJUS». */
  credito: string;
  /** Dónde se usa la herramienta (sitio externo). Idéntico en los tres idiomas. */
  url: string;
  /** Texto del botón para abrirla. */
  abrir: string;
  /** Aviso sobre el idioma de la herramienta cuando está solo en español. Vacío en `es`. */
  notaIdioma?: string;
  /** Fuente verificable de lo que dice esta ficha. Idéntica en los tres idiomas. */
  source_url: string;
};

export type ObservatorioLabels = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  lead: string;
  herramientasHeading: string;
  verHerramienta: string;
  fichaHeading: string;
  abreEnPestana: string;
  volver: string;
  breadcrumbHome: string;
};

export type ObservatorioContent = {
  labels: ObservatorioLabels;
  herramientas: Herramienta[];
};
