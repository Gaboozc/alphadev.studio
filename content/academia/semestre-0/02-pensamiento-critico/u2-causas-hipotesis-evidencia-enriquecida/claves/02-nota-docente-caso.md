# Nota docente · Caso Altiplano Café

**Uso:** solo para docentes, mentores o revisores. Todo el caso es ficticio.

## Lo que el caso está diseñado para enseñar
1. **Dos problemas, no uno:** bajan las altas y suben las cancelaciones. Tienen causas distintas.
2. **Un grupo de comparación natural:** la CDMX recibió el aumento de precio, el nuevo empaque y la nueva encuesta, pero **no** el cambio de paquetería.
3. **Un cambio en la medición:** la encuesta pasó de pregunta abierta a una lista con "Precio" en primer lugar.
4. **Anécdotas frente a datos:** los comentarios sirven para generar hipótesis, no para confirmarlas.

## Análisis de referencia

**Cancelaciones**
- **CDMX:** 14,25 por semana en S1–S4 y 14,75 en S5–S12. Prácticamente igual.
- **Resto del país:** 21 por semana en S1–S5. Desde S6 sube a 34, 45, 52 y se estabiliza en torno a 55.
- **El precio** subió en S5 para todos y las cancelaciones no cambiaron en la CDMX ni en el resto del país durante S5 (23 frente a ≈ 21). → El precio **no explica** el aumento de las cancelaciones.
- **El empaque** cambió en S7 para todos, y la CDMX no se movió. → El empaque **no explica** las cancelaciones; a lo sumo, molestias en algunos comentarios.
- **La paquetería** cambió en S6 solo fuera de la CDMX y coincide con el salto. Los días de entrega pasaron de 2,1 a 4,3 y los tickets de "llegó tarde" de 8 a 31 por semana. Hay mecanismo plausible, orden temporal y un grupo de control (la CDMX). → **Es la hipótesis principal de las cancelaciones.**
- **La subida gradual** (34 → 45 → 52 → 55) es coherente con que cada cliente vive su primer retraso en su siguiente envío mensual (está en el diseño del caso; se espera que lo notes y lo plantees como hipótesis).

**Altas**
- **Anuncios:** 37,5 por semana en S1–S4 y 29,5 en S5–S12, un 21 % menos.
- **Orgánicas:** 22,5 por semana en S1–S4 y 18,75 en S5–S12, un 17 % menos.
- **Las orgánicas no dependen del CPM** y aun así bajan desde S5. → El precio probablemente reduce las altas.
- **Los anuncios bajan un poco más que las orgánicas.** → Es compatible con precio más CPM. No se puede separar del todo con estos datos.

**La encuesta**
- No es comparable entre agosto y octubre: cambió el instrumento y además el orden de las opciones.
- El 46 % de "precio" no prueba que el precio sea la causa de las cancelaciones. Además, en las cancelaciones de la CDMX, que no cambiaron, también se marcaría "precio".
- Lo correcto es declararla **no comparable** y, si acaso, volver a una pregunta abierta o rotar el orden de las opciones.

**Saldo de suscriptores** (cuadra con el anexo 1)
- 2.010 + 626 altas − 633 cancelaciones = 2.003.
- Saldo neto semanal: +25 en S1–S4, +13 en S5, +1 en S6 y entre −19 y −24 desde S8.
- El cambio de tendencia es de unos 45 suscriptores por semana. De ellos, unos 30 vienen de las cancelaciones fuera de la CDMX (≈ 21 → ≈ 54) y unos 12 de la caída de las altas (≈ 60 → ≈ 48).
- **Conclusión para la discusión:** la fuga por cancelaciones pesa más del doble que la caída de las altas.

## Recomendación de referencia (hay otras aceptables)
- **No regresar el precio todavía (opción A).** Es la más cara (≈ $80.000 al mes) y la evidencia indica que **no** causa las cancelaciones. Su efecto sobre las altas existe, pero es moderado.
- **Probar la paquetería (D aplicada a B).** Durante 4–6 semanas, asignar al azar la mitad de los códigos postales fuera de la CDMX a Ruta Exprés y la otra mitad a EnvíaYa. Ver más abajo cómo se mide y qué decide.
- **No duplicar los anuncios mientras haya fuga (C).** Traer clientes a un balde con agujeros no arregla el problema. Revisar el CPM con un análisis aparte.
- **Arreglar la encuesta:** pregunta abierta o lista con el orden de las opciones al azar.
- **Uso de los $60.000:** cubrir el sobrecosto de la prueba (≈ $12.600 al mes en la mitad de los envíos) más un incentivo de retención a los clientes con retraso. Guardar el resto hasta tener resultados.

**Métrica y criterio de decisión de la prueba**
- **Métrica principal:** la tasa de cancelación a 30 días por grupo.
- **Métricas secundarias:** días hasta la entrega y tickets.
- **Criterio de refutación:** si la cancelación del grupo Ruta Exprés no baja de forma clara frente al grupo EnvíaYa, la hipótesis de la paquetería pierde fuerza. Habría que mirar el empaque o la interacción entre precio y retraso.

## Errores frecuentes y cómo reconducirlos en la discusión
- **"Es el precio, mira la encuesta."** → Pregunta: "¿Qué pasó con las cancelaciones de la CDMX cuando subió el precio?"
- **"Es todo a la vez."** → Pregunta: "¿Qué semana empieza el salto de cada serie?"
- **"Volvamos a Ruta Exprés y listo."** Es una decisión razonable, pero sin prueba no se aprende. → Pregunta: "¿Qué harías si no baja?"
