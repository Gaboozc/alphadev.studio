# Semestre 0 — Tronco común (piloto)

Material de estudio de nivel universitario para el tronco común de la Academia AlphaDev, generado a partir de la auditoría de `alphadev.studio/academia` (repositorio `Gaboozc/alphadev.studio`, `app/academia/content/*.ts`). **No se modificó el sitio, el repositorio ni las bases de datos**: todo vive en esta carpeta como Markdown.

## Estructura

```
semestre-0/
├── README.md                     ← este archivo
├── 01-trabajo-con-ia/            Curso 1 · 10 semanas · 60 h · 4 unidades + proyecto
├── 02-pensamiento-critico/       Curso 2 · 11 semanas · 66 h · 5 unidades + proyecto (curso nuevo)
├── 03-escritura-profesional/     Curso 3 · 10 semanas · 60 h · 4 unidades + proyecto
└── _descartado/                  (vacío: no llegaron a escribirse archivos de "Terminal y Git")
```

Cada curso tiene:
- `00-syllabus.md`: descripción, prerrequisitos, objetivos, plan semanal, horas, evaluación y bibliografía.
- `uN-*/guia.md`: guía de estudio completa (explicación desde cero, ejemplos resueltos paso a paso, errores comunes, resumen).
- `uN-*/ejercicios.md`: ejercicios graduados (nivel 1 automático; niveles 2–3 con corrección humana).
- `uN-*/cuestionario.md`: 10 preguntas de opción múltiple + 3 de respuesta corta.
- `uN-*/reflexion.md`: consigna de reflexión con rúbrica de 4 criterios × 4 niveles (corrección humana).
- `claves/`: soluciones de ejercicios y claves de cuestionarios con explicación de cada respuesta (separadas de los enunciados para poder ocultarlas al estudiante).
- `proyecto-final.md`: brief, entregables, checklist automática (20 %) y rúbrica humana (80 %).
- `uN-*/comprobaciones-rapidas.md`: 3 preguntas sin nota por unidad, para insertar dentro de la guía, con su ubicación. Su clave y feedback están en `claves/uN-clave-comprobaciones.md`. Añadido el 14 nov 2026.
- `checkpoint.md`: checkpoint del curso, con un banco de 28 preguntas de opción múltiple (se sirven 21, 3 por objetivo), mapa de cobertura y caso aplicado con rúbrica. Su clave está en `claves/checkpoint-clave.md`. Añadido el 14 nov 2026.

**Cambios del 14 nov 2026:**
- **Claves rebalanceadas:** las respuestas correctas de los 13 cuestionarios pasaron de a 10 · b 107 · c 12 · d 1 a a 33 · b 32 · c 33 · d 32. Solo cambió el orden de las opciones; los enunciados y las opciones son los mismos. Recomendación para la plataforma: barajar las opciones al mostrarlas y guardar la clave por id de opción, no por letra.
- **Cabeceras de las guías y syllabus:** cada guía y cada syllabus declara ahora la pregunta guía y el tiempo estimado.
- **Extensión de las reflexiones:** todas piden 300–500 palabras (la U4 de S0-C1 pedía 400–600).

### Cómo se corrige
- **Corrección automática:** opción múltiple, respuesta única o checklist estructural.
- **Revisión con rúbrica:** la corrige una persona (o, en el futuro, una IA supervisada) con la rúbrica o la clave de referencia.
- **Evaluación mixta:** combina ambas (proyectos finales).

Pesos comunes a los tres cursos: OM 20 % auto · respuesta corta 10 % humana · ejercicios 20 % mixta · reflexiones 15 % humana · proyecto 35 % mixta. Aprobación: 70 % ponderado y ≥ 60 % en el proyecto.

---

## Curso 1 — Trabajo con IA

| Unidad nueva | Reemplaza a (ids originales) |
|---|---|
| U1 Cómo funciona un LLM | `ia1-l1` |
| U2 Anatomía del prompt | `ia1-l1` (partes), `ia1-l1b`, `prodai-1-1` |
| U3 Técnicas y contexto | `ia1-l2`, `ia1-l2b`, tip de `ia1-l1b`, biblioteca de prompts de `prodai-1-1` |
| U4 La IA como sistema de trabajo | `prodai-1-2`, `prodai-1-3`, partes de `ia-1-proj-basico` |
| Proyecto final "Sistema personal de trabajo con IA" | `ia-1-proj-basico` + `prodai-1-proj-basico` |

