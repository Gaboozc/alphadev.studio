# Reorganización final de la Academia · catálogo tipo universidad, todo visible, ES + EN

**Autor:** Prof. X (dueño de lo académico) · **Fecha:** 25 nov 2026 · **Estado:** propuesta lista para Hefesto (vía locust). No se ha tocado el repo.

**Decisión de Gabe que manda este documento** (textual, 25 nov 2026):
> "que cualquiera que tenga acceso a la academia, pueda ver TODO el contenido sin excepcion tanto en spanish como en ingles, qie este TODO lo que hemos hablado y trabajando, que sea tipo universida, que uno pueda elegir, que todo empiece con algo tipo un semestre 0 donde esta lo que ya habiamos hablado etc"

**Qué cambia respecto a mis documentos anteriores:**
- Queda **sin efecto la D7** (S0 solo para admin) y, en la práctica, la **D5** (niveles de acceso). Ya no hay niveles: quien tiene cuenta lo ve todo.
- En `reorganizacion-2026-11-25.md` §c proponía un modelo por niveles. **Lo reemplaza este documento.**
- Lo que sigue vigente: la arquitectura S0 → 3 carreras S1–S6 (`curriculo-rework.md`), las decisiones por lección (`decisiones-lecciones.csv`) y el glosario ES↔EN.

**Nota sobre la revisión humana:** sigo recomendando la revisión humana de `plan-revision.md` (y un editor nativo de inglés para la versión EN). **Por decisión de Gabe, eso no bloquea la visibilidad:** todo se publica visible para todos los que tienen acceso. La revisión se hace con el contenido ya publicado, y las piezas marcadas [INFERENCIA] o "borrador" siguen marcadas en el texto.

---

## 1. Cómo se ve: una universidad en la que eliges

```
Academia AlphaDev  (/academia  ·  /en/academia)
│
├─ Semestre 0 · Tronco común / Semester 0 · Shared Core           186 h   ← la puerta de entrada
│    ├─ S0-C1 Trabajo con IA / Working with AI                        60 h
│    ├─ S0-C2 Resolución de problemas y pensamiento crítico            66 h   (+ unidad U2 enriquecida)
│    └─ S0-C3 Escritura profesional y persuasiva                       60 h
│
├─ Carreras (eliges una o varias; todas visibles)
│    ├─ IS · Ingeniería de Software e IA / Software and AI Engineering   S1–S6  1.170 h (+30 h optativa)
│    ├─ DP · Diseño de Producto / Product Design                         S1–S6    948 h (+48 h optativa)
│    └─ MK · Marketing Digital y Crecimiento / Digital Marketing and Growth  S1–S6  1.074 h
│         Semestre → Curso → Unidad → Lección (pieza)
│
├─ Optativas transversales / Cross-Program Electives
│    ├─ OPT-01 Automatización no-code con IA                             60 h
│    └─ OPT-02 IA creativa: imagen, video y audio                         36 h
│
└─ Biblioteca / Library
     Las 549 lecciones actuales, todas visibles, cada una con su etiqueta de estado
     y un enlace al curso nuevo al que alimenta.
```

**Reglas de navegación** (decisión académica mía, dentro de lo que pidió Gabe):
1. **Todo visible y abierto.** Ningún curso, unidad, lección, clave ni solución se oculta a quien tiene cuenta. No hay candados por progreso.
2. **"Que uno pueda elegir".** El estudiante puede entrar a cualquier carrera, semestre o curso. Los prerrequisitos se muestran como **recomendados** ("Te recomendamos hacer antes: S0-C2"), nunca como bloqueo.
3. **Todo empieza en el Semestre 0.** Es lo primero que se ve en `/academia` y lo que se recomienda primero, pero no se exige.
4. **Claves y soluciones visibles**, detrás de un botón "Ver solución / Show solution" que se abre con un clic. No es un bloqueo: es para no ver la respuesta antes de intentar (práctica de recuperación).
5. **Cursos sin contenido nuevo todavía:** se muestran con su ficha completa (horas, unidades, prerrequisitos recomendados) y la etiqueta **"En preparación / In preparation"**. Debajo se listan las lecciones actuales que lo alimentan, que **sí se pueden abrir ya**. Así nada de lo que existe queda escondido.
6. **Lecciones que se retiran:** siguen visibles en la Biblioteca con la etiqueta "Retirada · reemplazada por …" y enlace a su reemplazo. Nada se borra.

