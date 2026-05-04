import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/llms.txt',
        destination: '/llms-txt',
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
    ],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
