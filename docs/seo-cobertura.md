# Cobertura SEO (checklist de verificación)

Inventario al 7 de noviembre de 2026 sobre HEAD de trabajo local. **No se
cuenta “20/20”**: la lista traída por locust tiene estas unidades. Cada fila
es hecho / ya existía / pendiente / no aplica.

CWV de laboratorio y de campo no se midieron aquí (sin Lighthouse de campo
ni CrUX). Quedan pendientes.

| # | Unidad | Estado | Notas |
|---|---|---|---|
| 1 | sitemap | Hecho (mejora) + ya existía | `app/sitemap.ts` ya listaba públicas es/en, demos y guías. Se añadió `x-default`, guarda sin Supabase y tests. Sigue fuera: admin, auth, academia, tarjeta, gracias, descargar |
| 2 | robots | Hecho | `app/robots.ts` sustituye `public/robots.txt`. Sitemap en **www** (antes apex). Disallow de privadas/checkout. Ya no se bloquea `/_next/` |
| 3 | noindex accidental en público | Ya existía / comprobado | Públicas con `index, follow`. Gracias, admin, academia, acceso, 404, tarjeta: noindex. Se añadió noindex de layout en `/admin` y `X-Robots-Tag` en descargas |
| 4 | canonical | Ya existía / coherente | `metadataBase` y canonicales en www. Apex público responde 308 → www. No se cambiaron URLs ni se añadieron redirects nuevos |
| 5 | titles / descriptions | Hecho (ajuste) + ya existía | Home y resto ya tenían metadata i18n. Se precisaron title de `/servicios` y `/contacto` y la description de privacidad. Sin stuffing ni servicios inventados |
| 6 | H1 / jerarquía | Ya existía | Un H1 por página pública (hero, servicios, contacto, etc.). No se rediseñó. Hay `<main>` anidado (layout + páginas): pendiente menor, no tocado |
| 7 | alt | Ya existía | Fotos de clientes con alt descriptivo; decorativas con `alt=""`. No se exigió role. Fuera de alcance cambiar alts |
| 8 | schema | Ya existía / ajuste menor | Organization + WebSite verificables (nombre, url, teléfonos US/MX). Sin dirección, reseñas ni LocalBusiness. Se quitó la frase “soluciones digitales” del JSON-LD |
| 9 | enlaces internos / rotos | Ya existía / no auditado en browser | `SiteLink` i18n. No se recorrió cada href en este cambio. Pendiente: crawl de preview |
| 10 | imágenes | Ya existía | WebP de sección, OG compuesto. Fuera de rediseño |
| 11 | CWV | Pendiente | Sin medición de laboratorio antes/después ni datos de campo. No se usa overflow oculto como “arreglo” |
| 12 | móvil | Ya existía / pendiente de verificar en preview | El sitio es responsive; no se re-verificó viewport en este paso por el bloqueo de push |
| 13 | HTTPS | Ya existía | alphadev.studio y www sirven HTTPS; HSTS presente en headers públicos |
| 14 | slugs | Ya existía | No se migraron URLs. `/contacto/startup` y `/enterprise` ya no existen en código (documentado en CLAUDE.md) |
| 15 | og:image | Ya existía | `app/opengraph-image.tsx` 1200×630 |
| 16 | Search Console | Pendiente (doc) | `docs/seo-pendientes-gsc-gbp.md`. Sin verificación DNS ni indexación |
| 17 | llms.txt | No aplicar en este cambio | En producción responde un `llms.txt` **que no está en el repo** y afirma email/teléfono/precios/rutas de contacto que no coinciden con el código. Es experimental; no se copia ni se promete ranking. Dejarlo, corregirlo o retirarlo es decisión de Gabriel |
| 18 | noindex admin/staging/auth | Ya existía + refuerzo | Layout academia, páginas admin, acceso, gracias. robots disallow adicional. Auth sigue en layout/middleware/actions |
| 19 | GA4 + consentimiento | Hecho (inactivo sin ID) | Código listo. En prod pública no hay gtag ni ID en HTML. Sin ID el banner no se muestra |
| 20 | Conversiones | Hecho (código; inactivo sin ID+consent) | Lead solo si el mensaje se guardó. Purchase solo si `confirmarCompra` ok. CTA click ≠ conversión. Dedupe por sesión. Sin PII |

Unidades de la lista: 20 filas de verificación (sitemap … conversiones). No se
inventaron ítems extra para redondear.
