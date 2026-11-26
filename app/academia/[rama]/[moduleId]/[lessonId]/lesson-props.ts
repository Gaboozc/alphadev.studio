import { MODULES } from '../../../modules'
import { lessonHref, ramaBySlug } from '../../../ramas'
import { metaOfRama, toModuleMeta } from '../../../queries'

/** Props de LessonPage para una lección (null si no existe en esa rama). */
export function lessonProps(rama: string, moduleId: string, lessonId: string) {
  const mod = MODULES.find((m) => m.id === moduleId)
  const ramaMeta = ramaBySlug(rama)
  if (!mod || !ramaMeta) return null

  const lesson = mod.lessons.find((l) => l.id === lessonId)
  if (!lesson) return null

  // La lección solo existe bajo la rama de su módulo (ver nota en [rama]/page.tsx).
  if (lessonHref(mod, lessonId) !== `/academia/${rama}/${moduleId}/${lessonId}`) return null

  const lessonIndex = mod.lessons.findIndex((l) => l.id === lessonId)
  const meta = toModuleMeta(mod)

  // Misma numeración que el temario: orden en la rama, no module.number del content.
  const ramaMods = metaOfRama(ramaMeta.id)
  const idxRama = ramaMods.findIndex((m) => m.id === mod.id)
  const unidadNumero = idxRama >= 0 ? idxRama + 1 : meta.number

  // Del módulo y de las lecciones vecinas baja solo el metadato. La única
  // lección cuyo contenido cruza al cliente es la que se está viendo.
  return {
    module: meta,
    lesson,
    lessonIndex,
    unidadNumero,
    prevLesson: lessonIndex > 0 ? meta.lessons[lessonIndex - 1] : null,
    nextLesson: lessonIndex < meta.lessons.length - 1 ? meta.lessons[lessonIndex + 1] : null,
  }
}

