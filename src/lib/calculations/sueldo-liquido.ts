// ============================================
// Cálculo de Sueldo Líquido Chile 2026
// ============================================

import {
  AFP,
  SALUD,
  SEGURO_CESANTIA,
  TOPE_IMPOSITIVO,
  IMPUESTO_SEGUNDA_CATEGORIA,
  UTM,
  UF,
  MUTUAL,
} from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface SueldoLiquidoInput {
  sueldoBruto: number;
  afp: keyof typeof AFP;
  saludTipo: 'fonasa' | 'isapre';
  saludTramo?: 'A' | 'B' | 'C' | 'D';
  /** Monto adicional del plan isapre en UF. Si supera el 7% legal, se descuenta lo mayor. */
  isapreMonto?: number;
  contratoIndefinido?: boolean;
  bonoMovilizacion?: number;
  bonoColacion?: number;
  bonoPerdidaCaja?: number;
  comisiones?: number;
  asignacionFamiliar?: number;
  prestamoEmpleador?: number;
  descuentoSindical?: number;
  descuentoCajaCompensacion?: number;
  /** Si es true, `sueldoBruto` se interpreta como líquido objetivo y se busca el bruto que lo produce. */
  calculoInverso?: boolean;
}

export interface SueldoLiquidoResult {
  bruto: number;
  liquido: number;
  /** Líquido / Bruto × 100. */
  factorConversion: number;
  ingresosAdicionales: {
    bonoMovilizacion: number;
    bonoColacion: number;
    bonoPerdidaCaja: number;
    comisiones: number;
    asignacionFamiliar: number;
  };
  descuentos: {
    afp: number;
    salud: number;
    seguroCesantia: number;
    impuesto: number;
    prestamoEmpleador: number;
    descuentoSindical: number;
    descuentoCajaCompensacion: number;
  };
  /** Aporte del empleador (no se descuenta del trabajador). Se muestra para referencia del costo total. */
  aportesEmpleador: {
    sis: number;
    seguroCesantia: number;
    mutual: number;
    total: number;
  };
  totalIngresos: number;
  totalDescuentos: number;
  totalIngresosImponibles: number;
}

const topeCLP = (topeUF: number, valorUF: number) => topeUF * valorUF;

function calcularAFP(imponible: number, afpKey: keyof typeof AFP, valorUF: number) {
  const cfg = AFP[afpKey];
  if (!cfg) return 0;
  const tope = topeCLP(TOPE_IMPOSITIVO.afp_salud, valorUF);
  // 10% obligatorio + comisión variable de la AFP. SIS NO se descuenta al
  // trabajador desde Ley 20.255 (2009): lo paga 100% el empleador.
  const tasa = (10 + cfg.comision) / 100;
  return Math.min(imponible, tope) * tasa;
}

function calcularSalud(
  imponible: number,
  saludTipo: 'fonasa' | 'isapre',
  saludTramo: 'A' | 'B' | 'C' | 'D',
  isapreMontoUF: number,
  valorUF: number,
) {
  const tope = topeCLP(TOPE_IMPOSITIVO.afp_salud, valorUF);
  const base = Math.min(imponible, tope);

  if (saludTipo === 'fonasa') {
    // FONASA: 7% único (los tramos A/B/C/D del SIS antiguo no aplican como
    // descuento al trabajador). Mantenemos el parámetro por compatibilidad.
    void saludTramo;
    return base * (SALUD.fonasa.tasa / 100);
  }
  // Isapre: 7% del imponible o el plan, lo que sea mayor.
  const minimo = base * 0.07;
  const planCLP = (isapreMontoUF || 0) * valorUF;
  return Math.max(minimo, planCLP);
}

function calcularSeguroCesantiaTrabajador(
  imponible: number,
  contratoIndefinido: boolean,
  valorUF: number,
) {
  if (!contratoIndefinido) return 0; // Plazo fijo: el trabajador no aporta.
  const tope = topeCLP(TOPE_IMPOSITIVO.seguro_cesantia, valorUF);
  return Math.min(imponible, tope) * (SEGURO_CESANTIA.contrato_indefinido.trabajador / 100);
}

