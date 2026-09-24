import type { Metadata } from 'next';
import { metadataFor } from '@/lib/i18n/routes';
import RecursosContent from '../../recursos/RecursosContent';

export const metadata: Metadata = metadataFor('/recursos', 'en');
export const dynamic = 'force-dynamic';

export default function RecursosPageEn() {
  return <RecursosContent lang="en" />;
}
