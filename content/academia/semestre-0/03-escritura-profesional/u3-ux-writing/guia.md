# Unidad 3 — UX writing: el texto de las interfaces

**Semanas 6–7 · 12 horas**

**Pregunta guía:** ¿Qué palabras necesita el usuario en cada momento de la interfaz para avanzar sin dudas?

**Tiempo por pieza [INFERENCIA; método en `rework/profx/formatos-leccion.md` §0.1]:** Guía ≈ 20 min (1.512 palabras a 120 ppm + 5 min de comprobaciones rápidas) · Ejercicios ≈ 3 h 00 min (4 de nivel 1 × 10 min, 2 de nivel 2 × 25 min, 2 de nivel 3 × 45 min) · Cuestionario ≈ 30 min · Reflexión ≈ 1 h 30 min. **Total efectivo ≈ 5 h 20 min** de las 12 h que planifica el syllabus. Las ≈ 6 h 40 min restantes son estudio autónomo: relectura, apuntes, lecturas de referencia y repaso.

> **Idea central.** Una interfaz no termina en los colores y la tipografía; termina cuando el usuario completa lo que vino a hacer. Las palabras que lo guían (botones, etiquetas, mensajes de error, pantallas vacías, avisos) son parte del diseño. El *UX writing* es la disciplina que diseña esos textos. Le importa a cualquier perfil: el desarrollador que escribe un mensaje de error, la diseñadora que maqueta un formulario, el equipo de marketing que redacta la bienvenida de una app.

## Objetivos

- Distinguir UX writing de copywriting.
- Aplicar los principios: claro, conciso, útil, consistente, humano.
- Escribir botones, etiquetas, mensajes de error, estados vacíos, confirmaciones y avisos.
- Definir voz y tono y documentarlos en una guía de estilo mínima.
- Probar el microcopy con usuarios.

---

## 1. Copywriting vs UX writing

| | Copywriting | UX writing |
|---|---|---|
| **Objetivo** | Persuadir, convertir | Guiar, aclarar, reducir fricción |
| **Momento** | Antes de la decisión (página, anuncio, correo) | Durante el uso del producto |
| **Extensión** | Puede ser largo | Lo más breve posible sin perder claridad |
| **Éxito** | El lector actúa | El usuario completa su tarea sin pensar en las palabras |

Se solapan: la pantalla de registro de una app debe convencer (copy) y guiar (UX). Pero cuando el usuario ya está dentro, lo que necesita es claridad, no persuasión. Un buen UX writing casi no se nota.

## 2. Cinco principios

1. **Claro.** El usuario no debe tener que interpretar. "Error 403" no dice nada; "No tienes permiso para ver esta página. Inicia sesión con una cuenta de administrador" dice qué pasa y qué hacer.
2. **Conciso.** Cada palabra que no aporta, estorba. "Haz clic aquí para continuar con el proceso de registro" → "Crear cuenta". Pero conciso no significa críptico: si recortar elimina información necesaria, no recortes.
3. **Útil.** ¿Qué necesita saber el usuario *en este momento*? Ni más ni menos.
4. **Consistente.** El mismo término para la misma acción en todo el producto. Si en una pantalla dice "Guardar" y en otra "Salvar", o "Proyecto" y "Espacio de trabajo" para lo mismo, el usuario duda si son cosas distintas.
5. **Humano.** Sin sonar a máquina ni forzar la simpatía. "Su solicitud ha sido procesada exitosamente" → "Listo: tu pedido está confirmado."

## 3. Los elementos del microcopy

### 3.1 Botones y enlaces
- Usa **verbos** que describan la acción y, si hace falta, el objeto: "Descargar factura", "Enviar solicitud", "Crear proyecto".
- Evita botones genéricos como "Aceptar", "Sí", "Enviar" cuando el contexto no deja claro qué pasará.
- El texto del botón debe coincidir con lo que pasa al pulsarlo.
- En diálogos de confirmación, los botones deben entenderse sin leer el resto:

> ✗ "¿Está seguro? [Sí] [No]"
> ✓ "¿Eliminar el proyecto 'Web Raíz'? Se borrarán sus 34 archivos y no podrás recuperarlos. [Eliminar proyecto] [Cancelar]"

- Evita "Haz clic aquí": no dice a dónde lleva y es peor para la accesibilidad (los lectores de pantalla suelen listar los enlaces sin su contexto).

### 3.2 Etiquetas de formularios y textos de ayuda
- Etiquetas **visibles** y breves encima del campo: "Correo electrónico".
- No uses el texto de ejemplo dentro del campo (*placeholder*) como única etiqueta: desaparece al escribir y suele tener bajo contraste.
- Texto de ayuda para lo que no es obvio: "Usaremos este número solo para avisarte del envío."
- Indica formatos y requisitos **antes** de que el usuario se equivoque: "Mínimo 8 caracteres, con al menos un número."

### 3.3 Mensajes de error
Un buen mensaje de error responde a tres preguntas: **¿qué pasó?, ¿por qué? (si ayuda) y ¿qué puedo hacer?** Además:
- No culpes al usuario ("Has introducido datos inválidos").
- No uses códigos internos como mensaje principal (pueden ir aparte, para soporte).
- Muestra el error junto al campo afectado y conserva lo que el usuario ya escribió.

### Ejemplo resuelto 1 — Reescribir un error

*Original:* "Error al procesar la solicitud. Código: ERR_INVALID_INPUT_002. Contacte al administrador del sistema."

