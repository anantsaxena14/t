import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import { JetBrains_Mono } from 'next/font/google';
import { site } from '@/config/portfolio';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  icons: {
    icon: [{ url: site.logo, type: 'image/x-icon' }],
  },
};

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrains.className}>
      <body>{children}</body>
    </html>
  );
}
