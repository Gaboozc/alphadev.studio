# 01 · Ejemplos resueltos con desvanecimiento: "¿De verdad A causa B?"

**Id:** `s0-c2-u2-ejemplos` · **Formato:** ejemplo resuelto con desvanecimiento · **Nivel:** básico → intermedio · **Tiempo:** ≈ 40 min  · **Evaluación:** sin nota; soluciones en `claves/01-clave-ejemplos.md`.

**Objetivos (proceso de Anderson y Krathwohl):**
- *Aplicar* un procedimiento de 5 pasos para poner a prueba una afirmación causal.
- *Analizar* qué explicación alternativa encaja con cada dato.
- *Evaluar* qué tan fuerte es la conclusión y cuál es la siguiente prueba.

**Para qué te sirve:** en el trabajo vas a oír a menudo frases como "desde que hicimos X, subió Y". Este procedimiento te deja responder en 10 minutos, con argumentos, si eso prueba algo o no.

**Cómo funciona esta pieza** (Renkl et al. 2002; Chi et al. 1994):
- Vas a ver el mismo procedimiento cinco veces.
- En el ejemplo 1 todos los pasos están resueltos. En cada ejemplo siguiente se quita el **último** paso que quedaba resuelto (desvanecimiento hacia atrás), y en el 5 lo haces todo tú.
- Después de cada paso resuelto hay una **pregunta de autoexplicación** (🗨). Respóndela con tus palabras antes de seguir. Esa pregunta es la parte que más enseña, así que no la saltes.

> **Todas las empresas y cifras de esta pieza son ficticias**, diseñadas para enseñar.

---

## 0. Prueba de entrada (5 min, sin nota)

Responde sin mirar la guía. Si aciertas las 5, puedes saltar a los ejemplos 4 y 5.

1. "Las ciudades con más heladerías tienen más ahogamientos." ¿Cuál es la explicación más probable?
   - a) Los helados causan ahogamientos.
   - b) Una tercera variable, el calor, causa ambas cosas.
   - c) Es casualidad.
2. ¿Qué nombre recibe la explicación "B causa A" cuando alguien afirmó que A causa B?
3. Verdadero o falso: con 10.000 usuarios en la muestra, una correlación ya no puede deberse a una variable de confusión.
4. Ordena de más fuerte a más débil: comparación antes/después sin grupo de control · experimento con asignación aleatoria · testimonio de un cliente.
5. ¿Qué es lo primero que tiene que cumplir una causa respecto del efecto, en el tiempo?

*Respuestas:* 1-b · 2 causalidad inversa · 3 falso: el tamaño de la muestra reduce la casualidad, pero no la confusión · 4 experimento aleatorio > antes/después > testimonio · 5 ocurrir antes del efecto.

---

## El procedimiento de 5 pasos

| Paso | Pregunta que respondes |
|---|---|
| **P1. Enunciar** | ¿Qué se afirma exactamente? Escríbelo como "A causa B", con la métrica y el periodo. |
| **P2. Alternativas** | ¿Qué más podría producir el mismo patrón? Revisa siempre cinco: **causalidad inversa**, **confusión** (una tercera variable), **selección** (quién entra en cada grupo), **casualidad** y **cambio en la medición**. |
| **P3. Dato que distingue** | Para cada alternativa: ¿qué dato vería si fuera cierta, y cuál si fuera falsa? |
| **P4. Contrastar** | Con los datos disponibles: ¿qué alternativas se descartan, cuáles siguen vivas y qué falta? |
| **P5. Concluir** | ¿Qué puedo afirmar, con qué nivel de evidencia (jerarquía de la guía §5) y cuál es la prueba siguiente más barata que decidiría? |

---

## Ejemplo 1: completamente resuelto

**Situación (ficticia).** *Cuadra* es una app de finanzas personales. El equipo de producto presenta este dato:

> "De los 8.000 usuarios que se registraron en septiembre, el 62 % de los que activaron las notificaciones seguía activo a los 30 días, frente al 31 % de los que no las activaron. Propuesta: activar las notificaciones por defecto para todos."

**P1. Enunciar.** *Activar las notificaciones (A) causa una mayor retención a 30 días (B) en los usuarios registrados en septiembre.* La propuesta asume además que, si se fuerza A, B también subirá.

> 🗨 *¿Por qué conviene escribir también la suposición de la propuesta y no solo el dato?*
> Porque el dato describe a quienes **eligieron** activar. La propuesta habla de **obligar** a todos. Son dos afirmaciones distintas, y la segunda es más fuerte.

**P2. Alternativas.**

| Alternativa | Cómo produciría el patrón |
|---|---|
| Causalidad inversa | Los usuarios que ya estaban enganchados son los que activan las notificaciones. |
| Confusión | El canal de adquisición: quien llega por recomendación de un amigo quizá activa más **y** se queda más. |
| Selección | Activar es una elección: la gente motivada se autoselecciona en el grupo "con notificaciones". |
| Casualidad | Con 8.000 usuarios y una diferencia de 31 puntos es improbable, pero se anota. |
| Cambio en la medición | Si "activo" significa "abrió la app", tocar una notificación cuenta como actividad aunque el usuario no use la app de verdad. |

