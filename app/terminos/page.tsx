import type { Metadata } from 'next';
import TerminosContent from './TerminosContent';

export const metadata: Metadata = {
  title: 'Términos',
  description:
    'Condiciones de uso de alphadev.studio: qué es este sitio, qué son las plantillas que se muestran y qué se acuerda por separado.',
  alternates: { canonical: '/terminos' },
  openGraph: { url: '/terminos' },
};

export default function TerminosPage() {
  return <TerminosContent />;
}