function calcularImpuestoSegundaCategoria(baseTributable: number, valorUTM: number) {
  if (baseTributable <= 0) return 0;
  const baseUTM = baseTributable / valorUTM;
  for (const tramo of IMPUESTO_SEGUNDA_CATEGORIA.tramos) {
    if (baseUTM > tramo.desde && baseUTM <= tramo.hasta) {
      const impuestoUTM = baseUTM * tramo.factor - tramo.rebaja;
      return Math.max(0, impuestoUTM * valorUTM);
    }
  }
  return 0;
}

export function calculateSueldoLiquido(input: SueldoLiquidoInput): SueldoLiquidoResult {
  if (input.calculoInverso) {
    const { calculoInverso: _ci, sueldoBruto: _sb, ...rest } = input;
    void _ci;
    return calculateSueldoBrutoFromLiquido(input.sueldoBruto, rest);
  }

  const {
    sueldoBruto,
    afp,
    saludTipo,
    saludTramo = 'A',
    isapreMonto = 0,
    contratoIndefinido = true,
    bonoMovilizacion = 0,
    bonoColacion = 0,
    bonoPerdidaCaja = 0,
    comisiones = 0,
    asignacionFamiliar = 0,
    prestamoEmpleador = 0,
    descuentoSindical = 0,
    descuentoCajaCompensacion = 0,
  } = input;

  const valorUF = UF.valor;
  const valorUTM = UTM.valor;

  const totalIngresosImponibles = sueldoBruto + comisiones;
  const totalIngresosNoImponibles = bonoMovilizacion + bonoColacion + bonoPerdidaCaja;
  const totalIngresos = totalIngresosImponibles + totalIngresosNoImponibles + asignacionFamiliar;

  const descAFP = calcularAFP(totalIngresosImponibles, afp, valorUF);
  const descSalud = calcularSalud(
    totalIngresosImponibles,
    saludTipo,
    saludTramo,
    isapreMonto,
    valorUF,
  );
  const descCesantia = calcularSeguroCesantiaTrabajador(
    totalIngresosImponibles,
    contratoIndefinido,
    valorUF,
  );

  // Base tributable: sueldo imponible menos cotizaciones obligatorias.
  const baseTributable = totalIngresosImponibles - descAFP - descSalud - descCesantia;
  const impuesto = calcularImpuestoSegundaCategoria(baseTributable, valorUTM);

  const totalDescuentos =
    descAFP +
    descSalud +
    descCesantia +
    impuesto +
    prestamoEmpleador +
    descuentoSindical +
    descuentoCajaCompensacion;

  const liquido = totalIngresos - totalDescuentos;
  const factorConversion = sueldoBruto > 0 ? (liquido / sueldoBruto) * 100 : 0;

  // Aportes del empleador (se reportan para mostrar costo total, NO descuentos al trabajador).
  const tope = topeCLP(TOPE_IMPOSITIVO.afp_salud, valorUF);
  const baseEmpleador = Math.min(totalIngresosImponibles, tope);
  const sisEmpleador = baseEmpleador * (AFP[afp].sis / 100);
  const cesantiaEmpleador =
    Math.min(totalIngresosImponibles, topeCLP(TOPE_IMPOSITIVO.seguro_cesantia, valorUF)) *
    ((contratoIndefinido
      ? SEGURO_CESANTIA.contrato_indefinido.empleador
      : SEGURO_CESANTIA.contrato_plazo_fijo.empleador) /
      100);
  const mutualEmpleador = baseEmpleador * (MUTUAL.total_referencial / 100);

  return {
    bruto: sueldoBruto,
    liquido: Math.round(liquido),
    factorConversion: Math.round(factorConversion * 100) / 100,
    ingresosAdicionales: {
      bonoMovilizacion,
      bonoColacion,
      bonoPerdidaCaja,
      comisiones,
      asignacionFamiliar,
    },
    descuentos: {
      afp: Math.round(descAFP),
      salud: Math.round(descSalud),
      seguroCesantia: Math.round(descCesantia),
      impuesto: Math.round(impuesto),
      prestamoEmpleador,
      descuentoSindical,
      descuentoCajaCompensacion,
    },
    aportesEmpleador: {
      sis: Math.round(sisEmpleador),
      seguroCesantia: Math.round(cesantiaEmpleador),
      mutual: Math.round(mutualEmpleador),
      total: Math.round(sisEmpleador + cesantiaEmpleador + mutualEmpleador),
    },
    totalIngresos,
    totalDescuentos: Math.round(totalDescuentos),
    totalIngresosImponibles,
  };
}

