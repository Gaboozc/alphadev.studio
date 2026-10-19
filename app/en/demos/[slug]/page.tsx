import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DEMO_FICHAS, fichaPorSlug } from '@/lib/content/demos';
import { localizedPath } from '@/lib/i18n/routes';
import FichaContent from '../../../demos/[slug]/FichaContent';

export const dynamicParams = false;

export function generateStaticParams() {
  return DEMO_FICHAS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ficha = fichaPorSlug(slug);
  if (!ficha) return { title: 'Demos' };
  const path = `/demos/${slug}`;
  return {
    title: `${ficha.name} · Demo`,
    description: ficha.problema.en,
    alternates: {
      canonical: localizedPath(path, 'en'),
      languages: { es: localizedPath(path, 'es'), en: localizedPath(path, 'en'), 'x-default': localizedPath(path, 'es') },
    },
  };
}

export default async function FichaPageEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!fichaPorSlug(slug)) notFound();
  return <FichaContent slug={slug} />;
}
