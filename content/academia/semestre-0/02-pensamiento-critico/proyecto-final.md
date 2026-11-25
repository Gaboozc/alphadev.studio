# Proyecto final — Informe de resolución de un caso

**Semana 11 · 35 % de la nota · Evaluación mixta**

## Brief

Aplica el método integrado (U5 §7) a un problema real o realista del trabajo digital y entrega un **informe de resolución** que alguien con autoridad pueda leer y usar para decidir.

Elige una de dos vías:

- **Vía A — Caso propio:** un problema de tu trabajo, de un cliente, de un proyecto personal o de una organización que conozcas (con datos reales o anonimizados).
- **Vía B — Caso proporcionado:** usa el caso de abajo.

### Caso proporcionado: "Estudio Norte"

Estudio Norte es una agencia digital de 9 personas. En los últimos dos trimestres:
- La facturación se mantuvo, pero el margen bajó de 32 % a 18 %.
- Los proyectos web se entregan en promedio con 3 semanas de retraso (antes, 1).
- Dos clientes grandes se quejaron de "demasiadas rondas de cambios".
- Se contrató a dos personas junior y se adoptó una nueva herramienta de gestión.
- El director cree que "el problema es que los junior son lentos" y propone dejar de contratar junior.
- Un asistente de IA consultado por el director afirmó que "las agencias pierden en promedio el 30 % del margen por cambios de alcance" (sin fuente).

Datos adicionales disponibles (puedes suponer valores razonables y declararlos como supuestos): horas registradas por proyecto, número de rondas de cambios por proyecto, propuestas firmadas con o sin alcance detallado, fechas de contratación y de adopción de la herramienta.

## Entregables

1. **Informe (2.500–4.000 palabras)** con estas secciones:
   1. Resumen ejecutivo (máx. 250 palabras): problema, causa más probable, recomendación, nivel de confianza.
   2. Definición del problema: síntomas vs problema; enunciado completo; alcance y restricciones.
   3. Descomposición: árbol de problemas (MECE).
   4. Diagnóstico: ≥ 4 hipótesis refutables, priorización, evidencia a favor y en contra de cada una, análisis de causa raíz (cinco porqués o Ishikawa), correlación vs causalidad.
   5. Evaluación de argumentos y fuentes: análisis de al menos un argumento de los interesados (falacias, supuestos), sesgos posibles (incluidos los tuyos), verificación de al menos una fuente o salida de IA.
   6. Opciones: ≥ 3, incluida "no hacer nada".
   7. Decisión: clasificación por reversibilidad e impacto, matriz ponderada o VE con cálculos explícitos y análisis de sensibilidad, pre-mortem de la opción elegida.
   8. Plan de acción: pasos, responsables, métricas, criterios de éxito y de abandono, fecha de revisión.
   9. Supuestos y limitaciones.
2. **Registro de decisiones** de la decisión recomendada (formato U5 §6).
3. **Anexo de verificación:** tabla de afirmaciones factuales usadas · fuente · estado.

## Evaluación

### Parte automática — checklist (20 %) [AUTO]
Verificable por script o revisión de estructura (sí/no; 2 puntos cada uno):
1. Extensión entre 2.500 y 4.000 palabras.
2. Resumen ejecutivo ≤ 250 palabras.
3. Las nueve secciones presentes con sus títulos.
4. ≥ 4 hipótesis enumeradas.
5. ≥ 3 opciones, una de ellas "no hacer nada".
6. Matriz con pesos que suman 100 % o cálculo de VE presente.
7. Pre-mortem con ≥ 5 causas.
8. Plan con métrica y fecha de revisión.
9. Registro de decisiones con todos los campos.
10. Anexo de verificación con ≥ 3 filas.

### Parte humana — rúbrica (80 %) [HUMANO]

| Criterio (peso) | Excelente (4) | Competente (3) | En desarrollo (2) | Insuficiente (1) |
|---|---|---|---|---|
| **Definición y descomposición (15 %)** | Separa síntomas de problema con precisión; enunciado completo; árbol MECE | Enunciado correcto; árbol con solapamientos menores | Confunde síntoma y problema en parte | Problema mal definido |
| **Diagnóstico y causa raíz (25 %)** | Hipótesis refutables y priorizadas; evidencia en ambos sentidos; causa raíz sistémica; maneja correlación/causalidad | Buenas hipótesis; evidencia mayoritariamente a favor | Pocas hipótesis o mal formuladas | Salta a la solución |
| **Pensamiento crítico (20 %)** | Detecta falacias y supuestos; reconoce sesgos propios; verifica fuentes/IA con rigor | Detecta falacias y verifica una fuente | Análisis superficial | Ausente |
| **Decisión (20 %)** | Cálculos correctos; sensibilidad; reversibilidad considerada; pre-mortem útil que modifica el plan | Matriz/VE correctos sin sensibilidad | Errores de cálculo o criterios a posteriori | Decisión sin método |
| **Plan y comunicación (20 %)** | Plan accionable con métricas y criterios de abandono; redacción clara para quien decide; incertidumbre explícita | Plan claro, métricas parciales | Plan vago | Sin plan |

**Nota del proyecto** = checklist (20 %) + rúbrica ponderada convertida a 80 %. Se requiere ≥ 60 % para aprobar el curso.

**Guía para el evaluador (caso Estudio Norte):** una respuesta sólida no acepta la hipótesis del director sin evidencia (ad hominem/generalización hacia los junior), examina la coincidencia temporal de la herramienta y las contrataciones (confusión), explora el alcance mal definido en propuestas y las rondas de cambio como causa probable, y no usa la cifra del 30 % de la IA sin fuente. No hay una única respuesta correcta: se evalúa el proceso.