---

## 2. Mapa del catálogo: S0 → carreras → cursos, con lo que los alimenta

Leyenda de la columna de lecciones actuales: **M** mantener · **R** reescribir · **F** fusionar · **X** retirar (cuenta de las 549 lecciones según `decisiones-lecciones.csv`). El detalle lección por lección está en `catalogo/lecciones-legado.csv`.

#### Semestre 0 · Tronco común / Semester 0 · Shared Core

| Sem. | Código | Curso (ES / EN) | Horas | Lecciones actuales que lo alimentan (M/R/F/X) | Estado al publicar |
|---|---|---|---|---|---|
| S0 | S0-C1 | Trabajo con IA / Working with AI | 60 | 0/0/0/10 | Escrito ES + EN |
| S0 | S0-C2 | Resolución de problemas y pensamiento crítico / Problem Solving and Critical Thinking | 66 | 0/0/0/0 | Escrito ES + EN |
| S0 | S0-C3 | Escritura profesional y persuasiva / Professional and Persuasive Writing | 60 | 0/0/0/11 | Escrito ES + EN |

#### Ingeniería de Software e IA / Software and AI Engineering

| Sem. | Código | Curso (ES / EN) | Horas | Lecciones actuales que lo alimentan (M/R/F/X) | Estado al publicar |
|---|---|---|---|---|---|
| S1 | IS-101 | Terminal, Git y GitHub / Terminal, Git and GitHub | 30 | 0/7/0/0 | En preparación; se ven sus lecciones actuales |
| S1 | IS-102 | Programación I: Python / Programming I: Python | 60 | 1/6/2/0 | En preparación; se ven sus lecciones actuales |
| S1 | IS-103 | Web I: HTML y CSS / Web I: HTML and CSS | 60 | 0/4/3/0 | En preparación; se ven sus lecciones actuales |
| S1 | IS-104 | Lógica y matemática para programar / Logic and Math for Programming | 60 | 0/0/0/0 | En preparación (sin fuente; se escribe de cero) |
| S2 | IS-201 | Programación II: JavaScript / Programming II: JavaScript | 60 | 0/3/3/0 | En preparación; se ven sus lecciones actuales |
| S2 | IS-202 | TypeScript / TypeScript | 36 | 0/7/2/0 | En preparación; se ven sus lecciones actuales |
| S2 | IS-203 | Calidad de software / Software Quality | 60 | 3/6/1/0 | En preparación; se ven sus lecciones actuales |
| S3 | IS-301 | Front-end: React y Next.js / Front End: React and Next.js | 72 | 3/4/2/0 | En preparación; se ven sus lecciones actuales |
| S3 | IS-302 | Bases de datos relacionales / Relational Databases | 60 | 5/4/0/0 | En preparación; se ven sus lecciones actuales |
| S3 | IS-303 | Back-end con Python y FastAPI / Back End with Python and FastAPI | 60 | 3/5/1/0 | En preparación; se ven sus lecciones actuales |
| S4 | IS-401 | Plataformas: Supabase y Vercel / Platforms: Supabase and Vercel | 48 | 0/5/2/0 | En preparación; se ven sus lecciones actuales |
| S4 | IS-402 | Autenticación y seguridad web / Authentication and Web Security | 60 | 4/3/0/2 | En preparación; se ven sus lecciones actuales |
| S4 | IS-501 | Modelos, embeddings y RAG / Models, Embeddings and RAG | 60 | 6/4/2/0 | En preparación; se ven sus lecciones actuales |
| S4 | IS-403 | Contenedores con Docker (optativa) / Containers with Docker (elective) | 30 | 0/5/0/0 | En preparación; se ven sus lecciones actuales |
| S5 | IS-502 | Ingeniería agéntica / Agentic Engineering | 60 | 7/1/1/0 | En preparación; se ven sus lecciones actuales |
| S5 | IS-503 | LangGraph / LangGraph | 48 | 5/3/1/0 | En preparación; se ven sus lecciones actuales |
| S5 | IS-504 | Herramientas externas y MCP / External Tools and MCP | 48 | 4/4/0/0 | En preparación; se ven sus lecciones actuales |
| S5 | IS-601 | Sistemas multiagente / Multi-Agent Systems | 48 | 6/2/0/0 | En preparación; se ven sus lecciones actuales |
| S6 | IS-602 | Evaluación y observabilidad / Evaluation and Observability | 48 | 5/2/1/0 | En preparación; se ven sus lecciones actuales |
| S6 | IS-603 | Arquitectura, asincronía y tiempo real / Architecture, Async and Real Time | 60 | 12/9/0/0 | En preparación; se ven sus lecciones actuales |
| S6 | IS-604 | Seguridad y Responsible AI / Security and Responsible AI | 60 | 10/2/0/0 | En preparación; se ven sus lecciones actuales |
| S6 | IS-TES | Tesis / Thesis | 72 | 3/3/5/0 | En preparación; se ven sus lecciones actuales |

