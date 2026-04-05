// ============================================
// Cálculo de Conversión UF ↔ CLP
// ============================================

import { UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface UFCLPInput {
  monto: number;
  direccion: 'uf-a-clp' | 'clp-a-uf';
  fechaDesde?: string; // Fecha para histórico
  fechaHasta?: string; // Fecha para histórico
  montoHistorico?: number; // Monto para reajuste entre fechas
  mostrarHistorico?: boolean; // Mostrar valores históricos
  mostrarProyeccion?: boolean; // Mostrar proyección
  mostrarGrafico?: boolean; // Mostrar gráfico de evolución
}

export interface UFCLPResult {
  montoOriginal: number;
  montoConvertido: number;
  valorUF: number;
  direccion: 'uf-a-clp' | 'clp-a-uf';
  variacionHistorica?: Array<{
    fecha: string;
    valor: number;
  }>;
  proyeccion?: {
    proximoDia: number;
    proximoMes: number;
  };
  reajusteEntreFechas?: {
    fechaInicio: string;
    fechaFin: string;
    valorInicio: number;
    valorFin: number;
    variacion: number;
    montoReajustado: number;
  };
}

/**
 * Convierte entre UF y CLP
 */
export function calculateUFCLP(input: UFCLPInput): UFCLPResult {
  const {
    monto,
    direccion,
    fechaDesde,
    fechaHasta,
    montoHistorico,
    mostrarHistorico = false,
    mostrarProyeccion = false,
    mostrarGrafico = false
  } = input;
  
  const valorUF = UF.valor;
  
  let montoConvertido: number;
  
  if (direccion === 'uf-a-clp') {
    // UF a CLP: multiplicar
    montoConvertido = monto * valorUF;
  } else {
    // CLP a UF: dividir
    montoConvertido = monto / valorUF;
  }
  
  // Simular datos históricos si se solicita
  let variacionHistorica = undefined;
  if (mostrarHistorico) {
    // Simulación de valores históricos (últimos 30 días)
    variacionHistorica = [];
    const fechaActual = new Date();
    for (let i = 30; i >= 0; i--) {
      const fecha = new Date(fechaActual);
      fecha.setDate(fecha.getDate() - i);
      const valor = valorUF * (0.995 + Math.random() * 0.01); // Simulación de variación
      variacionHistorica.push({
        fecha: fecha.toLocaleDateString('es-CL'),
        valor: Math.round(valor * 100) / 100
      });
    }
  }
  
  // Simular proyección si se solicita
  let proyeccion = undefined;
  if (mostrarProyeccion) {
    // Proyección simple basada en tendencia reciente
    const proximoDia = valorUF * 1.001; // Aumento pequeño para el día siguiente
    const proximoMes = valorUF * 1.005; // Aumento moderado para el próximo mes
    proyeccion = {
      proximoDia: Math.round(proximoDia * 100) / 100,
      proximoMes: Math.round(proximoMes * 100) / 100
    };
  }
  
  // Calcular reajuste entre fechas si se proporcionan
  let reajusteEntreFechas = undefined;
  if (fechaDesde && fechaHasta && montoHistorico !== undefined) {
    // Simulación de reajuste entre fechas
    const valorInicio = valorUF * 0.99; // Valor en fecha inicio
    const valorFin = valorUF; // Valor en fecha fin
    const variacion = ((valorFin - valorInicio) / valorInicio) * 100;
    const montoReajustado = montoHistorico * (valorFin / valorInicio);
    
    reajusteEntreFechas = {
      fechaInicio: fechaDesde,
      fechaFin: fechaHasta,
      valorInicio: Math.round(valorInicio * 100) / 100,
      valorFin: Math.round(valorFin * 100) / 100,
      variacion: Math.round(variacion * 100) / 100,
      montoReajustado: Math.round(montoReajustado)
    };
  }
  
  return {
    montoOriginal: monto,
    montoConvertido,
    valorUF,
    direccion,
    variacionHistorica,
    proyeccion,
    reajusteEntreFechas
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function ufclpToResults(result: UFCLPResult): CalculatorResult[] {
  const results: CalculatorResult[] = [];
  
  if (result.direccion === 'uf-a-clp') {
    results.push({
      label: 'Monto en CLP',
      value: Math.round(result.montoConvertido),
      format: 'CLP',
      highlight: true,
    });
    results.push({
      label: 'Monto en UF',
      value: result.montoOriginal,
      format: 'UF',
    });
  } else {
    results.push({
      label: 'Monto en UF',
      value: Math.round(result.montoConvertido * 100) / 100,
      format: 'UF',
      highlight: true,
    });
    results.push({
      label: 'Monto en CLP',
      value: result.montoOriginal,
      format: 'CLP',
    });
  }
  
  results.push({
    label: 'Valor UF',
    value: result.valorUF,
    format: 'CLP',
  });
  
  // Incluir proyección si aplica
  if (result.proyeccion) {
    results.push({
      label: 'Proyección UF Próximo Día',
      value: result.proyeccion.proximoDia,
      format: 'CLP',
    });
    
    results.push({
      label: 'Proyección UF Próximo Mes',
      value: result.proyeccion.proximoMes,
      format: 'CLP',
    });
  }
  
  // Incluir reajuste entre fechas si aplica
  if (result.reajusteEntreFechas) {
    results.push({
      label: `Reajuste ${result.reajusteEntreFechas.fechaInicio} a ${result.reajusteEntreFechas.fechaFin}`,
      value: result.reajusteEntreFechas.variacion,
      format: 'percentage',
    });
    
    results.push({
      label: 'Valor UF Inicio',
      value: result.reajusteEntreFechas.valorInicio,
      format: 'CLP',
    });
    
    results.push({
      label: 'Valor UF Fin',
      value: result.reajusteEntreFechas.valorFin,
      format: 'CLP',
    });
    
    results.push({
      label: 'Monto Reajustado',
      value: result.reajusteEntreFechas.montoReajustado,
      format: 'CLP',
    });
  }
  
  return results;
}
