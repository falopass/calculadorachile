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
import { formatCLP2, MESES_ES_CL, toSantiagoParts } from '@/lib/seo/live-value-title';
import {
  INGRESO_MINIMO,
  JORNADA_LEGAL,
  ASIGNACION_FAMILIAR_2026,
  CONTRIBUCIONES_BIENES_RAICES,
  TOPE_IMPOSITIVO,
  UTM,
  INDEMNIZACION,
} from '@/lib/values/constants';
import { calculateContribuciones } from '@/lib/calculations/contribuciones';
import { calculateCreditoCAE } from '@/lib/calculations/credito-cae';
import { calculatePatenteComercial } from '@/lib/calculations/patente-comercial';
import { calculateIVA } from '@/lib/calculations/iva';
import { calculateBoletaHonorarios } from '@/lib/calculations/boleta-honorarios';
import { calculateCreditoAutomotriz } from '@/lib/calculations/credito-automotriz';
import { calculateVacaciones } from '@/lib/calculations/vacaciones';
import { calculateGratificacion } from '@/lib/calculations/gratificacion';
import { topeGratificacion } from '@/lib/values/gratificacion-tope';
import { calculateImpuestoSegundaCategoria } from '@/lib/calculations/impuesto-segunda-categoria';
import { calculateSueldoLiquido } from '@/lib/calculations/sueldo-liquido';
import { calculateHorasExtra } from '@/lib/calculations/horas-extra';
import { calculateFiniquito } from '@/lib/calculations/finiquito';
import { calculateUTMCLP } from '@/lib/calculations/utm-clp';
import { calculateUFCLP } from '@/lib/calculations/uf-clp';
import { calculateSueldoPartTime } from '@/lib/calculations/sueldo-part-time';
import { calculateFactorHoraExtra } from '@/lib/calculations/factor-hora-extra';
import { calculateTopeImponible } from '@/lib/calculations/tope-imponible-90-uf';
import { calculateSueldoCasaParticular } from '@/lib/calculations/sueldo-casa-particular';

export interface QuickAnswerLink {
  text: string;
  href: string;
}

/** Fragmento del lead: texto plano o enlace a una fuente oficial. */
export type QuickAnswerPart = string | QuickAnswerLink;

export interface QuickAnswer {
  /** H1 de la página; si se omite se usa `calculator.name`. */
  h1?: string;
  /** Párrafo con la respuesta directa, bajo el header (texto plano). */
  lead: string;
  /**
   * Mismo lead en fragmentos, para renderizar las fuentes oficiales como
   * enlaces. Si existe, `lead` es su texto concatenado.
   */
  leadParts?: QuickAnswerPart[];
  /** Respuestas cortas visibles bajo el lead (sin schema). */
  shortAnswers?: {
    question: string;
    answer: string;
    sources: QuickAnswerLink[];
  }[];
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
  /**
   * UTM en vivo solo si pasó `isLiveValueFresh` (mes en curso). Nunca el
   * snapshot ni `FALLBACK_VALUES`: si falta, el lead de UTM va sin monto.
   */
  utmFresca?: { value: number; date: string } | null;
  /** Fecha del valor de `utm` (dato en vivo o snapshot), para indicar su mes. */
  utmFecha?: string;
}

/** " (octubre de 2026)" según la fecha del valor usado en la tabla de UTM. */
function mesUTMEjemplo(ctx: QuickAnswerContext): string {
  const fecha = ctx.utmFresca?.date ?? ctx.utmFecha;
  const parts = fecha ? toSantiagoParts(new Date(fecha)) : null;
  if (!parts) return '';
  return ` (${MESES_ES_CL[parts.month - 1]} de ${parts.year})`;
}

function withLinks(parts: QuickAnswerPart[]): Pick<QuickAnswer, 'lead' | 'leadParts'> {
  return {
    lead: parts.map((p) => (typeof p === 'string' ? p : p.text)).join(''),
    leadParts: parts,
  };
}