#### Diseño de Producto / Product Design

| Sem. | Código | Curso (ES / EN) | Horas | Lecciones actuales que lo alimentan (M/R/F/X) | Estado al publicar |
|---|---|---|---|---|---|
| S1 | DP-101 | Fundamentos de UX/UI / UX/UI Fundamentals | 60 | 0/5/1/1 | En preparación; se ven sus lecciones actuales |
| S1 | DP-102 | Teoría visual y tipografía / Visual Theory and Typography | 60 | 0/1/1/0 | En preparación (fuente parcial) |
| S1 | DP-103 | Dibujo y composición / Drawing and Composition | 60 | 0/0/0/0 | En preparación (sin fuente; se escribe de cero) |
| S2 | DP-201 | Figma profesional / Professional Figma | 72 | 0/8/3/0 | En preparación; se ven sus lecciones actuales |
| S2 | DP-202 | Investigación y pruebas con usuarios / User Research and Testing | 60 | 1/5/0/0 | En preparación; se ven sus lecciones actuales |
| S2 | DP-203 | UX writing avanzado y accesibilidad del contenido / Advanced UX Writing and Content Accessibility | 36 | 0/4/0/0 | En preparación; se ven sus lecciones actuales |
| S3 | DP-301 | Estrategia de marca / Brand Strategy | 48 | 0/5/5/1 | En preparación; se ven sus lecciones actuales |
| S3 | DP-302 | Identidad visual / Visual Identity | 60 | 1/3/3/0 | En preparación; se ven sus lecciones actuales |
| S3 | DP-303 | Design systems / Design Systems | 60 | 1/2/3/1 | En preparación; se ven sus lecciones actuales |
| S4 | DP-401 | Motion para interfaces / Motion for Interfaces | 72 | 0/11/1/0 | En preparación; se ven sus lecciones actuales |
| S4 | DP-402 | Diseño no-code: Webflow y Framer / No-Code Design: Webflow and Framer | 60 | 0/6/3/0 | En preparación; se ven sus lecciones actuales |
| S4 | DP-403 | Interacción avanzada (optativa) / Advanced Interaction (elective) | 48 | 0/5/3/0 | En preparación; se ven sus lecciones actuales |
| S5 | DP-501 | Brand guidelines y aplicaciones / Brand Guidelines and Applications | 36 | 0/4/2/0 | En preparación; se ven sus lecciones actuales |
| S5 | DP-502 | Portafolio y case study / Portfolio and Case Study | 48 | 0/2/0/0 | En preparación; se ven sus lecciones actuales |
| S5 | DP-503 | Taller de proyectos / Project Studio | 96 | 0/14/0/0 | En preparación; se ven sus lecciones actuales |
| S6 | DP-TES | Tesis / Thesis | 120 | 0/2/5/0 | En preparación; se ven sus lecciones actuales |

