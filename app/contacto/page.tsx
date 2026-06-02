import type { Metadata } from 'next';
import ContactoPageContent from './ContactoPageContent';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Cuéntanos sobre tu proyecto. Sin compromiso, analizamos la mejor solución técnica para tu empresa.',
  alternates: { canonical: 'https://alphadev.studio/contacto' },
  openGraph: { url: 'https://alphadev.studio/contacto' },
};

export default function ContactoPage() {
  return <ContactoPageContent />;
}
