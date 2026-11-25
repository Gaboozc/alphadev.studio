# Unidad 1 — Definir bien el problema

**Semanas 1–2 · 12 horas**

**Pregunta guía:** ¿Qué problema estoy resolviendo de verdad, y cómo sabré que lo resolví?

**Tiempo por pieza [INFERENCIA; método en `rework/profx/formatos-leccion.md` §0.1]:** Guía ≈ 20 min (1.609 palabras a 120 ppm + 5 min de comprobaciones rápidas) · Ejercicios ≈ 3 h 15 min (3 de nivel 1 × 10 min, 3 de nivel 2 × 25 min, 2 de nivel 3 × 45 min) · Cuestionario ≈ 30 min · Reflexión ≈ 1 h 30 min. **Total efectivo ≈ 5 h 35 min** de las 12 h que planifica el syllabus. Las ≈ 6 h 25 min restantes son estudio autónomo: relectura, apuntes, lecturas de referencia y repaso.

> **Por qué empezar aquí.** La mayoría de los esfuerzos que fracasan no fallan por una mala solución, sino porque resolvieron el problema equivocado. Un equipo que pasa dos semanas rediseñando una página porque "las ventas bajaron" y luego descubre que el problema era un fallo en la pasarela de pago no tuvo un problema de diseño: tuvo un problema de definición. Esta unidad enseña a no saltar a la solución.

## Objetivos

- Distinguir síntoma, problema, causa y solución.
- Redactar un enunciado de problema completo y verificable.
- Hacer las preguntas que aclaran un encargo ambiguo.
- Descomponer un problema en partes manejables sin huecos ni solapamientos.
- Aplicar el método de cuatro pasos de Pólya a problemas de trabajo.

---

## 1. Cuatro palabras que se confunden: síntoma, problema, causa, solución

Considera este mensaje de un cliente a una agencia: *"Necesitamos una campaña en TikTok porque las ventas bajaron."*

En una sola frase hay tres cosas mezcladas:

- **Síntoma:** "las ventas bajaron". Es lo que se observa. Es real, pero no explica nada.
- **Solución propuesta:** "una campaña en TikTok". Es una respuesta que alguien ya eligió.
- **El problema real y su causa:** no aparecen. ¿Bajaron las visitas? ¿Bajó la conversión? ¿Subieron los precios? ¿Apareció un competidor? ¿Se rompió algo técnico?

Definiciones de trabajo para este curso:

| Término | Definición | Ejemplo |
|---|---|---|
| **Síntoma** | Señal observable de que algo no va como se espera | "Las ventas de octubre son 25 % menores que las de septiembre" |
| **Problema** | Brecha entre la situación actual y la deseada, en algo que importa | "La tasa de conversión del sitio cayó de 2,1 % a 1,4 %, y necesitamos volver a ≥ 2 %" |
| **Causa** | Lo que produce la brecha | "El formulario de pago falla en Safari desde la actualización del 3 de octubre" |
| **Solución** | Acción que elimina o reduce la causa | "Corregir la compatibilidad del formulario y probar en los navegadores principales" |

**La trampa de la solución prematura.** Cuando alguien trae una solución ("necesitamos una app", "hay que rediseñar el logo", "contratemos otra persona"), la pregunta profesional no es "¿cómo la hacemos?", sino "¿qué problema resolvería eso y cómo sabemos que es el problema?". No es desconfianza: es tu trabajo. Muchas veces la solución propuesta es correcta; otras, ataca un síntoma.

## 2. El enunciado del problema

Un buen enunciado convierte una queja vaga en algo sobre lo que se puede trabajar. Usa esta estructura:

1. **Situación actual (con dato):** qué está pasando, medido.
2. **Situación deseada (con dato):** qué debería pasar.
3. **Impacto:** por qué importa (dinero, tiempo, clientes, riesgo).
4. **Alcance:** qué incluye y qué no.
5. **Restricciones:** presupuesto, plazos, tecnología, normas.
6. **Criterio de éxito:** cómo sabremos que está resuelto.

