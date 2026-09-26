// ============================================
// Quick Answers por calculadora (SSR)
// ----------------------------------------------
// Contenido "answer-first" para las calculadoras
// con más tracción: un H1 orientado a la tarea,
// un lead con la respuesta directa y un ejemplo
// tabulado calculado con las funciones puras del
// repo (nunca montos escritos a mano).
//
// Regla YMYL: los leads solo afirman lo que ya
// está documentado en `constants.ts`,
// `calculator-methodologies.ts`, las FAQ del
// catálogo o los artículos/guías del repo.
// ============================================

import { formatCLP, formatPercentage } from '@/lib/formatters';
import { formatCLP2 } from '@/lib/seo/live-value-title';
import { INGRESO_MINIMO, ASIGNACION_FAMILIAR_2026, CONTRIBUCIONES_BIENES_RAICES, UTM } from '@/lib/values/constants';
import { calculateContribuciones } from '@/lib/calculations/contribuciones';
import { calculateCreditoCAE } from '@/lib/calculations/credito-cae';
import { calculatePatenteComercial } from '@/lib/calculations/patente-comercial';
import { calculateIVA } from '@/lib/calculations/iva';
import { calculateCreditoAutomotriz } from '@/lib/calculations/credito-automotriz';
import { calculateVacaciones } from '@/lib/calculations/vacaciones';
import { calculateGratificacion } from '@/lib/calculations/gratificacion';
import { calculateImpuestoSegundaCategoria } from '@/lib/calculations/impuesto-segunda-categoria';
import { calculateSueldoLiquido } from '@/lib/calculations/sueldo-liquido';
import { calculateHorasExtra } from '@/lib/calculations/horas-extra';
import { calculateFiniquito } from '@/lib/calculations/finiquito';
import { calculateUTMCLP } from '@/lib/calculations/utm-clp';
import { calculateUFCLP } from '@/lib/calculations/uf-clp';

export interface QuickAnswer {
  /** H1 de la página; si se omite se usa `calculator.name`. */
  h1?: string;
  /** Párrafo con la respuesta directa, bajo el header. */
  lead: string;
  /** Ejemplo representativo renderizado como tabla con caption. */
  example?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
}

interface QuickAnswerContext {
  /** UF vigente (o snapshot). */
  uf: number;
  /** UTM vigente (o snapshot). */
  utm: number;
}

