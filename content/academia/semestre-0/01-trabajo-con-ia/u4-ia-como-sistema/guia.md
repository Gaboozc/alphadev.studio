# Unidad 4 — La IA como sistema de trabajo: flujos, herramientas, verificación y ética

**Semanas 7–8 · 12 horas · Reemplaza:** prodai-1-2, prodai-1-3, ia-1-proj-basico (como ejercicio)

**Pregunta guía:** ¿Cómo convierto la IA en un sistema de trabajo fiable, medible y responsable, y no en un atajo ocasional?

**Tiempo estimado:** Guía ≈ 25 min (1.876 palabras a 120 ppm + 5 min de comprobaciones rápidas) · Ejercicios ≈ 2 h 50 min (3 de nivel 1 × 10 min, 2 de nivel 2 × 25 min, 2 de nivel 3 × 45 min) · Cuestionario ≈ 30 min · Reflexión ≈ 1 h 30 min. **Total efectivo ≈ 5 h 15 min** de las 12 h que planifica el syllabus. Las ≈ 6 h 45 min restantes son estudio autónomo: relectura, apuntes, lecturas de referencia y repaso.

> **Idea central.** Usar la IA "de vez en cuando" para salir de un apuro ahorra minutos. Integrarla en un flujo de trabajo diseñado (con pasos definidos, prompts probados, puntos de control humano y medición) ahorra horas y, sobre todo, produce calidad consistente. Esta unidad enseña a diseñar ese flujo, elegir herramientas por tarea, verificar lo que entra en un entregable, calcular si vale la pena pagar por una herramienta y trabajar con responsabilidad.

## Objetivos

- Diseñar un flujo de trabajo con IA con etapas, responsables y puntos de control.
- Elegir herramientas según el tipo de tarea, no por moda.
- Aplicar un protocolo de verificación antes de entregar.
- Medir el tiempo ahorrado y calcular el retorno de una suscripción correctamente.
- Reconocer obligaciones de privacidad, autoría, transparencia y sesgo.

---

## 1. De asistente ocasional a sistema

La diferencia la resume bien el material original: el error es usar la IA como "herramienta de emergencia"; el acierto es integrarla como parte del sistema. ¿Qué significa "sistema"? Cuatro cosas:

1. **Etapas definidas:** se sabe qué pasos tiene la tarea y en cuáles participa la IA.
2. **Prompts estables:** cada etapa usa un prompt de tu biblioteca (U3), no uno improvisado.
3. **Puntos de control humano:** se sabe dónde una persona revisa, decide o aprueba.
4. **Medición:** se registra cuánto tiempo toma y qué calidad sale, para mejorar.

### El principio de reparto: la IA da amplitud, la persona da criterio

La IA es rápida generando opciones, borradores y variaciones; las personas son mejores decidiendo qué sirve para *este* cliente, *este* contexto y *esta* estrategia, y respondiendo por el resultado. Un buen flujo asigna a la IA el trabajo "rápido y amplio" y a la persona el trabajo "lento y preciso".

## 2. Cuatro flujos de ejemplo

Estos flujos vienen del material original (agencias digitales) y se presentan ampliados con sus puntos de control. Funcionan igual en otros contextos: una consultora, un despacho, un área de marketing interna.

### 2.1 Propuesta de servicios

| Etapa | Quién | Detalle | Control |
|---|---|---|---|
| 1. Brief | Cliente | Llena un formulario con su problema y objetivos | — |
| 2. Análisis | IA | Resume el problema, objetivos, preguntas de aclaración y estructura sugerida | Persona revisa que el resumen sea fiel al brief |
| 3. Aclaración | Persona | Llama o escribe al cliente con las preguntas | Decide qué entra en el alcance |
| 4. Borrador | IA | Redacta con la estructura acordada y los datos confirmados | — |
| 5. Edición final | Persona | Ajusta precio, plazos, tono; verifica cada dato | Aprobación antes de enviar |

### 2.2 Del brief de diseño a conceptos de marca

La IA propone tres conceptos de posicionamiento, palabras de personalidad y referencias de estilo; el diseñador los usa como **punto de partida, no de llegada**. Control: ningún concepto pasa al cliente sin elaboración y criterio del diseñador.

### 2.3 Contenido para buscadores (SEO)

