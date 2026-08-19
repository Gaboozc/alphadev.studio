import type { Translations } from './types';

export const es: Translations = {
  nav: {
    home: 'Inicio',
    services: 'Servicios',
    portfolio: 'Resultados',
    process: 'Cómo trabajamos',
    contact: 'Contacto',
    cta: 'Quiero existir',
    lang_label: 'Cambiar idioma',
  },
  hero: {
    headline: 'Si no estás en internet,\nno existes.',
    subheadline:
      'Creamos tu presencia digital desde cero: tu sitio web, tus redes sociales y tu lugar en Google. Para que tus clientes te encuentren, te elijan y vuelvan.',
    cta_primary: 'Quiero existir en internet',
    cta_secondary: 'Ver cómo lo hacemos',
  },
  services: {
    title: 'Servicios',
    subtitle: 'Todo lo que tu negocio necesita para brillar online.',
    cta: 'Hablar con nosotros',
    items: [
      {
        title: 'Presencia desde cero',
        description:
          '¿Empiezas de la nada? Te creamos todo: marca, logo, sitio web y perfiles. Sales a internet con una imagen profesional completa.',
      },
      {
        title: 'Manejo de redes sociales',
        description:
          'Nos encargamos de tus redes: contenido, publicaciones, respuestas. Tu marca activa y creciendo, sin que muevas un dedo.',
      },
      {
        title: 'Publicidad que vende',
        description:
          'Campañas en Google y redes sociales diseñadas para traer clientes, no solo "likes". Medimos cada peso invertido.',
      },
      {
        title: 'Aparece en Google',
        description:
          'Optimizamos tu perfil de Google para que aparezcas en el mapa y en las búsquedas cuando alguien necesite lo que ofreces.',
      },
      {
        title: 'Sitio web profesional',
        description:
          'Una página que carga rápido, se ve increíble en el celular, y convierte visitantes en clientes.',
      },
    ],
  },
  portfolio: {
    title: 'Resultados',
    subtitle: 'Somos un estudio joven y no inventamos clientes. Esto es real: en lo que trabajamos hoy.',
    items: [
      {
        title: 'Imperial Barbershop',
        type: 'Cliente · Barbería',
        description:
          'Nuestro primer cliente. Construimos su presencia digital desde cero para que aparezca cuando alguien busca dónde cortarse el pelo.',
      },
      {
        title: 'AlphaDev Studios',
        type: 'Proyecto propio',
        description:
          'Este sitio. Hecho con el mismo stack y criterio que aplicamos a cada cliente: es nuestra carta de presentación.',
      },
      {
        title: 'Tu negocio podría estar aquí',
        type: 'Próximo proyecto',
        description:
          'Estamos abriendo cupos para los primeros clientes del estudio. Si querés ser uno, hablemos.',
      },
    ],
  },
  process: {
    title: 'Cómo trabajamos',
    subtitle: 'De invisible a imparable, en pasos simples.',
    phases: [
      {
        title: 'Conversamos',
        description: 'Nos cuentas de tu negocio. Entendemos qué vendes, a quién, y qué quieres lograr.',
        details: [
          'Llamada inicial de 30 minutos',
          'Escuchamos, no vendemos de entrada',
          'Te hacemos las preguntas correctas',
          'Sin tecnicismos, en tu idioma',
          'Definimos si hay fit',
        ],
      },
      {
        title: 'Diseñamos tu estrategia',
        description: 'Armamos un plan a tu medida: qué necesitas, en qué orden, y qué resultados esperar.',
        details: [
          'Propuesta personalizada',
          'Prioridades claras',
          'Timeline realista',
          'Presupuesto transparente',
          'Todo por escrito',
        ],
      },
      {
        title: 'Construimos',
        description:
          'Creamos tu presencia: sitio, redes, perfiles, campañas. Te mantenemos al tanto sin que tengas que entender de tecnología.',
        details: [
          'Sitio web o perfiles según el plan',
          'Actualizaciones semanales',
          'Tu aprobación en cada paso',
          'Sin sorpresas ni costos ocultos',
          'Entrega en el tiempo acordado',
        ],
      },
      {
        title: 'Lanzamos y medimos',
        description: 'Sales a internet. Y te mostramos los resultados en números claros.',
        details: [
          'Lanzamiento coordinado',
          'Reporte de resultados inicial',
          'Cuánta gente te vio y te contactó',
          'Ajustes rápidos post-lanzamiento',
          'Dashboard simple de métricas',
        ],
      },
      {
        title: 'Crecemos juntos',
        description: 'Ajustamos, mejoramos y hacemos crecer tu presencia mes a mes.',
        details: [
          'Seguimiento mensual',
          'Contenido actualizado',
          'Campañas optimizadas',
          'Soporte directo por WhatsApp',
          'Tú te ocupas de tu negocio',
        ],
      },
    ],
  },
  contact: {
    title: 'Hablemos',
    subtitle:
      'Cuéntanos sobre tu negocio. Te decimos exactamente qué necesitas para empezar a existir online.',
    picker_label: '¿Qué necesita tu negocio?',
    categories: {
      consultation: {
        label: 'Consulta inicial',
        description: 'Quiero saber por dónde empezar. Necesito orientación antes de decidir.',
        platform_label: '',
        platform_options: [],
        users_label: '',
        stack_label: '',
      },
      app: {
        label: 'Sitio web',
        description: 'Necesito una página web profesional para mi negocio.',
        platform_label: '¿Tienes sitio web actualmente?',
        platform_options: ['No, empiezo de cero', 'Sí, quiero mejorarlo', 'Tengo uno pero es viejo'],
        users_label: '',
        stack_label: '',
      },
      internal: {
        label: 'Redes sociales',
        description: 'Quiero manejar mejor mis redes o que lo hagan por mí.',
        platform_label: '',
        platform_options: [],
        users_label: '¿En qué redes estás o quieres estar?',
        stack_label: '',
      },
      api: {
        label: 'Publicidad online',
        description: 'Quiero campañas en Google, Instagram o Facebook que traigan clientes reales.',
        platform_label: '',
        platform_options: [],
        users_label: '',
        stack_label: '¿Tienes presupuesto mensual para publicidad?',
      },
      other: {
        label: 'Otro',
        description: 'Tengo algo específico en mente. Lo cuento directamente.',
        platform_label: '',
        platform_options: [],
        users_label: '',
        stack_label: '',
      },
    },
    form: {
      name: 'Nombre',
      name_placeholder: 'Tu nombre completo',
      email: 'Email',
      email_placeholder: 'tu@email.com',
      company: 'Negocio (opcional)',
      company_placeholder: 'Nombre de tu negocio o emprendimiento',
      message: 'Cuéntanos sobre tu negocio',
      message_placeholder:
        '¿Qué vendes? ¿Quiénes son tus clientes? ¿Cuál es tu mayor problema para conseguir más? Mientras más nos cuentas, mejor te podemos ayudar.',
      submit: 'Quiero mi llamada',
      submitting: 'Enviando...',
      success_title: '¡Mensaje recibido!',
      success_message: 'Nos ponemos en contacto en menos de 24 horas. Revisa tu email.',
      back: '← Cambiar opción',
    },
  },
  cta: {
    title: 'Tu competencia ya está\nen internet. ¿Y tú?',
    subtitle:
      'Agenda una llamada de 30 minutos. Te decimos exactamente qué necesita tu negocio para empezar a existir online. Sin compromiso.',
    button: 'Quiero mi llamada',
    note: 'Sin compromiso. Solo una conversación.',
  },
  footer: {
    tagline: 'Te hacemos existir en internet.',
    services_title: 'Servicios',
    company_title: 'Empresa',
    contact_title: 'Contacto',
    services_links: ['Sitio web profesional', 'Redes sociales', 'Publicidad online'],
    company_links: ['Resultados', 'Cómo trabajamos', 'Contacto'],
    rights: '© 2026 AlphaDev Studios. Todos los derechos reservados.',
    privacy: 'Privacidad',
    terms: 'Términos',
  },
};
