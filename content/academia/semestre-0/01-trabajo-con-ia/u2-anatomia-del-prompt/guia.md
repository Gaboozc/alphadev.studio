# Unidad 2 — Anatomía de un prompt profesional

**Semanas 3–4 · 12 horas · Reemplaza:** ia1-l1 (sección "el modelo lee tu prompt…" y "el problema del prompt genérico"), ia1-l1b, prodai-1-1 (anatomía del prompt y usos)

**Pregunta guía:** ¿Qué tiene que decir una instrucción para que la IA no tenga que adivinar lo que necesitas?

**Tiempo por pieza [INFERENCIA; método en `rework/profx/formatos-leccion.md` §0.1]:** Guía ≈ 25 min (2.234 palabras a 120 ppm + 5 min de comprobaciones rápidas) · Ejercicios ≈ 3 h 15 min (3 de nivel 1 × 10 min, 3 de nivel 2 × 25 min, 2 de nivel 3 × 45 min) · Cuestionario ≈ 30 min · Reflexión ≈ 1 h 30 min. **Total efectivo ≈ 5 h 40 min** de las 12 h que planifica el syllabus. Las ≈ 6 h 20 min restantes son estudio autónomo: relectura, apuntes, lecturas de referencia y repaso.

> **Idea central.** En la Unidad 1 viste que el modelo continúa el texto que le das y que, ante un texto vago, elige continuaciones "promedio". Un prompt profesional es, simplemente, un texto inicial que deja muy poco espacio a lo promedio: dice quién habla, para quién, qué se necesita, con qué límites y en qué forma. Esta unidad te da una estructura para hacerlo siempre, y un método para mejorar un prompt cuando el resultado no convence.

## Objetivos de la unidad

- Identificar y redactar los siete componentes de un prompt profesional.
- Explicar qué aporta cada componente en términos de cómo funciona el modelo.
- Aplicar un método de iteración controlada (un cambio por vez) y documentar resultados.
- Evaluar una respuesta con criterios explícitos antes de aceptarla.

---

## 1. Por qué un prompt corto suele dar un resultado mediocre

Compara dos peticiones:

> **A.** "Escribe un texto para la web de mi empresa de software."

> **B.** "Eres redactor publicitario especializado en empresas de software que venden a otras empresas. Escribe el texto principal (titular y subtítulo) de la página de inicio de Inventa, un programa para que restaurantes controlen su inventario desde el celular. Público: dueños de restaurantes de 35 a 55 años, sin formación técnica, cansados de llevar el inventario en papel. Objetivo de la página: que pidan una demostración gratuita. Tono: cercano y directo. Límites: titular de máximo 8 palabras y subtítulo de máximo 15; sin tecnicismos; habla del resultado (ahorro de tiempo y menos desperdicio), no de la tecnología. Entrégame 5 opciones en el formato `Titular | Subtítulo`."

Con A, el modelo tiene que adivinar casi todo: qué empresa, qué producto, para quién, qué largo, qué tono. Ante tanta incertidumbre, la continuación más probable es un texto genérico ("Soluciones innovadoras para tu negocio"), porque eso es lo que más aparece en textos de este tipo. Con B, cada frase elimina opciones y concentra la probabilidad en lo que necesitas.

Esto no significa que los prompts largos sean mejores por ser largos. Un prompt de 300 palabras confuso es peor que uno de 60 palabras claro. La longitud viene de **incluir la información necesaria**, no de rellenar.

## 2. Los siete componentes

Esta estructura unifica las versiones que aparecían en dos lecciones del material original (una con cinco elementos y otra con seis). No todos los prompts necesitan los siete; pero repasarlos evita olvidar lo importante.

### 2.1 Rol — quién "habla"

Indicas desde qué perspectiva debe responder: "Eres editor de una revista de negocios", "Actúa como profesor de matemáticas de secundaria".

