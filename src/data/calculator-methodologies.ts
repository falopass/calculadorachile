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
};
