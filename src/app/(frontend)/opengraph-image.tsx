import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Imagen OG por defecto del sitio. Next 16 auto-registra este archivo como
// `openGraph.images` de toda página bajo `src/app/(frontend)` que no defina
// su propia convención `opengraph-image.*` más específica (p. ej. la del
// Simposio 2026, ver esa ruta). `buildLocalizedMetadata`
// (src/lib/seo.ts) no setea `openGraph.images` en ningún lado — verificado
// por grep — así que no hay conflicto entre la convención de archivo y el
// metadata explícito: esta imagen queda como default para todo el sitio sin
// coordinación adicional.

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Instituto de Victimología de Usina de Justicia';

const AZUL_INSTITUCIONAL = '#0D3B66';
const AZUL_900 = '#0A2E50';
const DORADO_ACENTO = '#C9A46A';

const SITE_NAME = 'Instituto de Victimología de Usina de Justicia';
// Mismo texto que FOOTER_TAGLINE en [locale]/layout.tsx (tomado verbatim
// del manual oficial, docs/reference/design-system-oficial/README.md) — no
// se importa desde ahí porque ese archivo no lo exporta y esta ola solo
// puede tocar `opengraph-image.tsx`/`twitter-image.tsx`.
const TAGLINE = 'Conocimiento que ilumina, formación que transforma.';

// Cinzel/Montserrat (fuentes oficiales, ver globals.css) se cargan en el
// resto del sitio vía `next/font/google`, que expone CSS variables — no
// sirve para `ImageResponse`, que necesita los bytes crudos de la fuente.
// No hay .woff/.ttf locales en el repo (verificado), así que se intenta
// traer el recorte de Google Fonts necesario en build/runtime; si la red
// no está disponible (build offline/sandbox) se cae en silencio a la
// fuente sans embebida de satori para no romper el build.
async function loadGoogleFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const cssRes = await fetch(cssUrl, { signal: AbortSignal.timeout(5000) });
    if (!cssRes.ok) return null;
    const css = await cssRes.text();
    const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
    if (!match?.[1]) return null;
    const fontRes = await fetch(match[1], { signal: AbortSignal.timeout(5000) });
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

async function loadLogoDataUri(): Promise<string | null> {
  try {
    const logoBuffer = await readFile(
      join(process.cwd(), 'public/logos/logo-ivujus-mark-white.png'),
    );
    return `data:image/png;base64,${logoBuffer.toString('base64')}`;
  } catch {
    return null;
  }
}

export default async function Image() {
  const [cinzelData, montserratData, logoSrc] = await Promise.all([
    loadGoogleFont('Cinzel', 700, SITE_NAME.toUpperCase()),
    loadGoogleFont('Montserrat', 500, TAGLINE),
    loadLogoDataUri(),
  ]);

  const fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 500 | 700;
    style: 'normal';
  }[] = [];
  if (cinzelData) {
    fonts.push({ name: 'Cinzel', data: cinzelData, weight: 700, style: 'normal' });
  }
  if (montserratData) {
    fonts.push({ name: 'Montserrat', data: montserratData, weight: 500, style: 'normal' });
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: AZUL_INSTITUCIONAL,
          backgroundImage: `linear-gradient(135deg, ${AZUL_900} 0%, ${AZUL_INSTITUCIONAL} 55%, ${AZUL_INSTITUCIONAL} 100%)`,
          padding: '80px',
        }}
      >
        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- ImageResponse (satori) requiere <img>, no next/image.
          <img src={logoSrc} width={150} height={122} alt="" style={{ marginBottom: 36 }} />
        ) : null}
        <div
          style={{
            display: 'flex',
            fontFamily: cinzelData ? 'Cinzel' : 'serif',
            fontSize: 52,
            fontWeight: 700,
            color: '#FFFFFF',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: 3,
            lineHeight: 1.2,
            maxWidth: 920,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            display: 'flex',
            width: 120,
            height: 3,
            backgroundColor: DORADO_ACENTO,
            marginTop: 32,
            marginBottom: 32,
          }}
        />
        <div
          style={{
            display: 'flex',
            fontFamily: montserratData ? 'Montserrat' : 'sans-serif',
            fontSize: 28,
            fontWeight: 500,
            color: DORADO_ACENTO,
            textAlign: 'center',
            maxWidth: 760,
          }}
        >
          {TAGLINE}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
