'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useLang } from '@/lib/i18n/LanguageContext';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

/**
 * Un enlace interno que mantiene al visitante en su idioma.
 *
 * Un `<Link href="/contacto">` dentro de /en/servicios devuelve al español a
 * mitad de la navegación. Este componente antepone el prefijo del idioma activo.
 *
 * Regla: en las páginas públicas no se usa `next/link` directamente para rutas
 * internas. `href` se escribe siempre en su forma española (`/contacto`), que es
 * la canónica; la traducción de la URL la hace este componente.
 */
export default function SiteLink({ href, ...rest }: Props) {
  const { href: localized } = useLang();
  return <Link href={localized(href)} {...rest} />;
}
