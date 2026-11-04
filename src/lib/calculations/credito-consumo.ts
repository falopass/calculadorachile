// ============================================
// Simulador de Crédito de Consumo Chile 2026
// Cuota francesa + comparación con la Tasa
// Máxima Convencional (TMC), Ley 18.010 / CMF.
// ============================================

import type { CalculatorResult } from '@/types/calculator';
import { UF } from '@/lib/values/constants';
import tmcSnapshot from '@/lib/values/tmc-snapshot.json';

/**
 * TMC vigente según `tmc-snapshot.json`
 * (CMF — Certificado N° 10/2026, Diario Oficial 15-10-2026, Ley 18.010).
 * `constants.ts` expone `TMC_VIGENTE` con claves planas; aquí se usan
 * las claves completas de `tramos` porque el simulador distingue
 * también el tramo de operaciones a menos de 90 días.
 */
const TMC = tmcSnapshot;

const TMC_FUENTE_URL =
  'https://www.cmfchile.cl/portal/principal/613/w3-propertyvalue-19272.html';

export interface CreditoConsumoInput {
  /** Monto del crédito en CLP. */
  montoCredito: number;
  /** Tasa de interés mensual en % (ej. 1,5 = 1,5% mensual). */
  tasaMensual: number;
  /** Plazo en meses. */
  plazoMeses: number;
  /**
   * Gastos operacionales / de otorgamiento en CLP (cargo único).
   * Se suman al costo total pero no alteran la cuota francesa.
   */
  gastosOperacionales?: number;
  /** Valor UF del día; si se omite se usa el snapshot local. */
  valorUF?: number;
}

export interface CreditoConsumoResult {
  montoCredito: number;
  /** Tasa mensual en % tal como la ingresó el usuario. */
  tasaMensual: number;
  /** Tasa anual nominal lineal = tasaMensual × 12 (convención Ley 18.010). */
  tasaAnual: number;
  plazoMeses: number;
  /** Cuota mensual del sistema francés, redondeada al peso. */
  cuotaMensual: number;
  gastosOperacionales: number;
  /** Suma de las cuotas: cuotaMensual × plazoMeses. */
  totalCuotas: number;
  /** totalCuotas − montoCredito. */
  totalIntereses: number;
  /** totalCuotas + gastosOperacionales. */
  costoTotal: number;
  /** Monto del crédito expresado en UF. */
  montoUF: number;
  /** Clave del tramo TMC aplicado en el snapshot. */
  tramoTMC: string;
  /** TMC anual del tramo (%). */
  tmcAnualTramo: number;
  /** TMC anual del tramo ÷ 12 (%), referencia mensual. */
  tmcMensualTramo: number;
  /** true si la tasa anual nominal supera la TMC del tramo. */
  superaTMC: boolean;
  /** Fecha del certificado CMF usado (snapshot.asOf). */
  tmcAsOf: string;
  valorUF: number;
}

/**
 * Cuota del sistema francés (cuota constante):
 * C = P·i / (1 − (1+i)^(−n)). Con i = 0, C = P / n.
 */
function cuotaFrancesa(principal: number, i: number, n: number): number {
  if (i === 0) return principal / n;
  return (principal * i) / (1 - Math.pow(1 + i, -n));
}

/**
 * Simula un crédito de consumo en CLP no reajustable con cuota
 * francesa y compara la tasa anual nominal (mensual × 12) con la
 * Tasa Máxima Convencional (TMC) del tramo que corresponda según
 * monto en UF y plazo (Ley 18.010, art. 6 y ss.).
 *
 * Convención de tramos (operaciones no reajustables, ≥ 90 días):
 *  - ≤ 50 UF             → no_reajustables_menor_50uf_mayor_90d
 *  - > 50 y ≤ 200 UF     → no_reajustables_50_200uf_mayor_90d
 *  - > 200 y ≤ 5.000 UF  → no_reajustables_mayor_200uf_menor_5000uf_mayor_90d
 *  - > 5.000 UF          → no_reajustables_mayor_5000uf_mayor_90d
 * Si el plazo es menor a 3 meses (~90 días) y el monto supera las
 * 5.000 UF se usa `no_reajustables_mayor_5000uf_menor_90d`; para
 * montos menores a 90 días el snapshot no publica tramo propio y se
 * conserva la escalera de ≥ 90 días.
 *
 * Nota YMYL: la tasa anual nominal de este módulo NO es la CAE de la
 * Ley 20.555 (metodología oficial pendiente de verificación).
 */
