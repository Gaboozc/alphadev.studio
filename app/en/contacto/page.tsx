import type { Metadata } from 'next';
import { metadataFor } from '@/lib/i18n/routes';
import ContactoPageContent from '../../contacto/ContactoPageContent';

export const metadata: Metadata = metadataFor('/contacto', 'en');

export default function ContactoPageEn() {
  return <ContactoPageContent />;
}
