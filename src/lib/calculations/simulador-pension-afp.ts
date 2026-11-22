// ============================================
// Simulador de Pensión AFP con Reforma (Ley 21.735)
// Retiro programado + PGU + BAC + CEV
// ============================================

import {
  APORTE_EMPLEADOR_AFP,
  TITRP,
  TOPE_IMPOSITIVO,
  UF,
  fechaLocal,
} from '@/lib/values/constants';
import {
  TM2020_AA_HOMBRES,
  TM2020_AA_MUJERES,
  TM2020_QX_CB_H,
  TM2020_QX_RV_M,
} from '@/lib/values/tablas-mortalidad-2020';
import { calculatePGU } from './pgu';
import { calculateBeneficioAnosCotizados } from './beneficio-anos-cotizados';
import type { CalculatorResult } from '@/types/calculator';

export type SexoPension = 'hombre' | 'mujer';

export interface SimuladorPensionAfpInput {
  /** Sexo legal (define la tabla de mortalidad: CB-H-2020 o RV-M-2020). */
  sexo: SexoPension;
  /** Edad cumplida hoy. */
  edadActual: number;
  /** Edad a la que se pensiona (60–110). */
  edadPension: number;
  /** Saldo acumulado en la cuenta AFP (CLP, valor de hoy). */
  saldoAfp: number;
  /**
   * Sueldo imponible mensual actual (CLP). Si es > 0 se proyectan
   * cotizaciones hasta la edad de pensión (10% trabajador + aporte
   * empleador a la cuenta según calendario Ley 21.735).
   */
  sueldoImponible?: number;
  /** Meses cotizados acumulados (para el BAC). */
  mesesCotizados?: number;
  /** Valor UF en vivo (API); si falta se usa el respaldo local. */
  valorUF?: number;
  /** Tasa anual TITRP; default: la vigente publicada por la SP. */
  tasaInteres?: number;
  /** Fecha de referencia del cálculo (default: hoy). */
  fecha?: Date;
}

export interface SimuladorPensionAfpResult {
  saldoHoy: number;
  saldoProyectado: number;
  edadPension: number;
  /** CNU aplicado con la tabla de mortalidad del sexo declarado. */
  cnuAplicado: number;
  /** Pensión mensual autofinanciada por retiro programado. */
  pensionMensual: number;
  cevMensual: number;
  pguMensual: number;
  bacMensual: number;
  bacAplica: boolean;
  pguAplica: boolean;
  cevAplica: boolean;
  pensionTotal: number;
  /** CNU con tabla de hombres (base de la CEV de mujeres). */
  cnuHombre: number;
  pensionEquivalenteHombre: number;
  tasaInteres: number;
  valorUF: number;
  anioPension: number;
  notas: string[];
}

/**
 * Probabilidad de fallecimiento mejorada q_{x,año} (Anexo N°9, NCG 306):
 *   q_{x,año} = q_{x,2020} · Π_{t=2021}^{año} (1 − AA_{x,t}),
 * con AA_{x,t} = AA_{x,2036} para t > 2036.
 */
function qxMejorada(sexo: SexoPension, edad: number, anio: number): number {
  const qx = sexo === 'hombre' ? TM2020_QX_CB_H[edad] : TM2020_QX_RV_M[edad - 20];
  if (qx === undefined) return 1;
  const aa = sexo === 'hombre' ? TM2020_AA_HOMBRES[edad] : TM2020_AA_MUJERES[edad];
  let factor = 1;
  for (let t = 2021; t <= anio; t++) {
    const idx = Math.min(t, 2036) - 2021;
    factor *= 1 - (aa?.[idx] ?? 0);
  }
  return qx * factor;
}

/**
 * Capital Necesario Unitario para retiro programado (persona sin
 * beneficiarios de sobrevivencia): CNU = Σ_{k=0}^{ω−x} ₖp_x · (1+t)^{-k}.
 * La pensión mensual es saldo / (CNU × 12) (D.L. 3.500 art. 65;
 * Nota Técnica N° 5 SP).
 */
export function calcularCNU(
  sexo: SexoPension,
  edad: number,
  anioCalculo: number,
  tasaAnual: number,
): number {
  let cnu = 0;
  let supervivencia = 1;
  for (let k = 0; ; k++) {
    cnu += supervivencia * (1 + tasaAnual) ** -k;
    const edadK = edad + k;
    if (edadK >= 110) break;
    supervivencia *= 1 - qxMejorada(sexo, edadK, anioCalculo + k);
  }
  return cnu;
}

