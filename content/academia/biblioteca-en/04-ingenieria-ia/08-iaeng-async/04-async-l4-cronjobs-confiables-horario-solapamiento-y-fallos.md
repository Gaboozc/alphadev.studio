# Reliable Cron Jobs: Schedule, Overlap, and Silent Failures
area: AI Engineering | module: iaeng-async — Async Processing: Queues, Workers, and Cron | lesson 4
id: async-l4 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-async/async-l4

## Content

## Automating what repeats

A nightly report, a weekly cleanup of temporary data, an hourly sync. A **cron job** runs a function on fixed schedules with no human intervention, and the syntax describing those schedules is one of the oldest, most stable things in all of Unix:

```
 ┌───────────── minute (0-59)
 │ ┌───────────── hour (0-23)
 │ │ ┌───────────── day of month (1-31)
 │ │ │ ┌───────────── month (1-12)
 │ │ │ │ ┌───────────── day of week (0-6, Sunday=0)
 │ │ │ │ │
 0 3 * * *     → every day at 3:00 AM
 0 * * * *     → every hour, on the hour
 */15 * * * *  → every 15 minutes
```

### Two levels where you can configure it

**At the system level, with `crontab`.** Lives outside your app, in the operating system itself. Survives your app restarting, and runs even if the API is down — which is exact what you want for something like a nightly backup.

```bash
# crontab -e
0 3 * * * cd /app && python -m scripts.exportar_telemetria >> /var/log/export.log 2>&1
```

**At the app level, with APScheduler inside FastAPI.** Lives inside your API process, useful when the job needs direct access to application state without going through a separate script.

```python
from apscheduler.schedulers.background import BackgroundScheduler

scheduler = BackgroundScheduler()
scheduler.add_job(exportar_telemetria, "cron", hour=3)
scheduler.start()
```

The difference that matters: if APScheduler lives **inside** the API process and you have multiple servers from the architecture lesson, the same cron job fires **once per instance** — a process-bound state problem that turns into a duplication problem when that process multiplies. A system-level cron job on a single dedicated server, or a distributed lock, avoids this.

### Overlap: the failure nobody sees coming

If a job scheduled every hour takes, for some reason, more than an hour, the next run starts **while the previous one is still running**. Two instances of the same job touching the same data at once produce unpredictable results, and the symptom — duplicate data, wrong counters — shows up long after the cause.

```python
import fcntl

def exportar_telemetria():
    with open("/tmp/exportar_telemetria.lock", "w") as candado:
        try:
            fcntl.flock(candado, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            logging.warning("Previous run still active, skipping this one")
            return
        # ... actual work ...
```

A file lock is the simplest version; APScheduler has its own option for this (`max_instances=1`). Whatever the mechanism, the rule is the same: **a new run must never start while the previous one is still alive.**

### Silent failure: the costliest trap

A cron job that fails and doesn't say so is worse than one that never existed, because everyone assumes it's working.

```python
# Bad: if something throws an exception, nobody ever finds out
def exportar_telemetria():
    datos = obtener_datos()
    escribir_csv(datos)

# Good: structured logging and queryable status, just like a queue worker
def exportar_telemetria():
    logging.info("export_iniciado", extra={"job": "exportar_telemetria"})
    try:
        datos = obtener_datos()
        escribir_csv(datos)
        logging.info("export_completado", extra={"job": "exportar_telemetria", "filas": len(datos)})
    except Exception as e:
        logging.error("export_fallido", extra={"job": "exportar_telemetria", "error": str(e)})
        raise
```

**Structured** logging — named fields, not a loose sentence — is what lets you ask later "how many times did this job fail last month?" without having to grep free text in a log file.

### Idempotency here too

If the export cron job runs twice on the same day — because of a manual retry, or a crash that forced a relaunch — the result must be the same, not duplicate data. An explicit target-date parameter and a table recording which dates were already processed solve this just like a queued job's idempotency key:

```python
def exportar_telemetria(fecha_objetivo: date):
    if ya_se_exporto(fecha_objetivo):
        logging.info("export_omitido_ya_existe", extra={"fecha": str(fecha_objetivo)})
        return
    datos = obtener_datos(fecha_objetivo)
    escribir_csv(datos, fecha_objetivo)
    marcar_exportado(fecha_objetivo)
```

### All three requirements together

A reliable cron job isn't one that never fails — that doesn't exist. It's one that **alerts when it fails, doesn't overlap itself, and produces the same result if run twice**. All three, not just one: observability without idempotency can still duplicate data even if you hear about it; idempotency without overlap protection can still run twice at once and fight over the same resources.

## Tasks
- Set up a system-level cron job with crontab and verify it runs even when your app is stopped
- Add overlap protection to a scheduled job and demonstrate that the second run is skipped if the first is still running
- Instrument a cron job with structured logging distinguishing started, completed and failed
- Make it idempotent by target date and run it twice on the same day to verify it duplicates nothing

## Tip

A cron job without structured logging can go weeks failing silently before anyone notices, almost always because a customer asks about a report that never arrived. The cost of instrumenting it properly from day one is tiny compared with that discovery.
