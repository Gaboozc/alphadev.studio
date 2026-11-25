# Unidad 1 — Clave del cuestionario

| # | Respuesta | Explicación |
|---|---|---|
| 1 | **c** | El modelo calcula probabilidades para el siguiente token y elige uno; no busca (d), no recupera respuestas guardadas (a) y no planifica la respuesta completa (b). |
| 2 | **c** | 100 tokens ≈ 75 palabras, luego 750 palabras ≈ 1.000 tokens. |
| 3 | **d** | El modelo ve fragmentos (tokens), no letras sueltas; contar caracteres le resulta difícil por esa razón. |
| 4 | **c** | El ajuste posterior convierte al "continuador de texto" en un asistente que sigue instrucciones. No añade hechos recientes (d) ni elimina las alucinaciones (a); la gramática viene del preentrenamiento (b). |
| 5 | **a** | Temperatura baja = se eligen casi siempre los tokens más probables = respuestas más predecibles. |
| 6 | **a** | Es el límite de tokens considerados simultáneamente. La fecha de los datos es la fecha de corte (b). |
| 7 | **d** | El estudio encontró una curva en "U": mejor al principio y al final, peor en medio. |
| 8 | **b** | Las referencias exactas son datos poco frecuentes y precisos, el terreno típico de las alucinaciones. En a, c y d el modelo trabaja sobre un texto que le das. |
| 9 | **b** | El contexto reciente pesa más en las probabilidades; el modelo no "decide" desobedecer. |
| 10 | **a** | Solo una fuente primaria verifica. Preguntar "¿estás segura?" (c) genera otra continuación plausible; dos modelos pueden coincidir en el mismo error (b). |

## Parte B — Criterios de corrección (2 puntos cada una)

**11.** 2 pts si explica que el modelo elige continuaciones que suenan bien según sus datos de entrenamiento y que no comprueba la verdad; menciona que con datos raros la probabilidad se reparte y aparecen respuestas plausibles pero falsas. 1 pt si solo dice "puede equivocarse" sin mecanismo.

**12.** 2 pts con dos razones válidas: instrucciones iniciales pierden peso; se puede superar la ventana y la aplicación descarta o resume; el contexto acumulado arrastra errores o desvíos; empezar con un resumen limpio concentra la atención. 1 pt con una sola razón.

**13.** 2 pts si menciona: la política de datos del servicio/plan (almacenamiento, uso para entrenamiento), la autorización del cliente y la normativa de protección de datos aplicable, y la opción de anonimizar antes de pegar. 1 pt si menciona solo uno de esos puntos.
