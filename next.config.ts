import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
