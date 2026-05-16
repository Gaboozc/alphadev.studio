import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AlphaDev Studios | Ingeniería de Software Empresarial',
  description:
    'Soluciones de software a medida: desarrollo web, APIs escalables, CRM, seguridad. Estudio de ingeniería profesional.',
  keywords:
    'desarrollo web, APIs backend, CRM, sistemas internos, ingeniería de software',
  authors: [{ name: 'AlphaDev Studios' }],
  openGraph: {
    title: 'AlphaDev Studios',
    description: 'Ingeniería de Software Empresarial',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
