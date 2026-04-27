import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import { JetBrains_Mono } from 'next/font/google';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'vpnsin — Engineering Work by Hand',
  description:
    'The workshop of a devops engineer who ships real things. Projects, essays, and open-source contributions — hand-finished, annotated, and honest.',
  icons: {
    icon: [{ url: '/assets/images/app_logo.png', type: 'image/x-icon' }],
  },
};

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrains.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