#### Marketing Digital y Crecimiento / Digital Marketing and Growth

| Sem. | Código | Curso (ES / EN) | Horas | Lecciones actuales que lo alimentan (M/R/F/X) | Estado al publicar |
|---|---|---|---|---|---|
| S1 | MK-101 | Fundamentos de marketing y posicionamiento / Marketing Fundamentals and Positioning | 48 | 1/3/2/1 | En preparación; se ven sus lecciones actuales |
| S1 | MK-102 | Analítica I: GA4, GTM y UTM / Analytics I: GA4, GTM and UTM | 48 | 0/3/4/0 | En preparación; se ven sus lecciones actuales |
| S1 | MK-103 | Community management / Community Management | 48 | 0/7/6/1 | En preparación; se ven sus lecciones actuales |
| S1 | MK-104 | Estadística para marketing / Statistics for Marketing | 60 | 0/0/0/0 | En preparación (sin fuente; se escribe de cero) |
| S2 | MK-201 | Publicidad digital I / Digital Advertising I | 48 | 0/5/2/0 | En preparación; se ven sus lecciones actuales |
| S2 | MK-202 | Meta Ads / Meta Ads | 60 | 0/6/4/1 | En preparación; se ven sus lecciones actuales |
| S2 | MK-203 | Google Ads y Google Business Profile / Google Ads and Google Business Profile | 60 | 0/6/8/1 | En preparación; se ven sus lecciones actuales |
| S3 | MK-301 | Email marketing / Email Marketing | 60 | 0/11/5/1 | En preparación; se ven sus lecciones actuales |
| S3 | MK-302 | Copy para web, anuncios y landing / Copy for Web, Ads and Landing Pages | 60 | 1/5/5/0 | En preparación; se ven sus lecciones actuales |
| S3 | MK-303 | Video para redes / Video for Social Media | 60 | 0/10/3/0 | En preparación; se ven sus lecciones actuales |
| S4 | MK-401 | SEO I: intención, keywords y on-page / SEO I: Intent, Keywords and On-Page | 60 | 0/5/4/0 | En preparación; se ven sus lecciones actuales |
| S4 | MK-402 | SEO técnico / Technical SEO | 60 | 0/7/2/1 | En preparación; se ven sus lecciones actuales |
| S4 | MK-403 | Autoridad y link building / Authority and Link Building | 30 | 0/2/2/0 | En preparación; se ven sus lecciones actuales |
| S5 | MK-501 | SEO para agencias / SEO for Agencies | 48 | 1/4/6/1 | En preparación; se ven sus lecciones actuales |
| S5 | MK-502 | GEO: búsqueda generativa / GEO: Generative Search | 48 | 2/7/2/0 | En preparación; se ven sus lecciones actuales |
| S5 | MK-503 | Analítica II: embudos, experimentos y reportes / Analytics II: Funnels, Experiments and Reporting | 72 | 1/11/11/2 | En preparación; se ven sus lecciones actuales |
| S6 | MK-601 | Ventas consultivas y propuestas / Consultative Sales and Proposals | 60 | 0/7/4/1 | En preparación; se ven sus lecciones actuales |
| S6 | MK-602 | TikTok y estrategia orgánica / TikTok and Organic Strategy | 48 | 1/4/1/0 | En preparación; se ven sus lecciones actuales |
| S6 | MK-TES | Tesis: campaña integrada de 30 días / Thesis: 30-Day Integrated Campaign | 96 | 0/1/2/0 | En preparación; se ven sus lecciones actuales |

