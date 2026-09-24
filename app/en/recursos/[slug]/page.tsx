import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { descripcionDeGuia, guiaPorSlug, tituloDeGuia } from '@/lib/guias';
import { localizedPath } from '@/lib/i18n/routes';
import GuiaDetalle from '@/app/recursos/[slug]/GuiaDetalle';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guia = await guiaPorSlug(slug);
  if (!guia || !guia.publicada) return { title: 'Resources' };

  return {
    title: tituloDeGuia(guia, 'en'),
    description: descripcionDeGuia(guia, 'en'),
    alternates: {
      canonical: localizedPath(`/recursos/${slug}`, 'en'),
      languages: {
        es: localizedPath(`/recursos/${slug}`, 'es'),
        en: localizedPath(`/recursos/${slug}`, 'en'),
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function GuiaPageEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guia = await guiaPorSlug(slug);
  if (!guia || !guia.publicada) notFound();

  return <GuiaDetalle guia={guia} lang="en" />;
}
