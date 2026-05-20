import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Escale — Découvrez votre prochaine destination',
  description:
    'Préparez votre voyage en Europe en 2 minutes. Curation personnalisée de lieux, restaurants et tips locaux par IA.',
  keywords: ['voyage', 'Europe', 'découverte', 'Amsterdam', 'Barcelone', 'Lisbonne', 'Prague', 'Rome'],
  openGraph: {
    title: 'Escale — Découvrez votre prochaine destination',
    description: 'Votre starter pack voyage curé par IA, en 2 minutes.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
