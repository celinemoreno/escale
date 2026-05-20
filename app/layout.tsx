import type { Metadata } from 'next';
import { Fraunces, Outfit } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '600', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Escale — Découvrez la France autrement',
  description: 'Prépare ton séjour en France en 2 minutes. Curation personnalisée de lieux, restaurants et tips locaux par IA.',
  keywords: ['voyage', 'France', 'Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Nice', 'découverte'],
  openGraph: {
    title: 'Escale — La France comme un local',
    description: 'Ton starter pack voyage curé par IA, en 2 minutes.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
