// ============================================
// Monedas de viaje ↔ CLP (real brasileño, sol peruano)
// --------------------------------------------
// Mismo patrón y gate que peso-argentino-clp (E-050):
// tasa BCCh F072.CLP.<ISO>.N.O.D (referencial); si
// source=fallback/unknown o la observación tiene más
// de 3 días hábiles, NO se presenta como «hoy».
// ============================================

import { REAL_BRASILENO, SOL_PERUANO } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';
import { businessDaysSince } from './peso-argentino-clp';

export type CodigoDivisaViaje = 'BRL' | 'PEN';

const DIVISAS = {
  BRL: { constante: () => REAL_BRASILENO, nombre: 'reales brasileños', singular: 'real brasileño', pais: 'Brasil' },
  PEN: { constante: () => SOL_PERUANO, nombre: 'soles peruanos', singular: 'sol peruano', pais: 'Perú' },
} as const;

export interface DivisaViajeClpInput {
  codigo: CodigoDivisaViaje;
  monto: number;
  /** true: moneda extranjera → CLP; false: CLP → moneda extranjera. */
  aClp: boolean;
  /** Si se entrega (>0), anula la tasa del snapshot solo para el cálculo. */
  tasaPersonalizada?: number;
}

export interface DivisaViajeClpResult {
  codigo: CodigoDivisaViaje;
  monto: number;
  tasaCambio: number;
  resultado: number;
  resultadoEnCLP: boolean;
  usoTasaSitio: boolean;
  /** false → no decir «hoy» en UI/title. */
  presentableComoHoy: boolean;
  etiquetaTasa: string;
}

function formatDDMMYYYY(ymd: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : ymd;
}

export function isDivisaViajePresentableComoHoy(
  codigo: CodigoDivisaViaje,
  now: Date = new Date(),
): boolean {
  const c = DIVISAS[codigo].constante();
  if (c.fuente_snapshot === 'fallback' || c.fuente_snapshot === 'unknown' || !c.fuente_snapshot)
    return false;
  if (!(c.valor > 0)) return false;
  return businessDaysSince(c.fecha_actualizacion, now) <= 3;
}

export function calculateDivisaViajeClp(
  input: DivisaViajeClpInput,
  now: Date = new Date(),
): DivisaViajeClpResult {
  const c = DIVISAS[input.codigo].constante();
  const monto = Math.max(0, input.monto);
  const personalizada = input.tasaPersonalizada ?? null;
  const tasa = personalizada ?? (c.valor > 0 ? c.valor : 0);
  if (!(tasa > 0)) {
    throw new Error(
      `No hay tipo de cambio ${input.codigo}/CLP disponible. Revisa el valor del Banco Central e inténtalo de nuevo.`,
    );
  }
  const resultado = input.aClp ? Math.round(monto * tasa) : Number((monto / tasa).toFixed(2));
  const presentable = personalizada == null && isDivisaViajePresentableComoHoy(input.codigo, now);
  const etiquetaTasa =
    personalizada != null
      ? 'Tasa personalizada ingresada por el usuario (no es la del Banco Central).'
      : presentable
        ? `Tipo de cambio nominal referencial del Banco Central de Chile (serie ${c.serie}), observación reciente.`
        : `Valor referencial del ${formatDDMMYYYY(c.fecha_actualizacion)} (BCCh serie ${c.serie}). No corresponde a la cotización del día en curso.`;
  return {
    codigo: input.codigo,
    monto,
    tasaCambio: Math.round(tasa * 10000) / 10000,
    resultado,
    resultadoEnCLP: input.aClp,
    usoTasaSitio: personalizada == null,
    presentableComoHoy: presentable,
    etiquetaTasa,
  };
}

export function divisaViajeClpToResults(r: DivisaViajeClpResult): CalculatorResult[] {
  const c = DIVISAS[r.codigo].constante();
  return [
    { label: 'Resultado', value: r.resultado, format: r.resultadoEnCLP ? 'CLP' : 'number', highlight: true },
    {
      label: `Tipo de cambio usado (CLP por 1 ${r.codigo})`,
      value: r.tasaCambio,
      format: 'number',
      note: {
        text: r.etiquetaTasa,
        source: { name: `BCCh — tipo de cambio nominal ${DIVISAS[r.codigo].singular}`, url: c.fuente },
      },
    },
  ];
}

/** Title/meta: nunca «hoy» si el gate falla. */
export function seoDivisaViaje(
  codigo: CodigoDivisaViaje,
  now: Date = new Date(),
): { seoTitle: string; seoDescription: string } {
  const d = DIVISAS[codigo];
  const c = d.constante();
  const nombre = d.singular[0].toUpperCase() + d.singular.slice(1);
  const seoTitle = `${nombre} a peso chileno: conversor ${codigo}↔CLP BCCh`;
  const valor = isDivisaViajePresentableComoHoy(codigo, now)
    ? 'el tipo de cambio nominal del Banco Central'
    : `el tipo de cambio nominal referencial del BCCh (valor del ${formatDDMMYYYY(c.fecha_actualizacion)})`;
  return {
    seoTitle,
    seoDescription: `Convierte ${d.nombre} a pesos chilenos y al revés con ${valor}. Útil para presupuestar viajes y compras en ${d.pais}.`,
  };
}