#### Optativas transversales / Cross-Program Electives

| Sem. | Código | Curso (ES / EN) | Horas | Lecciones actuales que lo alimentan (M/R/F/X) | Estado al publicar |
|---|---|---|---|---|---|
| — | OPT-01 | Automatización no-code con IA / No-Code Automation with AI | 60 | 0/7/13/1 | En preparación; se ven sus lecciones actuales |
| — | OPT-02 | IA creativa: imagen, video y audio / Creative AI: Image, Video and Audio | 36 | 0/2/3/0 | En preparación; se ven sus lecciones actuales |

**Totales verificados** (`_gen_catalogo.py`, 25 nov 2026): 62 cursos (3 de S0, 23 de IS, 16 de DP, 18 de MK, 2 optativas). Horas: S0 186 · IS 1.200 con la optativa IS-403 (1.170 sin ella) · DP 996 con DP-403 (948 sin ella) · MK 1.074 · optativas 96. Las 549 lecciones: 87 mantener · 280 reescribir · 145 fusionar · 37 retirar. Una lección (`diseno/uiux-8/uiux-exam`) no va a un solo curso: sus preguntas se reparten entre los checkpoints de DP-101 a DP-402.

**Cursos sin fuente** (se escriben de cero): IS-104, DP-103, MK-104. **Fuente parcial:** DP-102.

### 2.1 Qué archivos alimentan cada nodo

| Nodo | Español | Inglés |
|---|---|---|
| S0 (los 3 cursos) | `semestre-0/01-trabajo-con-ia/`, `02-pensamiento-critico/`, `03-escritura-profesional/` | `semestre-0-en/` con la misma estructura y los mismos nombres de archivo |
| Unidad enriquecida S0-C2 U2 | `semestre-0/02-pensamiento-critico/u2-causas-hipotesis-evidencia-enriquecida/` | `semestre-0-en/02-pensamiento-critico/u2-causas-hipotesis-evidencia-enriquecida/` |
| Claves y soluciones de S0 | `semestre-0/*/claves/` | `semestre-0-en/*/claves/` |
| Cursos S1–S6 y optativas (ficha) | `curriculo-rework.md` §4 → `catalogo/catalogo-academia.json` | `title_en` en el mismo JSON; unidades en EN pendientes (§5) |
| Lecciones actuales (Biblioteca) | `app/academia/content/*.ts` (lo que ya está en vivo) · inventario en `inventario.csv` · decisión en `decisiones-lecciones.csv` | **87 "mantener" traducidas en `biblioteca-en/`** (§4–§5) · resto en ES (§5) |
| Glosario | — | `semestre-0-en/glosario-es-en.md` |

Dentro de cada unidad de S0, las piezas son siempre: `guia.md`, `comprobaciones-rapidas.md`, `ejercicios.md`, `cuestionario.md`, `reflexion.md`, más `claves/uN-clave-comprobaciones.md`, `claves/uN-clave-cuestionario.md` y `claves/uN-soluciones-ejercicios.md`. Cada curso tiene `00-syllabus.md`, `checkpoint.md` (+ `claves/checkpoint-clave.md`) y `proyecto-final.md`.

---

## 3. Especificación para Hefesto (solo pedido; él decide cómo y cuánto cuesta)

### 3.1 Paquete de contenido
- **Fuente única:** los `.md`/`.csv` de `semestre-0/`, `semestre-0-en/` y `biblioteca-en/`, más `catalogo/catalogo-academia.json` (con títulos y unidades bilingües ES/EN para los 62 cursos). Los nombres de carpeta y archivo son **idénticos** en los dos idiomas; solo cambia la raíz.
- **Ids:** se conservan tal cual. S0 usa `s0-c<curso>-u<unidad>-<pieza>` (p. ej. `s0-c2-u2-caso`), que ya figura en la cabecera de cada pieza. Los cursos nuevos usan `<carrera>-<curso>-u<N>-<pieza>` (p. ej. `is-303-u2-guia`). Las lecciones actuales conservan su clave `rama/módulo/lección` (hay 10 ids repetidos entre Branding y Back-end, así que el id solo no basta).
- **Un id, dos idiomas:** el mismo id sirve para ES y EN. El progreso (hoy en localStorage) se guarda por id, así que cambiar de idioma no pierde el avance.

