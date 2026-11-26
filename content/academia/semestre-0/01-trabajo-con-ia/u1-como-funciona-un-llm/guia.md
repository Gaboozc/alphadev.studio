# Unidad 1 — Cómo funciona un modelo de lenguaje

**Semanas 1–2 · 12 horas · Reemplaza:** ia1-l1 (parte conceptual)

**Pregunta guía:** ¿Qué hace realmente un modelo de lenguaje cuando "responde", y por qué a veces inventa?

**Tiempo estimado:** Guía ≈ 30 min (2.809 palabras a 120 ppm + 5 min de comprobaciones rápidas) · Ejercicios ≈ 3 h 25 min (4 de nivel 1 × 10 min, 3 de nivel 2 × 25 min, 2 de nivel 3 × 45 min) · Cuestionario ≈ 30 min · Reflexión ≈ 1 h 30 min. **Total efectivo ≈ 5 h 55 min** de las 12 h que planifica el syllabus. Las ≈ 6 h 05 min restantes son estudio autónomo: relectura, apuntes, lecturas de referencia y repaso.

> **Para qué sirve esta unidad.** Casi todos los errores que la gente comete con la IA vienen de una idea equivocada de lo que la IA *es*. Si crees que es un buscador, le pedirás datos y te creerás lo que diga. Si crees que es una persona, te frustrarás cuando "olvide" algo. Si entiendes que es un sistema que predice texto, sabrás qué pedirle, cómo pedírselo y cuándo desconfiar. Todo el resto del curso se apoya en esta unidad.

## Objetivos de la unidad

Al terminar podrás:

- Explicar qué es un token y estimar cuántos tokens tiene un texto.
- Describir, sin tecnicismos innecesarios, cómo un modelo genera una respuesta palabra a palabra.
- Distinguir las fases de entrenamiento (preentrenamiento y ajuste posterior) y qué aporta cada una.
- Explicar qué controla la temperatura y por qué el mismo prompt da respuestas distintas.
- Definir la ventana de contexto y sus consecuencias prácticas.
- Explicar por qué los modelos "alucinan" y qué hacer al respecto.

---

## 1. Un punto de partida honesto: qué *no* es un modelo de lenguaje

Antes de decir qué es, conviene descartar tres ideas muy extendidas.

**No es un buscador.** Cuando escribes en Google, el sistema busca documentos que existen y te muestra enlaces. Un modelo de lenguaje, en su forma básica, no busca nada: genera texto nuevo a partir de lo que aprendió durante su entrenamiento. Algunos asistentes actuales combinan el modelo con una búsqueda web (verás que citan fuentes), pero esa es una herramienta añadida, no el funcionamiento del modelo en sí. Si la herramienta de búsqueda no está activa, el modelo responde "de memoria", y esa memoria puede estar incompleta, desactualizada o equivocada.

**No es una base de datos.** No hay una tabla interna donde esté guardado "la capital de Francia es París". Lo que hay son miles de millones de números (llamados *parámetros*) que, en conjunto, hacen que después de la frase "la capital de Francia es" la palabra "París" sea extremadamente probable. Parece lo mismo, pero no lo es: para datos muy frecuentes en el entrenamiento la probabilidad está tan concentrada que el modelo casi nunca falla; para datos raros (el teléfono de una empresa pequeña, la fecha exacta de un evento local) la probabilidad está repartida y el modelo puede producir algo plausible pero falso.

**No es una persona.** El modelo no tiene intenciones, no sabe que está hablando contigo y no "recuerda" conversaciones anteriores salvo que el producto que usas guarde y le vuelva a pasar esa información. Que su texto suene humano es consecuencia de haber aprendido de textos escritos por humanos.

## 2. Tokens: las piezas con las que trabaja el modelo

Un modelo no lee letras ni palabras completas: lee **tokens**. Un token es un fragmento de texto que puede ser una palabra entera ("casa"), una parte de palabra ("des", "cargar"), un signo de puntuación o un espacio con una palabra pegada.

¿Por qué fragmentos y no palabras? Porque así el modelo puede manejar cualquier palabra, incluso una que nunca vio, combinando piezas conocidas. "Desconfigurado" quizá no aparezca muchas veces en los textos de entrenamiento, pero "des", "config" y "urado" sí.

**Regla práctica.** OpenAI documenta que, en inglés, un token equivale en promedio a unos 4 caracteres, o sea unas tres cuartas partes de una palabra: 100 tokens ≈ 75 palabras. En español la proporción suele ser algo peor (más tokens por palabra), porque los vocabularios de los modelos se construyeron con mucho texto en inglés. Para estimar en español, una aproximación prudente es contar entre 1,3 y 1,6 tokens por palabra. Si necesitas una cifra exacta, usa el contador de tokens del proveedor (OpenAI publica uno en `platform.openai.com/tokenizer`).

