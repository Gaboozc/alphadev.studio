# Checkpoint del curso — Trabajo con IA

| Campo | Valor |
|---|---|
| Id | `s0-c1-checkpoint` |
| Formato | Checkpoint / examen de curso (`formatos-leccion.md` §7) |
| Cuándo | Semana 9 (antes del avance del proyecto). Requiere haber completado todas las unidades |
| Tiempo estimado | 60–75 min: Parte A ≈ 30 min (21 preguntas × 1,5 min) + Parte B 30–45 min [INFERENCIA] |
| Evaluación | **[MIXTO]**: Parte A [AUTO] · Parte B [HUMANO] con rúbrica |
| Qué se sirve | 21 preguntas de un banco de 28: **3 por objetivo**, elegidas al azar, con las opciones en orden aleatorio. Así dos intentos no son iguales |
| Aprobación | ≥ 70 % ponderado: Parte A 60 % + Parte B 40 % [INFERENCIA]. La Parte A cuenta dentro del 20 % de opción múltiple del curso y la Parte B dentro de ejercicios (`formatos-leccion.md` §7) |
| Reintentos | Hasta 2, separados por ≥ 24 h. En el reintento se sirve otra selección del banco |
| Piloto 1 (sin F5) | La Parte A puede corregirse en el navegador como autoevaluación. La Parte B queda como autoevaluación con la rúbrica hasta que haya entregas en servidor |
| Clave | `claves/checkpoint-clave.md` (solo en servidor) |

## Mapa de cobertura (objetivo del curso → preguntas del banco)

| Objetivo del syllabus | Preguntas | Se sirven |
|---|---|---|
| O1. Explicar cómo genera texto un modelo de lenguaje y por qué alucina y varía | CP-01, CP-02, CP-03, CP-04 | 3 |
| O2. Redactar instrucciones con los siete componentes | CP-05, CP-06, CP-07, CP-08 | 3 |
| O3. Aplicar técnicas de mejora y elegir la adecuada | CP-09, CP-10, CP-11, CP-12 | 3 |
| O4. Gestionar el contexto de una conversación | CP-13, CP-14, CP-15, CP-16 | 3 |
| O5. Evaluar respuestas y verificar datos | CP-17, CP-18, CP-19, CP-20 | 3 |
| O6. Diseñar un flujo de trabajo con IA con control humano, ahorro y costos | CP-21, CP-22, CP-23, CP-24 | 3 |
| O7. Reconocer límites éticos, legales y de privacidad | CP-25, CP-26, CP-27, CP-28 | 3 |
| Todos (integración) | Caso aplicado (Parte B) | 1 |

## Parte A — Banco de opción múltiple [AUTO]

Una sola respuesta correcta por pregunta.

**CP-01** (O1 · U1) Pides el mismo texto dos veces con el mismo prompt y obtienes versiones distintas. ¿Cuál es la explicación más precisa?

   a) La segunda respuesta incorporó información más reciente sacada de internet.
   b) El modelo elige cada token con cierta aleatoriedad, regulada por la temperatura.
   c) El modelo aprendió de tu primera petición y corrigió la segunda.
   d) El servicio usa por norma un modelo distinto en cada consulta.

**CP-02** (O1 · U1) ¿Por qué un modelo puede citar con total seguridad un artículo que no existe?

   a) Porque genera la continuación más plausible sin comprobar si es verdadera.
   b) Porque una temperatura alta lo obliga a inventar todas las citas.
   c) Porque el ajuste posterior le enseñó a inventar fuentes creíbles.
   d) Porque copia sus referencias de una base de datos que está desactualizada.

**CP-03** (O1 · U1) ¿Qué es un token?

   a) Una palabra completa, tal como aparece escrita en el diccionario.
   b) Una frase completa que el modelo guarda en su memoria.
   c) Un fragmento de texto: una palabra, una parte de ella o un signo.
   d) Una tarifa fija que se cobra por cada consulta enviada.

**CP-04** (O1 · U1) Pegas un documento muy largo con una instrucción clave en la mitad y la IA la ignora. ¿Qué explica mejor el fallo?

   a) Los modelos solo leen el primer párrafo del material pegado.
   b) La temperatura bajó y el modelo dejó de leer con atención.
   c) Lo que queda en medio de un texto largo se aprovecha peor.
   d) El documento superó la fecha de corte del modelo.

**CP-05** (O2 · U2) "Escribe un post para LinkedIn sobre nuestro nuevo servicio." ¿Qué le falta sobre todo a este prompt?

   a) Solo el tono; la tarea y el resto ya están claros.
   b) Solo el rol; con un rol experto, el resto se deduce.
   c) Solo ejemplos; con dos posts de muestra bastaría.
   d) Contexto, audiencia, objetivo, restricciones y formato.

**CP-06** (O2 · U2) ¿Qué componente responde a la pregunta "¿para qué servirá este resultado?"?

   a) Tarea.
   b) Formato.
   c) Contexto.
   d) Objetivo.

