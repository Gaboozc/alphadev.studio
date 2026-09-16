'use client';

import Image from 'next/image';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';

const COPY: Record<Lang, { eyebrow: string; title: string; body: string; punchline: string }> = {
  es: {
    eyebrow: 'El problema',
    title: 'Tu negocio es bueno.\nPero nadie lo encuentra.',
    body: 'Tienes un gran producto o servicio, pero cuando alguien te busca en Google, no apareces. Tus redes están vacías o abandonadas. Tu competencia, que quizás ni es mejor que tú, se lleva los clientes solo porque está presente y tú no.',
    punchline: 'El problema no es tu negocio. Es que eres invisible.',
  },
  en: {
    eyebrow: 'The problem',
    title: "Your business is good.\nBut nobody finds you.",
    body: "You have a great product or service, but when someone searches for you on Google, you don't show up. Your social media is empty or abandoned. Your competition — which isn't even better than you — gets the clients just because they're present and you're not.",
    punchline: "The problem isn't your business. It's that you're invisible.",
  },
};

export default function ProblemSection() {
  const { lang } = useLang();
  const c = COPY[lang];

  return (
    <section
      className="section-pad"
      style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}
    >
      <div className="section-container">
        <div className="section-header">
          <p className="eyebrow" data-animate="fade">
            {c.eyebrow}
          </p>
          <h2
            className="section-title"
            data-animate="title"
            style={{ whiteSpace: 'pre-line' }}
          >
            {c.title}
          </h2>
          <div className="gold-divider" data-animate="divider" />
          <p
            className="section-subtitle"
            data-animate="reveal-scrub"
            style={{ maxWidth: '600px', margin: '0 auto' }}
          >
            {c.body}
          </p>
        </div>

        {/* El negocio que se desvanece: la imagen dice lo mismo que el texto
            (existe, es bueno, pero se está volviendo invisible) sin repetirlo. */}
        <div className="problem-media" data-animate="clip-reveal">
          <Image
            src="/assets/secciones/problema.webp"
            alt={lang === 'es'
              ? 'Un negocio desvaneciéndose por no estar en internet'
              : 'A business fading away for not being online'}
            width={1200}
            height={896}
            sizes="(max-width: 899px) 100vw, 820px"
          />
        </div>

        {/* Punchline card */}
        <div
          data-animate="fade"
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            background: 'var(--bg-card)',
            border: '1px solid var(--gold-border)',
            borderRadius: '1rem',
            padding: '1.75rem 2rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              fontWeight: 700,
              color: 'var(--text)',
              lineHeight: 1.4,
            }}
          >
            {c.punchline}
          </p>
        </div>
      </div>
    </section>
  );
}