**Qué aporta realmente.** El rol orienta el vocabulario, el nivel de detalle, el tono y qué aspectos prioriza la respuesta, porque activa los patrones de los textos escritos desde esa perspectiva. **Lo que no hace** es darle al modelo conocimientos que no tiene: "Eres un abogado con 20 años de experiencia" no convierte una respuesta legal en asesoría fiable. El material original afirmaba que "el modelo adopta el conocimiento del rol"; es más preciso decir que adopta el *estilo y el enfoque*.

**Buena práctica:** un rol específico y útil para la tarea ("revisor de contratos que busca cláusulas ambiguas") es mejor que uno grandilocuente ("el mejor experto del mundo").

### 2.2 Contexto — la situación

Lo que el modelo necesita saber para no adivinar: quién eres, qué proyecto es, qué se ha hecho ya, qué restricciones del mundo real existen. "Trabajo en una agencia pequeña; el cliente es una panadería de barrio que abrió hace un año y vende sobre todo por WhatsApp."

**Error típico:** suponer que el modelo sabe cosas que solo tú sabes ("el cliente de siempre", "como la vez pasada").

### 2.3 Tarea — qué hay que producir

Un verbo concreto y un entregable claro: "Escribe", "Clasifica", "Resume en", "Compara", "Detecta errores en". Evita verbos vagos como "ayúdame con" o "mira esto".

Si la tarea tiene varias partes, enuméralas. Si son muy distintas entre sí, considera dividirlas en varios prompts (U3).

### 2.4 Audiencia — para quién es el resultado

No es lo mismo explicar un concepto a un director financiero que a un estudiante de 15 años. Describir la audiencia (edad aproximada, nivel de conocimiento, qué le preocupa, qué sabe ya) cambia el vocabulario, los ejemplos y la profundidad.

### 2.5 Objetivo o propósito — para qué sirve

¿Qué debe pasar después de que alguien lea el resultado? ¿Que pida una demo, que entienda un riesgo, que apruebe un presupuesto? Un objetivo explícito ayuda al modelo a decidir qué incluir y qué omitir.

### 2.6 Restricciones — los límites

Longitud ("máximo 120 palabras"), qué evitar ("sin tecnicismos", "no inventes datos"), qué es obligatorio ("menciona el precio"), estilo ("frases cortas", "voseo", "español neutro").

**Dos consejos:**
- Prefiere decir **qué hacer** antes que solo qué no hacer. "Usa frases de menos de 20 palabras" funciona mejor que "no escribas frases largas".
- Las prohibiciones específicas sí ayudan cuando hay clichés que quieres eliminar: "No uses las expresiones *soluciones innovadoras* ni *transformación digital*."

### 2.7 Formato de salida — cómo entregarlo

Lista, tabla, JSON, número de opciones, encabezados, separador. "Dame 5 opciones en formato `Titular | Subtítulo`", "Responde con una tabla de tres columnas: riesgo, probabilidad, mitigación".

El formato no es un detalle estético: facilita comparar, copiar a otra herramienta y comprobar automáticamente si la respuesta cumple.

### Y un octavo, opcional pero poderoso: ejemplos

Mostrar uno o varios ejemplos del resultado deseado es, a menudo, lo que más mejora la calidad. Lo estudiarás a fondo en la U3 (técnica *few-shot*). Por ahora, recuerda que existe.

### Plantilla de trabajo

```
ROL: Eres [perspectiva específica].
CONTEXTO: [situación, proyecto, antecedentes relevantes].
TAREA: [verbo + entregable; si hay partes, enuméralas].
AUDIENCIA: [quién lo leerá, qué sabe, qué le preocupa].
OBJETIVO: [qué debe pasar después].
RESTRICCIONES: [longitud, tono, obligatorio, prohibido].
FORMATO: [estructura exacta de la respuesta].
(EJEMPLOS: [uno o más ejemplos del resultado deseado].)
```

No hace falta escribir las etiquetas en mayúsculas; puedes redactarlo en prosa. Pero mientras aprendes, usarlas te obliga a no olvidar nada.