**¿Por qué te importa?** Por tres razones prácticas:

1. **Los límites se miden en tokens.** Cuánto texto puedes pegar en una conversación y cuánto puede escribir el modelo en una respuesta se expresan en tokens.
2. **El costo se mide en tokens.** Si algún día usas la IA a través de una API (pagando por uso), te cobrarán por tokens de entrada y de salida.
3. **Explica errores raros.** Los modelos suelen fallar al contar letras de una palabra o al invertir texto letra por letra, porque no "ven" letras: ven tokens.

### Ejemplo resuelto 1 — Estimar tokens

*Problema:* tienes un informe de 3.000 palabras en español y quieres saber si cabe cómodamente en una conversación cuyo límite práctico es de 32.000 tokens, dejando espacio para tus instrucciones y la respuesta.

*Paso 1.* Estima los tokens del informe: 3.000 palabras × 1,5 tokens/palabra ≈ 4.500 tokens.
*Paso 2.* Suma tus instrucciones (digamos 300 palabras ≈ 450 tokens) y la respuesta esperada (1.000 palabras ≈ 1.500 tokens).
*Paso 3.* Total ≈ 6.450 tokens, muy por debajo de 32.000.
*Conclusión:* cabe con holgura. Si en vez de un informe fueran veinte, el total (≈ 90.000 tokens) ya no cabría y tendrías que trabajar por partes o resumir primero.

## 3. Cómo se genera una respuesta: predicción, token a token

Este es el corazón de la unidad. Un modelo de lenguaje hace una sola cosa, repetida muchas veces:

> Dado todo el texto que tiene delante (tu mensaje más lo que ya lleva escrito), calcula, para cada token posible de su vocabulario, qué tan probable es que venga a continuación. Elige uno. Lo añade al texto. Repite.

Imagina que el texto es: *"El café de Colombia es famoso por su"*. El modelo calcula algo parecido a esto (cifras inventadas para ilustrar):

| Siguiente token | Probabilidad |
|---|---|
| sabor | 0,41 |
| aroma | 0,22 |
| calidad | 0,17 |
| acidez | 0,06 |
| … (miles de opciones más) | … |

Elige uno (digamos "sabor"), lo añade y vuelve a calcular con *"El café de Colombia es famoso por su sabor"*. Así, token a token, hasta que el modelo genera un token especial de "fin" o se alcanza un límite.

**Consecuencias de esto que debes interiorizar:**

- **El modelo no planifica la respuesta completa de antemano** como haría una persona con un esquema. Cada token depende de los anteriores. Por eso pedirle que razone por pasos *antes* de dar la conclusión (lo verás en la U3) mejora los resultados: los pasos escritos pasan a formar parte del texto que condiciona la conclusión.
- **Todo lo que escribes condiciona la respuesta.** Tu prompt es el texto inicial sobre el que se calculan las probabilidades. Un prompt vago deja muchas continuaciones igual de probables, y el modelo elige las más "promedio". Un prompt específico concentra la probabilidad en las continuaciones que tú quieres. Esta es la razón de fondo por la que la Unidad 2 existe.
- **"Probable" no es lo mismo que "verdadero".** El modelo produce lo que *suena* como una buena continuación según los textos que vio. La mayoría de las veces, lo que suena correcto es correcto. A veces no.

## 4. De dónde sale el "conocimiento": entrenamiento en dos fases

### Fase 1: preentrenamiento

Al modelo se le muestran cantidades enormes de texto (páginas web, libros, código, artículos) con un único objetivo: predecir el siguiente token. Cada vez que se equivoca, sus parámetros se ajustan un poco para equivocarse menos. Tras billones de tokens de práctica, el modelo ha absorbido gramática, estilos, hechos frecuentes, patrones de razonamiento y también los errores y sesgos presentes en esos textos.

Al terminar esta fase, el modelo sabe *continuar* textos, pero no necesariamente *obedecer* instrucciones. Si le escribes "Escribe un poema sobre el mar", podría continuar con "…es una consigna habitual en talleres literarios", porque eso también es una continuación probable.

### Fase 2: ajuste posterior (instrucciones y preferencias)

Después se entrena al modelo con ejemplos de conversaciones donde alguien pide algo y otra persona responde bien, y con evaluaciones humanas que indican qué respuesta es mejor entre varias. Esta fase es la que convierte un "continuador de texto" en un asistente que sigue instrucciones, adopta un tono útil y rechaza ciertas peticiones.

