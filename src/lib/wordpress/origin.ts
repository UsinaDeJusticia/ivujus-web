// Dirección del WordPress de IVUJUS: el CMS donde el equipo sube las
// novedades y donde viven el Campus (LearnDash), la tienda (WooCommerce) y
// los archivos de `wp-content`. Este sitio NO reemplaza ese WordPress: lo
// consume.
//
// Hoy el WordPress responde en https://ivujus.org.ar. En el cambio de
// dominio pasa a https://cms.ivujus.org.ar y ivujus.org.ar queda para este
// sitio. Para que ese día no haya que tocar código, la dirección sale de
// una sola variable de entorno de Vercel: `NEXT_PUBLIC_WP_ORIGIN`.
// Es `NEXT_PUBLIC_` porque también la leen componentes de cliente y
// `next.config.ts`; no es un secreto.
//
// Cambiarla exige un redeploy: Next la incrusta en el build.

const DEFAULT_WP_ORIGIN = 'https://ivujus.org.ar';

function normalizeOrigin(value: string | undefined): string {
  const raw = (value ?? '').trim() || DEFAULT_WP_ORIGIN;
  try {
    const url = new URL(raw);
    return url.origin;
  } catch {
    return DEFAULT_WP_ORIGIN;
  }
}

export const WP_ORIGIN = normalizeOrigin(process.env.NEXT_PUBLIC_WP_ORIGIN);

export const WP_HOSTNAME = new URL(WP_ORIGIN).hostname;
