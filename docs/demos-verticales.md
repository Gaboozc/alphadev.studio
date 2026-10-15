# Demos verticales — plan de ejecución

> Propuesta de octubre de 2026. Nada de esto está decidido hasta que Gabriel
> cierre los puntos de la sección 9. Cuando se cierren, las decisiones
> estructurales pasan al CLAUDE.md.

## 1. Qué es y para qué

Cuatro sistemas funcionando, uno por industria, construidos con el temario de
AI Engineering de 4Geeks como guía técnica. Cada uno cumple tres funciones a
la vez:

1. **Vitrina.** Quien entra al sitio no lee que sabemos hacer software con IA:
   lo prueba. Un demo clickeable convence más que cualquier copy.
2. **Producto.** Cada demo es un paquete que se vende: "esto mismo, con tus
   datos, en X semanas".
3. **Base reutilizable.** Lo que se construye una vez (auth, panel, API,
   telemetría, agente con guardrails) sirve para los cuatro, y después para
   clientes reales. Es la promesa de "módulos reusables" hecha código.

## 2. Reglas que no se negocian

- **Marcas ficticias, nunca reales.** Nada de Orlando Health, UPS ni ninguna
  empresa existente: se leería como que son nuestros clientes, y son marcas
  registradas. Los nombres propios se inventan y se verifican antes de usarlos
  (ver 9).
- **Siempre etiquetado como demo.** Cada demo y su tarjeta en el sitio dicen
  "Proyecto de demostración". Los cuatro clientes reales (BFS, Imperial, The
  Latin Grill, Fenix) siguen en `/portafolio` y **no se mezclan** con los
  demos: los reales valen más precisamente porque son reales.
- **Escenarios propios.** HealthCore, TrackFlow, Brasaland y Nexova, con sus
  personajes y cifras, son contenido de 4Geeks. Tomamos el *patrón técnico*
  (qué se construye y cómo); el escenario (nombre, personajes, departamentos,
  números) lo escribimos nosotros.
- **Cero datos reales de personas** en un demo público. Ni pacientes, ni
  candidatos, ni clientes. Todo sintético.

## 3. Los datos de 4Geeks

El repo `4GeeksAcademy/ai-engineering-syllabus` es público pero **no declara
licencia**. Sin licencia, por defecto el autor conserva todos los derechos:
poder verlo no es lo mismo que poder republicarlo en un sitio comercial.

**Actualización 2026-10-15:** Gabriel confirma que tiene permiso para usar
el contenido del syllabus. La tabla de abajo queda como respaldo: los datos de
4Geeks pueden ir al demo público. Conviene guardar ese permiso por escrito.

Regla original (antes del permiso):

| Fase | Datos de 4Geeks | Por qué |
|---|---|---|
| Construcción privada (local, ramas) | Sí, tal cual | Sirven para validar contra los valores esperados del syllabus (p. ej. los 96 incidentes válidos) |
| Demo público | No, salvo permiso escrito | Se reemplazan por datos sintéticos con la misma forma, generados por un script de seed propio |

Proyectos donde el dato de 4Geeks pesa más y conviene **pedir permiso** antes
que reconstruir:

| Proyecto | Dato | Alternativa si no hay permiso |
|---|---|---|
| Incident File Analyzer / Incident Manager | Archivo de incidentes con errores sembrados | Generador propio con la misma proporción de filas inválidas |
| Data Pipeline (3 etapas) | Datos de negocio por local/sede | Generador de ventas sintéticas con estacionalidad |
| Sales Forecasting | Serie temporal histórica | Serie sintética (tendencia + estacionalidad + ruido); el modelo y la evaluación son igual de válidos |
| RAG | Documentos de la base de conocimiento | Manuales propios escritos para cada empresa ficticia |
| RFP Workflow | RFPs de ejemplo | RFPs ficticios redactados por nosotros |

Pedir el permiso es una conversación con 4Geeks, no un trámite técnico.
Conviene hacerla antes de la fase 2.

## 4. Los cuatro verticales

Nombres decididos el 2026-10-15. Funcionan igual en inglés y en español, y
el `.com` de cada uno estaba libre ese día. **Falta la búsqueda de marca
registrada** (USPTO / IMPI) antes de publicar.

### 4.1 Restaurantes — inspirado en el patrón de Brasaland

**Marca: Ámbar Grill** · subdominio `ambar.demo.alphadev.studio`

Cadena de varios locales en dos países, compras por WhatsApp y cero
visibilidad desde la sede.

| Módulo | Sale de (proyecto del temario) |
|---|---|
| Directorio de proveedores | Supplier Directory |
| Inventario con stock calculado (entradas − salidas) | Milestone 5 — Inventory |
| Ventas por local + reportes | Data Pipeline |
| Pronóstico de ventas por local | Sales Forecasting |
| Asistente de estándares y recetas para cocina | RAG + LangGraph |

**Por qué primero:** es el vertical más cercano a los clientes que ya tienes
(The Latin Grill, Imperial) y a la audiencia PyME LATAM del CLAUDE.md. Además
sus módulos son los primeros del temario.