*Diagnóstico:* no dice qué falló, el código no significa nada para el usuario, "contacte al administrador" no es una acción posible para la mayoría (¿quién es?, ¿cómo?).

*Supongamos* que el código significa "la fecha de nacimiento tiene un formato incorrecto". Reescritura junto al campo:
> "Escribe la fecha como DD/MM/AAAA, por ejemplo 07/03/1995."

Si el error es del sistema y no del usuario:
> "No pudimos guardar tus cambios por un problema nuestro. Tus datos siguen aquí: inténtalo de nuevo en unos minutos. Si sigue fallando, escríbenos a soporte@empresa.com e indica el código ERR-002."

Fíjate en que **para reescribir un error tienes que saber qué significa**: el UX writing exige hablar con el equipo técnico.

### 3.4 Estados vacíos
La pantalla que el usuario ve cuando todavía no hay contenido (sin proyectos, sin mensajes, sin resultados). Es una oportunidad de explicar y orientar:

> ✗ "No hay datos."
> ✓ "Todavía no tienes proyectos. Crea el primero para empezar a organizar tus tareas. [Crear proyecto]"

Para una búsqueda sin resultados: "No encontramos resultados para 'zapatos rojo'. Revisa la ortografía o prueba con menos palabras."

### 3.5 Confirmaciones, carga y avisos
- **Confirmación:** di qué pasó y qué sigue. "Pago recibido. Te enviamos el recibo a ana@correo.com."
- **Carga:** si tarda, informa. "Generando tu informe… suele tardar menos de un minuto."
- **Acciones destructivas:** describe la consecuencia y ofrece deshacer cuando sea posible ("Conversación archivada. [Deshacer]").

## 4. Voz y tono

- **Voz:** la personalidad estable del producto (p. ej., cercana, clara, experta, sin tecnicismos). No cambia.
- **Tono:** cómo se adapta la voz a cada situación. Una celebración admite entusiasmo ("¡Tu tienda ya está en línea!"); un error de pago, no ("No pudimos procesar tu tarjeta. Revisa los datos o prueba con otra.").

### Tú o usted
En español hay que decidir el tratamiento y mantenerlo en todo el producto. En muchos productos digitales en México y gran parte de Latinoamérica se usa "tú", pero depende del público (banca, salud, sector público y públicos mayores suelen preferir "usted"). Lo importante es la **consistencia**.

### Guía de estilo mínima
Documenta en una página:
1. Voz (3 adjetivos con ejemplos de "así sí / así no").
2. Tratamiento (tú/usted).
3. Glosario: términos elegidos y términos prohibidos ("Proyecto", no "Espacio" ni "Workspace").
4. Reglas: mayúsculas (en español, solo la primera palabra de un botón o título: "Crear proyecto", no "Crear Proyecto"), formato de fechas y horas, números, uso de emojis.
5. Patrones: plantilla para errores, confirmaciones y estados vacíos.

## 5. Probar el microcopy

La prueba más sencilla: pide a alguien que nunca vio la interfaz que haga una tarea sin ayuda y observa. Donde duda o pregunta "¿qué significa esto?", hay un problema de texto (o de diseño). Otras técnicas:
- **Prueba de comprensión:** muestra un mensaje y pregunta "¿qué harías ahora?".
- **Prueba A/B** de textos de botones o pantallas clave, si hay tráfico suficiente.
- **Revisar los tickets de soporte:** muchas preguntas repetidas señalan textos confusos.

### Ejemplo resuelto 2 — Un flujo completo

*Flujo:* recuperar la contraseña.

| Pantalla | Antes | Después |
|---|---|---|
| Enlace en el inicio de sesión | "¿Problemas?" | "¿Olvidaste tu contraseña?" |
| Título | "Recuperación de credenciales" | "Recupera tu contraseña" |
| Campo | (placeholder) "Email" | Etiqueta: "Correo con el que te registraste" |
| Botón | "Enviar" | "Enviar enlace" |
| Confirmación | "Solicitud procesada" | "Si existe una cuenta con ana@correo.com, te enviamos un enlace. Revisa también la carpeta de spam. El enlace vence en 30 minutos." |
| Error del enlace | "Token inválido" | "Este enlace ya venció. [Pedir uno nuevo]" |

Observa la confirmación: "Si existe una cuenta…" es deliberado. No confirmar si un correo está registrado es una práctica de seguridad habitual, y el texto la respeta sin confundir al usuario. El UX writing también trabaja con restricciones técnicas y legales.

---

## Errores comunes

| Error | Corrección |
|---|---|
| Botones "Aceptar"/"Sí" ambiguos | Verbo + objeto |
| Códigos técnicos como mensaje | Qué pasó y qué hacer; el código, aparte |
| Culpar al usuario | Lenguaje neutral y orientado a la solución |
| Placeholder como única etiqueta | Etiqueta visible |
| Términos distintos para lo mismo | Glosario y consistencia |
| Tono alegre en un error grave | Adaptar el tono a la situación |
| Escribir sin saber qué hace el sistema | Hablar con el equipo técnico |

## Resumen

El UX writing diseña las palabras que guían al usuario dentro de un producto, con cinco principios: claro, conciso, útil, consistente y humano. Los botones usan verbos que anuncian lo que pasará; los errores dicen qué pasó y qué hacer sin culpar; los estados vacíos orientan; las confirmaciones dicen qué sigue. Una voz estable con un tono adaptado, documentada en una guía mínima, mantiene la consistencia. Y todo microcopy se prueba con usuarios reales.
