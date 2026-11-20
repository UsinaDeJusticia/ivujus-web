// Constantes técnicas del dataset de Formación. NO son contenido traducible:
// son URLs reales, idénticas en los tres idiomas (ver
// docs/GLOSARIO-TRADUCCION.md §6). Viven en su propio módulo para que solo
// existan una vez, en lugar de una copia por idioma.

// Fuente: el botón "Ingreso al Campus" del header de ivujus.org.ar (verificado
// el 20-nov-2026) y confirmación de Emanuel: la dirección que figuraba en el
// design system (usinadejusticiacampus.org.ar) no funciona.
// OJO en el cutover DNS: cuando ivujus.org.ar apunte a este sitio, esta URL
// dejará de llegar al WordPress. Antes de ese cambio el Campus tiene que
// mudarse a su propio host (p. ej. campus.ivujus.org.ar) y actualizarse acá.
export const CAMPUS_VIRTUAL_URL = 'https://ivujus.org.ar/mi-cuenta-2/';

// Fuente: href real dentro del HTML de la página `campus-virtual` de
// ivujus.org.ar (id 24055), enlace de texto "Programa Diplomatura en
// Victimología y leyes de víctimas".
export const DIPLOMATURA_PROGRAMA_PDF_URL =
  'https://ivujus.org.ar/wp-content/uploads/2025/09/Diplomatura.pdf';
