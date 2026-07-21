import { getSiteUrl } from '@/lib/seo';
import { institutoData } from '@/lib/instituto';
import { ciclosData, diplomaturaData } from '@/lib/formacion';
import { getNovedadesOrdenadas } from '@/lib/novedades';
import { simposio2026 } from '@/lib/simposio2026';

// Mapa curado GEO (Generative Engine Optimization) en `/llms.txt`, formato
// descrito en docs/ARQUITECTURA.md §8.2. Cada línea sale de un dataset
// curado real (src/lib/*.ts) — nada de contenido inventado. Se recalcula en
// cada request (no hay caché propia): los datasets son arrays estáticos en
// memoria, así que el costo es despreciable y el contenido queda siempre
// consistente con el resto del sitio.

function buildLlmsTxt(): string {
  const siteUrl = getSiteUrl();
  const lines: string[] = [];

  lines.push(`# ${institutoData.title}`);
  lines.push('');
  lines.push(`> ${institutoData.intro}`);
  lines.push('');

  lines.push('## Autores y referentes');
  lines.push('');
  for (const persona of institutoData.comiteCientifico) {
    const url = `${siteUrl}/es/instituto/comite-cientifico/${persona.slug}`;
    lines.push(`- [${persona.name} (${persona.country ?? persona.role})](${url}): ${persona.summary}`);
  }
  lines.push('');

  lines.push('## Conceptos clave');
  lines.push('');
  const estatutoUrl = `${siteUrl}/es/instituto/estatuto`;
  for (const purpose of institutoData.purposes) {
    lines.push(`- [${purpose.title}](${estatutoUrl}): ${purpose.body}`);
  }
  lines.push('');

  lines.push('## Simposios');
  lines.push('');
  const simposioUrl = `${siteUrl}/es/simposios/${simposio2026.slug}`;
  lines.push(`- [${simposio2026.title} (${simposio2026.location}, ${simposio2026.dates})](${simposioUrl}): ${simposio2026.summary}`);
  const declaracionUrl = `${siteUrl}/es/publicaciones/declaraciones/declaracion-de-buenos-aires`;
  lines.push(
    `- [${simposio2026.declaration.title}](${declaracionUrl}): ${simposio2026.declaration.intro}`,
  );
  lines.push('');

  lines.push('## Formación');
  lines.push('');
  const diplomaturaUrl = `${siteUrl}/es/formacion/diplomatura`;
  lines.push(`- [${diplomaturaData.titulo}](${diplomaturaUrl}): ${diplomaturaData.descripcion}`);
  for (const ciclo of ciclosData) {
    const url = `${siteUrl}/es/formacion/ciclos/${ciclo.slug}`;
    lines.push(`- [${ciclo.titulo} (${ciclo.fecha})](${url}): ${ciclo.resumen}`);
  }
  lines.push('');

  lines.push('## Novedades');
  lines.push('');
  for (const novedad of getNovedadesOrdenadas()) {
    const url = `${siteUrl}/es/novedades/${novedad.slug}`;
    lines.push(`- [${novedad.titulo} (${novedad.fecha})](${url}): ${novedad.bajada}`);
  }
  lines.push('');

  return lines.join('\n');
}

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
