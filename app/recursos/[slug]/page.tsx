import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { descripcionDeGuia, guiaPorSlug, tituloDeGuia } from '@/lib/guias';
import { localizedPath } from '@/lib/i18n/routes';
import GuiaDetalle from './GuiaDetalle';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guia = await guiaPorSlug(slug);
  if (!guia || !guia.publicada) return { title: 'Recursos' };

  return {
    title: tituloDeGuia(guia, 'es'),
    description: descripcionDeGuia(guia, 'es'),
    alternates: {
      canonical: `/recursos/${slug}`,
      languages: {
        es: localizedPath(`/recursos/${slug}`, 'es'),
        en: localizedPath(`/recursos/${slug}`, 'en'),
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function GuiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guia = await guiaPorSlug(slug);
  if (!guia || !guia.publicada) notFound();

  return <GuiaDetalle guia={guia} lang="es" />;
}