**CP-07** (O2 · U2) ¿Cuál es la mejor forma de pedir el formato de salida?

   a) "Hazlo visual y fácil de leer, con buena presentación."
   b) "Tabla con columnas Opción, Ventaja y Riesgo; máximo 5 filas."
   c) "Organízalo de forma clara y profesional, como un consultor senior."
   d) "Usa el formato que te parezca más adecuado para el tema."

**CP-08** (O2 · U2) Cambiaste a la vez el rol, el tono y el formato, y el resultado mejoró. ¿Cuál es el problema?

   a) Cambiar el rol suele empeorar el resultado final.
   b) El modelo penaliza los prompts que cambian demasiado.
   c) No sabes cuál de los cambios produjo la mejora.
   d) Ninguno: cambiar varias cosas a la vez es lo recomendado.

**CP-09** (O3 · U3) Necesitas clasificar 200 comentarios en categorías propias de tu empresa. ¿Qué técnica conviene más?

   a) Pedir una respuesta más larga y más detallada.
   b) Subir la temperatura para obtener más variedad.
   c) Incluir varios comentarios ya clasificados (*few-shot*).
   d) Asignar al modelo el rol de experto en atención al cliente.

**CP-10** (O3 · U3) ¿En qué caso NO hace falta pedir razonamiento paso a paso?

   a) Al elegir entre tres proveedores con varios criterios.
   b) Al resolver un cálculo que tiene varios pasos.
   c) Al revisar los supuestos de una estimación de precios.
   d) Al reformular una frase en un tono más formal.

**CP-11** (O3 · U3) Generas un artículo en tres pasos: esquema, borrador por sección y edición. ¿Qué ventaja principal tiene?

   a) Garantiza que el modelo no cometa alucinaciones.
   b) Reduce siempre el número total de tokens usados.
   c) Crea puntos de control para revisar cada paso antes de seguir.
   d) Evita tener que escribir instrucciones nuevas en cada paso.

**CP-12** (O3 · U3) Quieres que la IA analice el correo de un cliente sin confundir sus frases con tus instrucciones. ¿Qué haces?

   a) Pides al modelo que adivine qué parte es instrucción.
   b) Lo pegas al final del prompt sin ninguna marca.
   c) Escribes el correo del cliente en mayúsculas.
   d) Delimitas el correo con comillas triples o etiquetas.

**CP-13** (O4 · U3) Tras 60 mensajes, el asistente ignora el estilo acordado al inicio. ¿Cuál es la mejor acción?

   a) Cambiar de modelo y pegarle los 60 mensajes completos.
   b) Repetir "sigue las instrucciones iniciales" en cada mensaje sin cambiar nada.
   c) Subir la temperatura para que el modelo reaccione.
   d) Pedir un resumen de relevo, revisarlo y empezar una conversación nueva con él.

**CP-14** (O4 · U3) En un prompt largo con mucho material pegado, ¿dónde conviene poner las instrucciones críticas?

   a) Al principio, y repetirlas brevemente al final.
   b) Solo al final, después de todo el material.
   c) Solo en medio, junto al material al que se refieren.
   d) Da igual: el modelo atiende todo el texto por igual.

**CP-15** (O4 · U3) ¿Qué debe incluir un resumen de relevo?

   a) El nombre del proyecto y la fecha de la conversación.
   b) Solo el último mensaje del asistente, copiado tal cual y sin editar.
   c) La conversación completa, para no perder nada.
   d) Objetivo, decisiones, datos clave, pendientes y estilo acordado.

**CP-16** (O4 · U3) ¿Cuándo conviene seguir en la misma conversación?

   a) Cuando se acumularon instrucciones que se contradicen.
   b) Cuando el contexto acumulado aporta y se respetan las reglas.
   c) Cuando la conversación se desvió del objetivo inicial.
   d) Cuando cambiaste por completo de tema o de tarea.

**CP-17** (O5 · U2) ¿Cuál de estos criterios de evaluación se puede verificar sin juicio humano?

   a) "Cada viñeta tiene como máximo 15 palabras."
   b) "La calidad general del texto es alta."
   c) "El texto resulta convincente para el cliente."
   d) "El tono suena cercano y natural."

**CP-18** (O5 · U4) La IA te da una estadística de mercado ideal para tu informe. ¿Qué haces antes de usarla?

   a) Le preguntas a la IA si está segura del dato.
   b) Buscas la fuente primaria y compruebas que dice lo mismo.
   c) Pides la misma cifra a otro modelo y la promedias.
   d) La usas si viene con decimales, autor y año de publicación.

**CP-19** (O5 · U3) Recibes un fragmento de código generado por IA. ¿Qué verificas primero?

   a) Que funciones y librerías existan y funcionen, probándolo.
   b) Que sea lo más corto posible, aunque no llegue a probarse.
   c) Que use el lenguaje o framework que está de moda.
   d) Que tenga comentarios explicativos en cada línea.

**CP-20** (O5 · U3) ¿Por qué anotar la fecha y el modelo junto a cada prompt de tu biblioteca?

   a) Porque lo exige la ley de propiedad intelectual.
   b) Porque los modelos cambian y el prompt puede responder distinto.
   c) Porque incluir la fecha en el prompt mejora la respuesta del modelo.
   d) Porque así se puede cobrar cada prompt al cliente.

