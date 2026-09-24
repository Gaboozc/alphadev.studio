import type { Metadata } from 'next';
import { metadataFor } from '@/lib/i18n/routes';
import ContactoPageContent from './ContactoPageContent';

export const metadata: Metadata = metadataFor('/contacto', 'es');

export default function ContactoPage() {
  return <ContactoPageContent />;
}
