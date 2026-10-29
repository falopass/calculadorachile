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
import {
  formatCLP2,
  formatDDMMYYYY,
  MESES_ES_CL,
  toSantiagoParts,
} from '@/lib/seo/live-value-title';
import {
  INGRESO_MINIMO,
  JORNADA_LEGAL,
  getTramoJornadaLegal,
  getProximoCambioJornada,
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
import { calculateLicenciaMedica } from '@/lib/calculations/licencia-medica';

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
  /** Fecha del valor de `uf` (dato en vivo o snapshot). */
  ufFecha?: string;
  /**
   * true solo si la UF viene del Banco Central y su fecha es hoy en Santiago.
   * Solo entonces el lead dice "Hoy" y atribuye el valor al Banco Central.
   */
  ufFresca?: boolean;
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
const BCCH_INDICADORES_URL = 'https://si3.bcentral.cl/Indicadoressiete/secure/Indicadoresdiarios.aspx';
const BCCH_UF_METODOLOGIA_URL = 'https://si3.bcentral.cl/estadisticas/Principal1/Metodologias/EMF/UF.pdf';
const BCCH_UF_SERIE_URL = 'https://si3.bcentral.cl/Indicadoressiete/secure/Serie.aspx?gcode=UF';
const SII_UF_URL = 'https://www.sii.cl/valores_y_fechas/uf/uf2026.htm';
/** Montos de la tabla UF a pesos (E-018: búsquedas "N uf a pesos" en GSC). */
const UF_MONTOS_TABLA = [
  1, 10, 24, 30, 50, 80, 90, 100, 200, 400, 500, 1_000, 1_100, 1_200, 2_000, 2_500, 3_000, 5_000,
  6_000, 6_500,
];
const DT_GRATIFICACION_URL = 'https://www.dt.gob.cl/portal/1626/w3-article-99034.html';
const DT_IMM_URL = 'https://www.dt.gob.cl/portal/1628/w3-article-60141.html';
const BCN_LEY_21830_URL = 'https://www.bcn.cl/leychile/navegar?idNorma=1225354';
/** Vigencia del IMM fijado por la Ley 21.830 (E-014). */
const IMM_LEY_21830_DESDE = '2026-05-01';
const DT_FERIADO_PROPORCIONAL_URL = 'https://www.dt.gob.cl/portal/1628/w3-article-60200.html';
const DT_ORD_826_URL = 'https://www.dt.gob.cl/legislacion/1624/w3-article-94453.html';
const DT_LICENCIA_CARENCIA_URL = 'https://www.dt.gob.cl/consultas/1613/w3-article-95277.html';
const SUSESO_SIL_URL = 'https://www.suseso.gob.cl/606/w3-article-19931.html';
const SUSESO_QUIEN_PAGA_URL = 'https://www.suseso.gob.cl/622/w3-propertyvalue-768472.html';

/** Remuneración neta del ejemplo de licencia médica (igual que la metodología). */
export const LICENCIA_EJEMPLO_NETA = 900_000;

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

/** Días con hasta 2 decimales y sin ceros sobrantes (10,5; 7; 13,75). */
function formatDias(value: number): string {
  return value.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

/** '2026-04-26' → '26 de abril de 2026'. */
function fechaLargaISO(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return `${day} de ${MESES_ES_CL[month - 1]} de ${year}`;
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
      // E-017: cifras generadas con calculateVacaciones (incluye ORD. 826/13).
      // Mantención: antes del 01-01-2027 mover FECHA_EJEMPLO a 2027 y revisar los textos.
      const FECHA_EJEMPLO = '2026-11-30'; // lunes
      const vac = (sueldoBruto: number, mesesTrabajados: number, fechaTermino?: string) =>
        calculateVacaciones({ sueldoBruto, mesesTrabajados, fechaTermino });
      const rows = Array.from({ length: 11 }, (_, i) => {
        const m = i + 1;
        const rIMM = vac(INGRESO_MINIMO.mensual, m, FECHA_EJEMPLO);
        const r800 = vac(800_000, m, FECHA_EJEMPLO);
        return [
          `${m}`,
          formatDias(rIMM.diasHabilesTotales),
          formatDias(rIMM.diasCorridosIndemnizables),
          formatCLP(rIMM.totalVacaciones),
          formatCLP(r800.totalVacaciones),
        ];
      });
      const e6 = vac(800_000, 6, FECHA_EJEMPLO);
      const e6SinFecha = vac(800_000, 6);
      const e6Dic = vac(800_000, 6, '2026-12-31');
      const e8 = vac(800_000, 8, FECHA_EJEMPLO);
      return {
        h1: 'Calculadora de vacaciones proporcionales: días y pesos según meses trabajados',
        ...withLinks([
          'Por cada mes trabajado se acumulan 1,25 días hábiles de vacaciones (15 ÷ 12). Al terminar el contrato, esos días se cuentan en el calendario desde el día siguiente al término y se suman los sábados, domingos y festivos que caen en ese período: se paga ese total de días corridos × sueldo ÷ 30 (',
          { text: 'Dirección del Trabajo', href: DT_FERIADO_PROPORCIONAL_URL },
          '; ',
          { text: 'Código del Trabajo, art. 73', href: BCN_CODIGO_TRABAJO_URL },
          `). Ejemplo: 6 meses son ${formatDias(e6.diasHabilesTotales)} días hábiles; si el contrato termina el lunes 30-11-2026, son ${formatDias(e6.diasCorridosIndemnizables)} días corridos, es decir ${formatCLP(e6.totalVacaciones)} con un sueldo de $800.000.`,
        ]),
        shortAnswers: [
          {
            question: '¿Si trabajo 6 meses, cuántos días de vacaciones me corresponden?',
            answer: `${formatDias(e6.diasHabilesTotales)} días hábiles (6 × 1,25). Al pagarlos en el finiquito se convierten en días corridos: con término el lunes 30-11-2026 son ${formatDias(e6.diasCorridosIndemnizables)} días, porque se agregan el fin de semana del 5 y 6 de diciembre y el feriado del martes 8. Con $800.000 de sueldo: $800.000 ÷ 30 = ${formatCLP(e6.valorDiaCorrida)} por día × ${formatDias(e6.diasCorridosIndemnizables)} = ${formatCLP(e6.totalVacaciones)}. Si solo se pagaran los días hábiles saldrían ${formatCLP(e6SinFecha.totalVacaciones)}: la DT exige sumar los sábados, domingos y festivos.`,
            sources: [
              { text: 'Dirección del Trabajo, feriado proporcional', href: DT_FERIADO_PROPORCIONAL_URL },
              { text: 'Dirección del Trabajo, ORD. 826/13', href: DT_ORD_826_URL },
            ],
          },
          {
            question: '¿Cuántos días de vacaciones me tocan con 8 meses de trabajo?',
            answer: `${formatDias(e8.diasHabilesTotales)} días hábiles (8 × 1,25). Con término el 30-11-2026 equivalen a ${formatDias(e8.diasCorridosIndemnizables)} días corridos. La DT da un ejemplo oficial: 8 meses y 2 días son 10,08 días hábiles, más 4 inhábiles, o sea 14,08 días corridos.`,
            sources: [
              { text: 'Dirección del Trabajo, feriado proporcional', href: DT_FERIADO_PROPORCIONAL_URL },
            ],
          },
          {
            question: '¿Por qué importa la fecha de término?',
            answer: `Porque los días se cuentan desde el día siguiente al término. Si 6 meses terminan el 31-12-2026, el conteo parte el 1 de enero (feriado) y son ${formatDias(e6Dic.diasCorridosIndemnizables)} días corridos (${formatCLP(e6Dic.totalVacaciones)} con $800.000), en vez de ${formatDias(e6.diasCorridosIndemnizables)}. Además, si una fracción de día no alcanza a caber antes de un fin de semana o festivo, pasa al día hábil siguiente y esos días intermedios también se pagan.`,
            sources: [
              { text: 'Dirección del Trabajo, feriado proporcional', href: DT_FERIADO_PROPORCIONAL_URL },
              { text: 'Dirección del Trabajo, ORD. 826/13', href: DT_ORD_826_URL },
            ],
          },
        ],
        example: {
          caption:
            'Vacaciones proporcionales de 1 a 11 meses, con término el lunes 30-11-2026: días hábiles (1,25 por mes), días corridos con los sábados, domingos y feriados nacionales que caen en el período (incluye el 8-12 y el 25-12), y monto con sueldo ÷ 30 por día corrido. Con otra fecha de término cambian los días corridos. Con 12 meses corresponde el feriado anual completo.',
          headers: [
            'Meses trabajados',
            'Días hábiles',
            'Días corridos',
            `Con ingreso mínimo (${formatCLP(INGRESO_MINIMO.mensual)})`,
            'Con $800.000',
          ],
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
          `). Con el ingreso mínimo de ${formatCLP(t.imm)}, vigente desde el ${t.vigenteDesdeTexto} (`,
          // La ficha BCN enlazada es la de la Ley 21.830; con otra ley, la ficha DT del IMM.
          { text: `Ley ${t.ley}`, href: t.ley === '21.830' ? BCN_LEY_21830_URL : DT_IMM_URL },
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
          // Solo mientras rija el IMM de la Ley 21.830 (01-05-2026); al cargar
          // el IMM de 2027 esta respuesta desaparece y hay que redactar otra.
          ...(t.vigenteDesde === IMM_LEY_21830_DESDE
            ? [
                {
                  question: 'El tope cambia el 1 de enero de 2027',
                  answer: `La Ley 21.830 reajusta el ingreso mínimo desde el 1 de enero de 2027 según la variación del IPC entre el 1 de mayo y el 31 de diciembre de 2026 (art. 1). Para la gratificación del año 2026, que se paga a más tardar en abril de 2027, el tope sigue siendo ${formatCLP(t.anual)}, porque se usa el ingreso mínimo vigente al 31 de diciembre de cada año. El tope de 2027 se calculará con el ingreso mínimo vigente al 31 de diciembre de 2027. Ese monto todavía no se conoce, y además la ley obliga a enviar un proyecto para un nuevo reajuste desde el 1 de julio de 2027 (art. 7). Actualizaremos esta página cuando se publique el valor oficial.`,
                  sources: [
                    { text: 'BCN, Ley 21.830', href: BCN_LEY_21830_URL },
                    {
                      text: 'Dirección del Trabajo, gratificación legal',
                      href: DT_GRATIFICACION_URL,
                    },
                  ],
                },
              ]
            : []),
          {
            question: '¿Si no trabajé el año completo?',
            answer:
              'El tope se aplica en proporción al tiempo trabajado. Pero si estuviste con licencia médica algunos meses, el tope no se reduce.',
            sources: [
              { text: 'Dirección del Trabajo, gratificación legal', href: DT_GRATIFICACION_URL },
            ],
          },
        ],
        example: {
          caption: `12 meses trabajados, ingreso mínimo de ${formatCLP(t.imm)} vigente desde el ${t.vigenteDesdeTexto} (tope mensual ${formatCLP(t.mensual)}). La fila de ${formatCLP(t.umbral)} muestra el sueldo desde el que se llega al tope.`,
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
          descontarCotizaciones: true,
          valorUF: ctx.uf,
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
        lead: 'El impuesto único de segunda categoría se calcula con tramos progresivos sobre la renta líquida imponible mensual (sueldo imponible menos AFP, salud y cesantía) expresada en UTM: el primer tramo, hasta 13,5 UTM, está exento; las tasas marginales van de 4% a 40%.',
        example: {
          caption:
            'Tabla mensual en UTM y 12 meses trabajados. Antes de aplicar la tabla se descuentan AFP Habitat (11,27%), Fonasa 7% y cesantía 0,6% (contrato indefinido), igual que en la calculadora de sueldo líquido. La UTM cambia cada mes, así que los límites en pesos también varían.',
          headers: ['Sueldo bruto mensual', 'Base tributable en UTM', 'Impuesto mensual', 'Tasa efectiva'],
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
      // E-018: todas las cifras salen de la UF del contexto; nunca a mano.
      const uf = ctx.uf;
      const fechaObj = ctx.ufFecha ? new Date(ctx.ufFecha) : null;
      const fecha =
        fechaObj && !Number.isNaN(fechaObj.getTime()) ? formatDDMMYYYY(fechaObj) : '';
      const aPesos = (monto: number) =>
        Math.round(
          calculateUFCLP({ monto, direccion: 'uf-a-clp', valorUF: uf }).montoConvertido,
        );
      const rows = UF_MONTOS_TABLA.map((monto) => [
        `${formatNum(monto, 0)} UF`,
        formatCLP(aPesos(monto)),
      ]);
      const diezMillonesEnUF = calculateUFCLP({
        monto: 10_000_000,
        direccion: 'clp-a-uf',
        valorUF: uf,
      }).montoConvertido;
      const reajuste: QuickAnswerPart[] = [
        ' La UF se reajusta cada día, desde el día 10 de un mes hasta el 9 del mes siguiente, según la variación del IPC del mes anterior (',
        { text: 'metodología del Banco Central', href: BCCH_UF_METODOLOGIA_URL },
        ').',
      ];
      const leadParts: QuickAnswerPart[] =
        ctx.ufFresca && fecha
          ? [
              `Hoy ${fecha} la UF vale ${formatCLP2(uf)}, según el `,
              { text: 'Banco Central de Chile', href: BCCH_INDICADORES_URL },
              `: 1.000 UF son ${formatCLP(aPesos(1_000))}.`,
              ...reajuste,
            ]
          : [
              // Puede ser Mindicador o el snapshot: no se atribuye al Banco Central.
              `Valor de referencia: la UF${fecha ? ` del ${fecha}` : ''} es ${formatCLP2(uf)}. Para una operación, revisa el valor oficial del día en el `,
              { text: 'Banco Central de Chile', href: BCCH_INDICADORES_URL },
              '.',
              ...reajuste,
            ];
      const conLaUF = fecha ? `con la UF del ${fecha}` : `con una UF de ${formatCLP2(uf)}`;
      return {
        h1: 'Conversor UF a pesos: valor de hoy y tabla de montos',
        ...withLinks(leadParts),
        shortAnswers: [
          {
            question: '¿Dónde veo la UF de una fecha pasada?',
            answer:
              'En la tabla oficial de valores diarios de la UF del Servicio de Impuestos Internos, organizada por año y mes, y en la serie histórica del Banco Central de Chile. Para una escritura, un crédito o un contrato, usa siempre el valor del día exacto de la operación.',
            sources: [
              { text: 'SII, valores de la UF 2026', href: SII_UF_URL },
              { text: 'Banco Central, serie de la UF', href: BCCH_UF_SERIE_URL },
            ],
          },
          {
            question: '¿Cuánto son 90 UF en pesos?',
            answer: `${formatCLP(aPesos(90))} ${conLaUF}. Si buscas el tope imponible en pesos, usa la calculadora de tope imponible.`,
            sources: [
              { text: 'Calculadora de tope imponible', href: '/calculadoras/calculadora-tope-imponible-90-uf' },
              { text: 'Banco Central, indicadores diarios', href: BCCH_INDICADORES_URL },
            ],
          },
          {
            question: '¿Cómo convierto pesos a UF?',
            answer: `Divide el monto en pesos por el valor de la UF del día. Por ejemplo, $10.000.000 ÷ ${formatCLP2(uf)} = ${formatNum(diezMillonesEnUF, 2)} UF (con 2 decimales).`,
            sources: [{ text: 'Banco Central, indicadores diarios', href: BCCH_INDICADORES_URL }],
          },
        ],
        example: {
          caption: `Tabla de UF a pesos ${fecha ? `con la UF del ${fecha}: ${formatCLP2(uf)}` : `con una UF de ${formatCLP2(uf)}`}${ctx.ufFresca ? ' (Banco Central de Chile)' : ''}. Montos redondeados al peso. La UF cambia todos los días.`,
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
      // Tabla de jornadas (brief 2026-10-29): montos desde
      // calculateSueldoPartTime; la última fila sigue la jornada vigente.
      const jornadaVigente = getTramoJornadaLegal();
      const proximo = getProximoCambioJornada();
      const jornadas = [18, 20, 25, 30, 36, jornadaVigente.horas];
      const rows = jornadas.map((horas) => {
        const r = calculateSueldoPartTime({ horasSemanales: horas });
        const tipo = r.esJornadaParcial
          ? 'Parcial: mínimo proporcional'
          : r.esJornadaIntermedia
            ? 'Intermedia: mínimo íntegro'
            : 'Completa (vigente)';
        return [`${horas} horas`, tipo, formatCLP(r.minimoLegal), formatCLP(r.valorHora)];
      });
      const cambio = proximo
        ? ` y baja a ${proximo.horas} horas el ${fechaLargaISO(proximo.vigenteDesde)} (Ley 21.561)`
        : ' (Ley 21.561)';
      return {
        h1: 'Sueldo part time 30 horas: mínimo legal y valor hora',
        lead: `Con una jornada de 30 horas o menos, el ingreso mínimo se paga proporcional (${formatCLP(INGRESO_MINIMO.mensual)} × horas ÷ ${JORNADA_LEGAL.actual}). Con más de 30 y menos de ${JORNADA_LEGAL.actual} horas corresponde el mínimo íntegro (${formatCLP(INGRESO_MINIMO.mensual)}).`,
        example: {
          caption: `Mínimo legal y valor hora con el ingreso mínimo de ${formatCLP(INGRESO_MINIMO.mensual)}, vigente desde el ${fechaLargaISO(INGRESO_MINIMO.vigente_desde)} (Ley ${INGRESO_MINIMO.ley}). La jornada completa vigente es de ${jornadaVigente.horas} horas desde el ${fechaLargaISO(jornadaVigente.vigenteDesde)}${cambio}. Hasta 30 horas el mínimo es proporcional; desde 31 y hasta ${jornadaVigente.horas - 1} horas corresponde el mínimo íntegro.`,
          headers: ['Jornada semanal', 'Tipo de jornada', 'Mínimo legal mensual', 'Valor hora'],
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

    case 'licencia-medica': {
      // E-020 (brief 2026-10-29): tabla de 1 a 15 días generada con
      // calculateLicenciaMedica; nunca montos escritos a mano.
      const rows = Array.from({ length: 15 }, (_, i) => {
        const r = calculateLicenciaMedica({
          remuneracionNetaPromedio: LICENCIA_EJEMPLO_NETA,
          diasLicencia: i + 1,
        });
        return [
          `${r.diasLicencia} ${r.diasLicencia === 1 ? 'día' : 'días'}`,
          `${r.diasPagados}`,
          formatCLP(r.totalSubsidio),
        ];
      });
      const base = calculateLicenciaMedica({
        remuneracionNetaPromedio: LICENCIA_EJEMPLO_NETA,
        diasLicencia: 1,
      });
      const pagados = (dias: number) =>
        calculateLicenciaMedica({
          remuneracionNetaPromedio: LICENCIA_EJEMPLO_NETA,
          diasLicencia: dias,
        }).diasPagados;
      return {
        h1: 'Calculadora de licencia médica: cuánto y cuántos días te pagan',
        ...withLinks([
          'Si tu licencia dura 10 días o menos, los 3 primeros días no se pagan: recibes subsidio desde el 4.º día. Si dura 11 días o más, se paga desde el día 1 (',
          { text: 'Dirección del Trabajo', href: DT_LICENCIA_CARENCIA_URL },
          '). Cada día pagado vale 1/30 de tu remuneración neta promedio de los 3 meses anteriores (',
          { text: 'SUSESO', href: SUSESO_SIL_URL },
          '). Lo paga la COMPIN o tu Caja de Compensación si estás en Fonasa, o tu Isapre (',
          { text: 'SUSESO, Compendio', href: SUSESO_QUIEN_PAGA_URL },
          ').',
        ]),
        example: {
          caption: `Días pagados y subsidio estimado con una remuneración neta de ${formatCLP(LICENCIA_EJEMPLO_NETA)} (${formatCLP(Math.round(base.montoDiario))} por día). Con 10 días te pagan ${pagados(10)}; con 11, te pagan ${pagados(11)}.`,
          headers: ['Días de licencia', 'Días pagados', 'Subsidio estimado'],
          rows,
        },
      };
    }

    default:
      return null;
  }
}
