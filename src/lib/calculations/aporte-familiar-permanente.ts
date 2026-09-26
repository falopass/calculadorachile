// ============================================
// Cálculo de Aporte Familiar Permanente Chile 2026
// Beneficio anual por carga familiar / grupo familiar (IPS)
// ============================================

import { APORTE_FAMILIAR_PERMANENTE } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface AporteFamiliarPermanenteInput {
  /**
   * Cargas familiares o personas que al 31-12-2025 dieron derecho a
   * cobrar Subsidio/Asignación Familiar o Maternal.
   */
  cargas: number;
  /**
   * El grupo familiar pertenecía a Chile Solidario o al Subsistema de
   * Seguridades y Oportunidades (Ingreso Ético Familiar) al 31-12-2025.
   */
  grupoSSyOO: boolean;
  /**
   * Madre que recibe el SUF por uno o más hijos/as menores de 18 que
   * viven con ella: obtiene el aporte por cada hijo y además el propio
   * como persona que genera el beneficio.
   */
  madreSUF: boolean;
}

export interface AporteFamiliarPermanenteResult {
  cargas: number;
  /** Número de aportes de $66.834 que corresponden. */
  numeroAportes: number;
  montoPorAporte: number;
  totalCLP: number;
  aplica: boolean;
  plazoCobroMeses: number;
  motivosNoAplica: string[];
  baseCalculo: string;
}

/**
 * Calcula el Aporte Familiar Permanente (ChileAtiende ficha 38913).
 *
 * Reglas oficiales:
 *  - $66.834 por cada carga que al 31-12-2025 daba derecho a SUF,
 *    Subsidio Maternal, Asignación Familiar o Maternal.
 *  - Si no hay cargas pero el grupo familiar pertenecía a Chile
 *    Solidario / SSyOO al 31-12-2025: un aporte por el grupo.
 *  - Si hay cargas Y además el grupo pertenecía a SSyOO, el aporte
 *    es solo por cada carga (no se suma un aporte extra por el grupo).
 *  - Madre con SUF por hijos <18 que viven con ella: recibe además
 *    un aporte propio como causante.
 *  - Plazo de cobro: 9 meses desde que se genera el documento de pago.
 */
export function calculateAporteFamiliarPermanente(
  input: AporteFamiliarPermanenteInput,
): AporteFamiliarPermanenteResult {
  const cargas = Math.max(0, Math.round(input.cargas ?? 0));
  const grupoSSyOO = input.grupoSSyOO === true;
  const madreSUF = input.madreSUF === true;

  const motivosNoAplica: string[] = [];

  let numeroAportes = cargas;
  // Excepción madre SUF: un aporte adicional para ella como causante.
  if (madreSUF && cargas > 0) numeroAportes += 1;
  // Familia en Chile Solidario / SSyOO sin cargas: un aporte por el grupo.
  if (cargas === 0 && grupoSSyOO) numeroAportes += 1;

  const aplica = numeroAportes > 0;

  if (!aplica) {
    if (cargas === 0 && !grupoSSyOO) {
      motivosNoAplica.push(
        'No declara cargas con derecho a SUF/Asignación Familiar o Maternal al 31-12-2025 ni un grupo familiar en Chile Solidario o Seguridades y Oportunidades a esa fecha.',
      );
    }
  }

  const montoPorAporte = aplica ? APORTE_FAMILIAR_PERMANENTE.montoCLP : 0;
  const totalCLP = numeroAportes * APORTE_FAMILIAR_PERMANENTE.montoCLP;

  const montoFmt = APORTE_FAMILIAR_PERMANENTE.montoCLP.toLocaleString('es-CL');
  const baseCalculo = aplica
    ? `${numeroAportes} aporte(s) × $${montoFmt} (corte de cargas y grupo familiar: 31-12-${APORTE_FAMILIAR_PERMANENTE.fechaCorte.slice(0, 4)}).`
    : motivosNoAplica.join(' ');

  return {
    cargas,
    numeroAportes,
    montoPorAporte,
    totalCLP,
    aplica,
    plazoCobroMeses: APORTE_FAMILIAR_PERMANENTE.plazoCobroMeses,
    motivosNoAplica,
    baseCalculo,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function aporteFamiliarPermanenteToResults(
  result: AporteFamiliarPermanenteResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: result.aplica
        ? 'Aporte Familiar Permanente total'
        : 'No corresponde el aporte',
      value: result.totalCLP,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Número de aportes',
      value: result.numeroAportes,
      format: 'number',
    },
    {
      label: 'Monto por carga / aporte',
      value: result.montoPorAporte,
      format: 'CLP',
    },
    {
      label: 'Plazo para cobrar (meses)',
      value: result.plazoCobroMeses,
      format: 'number',
    },
  ];

  return results;
}
