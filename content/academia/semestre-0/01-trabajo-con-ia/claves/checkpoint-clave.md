# Checkpoint del curso — Trabajo con IA · Clave

## Parte A [AUTO]

| # | Objetivo | Unidad | Resp. | Explicación |
|---|---|---|---|---|
| CP-01 | O1 | U1 | **b** | La variación viene del muestreo de tokens (U1 §5). El modelo no aprende entre peticiones ni busca en internet por defecto. |
| CP-02 | O1 | U1 | **a** | Optimiza plausibilidad, no verdad (U1 §7). Una referencia con formato correcto es muy plausible aunque no exista. |
| CP-03 | O1 | U1 | **c** | U1 §2. El precio sí depende de los tokens, pero no es una tarifa fija por consulta. |
| CP-04 | O1 | U1 | **c** | Es el efecto *Lost in the Middle* (Liu et al., 2024), visto en U1 §6 y retomado en U3 §6. |
| CP-05 | O2 | U2 | **d** | Tiene tarea y poco más. El modelo tendrá que adivinar casi todo y elegirá lo genérico (U2 §1–2). |
| CP-06 | O2 | U2 | **d** | La tarea dice qué producir; el objetivo, qué debe pasar después (U2 §2.5). |
| CP-07 | O2 | U2 | **b** | Solo la primera es específica y comprobable (U2 §2.7). |
| CP-08 | O2 | U2 | **c** | Un cambio por vez permite atribuir efectos y construir conocimiento reutilizable (U2 §4). |
| CP-09 | O3 | U3 | **c** | Las categorías propias se muestran mejor que se describen (U3 §1). |
| CP-10 | O3 | U3 | **d** | En tareas simples y directas no aporta (U3 §2, "Cuándo NO hace falta"). |
| CP-11 | O3 | U3 | **c** | La descomposición crea puntos de control; no elimina alucinaciones (U3 §3). |
| CP-12 | O3 | U3 | **d** | Los delimitadores separan instrucciones de material (U3 §4). |
| CP-13 | O4 | U3 | **d** | U3 §6: si el contexto se degrada, resume y empieza de nuevo. |
| CP-14 | O4 | U3 | **a** | U3 §6, "Dónde poner lo importante". |
| CP-15 | O4 | U3 | **d** | Es la plantilla de U3 §6. Además, hay que revisarlo antes de usarlo. |
| CP-16 | O4 | U3 | **b** | Las otras tres son señales para empezar de nuevo (U3 §6). |
| CP-17 | O5 | U2 | **a** | Se puede contar; los demás requieren juicio (U2 §5). |
| CP-18 | O5 | U4 | **b** | Solo una fuente primaria verifica (U1 §7, U4 §4). Dos modelos pueden repetir el mismo error. |
| CP-19 | O5 | U3 | **a** | U3 §5 (prompts para código) y cuestionario U3: lo que no se prueba no se entrega. |
| CP-20 | O5 | U3 | **b** | U3 §7: campo "Probado con" (herramienta y fecha) y re-prueba tras cambios de modelo. |
| CP-21 | O6 | U4 | **b** | La IA da amplitud; la persona da criterio y responde por el entregable (U4 §1–2). |
| CP-22 | O6 | U4 | **c** | (120 − 30) / 30 = 3 = 300 %. El 400 % es el cociente valor/costo (120 / 30), que no es ROI (U4 §5). |
| CP-23 | O6 | U4 | **a** | U4 §5, "Medir, no suponer": la verificación también cuesta tiempo. |
| CP-24 | O6 | U4 | **b** | Es la definición de U4 §1 y del resumen de la unidad. |
| CP-25 | O7 | U4 | **a** | Privacidad primero: permiso y anonimización (U4 §6). |
| CP-26 | O7 | U4 | **a** | La responsabilidad no se delega en la herramienta (U4 §6). |
| CP-27 | O7 | Syllabus | **c** | Política de IA del syllabus: no declararlo cuenta como falta de integridad. |
| CP-28 | O7 | U4 | **d** | U4 §4 (sesgo y tono) y §6: revisa con cuidado lo que afecta a personas. |

## Parte B [HUMANO] — notas para quien corrige

- Corrige con la rúbrica del enunciado. Cada criterio de 0 a 3. Total: 12.
- Se evalúa la aplicación de los métodos del curso, no la opinión. Una respuesta distinta a la esperada puede tener la nota máxima si está bien justificada.
- Si la corrección la hace una IA, una persona revisa una muestra (≥ 10 %) y todas las notas entre 6 y 8 (`plan-revision.md`).
- Respuesta esperada (orientativa): extracción de métricas (persona o exportación) → borrador de interpretación (IA, con los datos delimitados) → verificación de cifras contra la plataforma (persona) → recomendaciones (IA propone, persona decide) → revisión final y envío (persona). Privacidad: no subir datos de clientes sin permiso; usar datos agregados. Medición: tiempo total por cliente, revisión incluida, frente a las 4 h de base.
