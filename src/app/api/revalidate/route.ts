// Aviso de WordPress → sitio: actualiza las novedades al publicar.
//
// El WordPress de IVUJUS (cms.ivujus.org.ar) llama a esta ruta cada vez que
// se publica, edita, despublica o borra una entrada (mu-plugin en
// docs/wordpress/ivujus-avisar-sitio.php). Así las novedades se actualizan
// en el acto y el sitio no tiene que consultar al WordPress cada pocos
// minutos (que es lo que consume ejecuciones en Vercel). Las páginas
// conservan una revalidación de respaldo de 1 hora por si un aviso se pierde.
//
// Protección: el WordPress manda la clave compartida en la cabecera
// `x-ivujus-secret`. La clave vive en la variable de entorno
// WP_REVALIDATE_SECRET de Vercel y en wp-config.php; nunca en el repo.
import { timingSafeEqual } from 'node:crypto';

import { revalidatePath, revalidateTag } from 'next/cache';

function sameSecret(received: string, expected: string): boolean {
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request): Promise<Response> {
  const expected = process.env.WP_REVALIDATE_SECRET;
  if (!expected || expected.length < 32) {
    return Response.json({ ok: false, error: 'not-configured' }, { status: 503 });
  }

  const received = request.headers.get('x-ivujus-secret') ?? '';
  if (!sameSecret(received, expected)) {
    return Response.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  // `expire: 0`: la lista de posts del WordPress vence ya; la próxima visita
  // la vuelve a pedir. Las rutas se invalidan para que el HTML cacheado
  // (portada, listado, cada novedad, sitemap y llms.txt) se regenere.
  revalidateTag('wp-posts', { expire: 0 });
  revalidatePath('/[locale]', 'page');
  revalidatePath('/[locale]/novedades', 'page');
  revalidatePath('/[locale]/novedades/[slug]', 'page');
  revalidatePath('/sitemap.xml');
  revalidatePath('/llms.txt');

  return Response.json({ ok: true, revalidated: ['wp-posts', 'portada', 'novedades', 'sitemap', 'llms'] });
}
