// ============================================
// Constantes de educación escolar y admisión (E-033 a E-035)
// ============================================

/**
 * Escala de calificaciones escolar.
 * Decreto 67/2018 Mineduc, art. 8: escala numérica de 1,0 a 7,0 hasta con
 * un decimal; la calificación mínima de aprobación es 4,0.
 * https://www.bcn.cl/leychile/navegar?idNorma=1127255
 */
export const ESCALA_NOTAS = {
  minima: 1.0,
  maxima: 7.0,
  aprobacion: 4.0,
} as const;

/**
 * Exigencia por defecto de la escala de notas (porcentaje del puntaje
 * máximo que equivale a la nota de aprobación). Es una CONVENCIÓN de uso
 * habitual, NO la fija el Decreto 67: cada establecimiento la define en su
 * reglamento de evaluación. Por eso es editable en la calculadora.
 */
export const EXIGENCIA_POR_DEFECTO = 60;

/**
 * Escala de puntajes PAES y factores de selección (DEMRE, Admisión 2027).
 * https://demre.cl/paes/factores-seleccion/nueva-escala-puntajes
 * https://demre.cl/paes/factores-seleccion/
 */
export const PAES = {
  puntajeMinimo: 100,
  puntajeMaximo: 1000,
  /** Las carreras que exigen M2 la ponderan con al menos 5%. */
  pesoMinimoM2: 5,
} as const;
