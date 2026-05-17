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
  metadataBase: new URL('https://alphadev.studio'),
  title: {
    default: 'AlphaDev Studios | Ingeniería de Software Empresarial',
    template: '%s | AlphaDev Studios',
  },
  description:
    'Estudio de ingeniería de software especializado en desarrollo web con React y Next.js, APIs escalables, CRM y sistemas internos a medida para empresas.',
  keywords: [
    'desarrollo web empresarial',
    'software a medida',
    'APIs REST escalables',
    'backend Node.js',
    'React Next.js',
    'CRM personalizado',
    'sistemas internos',
    'ingeniería de software',
    'microservicios',
    'AlphaDev Studios',
  ],
  authors: [{ name: 'AlphaDev Studios', url: 'https://alphadev.studio' }],
  creator: 'AlphaDev Studios',
  publisher: 'AlphaDev Studios',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://alphadev.studio',
    siteName: 'AlphaDev Studios',
    title: 'AlphaDev Studios | Ingeniería de Software Empresarial',
    description:
      'Estudio de ingeniería de software especializado en desarrollo web, APIs escalables, CRM y sistemas internos a medida para empresas.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlphaDev Studios | Ingeniería de Software Empresarial',
    description:
      'Estudio de ingeniería de software especializado en desarrollo web, APIs escalables, CRM y sistemas internos a medida para empresas.',
  },
  alternates: {
    canonical: 'https://alphadev.studio',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AlphaDev Studios',
  url: 'https://alphadev.studio',
  logo: 'https://alphadev.studio/assets/img/alphadev-logo.png',
  description:
    'Estudio de ingeniería de software especializado en desarrollo web con React y Next.js, APIs escalables, CRM y sistemas internos a medida para empresas.',
  email: 'info@alphadev.com',
  telephone: '+1-234-567-890',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@alphadev.com',
    telephone: '+1-234-567-890',
    contactType: 'customer service',
    availableLanguage: ['Spanish', 'English'],
  },
  knowsAbout: [
    'Desarrollo Web',
    'React',
    'Next.js',
    'Node.js',
    'APIs REST',
    'GraphQL',
    'PostgreSQL',
    'Microservicios',
    'CRM',
    'Ingeniería de Software',
    'Seguridad Web',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Ingeniería de Software',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desarrollo Web con React y Next.js' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'APIs REST y GraphQL escalables' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM y Sistemas Internos a medida' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Optimización de Bases de Datos' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Seguridad y Autenticación Empresarial' } },
    ],
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AlphaDev Studios',
  url: 'https://alphadev.studio',
  description: 'Ingeniería de software empresarial a medida',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
