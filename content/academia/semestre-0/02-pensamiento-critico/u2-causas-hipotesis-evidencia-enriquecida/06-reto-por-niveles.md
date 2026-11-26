# 06 · Reto por niveles: "Los pedidos incompletos de Pan de la Esquina"

**Id:** `s0-c2-u2-reto` · **Formato:** reto con datos en 3 niveles de dificultad creciente · **Tiempo:** N1 ≈ 30 min · N2 ≈ 60 min · N3 ≈ 90 min  · **Evaluación:** N1 (corrección automática); N2 y N3 (revisión con rúbrica), con la rúbrica del §5. Soluciones en `claves/06-clave-reto.md`.

**Cómo funciona:** los tres niveles usan el **mismo** caso y suben de *aplicar* a *analizar* y a *crear*. Puedes parar en el nivel 1 (recomendado para todos) o seguir. Los niveles 2 y 3, juntos, son una de las vías para demostrar el dominio (`10-formas-de-demostrar-dominio.md`).

> **Caso ficticio.** La panadería, sus personas y sus cifras son inventadas con fines didácticos.

---

## La situación

*Pan de la Esquina* es una panadería de Querétaro que vende a domicilio por dos canales: su **app** y **WhatsApp**. Sofía, la dueña, está preocupada:

> "Desde hace tres semanas se triplicaron las quejas de pedidos incompletos. Justo entonces contraté a Iván para empacar en el turno de la tarde y agregamos 12 productos nuevos al menú. Creo que Iván no se fija. ¿Lo cambio de puesto?"

**Lo que cambió al inicio de la semana 4:**
1. Iván empieza a empacar en el turno de la tarde.
2. Se añaden 12 productos nuevos al menú, en los dos canales.
3. La app se actualiza: ahora tiene un **botón de un toque** "Mi pedido llegó incompleto". Antes había que escribir a soporte. En WhatsApp nada cambió: la queja se sigue escribiendo a mano.

### Tabla 1. Pedidos y quejas de "incompleto" por canal

| Semana | Pedidos por app | Quejas por app | Pedidos por WhatsApp | Quejas por WhatsApp |
|---|---|---|---|---|
| 1 | 300 | 5 | 300 | 4 |
| 2 | 310 | 5 | 290 | 5 |
| 3 | 305 | 4 | 295 | 4 |
| 4 | 320 | 16 | 300 | 4 |
| 5 | 330 | 17 | 290 | 5 |
| 6 | 325 | 16 | 295 | 4 |

### Tabla 2. Quejas por app en las semanas 4–6, según el turno de empaque

| Turno | Pedidos | Quejas |
|---|---|---|
| Mañana (empaca Rosa, como siempre) | 490 | 25 |
| Tarde (empaca Iván, desde la semana 4) | 485 | 24 |

### Tabla 3. Auditoría de la semana 6
Sofía revisó 50 pedidos al azar de cada canal **antes** de que salieran, sin avisar a nadie.
- App: 2 de 50 incompletos.
- WhatsApp: 2 de 50 incompletos.

### Notas de entrevistas (para el nivel 2)
- **Rosa (mañana):** "Lo que más falta son las bebidas. Las prepara Toño en la barra y las deja al final; si el repartidor ya está esperando, a veces sale el pedido sin la bebida. Siempre ha pasado."
- **Iván (tarde):** "Nadie me explicó un orden. Empaco lo que veo en el ticket."
- **Toño (barra):** "El ticket de bebidas me llega aparte. No sé qué pedido está a punto de salir."
- **Repartidor:** "Yo no reviso; me dan la bolsa cerrada."
- **Sofía:** "En las quejas de la app, la mayoría dice que faltó la bebida. Las de WhatsApp de antes también decían eso, cuando venían."

---

## Nivel 1 · Aplicar (respuesta única, corrección automática)

Redondea los porcentajes a un decimal.