## 3. Ejemplo resuelto 1 — Construir un prompt paso a paso

*Necesidad:* una agencia pequeña quiere un correo para recuperar clientes que no compran desde hace seis meses en una tienda de plantas en línea.

**Paso 0 — Prompt inicial (como lo escribiría casi todo el mundo):**
"Escribe un correo para clientes que no compran hace tiempo."

**Paso 1 — Rol.** ¿Quién escribiría bien esto? Alguien especializado en correos de comercio electrónico.
"Eres especialista en email marketing para tiendas en línea pequeñas."

**Paso 2 — Contexto.** ¿Qué necesita saber?
"La tienda es Raíz, vende plantas de interior en Ciudad de México con envío a domicilio. Tiene unos 2.000 clientes; 400 no compran desde hace más de seis meses."

**Paso 3 — Tarea.**
"Escribe un correo de reactivación para esos 400 clientes."

**Paso 4 — Audiencia.**
"Son personas de 25 a 45 años que compraron una o dos plantas; muchos compraron como regalo."

**Paso 5 — Objetivo.**
"Que vuelvan a visitar la tienda y usen un cupón de 15 % válido por 10 días."

**Paso 6 — Restricciones.**
"Tono cálido, sin presión. Máximo 120 palabras de cuerpo. Menciona el cupón REGRESA15 y la fecha límite. No uses signos de exclamación más de una vez. No inventes testimonios."

**Paso 7 — Formato.**
"Entrega: 3 opciones de asunto (máximo 45 caracteres), una línea de vista previa y el cuerpo del correo."

**Prompt final (en prosa):**

> Eres especialista en email marketing para tiendas en línea pequeñas. La tienda es Raíz, vende plantas de interior en Ciudad de México con envío a domicilio; de sus 2.000 clientes, 400 no compran desde hace más de seis meses. Escribe un correo de reactivación para ellos. Son personas de 25 a 45 años que compraron una o dos plantas, muchas veces como regalo. El objetivo es que vuelvan a la tienda y usen el cupón REGRESA15 (15 % de descuento, válido 10 días). Tono cálido y sin presión, cuerpo de máximo 120 palabras, como mucho un signo de exclamación y sin testimonios inventados. Entrega 3 opciones de asunto (máximo 45 caracteres), una línea de vista previa y el cuerpo.

Observa que cada paso respondió una pregunta que el modelo, de otro modo, habría contestado al azar.

## 4. Iterar con método: un cambio por vez

Rara vez el primer prompt es el definitivo. La diferencia entre un aficionado y un profesional está en **cómo** mejora: el aficionado cambia cinco cosas a la vez y no sabe cuál funcionó; el profesional cambia una, mira el resultado y anota.

### El ciclo de iteración

1. **Define qué es "bueno"** antes de mirar el resultado (ver §5). Si no, juzgarás por impresión.
2. **Ejecuta** el prompt y guarda la respuesta.
3. **Diagnostica** el problema principal: ¿falta información? ¿tono equivocado? ¿formato? ¿largo?
4. **Cambia una sola cosa** que ataque ese problema.
5. **Vuelve a ejecutar**, compara y anota el resultado.
6. Repite hasta cumplir los criterios. Si después de varias vueltas no mejora, replantea la tarea (quizá hay que dividirla).

### Tabla de diagnóstico rápido

| Síntoma en la respuesta | Componente que probablemente falta o falla |
|---|---|
| Texto genérico, intercambiable con cualquier empresa | Contexto |
| Tono inadecuado (demasiado formal, demasiado vendedor) | Rol, audiencia o restricciones de tono |
| Demasiado largo o corto | Restricciones de longitud |
| Difícil de usar o comparar | Formato de salida |
| Incluye cosas irrelevantes | Objetivo poco claro |
| Datos inventados | Falta "no inventes" + falta aportar los datos |
| Correcto pero sin la "voz" que buscas | Ejemplos (U3) |

### Ejemplo resuelto 2 — Una iteración documentada

