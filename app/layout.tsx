import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollAnimations from '@/components/ScrollAnimations';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://alphadev.studio'),
  title: {
    default: 'AlphaDev Studios | Te hacemos existir en internet',
    template: '%s | AlphaDev Studios',
  },
  description:
    'Creamos tu presencia digital desde cero: sitio web, redes sociales y publicidad online. Para que tus clientes te encuentren, te elijan y vuelvan.',
  keywords: [
    'presencia digital para negocios',
    'sitio web profesional',
    'manejo de redes sociales',
    'publicidad en Google',
    'publicidad en Instagram',
    'Google Business Profile',
    'marketing digital PyMEs',
    'crear marca desde cero',
    'agencia de soluciones digitales',
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
    title: 'AlphaDev Studios | Te hacemos existir en internet',
    description:
      'Creamos tu presencia digital desde cero: sitio web, redes sociales y publicidad online. Para que tus clientes te encuentren, te elijan y vuelvan.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlphaDev Studios | Te hacemos existir en internet',
    description:
      'Creamos tu presencia digital desde cero: sitio web, redes sociales y publicidad online. Para que tus clientes te encuentren y te elijan.',
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
    'Agencia de soluciones digitales. Creamos la presencia online de negocios desde cero: sitio web, redes sociales, perfil de Google y publicidad que trae clientes reales.',
  email: 'zavarsegabriel@gmail.com',
  telephone: '+1-407-686-7561',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'zavarsegabriel@gmail.com',
      telephone: '+1-407-686-7561',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: ['Spanish', 'English'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+52-56-3711-3563',
      contactType: 'customer service',
      areaServed: 'MX',
      availableLanguage: ['Spanish', 'English'],
    },
  ],
  knowsAbout: [
    'Presencia digital',
    'Diseño de sitios web',
    'Manejo de redes sociales',
    'Publicidad en Google',
    'Publicidad en redes sociales',
    'Google Business Profile',
    'SEO local',
    'Identidad de marca',
    'Marketing digital',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Soluciones digitales para negocios',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Presencia digital desde cero (marca + sitio + perfiles)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Manejo de redes sociales' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Publicidad en Google y redes sociales' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Optimización de perfil de Google' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diseño de sitio web profesional' } },
    ],
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AlphaDev Studios',
  url: 'https://alphadev.studio',
  description: 'Te hacemos existir en internet: presencia digital completa para tu negocio.',
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
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <LanguageProvider>
          <SmoothScroll />
          <ScrollAnimations />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
