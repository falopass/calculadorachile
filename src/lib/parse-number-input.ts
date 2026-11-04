/**
 * Convierte lo que el usuario escribe en un campo numérico a número.
 * Formato chileno: "." separa miles y "," es decimal ("1.234,5" → 1234,5).
 * En campos decimales (tasas, UF, notas) también acepta "4.5" porque
 * muchos teclados móviles solo muestran punto: un único punto seguido de
 * 1 o 2 dígitos se toma como decimal ("3.500" sigue siendo 3500).
 */
export function parseNumberInput(value: string, allowDotDecimal = false): number {
  const v = value.trim();
  const dotIsDecimal = allowDotDecimal && !v.includes(',') && /^\d*\.\d{1,2}$/.test(v);
  const cleaned = dotIsDecimal ? v : v.replace(/\./g, '').replace(/,/g, '.');
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}
