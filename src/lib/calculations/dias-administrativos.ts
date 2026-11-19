import type { CalculatorResult } from '@/types/calculator';

export const ESTATUTO_ADMINISTRATIVO_URL = 'https://www.bcn.cl/leychile/navegar?idNorma=236392';
export const ESTATUTO_MUNICIPAL_URL = 'https://www.bcn.cl/leychile/navegar?idNorma=30256';

/** DFL 29 (Ley 18.834), art. 109; Ley 18.883, art. 108. */
export const CUPO_DIAS_ADMINISTRATIVOS = 6;

export interface DiasAdministrativosInput {
  diasCompletosUsados: number;
  mediosDiasUsados: number;
  diasSolicitados?: number;
}

export interface DiasAdministrativosResult {
  diasUsados: number;
  diasDisponibles: number;
  diasSolicitados?: number;
  solicitudCabe?: boolean;
  diasRestantes?: number;
  advertencias: string[];
}

export function calculateDiasAdministrativos(
  input: DiasAdministrativosInput,
): DiasAdministrativosResult {
  for (const value of [input.diasCompletosUsados, input.mediosDiasUsados]) {
    if (!Number.isSafeInteger(value) || value < 0) {
      throw new Error(
        'Los días completos y la cantidad de medios días usados deben ser enteros no negativos.',
      );
    }
  }
  const usados = input.diasCompletosUsados * 2 + input.mediosDiasUsados;
  if (!Number.isSafeInteger(usados)) {
    throw new Error('La cantidad de días usados es demasiado grande.');
  }
  const solicitud = input.diasSolicitados;
  if (solicitud !== undefined && (!Number.isSafeInteger(solicitud * 2) || solicitud < 0)) {
    throw new Error('La solicitud debe ser no negativa y expresarse en pasos de 0,5 días.');
  }
  const cupo = CUPO_DIAS_ADMINISTRATIVOS * 2;
  const disponibles = Math.max(0, cupo - usados);
  const result: DiasAdministrativosResult = {
    diasUsados: usados / 2,
    diasDisponibles: disponibles / 2,
    advertencias:
      usados > cupo
        ? ['El uso informado supera el cupo anual. Revisa el registro con tu unidad de personal.']
        : [],
  };
  if (solicitud !== undefined) {
    const solicitados = solicitud * 2;
    result.diasSolicitados = solicitud;
    result.solicitudCabe = usados <= cupo && solicitados <= disponibles;
    result.diasRestantes = Math.max(0, disponibles - solicitados) / 2;
  }
  return result;
}

export function diasAdministrativosToResults(
  result: DiasAdministrativosResult,
): CalculatorResult[] {
  const results: CalculatorResult[] = [
    {
      label: 'Días usados este año calendario',
      value: result.diasUsados,
      format: 'days',
      ...(result.advertencias.length ? { note: { text: result.advertencias.join(' ') } } : {}),
    },
    {
      label: 'Días disponibles',
      value: result.diasDisponibles,
      format: 'days',
      highlight: true,
      note: {
        text: `Cupo de hasta ${CUPO_DIAS_ADMINISTRATIVOS} días hábiles por año calendario, con goce de remuneraciones, fraccionables por días o medios días. El saldo no autoriza el permiso: la autoridad competente puede concederlo o denegarlo (DFL 29, arts. 108 y 109; Ley 18.883, arts. 107 y 108).`,
        source: { name: 'BCN — DFL 29, arts. 108 y 109', url: ESTATUTO_ADMINISTRATIVO_URL },
      },
    },
  ];
  if (result.diasSolicitados !== undefined) {
    results.push(
      {
        label: result.solicitudCabe
          ? 'La solicitud cabe en el saldo (no implica autorización)'
          : 'La solicitud no cabe en el cupo informado',
        value: result.diasSolicitados,
        format: 'days',
      },
      {
        label: result.solicitudCabe
          ? 'Días que quedarían si se autoriza'
          : 'Saldo proyectado (solicitud no cubierta)',
        value: result.diasRestantes ?? 0,
        format: 'days',
      },
    );
  }
  return results;
}