> 🗨 *La causalidad inversa y la selección se parecen. ¿En qué se diferencian aquí?*
> La inversa dice que el compromiso **causa** la activación. La selección dice que los grupos ya eran distintos antes de comparar, sea cual sea la causa. En la práctica se comprueban con datos parecidos: el comportamiento **antes** de activar.

**P3. Dato que distingue.**

| Alternativa | Si fuera cierta, veríamos… | Si fuera falsa, veríamos… |
|---|---|---|
| Inversa / selección | Los que luego activan ya eran más activos en los días 1–3, antes de activar | Actividad parecida en los días 1–3 |
| Confusión por canal | La diferencia desaparece al comparar **dentro** de cada canal | La diferencia se mantiene dentro de cada canal |
| Medición | Con una definición más exigente de "activo" (registró ≥ 1 gasto en la semana 4), la diferencia se achica mucho | La diferencia se mantiene |

> 🗨 *¿Por qué "comparar dentro de cada canal" pone a prueba la confusión?*
> Porque si el canal fuera la causa de ambas cosas, al dejarlo fijo ya no quedaría nada que explicar.

**P4. Contrastar** (datos que el equipo de analítica entregó).

- **Días 1–3:** los que luego activaron registraron en promedio 5,1 gastos; los que no activaron, 2,0. → **La inversa o la selección siguen vivas.** Los grupos eran distintos desde el inicio.
- **Por canal:**

  | Canal | Con notificaciones | Sin notificaciones |
  |---|---|---|
  | Recomendación | 70 % | 45 % |
  | Anuncios | 48 % | 27 % |

  La diferencia **se mantiene dentro** de cada canal. → **El canal no lo explica todo**; la confusión por canal queda descartada como explicación completa.
- **Con la definición exigente de "activo":** 44 % frente a 29 %. → La brecha baja de 31 a 15 puntos. **Una parte era efecto de la medición.**

> 🗨 *Si la brecha baja de 31 a 15 puntos, ¿significa que las notificaciones causan 15 puntos de retención?*
> No. Esos 15 puntos todavía mezclan el posible efecto real con la selección que vimos en los días 1–3.

**P5. Concluir.**
- **Afirmación defendible:** quienes activan las notificaciones retienen más, pero ya eran más activos antes de activarlas, y parte de la diferencia viene de cómo se mide "activo". **No sabemos** cuánto causan las notificaciones.
- **Nivel de evidencia:** 3, datos de comportamiento sin comparación aleatoria.
- **Siguiente prueba:** un experimento. Al 50 % de los nuevos usuarios, elegidos al azar, se les muestra la invitación a activar las notificaciones en el día 1; al otro 50 %, no. Métrica principal: haber registrado ≥ 1 gasto en la semana 4. Se analiza a todos los asignados, activen o no.
- **Decisión mientras tanto:** no activarlas por defecto, porque tiene un riesgo de molestia y de desinstalación que tampoco hemos medido.

> 🗨 *¿Por qué se analiza a todos los asignados y no solo a los que activaron?*
> Porque comparar solo a los que activaron reintroduciría la autoselección que queremos eliminar.

---

## Ejemplo 2: falta el P5

**Situación (ficticia).** En la tienda en línea *Barro y Fuego* (cerámica), el informe mensual dice:

> "Los visitantes que usaron el chat compraron en el 9 % de las visitas; los que no lo usaron, en el 3 %. El chat triplica la conversión. Propuesta: abrir el chat automáticamente en todas las páginas."

**P1.** *Usar el chat (A) causa una conversión por visita 3 veces mayor (B).* La propuesta asume que abrirlo automáticamente producirá el mismo efecto.

**P2.**
- **Inversa:** quien ya decidió comprar abre el chat para preguntar por el envío o por las tallas.
- **Selección:** los visitantes con intención de compra usan más el chat.
- **Confusión:** la página de producto. El chat se usa sobre todo en las piezas caras y personalizadas, que tienen otra tasa de compra.
- **Casualidad:** depende del volumen; hubo 1.200 visitas con chat.
- **Medición:** ¿se cuenta como "usar el chat" el mensaje automático de bienvenida?

> 🗨 *¿Qué alternativa te parece más probable aquí y por qué?*

**P3.**
- **Inversa / selección:** mirar en qué momento de la visita se abre el chat. Si suele abrirse **después** de añadir al carrito, apoya la inversa.
- **Confusión:** comparar dentro de la misma categoría de producto.
- **Medición:** revisar si el mensaje automático cuenta como uso.

**P4.**
- El 68 % de las conversaciones empezó **después** de añadir algo al carrito. → La inversa o la selección son muy plausibles.
- **Dentro de las piezas personalizadas:** 11 % con chat y 8 % sin chat. **Dentro de las piezas estándar:** 4 % con chat y 2,5 % sin chat. → La brecha se reduce mucho al comparar dentro de cada categoría, aunque no desaparece.
- El mensaje automático **no** cuenta como uso. → El problema de medición queda descartado.

