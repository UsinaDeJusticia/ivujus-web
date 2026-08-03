// Modelo compartido entre la versión plana de la vidriera (VidrieraPoster) y
// la escena WebGL (VidrieraTresD). Las dos dibujan exactamente las mismas
// piezas; solo cambia el motor.
//
// Sobre las tapas: no existe imagen de tapa real de ninguna de estas piezas
// (constatado el 3-ago-2026 en las bibliotecas de medios de ivujus.org.ar y
// usinadejusticia.org.ar). En vez de inventar imágenes, cada lomo se compone
// tipográficamente con el título real, como una encuadernación uniforme de
// biblioteca. Es honesto —no hay ninguna imagen fabricada— y de paso evita
// descargar texturas y el problema de CORS al usarlas en WebGL.

export type TipoPieza = 'libro' | 'dossier' | 'declaracion';

export type PiezaVidriera = {
  id: string;
  titulo: string;
  tipo: TipoPieza;
  anio: string;
  href: string;
};

/**
 * Colores de encuadernación por tipo, en pares [lomo, texto].
 *
 * Son valores fijos y no tokens `--ui-*` a propósito: la encuadernación es el
 * objeto representado, no la interfaz. Un libro azul sigue siendo azul en modo
 * sepia, igual que la tapa de un libro real no cambia de color según la luz de
 * la habitación. Lo que sí reacciona al tema es el entorno — fondo, estante y
 * luces — y eso se resuelve leyendo los tokens en VidrieraTresD.
 *
 * Los tres pares están verificados contra texto blanco por encima de 7:1
 * (WCAG AAA), así que el título es legible sobre cualquiera de ellos.
 *
 * Dos ajustes que salieron de mirar las capturas en los tres temas:
 * - El azul es más claro que el `azul-900` institucional. Con el azul oscuro,
 *   en modo oscuro el lomo se fundía con el fondo y el libro desaparecía como
 *   silueta: se leía el título flotando en el aire.
 * - La declaración es bordó y no azul. Con dos azules la fila quedaba con dos
 *   piezas indistinguibles en los extremos, y el bordó además se separa tanto
 *   del fondo azul del modo oscuro como de los marrones de los dossiers.
 */
export const COLOR_ENCUADERNACION: Record<TipoPieza, { lomo: string; texto: string }> = {
  libro: { lomo: '#1b4b7a', texto: '#ffffff' },
  dossier: { lomo: '#6b3f18', texto: '#ffffff' },
  declaracion: { lomo: '#6d2233', texto: '#ffffff' },
};

/**
 * Grosor relativo del lomo (0-1), derivado del tipo de pieza.
 *
 * Un libro es más grueso que un dossier y un dossier más que una declaración
 * de cinco artículos. No es un dato que tengamos cargado (no guardamos número
 * de páginas), así que se deriva del tipo: es una convención visual, no una
 * afirmación sobre el objeto.
 */
export const GROSOR_RELATIVO: Record<TipoPieza, number> = {
  libro: 1,
  dossier: 0.55,
  declaracion: 0.4,
};
