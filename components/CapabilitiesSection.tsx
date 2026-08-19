'use client';

import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';

type PillarData = {
  title: string;
  description: string;
  items: string[];
};

const PILLARS: Record<Lang, PillarData[]> = {
  es: [
    {
      title: 'Te ven',
      description: 'Sitio web profesional + perfil de Google optimizado. Cuando alguien te busca, te encuentra. Con una imagen que transmite confianza desde el primer segundo.',
      items: ['Sitio web a medida', 'Google Business Profile', 'SEO local', 'Imagen profesional'],
    },
    {
      title: 'Te siguen',
      description: 'Redes sociales activas y con contenido que conecta. Instagram, Facebook y TikTok manejados para que tu audiencia crezca y tu marca esté siempre presente.',
      items: ['Gestión de redes', 'Contenido original', 'Calendario editorial', 'Crecimiento orgánico'],
    },
    {
      title: 'Te eligen',
      description: 'Publicidad inteligente que trae clientes reales. Campañas en Google y redes que ponen tu negocio frente a quien justo está buscando lo que ofreces.',
      items: ['Google Ads', 'Meta Ads', 'Retargeting', 'Métricas claras'],
    },
  ],
  en: [
    {
      title: 'They see you',
      description: 'Professional website + optimized Google profile. When someone searches for you, they find you. With an image that builds trust from the first second.',
      items: ['Custom website', 'Google Business Profile', 'Local SEO', 'Professional image'],
    },
    {
      title: 'They follow you',
      description: 'Active social media with content that connects. Instagram, Facebook, and TikTok managed so your audience grows and your brand is always present.',
      items: ['Social media management', 'Original content', 'Editorial calendar', 'Organic growth'],
    },
    {
      title: 'They choose you',
      description: 'Smart advertising that brings real customers. Campaigns on Google and social media that put your business in front of people searching for what you offer.',
      items: ['Google Ads', 'Meta Ads', 'Retargeting', 'Clear metrics'],
    },
  ],
};

const SECTION_COPY: Record<Lang, { eyebrow: string; title: string; subtitle: string }> = {
  es: {
    eyebrow: 'Lo que hacemos',
    title: 'Te construimos una presencia\ndigital completa.',
    subtitle: 'Tres pilares que trabajan juntos para que tu negocio sea visible, relevante y elegido.',
  },
  en: {
    eyebrow: 'What we do',
    title: 'We build you a complete\ndigital presence.',
    subtitle: 'Three pillars that work together to make your business visible, relevant, and chosen.',
  },
};

export default function CapabilitiesSection() {
  const { lang } = useLang();
  const pillars = PILLARS[lang];
  const copy = SECTION_COPY[lang];

  return (
    <section className="capabilities-section">
      <div className="section-container">
        <div className="section-header">
          <p className="eyebrow" data-animate="fade">
            {copy.eyebrow}
          </p>
          <h2 className="section-title" data-animate="title" style={{ whiteSpace: 'pre-line' }}>
            {copy.title}
          </h2>
          <div className="gold-divider" data-animate="divider" />
          <p className="section-subtitle" data-animate="subtitle">{copy.subtitle}</p>
        </div>

        <div className="section-content capability-grid" data-animate="stagger">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="capability-card">
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
              <ul>
                {pillar.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
