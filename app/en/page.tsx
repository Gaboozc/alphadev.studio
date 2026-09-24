import type { Metadata } from 'next';
import { metadataFor } from '@/lib/i18n/routes';
import HomeSections from '@/components/HomeSections';

export const metadata: Metadata = metadataFor('/', 'en');

export default function HomeEn() {
  return <HomeSections />;
}
