// Copy de UI de la Academia v3. Fuente única — no hardcodear estas cadenas
// en componentes. Los marcados "provisional" son placeholders de producto
// (Sello, Resumen de avance, Días activos) y solo se usan si la función ya existe.

export const ACAD_COPY = {
  // G-10 barra
  indiceUnidad: 'Índice de la unidad', // desktop (una sola línea)
  indiceMovil: 'Índice', // móvil / compacto
  temarioCurso: 'Temario del curso', // desktop
  temarioMovil: 'Temario', // móvil / compacto
  salir: 'Salir',
  salirHint: 'Tu avance ya está guardado en este navegador.', // tooltip desktop
  salirAria: 'Salir. Tu avance ya está guardado en este navegador.', // aria ambas
  herramientasGrupo: 'Herramientas de la pieza',

  // G-01 / V-04
  seccionDe: (n: number, m: number) => `Sección ${n} de ${m}`,

  // G-09 / V-09
  cargandoGuia: 'Cargando la guía…',
  cargando: 'Cargando…',

  // V-05 índice
  indiceTitulo: (n: number) => `Índice · Unidad ${n}`,
  indiceTituloNombre: (nombre: string) => `Índice · ${nombre}`,
  cerrarIndice: 'Cerrar índice',
  verSecciones: (n: number) => `Ver las ${n} secciones`,
  plegarIndice: 'Plegar índice',

  // Temario — pregunta guía (solo si el módulo trae guidingQuestion)
  preguntaGuiaLabel: 'Pregunta guía',

  // Contadores (G-08 / V-10)
  secciones: (d: number, t: number) => `${d}/${t} secciones`,
  comprobaciones: (d: number, t: number) => `${d}/${t} comprobaciones rápidas`,
  preguntas: (d: number, t: number) => `${d}/${t} preguntas`,
  entrega: (d: number, t: number) => `${d}/${t} entrega`,
  piezas: (d: number, t: number) => `${d}/${t} piezas`,
  unidadesCompletadas: (d: number, t: number) => `${d}/${t} unidades completadas`,

  // Estados
  completada: 'Completada',
  enCurso: 'En curso',
  sinEmpezar: 'Sin empezar',

  // G-05
  copiarEnlaceSeccion: 'Copiar enlace a esta sección',
  enlaceCopiado: 'Enlace copiado',

  // Código V-01
  copiar: 'Copiar',
  copiarCodigoAria: 'Copiar el código',

  // Navegación de lección
  seccionAnterior: 'Sección anterior',
  siguienteSeccion: 'Siguiente sección',
  marcarComoLeida: 'Marcar como leída',

  // ExamQuestions V-03
  revisaRespuestas: 'Revisa tus respuestas',
  correctasDe: (n: number, m: number) => `${n}/${m} correctas`,
  autoevaluacion: 'Autoevaluación: en este piloto no cuenta para la nota',
  acertaste: 'Acertaste',
  noAcertaste: 'No acertaste',
  tuRespuestaCorrecta: 'Tu respuesta: correcta',
  tuRespuestaIncorrecta: 'Tu respuesta: incorrecta',
  correcta: 'Correcta',
  porQue: 'Por qué:',
  repasarSeccion: (n: string, titulo: string) => `Repasar la sección ${n}: ${titulo}`,
  repetirCuestionario: 'Repetir el cuestionario',
  siguienteCon: (nombre: string) => `Siguiente: ${nombre}`,
  irAPregunta: 'Ir a una pregunta',
  preguntaEstado: (n: number, estado: string) => `Pregunta ${n}: ${estado}`,
  nCorrectas: (n: number) => `${n} correctas`,
  nParaRepasar: (n: number, lista: string) =>
    `${n} para repasar: preguntas ${lista}`,

  // Temario
  temario: 'Temario',
  unidadN: (n: number) => `Unidad ${n}`,
  continuar: (leccion: string) => `Continuar: ${leccion}`,
  seDesbloquea: (n: number) => `Se desbloquea al completar las ${n} unidades`,
  tiempoAprox: (min: number) => `${min} min aprox.`,

  // Tip / avisos
  tipProfesional: 'Tip profesional',
  tareas: 'Tareas',

  // Provisionales — solo si la función ya existe; no crear features nuevas
  /** provisional */ sello: 'Sello',
  /** provisional */ selloObtenido: 'Sello obtenido',
  /** provisional */ resumenAvance: 'Resumen de avance',
  /** provisional */ descargarResumen: 'Descargar resumen de avance',
  /** provisional */ diasActivos: 'Días activos',
  /** provisional */ diasActivosAria: (n: number, de: number) =>
    `${n} de ${de} días con actividad esta semana`,

  buscarAria: 'Buscar',

  // Chrome bilingüe (P1-01, revisión Arkano PR #14)
  piezaNdeM: (n: number, m: number) => `Pieza ${n} de ${m}`,
  entregables: 'Entregables',
  queSeEvalua: 'Qué se evalúa',
  comoAbordarlo: 'Cómo abordarlo',
  preguntasDebate: 'Para discutir',
  panel: 'Panel',
  menuAbrir: 'Abrir menú',
  menuCerrar: 'Cerrar menú',
  estadoCorrecta: 'correcta',
  estadoIncorrecta: 'incorrecta',
} as const