**Fusión:** los módulos `ia-1` (rama Inteligencia Artificial) y `prodai-1` (rama Programación) enseñaban lo mismo (anatomía del prompt, roles, few-shot, cadenas, herramientas) con ejemplos distintos. Quedó una sola secuencia.

## Curso 2 — Resolución de problemas y pensamiento crítico (nuevo)

Escrito desde cero por decisión de Gabriel; **no reemplaza ninguna lección existente**.

| Unidad | Contenido |
|---|---|
| U1 Definir el problema | Síntoma/problema/causa/solución, enunciado de 6 elementos, preguntas, árbol y MECE, Pólya |
| U2 Causas, hipótesis y evidencia | Hipótesis refutables, cinco porqués, Ishikawa, correlación vs causalidad, jerarquía de evidencia, pruebas A/B |
| U3 Razonamiento lógico y falacias | Anatomía del argumento, deducción/inducción/abducción, validez vs verdad, 13 falacias frecuentes con ejemplos de agencia |
| U4 Sesgos cognitivos y evaluación de fuentes | Sistemas 1 y 2, Tversky y Kahneman, 7 sesgos con contramedidas, SIFT, lectura lateral, CRAAP, protocolo para salidas de IA |
| U5 Decidir bajo incertidumbre | Probabilidades y tasa base, valor esperado y sensibilidad, decisiones tipo 1/2, matriz ponderada, pre-mortem, registro de decisiones, método integrado |
| Proyecto final | Informe de resolución de un caso (propio o el caso "Estudio Norte") |

### Terminal y Git → Ingeniería de Software, S1
El curso *Terminal y Git* que se había planificado para el tronco común **no se retira**: pasa al **primer semestre de la carrera de Ingeniería de Software**. Lecciones afectadas (módulo `fund-1`, "Línea de comandos, Git y GitHub"): `f1-l1`, `f1-l2`, `f1-l3`, `f1-l4`, `f1-l5`, `f1-l6`, `f1-l7`. Notas para cuando se reescriba: actualizar a `git switch`/`git restore` (Git 2.23, agosto de 2019), rama por defecto `main` (`init.defaultBranch`, Git 2.28; GitHub la usa por defecto desde el 1 de octubre de 2020) y autenticación por token o SSH (GitHub dejó de aceptar contraseñas para operaciones Git el 13 de agosto de 2021).

## Curso 3 — Escritura profesional y persuasiva

| Unidad nueva | Reemplaza a (ids originales) |
|---|---|
| U1 Escribir para que te entiendan | Nuevo (claridad, lectura en pantalla, pirámide invertida, edición). Recoge las ideas de "escribir para el lector" dispersas en `c1-l1` y `c4-l1` |
| U2 Escribir para persuadir | `c1-l1`, `c1-l1b`, `c1-l2`, `c1-l2b`, `c1-l3`, `c1-l3b`, `copy-1-proj-basico` (como ejercicio 3.1) |
| U3 UX writing | `uiux-9-1`; cubre también temas de `uiux-9-2` (microcopy) y `uiux-9-3` (voz y tono) a nivel introductorio |
| U4 Propuestas comerciales y correos | `c4-l1`, `c4-l1b`, `copy-1-proj-inter` (como ejercicio 3.1); cubre el seguimiento de `c4-l2` a nivel introductorio |
| Proyecto final "Kit de comunicación" | `copy-1-proj-basico` + `copy-1-proj-inter`, ampliado con microcopy y propuesta comercial |

**Fusión:** tres ramas (Contenido & SEO, Diseño, Contenido & SEO/copy-4) enseñaban por separado escritura persuasiva, UX writing y propuestas; ahora son un solo curso común con la misma base de claridad.

---

## Lecciones originales que se pueden retirar

Una vez publicado este semestre, estas lecciones quedan cubiertas por completo y pueden retirarse (o redirigirse a la unidad nueva):

