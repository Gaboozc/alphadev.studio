// Las fichas de los demos (`/demos/<slug>`). A esta ficha apunta la franja
// "Ver cómo se hizo" que lleva cada demo. Lo que aquí se afirma tiene que ser
// verdad del código de alphadev-demos: nada aspiracional.

export type DemoSlug = 'ambar-grill' | 'cometa-cargo' | 'celeste-clinic' | 'mentora-talent';

type Texto = { es: string; en: string };

export interface DemoFicha {
  slug: DemoSlug;
  name: string;
  url: string;
  sector: Texto;
  problema: Texto;
  modulos: { nombre: Texto; texto: Texto }[];
  /** Lo que de verdad hace distinto a este demo en cómo está construido. */
  destacado: Texto;
}

export const DEMO_FICHAS: DemoFicha[] = [
  {
    slug: 'ambar-grill',
    name: 'Ámbar Grill',
    url: 'https://ambar.demo.alphadev.studio',
    sector: { es: 'Restaurantes', en: 'Restaurants' },
    problema: {
      es: 'Una cadena de varios locales en dos países que compra por WhatsApp y no ve nada desde la sede: ni qué se vende, ni qué falta en cada cocina, ni a quién se le compra.',
      en: 'A multi-location chain across two countries that buys over WhatsApp and sees nothing from headquarters: not what sells, not what each kitchen is missing, not who it buys from.',
    },
    modulos: [
      { nombre: { es: 'Directorio de proveedores', en: 'Supplier directory' }, texto: { es: 'Un solo directorio de compras, con cada cambio de tarifa fechado.', en: 'One purchasing directory, with every rate change timestamped.' } },
      { nombre: { es: 'Inventario', en: 'Inventory' }, texto: { es: 'El stock se calcula (entradas menos salidas) y avisa cuando algo baja del mínimo.', en: 'Stock is computed (in minus out) and flags anything below its minimum.' } },
      { nombre: { es: 'Ventas por local', en: 'Sales by location' }, texto: { es: 'Cada semana contra la anterior; México y Orlando por separado, cada uno en su moneda, nunca sumadas.', en: 'Each week against the last; Mexico and Orlando apart, each in its own currency, never added together.' } },
      { nombre: { es: 'Pronóstico de ventas', en: 'Sales forecast' }, texto: { es: 'Qué se espera vender, con rango probable y las cuatro métricas de calidad explicadas en palabras.', en: 'What to expect, with a likely range and the four quality metrics explained in plain words.' } },
      { nombre: { es: 'Asistente de cocina', en: 'Kitchen assistant' }, texto: { es: 'Responde sobre estándares y recetas citando el manual de la cocina.', en: 'Answers questions about standards and recipes, citing the kitchen manual.' } },
    ],
    destacado: {
      es: 'El pronóstico no usa librerías de ciencia de datos: es una regresión escrita a mano, con las pruebas estadísticas verificadas contra scipy. Cada dependencia que no se instala es superficie de ataque que no existe.',
      en: 'The forecast uses no data-science libraries: it is a hand-written regression, with its statistical tests verified against scipy. Every dependency not installed is attack surface that does not exist.',
    },
  },
  {
    slug: 'cometa-cargo',
    name: 'Cometa Cargo',
    url: 'https://cometa.demo.alphadev.studio',
    sector: { es: 'Logística', en: 'Logistics' },
    problema: {
      es: 'Envíos que se retrasan, transportistas que no avisan y devoluciones que alguien aprueba una por una, sin criterio común.',
      en: 'Late shipments, carriers that never call, and returns someone approves one by one with no common criteria.',
    },
    modulos: [
      { nombre: { es: 'Incidencias de envío', en: 'Shipment incidents' }, texto: { es: 'Lo grave primero: filtros por estado, tipo y transportista, y tiempo medio de resolución.', en: 'The serious first: filters by status, type and carrier, and mean time to resolution.' } },
      { nombre: { es: 'Transportistas', en: 'Carriers' }, texto: { es: 'Puntualidad, retraso medio e incidencias por cada 100 envíos, con números y no con impresiones.', en: 'On-time rate, mean delay and incidents per 100 shipments: numbers, not impressions.' } },
      { nombre: { es: 'Devoluciones', en: 'Returns' }, texto: { es: 'El asistente recomienda con su razón; una persona confirma. Nada se aprueba solo.', en: 'The assistant recommends with its reasoning; a person confirms. Nothing is approved on its own.' } },
      { nombre: { es: 'Seguimiento', en: 'Tracking' }, texto: { es: '«¿Dónde está mi paquete?» respondido al instante, con línea de tiempo.', en: '“Where is my package?” answered instantly, with a timeline.' } },
    ],
    destacado: {
      es: 'La recomendación de devoluciones son reglas escritas y visibles, en orden de prioridad (un valor alto escala antes que cualquier motivo). El agente propone, la persona decide, y se ve si coincidieron.',
      en: 'Return recommendations are written, visible rules in priority order (a high value escalates before any reason). The agent proposes, the person decides, and you can see whether they matched.',
    },
  },
  {
    slug: 'celeste-clinic',
    name: 'Celeste Clinic',
    url: 'https://celeste.demo.alphadev.studio',
    sector: { es: 'Salud', en: 'Healthcare' },
    problema: {
      es: 'Una red de clínicas donde casi uno de cada cuatro pacientes no llega a su cita, las reservas viven en el teléfono y nadie encuentra el protocolo cuando lo necesita.',
      en: 'A clinic network where nearly one in four patients misses their appointment, bookings live on the phone and nobody can find the protocol when they need it.',
    },
    modulos: [
      { nombre: { es: 'Reservas y recordatorios', en: 'Bookings and reminders' }, texto: { es: 'La tasa de no-shows con y sin recordatorio, y las próximas citas ordenadas por riesgo.', en: 'No-show rate with and without reminders, and upcoming appointments ordered by risk.' } },
      { nombre: { es: 'Insumos clínicos', en: 'Clinical supplies' }, texto: { es: 'Lo agotado y lo que está por caducar primero, con la cantidad sugerida para pedir.', en: 'What is out and what is about to expire first, with the suggested order quantity.' } },
      { nombre: { es: 'Asistente de protocolos', en: 'Protocol assistant' }, texto: { es: 'Responde sobre procedimientos internos con su fuente. Nunca da consejo médico.', en: 'Answers about internal procedures with its source. Never gives medical advice.' } },
      { nombre: { es: 'Seguridad', en: 'Security' }, texto: { es: 'Una auditoría que se ejecuta en vivo contra las reglas reales, y los controles según OWASP Top 10.', en: 'An audit that runs live against the real rules, and the controls per OWASP Top 10.' } },
    ],
    destacado: {
      es: 'Es el demo donde equivocarse cuesta más, así que las reglas de seguridad corren antes de que el asistente busque o responda nada, y la pantalla de Seguridad las prueba en vivo con casos que deben bloquearse y casos que deben pasar.',
      en: 'This is the demo where a mistake costs the most, so the safety rules run before the assistant searches or answers anything, and the Security screen tests them live with cases that must be blocked and cases that must pass.',
    },
  },
  {
    slug: 'mentora-talent',
    name: 'Mentora Talent',
    url: 'https://mentora.demo.alphadev.studio',
    sector: { es: 'Talento y RRHH', en: 'Talent and HR' },
    problema: {
      es: 'Una consultora de selección con procesos manuales: cientos de candidatos en hojas de cálculo y respuestas a licitaciones que se arman desde cero cada vez.',
      en: 'A recruitment consultancy with manual processes: hundreds of candidates in spreadsheets and tender responses rebuilt from scratch every time.',
    },
    modulos: [
      { nombre: { es: 'Candidatos', en: 'Candidates' }, texto: { es: 'Un pipeline donde nadie se salta etapas, ordenado por afinidad con la vacante.', en: 'A pipeline where nobody skips stages, ordered by fit with the vacancy.' } },
      { nombre: { es: 'Respuestas a RFP', en: 'RFP responses' }, texto: { es: 'Borradores por pregunta y aprobación por departamento; no se envía sin todas.', en: 'Drafts per question and per-department approval; nothing goes out without all of them.' } },
      { nombre: { es: 'Base de conocimiento', en: 'Knowledge base' }, texto: { es: 'Lo que la consultora ya sabe, con la fuente de cada respuesta.', en: 'What the firm already knows, with the source of every answer.' } },
      { nombre: { es: 'Herramientas MCP', en: 'MCP tools' }, texto: { es: 'Las capacidades de la consultora como un servidor MCP que cualquier agente compatible puede usar.', en: 'The firm’s capabilities as an MCP server any compatible agent can use.' } },
    ],
    destacado: {
      es: 'El servidor MCP es de verdad (JSON-RPC 2.0: initialize, tools/list, tools/call) y se puede probar viendo la solicitud y la respuesta exactas. Las reglas, como qué etapa sigue o cuándo un RFP puede enviarse, viven en el servidor, no en la pantalla.',
      en: 'The MCP server is real (JSON-RPC 2.0: initialize, tools/list, tools/call) and you can try it seeing the exact request and response. The rules, like which stage comes next or when an RFP can go out, live on the server, not in the screen.',
    },
  },
];

export function fichaPorSlug(slug: string): DemoFicha | undefined {
  return DEMO_FICHAS.find((d) => d.slug === slug);
}