const SII_UTM_URL = 'https://www.sii.cl/valores_y_fechas/utm/utm2026.htm';
const BCN_CODIGO_TRABAJO_URL = 'https://www.bcn.cl/leychile/navegar?idNorma=207436';
const DT_ORD_596_URL = 'https://dt.gob.cl/legislacion/1624/w3-article-124097.html';
const DT_GRATIFICACION_URL = 'https://www.dt.gob.cl/portal/1626/w3-article-99034.html';
const DT_IMM_URL = 'https://www.dt.gob.cl/portal/1628/w3-article-60141.html';
const BCN_LEY_21830_URL = 'https://www.bcn.cl/leychile/navegar?idNorma=1225354';

/** Respuesta directa de la calculadora UTM (E-016). Exportada para tests. */
export function buildUTMLeadParts(
  utmFresca: { value: number; date: string } | null | undefined,
): QuickAnswerPart[] {
  const parts = utmFresca ? toSantiagoParts(new Date(utmFresca.date)) : null;
  if (!utmFresca || !parts) {
    return [
      'Una UTM vale el monto que fija el ',
      { text: 'SII', href: SII_UTM_URL },
      ' para cada mes y rige del primer al último día de ese mes. Se reajusta cada mes según el IPC, y 12 UTM forman 1 UTA.',
    ];
  }
  const mes = MESES_ES_CL[parts.month - 1];
  const ultimoDia = new Date(Date.UTC(parts.year, parts.month, 0)).getUTCDate();
  const uta = calculateUTMCLP({ monto: 12, direccion: 'utm-a-clp', valorUTM: utmFresca.value });
  return [
    `Una UTM vale ${formatCLP(utmFresca.value)} en ${mes} de ${parts.year}: es el valor que fija el `,
    { text: 'SII', href: SII_UTM_URL },
    ` y rige del 1 al ${ultimoDia} de ${mes}. Se reajusta cada mes según el IPC, y 12 UTM forman 1 UTA (${formatCLP(Math.round(uta.montoConvertido))}).`,
  ];
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
export function getQuickAnswer(calculatorId: string, ctx: QuickAnswerContext): QuickAnswer | null {
  switch (calculatorId) {
    case 'boleta-honorarios': {
      const b100 = calculateBoletaHonorarios({ montoBruto: 100_000, ano: 2026 });
      return {
        h1: 'Calcular boleta de honorarios 2026 (retención 15,25%)',
        lead: `En 2026 la retención de la boleta de honorarios es de 15,25% del monto bruto: por una boleta de ${formatCLP(b100.montoBruto)} brutos se retienen ${formatCLP(b100.retencion)} y recibes ${formatCLP(b100.montoLiquido)} líquidos. La tasa subió desde 14,5% en 2025 y sube a 16% en 2027 y 17% en 2028, según la Ley 21.133 (SII).`,
      };
    }

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
        [
          'Tramo A',
          `hasta ${formatCLP(t.tramoA.ingresoMaximoCLP)}`,
          formatCLP(t.tramoA.montoPorCargaCLP),
        ],
        [
          'Tramo B',
          `hasta ${formatCLP(t.tramoB.ingresoMaximoCLP)}`,
          formatCLP(t.tramoB.montoPorCargaCLP),
        ],
        [
          'Tramo C',
          `hasta ${formatCLP(t.tramoC.ingresoMaximoCLP)}`,
          formatCLP(t.tramoC.montoPorCargaCLP),
        ],
        ['Tramo D', `sobre ${formatCLP(t.tramoC.ingresoMaximoCLP)}`, formatCLP(0)],
      ];
      return {
        h1: 'Asignación familiar 2026: tramos y monto por carga',
        lead: `La asignación familiar paga un monto fijo por cada carga reconocida según el tramo de ingreso: ${formatCLP(t.tramoA.montoPorCargaCLP)} en el tramo A, ${formatCLP(t.tramoB.montoPorCargaCLP)} en el B y ${formatCLP(t.tramoC.montoPorCargaCLP)} en el C. Sobre el tope del tramo C no hay derecho.`,
        example: {
          caption: 'Tramos y montos por carga vigentes desde el 1 de mayo de 2026 (Ley 21.830).',
          headers: ['Tramo', 'Ingreso mensual', 'Monto por carga'],
          rows,
        },
      };
    }

    case 'gratificacion-legal': {
      // E-014: todas las cifras salen de topeGratificacion() (constantes).
      const t = topeGratificacion();
      const sueldos = [INGRESO_MINIMO.mensual, 800_000, t.umbral, 1_500_000];
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
        h1: `Calculadora de gratificación legal y tope ${t.anio} (4,75 IMM)`,
        ...withLinks([
          'En el sistema del artículo 50 del Código del Trabajo, la gratificación es el 25% de lo devengado por remuneraciones mensuales, con un tope de 4,75 ingresos mínimos mensuales al año (',
          { text: 'Dirección del Trabajo', href: DT_GRATIFICACION_URL },
          `). Con el ingreso mínimo de ${formatCLP(t.imm)}, vigente desde el 1 de mayo de ${t.anio} (`,
          { text: 'Ley 21.830', href: BCN_LEY_21830_URL },
          `), el tope es ${formatCLP(t.anual)} al año, o ${formatCLP(t.mensual)} al mes. Desde un sueldo bruto de unos ${formatCLP(t.umbral)} al mes, la gratificación queda en el tope.`,
        ]),
        shortAnswers: [
          {
            question: '¿Cuánto es 4,75 ingresos mínimos mensuales?',
            answer: `4,75 × ${formatCLP(t.imm)} = ${formatCLP(t.anual)} al año. Dividido en 12 son ${formatCLP(t.mensual)} al mes. Es el máximo de gratificación por trabajador en el sistema del artículo 50.`,
            sources: [
              { text: 'Dirección del Trabajo, gratificación legal', href: DT_GRATIFICACION_URL },
              { text: 'Dirección del Trabajo, ingreso mínimo mensual', href: DT_IMM_URL },
            ],
          },
          {
            question: `El tope cambia el 1 de enero de ${t.anio + 1}`,
            answer: `La Ley 21.830 reajusta el ingreso mínimo desde el 1 de enero de 2027 según la variación del IPC entre el 1 de mayo y el 31 de diciembre de 2026 (art. 1). La ley ordena dictar, a más tardar el 15 de enero de 2027, un decreto con los valores resultantes (art. 6). Para la gratificación del año 2026, que se paga a más tardar en abril de 2027, el tope sigue siendo ${formatCLP(t.anual)}, porque se usa el ingreso mínimo vigente al 31 de diciembre de cada año. El tope de 2027 se calculará con el ingreso mínimo vigente al 31 de diciembre de 2027. Ese monto todavía no se conoce, y además la ley obliga a enviar un proyecto para un nuevo reajuste desde el 1 de julio de 2027 (art. 7). Actualizaremos esta página cuando se publique el valor oficial.`,
            sources: [
              { text: 'BCN, Ley 21.830', href: BCN_LEY_21830_URL },
              { text: 'Dirección del Trabajo, gratificación legal', href: DT_GRATIFICACION_URL },
            ],
          },
          {
            question: '¿Si no trabajé el año completo?',
            answer:
              'El tope se aplica en proporción al tiempo trabajado. Pero si estuviste con licencia médica algunos meses, el tope no se reduce.',
            sources: [{ text: 'Dirección del Trabajo, gratificación legal', href: DT_GRATIFICACION_URL }],
          },
        ],
        example: {
          caption: `12 meses trabajados, ingreso mínimo de ${formatCLP(t.imm)} vigente desde el 1 de mayo de ${t.anio} (tope mensual ${formatCLP(t.mensual)}). La fila de ${formatCLP(t.umbral)} muestra el sueldo desde el que se llega al tope.`,
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
        return [formatCLP(sueldoBruto), formatCLP(r.valorHoraExtra), formatCLP(r.totalHorasExtra)];
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
          tieneGratificacion: false,
          fechaTermino: '2026-10-16',
        });
        return [
          formatCLP(ultimoSueldo),
          `${añosTrabajados}`,
          formatCLP(r.indemnizacionAniosServicio),
          formatCLP(r.totalFiniquito),
        ];
      });
      return {
        h1: 'Calcular finiquito 2026: cálculo de indemnización, vacaciones y aviso',
        ...withLinks([
          `Si te despiden por necesidades de la empresa o desahucio y llevabas al menos un año, el finiquito incluye ${INDEMNIZACION.dias_por_año} días de tu última remuneración mensual por cada año trabajado (máximo ${INDEMNIZACION.tope_años} años y con una base de hasta ${INDEMNIZACION.tope_uf_mensual} UF del último día del mes anterior al pago), un mes más si no te avisaron con 30 días de anticipación, y siempre el feriado proporcional y los días trabajados del mes (`,
          { text: 'Código del Trabajo, arts. 163 y 172', href: BCN_CODIGO_TRABAJO_URL },
          '). El empleador debe pagarlo dentro de 10 días hábiles desde tu salida (',
          { text: 'art. 177, Dirección del Trabajo', href: DT_ORD_596_URL },
          ').',
        ]),
        shortAnswers: [
          {
            question: '¿Qué significa "me reservo el derecho" en el finiquito?',
            answer:
              'Puedes firmar el finiquito y dejar escrita una reserva de derechos sobre los conceptos o montos con los que no estás de acuerdo, de forma específica, para reclamarlos después. No necesitas que el empleador lo acepte, y igual te deben pagar lo no disputado.',
            sources: [
              {
                text: 'Dirección del Trabajo, Dictamen ORD. N° 1315/26 del 04-08-2022 (Ley 21.361)',
                href: 'https://dt.gob.cl/legislacion/1624/w3-article-122511.html',
              },
            ],
          },
          {
            question: '¿Cuánto tiempo tiene el empleador para pagar el finiquito?',
            answer:
              'Diez días hábiles desde que terminas de trabajar para firmarlo y poner el pago a tu disposición. Solo puede pagarse en cuotas si ambas partes lo acuerdan.',
            sources: [
              { text: 'Código del Trabajo, art. 177', href: BCN_CODIGO_TRABAJO_URL },
              { text: 'Dirección del Trabajo, ORD. 596 de 21-04-2023', href: DT_ORD_596_URL },
            ],
          },
          {
            question: '¿Con qué sueldo se calcula el finiquito?',
            answer: `Con la última remuneración mensual: todo lo que recibías cada mes al terminar el contrato (sueldo, comisiones, bonos mensuales, colación, movilización, gratificación si se paga mes a mes y cotizaciones de cargo del trabajador). No cuentan las horas extra, la asignación familiar ni los pagos esporádicos o anuales. Tiene tope de ${INDEMNIZACION.tope_uf_mensual} UF del último día del mes anterior al pago. Si tu remuneración es variable, se usa el promedio de los últimos 3 meses calendario completos (art. 172).`,
            sources: [
              { text: 'Código del Trabajo, art. 172', href: BCN_CODIGO_TRABAJO_URL },
              {
                text: 'Dirección del Trabajo',
                href: 'https://www.dt.gob.cl/portal/1628/w3-article-60585.html',
              },
            ],
          },
        ],
        example: {
          caption:
            'Despido por necesidades de la empresa (Art. 161) con término el viernes 16-10-2026, 6 meses del último año, sin aviso previo de 30 días y sin gratificación proporcional. El feriado proporcional (7,5 días hábiles) se paga en días corridos: 11,5 desde el 17-10-2026. No incluye recargos judiciales.',
          headers: ['Último sueldo', 'Años', 'Indemnización por años', 'Total finiquito estimado'],
          rows,
        },
      };
    }

    case 'utm-clp': {
      // Ejemplo con el valor fresco si existe; si no, el valor de contexto
      // (comportamiento previo). El lead nunca usa el snapshot.
      const valorUTM = ctx.utmFresca?.value ?? ctx.utm;
      const montos = [0.5, 1, 2, 3, 5, 10, 12, 20, 50, 100];
      const rows = montos.map((monto) => {
        const r = calculateUTMCLP({
          monto,
          direccion: 'utm-a-clp',
          valorUTM,
        });
        return [
          monto === 12
            ? '12 UTM (1 UTA)'
            : `${formatNum(monto, Number.isInteger(monto) ? 0 : 1)} UTM`,
          formatCLP(Math.round(r.montoConvertido)),
        ];
      });
      return {
        h1: 'Conversor UTM a pesos',
        ...withLinks(buildUTMLeadParts(ctx.utmFresca)),
        example: {
          caption: `Equivalencias con UTM de ${formatCLP(valorUTM)}${mesUTMEjemplo(ctx)}. El valor se reajusta cada mes según el IPC.`,
          headers: ['Monto en UTM', 'Equivalente en pesos'],
          rows,
        },
      };
    }

    case 'uf-clp': {
      const montos = [1, 5, 10, 50, 90, 500, 1_000, 3_000];
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
      const comercial = calculateContribuciones({
        avaluoFiscal: 100_000_000,
        destino: 'comercial',
      });
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
        return [formatCLP(c), formatCLP(baja.patenteAnual), formatCLP(alta.patenteAnual)];
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

    case 'sueldo-part-time': {
      const jornadas = [10, 20, 30, 35, 42];
      const rows = jornadas.map((horas) => {
        const r = calculateSueldoPartTime({ horasSemanales: horas });
        return [`${horas} horas`, formatCLP(r.minimoLegal), formatCLP(r.valorHora)];
      });
      return {
        h1: 'Sueldo part time 30 horas: mínimo legal y valor hora',
        lead: `Con una jornada de 30 horas o menos, el ingreso mínimo se paga proporcional (${formatCLP(INGRESO_MINIMO.mensual)} × horas ÷ ${JORNADA_LEGAL.actual}). Con más de 30 y menos de ${JORNADA_LEGAL.actual} horas corresponde el mínimo íntegro (${formatCLP(INGRESO_MINIMO.mensual)}).`,
        example: {
          caption: `Mínimo legal y valor hora con el IMM de ${formatCLP(INGRESO_MINIMO.mensual)} vigente desde mayo de 2026, sin sueldo pactado informado.`,
          headers: ['Jornada semanal', 'Mínimo legal mensual', 'Valor hora'],
          rows,
        },
      };
    }

    case 'factor-hora-extra': {
      const sueldos = [553_553, 800_000, 1_200_000, 2_000_000];
      const rows = sueldos.map((sueldoBase) => {
        const r = calculateFactorHoraExtra({ sueldoBase });
        return [
          formatCLP(sueldoBase),
          formatCLP(r.valorHoraOrdinaria),
          formatCLP(r.valorHoraExtra),
        ];
      });
      const factorTxt = calculateFactorHoraExtra({ sueldoBase: 1_000_000 }).factor.toLocaleString(
        'es-CL',
        {
          minimumFractionDigits: 7,
          maximumFractionDigits: 7,
        },
      );
      return {
        h1: `Factor hora extra ${JORNADA_LEGAL.actual} horas: sueldo × ${factorTxt}`,
        lead: `Con la jornada de ${JORNADA_LEGAL.actual} horas, cada hora extra con recargo mínimo de 50% equivale a sueldo × ${factorTxt} (fórmula de la Dirección del Trabajo). Si tu jornada pactada es distinta, el factor cambia.`,
        example: {
          caption: `Valor hora ordinaria y hora extra con jornada de ${JORNADA_LEGAL.actual} horas, vigente desde el 26 de abril de 2026 (Ley 21.561).`,
          headers: ['Sueldo mensual', 'Valor hora ordinaria', 'Valor hora extra'],
          rows,
        },
      };
    }

    case 'tope-imponible-90-uf': {
      const sueldos = [2_000_000, 3_500_000, 4_000_000, 6_000_000];
      const rows = sueldos.map((sueldoImponible) => {
        const r = calculateTopeImponible({ sueldoImponible, valorUF: ctx.uf });
        return [
          formatCLP(sueldoImponible),
          formatCLP(r.imponibleConsideradoCLP),
          formatCLP(r.excesoSobreTopeCLP),
        ];
      });
      const tope = calculateTopeImponible({ sueldoImponible: 0, valorUF: ctx.uf });
      return {
        h1: 'Tope imponible 2026: 90 UF en AFP, salud y cesantía',
        lead: `AFP y salud cotizan solo hasta el tope de ${TOPE_IMPOSITIVO.afp_salud.toLocaleString('es-CL')} UF (${formatCLP(tope.topeAfpSaludCLP)} con la UF de referencia); el exceso no paga cotizaciones. El seguro de cesantía topa más arriba: ${TOPE_IMPOSITIVO.seguro_cesantia.toLocaleString('es-CL')} UF (${formatCLP(tope.topeCesantiaCLP)}).`,
        example: {
          caption: `Topes y bases calculados con UF de ${formatCLP2(ctx.uf)}. Sobre el exceso del tope no se descuentan AFP ni salud.`,
          headers: ['Sueldo imponible', 'Base de cotización', 'Exceso sin cotizar'],
          rows,
        },
      };
    }

    case 'sueldo-casa-particular': {
      const casos: [string, 'puertas-adentro' | 'puertas-afuera', number][] = [
        ['Puertas adentro', 'puertas-adentro', 0],
        [`Puertas afuera ${JORNADA_LEGAL.actual} h`, 'puertas-afuera', JORNADA_LEGAL.actual],
        ['Puertas afuera 30 h', 'puertas-afuera', 30],
        ['Puertas afuera 20 h', 'puertas-afuera', 20],
      ];
      const rows = casos.map(([label, modalidad, horasSemanales]) => {
        const r = calculateSueldoCasaParticular({
          modalidad,
          horasSemanales,
          afp: 'habitat',
          valorUF: ctx.uf,
          valorUTM: ctx.utm,
        });
        return [
          label,
          formatCLP(r.minimoLegal),
          formatCLP(r.liquido),
          formatCLP(r.costoTotalMensual),
        ];
      });
      return {
        h1: 'Sueldo de trabajadora de casa particular (nana) 2026: mínimo, líquido y costo',
        lead: `Una trabajadora de casa particular gana como mínimo el ingreso mínimo general: ${formatCLP(INGRESO_MINIMO.mensual)} al mes, puertas adentro o puertas afuera con jornada completa. Puertas afuera con 30 horas semanales o menos, el mínimo es proporcional. La comida y la habitación no se descuentan, y el empleador paga además 1,11% de indemnización a todo evento y 3% de seguro de cesantía.`,
        example: {
          caption: `Con el sueldo mínimo de cada jornada, AFP Habitat (1,27%) y Fonasa 7%. El costo del empleador suma 1,11% de indemnización a todo evento, 3% de cesantía, la cotización vigente de la reforma de pensiones y 0,95% de accidentes del trabajo.`,
          headers: ['Modalidad', 'Sueldo mínimo', 'Sueldo líquido', 'Costo empleador'],
          rows,
        },
      };
    }

    default:
      return null;
  }
}
