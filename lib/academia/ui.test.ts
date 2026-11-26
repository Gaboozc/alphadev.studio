import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  acentoDeRama,
  contadoresDeLeccion,
  debeMostrarSegmentos,
  estadoPieza,
  extraerH2,
  formatoContador,
  formatoTiempoMin,
  leccionContinuar,
  listaEnEspanol,
  slugSeccion,
  tipoDePieza,
} from './ui.ts'

describe('extraerH2 y segmentos', () => {
  it('cuenta h2 fuera de fences y genera slugs únicos', () => {
    const content = `## Uno\ntexto\n## Dos\n\`\`\`\n## No cuenta\n\`\`\`\n## Uno\n`
    const secs = extraerH2(content)
    assert.deepEqual(
      secs.map((s) => s.title),
      ['Uno', 'Dos', 'Uno'],
    )
    assert.equal(secs[0].slug, 'uno')
    assert.equal(secs[2].slug, 'uno-2')
  })

  it('0 o 1 h2 → sin barra; >1 sí', () => {
    assert.equal(debeMostrarSegmentos([]), false)
    assert.equal(debeMostrarSegmentos([{ title: 'A', slug: 'a' }]), false)
    assert.equal(
      debeMostrarSegmentos([
        { title: 'A', slug: 'a' },
        { title: 'B', slug: 'b' },
      ]),
      true,
    )
  })
})

describe('slugSeccion', () => {
  it('normaliza acentos y puntuación', () => {
    assert.equal(slugSeccion('El reparto de responsabilidades'), 'el-reparto-de-responsabilidades')
    assert.equal(slugSeccion('¿Qué es?'), 'que-es')
  })
})

describe('formatoContador y tiempo', () => {
  it('nunca 0/0: total 0 → null', () => {
    assert.equal(formatoContador(0, 0, 'secciones'), null)
    assert.equal(formatoContador(2, 5, 'secciones'), '2/5 secciones')
  })

  it('tiempo con aprox.', () => {
    assert.equal(formatoTiempoMin(25), '25 min aprox.')
  })
})

describe('acentoDeRama', () => {
  it('mapea ramas a car-a/b/c', () => {
    assert.equal(acentoDeRama('programacion'), 'a')
    assert.equal(acentoDeRama('ia'), 'a')
    assert.equal(acentoDeRama('iaeng'), 'a')
    assert.equal(acentoDeRama('diseno'), 'b')
    assert.equal(acentoDeRama('marketing'), 'c')
    assert.equal(acentoDeRama('contenido'), 'c')
    assert.equal(acentoDeRama('negocio'), 'c')
  })
})

describe('tipoDePieza', () => {
  it('mapea tipos reales a etiqueta e icono', () => {
    assert.equal(tipoDePieza('reading').icon, 'book-open')
    assert.equal(tipoDePieza('practice').label, 'Ejercicio')
    assert.equal(tipoDePieza('exam').icon, 'list-checks')
    assert.equal(tipoDePieza('project').icon, 'folder-kanban')
  })
})

describe('estadoPieza y Continuar', () => {
  it('estados', () => {
    assert.equal(estadoPieza(true, false), 'completada')
    assert.equal(estadoPieza(false, true), 'en_curso')
    assert.equal(estadoPieza(false, false), 'sin_empezar')
  })

  it('Continuar: primera incompleta o última si todas hechas', () => {
    const lessons = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    assert.equal(
      leccionContinuar(lessons, (id) => id === 'a'),
      'b',
    )
    assert.equal(
      leccionContinuar(lessons, () => true),
      'c',
    )
  })
})

describe('contadoresDeLeccion', () => {
  it('solo incluye tipos con total > 0', () => {
    const c = contadoresDeLeccion({
      type: 'reading',
      content: '## A\n## B\n',
      tasks: ['x'],
    })
    assert.deepEqual(c, [
      { label: 'secciones', total: 2 },
      { label: 'comprobaciones rápidas', total: 1 },
    ])
  })
})

describe('listaEnEspanol', () => {
  it('usa conjunción larga en español', () => {
    assert.equal(listaEnEspanol(['1', '2', '3', '4', '5', '6']), '1, 2, 3, 4, 5 y 6')
    assert.equal(listaEnEspanol(['1', '2']), '1 y 2')
    assert.equal(listaEnEspanol(['4']), '4')
    assert.equal(listaEnEspanol([]), '')
  })
})
