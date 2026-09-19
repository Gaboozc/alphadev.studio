import type { Metadata } from 'next';
import Link from 'next/link';
import { PHONE_MX, PHONE_US } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Términos',
  description:
    'Condiciones de uso de alphadev.studio: qué es este sitio, qué son las plantillas que se muestran y qué se acuerda por separado.',
  alternates: { canonical: '/terminos' },
  openGraph: { url: '/terminos' },
};

const ACTUALIZADO = '18 de septiembre de 2026';

export default function TerminosPage() {
  return (
    <main className="legal-page">
      <div className="section-container legal-doc">
        <header className="legal-header">
          <p className="eyebrow">Documento legal</p>
          <h1 className="section-title">Términos</h1>
          <p className="legal-updated">Última actualización: {ACTUALIZADO}</p>
        </header>

        <p className="legal-lead">
          Las condiciones de uso de este sitio. Navegarlo no te obliga a nada y no crea ninguna
          relación comercial: eso se acuerda aparte y por escrito.
        </p>

        <section>
          <h2>Qué es este sitio</h2>
          <p>
            alphadev.studio es el sitio de AlphaDev Studios. Sirve para mostrar lo que hacemos,
            enseñar el trabajo que entregamos y darte una forma de contactarnos. También aloja la
            Academia, un área privada a la que solo se entra con cuenta.
          </p>
        </section>

        <section>
          <h2>Contactarnos no es contratar</h2>
          <p>
            Llenar el formulario no te compromete a nada ni nos compromete a nosotros. Cualquier
            trabajo se define después: alcance, precio y fecha por escrito, y hasta que eso exista
            no hay acuerdo.
          </p>
          <p>
            En el sitio no publicamos precios porque cada proyecto se cotiza según lo que necesita.
          </p>
        </section>

        <section>
          <h2>Las plantillas que mostramos</h2>
          <p>
            Las plantillas por rubro son <strong>puntos de partida</strong> que adaptamos a cada
            cliente: no son clientes nuestros ni trabajo ya entregado, y lo decimos en la misma
            página donde se ven. Tampoco se venden por separado como archivo: son la base sobre la
            que construimos si trabajamos juntos.
          </p>
          <p>
            Los textos entre llaves —<code>{'{{Tu Logo}}'}</code>— son huecos a rellenar; ninguna
            cifra que aparezca en ellos es un dato real de nadie.
          </p>
        </section>

        <section>
          <h2>El trabajo de clientes</h2>
          <p>
            Los sitios que mostramos en Resultados son de nuestros clientes y los publicamos con su
            conocimiento. Sus nombres, logos y marcas les pertenecen a ellos, no a nosotros. Los
            enlaces abren sus sitios reales, que están fuera de nuestro control: lo que pase ahí es
            responsabilidad de cada negocio.
          </p>
        </section>

        <section>
          <h2>Lo que es nuestro</h2>
          <p>
            El diseño, los textos y el código de este sitio son de AlphaDev Studios. Puedes citarlo
            o compartirlo mencionando la fuente; no puedes copiarlo para ofrecer un servicio igual.
          </p>
        </section>

        <section>
          <h2>La Academia</h2>
          <p>
            La cuenta es personal e intransferible: no compartas tus credenciales. Podemos cerrar
            una cuenta si se usa para redistribuir el contenido. El material es para aprender, no
            para revenderlo.
          </p>
        </section>

        <section>
          <h2>Disponibilidad</h2>
          <p>
            Hacemos lo posible por mantener el sitio en línea, pero no prometemos que esté
            disponible sin interrupciones. Puede haber mantenimiento, fallas del proveedor o
            cambios en el contenido sin aviso previo.
          </p>
        </section>

        <section>
          <h2>Si esto cambia</h2>
          <p>
            Si actualizamos estos términos, cambiamos la fecha de arriba. Seguir usando el sitio
            después de un cambio significa que lo aceptas.
          </p>
        </section>

        <section>
          <h2>Dudas</h2>
          <p>
            Escríbenos desde <Link href="/contacto">la página de contacto</Link> o llámanos al{' '}
            <a href={PHONE_MX.href}>{PHONE_MX.display}</a> (MX) o{' '}
            <a href={PHONE_US.href}>{PHONE_US.display}</a> (US).
          </p>
        </section>

        <p className="legal-note">
          AlphaDev Studios · Gabriel Zavarse · Remoto, con base en Latinoamérica
        </p>
      </div>
    </main>
  );
}
