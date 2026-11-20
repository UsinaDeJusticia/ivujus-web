import type { NextConfig } from 'next';

import { WP_HOSTNAME, WP_ORIGIN } from './src/lib/wordpress/origin';

// Mapeo de URLs viejas de WordPress (ivujus.org.ar, pre-migracion) a las
// rutas nuevas bajo `/[locale]`. Ver docs/MIGRATION-MATRIX.md y
// docs/CONTENT-MIGRATION-LEDGER.md para el detalle item por item.
//
// Decision de locale: el sitio viejo no tenia prefijo de idioma y no existe
// deteccion de locale por middleware en este repo (no hay
// `src/middleware.ts` ni pagina en `/` fuera de `[locale]`), asi que
// cualquier request a `/` sin locale ya 404ea hoy. Para no agregar esa pieza
// fuera de alcance de esta fase, los redirects apuntan directo a `/es/...`
// (el locale por defecto / unico con contenido real) en vez de a la raiz
// sin locale. Cuando exista deteccion de locale real, este mapeo se puede
// simplificar para apuntar a la ruta sin prefijo.
//
// Los permalinks de WordPress para paginas usan barra final
// (`/nosotros/`), pero no hace falta declarar esa variante: Next normaliza
// trailing slash con un 308 propio (`trailingSlash` no esta seteado, default
// `false`) antes de llegar a estas reglas — verificado con
// `curl -D- http://localhost:3000/nosotros/` -> 308 a `/nosotros`, que a su
// vez cae en la regla de abajo -> 308 a `/es/instituto`. Un segundo hop, pero
// sin necesidad de duplicar cada entrada.
const wpLegacyRedirects: Array<{ source: string; destination: string }> = [
  { source: '/nosotros', destination: '/es/instituto' },
  { source: '/comite-cientifico', destination: '/es/instituto/comite-cientifico' },
  { source: '/campus-virtual', destination: '/es/formacion/diplomatura' },
  { source: '/capacitacion-y-actividades', destination: '/es/formacion/ciclos' },
  { source: '/entrevistas-en-la-radio', destination: '/es/formacion/ciclos/entrevistas-en-radios' },
  // Las tres páginas planas reservadas desde el repositorio de Usina se
  // fusionan en las dos landings de Formación, sin conservar una ruta vacía.
  { source: '/capacitacion', destination: '/es/formacion' },
  { source: '/inscripcion-al-curso-de-victimologia', destination: '/es/formacion/diplomatura' },
  { source: '/preinscripcion-al-curso', destination: '/es/formacion/diplomatura' },
  { source: '/blog', destination: '/es/novedades' },
  // Posts del WordPress de IVUJUS: conservar sus permalinks históricos al
  // pasar al archivo localizado de Novedades. Los tres slugs que tenían
  // emojis se mantienen percent-encoded tal como los entrega WordPress.
  {
    source:
      '/felicitamos-a-hilda-marchiori-por-el-reconocimiento-a-su-trayectoria-en-la-asistencia-a-las-victimas',
    destination:
      '/es/novedades/felicitamos-a-hilda-marchiori-por-el-reconocimiento-a-su-trayectoria-en-la-asistencia-a-las-victimas',
  },
  {
    source:
      '/alianza-academica-internacional-ivujus-e-indodpro-promueven-la-convencion-interamericana-para-los-derechos-de-las-victimas',
    destination:
      '/es/novedades/alianza-academica-internacional-ivujus-e-indodpro-promueven-la-convencion-interamericana-para-los-derechos-de-las-victimas',
  },
  {
    source:
      '/aporte-normativo-y-academico-texto-completo-del-proyecto-de-convencion-interamericana-sobre-derechos-de-las-victimas',
    destination:
      '/es/novedades/aporte-normativo-y-academico-texto-completo-del-proyecto-de-convencion-interamericana-sobre-derechos-de-las-victimas',
  },
  {
    source:
      '/hito-en-la-justicia-argentina-sera-sede-del-primer-simposio-americano-y-europeo-de-victimologia-penal',
    destination:
      '/es/novedades/hito-en-la-justicia-argentina-sera-sede-del-primer-simposio-americano-y-europeo-de-victimologia-penal',
  },
  {
    source: '/el-ivujus-presente-en-el-ciclo-de-formacion-2026',
    destination: '/es/novedades/el-ivujus-presente-en-el-ciclo-de-formacion-2026',
  },
  {
    source: '/reconocimiento-a-marcelo-aebi',
    destination: '/es/novedades/reconocimiento-a-marcelo-aebi',
  },
  {
    source:
      '/%e2%9a%96%ef%b8%8f%f0%9f%92%bb-asi-vivimos-la-jornada-hacia-un-derecho-cientifico-en-el-cpacf',
    destination:
      '/es/novedades/asi-vivimos-la-jornada-hacia-un-derecho-cientifico-en-el-cpacf',
  },
  {
    source: '/usina-de-justicia-lanza-el-primer-indice-de-calidad-legislativa-enfocado-en-victimas',
    destination:
      '/es/novedades/usina-de-justicia-lanza-el-primer-indice-de-calidad-legislativa-enfocado-en-victimas',
  },
  {
    source: '/%f0%9f%93%96-resumen-de-la-presentacion-nuevos-paradigmas-para-la-justicia-penal',
    destination:
      '/es/novedades/resumen-de-la-presentacion-nuevos-paradigmas-para-la-justicia-penal',
  },
  {
    source: '/usina-de-justicia-presenta-el-libro-nuevos-paradigmas-para-la-justicia-penal',
    destination:
      '/es/novedades/usina-de-justicia-presenta-el-libro-nuevos-paradigmas-para-la-justicia-penal',
  },
  {
    source: '/jornada-en-el-cpacf-derecho-y-algoritmos-%e2%9a%96%ef%b8%8f%f0%9f%92%bb',
    destination: '/es/novedades/jornada-en-el-cpacf-derecho-y-algoritmos',
  },
  {
    source: '/encuentro-empresarial-argentina-israel-2025',
    destination: '/es/novedades/encuentro-empresarial-argentina-israel-2025',
  },
  {
    source: '/la-esc-difundio-las-proximas-presentaciones-de-usina-de-justicia',
    destination: '/es/novedades/la-esc-difundio-las-proximas-presentaciones-de-usina-de-justicia',
  },
  {
    source:
      '/en-el-marco-de-la-presentacion-del-indice-legislativo-de-usina-de-justicia-marcelo-aebi-miembro-de-nuestro-comite-cientifico-nos-invita-a-reflexionar-sobre-el-derecho-cientifico',
    destination: '/es/novedades/marcelo-aebi-reflexiona-sobre-el-derecho-cientifico',
  },
  { source: '/simposio-2026', destination: '/es/simposios/2026-buenos-aires' },
  // `suscripcion` no se migra como pagina propia (decision cerrada en
  // CONTENT-MIGRATION-LEDGER.md): el alta a Perfit vive en la franja
  // newsletter, hoy embebida en `novedades`.
  { source: '/suscripcion', destination: '/es/novedades' },
  { source: '/contacto', destination: '/es/contacto' },
  { source: '/terms-privacy', destination: '/es/terms-privacy' },
];

