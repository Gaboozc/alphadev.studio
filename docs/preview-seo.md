# Preview local seguro (SEO y medición)

No apunta a producción. No envía formularios ni eventos a alphadev.studio.

## Arranque

```bash
npm test
npm run lint
npm run build
npm run dev
```

El build **no necesita** secretos de PayPal, Resend ni service role. El
sitemap, si no hay variables de Supabase, omite el catálogo de guías y sigue
sirviendo las URLs estáticas.

## Analítica

- Deja `NEXT_PUBLIC_ANALYTICS_ID` **vacío** (como en `.env.example`). El aviso
  de consentimiento no debe aparecer y no se carga gtag.
- No copies un ID de producción a preview. Si alguien prueba el banner en un
  entorno suyo, que sea una propiedad de desarrollo **suya**, nunca la de prod,
  y sin mandar eventos de prueba a la propiedad real.
- No envíes el formulario de contacto de producción. En local, el honeypot
  (`sitio`) no debe marcar conversión; un envío válido sí monta
  `ConversionBeacon` solo en el cliente local.

## Qué mirar en preview

1. `/robots.txt` — sitemap en `https://www.alphadev.studio/sitemap.xml`,
   disallow de `/admin/`, `/acceso`, `/academia/`, `/tarjeta/`, `/api/`,
   gracias y descargas. No bloquea `/_next/`.
2. `/sitemap.xml` — www, hreflang es/en y `x-default` al español. Sin admin.
3. Home y `/en` — un H1, canonical, hreflang recíproco.
4. `/contacto` y `/en/contacto` — title alineado con la intención de la página.
5. `/privacidad` — texto de analítica inactiva si no hay ID.
6. `/admin` y `/acceso` — `noindex` en metadata; robots no es la auth.

## Qué no hacer

- Push a `master` sin autorización explícita de producción (Vercel despliega
  esa rama).
- `curl` de POST a formularios o webhooks reales.
- Rellenar `.env.local` con secretos que no te hayan dado para esta VM.
