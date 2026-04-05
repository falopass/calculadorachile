// ============================================
// Cálculo de Sueldo Líquido Chile 2026
// ============================================

import { AFP, SALUD, SEGURO_CESANTIA, TOPE_IMPOSITIVO, IMPUESTO_SEGUNDA_CATEGORIA, UTM, UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface SueldoLiquidoInput {
  sueldoBruto: number;
  afp: keyof typeof AFP;
  saludTipo: 'fonasa' | 'isapre';
  saludTramo?: 'A' | 'B' | 'C' | 'D';
  isapreMonto?: number; // Monto adicional de isapre en UF
  contratoIndefinido?: boolean;
  bonoMovilizacion?: number;
  bonoColacion?: number;
  bonoPerdidaCaja?: number;
  comisiones?: number;
  asignacionFamiliar?: number;
  prestamoEmpleador?: number;
  descuentoSindical?: number;
  descuentoCajaCompensacion?: number;
  tipoCalculo?: 'mensual' | 'quincenal' | 'semanal' | 'diario';
  calculoInverso?: boolean; // de líquido a bruto
  mostrarComparacionAFP?: boolean;
}

export interface SueldoLiquidoResult {
  bruto: number;
  liquido: number;
  factorConversion: number; // Factor de conversión bruto→líquido en porcentaje
  ingresosAdicionales: {
    bonoMovilizacion: number;
    bonoColacion: number;
    bonoPerdidaCaja: number;
    comisiones: number;
    asignacionFamiliar: number;
  };
  descuentos: {
    afp: number;
    sis: number;
    salud: number;
    seguroCesantia: number;
    impuesto: number;
    prestamoEmpleador: number;
    descuentoSindical: number;
    descuentoCajaCompensacion: number;
  };
  totalIngresos: number;
  totalDescuentos: number;
  totalIngresosImponibles: number;
}

/**
 * Calcula el tope imponible en CLP
 */
function calcularTopeImponible(topeUF: number, valorUF: number): number {
  return topeUF * valorUF;
}

/**
 * Calcula la cotización AFP
 */
function calcularAFP(imponible: number, afpKey: keyof typeof AFP, valorUF: number): number {
  const afpData = AFP[afpKey];
  if (!afpData) return 0;
  
  const tope = calcularTopeImponible(TOPE_IMPOSITIVO.afp_salud, valorUF);
  const imponibleTopeado = Math.min(imponible, tope);
  
  return imponibleTopeado * (afpData.comision / 100);
}

/**
 * Calcula el SIS (Seguro de Invalidez y Sobrevivencia)
 */
function calcularSIS(imponible: number, afpKey: keyof typeof AFP, valorUF: number): number {
  const afpData = AFP[afpKey];
  if (!afpData) return 0;
  
  const tope = calcularTopeImponible(TOPE_IMPOSITIVO.afp_salud, valorUF);
  const imponibleTopeado = Math.min(imponible, tope);
  
  return imponibleTopeado * (afpData.sis / 100);
}

/**
 * Calcula la cotización de salud (FONASA o Isapre)
 */
function calcularSalud(
  imponible: number,
  saludTipo: 'fonasa' | 'isapre',
  saludTramo: 'A' | 'B' | 'C' | 'D',
  isapreMonto: number,
  valorUF: number
): number {
  const tope = calcularTopeImponible(TOPE_IMPOSITIVO.afp_salud, valorUF);
  const imponibleTopeado = Math.min(imponible, tope);
  
  if (saludTipo === 'fonasa') {
    // FONASA: 7% base + cotización adicional según tramo
    const tasaBase = SALUD.fonasa.tasa / 100;
    const tramoData = SALUD.fonasa.tramos[saludTramo.toLowerCase() as keyof typeof SALUD.fonasa.tramos];
    const tasaAdicional = tramoData?.cotizacion || 0;
    
    return imponibleTopeado * (tasaBase + tasaAdicional);
  } else {
    // Isapre: mínimo 7% o el monto del plan en UF
    const minimo7porciento = imponibleTopeado * 0.07;
    const montoPlanUF = isapreMonto || 0;
    const montoPlanCLP = montoPlanUF * valorUF;
    
    return Math.max(minimo7porciento, montoPlanCLP);
  }
}

/**
 * Calcula el seguro de cesantía (S AFC)
 */
function calcularSeguroCesantia(
  imponible: number,
  contratoIndefinido: boolean,
  valorUF: number
): number {
  const tope = calcularTopeImponible(TOPE_IMPOSITIVO.seguro_cesantia, valorUF);
  const imponibleTopeado = Math.min(imponible, tope);
  
  if (contratoIndefinido) {
    return imponibleTopeado * (SEGURO_CESANTIA.contrato_indefinido.trabajador / 100);
  }
  // Contrato a plazo fijo: el trabajador no aporta
  return 0;
}

/**
 * Calcula el impuesto de segunda categoría
 */
function calcularImpuestoSegundaCategoria(
  imponible: number,
  valorUTM: number
): number {
  // Convertir imponible a UTM para aplicar tramos
  const imponibleUTM = imponible / valorUTM;
  
  for (const tramo of IMPUESTO_SEGUNDA_CATEGORIA.tramos) {
    if (imponibleUTM > tramo.desde && imponibleUTM <= tramo.hasta) {
      const exentoUTM = tramo.exento;
      const factor = tramo.factor;
      const rebaja = tramo.rebaja;
      
      // (Renta exenta en UTM * factor) - rebaja en UTM
      const impuestoUTM = ((imponibleUTM - exentoUTM) * factor) - rebaja;
      
      // Convertir de vuelta a CLP
      return Math.max(0, impuestoUTM * valorUTM);
    }
  }
  
  return 0;
}

/**
 * Calcula el sueldo líquido completo
 */
export function calculateSueldoLiquido(input: SueldoLiquidoInput): SueldoLiquidoResult {
  // Si se solicita cálculo inverso, usar la función específica
  if (input.calculoInverso) {
    // En cálculo inverso, el sueldoBruto en realidad es el líquido objetivo
    return calculateSueldoBrutoFromLiquido(
      input.sueldoBruto, // Este valor es el líquido objetivo en cálculo inverso
      {
        afp: input.afp,
        saludTipo: input.saludTipo,
        saludTramo: input.saludTramo,
        isapreMonto: input.isapreMonto,
        contratoIndefinido: input.contratoIndefinido,
        bonoMovilizacion: input.bonoMovilizacion,
        bonoColacion: input.bonoColacion,
        bonoPerdidaCaja: input.bonoPerdidaCaja,
        comisiones: input.comisiones,
        asignacionFamiliar: input.asignacionFamiliar,
        prestamoEmpleador: input.prestamoEmpleador,
        descuentoSindical: input.descuentoSindical,
        descuentoCajaCompensacion: input.descuentoCajaCompensacion,
        tipoCalculo: input.tipoCalculo,
        calculoInverso: false, // Evitar recursión infinita
        mostrarComparacionAFP: input.mostrarComparacionAFP
      }
    );
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
  
  // Valor UF desde constantes centralizadas
  const valorUF = UF.valor;
  const valorUTM = UTM.valor;
  
  // Calcular ingresos adicionales
  const totalIngresosImponibles = sueldoBruto + comisiones;
  const totalIngresosNoImponibles = bonoMovilizacion + bonoColacion + bonoPerdidaCaja;
  const totalIngresos = totalIngresosImponibles + totalIngresosNoImponibles + asignacionFamiliar;
  
  // Calcular cada descuento
  const descuentoAFP = calcularAFP(totalIngresosImponibles, afp, valorUF);
  const descuentoSIS = calcularSIS(totalIngresosImponibles, afp, valorUF);
  const descuentoSalud = calcularSalud(totalIngresosImponibles, saludTipo, saludTramo, isapreMonto, valorUF);
  const descuentoSeguroCesantia = calcularSeguroCesantia(totalIngresosImponibles, contratoIndefinido, valorUF);
  
  // Base tributable para impuesto (sueldo - cotizaciones obligatorias)
  const baseTributable = totalIngresosImponibles - descuentoAFP - descuentoSalud - descuentoSeguroCesantia;
  const impuesto = calcularImpuestoSegundaCategoria(baseTributable, valorUTM);
  
  // Total descuentos
  const totalDescuentos = descuentoAFP + descuentoSIS + descuentoSalud + descuentoSeguroCesantia + impuesto + prestamoEmpleador + descuentoSindical + descuentoCajaCompensacion;
  
  // Sueldo líquido
  const liquido = totalIngresos - totalDescuentos;
  
  // Factor de conversión bruto→líquido
  const factorConversion = (liquido / sueldoBruto) * 100;
  
  return {
    bruto: sueldoBruto,
    liquido: Math.round(liquido),
    factorConversion: Math.round(factorConversion * 100) / 100, // Dos decimales
    ingresosAdicionales: {
      bonoMovilizacion,
      bonoColacion,
      bonoPerdidaCaja,
      comisiones,
      asignacionFamiliar,
    },
    descuentos: {
      afp: Math.round(descuentoAFP),
      sis: Math.round(descuentoSIS),
      salud: Math.round(descuentoSalud),
      seguroCesantia: Math.round(descuentoSeguroCesantia),
      impuesto: Math.round(impuesto),
      prestamoEmpleador,
      descuentoSindical,
      descuentoCajaCompensacion,
    },
    totalIngresos,
    totalDescuentos: Math.round(totalDescuentos),
    totalIngresosImponibles,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function sueldoLiquidoToResults(result: SueldoLiquidoResult): CalculatorResult[] {
  const results: CalculatorResult[] = [
    { label: 'Sueldo Líquido', value: result.liquido, format: 'CLP', highlight: true },
    { label: 'Sueldo Bruto', value: result.bruto, format: 'CLP' },
    { label: 'Total Ingresos', value: result.totalIngresos, format: 'CLP' },
    { label: 'Total Ingresos Imponibles', value: result.totalIngresosImponibles, format: 'CLP' },
    { label: 'Total Descuentos', value: result.totalDescuentos, format: 'CLP' },
    { label: 'Factor de Conversión', value: result.factorConversion, format: 'percentage', highlight: true },
  ];

  // Ingresos adicionales
  if (result.ingresosAdicionales.bonoMovilizacion > 0) {
    results.push({ label: 'Bono Movilización', value: result.ingresosAdicionales.bonoMovilizacion, format: 'CLP' });
  }
  if (result.ingresosAdicionales.bonoColacion > 0) {
    results.push({ label: 'Bono Colación', value: result.ingresosAdicionales.bonoColacion, format: 'CLP' });
  }
  if (result.ingresosAdicionales.bonoPerdidaCaja > 0) {
    results.push({ label: 'Bono Pérdida de Caja', value: result.ingresosAdicionales.bonoPerdidaCaja, format: 'CLP' });
  }
  if (result.ingresosAdicionales.comisiones > 0) {
    results.push({ label: 'Comisiones', value: result.ingresosAdicionales.comisiones, format: 'CLP' });
  }
  if (result.ingresosAdicionales.asignacionFamiliar > 0) {
    results.push({ label: 'Asignación Familiar', value: result.ingresosAdicionales.asignacionFamiliar, format: 'CLP' });
  }

  // Descuentos
  results.push({ label: 'Descuento AFP', value: result.descuentos.afp, format: 'CLP' });
  results.push({ label: 'Seguro Invalidez (SIS)', value: result.descuentos.sis, format: 'CLP' });
  results.push({ label: 'Descuento Salud', value: result.descuentos.salud, format: 'CLP' });
  results.push({ label: 'Seguro Cesantía', value: result.descuentos.seguroCesantia, format: 'CLP' });
  results.push({ label: 'Impuesto 2ª Categoría', value: result.descuentos.impuesto, format: 'CLP' });
  
  if (result.descuentos.prestamoEmpleador > 0) {
    results.push({ label: 'Préstamo con Empleador', value: result.descuentos.prestamoEmpleador, format: 'CLP' });
  }
  if (result.descuentos.descuentoSindical > 0) {
    results.push({ label: 'Descuento Sindical', value: result.descuentos.descuentoSindical, format: 'CLP' });
  }
  if (result.descuentos.descuentoCajaCompensacion > 0) {
    results.push({ label: 'Descuento Caja Compensación', value: result.descuentos.descuentoCajaCompensacion, format: 'CLP' });
  }

  return results;
}

/**
 * Calcula el sueldo bruto a partir del sueldo líquido objetivo
 * Utiliza un algoritmo iterativo para encontrar el valor aproximado
 */
export function calculateSueldoBrutoFromLiquido(
  liquidoObjetivo: number,
  inputParcial: Omit<SueldoLiquidoInput, 'sueldoBruto'>,
  precision: number = 1000
): SueldoLiquidoResult {
  // Valores fijos que no dependen del sueldo bruto
  const {
    afp, saludTipo, saludTramo = 'A', isapreMonto = 0, contratoIndefinido = true,
    bonoMovilizacion = 0, bonoColacion = 0, bonoPerdidaCaja = 0,
    comisiones = 0, asignacionFamiliar = 0, prestamoEmpleador = 0,
    descuentoSindical = 0, descuentoCajaCompensacion = 0
  } = inputParcial;

  // Estimación inicial del sueldo bruto (método de aproximación)
  // Aproximadamente 20% de descuentos para un sueldo típico
  let sueldoBrutoEstimado = liquidoObjetivo * 1.25; // Ajuste inicial más conservador
  
  let iteraciones = 0;
  const maxIteraciones = 100;
  
  while (iteraciones < maxIteraciones) {
    // Crear input con el sueldo bruto estimado
    const inputTemp: SueldoLiquidoInput = {
      sueldoBruto: sueldoBrutoEstimado,
      afp, saludTipo, saludTramo, isapreMonto, contratoIndefinido,
      bonoMovilizacion, bonoColacion, bonoPerdidaCaja,
      comisiones, asignacionFamiliar, prestamoEmpleador,
      descuentoSindical, descuentoCajaCompensacion
    };
    
    // Calcular el sueldo líquido con este sueldo bruto estimado
    const resultado = calculateSueldoLiquido(inputTemp);
    
    // Verificar si estamos cerca del objetivo
    const diferencia = resultado.liquido - liquidoObjetivo;
    
    if (Math.abs(diferencia) <= precision) {
      // Ajustar el sueldo bruto para que el líquido sea exactamente el objetivo
      const ajuste = diferencia / (resultado.bruto / resultado.liquido || 0.8); // Factor de ajuste basado en la proporción
      const sueldoBrutoAjustado = sueldoBrutoEstimado - ajuste;
      
      // Recalcular con el valor ajustado
      const inputAjustado: SueldoLiquidoInput = {
        ...inputParcial,
        sueldoBruto: sueldoBrutoAjustado
      };
      
      return calculateSueldoLiquido(inputAjustado);
    }
    
    // Ajustar el sueldo bruto para acercarnos al objetivo
    // Usar la proporción de diferencia para hacer un ajuste más inteligente
    const proporcion = resultado.bruto / (resultado.liquido || 1);
    const ajuste = diferencia * proporcion;
    sueldoBrutoEstimado -= ajuste;
    
    // Limitar el ajuste para evitar oscilaciones
    if (Math.abs(ajuste) < precision) {
      sueldoBrutoEstimado -= Math.sign(diferencia) * precision;
    }
    
    iteraciones++;
  }
  
  // Si no converge, devolver el último cálculo
  const inputFinal: SueldoLiquidoInput = {
    ...inputParcial,
    sueldoBruto: sueldoBrutoEstimado
  };
  
  return calculateSueldoLiquido(inputFinal);
}
