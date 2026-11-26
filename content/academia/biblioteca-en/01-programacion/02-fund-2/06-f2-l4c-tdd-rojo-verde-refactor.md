# TDD: Red, Green, Refactor
area: Programming | module: fund-2 — Errors, Debugging, and Testing | lesson 6
id: f2-l4c | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/programacion/fund-2/f2-l4c

## Content

## Writing the test first

So far, tests came after the code. **Test-Driven Development** flips the order, and that change of order does more than it seems.

The cycle has three steps and repeats in minutes, not hours:

1. **Red** — you write a test for something that doesn't exist yet. It fails. *It has to* fail.
2. **Green** — you write the minimum code that makes it pass. Truly minimal, even if it's ugly.
3. **Refactor** — now that you have a safety net, you clean up. The tests tell you if you broke anything.

### A full cycle

Business rule: an order over $1,000 (1,000 pesos in the original example) gets free shipping.

**Red.** The function doesn't exist yet:

```python
def test_envio_gratis_por_encima_de_mil():
    assert costo_envio(1500) == 0
```

It fails with `NameError`. Perfect: you just verified the test can fail.

**Green.** The bare minimum:

```python
def costo_envio(total: float) -> float:
    return 0
```

Yes, it always returns zero. That's right for the only thing you've specified. The next test takes care of it:

```python
def test_envio_cuesta_150_por_debajo_de_mil():
    assert costo_envio(800) == 150
```

Red again. Now for real:

```python
def costo_envio(total: float) -> float:
    return 0 if total > 1000 else 150
```

**Refactor.** With both green, the magic number can be named without fear:

```python
UMBRAL_ENVIO_GRATIS = 1000
COSTO_ENVIO = 150

def costo_envio(total: float) -> float:
    return 0 if total > UMBRAL_ENVIO_GRATIS else COSTO_ENVIO
```

You run the tests: still green. That's all you need to know to touch the code with confidence.

And the interesting case is still missing: what happens at exactly 1,000?

```python
def test_exactamente_mil_paga_envio():
    assert costo_envio(1000) == 150
```

That question — the boundary — is what TDD forces you to ask before writing the `if`. Writing code first, `>` or `>=` gets chosen out of habit.

### Why it works

- **It forces you to define behavior before implementation.** You can't write the test without deciding what should happen.
- **It guarantees the test actually works.** A test written after the code works is one you never saw fail; it might be checking nothing.
- **It produces testable code by construction.** If it's hard to test, you notice in the first minute instead of when there are already four hundred lines.
- **Refactoring stops being scary**, which is the difference between a project that can be improved and one that freezes.

### Where not to use it

TDD shines with **business logic**: rules, calculations, validations, transformations. There you know what should come out before writing it.

It fits poorly when you're exploring and don't know what you want yet — a prototype, tweaking a UI, trying out a new library. There, write code, decide what you want, and add tests once the shape is clear.

### Antipatterns you'll run into

- **Testing implementation instead of behavior.** If renaming a private variable breaks six tests, they're coupled to the *how*, not the *what*.
- **One giant test that checks everything.** When it fails you don't know what broke. One failure reason per test.
- **Chasing 100% coverage.** It leads to testing getters and constants while the tricky calculation still lacks a single edge case.
- **Tests that depend on order.** If they have to run in sequence, they share state and lie.

## Tasks
- Take an unimplemented business rule and write the test before the code
- Verify that the test fails for the right reason before writing anything
- Run the full cycle three times in a row without skipping the refactor step
- Find a test in your suite that's coupled to the implementation and rewrite it against behavior

## Tip

The sign that you're really doing TDD and not theater: you saw the test in red. If it never failed, you don't know whether it checks anything — and a test that always passes is worse than none, because it gives false confidence.
