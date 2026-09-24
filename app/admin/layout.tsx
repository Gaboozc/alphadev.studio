import { notFound } from 'next/navigation'
import { esAdmin } from '@/lib/perfil'

// Panel de administración. Vive fuera de /academia a propósito: es la única
// pieza de gestión interna que sigue en pie con certeza, y colgarla de una
// sección cuyo futuro está abierto (la Academia se está repensando) era
// arrastrar deuda de un sitio a otro.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // 404 y no 403 a propósito: un "no tienes permiso" le confirma a quien
  // prueba la URL que el panel existe. Para quien no es admin, esta ruta
  // simplemente no está.
  //
  // Esta guarda protege lo que se RENDERIZA. Las Server Actions de las
  // páginas hijas vuelven a comprobar por su cuenta, porque son puntos de
  // entrada propios y no pasan por aquí.
  if (!(await esAdmin())) notFound()

  return <>{children}</>
}
