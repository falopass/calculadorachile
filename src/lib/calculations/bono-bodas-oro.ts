// ============================================
// Cálculo de Bono Bodas de Oro Chile 2026
// Beneficio único por 50 años de matrimonio (Ley 20.506)
// ============================================

import { BONO_BODAS_ORO, BODAS_ORO } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface BonoBodasOroInput {
  /**
   * Años de matrimonio cumplidos a la fecha de postulación.
   * El requisito legal es 50 años cumplidos.
   *
   * Para mantener compatibilidad con la UI existente (que usa
   * `anosTrabajados`), se acepta también ese alias y se interpreta
   * como años de matrimonio.
   */
  anosMatrimonio?: number;
  /** Alias legacy: la UI antigua entrega "años trabajados". */
  anosTrabajados?: number;
  /** Indica si pertenece al 80% más vulnerable según RSH. */
  perteneceAl80Vulnerable?: boolean;
  /** Indica si ambos cónyuges están vivos. */
  ambosConyugesVivos?: boolean;
  /** Compatibilidad legacy. */
  esPublico?: boolean;
  sueldoBruto?: number;
}

export interface BonoBodasOroResult {
  anosMatrimonio: number;
  aplica: boolean;
  /** Bono por cada cónyuge. */
  montoPorConyuge: number;
  /** Bono total para el matrimonio (≈ 2 × por cónyuge). */
  montoTotal: number;
  baseCalculo: string;
  cumpleAnos: boolean;
  cumpleVulnerabilidad: boolean;
  cumpleConyugesVivos: boolean;
  motivosNoAplica: string[];
}

const ANOS_REQUERIDOS = BODAS_ORO.anios_requeridos;

/**
 * Calcula el Bono Bodas de Oro (Ley 20.506).
 *
 * Bug histórico: la versión anterior interpretaba este bono como un
 * beneficio por años trabajados ("1 remuneración por año sobre 20")
 * con monto fijo de $150.000 — todo incorrecto.
 *
 * El bono real es un pago único entregado a parejas que cumplen
 * 50 años de matrimonio. Pertenece al sistema previsional (lo paga
 * el IPS) y consiste en un monto fijo por cada cónyuge, reajustado
 * anualmente por IPC.
 *
 * Requisitos:
 *  - 50 años de matrimonio cumplidos.
 *  - Ambos cónyuges vivos al momento del pago.
 *  - Pertenecer al 80% más vulnerable según RSH.
 *  - Residencia en Chile.
 *
 * Base legal: Ley 20.506 (Bono Bodas de Oro), administrado por el IPS.
 */
export function calculateBonoBodasOro(input: BonoBodasOroInput): BonoBodasOroResult {
  const {
    anosMatrimonio,
    anosTrabajados,
    perteneceAl80Vulnerable = true,
    ambosConyugesVivos = true,
  } = input;

  // Compat: usar anosMatrimonio si viene; si no, leer anosTrabajados
  // como alias (la UI antigua todavía expone ese campo).
  const anosRaw = anosMatrimonio ?? anosTrabajados ?? 0;
  const anos = Math.max(0, Math.round(anosRaw));

  const cumpleAnos = anos >= ANOS_REQUERIDOS;
  const cumpleVulnerabilidad = perteneceAl80Vulnerable === true;
  const cumpleConyugesVivos = ambosConyugesVivos === true;

  const aplica = cumpleAnos && cumpleVulnerabilidad && cumpleConyugesVivos;

  const motivosNoAplica: string[] = [];
  if (!cumpleAnos) {
    motivosNoAplica.push(`Requiere ${ANOS_REQUERIDOS} años de matrimonio (tienen ${anos}).`);
  }
  if (!cumpleVulnerabilidad) {
    motivosNoAplica.push('Debe pertenecer al 80% más vulnerable según RSH.');
  }
  if (!cumpleConyugesVivos) {
    motivosNoAplica.push('Ambos cónyuges deben estar vivos al momento del pago.');
  }

  const montoPorConyuge = aplica ? BONO_BODAS_ORO.montoPorConyugeCLP : 0;
  const montoTotal = aplica ? BONO_BODAS_ORO.montoTotalCLP : 0;

  const baseCalculo = aplica
    ? `Pago único de $${BONO_BODAS_ORO.montoPorConyugeCLP.toLocaleString('es-CL')} por cada cónyuge (Ley 20.506).`
    : motivosNoAplica.join(' ');

  return {
    anosMatrimonio: anos,
    aplica,
    montoPorConyuge,
    montoTotal,
    baseCalculo,
    cumpleAnos,
    cumpleVulnerabilidad,
    cumpleConyugesVivos,
    motivosNoAplica,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function bonoBodasOroToResults(result: BonoBodasOroResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];

  if (result.aplica) {
    results.push({
      label: 'Bono Total Matrimonio',
      value: result.montoTotal,
      format: 'CLP',
      highlight: true,
    });
    results.push({
      label: 'Bono por Cada Cónyuge',
      value: result.montoPorConyuge,
      format: 'CLP',
    });
  } else {
    results.push({
      label: 'No Aplica',
      value: 0,
      format: 'CLP',
      highlight: true,
    });
  }

  results.push({
    label: 'Años de Matrimonio',
    value: result.anosMatrimonio,
    format: 'number',
  });

  results.push({
    label: 'Requisito Legal (años)',
    value: ANOS_REQUERIDOS,
    format: 'number',
  });

  return results;
}
