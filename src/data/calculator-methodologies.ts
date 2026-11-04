import type { CalculatorMethodology } from '@/types/calculator';
import { formatCLP } from '@/lib/formatters';
import { topeGratificacion } from '@/lib/values/gratificacion-tope';
import { calculateVacaciones } from '@/lib/calculations/vacaciones';
import { calculateIndemnizacion } from '@/lib/calculations/indemnizacion';
import { INDEMNIZACION } from '@/lib/values/constants';

// E-014: cifras del tope de gratificación generadas desde las constantes.
const TOPE_GRAT = topeGratificacion();

// E-017: ejemplo de vacaciones generado con el cálculo real (ORD. 826/13).
const EJ_VACACIONES = calculateVacaciones({
  sueldoBruto: 600_000,
  mesesTrabajados: 8,
  fechaTermino: '2026-11-30',
});
// E-026: ejemplo de indemnización generado con el cálculo real.
const EJ_IND = calculateIndemnizacion({
  ultimoSueldo: 900_000,
  añosTrabajados: 5,
  mesesTrabajados: 7,
  incluyeGratificacion: false,
});
const fmtDias = (n: number) =>
  n.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

/**
 * Metodologías editoriales por calculadora indexable.
 *
 * Explican el comportamiento existente sin duplicar ni reemplazar la lógica
 * de `src/lib/calculations`. Los ejemplos son didácticos y no actualizan
 * tasas, topes ni valores legales.
 */
