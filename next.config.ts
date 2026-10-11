import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

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

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return wpLegacyRedirects.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    })).concat({
      // WordPress mantiene esta página como un stub que redirige a la app
      // externa de la campaña; conservarlo evita perder ese acceso histórico.
      source: '/victimasconderechos',
      destination: 'https://victimas-derechos-app.vercel.app',
      permanent: false,
    });
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
      // Fotos de personas (Consejo/Comité) hotlinkeadas desde el WordPress
      // de Usina — ver src/lib/instituto.ts. `www.ivujus.org.ar` agregado
      // por las dudas aunque los datos actuales usan el host sin `www`.
      { protocol: 'https', hostname: 'ivujus.org.ar' },
      { protocol: 'https', hostname: 'www.ivujus.org.ar' },
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

export default withPayload(nextConfig, { devBundleServerPackages: false });
