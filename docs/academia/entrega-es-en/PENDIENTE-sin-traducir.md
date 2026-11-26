# Pendiente de traducción y plan (actualizado · 25 nov 2026)

Extracto actualizado de `reorganizacion-final.md` §4–§5. El detalle lección por lección (las 549, con decisión, idioma disponible y ruta) está en `catalogo/lecciones-legado.csv`.

## Ya traducido al inglés (incluido en este paquete)

| Qué | Volumen | Ubicación |
|---|---|---|
| Semestre 0 completo (S0-C1, S0-C2 + U2 enriquecida, S0-C3 reescrito, glosario, claves) | 133 archivos · 81.681 palabras EN | `semestre-0-en/` |
| Lecciones actuales "mantener" (Biblioteca) | 87 lecciones · 51.429 palabras EN (54.110 ES) | `biblioteca-en/` |
| Títulos de curso y títulos de unidad de S0, S1–S6 y optativas | 62 cursos · campos bilingües `units_es` / `units_en` | `docs/catalogo/catalogo-academia.{json,csv}` |

## Lo que queda sin traducir (honesto) y plan

| Qué | Volumen | Plan |
|---|---|---|
| Lecciones "reescribir" | 280 · 118.218 palabras ES | **No traducir la versión vieja.** Se escriben directamente en ES y EN al redactar cada curso nuevo de S1–S6 y optativas. Mientras, se ven en ES con el aviso `"This lesson is only available in Spanish for now"`. |
| Lecciones "fusionar" | 145 · 37.012 palabras ES | Igual que "reescribir": su contenido útil entra redactado en ES y EN dentro del curso nuevo. |
| Lecciones "retirar" | 37 · 8.435 palabras ES | **No se traducen.** Siguen visibles en ES con su etiqueta y enlace a su reemplazo (en S0, ya traducido al EN). |
| Cursos nuevos sin fuente (`IS-104`, `DP-103`, `MK-104`) y fuente parcial (`DP-102`) | 4 cursos | Se redactan directamente en ES + EN. |
| Revisión editorial por nativo (calidad) | `semestre-0-en/` + `biblioteca-en/` | Recomendada antes de comercialización; no bloquea visibilidad por decisión de Gabe. |

**Resumen numérico legado (549 lecciones · 217.775 palabras cuerpo+cabecera ES):**
- **87** `mantener` → ya traducidas a US English (`biblioteca-en/`, `idioma_disponible='es, en'`).
- **462** restantes (`280` reescribir + `145` fusionar + `37` retirar; 163.665 palabras ES) → permanecen solo en ES (`idioma_disponible='es'`) hasta que se redacten los cursos nuevos o queden en biblioteca histórica.

**Orden propuesto:** (1) Hefesto carga S0 ES + EN, `biblioteca-en/` (87 lecciones) y el catálogo bilingüe con todo visible; (2) S1 de las tres carreras redactado en ES + EN; (3) resto de semestres S2–S6 y optativas en orden.
