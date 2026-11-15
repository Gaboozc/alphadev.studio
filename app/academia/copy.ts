// Copy de UI de la Academia v3. Fuente única — no hardcodear estas cadenas
// en componentes. Los marcados "provisional" son placeholders de producto
// (Sello, Resumen de avance, Días activos) y solo se usan si la función ya existe.

export const ACAD_COPY = {
  // G-10 barra
  indiceUnidad: 'Índice de la unidad', // desktop
  indiceMovil: 'Índice', // móvil
  temarioCurso: 'Temario del curso',
  salir: 'Salir',
  salirHint: 'Tu avance ya está guardado en este navegador.',
  salirAria: 'Salir. Tu avance ya está guardado en este navegador.',
  herramientasGrupo: 'Herramientas de la pieza',

  // G-01 / V-04
  seccionDe: (n: number, m: number) => `Sección ${n} de ${m}`,

  // G-09 / V-09
  cargandoGuia: 'Cargando la guía…',
  cargando: 'Cargando…',

  // V-05 índice
  indiceTitulo: (n: number) => `Índice · Unidad ${n}`,
  cerrarIndice: 'Cerrar índice',

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
} as const

export type AcadCopy = typeof ACAD_COPY
