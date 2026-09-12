import type { Module } from '../../../types'

// Módulo nuevo, del análisis de Hermes sobre huecos de la Academia (sept 2026):
// la rama de Ingeniería de IA no tenía ningún contenido de sesgo, explicabilidad,
// gobernanza de modelos ni privacidad — cuatro temas que cualquier sistema de IA
// en producción real termina necesitando, y que hoy son requisito regulatorio
// (EU AI Act, y cada vez más contratos B2B) además de buena práctica.
export const MOD_PROD_RESPONSABLE: Module = {
  id: 'iaeng-responsable',
  number: 6,
  title: 'Responsible AI y gobernanza',
  description: 'Sesgo, explicabilidad, gobernanza de modelos y privacidad — lo que separa un sistema con IA que funciona de uno que además se puede defender frente a un cliente, un regulador o un usuario afectado.',
  duration: '3 semanas',
  status: 'available',
  track: 'iaeng-produccion',
  audience: 'aprendizaje',
  lessons: [
    {
      id: 'resp-l1',
      title: 'Sesgo algorítmico: de dónde viene y cómo se detecta',
      type: 'reading',
      difficulty: 'profesional',
      content: `## Un modelo no es sesgado por accidente — es sesgado por herencia

Un modelo entrenado con datos que reflejan una desigualdad histórica reproduce esa desigualdad con la misma confianza que usa para cualquier otra predicción — no distingue entre un patrón real y un patrón que el mundo debería haber dejado de repetir hace tiempo. El caso más citado sigue siendo el de un sistema de screening de currículums que aprendió a penalizar palabras asociadas a mujeres, porque el histórico de contrataciones de la empresa ya las penalizaba antes de que existiera el modelo.

Esto no es un problema exclusivo de modelos de clasificación clásicos. Un LLM usado para filtrar candidatos, aprobar créditos o priorizar tickets de soporte hereda exactamente el mismo riesgo — la diferencia es que su razonamiento es menos auditable a simple vista.

### Las tres fuentes de sesgo que importa distinguir

**Sesgo de datos de entrenamiento.** El dataset sobrerrepresenta o subrepresenta ciertos grupos, o codifica decisiones históricas sesgadas (como el ejemplo de contratación). Es el más común y el más difícil de arreglar después del hecho — corregirlo casi siempre significa volver a los datos, no al modelo.

**Sesgo de proxy.** El modelo no usa directamente un atributo protegido (raza, género, edad) pero usa una variable que correlaciona fuertemente con él — un código postal que en la práctica segrega por nivel socioeconómico y raza, por ejemplo. Eliminar la variable protegida explícita no elimina el sesgo si el proxy sigue ahí.

**Sesgo de despliegue.** El modelo funciona razonablemente parejo en evaluación, pero el contexto de uso real introduce el sesgo — por ejemplo, un asistente de voz entrenado mayormente con acentos de una región que rinde peor con acentos de otra, afectando desproporcionadamente a esos usuarios en producción aunque las métricas de benchmark se vieran bien.

### Cómo detectarlo con un método, no con una impresión

La técnica más directa es la **paridad demográfica por subgrupo**: correr la evaluación por separado para cada grupo relevante (género, rango de edad, región, lo que aplique al caso) y comparar la tasa de acierto o de output favorable entre grupos.

\`\`\`
Tasa de aprobación por grupo — modelo de screening de solicitudes:

Grupo A: 68% aprobación
Grupo B: 41% aprobación
Grupo C: 65% aprobación

→ Grupo B con 27 puntos menos que el promedio de los otros dos
  amerita investigación: ¿el dataset de entrenamiento representaba
  bien a este grupo? ¿hay una variable proxy filtrando esta brecha?
\`\`\`

Una diferencia de 2-3 puntos entre grupos puede ser ruido estadístico normal. Una diferencia de 20+ puntos sostenida en varias corridas es una señal que no se puede tratar como coincidencia.

### Mitigación: qué se puede hacer una vez detectado

No hay un botón que "arregla el sesgo". Las intervenciones reales actúan en distintas etapas: **re-balancear el dataset** de entrenamiento o de fine-tuning para representar mejor a los grupos subrepresentados, **ajustar el umbral de decisión** por subgrupo cuando la disparidad viene de calibración distinta (más complejo de justificar legalmente, requiere asesoría), o **agregar un paso de revisión humana** obligatorio para las decisiones donde el modelo mostró mayor disparidad, en vez de automatizar el 100% del proceso.

La opción que nunca es válida: medir el sesgo una vez, no encontrar nada grave, y no volver a medirlo. El comportamiento de un modelo en producción cambia con el tiempo (deriva de datos), y la disparidad entre grupos puede aparecer meses después de un despliegue que arrancó parejo.`,
      tasks: [
        'Elige un sistema con IA que conozcas (propio o de un caso público) e identifica qué grupos serían relevantes para medir paridad',
        'Explica con tus palabras la diferencia entre sesgo de datos y sesgo de proxy, con un ejemplo propio de cada uno',
        'Diseña la tabla de paridad demográfica que usarías para auditar ese sistema: qué grupos, qué métrica, qué umbral de diferencia dispararía una investigación',
      ],
      tip: 'Si tu sistema toma decisiones sobre personas (contratación, crédito, acceso a un servicio, priorización de soporte), la pregunta "¿medimos paridad entre grupos?" debería tener respuesta antes del primer despliegue, no después de la primera queja.',
      completed: false,
    },
    {
      id: 'resp-l2',
      title: 'Explicabilidad: SHAP, LIME y attention maps',
      type: 'reading',
      difficulty: 'profesional',
      content: `## La pregunta que un modelo de caja negra no puede responder sola

"¿Por qué el modelo rechazó esta solicitud?" es una pregunta que un cliente, un regulador o un usuario afectado tiene derecho a hacer — y "porque el modelo lo decidió" no es una respuesta aceptable en la mayoría de los contextos regulados (crédito, empleo, salud) ni en la mayoría de las relaciones comerciales serias. La explicabilidad es el conjunto de técnicas que convierten una decisión de caja negra en una explicación concreta y verificable.

### SHAP: cuánto aportó cada variable a esta predicción específica

SHAP (SHapley Additive exPlanations) viene de teoría de juegos: calcula cuánto contribuyó cada variable de entrada al resultado final, comparando la predicción con y sin esa variable, promediado sobre todas las combinaciones posibles del resto de variables.

\`\`\`python
import shap

explainer = shap.Explainer(modelo)
valores_shap = explainer(entrada_del_caso)

# Para una solicitud de crédito rechazada:
# ingreso_mensual:      +0.31  (empujó hacia aprobar)
# historial_pagos:      -0.52  (empujó hacia rechazar, el más influyente)
# antiguedad_laboral:   +0.08  (empujó levemente hacia aprobar)
# deuda_actual:         -0.19  (empujó hacia rechazar)
\`\`\`

Con esto, la respuesta a "¿por qué se rechazó?" deja de ser "el modelo lo decidió" y pasa a ser "el historial de pagos fue el factor determinante, con un peso mayor que el resto combinado" — una explicación que un analista humano puede validar, y que el solicitante puede entender y en teoría disputar con nueva información.

### LIME: aproximar localmente con un modelo simple

LIME (Local Interpretable Model-agnostic Explanations) toma un enfoque distinto: en vez de explicar el modelo completo, genera pequeñas variaciones de UN caso específico, observa cómo cambia la predicción, y ajusta un modelo simple (como una regresión lineal) que aproxima el comportamiento del modelo complejo *solo alrededor de ese caso*. Es más liviano computacionalmente que SHAP pero la aproximación es, por diseño, solo válida cerca del caso analizado — no generaliza al resto del espacio de decisiones del modelo.

### Attention maps: qué miró el modelo para responder

Para modelos basados en transformers (la arquitectura detrás de los LLMs modernos), los pesos de atención revelan qué partes del input recibieron más peso al generar cada parte del output. En una tarea de clasificación de texto, visualizar la atención sobre las palabras del input muestra en qué frases se apoyó el modelo para decidir — útil para detectar, por ejemplo, si el modelo está prestando atención a una palabra que no debería ser relevante (un nombre propio que sugiere género o etnicidad, en vez del contenido real del texto).

### La limitación que hay que decir en voz alta

Ninguna de estas tres técnicas explica el modelo "de verdad" en el sentido de revelar un mecanismo causal — son aproximaciones post-hoc que ayudan a razonar sobre el comportamiento del modelo, no una ventana literal a su funcionamiento interno. Presentar un análisis de SHAP como "así es exactamente como el modelo piensa" es una sobre-promesa que se cae bajo escrutinio técnico serio. La forma honesta de presentarlo: "esta es la mejor aproximación disponible de qué influyó en esta decisión, con las herramientas que existen hoy".`,
      tasks: [
        'Ejecuta SHAP o LIME (hay notebooks de ejemplo en la documentación oficial de ambas librerías) sobre un modelo simple de clasificación con un dataset público',
        'Para un caso específico, escribe la explicación en lenguaje natural que le darías a la persona afectada por esa decisión, basándote en los valores SHAP obtenidos',
        'Explica en qué se diferencia la garantía que da SHAP de la que da LIME, y cuándo elegirías una sobre la otra',
      ],
      tip: 'La explicabilidad no es solo un requisito de cumplimiento — es una herramienta de debugging. Si SHAP muestra que tu modelo de churn se apoya principalmente en una variable que no debería importar (un ID interno, una fecha de sistema), probablemente hay una fuga de datos en tu pipeline de entrenamiento, no un modelo genuinamente bueno.',
      completed: false,
    },
    {
      id: 'resp-l3',
      title: 'Gobernanza de modelos: políticas, approval workflows y audit trails',
      type: 'reading',
      difficulty: 'profesional',
      content: `## Por qué "funciona en mi notebook" no es gobernanza

Un equipo de dos personas puede desplegar un modelo con un mensaje de Slack como único registro de la decisión. Un equipo de veinte, con varios modelos en producción tocando datos de clientes, no puede — y no porque falte confianza en el criterio individual, sino porque sin un proceso documentado, nadie (ni dentro del equipo, ni un auditor externo, ni un regulador) puede reconstruir después por qué un modelo específico se aprobó, quién lo aprobó, y bajo qué condiciones.

### Los tres componentes de un sistema de gobernanza mínimo viable

**Políticas de uso aceptable.** Un documento (no necesariamente largo) que define: qué tipos de decisión puede tomar un modelo de forma completamente automatizada, cuáles requieren revisión humana obligatoria, y cuáles están explícitamente prohibidas (por ejemplo: "ningún modelo decide solo el rechazo final de una solicitud de crédito — siempre pasa por revisión humana antes de comunicarse al cliente").

**Approval workflow.** Un proceso formal, no verbal, antes de que un modelo nuevo (o una versión nueva de uno existente) llegue a producción: qué evaluaciones tuvo que pasar (ver el módulo de Evaluación y observabilidad de esta misma área), quién revisó los resultados, y quién dio la aprobación final. En equipos regulados esto suele ser un comité; en equipos chicos puede ser tan simple como un pull request con un checklist obligatorio que alguien más que el autor debe aprobar.

\`\`\`
Checklist de aprobación antes de producción (ejemplo mínimo):
[ ] Evaluación contra el conjunto dorado — resultado documentado
[ ] Auditoría de sesgo por subgrupo — sin disparidad no explicada
[ ] Explicabilidad disponible para las decisiones de alto impacto
[ ] Límites de coste y tasa configurados
[ ] Aprobado por alguien distinto del autor del cambio
\`\`\`

**Audit trail.** Un registro inmutable (o al menos difícil de alterar retroactivamente) de: qué versión del modelo tomó cada decisión, con qué input, qué output produjo, y cuándo. No es lo mismo que logging de aplicación genérico — el audit trail de un sistema con IA necesita conservar suficiente contexto para poder responder, meses después, "¿por qué el sistema decidió esto para este usuario en esta fecha?".

### El error de gobernanza más común: tratarlo como un evento único

Aprobar un modelo una vez y no volver a revisarlo es, en la práctica, no tener gobernanza — solo tener una aprobación inicial. Un modelo en producción necesita revisión periódica (cada versión de datos de entrenamiento, cada cambio de prompt significativo en el caso de LLMs, y como mínimo en un ciclo regular aunque nada haya cambiado explícitamente, porque el mundo que el modelo observa sí cambia).

### Gobernanza no es burocracia por burocracia

El objetivo de todo esto no es ralentizar al equipo — es que, cuando algo sale mal (y en sistemas con suficiente escala, algo eventualmente sale mal), exista un registro que permita entender qué pasó, corregirlo, y demostrar —a un cliente, a un regulador, a la propia empresa— que el sistema no operaba sin ningún control.`,
      tasks: [
        'Escribe la política de uso aceptable mínima para un sistema con IA que hayas construido: qué decisiones automatiza completamente, cuáles requieren revisión humana, cuáles prohíbe',
        'Diseña el checklist de aprobación que usarías antes de subir una nueva versión de ese sistema a producción',
        'Define qué información mínima necesitaría guardar tu audit trail para poder responder "por qué el sistema decidió esto" seis meses después',
      ],
      tip: 'Si tu equipo es de una o dos personas, un approval workflow formal puede sentirse excesivo — pero el audit trail no. Guardar input, output, versión del modelo y fecha de cada decisión de alto impacto es barato de implementar ahora y prácticamente imposible de reconstruir después si nunca lo activaste.',
      completed: false,
    },
    {
      id: 'resp-l4',
      title: 'Privacidad: GDPR, datos de entrenamiento y el derecho al olvido',
      type: 'reading',
      difficulty: 'profesional',
      content: `## El problema que los LLMs le agregaron a la privacidad

Antes de los LLMs, "borrar los datos de un usuario" significaba borrar filas de una base de datos — técnicamente directo. Un modelo entrenado (o fine-tuneado) con esos datos plantea un problema distinto: la información del usuario puede haber quedado codificada en los pesos del modelo de forma que no se puede "borrar" con un DELETE — el conocimiento está distribuido en millones de parámetros, no en un registro identificable.

### Lo que GDPR exige, en los términos que importan para un sistema con IA

**Derecho al olvido (Art. 17).** Un usuario puede solicitar que se eliminen sus datos personales. Para datos que solo viven en una base de datos, esto es directo. Para datos que se usaron para entrenar o fine-tunear un modelo, la respuesta honesta hoy es: técnicamente no existe un método confiable de "desaprender" selectivamente sin volver a entrenar — la práctica real es documentar la limitación, minimizar el uso de datos personales identificables en entrenamiento desde el diseño, y ofrecer eliminación de los datos en cualquier sistema de recuperación (RAG, bases vectoriales) donde sí es técnicamente viable borrar por completo.

**Minimización de datos (Art. 5).** Solo se recolecta y procesa lo estrictamente necesario para el propósito declarado. En la práctica de un sistema con LLM: no envíes al modelo (propio o de terceros) más contexto del usuario del que la tarea concreta necesita — un asistente que responde preguntas de facturación no necesita ver el historial médico del mismo usuario si ambos sistemas comparten backend.

**Base legal para el procesamiento (Art. 6).** Necesitas una justificación legal explícita para procesar datos personales — consentimiento, ejecución de un contrato, interés legítimo, entre otras. Enviar datos de un usuario a la API de un proveedor de LLM de terceros (OpenAI, Anthropic, Google) es, en términos de GDPR, una transferencia de datos que necesita esa base legal y, generalmente, un acuerdo de procesamiento de datos (DPA) con ese proveedor.

### Datos de entrenamiento: el riesgo de memorización

Los LLMs grandes pueden, en casos documentados, memorizar y reproducir literalmente fragmentos de sus datos de entrenamiento —incluyendo información personal si esta apareció sin anonimizar en el corpus. Para fine-tuning con datos propios de la empresa, esto significa: **anonimizar o pseudonimizar información personal identificable antes de usarla para entrenar**, y probar explícitamente si el modelo resultante puede reproducir datos sensibles cuando se le pregunta de forma diseñada para extraerlos (un ataque conocido como \`membership inference\`).

### Lo que sí es completamente viable hoy: RAG con eliminación real

Si tu sistema usa RAG (recuperación de documentos, no fine-tuning) para dar contexto al modelo, borrar los datos de un usuario de la base vectorial ES una eliminación real y completa — el modelo nunca "aprendió" esos datos, solo los consultó en el momento de responder. Esto hace que la arquitectura RAG sea, en términos de cumplimiento de derecho al olvido, significativamente más manejable que el fine-tuning con datos personales.

\`\`\`
Fine-tuning con datos personales → derecho al olvido difícil de garantizar
RAG con datos personales en la base vectorial → derecho al olvido = borrar el registro
\`\`\`

Esta diferencia es, en la práctica, un argumento de arquitectura: si tu caso de uso puede resolverse con RAG en vez de fine-tuning sobre datos personales, esa elección reduce significativamente tu superficie de riesgo de privacidad.`,
      tasks: [
        'Para un sistema con IA que uses o hayas construido, identifica si procesa datos personales y bajo qué base legal (si no lo sabes, es una señal de que falta ese análisis)',
        'Si el sistema usa RAG, describe cómo implementarías la eliminación de los datos de un usuario específico de la base vectorial',
        'Explica con tus palabras por qué "borrar los datos de un usuario de un modelo fine-tuneado" es un problema técnicamente distinto a borrarlos de una base de datos relacional',
      ],
      tip: 'Antes de enviar datos de clientes a la API de un proveedor de LLM externo, verificá si ese proveedor ofrece un acuerdo de procesamiento de datos (DPA) y si tiene una política de no usar tus datos para entrenar sus propios modelos — la mayoría de los proveedores serios lo ofrecen explícitamente para clientes de API, pero no es automático en todos los planes.',
      completed: false,
    },
    {
      id: 'resp-l5',
      title: 'Proyecto: auditoría de sesgo con reporte de remediación',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: `Vas a auditar un modelo o sistema con IA (propio, de un módulo anterior, o un modelo público con un dataset de ejemplo) contra sesgo algorítmico, siguiendo el método de paridad demográfica de la primera lección de este módulo — y a producir el reporte que le entregarías a un cliente o a tu propio equipo antes de aprobar ese sistema para producción.

El estándar de este proyecto: no es un ejercicio académico de calcular una métrica — es el entregable real que separa a alguien que sabe que existe el sesgo algorítmico de alguien que sabe auditarlo y documentarlo de forma que otra persona pueda actuar sobre el hallazgo.`,
      deliverables: [
        'Definición de los subgrupos relevantes para el sistema auditado, con justificación de por qué esos y no otros',
        'Medición de paridad demográfica (tasa de acierto o de output favorable) por subgrupo, con los números reales de la corrida',
        'Si se encontró disparidad significativa: análisis de si la causa probable es sesgo de datos, de proxy, o de despliegue — con evidencia, no solo hipótesis',
        'Al menos un análisis de explicabilidad (SHAP o LIME) sobre 2-3 casos individuales donde el modelo produjo un resultado desfavorable para el grupo con peor desempeño',
        'Plan de remediación concreto: qué se haría (re-balanceo de datos, revisión humana obligatoria, ajuste de umbral) y por qué esa opción y no otra',
        'Resumen ejecutivo de una página, escrito para alguien sin formación técnica, que explique el hallazgo y la recomendación',
      ],
      tasks: [
        'Ejecuta la auditoría completa sobre un sistema real o un dataset público de ejemplo (hay varios diseñados específicamente para practicar detección de sesgo, como COMPAS o Adult Income)',
        'Escribe el resumen ejecutivo primero, luego el reporte técnico completo — si no podés explicar el hallazgo en una página sin jerga, todavía no lo entendiste lo suficiente',
        'Comparte el reporte con alguien que no vio el proceso y verificá si la recomendación de remediación le queda clara sin que se la expliques en persona',
      ],
      rubrica: [
        'La elección de subgrupos está justificada, no es arbitraria',
        'Los números de paridad son reales (de una corrida real), no estimados',
        'El plan de remediación es específico y accionable, no genérico ("mejorar el dataset")',
        'El resumen ejecutivo es comprensible sin conocimiento técnico previo',
      ],
      tip: 'El error más común en este proyecto es reportar la disparidad y detenerse ahí. Un reporte de auditoría sin plan de remediación es un diagnóstico sin tratamiento — útil, pero incompleto. La parte que más vale (y la que más cuesta escribir bien) es la recomendación concreta de qué hacer con lo que encontraste.',
      completed: false,
    },
  ],
  resources: [
    {
      title: 'SHAP — documentación oficial',
      url: 'https://shap.readthedocs.io',
      type: 'documentation',
    },
    {
      title: 'LIME — repositorio y ejemplos',
      url: 'https://github.com/marcotcr/lime',
      type: 'documentation',
    },
    {
      title: 'GDPR — texto completo del reglamento',
      url: 'https://gdpr-info.eu',
      type: 'documentation',
    },
    {
      title: 'EU AI Act — resumen oficial de obligaciones por nivel de riesgo',
      url: 'https://artificialintelligenceact.eu',
      type: 'article',
    },
    {
      title: 'AI Fairness 360 (IBM) — toolkit open source de detección y mitigación de sesgo',
      url: 'https://ai-fairness-360.org',
      type: 'tool',
    },
  ],
}
