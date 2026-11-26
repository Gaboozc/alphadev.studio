# Testing in Python with pytest
area: Programming | module: fund-2 — Errors, Debugging, and Testing | lesson 5
id: f2-l4b | type: reading | difficulty: intermediate
url: https://www.alphadev.studio/en/academia/programacion/fund-2/f2-l4b

## Content

## The equivalent in the other language

What you did with Vitest in TypeScript is done with **pytest** in Python. The ideas are the same; the syntax changes, and pytest has an idea of its own worth understanding: **fixtures**.

```bash
pip install pytest
```

### The first test

pytest doesn't require you to import anything to get started. A function starting with `test_` is a test, and `assert` is the whole API.

```python
# precios.py
def con_iva(precio: float, tasa: float = 0.16) -> float:
    if precio < 0:
        raise ValueError("Price cannot be negative")
    return round(precio * (1 + tasa), 2)
```

```python
# test_precios.py
import pytest
from precios import con_iva

def test_aplica_el_iva_por_defecto():
    assert con_iva(100) == 116.0

def test_redondea_a_dos_decimales():
    assert con_iva(33.333) == 38.67

def test_precio_negativo_lanza_error():
    with pytest.raises(ValueError, match="cannot be negative"):
        con_iva(-1)
```

```bash
pytest -v
```

When a test fails, pytest rewrites the `assert` to show you both compared values. You don't need `assertEqual` or hand-written messages.

### One case, many inputs

Repeating the same test with different values is so common that it has its own syntax:

```python
@pytest.mark.parametrize(
    "precio,esperado",
    [
        (0, 0.0),
        (100, 116.0),
        (0.01, 0.01),
        (999999, 1159998.84),
    ],
)
def test_con_iva(precio, esperado):
    assert con_iva(precio) == esperado
```

Each tuple is an independent test with its own name in the output. If the third case fails, you know exactly which one without reading code.

Notice which values are there: zero, a normal case, the minimum, and a large one. Those are the **edge cases**, which is where real bugs live. The happy path almost never fails.

### Fixtures: setting the stage

A fixture is something several tests need ready before running: sample data, a connection, a temporary file.

```python
@pytest.fixture
def carrito():
    return [
        {"nombre": "Laptop", "precio": 1200.0},
        {"nombre": "Mouse", "precio": 25.0},
    ]

def test_total_del_carrito(carrito):
    assert sum(p["precio"] for p in carrito) == 1225.0

def test_el_carrito_no_llega_vacio(carrito):
    assert len(carrito) == 2
```

Ask for the fixture by name as a parameter and pytest builds it. And it builds it **fresh for every test**: if one modifies the cart, the next one gets a clean copy. That isolation is what prevents execution order from changing the result.

For things you need to clean up afterward — a file, a connection — you use `yield`:

```python
@pytest.fixture
def archivo_temporal(tmp_path):
    ruta = tmp_path / "datos.json"
    ruta.write_text('{"activo": true}', encoding="utf-8")
    yield ruta
    # code below runs when the test finishes, whether it passes or fails
```

`tmp_path` is a built-in pytest fixture: a separate temporary folder per test that deletes itself automatically.

### How much of your code is tested

```bash
pip install pytest-cov
pytest --cov=. --cov-report=term-missing
```

`term-missing` is the useful part: it lists the **specific lines** no test executes. That's where to look.

And the usual warning: coverage measures what runs, not what gets checked. A test that calls a function with no `assert` gives 100% coverage and verifies nothing.

## Tasks
- Write tests with pytest for one of your own functions, including a case that should raise an exception
- Turn three nearly identical tests into one using parametrize
- Create a fixture with sample data and use it from two different tests
- Run pytest --cov with term-missing and write a test for the most important uncovered line

## Tip

If a test passes when you run it alone but fails alongside the others, there's shared state between them. Almost always it's module-level data that one test modified: that's exactly what fixtures prevent.
