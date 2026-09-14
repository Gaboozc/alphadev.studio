import type { Metadata } from 'next';
import ContactoPageContent from './ContactoPageContent';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Cuéntanos sobre tu proyecto. Sin compromiso, analizamos la mejor solución técnica para tu empresa.',
  alternates: { canonical: '/contacto' },
  openGraph: { url: '/contacto' },
};

export default function ContactoPage() {
  return <ContactoPageContent />;
}