**CP-21** (O6 · U4) En un flujo de propuestas con IA, ¿qué etapa debe quedar siempre en manos de una persona?

   a) El primer borrador de la estructura completa de la propuesta.
   b) La aprobación final de precio, plazos y datos del cliente.
   c) La lluvia de ideas de títulos y enfoques posibles.
   d) El formato y la maquetación del documento final.

**CP-22** (O6 · U4) Una suscripción de USD 30 al mes te ahorra 3 h y tu hora vale USD 40. ¿Cuál es el ROI?

   a) 25 %
   b) 90 %
   c) 300 %
   d) 400 %

**CP-23** (O6 · U4) ¿Cómo debe medirse el tiempo ahorrado con IA?

   a) El tiempo total con IA, revisión incluida, frente al de sin IA.
   b) El tiempo de la primera prueba que hiciste.
   c) El tiempo que el propio asistente estima.
   d) Solo el tiempo que tarda el modelo en generar el texto final.

**CP-24** (O6 · U4) Diseñas un flujo para el informe mensual de un cliente. ¿Qué lo convierte en un sistema y no en un uso ocasional?

   a) Automatizar el envío para no revisar nada.
   b) Etapas, prompts estables, control humano y medición.
   c) Aplicar la IA a todas las tareas del equipo sin excepción.
   d) Usar la herramienta más cara del mercado.

**CP-25** (O7 · U4) Un cliente te pide resumir con IA 40 entrevistas internas que incluyen nombres de empleados. ¿Qué haces antes?

   a) Revisas qué permite tu acuerdo con el cliente y anonimizas los datos personales.
   b) Resumes solo las que tienen menos datos personales, sin avisar.
   c) Le pides a la IA que olvide los nombres al terminar.
   d) Las subes tal cual: la herramienta es de pago y, por lo tanto, es privada.

**CP-26** (O7 · U4) Un informe con un dato falso generado por IA llega al cliente. ¿Quién responde?

   a) Quien firmó o envió el informe.
   b) El cliente, por no verificar el dato.
   c) El proveedor de la herramienta de IA.
   d) Nadie: fue un error de la herramienta.

**CP-27** (O7 · Syllabus) En este curso, ¿cuándo hay que declarar el uso de IA?

   a) Nunca, si el resultado final es de buena calidad.
   b) Solo si la IA escribió más de la mitad del texto entregado.
   c) Siempre que te ayudó a redactar la reflexión o el análisis.
   d) Solo si el docente lo pregunta de forma expresa.

**CP-28** (O7 · U4) Pides "imagen de un programador experto" y siempre salen hombres jóvenes. ¿Qué ilustra?

   a) Que el prompt era demasiado largo y se ignoró.
   b) Que el modelo refleja con exactitud la población real de programadores del mundo.
   c) Que la temperatura está demasiado baja para variar.
   d) Que el modelo reproduce sesgos de sus datos y hay que corregirlos de forma explícita.

## Parte B — Caso aplicado: el informe mensual de una agencia [caso ficticio] [HUMANO]

Una agencia de tres personas gestiona las redes de 5 clientes. Cada mes tarda unas 4 horas por cliente en preparar el informe (métricas, interpretación y recomendaciones). Quiere usar IA para reducir ese tiempo sin perder calidad ni poner en riesgo datos de los clientes.

**Qué tienes que entregar** (350–500 palabras más el prompt, 30–40 min):

1. Diseña el flujo en 4–6 etapas. Marca quién hace cada una (IA o persona) y dónde está el control humano.
2. Escribe el prompt completo de una etapa con los siete componentes, y marca cada uno.
3. Describe cómo verificarías dos datos concretos del informe antes de enviarlo.
4. Identifica un riesgo de privacidad o de responsabilidad y su control.
5. Explica cómo medirías si el flujo ahorra tiempo de verdad.

**Política de IA:** puedes usar IA para generar ideas, no para redactar el análisis. Si la usaste, decláralo en una línea al final.

### Rúbrica (12 puntos; visible desde el inicio)

| Criterio | Excelente (3) | Adecuado (2) | En desarrollo (1) | Insuficiente (0) |
|---|---|---|---|---|
| Flujo y control humano | Etapas claras, reparto IA/persona justificado y control humano en los puntos de riesgo | Etapas claras, control humano poco justificado | Etapas vagas o sin control humano explícito | Ausente |
| Prompt | Los siete componentes presentes, concretos y marcados | Faltan uno o dos componentes, o son vagos | Faltan tres o más | Ausente |
| Verificación y medición | Dos verificaciones con fuente primaria y una medición del tiempo total, revisión incluida | Verificación o medición incompleta | Mención genérica ("revisaría los datos") | Ausente |
| Ética y privacidad | Riesgo concreto con un control aplicable (permiso, anonimización, responsable) | Riesgo identificado con un control vago | Mención genérica | Ausente |

Parte B aprobada con ≥ 7/12 [INFERENCIA].
