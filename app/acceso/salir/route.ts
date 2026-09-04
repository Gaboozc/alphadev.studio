// Cerrar sesión. Va por POST a propósito: un GET podría dispararse desde una
// imagen o un prefetch y cerrar la sesión sin que nadie lo pidiera.

import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return NextResponse.redirect(new URL('/acceso', request.url), { status: 303 })
}
