// ============================================
// Capacidad de crédito hipotecario según sueldo
// No hay norma que fije la relación dividendo/renta: es política de cada
// banco. CMF Educa cita 25 % del ingreso como recomendación habitual.
// Dividendo con amortización francesa del módulo credito-hipotecario.
// ============================================

import { UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';
import { calculateCreditoHipotecario } from './credito-hipotecario';

export const PORCENTAJE_DIVIDENDO_REFERENCIA = 25;

export interface CapacidadCreditoHipotecarioInput {
  /** Ingreso líquido mensual (propio o sumado con codeudor). */
  ingresoMensual: number;
  /** Pagos mensuales de otras deudas, descontados del margen. */
  otrasDeudasMensuales?: number;
  /** Máximo dividendo/renta que acepta el banco (%). */
  porcentajeDividendo?: number;
  tasaAnual: number;
  plazoAnos: number;
  /** Porcentaje del valor de la vivienda que financia el banco. */
  porcentajeFinanciamiento?: number;
  valorUF?: number;
}

export interface CapacidadCreditoHipotecarioResult {
  dividendoMaximoCLP: number;
  dividendoMaximoUF: number;
  creditoMaximoUF: number;
  creditoMaximoCLP: number;
  valorViviendaUF: number;
  pieNecesarioUF: number;
  dividendoResultanteCLP: number;
  totalInteresesUF: number;
  valorUF: number;
}

export function calculateCapacidadCreditoHipotecario(
  input: CapacidadCreditoHipotecarioInput,
): CapacidadCreditoHipotecarioResult {
  const valorUF = input.valorUF && input.valorUF > 0 ? input.valorUF : UF.valor;
  const pct = input.porcentajeDividendo ?? PORCENTAJE_DIVIDENDO_REFERENCIA;
  const financ = input.porcentajeFinanciamiento ?? 80;
  const otras = input.otrasDeudasMensuales ?? 0;
  const { ingresoMensual, tasaAnual, plazoAnos } = input;

  if (!Number.isFinite(ingresoMensual) || ingresoMensual <= 0)
    throw new Error('Ingresa tu ingreso líquido mensual.');
  if (!(pct > 0 && pct <= 60))
    throw new Error('El porcentaje dividendo/renta debe estar entre 1 % y 60 %.');
  if (!(financ > 0 && financ <= 100))
    throw new Error('El financiamiento debe estar entre 1 % y 100 % del valor de la vivienda.');
  if (!Number.isFinite(otras) || otras < 0)
    throw new Error('Las otras deudas no pueden ser negativas.');
  if (!Number.isInteger(plazoAnos) || plazoAnos < 1 || plazoAnos > 40)
    throw new Error('El plazo debe ser un número entero de años entre 1 y 40.');
  if (!Number.isFinite(tasaAnual) || tasaAnual < 0 || tasaAnual > 20)
    throw new Error('La tasa anual debe estar entre 0 % y 20 %.');

  const dividendoMaximoCLP = Math.max(0, Math.round((ingresoMensual * pct) / 100 - otras));
  if (dividendoMaximoCLP === 0) {
    throw new Error('Con esos datos tus otras deudas ocupan todo el margen para un dividendo.');
  }
  const dividendoMaximoUF = dividendoMaximoCLP / valorUF;

  // Inverso de la amortización francesa: valor presente de n dividendos.
  const r = tasaAnual / 100 / 12;
  const n = plazoAnos * 12;
  const creditoExacto =
    r === 0 ? dividendoMaximoUF * n : (dividendoMaximoUF * (1 - Math.pow(1 + r, -n))) / r;
  const creditoMaximoUF = Math.floor(creditoExacto * 100) / 100;

  const credito = calculateCreditoHipotecario({
    montoUF: creditoMaximoUF,
    plazoAnos,
    tasaAnual,
    valorUF,
  });
  const valorViviendaUF = Math.floor((creditoMaximoUF / (financ / 100)) * 100) / 100;

  return {
    dividendoMaximoCLP,
    dividendoMaximoUF: Math.round(dividendoMaximoUF * 100) / 100,
    creditoMaximoUF,
    creditoMaximoCLP: Math.round(creditoMaximoUF * valorUF),
    valorViviendaUF,
    pieNecesarioUF: Math.round((valorViviendaUF - creditoMaximoUF) * 100) / 100,
    dividendoResultanteCLP: credito.dividendoMensualCLP,
    totalInteresesUF: credito.totalInteresesUF,
    valorUF,
  };
}

export function capacidadCreditoHipotecarioToResults(
  r: CapacidadCreditoHipotecarioResult,
): CalculatorResult[] {
  return [
    {
      label: 'Crédito hipotecario máximo estimado (UF)',
      value: r.creditoMaximoUF,
      format: 'UF',
      highlight: true,
      note: {
        text: 'Estimación con el porcentaje dividendo/renta que ingresaste. Cada banco fija su propio límite y además evalúa tu historial, estabilidad laboral y otras deudas; no es una aprobación.',
        source: {
          name: 'CMF Educa — capacidad de pago',
          url: 'https://www.cmfchile.cl/educa/621/w3-article-27502.html',
        },
      },
    },
    {
      label: 'Crédito máximo en pesos (UF de hoy)',
      value: r.creditoMaximoCLP,
      format: 'CLP',
      highlight: true,
    },
    { label: 'Dividendo máximo que cabe en tu sueldo', value: r.dividendoMaximoCLP, format: 'CLP' },
    { label: 'Dividendo máximo (UF)', value: r.dividendoMaximoUF, format: 'UF' },
    { label: 'Valor de vivienda alcanzable (UF)', value: r.valorViviendaUF, format: 'UF' },
    { label: 'Pie necesario (UF)', value: r.pieNecesarioUF, format: 'UF' },
    {
      label: 'Total de intereses del crédito (UF)',
      value: r.totalInteresesUF,
      format: 'UF',
      note: {
        text: 'Sin seguros de desgravamen e incendio ni gastos operacionales, que suben el dividendo real.',
      },
    },
  ];
}
