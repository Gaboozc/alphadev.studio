'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { es } from './es';
import { en } from './en';
import type { Translations } from './types';
import type { Lang } from './index';

const dicts: Record<Lang, Translations> = { es, en };

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dict: Translations;
}

const LangContext = createContext<LangContextValue>({
  lang: 'es',
  setLang: () => {},
  dict: es,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  // localStorage solo existe en el cliente: leemos el idioma guardado tras la
  // hidratación. Hacerlo en un useState lazy provocaría hydration mismatch
  // (el servidor siempre renderiza 'es'), por eso el setState va en el effect.
  useEffect(() => {
    const stored = localStorage.getItem('alphadev_lang') as Lang | null;
    if (stored && (stored === 'es' || stored === 'en')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(stored);
    }
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem('alphadev_lang', next);
    document.documentElement.lang = next;
  };

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, dict: dicts[lang] }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