### La fecha de corte

El preentrenamiento usa textos hasta cierta fecha (la **fecha de corte** del modelo). Lo que pasó después, el modelo no lo sabe, salvo que el producto le dé acceso a búsqueda web o tú le pegues la información. Por eso:

- Preguntar "¿cuál es la última versión de X?" sin búsqueda activa es arriesgado: te dará la última que conocía.
- Los precios, nombres de productos y versiones de software que el modelo menciona de memoria pueden estar desactualizados. Esta misma advertencia aplica a materiales de estudio: el material original de esta academia incluía una tabla de "modelos disponibles" que quedó obsoleta en meses. En este curso no encontrarás tablas de modelos por esa razón: consulta siempre la página oficial del proveedor.

## 5. Temperatura: por qué el mismo prompt da respuestas distintas

Vuelve a la tabla del café. Si el modelo siempre eligiera el token más probable ("sabor"), sus respuestas serían muy repetitivas y a menudo pobres. Por eso, al elegir, introduce algo de azar controlado. El parámetro que controla cuánto azar se llama **temperatura**:

- **Temperatura baja (cercana a 0):** casi siempre elige el token más probable. Respuestas más predecibles y consistentes. Útil para extraer datos, clasificar, responder con formato fijo.
- **Temperatura alta:** da más oportunidad a tokens menos probables. Respuestas más variadas y "creativas", pero también más propensas a desviarse o equivocarse. Útil para generar ideas.

En las aplicaciones de chat normalmente no controlas la temperatura directamente; el proveedor elige un valor intermedio. En las API sí puedes ajustarla. Lo importante es la consecuencia: **que una respuesta salga bien una vez no garantiza que salga igual la próxima.** Si un prompt va a usarse muchas veces (por ejemplo, en un flujo de trabajo), pruébalo varias veces antes de confiar en él.

## 6. La ventana de contexto: la "memoria de trabajo" del modelo

La **ventana de contexto** es la cantidad máxima de tokens que el modelo puede tener en cuenta a la vez: tus instrucciones, los documentos que pegaste, todos los mensajes anteriores de la conversación y la respuesta que está escribiendo.

Algunas ideas clave:

- **El modelo no tiene memoria entre conversaciones** por sí mismo. Cuando parece que "recuerda", es porque la aplicación guarda información (algunas tienen funciones de memoria) y se la vuelve a incluir en el contexto.
- **Las ventanas han crecido mucho.** Hoy son habituales ventanas de cientos de miles de tokens. Por ejemplo, la página de precios de ChatGPT indicaba en noviembre de 2026 una ventana total de 256 mil tokens en el plan Plus y 400 mil en Pro. Pero estas cifras cambian con frecuencia: verifica la vigente.
- **Que quepa no significa que se use bien.** Un estudio de Liu y colaboradores (*Lost in the Middle*, publicado en 2024 en la revista TACL) mostró que, en textos largos, los modelos aprovechan mejor la información situada al principio o al final del contexto que la que queda en medio. Los modelos han mejorado desde entonces, pero la recomendación práctica sigue vigente: pon las instrucciones importantes al principio o repítelas al final, y no entierres el dato clave en la mitad de un documento enorme.
- **Las conversaciones largas se degradan.** Cuando una conversación es muy extensa, las primeras instrucciones compiten con cientos de mensajes posteriores; además, si se supera la ventana, la aplicación tiene que descartar o resumir partes antiguas. Por eso, a diferencia de lo que afirmaba el material original ("no necesitas resumir conversaciones anteriores en modelos modernos"), **sí conviene** resumir y empezar una conversación nueva cuando el hilo se ha alargado o desviado. Lo verás en detalle en la U3.

### Ejemplo resuelto 2 — Diagnosticar un "olvido"

*Situación:* al principio de una conversación pediste "responde siempre en tono formal y sin emojis". Cuarenta mensajes después, el modelo usa emojis.

*Diagnóstico paso a paso:*
1. ¿Sigue la instrucción dentro de la ventana? Probablemente sí, pero está muy lejos, rodeada de mucho texto posterior.
2. ¿Hay texto posterior que empuje en sentido contrario? Si en los últimos mensajes tú mismo escribiste informalmente o pegaste textos con emojis, la continuación más probable se parece a eso.
3. *Solución:* repetir la instrucción en el mensaje actual, o abrir una conversación nueva con un resumen y la instrucción al principio.

*Lección:* el modelo no "decidió desobedecer"; la probabilidad se desplazó por el contexto acumulado.

