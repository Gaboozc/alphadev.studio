import type { Metadata } from 'next';
import Link from 'next/link';
import { PHONE_MX, PHONE_US } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Privacidad',
  description:
    'Qué datos recoge alphadev.studio, para qué se usan y cómo pedir que se borren. Sin analítica ni rastreo de terceros.',
  alternates: { canonical: '/privacidad' },
  openGraph: { url: '/privacidad' },
};

const ACTUALIZADO = '18 de septiembre de 2026';

export default function PrivacidadPage() {
  return (
    <main className="legal-page">
      <div className="section-container legal-doc">
        <header className="legal-header">
          <p className="eyebrow">Documento legal</p>
          <h1 className="section-title">Privacidad</h1>
          <p className="legal-updated">Última actualización: {ACTUALIZADO}</p>
        </header>

        <p className="legal-lead">
          Esta página describe exactamente qué datos recoge este sitio y qué hacemos con ellos.
          Está escrita en español simple a propósito: si algo no se entiende, no sirve.
        </p>

        <section>
          <h2>Qué recogemos</h2>
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
        </section>

        <section>
          <h2>Qué no recogemos</h2>
          <ul>
            <li>No usamos Google Analytics ni ninguna otra herramienta de analítica.</li>
            <li>No tenemos píxeles de publicidad ni rastreadores de terceros.</li>
            <li>No compramos, vendemos ni intercambiamos datos con nadie.</li>
            <li>
              No usamos cookies de publicidad. Las únicas cookies del sitio son las que mantienen
              tu sesión abierta en la Academia, y solo existen si inicias sesión.
            </li>
          </ul>
        </section>

        <section>
          <h2>Tu dirección IP</h2>
          <p>
            Cuando envías el formulario leemos tu IP durante unos segundos para impedir que alguien
            mande cientos de mensajes seguidos. No se guarda en ninguna base de datos ni queda
            asociada a tu mensaje: vive en la memoria del servidor y desaparece sola.
          </p>
        </section>

        <section>
          <h2>Para qué usamos tus datos</h2>
          <p>
            Para responderte. Nada más. Tu mensaje llega a un panel interno que solo nosotros
            podemos abrir, y lo leemos para contestarte por correo o por teléfono.
          </p>
          <p>
            No te vamos a suscribir a un boletín ni te vamos a escribir por algo distinto de tu
            consulta.
          </p>
        </section>

        <section>
          <h2>Dónde se guardan</h2>
          <p>
            En <strong>Supabase</strong>, nuestro proveedor de base de datos, y el sitio está alojado
            en <strong>Vercel</strong>. Ambos son proveedores de infraestructura: procesan los datos
            para poder prestarnos el servicio, no los usan para fines propios.
          </p>
        </section>

        <section>
          <h2>Cuánto tiempo los conservamos</h2>
          <p>
            Los mensajes de contacto se quedan mientras la conversación siga siendo útil. Si nos
            pides que borremos el tuyo, lo borramos. Las cuentas de la Academia duran mientras
            quieras tenerlas.
          </p>
        </section>

        <section>
          <h2>Qué puedes pedirnos</h2>
          <p>En cualquier momento y sin dar explicaciones, puedes pedirnos que:</p>
          <ul>
            <li>te digamos qué datos tuyos tenemos,</li>
            <li>corrijamos algo que esté mal,</li>
            <li>borremos todo lo que tengamos de ti.</li>
          </ul>
          <p>
            Escríbenos desde <Link href="/contacto">la página de contacto</Link> o llámanos al{' '}
            <a href={PHONE_MX.href}>{PHONE_MX.display}</a> (MX) o{' '}
            <a href={PHONE_US.href}>{PHONE_US.display}</a> (US). Respondemos en menos de 48 horas.
          </p>
        </section>

        <section>
          <h2>Menores de edad</h2>
          <p>
            Este sitio está dirigido a personas que toman decisiones por un negocio. No pedimos ni
            buscamos datos de menores de edad.
          </p>
        </section>

        <section>
          <h2>Si esto cambia</h2>
          <p>
            Si modificamos esta política, cambiamos la fecha de arriba. Si el cambio afecta cómo
            tratamos datos que ya nos diste, te avisamos antes por el correo con el que nos
            escribiste.
          </p>
        </section>

        <p className="legal-note">
          AlphaDev Studios · Gabriel Zavarse · Remoto, con base en Latinoamérica
        </p>
      </div>
    </main>
  );
}