1. Investigación de palabras clave con herramientas específicas (datos reales, no inventados por la IA).
2. La IA propone un esquema por artículo (títulos y puntos clave).
3. Una persona escribe o reescribe con experiencia real y la voz de la marca.
4. La IA revisa estructura, claridad y metadatos.
5. Persona verifica datos y publica.
*Corrección al material original:* este proponía revisar la "densidad de palabras clave"; es una métrica que los propios buscadores desaconsejan perseguir. Revisa en su lugar que el texto responda bien la intención de búsqueda.

### 2.4 Informe mensual para un cliente

1. Exportar datos de las plataformas.
2. Pegarlos (sin datos personales) con el prompt: "Analiza estos resultados como responsable de cuenta. Identifica 3 hallazgos, 2 áreas de mejora y 3 recomendaciones. Cita la cifra concreta que sustenta cada punto."
3. La persona comprueba cada cifra citada contra la fuente y añade el contexto que la IA no conoce (cambios de presupuesto, temporadas, decisiones del cliente).

### Ejemplo resuelto 1 — Diseñar un flujo desde cero

*Tarea:* una pequeña escuela de idiomas responde a mano unas 60 consultas semanales por correo, muchas repetidas.

1. **Mapear la tarea actual.** Leer correo → identificar tipo → buscar información → redactar → enviar. Tiempo medido en una semana: 6 minutos por correo ≈ 6 horas.
2. **Detectar dónde aporta la IA.** Clasificar el tipo de consulta (few-shot, U3) y redactar un borrador a partir de un documento de respuestas oficiales.
3. **Definir controles.** Una persona revisa cada borrador antes de enviar; las consultas de pagos o quejas nunca se responden con borrador automático.
4. **Preparar insumos.** Documento oficial de precios, horarios y políticas (la IA responde *solo* con él).
5. **Medir.** Tras dos semanas: 2,5 minutos por correo ≈ 2,5 horas. Ahorro ≈ 3,5 horas semanales, con revisión humana mantenida.

## 3. Elegir herramientas por tipo de tarea

En vez de una lista de marcas (que envejece rápido), piensa en **categorías** y criterios.

| Necesidad | Categoría | Qué comprobar antes de elegir |
|---|---|---|
| Redactar, analizar, resumir | Asistente conversacional (ChatGPT, Claude, Gemini u otros) | Calidad en tu idioma, límites de uso, política de datos |
| Investigar con fuentes actuales | Asistente con búsqueda y citas (p. ej., Perplexity o los modos de búsqueda de los asistentes) | Que cite fuentes y que puedas abrirlas |
| Transcribir y resumir reuniones | Herramientas de transcripción (p. ej., Otter o Fireflies) | Consentimiento de los participantes, idioma, dónde se guardan las grabaciones |
| Imágenes de referencia | Generadores de imágenes | Derechos de uso comercial según los términos vigentes |
| IA dentro de tus documentos | Funciones de IA integradas (en tu editor o gestor de tareas) | Si accede a todos tus documentos y con qué permisos |

**Sobre precios:** cambian a menudo. Como referencia verificada en noviembre de 2026, Claude Pro costaba USD 20 al mes en EE. UU. según el centro de ayuda de Anthropic, y ChatGPT Plus rondaba USD 20 al mes según comparativas publicadas; los planes superiores (por ejemplo, ChatGPT Pro) cuestan bastante más. El material original llamaba "ChatGPT Pro" al plan de USD 20, lo cual es incorrecto. Antes de presupuestar, consulta siempre la página oficial de precios.

**Regla de stack mínimo:** no contrates herramientas "por si acaso". Empieza con un asistente general y añade otra solo cuando una tarea concreta y frecuente lo justifique (§5).

## 4. Protocolo de verificación antes de entregar

Todo lo que salga hacia un cliente, un jefe o el público pasa por estas preguntas:

1. **Datos:** ¿cada cifra, fecha, nombre, cita y enlace está comprobado en una fuente primaria? ¿Abrí los enlaces?
2. **Fidelidad:** si la IA resumió o reescribió, ¿conserva el sentido del original? (Compara al menos los puntos clave.)
3. **Alcance:** ¿responde exactamente a lo que se pidió, sin promesas que no puedes cumplir?
4. **Derechos:** ¿hay textos, imágenes o código que puedan tener restricciones de uso?
5. **Sesgo y tono:** ¿hay generalizaciones sobre personas o grupos? ¿El tono es adecuado para la audiencia?
6. **Transparencia:** ¿el destinatario espera saber que se usó IA? (Ver §6.)

