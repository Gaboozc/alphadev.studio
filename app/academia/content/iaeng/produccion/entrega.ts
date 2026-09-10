import type { Module } from '../../../types'

// Modulo: Entregar un producto de IA a un cliente
export const MOD_PROD_ENTREGA: Module = {
  id: 'iaeng-capstone',
  number: 9,
  title: 'Proyecto Final: entregar un producto de IA a un cliente',
  description: 'El recorrido completo de un encargo real: acotar el alcance, conseguir los datos, desplegar, medir y ponerle precio a algo cuyo coste es variable.',
  duration: '5 semanas',
  status: 'available',
  track: 'iaeng-produccion',
  audience: 'aprendizaje',
  lessons: [
    {
      id: 'iec-l1',
      title: 'Acotar el alcance: qué prometer y qué no',
      type: 'reading',
      difficulty: 'profesional',
      content: `## Donde mueren los proyectos de IA

No en la técnica. Mueren en la promesa: un cliente que esperaba algo que nunca fue posible y un presupuesto que no contemplaba la parte que resultó ser el 70% del trabajo.

### Las tres preguntas antes de cotizar

**¿Existen los datos?** Y en concreto: ¿existen hoy, están accesibles, tienen calidad suficiente y el cliente tiene derecho a usarlos? Si la respuesta es "los vamos generando", el proyecto no es lo que parece: es primero un proyecto de datos.

**¿Cuál es el criterio de éxito y quién lo juzga?** "Que funcione bien" no es un criterio. "Que responda correctamente al menos el 85% de las 50 preguntas de la lista acordada" sí lo es, porque se puede verificar y se puede discutir antes de empezar.

**¿Qué pasa cuando se equivoca?** Todo sistema de IA falla un porcentaje de las veces. Si el cliente no tiene una respuesta para eso, no ha entendido lo que compra, y esa conversación es mejor tenerla al principio.

### Lo que hay que decir en voz alta

Un sistema con modelos **no acierta siempre**. Se puede acotar, medir y mejorar, pero no garantizar al 100%. Un cliente que espera perfección va a estar insatisfecho con un sistema excelente.

La forma honesta de presentarlo: *"El sistema resolverá la mayoría de los casos y escalará el resto a una persona con el contexto ya reunido. Vamos a medir ese porcentaje y a mejorarlo."* Eso se puede cumplir; "responderá todo correctamente" no.

### La prueba de concepto acotada

Antes del proyecto completo, dos semanas con un alcance mínimo y un criterio de éxito escrito. Sirve para tres cosas: comprobar que los datos existen y sirven, medir de verdad, y darle al cliente algo que tocar antes de comprometer el presupuesto grande.

Si la prueba no alcanza el criterio, ese es el resultado: se para o se replantea. Que exista esa salida es parte de lo que la hace valiosa.

### Qué incluir en la propuesta

- El problema en una frase, con el número que debe mejorar.
- Qué hace el sistema y, explícitamente, **qué no hace**.
- El criterio de éxito medible y quién lo verifica.
- De dónde salen los datos y quién los proporciona.
- Qué pasa con los casos que el sistema no resuelve.
- El coste de operación estimado y quién lo paga.
- Qué pasa si el proveedor del modelo sube precios o retira el modelo.

Las dos últimas casi nunca aparecen en las propuestas y son las que generan los conflictos.

### Las señales de alarma

- "Queremos algo con IA" sin un problema detrás.
- Los datos los tiene un tercero que todavía no ha dicho que sí.
- El criterio de éxito es la opinión de una persona que no está en las reuniones.
- Esperan sustituir a un equipo completo desde el primer día.
- El presupuesto no contempla nada de operación posterior.`,
      tasks: [
        'Escribe la propuesta de un proyecto real incluyendo la sección de qué NO hace',
        'Define un criterio de éxito medible con su número y su método de verificación',
        'Calcula el coste de operación mensual y decide cómo se cobra',
        'Enumera los tres riesgos principales del proyecto y qué harías si se materializan',
      ],
      tip: 'La sección más valiosa de una propuesta de IA es la de lo que el sistema no va a hacer. Escribirla protege al cliente de esperar de más y a ti de que te reclamen algo que nunca se acordó.',
      completed: false,
    },
    {
      id: 'iec-l2',
      title: 'Datos, privacidad y responsabilidad',
      type: 'reading',
      difficulty: 'profesional',
      content: `## De quién son los datos

Antes de procesar nada hay que responder: ¿de dónde salen, quién es su dueño, y hay permiso para este uso concreto?

Un cliente que te entrega su base de clientes te está entregando datos personales de terceros. El consentimiento que esas personas dieron probablemente no contemplaba que se enviaran a un proveedor de modelos.

### Qué sale de tu sistema

Cuando llamas a una API de un modelo, **el contenido del prompt sale de tu infraestructura**. Eso incluye lo que hayas metido en el contexto: fragmentos de documentos, datos de clientes, historiales.

Las preguntas concretas para cada proveedor:

- ¿Usa los datos enviados para entrenar? Los planes de empresa suelen decir que no; conviene verificarlo por escrito.
- ¿Cuánto tiempo los retiene?
- ¿En qué región se procesan?
- ¿Ofrece un acuerdo de tratamiento de datos?

Si el cliente maneja datos de salud, financieros o de menores, estas respuestas dejan de ser una formalidad.

### Minimizar antes de enviar

La mejor protección es no enviar lo que no hace falta:

**Anonimiza.** Sustituye nombres, correos y teléfonos por identificadores antes de mandar el texto al modelo, y devuélvelos al recibir la respuesta.

**Filtra.** Manda solo el fragmento necesario, no el documento entero.

**Modelo propio.** Cuando la restricción es estricta, un modelo abierto en tu infraestructura evita que nada salga. Cuesta más y es la respuesta correcta en ciertos contratos.

### Sesgo

Un modelo aprende de sus datos, incluidos sus sesgos. Si el histórico de contrataciones de una empresa favoreció a un perfil, un modelo entrenado con él lo reproducirá y le dará apariencia de objetividad.

Lo mínimo exigible: **evaluar por segmentos**. Si tu sistema acierta el 90% en general pero el 62% en un grupo concreto, ese dato existe aunque no lo mires, y no mirarlo no te protege.

### Decir que es IA

Cuando alguien interactúa con un sistema automático, debe saberlo. No es solo una obligación creciente en varias jurisdicciones: es lo que permite a la persona calibrar cuánto confiar en la respuesta y pedir hablar con alguien.

Y la salida humana tiene que existir de verdad, no ser un botón que lleva a otro formulario.

### La responsabilidad

Si el sistema le da a un cliente una información incorrecta y esa persona actúa en consecuencia, ¿quién responde? La respuesta depende del contrato, y por eso conviene que el contrato lo diga.

Las cláusulas que conviene tener claras: el sistema es una herramienta de apoyo, sus salidas requieren revisión humana en los casos que se definan, y quién asume qué si algo sale mal.

No es pesimismo: es lo que permite trabajar tranquilo.`,
      tasks: [
        'Revisa por escrito la política de datos del proveedor de modelos que usas',
        'Implementa anonimización de datos personales antes de enviarlos al modelo',
        'Evalúa tu sistema por segmentos y comprueba si el resultado se sostiene en todos',
        'Redacta las cláusulas de responsabilidad y revisión humana para tu propuesta',
      ],
      tip: 'Haz la pregunta incómoda al principio del proyecto: si el sistema se equivoca con un cliente del cliente, ¿quién responde? Es mucho más barato acordarlo en la propuesta que discutirlo cuando ya pasó.',
      completed: false,
    },
    {
      id: 'iec-l3',
      title: 'Desplegar, monitorear y mantener',
      type: 'reading',
      difficulty: 'profesional',
      content: `## Lo que cambia respecto a un despliegue normal

Todo lo del área de back-end sigue aplicando: contenedores, variables de entorno, migraciones, pruebas. Encima hay cuatro cosas propias.

**Las claves de la API valen dinero real.** Una clave filtrada no es solo un problema de seguridad: es una factura. Van en variables de entorno, se rotan periódicamente y se les pone límite de gasto en el panel del proveedor.

**El coste es variable y hay que vigilarlo en vivo.** Un pico de tráfico se traduce en factura al instante. Límite por tarea, límite diario y alerta antes del tope.

**El proveedor puede cambiar bajo tus pies.** Los modelos se actualizan, se retiran y cambian de precio. **Fija la versión del modelo** en vez de usar el alias genérico, y ten un plan para cuando esa versión se retire.

**La calidad puede degradarse sin que toques nada.** Por eso la evaluación se ejecuta de forma periódica y no solo al desplegar.

### Lanzar por etapas

\`\`\`
1. Interno          el equipo lo usa y anota lo que falla
2. Piloto           un grupo pequeño y avisado, con canal directo para reportar
3. Parcial          un porcentaje del tráfico real
4. Completo         con la evaluación en verde y las alertas puestas
\`\`\`

Y en cada etapa, **una forma de volver atrás**. Un interruptor que desactive el sistema y devuelva el flujo al proceso manual anterior. Que exista y esté probado.

### Qué monitorear

\`\`\`
técnico:   errores, latencia p95, disponibilidad
coste:     gasto por hora y acumulado del mes
calidad:   tasa de éxito de la evaluación periódica
uso:       tareas por día, escalados a humano, abandonos
negocio:   el número que el proyecto prometió mejorar
\`\`\`

El último es el que le importa al cliente. Los técnicos son medios; si el sistema funciona perfecto y el indicador de negocio no se mueve, el proyecto no cumplió.

### La realimentación de los usuarios

Un botón de pulgar arriba y abajo en cada respuesta es la fuente de mejora más barata que existe. Cada pulgar abajo es un caso candidato para el conjunto de evaluación.

Guarda con cada valoración la traza completa. Así puedes reconstruir exactamente qué pasó en las respuestas que la gente marcó como malas.

### Mantenimiento: lo que hay que vender junto al proyecto

Un sistema de IA no se entrega y se olvida. Necesita, de forma continua: revisar la evaluación, incorporar los fallos nuevos al conjunto, actualizar documentos, vigilar coste, y migrar cuando el proveedor cambie el modelo.

**Eso es trabajo recurrente y se cotiza como tal.** Un proyecto de IA vendido como entrega única deja al cliente con algo que se degrada y a ti con soporte no pagado. La cuota de mantenimiento no es un extra: es parte del producto.`,
      tasks: [
        'Fija la versión exacta del modelo en tu configuración y documenta el plan si se retira',
        'Configura límites de gasto y alertas antes de llegar al tope',
        'Implementa el interruptor de emergencia y pruébalo de verdad',
        'Agrega valoración de usuario que guarde la traza completa junto al voto',
      ],
      tip: 'Usar el alias genérico de un modelo en vez de una versión fija significa que el proveedor puede cambiarte el sistema sin avisar. Un día tus evaluaciones bajan y no hiciste nada: cambió el modelo. Fija la versión y actualiza cuando tú decidas.',
      completed: false,
    },
    {
      id: 'iec-l4',
      title: 'Proyecto Final: un producto de IA de principio a fin',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: `Este es el cierre de la rama. Vas a llevar un producto de IA desde la propuesta hasta el despliegue medido, para un cliente real o para tu propia agencia.

No es un ejercicio técnico: es el recorrido completo tal como ocurre en un encargo. La parte de código es la mitad; la otra mitad es acotar, medir, desplegar y poder explicar lo que hiciste.

Elige un problema con datos que existan de verdad y a los que tengas acceso. El alcance debe ser pequeño y el criterio de éxito escrito antes de empezar.`,
      deliverables: [
        'Propuesta con el problema, el alcance, lo que el sistema NO hace, el criterio de éxito medible y el análisis de riesgos',
        'El sistema funcionando y desplegado, con su versión de modelo fijada',
        'Conjunto de evaluación de al menos 40 casos, con resultados por etapa y extremo a extremo',
        'Cálculo del coste mensual al volumen esperado, con el modelo de cobro propuesto',
        'Trazas completas, límites de gasto y alertas configuradas',
        'Interruptor de emergencia probado que devuelve el flujo al proceso manual',
        'Valoración de usuario conectada al conjunto de evaluación',
        'Documento de entrega para el cliente: qué hace, qué no, cómo se opera y qué incluye el mantenimiento',
        'Presentación de 10 minutos con el problema, la solución, los números y los límites',
      ],
      rubrica: [
        'El criterio de éxito estaba escrito antes de construir y se verifica con la evaluación',
        'La propuesta declara explícitamente qué queda fuera del alcance',
        'La evaluación mide por etapas y el informe explica qué se cambió a partir de sus resultados',
        'Existe el cálculo de coste mensual con su supuesto de volumen, y un modelo de cobro coherente con él',
        'La versión del modelo está fijada y hay un plan escrito para su retirada',
        'Los límites de gasto cortan de verdad: se demuestra provocándolos',
        'El interruptor de emergencia se probó y está documentado',
        'El documento de entrega lo entiende alguien que no es técnico',
        'La presentación dice con claridad qué NO hace el sistema y qué pasa cuando se equivoca',
      ],
      tasks: [
        'Escribe la propuesta completa y valídala con alguien antes de programar nada',
        'Construye el conjunto de evaluación con casos reales, incluidos los que deben escalar',
        'Desarrolla midiendo: cada cambio se justifica con su efecto en la evaluación',
        'Despliega por etapas, empezando por uso interno',
        'Prepara la presentación pensando en un cliente que no es técnico',
      ],
      discussionPrompts: [
        'Si el proveedor duplicara mañana el precio del modelo, ¿tu proyecto sigue siendo rentable? ¿Qué cambiarías?',
        '¿Qué parte del sistema tendría que hacer una persona si mañana hubiera que apagar la IA por completo?',
      ],
      tip: 'La presentación importa tanto como el sistema. Un cliente no compra arquitectura: compra un problema resuelto, con sus límites explicados. Practica decir en voz alta qué no hace tu sistema y qué pasa cuando falla, porque son las dos preguntas que va a hacer.',
      completed: false,
    },
    {
      id: 'iec-l5',
      title: 'Examen final: entrega de productos de IA',
      type: 'exam',
      difficulty: 'profesional',
      questions: [
        {
          q: 'Un cliente pide "algo con IA para mejorar la atención". ¿Cuál es la primera respuesta profesional?',
          options: [
            'Proponer un chatbot con RAG sobre sus documentos, que es lo más habitual',
            'Averiguar qué número concreto debe mejorar, si existen los datos y cuál sería el criterio de éxito verificable',
            'Cotizar una prueba de concepto de dos semanas sin definir alcance',
            'Recomendar el modelo más capaz disponible',
          ],
          correct: 1,
          explanation: 'Sin un problema medible detrás, cualquier solución es imposible de evaluar y el proyecto acaba juzgado por la impresión subjetiva de alguien. Las tres preguntas previas —datos, criterio de éxito, qué pasa al fallar— definen si el proyecto existe.',
        },
        {
          q: '¿Por qué se fija la versión exacta del modelo en vez de usar el alias genérico?',
          options: [
            'Porque las versiones fijadas son más baratas',
            'Porque con el alias el proveedor puede cambiar el modelo sin avisar, y la calidad del sistema varía sin que hayas tocado nada',
            'Porque el alias no funciona en producción',
            'Porque las versiones fijas tienen menor latencia',
          ],
          correct: 1,
          explanation: 'El alias apunta a la versión más reciente y cambia cuando el proveedor publica una nueva. Un día la evaluación baja sin ningún despliegue de por medio. Fijar la versión te da control sobre cuándo migrar, y obliga a tener un plan para cuando esa versión se retire.',
        },
        {
          q: 'Vas a cobrar una cuota mensual fija por un sistema cuyo coste es por uso. ¿Qué hace falta?',
          options: [
            'Nada especial: el margen se ajusta al final del año',
            'Calcular el coste al volumen esperado antes de fijar el precio, y poner límites de gasto que corten de verdad',
            'Cobrar por adelantado los primeros seis meses',
            'Usar el modelo más barato disponible para todo',
          ],
          correct: 1,
          explanation: 'Con cuota fija y coste variable, el éxito del producto destruye el margen: cuanto más se usa, más pierdes. Hay que hacer el cálculo antes de fijar el precio y poner topes técnicos que detengan el sistema al superar el presupuesto, no solo alertas.',
        },
        {
          q: 'Tu sistema acierta el 90% en general, pero al desglosar por segmentos uno da 62%. ¿Qué significa?',
          options: [
            'Que el conjunto de evaluación de ese segmento es demasiado pequeño',
            'Que el sistema funciona peor para un grupo concreto: es un problema real de calidad y de equidad que hay que reportar y corregir',
            'Que ese segmento tiene consultas más difíciles y es esperable',
            'Nada relevante mientras el promedio se mantenga alto',
          ],
          correct: 1,
          explanation: 'El promedio oculta la desigualdad. Un sistema que funciona notablemente peor para un grupo tiene un problema de calidad, y según el dominio también de equidad y cumplimiento. La única forma de detectarlo es evaluar por segmentos, y no mirarlo no hace que desaparezca.',
        },
        {
          q: '¿Por qué el mantenimiento se cotiza aparte en un proyecto de IA?',
          options: [
            'Porque es una forma habitual de aumentar el precio total',
            'Porque el sistema se degrada solo: cambian los modelos, los datos y las consultas, y hay que reevaluar, actualizar y migrar de forma continua',
            'Porque el cliente siempre pide cambios después de la entrega',
            'Porque la infraestructura de alojamiento tiene coste mensual',
          ],
          correct: 1,
          explanation: 'A diferencia de un sitio web, que entregado sigue funcionando igual, un sistema con modelos se degrada sin que nadie lo toque: el proveedor actualiza, los documentos envejecen y los usuarios preguntan cosas nuevas. Ese trabajo recurrente es parte del producto y hay que venderlo como tal.',
        },
        {
          q: 'Antes de lanzar, ¿qué debe existir además del sistema funcionando?',
          options: [
            'Documentación técnica del código',
            'Una forma probada de volver atrás: un interruptor que desactive el sistema y devuelva el flujo al proceso manual',
            'Un plan de marketing para el lanzamiento',
            'La versión móvil de la interfaz',
          ],
          correct: 1,
          explanation: 'Todo sistema en producción necesita una salida. En IA con más razón, porque los fallos pueden ser sutiles y afectar a muchos usuarios antes de detectarse. El interruptor tiene que existir, estar documentado y haberse probado, no solo estar previsto.',
        },
      ],
      completed: false,
    },
  ],
  resources: [
    {
      title: 'Anthropic — Política de uso y privacidad de datos',
      url: 'https://www.anthropic.com/legal/commercial-terms',
      type: 'documentation',
    },
    {
      title: 'NIST — Marco de gestión de riesgos de IA',
      url: 'https://www.nist.gov/itl/ai-risk-management-framework',
      type: 'documentation',
    },
    {
      title: 'Google — Guía de prácticas responsables de IA',
      url: 'https://ai.google/responsibility/responsible-ai-practices/',
      type: 'article',
    },
    {
      title: 'Reglamento europeo de IA — resumen por niveles de riesgo',
      url: 'https://artificialintelligenceact.eu/es/',
      type: 'documentation',
    },
  ],
}
