# Unidad 3 — Ejercicios graduados

Soluciones en `../claves/u3-soluciones-ejercicios.md`.

## Nivel 1

**1.1 [AUTO]** Relaciona cada situación con la técnica más adecuada (few-shot, paso a paso, cadena de prompts, salida estructurada):
a) Quieres que 200 descripciones de producto sigan exactamente el estilo de tres que ya te gustan.
b) Necesitas pasar los datos de 50 facturas a una hoja de cálculo.
c) Debes decidir entre tres proveedores con criterios de costo, plazo y riesgo.
d) Tienes que producir un informe de 20 páginas con investigación, esquema, redacción y revisión.

**1.2 [AUTO]** ¿Qué problema tiene este conjunto de ejemplos para clasificar sentimiento? Ejemplo 1: "Me encantó" → POSITIVO. Ejemplo 2: "Excelente servicio" → POSITIVO. Ejemplo 3: "Muy recomendable" → POSITIVO. Ejemplo 4: "Llegó tarde" → NEGATIVO.
a) Son demasiado cortos. b) Están desequilibrados hacia POSITIVO. c) Les falta formato JSON. d) No tienen rol.

**1.3 [AUTO]** En un prompt con un documento largo pegado, ¿dónde conviene poner la instrucción principal? (elige la mejor) a) Solo en medio. b) Al principio, y repetida al final. c) Solo al final. d) Da igual.

## Nivel 2

**2.1 [HUMANO]** Diseña un prompt few-shot con 4 ejemplos para convertir notas desordenadas de reunión en "acuerdo – responsable – fecha". Incluye al menos un ejemplo difícil (sin fecha explícita) y explica cómo debe resolverse.

**2.2 [HUMANO]** Escribe un prompt de extracción que devuelva JSON con las claves `nombre`, `correo`, `empresa` y `interes` a partir de mensajes de formularios de contacto. Prúebalo con 3 mensajes inventados, uno al que le falte el correo. Entrega el prompt, los mensajes y las salidas, y señala si el modelo respetó el `null`.

**2.3 [HUMANO]** Toma una tarea compleja de tu área y descomponla en una cadena de 3–5 prompts. Para cada paso indica: objetivo, entrada, salida esperada y qué revisas antes de continuar.

## Nivel 3

**3.1 [HUMANO]** Crea tu biblioteca inicial con 5 prompts reutilizables (todos los campos de la tabla de la §7). Al menos 2 deben usar ejemplos. Prueba cada uno con una tarea real y documenta el resultado.

**3.2 [HUMANO]** Lleva una conversación larga (más de 25 mensajes) sobre un proyecto. Pide el resumen de relevo, corrígelo, ábrelo en un chat nuevo y continúa la tarea. Explica en 150 palabras qué se perdió o se ganó en el traspaso.
