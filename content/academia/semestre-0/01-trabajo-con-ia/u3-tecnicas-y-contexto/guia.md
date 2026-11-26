# Unidad 3 — Técnicas avanzadas y gestión del contexto

**Semanas 5–6 · 12 horas · Reemplaza:** ia1-l2, ia1-l2b, el tip de ia1-l1b sobre *few-shot*, y la biblioteca de prompts de prodai-1-1

**Pregunta guía:** ¿Cuándo conviene mostrar ejemplos, pedir razonamiento o partir la tarea, y cómo mantengo útil una conversación larga?

**Tiempo estimado:** Guía ≈ 25 min (1.984 palabras a 120 ppm + 5 min de comprobaciones rápidas) · Ejercicios ≈ 3 h 15 min (3 de nivel 1 × 10 min, 3 de nivel 2 × 25 min, 2 de nivel 3 × 45 min) · Cuestionario ≈ 30 min · Reflexión ≈ 1 h 30 min. **Total efectivo ≈ 5 h 40 min** de las 12 h que planifica el syllabus. Las ≈ 6 h 20 min restantes son estudio autónomo: relectura, apuntes, lecturas de referencia y repaso.

> **Idea central.** La anatomía de la Unidad 2 resuelve la mayoría de los casos. Esta unidad cubre lo que queda: cómo mostrar en lugar de describir (ejemplos), cómo hacer que el modelo razone antes de concluir, cómo partir una tarea grande en piezas, cómo pedir salidas que otra herramienta pueda leer, y cómo administrar el contexto de una conversación. Cierra con la herramienta que más rinde a largo plazo: una biblioteca personal de prompts probados.

## Objetivos de la unidad

- Diseñar prompts con ejemplos (*few-shot*) y elegir buenos ejemplos.
- Pedir razonamiento paso a paso cuando conviene y saber cuándo no hace falta.
- Descomponer una tarea compleja en una cadena de prompts.
- Usar delimitadores y formatos estructurados (listas, tablas, JSON).
- Decidir cuándo continuar una conversación y cuándo empezar otra, y cómo traspasar el contexto.
- Construir y mantener una biblioteca de prompts reutilizables.

---

## 1. Ejemplos dentro del prompt (*few-shot*)

### Qué es

En lugar de (o además de) describir lo que quieres, muestras uno o varios ejemplos de entrada y salida. Se habla de *zero-shot* (sin ejemplos), *one-shot* (uno) y *few-shot* (varios). La capacidad de los modelos grandes para aprender una tarea a partir de unos pocos ejemplos en el propio prompt se documentó ampliamente en el artículo de Brown y colaboradores, *Language Models are Few-Shot Learners* (NeurIPS 2020).

### Por qué funciona

Por lo que viste en la U1: el modelo continúa patrones. Una descripción ("tono cercano pero profesional") admite muchas interpretaciones; un ejemplo concreto fija el patrón: largo, estructura, vocabulario, ritmo. Por eso el material original lo llamaba "el modificador más poderoso"; es una exageración útil: muchas veces es el que más mejora la calidad, sobre todo cuando lo que buscas es un *estilo* o un *formato* difícil de describir.

### Ejemplo resuelto 1 — Clasificar mensajes de clientes

Sin ejemplos:
> Clasifica este mensaje como QUEJA, CONSULTA o PEDIDO: "¿Hacen envíos a Monterrey?"

Funciona para casos obvios, pero en casos ambiguos el modelo puede responder con frases ("Este mensaje parece una consulta porque…") o inventar categorías. Con ejemplos:

```
Clasifica cada mensaje en QUEJA, CONSULTA o PEDIDO. Responde solo con la etiqueta.

Mensaje: "Mi pedido llegó roto."
Etiqueta: QUEJA

Mensaje: "¿Tienen la talla M en azul?"
Etiqueta: CONSULTA

Mensaje: "Quiero dos cajas del café de Chiapas, por favor."
Etiqueta: PEDIDO

Mensaje: "Pedí hace una semana y todavía no llega, ¿me dicen algo?"
Etiqueta:
```

Los ejemplos enseñan tres cosas a la vez: las categorías válidas, el formato exacto de la respuesta y cómo resolver un caso parecido a los difíciles.

### Cómo elegir buenos ejemplos

1. **Representativos:** que cubran los casos reales, incluidos los difíciles.
2. **Variados:** si todos los ejemplos tienen la misma longitud o empiezan igual, el modelo copiará eso aunque no quieras.
3. **Equilibrados:** si 4 de 5 ejemplos son QUEJA, el modelo tenderá a responder QUEJA.
4. **Correctos:** un ejemplo con un error enseña el error.
5. **Separados claramente** de las instrucciones y del caso a resolver (ver §4).

