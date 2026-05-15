// ============================================
// Configuración del sitio - Fuente única de verdad
// ============================================

/**
 * URL canónica del sitio. Se puede sobrescribir vía variable de entorno
 * `NEXT_PUBLIC_SITE_URL` (recomendado en Vercel para previews y staging).
 *
 * Importante: NO incluir slash final.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://calculadorachile.cl';

/**
 * Nombre comercial (visible en metadata y schema.org).
 */
export const SITE_NAME = 'CalculaChile';

/**
 * Email público de contacto. Cambiar aquí lo cambia en toda la app.
 */
export const CONTACT_EMAIL = 'contacto@calculadorachile.cl';

/**
 * Construye una URL absoluta a partir de un path interno.
 *
 * @example
 *   absoluteUrl('/calculadoras/sueldo-liquido')
 *   // => 'https://calculadorachile.cl/calculadoras/sueldo-liquido'
 */
export function absoluteUrl(path = '/'): string {
  if (!path.startsWith('/')) path = `/${path}`;
  return `${SITE_URL}${path}`;
}