/** Aporte del empleador a la cuenta individual vigente en una fecha. */
function tasaAporteEmpleador(fecha: Date): number {
  let tasa = 0;
  const t = fecha.getTime();
  for (const esc of APORTE_EMPLEADOR_AFP) {
    if (fechaLocal(esc.desde).getTime() <= t) tasa = esc.tasa;
    else break;
  }
  return tasa;
}

const MESES_POR_ANO = 12;

/**
 * Proyecta el saldo a la edad de pensión: el saldo actual se capitaliza
 * a la TITRP en términos reales y se suman las cotizaciones mensuales
 * (10% del trabajador + aporte del empleador a la cuenta individual
 * según Ley 21.735) cuando hay sueldo imponible declarado.
 */
function proyectarSaldo(
  saldoHoy: number,
  sueldoImponible: number,
  meses: number,
  fechaInicio: Date,
  tasaAnual: number,
): number {
  const tasaMensual = (1 + tasaAnual) ** (1 / MESES_POR_ANO) - 1;
  let saldo = saldoHoy;
  for (let m = 0; m < meses; m++) {
    saldo *= 1 + tasaMensual;
    const fechaMes = new Date(fechaInicio.getTime());
    fechaMes.setMonth(fechaMes.getMonth() + m);
    saldo += sueldoImponible * (0.1 + tasaAporteEmpleador(fechaMes));
  }
  return saldo;
}

/**
 * Estima la pensión mensual total: pensión autofinanciada (retiro
 * programado con CNU y TITRP oficiales) + PGU + BAC + CEV.
 */