1. **Tasa de quejas de la app:** en las semanas 1–3 y en las semanas 4–6.
2. **Tasa de quejas de WhatsApp:** en las semanas 1–3 y en las semanas 4–6.
3. **¿Cuál de los tres cambios afectó a un solo canal?**
   - a) Iván
   - b) el menú nuevo
   - c) el botón de un toque
4. **Según la tabla 2, la tasa de quejas del turno de Iván es:**
   - a) claramente mayor que la del turno de Rosa
   - b) prácticamente igual
   - c) claramente menor
5. **Según la auditoría, el porcentaje de pedidos incompletos en cada canal es de ___ %.** ¿Por qué hay que tomar esa cifra con cautela? Elige:
   - a) porque 50 pedidos es una muestra pequeña
   - b) porque Sofía avisó antes de auditar
   - c) porque solo se auditó la app
6. **Verdadero o falso:** si el canal WhatsApp tiene un 1,5 % de quejas y la auditoría encuentra un 4 % de pedidos incompletos, en WhatsApp se queja menos gente de la que recibe un pedido incompleto.

## Nivel 2 · Analizar (revisión con rúbrica, 400–600 palabras más tablas)

1. **Hipótesis:** escribe al menos 4, una por cada cambio y al menos una más, con qué dato las refutaría. Usa los datos de las tablas para decir cuáles quedan **descartadas**, cuáles **siguen vivas** y cuáles son **probables**.
2. **¿El botón creó el problema o lo hizo visible?** Explica la diferencia y qué dato de las tablas lo distingue.
3. **Cinco porqués:** a partir de "faltan bebidas en los pedidos", hasta una causa sistémica, usando solo las entrevistas como evidencia. Marca qué "porque" está respaldado y por quién.
4. **Ishikawa:** con al menos 2 causas en al menos 4 categorías.
5. **Responde a Sofía** en una frase: ¿cambias a Iván de puesto? ¿Por qué?

## Nivel 3 · Crear (revisión con rúbrica)

1. **Diseña una prueba** para la solución que propongas (por ejemplo, una lista de cierre de bolsa o que la barra entregue la bebida antes de cerrar). Especifica:
   - la unidad de asignación (¿por pedido, por turno o por día?) y por qué;
   - la métrica principal. *Ojo:* ¿te sirven las quejas como métrica, si los canales reportan distinto?;
   - la duración y cuántos pedidos auditarías;
   - qué resultado te haría abandonar la solución.
2. **Corrige la medición:** propón cómo hacer comparables las quejas de los dos canales a partir de ahora.
3. **Memo a Sofía** de 200–250 palabras, en el formato de la U4 del curso de Escritura (`03-escritura-profesional/u4-propuestas-y-correos/`): conclusión primero, evidencia, recomendación y siguiente paso.

---

## Rúbrica de los niveles 2 y 3 (4 criterios × 4 niveles)

| Criterio | 4 | 3 | 2 | 1 |
|---|---|---|---|---|
| **Hipótesis y descarte** | ≥ 4 hipótesis refutables; descarta cada una con el dato correcto de la tabla | ≥ 4 hipótesis; descarta la mayoría con datos | Hipótesis poco refutables, o descartes sin datos | Una sola explicación |
| **Medición** | Explica que el botón revela un problema que existía, y lo apoya con WhatsApp y con la auditoría | Identifica el cambio de medición, pero no lo apoya con ambos datos | Lo menciona de pasada | No lo detecta |
| **Causa raíz** | Llega a una causa de proceso, con cada "porque" respaldado; no culpa a una persona | Causa de proceso con algún paso sin respaldo | Para en una persona o en "falta de atención" | Sin cadena causal |
| **Prueba y memo** (N3) | Prueba con unidad de asignación justificada, métrica de auditoría y criterio de abandono; memo claro y con la conclusión primero | Le falta un elemento | La prueba usa quejas como métrica, o el memo no tiene conclusión | No hay prueba |

N2 se evalúa sobre los 3 primeros criterios (12 puntos) y N2 + N3 sobre los 4 (16 puntos). Se aprueba con el 60 % (el mismo umbral que el proyecto).
