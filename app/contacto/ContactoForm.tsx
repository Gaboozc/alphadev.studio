'use client';

import { useActionState, useState } from 'react';
import { useLang } from '@/lib/i18n/LanguageContext';
import Icon, { type IconName } from '@/components/Icon';
import { enviarMensaje, type ErrorEnvio } from './actions';

type Category = 'consultation' | 'app' | 'internal' | 'api' | 'other';

// Iconos de línea por categoría (sin emoji ni glifos).
const CATEGORY_ICONS: Record<Category, IconName> = {
  consultation: 'message',
  app: 'monitor',
  internal: 'share',
  api: 'megaphone',
  other: 'sparkles',
};

export default function ContactoForm() {
  const { dict } = useLang();
  const c = dict.contact;

  const [category, setCategory] = useState<Category | null>(null);

  // El envio ocurre en el servidor (./actions.ts). useActionState guarda su
  // respuesta y expone el estado de "enviando" sin banderas propias.
  const [resultado, enviar, enviando] = useActionState(enviarMensaje, null);

  const ERRORES: Record<ErrorEnvio, string> = {
    campos: c.form.error_campos,
    ritmo: c.form.error_ritmo,
    servidor: c.form.error_servidor,
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    platform: '',
    users: '',
    stack: '',
  });

  const categories: Category[] = ['consultation', 'app', 'internal', 'api', 'other'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ── Success state ──────────────────────────────────────────────
  if (resultado?.ok) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="text-6xl">✓</div>
        <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text)' }}>{c.form.success_title}</h3>
        <p style={{ color: 'var(--text-muted)' }}>{c.form.success_message}</p>
      </div>
    );
  }

  // ── Category picker ────────────────────────────────────────────
  if (category === null) {
    return (
      <div className="space-y-8">
        <p className="text-sm text-center" style={{ color: 'var(--text-muted)' }}>{c.picker_label}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setCategory(key)}
              className="contact-category-card text-left"
            >
              <span className="mb-3 block" style={{ color: 'var(--gold)' }}><Icon name={CATEGORY_ICONS[key]} size={28} /></span>
              <span className="block font-semibold mb-1" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text)' }}>{c.categories[key].label}</span>
              <span className="block text-sm leading-snug" style={{ color: 'var(--text-muted)' }}>{c.categories[key].description}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Contextual form ────────────────────────────────────────────
  const cat = c.categories[category];

  return (
    <div className="space-y-8">
      {/* Category header + back */}
      <div className="flex items-center gap-4">
        <span style={{ color: 'var(--gold)' }}><Icon name={CATEGORY_ICONS[category]} size={26} /></span>
        <div>
          <h3 className="text-xl font-bold" style={{ color: 'var(--text)' }}>{cat.label}</h3>
          <button
            type="button"
            onClick={() => setCategory(null)}
            className="text-sm transition-colors" style={{ color: 'var(--gold)' }}
          >
            {c.form.back}
          </button>
        </div>
      </div>

      <form action={enviar} className="space-y-5">
        {/* La categoria vive en estado de React; el servidor la necesita en el envio. */}
        <input type="hidden" name="categoria" value={category} />

        {/* Trampa para robots: fuera de pantalla, sin foco y anunciada como
            oculta. Una persona nunca la rellena. */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor="sitio">No rellenar</label>
          <input type="text" id="sitio" name="sitio" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
              {c.form.name} *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={120}
              placeholder={c.form.name_placeholder}
              className="contact-input"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
              {c.form.email} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength={200}
              placeholder={c.form.email_placeholder}
              className="contact-input"
            />
          </div>
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
            {c.form.company}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            maxLength={160}
            placeholder={c.form.company_placeholder}
            className="contact-input"
          />
        </div>

        {/* Category-specific fields */}
        {category === 'app' && cat.platform_options.length > 0 && (
          <div>
            <p className="block text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>{cat.platform_label}</p>
            <div className="flex gap-3 flex-wrap">
              {cat.platform_options.map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="platform"
                    value={opt}
                    checked={formData.platform === opt}
                    onChange={handleChange}
                    className="accent-blue-500"
                  />
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {category === 'internal' && cat.users_label && (
          <div>
            <label htmlFor="users" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
              {cat.users_label}
            </label>
            <input
              type="text"
              id="users"
              name="users"
              value={formData.users}
              onChange={handleChange}
              placeholder="Ej: 50–200 usuarios"
              className="contact-input"
            />
          </div>
        )}

        {category === 'api' && cat.stack_label && (
          <div>
            <label htmlFor="stack" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
              {cat.stack_label}
            </label>
            <input
              type="text"
              id="stack"
              name="stack"
              value={formData.stack}
              onChange={handleChange}
              placeholder="Ej: Node.js, PostgreSQL, AWS"
              className="contact-input"
            />
          </div>
        )}

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
            {c.form.message} *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            maxLength={5000}
            placeholder={c.form.message_placeholder}
            className="contact-input resize-none"
          />
        </div>

        {resultado && !resultado.ok && (
          <p role="alert" className="contact-error">
            {ERRORES[resultado.error]}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="w-full btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {enviando ? c.form.submitting : c.form.submit}
        </button>
      </form>
    </div>
  );
}
