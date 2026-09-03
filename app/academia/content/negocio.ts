import type { Module } from '../types'

// Rama: Negocio & Datos — 8 módulos.
// Cada módulo declara su `track`; la rama se deriva del track en ramas.ts.
export const MODULES_NEGOCIO: Module[] = [
  {
    id: 'data-1',
    number: 32,
    title: 'GA4 y Setup de Analytics',
    description: 'Configura Google Analytics 4 correctamente, entiende el modelo de datos por eventos y mide lo que realmente importa para tu negocio.',
    duration: '2 semanas',
    status: 'available',
    track: 'data',
    lessons: [
      {
        id: 'd1-l1',
        title: 'GA4: el modelo de datos que cambió todo',
        type: 'reading',
        content: `## Google Analytics 4: pensar en eventos, no en sesiones

GA4 (lanzado en 2023 como reemplazo de Universal Analytics) cambió fundamentalmente cómo se mide el comportamiento web. Entender su modelo de datos es la base de todo lo demás.

### El modelo de datos de GA4: todo son eventos

En Universal Analytics (el antiguo), cada interacción tenía un tipo fijo: pageview, event, transaction.

En GA4, **todo es un evento**. Cada interacción es un evento con parámetros:

\`\`\`
Evento: page_view
Parámetros:
  page_title: "Home — AlphaDev Studios"
  page_location: "https://alphadev.studio"
  page_referrer: "https://google.com"

Evento: scroll
Parámetros:
  percent_scrolled: 90

Evento: click
Parámetros:
  link_url: "https://alphadev.studio/contacto"
  link_text: "Agenda una llamada"
\`\`\`

### Eventos automáticos vs personalizados

**Automáticos** (sin configuración):
- page_view, scroll, click (links externos), file_download, session_start, user_engagement

**Enhanced measurement** (activar en configuración):
- Scroll depth, outbound clicks, site search, video engagement, form interactions

**Eventos personalizados** (los más valiosos):
- Cualquier interacción específica de tu negocio
- "form_submit", "demo_requested", "pricing_viewed"

### Estructura de GA4

\`\`\`
Cuenta de Google Analytics
└── Propiedad de GA4 (por sitio/app)
    ├── Flujos de datos (web, iOS, Android)
    ├── Eventos
    ├── Conversiones (eventos marcados como importantes)
    └── Informes
\`\`\`

### Setup en Next.js

\`\`\`typescript
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
\`\`\`

\`\`\`typescript
// Para eventos personalizados
import { sendGAEvent } from '@next/third-parties/google';

const handleFormSubmit = () => {
  sendGAEvent('event', 'form_submit', {
    form_name: 'contact_startup',
    value: 1,
  });
};
\`\`\`

### La diferencia entre métricas y dimensiones

**Métrica**: valor numérico medible (sesiones, usuarios, conversiones, duración)
**Dimensión**: atributo que describe los datos (país, dispositivo, fuente, página)

En GA4 siempre combinas dimensión + métrica:
- "Sesiones" (métrica) + "País" (dimensión) = sesiones por país
- "Conversiones" (métrica) + "Fuente" (dimensión) = conversiones por canal`,
        completed: false,
      },
      {
        id: 'd1-l1b',
        title: 'Mini-práctica: Configura GA4 en tu proyecto',
        type: 'practice',
        tasks: [
          'Crea una propiedad GA4 en analytics.google.com para tu sitio (o uno de prueba)',
          'Instala el snippet en Next.js con @next/third-parties/google y verifica que recibe datos en tiempo real',
          'Activa todos los eventos de Enhanced Measurement (scroll, outbound clicks, file downloads)',
          'Configura al menos 2 conversiones: una para el submit del formulario de contacto y otra para un click en el CTA principal',
          'Verifica en el informe "Tiempo real" de GA4 que los eventos llegan correctamente al navegar el sitio',
        ],
        tip: 'El error más costoso de analytics: instalar GA4 y no marcar ninguna conversión. Sin conversiones configuradas, GA4 te muestra tráfico pero no te dice si ese tráfico sirve de algo. Configurar las conversiones es el paso que convierte GA4 de "herramienta de vanidad" a "herramienta de negocio".',
        completed: false,
      },
      {
        id: 'd1-l2',
        title: 'Google Tag Manager: el sistema nervioso de tus mediciones',
        type: 'reading',
        content: `## Google Tag Manager: control total sin tocar el código

GTM (Google Tag Manager) es un sistema que te permite instalar y gestionar scripts de tracking (GA4, Meta Pixel, hotjar, etc.) sin modificar el código del sitio cada vez.

### Por qué usar GTM

**Sin GTM**:
- Cada herramienta de analytics → un snippet hardcodeado en el HTML
- Agregar un nuevo evento → modificar el código → deploy → esperar al developer
- Si un script falla → todo el sitio se puede afectar

**Con GTM**:
- Un solo snippet en el HTML → GTM gestiona todos los demás
- Agregar eventos → configurar en la UI de GTM → publicar → inmediato
- Testing de tags sin deployar

### Conceptos base de GTM

**Tag**: el script que se ejecuta (GA4 Event, Meta Pixel, etc.)
**Trigger**: cuándo se ejecuta el tag (page view, click en botón, scroll)
**Variable**: dato que se captura (texto del botón, URL, valor)

### Configurar GA4 con GTM

\`\`\`
1. Crear cuenta en tagmanager.google.com
2. Instalar el snippet de GTM en Next.js (en el <head> y <body>)
3. Crear Tag: "Google Analytics: GA4 Configuration" con tu Measurement ID
4. Trigger: "All Pages"
5. Preview → verificar → Publish
\`\`\`

### Rastrear eventos con GTM sin código

**Click en CTA (sin tocar el código)**:
\`\`\`
Tag: GA4 Event
  Event name: cta_click
  Parameters:
    button_text: {{Click Text}}
    page_url: {{Page URL}}

Trigger: Click - All Elements
  Condition: Click Text contains "Agenda" OR "Contacto"
\`\`\`

### GTM en Next.js (App Router)

\`\`\`typescript
// components/GoogleTagManager.tsx
'use client';

import { useEffect } from 'react';

export const GTM_ID = 'GTM-XXXXXXX';

export default function GoogleTagManager() {
  useEffect(() => {
    // Push route changes to dataLayer
    window.dataLayer = window.dataLayer || [];
  }, []);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: \`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','\${GTM_ID}');
          \`,
        }}
      />
    </>
  );
}
\`\`\``,
        completed: false,
      },
      {
        id: 'd1-l2b',
        title: 'Mini-práctica: Configura GTM con GA4 y 3 eventos personalizados',
        type: 'practice',
        tasks: [
          'Crea una cuenta en GTM y migra el snippet de GA4 para que pase por GTM (no directo)',
          'Configura el Tag de GA4 Configuration con tu Measurement ID y un trigger de All Pages',
          'Crea un Tag para el evento "form_submit" con Trigger en el submit del formulario de contacto',
          'Crea un Tag para "cta_click" que capture clics en los botones principales',
          'Usa GTM Preview para verificar que los 3 tags se disparan correctamente antes de publicar',
        ],
        tip: 'Siempre usa GTM Preview antes de publicar. Una vez publicado, los tags se ejecutan para todos los usuarios reales. Un error en un tag puede contaminar datos históricos que no se pueden recuperar.',
        completed: false,
      },
          {
        id: 'data-1-proj-basico',
        title: 'Proyecto Básico: Dashboard en Looker Studio',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Crea un dashboard básico en Looker Studio conectado a una fuente de datos real.',
        deliverables: [
          'Dashboard en Looker Studio con mínimo 6 visualizaciones (mezcla de tablas, gráficas y scorecards)',
          'Conectado a una fuente de datos real (Google Analytics, Google Sheets o GA4)',
          'Filtro de fechas funcional',
          'Link compartible del dashboard con permisos de "view"',
          'Guía de 1 página: cómo leer el dashboard y qué decisión permite tomar cada visualización',
        ],
        tip: 'Cada visualización debe responder una pregunta específica de negocio. Si no sabes qué decisión permite tomar, no debería estar en el dashboard.',
        completed: false,
      },
],
    resources: [
      {
        title: 'Google Analytics 4 — Documentación oficial',
        url: 'https://support.google.com/analytics/answer/10089681',
        type: 'documentation',
      },
      {
        title: 'Google Tag Manager — Guía de inicio',
        url: 'https://support.google.com/tagmanager/answer/6103696',
        type: 'documentation',
      },
      {
        title: 'MeasureSchool — GA4 Tutorial completo (YouTube)',
        url: 'https://www.youtube.com/@MeasureSchool',
        type: 'video',
      },
    ],
  },
  {
    id: 'data-2',
    number: 33,
    title: 'Embudos, Conversión y Comportamiento de Usuario',
    description: 'Entiende cómo se mueven los usuarios por tu sitio, dónde se pierden y qué mejoras tienen mayor impacto en la conversión.',
    duration: '3 semanas',
    status: 'available',
    track: 'data',
    lessons: [
      {
        id: 'd2-l1',
        title: 'Embudos de conversión: dónde se pierde el dinero',
        type: 'reading',
        content: `## Embudos: el mapa del journey del usuario

Un embudo de conversión es la secuencia de pasos que sigue un usuario desde que llega a tu sitio hasta que completa la acción objetivo (lead, compra, registro).

### Por qué los embudos son críticos

La mayoría de los sitios tiene una tasa de conversión del 1-3%. Eso significa que el 97-99% de los visitantes se van sin hacer nada.

Los embudos te muestran **exactamente dónde** se van y por qué — para que puedas arreglarlo.

### Tipos de embudos

**Embudo de adquisición** (cómo llegan):
\`\`\`
Búsqueda orgánica → Página de blog → Solicitud de info
Anuncio de Meta → Landing page → Form de contacto
\`\`\`

**Embudo de conversión** (cómo convierten):
\`\`\`
Home → Servicios → Contacto → Form enviado
\`\`\`

**Embudo de activación** (para SaaS/apps):
\`\`\`
Registro → Completar perfil → Primera acción de valor → Upgrade
\`\`\`

### Crear embudos en GA4

\`\`\`
GA4 → Explorar → Exploración de embudo

Pasos del embudo:
1. Evento: page_view, Page path = /
2. Evento: page_view, Page path = /servicios
3. Evento: page_view, Page path = /contacto
4. Evento: form_submit
\`\`\`

GA4 mostrará cuántos usuarios pasan de cada paso al siguiente, y cuántos abandonan en cada etapa.

### Métricas clave de conversión

**Tasa de conversión**: % de visitantes que completan el objetivo
\`\`\`
Conversiones / Sesiones × 100
Ejemplo: 20 leads / 1,000 sesiones = 2%
\`\`\`

**Tasa de abandono por paso**: % que sale en cada etapa del embudo

**Valor por visita**: revenue promedio que genera cada visitante
\`\`\`
Revenue / Sesiones
Ejemplo: $10,000 / 5,000 sesiones = $2/visita
\`\`\`

### Herramientas complementarias para entender comportamiento

**Hotjar / Microsoft Clarity** (gratuito):
- **Heatmaps**: dónde hacen click los usuarios
- **Scroll maps**: hasta dónde leen
- **Session recordings**: grabaciones de sesiones reales

**Microsoft Clarity es completamente gratuito** y tiene las mismas funcionalidades que Hotjar básico.

### Cómo interpretar un heatmap

- **Zona caliente** (rojo/naranja): mucho engagement
- **Zona fría** (azul/gris): poco engagement
- **Clicks en elementos no clickeables**: frustración del usuario (bug UX)
- **Scroll profundo**: el contenido es interesante
- **Poco scroll**: el contenido no engancha o el CTA debe estar más arriba`,
        completed: false,
      },
      {
        id: 'd2-l1b',
        title: 'Mini-práctica: Configura un embudo y analiza el comportamiento',
        type: 'practice',
        tasks: [
          'Crea un embudo de conversión en GA4 Explorar para el flujo principal de tu sitio (home → servicios → contacto → form enviado)',
          'Instala Microsoft Clarity en tu sitio (gratuito) y deja recolectar datos por al menos 48 horas',
          'Analiza las grabaciones de sesión en Clarity: ¿los usuarios encuentran lo que buscan? ¿Hay confusión visible?',
          'Revisa el heatmap de tu página principal: ¿los clicks son donde quieres que estén?',
          'Identifica el punto de mayor abandono en tu embudo y propón 3 hipótesis de por qué los usuarios se van ahí',
        ],
        tip: 'Las grabaciones de sesión son la herramienta de diagnóstico más poderosa que existe. Ver a un usuario real navegar tu sitio durante 2 minutos te da más insights que 100 horas de análisis de datos. Empieza siempre por las grabaciones antes de sacar conclusiones de las métricas.',
        completed: false,
      },
      {
        id: 'd2-l2',
        title: 'Segmentación de audiencias y análisis de cohortes',
        type: 'reading',
        content: `## Segmentación: el análisis granular que cambia decisiones

Los promedios mienten. "2% de conversión" puede esconder que el tráfico orgánico convierte al 5% y el de redes sociales al 0.3%. La segmentación revela esas diferencias.

### Segmentos básicos en GA4

**Por canal de adquisición**:
- Organic Search, Direct, Referral, Paid Social, Organic Social, Email

**Por dispositivo**:
- Mobile, Desktop, Tablet

**Por geografía**:
- País, ciudad, región

**Por comportamiento**:
- Usuarios que visitaron X página
- Usuarios que completaron Y conversión
- Usuarios de su primera visita vs usuarios recurrentes

### Cómo crear segmentos en GA4

\`\`\`
GA4 → Explorar → Nueva exploración
→ + Segmento → Segmento de usuario/sesión/evento
→ Definir condiciones
\`\`\`

Ejemplo de segmento valioso:
*Usuarios que visitaron /servicios pero no enviaron el formulario*
→ Son prospectos que no convirtieron → oportunidad de retargeting

### Análisis de cohortes

Una cohorte es un grupo de usuarios que realizaron la misma acción en el mismo período.

El análisis de cohortes responde: **¿los usuarios que llegaron en enero siguen activos en febrero?**

Para agencias y SaaS:
- Cohorte de clientes por mes de adquisición
- ¿Cuántos siguen siendo clientes 3, 6, 12 meses después?
- ¿En qué mes se pierden más clientes?

### Atribución: a qué canal darle el crédito

El modelo de atribución define qué canal recibe el crédito de una conversión:

**Last click** (default): todo el crédito al último canal antes de la conversión
**First click**: todo el crédito al primer canal (el que generó la visita inicial)
**Data-driven** (GA4 default): Machine Learning distribuye el crédito según comportamiento real

Para la mayoría de pequeñas empresas, last-click es suficiente. Para estrategias multicanal, data-driven da más precisión.

### Audiences para remarketing

GA4 puede crear audiencias para exportar a Google Ads:

\`\`\`
GA4 → Admin → Audiences → New audience

Ejemplo:
"Visitaron /servicios en los últimos 30 días
 Y NO completaron form_submit"

→ Esta audiencia se exporta a Google Ads para mostrarles retargeting
\`\`\``,
        completed: false,
      },
      {
        id: 'd2-l2b',
        title: 'Mini-práctica: Segmenta y encuentra el canal que más convierte',
        type: 'practice',
        tasks: [
          'En GA4 Explorar, crea un análisis comparando la tasa de conversión por canal (organic, direct, referral, social)',
          'Crea un segmento de "usuarios que visitaron /servicios o /portafolio pero no convirtieron"',
          'Analiza el comportamiento por dispositivo: ¿hay diferencia significativa entre mobile y desktop?',
          'Exporta el segmento de no-convertidos como Audience en GA4 (aunque no tengas Google Ads, practica la configuración)',
          'Escribe un párrafo de conclusiones: ¿qué canal priorizarías con ese presupuesto? ¿Por qué?',
        ],
        tip: 'El análisis de segmentos más valioso para una agencia no es el de tráfico — es el de conversiones. Si puedes responder "¿cuál es mi canal con mayor costo por lead?" y "¿cuál es mi canal con mejor tasa de conversión a cliente?", puedes tomar decisiones de presupuesto que multiplican el ROI.',
        completed: false,
      },
          {
        id: 'data-2-proj-inter',
        title: 'Proyecto Intermedio: Análisis de Google Analytics de un sitio real',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Analiza los datos de GA4 de un sitio web real durante los últimos 3 meses. Entrega un reporte con insights accionables.',
        deliverables: [
          'Análisis de tráfico: fuentes, medios, canales y evolución en el período',
          'Análisis de comportamiento: páginas más visitadas, tasa de rebote, tiempo en página y flujo de usuarios',
          'Análisis de conversiones: embudo de conversión con los drop-offs identificados',
          '5 insights específicos con evidencia de los datos',
          '5 recomendaciones priorizadas por impacto potencial',
        ],
        tip: 'Un insight sin recomendación es una observación. Una recomendación sin datos es una opinión. Necesitas ambas cosas juntas.',
        completed: false,
      },
],
    resources: [
      {
        title: 'Microsoft Clarity — Heatmaps y grabaciones gratuitas',
        url: 'https://clarity.microsoft.com',
        type: 'tool',
      },
      {
        title: 'GA4 — Exploración de embudo',
        url: 'https://support.google.com/analytics/answer/9327974',
        type: 'documentation',
      },
      {
        title: 'Analytics Mania — GA4 Tutorial avanzado',
        url: 'https://www.analyticsmania.com/google-analytics-4',
        type: 'course',
      },
    ],
  },
  {
    id: 'data-3',
    number: 34,
    title: 'Dashboards con Looker Studio',
    description: 'Construye dashboards profesionales en Looker Studio que conectan GA4, Search Console y más — para uso interno y para clientes.',
    duration: '2 semanas',
    status: 'available',
    track: 'data',
    lessons: [
      {
        id: 'd3-l1',
        title: 'Looker Studio: de datos crudos a visualizaciones accionables',
        type: 'reading',
        content: `## Looker Studio: el BI tool gratuito de Google

Looker Studio (anteriormente Google Data Studio) es una herramienta de Business Intelligence gratuita que conecta múltiples fuentes de datos y crea dashboards visuales e interactivos.

### Por qué Looker Studio para agencias

- **Gratuito** — cero costo para el nivel de uso de una agencia
- **Conectores nativos** con GA4, Google Ads, Google Sheets, Search Console, YouTube
- **Compartible** — el cliente puede ver el dashboard en tiempo real sin acceso a GA4
- **Automatizado** — se actualiza solo, sin exportar Excel cada mes

### Estructura de Looker Studio

\`\`\`
Informe (Report)
├── Páginas (como diapositivas)
│   ├── Gráficas, tablas, tarjetas de métricas
│   └── Filtros y controles de fecha
└── Fuentes de datos conectadas
    ├── GA4
    ├── Search Console
    └── Google Sheets
\`\`\`

### Conectar GA4 a Looker Studio

\`\`\`
1. lookerstudio.google.com → Crear → Informe
2. Agregar datos → Google Analytics → seleccionar propiedad GA4
3. El informe ahora tiene acceso a todas las métricas y dimensiones de GA4
\`\`\`

### Componentes principales

**Tarjeta de puntuación** (Scorecard):
- Muestra un único número con comparativa
- Ideal para: sesiones, usuarios, conversiones, tasa de conversión

**Gráfica de series temporales**:
- Tendencia en el tiempo
- Ideal para: sesiones por día/semana, evolución de conversiones

**Tabla**:
- Datos detallados con dimensión + métricas
- Ideal para: top páginas, top keywords, top países

**Gráfica de barras / dona**:
- Distribución entre categorías
- Ideal para: tráfico por canal, conversiones por dispositivo

### Controles interactivos

Los filtros hacen que el dashboard sea dinámico:

\`\`\`
Control de período: permite al cliente cambiar el rango de fechas
Control de lista: filtrar por país, dispositivo, canal
\`\`\`

Con estos controles, el cliente puede explorar los datos sin saber GA4.

### El truco del período de comparación

Agrega siempre un Scorecard con la comparativa vs período anterior:

\`\`\`
Sesiones: 5,230 ▲ +23% vs mes anterior
Conversiones: 47 ▲ +8% vs mes anterior
\`\`\`

Esto responde la pregunta que siempre hace el cliente: "¿estamos mejorando?"`,
        completed: false,
      },
      {
        id: 'd3-l1b',
        title: 'Mini-práctica: Construye tu primer dashboard de marketing',
        type: 'practice',
        tasks: [
          'Crea un informe en Looker Studio conectado a tu propiedad GA4',
          'Página 1 (Overview): tarjetas de sesiones, usuarios, conversiones y tasa de conversión con comparativa vs mes anterior',
          'Página 2 (Tráfico): gráfica de sesiones por día + tabla de fuentes de tráfico con métricas',
          'Página 3 (Contenido): tabla de páginas más visitadas + bounce rate + tiempo en página',
          'Agrega un control de período en todas las páginas y comparte el link con permisos de "Viewer"',
        ],
        tip: 'El mejor dashboard para un cliente no es el más completo — es el que responde sus 3 preguntas más importantes. Antes de diseñarlo, pregúntale: "¿qué 3 números necesitas ver cada semana para saber si el proyecto va bien?" Y pon esos 3 números en la primera página, grandes y claros.',
        completed: false,
      },
      {
        id: 'd3-l2',
        title: 'Dashboard de SEO: conectar Search Console y GA4',
        type: 'reading',
        content: `## Dashboard SEO en Looker Studio

Un dashboard de SEO profesional combina datos de Google Search Console (rankings, impressions, CTR) con GA4 (tráfico, conversiones) para tener la imagen completa.

### Conectar Search Console

\`\`\`
Looker Studio → Agregar datos → Google Search Console
→ Seleccionar propiedad → Tabla: Site Impression
\`\`\`

GSC en Looker Studio da acceso a:
- **Clicks**: cuántos clics desde búsqueda
- **Impressions**: cuántas veces apareció en resultados
- **CTR**: click-through rate (clicks/impressions)
- **Position**: posición promedio en Google

### Dimensiones clave de GSC

- **Query**: las keywords por las que aparece
- **Page**: qué páginas del sitio reciben el tráfico
- **Country**: desde qué países llegan las búsquedas
- **Device**: mobile vs desktop vs tablet

### Dashboard SEO completo en 4 páginas

**Página 1 — Overview SEO**:
\`\`\`
Scorecards: Total Clicks | Total Impressions | CTR promedio | Posición promedio
Gráfica: Clicks por semana (últimos 3 meses)
\`\`\`

**Página 2 — Keywords**:
\`\`\`
Tabla: Query | Clicks | Impressions | CTR | Position
Ordenado por Clicks descendente
Filtro: posición 1-10 (las que rankean)
\`\`\`

**Página 3 — Páginas**:
\`\`\`
Tabla: Página | Clicks | Impressions | CTR | Position
¿Cuáles páginas traen más tráfico orgánico?
\`\`\`

**Página 4 — Oportunidades**:
\`\`\`
Keywords con muchas impressions pero CTR bajo
→ Oportunidad de mejorar title/description para subir CTR sin cambiar el ranking
\`\`\`

### Fórmulas personalizadas en Looker Studio

\`\`\`
// Clicks potenciales (si mejoras el CTR al promedio de tu industria)
ROUND(Impressions × 0.05) - Clicks

// Ratio de visibilidad
Impressions / SUM(Impressions)
\`\`\`

### Automatizar el reporte mensual

Con el dashboard de Looker Studio ya no necesitas preparar reportes manualmente:

1. El cliente tiene acceso permanente al dashboard en tiempo real
2. Cada mes, solo necesitas el análisis: "qué mejoró, qué empeoró, qué haremos"
3. El dashboard son los datos; el email mensual es el insight sobre esos datos`,
        completed: false,
      },
      {
        id: 'd3-l2b',
        title: 'Mini-práctica: Dashboard SEO con GSC + GA4 combinado',
        type: 'practice',
        tasks: [
          'Agrega Google Search Console como segunda fuente de datos a tu informe de Looker Studio',
          'Crea las 4 páginas del dashboard SEO completo definidas en la lectura',
          'En la página de Keywords, agrega un filtro de CTR < 3% y Position entre 5-20 — estas son oportunidades de optimización',
          'Combina en una vista: clicks orgánicos de GSC vs conversiones orgánicas de GA4 para el mismo período',
          'Configura la entrega automática del reporte mensual por email (Looker Studio → compartir → programar)',
        ],
        tip: 'La página más valiosa del dashboard SEO para un cliente no es la de rankings — es la de oportunidades. Keywords que aparecen pero no convierten clicks son dinero en la mesa. Mostrarle eso al cliente hace que entiendan el valor de optimizar el copy de los resultados de búsqueda.',
        completed: false,
      },
          {
        id: 'data-3-proj-pro',
        title: 'Proyecto Profesional: Sistema de medición para una campaña',
        type: 'project',
        difficulty: 'profesional',
        projectBrief: 'Diseña e implementa el sistema de medición completo para una campaña digital multi-canal.',
        deliverables: [
          'Framework de medición: objetivo de negocio → KPIs → métricas → fuentes de datos para cada canal',
          'Setup de GA4: eventos configurados (mínimo 5 custom events relevantes para la campaña), Goals definidos',
          'Atribución: modelo de atribución elegido con justificación de por qué ese modelo y no otro para este caso específico',
          'Dashboard de campaña en Looker Studio: todos los canales en un solo lugar, comparativa vs. períodos anteriores',
          'Plan de reporting: cadencia, formato y audiencia de cada reporte (operativo semanal vs. ejecutivo mensual)',
          'Protocolo de QA: cómo verificas que el tracking está capturando datos correctamente',
        ],
        rubrica: [
          'Los KPIs se conectan directamente con el objetivo de negocio, no son métricas de vanidad',
          'El setup de GA4 está implementado y verificado (no solo diseñado)',
          'La atribución elegida refleja el journey real del cliente de ese negocio',
          'El dashboard es interpretable por alguien que no configuró el sistema',
          'El protocolo de QA puede detectar problemas de tracking en menos de 30 minutos',
        ],
        tip: 'El error más caro en medición es descubrir que el tracking estaba roto después de que terminó la campaña. Implementa el QA desde el día 1.',
        completed: false,
      },
],
    resources: [
      {
        title: 'Looker Studio — Guía oficial',
        url: 'https://support.google.com/looker-studio',
        type: 'documentation',
      },
      {
        title: 'Looker Studio Gallery — Templates gratuitos',
        url: 'https://lookerstudio.google.com/gallery',
        type: 'tool',
      },
      {
        title: 'Supermetrics — Conectores adicionales para Looker Studio',
        url: 'https://supermetrics.com',
        type: 'tool',
      },
    ],
  },
  {
    id: 'data-4',
    number: 35,
    title: 'A/B Testing y Experimentación',
    description: 'Aprende a diseñar experimentos válidos, interpretar resultados con rigor estadístico y crear una cultura de mejora continua basada en datos.',
    duration: '2 semanas',
    status: 'available',
    track: 'data',
    lessons: [
      {
        id: 'd4-l1',
        title: 'A/B testing: la ciencia de mejorar sin adivinar',
        type: 'reading',
        content: `## A/B Testing: decisiones basadas en evidencia

El A/B testing (también llamado split testing) es el proceso de mostrar dos versiones diferentes de algo (una página, un headline, un botón) a grupos de usuarios distintos, y medir cuál produce mejores resultados.

### Por qué A/B testing y no intuición

La intuición falla constantemente en UX y marketing. Casos famosos:

- Obama 2008: cambiar el CTA de "Sign Up" a "Learn More" aumentó registros en 40%
- Microsoft Bing: un cambio en el formato de anuncios que ningún ejecutivo aprobó generó $100M+ adicionales en revenue
- Amazon: múltiples pruebas fallidas antes de encontrar el botón "Buy Now" correcto

El A/B testing reemplaza opiniones con evidencia.

### Estructura de un experimento válido

\`\`\`
Hipótesis: "Cambiar el CTA de 'Contáctanos' a 'Agenda tu llamada'
            aumentará la tasa de clicks en el botón principal"

Control (A): versión original con "Contáctanos"
Variante (B): versión nueva con "Agenda tu llamada"

Métrica primaria: CTR del botón CTA
Duración: hasta alcanzar significancia estadística
\`\`\`

### Significancia estadística: el concepto que no puedes ignorar

El resultado de un A/B test solo vale si es estadísticamente significativo.

**p-value < 0.05**: hay menos del 5% de probabilidad de que el resultado sea por azar. Esto es el estándar mínimo aceptado.

**Ejemplo**:
- Control: 100 visitas, 2 conversiones (2%)
- Variante: 100 visitas, 3 conversiones (3%)
- ¿Es la variante mejor? **No puedes saberlo con esos números** — puede ser ruido aleatorio

Necesitas más tráfico (generalmente 1,000-10,000 por variante) para confiar en el resultado.

**Herramienta**: abtestguide.com/calc — calcula el tamaño de muestra necesario antes de empezar.

### Qué probar (por impacto potencial)

**Alto impacto**:
- Headline del hero
- CTA principal (texto + color + posición)
- Oferta (precio, estructura, garantía)
- Layout completo de la página

**Medio impacto**:
- Imágenes y visuals
- Testimonios (cuál, en qué orden)
- Longitud del formulario

**Bajo impacto** (no priorizar):
- Color del texto
- Tamaño de fuente leve
- Iconos menores`,
        completed: false,
      },
      {
        id: 'd4-l1b',
        title: 'Mini-práctica: Diseña y documenta un experimento',
        type: 'practice',
        tasks: [
          'Identifica el elemento de tu sitio con mayor impacto potencial si lo cambias (headline, CTA, layout)',
          'Escribe la hipótesis completa: "Creo que cambiando X por Y, la métrica Z mejorará porque..."',
          'Usa abtestguide.com/calc para calcular el tamaño de muestra necesario con tu tráfico actual',
          'Define la duración mínima del experimento (nunca menos de 2 semanas para capturar variaciones semanales)',
          'Crea las dos versiones en Figma (aunque no puedas implementarlas hoy) — el diseño del experimento es el paso más crítico',
        ],
        tip: 'El error más común en A/B testing: terminar el experimento antes de tiempo porque "la variante ya va ganando". Los primeros días de un test son los más volátiles. Un test que parece ganador en día 3 puede ser perdedor en día 14. Respeta la duración mínima establecida antes de sacar conclusiones.',
        completed: false,
      },
      {
        id: 'd4-l2',
        title: 'Herramientas de A/B testing y cómo implementar experimentos',
        type: 'reading',
        content: `## Implementar A/B tests sin developer

### Google Optimize → reemplazado por Optimizely y otros

Google Optimize fue deprecado en 2023. Las alternativas actuales:

**VWO (Visual Website Optimizer)**:
- Editor visual para crear variantes sin código
- A/B, multivariante, personalización
- Desde ~$200/mes

**Optimizely**:
- El estándar enterprise
- Muy poderoso, muy caro
- Para empresas con alto tráfico

**Convert**:
- Buena alternativa de precio medio (~$99/mes)
- Integración con GA4

**Opción low-cost (recomendada para empezar)**:
- **Vercel Edge Config + middleware** — sirve diferentes versiones según cookies
- **GrowthBook** (open source) — plataforma completa de experimentation gratis

### A/B testing con Next.js y Vercel

\`\`\`typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const variant = Math.random() < 0.5 ? 'a' : 'b';

  const response = NextResponse.next();
  response.cookies.set('ab_variant', variant, { maxAge: 60 * 60 * 24 * 7 });

  return response;
}

// En el componente:
import { cookies } from 'next/headers';

const variant = cookies().get('ab_variant')?.value ?? 'a';

return variant === 'b'
  ? <HeroVariantB />
  : <HeroVariantA />;
\`\`\`

Este enfoque es gratuito, rápido (edge) y compatible con cualquier herramienta de analytics.

### Documentar y compartir resultados

Crea un "Experiment Log" en Notion con:
\`\`\`
Experimento: CTA text change
Hipótesis: "Agenda tu llamada" > "Contáctanos"
Start: 2026-06-01 | End: 2026-06-21
Tráfico: 2,400 visitas por variante
Resultado: Variante B +18% CTR (p=0.03 ✅ significativo)
Decisión: Implementar variante B permanentemente
Next: Testear color del botón
\`\`\`

Este log construye conocimiento acumulado sobre tu audiencia que se vuelve más valioso con el tiempo.

### Cultura de experimentación

Las empresas que más crecen no tienen "el mejor instinto" — tienen los mejores procesos de experimentación.

Amazon hace miles de A/B tests simultáneos. Netflix prueba hasta los thumbnails de cada show por audiencia.

Para una agencia: empieza con 1 experimento al mes. Con el tiempo, ese conocimiento acumulado es un activo competitivo real.`,
        completed: false,
      },
      {
        id: 'd4-l2b',
        title: 'Mini-práctica: Implementa tu primer A/B test real',
        type: 'practice',
        tasks: [
          'Implementa el middleware de Vercel para servir dos versiones de tu hero section (variante A y B)',
          'Asegúrate de que el evento de conversión se registra correctamente en GA4 para ambas variantes (con parámetro ab_variant)',
          'Configura un segmento en GA4 para cada variante y crea un dashboard de Looker Studio que compare las métricas',
          'Deja correr el experimento mínimo 2 semanas antes de analizar',
          'Documenta el experimento en tu Experiment Log con todos los campos definidos',
        ],
        tip: 'Solo prueba una variable a la vez. Si cambias el headline Y el color del botón Y la imagen simultáneamente, no sabrás qué causó el resultado. La pureza del experimento es lo que hace que el conocimiento sea acumulable y confiable.',
        completed: false,
      },
    
    {
      id: 'data-4-p1',
      title: 'Proyecto: Dashboard ejecutivo en Looker Studio',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: 'Construye un dashboard ejecutivo en Looker Studio (Google Data Studio) conectado a datos reales de GA4, Google Ads o un Google Sheet con datos de negocio. El dashboard debe contar una historia de negocio clara y permitir tomar decisiones.',
      deliverables: [
        'URL compartida del dashboard',
        'Mínimo 8 visualizaciones relevantes',
        'Texto de contexto/insight en cada sección',
        'Guía de lectura del dashboard (1 página)',
      ],
      rubrica: [
        'Datos conectados a fuente real o realista',
        'Narrativa de negocio coherente',
        'Diseño limpio, jerarquía visual clara',
        'Filtros que permiten exploración de datos',
      ],
      completed: false,
    },],
    resources: [
      {
        title: 'GrowthBook — Open source experimentation platform',
        url: 'https://www.growthbook.io',
        type: 'tool',
      },
      {
        title: 'A/B Test Sample Size Calculator',
        url: 'https://abtestguide.com/calc',
        type: 'tool',
      },
      {
        title: 'Optimizely — A/B testing guide',
        url: 'https://www.optimizely.com/optimization-glossary/ab-testing',
        type: 'article',
      },
    ],
  },
  {
    id: 'data-5',
    number: 36,
    title: 'KPIs y Reportes para Clientes',
    description: 'Define los KPIs correctos para cada tipo de negocio, construye reportes que el cliente entiende y presenta datos que justifican la inversión.',
    duration: '2 semanas',
    status: 'available',
    track: 'data',
    lessons: [
      {
        id: 'd5-l1',
        title: 'KPIs: medir lo que mueve el negocio, no lo que es fácil medir',
        type: 'reading',
        content: `## KPIs: el arte de medir lo correcto

Un KPI (Key Performance Indicator) es una métrica que está directamente vinculada al éxito del negocio.

El error más común: reportar métricas de vanidad en lugar de KPIs reales.

### Métricas de vanidad vs KPIs reales

| Métrica de vanidad | KPI real |
|-------------------|----------|
| Pageviews | Leads generados |
| Seguidores en Instagram | Leads desde Instagram |
| Impresiones de ads | Costo por lead |
| "Tiempo en página" alto | Tasa de conversión |
| Número de posts publicados | Tráfico orgánico generado |

### El framework OKR para definir KPIs

**Objective**: qué queremos lograr (cualitativo)
**Key Results**: cómo sabremos que lo logramos (cuantitativo)

\`\`\`
Objective: Ser la agencia de referencia para startups LATAM

KR1: Conseguir 10 leads calificados por mes desde canales orgánicos
KR2: Tasa de cierre de propuestas ≥ 25%
KR3: NPS de clientes actuales ≥ 8/10
\`\`\`

### KPIs por tipo de negocio

**E-commerce**:
- Tasa de conversión (%)
- Valor promedio de orden (AOV)
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- ROAS (Return on Ad Spend)

**SaaS**:
- MRR (Monthly Recurring Revenue) y crecimiento
- Churn rate (% que cancela cada mes)
- CAC y LTV
- Activation rate (% que completa el onboarding)
- NPS

**Agencia de servicios** (AlphaDev):
- Leads calificados por mes
- Tasa de cierre de propuestas
- Revenue por cliente
- Tiempo de delivery por proyecto
- NPS de clientes

**Blog/contenido**:
- Tráfico orgánico (sesiones)
- Keywords en top 10
- Email subscribers
- Tasa de conversión a lead/subscriber

### North Star Metric: el único número que importa más

Cada negocio tiene una métrica que, si crece, todo lo demás crece con ella.

- Airbnb: noches reservadas
- Facebook: usuarios activos diarios (DAU)
- Spotify: tiempo total de escucha
- AlphaDev Studios: proyectos entregados satisfactoriamente

La North Star Metric alinea a todo el equipo (aunque seas uno solo) en lo que importa.`,
        completed: false,
      },
      {
        id: 'd5-l1b',
        title: 'Mini-práctica: Define los KPIs de tu negocio y de un cliente',
        type: 'practice',
        tasks: [
          'Define la North Star Metric de AlphaDev Studios (o tu propio negocio) y justifícala',
          'Crea el árbol de métricas: North Star → 3-5 KPIs que la impulsan → métricas operativas que mueven cada KPI',
          'Para un cliente hipotético (e-commerce de ropa), define 5 KPIs con sus targets mensuales',
          'Identifica qué herramientas usarías para medir cada KPI (GA4, Search Console, CRM, etc.)',
          'Escribe el dashboard de KPIs en formato de tabla: KPI | Target | Actual | Tendencia | Acción si está debajo',
        ],
        tip: 'El mejor KPI es el que el cliente puede calcular en su cabeza sin herramientas. "23 leads este mes vs 18 el mes pasado" es más poderoso que "la tasa de conversión del canal de adquisición orgánico aumentó 0.3 puntos porcentuales". Simplicidad primero.',
        completed: false,
      },
      {
        id: 'd5-l2',
        title: 'Reportes para clientes: datos que generan confianza y retención',
        type: 'reading',
        content: `## El reporte de cliente que renueva contratos

Un buen reporte no es una dump de datos. Es una narrativa que responde tres preguntas:
1. ¿Qué pasó este mes?
2. ¿Por qué pasó?
3. ¿Qué haremos al respecto?

### El problema con la mayoría de reportes de agencia

- 40 páginas de screenshots de GA4 que el cliente no entiende
- Métricas que van bien aunque el negocio no esté creciendo
- Ninguna narrativa de qué causó los cambios
- Ninguna conexión entre acciones realizadas y resultados obtenidos

El cliente paga por resultados, no por reportes.

### La estructura del reporte que retiene clientes

**Executive Summary** (½ página):
\`\`\`
Este mes: [logro principal]
Vs mes anterior: [comparativa en lenguaje de negocio]
Próximo mes: [1-3 prioridades]
\`\`\`

**KPIs del período** (1 página con visuales):
- Solo los 3-5 KPIs acordados al inicio del proyecto
- Con comparativa vs mes anterior y vs objetivo
- Verde/amarillo/rojo para estado rápido

**Lo que hicimos** (1-2 páginas):
- Acciones concretas realizadas
- Con el impacto esperado de cada una

**Resultados de acciones anteriores** (1 página):
- ¿Qué logramos con lo que hicimos el mes pasado?
- Aquí se conecta esfuerzo con resultado

**Hallazgos e insights** (1 página):
- Qué aprendimos que antes no sabíamos
- Qué oportunidad identificamos

**Plan del próximo mes** (1 página):
- Acciones concretas con responsable y fecha
- KPIs objetivo para el próximo período

### Cómo presentar datos difíciles

Si los KPIs van mal:
1. **Sé directo** — no enterres las malas noticias en el reporte
2. **Explica el "por qué"** — ¿es estacional, algorítmico, competitivo?
3. **Presenta el plan** — qué cambiará para el próximo mes

Un cliente que recibe malas noticias con honestidad y un plan claro confía más que uno que recibe solo buenas noticias.

### Cadencia de comunicación ideal

\`\`\`
Semanal: mensaje corto de 2-3 líneas con el highlight de la semana
Mensual: reporte completo con la estructura de 7 secciones
Trimestral: revisión estratégica de objetivos y ajuste de targets
\`\`\``,
        completed: false,
      },
      {
        id: 'd5-l2b',
        title: 'Mini-práctica: Crea tu template de reporte mensual de cliente',
        type: 'practice',
        tasks: [
          'Crea el template de reporte mensual en Notion (para la narrativa) + Looker Studio (para los datos)',
          'Escribe el reporte de un mes ficticio o real usando la estructura de 7 secciones — con datos inventados si es necesario',
          'Practica traducir cada métrica a lenguaje de negocio: "tráfico orgánico +23%" → "23% más personas buscando [servicio] llegaron al sitio"',
          'Grábate presentando el reporte en 5 minutos — practica explicar resultados con fluidez',
          'Define la cadencia de comunicación completa para un cliente: ¿qué recibirán semanalmente, mensualmente, trimestralmente?',
        ],
        tip: 'Los clientes no retienen a agencias por sus reportes — retienen a agencias que les hacen sentir que están en manos de alguien que entiende su negocio. Los reportes son evidencia de ese entendimiento. Si el reporte podría ser el de cualquier cliente tuyo, no es suficientemente personalizado.',
        completed: false,
      },

      {
        id: 'data-exam',
        title: 'Examen final: Analytics y Datos',
        type: 'exam',
        questions: [
          {
            q: '¿Cuál es la diferencia fundamental entre el modelo de datos de Universal Analytics (UA) y Google Analytics 4 (GA4)?',
            options: [
              'UA es gratuito; GA4 requiere suscripción para datos avanzados',
              'UA se basa en sesiones y pageviews; GA4 se basa en eventos — todo es un evento con parámetros',
              'UA es para web; GA4 es solo para apps móviles',
              'No hay diferencia real, GA4 solo tiene una interfaz diferente',
            ],
            correct: 1,
            explanation: 'Este cambio de paradigma es fundamental. En UA, la unidad era la sesión y los hits eran tipos fijos (pageview, event, transaction). En GA4, TODO es un evento (page_view es un evento, scroll es un evento, purchase es un evento) con parámetros que aportan contexto. Esto da más flexibilidad pero requiere más configuración inicial.',
          },
          {
            q: '¿Por qué es crítico configurar "conversiones" en GA4 y qué pasa si no lo haces?',
            options: [
              'Sin conversiones no puedes ver el tráfico del sitio',
              'Sin conversiones, GA4 muestra tráfico pero no si ese tráfico sirve de algo — pierdes la capacidad de medir el ROI de tus acciones de marketing',
              'Sin conversiones configuradas, Google puede penalizar el sitio en SEO',
              'Las conversiones son opcionales — solo son necesarias para e-commerce',
            ],
            correct: 1,
            explanation: 'Sin conversiones, GA4 es una herramienta de vanidad: sabes que tienes tráfico, pero no si ese tráfico se convierte en leads, ventas o cualquier acción de valor. Con conversiones configuradas, puedes atribuir revenue/leads a canales específicos y tomar decisiones de presupuesto basadas en datos reales.',
          },
          {
            q: '¿Cuál es la ventaja principal de usar Google Tag Manager en lugar de instalar scripts directamente en el HTML?',
            options: [
              'GTM hace que el sitio cargue más rápido porque reduce el número de scripts',
              'Permite gestionar todos los scripts de tracking desde una UI sin modificar el código cada vez — un solo snippet en el HTML gestiona todos los demás',
              'GTM garantiza que los eventos lleguen a GA4 sin pérdida de datos',
              'GTM es gratuito; instalar scripts directamente tiene costo',
            ],
            correct: 1,
            explanation: 'Con GTM, el desarrollo solo instala un snippet una vez. Después, agregar Meta Pixel, Hotjar, nuevos eventos de GA4 o cualquier script es configuración en la UI de GTM — sin deploy. Esto desacopla el tracking del código, permitiendo que el equipo de marketing opere independientemente del equipo de desarrollo.',
          },
          {
            q: 'En un embudo de conversión de GA4, la página /contacto tiene 80% de tasa de abandono. ¿Cuál es el primer paso correcto?',
            options: [
              'Rediseñar completamente la página de contacto inmediatamente',
              'Investigar el "por qué" antes de actuar: revisar grabaciones de sesión (Clarity/Hotjar) y heatmaps para entender dónde y por qué abandonan',
              'Reducir el número de campos del formulario a solo email',
              'Aumentar el presupuesto de ads para traer más tráfico que compense el abandono',
            ],
            correct: 1,
            explanation: 'El 80% de abandono es un síntoma, no un diagnóstico. Las causas posibles son muy distintas: formulario muy largo, error técnico, falta de confianza, precio inesperado, falta de claridad. Antes de actuar, las grabaciones de sesión revelan exactamente dónde se detienen los usuarios. Actuar sin diagnóstico lleva a "soluciones" que no resuelven el problema real.',
          },
          {
            q: '¿Qué significa que un A/B test tiene un p-value de 0.03?',
            options: [
              'La variante B ganó por un 3% de diferencia en la métrica principal',
              'Hay un 3% de probabilidad de que el resultado observado sea por azar — es estadísticamente significativo (p < 0.05)',
              'El test necesita 3% más de tráfico para ser concluyente',
              'La variante A (control) tiene 3% más de conversiones que la variante B',
            ],
            correct: 1,
            explanation: 'p-value = probabilidad de que el resultado se deba al azar. p=0.03 significa solo 3% de probabilidad de que sea ruido aleatorio (97% de confianza en que el resultado es real). El estándar aceptado es p < 0.05. Un resultado "ganador" con p=0.3 tiene 30% de probabilidad de ser un falso positivo — no es confiable.',
          },
          {
            q: 'Un cliente pregunta: "¿Qué canal me trae más tráfico?" ¿Cuál es la respuesta analíticamente correcta?',
            options: [
              'Darle el canal con más sesiones absolutas',
              'Explicar que "más tráfico" no es el KPI correcto; la pregunta real es qué canal trae tráfico de mayor calidad (tasa de conversión, costo por lead, LTV)',
              'Decirle que necesita más datos para responder',
              'El canal con más tráfico siempre es el más valioso',
            ],
            correct: 1,
            explanation: 'Tráfico sin calidad es vanidad. El canal que trae 10,000 visitas con 0.1% de conversión puede ser menos valioso que el canal con 500 visitas y 5% de conversión. El análisis correcto segmenta por canal Y por calidad (conversiones, revenue, tiempo en página). Esta distinción es lo que diferencia a un analista de datos de alguien que solo reporta números.',
          },
          {
            q: '¿Cuál es la diferencia entre métricas "leading indicators" y "lagging indicators" en analytics?',
            options: [
              'Leading son métricas de marketing; lagging son métricas de ventas',
              'Leading indicators predicen resultados futuros (artículos publicados, backlinks obtenidos); lagging indicators miden resultados pasados (tráfico, revenue)',
              'Leading son métricas en tiempo real; lagging son reportes mensuales',
              'No hay diferencia práctica — ambos miden el mismo desempeño en momentos distintos',
            ],
            correct: 1,
            explanation: 'Leading indicators son accionables pero no son el objetivo final: publicar 4 artículos/mes predice tráfico SEO en 3-6 meses. Lagging indicators son el resultado real: tráfico orgánico, conversiones, revenue. Reportar solo lagging crea reactividad. Reportar leading + lagging crea una historia de causa-efecto que el cliente entiende y en la que confía.',
          },
          {
            q: 'Looker Studio se conecta a GA4 y muestra "0 conversiones" aunque GA4 sí muestra conversiones. ¿Cuál es la causa más probable?',
            options: [
              'Looker Studio tarda 48 horas en sincronizar los datos de GA4',
              'Los eventos de conversión en GA4 están configurados como eventos normales — no marcados como conversiones en la sección de configuración',
              'Looker Studio no puede mostrar conversiones de GA4, solo de Google Ads',
              'Necesitas reconectar la fuente de datos cada semana',
            ],
            correct: 1,
            explanation: 'GA4 tiene dos conceptos: "events" (cualquier interacción) y "conversions" (eventos marcados como importantes en Admin → Events → toggle Conversion). Looker Studio usa el campo "Conversions" que solo cuenta los eventos marcados como conversión. Si un evento form_submit no está marcado como conversión en GA4, aparecerá en "Events" pero no en "Conversions" en Looker Studio.',
          },
        ],
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Google Looker Studio — Templates de reportes',
        url: 'https://lookerstudio.google.com/gallery',
        type: 'tool',
      },
      {
        title: 'Hotjar — KPI Dashboard Guide',
        url: 'https://www.hotjar.com/blog/marketing-kpis',
        type: 'article',
      },
      {
        title: 'Klipfolio — KPI templates por industria',
        url: 'https://www.klipfolio.com/resources/kpi-examples',
        type: 'tool',
      },
    ],
  },
  {
    id: 'data-capstone',
    number: 44,
    title: 'Proyecto Final: Infraestructura de Analytics para un Cliente',
    description: 'Configura el setup completo de analytics para un negocio real: GA4, GTM, Looker Studio, A/B test y framework de KPIs — todo documentado y entregable.',
    duration: '4 semanas',
    status: 'available',
    track: 'data',
    lessons: [
      {
        id: 'data-cap-1',
        title: 'Proyecto Capstone: Analytics que Toma Decisiones',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: `## La infraestructura de datos que cualquier negocio necesita

El 90% de los negocios tiene Google Analytics instalado. Menos del 10% lo tiene configurado correctamente y lo usa para tomar decisiones. Este capstone produce el setup del 10%.

### El brief

Configura y documenta la infraestructura completa de analytics para UN negocio real. Puede ser:
- Tu propio sitio/proyecto
- El sitio de AlphaDev Studios
- El sitio de un cliente o conocido (con acceso a GA4, GTM y GSC)

### La diferencia entre "tener Analytics" y "tener Analytics bien"

- **Mal**: GA4 instalado con el snippet, sin events configurados, sin conversiones, sin Dashboard, informes default
- **Bien**: GA4 + GTM configurados, conversiones marcadas, eventos personalizados para el negocio, Dashboard en Looker Studio que responde preguntas de negocio, A/B test corriendo, KPIs definidos con reporte mensual

Este capstone produce el segundo escenario.`,
        deliverables: [
          'GA4 completamente configurado: mínimo 5 eventos personalizados relevantes para el negocio (no solo los automáticos), mínimo 2 conversiones marcadas, audiencias de remarketing configuradas',
          'GTM setup documentado: screenshot de todos los tags configurados, triggers y variables — con explicación del propósito de cada tag',
          'Looker Studio dashboard (mínimo 3 páginas): Overview de KPIs con comparativas, Fuentes de tráfico, Comportamiento de conversión — con controles de fecha interactivos',
          'Diseño de A/B test: hipótesis documentada, control vs variante descritos, métrica primaria y secundaria, tamaño de muestra necesario calculado, duración mínima — implementado si hay tráfico suficiente, documentado si no',
          'Framework de KPIs del negocio: North Star Metric + 5 KPIs con targets mensuales, árbol de métricas que muestra cómo cada KPI impacta la NSM',
          'Reporte mensual de ejemplo: usando datos reales del período de trabajo, con la estructura completa de 7 secciones — incluyendo traducciones de cada métrica a lenguaje de negocio',
        ],
        tip: 'El entregable más valorado de este capstone por clientes reales es el Dashboard de Looker Studio — porque lo pueden ver ellos solos, cuando quieran, sin pedirte un reporte. Diseña el dashboard para el CEO del negocio (que no sabe de analytics), no para ti. Si necesita explicación para entenderse, no está terminado.',
        completed: false,
      },
      {
        id: 'data-cap-2',
        title: 'Checklist de entrega y criterios de evaluación',
        type: 'practice',
        tasks: [
          'GA4: ¿los 5 eventos personalizados son específicos del negocio (no genéricos)? ¿se disparan correctamente al navegar el sitio?',
          'GA4: ¿las conversiones marcadas son acciones que realmente importan al negocio (no pageviews aleatorios)?',
          'GTM: ¿el Preview de GTM no muestra errores en ninguno de los tags?',
          'GTM: ¿está el manejo de errores configurado (qué pasa si un tag falla)?',
          'Looker Studio: ¿cada gráfica tiene título que explica qué muestra sin necesidad de leer los ejes?',
          'Looker Studio: ¿todos los scorecards tienen comparativa vs período anterior?',
          'KPIs: ¿los targets son alcanzables y basados en datos reales (no inventados)?',
          'KPIs: ¿el reporte mensual usa lenguaje de negocio, no jerga de analytics?',
          'Entrega: ¿el dashboard de Looker Studio tiene permisos de acceso para el cliente?',
        ],
        tip: 'Antes de entregar, simula ser el cliente: abre el dashboard con tu teléfono, sin instrucciones previas, y responde: ¿estamos creciendo? ¿qué canal trae más clientes? ¿dónde se nos van los usuarios? Si el dashboard no responde esas 3 preguntas en 30 segundos, rediseña.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Looker Studio — Dashboard builder',
        url: 'https://lookerstudio.google.com',
        type: 'tool',
      },
      {
        title: 'GrowthBook — A/B testing gratuito',
        url: 'https://www.growthbook.io',
        type: 'tool',
      },
      {
        title: 'Microsoft Clarity — Heatmaps + grabaciones',
        url: 'https://clarity.microsoft.com',
        type: 'tool',
      },
    ],
  },
  {
    id: 'ventas-1',
    number: 60,
    title: 'Ventas para servicios creativos y tech',
    description: 'Vender servicios de agencia es diferente a vender productos. Aprende el proceso completo: prospectar, calificar, presentar y cerrar sin perder tu precio.',
    duration: '2 semanas',
    status: 'available',
    track: 'ventas',
    lessons: [
      {
        id: 'ventas-1-1',
        title: 'El proceso de ventas consultivo para agencias',
        type: 'reading',
        content: '## Por qué el pitch de ventas no funciona para servicios de agencia\n\nCuando vendes un producto físico, el proceso es directo: presentas características, beneficios y precio. Cuando vendes servicios creativos o técnicos, el proceso debe ser diferente: primero entiendes el problema, luego propones la solución. El cliente que compra sin entender bien qué necesita es el cliente que termina insatisfecho, pide revisiones infinitas y daña tu reputación.\n\n## El proceso de ventas consultivo en 5 pasos\n\n**1. Prospección (crear el pipeline)**\nIdentificar prospectos que tienen el problema que resuelves, el presupuesto para pagarte y la autoridad para tomar la decisión. Fuentes: red personal, contenido en redes, referidos, outreach directo.\n\n**2. Discovery call (escuchar antes que hablar)**\nLa discovery no es una presentación de tu agencia — es una entrevista al prospecto. Preguntas clave:\n- ¿Cuál es el mayor desafío que tienes en [área relevante] ahora mismo?\n- ¿Qué has intentado antes? ¿Por qué no funcionó?\n- ¿Cuál sería el impacto de resolver este problema?\n- ¿Cuándo necesitas que esté resuelto?\n- ¿Tienes presupuesto definido para esto?\n\n**3. Propuesta personalizada (48-72 horas después)**\nBased on exactamente lo que escuchaste. No es un catálogo de servicios — es una solución específica al problema específico que describieron.\n\n**4. Presentación y negociación**\nPresenta el valor antes del precio. El precio nunca debería ser el primer número que escucha el cliente.\n\n**5. Cierre y follow-up**\nPedir explícitamente la decisión. Manejar objeciones. Follow-up sistemático.',
        tasks: [
          'Escribe el guión de tu discovery call: 8-10 preguntas que harías a un prospecto de los servicios que ofreces. Practica en voz alta hasta que suenen naturales',
          'Define el perfil de tu cliente ideal (ICP): industria, tamaño, etapa de negocio, problema específico, presupuesto aproximado, y señales de que ES un buen prospecto vs. señales de alerta',
          'Roleplay de discovery call: pide a alguien que juegue al cliente y practica tu proceso completo de 30 minutos. Graba o pide feedback',
        ],
        tip: 'La discovery call más efectiva tiene 80% de preguntas del vendedor y 20% de respuestas del vendedor. Si hablas más de lo que escuchas, estás haciendo pitch, no discovery.',
        completed: false,
      },
      {
        id: 'ventas-1-2',
        title: 'Manejo de objeciones: precio, tiempo y confianza',
        type: 'reading',
        content: '## Las 3 objeciones universales en ventas de servicios\n\nToda objeción en ventas de servicios profesionales es una variación de tres cosas:\n\n**1. "Es muy caro"** (objeción de precio)\nEn el 90% de los casos, no es que no tengan el dinero — es que no ven suficiente valor para justificar el precio. La respuesta no es bajar el precio; es aumentar el valor percibido o reducir el scope para ajustarlo al presupuesto.\n\nRespuesta efectiva: "Entiendo que el presupuesto es una consideración importante. ¿Qué resultado necesitas ver para que esta inversión se justifique sola?"\n\nLuego: calcular el ROI. Si tu servicio de $5,000 puede generar $20,000 en valor, el precio es una inversión, no un gasto.\n\n**2. "Ahora no es buen momento"** (objeción de timing)\nEsta objeción casi siempre significa una de dos cosas: no están convencidos del valor, o hay algo que les frena que no han dicho.\n\nRespuesta efectiva: "Entiendo. ¿Cuándo sería un buen momento? ¿Qué necesitaría pasar para que el timing sea correcto?"\n\n**3. "Necesito pensarlo / consultarlo"** (objeción de autoridad)\nSi alguien necesita consultarlo, hay otra persona que toma la decisión. La pregunta es: ¿por qué no están en esta llamada?\n\nRespuesta efectiva: "Por supuesto. ¿Tendría sentido incluir a esa persona en una próxima llamada para que tengamos toda la información disponible?"\n\n## Sostener el precio\n\nEl momento más difícil en ventas de servicios: cuando el cliente presiona el precio y tú tienes miedo de perder el negocio. Herramientas para sostener:\n- Silencio estratégico (después de dar el precio, callarse)\n- "¿Qué necesitaríamos cambiar en el scope para ajustar el presupuesto?" (cedes scope, no precio)\n- Mostrar el costo de NO resolver el problema',
        tasks: [
          'Escribe la respuesta completa a las 3 objeciones para tus servicios específicos: no las genéricas de arriba, adaptadas a tu contexto real',
          'Practica con roleplay: pide que alguien te diga "es muy caro" con tu precio real y ensaya la respuesta hasta que no sientas incomodidad al darla',
          'Calcula el ROI de tu servicio principal para un cliente típico: cuánto valor genera para el cliente vs. lo que cobras. Este número es tu argumento más poderoso',
        ],
        tip: 'La primera vez que alguien dices tu precio real en voz alta es incómoda. La décima vez es natural. La única forma de llegar a la décima es haberlo dicho nueve veces antes. Practica en voz alta, solo, hasta que el número no te produzca ansiedad.',
        completed: false,
      },
      {
        id: 'ventas-1-3',
        title: 'Funnels digitales para generar leads de forma predecible',
        type: 'reading',
        content: '## La diferencia entre conseguir clientes y tener un sistema de clientes\n\nConseguir un cliente es un evento. Un funnel de ventas es un sistema que genera prospectos de forma predecible. La diferencia entre una agencia que vive de referidos (irregular, sin control) y una que tiene un flujo constante de leads (predecible, escalable).\n\n## Los 4 componentes de un funnel de ventas digital\n\n**1. Tráfico**: la fuente que trae personas al funnel. Puede ser orgánico (SEO, contenido social, LinkedIn), pagado (Meta Ads, Google Ads), o referidos (programa de afiliados, partnerships).\n\n**2. Lead magnet + landing page**: la oferta gratuita de alto valor que intercambias por el email. Para servicios B2B: diagnóstico gratuito, checklist de auditoría, guía específica, plantilla. La landing page debe tener: headline que identifica el pain, beneficios del lead magnet, prueba social, y un formulario simple.\n\n**3. Nurturing (secuencia de emails + contenido)**: el proceso de construir confianza y demostrar expertise antes de hacer cualquier pitch. Puede durar días o semanas dependiendo del ticket del servicio.\n\n**4. Conversión**: el CTA final que invita a la acción. Para servicios de agencia: reserva una llamada de discovery, completa este diagnóstico gratuito, envía tu solicitud.\n\n## Herramientas para construir el funnel\n\n**Landing pages**: Framer, Webflow, o incluso una página de Next.js simple para agencias técnicas.\n\n**Email**: Brevo, Mailchimp, ConvertKit.\n\n**CRM y pipeline**: HubSpot Free, Notion, o Airtable para rastrear en qué etapa está cada prospecto.\n\n**Booking de llamadas**: Calendly (plan gratuito) para que los prospectos agenden la discovery call directamente sin ida y vuelta de emails.',
        tasks: [
          'Diseña el funnel de ventas completo para tu servicio principal: fuente de tráfico, lead magnet, secuencia de nurturing (3 emails) y CTA de conversión',
          'Crea la landing page del lead magnet en Framer o con el stack que uses (no tiene que ser perfecta — tiene que existir y funcionar)',
          'Configura Calendly para tu discovery call con: duración (30 min), preguntas de calificación (3 preguntas que te ayuden a preparar la llamada), y conexión a tu calendario',
        ],
        tip: 'El funnel más efectivo para una agencia nueva no es el más sofisticado — es el que te permite hablar con más prospectos calificados. Una landing page simple + Calendly + seguimiento manual al principio supera a un funnel automatizado complicado que nunca se lanza.',
        completed: false,
      },
          {
        id: 'ventas-1-proj-basico',
        title: 'Proyecto Básico: Guión de discovery call',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Escribe el guión completo de tu discovery call. Debe ser específico para los servicios que ofreces.',
        deliverables: [
          'Introducción: cómo abres la llamada y estableces el tono (2-3 líneas)',
          'Preguntas de discovery: 8-10 preguntas abiertas específicas para tu tipo de cliente',
          'Preguntas de calificación: las 3 preguntas que determinan si el prospecto es un buen fit',
          'Cierre de la discovery: cómo terminas la llamada y cuáles son los próximos pasos',
          'Roleplay documentado: practica el guión con alguien y anota qué funcionó y qué ajustar',
        ],
        tip: 'El guión de discovery no se memoriza — se internaliza. Practica en voz alta hasta que las preguntas salgan naturales.',
        completed: false,
      },
      {
        id: 'ventas-1-proj-inter',
        title: 'Proyecto Intermedio: Propuesta de servicios completa',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Redacta una propuesta de servicios completa para un cliente real o ficticio basándote en un brief de discovery.',
        deliverables: [
          'Contexto del cliente: el problema identificado en la discovery en las palabras del cliente',
          'Solución propuesta: qué harás exactamente, en qué orden y con qué entregables',
          'Proceso de trabajo: las fases del proyecto con fechas y gates de aprobación',
          'Inversión: el precio presentado como inversión con el ROI esperado si aplica',
          'Próximos pasos: qué tiene que hacer el cliente para arrancar',
          'Propuesta en formato visual (Notion, Google Docs o PDF) con diseño limpio y legible',
        ],
        tip: 'El precio en una propuesta nunca debería ser la primera cifra que el cliente lee. Presenta el valor primero, el precio último.',
        completed: false,
      },

    {
      id: 'ventas-1-p2',
      title: 'Proyecto: Script de llamada de ventas',
      type: 'project',
      difficulty: 'básico',
      projectBrief: 'Crea un script completo para una llamada de descubrimiento de 20 minutos. Incluye apertura, preguntas de descubrimiento, manejo de objeciones más comunes y cierre.',
      deliverables: [
        'Script estructurado por fases',
        'Mínimo 5 preguntas de descubrimiento',
        'Respuestas a 3 objeciones típicas',
        'Frase de cierre con siguiente paso claro',
      ],
      rubrica: [
        'Apertura natural, no de vendedor',
        'Preguntas abiertas que generan insight',
        'Manejo de objeciones sin presión',
      ],
      completed: false,
    },],
    resources: [
      { title: 'Calendly — agenda discovery calls sin ida y vuelta de emails', url: 'https://calendly.com', type: 'tool' },
      { title: 'HubSpot Free CRM — gestión de pipeline de ventas gratuito', url: 'https://www.hubspot.com/products/crm', type: 'tool' },
    ],
  },
  {
    id: 'ventas-capstone',
    number: 61,
    title: 'Proyecto: Funnel completo de ventas',
    description: 'Construye y lanza el sistema completo de generación de leads para tu agencia.',
    duration: '2 semanas',
    status: 'available',
    track: 'ventas',
    lessons: [
      {
        id: 'ventas-capstone-1',
        title: 'Proyecto: Sistema de ventas de agencia',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: 'Diseña e implementa el sistema completo de ventas para tu agencia: desde la generación de leads hasta el cierre. El entregable es un sistema funcional, no un plan en papel.',
        deliverables: [
          'ICP documentado: perfil del cliente ideal con todos los atributos: industria, tamaño, etapa, problema, presupuesto, señales positivas y de alerta',
          'Lead magnet + landing page: el lead magnet creado (PDF, checklist, template) y la landing page publicada en internet (URL real)',
          'Secuencia de nurturing: 5 emails escritos y configurados en la herramienta de email marketing',
          'Guión de discovery call: preguntas, flujo de la llamada, y respuestas a las 3 objeciones principales',
          'CRM configurado: pipeline con 5 etapas (prospecto → discovery → propuesta → negociación → cerrado) y al menos 3 prospectos reales registrados',
          'Calendly configurado: link de booking con preguntas de calificación y conectado al calendario real',
          'Métricas del primer mes: cuántos leads generó el funnel, cuántas discovery calls se realizaron, cuántas propuestas se enviaron',
        ],
        tasks: [
          'Lanza el funnel: landing page publicada, secuencia de email activa, Calendly funcional. Comparte el link en #proyecto-ventas',
          'Realiza al menos 1 discovery call real (con un prospecto real o un compañero en roleplay) y documenta cómo fue',
          'Comenta el sistema de al menos 2 compañeros con feedback sobre la landing page y la secuencia de nurturing',
        ],
        tip: 'El mejor funnel de ventas es el que realmente usas. Un sistema simple que ejecutas consistentemente supera a un sistema sofisticado que no arrancas nunca.',
        completed: false,
      },
    ],
    resources: [],
  },
]
