# Unidad 5 — Decidir bajo incertidumbre y métodos estructurados

**Semanas 9–10 · 12 horas**

**Pregunta guía:** ¿Cómo decido bien cuando no tengo toda la información?

**Tiempo estimado:** Guía ≈ 20 min (1.613 palabras a 120 ppm + 5 min de comprobaciones rápidas) · Ejercicios ≈ 2 h 40 min (4 de nivel 1 × 10 min, 3 de nivel 2 × 25 min, 1 de nivel 3 × 45 min) · Cuestionario ≈ 30 min · Reflexión ≈ 1 h 30 min. **Total efectivo ≈ 5 h 00 min** de las 12 h que planifica el syllabus. Las ≈ 7 h 00 min restantes son estudio autónomo: relectura, apuntes, lecturas de referencia y repaso.

> **Idea central.** En el trabajo casi nunca decides con información completa. La pregunta no es "¿cómo elimino la incertidumbre?", sino "¿cómo decido bien a pesar de ella?". Esta unidad te da herramientas para estimar probabilidades, comparar opciones, saber cuánto analizar según lo reversible que sea la decisión, anticipar fallos y aprender de tus decisiones. Al final integra todo el curso en un método de resolución de problemas.

## Objetivos

- Expresar creencias como probabilidades y rangos.
- Calcular e interpretar el valor esperado de opciones sencillas.
- Ajustar el esfuerzo de análisis a la reversibilidad e impacto de la decisión.
- Aplicar una matriz de decisión ponderada y un pre-mortem.
- Llevar un registro de decisiones y distinguir la calidad de la decisión del resultado.
- Aplicar un método integrado de resolución de problemas.

---

## 1. Pensar en probabilidades

Decir "seguro que funciona" o "eso no va a pasar" oculta lo que realmente sabes. Es más útil expresar la confianza como porcentaje: "creo que hay un 70 % de probabilidad de que el cliente acepte".

Ventajas:
- Obliga a pensar en lo que podría salir mal (el 30 % restante).
- Permite comparar opiniones en el equipo ("tú dices 70 %, yo 40 %: ¿qué sabes tú que yo no?").
- Permite **calibrarse**: si de todas las cosas que dijiste al 70 % ocurre aproximadamente el 70 %, estás bien calibrado.

Para cantidades, usa **rangos**: "el proyecto tomará entre 4 y 7 semanas (con un 80 % de confianza)" es más honesto y útil que "6 semanas".

### Probabilidad y tasa base
Antes de estimar tu caso particular, empieza por la **tasa base**: ¿con qué frecuencia ocurre esto en general? Si de cada 10 propuestas que envía tu agencia se aceptan 3, empieza en 30 % y ajusta según lo que sepas del cliente (¿te buscó él? ¿hay competencia?). Esto contrarresta la representatividad y el exceso de confianza (U4).

## 2. Valor esperado

El **valor esperado (VE)** de una opción es la suma de cada resultado posible multiplicado por su probabilidad.

> VE = Σ (probabilidad × valor del resultado)

### Ejemplo resuelto 1 — ¿Hacer una propuesta elaborada?

Una licitación ofrece un proyecto de 200.000. Preparar una propuesta elaborada cuesta 15.000 (horas del equipo) y estimas un 20 % de probabilidad de ganar. Una propuesta sencilla cuesta 3.000 y estimas un 8 %.

- Elaborada: VE = 0,20 × 200.000 − 15.000 = 40.000 − 15.000 = **25.000**
- Sencilla: VE = 0,08 × 200.000 − 3.000 = 16.000 − 3.000 = **13.000**
- No presentarse: VE = **0**

La elaborada tiene mayor VE. *(Para simplificar, tratamos 200.000 como el beneficio de ganar; en un caso real usarías el margen, no la facturación.)*

### Límites del valor esperado
- **Las probabilidades son estimaciones:** haz un análisis de sensibilidad. ¿Con qué probabilidad deja de convenir la elaborada? Manteniendo la sencilla en 13.000, la elaborada conviene mientras p × 200.000 − 15.000 > 13.000, es decir, p > 0,14 (14 %). Si no confías en llegar al 14 %, reconsidera.
- **El riesgo de ruina importa:** una opción con VE alto pero con un 10 % de probabilidad de quebrar la empresa no es aceptable. El VE describe el promedio de muchas repeticiones; si no puedes permitirte el peor caso, no basta.
- **No todo se mide en dinero:** reputación, aprendizaje, relación con el cliente. Para eso, la matriz ponderada (§4).

## 3. Reversibilidad: cuánto analizar

No todas las decisiones merecen el mismo análisis. En su carta a los accionistas de 2015, Jeff Bezos (Amazon) distinguió:

- **Decisiones tipo 1 (puertas de un solo sentido):** irreversibles o casi, de alto impacto. Firmar un contrato largo, cambiar de plataforma central, despedir a alguien. Merecen análisis lento y cuidadoso.
- **Decisiones tipo 2 (puertas de doble sentido):** reversibles. Probar un nuevo titular, cambiar un horario de envío, ensayar una herramienta un mes. Conviene decidir rápido, probar y corregir.

El error frecuente es tratar todas las decisiones como tipo 1 (parálisis) o todas como tipo 2 (imprudencia).

| | Bajo impacto | Alto impacto |
|---|---|---|
| **Reversible** | Decide ya | Decide rápido, prueba con un piloto |
| **Irreversible** | Decide con análisis breve | Análisis completo: VE, matriz, pre-mortem, segunda opinión |

**Truco práctico:** muchas decisiones tipo 1 pueden convertirse en tipo 2 con un piloto, un periodo de prueba o un contrato corto.

## 4. Matriz de decisión ponderada

