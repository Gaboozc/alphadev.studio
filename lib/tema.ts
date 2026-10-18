// Modo nocturno. El tema vive en <html data-theme="light|dark">.
//
// Sin elección guardada se sigue al dispositivo (prefers-color-scheme); si el
// visitante usa el toggle, su elección se guarda en localStorage y manda.
// Decidido por Gabriel en octubre de 2026: abre según el dispositivo.

export type Tema = 'light' | 'dark'

export const CLAVE_TEMA = 'ads-tema'
export const EVENTO_TEMA = 'ads-tema-cambio'

/**
 * Corre en <head> antes de pintar: sin esto la página se dibuja clara y
 * salta a oscura un instante después (el "flash" blanco).
 */
export const SCRIPT_TEMA_INICIAL = `(function(){try{var t=localStorage.getItem('${CLAVE_TEMA}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}})();`
