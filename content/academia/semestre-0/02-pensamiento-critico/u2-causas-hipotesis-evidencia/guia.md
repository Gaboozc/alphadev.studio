# Unidad 2 — Causas raíz, hipótesis y evidencia

**Semanas 3–4 · 12 horas**

**Pregunta guía:** ¿Por qué ocurre el problema, y qué evidencia distingue la causa de una simple coincidencia?

**Tiempo por pieza [INFERENCIA; método en `rework/profx/formatos-leccion.md` §0.1]:** Guía ≈ 20 min (1.535 palabras a 120 ppm + 5 min de comprobaciones rápidas) · Ejercicios ≈ 3 h 15 min (3 de nivel 1 × 10 min, 3 de nivel 2 × 25 min, 2 de nivel 3 × 45 min) · Cuestionario ≈ 30 min · Reflexión ≈ 1 h 30 min. **Total efectivo ≈ 5 h 35 min** de las 12 h que planifica el syllabus. Las ≈ 6 h 25 min restantes son estudio autónomo: relectura, apuntes, lecturas de referencia y repaso.

> **Idea central.** Con el problema bien definido (U1), la pregunta es *por qué ocurre*. La tentación es quedarse con la primera explicación que suena bien. Esta unidad enseña a generar varias explicaciones, formularlas como hipótesis que se puedan refutar, buscar la causa raíz y no la superficial, y distinguir lo que de verdad causa algo de lo que solo coincide con ello.

## Objetivos

- Formular hipótesis comprobables y diseñar la prueba que podría refutarlas.
- Aplicar los cinco porqués y el diagrama de Ishikawa.
- Distinguir correlación de causalidad e identificar variables de confusión.
- Diseñar comprobaciones simples (comparaciones, pruebas A/B, reproducción controlada).
- Evaluar la calidad de la evidencia disponible.

---

## 1. De la intuición a la hipótesis

Una **hipótesis** es una explicación provisional que puede resultar falsa. Lo que la distingue de una opinión es que puedes decir **qué observarías si fuera falsa**.

- "La campaña no funciona porque el público no conecta con la marca." → ¿Qué observarías si fuera falso? Es difícil decirlo. Es una creencia, no una hipótesis.
- "La campaña rinde peor porque desde el día 12 los anuncios se muestran sobre todo a personas mayores de 55 años, que convierten menos." → Si fuera falso, la distribución por edad no habría cambiado el día 12, o la conversión por edad sería similar. **Comprobable.**

### Reglas para buenas hipótesis

1. **Específica:** nombra el mecanismo y, si puede, el momento.
2. **Refutable:** existe un dato que la contradiría.
3. **Varias a la vez:** genera al menos tres hipótesis antes de investigar ninguna. Si solo tienes una, buscarás pruebas a favor y no verás alternativas (verás este sesgo en la U4).
4. **Priorizadas:** empieza por la más probable *y* más barata de comprobar.

### Ejemplo resuelto 1 — Generar y priorizar hipótesis

*Problema (U1):* "La tasa de conversión del sitio cayó de 2,1 % a 1,4 % desde el 3 de octubre."

| # | Hipótesis | Qué la refutaría | Costo de comprobar | Probabilidad estimada |
|---|---|---|---|---|
| H1 | Un error técnico en el pago desde la actualización del 3 de octubre | Pagos sin errores en todos los navegadores | Bajo (revisar registros y probar) | Alta (coincide la fecha) |
| H2 | Subieron los costos de envío | Costos iguales | Bajo | Media |
| H3 | Cambió la calidad del tráfico (más visitas poco interesadas) | Conversión igual por canal | Medio | Media |
| H4 | Un competidor lanzó una oferta agresiva | Sin cambios en la competencia | Medio | Baja |

Se empieza por H1 y H2: probables y baratas.

## 2. Cinco porqués: bajar del síntoma a la raíz

La técnica de los **cinco porqués** se atribuye a Sakichi Toyoda, fundador de Toyota Industries, y la popularizó Taiichi Ohno como parte del Sistema de Producción Toyota. Consiste en preguntar "¿por qué?" sucesivamente hasta llegar a una causa sobre la que se pueda actuar de forma duradera. "Cinco" es orientativo: a veces bastan tres, a veces se necesitan siete.

### Ejemplo resuelto 2 — Un sitio caído

1. **¿Por qué se cayó el sitio del cliente el viernes?** Porque el servidor se quedó sin espacio en disco.
2. **¿Por qué se quedó sin espacio?** Porque los archivos de registro crecieron sin límite.
3. **¿Por qué crecieron sin límite?** Porque la rotación de registros no estaba configurada en el servidor nuevo.
4. **¿Por qué no estaba configurada?** Porque el servidor se montó a mano y ese paso no estaba en ninguna lista.
5. **¿Por qué se montó a mano sin lista?** Porque no hay un procedimiento documentado para crear servidores.

*Causa raíz:* falta de procedimiento documentado. *Acción duradera:* lista de verificación (o automatización) para crear servidores, que incluya la rotación de registros. Liberar espacio arregla el viernes; el procedimiento evita el próximo viernes.

### Errores al usar los cinco porqués

- **Parar en la persona:** "¿Por qué no se configuró? Porque Juan lo olvidó." Las personas olvidan; la pregunta útil es por qué el sistema permitió que el olvido causara una caída.
- **Una sola cadena:** los problemas reales suelen tener varias causas. Si en un paso hay dos respuestas, abre dos ramas.
- **Inventar respuestas:** cada "porque" debe estar respaldado por evidencia, no por suposición.

## 3. Diagrama de Ishikawa: ver todas las causas posibles