/** Mismo contrato que ACAD_COPY, con cadenas libres (para el diccionario EN). */
export type AcadCopy = {
  [K in keyof typeof ACAD_COPY]: (typeof ACAD_COPY)[K] extends string ? string : (typeof ACAD_COPY)[K]
}

/** Chrome de la Academia en inglés. «ACADEMIA» (wordmark) no se traduce. */
export const ACAD_COPY_EN: AcadCopy = {
  indiceUnidad: 'Unit contents',
  indiceMovil: 'Contents',
  temarioCurso: 'Course outline',
  temarioMovil: 'Outline',
  salir: 'Exit',
  salirHint: 'Your progress is already saved in this browser.',
  salirAria: 'Exit. Your progress is already saved in this browser.',
  herramientasGrupo: 'Lesson tools',
  seccionDe: (n: number, m: number) => `Section ${n} of ${m}`,
  cargandoGuia: 'Loading the guide…',
  cargando: 'Loading…',
  indiceTitulo: (n: number) => `Contents · Unit ${n}`,
  indiceTituloNombre: (nombre: string) => `Contents · ${nombre}`,
  cerrarIndice: 'Close contents',
  verSecciones: (n: number) => `See the ${n} sections`,
  plegarIndice: 'Collapse contents',
  preguntaGuiaLabel: 'Guiding question',
  secciones: (d: number, t: number) => `${d}/${t} sections`,
  comprobaciones: (d: number, t: number) => `${d}/${t} quick checks`,
  preguntas: (d: number, t: number) => `${d}/${t} questions`,
  entrega: (d: number, t: number) => `${d}/${t} submission`,
  piezas: (d: number, t: number) => `${d}/${t} parts`,
  unidadesCompletadas: (d: number, t: number) => `${d}/${t} units completed`,
  completada: 'Completed',
  enCurso: 'In progress',
  sinEmpezar: 'Not started',
  copiarEnlaceSeccion: 'Copy link to this section',
  enlaceCopiado: 'Link copied',
  copiar: 'Copy',
  copiarCodigoAria: 'Copy the code',
  seccionAnterior: 'Previous section',
  siguienteSeccion: 'Next section',
  marcarComoLeida: 'Mark as read',
  revisaRespuestas: 'Check your answers',
  correctasDe: (n: number, m: number) => `${n}/${m} correct`,
  autoevaluacion: 'Self-assessment: in this pilot it does not count toward your grade',
  acertaste: 'Correct',
  noAcertaste: 'Not quite',
  tuRespuestaCorrecta: 'Your answer: correct',
  tuRespuestaIncorrecta: 'Your answer: incorrect',
  correcta: 'Correct',
  porQue: 'Why:',
  repasarSeccion: (n: string, titulo: string) => `Review section ${n}: ${titulo}`,
  repetirCuestionario: 'Retake the quiz',
  siguienteCon: (nombre: string) => `Next: ${nombre}`,
  irAPregunta: 'Go to a question',
  preguntaEstado: (n: number, estado: string) => `Question ${n}: ${estado}`,
  nCorrectas: (n: number) => `${n} correct`,
  nParaRepasar: (n: number, lista: string) => `${n} to review: questions ${lista}`,
  temario: 'Outline',
  unidadN: (n: number) => `Unit ${n}`,
  continuar: (leccion: string) => `Continue: ${leccion}`,
  seDesbloquea: (n: number) => `Unlocks when you complete the ${n} units`,
  tiempoAprox: (min: number) => `approx. ${min} min`,
  tipProfesional: 'Pro tip',
  tareas: 'Tasks',
  sello: 'Badge',
  selloObtenido: 'Badge earned',
  resumenAvance: 'Progress summary',
  descargarResumen: 'Download progress summary',
  diasActivos: 'Active days',
  diasActivosAria: (n: number, de: number) => `${n} of ${de} days with activity this week`,
  buscarAria: 'Search',
  piezaNdeM: (n: number, m: number) => `Part ${n} of ${m}`,
  entregables: 'Deliverables',
  queSeEvalua: 'What is assessed',
  comoAbordarlo: 'How to approach it',
  preguntasDebate: 'Discussion questions',
  panel: 'Dashboard',
  menuAbrir: 'Open menu',
  menuCerrar: 'Close menu',
  estadoCorrecta: 'correct',
  estadoIncorrecta: 'incorrect',
}

export const ACAD_COPIES: Record<'es' | 'en', AcadCopy> = { es: ACAD_COPY, en: ACAD_COPY_EN }
