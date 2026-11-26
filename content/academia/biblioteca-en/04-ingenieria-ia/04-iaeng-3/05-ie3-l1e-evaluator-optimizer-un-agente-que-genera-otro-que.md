# Evaluator-Optimizer: One Agent Generates, Another Critiques
area: AI Engineering | module: iaeng-3 — Agentic Workflows and Multi-Agent Systems | lesson 5
id: ie3-l1e | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-3/ie3-l1e

## Content

## The pattern missing from the list

Router, orchestrator-worker and shared blackboard solve how to split up work. None solves a different problem: **how to improve output that was already generated, without relying on getting it right on the first try**. That's what the evaluator-optimizer pattern is for — documented by Anthropic as one of the highest result-to-complexity agentic workflows there is.

## The structure

A **generator** agent produces an output. An **evaluator** agent — with a separate prompt, sometimes a different model — judges it against explicit criteria and returns a structured critique, not a bare pass/fail. If it doesn't pass, the generator gets that critique and tries again. The loop repeats until it passes or hits an attempt limit.

```python
from typing import TypedDict

class EstadoRevision(TypedDict):
    tarea: str
    borrador: str
    critica: str | None
    intentos: int
    aprobado: bool

def generar(estado: EstadoRevision) -> dict:
    if estado.get("critica"):
        prompt = f"Task: {estado['tarea']}. Previous draft: {estado['borrador']}. Fix this: {estado['critica']}"
    else:
        prompt = f"Task: {estado['tarea']}"
    borrador = modelo_generador.invoke(prompt)
    return {"borrador": borrador, "intentos": estado.get("intentos", 0) + 1}

def evaluar(estado: EstadoRevision) -> dict:
    resultado = modelo_evaluador.invoke(
        f"Evaluate this draft against criteria X, Y, Z: {estado['borrador']}"
    )
    return {"aprobado": resultado.aprobado, "critica": resultado.critica}

def decidir(estado: EstadoRevision) -> str:
    if estado["aprobado"] or estado["intentos"] >= 3:
        return "fin"
    return "generar"  # loops back with the critique in state
```

## Why the evaluator is a separate agent, not the same one reviewing its own work

Asking the same agent that generated something to evaluate it reproduces the exact bias that led it to produce that result — if its notion of "correct" was miscalibrated when generating, it'll be just as miscalibrated when judging. The evaluator works better with a separate prompt focused strictly on explicit quality criteria, and in high-stakes cases with a different model from the generator's.

## The attempt limit isn't optional

Without a cap, a demanding evaluator and a generator that fails to satisfy it produce an endless loop — burning tokens and time without limit. The attempt limit (three is a reasonable starting point) turns a potential infinite loop into, at worst, a response marked "not approved after N attempts" instead of a call that never returns.

## When it's worth it vs. a single agent with a better prompt

If a better prompt solves the quality problem, that's always the cheaper path — evaluator-optimizer adds real latency and cost (at least double the calls). The pattern pays off when quality criteria are more reliably verified by **evaluating** than by **generating in one shot** — code that must pass tests, a translation that must preserve both tone and technical accuracy, a legal answer that cannot have factual errors.

## Tasks
- Identify a task of yours where evaluating output quality is more reliable than generating it right the first time
- Build the generator-evaluator loop with a 3-attempt cap
- Write the evaluator prompt with explicit criteria, not a bare "is this good?"
- Check what your system returns when the attempt limit runs out without approval

## Tip

If you notice the generator and evaluator "agreeing" too easily on the first pass, suspect the evaluator prompt — an evaluator that approves almost everything isn't adding anything a single agent didn't already give you.
