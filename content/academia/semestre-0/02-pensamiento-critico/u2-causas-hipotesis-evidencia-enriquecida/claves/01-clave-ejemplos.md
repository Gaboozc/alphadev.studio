# Clave · 01 Ejemplos con desvanecimiento

Las respuestas son **referencias**, no la única respuesta válida. Se aceptan otras alternativas si están bien razonadas. Todas las cifras son ficticias.

## Ejemplo 2: P5 de referencia (Barro y Fuego)
- **Afirmación defendible:** quienes usan el chat compran más, pero 2 de cada 3 conversaciones empiezan **después** de añadir algo al carrito, así que buena parte de la diferencia es intención previa (inversa o selección). Al comparar dentro de cada categoría la brecha baja (11 % frente a 8 % y 4 % frente a 2,5 %), aunque no desaparece. El chat **podría** ayudar algo, pero "triplica la conversión" no está demostrado.
- **Nivel de evidencia:** 3, datos de comportamiento sin asignación aleatoria.
- **Siguiente prueba:** una A/B. Al 50 % de las visitas, elegidas al azar, se les abre el chat automáticamente a los 30 s en las páginas de producto; al otro 50 % se les muestra el botón normal. Métrica principal: conversión por visita. Métricas de control: rebote y tiempo hasta añadir al carrito, porque abrir el chat solo puede molestar.
- **Decisión mientras tanto:** no abrirlo automáticamente en todo el sitio.
- **Respuesta a la 🗨:** el 68 % indica que, en la mayoría de los casos, el chat acompaña una decisión ya tomada. Forzarlo en todas las visitas no crea esa intención.

**Errores típicos:**
- concluir "el chat no sirve", que va demasiado lejos en la dirección contraria;
- proponer comparar solo a quienes usaron el chat en la prueba A/B.

## Ejemplo 3: P4 y P5 (Puerto Digital)

**P4.** Incidentes por despliegue:

| Trimestre | Incidentes / despliegues | Tasa |
|---|---|---|
| Jul–sep | 13/120 | 0,108 |
| Oct–dic | 14/125 | 0,112 |
| Ene–mar | 20/130 | 0,154 |
| Abr–jun | 14/104 | 0,135 |

- **Regresión a la media:** ene–mar fue anormalmente alto, con tres lanzamientos en febrero. Comparado con los trimestres normales (≈ 0,11), abr–jun (0,135) **no es mejor**, es peor.
- **Volumen:** los incidentes bajaron en parte porque hubo menos despliegues (104 frente a 130). El "−30 %" (de 20 a 14) es un total, no una tasa.
- **Confusión:** en los proyectos sin pruebas nuevas, la tasa pasó de 0,15 a 0,13, una mejora pequeña. La contratación de QA afecta a todos los proyectos por igual, así que esta comparación no la aísla.
- **Medición:** la herramienta cambió, pero con los mismos criterios de severidad, así que no hay indicio de sesgo, aunque conviene confirmarlo con una muestra.

**P5.**
- **Afirmación defendible:** el −30 % se explica sobre todo porque se partía de un trimestre anómalo y porque hubo menos despliegues. No hay evidencia de que dejar los viernes haya reducido la tasa de incidentes.
- **Nivel de evidencia:** 2–3, antes/después sin un control adecuado.
- **Siguiente prueba:** registrar el día de la semana de cada despliegue y de cada incidente durante dos trimestres, y comparar las tasas por día. O, si hay varios equipos, alternar la regla entre equipos.
- La regla puede mantenerse por **otros** motivos, como el bienestar del equipo y la disponibilidad el fin de semana, pero no hay que atribuirle este resultado.

## Ejemplo 4: P3, P4 y P5 (Hoja Verde)

**P3.**
- **Tema:** comparar dentro de las publicaciones normales.
- **Casualidad o virales:** comparar las medianas y quitar los valores extremos.
- **Selección:** preguntar al equipo cómo decidía el formato.
- **Medición:** revisar la definición de alcance en el panel de la plataforma.

**P4.**
- La mediana (1.300 frente a 1.100) muestra que la mayoría de los reels rinde parecido a las fotos. El promedio lo inflan 2 virales.
- En las publicaciones normales: 1.250 frente a 1.150, con solo 5 reels.
- Los lanzamientos y descuentos están concentrados en los reels (10 de 15).

**P5.**
- **Afirmación defendible:** el "doble de alcance" se debe a 2 virales y a que los reels se usaron para los mejores temas. A igualdad de tema, la diferencia es pequeña e incierta.
- **Nivel de evidencia:** 3, con una muestra pequeña.
- **Siguiente prueba:** durante 8 semanas, publicar el **mismo tema** en los dos formatos, alternando el orden. O asignar el formato al azar dentro de cada tipo de publicación. Comparar las medianas.
- **Decisión:** no pasar a "solo reels". Mantener la mezcla y registrar el tema de cada publicación.

## Ejemplo 5: solución de referencia (videos opcionales)
- **P1:** *Ver los videos opcionales (A) causa una tasa de aprobación 30 puntos mayor (B).* La propuesta asume que hacerlos obligatorios trasladaría el efecto a todos.
- **P2:**
  - **Selección:** los más motivados o con más tiempo ven más material.
  - **Inversa:** a quien le va bien sigue estudiando; quien va mal abandona y deja de ver videos.
  - **Confusión:** horas disponibles, conocimiento previo, carrera.
  - **Medición:** ¿"ver" un video es abrirlo o terminarlo? ¿Los que abandonan cuentan como "no aprobó"?
  - **Casualidad:** depende del tamaño de la muestra.
- **P3 y P4: datos a pedir y qué cambiaría mi opinión.**
  1. **Nota de la prueba de entrada de cada grupo.** Si los que ven videos ya entraban con más nota, gana la selección.
  2. **Momento en que se ven los videos frente al momento del abandono.** Si los que no ven videos abandonan antes de que existan los videos de la unidad, gana la inversa.
  3. **Tasa de aprobación por horas de dedicación declaradas.** Si la brecha desaparece al igualar las horas, la explicación es la confusión.
  4. **Definición de "ver":** porcentaje de video reproducido.
- **P5:**
  - **Prueba:** asignar al azar a la mitad de los inscritos una invitación destacada a los videos, con recordatorio, y a la otra mitad la presentación actual. Se analiza por asignación y la métrica es la aprobación.
  - **Decisión mientras tanto:** no hacerlos obligatorios, porque aumentaría la carga sin un efecto demostrado. Seguir ofreciéndolos como vía (coherente con `marco-pedagogico.md` §2).
- **Criterio de corrección de los niveles 2 y 3 del curso:** se pide que identifique al menos 3 alternativas, que asocie a cada una un dato que la distinga y una prueba aleatoria que se analice por asignación.