// Rutas que siguen siendo del WordPress (Campus LearnDash, tienda
// WooCommerce, archivos y administración). Cuando el WordPress se muda a
// cms.ivujus.org.ar y ivujus.org.ar pasa a servir este sitio, los enlaces y
// favoritos viejos (por ejemplo, el de los alumnos a /mi-cuenta-2) llegan
// acá: se reenvían al WordPress conservando el resto de la ruta.
//
// Solo se activan si el WordPress está en otro host. Mientras WP_ORIGIN sea
// ivujus.org.ar, reenviar ahí desde ivujus.org.ar sería un bucle.
const wpOperationalPaths = [
  '/mi-cuenta-2/:path*',
  '/carrito/:path*',
  '/finalizar-compra-2/:path*',
  '/tienda/:path*',
  '/producto/:path*',
  '/categoria-producto/:path*',
  '/gracias/:path*',
  '/preguntas-frecuentes/:path*',
  '/guia-rapida/:path*',
  '/servicio/:path*',
  '/encuesta-de-calidad-de-servicio/:path*',
  '/courses/:path*',
  '/lessons/:path*',
  '/topic/:path*',
  '/quizzes/:path*',
  '/certificates/:path*',
  '/groups/:path*',
  '/exams/:path*',
  '/wp-content/:path*',
  '/wp-includes/:path*',
  '/wp-admin/:path*',
  '/wp-json/:path*',
  '/wp-login.php',
  '/feed/:path*',
];

