import type { Module } from '../../../types'

// Modulo: Modelos, embeddings y RAG
export const MOD_MODELOS_RAG: Module = {
  id: 'iaeng-1',
  number: 1,
  title: 'Modelos, embeddings y RAG',
  description: 'Cómo funciona un modelo por dentro, cuándo usar uno preentrenado y cómo darle tu propia información sin reentrenar nada.',
  duration: '4 semanas',
  status: 'available',
  track: 'iaeng-modelos',
  audience: 'aprendizaje',
  lessons: [
    {
      id: 'ie1-l1',
      title: 'Aprendizaje automático: qué es y cuándo no usarlo',
      type: 'reading',
      difficulty: 'intermedio',
      content: `## La idea en una frase

En la programación normal escribes las reglas y el programa produce respuestas. En el aprendizaje automático das ejemplos de respuestas correctas y el programa deduce las reglas.

Sirve cuando las reglas existen pero son demasiadas o demasiado difusas para escribirlas: reconocer si una reseña es positiva, detectar una transacción sospechosa, agrupar clientes que se parecen.

### Los tres tipos que vas a encontrar

**Supervisado.** Tienes ejemplos etiquetados —correos marcados como spam y no spam— y el modelo aprende a predecir la etiqueta. Es el 90% de lo que se usa en producto.

- **Clasificación**: la salida es una categoría. ¿Spam o no? ¿Qué producto es esta imagen?
- **Regresión**: la salida es un número. ¿Cuánto costará este alquiler?

**No supervisado.** No hay etiquetas; el modelo busca estructura. Agrupar clientes por comportamiento (k-means) es el caso típico.

**Por refuerzo.** El modelo aprende probando y recibiendo premio o castigo. Es lo que hay detrás de los que juegan al ajedrez, y rara vez lo que necesitas en un producto de agencia.

### Cuándo NO usar aprendizaje automático

Esta es la parte que casi nadie enseña y la que más dinero ahorra.

**Si las reglas se pueden escribir, escríbelas.** Un modelo para decidir si un pedido supera los mil pesos es absurdo: es un \`if\`. Un modelo es más lento, más caro, más difícil de depurar y puede equivocarse. Un \`if\` no.

**Si no tienes datos, no hay modelo.** Necesitas ejemplos, muchos y representativos. Sin ellos, no hay proyecto de aprendizaje automático, hay una conversación pendiente sobre de dónde saldrán.

**Si el error es inaceptable.** Todo modelo se equivoca un porcentaje de las veces. Si ese porcentaje no se puede tolerar —decisiones médicas, legales, financieras sin revisión humana— el modelo puede sugerir, no decidir.

**Si un modelo preentrenado ya lo resuelve.** Entrenar desde cero para clasificar sentimiento en español cuando existen modelos que lo hacen bien es tirar semanas.

### El vocabulario mínimo

\`\`\`
característica (feature)  cada dato de entrada: precio, antigüedad, categoría
etiqueta (label)          la respuesta correcta en los ejemplos de entrenamiento
entrenamiento             el proceso de deducir las reglas a partir de ejemplos
inferencia                usar el modelo ya entrenado para predecir
sobreajuste (overfitting) memorizó los ejemplos y falla con datos nuevos
\`\`\`

### La regla de oro: separa los datos

Nunca evalúes un modelo con los mismos datos con los que lo entrenaste. Es como calificar un examen con las respuestas que el alumno ya vio.

\`\`\`python
from sklearn.model_selection import train_test_split

X_entrena, X_prueba, y_entrena, y_prueba = train_test_split(
  X, y, test_size=0.2, random_state=42
)
\`\`\`

Un modelo con 99% de acierto en entrenamiento y 60% en prueba no aprendió: memorizó. Eso es sobreajuste, y es el fallo más común de quien empieza.

### La métrica engañosa

Si el 99% de las transacciones son legítimas, un modelo que responde siempre "legítima" acierta el 99% de las veces y es completamente inútil.

Por eso la exactitud sola no dice nada en datos desbalanceados. Se miran además:

- **Precisión**: de las que marqué como fraude, ¿cuántas lo eran?
- **Exhaustividad (recall)**: de los fraudes reales, ¿cuántos detecté?

Cuál importa más depende del negocio. En detección de fraude, dejar pasar uno cuesta más que revisar una alarma falsa: prioriza la exhaustividad. En un filtro de spam, mandar un correo legítimo a la basura es peor: prioriza la precisión.`,
      tasks: [
        'Toma tres problemas de negocio reales y decide para cada uno si necesita un modelo o basta con reglas',
        'Para uno que sí lo necesite, define qué serían las características y qué la etiqueta',
        'Explica con un ejemplo propio por qué la exactitud puede engañar en datos desbalanceados',
        'Entrena cualquier modelo de ejemplo y compara su acierto en entrenamiento y en prueba',
      ],
      tip: 'Antes de proponerle un modelo a un cliente, pregunta de dónde van a salir los datos etiquetados. Si la respuesta es "los generamos sobre la marcha", el proyecto no es de aprendizaje automático todavía: es de recolección de datos, y dura meses.',
      completed: false,
    },
    {
      id: 'ie1-l2',
      title: 'Modelos preentrenados: encontrar, evaluar y usar',
      type: 'reading',
      difficulty: 'intermedio',
      content: `## Casi nunca entrenas desde cero

Entrenar un modelo grande cuesta cientos de miles de dólares en cómputo. Lo que se hace en la práctica es tomar uno ya entrenado y usarlo tal cual, o ajustarlo con tus datos.

**Hugging Face** es el repositorio central: cientos de miles de modelos abiertos con su documentación y ejemplos.

### Usar uno en tres líneas

\`\`\`python
from transformers import pipeline

clasificador = pipeline("sentiment-analysis",
                      model="nlptown/bert-base-multilingual-uncased-sentiment")

clasificador("El servicio fue excelente, volvería sin dudarlo")
# [{'label': '5 stars', 'score': 0.87}]
\`\`\`

### Cómo elegir uno

No por popularidad. Los criterios que importan:

**La tarea.** Clasificación de texto, resumen, traducción, reconocimiento de imágenes: cada modelo hace una cosa. Filtra por tarea antes que nada.

**El idioma.** Un modelo entrenado solo en inglés funcionará mal con reseñas en español. Busca los multilingües o los entrenados en español.

**El tamaño.** Un modelo de 7.000 millones de parámetros necesita una tarjeta gráfica potente. Uno pequeño corre en tu portátil. Mira los requisitos antes de enamorarte.

**La licencia.** Esto se salta con demasiada frecuencia. Hay modelos que **no permiten uso comercial**. Si vas a cobrarle a un cliente por un producto que lo usa, la licencia es un requisito legal, no un detalle.

**La fecha y el mantenimiento.** Un modelo sin actualizaciones en tres años probablemente tiene alternativas mejores.

### Evaluar con tus datos, no con los del autor

Las métricas que publica un modelo se midieron con sus datos de prueba, que no son los tuyos. Antes de meterlo en producción:

1. Junta entre 50 y 100 ejemplos reales de tu caso.
2. Etiquétalos a mano con la respuesta correcta.
3. Pasa el modelo y compara.

Cien ejemplos bien elegidos te dicen más sobre si sirve para tu problema que cualquier tabla de resultados publicada. Y es trabajo de una tarde.

### Ajuste fino: cuándo vale la pena

Ajustar un modelo preentrenado con tus datos (fine-tuning) tiene sentido cuando tu dominio es muy específico —lenguaje técnico, jerga de un sector— y el modelo genérico se queda corto.

Necesitas del orden de cientos a miles de ejemplos etiquetados, y tiempo de cómputo. **Antes de ajustar, prueba dos cosas más baratas**: un mejor prompt si es un modelo de lenguaje, o RAG para darle contexto. Resuelven la mayoría de los casos en los que la gente cree necesitar ajuste fino.

### Modelos por API frente a modelos propios

**Por API** (Claude, GPT, Gemini): sin infraestructura, siempre actualizados, pagas por uso. Los datos salen de tu sistema, y eso a veces es un problema contractual.

**Propios** (abiertos, en tu servidor): control total, coste fijo, los datos no salen. A cambio administras infraestructura y GPU.

Para casi todo lo que hace una agencia, la API es la respuesta correcta. Los modelos propios entran cuando hay una restricción real de privacidad o un volumen tan alto que el coste por llamada se dispara.`,
      tasks: [
        'Busca en Hugging Face tres modelos para una misma tarea y compara idioma, tamaño y licencia',
        'Verifica explícitamente si permiten uso comercial y anota la licencia de cada uno',
        'Arma un conjunto de 50 ejemplos reales tuyos, etiquétalos y evalúa el modelo elegido',
        'Calcula qué costaría resolver esa tarea por API frente a alojar el modelo tú',
      ],
      tip: 'Revisa la licencia antes de escribir una línea de código. Descubrir que el modelo sobre el que construiste un producto prohíbe el uso comercial, con el cliente esperando, es un problema sin solución técnica.',
      completed: false,
    },
    {
      id: 'ie1-l3',
      title: 'Entrenar un clasificador de verdad',
      type: 'reading',
      difficulty: 'profesional',
      content: `## El flujo completo

Un modelo de clasificación clásico —sin redes neuronales— resuelve más problemas de negocio de los que la gente supone, y se entrena en segundos.

\`\`\`python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix

datos = pd.read_csv("reseñas.csv")          # columnas: texto, etiqueta

X_entrena, X_prueba, y_entrena, y_prueba = train_test_split(
  datos["texto"], datos["etiqueta"], test_size=0.2, random_state=42, stratify=datos["etiqueta"]
)

vectorizador = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
X_entrena_vec = vectorizador.fit_transform(X_entrena)
X_prueba_vec = vectorizador.transform(X_prueba)

modelo = LogisticRegression(max_iter=1000, class_weight="balanced")
modelo.fit(X_entrena_vec, y_entrena)

print(classification_report(y_prueba, modelo.predict(X_prueba_vec)))
\`\`\`

Tres detalles que no son decorativos:

- **\`stratify\`** mantiene la misma proporción de clases en entrenamiento y prueba. Sin esto, con clases desbalanceadas puedes acabar sin ejemplos de la clase minoritaria en la prueba.
- **\`fit_transform\` en entrenamiento y solo \`transform\` en prueba.** Si ajustas el vectorizador con los datos de prueba, estás filtrando información del examen al estudio.
- **\`class_weight="balanced"\`** compensa el desbalance para que el modelo no se limite a predecir siempre la clase mayoritaria.

### Leer el informe

\`\`\`
            precision    recall  f1-score   support
  negativa       0.88      0.71      0.79       120
  positiva       0.93      0.98      0.95       480
\`\`\`

La lectura: detecta muy bien las positivas, pero de las negativas reales solo encuentra el 71%. Si el objetivo del cliente es detectar clientes molestos, ese 71% es el número que importa, no el promedio.

**\`support\`** dice cuántos ejemplos de cada clase había. Una métrica calculada sobre 12 ejemplos no significa nada: mira siempre esa columna antes de sacar conclusiones.

### La matriz de confusión

\`\`\`python
print(confusion_matrix(y_prueba, modelo.predict(X_prueba_vec)))
\`\`\`

Te dice **en qué se equivoca**, no solo cuánto. Confundir "negativa" con "neutra" es un problema distinto de confundirla con "positiva", y solo la matriz lo muestra.

### Validación cruzada

Un único reparto entre entrenamiento y prueba puede salir afortunado. La validación cruzada reparte varias veces y promedia:

\`\`\`python
from sklearn.model_selection import cross_val_score

puntajes = cross_val_score(modelo, X_vec, y, cv=5, scoring="f1_macro")
print(puntajes.mean(), puntajes.std())
\`\`\`

Si la desviación es alta, tu modelo depende mucho de qué datos le tocaron: señal de que hacen falta más ejemplos.

### Guardar y servir

\`\`\`python
import joblib

joblib.dump({"modelo": modelo, "vectorizador": vectorizador}, "clasificador.joblib")
\`\`\`

**Guarda el vectorizador junto al modelo.** Es el error clásico: se guarda solo el modelo y en producción se crea un vectorizador nuevo, que asigna otros índices a las palabras. El modelo entonces recibe basura y predice basura, sin lanzar ningún error.

Desde ahí, servirlo es un endpoint de FastAPI como los del área anterior.`,
      tasks: [
        'Consigue un conjunto de datos etiquetado real y entrena un clasificador de texto',
        'Lee el classification_report e identifica en qué clase falla más y por qué importa',
        'Analiza la matriz de confusión y describe qué confunde el modelo con qué',
        'Guarda modelo y vectorizador juntos, y sírvelos desde un endpoint de FastAPI',
      ],
      tip: 'Empieza siempre por un modelo simple como la regresión logística. Es rápido, se explica, y te da la línea base contra la que comparar. Si algo más complejo no la supera con claridad, no vale la complejidad que agrega.',
      completed: false,
    },
    {
      id: 'ie1-l4',
      title: 'Embeddings y búsqueda semántica',
      type: 'reading',
      difficulty: 'profesional',
      content: `## Convertir significado en números

Un **embedding** es la representación de un texto como una lista de números que captura su significado. Textos parecidos producen vectores cercanos, aunque no compartan ni una palabra.

\`\`\`
"¿cómo devuelvo un producto?"     → [0.021, -0.44, 0.13, ...]
"quiero regresar mi compra"       → [0.019, -0.41, 0.15, ...]   ← muy cerca
"¿cuánto cuesta el envío?"        → [0.55,  0.02, -0.31, ...]   ← lejos
\`\`\`

Esa es la diferencia con la búsqueda tradicional: buscar "regresar mi compra" por palabras clave no encuentra un documento titulado "política de devoluciones". Por significado, sí.

### Generarlos

\`\`\`python
from sentence_transformers import SentenceTransformer

modelo = SentenceTransformer("intfloat/multilingual-e5-base")
vectores = modelo.encode(["¿cómo devuelvo un producto?", "quiero regresar mi compra"])
\`\`\`

O por API, si prefieres no alojar nada. Lo importante: **usa el mismo modelo para indexar y para consultar.** Vectores de modelos distintos no son comparables, y el sistema devolverá resultados sin sentido sin dar ningún error.

### Medir la cercanía

\`\`\`python
from sklearn.metrics.pairwise import cosine_similarity

similitud = cosine_similarity([vector_consulta], vectores_documentos)[0]
\`\`\`

La similitud del coseno va de -1 a 1: cuanto más cerca de 1, más parecido el significado. Es la medida estándar porque ignora la longitud del texto y se fija solo en la dirección del vector.

### Bases de datos vectoriales

Con cien documentos comparas contra todos y listo. Con cien mil necesitas un índice especializado.

- **pgvector**: una extensión de Postgres. Si ya usas Supabase, esta es la respuesta obvia: tus vectores viven junto al resto de tus datos y consultas todo con SQL.
- **Pinecone, Weaviate, Qdrant**: servicios dedicados. Más rápidos a gran escala, una pieza más de infraestructura.

\`\`\`sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE documentos (
id        bigserial PRIMARY KEY,
contenido text NOT NULL,
embedding vector(768)
);

-- los tres documentos más parecidos a una consulta
SELECT contenido, 1 - (embedding <=> :consulta) AS similitud
FROM documentos
ORDER BY embedding <=> :consulta
LIMIT 3;
\`\`\`

El operador \`<=>\` calcula distancia por coseno. Para que sea rápido con volumen hace falta un índice:

\`\`\`sql
CREATE INDEX ON documentos USING hnsw (embedding vector_cosine_ops);
\`\`\`

### Trocear los documentos

No se indexa un PDF de 80 páginas como un solo vector: el significado se diluye y el resultado no sirve. Se parte en trozos.

- **Tamaño**: entre 300 y 800 palabras suele funcionar. Muy corto pierde contexto, muy largo diluye.
- **Solapamiento**: que cada trozo repita el final del anterior (unas 50 palabras) evita cortar una idea a la mitad.
- **Respeta la estructura**: cortar por secciones o párrafos da mejores trozos que cortar cada N caracteres a ciegas.
- **Guarda de dónde vino cada trozo**: documento, página, sección. Sin eso no puedes citar la fuente, y citar la fuente es lo que hace confiable al sistema.

La calidad del troceado determina la calidad de todo lo que viene después. Es la parte menos glamorosa y la que más resultados cambia.`,
      tasks: [
        'Genera embeddings de diez frases tuyas y comprueba cuáles quedan cerca entre sí',
        'Monta pgvector en Supabase y guarda los vectores de un conjunto de documentos reales',
        'Escribe la consulta de los tres más parecidos y crea el índice HNSW',
        'Trocea un documento largo de dos formas distintas y compara qué resultados devuelve cada una',
      ],
      tip: 'Cuando un sistema de búsqueda semántica devuelve resultados malos, el problema casi nunca está en el modelo de embeddings: está en el troceado. Antes de cambiar de modelo, mira qué trozos guardaste y si tienen sentido leídos solos.',
      completed: false,
    },
    {
      id: 'ie1-l5',
      title: 'RAG: darle al modelo tu propia información',
      type: 'reading',
      difficulty: 'profesional',
      content: `## El problema que resuelve

Un modelo de lenguaje sabe lo que había en internet hasta su fecha de corte. No conoce los precios de tu cliente, sus políticas internas ni lo que se habló en la última reunión. Preguntárselo produce una respuesta inventada con total seguridad.

**RAG** (generación aumentada por recuperación) resuelve esto sin reentrenar nada: busca los fragmentos relevantes en tus documentos y se los pasa al modelo junto con la pregunta.

### El flujo

\`\`\`
1. Preparación (una vez)
 documentos → trozos → embeddings → base vectorial

2. En cada consulta
 pregunta → embedding → buscar los N trozos más cercanos
          → armar el prompt con esos trozos
          → el modelo responde usando solo eso
          → citar las fuentes
\`\`\`

### El prompt es donde se gana o se pierde

\`\`\`python
prompt = f"""Responde la pregunta usando únicamente el contexto de abajo.
Si el contexto no contiene la respuesta, di exactamente:
"No encuentro esa información en los documentos disponibles."
No uses conocimiento externo. Cita la fuente de cada afirmación.

CONTEXTO:
{contexto}

PREGUNTA: {pregunta}
"""
\`\`\`

Las dos instrucciones críticas son **"únicamente el contexto"** y **darle una salida explícita para cuando no sepa**. Sin la segunda, el modelo rellena el hueco inventando, que es exactamente lo que RAG venía a evitar.

### Por qué RAG y no ajuste fino

| | RAG | Ajuste fino |
|---|---|---|
| Actualizar información | Reindexar, minutos | Reentrenar |
| Citar fuentes | Sí, natural | No |
| Coste inicial | Bajo | Alto |
| Enseñar *conocimiento* | Sí | Regular |
| Enseñar *estilo o formato* | Regular | Sí |

La regla: **RAG para que sepa cosas, ajuste fino para que hable de cierta manera.** La mayoría de los proyectos de agencia son lo primero.

### Los fallos habituales y cómo se ven

**Recupera trozos irrelevantes.** El modelo responde mal aunque la información esté en tus documentos. Casi siempre es troceado, no el modelo.

**Responde con seguridad algo falso.** Falta la instrucción de admitir desconocimiento, o le pasaste contexto vacío y no lo comprobaste.

**Ignora el contexto y usa lo que ya sabía.** El prompt no es lo bastante explícito, o el contexto está tan abajo que se pierde entre mucho texto.

**Se queda sin espacio.** Traes veinte trozos y no caben. Trae menos y mejores: cinco relevantes superan a veinte mediocres.

### Reordenar para mejorar

La búsqueda por vectores es rápida pero imprecisa. El patrón que más mejora los resultados: recupera 20 candidatos por vectores y luego reordénalos con un modelo más preciso, quedándote con los 5 mejores.

También funciona muy bien la **búsqueda híbrida**: combinar la semántica con la de palabras clave. La semántica encuentra "devoluciones" cuando preguntas "regresar"; la de palabras clave encuentra un código de producto exacto, donde la semántica falla.

### Evaluar

Sin evaluación no sabes si un cambio mejoró o empeoró. Lo mínimo viable: una lista de 30 a 50 preguntas reales con su respuesta correcta y el documento donde está.

Se miden dos cosas por separado:

- **¿Recuperó el trozo correcto?** Si no, el problema está en la búsqueda.
- **¿Respondió bien con el trozo correcto?** Si no, el problema está en el prompt.

Separarlas es lo que convierte "no funciona bien" en un problema concreto que se puede arreglar.`,
      tasks: [
        'Monta un RAG completo sobre documentos reales: troceado, embeddings, búsqueda y respuesta',
        'Escribe el prompt con la instrucción de admitir desconocimiento y comprueba que la respeta',
        'Prepara 30 preguntas de evaluación con su respuesta y su documento de origen',
        'Mide por separado si recupera el trozo correcto y si responde bien teniéndolo',
      ],
      tip: 'Haz siempre la prueba de la pregunta imposible: pregúntale algo que no esté en ningún documento. Si inventa una respuesta en vez de decir que no lo sabe, el sistema no está listo, por bien que responda todo lo demás.',
      completed: false,
    },
    {
      id: 'ie1-l6',
      title: 'Proyecto: asistente sobre documentos reales',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: `Vas a construir un asistente que responda preguntas sobre un cuerpo de documentos real y cite sus fuentes. Es el producto de IA que más piden las empresas y el más vendible de todo este módulo.

Elige documentos de verdad: el manual de operaciones de un cliente, tus propias propuestas comerciales, la documentación de un producto, las políticas de un negocio. Que sean suficientes para que la búsqueda importe —al menos 50 páginas— y que conozcas el contenido lo bastante para juzgar si responde bien.

El requisito que define el proyecto: **cuando la respuesta no esté en los documentos, tiene que decirlo.** Un asistente que inventa es peor que no tener asistente, porque la gente le cree.`,
      deliverables: [
        'Canal de ingesta que trocea los documentos guardando su origen: archivo, página y sección',
        'Vectores almacenados en pgvector sobre Supabase, con índice HNSW',
        'Endpoint de FastAPI que recibe una pregunta y devuelve respuesta más fuentes citadas',
        'Interfaz mínima donde se pueda preguntar y ver las fuentes de cada respuesta',
        'Conjunto de evaluación de al menos 30 preguntas con su respuesta esperada y su documento',
        'Informe con los resultados: aciertos de recuperación y de respuesta, medidos por separado',
      ],
      rubrica: [
        'Ante una pregunta sin respuesta en los documentos, contesta que no la encuentra en vez de inventar',
        'Cada respuesta cita el documento y la sección de donde salió, y la cita es verificable',
        'El troceado respeta la estructura del documento y los trozos se entienden leídos solos',
        'Se usa el mismo modelo de embeddings para indexar y para consultar',
        'La evaluación separa el fallo de recuperación del fallo de generación',
        'El informe explica al menos un cambio hecho a partir de lo que reveló la evaluación',
        'Reindexar tras cambiar un documento es un comando, no un proceso manual',
      ],
      tasks: [
        'Elige el cuerpo de documentos y define cómo vas a trocearlo antes de escribir código',
        'Construye la ingesta y revisa a mano veinte trozos: ¿se entienden por sí solos?',
        'Escribe el conjunto de evaluación ANTES de afinar el sistema, para tener contra qué comparar',
        'Mide, cambia una cosa, vuelve a medir, y documenta si mejoró o empeoró',
        'Prueba a propósito preguntas fuera de alcance y ambiguas',
      ],
      discussionPrompts: [
        '¿Qué debería pasar si dos documentos se contradicen? ¿Responder con uno, con los dos, o avisar de la contradicción?',
        'Si el cliente actualiza un documento cada semana, ¿cómo se reindexa sin dejar el asistente fuera de servicio?',
      ],
      tip: 'Escribe el conjunto de evaluación antes de empezar a afinar. Sin él, cada cambio se juzga probando dos preguntas a mano y quedándote con la impresión de que mejoró. Con él, sabes si mejoró de verdad y en qué.',
      completed: false,
    },
    {
      id: 'ie1-l7',
      title: 'Examen: modelos, embeddings y RAG',
      type: 'exam',
      difficulty: 'profesional',
      questions: [
        {
          q: 'Un cliente quiere clasificar automáticamente pedidos por importe: menos de mil pesos, entre mil y cinco mil, más de cinco mil. ¿Qué propones?',
          options: [
            'Un clasificador entrenado con pedidos históricos etiquetados',
            'Condicionales normales: la regla es explícita y no necesita aprendizaje automático',
            'Un modelo de lenguaje al que se le describa la regla en el prompt',
            'Embeddings de los pedidos y agrupamiento por similitud',
          ],
          correct: 1,
          explanation: 'Si la regla se puede escribir, se escribe. Un modelo para esto sería más lento, más caro, imposible de garantizar y podría equivocarse en un caso que un if resuelve siempre bien. Reservar el aprendizaje automático para cuando las reglas existen pero no se pueden enunciar es la decisión de ingeniería, no la técnica.',
        },
        {
          q: 'Tu modelo tiene 99% de exactitud detectando fraude, pero solo el 1% de las transacciones son fraudulentas. ¿Qué revisas?',
          options: [
            'Nada, 99% es un resultado excelente',
            'La exhaustividad y la precisión sobre la clase fraude: un modelo que responda siempre "legítima" también acertaría el 99%',
            'El tamaño del conjunto de entrenamiento',
            'La velocidad de inferencia',
          ],
          correct: 1,
          explanation: 'Con clases desbalanceadas la exactitud es engañosa. Hay que mirar las métricas de la clase minoritaria: de los fraudes reales, cuántos detectó (exhaustividad), y de los que marcó, cuántos lo eran (precisión). La matriz de confusión y la columna support del informe cuentan la historia real.',
        },
        {
          q: '¿Por qué se aplica fit_transform al vectorizador con los datos de entrenamiento y solo transform con los de prueba?',
          options: [
            'Por rendimiento: transform es más rápido',
            'Porque ajustar el vectorizador con los datos de prueba filtra información del examen al entrenamiento y las métricas dejan de ser fiables',
            'Porque transform admite más tipos de datos',
            'Es indiferente, ambos producen el mismo resultado',
          ],
          correct: 1,
          explanation: 'El vectorizador aprende el vocabulario y las frecuencias de los datos que ve al ajustarse. Si ve los de prueba, esa información se cuela en el modelo y la evaluación resulta optimista. La regla general: cualquier transformación se ajusta solo con entrenamiento y se aplica al resto.',
        },
        {
          q: 'Guardas tu clasificador con joblib pero en producción las predicciones son absurdas, sin ningún error. ¿Qué falta probablemente?',
          options: [
            'Guardar el vectorizador junto al modelo: uno nuevo asigna otros índices a las palabras y el modelo recibe entradas sin sentido',
            'Convertir el modelo a otro formato antes de servirlo',
            'Volver a entrenar en el servidor de producción',
            'Aumentar el número de características del vectorizador',
          ],
          correct: 0,
          explanation: 'El modelo aprendió sobre los índices concretos que asignó ese vectorizador. Uno creado de nuevo asigna otros, así que el vector de entrada significa algo distinto de lo que el modelo espera. No falla, simplemente predice basura. Modelo y transformaciones se guardan y versionan juntos.',
        },
        {
          q: 'Un sistema RAG devuelve respuestas malas aunque la información está en los documentos. ¿Por dónde empiezas?',
          options: [
            'Cambiando a un modelo de lenguaje más potente',
            'Revisando el troceado y qué fragmentos recupera: si trae los equivocados, el fallo está en la búsqueda y no en la generación',
            'Aumentando la temperatura del modelo',
            'Reentrenando el modelo de embeddings con los documentos',
          ],
          correct: 1,
          explanation: 'Hay que separar los dos fallos posibles. Si el sistema no recupera el fragmento correcto, ningún modelo de lenguaje lo va a arreglar. Si lo recupera y aun así responde mal, el problema está en el prompt. Medir ambos por separado convierte "no funciona" en algo accionable.',
        },
        {
          q: 'Un cliente quiere que el asistente responda con el tono y el formato de su manual de marca. ¿RAG o ajuste fino?',
          options: [
            'RAG: se le pasa el manual de marca como contexto',
            'Ajuste fino: RAG sirve para que el modelo sepa cosas, el ajuste fino para que hable de cierta manera',
            'Ninguno de los dos: eso no se puede conseguir',
            'RAG, pero indexando solo el manual de marca',
          ],
          correct: 1,
          explanation: 'Es la distinción central. RAG inyecta conocimiento: hechos que el modelo no tenía. El ajuste fino modifica el comportamiento: estilo, formato, tono. Para tono consistente a gran escala, el ajuste fino es la herramienta, aunque un buen prompt con ejemplos resuelve muchos casos sin llegar a eso.',
        },
      ],
      completed: false,
    },
  ],
  resources: [
    {
      title: 'Hugging Face — modelos y documentación',
      url: 'https://huggingface.co/docs',
      type: 'documentation',
    },
    {
      title: 'scikit-learn — guía de usuario',
      url: 'https://scikit-learn.org/stable/user_guide.html',
      type: 'documentation',
    },
    {
      title: 'pgvector — búsqueda vectorial en Postgres',
      url: 'https://github.com/pgvector/pgvector',
      type: 'documentation',
    },
    {
      title: 'Supabase — RAG con pgvector',
      url: 'https://supabase.com/docs/guides/ai',
      type: 'documentation',
    },
    {
      title: 'Sentence Transformers — embeddings de texto',
      url: 'https://sbert.net/',
      type: 'documentation',
    },
  ],
}