**P5. Tu turno.** Escribe la afirmación defendible, el nivel de evidencia, la siguiente prueba (con su métrica y su asignación) y la decisión mientras tanto.

> 🗨 *Antes de escribir: ¿qué te dice el 68 % sobre la propuesta de abrir el chat automáticamente?*

---

## Ejemplo 3: faltan el P4 y el P5

**Situación (ficticia).** La agencia *Puerto Digital* dice en su informe trimestral:

> "Desde que en marzo dejamos de desplegar a producción los viernes, los incidentes en producción bajaron un 30 %."

**P1.** *Dejar de desplegar los viernes (A) causó una reducción del 30 % en los incidentes (B), comparando el trimestre abril–junio con enero–marzo.*

**P2.**
- **Confusión:** en marzo también se contrató a una persona de QA, y en abril entraron las pruebas automáticas en dos proyectos.
- **Casualidad o regresión a la media:** enero–marzo pudo ser un trimestre anormalmente malo.
- **Medición:** en abril cambió la herramienta de registro de incidentes.
- **Volumen:** si se desplegó menos en total, habría menos incidentes aunque cada despliegue fuera igual de arriesgado.
- **Inversa:** no aplica de forma obvia; se anota y se descarta.

**P3.**
- **Confusión:** comparar los proyectos **sin** pruebas automáticas nuevas.
- **Regresión:** mirar los trimestres anteriores; ¿enero–marzo estuvo por encima de lo habitual?
- **Medición:** ¿cambió el criterio de qué cuenta como incidente?
- **Volumen:** calcular los incidentes **por despliegue**, no los totales.

**Datos disponibles (para tu P4):**

| Trimestre | Despliegues | Incidentes | Notas |
|---|---|---|---|
| Jul–sep (año anterior) | 120 | 13 | — |
| Oct–dic (año anterior) | 125 | 14 | — |
| Ene–mar | 130 | 20 | Tres proyectos nuevos se lanzaron en febrero |
| Abr–jun | 104 | 14 | Sin viernes; QA desde el 15 de marzo; pruebas automáticas en 2 de 6 proyectos; herramienta nueva desde el 1 de abril, con los mismos criterios de severidad |

- En los 4 proyectos sin pruebas automáticas nuevas, los incidentes por despliegue fueron 0,15 en ene–mar y 0,13 en abr–jun.

**P4 y P5. Tu turno.**

> 🗨 *Pista: calcula los incidentes por despliegue de cada trimestre antes de opinar.*

---

## Ejemplo 4: solo el P1 y el P2 resueltos

**Situación (ficticia).** La community manager de *Hoja Verde* (vivero) dice:

> "Los reels tienen el doble de alcance que las fotos. Hay que publicar solo reels."

**P1.** *Publicar en formato reel (A) causa el doble de alcance por publicación (B), según las 40 publicaciones de los últimos 3 meses.*

**P2.**
- **Confusión por tema:** los reels se usaron sobre todo para los lanzamientos y los descuentos, que interesan más.
- **Selección:** se hacían en reel solo las ideas que el equipo consideraba más fuertes.
- **Casualidad:** con 40 publicaciones, un par de virales mueven mucho el promedio.
- **Medición:** el alcance de reels y de fotos ¿se mide igual en el panel?
- **Inversa:** no aplica.

**Datos disponibles:**
- 15 reels y 25 fotos.
- **Alcance promedio:** reels 2.400 y fotos 1.200. **Mediana:** reels 1.300 y fotos 1.100.
- 2 reels superaron los 9.000 de alcance; ninguna foto superó los 3.000.
- **Publicaciones de lanzamiento o descuento:** 10 de los 15 reels y 3 de las 25 fotos.
- **Solo en publicaciones "normales"** (ni lanzamiento ni descuento), alcance promedio: reels 1.250 (5 publicaciones) y fotos 1.150 (22 publicaciones).

**P3, P4 y P5. Tu turno.**

> 🗨 *Pista: ¿por qué el promedio y la mediana cuentan historias tan distintas?*

---

## Ejemplo 5: resuélvelo entero

**Situación (ficticia).** Un informe interno de una academia en línea dice:

> "Los estudiantes que ven los videos opcionales aprueban el curso en el 85 % de los casos; los que no los ven, en el 55 %. Hagamos los videos obligatorios."

Aplica los 5 pasos. Para el P4, decide **qué datos pedirías** (al menos 3) y qué resultado de cada uno te haría cambiar de opinión, porque aquí no te damos datos. En el P5, diseña la prueba siguiente.

> 🗨 *Al terminar: ¿en qué paso dudaste más? Anótalo; lo usarás en la reflexión de la unidad.*

---

## Cierre: conexión con lo que viene

En la U3 vas a ver que "desde que hicimos X, subió Y" tiene nombre de falacia: *post hoc, ergo propter hoc*. En la U4 verás por qué tu cerebro acepta esa frase sin protestar (sesgo de confirmación). El procedimiento de 5 pasos es la contramedida práctica de las dos cosas.