## 7. Alucinaciones: por qué el modelo inventa y qué hacer

Se llama **alucinación** a una respuesta que suena segura y bien formada pero es falsa: una cita que nadie dijo, un artículo científico que no existe, una función de una librería que nunca existió, una cifra inventada.

**Por qué ocurre.** Con lo que ya sabes, la explicación es directa: el modelo genera la continuación más plausible. Si le pides "dame tres estudios que demuestren X" y no tiene información fiable, la continuación plausible es… una lista de tres estudios con autores, años y títulos que *suenan* académicos. El modelo no tiene un mecanismo interno infalible que le avise de que no sabe.

**Cuándo es más probable:**
- Datos poco frecuentes (personas o empresas poco conocidas, estadísticas locales, normativa reciente).
- Detalles exactos: números, fechas, citas textuales, URLs, referencias bibliográficas.
- Preguntas que presuponen algo falso ("¿por qué Einstein ganó dos premios Nobel?" invita a justificar algo que no ocurrió).
- Cuando le pides que llene un formato que exige datos que no tiene.

**Qué hacer:**
1. **Verifica todo dato que vayas a usar** frente a una fuente primaria (documentación oficial, el documento original, la página del proveedor). Esta es la regla número uno del curso.
2. **Dale la información en vez de pedírsela.** Si pegas el documento y le pides que responda *solo* con base en él, el riesgo baja mucho.
3. **Dale permiso para no saber.** Incluye en el prompt: "Si no tienes información suficiente, dilo explícitamente en lugar de suponer."
4. **Pide que distinga** entre lo que sale del material que le diste y lo que es inferencia suya.
5. **Usa herramientas con búsqueda y citas** cuando necesites datos actuales, y abre las fuentes citadas: también pueden citarse mal.

## 8. Límites que debes tener presentes desde hoy

- **Privacidad.** Lo que escribes puede almacenarse y, según el plan y la configuración, usarse para mejorar los modelos. Nunca pegues contraseñas, claves de API, datos personales de clientes o información confidencial sin saber qué política aplica a tu cuenta. Las versiones empresariales suelen ofrecer garantías distintas a las gratuitas: compruébalo en la política vigente.
- **Sesgos.** El modelo aprendió de textos humanos, con sus sesgos. Revisa con especial cuidado contenidos sobre personas, grupos, salud, dinero o decisiones que afecten a otros.
- **Responsabilidad.** Si usas un texto generado por IA en tu trabajo, el responsable de su exactitud eres tú, no el modelo.

---

## Errores comunes de esta unidad

| Error | Por qué es un error | Qué hacer |
|---|---|---|
| Usar el chat como buscador de datos exactos | Genera texto plausible, no consulta fuentes (salvo con búsqueda activa) | Verificar en fuente primaria o pegar la fuente |
| Creer que "lo sabe" porque lo dijo con seguridad | El tono seguro no tiene relación con la exactitud | Pedir fuentes y comprobarlas |
| Pensar que una buena respuesta se repetirá | La generación tiene azar (temperatura) | Probar varias veces los prompts que vas a reutilizar |
| Conversaciones eternas con instrucciones del principio | Las instrucciones lejanas pierden peso | Repetir instrucciones o empezar de nuevo con resumen |
| Pegar información confidencial | Puede almacenarse según la política del servicio | Anonimizar o usar planes con garantías adecuadas |

## Resumen

Un modelo de lenguaje es un sistema que, a partir de todo el texto que tiene delante, predice token a token la continuación más plausible. Aprendió esa habilidad leyendo cantidades enormes de texto hasta una fecha de corte y luego fue ajustado para seguir instrucciones. La temperatura introduce variación; la ventana de contexto limita cuánto puede considerar a la vez y no todo lo que cabe se aprovecha igual. Como optimiza plausibilidad y no verdad, puede alucinar: tu trabajo es darle contexto, darle permiso para no saber y verificar.

## Glosario

- **Token:** fragmento de texto con el que trabaja el modelo.
- **Parámetros:** números internos ajustados durante el entrenamiento.
- **Preentrenamiento:** fase en que el modelo aprende a predecir texto.
- **Ajuste posterior:** fase en que aprende a seguir instrucciones y preferencias humanas.
- **Fecha de corte:** límite temporal de los datos de entrenamiento.
- **Temperatura:** parámetro que regula cuánta aleatoriedad hay al elegir el siguiente token.
- **Ventana de contexto:** máximo de tokens que el modelo considera a la vez.
- **Alucinación:** respuesta plausible pero falsa.
