import { notFound } from 'next/navigation'
import { esAdmin } from '@/lib/perfil'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // 404 y no 403 a propósito: un "no tienes permiso" le confirma a quien
  // prueba la URL que el panel existe. Para quien no es admin, esta ruta
  // simplemente no está.
  //
  // Esta guarda protege lo que se RENDERIZA. Las acciones de servidor de
  // ./actions.ts vuelven a comprobar por su cuenta, porque son puntos de
  // entrada propios y no pasan por aquí.
  if (!(await esAdmin())) notFound()

  return <>{children}</>
}