**Riesgo a vigilar:** el modelo puede copiar demasiado el ejemplo (mismas frases, misma estructura). Si pasa, añade variedad o indica explícitamente "imita el tono, no las frases".

## 2. Razonamiento paso a paso

### Qué es

Pedir al modelo que escriba su razonamiento antes de la conclusión. Wei y colaboradores (*Chain-of-Thought Prompting Elicits Reasoning in Large Language Models*, NeurIPS 2022) mostraron que incluir pasos intermedios de razonamiento mejora el rendimiento en problemas aritméticos, de sentido común y de lógica, sobre todo en modelos grandes.

### Por qué funciona

De nuevo, por la generación token a token: si el modelo escribe la conclusión primero, los "pasos" posteriores solo la justifican. Si escribe los pasos primero, esos pasos forman parte del texto que condiciona la conclusión.

### Matiz actual importante

Muchos modelos actuales incluyen un modo de "razonamiento" que piensa internamente antes de responder. Con ellos, pedir "piensa paso a paso" aporta menos a la exactitud porque ya lo hacen. Aun así, sigue siendo útil pedir que **muestre** los supuestos, los datos que usó y las alternativas que descartó, porque eso te permite **revisar** el razonamiento, que es lo que de verdad te protege.

### Ejemplo resuelto 2 — Decisión de precios

> Necesito decidir el precio de un taller de fotografía de 4 sesiones. Antes de recomendar un precio, razona en este orden y muéstramelo:
> 1. Qué costos debo cubrir (te los doy abajo).
> 2. Qué precios cobran alternativas comparables (te los doy abajo; no inventes otros).
> 3. Qué supuestos estás haciendo y cuál es el más incierto.
> 4. Tu recomendación con un rango, y qué dato cambiaría tu recomendación.
> Datos: renta del espacio 1.200 por sesión; materiales 150 por alumno; cupo 10 personas; dos talleres similares en la ciudad cobran 2.800 y 3.500 por 4 sesiones.

Observa tres cosas: el orden de razonamiento lo defines tú; los datos se aportan (no se piden); y se exige explicitar supuestos e incertidumbre.

### Cuándo NO hace falta

Para tareas simples (reescribir, traducir, dar formato), pedir razonamiento solo alarga la respuesta.

## 3. Descomposición: cadenas de prompts

### Qué es

Dividir una tarea grande en pasos y resolverlos en prompts sucesivos, revisando cada salida antes de pasar a la siguiente.

### Por qué funciona

Cada prompt tiene un objetivo único y claro; puedes verificar los resultados intermedios; y si algo falla, sabes en qué paso.

### Ejemplo resuelto 3 — Un artículo de blog

En vez de "escribe un artículo de 1.500 palabras sobre cómo elegir un seguro de gastos médicos":

1. **Prompt 1:** "Lista las 10 preguntas que más se hace alguien de 30 años al elegir su primer seguro de gastos médicos." → Revisas, eliges 6.
2. **Prompt 2:** "Con estas 6 preguntas, propón un esquema de artículo con títulos de sección y 2–3 ideas por sección." → Ajustas el orden.
3. **Prompt 3:** "Escribe la sección 1 siguiendo este esquema. Usa solo los datos que te doy a continuación [pegas los datos verificados]." → Repites por sección.
4. **Prompt 4:** "Revisa el artículo completo: señala repeticiones, saltos lógicos y frases de más de 25 palabras." → Editas.

Cada salida intermedia es un punto de control humano. El resultado es mejor y, sobre todo, **más fácil de corregir**.

## 4. Delimitadores y salidas estructuradas

### Delimitadores

Cuando pegas material (un texto, un correo, datos), sepáralo claramente de tus instrucciones para que el modelo no confunda una cosa con otra. Opciones habituales: comillas triples, etiquetas tipo XML, encabezados.

```
Resume el siguiente correo en 3 viñetas y propón una respuesta de máximo 80 palabras.

<correo>
Hola, les escribo porque la factura de octubre trae un cobro doble...
</correo>
```

Esto además reduce un riesgo: si el texto pegado contiene frases que parecen instrucciones ("ignora lo anterior y…"), los delimitadores ayudan a que el modelo las trate como contenido. No es una protección completa, pero ayuda.

### Salidas estructuradas

Si la respuesta va a pasar a una hoja de cálculo u otra herramienta, pide una estructura exacta:

```
Extrae de cada reseña: producto, calificación (1-5) y queja principal (máximo 8 palabras).
Responde SOLO con JSON válido, una lista de objetos con las claves "producto", "calificacion", "queja".
Si un dato no aparece, usa null. No inventes valores.
```