### 3.2 Rutas i18n
- Español sin prefijo y **inglés con `/en`**, con **los mismos slugs** en los dos idiomas (no se traducen los slugs):
  - `/academia` y `/en/academia` → portada del catálogo (S0 primero).
  - `/academia/semestre-0/s0-c2` y `/en/academia/semestre-0/s0-c2` → curso.
  - `/academia/semestre-0/s0-c2/u2-causas-hipotesis-evidencia` → unidad (el slug es el nombre de la carpeta).
  - Carreras: `/academia/ingenieria-software-ia/is-101`, `/academia/diseno-producto/dp-101`, `/academia/marketing-digital/mk-101`, `/academia/optativas/opt-01` (las rutas propuestas están en el JSON, campos `route_es` y `route_en`).
  - Biblioteca: las rutas actuales `/academia/<rama>/<módulo>/<lección>` **no cambian**, para no romper enlaces; su espejo es `/en/academia/<rama>/<módulo>/<lección>`.
- Hoy `/en/academia` da 404 porque `lib/i18n/routes.ts` la excluye. El pedido es añadir la Academia como ruta privada bilingüe con el mismo `LOCALE_PREFIX='/en'`.

### 3.3 Selector de idioma
- Visible en todas las páginas de la Academia; lleva a la **misma página** en el otro idioma.
- Si una pieza aún no existe en inglés (las 462 lecciones legado con decisión `reescribir`, `fusionar` o `retirar`), se muestra la versión en español con un aviso: "This lesson is only available in Spanish for now." **No se esconde** ni da 404. Las 87 lecciones `mantener` ya tienen versión EN en `biblioteca-en/`.

### 3.4 Acceso
- **Sin más puerta que el login actual** (`getUsuario()` en `app/academia/layout.tsx`). Quien tiene cuenta ve el 100 % del contenido, en los dos idiomas.
- Se eliminan del plan: la restricción de S0 a admin (D7), los niveles de acceso (D5) y cualquier bloqueo por progreso o prerrequisito.
- `es_admin` se mantiene solo para lo que ya hace hoy (administración), no para ver contenido.

### 3.5 Etiquetas de estado (propuesta de texto [INFERENCIA]; no están en `validacion-textos-v3.md`, así que deben validarse igual que el resto de la UI)
| Caso | ES | EN |
|---|---|---|
| Curso aún sin contenido nuevo | En preparación | In preparation |
| Lección actual que se reescribe | Versión anterior · en reescritura | Previous version · being rewritten |
| Lección que se fusiona | Versión anterior · se fusiona en {curso} | Previous version · merging into {course} |
| Lección retirada | Retirada · reemplazada por {destino} | Retired · replaced by {target} |
| Lección que se mantiene | Lección de la Biblioteca | Library lesson |
| Prerrequisito | Te recomendamos hacer antes: {curso} | We recommend taking first: {course} |
| Clave | Ver solución | Show solution |
| Solo en español | Esta lección por ahora solo está en español | This lesson is only available in Spanish for now |

### 3.6 Lo que NO pido
- No pido cambios de diseño: cómo se ve el catálogo lo deciden Arkano y Rams.
- No pido borrar nada del contenido actual.

---

## 4. Qué está traducido al inglés hoy

