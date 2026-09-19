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

const telefonos = (
  <>
    <a href={PHONE_MX.href}>{PHONE_MX.display}</a> (MX) <span aria-hidden="true">·</span>{' '}
    <a href={PHONE_US.href}>{PHONE_US.display}</a> (US)
  </>
);

// El marcador de plantilla se escribe igual en los dos idiomas: es literalmente
// lo que aparece en los archivos.
const marcador = <code>{'{{Tu Logo}}'}</code>;

const COPY: Record<Lang, Copy> = {
  es: {
    eyebrow: 'Documento legal',
    title: 'Términos',
    updated: 'Última actualización: 18 de septiembre de 2026',
    lead:
      'Las condiciones de uso de este sitio. Navegarlo no te obliga a nada y no crea ninguna relación comercial: eso se acuerda aparte y por escrito.',
    sections: [
      {
        title: 'Qué es este sitio',
        body: (
          <p>
            alphadev.studio es el sitio de AlphaDev Studios. Sirve para mostrar lo que hacemos,
            enseñar el trabajo que entregamos y darte una forma de contactarnos. También aloja la
            Academia, un área privada a la que solo se entra con cuenta.
          </p>
        ),
      },
      {
        title: 'Contactarnos no es contratar',
        body: (
          <>
            <p>
              Llenar el formulario no te compromete a nada ni nos compromete a nosotros. Cualquier
              trabajo se define después: alcance, precio y fecha por escrito, y hasta que eso exista
              no hay acuerdo.
            </p>
            <p>
              En el sitio no publicamos precios porque cada proyecto se cotiza según lo que
              necesita.
            </p>
          </>
        ),
      },
      {
        title: 'Las plantillas que mostramos',
        body: (
          <>
            <p>
              Las plantillas por rubro son <strong>puntos de partida</strong> que adaptamos a cada
              cliente: no son clientes nuestros ni trabajo ya entregado, y lo decimos en la misma
              página donde se ven. Tampoco se venden por separado como archivo: son la base sobre la
              que construimos si trabajamos juntos.
            </p>
            <p>
              Los textos entre llaves —{marcador}— son huecos a rellenar; ninguna cifra que aparezca
              en ellos es un dato real de nadie.
            </p>
          </>
        ),
      },
      {
        title: 'El trabajo de clientes',
        body: (
          <p>
            Los sitios que mostramos en Resultados son de nuestros clientes y los publicamos con su
            conocimiento. Sus nombres, logos y marcas les pertenecen a ellos, no a nosotros. Los
            enlaces abren sus sitios reales, que están fuera de nuestro control: lo que pase ahí es
            responsabilidad de cada negocio.
          </p>
        ),
      },
      {
        title: 'Lo que es nuestro',
        body: (
          <p>
            El diseño, los textos y el código de este sitio son de AlphaDev Studios. Puedes citarlo
            o compartirlo mencionando la fuente; no puedes copiarlo para ofrecer un servicio igual.
          </p>
        ),
      },
      {
        title: 'La Academia',
        body: (
          <p>
            La cuenta es personal e intransferible: no compartas tus credenciales. Podemos cerrar
            una cuenta si se usa para redistribuir el contenido. El material es para aprender, no
            para revenderlo.
          </p>
        ),
      },
      {
        title: 'Disponibilidad',
        body: (
          <p>
            Hacemos lo posible por mantener el sitio en línea, pero no prometemos que esté
            disponible sin interrupciones. Puede haber mantenimiento, fallas del proveedor o cambios
            en el contenido sin aviso previo.
          </p>
        ),
      },
      {
        title: 'Si esto cambia',
        body: (
          <p>
            Si actualizamos estos términos, cambiamos la fecha de arriba. Seguir usando el sitio
            después de un cambio significa que lo aceptas.
          </p>
        ),
      },
      {
        title: 'Dudas',
        body: (
          <p>
            Escríbenos desde <Link href="/contacto">la página de contacto</Link> o llámanos al{' '}
            {telefonos}.
          </p>
        ),
      },
    ],
    note: 'AlphaDev Studios · Gabriel Zavarse · Remoto, con base en Latinoamérica',
  },
  en: {
    eyebrow: 'Legal',
    title: 'Terms',
    updated: 'Last updated: September 18, 2026',
    lead:
      'The terms for using this site. Browsing it commits you to nothing and creates no business relationship: that is agreed separately and in writing.',
    sections: [
      {
        title: 'What this site is',
        body: (
          <p>
            alphadev.studio is the site of AlphaDev Studios. It exists to show what we do, present
            the work we deliver, and give you a way to reach us. It also hosts the Academy, a
            private area you can only enter with an account.
          </p>
        ),
      },
      {
        title: 'Contacting us is not hiring us',
        body: (
          <>
            <p>
              Filling in the form commits neither you nor us. Any work is defined afterwards: scope,
              price, and date in writing, and until that exists there is no agreement.
            </p>
            <p>
              We do not publish prices on the site because every project is quoted for what it
              actually needs.
            </p>
          </>
        ),
      },
      {
        title: 'The templates we show',
        body: (
          <>
            <p>
              The industry templates are <strong>starting points</strong> that we adapt to each
              client: they are not our clients and not delivered work, and we say so on the same
              page where you see them. They are also not sold separately as files: they are the base
              we build on if we work together.
            </p>
            <p>
              The text inside braces — {marcador} — marks a blank to fill in; no figure shown in one
              is anybody&apos;s real data.
            </p>
          </>
        ),
      },
      {
        title: 'Client work',
        body: (
          <p>
            The sites shown under Results belong to our clients and are published with their
            knowledge. Their names, logos, and brands are theirs, not ours. The links open their
            real sites, which are outside our control: what happens there is each business&apos;s
            responsibility.
          </p>
        ),
      },
      {
        title: 'What is ours',
        body: (
          <p>
            The design, the copy, and the code of this site belong to AlphaDev Studios. You may
            quote or share it with attribution; you may not copy it to offer the same service.
          </p>
        ),
      },
      {
        title: 'The Academy',
        body: (
          <p>
            Your account is personal and non-transferable: do not share your credentials. We may
            close an account used to redistribute the content. The material is for learning, not for
            reselling.
          </p>
        ),
      },
      {
        title: 'Availability',
        body: (
          <p>
            We do our best to keep the site online, but we do not promise uninterrupted
            availability. There may be maintenance, provider outages, or content changes without
            prior notice.
          </p>
        ),
      },
      {
        title: 'If this changes',
        body: (
          <p>
            If we update these terms, we change the date above. Continuing to use the site after a
            change means you accept it.
          </p>
        ),
      },
      {
        title: 'Questions',
        body: (
          <p>
            Write to us from <Link href="/contacto">the contact page</Link> or call us at{' '}
            {telefonos}.
          </p>
        ),
      },
    ],
    note: 'AlphaDev Studios · Gabriel Zavarse · Remote, based in Latin America',
  },
};

export default function TerminosContent() {
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