| Versión | Cambio | Resultado observado |
|---|---|---|
| v1 | Prompt inicial de una línea | Correo genérico de 250 palabras, con tres exclamaciones y un descuento inventado del 20 % |
| v2 | + contexto (tienda, clientes, cupón real) | Ya menciona REGRESA15, pero sigue largo y vendedor |
| v3 | + restricción de 120 palabras y tono sin presión | Largo correcto, tono mejor; asuntos de 60–70 caracteres |
| v4 | + formato con límite de 45 caracteres en asunto | Cumple todos los criterios |

Esta tabla es exactamente lo que se pide en los ejercicios y en el proyecto: **evidencia** de qué cambio produjo qué efecto.

## 5. Evaluar una respuesta antes de aceptarla

"Me gusta" no es un criterio. Antes de ejecutar, escribe tres a cinco criterios verificables. Para el correo de Raíz:

1. ¿Menciona el cupón correcto y la fecha límite? (sí/no)
2. ¿Cuerpo ≤ 120 palabras? (contable)
3. ¿Asuntos ≤ 45 caracteres? (contable)
4. ¿Cero datos inventados? (comprobable contra el brief)
5. ¿Tono cálido, sin presión? (juicio humano; define qué significa: sin urgencia falsa, sin mayúsculas, sin "¡última oportunidad!")

Los criterios 1–4 se pueden comprobar casi mecánicamente; el 5 requiere criterio. Esta distinción entre lo **verificable** y lo que necesita **juicio** reaparecerá en todo el semestre (y en cómo se califica este curso).

## 6. Usos profesionales donde esta estructura rinde más

El material original listaba cinco usos frecuentes en agencias. Siguen siendo buenos ejemplos de dónde aplicar la anatomía completa:

1. **Primer borrador.** Del brief a varias opciones para elegir y refinar. La IA da amplitud; tú das criterio.
2. **Investigación de audiencia.** "¿Cuáles son las objeciones más comunes de [tipo de cliente] al considerar [servicio]?" Útil como lluvia de ideas; **no** como dato de mercado: valídalo con clientes reales.
3. **Revisión crítica.** "Revisa este correo de ventas como lo leería una directora de marketing que recibe 50 propuestas por semana: ¿qué la haría responder y qué la haría ignorarlo?"
4. **Generación de ideas.** "Dame 20 ideas de contenido para…". Pide cantidad, luego filtra.
5. **Traducción de lo técnico a lo comprensible.** "Explica esta descripción técnica a un dueño de negocio sin formación técnica, en 100 palabras."

Las cifras de ahorro de tiempo que daba el material original ("de 2 horas a 20 minutos") eran ilustrativas, no medidas. En la U4 aprenderás a medir tu propio ahorro.

---

## Errores comunes

| Error | Ejemplo | Corrección |
|---|---|---|
| Rol grandilocuente sin tarea clara | "Eres el mejor marketero del mundo, ayúdame" | Rol específico + verbo + entregable |
| Contexto implícito | "Hazlo como el del cliente anterior" | Pega o describe el ejemplo |
| Restricciones solo negativas | "No lo hagas largo, no seas formal" | "Máximo 100 palabras, tono conversacional" |
| Cambiar muchas cosas a la vez | Reescribir todo el prompt tras cada intento | Un cambio por iteración, documentado |
| Evaluar por intuición | "Me gusta más esta" | Criterios escritos antes de ejecutar |
| Confiar en que el rol aporta conocimiento | "Como médico, ¿qué tomo?" | El rol cambia estilo, no garantiza exactitud |

## Resumen

Un prompt profesional reduce la incertidumbre del modelo con siete componentes: rol, contexto, tarea, audiencia, objetivo, restricciones y formato (más ejemplos cuando hacen falta). Se mejora iterando con un solo cambio por vez y documentando el efecto, y se evalúa con criterios escritos antes de ejecutar, distinguiendo lo verificable de lo que requiere juicio.
