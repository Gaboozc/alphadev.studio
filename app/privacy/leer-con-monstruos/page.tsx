import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad — Leer con Monstruos',
  description:
    'Política de privacidad de Leer con Monstruos, app educativa de lectura para niños de preescolar. La app no recopila datos personales y funciona completamente offline.',
  robots: { index: true, follow: false },
  alternates: { canonical: 'https://alphadev.studio/privacy/leer-con-monstruos' },
  openGraph: { url: 'https://alphadev.studio/privacy/leer-con-monstruos' },
};

export default function PrivacyLeerConMonstruosPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="section-container" style={{ maxWidth: '48rem', margin: '0 auto' }}>

        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '1rem',
          }}>
            Documento Legal
          </p>
          <h1 className="section-title" style={{ marginBottom: '1rem' }}>
            Política de Privacidad
          </h1>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            marginBottom: '0.5rem',
          }}>
            Leer con Monstruos
          </p>
          <div className="gold-divider" style={{ margin: '1.5rem auto' }} />
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.875rem',
            color: 'var(--text-subtle)',
          }}>
            Última actualización: 21 de mayo de 2026
          </p>
        </header>

        {/* Content */}
        <div style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '1rem',
          lineHeight: '1.75',
          color: 'var(--text-muted)',
        }}>

          {/* Introducción */}
          <Section title="1. Introducción">
            <p>
              Esta Política de Privacidad describe cómo <strong style={{ color: 'var(--text)' }}>AlphaDev Studios</strong>{' '}
              (el "Desarrollador") maneja la información en relación con la aplicación móvil{' '}
              <strong style={{ color: 'var(--text)' }}>Leer con Monstruos</strong> (la "App"), disponible en Google Play.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Leer con Monstruos es una aplicación educativa de lectura diseñada para niños en edad preescolar
              (3 a 6 años). Ayuda a los niños a aprender las letras del alfabeto de forma lúdica e interactiva.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Nos comprometemos a proteger la privacidad de los usuarios, especialmente la de los niños.
              Esta política explica de manera clara qué información manejamos —y qué información <em>no</em> manejamos.
            </p>
          </Section>

          {/* No recopilamos */}
          <Section title="2. Información que NO recopilamos">
            <p>
              La App <strong style={{ color: 'var(--text)' }}>no recopila ningún tipo de dato personal</strong>,
              ya sea del menor ni de sus padres o tutores. Específicamente, la App no recopila:
            </p>
            <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                'Nombres, apellidos o cualquier identificador personal',
                'Direcciones de correo electrónico',
                'Número de teléfono',
                'Fecha de nacimiento',
                'Ubicación geográfica (GPS o aproximada)',
                'Dirección IP',
                'Identificadores de dispositivo (IDFA, GAID o similares)',
                'Fotos, videos o grabaciones de voz',
                'Información de contactos del dispositivo',
                'Datos financieros o de pago',
                'Cualquier otro dato personal de cualquier tipo',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Almacenamiento local */}
          <Section title="3. Almacenamiento local en el dispositivo">
            <p>
              La App guarda <strong style={{ color: 'var(--text)' }}>únicamente el progreso del niño</strong>{' '}
              (por ejemplo, qué letras del alfabeto ha completado) de forma local en el dispositivo Android,
              utilizando el almacenamiento interno de la aplicación (SharedPreferences).
            </p>
            <p style={{ marginTop: '1rem' }}>
              Este dato de progreso:
            </p>
            <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                'Nunca se transmite a ningún servidor externo ni a internet.',
                'No está vinculado a ninguna identidad personal.',
                'Solo existe en el dispositivo donde está instalada la App.',
                'Se elimina al desinstalar la App.',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--gold-light)', fontWeight: 700, flexShrink: 0 }}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Sin anuncios ni terceros */}
          <Section title="4. Sin anuncios ni servicios de terceros">
            <p>
              La App <strong style={{ color: 'var(--text)' }}>no contiene publicidad</strong> de ningún tipo.
              No integramos redes publicitarias, SDKs de análisis, herramientas de seguimiento ni servicios
              de terceros que pudieran recopilar datos de los usuarios.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Dado que la App funciona <strong style={{ color: 'var(--text)' }}>completamente sin conexión a internet</strong>{' '}
              (100% offline), no existe ninguna comunicación de datos entre la App y servidores externos,
              incluyendo los del Desarrollador.
            </p>
          </Section>

          {/* Permisos */}
          <Section title="5. Permisos del dispositivo">
            <p>
              La App <strong style={{ color: 'var(--text)' }}>no solicita permisos sensibles</strong> en el
              dispositivo Android. En particular, la App no accede ni solicita acceso a:
            </p>
            <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                'Cámara',
                'Micrófono',
                'Ubicación (GPS ni aproximada)',
                'Contactos',
                'Almacenamiento externo (fotos, archivos)',
                'Calendario',
                'Teléfono o mensajes',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: '1rem' }}>
              La única función que utiliza el sistema operativo es el acceso al almacenamiento interno privado
              de la aplicación (para guardar el progreso), lo cual es estándar y no requiere permiso explícito
              del usuario en Android.
            </p>
          </Section>

          {/* COPPA */}
          <Section title="6. Cumplimiento con leyes de privacidad infantil">
            <p>
              La App está diseñada para cumplir con la{' '}
              <strong style={{ color: 'var(--text)' }}>
                Ley de Protección de la Privacidad Infantil en Línea (COPPA)
              </strong>{' '}
              de los Estados Unidos y con las{' '}
              <strong style={{ color: 'var(--text)' }}>
                Políticas para Familias de Google Play
              </strong>.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Dado que la App no recopila ningún dato personal —ni de menores ni de adultos—, no requiere
              consentimiento parental para la recopilación de datos bajo COPPA. No existe ningún mecanismo
              de recopilación de datos que activar o desactivar.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Si usted es padre, madre o tutor y tiene preguntas o preocupaciones sobre la privacidad de
              su hijo al usar esta App, puede contactarnos en cualquier momento (ver sección 9).
            </p>
          </Section>

          {/* Seguridad */}
          <Section title="7. Seguridad">
            <p>
              Dado que la App no recopila ni transmite ningún dato personal, el riesgo de exposición de
              información es mínimo. El progreso del niño se almacena de forma local y privada en el
              dispositivo, protegido por el sistema de aislamiento de aplicaciones de Android
              (sandboxing), al que otras aplicaciones no pueden acceder.
            </p>
          </Section>

          {/* Cambios */}
          <Section title="8. Cambios a esta política">
            <p>
              Podemos actualizar esta Política de Privacidad ocasionalmente para reflejar cambios en la App
              o en requisitos legales. Cualquier cambio se publicará en esta misma página con una nueva
              fecha de "Última actualización".
            </p>
            <p style={{ marginTop: '1rem' }}>
              Le recomendamos revisar esta política periódicamente. El uso continuado de la App después de
              la publicación de cambios constituye su aceptación de dichos cambios.
            </p>
          </Section>

          {/* Contacto */}
          <Section title="9. Contacto">
            <p>
              Si tiene preguntas, comentarios o inquietudes sobre esta Política de Privacidad o sobre la
              App, puede contactar al Desarrollador:
            </p>
            <div style={{
              marginTop: '1.25rem',
              padding: '1.5rem',
              backgroundColor: 'var(--bg-alt)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
            }}>
              <p style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem' }}>AlphaDev Studios</p>
              <p>Desarrollador: Gabriel Zavarse</p>
              <p style={{ marginTop: '0.5rem' }}>
                Email:{' '}
                <a
                  href="mailto:zavarsegabriel@gmail.com"
                  style={{ color: 'var(--gold)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  zavarsegabriel@gmail.com
                </a>
              </p>
            </div>
          </Section>

          {/* Footer note */}
          <div style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
            textAlign: 'center',
          }}>
            <div className="gold-divider" style={{ margin: '0 auto 1.5rem' }} />
            <p style={{ fontSize: '0.875rem', color: 'var(--text-subtle)' }}>
              Esta política aplica exclusivamente a la aplicación <strong>Leer con Monstruos</strong>.
              Para conocer las prácticas de privacidad generales de AlphaDev Studios,
              visita{' '}
              <a
                href="https://alphadev.studio"
                style={{ color: 'var(--gold)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                alphadev.studio
              </a>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2 style={{
        fontFamily: 'var(--font-inter)',
        fontSize: '1rem',
        fontWeight: 600,
        color: 'var(--gold)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: '1rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid var(--border)',
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