function formatNum(value: number, decimals = 2): string {
  return value.toLocaleString('es-CL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Devuelve el quick answer de una calculadora, o `null` si la
 * calculadora no tiene entrada (las demás páginas no cambian).
 */
export function getQuickAnswer(
  calculatorId: string,
  ctx: QuickAnswerContext,
): QuickAnswer | null {
  switch (calculatorId) {
    case 'iva': {
      const netos = [10_000, 50_000, 100_000, 1_000_000];
      const rows = netos.map((neto) => {
        const r = calculateIVA({ monto: neto, tipo: 'agregar-iva' });
        return [formatCLP(neto), formatCLP(r.iva), formatCLP(r.montoConIVA)];
      });
      const quitar = calculateIVA({ monto: 119_000, tipo: 'quitar-iva' });
      rows.push([
        `${formatCLP(119_000)} (IVA incluido)`,
        formatCLP(quitar.iva),
        `${formatCLP(quitar.montoSinIVA)} neto`,
      ]);
      return {
        h1: 'Calculadora de IVA Chile: agregar o quitar el 19%',
        lead: 'El IVA general en Chile es 19%. Para agregarlo a un precio neto multiplica por 1,19; para quitarlo de un total que ya lo incluye divide por 1,19 y recuperas el neto.',
        example: {
          caption: 'Ejemplos con la tasa general de IVA de 19%.',
          headers: ['Monto ingresado', 'IVA', 'Total'],
          rows,
        },
      };
    }

    case 'credito-automotriz': {
      const base = {
        valorVehiculo: 15_000_000,
        pie: 3_000_000,
        tasaAnual: 12,
      };
      const rows = [36, 48, 60].map((plazoMeses) => {
        const r = calculateCreditoAutomotriz({ ...base, plazoMeses });
        return [
          `${plazoMeses} meses`,
          formatCLP(r.dividendoMensual),
          formatCLP(r.totalIntereses),
          formatCLP(r.totalPago + r.pie),
        ];
      });
      return {
        h1: 'Simulador de crédito automotriz: cuota mensual y costo total',
        lead: 'La cuota se calcula con amortización francesa sobre el monto financiado (valor del vehículo menos el pie). La CAE que muestra esta página es una aproximación educativa: la CAE legal aparece en la hoja de resumen del crédito.',
        example: {
          caption:
            'Vehículo de $15.000.000, pie de $3.000.000 (20%), tasa anual nominal de 12%, sin seguro vehicular. La tasa real depende de la cotización.',
          headers: ['Plazo', 'Cuota mensual', 'Intereses totales', 'Costo total (pie + cuotas)'],
          rows,
        },
      };
    }

    case 'vacaciones-proporcionales': {
      const casos: [number, number][] = [
        [553_553, 4],
        [800_000, 6],
        [1_200_000, 8],
      ];
      const rows = casos.map(([sueldoBruto, mesesTrabajados]) => {
        const r = calculateVacaciones({ sueldoBruto, mesesTrabajados });
        return [
          formatCLP(sueldoBruto),
          `${mesesTrabajados}`,
          formatNum(r.diasHabilesTotales),
          formatCLP(r.totalVacaciones),
        ];
      });
      return {
        h1: 'Calculadora de vacaciones proporcionales en días y pesos',
        lead: 'Al terminar el contrato corresponden 1,25 días hábiles de feriado por cada mes completo trabajado (15 días hábiles al año). Para pagarlas se proyectan además los sábados, domingos y feriados que caen dentro del feriado.',
        example: {
          caption:
            'Días hábiles acumulados y estimación en pesos (sueldo ÷ 30 por día corrido), sin fecha de término informada.',
          headers: ['Sueldo bruto', 'Meses trabajados', 'Días hábiles', 'Indemnización estimada'],
          rows,
        },
      };
    }

    case 'asignacion-familiar': {
      const t = ASIGNACION_FAMILIAR_2026;
      const rows = [
        ['Tramo A', `hasta ${formatCLP(t.tramoA.ingresoMaximoCLP)}`, formatCLP(t.tramoA.montoPorCargaCLP)],
        ['Tramo B', `hasta ${formatCLP(t.tramoB.ingresoMaximoCLP)}`, formatCLP(t.tramoB.montoPorCargaCLP)],
        ['Tramo C', `hasta ${formatCLP(t.tramoC.ingresoMaximoCLP)}`, formatCLP(t.tramoC.montoPorCargaCLP)],
        ['Tramo D', `sobre ${formatCLP(t.tramoC.ingresoMaximoCLP)}`, formatCLP(0)],
      ];
      return {
        h1: 'Asignación familiar 2026: tramos y monto por carga',
        lead: `La asignación familiar paga un monto fijo por cada carga reconocida según el tramo de ingreso: ${formatCLP(t.tramoA.montoPorCargaCLP)} en el tramo A, ${formatCLP(t.tramoB.montoPorCargaCLP)} en el B y ${formatCLP(t.tramoC.montoPorCargaCLP)} en el C. Sobre el tope del tramo C no hay derecho.`,
        example: {
          caption:
            'Tramos y montos por carga vigentes desde el 1 de mayo de 2026 (Ley 21.830).',
          headers: ['Tramo', 'Ingreso mensual', 'Monto por carga'],
          rows,
        },
      };
    }

    case 'gratificacion-legal': {
      const sueldos = [553_553, 800_000, 1_500_000];
      const rows = sueldos.map((sueldoBruto) => {
        const r = calculateGratificacion({
          sueldoBruto,
          mesesTrabajados: 12,
          tipoGratificacion: 'mensual',
        });
        return [
          formatCLP(sueldoBruto),
          formatCLP(r.gratificacionMensual),
          formatCLP(r.gratificacionAnual),
          r.metodo,
        ];
      });
      return {
        h1: 'Calculadora de gratificación legal: 25% con tope 4,75 IMM',
        lead: `En el sistema del artículo 50 del Código del Trabajo la gratificación es el menor entre el 25% de la remuneración mensual y el tope de 4,75 ingresos mínimos dividido en 12 (${formatCLP(Math.round(INGRESO_MINIMO.mensual * 4.75 / 12))} mensuales con el IMM vigente).`,
        example: {
          caption: `12 meses trabajados, IMM de ${formatCLP(INGRESO_MINIMO.mensual)} vigente desde mayo de 2026.`,
          headers: ['Sueldo bruto', 'Gratificación mensual', 'Gratificación anual', 'Método'],
          rows,
        },
      };
    }

    case 'impuesto-segunda-categoria': {
      const sueldos = [800_000, 1_500_000, 2_500_000];
      const rows = sueldos.map((sueldoBrutoMensual) => {
        const r = calculateImpuestoSegundaCategoria({
          sueldoBrutoMensual,
          valorUTM: ctx.utm,
        });
        return [
          formatCLP(sueldoBrutoMensual),
          formatNum(r.rentaEnUTM),
          formatCLP(r.impuestoMensual),
          formatPercentage(r.tasaEfectiva, 2),
        ];
      });
      return {
        h1: 'Calculadora de impuesto de segunda categoría (impuesto único)',
        lead: 'El impuesto único de segunda categoría se calcula con tramos progresivos sobre la renta mensual expresada en UTM: el primer tramo, hasta 13,5 UTM, está exento; las tasas marginales van de 4% a 40%.',
        example: {
          caption:
            'Tabla mensual en UTM y 12 meses trabajados. La UTM cambia cada mes, así que los límites en pesos también varían.',
          headers: ['Sueldo mensual', 'Renta en UTM', 'Impuesto mensual', 'Tasa efectiva'],
          rows,
        },
      };
    }

    case 'sueldo-liquido': {
      const brutos = [553_553, 800_000, 1_200_000];
      const rows = brutos.map((sueldoBruto) => {
        const r = calculateSueldoLiquido({
          sueldoBruto,
          afp: 'habitat',
          saludTipo: 'fonasa',
          contratoIndefinido: true,
          valorUF: ctx.uf,
          valorUTM: ctx.utm,
        });
        return [
          formatCLP(sueldoBruto),
          formatCLP(r.totalDescuentos),
          formatCLP(r.liquido),
          formatPercentage(r.factorConversion, 1),
        ];
      });
      return {
        h1: 'Calculadora de sueldo líquido: de bruto a líquido',
        lead: 'El sueldo líquido es el bruto menos las cotizaciones del trabajador: 10% de AFP más la comisión de tu AFP, 7% de salud, 0,6% de seguro de cesantía en contrato indefinido y el impuesto único si la renta supera el tramo exento.',
        example: {
          caption:
            'AFP Habitat (1,27%), Fonasa 7%, contrato indefinido, sin bonos ni otros descuentos; topes de 90 UF y 135,2 UF según corresponda.',
          headers: ['Sueldo bruto', 'Descuentos', 'Sueldo líquido', '% del bruto'],
          rows,
        },
      };
    }

    case 'horas-extra': {
      const sueldos = [553_553, 800_000, 1_200_000];
      const rows = sueldos.map((sueldoBruto) => {
        const r = calculateHorasExtra({
          sueldoBruto,
          horasExtra: 10,
          jornadaSemanal: 42,
        });
        return [
          formatCLP(sueldoBruto),
          formatCLP(r.valorHoraExtra),
          formatCLP(r.totalHorasExtra),
        ];
      });
      return {
        h1: 'Calculadora de horas extra con jornada de 42 horas',
        lead: 'Para sueldo mensual y jornada de 42 horas, el valor de cada hora extra con el recargo mínimo de 50% es sueldo × 0,0083333 (fórmula de la Dirección del Trabajo).',
        example: {
          caption:
            'Jornada de 42 horas semanales vigente desde el 26 de abril de 2026, recargo mínimo legal de 50%, 10 horas extra.',
          headers: ['Sueldo bruto', 'Valor hora extra', 'Total 10 horas extra'],
          rows,
        },
      };
    }

    case 'finiquito': {
      const casos: [number, number][] = [
        [553_553, 2],
        [800_000, 5],
        [1_200_000, 8],
      ];
      const rows = casos.map(([ultimoSueldo, añosTrabajados]) => {
        const r = calculateFiniquito({
          ultimoSueldo,
          añosTrabajados,
          mesesTrabajados: 6,
          causaTermino: 'necesidades_empresa',
          incluyeAvisoPrevio: true,
        });
        return [
          formatCLP(ultimoSueldo),
          `${añosTrabajados}`,
          formatCLP(r.indemnizacionAniosServicio),
          formatCLP(r.totalFiniquito),
        ];
      });
      return {
        h1: 'Calculadora de finiquito: indemnización, vacaciones y aviso',
        lead: 'El finiquito suma las prestaciones que correspondan según la causal: indemnización de 30 días por año de servicio (tope 11 años y base máxima 90 UF), sustitutiva del aviso previo si no hubo aviso de 30 días, feriado proporcional y remuneraciones pendientes.',
        example: {
          caption:
            'Despido por necesidades de la empresa (Art. 161), 6 meses del último año, sin aviso previo de 30 días y con gratificación. No incluye recargos judiciales.',
          headers: ['Último sueldo', 'Años', 'Indemnización por años', 'Total finiquito estimado'],
          rows,
        },
      };
    }

    case 'utm-clp': {
      const montos = [1, 5, 10, 12, 50];
      const rows = montos.map((monto) => {
        const r = calculateUTMCLP({
          monto,
          direccion: 'utm-a-clp',
          valorUTM: ctx.utm,
        });
        return [monto === 12 ? '12 UTM (1 UTA)' : `${formatNum(monto, 0)} UTM`, formatCLP(Math.round(r.montoConvertido))];
      });
      return {
        h1: 'Conversor UTM a pesos',
        lead: 'La UTM (Unidad Tributaria Mensual) se reajusta cada mes según la variación del IPC del penúltimo mes y se usa en multas de tránsito, patentes, permisos municipales y trámites tributarios. 1 UTA equivale a 12 UTM.',
        example: {
          caption: `Equivalencias con UTM de ${formatCLP(ctx.utm)}. El valor se reajusta cada mes según el IPC.`,
          headers: ['Monto en UTM', 'Equivalente en pesos'],
          rows,
        },
      };
    }

    case 'uf-clp': {
      const montos = [1, 10, 90, 1_000];
      const rows = montos.map((monto) => {
        const r = calculateUFCLP({
          monto,
          direccion: 'uf-a-clp',
          valorUF: ctx.uf,
        });
        return [`${formatNum(monto, 0)} UF`, formatCLP(Math.round(r.montoConvertido))];
      });
      return {
        h1: 'Conversor UF a pesos',
        lead: 'La UF (Unidad de Fomento) se reajusta diariamente según el IPC y se usa en créditos hipotecarios, arriendos y contratos de largo plazo.',
        example: {
          caption: `Equivalencias con UF de ${formatCLP2(ctx.uf)}. El valor se reajusta diariamente según el IPC.`,
          headers: ['Monto en UF', 'Equivalente en pesos'],
          rows,
        },
      };
    }

    case 'contribuciones': {
      const P = CONTRIBUCIONES_BIENES_RAICES;
      const montos = [60_000_000, 100_000_000, 150_000_000, 250_000_000, 400_000_000];
      const rows = montos.map((avaluo) => {
        const r = calculateContribuciones({ avaluoFiscal: avaluo, destino: 'habitacional' });
        return [
          `Habitacional ${formatCLP(avaluo)}`,
          formatCLP(r.contribucionAnual),
          formatCLP(r.contribucionCuota),
        ];
      });
      const comercial = calculateContribuciones({ avaluoFiscal: 100_000_000, destino: 'comercial' });
      rows.push([
        'Comercial $100.000.000',
        formatCLP(comercial.contribucionAnual),
        formatCLP(comercial.contribucionCuota),
      ]);
      return {
        h1: 'Calculadora de contribuciones: estima tu cuota con el avalúo fiscal',
        lead: `Las viviendas no pagan contribuciones por los primeros ${formatCLP(P.exencionHabitacional)} de avalúo fiscal (${P.periodoLabel}). Sobre ese monto se aplica ${formatPercentage(P.tasaHabitacionalBaja, 3)} anual hasta un avalúo total de ${formatCLP(P.umbralCambioTasa)} y ${formatPercentage(P.tasaGeneral, 3)} más una sobretasa de ${formatPercentage(P.sobretasaFiscal, 3)} sobre el exceso. El total anual se paga en cuatro cuotas.`,
        example: {
          caption: `Estimación con las reglas SII del ${P.periodoLabel}.`,
          headers: ['Avalúo fiscal', 'Contribución anual', 'Cuota (1 de 4)'],
          rows,
        },
      };
    }

    case 'credito-cae': {
      const plazos = [120, 180, 240];
      const rows = plazos.map((p) => {
        const r = calculateCreditoCAE({
          montoCredito: 10_000_000,
          plazoMeses: p,
          tieneGarantiaEstatal: true,
          valorUF: ctx.uf,
        });
        return [
          formatCLP(10_000_000),
          `${p / 12} años`,
          formatCLP(r.dividendoMensual),
          formatCLP(r.totalPago),
        ];
      });
      return {
        h1: 'Simulador CAE: calcula la cuota mensual de tu crédito',
        lead: 'El Crédito con Aval del Estado (CAE) cobra una tasa de interés de 2% anual. Este simulador estima la cuota con amortización francesa a tasa fija; tu cuota real y los beneficios de rebaja (como el tope de 10% de la renta, sujeto a requisitos) se revisan en ingresa.cl.',
        example: {
          caption:
            'Tasa 2% anual fija, sin período de gracia ni reajuste de la UF. Referencial: no es tu estado de cuenta.',
          headers: ['Crédito', 'Plazo', 'Cuota mensual', 'Total pagado'],
          rows,
        },
      };
    }

    case 'patente-comercial': {
      const capitales = [10_000_000, 50_000_000, 150_000_000, 500_000_000];
      const rows = capitales.map((c) => {
        const baja = calculatePatenteComercial({
          capitalInvertido: c,
          actividad: 'comercio',
          comuna: 'otra',
        });
        const alta = calculatePatenteComercial({
          capitalInvertido: c,
          actividad: 'comercio',
          comuna: 'santiago',
        });
        return [
          formatCLP(c),
          formatCLP(baja.patenteAnual),
          formatCLP(alta.patenteAnual),
        ];
      });
      return {
        h1: 'Patente comercial municipal: cómo se calcula y cuánto pagar',
        lead: 'La patente comercial se calcula aplicando la tasa de tu municipalidad, entre 2,5 y 5 por mil, sobre el capital propio tributario. El monto anual no puede ser menor a 1 UTM ni mayor a 8.000 UTM y se paga en dos cuotas, en enero y julio.',
        example: {
          caption: `Montos anuales con UTM de ${formatCLP(UTM.valor)}; aplican los topes de 1 y 8.000 UTM. La tasa exacta la fija cada municipalidad.`,
          headers: ['Capital propio', 'Anual con 2,5 por mil', 'Anual con 5 por mil'],
          rows,
        },
      };
    }

    default:
      return null;
  }
}
