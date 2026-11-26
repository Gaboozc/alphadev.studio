# Scoring Answers: Deterministic, LLM-as-a-Judge, or Human
area: AI Engineering | module: iaeng-evals — Evaluation and Observability | lesson 3
id: eval-l3 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/ingenieria-ia/iaeng-evals/eval-l3

## Content

## Three ways to score, and when to use each

**Deterministic**, whenever possible. Did it retrieve the right document? Does the JSON have the expected shape? Does the number match? It's the most reliable because it doesn't depend on another model interpreting anything — it's plain code comparing one value against another.

**With a model as a judge**, when the answer is free text and there's no single right way to phrase it. **Human**, for what genuinely matters before a launch: it doesn't scale, but reviewing 20 cases by hand is worth more than any automated metric when the decision is big.

### A poorly designed judge measures nothing

Asking a model "score this answer from 1 to 10" produces numbers that mean nothing reproducible: a 7 on one run isn't comparable to a 7 on another, and nobody can explain what separates a 7 from an 8.

The alternative is giving **binary, explicit criteria**, with structured output:

```python
from pydantic import BaseModel

class Veredicto(BaseModel):
    correcta: bool      # says essentially the same thing as the expected answer?
    completa: bool      # omits anything important?
    inventada: bool     # states anything not in the expected answer?
    motivo: str

def juzgar(esperada: str, obtenida: str) -> Veredicto:
    return modelo_juez.with_structured_output(Veredicto).invoke(f"""
Compare the obtained answer with the expected one.

EXPECTED: {esperada}
OBTAINED: {obtenida}
""")
```

With concrete criteria, two runs of the same case produce comparable verdicts, and when something fails the `motivo` field tells you why without you having to reread the entire answer.

### Calibrating the judge before trusting it

An automated judge is only useful if its verdicts resemble the ones a person reviewing the same cases would give. You verify that; you don't assume it:

1. Take 20 to 30 cases and score them **yourself**, by hand.
2. Score the same cases with the automated judge.
3. Compare. If the judge agrees with your judgment on the vast majority of cases, trust it for the rest. If it disagrees on a meaningful fraction, the problem sits in the judge prompt's criteria, not your cases — tune them and repeat calibration before relying on it.

Skipping this step is the most common way to end up with a metric going up on the dashboard while real quality — the kind a user experiences — stays flat or gets worse.

### Run on every change, not once in a while

Evaluation runs as a command, just like the test suite from the testing module:

```bash
python -m evaluacion --conjunto casos.json --salida resultados.json
```

And you always compare against the previous run, not against an isolated absolute number. What matters is the direction of change: if the score dropped compared with before your edit, something got worse, even if the number still looks "high" in the abstract.

### The golden rule of order

Building the evaluation set **before** the system — or at least before the next big change — changes the nature of the work: every modification is judged by its measured effect, not by the impression you get trying two examples by hand — the exact habit this lesson opened by pointing out as the root of systems breaking without anyone noticing.

## Tasks
- Implement deterministic scoring for everything verifiable in your system
- Design a judge with explicit binary criteria and structured output, not a free numeric score
- Calibrate the judge against 20 cases you score yourself and document the agreement rate
- Run the full eval, change one single thing in the system, and run it again comparing against the prior result

## Tip

Before trusting an automated judge to decide whether a change was good or bad, ask yourself whether you ever checked that its verdicts match yours. If you never calibrated it, you don't know if you're measuring quality or measuring that specific model's whim.
