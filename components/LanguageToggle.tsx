'use client';

import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';

export default function LanguageToggle() {
  const { lang, setLang, dict } = useLang();

  return (
    <div
      role="group"
      aria-label={dict.nav.lang_label}
      className="flex items-center rounded-full overflow-hidden text-xs font-bold tracking-wider"
      style={{ border: '1px solid var(--border)' }}
    >
      {(['es', 'en'] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className="lang-toggle-btn transition-colors"
          style={
            lang === l
              ? { background: 'var(--gold)', color: '#FAFAF7' }
              : { background: 'transparent', color: 'var(--text-muted)' }
          }
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
