'use client';

import { useLang } from '@/lib/i18n/LanguageContext';
import Icon, { type IconName } from '@/components/Icon';
import Flag, { type Country } from '@/components/Flag';
import { CARDS } from '../cards';

type Action = {
  icon?: IconName;
  flag?: Country;
  label: string;
  href: string;
  value?: string;
  external?: boolean;
};

export default function TarjetaContent({ slug }: { slug: string }) {
  const { lang } = useLang();
  const card = CARDS[slug];
  if (!card) return null;

  const t = (es: string, en: string) => (lang === 'es' ? es : en);

  const actions: Action[] = [];
  if (card.whatsapp) {
    actions.push({ icon: 'message', label: 'WhatsApp', href: `https://wa.me/${card.whatsapp}`, external: true });
  }
  card.phones.forEach((p) => {
    actions.push({ flag: p.label === 'US' ? 'us' : 'mx', label: `${t('Llamar', 'Call')} · ${p.label}`, href: `tel:${p.e164}`, value: p.display });
  });
  if (card.instagram) {
    actions.push({ icon: 'instagram', label: 'Instagram', href: `https://instagram.com/${card.instagram}`, value: `@${card.instagram}`, external: true });
  }
  if (card.website) {
    actions.push({ icon: 'globe', label: t('Sitio web', 'Website'), href: card.website, value: card.website.replace(/^https?:\/\//, ''), external: true });
  }

  return (
    <main className="tarjeta-page page-hero">
      <article className="tarjeta-card">
        {card.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="tarjeta-avatar tarjeta-avatar-img" src={card.photo} alt={card.name} width={96} height={96} />
        ) : (
          <div className="tarjeta-avatar" aria-hidden="true">{card.initials}</div>
        )}
        <h1 className="tarjeta-name">{card.name}</h1>
        <p className="tarjeta-role">{card.role[lang]}</p>
        <p className="tarjeta-tagline">{card.tagline[lang]}</p>

        <a href="https://alphadev.studio/contacto" className="btn-glow tarjeta-save">
          <Icon name="calendar" size={18} />
          {t('Agendar cita', 'Book a call')}
        </a>

        <a href={card.vcard} download className="btn-secondary tarjeta-book">
          <Icon name="download" size={18} />
          {t('Guardar contacto', 'Save contact')}
        </a>

        <div className="tarjeta-actions">
          {actions.map((a, i) => (
            <a
              key={i}
              href={a.href}
              target={a.external ? '_blank' : undefined}
              rel={a.external ? 'noopener noreferrer' : undefined}
              className="tarjeta-action"
            >
              <span className="tarjeta-action-icon">
                {a.flag ? <Flag country={a.flag} height={16} /> : a.icon ? <Icon name={a.icon} size={19} /> : null}
              </span>
              <span className="tarjeta-action-body">
                <span className="tarjeta-action-label">{a.label}</span>
                {a.value && <span className="tarjeta-action-value">{a.value}</span>}
              </span>
              <span className="tarjeta-action-arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>

        <div className="tarjeta-qr">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.qr} alt={t('Código QR de la tarjeta', 'Card QR code')} width={148} height={148} loading="lazy" />
          <span className="tarjeta-qr-caption">{t('Escanea para compartir', 'Scan to share')}</span>
        </div>

        <div className="tarjeta-brand">AlphaDev Studios</div>
      </article>
    </main>
  );
}