### Ejemplo resuelto 1 — De queja a enunciado

*Queja original:* "La web va lentísima, los clientes se quejan."

*Paso 1 — Medir la situación actual.* Se revisa una herramienta de medición de rendimiento: la página de producto tarda en mostrar su contenido principal unos 6 segundos en móviles; en computadora, 2 segundos.
*Paso 2 — Situación deseada.* El equipo acuerda un objetivo: menos de 2,5 segundos en móvil.
*Paso 3 — Impacto.* El 70 % del tráfico es móvil; la tasa de rebote en móvil es el doble que en computadora.
*Paso 4 — Alcance.* Solo páginas de producto y de categoría; el blog queda fuera.
*Paso 5 — Restricciones.* Dos semanas, sin cambiar de plataforma de comercio electrónico.
*Paso 6 — Criterio de éxito.* Tiempo de carga del contenido principal < 2,5 s en móvil en el percentil 75 de visitas reales, medido durante 14 días.

*Enunciado final:* "Las páginas de producto y categoría tardan unos 6 s en mostrar su contenido principal en móvil (70 % de nuestro tráfico), frente al objetivo de < 2,5 s. Esto coincide con una tasa de rebote móvil del doble que en computadora. En dos semanas y sin cambiar de plataforma, queremos llevar ese tiempo por debajo de 2,5 s en el 75 % de las visitas reales durante 14 días seguidos."

Observa lo que *no* dice: no dice la causa ni la solución. Eso viene después (U2).

## 3. Preguntas que aclaran un encargo

Antes de redactar el enunciado, casi siempre hay que preguntar. Estas preguntas sirven en casi cualquier encargo:

- **¿Qué observaste exactamente, cuándo y dónde?** (convierte impresiones en hechos)
- **¿Desde cuándo pasa? ¿Qué cambió en ese momento?** (pista de causas)
- **¿A quién afecta y a quién no?** (acota)
- **¿Cómo sería "resuelto" para ti?** (criterio de éxito)
- **¿Qué ya se intentó y qué pasó?** (evita repetir)
- **¿Qué no podemos cambiar?** (restricciones)
- **¿Qué pasa si no hacemos nada?** (impacto real; a veces la respuesta es "poco", y eso también es información)

Una técnica útil es la **pregunta de contraste**: "¿Dónde *no* ocurre el problema?". Si el formulario falla en Safari pero no en Chrome, o la campaña rinde mal en una ciudad pero no en otra, la diferencia entre ambos casos es una pista enorme.

## 4. Descomponer: dividir sin dejar huecos

Un problema grande es inmanejable; partido en piezas, cada pieza se puede investigar. La clave está en partir bien.

### El árbol de problema

Pon el problema arriba y divídelo en ramas que, juntas, lo explican. Por ejemplo, para "los ingresos de la tienda en línea bajaron 25 %":

```
Ingresos = Visitas × Tasa de conversión × Ticket promedio
├── Visitas
│   ├── Orgánicas (buscadores)
│   ├── Pagadas (anuncios)
│   ├── Redes sociales
│   └── Directas / correo
├── Tasa de conversión
│   ├── Problemas técnicos (errores, lentitud)
│   ├── Oferta (precio, envío, stock)
│   └── Confianza (reseñas, políticas)
└── Ticket promedio
    ├── Mezcla de productos
    └── Descuentos
```

Esta descomposición tiene una virtud: es una **identidad matemática** (ingresos = visitas × conversión × ticket). Si las visitas y el ticket no cambiaron, el problema *tiene que* estar en la conversión. Con un dato descartas dos tercios del árbol.

### MECE: mutuamente excluyente, colectivamente exhaustiva

Una descomposición es buena cuando sus partes:
- **No se solapan** (mutuamente excluyentes): cada caso cae en una sola rama.
- **No dejan huecos** (colectivamente exhaustivas): todo caso cae en alguna rama.

