// ============================================
// Cálculo de Contribuciones (Impuesto Territorial) Chile
// ----------------------------------------------
// Reglas SII vigentes (ver CONTRIBUCIONES_BIENES_RAICES en
// constants.ts para la fuente y vigencia de los parámetros):
//
// - Habitacional: exento si el avalúo fiscal total ≤ exención.
//   Sobre la exención paga 0,893% anual hasta que el avalúo
//   TOTAL alcance el umbral de cambio de tasa; por el exceso
//   sobre ese umbral paga 1,042% + sobretasa fiscal 0,025%.
//   El umbral se compara contra el avalúo total, no el afecto
//   (ejemplo oficial de la guía SII).
// - No habitacional (comercial, industrial, sitio eriado):
//   1,042% + sobretasa 0,025%, sin exención.
// - Sitio no edificado urbano (eriado): además una sobretasa
//   del 100% de la tasa vigente (otro 1,042%).
// - Cada componente se redondea al peso y luego se suma.
//
// Limitaciones (no modeladas): alza gradual post-reavalúo,
// otras exenciones (adultos mayores, etc.) ni derechos de
// aseo municipal que pueden venir en el mismo aviso.
// ============================================

import { CONTRIBUCIONES_BIENES_RAICES } from '@/lib/values/constants';
import { formatCLP } from '@/lib/formatters';
import type { CalculatorResult } from '@/types/calculator';

export interface ContribucionesParams {
  vigencia: string;
  periodoLabel: string;
  exencionHabitacional: number;
  umbralCambioTasa: number;
  tasaHabitacionalBaja: number;
  tasaGeneral: number;
  sobretasaFiscal: number;
}

export interface ContribucionesInput {
  avaluoFiscal: number;
  destino: 'habitacional' | 'comercial' | 'industrial' | 'sitio_eriado';
}

export interface ContribucionesResult {
  avaluoFiscal: number;
  destino: string;
  /** Avalúo afecto a contribución (avalúo − exención para habitacional). */
  avaluoAfecto: number;
  /** Exención efectivamente aplicada en pesos. */
  exencionAplicada: number;
  exento: boolean;
  /** Contribución neta anual tramo bajo (0,893%). */
  netaTramoBajo: number;
  /** Contribución neta anual tramo alto (1,042% sobre el exceso). */
  netaTramoAlto: number;
  /** Sobretasa de beneficio fiscal (0,025%). */
  sobretasaFiscal: number;
  /** Sobretasa sitio no edificado (100% de la tasa vigente). */
  sobretasaSitio: number;
  contribucionAnual: number;
  /** Mitad del año (2 semestres). */
  contribucionSemestral: number;
  /** Cuota trimestral (4 cuotas: abr / jun / sep / nov). */
  contribucionCuota: number;
  periodoLabel: string;
}

const LABELS_DESTINO: Record<ContribucionesInput['destino'], string> = {
  habitacional: 'Habitacional',
  comercial: 'Comercial',
  industrial: 'Industrial',
  sitio_eriado: 'Sitio no edificado (eriado)',
};

/**
 * Impuesto territorial según avalúo fiscal y destino.
 * Calendario: 4 cuotas (abril, junio, septiembre, noviembre) vía TGR.
 */
export function calculateContribuciones(
  input: ContribucionesInput,
  params: ContribucionesParams = CONTRIBUCIONES_BIENES_RAICES,
): ContribucionesResult {
  const { avaluoFiscal, destino } = input;
  const A = Math.max(0, avaluoFiscal);
  const E = destino === 'habitacional' ? params.exencionHabitacional : 0;
  const U = params.umbralCambioTasa;

  const tasaBaja = params.tasaHabitacionalBaja / 100;
  const tasaGeneral = params.tasaGeneral / 100;
  const tasaSobretasa = params.sobretasaFiscal / 100;

  let netaTramoBajo = 0;
  let netaTramoAlto = 0;
  let sobretasaFiscal = 0;
  let sobretasaSitio = 0;

  if (destino === 'habitacional') {
    // 0,893% sobre (min(A,U) − E); 1,042% + 0,025% sobre (A − max(U,E)).
    netaTramoBajo = Math.round(Math.max(0, Math.min(A, U) - E) * tasaBaja);
    const exceso = Math.max(0, A - Math.max(U, E));
    netaTramoAlto = Math.round(exceso * tasaGeneral);
    sobretasaFiscal = Math.round(exceso * tasaSobretasa);
  } else {
    // No habitacional: 1,042% + sobretasa 0,025% sobre todo el avalúo.
    netaTramoAlto = Math.round(A * tasaGeneral);
    sobretasaFiscal = Math.round(A * tasaSobretasa);
    if (destino === 'sitio_eriado') {
      // Sobretasa del 100% de la tasa vigente (áreas urbanas).
      sobretasaSitio = Math.round(A * tasaGeneral);
    }
  }

  const contribucionAnual =
    netaTramoBajo + netaTramoAlto + sobretasaFiscal + sobretasaSitio;

  return {
    avaluoFiscal: Math.round(A),
    destino: LABELS_DESTINO[destino],
    avaluoAfecto: Math.round(Math.max(0, A - E)),
    exencionAplicada: Math.round(Math.min(A, E)),
    exento: destino === 'habitacional' && A <= E,
    netaTramoBajo,
    netaTramoAlto,
    sobretasaFiscal,
    sobretasaSitio,
    contribucionAnual,
    contribucionSemestral: Math.round(contribucionAnual / 2),
    contribucionCuota: Math.round(contribucionAnual / 4),
    periodoLabel: params.periodoLabel,
  };
}

export function contribucionesToResults(
  result: ContribucionesResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  if (result.exento) {
    results.push({
      label: `Estado: exento (avalúo ≤ ${formatCLP(result.exencionAplicada)}, ${result.periodoLabel})`,
      value: 0,
      format: 'CLP',
      highlight: true,
    });
  } else {
    results.push({
      label: 'Cuota trimestral (1 de 4)',
      value: result.contribucionCuota,
      format: 'CLP',
      highlight: true,
    });
  }

  results.push({
    label: `Contribución anual estimada (${result.periodoLabel})`,
    value: result.contribucionAnual,
    format: 'CLP',
    highlight: !result.exento,
  });

  results.push({
    label: 'Semestre (2 cuotas)',
    value: result.contribucionSemestral,
    format: 'CLP',
  });

  results.push({
    label: 'Avalúo afecto a contribución',
    value: result.avaluoAfecto,
    format: 'CLP',
  });

  if (result.exencionAplicada > 0) {
    results.push({
      label: 'Exención habitacional aplicada',
      value: result.exencionAplicada,
      format: 'CLP',
    });
  }

  if (result.netaTramoBajo > 0) {
    results.push({
      label: 'Neta tramo 0,893% (hasta umbral de cambio de tasa)',
      value: result.netaTramoBajo,
      format: 'CLP',
    });
  }

  if (result.netaTramoAlto > 0) {
    results.push({
      label: 'Neta tramo 1,042%',
      value: result.netaTramoAlto,
      format: 'CLP',
    });
  }

  if (result.sobretasaFiscal > 0) {
    results.push({
      label: 'Sobretasa fiscal 0,025%',
      value: result.sobretasaFiscal,
      format: 'CLP',
    });
  }

  if (result.sobretasaSitio > 0) {
    results.push({
      label: 'Sobretasa sitio no edificado (100% de la tasa)',
      value: result.sobretasaSitio,
      format: 'CLP',
    });
  }

  return results;
}
