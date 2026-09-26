// ============================================
// Cálculo de Asignación por Muerte / Cuota Mortuoria Chile 2026
// ChileAtiende ficha 5300 (IPS)
// ============================================

import {
  BENEFICIO_MORTUORIO,
  INGRESO_MINIMO,
  UF,
} from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export type RegimenMortuorio = 'ips-antiguo' | 'afp' | 'pgu';

export interface AsignacionPorMuerteInput {
  /** 'ips-antiguo', 'afp' (incluye renta vitalicia) o 'pgu'. */
  regimen: RegimenMortuorio;
  /** Gastos funerarios (CLP). */
  gastosFunerarios: number;
  /** Valor UF inyectado desde la UI (default: fallback local). */
  valorUF?: number;
}

export interface AsignacionPorMuerteResult {
  regimen: RegimenMortuorio;
  tope: number;
  reembolso: number;
  diferenciaNoCubierta: number;
  baseCalculo: string;
}

/**
 * Estima el reembolso de gastos funerarios.
 *
 * Asignación por Muerte (antiguo sistema previsional): tope de 3
 * IMM para fines no remuneracionales vigentes a la defunción
 * (= $1.070.445 con el IMM 2026). Cuota mortuoria de 15 UF para
 * afiliados AFP (financiada con el saldo de la cuenta; el Estado
 * cubre la diferencia si había aporte solidario o PGU), pensionados
 * PGU (paga el IPS) y renta vitalicia.
 */
export function calculateAsignacionPorMuerte(
  input: AsignacionPorMuerteInput,
): AsignacionPorMuerteResult {
  const regimen = input.regimen;
  const gastos = Math.max(0, input.gastosFunerarios ?? 0);
  const valorUF = input.valorUF ?? UF.valor;

  const tope =
    regimen === 'ips-antiguo'
      ? Math.round(
          INGRESO_MINIMO.no_remuneracional *
            BENEFICIO_MORTUORIO.asignacionMuerteIMMNoRemuneracional,
        )
      : Math.round(BENEFICIO_MORTUORIO.cuotaMortuoriaUF * valorUF);

  const reembolso = Math.min(Math.round(gastos), tope);
  const diferenciaNoCubierta = Math.max(0, Math.round(gastos) - reembolso);

  const baseCalculo =
    regimen === 'ips-antiguo'
      ? `Tope = 3 × IMM no remuneracional = $${tope.toLocaleString('es-CL')}. Reembolso = min(gastos, tope).`
      : `Cuota mortuoria = ${BENEFICIO_MORTUORIO.cuotaMortuoriaUF} UF = $${tope.toLocaleString('es-CL')} (UF $${valorUF.toLocaleString('es-CL')}). Reembolso = min(gastos, cuota).`;

  return {
    regimen,
    tope,
    reembolso,
    diferenciaNoCubierta,
    baseCalculo,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function asignacionPorMuerteToResults(
  result: AsignacionPorMuerteResult,
): CalculatorResult[] {
  return [
    {
      label: 'Reembolso estimado',
      value: result.reembolso,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Tope del beneficio',
      value: result.tope,
      format: 'CLP',
    },
    {
      label: 'Diferencia no cubierta',
      value: result.diferenciaNoCubierta,
      format: 'CLP',
    },
  ];
}
