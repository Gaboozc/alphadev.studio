import type { Metadata } from 'next';
import { metadataFor } from '@/lib/i18n/routes';
import RecursosContent from './RecursosContent';

export const metadata: Metadata = metadataFor('/recursos', 'es');

// El catálogo cambia cuando el admin publica: sin esto, una guía nueva
// tardaría hasta el próximo build en aparecer.
export const dynamic = 'force-dynamic';

export default function RecursosPage() {
  return <RecursosContent lang="es" />;
}
