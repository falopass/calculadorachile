// ============================================
// Estimación del subsidio al agua potable en Chile
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface SubsidioAguaInput {
  consumoM3: number;
  numeroPersonas: number;
  montoCuenta: number;
  /** Porcentaje informado en la resolución o beneficio: entre 25% y 85%. */
  porcentajeAsignado: number;
  /** Seguridades y Oportunidades cubre 100% de los primeros 15 m³. */
  seguridadesYOportunidades: boolean;
}

export interface SubsidioAguaResult {
  consumoM3: number;
  consumoSubsidiado: number;
  subsidioPct: number;
  montoSubsidioEstimado: number;
  montoPagarEstimado: number;
  montoCuenta: number;
  topeM3: number;
  usaCoberturaEspecial: boolean;
}

/**
 * Estima el aporte aplicando el porcentaje oficialmente asignado a la parte
 * proporcional de la cuenta asociada al consumo cubierto.
 *
 * Régimen general: porcentaje municipal entre 25% y 85%, hasta 13 m³.
 * Seguridades y Oportunidades: 100% de los primeros 15 m³.
 *
 * La boleta real puede incluir cargos fijos y conceptos no proporcionales al
 * consumo. Por eso el resultado se rotula como estimación y no se inventa una
 * tarifa nacional por m³.
 */
export function calculateSubsidioAgua(input: SubsidioAguaInput): SubsidioAguaResult {
  const consumo = Math.max(0, input.consumoM3);
  const montoCuenta = Math.max(0, Math.round(input.montoCuenta));
  const usaCoberturaEspecial = input.seguridadesYOportunidades === true;
  const topeM3 = usaCoberturaEspecial ? 15 : 13;
  const subsidioPct = usaCoberturaEspecial
    ? 100
    : Math.min(85, Math.max(25, input.porcentajeAsignado));
  const consumoSubsidiado = Math.min(consumo, topeM3);
  const proporcionCubierta = consumo > 0 ? consumoSubsidiado / consumo : 0;
  const montoSubsidioEstimado = Math.round(
    montoCuenta * proporcionCubierta * (subsidioPct / 100),
  );

  return {
    consumoM3: consumo,
    consumoSubsidiado,
    subsidioPct,
    montoSubsidioEstimado,
    montoPagarEstimado: Math.max(0, montoCuenta - montoSubsidioEstimado),
    montoCuenta,
    topeM3,
    usaCoberturaEspecial,
  };
}

export function subsidioAguaToResults(result: SubsidioAguaResult): CalculatorResult[] {
  return [
    {
      label: 'Pago estimado después del subsidio',
      value: result.montoPagarEstimado,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Subsidio estimado',
      value: result.montoSubsidioEstimado,
      format: 'CLP',
    },
    { label: 'Monto de la cuenta', value: result.montoCuenta, format: 'CLP' },
    { label: 'Porcentaje asignado', value: result.subsidioPct, format: 'percentage' },
    {
      label: `Consumo cubierto (tope ${result.topeM3} m³)`,
      value: result.consumoSubsidiado,
      format: 'number',
    },
  ];
}
