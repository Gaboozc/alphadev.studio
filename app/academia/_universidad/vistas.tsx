// Vistas del catálogo tipo universidad. Componentes de SERVIDOR: no usan
// estado ni efectos, así que el contenido (markdown ya convertido a HTML) no
// viaja como JavaScript al cliente.
//
// Diseño: solo clases y tokens que ya existen en globals.css / academia.css
// (acad-page, acad-head, acad-mod, acad-item, acad-badge, acad-chip…). El
// diseño definitivo del catálogo es de Arkano y Rams; ver las dudas anotadas
// en /workspace/alphadev/estado/hefesto-academia-es-en.md.

import Link from 'next/link'
import { notFound } from 'next/navigation'
import Icon from '@/components/Icon'
import {
  CARRERAS,
  type Catalogo,
  type Curso,
  type Lang,
  type LeccionLegado,
  PROGRAMAS,
  type Programa,
  UI,
  cursoPorCodigo,
  cursoPorSlug,
  cursosDePrograma,
  etiquetaLegado,
  leccionesDePrograma,
  leccionesQueAlimentan,
  numeroUnidadSlug,
  prerrequisitos,
  programaPorId,
  programaPorSlug,
  rutaBiblioteca,
  rutaCurso,
  rutaGlosario,
  rutaLeccionLegado,
  rutaPortada,
  rutaPrograma,
  rutaUnidad,
  semestresDe,
  sinPrefijoUnidad,
  tieneContenidoNuevo,
  tituloCurso,
  unidadesCurso,
} from '@/lib/academia/universidad'
import { bloquesUnidad, existeUnidad, getCatalogo, leerArchivo, leerGlosario, unidadesS0 } from './contenido'

function nombrePrograma(p: Programa, lang: Lang) {
  return lang === 'en' ? p.en : p.es
}

function Crumb({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="acad-crumb">
      <span style={{ display: 'flex', transform: 'rotate(180deg)' }}>
        <Icon name="arrowRight" size={14} />
      </span>
      {children}
    </Link>
  )
}

/** Aviso cuando lo que se ve está en español dentro de /en/academia. */
export function AvisoSoloEs({ lang = 'en' }: { lang?: Lang }) {
  return (
    <div className="acad-callout acad-callout--aviso acad-aviso-idioma" role="note" lang="en">
      <p className="acad-callout__text" style={{ margin: 0 }}>
        {UI[lang].soloEs}.
      </p>
    </div>
  )
}

function EstadoCurso({ curso, lang }: { curso: Curso; lang: Lang }) {
  const t = UI[lang]
  return tieneContenidoNuevo(curso) ? (
    <span className="acad-badge">{t.disponible}</span>
  ) : (
    <span className="acad-badge acad-badge-neutral">{t.enPreparacion}</span>
  )
}

function Prerrequisito({ curso, cat, lang }: { curso: Curso; cat: Catalogo; lang: Lang }) {
  const pre = prerrequisitos(curso)
  if (pre.length === 0) return null
  return (
    <p className="acad-prereq">
      {UI[lang].recomendamos('')}
      {pre.map((code, i) => {
        const c = cursoPorCodigo(cat, code)
        return (
          <span key={code}>
            {i > 0 ? ', ' : ''}
            {c ? <Link href={rutaCurso(c, lang)}>{code}</Link> : code}
          </span>
        )
      })}
    </p>
  )
}

function TarjetaCurso({ curso, lang }: { curso: Curso; lang: Lang }) {
  const t = UI[lang]
  return (
    <Link href={rutaCurso(curso, lang)} className="acad-mod" data-curso={curso.code}>
      <div className="acad-mod-num acad-mod-num--codigo" style={{ width: 'auto', padding: '0 0.5rem', minWidth: '2.25rem' }}>
        {curso.semester === '—' ? 'OPT' : curso.semester}
      </div>
      <div className="acad-mod-body">
        <h3>
          <span className="acad-codigo">{curso.code}</span>
          <span aria-hidden="true"> · </span>
          {tituloCurso(curso, lang)}
        </h3>
        <div className="acad-mod-meta">
          <EstadoCurso curso={curso} lang={lang} /> {t.horas(curso.hours)} · {unidadesCurso(curso, lang).length}{' '}
          {t.unidades.toLowerCase()}
        </div>
      </div>
      <span className="acad-mod-arrow">
        <Icon name="arrowRight" size={18} />
      </span>
    </Link>
  )
}

