# Pendientes humanos: Search Console y Google Business Profile

Estado al 7 de noviembre de 2026. Este documento **no verifica** propiedades
remotas ni publica fichas. No hay DNS, meta tags de verificación ni solicitudes
de indexación en el código.

## Google Search Console

| Paso | Quién | Estado |
|---|---|---|
| Tener una cuenta Google con acceso a alphadev.studio | Gabriel | Pendiente de confirmar |
| Añadir la propiedad del **dominio** `alphadev.studio` (cubre apex y www) o, si ya existe una de prefijo, alinear con `https://www.alphadev.studio` (canónico actual; el apex hace 308 a www) | Gabriel | Pendiente |
| Verificar por DNS en el registrador/Vercel **solo cuando Gabriel lo autorice** | Gabriel | No hecho en este cambio. El código no añade registros |
| Enviar el sitemap `https://www.alphadev.studio/sitemap.xml` | Gabriel, después de verificar | Pendiente. No se promete indexación |
| Revisar cobertura: que `/admin`, `/acceso`, `/academia`, `/tarjeta`, `/recursos/gracias` y `/recursos/descargar` no se anuncien | Gabriel | El sitemap y robots locales ya las excluyen; GSC lo confirma tras verificar |

No se asume que hoy haya propiedad, que el HTML esté verificado, ni que Google
vaya a indexar nada por el solo hecho de existir un sitemap.

## Google Business Profile

AlphaDev Studios se presenta como estudio remoto (LATAM) con teléfonos US y MX.
**No se asume elegibilidad.** GBP está pensado para negocios que atienden en
un lugar visitable o un área de servicio verificable. Un estudio 100 % remoto
sin dirección de atención al público **puede no calificar**.

| Pregunta | Qué falta |
|---|---|
| ¿Hay un local o área de servicio que Google acepte? | Gabriel decide. No se crea ni se publica un perfil desde aquí |
| ¿El perfil, si existiera, sería de AlphaDev o de un cliente? | En el sitio, “Google Business” es un **servicio que se ofrece a clientes**, no prueba de que AlphaDev tenga ficha propia |
| Datos de NAP, horarios, fotos, categorías | No se inventan. No hay dirección en el schema del sitio a propósito |

Hasta que Gabriel confirme elegibilidad y acceso, GBP queda **fuera de
publicación**. Crear una ficha con dirección o reseñas inventadas rompería
tanto la política de Google como el schema del sitio.

## Qué no hace este repo

- No crea cuentas de Google, GSC ni GBP
- No añade `google-site-verification`
- No dispara indexación
- No cambia DNS
- No publica `llms.txt` nuevo (el que responde en producción no está en este
  repo y contiene datos no verificables; ver `docs/seo-cobertura.md`)
