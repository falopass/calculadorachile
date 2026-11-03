// ============================================
// Cálculo de Indemnización por Años de Servicio Chile
// (art. 163, sustitutiva del aviso previo art. 161-162, recargos art. 168 y 171)
// ============================================

import { INDEMNIZACION, RECARGO_ART_168, RECARGO_ART_171, UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';
import { añosArt163SinTope, calcularAñosIndemnizacion } from './finiquito';

/**
 * Causal de término que declara la persona.
 * - art161: necesidades de la empresa o desahucio (da derecho a indemnización por ley).
 * - art159: vencimiento del plazo, conclusión de la obra, mutuo acuerdo, renuncia, etc.
 * - art160: causales disciplinarias (falta de probidad, abandono, incumplimiento grave, etc.).
 * - art171: autodespido o despido indirecto (requiere demanda y sentencia favorable).
 */
export type CausalIndemnizacion = 'art161' | 'art159' | 'art160' | 'art171';

export type RecargoIndemnizacion = 0 | 30 | 50 | 80 | 100;

export interface IndemnizacionInput {
  ultimoSueldo: number;
  añosTrabajados: number;
  /** Meses adicionales al último año completo (0 a 11). */
  mesesTrabajados?: number;
  incluyeGratificacion: boolean;
  gratificacionMensual?: number;
  /**
   * Otros pagos mensuales que entran en la base del art. 172: colación,
   * movilización, comisiones, bonos mensuales, semana corrida (DT 60585).
   */
  otrasRemuneracionesMensuales?: number;
  /** Causal de término. Por defecto 'art161' (comportamiento histórico). */
  causal?: CausalIndemnizacion;
  /**
   * true si el empleador avisó por escrito con 30 días o más (solo art. 161).
   * Por defecto true: no se suma la sustitutiva.
   */
  avisoPrevio30Dias?: boolean;
  /**
   * Simula que un juez declara el despido injustificado, indebido o
   * improcedente (art. 168), o acoge el autodespido (art. 171).
   */
  simularSentencia?: boolean;
  /** Recargo pedido. Se valida contra los permitidos para la causal. */
  recargoPct?: RecargoIndemnizacion;
  /** UF en vivo (UI). Default: snapshot `UF.valor`. */
  valorUF?: number;
}

export interface IndemnizacionResult {
  ultimoSueldo: number;
  baseCalculo: number;
  añosTrabajados: number;
  añosIndemnizables: number;
  diasIndemnizacion: number;
  valorDia: number;
  /** Indemnización por años de servicio (art. 163), sin recargo. */
  indemnizacionTotal: number;
  /** Indemnización sustitutiva del aviso previo (art. 161 inc. 2 / 162 inc. 4). */
  indemnizacionAvisoPrevio: number;
  /** Recargo sobre la indemnización por años (art. 168 o 171). */
  recargoMonto: number;
  recargoPct: RecargoIndemnizacion;
  /** Suma de años + sustitutiva + recargo. */
  totalAPagar: number;
  causal: CausalIndemnizacion;
  /** false si con la causal y sin sentencia no corresponde indemnización legal. */
  correspondePorLey: boolean;
  /** true si el monto depende de una sentencia (recargo, 159/160 o 171). */
  requiereSentencia: boolean;
  topeDias: number;
  topeUF: number;
  topeMonto: number;
  aplicaTope: boolean;
}

/** Recargos que la ley permite para cada causal (art. 168 y 171). */
export const RECARGOS_PERMITIDOS: Record<CausalIndemnizacion, RecargoIndemnizacion[]> = {
  art161: [RECARGO_ART_168.necesidades_empresa as RecargoIndemnizacion],
  art159: [RECARGO_ART_168.causal_no_demostrada as RecargoIndemnizacion],
  art160: [
    RECARGO_ART_168.falta_probidad as RecargoIndemnizacion,
    RECARGO_ART_168.aplicacion_indebida as RecargoIndemnizacion,
  ],
  art171: [
    RECARGO_ART_171.incumplimiento_grave as RecargoIndemnizacion,
    RECARGO_ART_171.conducta_grave_o_seguridad as RecargoIndemnizacion,
  ],
};

/** Devuelve el recargo pedido si es válido para la causal; si no, el menor permitido. */
export function recargoValido(
  causal: CausalIndemnizacion,
  pct: number | undefined,
): RecargoIndemnizacion {
  const permitidos = RECARGOS_PERMITIDOS[causal];
  return permitidos.includes(pct as RecargoIndemnizacion) ? (pct as RecargoIndemnizacion) : permitidos[0];
}

/**
 * Calcula la indemnización por años de servicio (art. 163 CdT), la
 * sustitutiva del aviso previo y los recargos del art. 168 / 171.
 *
 * - 30 días de la última remuneración mensual por año y fracción > 6 meses,
 *   con 1 año mínimo y tope de 330 días (DT: dt.gob.cl/portal/1628/w3-article-60593.html).
 * - Base topeada en 90 UF (art. 172), también para la sustitutiva
 *   (DT: dt.gob.cl/portal/1628/w3-article-60604.html).
 * - Art. 159/160: por ley no hay indemnización; solo si un juez declara el
 *   despido injustificado/indebido (art. 168), con sustitutiva + años + recargo.
 * - Art. 171: con sentencia favorable, sustitutiva + años + 50% u 80%
 *   (DT: dt.gob.cl/portal/1628/w3-article-60579.html).
 */
export function calculateIndemnizacion(input: IndemnizacionInput): IndemnizacionResult {
  const {
    ultimoSueldo,
    añosTrabajados,
    mesesTrabajados = 0,
    incluyeGratificacion,
    gratificacionMensual = 0,
    otrasRemuneracionesMensuales = 0,
    causal = 'art161',
    avisoPrevio30Dias = true,
    simularSentencia = false,
  } = input;

  const valorUF = input.valorUF ?? UF.valor;

  // Base de cálculo: sueldo + gratificación mensual + otros pagos mensuales (art. 172).
  const baseCalculo =
    Math.max(0, ultimoSueldo) +
    (incluyeGratificacion ? Math.max(0, gratificacionMensual) : 0) +
    Math.max(0, otrasRemuneracionesMensuales);

  // Tope legal de la base (art. 172).
  const topeUF = INDEMNIZACION.tope_uf_mensual;
  const topeMonto = topeUF * valorUF;
  const baseTopeada = Math.min(baseCalculo, topeMonto);

  // ¿Corresponde por ley sin juicio? Solo art. 161.
  // Art. 171 siempre requiere sentencia; art. 159/160 solo con sentencia.
  const conSentencia = causal === 'art171' ? true : simularSentencia;
  const correspondePorLey = causal === 'art161' || conSentencia;

  const añosIndemnizables = correspondePorLey
    ? calcularAñosIndemnizacion(añosTrabajados, mesesTrabajados)
    : 0;
  const diasIndemnizacion = añosIndemnizables * INDEMNIZACION.dias_por_año;
  const topeDias = INDEMNIZACION.tope_años * INDEMNIZACION.dias_por_año;
  const valorDia = baseTopeada / 30;
  const indemnizacionAnios = valorDia * diasIndemnizacion;

  // Sustitutiva del aviso previo: art. 161 sin aviso de 30 días, o cuando
  // el juez la ordena (art. 168 inc. 1 / art. 171).
  let indemnizacionAvisoPrevio = 0;
  if (causal === 'art161' && !avisoPrevio30Dias) indemnizacionAvisoPrevio = baseTopeada;
  if (causal !== 'art161' && conSentencia) indemnizacionAvisoPrevio = baseTopeada;

  // Recargo: solo con sentencia y sobre la indemnización por años.
  const recargoPct: RecargoIndemnizacion = conSentencia
    ? recargoValido(causal, input.recargoPct)
    : 0;
  const recargoMonto = indemnizacionAnios * (recargoPct / 100);

  // El total es la suma de los componentes ya redondeados, para que cuadre con el desglose.
  const totalAPagar =
    Math.round(indemnizacionAnios) + Math.round(indemnizacionAvisoPrevio) + Math.round(recargoMonto);

  const aplicaTope =
    añosArt163SinTope(añosTrabajados, mesesTrabajados) > INDEMNIZACION.tope_años ||
    baseCalculo > topeMonto;

  return {
    ultimoSueldo,
    baseCalculo: Math.round(baseCalculo),
    añosTrabajados,
    añosIndemnizables,
    diasIndemnizacion,
    valorDia: Math.round(valorDia),
    indemnizacionTotal: Math.round(indemnizacionAnios),
    indemnizacionAvisoPrevio: Math.round(indemnizacionAvisoPrevio),
    recargoMonto: Math.round(recargoMonto),
    recargoPct,
    totalAPagar,
    causal,
    correspondePorLey,
    requiereSentencia: conSentencia,
    topeDias,
    topeUF,
    topeMonto: Math.round(topeMonto),
    aplicaTope,
  };
}

const DT_DERECHO_URL = 'https://www.dt.gob.cl/portal/1628/w3-article-60593.html';
const DT_ORD_296_URL = 'https://www.dt.gob.cl/legislacion/1624/w3-article-114437.html';
const DT_TOPE_URL = 'https://www.dt.gob.cl/portal/1628/w3-article-60604.html';

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function indemnizacionToResults(result: IndemnizacionResult): CalculatorResult[] {
  if (!result.correspondePorLey) {
    return [
      {
        label: 'Indemnización por años de servicio',
        value: 0,
        format: 'CLP',
        highlight: true,
        note: {
          text: 'Con esta causal la ley no da indemnización por años de servicio, salvo que el contrato o un instrumento colectivo la pacten, o que un juez declare el despido injustificado o indebido. Marca la opción de sentencia para ver cuánto sería en ese caso.',
          source: { name: 'Dirección del Trabajo', url: DT_DERECHO_URL },
        },
      },
    ];
  }

  const rows: CalculatorResult[] = [
    {
      label: result.requiereSentencia ? 'Total si el juez te da la razón' : 'Total a recibir',
      value: result.totalAPagar,
      format: 'CLP',
      highlight: true,
      note: result.requiereSentencia
        ? {
            text: 'Estos montos solo se pagan si un juez lo ordena. El plazo para demandar es de 60 días hábiles desde la separación.',
            source: { name: 'Dirección del Trabajo, ORD. 296 (art. 168)', url: DT_ORD_296_URL },
          }
        : {
            text: `Estimación con la UF de hoy. La ley usa la UF del último día del mes anterior al pago para el tope de ${result.topeUF} UF.`,
            source: { name: 'Dirección del Trabajo', url: DT_TOPE_URL },
          },
    },
    {
      label: 'Indemnización por años de servicio',
      value: result.indemnizacionTotal,
      format: 'CLP',
    },
  ];

  if (result.indemnizacionAvisoPrevio > 0) {
    rows.push({
      label: 'Indemnización sustitutiva del aviso previo',
      value: result.indemnizacionAvisoPrevio,
      format: 'CLP',
    });
  }

  if (result.recargoMonto > 0) {
    rows.push({
      label: `Recargo (+${result.recargoPct}% sobre la indemnización por años)`,
      value: result.recargoMonto,
      format: 'CLP',
    });
  }

  rows.push(
    { label: 'Días de indemnización', value: result.diasIndemnizacion, format: 'days' },
    { label: 'Valor por día', value: result.valorDia, format: 'CLP' },
    { label: 'Años indemnizables', value: result.añosIndemnizables, format: 'number' },
    { label: 'Base de cálculo', value: result.baseCalculo, format: 'CLP' },
    { label: 'Último sueldo', value: result.ultimoSueldo, format: 'CLP' },
    { label: `Tope (${result.topeUF} UF)`, value: result.topeMonto, format: 'CLP' },
  );

  return rows;
}
