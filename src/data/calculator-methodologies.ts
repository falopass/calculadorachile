import type { CalculatorMethodology } from '@/types/calculator';

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
        'Vacaciones pendientes: 10 días hábiles',
        'Aviso previo: No avisado con 30 días de anticipación',
      ],
      development: [
        'Indemnización por años de servicio: 3 años × $800.000 = $2.400.000',
        'Indemnización sustitutiva de aviso previo: 1 mes = $800.000',
        'Feriado proporcional pendiente: (10 días / 30) × $800.000 = $266.667',
        'Total bruto del finiquito: $2.400.000 + $800.000 + $266.667',
      ],
      result: 'Total estimado del finiquito: $3.466.667 (las indemnizaciones no tributan).',
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
    ],
    assumptions: ['Las fechas y días pendientes ingresados son completos y no duplicados.'],
    limitations: [
      'No reconstruye asistencia, licencias ni feriados ya utilizados.',
      'La remuneración variable puede requerir antecedentes de meses anteriores.',
    ],
    workedExample: {
      title: 'Ejemplo: Trabajador con 8 meses trabajados al renunciar o ser despedido',
      inputs: [
        'Sueldo base mensual: $600.000',
        'Meses trabajados desde el último feriado: 8 meses',
        'Feriado pendiente de períodos anteriores: 0 días',
      ],
      development: [
        'Factor legal mensual de vacaciones: 1,25 días hábiles por mes (15 / 12).',
        'Días hábiles generados: 8 meses × 1,25 = 10 días hábiles.',
        'Valor remuneración diaria: $600.000 / 30 = $20.000 por día.',
        'Monto en pesos: 10 días × $20.000 = $200.000.',
      ],
      result: 'Indemnización por feriado proporcional en el finiquito: $200.000.',
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
        'Sueldo Mínimo (IMM): $553.553 (vigente en Chile 2026)',
        'Modalidad: Artículo 50 del Código del Trabajo (25% del sueldo con tope anual)',
      ],
      development: [
        'Cálculo del 25% del sueldo: $700.000 × 25% = $175.000 al mes.',
        'Tope anual del art. 50: 4,75 × $553.553 = $2.629.377 al año.',
        'Tope mensual del art. 50: $2.629.377 / 12 = $219.115 al mes.',
        'Comparación: Como $175.000 es menor que el tope ($219.115), corresponde el monto íntegro.',
      ],
      result: 'Gratificación legal mensual a pagar: $175.000.',
    },
  },
  'indemnizacion-anos-servicio': {
    summary:
      'Estima indemnización por años y aviso previo desde la remuneración base, antigüedad y causal declaradas.',
    calculationSteps: [
      'Determina los años computables según antigüedad informada.',
      'Aplica el tope de años y de remuneración cuando corresponde.',
      'Multiplica la base admitida por los años computables.',
      'Agrega aviso previo o recargo seleccionado.',
    ],
    assumptions: ['La causal declarada genera el derecho que se está simulando.'],
    limitations: [
      'No decide la procedencia de la causal ni de un recargo judicial.',
      'La composición de la última remuneración puede requerir revisar liquidaciones y contrato.',
    ],
    workedExample: {
      title: 'Ejemplo: 5 años y 7 meses de antigüedad con sueldo de $900.000',
      inputs: [
        'Última remuneración mensual imponible: $900.000 (bajo el tope de 90 UF)',
        'Tiempo trabajado: 5 años y 7 meses',
        'Causal: Art. 161 Código del Trabajo (Necesidades de la empresa)',
      ],
      development: [
        'Regla legal de fracción > 6 meses: 7 meses cuentan como 1 año completo adicional.',
        'Años computables a indemnizar: 6 años (dentro del tope legal de 11 años).',
        'Cálculo: 6 años × $900.000',
      ],
      result: 'Indemnización legal por años de servicio: $5.400.000 (exenta de impuestos).',
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
      'Aplica la tabla mensual configurada del Impuesto Único a la base tributable declarada.',
    calculationSteps: [
      'Obtiene la renta tributable después de descuentos previsionales informados.',
      'Ubica la renta en el tramo correspondiente.',
      'Aplica factor y rebaja del tramo.',
      'Muestra impuesto y renta después del tributo.',
    ],
    assumptions: ['La base corresponde a una remuneración mensual afecta al Impuesto Único.'],
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
      'El pago efectivo lo determina la entidad (FONASA, Isapre o empleador) con la liquidación real.',
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
};