### 4.2 Logística — inspirado en el patrón de TrackFlow

**Marca: Cometa Cargo** · subdominio `cometa.demo.alphadev.studio`

Almacenes que no ven el inventario del otro, transportistas sin datos y
devoluciones aprobadas una por una.

| Módulo | Sale de |
|---|---|
| Panel de incidencias de envío | Incident File Analyzer + Incident Manager |
| Rendimiento de transportistas | Telemetry + Data Pipeline |
| Agente de devoluciones que recomienda, **un humano confirma** | LangGraph + Memory/Harness |
| Chat "¿dónde está mi paquete?" en tiempo real | WebSocket + SSE |
| Exportación nocturna y tareas en cola | Cronjobs + Message Queues |

### 4.3 Salud — inspirado en el patrón de HealthCore

**Marca: Celeste Clinic** · subdominio `celeste.demo.alphadev.studio`

Red de clínicas con 22 % de no-shows y reservas por teléfono.

| Módulo | Sale de |
|---|---|
| Reservas y recordatorios (tasa de no-shows en vivo) | Inventory + Telemetry, adaptados |
| Insumos clínicos | Milestone 5 — Inventory |
| Asistente de protocolos internos (no diagnóstico) | RAG + Harness/Guardrails |
| Auditoría de seguridad visible | OWASP Top 10 + NIST |

**Cuidado:** el agente nunca da consejo médico, y los guardrails tienen que
demostrarlo. Es el vertical donde la sección de seguridad del temario luce
más, y también el de más riesgo reputacional si se hace mal. Va tercero.

### 4.4 Talento y RRHH — inspirado en el patrón de Nexova

**Marca: Mentora Talent** · subdominio `mentora.demo.alphadev.studio`

Consultora de selección con procesos manuales y un ATS de 2012.

| Módulo | Sale de |
|---|---|
| Pipeline de candidatos | Milestone 3 — Talent Pipeline Tracker |
| Generador de respuestas a RFP con aprobación por departamento | Milestone 9 — Agentic RFP Workflow |
| Base de conocimiento para soporte externalizado | RAG |
| Herramientas del agente vía MCP | MCP Server |

## 5. Arquitectura: un núcleo, cuatro verticales

**No se construyen cuatro sistemas.** Se construye un núcleo una vez y cada
vertical es una capa encima:

```
Núcleo (se construye una vez)
  auth · panel con módulos · API FastAPI · telemetría · CI
  agente LangGraph con guardrails · MCP · seguridad (OWASP/NIST)

Vertical (uno por industria)
  marca y textos · datos sintéticos · módulos de su tabla
  prompts y base de conocimiento del agente
```

- **Repo aparte, no dentro de AlphaWEB.** El stack es otro (Python, FastAPI,
  colas, vectores) y su ciclo de vida también. AlphaWEB solo enlaza.
- **El plan de monorepo aplica completo ahí:** contratos, CI, una rama por
  proyecto. Es el repo donde esa disciplina sí se paga.
- **Una sola app para los cuatro demos.** El núcleo es el mismo, así que es
  un único proyecto de Vercel con cuatro dominios. La app decide qué marca
  mostrar según el subdominio por el que entró la visita. Un deploy y un CI
  en vez de cuatro.

## 6. Un demo público tiene que aguantar al público

- **Usuario demo con datos que se reinician cada noche** (el cronjob del
  temario resuelve esto).
- **Límite de uso en todo lo que llame a un modelo.** Un demo abierto sin
  límite es una factura abierta.
- **Sin acciones irreversibles reales:** nada de correos a terceros ni pagos.
- **Hosting: Vercel, plan gratuito** (decidido 2026-10-15). Eso obliga a
  cambiar algunas piezas del temario por equivalentes serverless:

  | El temario usa | En Vercel | Costo |
  |---|---|---|
  | FastAPI como servidor | FastAPI como funciones serverless de Vercel | Gratis |
  | Postgres | Supabase (el mismo proveedor del sitio) | Gratis |
  | Qdrant | pgvector dentro de Supabase | Gratis |
  | Celery + Redis | Upstash (Redis y colas serverless) | Plan gratis |
  | WebSocket | Streaming por SSE o Supabase Realtime | Gratis |
  | Cron frecuente | Vercel Cron, **una vez al día** en el plan gratis | Gratis |
  | Docker | Solo en local, no en producción | — |

  Cada cambio de pieza se registra en un ADR del repo de los demos.
- **Lo único que no es gratis es el modelo de IA**, que se paga por uso. Hace
  falta un tope mensual antes de abrir el primer demo al público.
- **Ojo con el plan Hobby:** Vercel lo define para uso personal y no
  comercial. Revisar sus condiciones vigentes. Si llegara a hacer falta, el
  cambio es pasar a Pro, sin tocar código.

## 7. Mapa del sitio y dominios

### 7.1 El mapa completo