Este principio se popularizó en la consultoría de gestión (se asocia a Barbara Minto y su *principio de la pirámide*). Ejemplo de descomposición **mal hecha** del tráfico: "Google, Instagram, anuncios". Se solapan (Google tiene anuncios e Instagram también) y faltan canales (correo, directo). Mejor: "orgánico de buscadores, pagado (cualquier plataforma), redes sociales orgánicas, correo, directo, referidos".

### Ejemplo resuelto 2 — Descomponer "el equipo entrega tarde"

*Paso 1.* Define la variable: "entregas fuera de plazo en los últimos 3 meses: 7 de 12".
*Paso 2.* Busca una división natural del proceso: un proyecto pasa por *brief → estimación → producción → revisión del cliente → ajustes → entrega*.
*Paso 3.* Para cada entrega tardía, anota en qué etapa se fue el tiempo. Resultado: 5 de 7 se retrasaron en "revisión del cliente → ajustes" (rondas de cambios no previstas).
*Paso 4.* El problema se redefine: "Las rondas de ajustes posteriores a la revisión del cliente superan lo estimado en 5 de cada 7 proyectos tardíos." Mucho más investigable que "entregamos tarde".

## 5. El método de Pólya aplicado al trabajo

El matemático George Pólya propuso en *How to Solve It* (1945) cuatro pasos para resolver problemas. Pensados para matemáticas, sirven sorprendentemente bien en cualquier campo:

1. **Comprender el problema.** ¿Qué se busca? ¿Qué datos hay? ¿Qué condiciones? ¿Puedes reformularlo con tus palabras o dibujarlo? → Lo que hiciste en las §2–4.
2. **Concebir un plan.** ¿Has visto un problema parecido? ¿Puedes resolver una versión más simple o una parte? ¿Puedes trabajar hacia atrás desde el resultado?
3. **Ejecutar el plan.** Paso a paso, comprobando cada uno.
4. **Mirar hacia atrás.** ¿El resultado tiene sentido? ¿Puedes comprobarlo de otra forma? ¿Qué aprendiste que sirva para el próximo problema?

El paso 4 es el que más se salta en el trabajo real ("ya está, siguiente"), y es el que convierte la experiencia en aprendizaje. En este curso lo practicarás con las reflexiones.

### Heurísticas de Pólya que funcionan en el trabajo digital

- **Problema análogo:** "¿Otro cliente tuvo una caída de conversión parecida? ¿Qué fue?"
- **Caso particular:** "¿Pasa con un solo producto? ¿Con un solo navegador?"
- **Trabajar hacia atrás:** "Para lanzar el 1 de marzo, ¿qué tiene que estar listo el 15 de febrero? ¿Y antes?"
- **Quitar una condición:** "Si no hubiera límite de presupuesto, ¿qué haríamos? ¿Qué parte de eso sí podemos hacer?"

---

## Errores comunes

| Error | Ejemplo | Corrección |
|---|---|---|
| Confundir síntoma con problema | "El problema es que bajaron las ventas" | Medir y localizar la brecha |
| Aceptar la solución que trae el cliente | "Hagamos la campaña en TikTok" | Preguntar qué problema resuelve |
| Enunciado sin datos | "La web va lenta" | Situación actual y deseada medidas |
| Descomposición con solapamientos | "Google, Instagram, anuncios" | Revisar MECE |
| Saltarse el paso 4 | Cerrar el caso sin revisar | Comprobar y extraer aprendizajes |

## Resumen

Definir bien un problema es separar síntoma, problema, causa y solución; expresarlo con datos, impacto, alcance, restricciones y criterio de éxito; hacer las preguntas que convierten impresiones en hechos; y dividirlo en partes que no se solapen ni dejen huecos. Pólya ofrece un ciclo simple (comprender, planear, ejecutar, revisar) que estructura todo el curso.
