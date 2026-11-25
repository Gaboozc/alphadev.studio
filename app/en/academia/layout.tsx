// /en/academia usa EXACTAMENTE la misma puerta que /academia: el layout de la
// Academia comprueba la sesión en el servidor antes de leer nada (ver
// app/academia/layout.tsx). Re-exportarlo evita tener dos puertas que puedan
// divergir.
export { default, metadata } from '@/app/academia/layout'
