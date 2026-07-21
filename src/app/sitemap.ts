import type { MetadataRoute } from 'next';

import { getSiteUrl } from '@/lib/seo';
import { institutoData } from '@/lib/instituto';
import { ciclosData } from '@/lib/formacion';
import { novedadesData } from '@/lib/novedades';
import { declaracionesIndex } from '@/lib/publicaciones';

// Mismas tres locales que src/lib/seo.ts (buildLocalizedMetadata) y
// src/app/(frontend)/[locale]/layout.tsx.
const LOCALES = ['es', 'en', 'fr'] as const;

type RouteEntry = {
  /** Ruta sin prefijo de locale. Vacía para la home. */
  path: string;
  lastModified: Date;
};

// Fecha de build: fallback de `lastModified` para las rutas cuyo dataset no
// trae una fecha propia (instituto.ts no tiene campos de fecha; las
// páginas hub/estáticas tampoco). Las entradas dinámicas que sí tienen
// fecha real (novedades, declaraciones) la usan en su lugar más abajo.
const BUILD_DATE = new Date();

// Rutas estáticas reales y navegables hoy (ver docs/ARQUITECTURA.md §10 y
// docs/CLAUDE.md, "Estado actual de frontend y migracion"). No se incluyen
// ramas del árbol §10 que todavía no tienen página implementada (p. ej.
// /red, /indice-legislativo, /publicaciones/articulos, /publicaciones/dossiers,
// /publicaciones/glosario) para no listar URLs que devuelven 404.
const STATIC_ROUTES: RouteEntry[] = [
  { path: '', lastModified: BUILD_DATE },
  { path: '/instituto', lastModified: BUILD_DATE },
  { path: '/instituto/estatuto', lastModified: BUILD_DATE },
  { path: '/instituto/consejo-directivo', lastModified: BUILD_DATE },
  { path: '/instituto/comite-cientifico', lastModified: BUILD_DATE },
  { path: '/simposios', lastModified: BUILD_DATE },
  { path: '/simposios/2026-buenos-aires', lastModified: BUILD_DATE },
  { path: '/formacion', lastModified: BUILD_DATE },
  { path: '/formacion/diplomatura', lastModified: BUILD_DATE },
  { path: '/formacion/ciclos', lastModified: BUILD_DATE },
  { path: '/publicaciones', lastModified: BUILD_DATE },
  { path: '/publicaciones/libros', lastModified: BUILD_DATE },
  { path: '/publicaciones/declaraciones', lastModified: BUILD_DATE },
  { path: '/novedades', lastModified: BUILD_DATE },
  { path: '/contacto', lastModified: BUILD_DATE },
  { path: '/terms-privacy', lastModified: BUILD_DATE },
];

function parseIsoDate(fecha: string): Date {
  const parsed = new Date(`${fecha}T00:00:00Z`);
  return Number.isNaN(parsed.getTime()) ? BUILD_DATE : parsed;
}

function buildDynamicRoutes(): RouteEntry[] {
  const consejoDirectivoRoutes = institutoData.consejoDirectivo.map((persona) => ({
    path: `/instituto/consejo-directivo/${persona.slug}`,
    lastModified: BUILD_DATE,
  }));

  const comiteCientificoRoutes = institutoData.comiteCientifico.map((persona) => ({
    path: `/instituto/comite-cientifico/${persona.slug}`,
    lastModified: BUILD_DATE,
  }));

  const ciclosRoutes = ciclosData.map((ciclo) => ({
    path: `/formacion/ciclos/${ciclo.slug}`,
    lastModified: BUILD_DATE,
  }));

  const novedadesRoutes = novedadesData.map((novedad) => ({
    path: `/novedades/${novedad.slug}`,
    lastModified: parseIsoDate(novedad.fecha),
  }));

  const declaracionesRoutes = declaracionesIndex.map((declaracion) => ({
    path: `/publicaciones/declaraciones/${declaracion.slug}`,
    lastModified: parseIsoDate(declaracion.fecha),
  }));

  return [
    ...consejoDirectivoRoutes,
    ...comiteCientificoRoutes,
    ...ciclosRoutes,
    ...novedadesRoutes,
    ...declaracionesRoutes,
  ];
}

function buildLanguageAlternates(siteUrl: string, path: string): Record<string, string> {
  return Object.fromEntries(LOCALES.map((locale) => [locale, `${siteUrl}/${locale}${path}`]));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const routes = [...STATIC_ROUTES, ...buildDynamicRoutes()];

  return LOCALES.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteUrl}/${locale}${route.path}`,
      lastModified: route.lastModified,
      alternates: {
        languages: buildLanguageAlternates(siteUrl, route.path),
      },
    })),
  );
}