Cuando hay varios criterios que importan de forma distinta:

1. Lista las opciones.
2. Define criterios **antes** de evaluar las opciones (contra el sesgo de confirmación).
3. Asigna un peso a cada criterio (que sumen 100 %).
4. Puntúa cada opción en cada criterio (p. ej., 1–5).
5. Multiplica y suma.
6. **Revisa el resultado críticamente:** si te sorprende o te incomoda, pregúntate qué criterio olvidaste o qué peso está mal. La matriz ordena el pensamiento; no decide por ti.

### Ejemplo resuelto 2 — Elegir herramienta de gestión de proyectos

| Criterio | Peso | Herramienta A | Herramienta B | Herramienta C |
|---|---|---|---|---|
| Costo | 25 % | 4 | 2 | 5 |
| Facilidad de uso | 30 % | 3 | 5 | 2 |
| Integraciones necesarias | 25 % | 5 | 4 | 2 |
| Soporte en español | 20 % | 2 | 4 | 3 |
| **Total** | | **3,55** | **3,80** | **2,95** |

Cálculo de A: 0,25·4 + 0,30·3 + 0,25·5 + 0,20·2 = 1 + 0,9 + 1,25 + 0,4 = **3,55**. B: 0,5 + 1,5 + 1 + 0,8 = **3,80**. C: 1,25 + 0,6 + 0,5 + 0,6 = **2,95**. Haz siempre el cálculo explícito (o en una hoja de cálculo): los totales "a ojo" fallan con frecuencia.

B gana por poco sobre A: diferencia pequeña → conviene un análisis de sensibilidad (¿cambia el ganador si el costo pesa 35 %?) o un piloto de ambas.

## 5. Pre-mortem

Propuesto por Gary Klein (*Harvard Business Review*, septiembre de 2007). Antes de ejecutar una decisión importante:

1. Reúne al equipo y di: "Imaginen que estamos a seis meses y el proyecto **fracasó**. Escriban, cada uno por su cuenta, por qué fracasó."
2. Cada persona lee sus razones; se listan todas.
3. Se priorizan las más probables o graves.
4. Se ajusta el plan: mitigaciones, señales de alerta, criterios de abandono.

Funciona porque da permiso para expresar dudas (que en una reunión de planificación normal parecen falta de compromiso) y porque imaginar que el fracaso ya ocurrió facilita encontrar causas concretas.

### Ejemplo resuelto 3
*Decisión:* lanzar un servicio de mantenimiento mensual de sitios web.
*Razones del pre-mortem:* precio mal calculado (más horas de las previstas); clientes que no ven el valor y cancelan al tercer mes; nadie responsable de vender; dependencia de una sola persona técnica.
*Ajustes:* medir horas reales en un piloto de 3 clientes; informe mensual que muestre lo realizado; responsable comercial designado; documentar procesos para que otra persona pueda cubrir.

## 6. Registro de decisiones: separar decisión y resultado

Una buena decisión puede tener un mal resultado (por azar), y una mala decisión, uno bueno. Juzgar las decisiones solo por sus resultados (lo que Annie Duke llama *resulting* en *Thinking in Bets*, 2018) enseña lecciones equivocadas.

Un **registro de decisiones** guarda, en el momento de decidir:
- Fecha, decisión y alternativas consideradas.
- Información disponible y supuestos clave.
- Probabilidades o expectativas ("espero 20–30 clientes en 3 meses; 60 % de confianza").
- Criterios de revisión y fecha para revisarla.

Al revisar, preguntas: ¿la información era razonable?, ¿los supuestos se cumplieron?, ¿el resultado se debió a la decisión o al azar?, ¿qué haría distinto con lo que sabía entonces?

## 7. Método integrado de resolución de problemas

Este es el método que aplicarás en el proyecto final. Integra las cinco unidades:

1. **Definir (U1):** separa síntomas de problema; escribe el enunciado (situación actual, deseada, brecha, impacto, alcance, restricciones); verifica con el interesado.
2. **Descomponer (U1):** árbol de problemas, MECE.
3. **Diagnosticar (U2):** varias hipótesis refutables; priorízalas; busca evidencia; cinco porqués o Ishikawa para la causa raíz.
4. **Razonar y evaluar (U3–U4):** revisa tus argumentos y los ajenos; vigila tus sesgos; verifica fuentes y salidas de IA.
5. **Generar opciones:** al menos tres, incluida "no hacer nada" como referencia.
6. **Decidir (U5):** clasifica reversibilidad e impacto; usa VE o matriz; pre-mortem si es importante.
7. **Actuar y medir:** plan con responsables, métricas y criterios de éxito y abandono.
8. **Revisar:** registro de decisiones; aprende.

No todos los problemas necesitan los ocho pasos con el mismo detalle: la §3 te dice cuánto invertir.

---

## Errores comunes

| Error | Corrección |
|---|---|
| "Seguro" / "imposible" | Probabilidades y rangos |
| Ignorar la tasa base | Empezar por la frecuencia general |
| Usar VE ignorando el riesgo de ruina | Revisar el peor caso |
| Analizar igual todas las decisiones | Clasificar por reversibilidad e impacto |
| Definir criterios después de ver opciones | Criterios y pesos primero |
| Juzgar decisiones solo por el resultado | Registro de decisiones |

## Resumen

Decidir bien bajo incertidumbre significa expresar creencias como probabilidades, partir de la tasa base, comparar opciones por valor esperado sin ignorar el riesgo de ruina, y ajustar el análisis a la reversibilidad e impacto de cada decisión. La matriz ponderada ordena criterios múltiples, el pre-mortem anticipa fallos y el registro de decisiones permite aprender separando la calidad de la decisión de la suerte. El método integrado reúne todo el curso.
