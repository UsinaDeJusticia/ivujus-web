// Tipos de la Biblioteca: la vidriera que reúne todo el material editorial
// del IVUJUS en un solo lugar (libros propios y recomendados, dossiers y
// declaraciones).
//
// La Biblioteca NO guarda copias de ese material: se compone en la página
// desde los datasets que ya lo tienen (`src/lib/publicaciones`,
// `src/lib/simposio2026`) y enlaza a la página canónica de cada pieza. La
// regla 3 de docs/GOBERNANZA-CONTENIDO.md es explícita: enlazar, no duplicar.
// Por eso lo único que este dataset define como contenido propio son los
// libros recomendados, que no existen en ningún otro lado.

export type LibroRecomendado = {
  slug: string;
  titulo: string;
  autores: string[];
  anio: string;
  editorial?: string;
  coverImage: string;
  coverAlt: string;
  /** Dos o tres frases. Nunca el texto completo de la obra. */
  resumen: string;
  // Deliberadamente NO existe un campo `pdfUrl` en este tipo.
  //
  // De un libro recomendado publicamos un resumen y el enlace a su sitio
  // oficial de compra, nunca la obra completa. Al no declarar el campo, subir
  // el PDF de un tercero deja de ser un descuido posible y pasa a ser un error
  // de compilación. Es la forma más barata de sostener la regla 1 de
  // gobernanza (derechos de terceros confirmados) sin depender de que alguien
  // recuerde revisarla.
  compraUrl: string;
  /** «Comprar en …» — el nombre del sitio va en el label, que sí se traduce. */
  compraLabel: string;
};

export type BibliotecaLabels = {
  biblioteca: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  lead: string;
  /** Descripción de la vidriera para quien no la ve (texto real, no alt de canvas). */
  vidrieraNota: string;
  librosPropiosTitle: string;
  librosPropiosLead: string;
  librosRecomendadosTitle: string;
  librosRecomendadosLead: string;
  dossiersTitle: string;
  dossiersLead: string;
  declaracionesTitle: string;
  declaracionesLead: string;
  verFicha: string;
  verDossiers: string;
  verDeclaracion: string;
};

export type BibliotecaLocaleContent = {
  labels: BibliotecaLabels;
  librosRecomendados: LibroRecomendado[];
};
