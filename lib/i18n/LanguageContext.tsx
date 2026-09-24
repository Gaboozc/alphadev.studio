'use client';

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { es } from './es';
import { en } from './en';
import { esRutaPublica, localizedPath, stripLocale } from './routes';
import type { Translations } from './types';
import type { Lang } from './index';

const dicts: Record<Lang, Translations> = { es, en };

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dict: Translations;
  /** La ruta `path` en el idioma activo. Úsalo en vez de escribir el href. */
  href: (path: string) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: 'es',
  setLang: () => {},
  dict: es,
  href: (path) => path,
});

/**
 * El idioma sale de la URL, no de un estado guardado.
 *
 * Antes vivía en `localStorage` y se aplicaba tras la hidratación. Eso obligaba
 * al servidor a renderizar siempre español —con su parpadeo al cambiar— y dejaba
 * el <title>, la descripción y la tarjeta de OpenGraph en español aunque la
 * página se leyera en inglés: esa metadata se resuelve en el servidor, donde el
 * estado del cliente todavía no existe.
 *
 * Con la URL como fuente de verdad, /en/servicios llega ya en inglés desde el
 * servidor y es una dirección que se puede compartir e indexar. Ver
 * `lib/i18n/routes.ts`.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const { lang, path } = useMemo(() => stripLocale(pathname ?? '/'), [pathname]);

  // `<html lang>` lo escribe el servidor y siempre dice "es": el elemento vive
  // en el layout raíz, que no conoce la ruta. Se corrige aquí para que los
  // lectores de pantalla no pronuncien el inglés con fonética española.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LangContextValue>(() => {
    const setLang = (next: Lang) => {
      if (next === lang) return;
      // Fuera de las páginas públicas no hay versión en el otro idioma a la que
      // ir (la Academia es solo español). Cambiar de idioma ahí llevaría a un
      // 404, así que no se hace nada.
      if (!esRutaPublica(path)) return;
      router.push(localizedPath(path, next));
    };

    return {
      lang,
      setLang,
      dict: dicts[lang],
      href: (destino: string) => localizedPath(destino, lang),
    };
  }, [lang, path, router]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