export function calculateSimuladorPensionAfp(
  input: SimuladorPensionAfpInput,
): SimuladorPensionAfpResult {
  const edad = Math.max(0, Math.round(input.edadPension));
  const edadActual = Math.max(0, Math.round(input.edadActual));
  const saldoHoy = Math.max(0, input.saldoAfp ?? 0);
  const valorUF = input.valorUF && input.valorUF > 0 ? input.valorUF : UF.valor;
  // Cotizar sobre más del tope imponible no genera aportes.
  const imponible = Math.min(
    Math.max(0, input.sueldoImponible ?? 0),
    TOPE_IMPOSITIVO.afp_salud * valorUF,
  );
  const mesesCotizados = Math.max(0, Math.round(input.mesesCotizados ?? 0));
  const tasa = input.tasaInteres && input.tasaInteres > 0 ? input.tasaInteres : TITRP.tasaAnual;
  const fecha = input.fecha ?? new Date();

  // Si la edad de pensión es menor que la edad actual, el escenario es
  // pensionarse hoy.
  const mesesProyeccion = Math.max(0, (edad - edadActual) * MESES_POR_ANO);
  const anioPension = fecha.getFullYear() + Math.max(0, edad - edadActual);
  const fechaPension = new Date(fecha.getTime());
  fechaPension.setFullYear(fechaPension.getFullYear() + Math.max(0, edad - edadActual));

  const saldoProyectado =
    mesesProyeccion > 0
      ? proyectarSaldo(saldoHoy, imponible, mesesProyeccion, fecha, tasa)
      : saldoHoy;

  const cnuAplicado = calcularCNU(input.sexo, edad, anioPension, tasa);
  const pensionMensual = Math.round(saldoProyectado / (MESES_POR_ANO * cnuAplicado));

  // CEV (mujeres 65+): compensa hasta igualar la pensión de un hombre
  // de la misma edad y saldo (ChileAtiende ficha 130452). La base de
  // cálculo no supera 18 UF mensuales y la compensación no es inferior
  // a 0,25 UF cuando es positiva.
  const cnuHombre = calcularCNU('hombre', edad, anioPension, tasa);
  const topeCev = 18 * valorUF;
  const pensionEquivalenteHombre = Math.round(
    saldoProyectado / (MESES_POR_ANO * cnuHombre),
  );
  const cevAplica = input.sexo === 'mujer' && edad >= 65;
  const diferenciaCev = cevAplica
    ? Math.max(0, Math.min(pensionEquivalenteHombre, topeCev) - Math.min(pensionMensual, topeCev))
    : 0;
  const cevMensual =
    diferenciaCev > 0 ? Math.max(diferenciaCev, Math.round(0.25 * valorUF)) : 0;

  // Meses cotizados proyectados: quien sigue trabajando acumula meses
  // hasta la edad de pensión (relevante para el BAC y el requisito de
  // años de la PGU).
  const mesesCotizadosProyectados =
    imponible > 0 ? mesesCotizados + mesesProyeccion : mesesCotizados;

  // BAC (0,1 UF × años cotizados, tope 2,5 UF).
  const bac = calculateBeneficioAnosCotizados({
    sexo: input.sexo,
    edad,
    mesesCotizados: mesesCotizadosProyectados,
    pensionadoAfp: true,
    pensionRetiroCapredenaDipreca: false,
    fecha: fechaPension,
    valorUF,
  });

  // La pensión base de la PGU suma la autofinanciada y los beneficios
  // de la reforma (BAC y CEV): más base, menos PGU.
  const pensionBasePgu = pensionMensual + cevMensual + bac.beneficioCLP;
  const pgu = calculatePGU({
    pensionActual: pensionBasePgu,
    anosCotizados: Math.floor(mesesCotizadosProyectados / 12),
    esHombre: input.sexo === 'hombre',
    edad,
    fecha: fechaPension,
  });

  const pensionTotal = pensionMensual + cevMensual + pgu.pguMensual + bac.beneficioCLP;

  const notas: string[] = [];
  if (edad < 65) {
    notas.push('La PGU y el BAC exigen 65 años; la CEV también. Antes de esa edad solo aplica la pensión autofinanciada.');
  }
  if (input.sexo === 'mujer' && edad >= 60 && edad < 65) {
    notas.push('La CEV se estima al cumplir 65 años; se muestra solo si te pensionas a los 65 o más.');
  }
  if (edad > edadActual && imponible > 0) {
    notas.push(
      `Proyección a ${anioPension}: sueldo constante en términos reales, rentabilidad = TITRP ${(tasa * 100).toLocaleString('es-CL', { maximumFractionDigits: 2 })}% anual y aporte del empleador a tu cuenta según el calendario de la reforma.`,
    );
  }
  notas.push(
    'Retiro programado para afiliado soltero sin beneficiarios de sobrevivencia; con cónyuge o hijos beneficiarios la pensión baja (mayor CNU).',
  );
  if (bac.aplica) {
    notas.push(
      'Si te pensionas desde agosto de 2025 sin haber cumplido 65 años al 31-07-2025, el BAC se financia con una anualidad descontada de tu propia cuenta (aporte CRP del empleador): se muestra el monto bruto del beneficio.',
    );
  }

  return {
    saldoHoy,
    saldoProyectado: Math.round(saldoProyectado),
    edadPension: edad,
    cnuAplicado,
    pensionMensual,
    cevMensual,
    pguMensual: pgu.pguMensual,
    bacMensual: bac.beneficioCLP,
    bacAplica: bac.aplica,
    pguAplica: pgu.pguMensual > 0,
    cevAplica,
    pensionTotal,
    cnuHombre,
    pensionEquivalenteHombre,
    tasaInteres: tasa,
    valorUF,
    anioPension,
    notas,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function simuladorPensionAfpToResults(
  result: SimuladorPensionAfpResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: 'Pensión total mensual estimada',
      value: result.pensionTotal,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Pensión autofinanciada (retiro programado)',
      value: result.pensionMensual,
      format: 'CLP',
    },
  ];
  if (result.cevAplica && result.cevMensual > 0) {
    results.push({
      label: 'Compensación por expectativa de vida (CEV)',
      value: result.cevMensual,
      format: 'CLP',
    });
  }
  if (result.pguMensual > 0) {
    results.push({ label: 'PGU estimada', value: result.pguMensual, format: 'CLP' });
  }
  if (result.bacMensual > 0) {
    results.push({ label: 'BAC estimado', value: result.bacMensual, format: 'CLP' });
  }
  results.push(
    { label: 'Saldo proyectado a la edad de pensión', value: result.saldoProyectado, format: 'CLP' },
    {
      label: 'Capital necesario unitario (CNU)',
      value: Math.round(result.cnuAplicado * 1000) / 1000,
      format: 'number',
    },
    {
      label: 'Tasa técnica aplicada (TITRP)',
      value: result.tasaInteres * 100,
      format: 'percentage',
    },
  );
  return results;
}
