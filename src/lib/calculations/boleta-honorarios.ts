// ============================================
// Cálculo de Boleta de Honorarios Chile
// ============================================

import {
  BOLETA_HONORARIOS,
  UTM,
  UF,
  RETENCION_HONORARIOS_CALENDARIO,
  RETENCION_HONORARIOS_DISTRIBUCION,
  type AnioRetencionHonorarios,
} from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface BoletaHonorariosInput {
  montoBruto: number;
  retencionAutomatica?: boolean;
  /** Año para el calendario de tasas (Ley 21.578). */
  ano?: 2025 | 2026 | 2027 | 2028;
  /** Calcula desglose de cotizaciones financiadas por la retención. */
  desgloseCotizaciones?: boolean;
  moneda?: 'CLP' | 'UF';
  calcularPPM?: boolean;
  calcularCostoEmpleador?: boolean;
}

export interface BoletaHonorariosResult {
  montoBruto: number;
  /** Retención del SII (impuesto + cotizaciones futuras). */
  retencion: number;
  /** Monto efectivo que recibe el trabajador (bruto - retención). */
  montoLiquido: number;
  exento: boolean;
  tasaRetencion: number;
  ano: number;
  /**
   * Desglose informativo de qué financia la retención del SII.
   * Estos montos NO se descuentan adicionalmente del líquido — ya están
   * dentro de la retención del 15,25%.
   */
  desgloseRetencion: {
    impuestoRenta: number;
    afp: number;
    salud: number;
    seguroInvalidezSobrevivencia: number;
    accidentesTrabajo: number;
  };
  ppmAsociado: number;
  costoEmpleador: number;
  montoUF?: number;
}

/**
 * Calcula la retención de boleta de honorarios.
 *
 * Bug histórico: la versión anterior descontaba cotizaciones (AFP 7%,
 * salud 7%, etc.) del bruto adicionales a la retención del 15,25%.
 * Eso es doble contabilidad. Bajo la Ley 21.133 la retención del
 * 15,25% YA financia la AFP, salud, SIS y SAT que pagará el SII en
 * la Operación Renta. El trabajador recibe efectivamente
 * `bruto − retención` y el SII se encarga del resto en abril.
 *
 * El parámetro `desgloseCotizaciones` permite mostrar al usuario
 * cómo se reparte esa retención sin alterar el cálculo del líquido.
 *
 * Tasas anuales (Ley 21.578):
 *   2025: 14,5%   2026: 15,25%   2027: 16%   2028: 17%
 *
 * Distribución 2026 (15,25%) según Subsecretaría de Previsión Social:
 *   - Impuesto a la renta: 10,00%
 *   - SIS:                  1,52%
 *   - Accidentes trabajo:   0,93%
 *   - Salud (7%):           ~2,18% (escalonado)
 *   - AFP:                  ~0,62% (escalonado)
 *   El total destinado a previsión sube progresivamente para llegar
 *   al ~17% en 2028 (cobertura completa).
 */
