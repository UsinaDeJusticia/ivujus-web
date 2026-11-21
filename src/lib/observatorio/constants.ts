// Direcciones de las herramientas del Observatorio. Viven una sola vez acá
// (no una copia por idioma) porque son datos invariantes.
//
// Mapa Nacional del Delito: aplicación de Usina de Justicia (proyecto Vercel
// `mapa-delito-usina`), servida desde el 21-nov-2026 en mapa.ivujus.org.ar
// (CNAME en Hostinger, certificado de Vercel). La dirección
// mapa-delito-usina.vercel.app sigue funcionando.
// La clave de Google Maps autoriza mapa.ivujus.org.ar desde el 21-nov-2026
// (antes fallaba con «AuthFailure»).
export const MAPA_DEL_DELITO_URL = 'https://mapa.ivujus.org.ar/mapa-del-delito';
