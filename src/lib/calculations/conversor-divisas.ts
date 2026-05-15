// ============================================
// Conversor de Divisas (USD/EUR a CLP) Chile 2026
// ============================================

import { DOLAR, EURO } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface ConversorDivisasInput {
  monto: number;
  moneda: 'usd' | 'eur';
  direccion: 'a_clp' | 'desde_clp';
  /**
   * Tasa de cambio personalizada. Si se entrega, anula los valores
   * por defecto del snapshot.
   */
  tasaPersonalizada?: number;
}

export interface ConversorDivisasResult {
  monto: number;
  moneda: string;
  tasaCambio: number;
  resultado: number;
  direccion: string;
  /**
   * Indica si el formato del resultado es CLP (true) o moneda
   * extranjera (false). El consumidor de UI lo usa para formatear.
   */
  resultadoEnCLP: boolean;
}

/**
 * Premium EUR/USD usado SOLO como respaldo si el snapshot no tiene
 * EUR (ej. rollback a versiones previas o snapshot corrupto).
 *
 * En condiciones normales `EURO.valor` viene actualizado diariamente
 * desde mindicador.cl/euro o la serie F072.CLP.EUR.N.O.D del Banco
 * Central, así que este multiplicador no se usa.
 */
const EUR_PREMIUM_VS_USD_FALLBACK = 1.08;

const NOMBRES_MONEDA: Record<ConversorDivisasInput['moneda'], string> = {
  usd: 'Dólar estadounidense (USD)',
  eur: 'Euro (EUR)',
};

/**
 * Calcula la tasa de cambio actual a CLP usando los snapshots
 * `DOLAR.observado` y `EURO.valor` (auto-actualizados diariamente)
 * en vez de un valor hardcodeado.
 */
function obtenerTasaCambio(moneda: ConversorDivisasInput['moneda']): number {
  // Si el snapshot del BCCh no tiene dólar, este fallback evita NaN.
  const usd = DOLAR.observado && DOLAR.observado > 0 ? DOLAR.observado : 950;
  if (moneda === 'usd') return usd;
  // Para EUR usamos el valor real del snapshot; si por algún motivo
  // no está disponible, derivamos a partir del USD con el premium
  // histórico.
  if (EURO.valor && EURO.valor > 0) return EURO.valor;
  return usd * EUR_PREMIUM_VS_USD_FALLBACK;
}

/**
 * Convierte montos entre CLP y divisas extranjeras (USD/EUR).
 *
 * Bug histórico: la versión anterior tenía USD = 960 y EUR = 1040
 * hardcodeados, lo que daba errores >10% en el cálculo cuando el dólar
 * real fluctuaba entre 850 y 1.000. Adicionalmente el formato del
 * resultado se forzaba como CLP aún cuando la dirección era CLP→divisa.
 *
 * Fix: leer la tasa USD del snapshot del BCCH y derivar EUR con un
 * spread aproximado. La UI puede usar `resultadoEnCLP` para formatear
 * correctamente.
 */
export function calculateConversorDivisas(
  input: ConversorDivisasInput,
): ConversorDivisasResult {
  const { monto, moneda, direccion, tasaPersonalizada } = input;

  const montoValidado = Math.max(0, monto);
  const tasaCambio =
    tasaPersonalizada && tasaPersonalizada > 0
      ? tasaPersonalizada
      : obtenerTasaCambio(moneda);

  let resultado: number;
  let resultadoEnCLP: boolean;
  if (direccion === 'a_clp') {
    resultado = Math.round(montoValidado * tasaCambio);
    resultadoEnCLP = true;
  } else {
    resultado = Number((montoValidado / tasaCambio).toFixed(2));
    resultadoEnCLP = false;
  }

  return {
    monto: montoValidado,
    moneda: NOMBRES_MONEDA[moneda],
    tasaCambio: Math.round(tasaCambio * 100) / 100,
    resultado,
    direccion:
      direccion === 'a_clp'
        ? `CLP desde ${moneda.toUpperCase()}`
        : `${moneda.toUpperCase()} desde CLP`,
    resultadoEnCLP,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function conversorDivisasToResults(
  result: ConversorDivisasResult,
): CalculatorResult[] {
  return [
    {
      label: 'Resultado',
      value: result.resultado,
      format: result.resultadoEnCLP ? 'CLP' : 'number',
      highlight: true,
    },
    { label: 'Monto Original', value: result.monto, format: 'number' },
    { label: 'Tasa de Cambio', value: result.tasaCambio, format: 'CLP' },
  ];
}
