# 09 · Versión en lenguaje claro y apoyos de accesibilidad

**Id:** `s0-c2-u2-claro` · **Formato:** resumen en lenguaje claro, glosario, texto alternativo y guía de lectura en voz alta · **Tiempo:** ≈ 10 min  · **Evaluación:** sin nota.

**Para quién es:**
- Para cualquiera que quiera la idea general antes de leer la guía, o un repaso rápido después.
- Es especialmente útil si el español no es tu primera lengua, si tienes dislexia o fatiga visual, o si usas un lector de pantalla.

**Qué es y qué no es:** sigue la idea del lenguaje claro: que puedas **encontrar** lo que necesitas, **entenderlo** y **usarlo** (definición de ISO 24495-1:2023, https://www.iso.org/standard/78907.html). No sustituye a la guía para la evaluación; es una puerta de entrada.

---

## 1. La unidad en lenguaje claro

**¿De qué trata esta unidad?**
De cómo encontrar **por qué** pasa un problema. Y de cómo saber si algo es la causa de verdad o solo una coincidencia.

**Idea 1. Escribe varias explicaciones posibles.**
- Una explicación que puedes poner a prueba se llama **hipótesis**.
- Una buena hipótesis dice qué dato la haría falsa.
- Escribe al menos tres antes de investigar.
- Empieza por la más probable y más fácil de revisar.

**Idea 2. Pregunta "¿por qué?" varias veces.**
- Esta técnica se llama **cinco porqués**.
- Sirve para llegar a la causa de fondo.
- No te detengas en "fue culpa de alguien". Pregunta qué falló en la forma de trabajar.

**Idea 3. Ordena las causas posibles por grupos.**
- El **diagrama de Ishikawa** tiene forma de espina de pescado.
- Los grupos son: personas, procesos, herramientas, datos y cliente o entorno.
- El diagrama no te da la respuesta; te da ideas para revisar.

**Idea 4. Que dos cosas pasen juntas no significa que una cause la otra.**
- Cuando A y B pasan juntas, puede ser porque:
  - A causa B;
  - B causa A;
  - otra cosa causa las dos;
  - los grupos ya eran distintos desde el principio;
  - es casualidad;
  - cambió la forma de medir.
- Para acercarte a la verdad:
  - busca cómo funcionaría la causa;
  - revisa que la causa pasó **antes**;
  - compara con un grupo parecido;
  - si puedes, haz una prueba repartiendo al azar.

**Idea 5. No toda prueba vale lo mismo.**
- De más fuerte a más débil:
  1. una prueba repartida al azar;
  2. una comparación con otro grupo;
  3. datos de uso;
  4. encuestas;
  5. comentarios sueltos.
- Los comentarios sueltos sirven para tener ideas, no para demostrarlas.

**Lo más importante, en una frase:**
Antes de decir "esto causó aquello", escribe otras explicaciones y busca el dato que las separa.

## 2. Glosario

| Palabra | Qué significa | Ejemplo |
|---|---|---|
| Hipótesis | Explicación que puede resultar falsa | "Las ventas bajaron porque el pago falla en el celular" |
| Refutable | Que se puede demostrar falsa con un dato | Si el pago funciona en el celular, la hipótesis cae |
| Causa raíz | La causa de fondo, sobre la que se puede actuar para siempre | "No hay una lista de pasos para crear servidores" |
| Correlación | Dos cosas que suben o bajan juntas | Más publicaciones y más ventas en diciembre |
| Causalidad | Una cosa produce la otra | El error del pago impide comprar |
| Causalidad inversa | Creías que A causa B, pero B causa A | Quien ya va a comprar abre el chat |
| Variable de confusión | Una tercera cosa que causa las dos | La temporada navideña |
| Selección | Los grupos ya eran distintos antes de comparar | Los más entusiastas activan las notificaciones |
| Prueba A/B | Repartir a la gente al azar en dos versiones y comparar | La mitad ve el botón nuevo y la otra mitad, el viejo |
| Muestra | El grupo de casos que miras | 50 pedidos revisados |
| Evidencia | Lo que apoya o contradice una idea | Datos, pruebas, registros |

## 3. Texto alternativo de los diagramas de la guía original

**Diagrama de Ishikawa del "Ejemplo resuelto 3" de la guía** (en la guía es un dibujo hecho con caracteres):

> Diagrama en forma de espina de pescado. A la derecha, el efecto: "Errores en la entrega". Cinco espinas llegan a la línea central:
> - **Personas:** sin QA dedicado; prisa al cierre.
> - **Procesos:** pruebas al final; sin lista de verificación.
> - **Herramientas:** sin pruebas automáticas; entornos distintos.
> - **Datos:** el contenido llega tarde.
> - **Cliente o entorno:** cambios de alcance en la última semana.

**Mapa conceptual de la unidad:** su descripción completa en texto está en `05-mapa-conceptual.md` §3.

## 4. Guía para leer en voz alta (lector de pantalla o síntesis de voz)

Notas para quien produzca el contenido y para quien use un lector (son buenas prácticas de redacción, y su aplicación concreta la decide quien diseña):
- **Tablas:** cada tabla de esta unidad tiene encabezados en la primera fila. En las tablas de datos de los casos, lee fila por fila: "Semana 1: pedidos por app, 300; quejas por app, 5…".
- **Porcentajes y cifras:** se escriben con cifras y el signo % ("1,5 %"), para que el lector de pantalla los diga completos.
- **Símbolos:**
  - "≥" se lee "al menos";
  - "×" se lee "por";
  - "→" se lee "entonces";
  - los emoji 🗨 y ⏸ marcan "pregunta para ti" y "pausa".
- **Audio:** el podcast (`04-guion-podcast.md`) tiene su transcripción completa en el mismo archivo (lo pide WCAG 2.2 SC 1.2.1, https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html).
- **Videos futuros:** si se graban, llevarán subtítulos sincronizados (WCAG 2.2 SC 1.2.2, https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html) y una transcripción.

## 5. Ajustes que cualquiera puede pedir 
- Más tiempo en el cuestionario y en el checkpoint, si hay una necesidad declarada.
- Entregar la reflexión en audio en lugar de por escrito, con la misma rúbrica (ver `10-formas-de-demostrar-dominio.md`).
- Hacer el role-play en su versión individual.
