// Direcciones de las herramientas del Observatorio. Viven una sola vez acá
// (no una copia por idioma) porque son datos invariantes.
//
// Mapa Nacional del Delito: aplicación de Usina de Justicia (proyecto Vercel
// `mapa-delito-usina`), servida desde el 21-nov-2026 en mapa.ivujus.org.ar
// (CNAME en Hostinger, certificado de Vercel). La dirección
// mapa-delito-usina.vercel.app sigue funcionando.
// PROVISORIO (21-nov-2026): en mapa.ivujus.org.ar el mapa falla con
// «AuthFailure» porque la clave de Google Maps no autoriza ese dominio.
// Hasta que se agregue `https://mapa.ivujus.org.ar/*` a los referentes
// permitidos de la clave (Google Cloud → Credenciales), el botón usa la
// dirección de vercel.app. Después, volver a:
//   'https://mapa.ivujus.org.ar/mapa-del-delito'
export const MAPA_DEL_DELITO_URL = 'https://mapa-delito-usina.vercel.app/mapa-del-delito';
