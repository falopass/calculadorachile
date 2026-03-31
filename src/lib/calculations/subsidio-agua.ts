// ============================================
// Cálculo de Subsidio de Agua Potable Chile 2026
// Beneficio del Estado para el pago del servicio de agua potable
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface SubsidioAguaInput {
  consumoM3: number;
  numeroPersonas: number;
  tramo: 'tramo1' | 'tramo2' | 'tramo3';
  zona: 'norte' | 'central' | 'sur';
}

export interface SubsidioAguaResult {
  consumoM3: number;
  tarifaM3: number;
  consumoSubsidiado: number;
  subsidioPct: number;
  montoSubsidio: number;
  montoPagar: number;
}

/**
 * Tarifas aproximadas por m3 según zona geográfica.
 * Sur tiene tarifas más altas por clima y tratamiento.
 * Valores de referencia 2026.
 */
const TARIFAS_M3: Record<SubsidioAguaInput['zona'], number> = {
  norte: 800,
  central: 950,
  sur: 1200,
};

/**
 * Subsidio por tramo del Registro Social de Hogares.
 * Tramo 1: 100% hasta 15m3/persona, Tramo 2: 70%, Tramo 3: 50%.
 * D.S. N° 235 del MOP y Ley N° 21.064.
 */
const SUBSIDIO_POR_TRAMO: Record<SubsidioAguaInput['tramo'], number> = {
  tramo1: 100,
  tramo2: 70,
  tramo3: 50,
};

/**
 * Calcula el subsidio de agua potable según consumo, tramo y zona.
 * El consumo subsidiado se calcula como 15m3 por persona.
 * El subsidio se aplica al menor entre consumo real y consumo subsidiado.
 * D.S. N° 235 del MOP, Ley N° 21.064.
 */
export function calculateSubsidioAgua(input: SubsidioAguaInput): SubsidioAguaResult {
  const {
    consumoM3,
    numeroPersonas,
    tramo,
    zona,
  } = input;

  // Validar rangos
  const consumo = Math.max(0, consumoM3);
  const personas = Math.max(1, Math.round(numeroPersonas));

  // Tarifa según zona
  const tarifaM3 = TARIFAS_M3[zona];

  // Consumo subsidiado: 15m3 por persona
  const consumoSubsidiado = 15 * personas;

  // Porcentaje de subsidio según tramo
  const subsidioPct = SUBSIDIO_POR_TRAMO[tramo];

  // Consumo efectivo a subsidiar: el menor entre consumo real y subsidiable
  const consumoASubsidiar = Math.min(consumo, consumoSubsidiado);

  // Montos
  const costoTotal = Math.round(consumo * tarifaM3);
  const montoSubsidio = Math.round(consumoASubsidiar * tarifaM3 * (subsidioPct / 100));
  const montoPagar = Math.max(0, costoTotal - montoSubsidio);

  return {
    consumoM3: consumo,
    tarifaM3,
    consumoSubsidiado,
    subsidioPct,
    montoSubsidio,
    montoPagar,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function subsidioAguaToResults(result: SubsidioAguaResult): CalculatorResult[] {
  return [
    { label: 'Monto a Pagar', value: result.montoPagar, format: 'CLP', highlight: true },
    { label: 'Monto Subsidio', value: result.montoSubsidio, format: 'CLP' },
    { label: 'Subsidio', value: result.subsidioPct, format: 'percentage' },
    { label: 'Consumo Subsidiado', value: result.consumoSubsidiado, format: 'number' },
    { label: 'Tarifa por m³', value: result.tarifaM3, format: 'CLP' },
    { label: 'Consumo m³', value: result.consumoM3, format: 'number' },
  ];
}
