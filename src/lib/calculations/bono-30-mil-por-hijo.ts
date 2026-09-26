// ============================================
// Cálculo del Bono $30.000 por hijo (Ley 21.840)
// Automático, una sola vez, no se postula
// ============================================

import { BONO_APOYO_NINEZ } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface Bono30MilPorHijoInput {
  /** Niños hasta 13 años al 01-06-2026 (requieren 80% RSH). */
  ninos: number;
  /** Hogar dentro del 80% más vulnerable según RSH al 01-06-2026. */
  rsh80: boolean;
  /** Niños nacidos entre el 02-06-2026 y el 15-03-2027 (madre con 80% RSH). */
  nacidosEnPeriodo: number;
  /** Niños hasta 13 años bajo cuidado alternativo familiar (sin RSH). */
  cuidadoAlternativo: number;
}

export interface Bono30MilPorHijoResult {
  ninosBeneficiarios: number;
  aplica: boolean;
  total: number;
  /** Parte pagada después del 15-03-2027 (nacidos en el período). */
  montoPagoPosterior: number;
  motivosNoAplica: string[];
  baseCalculo: string;
}

/**
 * Estima el Bono de $30.000 por hijo (ChileAtiende ficha 144481,
 * Ley 21.840). Automático y por una sola vez; no constituye
 * remuneración ni renta. Tres vías de beneficio: niños hasta 13
 * años al 01-06-2026 con hogar en el 80% RSH; madre de niños
 * nacidos entre 02-06-2026 y 15-03-2027 (80% RSH al 01-06-2026, se
 * paga después del 15-03-2027); y niños en cuidado alternativo
 * familiar, cuyo cuidador legal al 01-06-2026 no necesita RSH.
 */
export function calculateBono30MilPorHijo(
  input: Bono30MilPorHijoInput,
): Bono30MilPorHijoResult {
  const monto = BONO_APOYO_NINEZ.montoPorNinoCLP;
  const ninos = Math.max(0, Math.round(input.ninos ?? 0));
  const nacidos = Math.max(0, Math.round(input.nacidosEnPeriodo ?? 0));
  const cuidado = Math.max(0, Math.round(input.cuidadoAlternativo ?? 0));
  const rsh80 = input.rsh80 === true;

  const ninosConRsh = rsh80 ? ninos + nacidos : 0;
  const ninosBeneficiarios = ninosConRsh + cuidado;
  const aplica = ninosBeneficiarios > 0;
  const total = aplica ? ninosBeneficiarios * monto : 0;
  const montoPagoPosterior = rsh80 ? nacidos * monto : 0;

  const motivosNoAplica: string[] = [];
  if (!aplica) {
    motivosNoAplica.push(
      rsh80
        ? 'No se declararon niños beneficiarios.'
        : 'Sin hogar en el 80% más vulnerable RSH solo cuentan los niños bajo cuidado alternativo familiar.',
    );
  }

  const baseCalculo = aplica
    ? `${ninosBeneficiarios} niño(s) beneficiario(s) × $${monto.toLocaleString('es-CL')} (Ley 21.840).${nacidos > 0 && rsh80 ? ` $${montoPagoPosterior.toLocaleString('es-CL')} se pagan después del 15-03-2027.` : ''}`
    : motivosNoAplica.join(' ');

  return {
    ninosBeneficiarios,
    aplica,
    total,
    montoPagoPosterior,
    motivosNoAplica,
    baseCalculo,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function bono30MilPorHijoToResults(
  result: Bono30MilPorHijoResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: 'Bono total estimado (pago único)',
      value: result.total,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Niños beneficiarios',
      value: result.ninosBeneficiarios,
      format: 'number',
    },
    {
      label: 'Plazo para cobrarlo',
      value: BONO_APOYO_NINEZ.plazoCobroMeses,
      format: 'number',
    },
  ];
  if (result.montoPagoPosterior > 0) {
    results.splice(1, 0, {
      label: 'De ese total, se paga después del 15-03-2027',
      value: result.montoPagoPosterior,
      format: 'CLP',
    });
  }
  return results;
}