// ─── Portada ────────────────────────────────────────────────────────────────

export function PortadaUniversidad({ lang }: { lang: Lang }) {
  const t = UI[lang]
  const cat = getCatalogo()
  const s0 = cursosDePrograma(cat, 'S0')
  const horasS0 = s0.reduce((a, c) => a + c.hours, 0)

  return (
    <div className="acad-page" data-vista="portada" data-lang={lang}>
      <div className="acad-wrap">
        <header className="acad-head">
          <p className="eyebrow acad-eyebrow-portada">
            <span className="acad-eyebrow-marca">{t.eyebrowMarca}</span>
            {t.eyebrowPrivado}
          </p>
          <h1>{t.academia}</h1>
          <p>{t.portadaIntro}</p>
          <div className="acad-stats">
            <div>
              <span className="acad-stat-num">{cat.courses.length}</span>
              <span className="acad-stat-label">{t.cursosLabel}</span>
            </div>
            <div>
              <span className="acad-stat-num">{CARRERAS.length}</span>
              <span className="acad-stat-label">{t.carreras}</span>
            </div>
            <div>
              <span className="acad-stat-num">{cat.legacy_lessons.length}</span>
              <span className="acad-stat-label">{t.biblioteca}</span>
            </div>
          </div>
        </header>

        {/* 1. Semestre 0 */}
        <section className="acad-area" aria-labelledby="sec-s0">
          <div className="acad-familia-head">
            <h2 id="sec-s0">
              <Link href={rutaPrograma('S0', lang)}>{nombrePrograma(programaPorId('S0'), lang)}</Link>
            </h2>
            <span>
              {t.empiezaAqui} · {t.horas(horasS0)}
            </span>
          </div>
          <div className="acad-mods">
            {s0.map((c) => (
              <TarjetaCurso key={c.code} curso={c} lang={lang} />
            ))}
          </div>
          <p className="acad-recurso-link">
            <Link href={rutaGlosario(lang)}>{t.glosario}</Link>
          </p>
        </section>

        {/* 2. Carreras */}
        <section className="acad-familia" aria-labelledby="sec-carreras">
          <div className="acad-familia-head">
            <h2 id="sec-carreras">{t.carreras}</h2>
            <span>{t.carrerasIntro}</span>
          </div>
          <div className="acad-ramas">
            {CARRERAS.map((id) => {
              const p = programaPorId(id)
              const cursos = cursosDePrograma(cat, id)
              const horas = cursos.reduce((a, c) => a + c.hours, 0)
              return (
                <Link key={id} href={rutaPrograma(p, lang)} className="acad-rama" data-programa={id}>
                  <h3>{nombrePrograma(p, lang)}</h3>
                  <p>
                    S1–S6 · {t.cursos(cursos.length)} · {t.horas(horas)}
                  </p>
                  <div className="acad-rama-foot">
                    <span>{id}</span>
                    <span className="acad-go">
                      {t.abrir} <Icon name="arrowRight" size={14} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* 3. Optativas */}
        <section className="acad-area" aria-labelledby="sec-opt">
          <div className="acad-familia-head">
            <h2 id="sec-opt">
              <Link href={rutaPrograma('OPT', lang)}>{t.optativas}</Link>
            </h2>
          </div>
          <div className="acad-mods">
            {cursosDePrograma(cat, 'OPT').map((c) => (
              <TarjetaCurso key={c.code} curso={c} lang={lang} />
            ))}
          </div>
        </section>

        {/* 4. Biblioteca */}
        <section className="acad-feature-grid" style={{ marginBottom: '3.5rem' }}>
          <Link href={rutaBiblioteca(lang)} className="acad-feature">
            <div className="acad-feature-top">
              <Icon name="bookOpen" size={18} />
              <span>{t.biblioteca}</span>
            </div>
            <h3>{t.lecciones(cat.legacy_lessons.length)}</h3>
            <p>{t.bibliotecaIntro}</p>
          </Link>
        </section>
      </div>
    </div>
  )
}

// ─── Programa (S0, carrera u optativas) ───────────────────────────────────────

export function ProgramaVista({ slug, lang }: { slug: string; lang: Lang }) {
  const p = programaPorSlug(slug)
  if (!p) notFound()
  const t = UI[lang]
  const cat = getCatalogo()
  const cursos = cursosDePrograma(cat, p.id)
  const leccionesPrograma = leccionesDePrograma(cat, p.id)

  return (
    <div className="acad-page" data-vista="programa" data-lang={lang}>
      <div className="acad-wrap">
        <Crumb href={rutaPortada(lang)}>{t.todaLaAcademia}</Crumb>
        <header className="acad-head">
          <p className="eyebrow">{t.academia}</p>
          <h1>{nombrePrograma(p, lang)}</h1>
          <div className="acad-stats">
            <div>
              <span className="acad-stat-num">{cursos.length}</span>
              <span className="acad-stat-label">{t.cursosLabel}</span>
            </div>
            <div>
              <span className="acad-stat-num">{cursos.reduce((a, c) => a + c.hours, 0)}</span>
              <span className="acad-stat-label">{t.horasLabel}</span>
            </div>
          </div>
        </header>
        {semestresDe(cursos).map((s) => (
          <section key={s} className="acad-area">
            {s !== '—' && (
              <div className="acad-area-head">
                <div>
                  <h2>{t.semestre(s)}</h2>
                </div>
              </div>
            )}
            <div className="acad-mods">
              {cursos
                .filter((c) => c.semester === s)
                .map((c) => (
                  <TarjetaCurso key={c.code} curso={c} lang={lang} />
                ))}
            </div>
          </section>
        ))}

        {p.id === 'S0' && (
          <section className="acad-area" aria-labelledby="sec-recursos" data-seccion="recursos">
            <div className="acad-area-head">
              <div>
                <h2 id="sec-recursos">{t.recursos}</h2>
              </div>
            </div>
            <div className="acad-mods">
              <Link href={rutaGlosario(lang)} className="acad-mod" data-recurso="glosario-es-en">
                <div className="acad-mod-num acad-mod-num--codigo">ES·EN</div>
                <div className="acad-mod-body">
                  <h3>{t.glosario}</h3>
                  <div className="acad-mod-meta">{t.glosarioIntro}</div>
                </div>
                <span className="acad-mod-arrow">
                  <Icon name="arrowRight" size={18} />
                </span>
              </Link>
            </div>
          </section>
        )}

        {leccionesPrograma.length > 0 && (
          <section className="acad-area" aria-labelledby="sec-legado-programa" data-seccion="legado-programa">
            <div className="acad-area-head">
              <div>
                <h2 id="sec-legado-programa">{t.leccionesCarrera}</h2>
                <p>{t.leccionesCarreraIntro}</p>
              </div>
            </div>
            <ListaLegado lecciones={leccionesPrograma} lang={lang} />
          </section>
        )}
      </div>
    </div>
  )
}

// ─── Curso ────────────────────────────────────────────────────────────────────

function ListaLegado({ lecciones, lang }: { lecciones: LeccionLegado[]; lang: Lang }) {
  return (
    <ul className="acad-legado">
      {lecciones.map((l) => (
        <li key={l.legacy_key} data-legacy={l.legacy_key}>
          <Link href={rutaLeccionLegado(l, lang)} className="acad-legado__titulo">
            {l.titulo}
          </Link>
          <span className="acad-legado__meta">
            <span className={`acad-badge${l.decision === 'retirar' ? '' : ' acad-badge-neutral'}`}>
              {etiquetaLegado(l, lang)}
            </span>
            <span className="acad-legado__key">{l.legacy_key}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

function Html({ html }: { html: string }) {
  return <div className="acad-md" dangerouslySetInnerHTML={{ __html: html }} />
}

export function CursoVista({ programa, curso: slug, lang }: { programa: string; curso: string; lang: Lang }) {
  const p = programaPorSlug(programa)
  if (!p) notFound()
  const cat = getCatalogo()
  const curso = cursoPorSlug(cat, p.id, slug)
  if (!curso) notFound()
  const t = UI[lang]
  const alimentan = leccionesQueAlimentan(cat, curso.code)
  const s0 = tieneContenidoNuevo(curso)
  const syllabus = s0 ? leerArchivo(curso, '00-syllabus.md', lang, { bajar: true }) : null
  const unidades = s0 ? unidadesS0(curso, lang) : []

  return (
    <div className="acad-page" data-vista="curso" data-lang={lang} data-curso={curso.code}>
      <div className="acad-wrap">
        <Crumb href={rutaPrograma(p, lang)}>{nombrePrograma(p, lang)}</Crumb>
        <header className="acad-head">
          <p className="eyebrow">
            {curso.code} · {curso.semester === '—' ? t.optativas : t.semestre(curso.semester)}
          </p>
          <h1>{tituloCurso(curso, lang)}</h1>
          <p>
            <EstadoCurso curso={curso} lang={lang} /> {t.horas(curso.hours)} · {t.semanas(curso.weeks, curso.hours_per_week)}
          </p>
          <Prerrequisito curso={curso} cat={cat} lang={lang} />
        </header>

        {syllabus?.fallback && <AvisoSoloEs />}

        <section className="acad-area" aria-labelledby="sec-unidades">
          <div className="acad-area-head">
            <div>
              <h2 id="sec-unidades">{t.unidades}</h2>
            </div>
          </div>
          {s0 ? (
            <div className="acad-mods">
              {unidades.map((u, i) => (
                <Link key={u.slug} href={rutaUnidad(curso, u.slug, lang)} className="acad-mod" data-unidad={u.slug}>
                  <div className="acad-mod-num">{u.enriquecida ? '+' : i + 1}</div>
                  <div className="acad-mod-body">
                    <h3>{u.titulo}</h3>
                  </div>
                  <span className="acad-mod-arrow">
                    <Icon name="arrowRight" size={18} />
                  </span>
                </Link>
              ))}
              {existeUnidad(curso, 'checkpoint') && (
                <Link href={rutaUnidad(curso, 'checkpoint', lang)} className="acad-mod">
                  <div className="acad-mod-num">✓</div>
                  <div className="acad-mod-body">
                    <h3>{t.checkpoint}</h3>
                  </div>
                  <span className="acad-mod-arrow">
                    <Icon name="arrowRight" size={18} />
                  </span>
                </Link>
              )}
              {existeUnidad(curso, 'proyecto-final') && (
                <Link href={rutaUnidad(curso, 'proyecto-final', lang)} className="acad-mod acad-mod-capstone">
                  <div className="acad-mod-num">★</div>
                  <div className="acad-mod-body">
                    <h3>{t.proyectoFinal}</h3>
                  </div>
                  <span className="acad-mod-arrow">
                    <Icon name="arrowRight" size={18} />
                  </span>
                </Link>
              )}
            </div>
          ) : (
            <ol className="acad-unidades">
              {unidadesCurso(curso, lang).map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ol>
          )}
        </section>

        {!s0 && (
          <section className="acad-area" aria-labelledby="sec-legado" data-seccion="legado">
            <div className="acad-area-head">
              <div>
                <h2 id="sec-legado">{t.leccionesActuales}</h2>
                <p>{alimentan.length > 0 ? t.leccionesActualesIntro : t.sinLecciones}</p>
              </div>
            </div>
            {alimentan.length > 0 && <ListaLegado lecciones={alimentan} lang={lang} />}
          </section>
        )}

        {syllabus && (
          <section className="acad-area" aria-labelledby="sec-syllabus">
            <details className="acad-solucion">
              <summary id="sec-syllabus">{t.syllabus}</summary>
              <Html html={syllabus.html} />
            </details>
          </section>
        )}
      </div>
    </div>
  )
}

// ─── Unidad de S0 ─────────────────────────────────────────────────────────────
// Orden (P1-04, Arkano): crumb → cabecera (overline, h1, meta) → pregunta guía
// con el patrón v3 → índice ancla en un contenedor → piezas con su solución.

export function UnidadVista({ curso: slug, unidad, lang }: { curso: string; unidad: string; lang: Lang }) {
  const cat = getCatalogo()
  const curso = cursoPorSlug(cat, 'S0', slug)
  if (!curso || !existeUnidad(curso, unidad)) notFound()
  const t = UI[lang]
  const bloques = bloquesUnidad(curso, unidad, lang, { ...t.piezas, tarjetas: t.tarjetas, presentacion: t.presentacion })
  const algunFallback = bloques.some((b) => b.pieza?.fallback || b.clave?.fallback || b.csv?.fallback)

  // Cabecera: de guia.md, del README (enriquecida) o del propio archivo.
  const primera = bloques[0]?.pieza
  const cab = primera?.cabecera ?? { titulo: '', meta: '', pregunta: '' }
  const n = numeroUnidadSlug(unidad)
  const enriquecida = unidad.endsWith('-enriquecida')
  const overline =
    unidad === 'checkpoint'
      ? t.checkpoint
      : unidad === 'proyecto-final'
        ? t.proyectoFinal
        : `${t.unidadN(n ?? 0)}${enriquecida ? ` · ${t.enriquecida}` : ''}`
  const titulo = sinPrefijoUnidad(cab.titulo.replace(/^S0-C\d+\s*·\s*/u, '').replace(/^(Unidad|Unit)\s+\d+\s+(enriquecida|enriched):\s*/iu, '')) || overline

  return (
    <div className="acad-page" data-vista="unidad" data-lang={lang}>
      <div className="acad-wrap acad-wrap--lectura">
        <Crumb href={rutaCurso(curso, lang)}>
          <span className="acad-codigo">{curso.code}</span>
          <span aria-hidden="true"> · </span>
          {tituloCurso(curso, lang)}
        </Crumb>

        <header className="acad-unidad-head">
          <p className="acad-guia__label acad-unidad-head__overline">
            <span className="acad-codigo">{curso.code}</span> · {overline}
          </p>
          <h1 className="acad-unidad-head__titulo">{titulo}</h1>
          {cab.meta && <p className="acad-unidad-head__meta">{cab.meta}</p>}
        </header>

        {cab.pregunta && (
          <div className="acad-guia" data-pregunta-guia>
            <p className="acad-guia__label">{t.preguntaGuia}</p>
            <p className="acad-guia__q">{cab.pregunta}</p>
          </div>
        )}

        {algunFallback && <AvisoSoloEs />}

        {bloques.length > 1 && (
          <nav aria-label={t.enEstaUnidad} className="acad-unidad-indice">
            <p className="acad-guia__label">{t.enEstaUnidad}</p>
            <ol>
              {bloques.map((b) => (
                <li key={b.id}>
                  <a href={`#${b.id}`}>{b.etiqueta}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {bloques.map((b, i) => (
          <section key={b.id} id={b.id} className="acad-pieza" data-pieza={b.id}>
            {/* La guía (y la presentación de la enriquecida) perdieron su h1 en la cabecera: llevan h2 propio. */}
            {i === 0 && bloques.length > 1 && <h2 className="acad-pieza__titulo">{b.etiqueta}</h2>}
            {b.pieza && <Html html={b.pieza.html} />}
            {b.csv && (
              <div className="acad-md">
                <h2>{t.tarjetas}</h2>
                <table>
                  <thead>
                    <tr>
                      <th>{b.csv.filas[0]?.[0]}</th>
                      <th>{t.frente}</th>
                      <th>{t.reverso}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {b.csv.filas.slice(1).map((f) => (
                      <tr key={f[0]}>
                        <td>{f[0]}</td>
                        <td>{f[2]}</td>
                        <td>
                          <details className="acad-solucion">
                            <summary>{t.verSolucion}</summary>
                            <p>{f[3]}</p>
                          </details>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {b.clave && (
              <details className="acad-solucion" id={`${b.id}-solucion`} data-clave={b.clave.archivo}>
                <summary>{t.verSolucion}</summary>
                <Html html={b.clave.html} />
              </details>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

// ─── Glosario ES–EN (recurso de S0, respuesta 5 de Prof. X) ───────────────────

export function GlosarioVista({ lang }: { lang: Lang }) {
  const t = UI[lang]
  const g = leerGlosario()
  if (!g) notFound()
  return (
    <div className="acad-page" data-vista="glosario" data-lang={lang}>
      <div className="acad-wrap acad-wrap--lectura">
        <Crumb href={rutaPrograma('S0', lang)}>{nombrePrograma(programaPorId('S0'), lang)}</Crumb>
        <header className="acad-unidad-head">
          <p className="acad-guia__label acad-unidad-head__overline">
            <span className="acad-codigo">S0</span> · {t.recursos}
          </p>
          <h1 className="acad-unidad-head__titulo">{t.glosario}</h1>
          <p className="acad-unidad-head__meta">{t.glosarioIntro}</p>
        </header>
        <section className="acad-pieza" lang="es">
          <Html html={g.html} />
        </section>
      </div>
    </div>
  )
}

// ─── Biblioteca ───────────────────────────────────────────────────────────────

export function BibliotecaVista({ lang, ramas }: { lang: Lang; ramas: { slug: string; label: string }[] }) {
  const t = UI[lang]
  const cat = getCatalogo()
  const porRama = new Map<string, Map<string, LeccionLegado[]>>()
  for (const l of cat.legacy_lessons) {
    const r = porRama.get(l.rama) ?? new Map<string, LeccionLegado[]>()
    const m = r.get(l.modulo) ?? []
    m.push(l)
    r.set(l.modulo, m)
    porRama.set(l.rama, r)
  }

  return (
    <div className="acad-page" data-vista="biblioteca" data-lang={lang}>
      <div className="acad-wrap">
        <Crumb href={rutaPortada(lang)}>{t.todaLaAcademia}</Crumb>
        <header className="acad-head">
          <p className="eyebrow">{t.academia}</p>
          <h1>{t.biblioteca}</h1>
          <p>{t.bibliotecaIntro}</p>
          <div className="acad-stats">
            <div>
              <span className="acad-stat-num">{cat.legacy_lessons.length}</span>
              <span className="acad-stat-label">{t.leccionesLabel}</span>
            </div>
          </div>
        </header>
        {lang === 'en' && (
          <div className="acad-callout acad-callout--aviso acad-aviso-idioma" role="note" lang="en">
            <p className="acad-callout__text" style={{ margin: 0 }}>
              {t.bibliotecaAvisoEn(cat.legacy_lessons.filter((l) => l.idioma_disponible.includes('en')).length)}.
            </p>
          </div>
        )}

        {Array.from(porRama.entries()).map(([rama, modulos]) => {
          const label = ramas.find((r) => r.slug === rama)?.label ?? rama
          return (
            <section key={rama} className="acad-area" data-rama={rama}>
              <div className="acad-area-head">
                <div>
                  <h2>
                    <Link href={lang === 'en' ? `/en/academia/${rama}` : `/academia/${rama}`}>{label}</Link>
                  </h2>
                </div>
              </div>
              {Array.from(modulos.entries()).map(([modulo, lecciones]) => (
                <details key={modulo} className="acad-solucion acad-biblio-mod">
                  <summary>
                    {modulo} · {t.lecciones(lecciones.length)}
                  </summary>
                  <ListaLegado lecciones={lecciones} lang={lang} />
                </details>
              ))}
            </section>
          )
        })}
      </div>
    </div>
  )
}

export { PROGRAMAS }