| Módulo | Ids | Destino |
|---|---|---|
| `ia-1` Prompting efectivo | `ia1-l1`, `ia1-l1b`, `ia1-l2`, `ia1-l2b`, `ia-1-proj-basico` | Curso 1 |
| `prodai-1` ChatGPT, Claude y Gemini | `prodai-1-1`, `prodai-1-2`, `prodai-1-3`, `prodai-1-proj-basico` | Curso 1 |
| `copy-1` Fundamentos del copywriting | `c1-l1`, `c1-l1b`, `c1-l2`, `c1-l2b`, `c1-l3`, `c1-l3b`, `copy-1-proj-basico`, `copy-1-proj-inter` | Curso 3 |
| `copy-4` (parcial) | `c4-l1`, `c4-l1b` | Curso 3 U4 |
| `uiux-9` (parcial) | `uiux-9-1` | Curso 3 U3 |

**No retirar todavía** (cubiertas solo en parte; deberían pasar a cursos avanzados de su carrera): `uiux-9-2`, `uiux-9-3`, `uiux-9-4` (accesibilidad), `uiux-9-proj`, `c4-l2`, `c4-l2b`, `copy-exam` (el examen mezcla temas de copy-1 a copy-4; habría que rehacerlo).

Total retirable: **20 lecciones** (5 + 4 + 8 + 2 + 1).

**Recordatorio técnico:** el progreso de los estudiantes se guarda en `localStorage` con el id de la lección como clave, y en la auditoría se encontraron 10 ids repetidos entre módulos. Al retirar o redirigir lecciones conviene migrar ese progreso y usar ids únicos en el material nuevo (por ejemplo, `s0-c1-u1`).

---

## Correcciones aplicadas al contenido original

| Original | Problema | Corrección |
|---|---|---|
| Tablas de modelos (Claude Opus 4.8, GPT-4o, etc.) y precios | Desactualizadas | Eliminadas; se enseña a elegir por criterios y a consultar la página oficial |
| "ChatGPT Pro USD 20" | Incorrecto | El plan de unos USD 20 es Plus; Pro es otro nivel |
| ROI "12,5x" (prodai) | Confundía valor/costo con ROI | ROI = (250 − 20)/20 = 11,5 = 1.150 % |
| "No hace falta resumir conversaciones" | Incorrecto (contexto finito, "lost in the middle") | Se enseña gestión de contexto (Liu et al., TACL 2024) |
| "El rol hace que el modelo adopte el conocimiento" | Engañoso | El rol orienta tono y enfoque; no añade conocimiento |
| "Few-shot es el modificador más poderoso" | Exageración | Presentado como técnica útil según el caso |
| Densidad de palabras clave | Práctica obsoleta | Sustituida por intención de búsqueda |
| "127 founders… el 94 % volvió" (c1-l2) | Cifras inventadas presentadas como ejemplo de prueba social | Se usa como contraejemplo; se exige que las cifras sean reales (art. 32 LFPC) y se marcan los ejemplos ficticios |
| "Una página fea con buen copy vende más" (c1-l1) | Afirmación sin estudio que la respalde | Reformulada: diseño y texto trabajan juntos; comprobar con pruebas A/B |
| "Tienes 3 segundos" (c1-l1) | Cifra sin fuente | Eliminada; se usa el dato verificable de NN/g (2008) |
| "Cialdini identificó 7 principios" | Impreciso | 6 en *Influence* (1984); unidad en *Pre-Suasion* (2016) y en la edición ampliada (2021) |
| AIDA sin autoría | — | Atribución habitual a E. St. Elmo Lewis señalada como discutida |
| "Un freelance cuesta $8.000–12.000, 3x más lento" (c4-l1) | Comparación sin fuente usada como ancla | Anclaje con datos del propio cliente y supuestos explícitos |
| "PAS: alta efectividad en B2B" (c1-l3) | Sin fuente | Eliminada; se indica cuándo usarlo según el lector |

## Notas para la corrección humana

- Las claves de respuesta corta y de ejercicios de niveles 2–3 son **referencias**, no respuestas únicas. Se puntúa con la rúbrica.
- Las reflexiones son personales: se evalúa la profundidad del análisis y la aplicación de los conceptos, no las opiniones.
- Si en el futuro se automatiza con IA, conviene que un humano revise una muestra (p. ej., 10 %) y todas las notas cercanas al corte de aprobación.