El **diagrama de Ishikawa** (o de "espina de pescado"), asociado al especialista japonés en calidad Kaoru Ishikawa, organiza las posibles causas de un efecto en categorías. En manufactura se usan las "6 M" (máquinas, métodos, materiales, mano de obra, medición, medio ambiente). En trabajo digital funcionan mejor categorías como:

- **Personas:** habilidades, carga de trabajo, comunicación.
- **Procesos:** pasos, aprobaciones, documentación.
- **Herramientas/tecnología:** software, servidores, integraciones.
- **Datos/información:** calidad, disponibilidad, medición.
- **Cliente/entorno:** cambios del cliente, mercado, temporada, plataformas externas.

### Ejemplo resuelto 3 — "Los proyectos web se entregan con errores"

```
Personas ─────────┐  Procesos ─────────┐  Herramientas ─────┐
 sin QA dedicado  │   pruebas al final  │   sin pruebas      │
 prisa al cierre  │   sin lista de      │   automáticas      │
                  │   verificación      │   entornos distintos│
                  ▼                     ▼                    ▼
 ──────────────────────────────────────────────────────► ERRORES EN ENTREGA
                  ▲                     ▲
 Datos ───────────┘  Cliente/entorno ───┘
  contenido llega    cambios de alcance
  tarde              en la última semana
```

El diagrama no dice cuál es la causa: **genera hipótesis** ordenadas. Después se comprueba cada una con datos (por ejemplo, ¿cuántos errores aparecieron en contenido que llegó la última semana?).

## 4. Correlación no es causalidad

Dos cosas que varían juntas (**correlación**) no implican que una cause la otra (**causalidad**). Hay cuatro explicaciones posibles cuando A y B aparecen juntas:

1. **A causa B.**
2. **B causa A** (causalidad inversa). "Los clientes que usan más funciones de la app renuevan más; hagamos que todos usen más funciones." Quizá es al revés: los que ya pensaban renovar exploran más.
3. **Una tercera variable C causa ambas** (variable de confusión). "Los meses con más publicaciones en redes son los de más ventas." Quizá diciembre causa ambas cosas: más campañas y más compras navideñas.
4. **Casualidad.** Con muchos datos, siempre aparecen coincidencias.

### Cómo acercarse a la causalidad

- **Mecanismo plausible:** ¿hay una explicación de *cómo* A produciría B?
- **Orden temporal:** la causa tiene que ocurrir antes del efecto.
- **Comparar con un grupo similar sin la causa:** ¿qué pasó donde A no ocurrió?
- **Experimento controlado:** cambiar A deliberadamente en un grupo y no en otro, asignando al azar, y comparar B. Es la idea de las **pruebas A/B**.
- **Reproducir:** si sospechas de un error técnico, intenta provocarlo a voluntad.

### Ejemplo resuelto 4 — "El nuevo diseño aumentó las ventas"

Se lanzó un nuevo diseño el 1 de noviembre y las ventas de noviembre subieron 18 %.
- *¿Mecanismo?* Plausible (proceso de compra más claro).
- *¿Confusión?* Noviembre incluye temporada de ofertas (por ejemplo, El Buen Fin en México o Black Friday). Las ventas de noviembre del año anterior también subieron 15 % respecto a octubre.
- *Comparación:* el aumento "extra" atribuible al diseño podría ser de unos 3 puntos, no 18, y aun eso es incierto.
- *Mejor diseño de prueba:* mostrar el diseño nuevo a la mitad de las visitas (asignadas al azar) y el antiguo a la otra mitad durante el mismo periodo.

## 5. Calidad de la evidencia

No toda evidencia vale lo mismo. Una jerarquía práctica para el trabajo digital (de más a menos fuerte):

1. **Experimento controlado** con asignación aleatoria y muestra suficiente.
2. **Comparación con grupo similar** sin asignación aleatoria (antes/después con grupo de control).
3. **Datos de comportamiento** (analítica, registros) sin comparación.
4. **Datos declarados** (encuestas, entrevistas): útiles para entender el *porqué*, poco fiables para medir *cuánto*.
5. **Anécdotas y opiniones** ("un cliente me dijo…", "creo que…").

Las anécdotas no son inútiles: sirven para **generar** hipótesis. Lo que no deben hacer es **confirmarlas**.

### Preguntas para evaluar un dato

- ¿Cuántos casos hay? (Un 50 % de mejora con 6 visitas no significa nada.)
- ¿Cómo se midió? ¿Cambió la forma de medir en el periodo? (Un cambio en la configuración de analítica puede crear "caídas" que no existen.)
- ¿Comparado con qué?
- ¿Quién lo produjo y qué interés tiene?

---

## Errores comunes

| Error | Corrección |
|---|---|
| Quedarse con la primera explicación | Generar al menos tres hipótesis |
| Hipótesis irrefutables | Escribir qué dato la contradiría |
| Cinco porqués que acaban en "fue culpa de X" | Preguntar qué permitió el error |
| Confundir coincidencia temporal con causa | Buscar confusión, comparar, experimentar |
| Concluir con muestras pequeñas | Pedir más datos o declarar la incertidumbre |
| Anécdotas como prueba | Usarlas solo para generar hipótesis |

## Resumen

Las causas se buscan con hipótesis específicas y refutables, varias a la vez y priorizadas por probabilidad y costo. Los cinco porqués bajan del síntoma a una causa sobre la que actuar de forma duradera; Ishikawa ayuda a no olvidar categorías de causas. Correlación no es causalidad: busca mecanismo, orden temporal, comparaciones y, si puedes, experimentos. Y juzga la evidencia por su calidad, no por lo convincente que suene.
