// ============================================
// Porcentajes y descuentos
// ----------------------------------------------
// Aritmética de porcentajes de uso general
// (ofertas, rebajas, CyberDay/Black Friday).
// No hay constante legal involucrada; la fuente
// de contexto es SERNAC (ofertas y liquidaciones).
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export type TipoPorcentaje =
  | 'porcentaje-de'
  | 'que-porcentaje'
  | 'variacion'
  | 'descuento'
  | 'aumento';

export interface PorcentajeInput {
  tipo: TipoPorcentaje;
  /** Monto o primer valor (precio original, total, parte). */
  valorA: number;
  /** Segundo valor según el modo (total en que-porcentaje, valor nuevo en variacion). */
  valorB?: number;
  /** Porcentaje a aplicar (porcentaje-de, descuento, aumento). */
  porcentaje?: number;
  /** Segundo descuento sucesivo en porcentaje (solo modo descuento). */
  descuentoAdicional?: number;
}

export interface PorcentajeResult {
  tipo: TipoPorcentaje;
  /** true cuando faltan inputs mínimos o hay división por cero. */
  indefinido: boolean;
  /** Resultado principal del modo. */
  principal?: number;
  /** Porcentaje calculado (que-porcentaje, variacion, efectivo en descuento). */
  porcentajeResultado?: number;
  /** Diferencia monetaria (variacion, descuento, aumento). */
  diferencia?: number;
  /** Precio tras el primer descuento (modo descuento con segundo descuento). */
  intermedio?: number;
  valorA: number;
  valorB?: number;
  porcentaje?: number;
  descuentoAdicional?: number;
}

const redondeo = (n: number) => Math.round(n * 100) / 100;

export function calculatePorcentaje(input: PorcentajeInput): PorcentajeResult {
  const { tipo, valorA } = input;
  const porcentaje = input.porcentaje ?? 0;
  const valorB = input.valorB ?? 0;
  const descuentoAdicional = input.descuentoAdicional ?? 0;

  const base: PorcentajeResult = {
    tipo,
    indefinido: false,
    valorA,
    valorB: input.valorB,
    porcentaje: input.porcentaje,
    descuentoAdicional: input.descuentoAdicional,
  };

  switch (tipo) {
    case 'porcentaje-de': {
      if (!input.porcentaje && input.porcentaje !== 0) {
        return { ...base, indefinido: true };
      }
      return { ...base, principal: Math.round(valorA * (porcentaje / 100)) };
    }

    case 'que-porcentaje': {
      if (valorB === 0) return { ...base, indefinido: true };
      return {
        ...base,
        principal: redondeo((valorA / valorB) * 100),
        porcentajeResultado: redondeo((valorA / valorB) * 100),
      };
    }

    case 'variacion': {
      if (valorA === 0) return { ...base, indefinido: true };
      const pct = ((valorB - valorA) / valorA) * 100;
      return {
        ...base,
        principal: redondeo(pct),
        porcentajeResultado: redondeo(pct),
        diferencia: Math.round(valorB - valorA),
      };
    }

    case 'descuento': {
      const p1 = Math.min(Math.max(porcentaje, 0), 100);
      const p2 = Math.min(Math.max(descuentoAdicional, 0), 100);
      const intermedio = valorA * (1 - p1 / 100);
      const final = intermedio * (1 - p2 / 100);
      const ahorro = valorA - final;
      return {
        ...base,
        principal: Math.round(final),
        diferencia: Math.round(ahorro),
        intermedio: p2 > 0 ? Math.round(intermedio) : undefined,
        porcentajeResultado: valorA > 0 ? redondeo((ahorro / valorA) * 100) : 0,
      };
    }

    case 'aumento': {
      const final = valorA * (1 + porcentaje / 100);
      return {
        ...base,
        principal: Math.round(final),
        diferencia: Math.round(final - valorA),
      };
    }
  }
}

export function porcentajeToResults(result: PorcentajeResult): CalculatorResult[] {
  if (result.indefinido) return [];
  const results: CalculatorResult[] = [];

  switch (result.tipo) {
    case 'porcentaje-de':
      results.push({
        label: `${result.porcentaje ?? 0}% de ${result.valorA.toLocaleString('es-CL')}`,
        value: result.principal ?? 0,
        format: 'CLP',
        highlight: true,
      });
      results.push({
        label: 'Valor base',
        value: Math.round(result.valorA),
        format: 'CLP',
      });
      break;

    case 'que-porcentaje':
      results.push({
        label: `${result.valorA.toLocaleString('es-CL')} como % de ${(
          result.valorB ?? 0
        ).toLocaleString('es-CL')}`,
        value: result.principal ?? 0,
        format: 'percentage',
        highlight: true,
      });
      results.push({
        label: 'Diferencia (B − A)',
        value: Math.round((result.valorB ?? 0) - result.valorA),
        format: 'number',
      });
      break;

    case 'variacion':
      results.push({
        label: 'Variación porcentual',
        value: result.principal ?? 0,
        format: 'percentage',
        highlight: true,
      });
      results.push({
        label: 'Diferencia (valor nuevo − inicial)',
        value: result.diferencia ?? 0,
        format: 'CLP',
      });
      break;

    case 'descuento':
      results.push({
        label: 'Precio final con descuento',
        value: result.principal ?? 0,
        format: 'CLP',
        highlight: true,
      });
      results.push({
        label: 'Ahorro total',
        value: result.diferencia ?? 0,
        format: 'CLP',
      });
      if (result.intermedio !== undefined) {
        results.push({
          label: `Precio tras el primer descuento (${result.porcentaje ?? 0}%)`,
          value: result.intermedio,
          format: 'CLP',
        });
      }
      results.push({
        label: 'Descuento efectivo total',
        value: result.porcentajeResultado ?? 0,
        format: 'percentage',
        note:
          (result.descuentoAdicional ?? 0) > 0
            ? {
                text: 'Los descuentos sucesivos se aplican uno tras otro, no se suman.',
              }
            : undefined,
      });
      break;

    case 'aumento':
      results.push({
        label: 'Precio final con aumento',
        value: result.principal ?? 0,
        format: 'CLP',
        highlight: true,
      });
      results.push({
        label: 'Monto del aumento',
        value: result.diferencia ?? 0,
        format: 'CLP',
      });
      break;
  }

  return results;
}
