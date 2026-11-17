// Estado compartible por URL: los inputs viajan en el query string para que
// quien recibe el enlace vea el mismo escenario. El canonical no cambia.

import type { CalculatorInput } from '@/types/calculator';

type Values = Record<string, string | number | boolean>;

/** `?a=1&b=x` con los inputs que difieren de su valor inicial; '' si no hay ninguno. */
export function buildShareQuery(inputs: CalculatorInput[], values: Values, initial: Values): string {
  const params = new URLSearchParams();
  for (const input of inputs) {
    const value = values[input.id];
    if (value === undefined || value === '' || value === initial[input.id]) continue;
    params.set(input.id, typeof value === 'boolean' ? (value ? '1' : '0') : String(value));
  }
  const query = params.toString();
  return query ? `?${query}` : '';
}

/** Lee solo parámetros que son inputs de la calculadora y descarta valores inválidos. */
export function parseShareQuery(search: string, inputs: CalculatorInput[]): Values {
  const params = new URLSearchParams(search);
  const parsed: Values = {};
  for (const input of inputs) {
    const raw = params.get(input.id);
    if (raw === null) continue;
    if (input.type === 'number') {
      const n = Number(raw);
      if (raw.trim() === '' || !Number.isFinite(n)) continue;
      if (input.min !== undefined && n < input.min) continue;
      if (input.max !== undefined && n > input.max) continue;
      parsed[input.id] = n;
    } else if (input.type === 'boolean') {
      if (raw === '1' || raw === '0') parsed[input.id] = raw === '1';
    } else if (input.type === 'select') {
      if (input.options?.some((o) => o.value === raw)) parsed[input.id] = raw;
    } else {
      parsed[input.id] = raw.slice(0, 100);
    }
  }
  return parsed;
}