const SITE_HOSTNAMES = new Set(['ivujus.org.ar', 'www.ivujus.org.ar']);

function wordpressRedirects() {
  if (SITE_HOSTNAMES.has(WP_HOSTNAME)) return [];
  return wpOperationalPaths.map((source) => ({
    source,
    destination: `${WP_ORIGIN}${source}`,
    // 307: si algún día una de estas rutas pasa a este sitio, que los
    // navegadores no tengan cacheado un reenvío permanente.
    permanent: false,
  }));
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [...wordpressRedirects(), ...wpLegacyRedirects.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }))].concat({
      // WordPress mantiene esta página como un stub que redirige a la app
      // externa de la campaña; conservarlo evita perder ese acceso histórico.
      source: '/victimasconderechos',
      destination: 'https://victimas-derechos-app.vercel.app',
      permanent: false,
    });
  },
  // Lighthouse audita `valid-source-maps` dentro de "buenas prácticas" y lo
  // reprueba cuando un archivo JS grande no tiene mapa. Apareció al sumar
  // `three` para la vidriera de la Biblioteca: su chunk cruza ese umbral y
  // bajaba la categoría de 100 a 96 en esa ruta.
  //
  // El costo de activarlo es peso de deploy (los .map solo los descarga quien
  // abre las herramientas de desarrollo, nunca un visitante) y que el código
  // del cliente queda legible — que en un sitio institucional público, sin
  // secretos en el frontend, no es una pérdida real.
  productionBrowserSourceMaps: true,
  images: {
    // Consumo en Vercel: cada imagen optimizada se cachea 31 días en vez de
    // las 4 h por defecto, y solo se generan anchos de la lista acotada de
    // abajo. Las fotos del WordPress casi nunca cambian; si una cambia, se
    // sube con otro nombre de archivo.
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [96, 256, 384],
    formats: ['image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
      // Fotos de personas (Consejo/Comité) hotlinkeadas desde el WordPress
      // de Usina — ver src/lib/instituto.ts. `www.ivujus.org.ar` agregado
      // por las dudas aunque los datos actuales usan el host sin `www`.
      { protocol: 'https', hostname: 'ivujus.org.ar' },
      { protocol: 'https', hostname: 'www.ivujus.org.ar' },
      // WordPress de IVUJUS desde el cambio de dominio (ver
      // src/lib/wordpress/origin.ts). Se declara siempre para que el día del
      // cambio solo haya que modificar la variable de entorno.
      { protocol: 'https', hostname: 'cms.ivujus.org.ar' },
      { protocol: 'https', hostname: WP_HOSTNAME },
      // Foto del encuentro en la Facultad de Derecho (UBA) — ver
      // src/lib/encuentros.ts. WordPress del sitio hermano Usina de
      // Justicia (constatado vía su propia REST API, 2026-08-02).
      { protocol: 'https', hostname: 'usinadejusticia.org.ar' },
      // Imágenes de cobertura de prensa del Simposio 2026 — ver
      // src/lib/simposio2026.ts (`press[].image`).
      { protocol: 'https', hostname: 'www.infobae.com' },
      { protocol: 'https', hostname: 'defonline.com.ar' },
      { protocol: 'https', hostname: 'revistaquorum.com.ar' },
    ],
  },
};

// Payload (CMS del brief de abril) quedó sin uso desde que se decidió seguir
// con WordPress. Su panel /admin y su API se retiraron del sitio el
// 20-nov-2026; el código de colecciones sigue en src/ por si se retoma, pero
// ya no se publica ni se conecta a la base de datos.
export default nextConfig;
