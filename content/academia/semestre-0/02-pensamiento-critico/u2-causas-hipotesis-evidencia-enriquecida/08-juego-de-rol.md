# 08 · Juego de rol: el post-mortem del Buen Fin

**Id:** `s0-c2-u2-rol` · **Formato:** simulación con roles (grupo de 4–5) · **Tiempo:** ≈ 75 min  · **Evaluación:** revisión con rúbrica, con la rúbrica de observación del §6. Hay una **versión individual** en el §7 para quien no pueda reunirse.

**Objetivos:**
- *Aplicar* los cinco porqués en una conversación real, con presión y con versiones encontradas.
- *Evaluar* qué afirmaciones tienen evidencia.
- *Llegar* a una causa sistémica sin culpar a una persona.

**Por qué:**
- En educación superior, la simulación tiene un efecto grande sobre las habilidades complejas (g = 0,85 en 145 estudios), y los principiantes se benefician más si va acompañada de ejemplos (Chernikova et al. 2020, https://journals.sagepub.com/doi/full/10.3102/0034654320933544). Por eso este role-play llega **después** de los ejemplos resueltos (01).
- En el trabajo, la causa se busca casi siempre en reuniones, no a solas .

> **Situación ficticia.** La agencia, el cliente, las personas y las cifras son inventadas.

---

## 1. La situación (la leen todos)

- La agencia **Nodo Creativo** mantiene la tienda en línea de **Calzado Bravo**.
- El viernes del Buen Fin, entre las 20:05 y las 21:40, el **pago con tarjeta falló** para la mayoría de los clientes. Calzado Bravo estima que perdió alrededor de $180.000 en ventas.
- El lunes, el cliente exige "saber quién fue". Hoy es martes y hay una reunión post-mortem de 40 minutos.
- **Regla de la reunión: es sin culpables (*blameless*).** Se buscan causas en el sistema, no personas a quienes castigar.

## 2. Roles

Cada persona lee **solo su tarjeta**. Lo que dice tu tarjeta en *Lo que sabes* lo puedes contar si te preguntan bien. Lo que dice *Tu postura inicial* es tu punto de partida; puedes cambiarlo si te convencen con evidencia.

### Tarjeta 1 · Facilitador o facilitadora
- **Tu misión:** llevar la reunión con los cinco porqués hasta una causa sistémica y salir con 2–3 acciones duraderas, cada una con responsable y fecha.
- **Herramientas:**
  - Escribe cada "porque" en un lugar visible.
  - Después de cada respuesta, pregunta "¿cómo lo sabemos?".
  - Si alguien culpa a una persona, pregunta "¿qué permitió que eso causara la caída?".
  - Si hay dos respuestas, abre dos ramas.
- **Lo que sabes:** nada técnico. Tu valor está en las preguntas.

### Tarjeta 2 · Líder de desarrollo (Marco)
- **Tu postura inicial:** "Fue la pasarela de pagos. Se cayó su API. No es culpa nuestra."
- **Lo que sabes** (solo si te preguntan por evidencia):
  - La pasarela **no** reportó incidentes ese día. Lo revisaste en su página de estado, pero no lo has dicho.
  - Los registros muestran errores de "certificado no válido" a partir de las 20:05.
  - El certificado TLS del subdominio de pagos de la tienda se renovaba "automáticamente", pero esa automatización se configuró en el servidor anterior y no se migró cuando cambiaron de servidor en septiembre.

### Tarjeta 3 · Ejecutiva de cuenta (Paula)
- **Tu postura inicial:** "El cliente quiere un nombre. Si no le damos un culpable, lo perdemos. Fue el practicante que hizo la migración."
- **Lo que sabes:** el cliente ya pidió el viernes a las 19:00 subir el tráfico de anuncios un 300 % a las 20:00. Nadie avisó al equipo técnico, pero el tráfico **no** tiene relación con el error del certificado.
- **Lo que te importa:** conservar al cliente. Te convencen las acciones concretas con fecha.

### Tarjeta 4 · Operaciones (Laura)
- **Lo que sabes:**
  - El aviso de que "el certificado vence en 7 días" llegó a un correo de grupo que **nadie revisa** desde que se fue el antiguo administrador.
  - La migración de septiembre usó una lista de verificación que **no** incluía los certificados.
  - Se arregló a las 21:40, cuando un desarrollador renovó el certificado a mano.
- **Tu postura inicial:** prefieres no hablar mucho porque el correo de grupo era "tuyo" en teoría. Responde con honestidad si te preguntan sin acusarte.

### Tarjeta 5 · Observador u observadora (opcional, recomendado)
- No hablas. Llenas la rúbrica del §6 y anotas frases textuales.
- Al final diriges el *debrief*.

## 3. Desarrollo (40 min)

| Min | Qué ocurre |
|---|---|
| 0–5 | El facilitador presenta el objetivo y la regla sin culpables. Cada rol da su postura inicial en una frase. |
| 5–30 | Cinco porqués. El facilitador escribe la cadena. Los demás responden **en su rol**. |
| 30–38 | Acciones: 2–3 acciones duraderas, cada una con su responsable y su fecha. |
| 38–40 | El facilitador lee la cadena y las acciones. ¿Están todos de acuerdo? |

## 4. *Debrief* (25 min, fuera de los roles)

Salgan de los personajes antes de empezar ("ya no soy Marco"). Preguntas:
1. ¿A qué causa raíz llegaron? ¿Cuántos porqués hicieron falta?
2. ¿En qué momento alguien cambió de postura? ¿Qué lo hizo cambiar: un dato, una pregunta o una presión?
3. ¿Hubo algún "porque" sin evidencia que se aceptó? ¿Quién lo notó?
4. ¿Qué hicieron con la petición de Paula de dar un nombre? ¿Qué le dirían al cliente?
5. ¿Qué información estaba repartida entre roles y solo apareció cuando alguien preguntó bien?
6. **Para cada persona:** ¿qué harías distinto en una reunión real?

## 5. Cadena de referencia (solo para el observador o el docente, después de la reunión)

1. ¿Por qué falló el pago? → Porque el certificado TLS del subdominio de pagos venció a las 20:05 (registros de Marco).
2. ¿Por qué venció? → Porque la renovación automática no estaba configurada en el servidor nuevo (Marco).
3. ¿Por qué no estaba configurada? → Porque la lista de verificación de la migración no incluía los certificados (Laura).
4. ¿Por qué nadie se enteró antes? → Porque el aviso de vencimiento llegó a un correo de grupo que nadie revisa (Laura).
5. **Causa sistémica:** no hay un inventario de certificados con un responsable, ni una lista de migración completa, y las alertas van a un buzón sin dueño.

**Ramas que deben descartarse con evidencia:**
- **La pasarela:** no reportó incidentes y los errores son de certificado.
- **El tráfico de anuncios:** la hora coincide, pero el error es de certificado, no de carga. Es un buen ejemplo de **coincidencia temporal**.
- **El practicante:** sería parar en la persona. La lista de verificación que usó no incluía los certificados.

**Acciones duraderas de referencia:**
- inventario de certificados con su responsable y una alerta a un canal que sí se revise;
- añadir los certificados a la lista de migración;
- una prueba de pago automática cada 15 minutos con un aviso al equipo de guardia;
- avisar al equipo técnico de cualquier pico de anuncios planificado. No causó este incidente, pero es un riesgo real.

## 6. Rúbrica de observación (la llena el observador o el docente)

| Criterio | 3 | 2 | 1 |
|---|---|---|---|
| **Cadena causal con evidencia** | Cada "porque" tiene una fuente que se pidió en voz alta | La mayoría | Se aceptan suposiciones |
| **Sin culpables** | La reunión redirige hacia el sistema cada intento de culpar | Lo hace a veces | Termina señalando a una persona |
| **Descarte de coincidencias** | Descartan la pasarela y el tráfico con datos | Descartan una | Aceptan alguna como causa |
| **Acciones duraderas** | 2–3 acciones de sistema, cada una con responsable y fecha | Acciones vagas o sin responsable | Solo "tener más cuidado" |
| **Participación en el rol** (individual) | Defiende su postura y la cambia ante la evidencia | Mantiene el rol, pero no cambia, o cambia sin razón | Sale del rol o no participa |

- Los 4 primeros criterios son la nota del grupo; el 5.º es individual.
- Se aprueba con ≥ 9/15 .

## 7. Versión individual (sin grupo)

Para quien estudia a otro ritmo o no puede coincidir con su grupo:
1. Lee las cinco tarjetas.
2. Escribe el guion de la reunión: al menos 12 intervenciones, con cada rol hablando como en su tarjeta. El facilitador debe hacer las preguntas que destapan la información escondida.
3. Escribe el resumen post-mortem: la cadena causal con la fuente de cada "porque", las ramas descartadas, las acciones y un párrafo para el cliente.
4. **Opcional:** puedes practicar con un asistente de IA que interprete uno de los roles. Pégale su tarjeta y pídele que no revele lo que sabe salvo que se lo preguntes con precisión. Declara el uso según la política de IA del curso. La entrega es **tu** guion y **tu** resumen.
5. **Evaluación:** los mismos criterios 1–4. El 5.º se sustituye por "el guion muestra preguntas que destapan la evidencia".
