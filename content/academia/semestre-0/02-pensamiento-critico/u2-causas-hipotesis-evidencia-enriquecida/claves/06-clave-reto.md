# Clave · 06 Reto "Pan de la Esquina"

## Nivel 1
1. **App:** semanas 1–3, 14/915 = **1,5 %**; semanas 4–6, 49/975 = **5,0 %**.
2. **WhatsApp:** semanas 1–3, 13/885 = **1,5 %**; semanas 4–6, 13/885 = **1,5 %**.
3. **c)** El botón de un toque. Iván empaca pedidos de los dos canales y el menú es el mismo en ambos.
4. **b)** Prácticamente igual: 25/490 = 5,1 % frente a 24/485 = 4,9 %.
5. **4 %** (2/50) en cada canal; **a)**, porque 50 pedidos es una muestra pequeña. Con 2 casos de 50, la tasa real podría ser bastante menor o mayor.
6. **Verdadero.** Hay subreporte en WhatsApp: si ~4 % llega incompleto y solo ~1,5 % se queja, unos 6 de cada 10 afectados no reclaman (con la cautela de la muestra).

## Nivel 2: análisis de referencia
- **Iván:** **descartada**. La tasa de su turno es igual a la del turno de Rosa, y en WhatsApp, que también empaca él, no subió nada.
- **Menú nuevo:** **descartada como causa principal**. Afecta a los dos canales, pero WhatsApp no cambió. Podría añadir algo de complejidad, aunque no hay señal de ello.
- **Botón de un toque:** **probable como explicación del aumento de las quejas**. Es el único cambio que afectó a un solo canal, y ese canal es el único que subió.
- **¿Crea o revela?** La auditoría encuentra ~4 % de pedidos incompletos en **los dos** canales, por encima de las quejas de WhatsApp (1,5 %) y cerca de las de la app tras el botón (5,0 %). → El botón **revela** un problema que ya existía; no lo crea. El problema real lleva tiempo ahí ("siempre ha pasado", según Rosa).
- **Hipótesis adicional aceptable:** el repartidor no revisa la bolsa. Sigue viva como factor que contribuye.
- **Cinco porqués** (de referencia):
  1. ¿Por qué faltan bebidas? Porque el pedido sale antes de que llegue la bebida (Rosa).
  2. ¿Por qué sale antes? Porque la bebida se añade al final, en otra estación, y no hay un punto de control antes de cerrar la bolsa (Rosa, Toño).
  3. ¿Por qué no hay punto de control? Porque el ticket de la barra va separado del de empaque y nadie ve el pedido completo (Toño, Iván).
  4. ¿Por qué nadie ve el pedido completo? Porque no hay un procedimiento de empaque ni una lista de cierre (Iván: "nadie me explicó un orden").
  5. **Causa sistémica:** falta un procedimiento de cierre de pedido que integre las dos estaciones.
- **Respuesta a Sofía:** no cambies a Iván de puesto. Su turno tiene la misma tasa que el de Rosa. El problema es el proceso y ya existía antes de que él llegara; ahora simplemente lo vemos.

## Nivel 3: diseño de referencia
- **Solución:** una lista de cierre de bolsa más una regla de "no se cierra sin bebida": la barra entrega con el número de pedido.
- **Asignación:** por **día**, al azar. Por ejemplo, en 3 semanas, 10 días con la lista y 11 sin ella. No se asigna por pedido, porque el mismo personal no puede seguir dos procedimientos a la vez sin contaminarlos. Tampoco por turno, porque se confundiría con la persona.
- **Métrica principal:** el porcentaje de pedidos incompletos en una **auditoría aleatoria**, por ejemplo 15 pedidos al día en cada canal. **No** las quejas, porque los canales reportan distinto.
- **Abandono:** si la tasa de la auditoría en los días con la lista no baja de forma clara frente a los días sin ella; por ejemplo, si la diferencia es menor que la variación entre días.
- **Medición:** añadir en WhatsApp un mensaje automático tras la entrega con la pregunta "¿llegó todo? Sí / No", para igualarlo con el botón de la app.
- **Criterios del memo:** conclusión primero ("el aumento de quejas se debe a que ahora medimos mejor; el problema real ya existía y no es Iván"), evidencia en 3 puntos, recomendación y fecha de revisión.

**Errores típicos:**
- Culpar a Iván porque "coincide la fecha".
- Concluir que "no hay problema, es solo el botón". El problema existe: ~4 % de pedidos incompletos.
- Usar las quejas como métrica de la prueba.