export function calculateCreditoConsumo(
  input: CreditoConsumoInput,
): CreditoConsumoResult {
  const {
    montoCredito,
    tasaMensual,
    plazoMeses,
    gastosOperacionales = 0,
    valorUF = UF.valor,
  } = input;

  const monto = Math.max(0, montoCredito);
  const tasa = Math.max(0, Math.min(100, tasaMensual));
  const plazo = Math.max(1, Math.round(plazoMeses));
  const gastos = Math.max(0, gastosOperacionales);
  const uf = valorUF > 0 ? valorUF : UF.valor;

  const cuotaMensual = Math.round(cuotaFrancesa(monto, tasa / 100, plazo));
  const totalCuotas = cuotaMensual * plazo;
  const totalIntereses = totalCuotas - monto;
  const costoTotal = totalCuotas + gastos;
  const tasaAnual = tasa * 12;

  const montoUF = uf > 0 ? monto / uf : 0;
  const menorQue90d = plazo < 3;

  let tramoTMC: keyof typeof TMC.tramos;
  if (menorQue90d && montoUF > 5000) {
    tramoTMC = 'no_reajustables_mayor_5000uf_menor_90d';
  } else if (montoUF <= 50) {
    tramoTMC = 'no_reajustables_menor_50uf_mayor_90d';
  } else if (montoUF <= 200) {
    tramoTMC = 'no_reajustables_50_200uf_mayor_90d';
  } else if (montoUF <= 5000) {
    tramoTMC = 'no_reajustables_mayor_200uf_menor_5000uf_mayor_90d';
  } else {
    tramoTMC = 'no_reajustables_mayor_5000uf_mayor_90d';
  }

  const tmcAnualTramo = TMC.tramos[tramoTMC];
  const tmcMensualTramo = Math.round((tmcAnualTramo / 12) * 100) / 100;
  const superaTMC = tasaAnual > tmcAnualTramo;

  return {
    montoCredito: Math.round(monto),
    tasaMensual: tasa,
    tasaAnual: Math.round(tasaAnual * 100) / 100,
    plazoMeses: plazo,
    cuotaMensual,
    gastosOperacionales: Math.round(gastos),
    totalCuotas,
    totalIntereses,
    costoTotal,
    montoUF: Math.round(montoUF * 100) / 100,
    tramoTMC,
    tmcAnualTramo,
    tmcMensualTramo,
    superaTMC,
    tmcAsOf: TMC.asOf,
    valorUF: uf,
  };
}

export function creditoConsumoToResults(
  result: CreditoConsumoResult,
): CalculatorResult[] {
  return [
    {
      label: 'Cuota mensual (sistema francés)',
      value: result.cuotaMensual,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Costo total del crédito (cuotas + gastos)',
      value: result.costoTotal,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Total intereses',
      value: result.totalIntereses,
      format: 'CLP',
    },
    {
      label: 'Total pagado en cuotas',
      value: result.totalCuotas,
      format: 'CLP',
    },
    {
      label: 'Monto del crédito',
      value: result.montoCredito,
      format: 'CLP',
    },
    {
      label: 'Monto del crédito en UF',
      value: result.montoUF,
      format: 'UF',
    },
    {
      label: 'Gastos operacionales',
      value: result.gastosOperacionales,
      format: 'CLP',
    },
    {
      label: 'Tasa mensual',
      value: result.tasaMensual,
      format: 'percentage',
    },
    {
      label: 'Tasa anual nominal (mensual × 12)',
      value: result.tasaAnual,
      format: 'percentage',
      note: {
        text: 'Convención de la Ley 18.010 para operaciones no reajustables en pesos. No es la Carga Anual Equivalente de la Ley 20.555.',
      },
    },
    {
      label: 'TMC del tramo (anual)',
      value: result.tmcAnualTramo,
      format: 'percentage',
      note: {
        text: `Tramo ${result.tramoTMC} del certificado CMF vigente al ${result.tmcAsOf}.`,
        source: { name: 'CMF — Tasa Máxima Convencional', url: TMC_FUENTE_URL },
      },
    },
    {
      label: 'TMC del tramo (mensual, referencia)',
      value: result.tmcMensualTramo,
      format: 'percentage',
    },
    {
      label: 'Diferencia vs TMC anual (puntos porcentuales)',
      value: Math.round((result.tasaAnual - result.tmcAnualTramo) * 100) / 100,
      format: 'number',
      highlight: result.superaTMC,
      note: {
        text: result.superaTMC
          ? 'La tasa anual nominal supera la Tasa Máxima Convencional del tramo: una operación de crédito de dinero no puede pactarse sobre ese límite (Ley 18.010).'
          : 'La tasa anual nominal está dentro del límite de la Tasa Máxima Convencional del tramo (Ley 18.010).',
        source: { name: 'Ley 18.010 — Ley Chile', url: 'https://www.bcn.cl/leychile/navegar?idNorma=16762' },
      },
    },
  ];
}
