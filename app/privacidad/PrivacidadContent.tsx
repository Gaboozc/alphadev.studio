'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useLang } from '@/lib/i18n/LanguageContext';
import type { Lang } from '@/lib/i18n';
import { PHONE_MX, PHONE_US } from '@/lib/site-config';

type Section = { title: string; body: ReactNode };

type Copy = {
  eyebrow: string;
  title: string;
  updated: string;
  lead: string;
  sections: Section[];
  note: string;
};

// Los dos teléfonos se ven igual en ambos idiomas; se extraen para no repetir
// el par de <a> en cada versión.
const telefonos = (
  <>
    <a href={PHONE_MX.href}>{PHONE_MX.display}</a> (MX) <span aria-hidden="true">·</span>{' '}
    <a href={PHONE_US.href}>{PHONE_US.display}</a> (US)
  </>
);

const COPY: Record<Lang, Copy> = {
  es: {
    eyebrow: 'Documento legal',
    title: 'Privacidad',
    updated: 'Última actualización: 18 de septiembre de 2026',
    lead:
      'Esta página describe exactamente qué datos recoge este sitio y qué hacemos con ellos. Está escrita en español simple a propósito: si algo no se entiende, no sirve.',
    sections: [
      {
        title: 'Qué recogemos',
        body: (
          <>
            <p>Solamente lo que tú escribes. No hay nada más:</p>
            <ul>
              <li>
                <strong>Del formulario de contacto:</strong> tu nombre, tu correo, el nombre de tu
                negocio (opcional), tu mensaje y la categoría que elegiste.
              </li>
              <li>
                <strong>De la Academia,</strong> si creas una cuenta: tu correo y tu contraseña. La
                contraseña la guarda cifrada nuestro proveedor; nosotros nunca la vemos.
              </li>
            </ul>
          </>
        ),
      },
      {
        title: 'Qué no recogemos',
        body: (
          <ul>
            <li>No usamos Google Analytics ni ninguna otra herramienta de analítica.</li>
            <li>No tenemos píxeles de publicidad ni rastreadores de terceros.</li>
            <li>No compramos, vendemos ni intercambiamos datos con nadie.</li>
            <li>
              No usamos cookies de publicidad. Las únicas cookies del sitio son las que mantienen tu
              sesión abierta en la Academia, y solo existen si inicias sesión.
            </li>
          </ul>
        ),
      },
      {
        title: 'Tu dirección IP',
        body: (
          <p>
            Cuando envías el formulario leemos tu IP durante unos segundos para impedir que alguien
            mande cientos de mensajes seguidos. No se guarda en ninguna base de datos ni queda
            asociada a tu mensaje: vive en la memoria del servidor y desaparece sola.
          </p>
        ),
      },
      {
        title: 'Para qué usamos tus datos',
        body: (
          <>
            <p>
              Para responderte. Nada más. Tu mensaje llega a un panel interno que solo nosotros
              podemos abrir, y lo leemos para contestarte por correo o por teléfono.
            </p>
            <p>
              No te vamos a suscribir a un boletín ni te vamos a escribir por algo distinto de tu
              consulta.
            </p>
          </>
        ),
      },
      {
        title: 'Dónde se guardan',
        body: (
          <p>
            En <strong>Supabase</strong>, nuestro proveedor de base de datos, y el sitio está
            alojado en <strong>Vercel</strong>. Ambos son proveedores de infraestructura: procesan
            los datos para poder prestarnos el servicio, no los usan para fines propios.
          </p>
        ),
      },
      {
        title: 'Cuánto tiempo los conservamos',
        body: (
          <p>
            Los mensajes de contacto se quedan mientras la conversación siga siendo útil. Si nos
            pides que borremos el tuyo, lo borramos. Las cuentas de la Academia duran mientras
            quieras tenerlas.
          </p>
        ),
      },
      {
        title: 'Qué puedes pedirnos',
        body: (
          <>
            <p>En cualquier momento y sin dar explicaciones, puedes pedirnos que:</p>
            <ul>
              <li>te digamos qué datos tuyos tenemos,</li>
              <li>corrijamos algo que esté mal,</li>
              <li>borremos todo lo que tengamos de ti.</li>
            </ul>
            <p>
              Escríbenos desde <Link href="/contacto">la página de contacto</Link> o llámanos al{' '}
              {telefonos}. Respondemos en menos de 48 horas.
            </p>
          </>
        ),
      },
      {
        title: 'Menores de edad',
        body: (
          <p>
            Este sitio está dirigido a personas que toman decisiones por un negocio. No pedimos ni
            buscamos datos de menores de edad.
          </p>
        ),
      },
      {
        title: 'Si esto cambia',
        body: (
          <p>
            Si modificamos esta política, cambiamos la fecha de arriba. Si el cambio afecta cómo
            tratamos datos que ya nos diste, te avisamos antes por el correo con el que nos
            escribiste.
          </p>
        ),
      },
    ],
    note: 'AlphaDev Studios · Gabriel Zavarse · Remoto, con base en Latinoamérica',
  },
  en: {
    eyebrow: 'Legal',
    title: 'Privacy',
    updated: 'Last updated: September 18, 2026',
    lead:
      'This page describes exactly what data this site collects and what we do with it. It is written in plain English on purpose: if you cannot understand it, it is not doing its job.',
    sections: [
      {
        title: 'What we collect',
        body: (
          <>
            <p>Only what you type. That is all:</p>
            <ul>
              <li>
                <strong>From the contact form:</strong> your name, your email, your business name
                (optional), your message, and the category you picked.
              </li>
              <li>
                <strong>From the Academy,</strong> if you create an account: your email and your
                password. Our provider stores the password encrypted; we never see it.
              </li>
            </ul>
          </>
        ),
      },
      {
        title: 'What we do not collect',
        body: (
          <ul>
            <li>We do not use Google Analytics or any other analytics tool.</li>
            <li>We have no advertising pixels and no third-party trackers.</li>
            <li>We do not buy, sell, or trade data with anyone.</li>
            <li>
              We use no advertising cookies. The only cookies on this site are the ones that keep
              you signed in to the Academy, and they only exist if you sign in.
            </li>
          </ul>
        ),
      },
      {
        title: 'Your IP address',
        body: (
          <p>
            When you submit the form we read your IP for a few seconds to stop anyone from sending
            hundreds of messages in a row. It is never written to a database and never gets attached
            to your message: it lives in the server memory and disappears on its own.
          </p>
        ),
      },
      {
        title: 'What we use your data for',
        body: (
          <>
            <p>
              To reply to you. Nothing else. Your message lands in an internal panel only we can
              open, and we read it to get back to you by email or phone.
            </p>
            <p>
              We will not add you to a newsletter and we will not contact you about anything other
              than your enquiry.
            </p>
          </>
        ),
      },
      {
        title: 'Where it is stored',
        body: (
          <p>
            In <strong>Supabase</strong>, our database provider, and the site itself is hosted on{' '}
            <strong>Vercel</strong>. Both are infrastructure providers: they process the data so
            they can run the service for us, not for purposes of their own.
          </p>
        ),
      },
      {
        title: 'How long we keep it',
        body: (
          <p>
            Contact messages stay for as long as the conversation is still useful. If you ask us to
            delete yours, we delete it. Academy accounts last as long as you want them.
          </p>
        ),
      },
      {
        title: 'What you can ask us for',
        body: (
          <>
            <p>At any time, and without explaining why, you can ask us to:</p>
            <ul>
              <li>tell you what data of yours we hold,</li>
              <li>correct anything that is wrong,</li>
              <li>delete everything we have about you.</li>
            </ul>
            <p>
              Write to us from <Link href="/contacto">the contact page</Link> or call us at{' '}
              {telefonos}. We answer within 48 hours.
            </p>
          </>
        ),
      },
      {
        title: 'Minors',
        body: (
          <p>
            This site is aimed at people who make decisions for a business. We do not ask for or
            seek out data from minors.
          </p>
        ),
      },
      {
        title: 'If this changes',
        body: (
          <p>
            If we update this policy, we change the date above. If the change affects how we handle
            data you already gave us, we tell you first at the email address you wrote from.
          </p>
        ),
      },
    ],
    note: 'AlphaDev Studios · Gabriel Zavarse · Remote, based in Latin America',
  },
};

export default function PrivacidadContent() {
  const { lang } = useLang();
  const copy = COPY[lang];

  return (
    <main className="legal-page">
      <div className="section-container legal-doc">
        <header className="legal-header">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="section-title">{copy.title}</h1>
          <p className="legal-updated">{copy.updated}</p>
        </header>

        <p className="legal-lead">{copy.lead}</p>

        {copy.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.body}
          </section>
        ))}

        <p className="legal-note">{copy.note}</p>
      </div>
    </main>
  );
}
