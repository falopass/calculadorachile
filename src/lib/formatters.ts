// ============================================
// Formateadores para valores chilenos
// ============================================

/**
 * Formatea un número como peso chileno (CLP)
 * @param value - Valor numérico a formatear
 * @returns String formateado (ej: "$1.234.567")
 */
export function formatCLP(value: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formatea un número como UF
 * @param value - Valor numérico a formatear
 * @param decimals - Cantidad de decimales (default: 2)
 * @returns String formateado (ej: "12,34 UF")
 */
export function formatUF(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals).replace('.', ',')} UF`;
}

/**
 * Formatea un número como UTM
 * @param value - Valor numérico a formatear
 * @returns String formateado (ej: "12,34 UTM")
 */
export function formatUTM(value: number): string {
  return `${value.toFixed(2).replace('.', ',')} UTM`;
}

/**
 * Formatea un número como porcentaje
 * @param value - Valor numérico a formatear
 * @param decimals - Cantidad de decimales (default: 1)
 * @returns String formateado (ej: "12,3%")
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals).replace('.', ',')}%`;
}

/**
 * Parsea un string con formato CLP a número
 * @param value - String a parsear (ej: "$1.234.567")
 * @returns Número parseado
 */
export function parseCLP(value: string): number {
  return parseInt(value.replace(/[^0-9-]/g, ''), 10) || 0;
}

// ============================================
// Formateadores de fecha (español chileno)
// ============================================

/**
 * Formatea una fecha ISO (YYYY-MM-DD) al formato chileno largo.
 * @param isoDate - Fecha en formato ISO (ej: "2026-07-04")
 * @returns String formateado (ej: "4 de julio de 2026")
 */
export function formatDateLong(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formatea una fecha ISO (YYYY-MM-DD) mostrando solo mes y año.
 * @param isoDate - Fecha en formato ISO (ej: "2026-07-04")
 * @returns String formateado (ej: "julio de 2026")
 */
export function formatDateMonthYear(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
  });
}
