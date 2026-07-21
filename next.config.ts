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
  { source: '/blog', destination: '/es/novedades' },
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
    }));
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
      // Imágenes de cobertura de prensa del Simposio 2026 — ver
      // src/lib/simposio2026.ts (`press[].image`).
      { protocol: 'https', hostname: 'www.infobae.com' },
      { protocol: 'https', hostname: 'defonline.com.ar' },
      { protocol: 'https', hostname: 'revistaquorum.com.ar' },
    ],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