```
alphadev.studio                      sitio principal (este repo, indexable)
├── /                                Home + franja "Pruébalo tú mismo" → /demos
├── /servicios                       cada servicio enlaza al demo que lo muestra
├── /portafolio                      SOLO los 4 clientes reales
├── /demos                           NUEVA: índice de los cuatro demos
│   ├── /demos/ambar-grill           ficha: qué resuelve, video, módulos, CTA
│   ├── /demos/cometa-cargo
│   ├── /demos/celeste-clinic
│   └── /demos/mentora-talent
├── /recursos, /proceso, /contacto   sin cambios
├── /privacidad, /terminos           sin cambios
└── /en/...                          espejo de todo, incluido /en/demos/*

*.demo.alphadev.studio               app de los demos (otro repo, noindex)
├── ambar.demo.alphadev.studio       Ámbar Grill
├── cometa.demo.alphadev.studio      Cometa Cargo
├── celeste.demo.alphadev.studio     Celeste Clinic
└── mentora.demo.alphadev.studio     Mentora Talent

Privado (sin cambios): /admin, /academia, /acceso, /tarjeta/*
```

### 7.2 Por qué la ficha va en el dominio principal y la app en el subdominio

- **La ficha (`/demos/<slug>`) se indexa; la app no.** Si Google indexara la
  app, quien buscara "Celeste Clinic" llegaría a una clínica que no existe.
  Lo que debe aparecer es la página de AlphaDev que explica el demo. Por eso
  los subdominios llevan `noindex` en el metadata y un `robots.txt` que
  bloquea todo, y no entran en ningún sitemap.
- **La ficha concentra el SEO en alphadev.studio.** Es contenido propio,
  bilingüe y enlazado desde `/servicios`. Los subdominios no le quitan
  autoridad al dominio principal.
- **La app siempre lleva una franja fija** del tipo "Demo construido por
  AlphaDev Studios · Ver cómo se hizo", que enlaza de vuelta a su ficha. Así
  nadie la confunde con una empresa real, y la visita vuelve al sitio.

### 7.3 Cambios concretos en este repo (AlphaWEB)

| Archivo | Cambio |
|---|---|
| `lib/content/demos.ts` | **Nuevo.** Fuente única de los cuatro demos (slug, marca, industria, textos es/en, módulos, URL del subdominio). Mismo patrón que `lib/content/cases.ts` |
| `lib/i18n/routes.ts` | Alta de `/demos` en `PUBLIC_PATHS` y en `PAGE_META`, y `/demos` como raíz anidada (igual que `/recursos/[slug]`) para que el toggle de idioma funcione en las fichas |
| `app/sitemap.ts` | `/demos` en `PESO`, y las cuatro fichas generadas desde `lib/content/demos.ts`, en los dos idiomas con `alternates` |
| `app/demos/`, `app/en/demos/` | Índice + `[slug]/page.tsx`, con el patrón `*Content.tsx` del resto del sitio |
| `components/Navbar.tsx` | Link "Demos" entre Portafolio y Recursos |
| `app/contacto/ContactoForm.tsx` | Aceptar `?categoria=` para preseleccionar la categoría desde el CTA de una ficha (hoy siempre arranca vacía) |
| Vercel (proyecto de los demos) | Agregar los cuatro subdominios. El dominio ya está en Vercel: no cuesta nada |

### 7.4 Idioma dentro de los demos

Los nombres se eligieron para funcionar en los dos idiomas, así que cada app
tiene su propio toggle es/en. Una visita que llega desde `/en/demos/...`
entra al demo en inglés.

## 8. Fases

| Fase | Qué | Sale con |
|---|---|---|
| 0 | Núcleo: repo, CI, auth, panel vacío, API, despliegue | Login y panel corriendo en un subdominio |
| 1 | Restaurantes de punta a punta | Primer demo público + página `/demos` con una tarjeta |
| 2 | Logística | Segunda tarjeta; incidentes, tiempo real, agente con confirmación |
| 3 | Salud | Tercera tarjeta; guardrails y seguridad en primer plano |
| 4 | Talento | Cuarta tarjeta; RFP agéntico y MCP |

Cada fase deja algo publicable. No hay que esperar a los cuatro para mostrar
el primero, en línea con el principio "mejor ON antes que perfecto".

## 9. Decisiones

| # | Tema | Estado |
|---|---|---|
| 1 | Nombres | **Decidido:** Ámbar Grill, Cometa Cargo, Celeste Clinic, Mentora Talent. Falta la búsqueda de marca |
| 2 | Datos de 4Geeks | **Decidido:** hay permiso para usarlos, también en público. Conviene tenerlo por escrito |
| 3 | Hosting | **Decidido:** Vercel gratis + subdominios de alphadev.studio (ver 6) |
| 3b | Proveedor del modelo y tope mensual | **Pendiente** |
| 4 | Orden de los verticales | **Pendiente de confirmar** (propuesta: Restaurantes → Logística → Salud → Talento) |
| 5 | ¿Vitrina o paquete? | **Decidido: ambas.** Cada vertical necesita su ficha de alcance y precio en `docs/paquetes-y-precios.md` |
