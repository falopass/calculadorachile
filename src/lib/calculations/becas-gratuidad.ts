// ============================================
// Estimador de Becas y Gratuidad — admisión 2027
// Portal Beneficios Estudiantiles Mineduc
// ============================================

import { BECAS_EDUCACION_SUPERIOR_2027 } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export interface BecasGratuidadInput {
  /**
   * Nivel socioeconómico según el FUAS, como decil superior del
   * tramo: '50' hasta 50%, '60' 51–60%, '70' 61–70%, '80' 71–80%,
   * '90' más del 80%.
   */
  nivelSocioeconomico: string;
  /** 'universitaria' o 'tecnica' (técnica de nivel superior o profesional en IP). */
  tipoCarrera: string;
  /** Institución adscrita a la gratuidad. */
  institucionGratuidad: boolean;
  /** Puntaje promedio PAES pruebas obligatorias (0 = no rendida). */
  puntajePaes: number;
  /** Promedio de notas de enseñanza media (1,0–7,0). */
  nem: number;
  /** NEM dentro del 10% más alto del establecimiento. */
  top10: boolean;
  /** Ingresó vía PACE (exime del puntaje PAES en BB/BJGM). */
  pace: boolean;
  /** Ingresa a primer año de estudios superiores. */
  primerAno: boolean;
}

export interface BecasGratuidadResult {
  nivelSocioeconomico: number;
  beneficios: string[];
  cumpleGratuidad: boolean;
  cumpleBicentenario: boolean;
  cumpleJuanGomezMillas: boolean;
  cumpleExcelenciaAcademica: boolean;
  cumpleNuevoMilenio: boolean;
  cumpleNuevoMilenioII: boolean;
  /** Mayor tope anual en CLP entre las becas de arancel aplicables. */
  mayorTopeBecaCLP: number;
  baseCalculo: string;
}

/**
 * Estima qué beneficios de arancel podrían aplicar según los
 * requisitos del portal beneficiosestudiantiles.cl para la
 * admisión 2027. Orientativo: la asignación real depende del FUAS
 * y de la clasificación socioeconómica validada por el Estado.
 */
export function calculateBecasGratuidad(
  input: BecasGratuidadInput,
): BecasGratuidadResult {
  const C = BECAS_EDUCACION_SUPERIOR_2027;
  const p = Number(input.nivelSocioeconomico) || 90;
  const esUniversitaria = input.tipoCarrera === 'universitaria';
  const esTecnica = input.tipoCarrera === 'tecnica';
  const paesOk =
    (input.puntajePaes ?? 0) >= C.puntajePaesBecas || input.pace === true;
  const nemOk = (input.nem ?? 0) >= C.nemMinimoTecnico;

  const cumpleGratuidad =
    p <= C.gratuidad.percentil && input.institucionGratuidad === true;
  const cumpleBicentenario =
    p <= C.becas.bicentenario.percentil && esUniversitaria && paesOk;
  const cumpleJuanGomezMillas =
    p <= C.becas.juanGomezMillas.percentil && paesOk;
  const cumpleExcelenciaAcademica =
    p <= C.becas.excelenciaAcademica.percentil && input.top10 === true;
  const cumpleNuevoMilenio =
    p <= C.becas.nuevoMilenio.percentil && esTecnica && nemOk;
  const cumpleNuevoMilenioII =
    p <= C.becas.nuevoMilenioII.percentil &&
    esTecnica &&
    input.primerAno === true &&
    nemOk;

  const beneficios: string[] = [];
  let mayorTopeBecaCLP = 0;
  if (cumpleGratuidad) beneficios.push('Gratuidad');
  if (cumpleBicentenario) beneficios.push('Beca Bicentenario');
  if (cumpleJuanGomezMillas) {
    beneficios.push('Beca Juan Gómez Millas');
    mayorTopeBecaCLP = Math.max(
      mayorTopeBecaCLP,
      C.becas.juanGomezMillas.topeCLP,
    );
  }
  if (cumpleExcelenciaAcademica) {
    beneficios.push('Beca Excelencia Académica');
    mayorTopeBecaCLP = Math.max(
      mayorTopeBecaCLP,
      C.becas.excelenciaAcademica.topeCLP,
    );
  }
  if (cumpleNuevoMilenio) {
    beneficios.push('Beca Nuevo Milenio I');
    mayorTopeBecaCLP = Math.max(
      mayorTopeBecaCLP,
      C.becas.nuevoMilenio.topeCLP,
    );
  }
  if (cumpleNuevoMilenioII) {
    beneficios.push('Beca Nuevo Milenio II');
    mayorTopeBecaCLP = Math.max(
      mayorTopeBecaCLP,
      C.becas.nuevoMilenioII.topeCLP,
    );
  }

  const baseCalculo =
    beneficios.length > 0
      ? `Con nivel socioeconómico hasta el ${p <= 90 ? `${p}%` : '80%'} y los datos ingresados podrías optar a: ${beneficios.join(', ')}.`
      : 'Sin beneficios de arancel con los datos ingresados.';

  return {
    nivelSocioeconomico: p,
    beneficios,
    cumpleGratuidad,
    cumpleBicentenario,
    cumpleJuanGomezMillas,
    cumpleExcelenciaAcademica,
    cumpleNuevoMilenio,
    cumpleNuevoMilenioII,
    mayorTopeBecaCLP,
    baseCalculo,
  };
}

/**
 * Convierte el resultado a formato de CalculatorResult[]
 */
export function becasGratuidadToResults(
  result: BecasGratuidadResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [];
  if (result.cumpleGratuidad) {
    results.push({
      label: 'Gratuidad: arancel y matrícula (% cubierto)',
      value: 100,
      format: 'percentage',
    });
  }
  if (result.cumpleBicentenario) {
    results.push({
      label: 'Beca Bicentenario (% del arancel de referencia)',
      value: 100,
      format: 'percentage',
    });
  }
  if (result.cumpleJuanGomezMillas) {
    results.push({
      label: 'Beca Juan Gómez Millas (tope anual)',
      value: BECAS_EDUCACION_SUPERIOR_2027.becas.juanGomezMillas.topeCLP,
      format: 'CLP',
    });
  }
  if (result.cumpleExcelenciaAcademica) {
    results.push({
      label: 'Beca Excelencia Académica (tope anual)',
      value: BECAS_EDUCACION_SUPERIOR_2027.becas.excelenciaAcademica.topeCLP,
      format: 'CLP',
    });
  }
  if (result.cumpleNuevoMilenio) {
    results.push({
      label: 'Beca Nuevo Milenio I (tope anual)',
      value: BECAS_EDUCACION_SUPERIOR_2027.becas.nuevoMilenio.topeCLP,
      format: 'CLP',
    });
  }
  if (result.cumpleNuevoMilenioII) {
    results.push({
      label: 'Beca Nuevo Milenio II (tope anual)',
      value: BECAS_EDUCACION_SUPERIOR_2027.becas.nuevoMilenioII.topeCLP,
      format: 'CLP',
    });
  }
  if (result.mayorTopeBecaCLP > 0) {
    results.unshift({
      label: 'Mayor beca de arancel posible (tope anual)',
      value: result.mayorTopeBecaCLP,
      format: 'CLP',
      highlight: true,
    });
  }
  if (results.length === 0) {
    results.push({
      label: 'Sin beneficios de arancel con los datos ingresados',
      value: 0,
      format: 'CLP',
    });
  }
  return results;
}
