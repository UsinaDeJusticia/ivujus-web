import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOCALES = ['es', 'en', 'fr'] as const;
const DEFAULT_LOCALE = 'es';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Solo rutas SIN prefijo de idioma: las de /es, /en y /fr no necesitan el
    // proxy y así no se cobra una invocación por cada página vista. `_vercel`
    // es donde Web Analytics envía las visitas: no debe redirigirse.
    '/((?!es(?:/|$)|en(?:/|$)|fr(?:/|$)|_vercel|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|.*\\..*).*)',
  ],
};
