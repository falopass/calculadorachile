// ============================================
// Cálculo de Intereses por Mora Laboral Chile 2026
// ============================================

import type { CalculatorResult } from '@/types/calculator';
import { TMC_2026_MAYO } from '@/lib/values/constants';

export interface InteresesMoraInput {
  montoDeuda: number;
  diasMora: number;
  /**
   * Tasa anual a usar como interés máximo convencional (TMC).
   * La CMF la publica mensualmente. Si no se entrega, se usa la
   * referencia 2026 (~9,5% para no reajustables > 200 UF).
   */
  tasaAnualPersonalizada?: number;
  /** IPC acumulado del período en porcentaje (Art. 63 CdT). */
  ipcAcumulado?: number;
  /** Reservado para cálculos basados en fechas. */
  fechaInicio?: string;
}

export interface InteresesMoraResult {
  montoDeuda: number;
  tasaMora: number;
  diasMora: number;
  reajusteIPC: number;
  montoReajustado: number;
  interesGenerado: number;
  totalAPagar: number;
  recargoPorcentual: number;
}

/**
 * Tasa Máxima Convencional (TMC) de referencia para mora laboral 2026.
 * Definida en `TMC_2026_MAYO` en constants.ts. La TMC real cambia
 * mensualmente y la publica la CMF; este valor es solo el default
 * cuando el usuario no entrega `tasaAnualPersonalizada`.
 */
const TASA_MORA_DEFAULT = TMC_2026_MAYO.no_reajustables_mayor_200uf;

/**
 * Calcula los intereses por mora laboral.
 *
 * Bug histórico: la versión anterior usaba TMC hardcodeada en 8,5% y
 * NO aplicaba reajuste IPC, lo que subestima la mora cuando supera 6
 * meses. El Art. 63 CdT establece que las remuneraciones impagas se
 * reajustan por IPC y luego se aplican intereses sobre el monto
 * reajustado.
 *
 * Fix: aceptar `tasaAnualPersonalizada` (TMC vigente CMF) e
 * `ipcAcumulado` para calcular reajuste; los defaults se exponen para
 * compatibilidad.
 *
 * Base legal: Art. 63 CdT, Art. 12 Ley 18.010.
 */
export function calculateInteresesMora(input: InteresesMoraInput): InteresesMoraResult {
  const { montoDeuda, diasMora, tasaAnualPersonalizada, ipcAcumulado = 0 } = input;

  const deudaValida = Math.max(0, montoDeuda);
  const diasValidos = Math.max(0, diasMora);
  const tasa =
    tasaAnualPersonalizada && tasaAnualPersonalizada > 0
      ? tasaAnualPersonalizada
      : TASA_MORA_DEFAULT;
  const ipc = Math.max(0, ipcAcumulado);

  // Reajuste por IPC sobre el capital impago.
  const reajusteIPC = Math.round(deudaValida * (ipc / 100));
  const montoReajustado = deudaValida + reajusteIPC;

  // Interés simple sobre el monto reajustado (Art. 63 CdT).
  const interesGenerado = montoReajustado * (tasa / 100) * (diasValidos / 365);

  const totalAPagar = montoReajustado + interesGenerado;
  const recargoPorcentual =
    deudaValida > 0 ? ((reajusteIPC + interesGenerado) / deudaValida) * 100 : 0;

  return {
    montoDeuda: Math.round(deudaValida),
    tasaMora: tasa,
    diasMora: diasValidos,
    reajusteIPC,
    montoReajustado: Math.round(montoReajustado),
    interesGenerado: Math.round(interesGenerado),
    totalAPagar: Math.round(totalAPagar),
    recargoPorcentual: Math.round(recargoPorcentual * 100) / 100,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function interesesMoraToResults(result: InteresesMoraResult): CalculatorResult[] {
  return [
    {
      label: 'Total a Pagar',
      value: result.totalAPagar,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Intereses Generados',
      value: result.interesGenerado,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Reajuste IPC (Art. 63 CdT)',
      value: result.reajusteIPC,
      format: 'CLP',
    },
    {
      label: 'Monto Deuda Original',
      value: result.montoDeuda,
      format: 'CLP',
    },
    {
      label: 'Tasa de Mora Anual',
      value: result.tasaMora,
      format: 'percentage',
    },
    {
      label: 'Días de Mora',
      value: result.diasMora,
      format: 'days',
    },
    {
      label: 'Recargo Porcentual Total',
      value: result.recargoPorcentual,
      format: 'percentage',
    },
  ];
}
