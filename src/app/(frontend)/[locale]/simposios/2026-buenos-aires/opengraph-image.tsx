import { ImageResponse } from 'next/og';

import { simposio2026 } from '@/lib/simposio2026';

// OG específica del Simposio 2026 — más concreta que la del sitio
// (src/app/(frontend)/opengraph-image.tsx) y por eso la reemplaza para esta
// ruta y sus hijas (convención de archivo de Next: el segmento más profundo
// gana). `buildLocalizedMetadata` en generateMetadata (page.tsx de esta
// misma ruta) no define `openGraph.images`, así que no hay conflicto.
//
// El dataset de src/lib/simposio2026.ts es curado en español únicamente
// (sin claves por locale, igual que el título hardcodeado en
// generateMetadata de page.tsx) — por eso esta imagen no varía por
// `locale` aunque la ruta esté bajo `[locale]`.

const LOCALES = ['es', 'en', 'fr'] as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = simposio2026.title;

const AZUL_INSTITUCIONAL = '#0D3B66';
const AZUL_900 = '#0A2E50';
const DORADO_ACENTO = '#C9A46A';

// Ver opengraph-image.tsx raíz para la justificación de este approach de
// fuentes (Cinzel/Montserrat solo existen vía next/font/google en el resto
// del sitio, que no expone bytes crudos utilizables por ImageResponse).
// Duplicado a propósito: esta ola solo puede crear archivos
// `opengraph-image.tsx`/`twitter-image.tsx`, no un helper compartido nuevo.
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

export default async function Image() {
  const eyebrowText = 'IVUJUS · SIMPOSIO 2026';
  const footerText = `${simposio2026.location} · ${simposio2026.dates}`;

  const [cinzelData, montserratData] = await Promise.all([
    loadGoogleFont('Cinzel', 700, `${eyebrowText}${simposio2026.title.toUpperCase()}`),
    loadGoogleFont('Montserrat', 500, `${simposio2026.subtitle}${footerText}`),
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
        <div
          style={{
            display: 'flex',
            fontFamily: montserratData ? 'Montserrat' : 'sans-serif',
            fontSize: 22,
            fontWeight: 500,
            color: DORADO_ACENTO,
            textTransform: 'uppercase',
            letterSpacing: 5,
            marginBottom: 28,
          }}
        >
          {eyebrowText}
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: cinzelData ? 'Cinzel' : 'serif',
            fontSize: 48,
            fontWeight: 700,
            color: '#FFFFFF',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: 2,
            lineHeight: 1.25,
            maxWidth: 980,
          }}
        >
          {simposio2026.title}
        </div>
        <div
          style={{
            display: 'flex',
            width: 120,
            height: 3,
            backgroundColor: DORADO_ACENTO,
            marginTop: 28,
            marginBottom: 28,
          }}
        />
        <div
          style={{
            display: 'flex',
            fontFamily: montserratData ? 'Montserrat' : 'sans-serif',
            fontSize: 26,
            fontWeight: 500,
            color: '#E8EEF4',
            textAlign: 'center',
            maxWidth: 820,
            marginBottom: 40,
          }}
        >
          {simposio2026.subtitle}
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: montserratData ? 'Montserrat' : 'sans-serif',
            fontSize: 20,
            fontWeight: 500,
            color: DORADO_ACENTO,
            textAlign: 'center',
          }}
        >
          {footerText}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
