import type { Module } from '../../../types'

// Modulo: Procesamiento asincrono
export const MOD_PROD_ASYNC: Module = {
  id: 'iaeng-async',
  number: 3,
  title: 'Procesamiento asíncrono: colas, workers y cron',
  description: 'Dónde vive un agente que tarda cuarenta segundos. Colas de verdad en vez de una lista en memoria, los cinco disparadores que arrancan un trabajo, y cronjobs que no fallan en silencio.',
  duration: '3 semanas',
  status: 'available',
  track: 'iaeng-produccion',
  audience: 'aprendizaje',
  lessons: [
    {
      id: 'async-l1',
      title: 'Por qué una petición HTTP no es sitio para un agente lento',
      type: 'reading',
      difficulty: 'profesional',
      content: `## El límite que un endpoint normal no tiene

Un endpoint que consulta una fila y responde tarda milisegundos. Un agente que hace tres llamadas al modelo, dos búsquedas y una llamada a una herramienta externa puede tardar treinta o cuarenta segundos — y mientras tanto, la conexión HTTP sigue abierta, el navegador del usuario espera, y muchos proxies e infraestructuras de borde cierran la conexión antes de que termine.

La pregunta que decide si algo va en la petición o fuera de ella es siempre la misma: **¿puede el usuario esperar el resultado ahí mismo?** Si la respuesta es no —porque tarda demasiado, porque depende de un tercero lento, o porque debe repetirse sin que nadie la mire— la tarea sale del ciclo petición-respuesta y se **delega** a algo que corre por su cuenta.

### El patrón mínimo

\`\`\`
Usuario → API → encola el trabajo → responde de inmediato ("procesando")
                        ↓
                    cola de trabajos
                        ↓
                     worker → ejecuta el agente → guarda el resultado
\`\`\`

La API ya no ejecuta el agente: **encola una descripción del trabajo** y devuelve una confirmación en milisegundos. Un proceso aparte —el *worker*— toma esa descripción de la cola cuando puede, ejecuta el agente completo, y guarda el resultado donde el usuario pueda consultarlo después.

### Los cinco principios que hacen esto confiable

No basta con "meterlo en segundo plano". Cinco principios, y faltar cualquiera produce un sistema que funciona en la demo y falla con tráfico real.

**Delegación.** El trabajo lento se le pasa a un worker; la API solo encola y confirma. Si la API ejecutara el agente directamente en un hilo de fondo del mismo proceso, un reinicio del servidor —un deploy, un crash— se lleva el trabajo con él sin dejar rastro.

**Desacoplamiento.** El productor (la API que encola) no sabe nada del consumidor (el worker que ejecuta). Pueden escalar por separado, desplegarse por separado, y si el worker está ocupado, los trabajos simplemente esperan en la cola en vez de perderse.

**Idempotencia.** Ejecutar el mismo trabajo dos veces produce el mismo resultado, sin duplicar efectos. Esto no es opcional: las colas garantizan **al menos una entrega**, nunca exactamente una. Un worker puede procesar el mismo mensaje dos veces si se cae justo después de terminar y antes de confirmar que terminó.

\`\`\`python
# Sin idempotencia: dos ejecuciones del mismo trabajo envían dos correos
def procesar(pedido_id: str):
    enviar_correo_confirmacion(pedido_id)

# Con clave de idempotencia: la segunda ejecución no repite el efecto
def procesar(pedido_id: str):
    if ya_se_proceso(clave=f"confirmacion:{pedido_id}"):
        return
    enviar_correo_confirmacion(pedido_id)
    marcar_procesado(clave=f"confirmacion:{pedido_id}")
\`\`\`

El patrón **upsert** —insertar o actualizar según exista— cumple lo mismo para escrituras en base de datos: ejecutarlo dos veces dos veces deja la fila en el mismo estado, no crea una fila duplicada.

**Observabilidad.** Sin poder ver el estado de un trabajo, "está tardando" y "se perdió" son indistinguibles. Cada trabajo necesita un estado consultable: encolado, procesando, completado, fallido.

**Durabilidad.** Si el worker se cae a la mitad, el trabajo no debe desaparecer. Una cola respaldada por disco —no una lista en memoria de Python— sobrevive a un reinicio.

### El error más común: una lista en memoria

\`\`\`python
# Esto NO es una cola. Es una ilusión de cola.
trabajos_pendientes: list[dict] = []

def encolar(trabajo: dict):
    trabajos_pendientes.append(trabajo)
\`\`\`

Funciona perfecto en desarrollo, con un solo proceso. Se rompe en cuanto: el proceso se reinicia (la lista desaparece con él, sin ningún registro de qué se perdió), hay más de un servidor (cada uno tiene su propia lista, y un trabajo encolado en el servidor 1 nunca lo ve el worker que corre en el servidor 2 — el mismo problema de estado pegado a un proceso que ya viste con los checkpoints de un agente). Una cola de verdad —Redis, una tabla de Postgres con \`SELECT ... FOR UPDATE SKIP LOCKED\`, o un servicio administrado— resuelve los dos problemas a la vez: sobrevive a un reinicio y es visible desde cualquier servidor.`,
      tasks: [
        'Identifica en un sistema tuyo una tarea que hoy corre dentro de la petición HTTP y debería delegarse',
        'Diseña la clave de idempotencia para una tarea tuya con efectos secundarios (enviar algo, cobrar algo, escribir algo)',
        'Explica con tus palabras por qué "al menos una entrega" obliga a que el procesamiento sea idempotente',
        'Busca en tu código alguna cola implementada como lista en memoria y documenta qué pasaría si el proceso se reinicia',
      ],
      tip: 'La pregunta que decide si algo va en la petición HTTP: "si el usuario cierra la pestaña ahora mismo, ¿debería el trabajo seguir corriendo de todas formas?". Si la respuesta es sí, ya no pertenece al ciclo petición-respuesta.',
      completed: false,
    },
    {
      id: 'async-l2',
      title: 'Una cola de verdad: productor, worker y estado consultable',
      type: 'reading',
      difficulty: 'profesional',
      content: `## De la idea a algo que corre

La lección anterior explicó los principios. Esta los pone en código, con **Redis Queue (RQ)** como ejemplo — sencillo de razonar, y el patrón se traslada directo a Celery o a cualquier otra cola cuando el volumen lo justifique.

### El productor: encolar y responder

\`\`\`python
from redis import Redis
from rq import Queue

conexion = Redis.from_url(REDIS_URL)
cola = Queue("agentes", connection=conexion)

@router.post("/tareas/analizar-documento")
def crear_tarea(documento_id: str):
    trabajo = cola.enqueue(ejecutar_agente_analisis, documento_id)
    return {"tarea_id": trabajo.id, "estado": "encolado"}
\`\`\`

La API responde en milisegundos con un identificador. El agente todavía no se ejecutó — solo se describió el trabajo y se puso en la cola.

### El worker: consumir y ejecutar

\`\`\`python
# worker.py — proceso APARTE, se ejecuta con: rq worker agentes
def ejecutar_agente_analisis(documento_id: str) -> dict:
    marcar_estado(documento_id, "procesando")
    try:
        resultado = agente.invoke({"documento_id": documento_id})
        marcar_estado(documento_id, "completado", resultado=resultado)
        return resultado
    except Exception as e:
        marcar_estado(documento_id, "fallido", error=str(e))
        raise
\`\`\`

Este archivo corre como su **propio proceso**, separado del servidor de la API — es el desacoplamiento de la lección anterior hecho explícito. Puedes tener cero, uno o veinte workers corriendo esta misma función, y escalarlos según cuántos trabajos se acumulen en la cola, sin tocar la API en absoluto.

### El estado consultable

\`\`\`python
def marcar_estado(id: str, estado: str, **datos):
    db.execute(
        "UPDATE tareas SET estado = %s, datos = %s, actualizado_el = now() WHERE id = %s",
        (estado, json.dumps(datos), id),
    )

@router.get("/tareas/{tarea_id}")
def consultar_tarea(tarea_id: str):
    return db.tarea(tarea_id)  # {"estado": "procesando", ...}
\`\`\`

El cliente que encoló el trabajo hace *polling* a este endpoint —o recibe una notificación cuando cambia, que es el módulo de tiempo real— para saber en qué punto está. Sin esta tabla, "¿terminó ya?" no tiene respuesta salvo mirar los logs del worker a mano.

### Reintentos con backoff, no reintentos inmediatos

Un trabajo puede fallar por una razón transitoria —el proveedor del modelo tuvo un pico, una API externa timeoueó— y reintentar de inmediato multiplica la presión justo cuando el recurso ya está saturado, el mismo problema que ya viste con los límites de tasa de un proveedor de modelos.

\`\`\`python
from rq import Retry

cola.enqueue(
    ejecutar_agente_analisis,
    documento_id,
    retry=Retry(max=3, interval=[10, 30, 90]),   # backoff creciente
)
\`\`\`

Fíjate en que los intervalos crecen: 10 segundos, luego 30, luego 90. Un fallo transitorio de un segundo se resuelve solo en el primer reintento; un fallo persistente no satura el sistema reintentando cada segundo durante una hora.

### Qué NO reintentar

No todos los fallos son transitorios. Un documento con un formato que el agente no puede procesar va a fallar exactamente igual la segunda y la tercera vez — reintentarlo es desperdiciar tiempo de worker en algo que nunca va a funcionar. Distinguir el tipo de error antes de decidir si reintentar:

\`\`\`python
def ejecutar_agente_analisis(documento_id: str) -> dict:
    try:
        return agente.invoke({"documento_id": documento_id})
    except (TimeoutError, RateLimitError):
        raise  # transitorio: RQ lo reintenta según la política
    except FormatoInvalidoError as e:
        marcar_estado(documento_id, "fallido_permanente", error=str(e))
        return None  # no propagues: reintentar esto no cambia nada
\`\`\`

### Cuándo Celery en vez de RQ

RQ es más simple de operar y razonar; Celery tiene más funciones —colas con distintas prioridades, tareas programadas integradas, mejor soporte multi-lenguaje— a cambio de más piezas que administrar. La decisión es la misma que con self-hospedar un modelo: se justifica cuando el volumen o la complejidad de verdad lo requieren, no por adelantado. Para la mayoría de los sistemas que vas a construir, empezar con RQ y migrar si hace falta es más barato que empezar con Celery sin necesitarlo todavía.`,
      tasks: [
        'Implementa una cola con RQ: un productor que encola, un worker que procesa, y una tabla de estado consultable',
        'Añade reintentos con backoff creciente y provoca un fallo transitorio para verlo funcionar',
        'Distingue en tu código un error que debería reintentarse de uno que no, y trátalos de forma distinta',
        'Levanta dos workers a la vez y comprueba que ambos toman trabajos de la misma cola sin pisarse',
      ],
      tip: 'Si tu "cola" es una lista de Python en el mismo proceso que la API, no tienes desacoplamiento: tienes una función que se ejecuta un poco más tarde en el mismo lugar donde puede fallar. El punto entero de una cola es que sobreviva a que ese proceso muera.',
      completed: false,
    },
    {
      id: 'async-l3',
      title: 'Qué dispara un trabajo: los cinco tipos de disparador',
      type: 'reading',
      difficulty: 'profesional',
      content: `## No todos los trabajos empiezan igual

Hasta ahora el trabajo lo disparaba un usuario pidiendo algo. Es solo uno de **cinco** tipos, y confundirlos lleva a implementar el mecanismo equivocado — un cron para algo que debería reaccionar a un evento, o un webhook mal protegido para algo que debería ser una tarea programada.

### 1. Activado por el usuario

Una acción explícita encola el trabajo y la API confirma de inmediato:

\`\`\`python
@router.post("/documentos/{id}/analizar")
def solicitar_analisis(id: str):
    cola.enqueue(analizar_documento, id)
    return {"estado": "encolado"}
\`\`\`

Es el caso más simple: hay alguien esperando una confirmación, y el trabajo se hace visible con un identificador que puede consultar después.

### 2. Máquina o telemetría

Una condición del sistema —no una persona— dispara el trabajo: un umbral de uso superado, un error repetido, una métrica fuera de rango.

\`\`\`python
# En el pipeline de telemetría del módulo de evaluación:
if tasa_de_error_ultima_hora > 0.05:
    cola.enqueue(alertar_equipo, motivo="tasa_de_error_alta")
\`\`\`

Este es el disparador que conecta el módulo de evaluación con el de procesamiento asíncrono: la deriva que detecta la evaluación periódica puede, en vez de solo generar un panel, disparar directamente un trabajo de alerta.

### 3. Cron: por horario

Se ejecuta a intervalos fijos, sin que nada externo lo pida: cada noche, cada hora, el primer día del mes. La siguiente lección es enteramente sobre este tipo.

### 4. Webhook de terceros

Un servicio externo notifica que algo pasó, y esa notificación dispara el trabajo — el pago se confirmó, el documento terminó de procesarse en otro sistema, un formulario se envió.

\`\`\`python
@router.post("/webhooks/pago-confirmado")
def webhook_pago(payload: PagoConfirmado, firma: str = Header(...)):
    if not verificar_firma(payload, firma):
        raise HTTPException(401)  # nunca proceses un webhook sin verificar su origen
    cola.enqueue(procesar_pago_confirmado, payload.pedido_id)
    return {"recibido": True}
\`\`\`

La verificación de firma no es opcional: un endpoint de webhook sin ella es una forma de que cualquiera dispare tu lógica de negocio con una petición fabricada — la misma disciplina de autenticación de siempre, aplicada a un remitente que no es una persona con sesión.

### 5. Encadenado

Un trabajo, al terminar, dispara el siguiente. Es lo que convierte tareas individuales en un flujo de varios pasos:

\`\`\`python
def procesar_documento(id: str):
    texto = extraer_texto(id)
    cola.enqueue(generar_resumen, id, texto)   # el siguiente eslabón

def generar_resumen(id: str, texto: str):
    resumen = agente.invoke({"texto": texto})
    cola.enqueue(notificar_usuario, id, resumen)
\`\`\`

Cada eslabón sigue siendo idempotente y observable por su cuenta — encadenar no exime de los cinco principios de la primera lección, los aplica a cada paso.

### El marco de decisión

Antes de implementar, tres preguntas en orden:

1. **¿Hay una persona esperando una confirmación inmediata?** → activado por usuario.
2. **¿Se repite a intervalos regulares sin depender de un evento?** → cron.
3. **¿Lo dispara algo que pasó — dentro del sistema, o fuera de él?** → máquina/telemetría si es interno, webhook si es externo, encadenado si es la continuación de otro trabajo.

Elegir mal no es solo estético. Un cron para algo que debería reaccionar a un evento desperdicia ejecuciones comprobando "¿ya pasó?" en vano; un webhook mal verificado abre una puerta a que cualquiera dispare lógica de negocio con una petición fabricada.`,
      tasks: [
        'Clasifica tres procesos en segundo plano de un sistema tuyo según los cinco tipos de disparador',
        'Implementa un webhook con verificación de firma y demuestra que una petición sin firma válida se rechaza',
        'Diseña un trabajo encadenado de al menos dos pasos donde cada eslabón sea idempotente por separado',
        'Explica un caso donde usar cron en vez de un disparador de telemetría sería la elección equivocada, y por qué',
      ],
      tip: 'Si te encuentras escribiendo un cron que se despierta cada minuto solo para comprobar "¿ya pasó algo?", casi seguro el disparador correcto era un evento, no un horario. El cron es para lo que de verdad ocurre por horario, no para simular reactividad a base de consultar con frecuencia.',
      completed: false,
    },
    {
      id: 'async-l4',
      title: 'Cronjobs confiables: horario, solapamiento y fallos silenciosos',
      type: 'reading',
      difficulty: 'profesional',
      content: `## Automatizar lo que se repite

Un reporte nocturno, una limpieza semanal de datos temporales, una sincronización cada hora. Un **cronjob** ejecuta una función a horarios fijos sin intervención humana, y la sintaxis que describe esos horarios es de las cosas más antiguas y estables de todo Unix:

\`\`\`
 ┌───────────── minuto (0-59)
 │ ┌───────────── hora (0-23)
 │ │ ┌───────────── día del mes (1-31)
 │ │ │ ┌───────────── mes (1-12)
 │ │ │ │ ┌───────────── día de la semana (0-6, domingo=0)
 │ │ │ │ │
 0 3 * * *     → todos los días a las 3:00 AM
 0 * * * *     → cada hora, en punto
 */15 * * * *  → cada 15 minutos
\`\`\`

### Dos niveles donde configurarlo

**A nivel de sistema, con \`crontab\`.** Vive fuera de tu aplicación, en el propio sistema operativo. Sobrevive a que tu aplicación se reinicie, y corre aunque la API esté caída — que es exactamente lo que quieres para algo como un backup nocturno.

\`\`\`bash
# crontab -e
0 3 * * * cd /app && python -m scripts.exportar_telemetria >> /var/log/export.log 2>&1
\`\`\`

**A nivel de aplicación, con APScheduler dentro de FastAPI.** Vive dentro del proceso de tu API, útil cuando el trabajo necesita acceso directo al estado de la aplicación sin pasar por un script aparte.

\`\`\`python
from apscheduler.schedulers.background import BackgroundScheduler

scheduler = BackgroundScheduler()
scheduler.add_job(exportar_telemetria, "cron", hour=3)
scheduler.start()
\`\`\`

La diferencia que importa: si APScheduler vive **dentro** del proceso de la API y tienes varios servidores de la lección de arquitectura, el mismo cronjob se dispara **una vez por cada instancia** — un problema de estado pegado a un proceso que se vuelve un problema de duplicación cuando ese proceso se multiplica. Un cronjob a nivel de sistema en un único servidor dedicado, o un mecanismo de bloqueo distribuido, evita esto.

### Solapamiento: el fallo que nadie ve venir

Si un trabajo programado cada hora tarda, por algún motivo, más de una hora, la siguiente ejecución arranca **mientras la anterior sigue corriendo**. Dos instancias del mismo trabajo tocando los mismos datos a la vez producen resultados impredecibles, y el síntoma —datos duplicados, contadores incorrectos— aparece mucho después de la causa.

\`\`\`python
import fcntl

def exportar_telemetria():
    with open("/tmp/exportar_telemetria.lock", "w") as candado:
        try:
            fcntl.flock(candado, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            logging.warning("Ejecución anterior sigue en curso, se omite esta")
            return
        # ... el trabajo real ...
\`\`\`

El candado de archivo es la versión más simple; APScheduler tiene su propia opción para esto (\`max_instances=1\`). Cualquiera que sea el mecanismo, la regla es la misma: **una ejecución nueva nunca debe empezar mientras la anterior sigue viva**.

### El fallo silencioso: la trampa más cara

Un cronjob que falla y no lo dice es peor que uno que nunca existió, porque todo el mundo asume que está funcionando.

\`\`\`python
# Mal: si algo lanza excepción, nadie se entera nunca
def exportar_telemetria():
    datos = obtener_datos()
    escribir_csv(datos)

# Bien: registro estructurado y estado consultable, igual que un worker de cola
def exportar_telemetria():
    logging.info("export_iniciado", extra={"job": "exportar_telemetria"})
    try:
        datos = obtener_datos()
        escribir_csv(datos)
        logging.info("export_completado", extra={"job": "exportar_telemetria", "filas": len(datos)})
    except Exception as e:
        logging.error("export_fallido", extra={"job": "exportar_telemetria", "error": str(e)})
        raise
\`\`\`

El registro **estructurado** —campos nombrados, no una frase suelta— es lo que permite consultar después "¿cuántas veces falló este job el mes pasado?" sin tener que grepear texto libre en un archivo de log.

### Idempotencia también aquí

Si el cronjob de exportación se ejecuta dos veces el mismo día —por un reintento manual, por un fallo que obligó a relanzarlo— el resultado debe ser el mismo, no datos duplicados. Un parámetro explícito de fecha objetivo, y una tabla que registra qué fechas ya se procesaron, resuelve esto igual que la clave de idempotencia de un trabajo en cola:

\`\`\`python
def exportar_telemetria(fecha_objetivo: date):
    if ya_se_exporto(fecha_objetivo):
        logging.info("export_omitido_ya_existe", extra={"fecha": str(fecha_objetivo)})
        return
    datos = obtener_datos(fecha_objetivo)
    escribir_csv(datos, fecha_objetivo)
    marcar_exportado(fecha_objetivo)
\`\`\`

### Los tres requisitos, juntos

Un cronjob confiable no es el que nunca falla — eso no existe. Es el que **avisa cuando falla, no se solapa consigo mismo, y produce el mismo resultado si se ejecuta dos veces**. Los tres, no uno solo: observabilidad sin idempotencia todavía puede duplicar datos aunque te enteres; idempotencia sin protección de solapamiento todavía puede correr dos veces a la vez y competir por los mismos recursos.`,
      tasks: [
        'Configura un cronjob a nivel de sistema con crontab y verifica que corre aunque tu aplicación esté detenida',
        'Añade protección contra solapamiento a un trabajo programado y demuestra que la segunda ejecución se omite si la primera sigue corriendo',
        'Instrumenta un cronjob con registro estructurado que distinga iniciado, completado y fallido',
        'Hazlo idempotente por fecha objetivo y ejecútalo dos veces el mismo día para comprobar que no duplica nada',
      ],
      tip: 'Un cronjob sin registro estructurado puede llevar semanas fallando en silencio antes de que alguien lo note, casi siempre porque un cliente pregunta por un reporte que nunca llegó. El coste de instrumentarlo bien desde el primer día es mínimo comparado con ese descubrimiento.',
      completed: false,
    },
    {
      id: 'async-l5',
      title: 'Proyecto: exportación nocturna con estado y sin duplicados',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: `Vas a construir un cronjob de exportación nocturna para un sistema con agentes: cada noche, exporta las ejecuciones del día anterior —costes, latencias, resultados de evaluación— a un formato que otro proceso pueda consumir, con las tres propiedades de la lección anterior: observable, sin solapamiento, e idempotente.

El caso: dirección quiere un reporte diario de cuánto costó operar el sistema de IA el día anterior, y necesita que llegue sin que nadie tenga que ejecutar nada a mano.`,
      deliverables: [
        'Script independiente ejecutable por su cuenta (no un scheduler embebido dentro de la API)',
        'Tabla de estado con máquina de estados explícita: pendiente, procesando, completado, fallido — y nunca se queda atascado en "procesando" si el proceso muere a mitad',
        'Parámetro de fecha objetivo explícito, que permita reprocesar un día concreto para pruebas sin esperar al cron real',
        'Protección contra solapamiento: una segunda ejecución mientras la primera sigue viva se detecta y se omite',
        'Idempotencia demostrada: ejecutar el job dos veces para la misma fecha produce el mismo resultado, no datos duplicados',
        'Registro estructurado de cada ejecución: inicio, fin, filas procesadas o motivo del fallo',
        'Configuración como cronjob de sistema (crontab), documentando por qué no vive dentro del proceso de la API',
      ],
      completed: false,
    },
    {
      id: 'async-l6',
      title: 'Examen: procesamiento asíncrono',
      type: 'exam',
      difficulty: 'profesional',
      questions: [
        {
          q: 'Un agente tarda 35 segundos en responder. ¿Por qué no debería ejecutarse dentro de la misma petición HTTP que lo solicita?',
          options: [
            'Porque Python no puede ejecutar código durante más de unos segundos',
            'Porque muchos proxies e infraestructuras cierran conexiones que tardan demasiado, y el usuario queda esperando sin saber si algo sigue funcionando',
            'Porque los agentes solo pueden ejecutarse en workers, nunca en un endpoint',
            'Porque FastAPI no admite operaciones que tarden más de un segundo',
          ],
          correct: 1,
          explanation: 'El límite es de infraestructura y de experiencia, no del lenguaje. La pregunta correcta es si el usuario puede esperar el resultado ahí mismo; si tarda decenas de segundos, casi nunca puede, y el trabajo debe delegarse a un worker.',
        },
        {
          q: 'Un trabajo en cola se ejecuta dos veces por un reintento del sistema de colas. ¿Qué principio evita que eso duplique un efecto como enviar un correo?',
          options: [
            'Desacoplamiento',
            'Idempotencia: una clave que registra que el efecto ya ocurrió, para que la segunda ejecución no lo repita',
            'Observabilidad',
            'Durabilidad',
          ],
          correct: 1,
          explanation: 'Las colas garantizan "al menos una entrega", nunca "exactamente una". Sin idempotencia, cualquier reintento —normal en un sistema de colas real— duplica efectos secundarios como correos, cobros o escrituras.',
        },
        {
          q: '¿Cuál es el problema de implementar una cola de trabajos como una lista de Python en memoria dentro del proceso de la API?',
          options: [
            'Ninguno, siempre que la lista tenga un límite de tamaño',
            'No sobrevive a un reinicio del proceso y, con más de un servidor, cada uno tiene su propia lista sin visibilidad de las demás — el mismo problema de estado pegado a un proceso que rompe los checkpoints de un agente',
            'Es más lenta que una cola con Redis',
            'Python no permite listas compartidas entre threads',
          ],
          correct: 1,
          explanation: 'Es el mismo patrón de fallo de la arquitectura sin estado: cualquier cosa que un proceso recuerde solo en su propia memoria desaparece si ese proceso muere, y no la ve un segundo proceso si hay más de un servidor.',
        },
        {
          q: 'Un webhook de un proveedor de pagos llega a tu API para disparar un trabajo. ¿Qué es obligatorio antes de encolarlo?',
          options: [
            'Nada, si el webhook viene de un proveedor conocido se puede confiar en él',
            'Verificar la firma del webhook: sin eso, cualquiera que descubra la URL puede disparar la lógica de negocio con una petición fabricada',
            'Convertir el webhook en un cronjob',
            'Esperar a que el usuario confirme la operación manualmente',
          ],
          correct: 1,
          explanation: 'Un endpoint de webhook sin verificación de firma es un endpoint público que ejecuta lógica de negocio para cualquiera que adivine o descubra la URL, sin ninguna autenticación real detrás.',
        },
        {
          q: 'Un cronjob programado cada hora tarda, ocasionalmente, más de una hora en completarse. ¿Qué riesgo concreto introduce eso sin protección contra solapamiento?',
          options: [
            'El cronjob se cancela automáticamente',
            'La siguiente ejecución arranca mientras la anterior sigue corriendo, y dos instancias tocando los mismos datos a la vez pueden producir duplicados o resultados inconsistentes',
            'El sistema operativo bloquea la segunda ejecución automáticamente en todos los casos',
            'No hay ningún riesgo si el trabajo es de solo lectura',
          ],
          correct: 1,
          explanation: 'Cron no protege contra solapamiento por sí solo: si no se implementa explícitamente —un candado de archivo, max_instances=1— dos ejecuciones concurrentes del mismo trabajo son posibles y casi nunca seguras si escriben datos.',
        },
      ],
      completed: false,
    },
  ],
  resources: [
    {
      title: 'RQ (Redis Queue) — documentación oficial',
      url: 'https://python-rq.org/',
      type: 'documentation',
    },
    {
      title: 'Celery — documentación oficial',
      url: 'https://docs.celeryq.dev/',
      type: 'documentation',
    },
    {
      title: 'APScheduler — tareas programadas en Python',
      url: 'https://apscheduler.readthedocs.io/',
      type: 'documentation',
    },
    {
      title: 'Crontab.guru — construir y entender expresiones cron',
      url: 'https://crontab.guru/',
      type: 'tool',
    },
  ],
}