export const calculatorMethodologies: Record<string, CalculatorMethodology> = {
  'sueldo-liquido': {
    summary:
      'Parte de la remuneración imponible declarada, descuenta cotizaciones e impuesto y luego incorpora haberes o descuentos no imponibles informados.',
    calculationSteps: [
      'Separa los haberes imponibles de los montos no imponibles.',
      'Aplica AFP, salud y Seguro de Cesantía según las opciones seleccionadas y sus topes.',
      'Calcula el Impuesto Único sobre la base tributable y agrega los demás descuentos.',
      'Resta los descuentos al total de haberes para estimar el líquido.',
    ],
    assumptions: [
      'Los datos corresponden a una liquidación mensual ordinaria.',
      'Las comisiones, bonos y descuentos ingresados están correctamente clasificados.',
    ],
    limitations: [
      'No reemplaza una liquidación emitida por el empleador.',
      'Reliquidaciones, licencias, retroactivos y regímenes especiales pueden cambiar el resultado.',
    ],
    workedExample: {
      title: 'Ejemplo: Sueldo bruto de $1.000.000 en AFP Uno y FONASA (2026)',
      inputs: [
        'Sueldo bruto imponible: $1.000.000',
        'AFP: Uno (10% + 0,46% comisión = 10,46%)',
        'Salud: FONASA (7%)',
        'Contrato: Indefinido (Seguro Cesantía 0,6%)',
      ],
      development: [
        'Descuento AFP: $1.000.000 × 10,46% = $104.600',
        'Descuento Salud: $1.000.000 × 7,00% = $70.000',
        'Seguro de Cesantía: $1.000.000 × 0,60% = $6.000',
        'Total cotizaciones previsionales: $180.600',
        'Base tributable: $1.000.000 - $180.600 = $819.400 (exento de Impuesto Único)',
      ],
      result: 'Sueldo líquido estimado a percibir: $819.400.',
    },
  },
  finiquito: {
    summary:
      'Desglosa pagos pendientes, feriado e indemnizaciones según causal y antecedentes ingresados, sin decidir si la causal es jurídicamente correcta.',
    calculationSteps: [
      'Estima remuneración pendiente del último mes.',
      'Calcula feriado legal, proporcional y acumulado declarado.',
      'Determina aviso previo e indemnización por años cuando la causal seleccionada los contempla.',
      'Aplica recargos o ajustes informados y suma los componentes.',
    ],
    assumptions: [
      'La última remuneración y los años de servicio fueron declarados correctamente.',
      'La causal seleccionada representa la comunicación formal del empleador.',
    ],
    limitations: [
      'No valida cotizaciones, reserva de derechos ni legalidad del despido.',
      'Bonos variables, AFC, topes y convenios pueden requerir revisión documental.',
    ],
    workedExample: {
      title: 'Ejemplo: Despido por Necesidades de la Empresa (3 años de servicio)',
      inputs: [
        'Última remuneración mensual: $800.000',
        'Antigüedad: 3 años completos',
        'Causal: Necesidades de la Empresa (Art. 161 Código del Trabajo)',
        'Término del contrato: viernes 16-10-2026',
        'Vacaciones pendientes: 10 días hábiles = 14 días corridos (17 al 30-10-2026)',
        'Aviso previo: No avisado con 30 días de anticipación',
      ],
      development: [
        'Indemnización por años de servicio: 3 años × $800.000 = $2.400.000',
        'Indemnización sustitutiva de aviso previo: 1 mes = $800.000',
        'Feriado pendiente: los 10 días hábiles se cuentan desde el sábado 17-10-2026, el día siguiente al término, sumando sábados, domingos y festivos (Dirección del Trabajo, https://www.dt.gob.cl/portal/1628/w3-article-60200.html). Llegan hasta el viernes 30-10-2026 y no hay festivos en ese período: 14 días corridos. (14 / 30) × $800.000 = $373.333',
        'Total bruto del finiquito: $2.400.000 + $800.000 + $373.333',
      ],
      result: 'Total estimado del finiquito: $3.573.333 (las indemnizaciones no tributan).',
    },
  },
  'uf-clp': {
    summary:
      'Convierte entre UF y pesos multiplicando o dividiendo por el valor de UF disponible para la consulta.',
    calculationSteps: [
      'Obtiene el valor de referencia de la UF desde el proveedor disponible o su respaldo local.',
      'Multiplica las UF por ese valor para convertir a CLP, o divide los CLP para convertir a UF.',
      'Redondea el resultado solo para presentarlo en el formato elegido.',
    ],
    assumptions: ['La fecha de conversión coincide con el valor de UF mostrado.'],
    limitations: [
      'Contratos y escrituras pueden exigir el valor de una fecha distinta.',
      'El resultado no incluye comisiones, intereses ni reajustes contractuales adicionales.',
    ],
  },
  iva: {
    summary:
      'Separa neto, IVA y total usando la tasa general del 19% según si el monto ingresado incluye o excluye el impuesto.',
    calculationSteps: [
      'Si el monto es neto, calcula IVA como neto × 19%.',
      'Si el monto incluye IVA, obtiene el neto dividiendo el total por 1,19.',
      'Presenta neto, impuesto y total con redondeo a pesos.',
    ],
    assumptions: ['La operación está afecta a la tasa general de IVA del 19%.'],
    limitations: [
      'No determina si una venta o servicio está exento o no gravado.',
      'No calcula crédito fiscal, débito fiscal mensual ni declaración F29.',
    ],
    workedExample: {
      title: 'Ejemplo: precio neto de $100.000',
      inputs: ['Monto neto: $100.000', 'Tipo: agregar IVA'],
      development: ['IVA = $100.000 × 19% = $19.000', 'Total = $100.000 + $19.000'],
      result: 'Total referencial: $119.000.',
    },
  },
  'horas-extra': {
    summary:
      'Obtiene el valor de la hora ordinaria desde sueldo y jornada, y aplica el recargo declarado a las horas extraordinarias.',
    calculationSteps: [
      'Convierte la remuneración mensual en valor de hora ordinaria según la jornada informada.',
      'Aplica el recargo legal o personalizado seleccionado.',
      'Multiplica el valor extraordinario por la cantidad de horas.',
      'Muestra, cuando se solicita, impacto previsional y referencias de límite.',
    ],
    assumptions: ['Las horas informadas fueron autorizadas y registradas como extraordinarias.'],
    limitations: [
      'No valida pactos, controles de asistencia ni excepciones de jornada.',
      'Remuneraciones variables y recargos especiales pueden exigir otra base.',
    ],
    workedExample: {
      title: 'Ejemplo: 10 horas extra con jornada legal de 42 horas (Ley 40 Horas)',
      inputs: [
        'Sueldo base mensual: $700.000',
        'Jornada laboral: 42 horas semanales (vigente en Chile desde abril 2026)',
        'Horas extraordinarias: 10 horas con 50% de recargo legal',
      ],
      development: [
        'Factor valor hora (jornada 42h DT): 0,0079365',
        'Valor hora extraordinaria al 50%: $700.000 × 0,0079365 = $5.556 por hora',
        'Total a pagar: 10 horas × $5.556 = $55.556',
      ],
      result: 'Monto total a percibir por 10 horas extra: $55.556 brutos imponibles.',
    },
  },
  'vacaciones-proporcionales': {
    summary:
      'Estima días y remuneración de feriado proporcional según tiempo trabajado, días pendientes y remuneración declarada.',
    calculationSteps: [
      'Convierte el período trabajado en días proporcionales de feriado.',
      'Suma feriado pendiente o progresivo informado.',
      'Transforma días hábiles a la secuencia calendario cuando corresponde.',
      'Valoriza los días con la remuneración diaria aplicable.',
      'Si una fracción de día no cabe antes de un sábado, domingo o festivo, pasa al día hábil siguiente y los días intermedios se pagan (DT, ORD. 826/13).',
    ],
    assumptions: ['Las fechas y días pendientes ingresados son completos y no duplicados.'],
    limitations: [
      'No reconstruye asistencia, licencias ni feriados ya utilizados.',
      'La remuneración variable puede requerir antecedentes de meses anteriores.',
      'Solo considera feriados nacionales; no incluye feriados regionales ni extraordinarios.',
    ],
    workedExample: {
      title: 'Ejemplo: 8 meses trabajados con término el lunes 30-11-2026',
      inputs: [
        'Sueldo base mensual: $600.000',
        'Meses trabajados desde el último feriado: 8',
        'Fecha de término: 30-11-2026',
        'Feriado pendiente de períodos anteriores: 0 días',
      ],
      development: [
        'Factor legal: 1,25 días hábiles por mes (15 ÷ 12).',
        `Días hábiles: 8 × 1,25 = ${fmtDias(EJ_VACACIONES.diasHabilesTotales)}.`,
        `Conteo desde el 01-12-2026: se agregan 2 fines de semana y el feriado del 08-12, lo que da ${fmtDias(EJ_VACACIONES.diasCorridosIndemnizables)} días corridos.`,
        `Valor diario: $600.000 ÷ 30 = ${formatCLP(EJ_VACACIONES.valorDiaCorrida)}.`,
        `Monto: ${fmtDias(EJ_VACACIONES.diasCorridosIndemnizables)} × ${formatCLP(EJ_VACACIONES.valorDiaCorrida)} = ${formatCLP(EJ_VACACIONES.totalVacaciones)}.`,
      ],
      result: `Indemnización por feriado proporcional: ${formatCLP(EJ_VACACIONES.totalVacaciones)}.`,
    },
  },
  'boleta-honorarios': {
    summary:
      'Calcula bruto, retención y líquido de una boleta según año y opciones declaradas, diferenciando retención de cotizaciones.',
    calculationSteps: [
      'Selecciona la tasa de retención correspondiente al año informado.',
      'Aplica la tasa al monto bruto o reconstruye el bruto desde el líquido.',
      'Presenta retención, líquido y desgloses opcionales solicitados.',
    ],
    assumptions: ['El documento corresponde a una boleta de honorarios electrónica chilena.'],
    limitations: [
      'La retención no equivale al impuesto anual definitivo.',
      'No determina obligación de cotizar, cobertura parcial ni resultado de Operación Renta.',
    ],
    workedExample: {
      title: 'Ejemplo: Boleta de honorarios bruta de $500.000 con retención 15,25% (2026)',
      inputs: [
        'Monto bruto de la boleta: $500.000',
        'Año de emisión: 2026 (tasa legal de retención 15,25% según Ley 21.133)',
      ],
      development: [
        'Retención legal SII (15,25%): $500.000 × 15,25% = $76.250',
        'Monto líquido a recibir: $500.000 - $76.250 = $423.750',
        'Cálculo inverso (para recibir $500.000 líquido): Bruto = $500.000 / 0,8475 = $589.971',
      ],
      result: 'Monto líquido a transferir: $423.750 (con $76.250 retenidos para el SII).',
    },
  },
  'utm-clp': {
    summary:
      'Convierte UTM a pesos o pesos a UTM usando el valor mensual disponible para la consulta.',
    calculationSteps: [
      'Obtiene el valor de referencia mensual de la UTM.',
      'Multiplica la cantidad de UTM por ese valor, o divide los pesos por él.',
      'Formatea el resultado en CLP o UTM sin alterar el valor fuente.',
    ],
    assumptions: ['El mes aplicable coincide con la UTM mostrada en la herramienta.'],
    limitations: [
      'Multas y obligaciones pueden usar la UTM del mes de pago, infracción o liquidación.',
      'No agrega intereses, reajustes ni recargos.',
    ],
    workedExample: {
      title: 'Ejemplo con dos UTM',
      inputs: ['Cantidad: 2 UTM', 'Valor mensual mostrado: V'],
      development: ['Pesos = 2 × V'],
      result: 'El resultado equivale al doble del valor UTM mostrado para ese mes.',
    },
  },
  'gratificacion-legal': {
    summary: 'Compara los sistemas declarados para estimar gratificación legal y topes aplicables.',
    calculationSteps: [
      'Identifica el sistema del artículo 47 o del artículo 50 seleccionado.',
      'Calcula la proporción sobre utilidades o el porcentaje de remuneraciones según corresponda.',
      'Aplica el tope legal cuando el sistema lo requiere.',
      'Presenta monto anual y equivalencia periódica disponible.',
      'El tope usa el ingreso mínimo vigente al 31 de diciembre del año (DT).',
    ],
    assumptions: [
      'La empresa está obligada a gratificar y los datos contables ingresados son correctos.',
    ],
    limitations: [
      'No determina si existe utilidad líquida ni obligación empresarial.',
      'Anticipos, jornadas parciales y períodos incompletos requieren liquidación real.',
    ],
    workedExample: {
      title: 'Ejemplo: Gratificación con tope 4,75 Ingresos Mínimos Mensuales (IMM)',
      inputs: [
        'Sueldo base mensual: $700.000',
        `Ingreso mínimo (IMM): ${formatCLP(TOPE_GRAT.imm)} (vigente desde el ${TOPE_GRAT.vigenteDesdeTexto}, Ley ${TOPE_GRAT.ley})`,
        'Modalidad: Artículo 50 del Código del Trabajo (25% del sueldo con tope anual)',
      ],
      development: [
        'Cálculo del 25% del sueldo: $700.000 × 25% = $175.000 al mes.',
        `Tope anual del art. 50: 4,75 × ${formatCLP(TOPE_GRAT.imm)} = ${formatCLP(TOPE_GRAT.anual)} al año.`,
        `Tope mensual del art. 50: ${formatCLP(TOPE_GRAT.anual)} ÷ 12 = ${formatCLP(TOPE_GRAT.mensual)} al mes.`,
        `Comparación: como $175.000 es menor que el tope (${formatCLP(TOPE_GRAT.mensual)}), corresponde el monto íntegro.`,
      ],
      result: 'Gratificación legal mensual a pagar: $175.000.',
    },
  },
  'indemnizacion-anos-servicio': {
    summary:
      'Estima la indemnización por años de servicio, la sustitutiva del aviso previo y el recargo que declararía un juez, desde la remuneración mensual, la antigüedad y la causal.',
    calculationSteps: [
      'Suma los pagos mensuales que entran en la base (sueldo, gratificación mensual, comisiones, bonos mensuales, colación y movilización) y aplica el tope en UF del art. 172.',
      'Cuenta los años indemnizables: desde el primer año, la fracción superior a seis meses suma un año, con el tope de años del art. 163.',
      'Multiplica la base diaria (base ÷ 30) por los días que corresponden a esos años.',
      'Agrega la sustitutiva del aviso previo si no hubo aviso de 30 días, y el recargo solo si se simula una sentencia.',
    ],
    assumptions: [
      'La causal declarada es la que figura en la carta de despido.',
      'El tope en UF se estima con la UF de hoy; la ley usa la del último día del mes anterior al pago.',
    ],
    limitations: [
      'No decide la procedencia de la causal ni de un recargo: eso lo resuelve un juez.',
      'No incluye indemnizaciones pactadas en el contrato o en un contrato colectivo, ni el régimen sin tope de años de quienes fueron contratados antes del 14-08-1981.',
      'La composición de la última remuneración puede requerir revisar liquidaciones y contrato.',
    ],
    workedExample: {
      title: 'Ejemplo: 5 años y 7 meses de antigüedad con remuneración de $900.000',
      inputs: [
        'Última remuneración mensual: $900.000 (bajo el tope en UF)',
        'Tiempo trabajado: 5 años y 7 meses',
        'Causal: art. 161 (necesidades de la empresa), con aviso de 30 días',
      ],
      development: [
        'Regla legal de fracción superior a seis meses: 7 meses cuentan como 1 año adicional.',
        `Años computables: ${EJ_IND.añosIndemnizables} (dentro del tope legal de ${INDEMNIZACION.tope_años} años).`,
        `Cálculo: $900.000 ÷ 30 × ${EJ_IND.diasIndemnizacion} días.`,
      ],
      result: `Indemnización legal por años de servicio: ${formatCLP(EJ_IND.indemnizacionTotal)}. Por ser legal, no constituye renta para el SII.`,
    },
  },
  'pension-alimenticia': {
    summary:
      'Estima un rango o monto desde ingresos, cargas y porcentaje declarado, respetando los límites configurados en la herramienta.',
    calculationSteps: [
      'Identifica ingreso base y número de alimentarios informado.',
      'Aplica el porcentaje o regla seleccionada.',
      'Compara el resultado con mínimos y máximos configurados.',
      'Presenta la estimación y su equivalencia mensual.',
    ],
    assumptions: ['Los ingresos y cargas declarados representan la situación actual.'],
    limitations: [
      'Solo un tribunal o acuerdo aprobado fija la pensión exigible.',
      'Necesidades especiales, capacidad económica y deudas anteriores no se resuelven con una fórmula general.',
    ],
  },
  'reajuste-arriendo': {
    summary: 'Reajusta una renta según la variación o unidad pactada que el usuario selecciona.',
    calculationSteps: [
      'Toma la renta base y el mecanismo contractual informado.',
      'Aplica variación de IPC, conversión UF u otro porcentaje declarado.',
      'Compara renta anterior y reajustada y muestra la diferencia.',
    ],
    assumptions: ['El contrato autoriza el mecanismo y la periodicidad seleccionados.'],
    limitations: [
      'No interpreta cláusulas ambiguas ni autoriza aumentos no pactados.',
      'La fecha exacta del índice o UF puede cambiar el monto.',
    ],
  },
  'permiso-circulacion': {
    summary:
      'Estima el permiso desde tasación fiscal, tipo y antecedentes del vehículo usando la tabla implementada.',
    calculationSteps: [
      'Identifica la categoría y tasación fiscal declaradas.',
      'Ubica el tramo o regla correspondiente al vehículo.',
      'Aplica la tasa o monto base configurado.',
      'Presenta el total estimado antes de multas, seguros u otros cobros externos.',
    ],
    assumptions: ['La tasación y características coinciden con el registro oficial del vehículo.'],
    limitations: [
      'La municipalidad determina el monto exigible y eventuales diferencias.',
      'No incorpora SOAP, multas impagas, intereses ni cargos de plataforma.',
    ],
    workedExample: {
      title: 'Ejemplo de lectura del cálculo',
      inputs: ['Tasación fiscal informada por el usuario', 'Tipo y antigüedad del vehículo'],
      development: [
        'La herramienta ubica esos antecedentes en la regla de cálculo correspondiente.',
        'Luego aplica el tramo antes de cualquier cobro municipal adicional.',
      ],
      result:
        'El monto mostrado es una estimación base; debe contrastarse con el portal municipal.',
    },
  },
  'costo-empleado-pyme': {
    summary:
      'Suma remuneración bruta y costos de cargo del empleador para estimar el costo mensual de contratación.',
    calculationSteps: [
      'Parte del sueldo imponible y haberes declarados.',
      'Calcula cotizaciones y seguros de cargo empresarial.',
      'Agrega beneficios o costos adicionales informados.',
      'Suma los componentes y compara costo empresa con sueldo bruto.',
    ],
    assumptions: ['La relación es laboral dependiente y los beneficios ingresados son mensuales.'],
    limitations: [
      'No incluye reemplazos, ausentismo, indemnizaciones ni costos administrativos.',
      'Tasas especiales por actividad o mutualidad pueden variar.',
    ],
  },
  'credito-hipotecario': {
    summary:
      'Simula un dividendo mediante amortización financiera desde monto, pie, plazo y tasa declarados.',
    calculationSteps: [
      'Resta el pie al valor financiado.',
      'Convierte la tasa anual a la periodicidad usada por la simulación.',
      'Calcula la cuota de capital e interés para el plazo informado.',
      'Convierte UF a pesos con el valor disponible y genera desgloses opcionales.',
    ],
    assumptions: ['La tasa y el valor UF ingresados permanecen constantes en la simulación.'],
    limitations: [
      'No constituye una oferta ni incorpora necesariamente CAE, seguros y gastos operacionales.',
      'La aprobación depende de evaluación comercial, renta y políticas de la institución.',
    ],
    workedExample: {
      title: 'Ejemplo: Crédito de 2.000 UF a 25 años con tasa 4,5% anual',
      inputs: [
        'Monto financiado: 2.000 UF (aprox. $78.000.000)',
        'Plazo: 25 años (300 dividendos mensuales)',
        'Tasa de interés anual: 4,50%',
      ],
      development: [
        'Dividendo mensual base (capital + interés): 11,12 UF.',
        'Seguros obligatorios estimados (desgravamen e incendio/sismo): 0,85 UF.',
        'Dividendo total mensual en UF: 11,97 UF.',
        'Conversión referencial a pesos (UF $39.000): 11,97 × $39.000 = $466.830 al mes.',
      ],
      result: 'Dividendo mensual estimado: 11,97 UF (aprox. $466.830 al mes).',
    },
  },
  'operacion-renta': {
    summary:
      'Estima diferencias anuales entre ingresos, retenciones y conceptos tributarios declarados.',
    calculationSteps: [
      'Agrupa ingresos y retenciones del año seleccionado.',
      'Aplica los parámetros configurados para la situación informada.',
      'Compara obligación estimada con pagos provisionales o retenciones.',
      'Muestra una posible devolución o saldo por pagar.',
    ],
    assumptions: ['Los antecedentes ingresados incluyen todos los ingresos relevantes del año.'],
    limitations: [
      'No reemplaza la propuesta ni declaración del SII.',
      'Créditos, rebajas, cotizaciones y rentas especiales pueden cambiar el resultado.',
    ],
  },
  contribuciones: {
    summary: 'Estima contribuciones desde avalúo fiscal, destino y exenciones declaradas.',
    calculationSteps: [
      'Determina la base afecta desde el avalúo y monto exento aplicable.',
      'Aplica la tasa o tramo configurado según destino.',
      'Calcula cuota estimada y total anual.',
    ],
    assumptions: ['Avalúo, destino y condición de exención coinciden con la información del SII.'],
    limitations: [
      'No incluye sobretasas, aseo municipal ni diferencias por copropiedad.',
      'El giro oficial del SII prevalece sobre esta estimación.',
    ],
  },
  'costo-notaria': {
    summary: 'Suma aranceles y actuaciones seleccionadas para aproximar un costo notarial.',
    calculationSteps: [
      'Identifica trámite, cuantía y copias declaradas.',
      'Aplica los valores o rangos configurados por actuación.',
      'Suma componentes y presenta un total referencial.',
    ],
    assumptions: ['El trámite seleccionado representa todas las actuaciones necesarias.'],
    limitations: [
      'Las notarías pueden cobrar valores distintos dentro del marco aplicable.',
      'No incluye conservador, impuestos, certificados ni asesoría jurídica.',
    ],
  },
  plusvalia: {
    summary:
      'Compara valor de adquisición y venta para estimar mayor valor antes de su tratamiento tributario.',
    calculationSteps: [
      'Actualiza o toma el costo declarado según las opciones disponibles.',
      'Resta costo y gastos admitidos al precio de venta.',
      'Compara el mayor valor con límites o régimen seleccionado.',
      'Presenta base e impuesto estimados.',
    ],
    assumptions: ['Los valores y fechas ingresados corresponden al mismo inmueble y propietario.'],
    limitations: [
      'No determina habitualidad, partes relacionadas ni costo tributario aceptado por el SII.',
      'Una compraventa real requiere revisar escritura, mejoras y antecedentes fiscales.',
    ],
  },
  'subsidio-habitacional': {
    summary:
      'Orienta sobre compatibilidad preliminar entre ahorro, vivienda y tramo de subsidio seleccionado.',
    calculationSteps: [
      'Compara ahorro y características del hogar con parámetros declarados.',
      'Contrasta el valor de vivienda con límites del programa.',
      'Estima aporte propio, subsidio y financiamiento faltante.',
    ],
    assumptions: ['Los antecedentes socioeconómicos y de ahorro están vigentes.'],
    limitations: [
      'No verifica RSH, núcleo familiar, llamados regionales ni documentos.',
      'La selección y el monto definitivo corresponden a MINVU o SERVIU.',
    ],
  },
  'patente-comercial': {
    summary:
      'Estima patente municipal desde capital propio tributario, comuna y período declarados.',
    calculationSteps: [
      'Toma el capital propio tributario informado.',
      'Aplica la tasa municipal seleccionada dentro del marco configurado.',
      'Compara con mínimos o máximos aplicables.',
      'Divide el total según la periodicidad mostrada.',
    ],
    assumptions: ['El capital declarado es el que corresponde informar a la municipalidad.'],
    limitations: [
      'Cada municipalidad determina tasa, derechos y antecedentes exigidos.',
      'Sucursales, sociedades de inversión y distribución de capital requieren revisión específica.',
    ],
    workedExample: {
      title: 'Ejemplo: PYME con Capital Propio de $30.000.000 y tasa comunal 0,5%',
      inputs: [
        'Capital Propio Tributario (CPT): $30.000.000',
        'Tasa municipal: 0,5% (0,005 sobre el CPT)',
        'Mínimo legal: 1 UTM · Máximo legal: 8.000 UTM (Ley de Rentas Municipales)',
      ],
      development: [
        'Cálculo valor anual: $30.000.000 × 0,5% = $150.000.',
        'Verificación de límites: $150.000 supera 1 UTM (aprox. $68.000) y está bajo 8.000 UTM.',
        'Pago en dos cuotas semestrales: $150.000 / 2 = $75.000 cada cuota.',
      ],
      result: 'Patente comercial anual: $150.000 (pagadera en 2 cuotas de $75.000 en julio y enero).',
    },
  },
  'comparador-afp': {
    summary:
      'Compara el costo de comisión AFP sobre una remuneración imponible y proyecta diferencias simples.',
    calculationSteps: [
      'Aplica la comisión configurada de cada AFP a la base imponible.',
      'Calcula descuento mensual y diferencia frente a la AFP actual.',
      'Proyecta la diferencia al período informado sin predecir rentabilidad.',
    ],
    assumptions: ['La remuneración imponible se mantiene constante para la comparación.'],
    limitations: [
      'Una comisión menor no garantiza mayor pensión ni rentabilidad.',
      'No evalúa fondos, riesgo, servicio ni situación previsional individual.',
    ],
  },
  'simulador-apv': {
    summary: 'Proyecta ahorro previsional voluntario desde aporte, plazo y rentabilidad supuesta.',
    calculationSteps: [
      'Convierte aporte y plazo a períodos de acumulación.',
      'Capitaliza cada aporte con la rentabilidad declarada.',
      'Separa aportes de ganancia estimada y muestra el saldo final.',
    ],
    assumptions: ['Aportes y rentabilidad permanecen constantes durante toda la proyección.'],
    limitations: [
      'La rentabilidad futura no está garantizada.',
      'No incorpora comisiones, cambios tributarios, retiros ni perfil de riesgo.',
    ],
  },
  'intereses-mora': {
    summary: 'Calcula interés por atraso desde capital, tasa y días de mora declarados.',
    calculationSteps: [
      'Determina capital sujeto a interés.',
      'Convierte la tasa al período diario o mensual usado por la herramienta.',
      'Aplica la tasa por los días informados y suma el recargo al capital.',
    ],
    assumptions: ['La tasa ingresada es la aplicable a la obligación y período.'],
    limitations: [
      'No valida tasa máxima convencional ni cláusulas contractuales.',
      'Gastos de cobranza, reajustes y pagos parciales pueden alterar la deuda.',
    ],
  },
  'asignacion-familiar': {
    summary:
      'Estima asignación familiar desde ingreso promedio, tramo y número de cargas acreditadas.',
    calculationSteps: [
      'Ubica el ingreso declarado en el tramo configurado.',
      'Obtiene el monto por carga de ese tramo.',
      'Multiplica por las cargas informadas y muestra el total.',
    ],
    assumptions: ['Todas las cargas están reconocidas y vigentes para el período.'],
    limitations: [
      'No acredita causantes ni determina el tramo oficial.',
      'Pagos retroactivos y promedios de ingresos requieren validación de la entidad administradora.',
    ],
  },
  'credito-cae': {
    summary: 'Simula cuota y costo del CAE desde saldo, tasa, plazo y condiciones declaradas.',
    calculationSteps: [
      'Toma el saldo financiado y la tasa ingresada.',
      'Calcula la cuota financiera para el plazo seleccionado.',
      'Compara la cuota con opciones de rebaja o suspensión cuando se solicitan.',
      'Muestra costo total estimado.',
    ],
    assumptions: ['Saldo, tasa y estado de pago fueron informados correctamente.'],
    limitations: [
      'No consulta deuda bancaria, TGR ni Comisión Ingresa.',
      'Beneficios, mora, reprogramaciones y cobranza deben verificarse en canales oficiales.',
    ],
  },
  'credito-automotriz': {
    summary: 'Simula una cuota fija desde precio, pie, tasa y plazo, separando capital e interés.',
    calculationSteps: [
      'Resta el pie al precio para obtener el capital financiado.',
      'Convierte la tasa a tasa mensual.',
      'Aplica la fórmula de anualidad al número de cuotas.',
      'Suma cuotas y pie para mostrar costo financiero estimado.',
    ],
    assumptions: ['La tasa permanece fija y no existe cuota final distinta.'],
    limitations: [
      'No incluye necesariamente seguros, impuestos, comisiones ni gastos operacionales.',
      'La CAE y el costo total de una oferta real pueden ser superiores.',
    ],
    workedExample: {
      title: 'Ejemplo: financiar $8.000.000',
      inputs: [
        'Precio: $10.000.000',
        'Pie: $2.000.000',
        'Plazo: 24 meses',
        'Tasa mensual ilustrativa: 1%',
      ],
      development: [
        'Capital financiado = $10.000.000 − $2.000.000 = $8.000.000',
        'Cuota financiera = P × r × (1+r)^n ÷ ((1+r)^n − 1)',
      ],
      result: 'Cuota financiera aproximada: $376.600, antes de seguros y cargos.',
    },
  },
  'multas-transito': {
    summary:
      'Convierte una multa expresada en UTM y aplica el descuento declarado cuando corresponde.',
    calculationSteps: [
      'Toma el rango o cantidad de UTM informado.',
      'Multiplica por el valor UTM disponible para el mes.',
      'Aplica el porcentaje de descuento seleccionado.',
      'Presenta monto original, descuento y total estimado.',
    ],
    assumptions: [
      'La infracción y el descuento seleccionados corresponden a la resolución aplicable.',
    ],
    limitations: [
      'El tribunal determina cuantía, beneficio y plazo de pago.',
      'No consulta causas, anotaciones, reincidencia ni intereses.',
    ],
    workedExample: {
      title: 'Ejemplo: multa de 1,5 UTM con 25% de descuento',
      inputs: ['Multa base: 1,5 UTM', 'Descuento ilustrativo: 25%'],
      development: [
        'Monto rebajado = 1,5 × (1 − 0,25) = 1,125 UTM',
        'CLP = 1,125 × valor UTM mostrado',
      ],
      result: 'El pago estimado equivale a 1,125 UTM del mes aplicable.',
    },
  },
  'cuenta-luz': {
    summary: 'Estima una cuenta desde consumo eléctrico y cargos unitarios ingresados.',
    calculationSteps: [
      'Multiplica los kWh consumidos por el precio unitario declarado.',
      'Agrega cargo fijo y otros componentes disponibles.',
      'Suma los conceptos para mostrar el total estimado.',
    ],
    assumptions: [
      'La lectura y las tarifas ingresadas corresponden al mismo período y distribuidora.',
    ],
    limitations: [
      'No descarga la tarifa de la empresa ni valida la boleta.',
      'Subsidios, franjas, reliquidaciones, impuestos y cargos regulados pueden variar.',
    ],
    workedExample: {
      title: 'Ejemplo ilustrativo de consumo',
      inputs: ['Consumo: 180 kWh', 'Precio ingresado: $180/kWh', 'Cargo fijo ingresado: $1.500'],
      development: ['Energía = 180 × $180 = $32.400', 'Subtotal = $32.400 + $1.500'],
      result: 'Estimación simple: $33.900 antes de otros cargos de la boleta.',
    },
  },
  'impuesto-segunda-categoria': {
    summary:
      'Descuenta las cotizaciones obligatorias del sueldo imponible y aplica la tabla mensual del Impuesto Único a esa renta líquida imponible.',
    calculationSteps: [
      'Resta al sueldo imponible AFP (10% + comisión), salud (7%) y seguro de cesantía (0,6%), con topes de 90 UF y 135,2 UF, igual que la calculadora de sueldo líquido.',
      'Expresa la base tributable en UTM del mes y la ubica en el tramo correspondiente.',
      'Aplica factor y rebaja del tramo.',
      'Muestra impuesto mensual, anual y tasa efectiva sobre el sueldo bruto.',
    ],
    assumptions: [
      'La base corresponde a una remuneración mensual afecta al Impuesto Único.',
      'Cotizaciones de referencia: AFP Habitat (11,27%), Fonasa 7% y contrato indefinido (cesantía 0,6%). Otra AFP o un plan de Isapre cambian levemente la base; para tu caso exacto usa la calculadora de sueldo líquido.',
    ],
    limitations: [
      'No realiza reliquidación anual ni combina varios empleadores.',
      'Bonos retroactivos, rentas accesorias y créditos pueden cambiar el impuesto.',
    ],
  },
  ppm: {
    summary:
      'Calcula un pago provisional mensual aplicando la tasa declarada a los ingresos del período.',
    calculationSteps: [
      'Toma los ingresos netos o base informada.',
      'Convierte la tasa porcentual a factor decimal.',
      'Multiplica la base por la tasa y presenta el PPM estimado.',
    ],
    assumptions: ['La tasa ingresada es la que corresponde al contribuyente y período.'],
    limitations: [
      'No determina automáticamente la tasa obligatoria ni el régimen tributario.',
      'El PPM es un anticipo y no equivale al impuesto anual definitivo.',
    ],
    workedExample: {
      title: 'Ejemplo: PPM de 0,25%',
      inputs: ['Ingresos base: $1.000.000', 'Tasa informada: 0,25%'],
      development: ['PPM = $1.000.000 × 0,0025'],
      result: 'PPM estimado: $2.500.',
    },
  },
  'bono-bodas-oro': {
    summary:
      'Verifica los requisitos del Bono Bodas de Oro (Ley 20.506) y muestra el monto vigente según la fecha de referencia.',
    calculationSteps: [
      'Comprueba que los años de matrimonio sean exactamente 50: el plazo para solicitar es de un año desde el 50º aniversario.',
      'Verifica los demás requisitos declarados: 80% más vulnerable según RSH, convivencia sin separación ni divorcio, y residencia en Chile 4 de los últimos 5 años.',
      'Aplica el monto vigente a la fecha del calendario publicado (reajuste de 100% del IPC cada octubre).',
      'En viudez dentro del plazo, muestra la parte propia y la parte del cónyuge fallecido a la que se puede optar.',
    ],
    assumptions: [
      'Las respuestas sobre RSH, convivencia y residencia reflejan la situación real acreditable.',
      'La solicitud se realiza dentro del año siguiente al 50º aniversario.',
    ],
    limitations: [
      'No consulta el Registro Social de Hogares ni acredita antecedentes ante el IPS.',
      'El monto mostrado corresponde al publicado por ChileAtiende/IPS; el pago efectivo lo determina el IPS al momento de la solicitud.',
    ],
    workedExample: {
      title: 'Ejemplo: matrimonio que cumple 50 años (desde oct-2026)',
      inputs: [
        'Años de matrimonio: 50',
        'Ambos cónyuges vivos y sin separación',
        '80% más vulnerable RSH y residencia 4/5 años: sí',
      ],
      development: [
        'Monto vigente desde 1-oct-2026: $241.147 por cónyuge',
        'Total matrimonio = $241.147 × 2',
      ],
      result: 'Bono único estimado: $482.295 para el matrimonio.',
    },
  },
  'aporte-familiar-permanente': {
    summary:
      'Multiplica $66.834 por cada carga con derecho a SUF/Asignación Familiar o Maternal al 31-12-2025; si no hay cargas y el grupo estaba en Chile Solidario/SSyOO, un solo aporte.',
    calculationSteps: [
      'Cuenta las cargas que al 31-12-2025 daban derecho a SUF, Subsidio Maternal o Asignación Familiar/Maternal.',
      'Si hay cargas y la madre recibe SUF por hijos menores de 18 que viven con ella, suma un aporte adicional para ella.',
      'Si no hay cargas pero el grupo familiar pertenecía a Chile Solidario o SSyOO al 31-12-2025, corresponde un aporte por el grupo.',
      'Multiplica el número de aportes por $66.834.',
    ],
    assumptions: [
      'Las cargas declaradas efectivamente daban derecho al beneficio al 31-12-2025 y el pago de cargas está al día.',
    ],
    limitations: [
      'No verifica la situación en el Registro Social de Hogares ni la emisión real del documento de pago.',
      'Tener cargas y además grupo SSyOO no duplica el aporte: corresponde solo por cada carga.',
    ],
    workedExample: {
      title: 'Ejemplo: 2 cargas con grupo en Seguridades y Oportunidades',
      inputs: [
        'Cargas al 31-12-2025: 2',
        'Grupo en Chile Solidario/SSyOO: sí',
      ],
      development: [
        'En ambos casos el aporte se paga solo por cada carga: 2 × $66.834',
      ],
      result: 'Aporte total estimado: $133.668.',
    },
  },
  'seguro-cesantia': {
    summary:
      'Estima los pagos de la Cuenta Individual de Cesantía (hasta 13, decrecientes) y del Fondo de Cesantía Solidario (5 pagos con piso y tope, financiando primero el saldo).',
    calculationSteps: [
      'Verifica cotizaciones mínimas de la CIC (10 si indefinido, 5 si plazo fijo).',
      'Si hay saldo informado, aplica 70/60/45/40/35/30…% del promedio hasta agotarlo o llegar a 13 pagos.',
      'Si el saldo no cubre 5 pagos y se cumplen los requisitos del FCS (causal con derecho, 10 cotizaciones en 24 meses, últimas 3 continuas), aplica los 5 pagos con mínimos y máximos vigentes al 28-02-2027.',
      'Reparte cada pago FCS entre saldo CIC (primero) y complemento del Fondo.',
    ],
    assumptions: [
      'El promedio declarado corresponde a las últimas 10 remuneraciones (indefinido) o 5 (plazo fijo/obra).',
      'Las cotizaciones declaradas están efectivamente pagadas y continuas según lo indicado.',
    ],
    limitations: [
      'No consulta el saldo real de la cuenta individual en la AFC ni la inscripción en la Bolsa Nacional de Empleo.',
      'No calcula los hasta 2 pagos extraordinarios del FCS que solo operan cuando el desempleo nacional supera en un punto el promedio de 4 años.',
      'Sin saldo informado solo muestra el primer pago CIC como estimación.',
    ],
    workedExample: {
      title: 'Ejemplo: indefinido con promedio $1.000.000 y derecho a FCS',
      inputs: [
        'Promedio: $1.000.000',
        'Causal con derecho a FCS y requisitos de cotización: sí',
        'Saldo CIC: $1.000.000',
      ],
      development: [
        'Pagos FCS: 700.000 / 600.000 / 450.000 / 400.000 / 350.000',
        'Pago 1 sale completo del saldo CIC; pago 2 toma $300.000 del CIC y $300.000 del Fondo; el resto es Fondo.',
      ],
      result: 'Total estimado: $2.500.000 (de los cuales $1.500.000 los aporta el Fondo Solidario).',
    },
  },
  'licencia-medica': {
    summary:
      'Calcula el subsidio diario como la remuneración neta promedio de los 3 meses anteriores dividida por 30, con piso en el mínimo legal, y días pagados según la duración.',
    calculationSteps: [
      'Toma la remuneración neta mensual promedio declarada y la divide por 30.',
      'Aplica el piso del mínimo diario legal (50% del ingreso mínimo no remuneracional ÷ 30).',
      'Si la licencia supera 10 días, subsidia todos los días; si es de 10 o menos, subsidia desde el 4° día.',
      'Multiplica el monto diario por los días subsidiados.',
    ],
    assumptions: [
      'La remuneración neta declarada ya descuenta cotizaciones e impuestos y respeta el tope imponible vigente.',
      'Se cumplen los requisitos de afiliación y cotización (6 meses de afiliación, 3 de cotización en los últimos 6; 1 mes si es contrato por día o turnos).',
    ],
    limitations: [
      'No considera variaciones de la licencia (prórrogas, continuaciones) ni límites del pre/postnatal.',
      'El pago efectivo lo determina la entidad pagadora (COMPIN, Caja de Compensación o Isapre) con la liquidación real.',
    ],
    workedExample: {
      title: 'Ejemplo: neta $900.000 con licencia de 15 días',
      inputs: ['Remuneración neta promedio: $900.000', 'Días de licencia: 15'],
      development: [
        'Monto diario = $900.000 / 30 = $30.000',
        'Licencia > 10 días → los 15 días se pagan',
        'Total = $30.000 × 15',
      ],
      result: 'Subsidio estimado: $450.000.',
    },
  },
  'sueldo-part-time': {
    summary:
      'Calcula el ingreso mínimo mensual proporcional para jornadas de 30 horas o menos (IMM × horas / 42) y compara con el sueldo pactado; en jornada intermedia exige el IMM íntegro.',
    calculationSteps: [
      'Determina si la jornada es parcial (≤ 30 h), intermedia (>30 y <42 h) o completa (42 h).',
      'Si es parcial: mínimo legal = IMM × horas / 42. Si es intermedia o completa: IMM íntegro.',
      'Compara el sueldo pactado con el mínimo legal y muestra la diferencia si es menor.',
      'Calcula el valor hora ordinario con la fórmula legal (sueldo / 30 × 28) / (horas × 4).',
    ],
    assumptions: [
      'El sueldo pactado corresponde a remuneración mensual comparable con el ingreso mínimo.',
      'La jornada máxima legal vigente es de 42 horas semanales.',
    ],
    limitations: [
      'No calcula horas extraordinarias ni proporciones de otros mínimos (menores de 18, mayores de 65, zona extrema).',
      'Pactos por debajo del mínimo legal son ilegales; la calculadora solo muestra la diferencia.',
    ],
    workedExample: {
      title: 'Ejemplo: jornada parcial de 30 horas',
      inputs: ['Horas semanales: 30', 'Sueldo pactado: no informado'],
      development: [
        'Jornada parcial (≤ 30 h): mínimo = $553.553 × 30 / 42',
        'Mínimo legal proporcional = $395.395',
      ],
      result: 'Ingreso mínimo proporcional: $395.395; valor hora referencial $3.075.',
    },
  },
  'subsidio-unificado-empleo': {
    summary:
      'Estima el aporte mensual del Subsidio Unificado de Empleo (Ley 21.808) para la persona trabajadora y la empresa según la renta bruta, con tramos de 1,25 y 2,25 IMM del subsidio, piso legal de 2,5% del IMM y pago provisional del 90%.',
    calculationSteps: [
      'Verifica el grupo prioritario, el desempleo previo exigido y el 40% RSH (no exigido a personas con discapacidad).',
      'Trabajador con RB ≤ 1,25 IMM: PV 10% × min(RB, IMM). Con RB entre 1,25 y 2,25 IMM: 10% × 1 IMM − 10% × (RB − 1,25 IMM), con piso de $13.225.',
      'Empresa con RB ≤ 1,25 IMM: PV 20% × RB. Con RB entre 1,25 y 2,25 IMM: 20% × 1,25 IMM − 25% × (RB − 1,25 IMM).',
      'Sobre 2,25 IMM ($1.190.250) no hay aporte ese mes. Duración: 12 meses (15 para personas con discapacidad); el pago mensual al trabajador es provisional al 90% y se reliquida anualmente.',
    ],
    assumptions: [
      'Se usa el IMM propio del subsidio ($529.000, reajustable) y los PV del primer año del art. 2° transitorio.',
      'Los parámetros finales se materializan en el decreto del art. 8 de la Ley 21.808, pendiente de publicación al 26-09-2026; la estimación puede cambiar cuando se publique.',
    ],
    limitations: [
      'No verifica la inscripción real en el RND, la causal de desempleo ni la calidad de micro o pequeña empresa (que extiende el aporte de la empresa a 15 meses).',
      'El total estimado usa el aporte mensual del primer año sin reliquidación ni reajustes del IMM del subsidio.',
    ],
    workedExample: {
      title: 'Ejemplo: renta bruta $900.000, grupo prioritario y requisitos cumplidos',
      inputs: [
        'Renta bruta: $900.000',
        'Grupo prioritario, desempleo previo y RSH 40%: sí',
      ],
      development: [
        'Tramo 1,25–2,25 IMM: trabajador = 10% × $529.000 − 10% × ($900.000 − $661.250) = $52.900 − $23.875',
        'Empresa = 20% × $661.250 − 25% × ($900.000 − $661.250) = $132.250 − $59.688',
      ],
      result:
        'Aporte trabajador $29.025/mes (pago provisional $26.123) y empresa $72.563/mes, por 12 meses.',
    },
  },
  'factor-hora-extra': {
    summary:
      'Calcula el valor de la hora ordinaria con la fórmula de la Dirección del Trabajo ((sueldo / 30) × 28 / (jornada × 4)), la hora extra con recargo del 50% y el factor multiplicador del sueldo mensual.',
    calculationSteps: [
      'Divide el sueldo mensual por 30 y multiplícalo por 28.',
      'Divide el resultado por la jornada semanal multiplicada por 4: ese es el valor de la hora ordinaria.',
      'Multiplica por 1,5 para obtener el valor de la hora extraordinaria (recargo del 50%).',
      'El factor es el valor hora extra dividido por el sueldo; con 42 horas equivale a 0,0083333. El total se redondea al final.',
    ],
    assumptions: [
      'Se aplica el recargo mínimo del 50% indicado por la Dirección del Trabajo.',
      'La jornada por defecto es la legal vigente de 42 horas semanales (desde el 26-04-2026; bajará a 40 desde el 26-04-2028).',
    ],
    limitations: [
      'No valida el máximo legal de 2 horas extra por día ni 12 por semana.',
      'No considera recargos superiores pactados individual o colectivamente ni otras modalidades de pago.',
    ],
    workedExample: {
      title: 'Ejemplo: sueldo $1.000.000, jornada 42 h y 10 horas extra',
      inputs: [
        'Sueldo base: $1.000.000',
        'Jornada semanal: 42 horas',
        'Horas extra: 10',
      ],
      development: [
        'Hora ordinaria = ($1.000.000 / 30) × 28 / 168 = $5.556',
        'Hora extra = $5.556 × 1,5 ≈ $8.333 (factor 0,0083333)',
        'Total = $8.333 × 10',
      ],
      result: '10 horas extra ≈ $83.333 adicionales al sueldo.',
    },
  },
  'subsidio-familiar-suf': {
    summary:
      'Suma el Subsidio Familiar según las cargas acreditadas: $22.601 por cada una y $45.202 por cada persona con discapacidad, montos vigentes desde el 01-05-2026.',
    calculationSteps: [
      'Verifica que el hogar esté dentro del 60% más vulnerable según RSH y que haya al menos un causante.',
      'Multiplica las cargas sin discapacidad por $22.601.',
      'Multiplica las cargas con discapacidad por $45.202.',
      'Suma ambos montos para el total mensual y multiplícalo por 12 para el referencial anual.',
    ],
    assumptions: [
      'Cada causante declarado cumple las condiciones (edad, programas de salud o escolaridad según corresponda, y sin ingreso igual o superior al SUF).',
      'El beneficiario no tiene previsión social ni recibe asignación familiar (beneficios incompatibles).',
    ],
    limitations: [
      'No valida la edad, escolaridad ni el ingreso individual de cada causante.',
      'No considera la asignación automática con 40% RSH ni la duración máxima de 3 años del beneficio.',
    ],
    workedExample: {
      title: 'Ejemplo: 2 cargas comunes y 1 con discapacidad',
      inputs: [
        'Cargas sin discapacidad: 2',
        'Cargas con discapacidad: 1',
        'RSH 60%: sí',
      ],
      development: [
        '2 × $22.601 = $45.202',
        '1 × $45.202 = $45.202',
        'Total mensual = $45.202 + $45.202',
      ],
      result: 'SUF mensual $90.404 (referencial anual $1.084.848).',
    },
  },
  'subsidio-electrico': {
    summary:
      'Estima el descuento del Subsidio Eléctrico de la 5ª convocatoria (2º semestre 2026) según los integrantes del hogar, repartido en 6 cuotas mensuales desde septiembre de 2026.',
    calculationSteps: [
      'Verifica estar al día en el pago al 22-06-2026 y el requisito socioeconómico (40% RSH o persona electrodependiente registrada).',
      'Asigna el tramo por integrantes: 1 → $17.346; 2 a 3 → $22.548; 4 o más → $31.224.',
      'Divide el beneficio del semestre jul–dic 2026 en las 6 cuotas oficiales ($2.891 / $3.758 / $5.204).',
    ],
    assumptions: [
      'El postulante es mayor de 18 y cliente (arrendatario o propietario) de la distribuidora o cooperativa.',
      'Los hogares con persona electrodependiente acceden por cualquier tramo de vulnerabilidad, estando inscritos en el RSH.',
    ],
    limitations: [
      'Beneficio transitorio 2024–2026: no hay fechas oficiales de nuevas convocatorias y la reposición de la 5ª cerró el 19-08-2026.',
      'No consulta el estado real de la postulación ni de la cuenta eléctrica.',
    ],
    workedExample: {
      title: 'Ejemplo: hogar de 3 integrantes con 40% RSH',
      inputs: [
        'Integrantes: 3',
        'RSH 40%: sí',
        'Al día en el pago: sí',
      ],
      development: [
        'Tramo 2 a 3 integrantes: $22.548 semestrales',
        'Repartido en 6 cuotas de $3.758 desde septiembre de 2026',
      ],
      result: 'Descuento total $22.548 ($3.758 por mes en la cuenta de luz).',
    },
  },
  'bono-30-mil-por-hijo': {
    summary:
      'Multiplica $30.000 por cada niño beneficiario del bono único de la Ley 21.840: niños hasta 13 años al 01-06-2026 con hogar en el 80% RSH, nacidos entre el 02-06-2026 y el 15-03-2027 (pago posterior), y niños en cuidado alternativo familiar sin exigencia de vulnerabilidad.',
    calculationSteps: [
      'Suma los niños con derecho: con 80% RSH cuentan los menores de 13 años al 01-06-2026 y los nacidos entre el 02-06-2026 y el 15-03-2027.',
      'Agrega los niños bajo cuidado alternativo familiar (no exigen RSH).',
      'Multiplica por $30.000; la parte de los nacidos en el período se paga después del 15-03-2027.',
    ],
    assumptions: [
      'La edad y residencia de cada niño cumplen los cortes legales (hasta 13 años al 01-06-2026).',
      'El hogar estaba efectivamente inscrito en el 80% más vulnerable del RSH a la fecha de corte.',
    ],
    limitations: [
      'El bono es automático: la calculadora estima el monto, no confirma la generación del documento de pago.',
      'No verifica la condición de cuidado legal ni la fecha de nacimiento de cada niño.',
    ],
    workedExample: {
      title: 'Ejemplo: 2 niños en edad + 1 nacido en el período, hogar 80% RSH',
      inputs: [
        'Niños ≤13 al 01-06-2026: 2',
        'Nacidos 02-06-2026 a 15-03-2027: 1',
        'RSH 80%: sí',
      ],
      development: [
        '3 niños beneficiarios × $30.000',
        'Del total, $30.000 corresponde al nacido en el período',
      ],
      result: 'Bono total $90.000 ($30.000 se pagan después del 15-03-2027).',
    },
  },
  'becas-gratuidad': {
    summary:
      'Cruza el nivel socioeconómico del FUAS con los requisitos de cada beneficio de arancel para la admisión 2027: gratuidad (60%), Bicentenario y Juan Gómez Millas (70%, PAES ≥510 o PACE), Excelencia Académica (80%, top 10% NEM) y Nuevo Milenio I/II (70%/50%, NEM ≥5,0).',
    calculationSteps: [
      'Lee el nivel socioeconómico declarado según los tramos del FUAS.',
      'Gratuidad: nivel hasta el 60% e institución adscrita. BB: hasta 70%, carrera universitaria y PAES ≥510 o PACE. BJGM: hasta 70% con PAES ≥510 o PACE.',
      'BEA: hasta 80% con NEM en el 10% superior del establecimiento. BNM I: hasta 70%, carrera técnica o profesional en IP y NEM ≥5,0; BNM II: hasta 50% en primer año con NEM ≥5,0.',
      'Muestra cada beneficio que cumple y el mayor tope anual en pesos.',
    ],
    assumptions: [
      'El nivel socioeconómico ingresado corresponde al que entregará el FUAS; el Mineduc lo publica en diciembre.',
      'Se cumplen los requisitos comunes: nacionalidad chilena, sin título previo ni licenciatura terminal, sin dos becas de arancel Mineduc anteriores y carrera de pregrado presencial.',
    ],
    limitations: [
      'Es orientativo: la asignación real la define el FUAS y la clasificación validada por el Estado.',
      'Las becas y la gratuidad no se acumulan en la misma carrera; los topes son anuales y no garantizan la cobertura total del arancel real.',
    ],
    workedExample: {
      title: 'Ejemplo: hogar hasta el 60%, carrera universitaria adscrita, PAES 600',
      inputs: [
        'Nivel socioeconómico: hasta 60%',
        'Institución adscrita: sí',
        'PAES: 600',
      ],
      development: [
        'Gratuidad: cumple (≤60% + adscrita)',
        'BB y BJGM: cumplen (≤70% + PAES ≥510)',
      ],
      result:
        'Optaría a gratuidad (100% arancel y matrícula), Bicentenario y Juan Gómez Millas (tope $1.150.000).',
    },
  },
  'puntaje-ponderado-paes': {
    summary:
      'Aplica la fórmula del DEMRE para la Admisión 2027: suma cada factor de selección (NEM, Ranking, Competencia Lectora, M1, electiva y M2) multiplicado por la ponderación de la carrera que ingresa el usuario. El NEM se convierte con la tabla oficial 2027 de su grupo.',
    calculationSteps: [
      'Calcula el promedio NEM como el promedio de los promedios anuales de 1° a 4° medio, aproximado a dos decimales (o usa el que ingresaste).',
      'Convierte ese promedio a puntaje con la tabla de transformación NEM 2027 del grupo A, B o C.',
      'Usa el puntaje ranking ingresado; si no lo ingresas, usa el puntaje NEM como estimación conservadora.',
      'Toma la prueba electiva con mayor puntaje entre Historia y Ciencias Sociales y Ciencias.',
      'Verifica que las ponderaciones sumen 100% y que M2, si se pondera, tenga al menos 5%.',
      'Suma cada puntaje multiplicado por su ponderación.',
    ],
    assumptions: [
      'Las ponderaciones son las que ingresas; las precargadas corresponden al ejemplo oficial del DEMRE, no a una carrera real.',
      'El ranking calculado por el DEMRE usa el promedio y el máximo histórico de tu establecimiento, que no siempre conoces: sin ese dato se usa tu NEM.',
    ],
    limitations: [
      'No considera puntajes mínimos de postulación, bonificaciones ni requisitos especiales de cada universidad.',
      'Es una simulación: el puntaje oficial lo entrega el DEMRE el 04-01-2027.',
      'El Nuevo Ranking rige desde el Proceso de Admisión 2028; esta calculadora usa la fórmula de la Admisión 2027.',
    ],
    workedExample: {
      title: 'Ejemplo oficial del DEMRE',
      inputs: [
        'NEM 825 (15%), Ranking 870 (20%), Competencia Lectora 700 (10%)',
        'M1 900 (35%), electiva 820 (10%), M2 840 (10%)',
      ],
      development: [
        '825 × 0,15 + 870 × 0,20 + 700 × 0,10 = 123,75 + 174 + 70',
        '900 × 0,35 + 820 × 0,10 + 840 × 0,10 = 315 + 82 + 84',
      ],
      result: 'Puntaje ponderado: 848,75 puntos.',
    },
  },
  'promedio-notas': {
    summary:
      'Calcula el promedio simple o ponderado de hasta ocho notas en escala de 1,0 a 7,0 (Decreto 67/2018, art. 8) y, si las ponderaciones suman menos de 100%, la nota que se necesita en el porcentaje restante para alcanzar la nota objetivo.',
    calculationSteps: [
      'Considera solo las casillas con nota entre 1,0 y 7,0.',
      'Sin ponderaciones: suma las notas y divide por la cantidad de notas.',
      'Con ponderaciones: multiplica cada nota por su porcentaje y divide por la suma de porcentajes ingresados.',
      'Aproxima el promedio a la décima o a la centésima, según elijas, y muestra también el valor exacto.',
      'Si los porcentajes suman menos de 100%: nota necesaria = (nota objetivo − promedio exacto × % evaluado) ÷ % pendiente.',
    ],
    assumptions: [
      'La aproximación desde 0,05 hacia arriba es la opción por defecto; el reglamento de tu establecimiento puede fijar otra.',
      'Las ponderaciones son las que informa tu profesor o profesora (Decreto 67, art. 9).',
    ],
    limitations: [
      'No calcula la promoción de curso, que además depende de la asistencia y de las asignaturas reprobadas.',
      'Religión, Consejo de Curso y Orientación no cuentan para el promedio final anual (Decreto 67, art. 7): no las ingreses.',
    ],
    workedExample: {
      title: 'Ejemplo: tres notas con ponderación y una pendiente',
      inputs: ['5,0 (30%)', '6,0 (30%)', '2,0 (20%)', 'Falta una prueba de 20%'],
      development: [
        'Promedio parcial = (5,0 × 30 + 6,0 × 30 + 2,0 × 20) ÷ 80 = 4,625',
        'Aporte acumulado = 4,625 × 0,80 = 3,7',
        'Nota necesaria para 4,0 = (4,0 − 3,7) ÷ 0,20 = 1,5',
      ],
      result: 'Promedio parcial 4,6 (exacto 4,625); necesita un 1,5 en la prueba de 20% para cerrar con 4,0.',
    },
  },
  'escala-notas': {
    summary:
      'Convierte un puntaje en nota de 1,0 a 7,0 con una escala lineal en dos tramos: bajo el puntaje de aprobación (exigencia × puntaje máximo) la nota va de 1,0 a 4,0, y sobre él, de 4,0 a 7,0. La exigencia es editable (60% por defecto).',
    calculationSteps: [
      'Puntaje de aprobación = exigencia × puntaje máximo.',
      'Si el puntaje es menor: nota = 1 + 3 × puntaje ÷ puntaje de aprobación.',
      'Si es igual o mayor: nota = 4 + 3 × (puntaje − puntaje de aprobación) ÷ (puntaje máximo − puntaje de aprobación).',
      'Aproxima la nota a un decimal desde 0,05 hacia arriba y muestra también la nota exacta.',
    ],
    assumptions: [
      'La exigencia del 60% es una convención de uso frecuente; el Decreto 67 no la fija y cada establecimiento la define.',
      'Escala de 1,0 a 7,0 con aprobación 4,0 (Decreto 67/2018, art. 8), editable si tu evaluación usa otra.',
    ],
    limitations: [
      'Algunos docentes usan escalas no lineales o con bonificación: en ese caso el resultado puede diferir.',
    ],
    workedExample: {
      title: 'Ejemplo: prueba de 60 puntos al 60%',
      inputs: ['Puntaje máximo: 60', 'Puntaje obtenido: 45', 'Exigencia: 60%'],
      development: [
        'Puntaje de aprobación = 0,60 × 60 = 36',
        'Nota = 4 + 3 × (45 − 36) ÷ (60 − 36) = 4 + 27 ÷ 24 = 5,125',
      ],
      result: 'Nota 5,1 (exacta 5,125). Para el 4,0 se necesitan 36 puntos.',
    },
  },
  'subsidio-arriendo': {
    summary:
      'Convierte el arriendo a UF y calcula el aporte mensual: regular tope 4,2 UF (4,9 en zonas norte/sur/RM) sobre 170 UF hasta 8 años, o especial PM/PcD con 90% del arriendo sobre 213 UF; valida arriendo máximo, RSH 70% y tramo de ingreso familiar.',
    calculationSteps: [
      'Convierte arriendo e ingreso familiar a UF con la UF vigente.',
      'Regular: verifica arriendo ≤11 UF (13 en zonas), ingreso entre 7 y 25 UF (+8 UF por integrante sobre el tercero) y RSH ≤70%; aporte = min(tope, arriendo) hasta agotar 170 UF o 96 meses.',
      'Especial PM/PcD: aporte = 90% del arriendo mensual hasta agotar 213 UF; ingreso entre 5 y 25 UF (+8 UF por integrante sobre tres), sin ahorro mínimo.',
      'El copago familiar es el arriendo menos el subsidio mensual.',
    ],
    assumptions: [
      'Se cumplen los requisitos no medibles aquí: ahorro mínimo de 4 UF (regular) y condición de persona mayor o PcD inscrita en el RND (especial).',
      'La UF usada es la vigente al momento del cálculo; los montos reales varían con la UF.',
    ],
    limitations: [
      'La postulación regular 2026 cerró el 07-08-2026 y la especial va del 08-09 al 08-10-2026: la estimación no equivale a postular.',
      'El subsidio puede usarse de forma fragmentada en hasta 8 años; la duración mostrada asume meses consecutivos.',
    ],
    workedExample: {
      title: 'Ejemplo: arriendo $360.000 (9 UF), llamado regular, fuera de zona',
      inputs: [
        'Arriendo: $360.000 (9 UF con UF $40.000)',
        'Ingreso familiar: $800.000 (20 UF), 3 integrantes, RSH ≤70%',
      ],
      development: [
        'Aporte = min(4,2 UF; 9 UF) = 4,2 UF = $168.000',
        'Meses = ⌊170 / 4,2⌋ = 40 (remanente 2 UF)',
      ],
      result: 'Subsidio $168.000/mes por 40 meses; copago familiar $192.000.',
    },
  },
  'asignacion-por-muerte': {
    summary:
      'Reembolsa los gastos funerarios hasta el tope del régimen: Asignación por Muerte del antiguo sistema previsional (3 IMM no remuneracionales = $1.070.445) o cuota mortuoria de 15 UF para AFP, PGU y renta vitalicia.',
    calculationSteps: [
      'Identifica el régimen: antiguo sistema previsional, AFP/renta vitalicia o pensionado PGU.',
      'Fija el tope: 3 × IMM no remuneracional para el IPS antiguo; 15 UF para AFP, PGU y renta vitalicia.',
      'El reembolso es el menor entre los gastos funerarios declarados y el tope; el resto es diferencia no cubierta.',
    ],
    assumptions: [
      'La persona fallecida era beneficiario activo o pasivo del régimen declarado.',
      'Quien cobra (cónyuge, hijos, padre o madre a cargo del funeral) tiene derecho al monto máximo.',
    ],
    limitations: [
      'No descuenta financiamiento del saldo de la cuenta AFP: en AFP la cuota sale del saldo y el Estado solo cubre la diferencia hasta 15 UF si había aporte solidario o PGU.',
      'Requiere documentos (factura original de la funeraria, entre otros) que esta estimación no valida.',
    ],
    workedExample: {
      title: 'Ejemplo: gastos $1.500.000, régimen IPS antiguo',
      inputs: [
        'Régimen: antiguo sistema previsional',
        'Gastos funerarios: $1.500.000',
      ],
      development: [
        'Tope = 3 × $356.815 (IMM no remuneracional) = $1.070.445',
        'Reembolso = min($1.500.000; $1.070.445)',
      ],
      result: 'Reembolso $1.070.445; diferencia no cubierta $429.555.',
    },
  },
  'tope-imponible-90-uf': {
    summary:
      'Convierte los topes imponibles a pesos con la UF vigente (90 UF para AFP y salud; 135,2 UF para seguro de cesantía) y calcula las cotizaciones sobre el sueldo efectivamente topado.',
    calculationSteps: [
      'Calcula los topes en pesos: 90 × UF (AFP/salud) y 135,2 × UF (cesantía).',
      'El imponible considerado es el menor entre el sueldo y cada tope; el exceso no paga cotizaciones.',
      'Aplica las tasas sobre el sueldo topado: AFP 10%, salud 7% y seguro de cesantía del trabajador 0,6% (contrato indefinido, tope 135,2 UF).',
    ],
    assumptions: [
      'Se usa la UF vigente al momento del cálculo (o el valor de respaldo local).',
      'Las tasas corresponden a la cotización obligatoria AFP, el 7% legal de salud y el seguro de cesantía del trabajador con contrato indefinido.',
    ],
    limitations: [
      'No incluye la comisión de la AFP, el SIS ni las cotizaciones del empleador.',
      'Para plazo fijo el seguro de cesantía lo paga solo el empleador; aquí se muestra siempre la tasa del trabajador de contrato indefinido.',
    ],
    workedExample: {
      title: 'Ejemplo: sueldo imponible $4.000.000 con UF $41.057,20',
      inputs: ['Sueldo imponible: $4.000.000', 'UF: $41.057,20'],
      development: [
        'Tope AFP/salud = 90 UF = $3.695.148',
        'Exceso = $4.000.000 − $3.695.148 = $304.852',
        'AFP = 10% × $3.695.148 ≈ $369.515; salud 7% ≈ $258.660',
        'Cesantía 0,6% × $4.000.000 = $24.000 (bajo el tope de 135,2 UF)',
      ],
      result: 'Cotizaciones topadas: AFP $369.515, salud $258.660 y cesantía $24.000; $304.852 del sueldo no cotiza.',
    },
  },
  'sueldo-casa-particular': {
    summary:
      'Determina el sueldo mínimo de una trabajadora de casa particular según modalidad y jornada, descuenta AFP, salud e impuesto para estimar el líquido y suma los aportes propios del empleador.',
    calculationSteps: [
      'Puertas adentro: mínimo legal = ingreso mínimo mensual íntegro. Puertas afuera: si la jornada es de 30 horas o menos, IMM × horas / 42; si es mayor, IMM íntegro.',
      'Si no se informa sueldo pactado, calcula con el mínimo legal; si se informa y es menor, muestra la diferencia.',
      'Descuenta a la trabajadora 10% de AFP más la comisión, 7% de salud e impuesto único si corresponde; no aporta al seguro de cesantía.',
      'Suma los aportes del empleador: 1,11% indemnización a todo evento, 3% seguro de cesantía, cotización de la reforma de pensiones vigente (con SIS incluido desde agosto de 2026) y 0,95% de accidentes del trabajo.',
      'Muestra el pago sustitutivo del desahucio sin aviso: la última remuneración mensual.',
    ],
    assumptions: [
      'La alimentación y la habitación son de cargo del empleador y no se descuentan del sueldo (art. 151 del Código del Trabajo).',
      'Salud se calcula con el 7% legal; los topes imponibles son 90 UF (AFP, salud y 1,11%) y 135,2 UF (cesantía).',
      'La relación laboral tiene menos de 11 años, plazo durante el cual corresponde el aporte de 1,11%.',
    ],
    limitations: [
      'No incluye planes de isapre sobre el 7%, horas extraordinarias, mínimos especiales (menores de 18 o mayores de 65) ni zona extrema.',
      'No calcula vacaciones pendientes ni el saldo acumulado de la indemnización a todo evento, que depende de la rentabilidad en la AFP.',
      'El seguro de accidentes se estima con la tasa de 0,95% informada por la Dirección del Trabajo.',
    ],
    workedExample: {
      title: 'Ejemplo: puertas adentro con el sueldo mínimo, AFP Uno, octubre de 2026',
      inputs: ['Modalidad: puertas adentro', 'Sueldo bruto: $553.553', 'AFP: Uno (10,46%)'],
      development: [
        'Descuentos: AFP $57.902 + salud $38.749 = $96.651; sin impuesto.',
        'Líquido: $553.553 − $96.651 = $456.902.',
        'Empleador: 1,11% $6.144 + cesantía 3% $16.607 + reforma 3,5% $19.374 + accidentes 0,95% $5.259 = $47.384.',
      ],
      result: 'Líquido $456.902; costo mensual para el empleador $600.937.',
    },
  },
  'puntaje-nem-ranking': {
    summary:
      'Promedia tus notas de 1° a 4° medio a dos decimales, convierte ese promedio a puntaje de 100 a 1.000 con la tabla oficial del DEMRE 2027 según tu grupo (A, B o C) y estima el puntaje ranking por nivel con los datos históricos de tu colegio (o usa el NEM como estimación conservadora).',
    calculationSteps: [
      'Calcula el promedio aritmético de los promedios anuales de 1° a 4° medio ingresados y lo aproxima a dos decimales.',
      'Busca ese promedio en la tabla oficial de transformación NEM del Proceso de Admisión 2027 para el grupo A, B o C.',
      'Si ingresas el promedio (PROM) y el máximo (MAX) de las tres generaciones anteriores de tu colegio, calcula el ranking de cada nivel con Ri = PROM + (NEM − PROM)(1000 − PROM)/(MAX − PROM) y promedia los niveles.',
      'Si no ingresas los datos del colegio, asigna ranking = NEM como estimación conservadora.',
    ],
    assumptions: [
      'El estudiante cursó enseñanza media en la modalidad seleccionada (Grupo A, B o C).',
      'En cada nivel el puntaje ranking es igual o mayor que el puntaje NEM de ese nivel según las reglas del DEMRE.',
    ],
    limitations: [
      'El promedio y el máximo histórico de cada establecimiento no son públicos en una tabla general: el puntaje ranking oficial lo informa el DEMRE.',
      'El Nuevo Ranking rige desde el Proceso de Admisión 2028; esta calculadora usa las reglas de la Admisión 2027.',
    ],
    workedExample: {
      title: 'Ejemplo: promedios 6,2 / 6,3 / 6,3 / 6,3 en Grupo A',
      inputs: ['Modalidad: Grupo A (Científico-Humanista diurno)', 'Promedios 1° a 4° medio: 6,2; 6,3; 6,3; 6,3'],
      development: [
        'Promedio exacto = (6,2 + 6,3 + 6,3 + 6,3) ÷ 4 = 6,275 → 6,28',
        'Tabla NEM 2027 Grupo A para 6,28 = 793 puntos',
      ],
      result: 'Promedio NEM 6,28; puntaje NEM 793 puntos; ranking conservador 793 puntos.',
    },
  },
  'semana-corrida': {
    summary:
      'Calcula la remuneración por los días domingo y festivos (art. 45 del Código del Trabajo) dividiendo la remuneración variable devengada en la semana por los días que el trabajador legalmente debió laborar y multiplicando ese promedio diario por los domingos y festivos de la semana.',
    calculationSteps: [
      'Toma únicamente la remuneración variable devengada día a día en la semana (comisiones, trato), sin el sueldo base ni pagos extraordinarios.',
      'Divide ese monto por el número de días que legalmente debió trabajar en la semana (1 a 6).',
      'Multiplica el promedio diario por la cantidad de domingos y festivos de esa semana y redondea al peso.',
    ],
    assumptions: [
      'Las remuneraciones ingresadas corresponden a remuneraciones variables principales y ordinarias que se devengan diariamente.',
      'No se incluyen gratificaciones, aguinaldos ni bonificaciones extraordinarias.',
    ],
    limitations: [
      'Es una estimación por semana devengada; si en el mes las comisiones varían semana a semana, debe calcularse cada semana por separado.',
    ],
    workedExample: {
      title: 'Ejemplo: $100.000 en comisiones en 5 días con 1 domingo',
      inputs: ['Variable semanal: $100.000', 'Días que debió trabajar: 5', 'Domingos y festivos: 1'],
      development: [
        'Promedio diario = $100.000 ÷ 5 = $20.000',
        'Semana corrida = $20.000 × 1 = $20.000',
      ],
      result: 'Semana corrida: $20.000 (total variable + semana corrida: $120.000).',
    },
  },
  'ipc': {
    summary:
      'Calcula la variación porcentual del IPC entre dos meses y reajusta un monto en pesos utilizando el cuociente entre los índices generales de la serie mensual oficial del INE (base anual 2023 = 100).',
    calculationSteps: [
      'Obtiene el índice general del IPC del mes inicial y del mes final desde la serie oficial del INE (base 2023 = 100).',
      'Calcula el factor de reajuste como IPC final ÷ IPC inicial.',
      'Obtiene la variación porcentual como (IPC final ÷ IPC inicial − 1) × 100 (mostrada a 1 decimal según convención INE y con 2 decimales).',
      'Multiplica el monto original por el factor de reajuste y redondea al peso.',
    ],
    assumptions: [
      'Para incluir la variación del primer mes del período, el mes inicial seleccionado corresponde al mes inmediatamente anterior (criterio de la Calculadora IPC del INE).',
    ],
    limitations: [
      'Cubre los meses publicados en la serie oficial base anual 2023 = 100 del INE.',
    ],
    workedExample: {
      title: 'Ejemplo: reajustar $100.000 en 12 meses (septiembre 2025 a septiembre 2026)',
      inputs: ['Monto: $100.000', 'Mes inicial: septiembre 2025 (109,14)', 'Mes final: septiembre 2026 (113,59)'],
      development: [
        'Factor = 113,59 ÷ 109,14 = 1,040773',
        'Variación = (1,040773 − 1) × 100 = 4,1% (4,08% exacta)',
        'Monto reajustado = $100.000 × 1,040773 = $104.077',
      ],
      result: 'Variación IPC: 4,1%; monto reajustado: $104.077.',
    },
  },
  'dias-habiles': {
    summary:
      'Cuenta los días hábiles entre dos fechas o proyecta el día de vencimiento al sumar un plazo en días hábiles, aplicando el cómputo administrativo (Ley 19.880 art. 25: inhábiles sábados, domingos y festivos) o judicial (CPC arts. 59 y 66: inhábiles solo domingos y festivos).',
    calculationSteps: [
      'Comienza el cómputo el día siguiente a la fecha de inicio (art. 25 de la Ley 19.880).',
      'Recorre cada día calendario descontando domingos, feriados nacionales de src/lib/feriados.ts y, si el cómputo es administrativo, también los sábados.',
      'En modo contar entre fechas, suma los días hábiles hasta la fecha de término inclusive.',
      'En modo sumar días, avanza hasta completar los N días hábiles e informa la fecha exacta de vencimiento.',
    ],
    assumptions: [
      'Se consideran los feriados nacionales de Chile para 2026 y 2027.',
    ],
    limitations: [
      'No incluye feriados regionales ni suspensiones especiales decretadas por un tribunal.',
      'Los feriados móviles de 2027 marcados como pendientes en el calendario se advierten expresamente en el resultado.',
    ],
    workedExample: {
      title: 'Ejemplo: contar días hábiles administrativos en la semana de Fiestas Patrias 2026',
      inputs: ['Inicio: 2026-09-14', 'Término: 2026-09-21', 'Sábados hábiles: No'],
      development: [
        'Días evaluados (15 al 21 de septiembre): martes 15, miércoles 16 y jueves 17 son hábiles (3)',
        'Viernes 18 y sábado 19 son feriados; domingo 20 es inhábil; lunes 21 es hábil (+1)',
      ],
      result: '4 días hábiles (de 7 días corridos).',
    },
  },
  'credito-consumo': {
    summary:
      'Calcula la cuota mensual fija con el sistema de amortización francés, el costo total del crédito y compara la tasa anual nominal (mensual × 12) con la Tasa Máxima Convencional (TMC) vigente publicada por la CMF para el tramo en UF.',
    calculationSteps: [
      'Calcula la cuota mensual constante con C = P × i ÷ (1 − (1 + i)^−n), donde i es la tasa mensual en tanto por uno y n el plazo en meses.',
      'Obtiene el total pagado en cuotas (C × n), los intereses totales (C × n − P) y el costo total sumando los gastos operacionales.',
      'Convierte el monto del crédito a UF y ubica el tramo de la TMC vigente del certificado CMF (≤50 UF, 50–200 UF, 200–5.000 UF o >5.000 UF).',
      'Compara la tasa anual nominal lineal (tasa mensual × 12) con la TMC anual del tramo.',
    ],
    assumptions: [
      'Crédito en pesos no reajustable con cuotas mensuales iguales y vencidas.',
      'Se utiliza el último certificado de la CMF registrado en el repositorio y la UF vigente.',
    ],
    limitations: [
      'La tasa anual nominal mostrada sigue la convención lineal de la Ley 18.010 y no corresponde a la Carga Anual Equivalente de la Ley 20.555.',
      'No incluye seguros optativos ni impuesto de timbres y estampillas si no los sumas en gastos operacionales.',
    ],
    workedExample: {
      title: 'Ejemplo: $1.000.000 a 12 meses con tasa mensual de 1,5%',
      inputs: ['Monto: $1.000.000', 'Tasa mensual: 1,5% (18% anual nominal)', 'Plazo: 12 meses'],
      development: [
        'Cuota francesa = 1.000.000 × 0,015 ÷ (1 − 1,015^−12) = $91.680',
        'Total en cuotas = $91.680 × 12 = $1.100.160 (intereses: $100.160)',
        'Monto ≈ 24,2 UF (tramo ≤50 UF, TMC 41,02% anual): 18% está bajo el máximo legal',
      ],
      result: 'Cuota mensual: $91.680; costo total: $1.100.160; dentro del límite TMC.',
    },
  },
  'interes-compuesto': {
    summary:
      'Calcula el valor futuro de un capital inicial más aportes periódicos bajo capitalización compuesta mensual, trimestral, semestral o anual.',
    calculationSteps: [
      'Convierte la tasa anual nominal a tasa por período de capitalización: i = (tasa anual ÷ 100) ÷ m, con N = m × años períodos.',
      'Agrupa el aporte mensual según la frecuencia de capitalización: A = aporte mensual × (12 ÷ m).',
      'Aplica VF = C₀ × (1 + i)^N + A × ((1 + i)^N − 1) ÷ i y separa el total aportado de la ganancia por intereses.',
    ],
    assumptions: [
      'Los aportes periódicos se realizan al final de cada período de capitalización y la tasa se mantiene constante.',
    ],
    limitations: [
      'Es un cálculo matemático referencial: no descuenta impuestos, inflación ni comisiones.',
    ],
    workedExample: {
      title: 'Ejemplo: $1.000.000 al 10% anual con capitalización anual por 2 años',
      inputs: ['Capital inicial: $1.000.000', 'Tasa anual: 10%', 'Plazo: 2 años, capitalización anual'],
      development: [
        'VF = $1.000.000 × (1 + 0,10)² = $1.000.000 × 1,21 = $1.210.000',
        'Ganancia por intereses = $1.210.000 − $1.000.000 = $210.000',
      ],
      result: 'Monto final: $1.210.000; ganancia por intereses: $210.000 (21%).',
    },
  },
  'deposito-a-plazo': {
    summary:
      'Simula el retorno de un depósito a plazo fijo o renovable en pesos o UF prorrateando la tasa mensual (base 30 días) o anual (base 360 días) por los días del depósito.',
    calculationSteps: [
      'Determina la tasa efectiva del período: (tasa ÷ 100) × (días ÷ 30) si la tasa es mensual, o × (días ÷ 360) si es anual.',
      'Con k = 1 + renovaciones períodos, calcula el factor acumulado (1 + tasa efectiva)^k.',
      'Multiplica el monto inicial por el factor para obtener el monto final y los intereses ganados en pesos y en UF.',
    ],
    assumptions: [
      'En los depósitos renovables se mantiene la misma tasa y plazo en cada renovación.',
    ],
    limitations: [
      'Usa la tasa que ingresa el usuario según la oferta de su banco; no incluye impuestos ni variaciones futuras de la UF.',
    ],
    workedExample: {
      title: 'Ejemplo: $1.000.000 a 30 días con tasa mensual de 0,5%',
      inputs: ['Monto: $1.000.000 CLP', 'Tasa: 0,5% mensual', 'Plazo: 30 días, sin renovaciones'],
      development: [
        'Tasa efectiva del período = 0,5% × (30 ÷ 30) = 0,5%',
        'Intereses = $1.000.000 × 0,005 = $5.000',
      ],
      result: 'Intereses ganados: $5.000; monto final a recibir: $1.005.000.',
    },
  },
};
