// ============================================
// Cálculo del Subsidio de Arriendo Chile 2026
// Llamado regular (Res. Ex. 809) y especial PM/PcD (Res. Ex. 808)
// ============================================

import { SUBSIDIO_ARRIENDO_DS52, UF } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface SubsidioArriendoInput {
  /** 'regular' o 'especial-pm-pcd'. */
  modalidad: string;
  /** Arriendo mensual pactado (CLP). */
  arriendoMensual: number;
  /** Comuna en Arica y Parinacota, Antofagasta, Atacama, RM, Aysén o Magallanes. */
  zonaNorteSurRM: boolean;
  /** Ingreso familiar mensual (CLP). */
  ingresoFamiliar: number;
  /** Integrantes de la familia. */
  integrantes: number;
  /** Registro Social de Hogares hasta el 70% más vulnerable. */
  rsh70: boolean;
  /** Valor UF inyectado desde la UI (default: fallback local). */
  valorUF?: number;
}

export interface SubsidioArriendoResult {
  modalidad: string;
  aplica: boolean;
  arriendoUF: number;
  subsidioMensualCLP: number;
  subsidioMensualUF: number;
  copagoMensualCLP: number;
  mesesDuracion: number;
  /** Remanente del monto total si la duración es fraccionada. */
  remanenteUF: number;
  totalUF: number;
  motivosNoAplica: string[];
  baseCalculo: string;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Estima el subsidio de arriendo según los llamados 2026.
 *
 * Regular (ficha 29888): total 170 UF repartido mensualmente con
 * tope de 4,2 UF (4,9 UF en zonas norte/sur/RM), arriendo máximo
 * 11 UF (13 UF en esas zonas), hasta 8 años. Requiere ahorro mínimo
 * 4 UF, RSH ≤ 70% e ingreso familiar entre 7 y 25 UF (+8 UF por
 * integrante sobre el tercero).
 *
 * Especial personas mayores y PcD (MINVU): total 213 UF, cubre
 * hasta el 90% del arriendo mensual, sin ahorro mínimo, ingreso
 * entre 5 y 25 UF (+8 UF por integrante sobre tres), RSH ≤ 70%.
 * Postulación del 08-09 al 08-10-2026.
 */
export function calculateSubsidioArriendo(
  input: SubsidioArriendoInput,
): SubsidioArriendoResult {
  const valorUF = input.valorUF ?? UF.valor;
  const S = SUBSIDIO_ARRIENDO_DS52;
  const esEspecial = input.modalidad === 'especial-pm-pcd';

  const arriendo = Math.max(0, input.arriendoMensual ?? 0);
  const arriendoUF = round2(arriendo / valorUF);
  const integrantes = Math.max(1, Math.round(input.integrantes ?? 1));
  const ingresoUF = round2(Math.max(0, input.ingresoFamiliar ?? 0) / valorUF);
  const rsh70 = input.rsh70 === true;

  const ingresoMinUF = esEspecial
    ? S.especial.ingresoMinUF
    : S.regular.ingresoMinUF;
  const ingresoMaxUF =
    (esEspecial ? S.especial.ingresoMaxUF : S.regular.ingresoMaxUF) +
    S.ingresoAdicionalPorIntegranteUF * Math.max(0, integrantes - 3);

  const arriendoMaxUF = esEspecial
    ? Infinity
    : input.zonaNorteSurRM
      ? S.regular.arriendoMaxZonaUF
      : S.regular.arriendoMaxUF;

  const motivosNoAplica: string[] = [];
  if (arriendo <= 0) {
    motivosNoAplica.push('Ingrese el arriendo mensual pactado.');
  } else if (arriendoUF > arriendoMaxUF) {
    motivosNoAplica.push(
      `El arriendo supera el máximo de ${arriendoMaxUF} UF para el llamado regular en esta zona.`,
    );
  }
  if (!rsh70) {
    motivosNoAplica.push(
      'Se requiere Registro Social de Hogares dentro del 70% más vulnerable.',
    );
  }
  if (ingresoUF > 0 && (ingresoUF < ingresoMinUF || ingresoUF > ingresoMaxUF)) {
    motivosNoAplica.push(
      `El ingreso familiar (${ingresoUF} UF) debe estar entre ${ingresoMinUF} y ${ingresoMaxUF} UF.`,
    );
  } else if (ingresoUF <= 0) {
    motivosNoAplica.push('Ingrese el ingreso familiar mensual.');
  }

  let subsidioMensualUF = 0;
  let totalUF = 0;
  let mesesDuracion = 0;
  let remanenteUF = 0;

  const aplica = motivosNoAplica.length === 0;
  if (aplica) {
    if (esEspecial) {
      totalUF = S.especial.totalUF;
      subsidioMensualUF = round2(arriendoUF * S.especial.coberturaMax);
    } else {
      totalUF = S.regular.totalUF;
      const tope = input.zonaNorteSurRM
        ? S.regular.topeMensualZonaUF
        : S.regular.topeMensualUF;
      subsidioMensualUF = Math.min(tope, arriendoUF);
    }
    mesesDuracion = Math.min(
      S.regular.plazoMaxMeses,
      Math.floor(totalUF / subsidioMensualUF),
    );
    remanenteUF = round2(totalUF - mesesDuracion * subsidioMensualUF);
  }

  const subsidioMensualCLP = Math.round(subsidioMensualUF * valorUF);
  const copagoMensualCLP = Math.max(0, Math.round(arriendo) - subsidioMensualCLP);

  const baseCalculo = aplica
    ? `${esEspecial ? `Llamado especial PM/PcD: 90% del arriendo (${arriendoUF} UF)` : `Llamado regular: min(${input.zonaNorteSurRM ? '4,9' : '4,2'} UF, ${arriendoUF} UF)`} = ${subsidioMensualUF} UF/mes por ${mesesDuracion} meses.`
    : motivosNoAplica.join(' ');

  return {
    modalidad: esEspecial ? 'especial-pm-pcd' : 'regular',
    aplica,
    arriendoUF,
    subsidioMensualCLP: aplica ? subsidioMensualCLP : 0,
    subsidioMensualUF: aplica ? subsidioMensualUF : 0,
    copagoMensualCLP: aplica ? copagoMensualCLP : Math.round(arriendo),
    mesesDuracion,
    remanenteUF,
    totalUF,
    motivosNoAplica,
    baseCalculo,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function subsidioArriendoToResults(
  result: SubsidioArriendoResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: 'Subsidio mensual estimado',
      value: result.subsidioMensualCLP,
      format: 'CLP',
      highlight: true,
    },
    {
      label: 'Copago familiar mensual',
      value: result.copagoMensualCLP,
      format: 'CLP',
    },
    {
      label: 'Meses de subsidio',
      value: result.mesesDuracion,
      format: 'number',
    },
    {
      label: 'Total del subsidio',
      value: result.totalUF,
      format: 'UF',
    },
  ];
  if (result.remanenteUF > 0) {
    results.push({
      label: 'Remanente último período',
      value: result.remanenteUF,
      format: 'UF',
    });
  }
  return results;
}