export function sueldoLiquidoToResults(result: SueldoLiquidoResult): CalculatorResult[] {
  const r: CalculatorResult[] = [
    { label: 'Sueldo Líquido', value: result.liquido, format: 'CLP', highlight: true },
    { label: 'Sueldo Bruto', value: result.bruto, format: 'CLP' },
    { label: 'Total Descuentos', value: result.totalDescuentos, format: 'CLP' },
    { label: 'Factor de conversión', value: result.factorConversion, format: 'percentage' },

    { label: 'AFP (10% + comisión)', value: result.descuentos.afp, format: 'CLP' },
    { label: 'Salud (7%)', value: result.descuentos.salud, format: 'CLP' },
    { label: 'Seguro Cesantía (0,6%)', value: result.descuentos.seguroCesantia, format: 'CLP' },
    { label: 'Impuesto 2ª Categoría', value: result.descuentos.impuesto, format: 'CLP' },
  ];

  if (result.descuentos.prestamoEmpleador > 0) {
    r.push({ label: 'Préstamo empleador', value: result.descuentos.prestamoEmpleador, format: 'CLP' });
  }
  if (result.descuentos.descuentoSindical > 0) {
    r.push({ label: 'Descuento sindical', value: result.descuentos.descuentoSindical, format: 'CLP' });
  }
  if (result.descuentos.descuentoCajaCompensacion > 0) {
    r.push({
      label: 'Descuento caja compensación',
      value: result.descuentos.descuentoCajaCompensacion,
      format: 'CLP',
    });
  }

  // Ingresos adicionales (sólo si el usuario los puso)
  const ia = result.ingresosAdicionales;
  if (ia.bonoMovilizacion > 0)
    r.push({ label: 'Bono movilización', value: ia.bonoMovilizacion, format: 'CLP' });
  if (ia.bonoColacion > 0) r.push({ label: 'Bono colación', value: ia.bonoColacion, format: 'CLP' });
  if (ia.bonoPerdidaCaja > 0)
    r.push({ label: 'Bono pérdida de caja', value: ia.bonoPerdidaCaja, format: 'CLP' });
  if (ia.comisiones > 0) r.push({ label: 'Comisiones', value: ia.comisiones, format: 'CLP' });
  if (ia.asignacionFamiliar > 0)
    r.push({ label: 'Asignación familiar', value: ia.asignacionFamiliar, format: 'CLP' });

  // Aportes del empleador (informativo)
  r.push({
    label: 'Costo total empleador (sueldo bruto + aportes)',
    value: result.bruto + result.aportesEmpleador.total,
    format: 'CLP',
  });
  r.push({ label: 'SIS (paga empleador, no descuenta al trabajador)', value: result.aportesEmpleador.sis, format: 'CLP' });
  r.push({ label: 'Seguro cesantía empleador', value: result.aportesEmpleador.seguroCesantia, format: 'CLP' });
  r.push({ label: 'Mutual de seguridad (empleador)', value: result.aportesEmpleador.mutual, format: 'CLP' });

  return r;
}

/**
 * Cálculo inverso: dado un líquido objetivo, encuentra el bruto que lo produce.
 * Usa búsqueda binaria: estable y converge en ≤ 25 iteraciones.
 */
export function calculateSueldoBrutoFromLiquido(
  liquidoObjetivo: number,
  inputParcial: Omit<SueldoLiquidoInput, 'sueldoBruto' | 'calculoInverso'>,
  precision: number = 100, // tolerancia en CLP
): SueldoLiquidoResult {
  let lo = liquidoObjetivo;
  let hi = liquidoObjetivo * 2; // techo amplio: con descuentos máximos no superan ~50%
  let result = calculateSueldoLiquido({ ...inputParcial, sueldoBruto: hi });

  // Asegurar que el techo es lo bastante alto.
  for (let i = 0; i < 5 && result.liquido < liquidoObjetivo; i++) {
    hi *= 1.5;
    result = calculateSueldoLiquido({ ...inputParcial, sueldoBruto: hi });
  }

  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    result = calculateSueldoLiquido({ ...inputParcial, sueldoBruto: mid });
    const diff = result.liquido - liquidoObjetivo;
    if (Math.abs(diff) <= precision) return result;
    if (diff > 0) hi = mid;
    else lo = mid;
  }
  return result;
}