| Pieza | Estado | Palabras (`wc -w`) |
|---|---|---|
| S0-C1 Working with AI (syllabus, 4 unidades × 5 piezas, checkpoint, proyecto final y todas las claves) | Completo | 22.754 |
| S0-C2 Problem Solving and Critical Thinking (5 unidades, checkpoint, proyecto, claves) **+ unidad U2 enriquecida** (README, 01–10, tarjetas CSV y 3 claves) | Completo | 39.257 (la unidad enriquecida: 17.167) |
| S0-C3 Professional and Persuasive Writing | **Reescrito para inglés**, no traducido literalmente (ejemplos, normas de estilo y casos propios del inglés). Misma estructura, ids y letras de respuesta | 18.256 |
| Glosario ES↔EN | Completo | 1.278 |
| **Total semestre-0-en** | 133 archivos: espejo 1:1 de los 131 archivos de contenido de `semestre-0/`, más el glosario y un README.md índice nuevo para estudiantes (el README interno de S0, que es nota de equipo, no se traduce) | 81.681 con el README nuevo (ES: 82.770) |
| **Biblioteca EN (`biblioteca-en/`, las 87 lecciones `mantener`)** | **Completo:** 87 archivos en US English, espejo 1:1 de `contenido/` (mismos ids, carpetas y URLs `/en/academia/...`) usando `glosario-es-en.md` | 51.429 (ES: 54.110) |
| **Unidades S1–S6 y optativas en catálogo** | **Completo:** campos bilingües `units_es` y `units_en` en `catalogo-academia.json` y `catalogo-academia.csv` para los 62 cursos | — |

Estado de calidad: borrador revisado por mí, **sin editor nativo** [INFERENCIA: lo considero necesario antes de vender el contenido en inglés, pero por decisión de Gabe se publica igual].

---

## 5. Lo que queda sin traducir (honesto) y plan

| Qué | Volumen | Plan |
|---|---|---|
| Lecciones actuales "mantener" (Biblioteca) | ~~87 lecciones · 54.110 palabras ES~~ **0 pendientes (ya traducidas)** | **Completado en `biblioteca-en/`** (87 lecciones, 51.429 palabras EN). Queda solo revisión por editor nativo junto con S0. |
| Lecciones "reescribir" | 280 · 118.218 palabras | **No traducir la versión vieja.** Se traducen cuando se escriba el curso nuevo (se escribe en ES y EN a la vez). Mientras, se ven en ES con el aviso "solo en español". |
| Lecciones "fusionar" | 145 · 37.012 palabras | Igual que "reescribir": se traducen dentro del curso nuevo. |
| Lecciones "retirar" | 37 · 8.435 palabras | **No se traducen.** Siguen visibles en ES con su etiqueta y enlace a su reemplazo (en S0, ya traducido). |
| Títulos de unidad de los cursos S1–S6 y optativas | ~~59 cursos~~ **0 pendientes (ya traducidos)** | **Completado** en `catalogo-academia.json` y `.csv` (`units_en` junto a `units_es` para los 62 cursos). Falta el cuerpo de las lecciones nuevas. |
| Cursos nuevos sin fuente (IS-104, DP-103, MK-104) y fuente parcial (DP-102) | 4 cursos | Se escriben directamente en ES + EN. |

**Orden propuesto:** (1) Hefesto carga S0 ES + EN, `biblioteca-en/` (las 87 "mantener") y el catálogo bilingüe con todo visible; (2) S1 de las tres carreras escrito en ES + EN; (3) resto de semestres en orden.

---

## 6. Archivos

- `rework/profx/reorganizacion-final.md` (este documento)
- `rework/profx/catalogo/catalogo-academia.json` y `.csv` (62 cursos, con rutas ES/EN y conteos)
- `rework/profx/catalogo/lecciones-legado.csv` (las 549 lecciones con decisión, destino, ruta actual, ruta EN y etiqueta de UI)
- `rework/profx/_gen_catalogo.py` (regenera el catálogo; solo lee)
- `semestre-0/` y `semestre-0-en/` (contenido S0 ES y EN)
- `biblioteca-en/` (las 87 lecciones legado `mantener` traducidas a US English)
- `semestre-0-en/glosario-es-en.md`
- Paquete: `/workspace/academia/entrega-academia-es-en.zip`
