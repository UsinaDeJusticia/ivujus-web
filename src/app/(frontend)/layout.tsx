import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.PAYLOAD_PUBLIC_SERVER_URL ?? 'https://ivujus.org.ar'),
  title: {
    default: 'IVUJUS — Instituto de Victimología de Usina de Justicia',
    template: '%s · IVUJUS',
  },
  description:
    'Instituto académico argentino dedicado a la victimología, el derecho victimal y los derechos de las víctimas de homicidio y femicidio.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
