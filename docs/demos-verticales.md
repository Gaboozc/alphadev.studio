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

Regla propuesta:

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

Los nombres son candidatos de trabajo: **ninguno está verificado** (ver 9).

### 4.1 Restaurantes — inspirado en el patrón de Brasaland

*Candidatos:* Fogón Central · Brasa Norte · La Parrilla Común

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

*Candidatos:* Rutaclara · Puerto Medio · Última Parada

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

*Candidatos:* Clínica Vértice · Red Alba · Meridia

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

*Candidatos:* Cantera · Plantel · Semillero Talento

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
- **Subdominios** del tipo `restaurantes.demo.alphadev.studio`.

## 6. Un demo público tiene que aguantar al público

- **Usuario demo con datos que se reinician cada noche** (el cronjob del
  temario resuelve esto).
- **Límite de uso en todo lo que llame a un modelo.** Un demo abierto sin
  límite es una factura abierta.
- **Sin acciones irreversibles reales:** nada de correos a terceros ni pagos.
- **Costo de hosting:** Vercel Hobby no sirve para FastAPI con colas y
  vectores. Hace falta un servidor (Render, Fly, Railway o similar). Hay que
  ponerle presupuesto mensual antes de la fase 1.

## 7. Cómo se ve en alphadev.studio

- **Página nueva `/demos`** (y `/en/demos`), dada de alta en
  `lib/i18n/routes.ts` y `sitemap.ts`.
- Una tarjeta por vertical: video corto o captura, qué resuelve, botón
  "Probar el demo" y CTA "Esto, con tus datos" hacia `/contacto` con la
  categoría preseleccionada.
- Sin precios, de acuerdo con la regla vigente del CLAUDE.md (o con lo que
  diga `/precios` cuando exista).
- Imágenes y textos siguen el sistema *light luxury* del sitio. El interior
  de cada demo puede tener la identidad de su marca ficticia.

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

## 9. Lo que tiene que decidir Gabriel

1. **Nombres** de las cuatro marcas ficticias. Antes de usarlos, verificar
   cada uno: que no exista una empresa con ese nombre en el sector, búsqueda
   de marca (USPTO / IMPI) y dominio.
2. **Permiso de 4Geeks** para usar sus datos en público, o ir directo a datos
   sintéticos.
3. **Presupuesto mensual de hosting** y proveedor del modelo.
4. **Orden de los verticales** (la propuesta es Restaurantes → Logística →
   Salud → Talento).
5. **¿Los demos son solo vitrina o también se venden como paquete?** Si se
   venden, cada vertical necesita su ficha de alcance y precio en
   `docs/paquetes-y-precios.md`.