### Ejemplo resuelto 2 — Verificación de un informe

Un borrador generado dice: "El tráfico orgánico creció un 34 % en octubre gracias a la nueva estrategia de contenidos."

- *Dato:* abres la herramienta de analítica: el crecimiento fue del 31 %. → corriges.
- *Causalidad:* "gracias a" es una afirmación causal. En octubre también hubo una campaña de pago que pudo influir. → reformulas: "creció un 31 %; coincide con la publicación de 8 artículos nuevos y con la campaña de pago, por lo que no podemos atribuirlo a una sola causa." (El curso de *Resolución de problemas y pensamiento crítico* profundiza en esta distinción.)

## 5. Medir el ahorro y calcular el retorno

### Medir, no suponer

1. Mide cuánto tardas en la tarea **sin** IA (o usa un registro reciente).
2. Mide cuánto tardas **con** el flujo, *incluida* la revisión y la verificación.
3. Repite varias veces: una sola medición engaña.

### Calcular el retorno correctamente

El material original decía: "Si una suscripción de USD 20 te ahorra 5 horas al mes y facturas USD 50 la hora, tu ROI es 12,5x." Ese 12,5 es el cociente **valor / costo** (250 / 20). El **retorno sobre la inversión** propiamente dicho se calcula como (beneficio − costo) / costo:

- Valor del tiempo ahorrado: 5 h × USD 50 = USD 250.
- ROI = (250 − 20) / 20 = **11,5**, es decir, 1.150 %.

La diferencia parece menor, pero confundir ambos indicadores en un informe para un cliente es un error profesional. Y dos advertencias más: el tiempo ahorrado solo vale dinero si lo usas en trabajo facturable o valioso; y hay que restar el tiempo de aprendizaje y verificación.

## 6. Ética, privacidad y responsabilidad

- **Datos de terceros:** no pegues datos personales de clientes o usuarios sin autorización y sin conocer la política de datos del servicio. Anonimiza (sustituye nombres, correos, teléfonos) siempre que puedas.
- **Confidencialidad:** contratos, estrategias, código propietario: revisa qué permite tu acuerdo con el cliente y qué garantías da el plan que usas.
- **Grabaciones:** para transcribir una reunión, informa a los participantes y obtén su consentimiento.
- **Autoría y transparencia:** acuerda con tu cliente o empleador cómo se informa el uso de IA. En contextos académicos y algunos profesionales, no declararlo puede ser una falta.
- **Sesgo:** revisa con especial cuidado lo que afecta a personas (selección de candidatos, créditos, salud, mensajes a grupos específicos).
- **Responsabilidad final:** si lo firmas o lo envías, es tuyo. "Lo dijo la IA" no es una defensa.

### Mapa honesto: dónde la IA no ayuda

El proyecto del material original pedía mapear también "en qué áreas la IA no aplica y por qué". Es una buena práctica: sobrestimar la IA lleva a prometer cosas que no se pueden cumplir. Ejemplos frecuentes de dónde la IA **no** debe decidir sola: negociaciones delicadas, diagnósticos que requieren responsabilidad profesional, decisiones sobre personas, verificación final de hechos.

---

## Errores comunes

| Error | Corrección |
|---|---|
| Automatizar sin medir el antes | Medir una semana sin IA |
| Flujos sin control humano | Al menos un punto de revisión antes de cualquier entrega |
| Elegir herramientas por tendencia | Elegir por tarea frecuente y criterio explícito |
| Citar precios de memoria | Consultar la página oficial vigente |
| Confundir valor/costo con ROI | ROI = (beneficio − costo) / costo |
| Afirmar causalidad sin evidencia | Describir coincidencias y factores posibles |
| Pegar datos personales | Anonimizar o usar planes con garantías adecuadas |

## Resumen

Un sistema de trabajo con IA tiene etapas, prompts estables, controles humanos y medición. Se eligen herramientas por categoría de tarea y se verifican precios en fuentes oficiales. Nada sale sin pasar por el protocolo de verificación. El ahorro se mide y el retorno se calcula correctamente. Y la responsabilidad por privacidad, autoría, sesgo y exactitud sigue siendo de la persona.