Ventajas: puedes comprobar automáticamente que la respuesta tiene el formato pedido, y detectas al instante cuando el modelo "rellena" datos que no estaban (por eso el `null` explícito).

## 5. Prompts tipo por clase de tarea

El material original ofrecía plantillas cortas por tarea; aquí están ampliadas y corregidas:

- **Código:** especifica lenguaje y versión, estilo (por ejemplo "TypeScript en modo estricto, sin `any`"), manejo de errores esperado, y pide que explique los supuestos. Nunca ejecutes código generado sin leerlo; verifica que las funciones y librerías que usa existen (son un caso frecuente de alucinación).
- **Análisis:** "Analiza desde al menos dos perspectivas; al final da tu conclusión con un nivel de confianza (alto/medio/bajo) y qué información adicional la cambiaría."
- **Edición:** "Edita para que sea más directo. Mantén el tono y el contenido; no añadas ideas nuevas. Al final, lista los 3 cambios principales y por qué." Pedir la lista de cambios te permite revisar que no alteró el sentido.
- **Resumen:** define para quién y para qué: "Resume para una directora que decidirá si aprueba el presupuesto: 5 viñetas, la última con la decisión que se le pide."

## 6. Gestionar el contexto de una conversación

### Continuar o empezar de nuevo

| Continúa la conversación cuando… | Empieza una nueva cuando… |
|---|---|
| El contexto acumulado es valioso (un documento que estás editando por partes, un análisis en curso) | La conversación se desvió, hay errores acumulados o instrucciones contradictorias |
| Las instrucciones iniciales siguen respetándose | El modelo ignora instrucciones del principio |
| La conversación es relativamente corta | Es muy larga o cambiaste de tema |

### Traspasar el contexto: el resumen de relevo

Antes de cerrar una conversación larga, pide:

> "Resume esta conversación para retomarla en un chat nuevo: objetivo, decisiones tomadas, datos clave, lo que falta por hacer y las instrucciones de estilo que acordamos. Máximo 200 palabras."

Revisa ese resumen (puede omitir algo importante), corrígelo y úsalo como inicio de la conversación nueva.

### Dónde poner lo importante

Recuerda *Lost in the Middle* (U1): en prompts largos con mucho material pegado, coloca las instrucciones al principio y repite las críticas al final ("Recuerda: responde solo con base en el documento y en formato de tabla").

## 7. Tu biblioteca de prompts

Un prompt bien construido y probado es un activo: te ahorra tiempo cada vez que lo reutilizas y hace que tu calidad sea consistente. Las dos lecciones originales coincidían en esto; aquí está el procedimiento completo.

### Qué guardar por cada prompt

| Campo | Ejemplo |
|---|---|
| Nombre | "Correo de reactivación de clientes" |
| Cuándo usarlo | Clientes inactivos > 3 meses |
| Prompt con variables | "...La tienda es {{tienda}}... cupón {{cupón}}..." |
| Ejemplo de buena salida | Pega una salida aprobada |
| Criterios de calidad | ≤120 palabras, cupón correcto, sin datos inventados |
| Probado con | Herramienta y fecha (los modelos cambian) |
| Notas | "Con temperatura alta inventa testimonios: mantener la restricción" |

### Mantenimiento

- **Versiona:** cuando mejores un prompt, guarda la versión anterior y anota qué cambió.
- **Re-prueba** tras cambios de modelo: un prompt que funcionaba puede comportarse distinto.
- **Poda:** si no lo usaste en tres meses, archívalo.

Puedes guardarla en cualquier herramienta (un documento, una hoja de cálculo, Notion). Lo importante es la estructura, no la herramienta.

---

## Errores comunes

| Error | Corrección |
|---|---|
| Ejemplos todos iguales | Variar longitud, caso y estructura |
| Pedir razonamiento para todo | Solo en tareas con varios pasos o decisiones |
| Una mega-instrucción para una tarea compleja | Cadena de prompts con revisión intermedia |
| Pegar material sin delimitar | Usar etiquetas o comillas triples |
| Pedir JSON sin decir qué hacer con datos faltantes | Indicar `null` y "no inventes" |
| Seguir en una conversación degradada | Resumen de relevo + chat nuevo |
| Biblioteca sin criterios ni fechas | Guardar criterios, ejemplo y fecha de prueba |

## Resumen

Mostrar ejemplos fija el patrón que buscas; pedir razonamiento antes de la conclusión mejora y hace revisables las decisiones complejas; descomponer las tareas grandes crea puntos de control; delimitar y estructurar facilita verificar. El contexto se administra: continúa mientras aporte, y si se degrada, resume y empieza de nuevo. Todo lo que funcione, guárdalo en una biblioteca con criterios y fecha.