export function calculateBoletaHonorarios(input: BoletaHonorariosInput): BoletaHonorariosResult {
  const {
    montoBruto,
    retencionAutomatica = true,
    ano = 2026,
    desgloseCotizaciones = false,
    moneda = 'CLP',
    calcularPPM = false,
    calcularCostoEmpleador = false,
  } = input;

  const monto = Math.max(0, montoBruto);

  // Tasa según año (Ley 21.578) — leída del calendario en constants.
  const tasaRetencion = RETENCION_HONORARIOS_CALENDARIO[ano] ?? BOLETA_HONORARIOS.tasa_total;

  // Exento bajo 10 UTM mensuales
  const limiteExento = BOLETA_HONORARIOS.exento_minimo * UTM.valor;
  const exento = monto <= limiteExento;

  // Retención efectiva
  const retencion = retencionAutomatica && !exento ? monto * (tasaRetencion / 100) : 0;

  // Monto líquido = bruto − retención. Las cotizaciones se financian con
  // la retención dentro del proceso de Operación Renta; no se descuentan
  // adicionalmente.
  const montoLiquido = monto - retencion;

  // Desglose informativo de la retención (cómo se reparte el % total
  // del año correspondiente, según calendario Ley 21.578). Los
  // porcentajes vienen de RETENCION_HONORARIOS_DISTRIBUCION para que
  // se actualicen automáticamente cuando avance el calendario.
  const distribucion =
    RETENCION_HONORARIOS_DISTRIBUCION[ano as AnioRetencionHonorarios] ??
    RETENCION_HONORARIOS_DISTRIBUCION[2026];
  const desgloseRetencion = exento
    ? {
        impuestoRenta: 0,
        afp: 0,
        salud: 0,
        seguroInvalidezSobrevivencia: 0,
        accidentesTrabajo: 0,
      }
    : {
        impuestoRenta: Math.round(monto * (distribucion.impuesto_renta / 100)),
        afp: Math.round(monto * (distribucion.afp / 100)),
        salud: Math.round(monto * (distribucion.salud / 100)),
        seguroInvalidezSobrevivencia: Math.round(monto * (distribucion.sis / 100)),
        accidentesTrabajo: Math.round(monto * (distribucion.accidentes_trabajo / 100)),
      };

  // PPM asociado: corresponde al componente "Impuesto Renta" de la
  // distribución (Art. 84 LIR — pago provisional mensual a cuenta
  // del impuesto anual).
  const ppmAsociado = calcularPPM
    ? Math.round(monto * (distribucion.impuesto_renta / 100))
    : 0;

  // Costo para el pagador (mandante)
  const costoEmpleador = calcularCostoEmpleador ? monto : 0;

  // Monto en UF (informativo)
  const montoUF = moneda === 'UF' ? Math.round((monto / UF.valor) * 100) / 100 : undefined;

  // Suprimimos warning de TS si desgloseCotizaciones no se usa: queda en API
  void desgloseCotizaciones;

  return {
    montoBruto: Math.round(monto),
    retencion: Math.round(retencion),
    montoLiquido: Math.round(montoLiquido),
    exento,
    tasaRetencion,
    ano,
    desgloseRetencion,
    ppmAsociado,
    costoEmpleador,
    montoUF,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function boletaHonorariosToResults(result: BoletaHonorariosResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  results.push({
    label: 'Monto Líquido',
    value: result.montoLiquido,
    format: 'CLP',
    highlight: true,
  });

  results.push({
    label: 'Monto Bruto',
    value: result.montoBruto,
    format: 'CLP',
  });

  if (result.exento) {
    results.push({
      label: 'Retención',
      value: 0,
      format: 'CLP',
    });
  } else {
    results.push({
      label: `Retención (${result.tasaRetencion}%)`,
      value: result.retencion,
      format: 'CLP',
    });

    // Desglose informativo de la retención (no se suma al cálculo).
    results.push({
      label: '— Impuesto Renta (estimado)',
      value: result.desgloseRetencion.impuestoRenta,
      format: 'CLP',
    });
    results.push({
      label: '— Salud (estimado)',
      value: result.desgloseRetencion.salud,
      format: 'CLP',
    });
    results.push({
      label: '— AFP (estimado)',
      value: result.desgloseRetencion.afp,
      format: 'CLP',
    });
    results.push({
      label: '— SIS (estimado)',
      value: result.desgloseRetencion.seguroInvalidezSobrevivencia,
      format: 'CLP',
    });
    results.push({
      label: '— Accidentes del trabajo (estimado)',
      value: result.desgloseRetencion.accidentesTrabajo,
      format: 'CLP',
    });
  }

  if (result.ppmAsociado > 0) {
    results.push({
      label: 'PPM Asociado',
      value: result.ppmAsociado,
      format: 'CLP',
    });
  }

  if (result.costoEmpleador > 0) {
    results.push({
      label: 'Costo Total para Pagador',
      value: result.costoEmpleador,
      format: 'CLP',
    });
  }

  if (result.montoUF !== undefined) {
    results.push({
      label: 'Monto Bruto en UF',
      value: result.montoUF,
      format: 'UF',
    });
  }

  return results;
}
