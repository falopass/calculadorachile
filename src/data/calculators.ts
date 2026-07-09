// ============================================
// Catálogo de calculadoras disponibles
// ============================================

import type { Calculator } from '@/types/calculator';

export const calculators: Calculator[] = [
  {
    id: 'sueldo-liquido',
    name: 'Sueldo Líquido 2026',
    description: 'Calcula tu sueldo líquido a partir del bruto, considerando AFP, salud y seguro de cesantía.',
    slug: 'calculadora-sueldo-liquido',
    category: 'sueldo',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-08',
    sources: [
      { name: 'SII — Impuesto 2ª categoría', url: 'https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm', note: 'Tabla IUSC mensual' },
      { name: 'Superintendencia de Salud', url: 'https://www.superdesalud.gob.cl/preguntas-frecuentes/tax-grupos-de-interes/personas-6051/beneficiarios-isapres-6059/', note: '7% salud y tope 90 UF' },
      { name: 'AFC Chile', url: 'https://www.afc.cl/seguro-de-cesantia/', note: 'Seguro de cesantía' },
      { name: 'Previred — indicadores', url: 'https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf', note: 'Comisiones AFP, SIS, topes' },
    ],
    keywords: ['sueldo líquido', 'calculadora sueldo', 'descuentos AFP', 'sueldo bruto a líquido', 'descuentos legales Chile'],
    inputs: [
      { id: 'sueldoBruto', label: 'Sueldo Bruto (o líquido objetivo si inverso)', type: 'number', unit: 'CLP', placeholder: '$1.000.000', required: true, min: 0, tooltip: 'Remuneración imponible mensual. Si activas cálculo inverso, ingresa el líquido que quieres recibir.' },
      { id: 'afp', label: 'AFP', type: 'select', required: true, options: [
        { value: 'uno', label: 'Uno (0,46%)' },
        { value: 'modelo', label: 'Modelo (0,58%)' },
        { value: 'planvital', label: 'PlanVital (1,16%)' },
        { value: 'habitat', label: 'Habitat (1,27%)' },
        { value: 'capital', label: 'Capital (1,44%)' },
        { value: 'cuprum', label: 'Cuprum (1,44%)' },
        { value: 'provida', label: 'ProVida (1,45%)' },
      ]},
      { id: 'saludTipo', label: 'Sistema de Salud', type: 'select', required: true, options: [
        { value: 'fonasa', label: 'FONASA (7%)' },
        { value: 'isapre', label: 'Isapre (máx. 7% o plan)' },
      ], tooltip: 'FONASA descuenta 7% del imponible topado. Isapre: el mayor entre 7% y el precio del plan en UF.' },
      { id: 'isapreMonto', label: 'Plan Isapre (UF)', type: 'number', unit: 'UF', placeholder: '3.5', required: false, min: 0, tooltip: 'Precio del plan en UF. Si supera el 7% legal, se descuenta el plan. Con FONASA puedes dejarlo en 0.' },
      { id: 'contratoIndefinido', label: '¿Contrato indefinido?', type: 'boolean', required: false, defaultValue: true, tooltip: 'Indefinido: el trabajador cotiza 0,6% de cesantía. Plazo fijo/obra: 0% trabajador / 3% empleador.' },
      { id: 'bonoMovilizacion', label: 'Bono movilización (no imponible)', type: 'number', unit: 'CLP', placeholder: '$0', required: false, min: 0 },
      { id: 'bonoColacion', label: 'Bono colación (no imponible)', type: 'number', unit: 'CLP', placeholder: '$0', required: false, min: 0 },
      { id: 'bonoPerdidaCaja', label: 'Bono pérdida de caja (no imponible)', type: 'number', unit: 'CLP', placeholder: '$0', required: false, min: 0 },
      { id: 'comisiones', label: 'Comisiones (imponibles)', type: 'number', unit: 'CLP', placeholder: '$0', required: false, min: 0 },
      { id: 'asignacionFamiliar', label: 'Asignación familiar (no imponible)', type: 'number', unit: 'CLP', placeholder: '$0', required: false, min: 0 },
      { id: 'prestamoEmpleador', label: 'Préstamo con empleador', type: 'number', unit: 'CLP', placeholder: '$0', required: false, min: 0 },
      { id: 'descuentoSindical', label: 'Descuento sindical', type: 'number', unit: 'CLP', placeholder: '$0', required: false, min: 0 },
      { id: 'descuentoCajaCompensacion', label: 'Descuento caja de compensación', type: 'number', unit: 'CLP', placeholder: '$0', required: false, min: 0 },
      { id: 'calculoInverso', label: '¿Cálculo inverso (líquido → bruto)?', type: 'boolean', required: false, defaultValue: false, tooltip: 'Estimación iterativa del bruto necesario para un líquido objetivo. Es aproximado: IUSC y topes no son lineales.' },
    ],
    faq: [
      {
        question: '¿Qué es el sueldo líquido?',
        answer: 'El sueldo líquido es el monto que recibes en tu cuenta bancaria después de todos los descuentos legales obligatorios. Estos descuentos incluyen: cotización AFP (10% + comisión), cotización de salud (7% para FONASA o Isapre), y el seguro de cesantía (0.6% para contrato indefinido). La diferencia entre sueldo bruto y líquido suele ser aproximadamente un 20%.',
      },
      {
        question: '¿Cuánto me descuentan del sueldo bruto?',
        answer: 'Los descuentos legales obligatorios suman aproximadamente un 20% del sueldo bruto: AFP 10% + comisión (varía por AFP, entre 0.46% y 1.45%), salud 7% (FONASA o Isapre), y seguro de cesantía 0.6% (contrato indefinido) o 0% (contrato a plazo fijo). Además, si tu sueldo supera ciertos topes, se aplica retención de impuesto de segunda categoría.',
      },
      {
        question: '¿La gratificación se incluye en el sueldo líquido?',
        answer: 'Sí, la gratificación legal (25% de remuneración mensual o 4.75% del sueldo mínimo anual) se suma al sueldo base antes de aplicar los descuentos. Por lo tanto, el sueldo líquido que recibes ya incluye la gratificación, siempre que tu empleador la pague mensualmente.',
      },
      {
        question: '¿Puedo elegir mi AFP?',
        answer: 'Sí, puedes cambiar libremente de AFP en cualquier momento. El proceso es gratuito y se realiza a través de la nueva AFP que elijas. Sin embargo, todas las AFP tienen la misma tasa de cotización obligatoria del 10%, lo que varía es la comisión que cobran y la rentabilidad de los fondos.',
      },
      {
        question: '¿Qué pasa si gano más del tope imponible?',
        answer: 'Si tu sueldo supera el tope imponible (90 UF mensuales en 2026 para AFP y salud, 135.2 UF para seguro de cesantía), las cotizaciones se calculan solo sobre ese tope, no sobre el total de tu sueldo. Esto significa que el porcentaje de descuento efectivo es menor para sueldos muy altos.',
      },
      {
        question: '¿Cómo se calcula el factor de conversión bruto a líquido?',
        answer: 'El factor de conversión bruto a líquido es el porcentaje que representa tu sueldo líquido respecto a tu sueldo bruto. Por ejemplo, si tu sueldo bruto es $1.000.000 y tu líquido es $800.000, el factor de conversión es del 80%. Este factor varía según tus cotizaciones y descuentos.',
      },
      {
        question: '¿Puedo calcular de líquido a bruto?',
        answer: 'Sí, nuestra calculadora permite calcular el sueldo bruto necesario para obtener un sueldo líquido objetivo. Esta función es útil para negociar remuneraciones o entender cuánto debes ganar bruto para recibir un cierto monto líquido.',
      },
      {
        question: '¿Se consideran bonos y asignaciones?',
        answer: 'Sí, puedes incluir bonos de movilización, colación, pérdida de caja, comisiones y asignación familiar. Los bonos de movilización y colación son no imponibles (no afectan cotizaciones), mientras que las comisiones sí son imponibles.',
      },
      {
        question: '¿Se consideran descuentos adicionales?',
        answer: 'Sí, puedes incluir descuentos por préstamos con el empleador, sindicatos o cajas de compensación. Estos descuentos se restan del sueldo líquido final.',
      },
      {
        question: '¿El tramo FONASA cambia el descuento de salud?',
        answer: 'No. En la liquidación el descuento de salud FONASA es 7% del imponible topado. Los tramos A/B/C/D afectan copagos de atención médica, no el descuento mensual de cotización.',
      },
    ],
  },
  {
    id: 'finiquito',
    name: 'Finiquito',
    description: 'Calcula el monto de tu finiquito considerando indemnización, vacaciones y gratificación proporcional.',
    slug: 'calculadora-finiquito',
    category: 'beneficios',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-08',
    sources: [
      { name: 'Dirección del Trabajo', url: 'https://www.dt.gob.cl', note: 'Código del Trabajo y finiquito' },
      { name: 'SUSESO — Art. 168', url: 'https://www.suseso.gob.cl/612/w3-propertyvalue-69859.html', note: 'Recargos judiciales por despido injustificado' },
    ],
    keywords: ['finiquito', 'calculadora finiquito', 'indemnización por años de servicio', 'vacaciones proporcionales', 'renuncia trabajo Chile'],
    inputs: [
      { id: 'ultimoSueldo', label: 'Último sueldo bruto (base)', type: 'number', unit: 'CLP', placeholder: '$1.000.000', required: true, min: 0 },
      { id: 'añosTrabajados', label: 'Años trabajados', type: 'number', placeholder: '5', required: true, min: 0 },
      { id: 'causaTermino', label: 'Causa de término', type: 'select', required: true, options: [
        { value: 'renuncia', label: 'Renuncia' },
        { value: 'despido', label: 'Despido (genérico)' },
        { value: 'mutuo_acuerdo', label: 'Mutuo acuerdo' },
        { value: 'necesidades_empresa', label: 'Necesidades de la empresa (Art. 161)' },
        { value: 'incumplimiento', label: 'Incumplimiento de obligaciones' },
        { value: 'vencimiento_plazo', label: 'Vencimiento de plazo' },
        { value: 'obra_faena', label: 'Obra o faena' },
        { value: 'caso_fortuito', label: 'Caso fortuito' },
        { value: 'muerte_trabajador', label: 'Muerte del trabajador' },
        { value: 'jubilacion', label: 'Jubilación' },
      ]},
      { id: 'mesesTrabajados', label: 'Meses adicionales (fracción de año)', type: 'number', placeholder: '0', required: false, min: 0, max: 11, defaultValue: 0 },
      { id: 'diasVacacionesPendientes', label: 'Días de vacaciones pendientes (año en curso)', type: 'number', placeholder: '0', required: false, min: 0, defaultValue: 0 },
      { id: 'vacacionesAniosAnteriores', label: 'Días de feriado pendiente de años anteriores', type: 'number', placeholder: '0', required: false, min: 0, tooltip: 'Se pagan siempre al término (Art. 73). Ingresa días, no años.' },
      { id: 'tieneGratificacion', label: '¿Incluir gratificación proporcional?', type: 'boolean', required: false, defaultValue: true },
      { id: 'horasExtraPromedio', label: 'Horas extra pendientes (monto CLP)', type: 'number', unit: 'CLP', placeholder: '0', required: false, min: 0, defaultValue: 0 },
      { id: 'bonosHabituales', label: 'Bonos habituales pendientes (CLP)', type: 'number', unit: 'CLP', placeholder: '0', required: false, min: 0, defaultValue: 0 },
      { id: 'diasTrabajadosUltimoMes', label: 'Días trabajados último mes (sueldo pendiente)', type: 'number', placeholder: '0', required: false, min: 0, max: 31, defaultValue: 0 },
      { id: 'sueldoPromedio', label: 'Sueldo promedio (opcional, base Art. 172)', type: 'number', unit: 'CLP', placeholder: '0', required: false, min: 0, tooltip: 'Si es mayor que 0, se usa como base en vez del último sueldo (tope 90 UF en indemnización).' },
      { id: 'diasAdicionalesConvenio', label: 'Días feriado extra por convenio', type: 'number', placeholder: '0', required: false, min: 0 },
      { id: 'incluyeAvisoPrevio', label: '¿Pagar indemnización sustitutiva de aviso previo?', type: 'boolean', required: false, defaultValue: false, tooltip: 'Actívalo solo si el empleador NO dio el aviso de 30 días (Art. 162). Suma ~1 mes de remuneración (tope 90 UF). Default: no (asume que sí avisó).' },
      { id: 'recargoArt168Pct', label: 'Escenario recargo Art. 168 (judicial)', type: 'select', required: false, options: [
        { value: '0', label: '0% — sin recargo (default)' },
        { value: '30', label: '30% — Art. 161 improcedente' },
        { value: '50', label: '50% — despido injustificado / sin causal' },
        { value: '80', label: '80% — causal indebida (falta de probidad, etc.)' },
        { value: '100', label: '100% — aplicación indebida grave' },
      ], defaultValue: '0', tooltip: 'Solo aplica si un juez declara el despido injustificado. NO es automático. Es un escenario hipotético sobre la indemnización por años.' },
    ],
    faq: [
      {
        question: '¿Qué es el finiquito?',
        answer: 'El finiquito es el documento legal que pone término a la relación laboral y detalla los pagos que el empleador debe entregar al trabajador. Incluye: sueldo devengado no pagado, vacaciones proporcionales o pendientes, y según la causal, indemnización por años de servicio. Es un derecho irrenunciable establecido en el Código del Trabajo.',
      },
      {
        question: '¿Cómo se calcula la indemnización por años de servicio?',
        answer: 'La indemnización por años de servicio equivale a 30 días de la última remuneración mensual por cada año trabajado (Art. 163 Código del Trabajo). Se calcula sobre el sueldo bruto y se paga solo en caso de despido injustificado o mutuo acuerdo con indemnización. El tope máximo es de 330 días (11 años).',
      },
      {
        question: '¿Qué son las vacaciones proporcionales?',
        answer: 'Las vacaciones proporcionales son los días de feriado legal que te corresponden por el tiempo trabajado en el año en que terminas tu contrato. Se calculan dividiendo los 15 días hábiles de vacaciones anuales entre 12 meses, dando 1.25 días por mes trabajado. Se pagan junto con el finiquito.',
      },
      {
        question: '¿Tengo derecho a indemnización si renuncio?',
        answer: 'No. Si renuncias voluntariamente, no tienes derecho a indemnización por años de servicio. Solo recibes el pago de días trabajados no pagados y vacaciones proporcionales o pendientes. Sin embargo, si es un mutuo acuerdo, puedes negociar una indemnización con tu empleador.',
      },
      {
        question: '¿Cuál es el tope de la indemnización?',
        answer: 'La indemnización por años de servicio tiene un tope máximo de 11 años de servicio (330 días), según el Art. 163 del Código del Trabajo. Además, la base de cálculo no puede exceder de 90 UF mensuales. Esto significa que hay un límite máximo legal que puede recibir el trabajador.',
      },
      {
        question: '¿Qué es la indemnización sustitutiva del aviso previo?',
        answer: 'La indemnización sustitutiva del aviso previo equivale a 1 mes de sueldo y se paga cuando el empleador despide sin dar el aviso previo correspondiente (30 días). El monto está limitado al tope de 90 UF mensuales.',
      },
      {
        question: '¿Se consideran vacaciones pendientes de años anteriores?',
        answer: 'Sí. El feriado pendiente de períodos anteriores se paga al término (Art. 73 CdT), sumado al proporcional del año en curso. Ingresa los días pendientes en el campo correspondiente.',
      },
      {
        question: '¿Qué es el recargo del Art. 168?',
        answer: 'Es un recargo judicial (30%, 50%, 80% o 100%) sobre la indemnización por años de servicio cuando el juez declara el despido injustificado o la causal improcedente. No es automático ni una “multa por pagar tarde el finiquito”. Úsalo solo como escenario hipotético.',
      },
      {
        question: '¿Cuándo se paga el aviso previo?',
        answer: 'Si el empleador despide sin el aviso de 30 días, debe pagar indemnización sustitutiva de un mes de remuneración (Art. 162), con tope de 90 UF. Activa esa opción solo en ese caso.',
      },
    ],
  },
  {
    id: 'uf-clp',
    name: 'Conversor UF ↔ CLP',
    description: 'Convierte entre UF y pesos chilenos con el valor de UF del snapshot/API del sitio (Banco Central / Mindicador). Sin histórico inventado ni proyecciones.',
    slug: 'calculadora-uf-clp',
    category: 'conversiones',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-08',
    sources: [
      { name: 'Banco Central — indicadores diarios', url: 'https://si3.bcentral.cl/indicadoressiete/secure/indicadoresdiarios.aspx', note: 'Valor diario de la UF' },
      { name: 'Banco Central — serie UF', url: 'https://si3.bcentral.cl/Indicadoressiete/secure/Serie.aspx?gcode=UF', note: 'Serie histórica oficial' },
    ],
    keywords: ['UF a CLP', 'convertir UF', 'valor UF hoy', 'calculadora UF', 'UF pesos chilenos'],
    inputs: [
      { id: 'monto', label: 'Monto', type: 'number', placeholder: '100', required: true, min: 0, tooltip: 'Cantidad de UF o de pesos según la dirección elegida.' },
      { id: 'direccion', label: 'Conversión', type: 'select', required: true, options: [
        { value: 'uf-a-clp', label: 'UF → CLP' },
        { value: 'clp-a-uf', label: 'CLP → UF' },
      ]},
    ],
    faq: [
      {
        question: '¿Qué es la UF?',
        answer: 'La UF (Unidad de Fomento) es una unidad de cuenta reajustada según la inflación, usada en Chile para transacciones de largo plazo (créditos hipotecarios, arriendos, contratos). Su valor se actualiza diariamente según el IPC.',
      },
      {
        question: '¿Qué valor de UF usa esta calculadora?',
        answer: 'Usa el valor de UF disponible en el sitio (API /api/values con prioridad Banco Central → Mindicador → snapshot local). El resultado muestra ese valor de referencia; para operaciones formales usa el valor oficial del día en el Banco Central.',
      },
      {
        question: '¿Cómo se convierte UF a pesos?',
        answer: 'Multiplica la cantidad de UF por el valor de la UF del día. Ejemplo: 10 UF × valor UF = monto en CLP. La dirección inversa divide pesos por el valor UF.',
      },
      {
        question: '¿Por qué se usa la UF en Chile?',
        answer: 'Para proteger el valor real del dinero frente a la inflación en contratos de largo plazo. Al expresar montos en UF, el valor se reajusta con el IPC.',
      },
      {
        question: '¿Puedo ver histórico o proyección de la UF aquí?',
        answer: 'No en esta calculadora: solo convierte con el valor de UF cargado en el sitio. El histórico oficial está en la serie del Banco Central. No ofrecemos proyecciones inventadas.',
      },
      {
        question: '¿Dónde verifico el valor oficial?',
        answer: 'En el Banco Central de Chile (indicadores diarios / serie UF) y, de forma complementaria, en mindicador.cl u otras réplicas. Para escritura o crédito, usa siempre el valor del día exacto de la operación.',
      },
    ],
  },
  {
    id: 'iva',
    name: 'Calculadora de IVA',
    description: 'Agrega o quita el IVA del 19% a cualquier monto. Neto ↔ bruto al instante.',
    slug: 'calculadora-iva',
    category: 'impuestos',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-08',
    sources: [
      { name: 'SII', url: 'https://www.sii.cl/destacados/iva/', note: 'Impuesto al Valor Agregado (19%)' },
      { name: 'BCN — Ley Chile', url: 'https://www.bcn.cl/leychile/navegar?idNorma=825', note: 'DL 825 de 1974, Ley de IVA' },
    ],
    seoTitle: 'Calculadora IVA Chile 2026: neto y bruto al instante',
    seoDescription:
      'Agrega o quita el IVA del 19% en segundos. Ejemplo: $100.000 neto = $119.000 con IVA. Gratis, sin registro. Datos SII / DL 825.',
    keywords: [
      'calculadora IVA',
      'calculadora de IVA',
      'calcular IVA',
      'calculadora IVA chile',
      'IVA Chile 2026',
      'agregar IVA',
      'quitar IVA',
      '19% IVA',
      'precio neto bruto',
      'sacar el IVA de un precio',
    ],
    inputs: [
      { id: 'monto', label: 'Monto', type: 'number', placeholder: '$100.000', required: true, min: 0 },
      { id: 'tipo', label: 'Operación', type: 'select', required: true, options: [
        { value: 'agregar-iva', label: 'Agregar IVA' },
        { value: 'quitar-iva', label: 'Quitar IVA' },
      ]},
    ],
    faq: [
      {
        question: '¿Cuánto es el IVA en Chile?',
        answer: 'El IVA (Impuesto al Valor Agregado) en Chile es del 19% desde 2003. Este impuesto se aplica a la venta de bienes muebles, prestación de servicios e importaciones. Es un impuesto indirecto que el consumidor final paga incluido en el precio de los productos y servicios.',
      },
      {
        question: '¿Cómo se calcula el IVA?',
        answer: 'Para calcular el IVA, multiplica el precio neto por 0.19 (19%). Por ejemplo, si un producto cuesta $100.000 neto, el IVA es $19.000 y el precio bruto total es $119.000. Nuestra calculadora hace este cálculo automáticamente.',
      },
      {
        question: '¿Cómo sacar el IVA de un precio?',
        answer: 'Para obtener el precio neto desde un precio con IVA incluido, divide el precio bruto entre 1.19. Por ejemplo, si el precio con IVA es $119.000, el precio neto es $100.000 ($119.000 ÷ 1.19). El IVA es la diferencia: $19.000.',
      },
      {
        question: '¿Qué es el precio neto y bruto?',
        answer: 'El precio neto es el valor del producto o servicio sin IVA. El precio bruto es el valor total que paga el consumidor, incluyendo el IVA del 19%. Por ejemplo: precio neto $100.000 + IVA $19.000 = precio bruto $119.000.',
      },
      {
        question: '¿Quiénes pagan IVA?',
        answer: 'El IVA lo paga el consumidor final al comprar bienes o servicios. Los vendedores y prestadores de servicios actúan como agentes recaudadores: cobran el IVA al cliente y luego lo declaran y pagan al SII. Algunos sectores tienen tratamientos especiales o están exentos, como la educación y servicios de salud.',
      },
    ],
  },
  {
    id: 'horas-extra',
    name: 'Horas Extra 2026',
    description: 'Calcula el pago de horas extraordinarias con recargo legal mínimo 50% y jornada vigente de 42 h/semana (Ley 21.561 desde abr-2026).',
    slug: 'calculadora-horas-extra',
    category: 'beneficios',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-08',
    sources: [
      { name: 'DT — valor hora extraordinaria', url: 'https://www.dt.gob.cl/portal/1628/w3-article-95182.html', note: 'Fórmula y jornada vigente' },
      { name: 'DT — Art. 32 horas extra', url: 'https://www.dt.gob.cl/portal/1628/w3-article-60173.html', note: 'Recargo 50%; sin recargo nocturno automático' },
    ],
    keywords: ['horas extra', 'pago horas extraordinarias', 'recargo 50%', 'jornada 42 horas', 'Código del Trabajo horas extra'],
    inputs: [
      { id: 'sueldoBruto', label: 'Sueldo bruto mensual', type: 'number', unit: 'CLP', placeholder: '$1.000.000', required: true, min: 0 },
      { id: 'horasExtra', label: 'Horas extra (ordinarias del período)', type: 'number', placeholder: '10', required: true, min: 0 },
      { id: 'jornadaSemanal', label: 'Jornada semanal (horas)', type: 'select', required: false, options: [
        { value: '42', label: '42 h — vigente desde 26-04-2026 (default)' },
        { value: '44', label: '44 h — vigente abr-2024 a abr-2026' },
        { value: '45', label: '45 h — histórica (antes 2024)' },
        { value: '40', label: '40 h — desde abr-2028 / pactada' },
      ], defaultValue: '42', tooltip: 'Define el valor de la hora ordinaria: sueldo ÷ (jornada × 4,33).' },
      { id: 'esDomingo', label: '¿Tratar estas horas como domingo/festivo (recargo especial del motor)?', type: 'boolean', required: false, defaultValue: false, tooltip: 'El mínimo legal del Art. 32 es 50%. El motor puede aplicar un recargo mayor en este escenario (configuración actual). Convenios pueden mejorar el mínimo.' },
      { id: 'horasExtraFestivos', label: 'Horas extra en festivos (adicionales)', type: 'number', placeholder: '0', required: false, min: 0, defaultValue: 0 },
      { id: 'recargoPersonalizado', label: 'Recargo personalizado (%)', type: 'number', placeholder: '50', required: false, min: 0, max: 200, tooltip: 'Vacío = usa el recargo del motor (50% o el de domingo/festivo). Convenio colectivo puede pactar más.' },
      { id: 'sueldoVariable', label: '¿Usar promedio de sueldo variable?', type: 'boolean', required: false, defaultValue: false },
      { id: 'sueldoPromedio3Meses', label: 'Promedio últimos 3 meses (si variable)', type: 'number', unit: 'CLP', placeholder: '0', required: false, min: 0 },
      { id: 'calcularImpactoCotizaciones', label: '¿Estimar impacto en cotizaciones (10%+7%+0,6%)?', type: 'boolean', required: false, defaultValue: false },
      { id: 'mostrarTopeLegal', label: '¿Mostrar tope legal (2 h/día)?', type: 'boolean', required: false, defaultValue: false },
    ],
    faq: [
      {
        question: '¿Cuánto me pagan por una hora extra?',
        answer: 'El recargo legal mínimo es 50% sobre la hora ordinaria (Art. 32 CdT). Con jornada de 42 h/semana (vigente desde 26-04-2026), las horas mensuales de referencia son 42 × 4,33. Valor hora extra ≈ (sueldo / esas horas) × 1,5.',
      },
      {
        question: '¿Existe recargo nocturno automático?',
        answer: 'No. En Chile no hay un recargo legal automático por trabajar de noche en horas extraordinarias. El 50% mínimo aplica igual de día o de noche, salvo pacto o convenio más favorable.',
      },
      {
        question: '¿Cuál es la jornada semanal vigente?',
        answer: 'Desde el 26 de abril de 2026 la jornada máxima ordinaria es 42 horas semanales (Ley 21.561, 2ª etapa). En 2028 baja a 40. Elige la jornada correcta para no subestimar el valor hora.',
      },
      {
        question: '¿Cuál es el tope de horas extra?',
        answer: 'Como regla general, máximo 2 horas extraordinarias por día (Art. 31), para atender necesidades temporales y con pacto. Exceder el tope puede ser sancionado por la Inspección del Trabajo.',
      },
      {
        question: '¿Las horas extra cotizan AFP y salud?',
        answer: 'Sí, forman parte de la remuneración imponible y se cotizan. Puedes activar el estimado de impacto (10% AFP obligatoria + 7% salud + 0,6% cesantía trabajador, sin comisión AFP variable).',
      },
    ],
  },
  {
    id: 'vacaciones-proporcionales',
    name: 'Vacaciones Proporcionales',
    description: 'Calcula tus vacaciones proporcionales al finiquito o renuncia. Días de feriado legal según meses trabajados. Basado en Código del Trabajo Art. 67.',
    slug: 'calculadora-vacaciones-proporcionales',
    category: 'beneficios',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-08',
    sources: [
      { name: 'Dirección del Trabajo', url: 'https://www.dt.gob.cl', note: 'Feriado proporcional, Código del Trabajo Art. 67' },
    ],
    seoTitle: 'Vacaciones Proporcionales 2026: calcula en pesos',
    seoDescription:
      'Calcula tus días y el monto en pesos de vacaciones proporcionales en Chile. Ideal al renunciar o al finiquito. Gratis, Código del Trabajo.',
    keywords: ['vacaciones proporcionales', 'feriado proporcional', 'días de vacaciones', 'finiquito vacaciones', 'Código del Trabajo Art. 67', 'calculadora vacaciones'],
    inputs: [
      { id: 'sueldoBruto', label: 'Sueldo Bruto', type: 'number', placeholder: '$500.000', required: true, min: 0 },
      { id: 'mesesTrabajados', label: 'Meses Trabajados', type: 'number', placeholder: '6', required: true, min: 0, max: 11 },
      { id: 'diasNoTomados', label: 'Días de vacaciones no tomados', type: 'number', placeholder: '0', required: false, min: 0, defaultValue: 0 },
    ],
    faq: [
      {
        question: '¿Cómo se calculan las vacaciones proporcionales?',
        answer: 'Las vacaciones proporcionales se calculan dividiendo los 15 días hábiles de feriado anual entre 12 meses, dando 1.25 días por cada mes trabajado. Por ejemplo, si trabajaste 6 meses, te corresponden 7.5 días de vacaciones proporcionales (6 × 1.25).',
      },
      {
        question: '¿Cuántos días de vacaciones me corresponden por año?',
        answer: 'Según el Art. 67 del Código del Trabajo, todo trabajador con más de un año de servicio tiene derecho a 15 días hábiles de feriado anual. Estos días no incluyen domingos ni festivos, por lo que en la práctica pueden ser hasta 21 días corridos.',
      },
      {
        question: '¿Se pagan las vacaciones proporcionales en el finiquito?',
        answer: 'Sí, al término del contrato se deben pagar las vacaciones proporcionales correspondientes al tiempo trabajado en el año en curso, más cualquier día de vacaciones pendiente de años anteriores que no se hayan tomado. Este pago se calcula sobre el último sueldo bruto.',
      },
      {
        question: '¿Qué pasa si no tomé mis vacaciones?',
        answer: 'Si al terminar tu contrato tienes días de vacaciones acumulados sin tomar, el empleador debe pagártelos en el finiquito. El valor de cada día se calcula dividiendo tu sueldo mensual por 30. No puedes renunciar a este derecho.',
      },
      {
        question: '¿Qué dice el Art. 67 del Código del Trabajo?',
        answer: 'El Art. 67 establece que los trabajadores con más de un año de servicio tienen derecho a 15 días hábiles de feriado anual con derecho a remuneración íntegra. El Art. 68 permite acumular hasta dos períodos consecutivos de vacaciones. El Art. 70 regula el feriado proporcional para quienes no completan el año.',
      },
    ],
  },
  {
    id: 'boleta-honorarios',
    name: 'Boleta de Honorarios 2026',
    description: 'Calcula la retención de boleta de honorarios (calendario Ley 21.133: 15,25% en 2026), monto líquido y desglose informativo. Sin doble descuento de cotizaciones.',
    slug: 'calculadora-boleta-honorarios',
    category: 'impuestos',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-08',
    sources: [
      { name: 'SII — Boletas de honorarios', url: 'https://www.sii.cl/destacados/boletas_honorarios/', note: 'Régimen y emisión' },
      { name: 'SII — Aumento gradual de retención', url: 'https://www.sii.cl/destacados/boletas_honorarios/aumento_gradual.html', note: 'Calendario % por año (Ley 21.133)' },
      { name: 'SII — Cotizaciones independientes', url: 'https://www.sii.cl/destacados/renta/2025/cotizaciones_previsionales_informacion_general.html', note: 'La retención financia cotizaciones en Operación Renta' },
    ],
    keywords: ['boleta de honorarios', 'retención honorarios', 'impuesto independientes', '15.25% retención', 'honorarios Chile'],
    inputs: [
      { id: 'montoBruto', label: 'Monto bruto', type: 'number', unit: 'CLP', placeholder: '$100.000', required: true, min: 0 },
      { id: 'ano', label: 'Año de la boleta', type: 'select', required: true, options: [
        { value: '2025', label: '2025 (14,5%)' },
        { value: '2026', label: '2026 (15,25%)' },
        { value: '2027', label: '2027 (16%)' },
        { value: '2028', label: '2028 (17%)' },
      ], defaultValue: '2026', tooltip: 'Calendario de retención gradual (Ley 21.133). El % se aplica sobre el bruto de la boleta.' },
      { id: 'incluyeCotizaciones', label: '¿Mostrar desglose de la retención? (informativo)', type: 'boolean', required: false, defaultValue: false, tooltip: 'No descuenta nada extra. Solo estima cómo se reparte la retención (impuesto/AFP/salud/SIS). El líquido sigue siendo bruto − retención.' },
      { id: 'moneda', label: 'Mostrar también en UF', type: 'select', required: false, options: [
        { value: 'CLP', label: 'Solo CLP' },
        { value: 'UF', label: 'CLP + equivalente UF' },
      ], defaultValue: 'CLP' },
      { id: 'calcularPPM', label: '¿Estimar componente PPM (impuesto renta)?', type: 'boolean', required: false, defaultValue: false },
      { id: 'calcularCostoEmpleador', label: '¿Mostrar costo del pagador (bruto)?', type: 'boolean', required: false, defaultValue: false },
    ],
    faq: [
      {
        question: '¿Cuánto es la retención de boleta de honorarios?',
        answer: 'En 2026 la retención es 15,25% del monto bruto (calendario de la Ley 21.133, no de la 21.578 de ingreso mínimo). Sube gradualmente hasta 17% en 2028. El emisor recibe el bruto menos esa retención.',
      },
      {
        question: '¿La retención ya incluye cotizaciones previsionales?',
        answer: 'Sí. La retención es el vehículo con el que el SII retiene para impuesto y cotizaciones de independientes, que se liquidan en la Operación Renta. No debes restar otra vez AFP o salud sobre el mismo bruto al calcular el líquido de la boleta.',
      },
      {
        question: '¿Cuál es la diferencia entre monto bruto y líquido?',
        answer: 'Bruto = valor del servicio. Líquido = bruto − retención del año. Ejemplo 2026: $1.000.000 bruto → $152.500 de retención → $847.500 líquidos.',
      },
      {
        question: '¿Cómo cambia la retención por año?',
        answer: 'Según el SII: 14,5% (2025), 15,25% (2026), 16% (2027), 17% (2028). Elige el año de emisión de la boleta.',
      },
      {
        question: '¿Qué es el PPM en este contexto?',
        answer: 'Estimación del componente de impuesto a la renta dentro de la retención (referencia Art. 84 LIR). No es un descuento adicional al líquido de la boleta.',
      },
    ],
  },
  // ============================================
  // NUEVAS CALCULADORAS FASE 1 - Marzo 2026
  // ============================================
  {
    id: 'utm-clp',
    name: 'Conversor UTM ↔ CLP',
    description: 'Convierte entre UTM y pesos chilenos con el valor actualizado de marzo 2026. Calcula multas, permisos y trámites tributarios.',
    slug: 'calculadora-utm-clp',
    category: 'conversiones',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'Banco Central de Chile', url: 'https://www.bcentral.cl/areas/estadisticas/estadisticas-de-precios/utm', note: 'Valor mensual de la UTM' },
    ],
    keywords: ['UTM a CLP', 'convertir UTM', 'valor UTM hoy', 'calculadora UTM', 'UTM pesos chilenos', 'unidad tributaria mensual'],
    inputs: [
      { id: 'monto', label: 'Monto', type: 'number', placeholder: '10', required: true, min: 0 },
      { id: 'direccion', label: 'Conversión', type: 'select', required: true, options: [
        { value: 'utm-a-clp', label: 'UTM a CLP' },
        { value: 'clp-a-utm', label: 'CLP a UTM' },
      ]},
    ],
    faq: [
      {
        question: '¿Qué es la UTM?',
        answer: 'La UTM (Unidad Tributaria Mensual) es una unidad de cuenta usada en Chile para fines tributarios y multas. A diferencia de la UF, la UTM se actualiza mensualmente según la variación del IPC del mes anterior. Se usa para calcular multas de tránsito, permisos municipales, patentes comerciales y otros trámites tributarios.',
      },
      {
        question: '¿Cuánto vale la UTM en marzo 2026?',
        answer: 'En marzo 2026, la UTM vale $67.900 pesos chilenos. Este valor se actualiza mensualmente según el IPC. Puedes usar nuestra calculadora para convertir entre UTM y pesos chilenos con el valor actualizado.',
      },
      {
        question: '¿Cuál es la diferencia entre UTM y UF?',
        answer: 'La UTM se actualiza mensualmente por el IPC y se usa para fines tributarios (multas, patentes, permisos). La UF se actualiza diariamente y se usa para transacciones financieras de largo plazo (créditos hipotecarios, arriendos). Ambas son unidades de cuenta reajustables pero tienen usos diferentes.',
      },
      {
        question: '¿Para qué se usa la UTM?',
        answer: 'La UTM se usa para: multas de tránsito (0.5 a 3 UTM), permiso de circulación (calculado en UTM), patentes comerciales, contribuciones de bienes raíces, multas del SII, tasas municipales, y muchos otros trámites tributarios. Conocer el valor de la UTM te permite calcular el costo real en pesos.',
      },
      {
        question: '¿Cómo se calcula una multa en UTM?',
        answer: 'Para calcular una multa expresada en UTM, multiplica la cantidad de UTM por el valor actual. Por ejemplo, una multa de 1.5 UTM con UTM a $67.900 equivale a $101.850 pesos chilenos. Nuestra calculadora hace esta conversión automáticamente.',
      },
    ],
  },
  {
    id: 'gratificacion-legal',
    name: 'Gratificación Legal 2026',
    description: 'Calcula tu gratificación legal según el Art. 50 del Código del Trabajo. Conoce el tope anual de 4.75 IMM y cómo afecta tu sueldo.',
    slug: 'calculadora-gratificacion-legal',
    category: 'beneficios',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'Dirección del Trabajo', url: 'https://www.dt.gob.cl', note: 'Gratificación legal, Código del Trabajo Art. 47 y 50' },
      { name: 'SII', url: 'https://www.sii.cl', note: 'Tope exento de gratificación (2,75 UTM anuales)' },
    ],
    keywords: ['gratificación legal', 'calculadora gratificación', '25% remuneración', '4.75 IMM', 'Art. 47 Código del Trabajo', 'Art. 50 Código del Trabajo', 'aguinaldo legal'],
    inputs: [
      { id: 'sueldoBruto', label: 'Sueldo Bruto Mensual', type: 'number', placeholder: '$500.000', required: true, min: 0 },
      { id: 'mesesTrabajados', label: 'Meses Trabajados', type: 'number', placeholder: '12', required: true, min: 1, max: 12 },
      { id: 'tipoGratificacion', label: 'Tipo de Cálculo', type: 'select', required: true, options: [
        { value: 'mensual', label: 'Mensual' },
        { value: 'anual', label: 'Anual' },
      ]},
    ],
    faq: [
      {
        question: '¿Qué es la gratificación legal?',
        answer: 'La gratificación legal es un beneficio obligatorio que el empleador debe pagar a los trabajadores que devengan remuneraciones variables o que ganen menos de 4.75 UTA anuales (Art. 47 del Código del Trabajo). La modalidad más usada (Art. 50) corresponde al 25% de la remuneración mensual, con un tope de 4.75 ingresos mínimos mensuales (IMM) anuales.',
      },
      {
        question: '¿Cómo se calcula la gratificación?',
        answer: 'La gratificación (Art. 50 del Código del Trabajo) se calcula de dos formas y se paga la que resulte MENOR: (1) 25% de la remuneración mensual, o (2) 4.75 ingresos mínimos mensuales (IMM) anuales divididos en 12. En la práctica, los sueldos bajos y medios pagan el 25% (porque es menor que el tope), y los sueldos altos quedan topeados en 4.75 IMM/12 mensual.',
      },
      {
        question: '¿Cuál es el tope de la gratificación?',
        answer: 'El tope máximo de la gratificación (Art. 50 del Código del Trabajo) es de 4.75 ingresos mínimos mensuales (IMM) anuales. En 2026, con IMM a $553.553, el tope anual es $2.629.377 (4.75 × $553.553), lo que equivale a unos $219.114 mensuales máximos de gratificación.',
      },
      {
        question: '¿Todos los trabajadores tienen derecho a gratificación?',
        answer: 'Tienen derecho a gratificación los trabajadores que ganen menos de 4.75 UTA anuales. Los trabajadores que excedan este monto no tienen derecho legal a gratificación, aunque el empleador puede otorgarla voluntariamente. También están excluidos los trabajadores de casa particular y algunos regímenes especiales.',
      },
      {
        question: '¿La gratificación se paga mensual o anualmente?',
        answer: 'El empleador puede pagar la gratificación mensualmente (anticipo) o en un solo pago anual. Lo más común es pagarla mensualmente junto con el sueldo. Si se paga anualmente, debe liquidarse en abril de cada año por el período abril-marzo anterior.',
      },
    ],
  },
  {
    id: 'indemnizacion-anos-servicio',
    name: 'Indemnización por Años de Servicio',
    description: 'Calcula tu indemnización por años de servicio según el Art. 163 del Código del Trabajo. 30 días por año, tope 11 años.',
    slug: 'calculadora-indemnizacion-anos-servicio',
    category: 'beneficios',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'Dirección del Trabajo', url: 'https://www.dt.gob.cl', note: 'Indemnización por años de servicio, Código del Trabajo Art. 163' },
      { name: 'SII', url: 'https://www.sii.cl', note: 'Tope exento de impuesto (30 UTM por año)' },
    ],
    keywords: ['indemnización años de servicio', 'calculadora indemnización', '30 días por año', 'Art. 163 Código del Trabajo', 'despido injustificado', 'tope 11 años'],
    inputs: [
      { id: 'ultimoSueldo', label: 'Último Sueldo Bruto', type: 'number', placeholder: '$500.000', required: true, min: 0 },
      { id: 'añosTrabajados', label: 'Años Trabajados', type: 'number', placeholder: '5', required: true, min: 0, max: 50 },
      { id: 'incluyeGratificacion', label: '¿Incluye gratificación?', type: 'boolean', required: false, defaultValue: true },
      { id: 'gratificacionMensual', label: 'Gratificación Mensual (si aplica)', type: 'number', placeholder: '$100.000', required: false, min: 0 },
    ],
    faq: [
      {
        question: '¿Qué es la indemnización por años de servicio?',
        answer: 'La indemnización por años de servicio es una compensación que el empleador debe pagar al trabajador cuando el contrato termina por despido injustificado o mutuo acuerdo con indemnización. Corresponde a 30 días de remuneración por cada año trabajado, con un tope de 11 años (330 días).',
      },
      {
        question: '¿Cómo se calcula la indemnización?',
        answer: 'La indemnización se calcula multiplicando 30 días de remuneración por cada año de servicio. La base de cálculo es el último sueldo bruto (incluye gratificación). Por ejemplo, con $500.000 de sueldo y 5 años: $500.000 × 5 = $2.500.000 de indemnización.',
      },
      {
        question: '¿Cuál es el tope de la indemnización?',
        answer: 'La indemnización tiene dos topes: (1) máximo 11 años de servicio (330 días), y (2) la base de cálculo no puede exceder 90 UF mensuales. En 2026, con UF a $37.600, el sueldo tope para cálculo es aproximadamente $3.384.000 mensuales.',
      },
      {
        question: '¿Tengo derecho a indemnización si renuncio?',
        answer: 'No. Si renuncias voluntariamente, no tienes derecho a indemnización por años de servicio. Solo la recibes si eres despedido sin causa justificada, o si terminas por mutuo acuerdo y el empleador acepta pagarla. Sí tienes derecho a vacaciones proporcionales independientemente de la causal.',
      },
      {
        question: '¿Qué dice el Art. 163 del Código del Trabajo?',
        answer: 'El Art. 163 establece que el empleador debe pagar indemnización equivalente a 30 días de la última remuneración mensual por cada año de servicio, con tope de 330 días. La base de cálculo incluye sueldo, gratificación y otras remuneraciones, pero no colación ni movilización.',
      },
    ],
  },
  {
    id: 'pension-alimenticia',
    name: 'Pensión Alimenticia',
    description: 'Calcula la pensión de alimentos sugerida según número de hijos e ingresos. Basado en la Ley 14.908 de Chile.',
    slug: 'calculadora-pension-alimenticia',
    category: 'familia',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'Dirección del Trabajo', url: 'https://www.dt.gob.cl', note: 'Retención de pensión de alimentos del sueldo' },
      { name: 'BCN — Ley Chile', url: 'https://www.bcn.cl/leychile', note: 'Ley 14.908 sobre pago de pensiones de alimentos' },
    ],
    keywords: ['pensión alimenticia', 'calculadora pensión', 'Ley 14.908', 'alimentos hijos', 'porcentaje pensión', 'alimentos Chile'],
    inputs: [
      { id: 'sueldoBruto', label: 'Sueldo Bruto', type: 'number', placeholder: '$500.000', required: true, min: 0 },
      { id: 'numeroHijos', label: 'Número de Hijos', type: 'number', placeholder: '2', required: true, min: 1, max: 10 },
      { id: 'tieneOtroIngreso', label: '¿Tienes otros ingresos?', type: 'boolean', required: false, defaultValue: false },
      { id: 'otroIngreso', label: 'Otros ingresos mensuales', type: 'number', placeholder: '$0', required: false, min: 0 },
    ],
    faq: [
      {
        question: '¿Cómo se calcula la pensión alimenticia?',
        answer: 'La pensión alimenticia se calcula como un porcentaje de los ingresos del padre/madre obligado: 40% para 1-2 hijos, 50% para 3-4 hijos, y 60% para 5 o más hijos. Estos porcentajes son orientativos y el juez puede modificarlos según las circunstancias del caso.',
      },
      {
        question: '¿Qué dice la Ley 14.908 sobre pensión alimenticia?',
        answer: 'La Ley 14.908 establece la obligación de pagar alimentos a los hijos menores de edad. Fija montos mínimos y porcentajes orientativos según el número de hijos. La ley también establece retención judicial del sueldo, interés por mora, y sanciones penales por no pagar.',
      },
      {
        question: '¿Cuál es el monto mínimo de pensión alimenticia?',
        answer: 'El monto mínimo varía según el número de hijos y se actualiza anualmente. En 2026, el mínimo aproximado es de $80.000 por hijo. Este monto puede ser mayor si los ingresos del obligado son altos o si hay necesidades especiales del niño/a.',
      },
      {
        question: '¿La pensión se calcula sobre el bruto o líquido?',
        answer: 'La pensión se calcula sobre el total de ingresos del obligado, incluyendo sueldo bruto, gratificaciones, bonos, comisiones y cualquier otro ingreso regular. Se descuentan los impuestos y cotizaciones previsionales para determinar la base de cálculo.',
      },
      {
        question: '¿Qué pasa si no pago la pensión alimenticia?',
        answer: 'El no pago de pensión alimenticia tiene consecuencias graves: retención judicial del sueldo, intereses por mora (interés máximo convencional), reporte a Dicom, prohibición de salir del país, y en casos graves, prisión por incumplimiento de obligaciones alimentarias.',
      },
    ],
  },
  {
    id: 'reajuste-arriendo',
    name: 'Reajuste de Arriendo UF/IPC',
    description: 'Calcula el reajuste de tu arriendo según variación UF o IPC. Conoce cuánto puede subir tu arriendo legalmente en Chile.',
    slug: 'calculadora-reajuste-arriendo',
    category: 'vivienda',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'Banco Central de Chile', url: 'https://www.bcentral.cl/areas/estadisticas', note: 'Variación IPC para reajuste de arriendo' },
      { name: 'MINVU', url: 'https://www.minvu.gob.cl', note: 'Ley 18.101 de arrendamiento de predios urbanos' },
    ],
    keywords: ['reajuste arriendo', 'aumento arriendo', 'IPC arriendo', 'UF arriendo', 'reajuste contrato arriendo', 'tope aumento arriendo Chile'],
    inputs: [
      { id: 'arriendoActual', label: 'Arriendo Actual', type: 'number', placeholder: '$300.000', required: true, min: 0 },
      { id: 'arriendoEnUF', label: '¿El arriendo está en UF?', type: 'boolean', required: false, defaultValue: false },
      { id: 'variacionIPC', label: 'Variación IPC Anual (%)', type: 'number', placeholder: '4.5', required: true, min: 0, max: 100 },
      { id: 'mesesDesdeUltimoReajuste', label: 'Meses desde último reajuste', type: 'number', placeholder: '12', required: true, min: 1, max: 60 },
    ],
    faq: [
      {
        question: '¿Cuánto puede subir el arriendo en Chile?',
        answer: 'El reajuste del arriendo depende del contrato. Si está en UF, se reajusta automáticamente con la variación de la UF. Si está en pesos, se reajusta según el IPC acumulado del período. No hay un tope legal de aumento, pero debe estar estipulado en el contrato y no puede ser abusivo.',
      },
      {
        question: '¿Con qué frecuencia se puede reajustar el arriendo?',
        answer: 'La frecuencia del reajuste debe estar establecida en el contrato de arriendo. Lo más común es reajustar anualmente, pero puede ser cada 6 meses o incluso mensualmente si así se pactó. Sin cláusula de reajuste, el arrendador no puede aumentar el arriendo unilateralmente.',
      },
      {
        question: '¿Es mejor arrendar en UF o pesos?',
        answer: 'Arrendar en UF protege al arrendador de la inflación y al arrendatario de aumentos arbitrarios. En UF, el valor se reajusta automáticamente. En pesos, el aumento se negocia según IPC. Para contratos de largo plazo, la UF es más predecible.',
      },
      {
        question: '¿Qué es el IPC y cómo afecta el arriendo?',
        answer: 'El IPC (Índice de Precios al Consumidor) mide la variación de precios en la economía. Si el arriendo está en pesos, el reajuste se calcula según el IPC acumulado. Por ejemplo, si el IPC anual fue 4.5%, un arriendo de $300.000 subiría a $313.500.',
      },
      {
        question: '¿Puedo negarme a un aumento de arriendo?',
        answer: 'Si el contrato establece el reajuste y este se calcula correctamente según UF o IPC, no puedes negarte. Sin embargo, si el aumento es abusivo o no está en el contrato, puedes negociar o rechazarlo. En caso de disputa, puedes recurrir al Tribunal de Policía Local o SERNAC.',
      },
    ],
  },
  {
    id: 'permiso-circulacion',
    name: 'Permiso de Circulación 2026',
    description: 'Calcula el costo de tu permiso de circulación según tipo de vehículo y antigüedad. Incluye descuentos por años.',
    slug: 'calculadora-permiso-circulacion',
    category: 'vehiculos',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-08',
    sources: [
      { name: 'Tesorería General de la República', url: 'https://www.tesoreria.cl/permiso-de-circulacion/', note: 'Permiso de circulación anual' },
      { name: 'SII', url: 'https://www.sii.cl', note: 'Tasación fiscal de vehículos' },
      { name: 'ChileAtiende', url: 'https://www.chileatiende.gob.cl/fichas/9611-permiso-de-circulacion', note: 'Plazos y cuotas 2026' },
    ],
    seoTitle: 'Permiso de Circulación 2026: calcula el valor',
    seoDescription:
      'Estima tu permiso de circulación 2026 según valor del vehículo y antigüedad. Incluye idea de 1ª y 2ª cuota (ago). Confirma en tu municipio.',
    keywords: [
      'permiso de circulación',
      'calcular permiso de circulacion',
      'costo permiso circulación',
      'permiso municipal',
      'calculo permiso de circulacion',
      'permiso 2026',
      'descuento antigüedad vehículo',
    ],
    inputs: [
      { id: 'valorVehiculo', label: 'Valor del Vehículo', type: 'number', placeholder: '$15.000.000', required: true, min: 0 },
      { id: 'tipoVehiculo', label: 'Tipo de Vehículo', type: 'select', required: true, options: [
        { value: 'automovil', label: 'Automóvil' },
        { value: 'motocicleta', label: 'Motocicleta' },
        { value: 'carga', label: 'Vehículo de Carga' },
        { value: 'bus', label: 'Bus' },
        { value: 'taxi', label: 'Taxi' },
        { value: 'camion', label: 'Camión' },
      ]},
      { id: 'antiguedadVehiculo', label: 'Antigüedad (años)', type: 'number', placeholder: '5', required: true, min: 0, max: 50 },
      { id: 'esZonaCarga', label: '¿Zona de carga pesada?', type: 'boolean', required: false, defaultValue: false },
      { id: 'esPrimeraVez', label: '¿Primera vez en la comuna?', type: 'boolean', required: false, defaultValue: false },
    ],
    faq: [
      {
        question: '¿Cómo se calcula el permiso de circulación?',
        answer: 'El permiso de circulación se calcula como un porcentaje del valor del vehículo (1.5% a 3.5% según tipo), con descuentos por antigüedad. A mayor antigüedad, menor es el permiso. El monto base se expresa en UTM y varía según la comuna y tipo de vehículo.',
      },
      {
        question: '¿Cuánto cuesta el permiso de circulación 2026?',
        answer: 'El costo varía según el valor del vehículo y su antigüedad. Para un auto nuevo de $15.000.000, el permiso 2026 cuesta aproximadamente $300.000-$400.000. Un auto de 10 años paga mucho menos, alrededor de $50.000-$80.000 por los descuentos por antigüedad.',
      },
      {
        question: '¿Qué descuentos hay por antigüedad del vehículo?',
        answer: 'Los descuentos por antigüedad son: años 1-5 sin descuento, años 6-10 descuento 25%, años 11-15 descuento 50%, años 16-20 descuento 75%, más de 20 años descuento 90%. Estos descuentos se aplican sobre el monto base del permiso.',
      },
      {
        question: '¿Cuándo se paga el permiso de circulación?',
        answer: 'El permiso de circulación se paga anualmente entre enero y marzo. El permiso vence el 31 de marzo de cada año. Si pagas después de marzo, se aplican recargos por mora. El pago se realiza en la municipalidad donde está registrado el vehículo.',
      },
      {
        question: '¿Qué documentos necesito para pagar el permiso?',
        answer: 'Necesitas: padrón del vehículo (o certificado de inscripción), revisión técnica vigente, SOAP vigente, y cédula de identidad. Si es primera vez en la comuna, también necesitas el certificado de mudanza o cambio de domicilio.',
      },
    ],
  },
  {
    id: 'costo-empleado-pyme',
    name: 'Costo Total Empleado PYME',
    description: 'Calcula el costo real de un empleado para tu PYME: sueldo, cotizaciones, gratificación y aportes del empleador.',
    slug: 'calculadora-costo-empleado-pyme',
    category: 'empresas',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'Dirección del Trabajo', url: 'https://www.dt.gob.cl', note: 'Cotizaciones obligatorias y Código del Trabajo' },
      { name: 'Superintendencia de Pensiones', url: 'https://www.spensiones.cl/portal/prevision', note: 'Comisiones AFP (aporte empleador)' },
      { name: 'AFC Chile', url: 'https://www.afc.cl/seguro-de-cesantia/', note: 'Seguro de cesantía (aporte empleador 2.4%)' },
      { name: 'SII', url: 'https://www.sii.cl', note: 'Impuesto único a las rentas del trabajo' },
    ],
    keywords: ['costo empleado PYME', 'cuánto cuesta un empleado', 'gasto empleador', 'cotizaciones patronales', 'costo total trabajador Chile', 'sueldo real empresa'],
    inputs: [
      { id: 'sueldoBruto', label: 'Sueldo Bruto Mensual', type: 'number', placeholder: '$500.000', required: true, min: 0 },
      { id: 'afp', label: 'AFP del Empleado', type: 'select', required: true, options: [
        { value: 'capital', label: 'Capital' },
        { value: 'cuprum', label: 'Cuprum' },
        { value: 'habitat', label: 'Habitat' },
        { value: 'modelo', label: 'Modelo' },
        { value: 'planvital', label: 'PlanVital' },
        { value: 'provida', label: 'ProVida' },
        { value: 'uno', label: 'Uno' },
      ]},
      { id: 'saludTipo', label: 'Sistema de Salud', type: 'select', required: true, options: [
        { value: 'fonasa', label: 'FONASA' },
        { value: 'isapre', label: 'Isapre' },
      ]},
      { id: 'contratoIndefinido', label: '¿Contrato Indefinido?', type: 'boolean', required: false, defaultValue: true },
      { id: 'gratificacionIncluida', label: '¿Incluye gratificación?', type: 'boolean', required: false, defaultValue: true },
      { id: 'horasExtra', label: 'Horas Extra Mensuales', type: 'number', placeholder: '0', required: false, min: 0, defaultValue: 0 },
    ],
    faq: [
      {
        question: '¿Cuánto cuesta realmente un empleado en Chile?',
        answer: 'El costo real de un empleado es aproximadamente 1.3 a 1.5 veces el sueldo bruto. Para un sueldo de $500.000, el costo total para la empresa es de unos $650.000-$750.000 mensuales. Esto incluye: sueldo bruto, gratificación, aportes del empleador (SIS 1.62%, seguro cesantía 2.4%), y beneficios adicionales.',
      },
      {
        question: '¿Qué aportes debe pagar el empleador?',
        answer: 'El empleador debe pagar: SIS (Seguro de Invalidez y Sobrevivencia) 1.62% del sueldo imponible, Seguro de Cesantía 2.4% (contrato indefinido), y cotización de salud 7% si el empleado está en FONASA. Además debe pagar gratificación legal (25% con tope de 4.75 IMM anuales según Art. 50).',
      },
      {
        question: '¿Qué es el factor precacional?',
        answer: 'El factor precacional es la relación entre el costo total del empleado y el sueldo bruto. Se usa para calcular el valor hora de un empleado. Un factor típico es 1.3-1.5, lo que significa que por cada $100 de sueldo bruto, la empresa paga $130-$150 en total.',
      },
      {
        question: '¿Cómo afectan las horas extra al costo?',
        answer: 'Las horas extra aumentan el costo total del empleado. Se pagan con recargo 50% (o 100% en domingos/festivos) y también están afectas a cotizaciones previsionales. Si un empleado hace muchas horas extra, el costo para la empresa aumenta proporcionalmente.',
      },
      {
        question: '¿Hay diferencias para PYME?',
        answer: 'Las PYME con menos de 25 trabajadores tienen algunas exenciones parciales en el seguro de cesantía. Además, pueden acceder a subsidios del SENCE para contratar trabajadores jóvenes o mujeres. El costo base del empleado es el mismo, pero hay beneficios tributarios disponibles.',
      },
    ],
  },
  // ============================================
  // FASE 1 RESTANTE
  // ============================================
  {
    id: 'credito-hipotecario',
    name: 'Simulador Crédito Hipotecario 2026',
    description: 'Simula tu dividendo mensual de crédito hipotecario en UF y CLP. Calcula interés total, costo del crédito y cuota con amortización francesa.',
    slug: 'calculadora-credito-hipotecario',
    category: 'vivienda',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-08',
    sources: [
      { name: 'CMF', url: 'https://www.cmfchile.cl', note: 'Regulación de créditos hipotecarios y TMC' },
      { name: 'SERNAC — CAE', url: 'https://www.sernac.cl/portal/618/w3-article-11834.html', note: 'Carga Anual Equivalente' },
      { name: 'Banco Central — UF', url: 'https://www.bcentral.cl/areas/estadisticas/estadisticas-de-precios/uf', note: 'UF del día' },
    ],
    keywords: ['crédito hipotecario', 'simulador dividendo', 'crédito vivienda Chile', 'hipoteca UF', 'amortización francesa', 'dividendo mensual'],
    inputs: [
      { id: 'montoUF', label: 'Monto del crédito (UF)', type: 'number', unit: 'UF', placeholder: '2000', required: true, min: 0, tooltip: 'Monto en UF (ej. 2000 UF).' },
      { id: 'pieUF', label: 'Pie (UF)', type: 'number', unit: 'UF', placeholder: '200', required: false, min: 0 },
      { id: 'plazoAnos', label: 'Plazo (años)', type: 'number', placeholder: '25', required: true, min: 1, max: 40 },
      { id: 'tasaAnual', label: 'Tasa anual (%)', type: 'number', placeholder: '4.5', required: true, min: 0, max: 20 },
      { id: 'ingresoMensual', label: 'Ingreso mensual (CLP) — capacidad 25%', type: 'number', unit: 'CLP', placeholder: '0', required: false, min: 0 },
      { id: 'incluyeSeguroDesgravamen', label: '¿Estimar seguro desgravamen? (mercado)', type: 'boolean', required: false, defaultValue: false, tooltip: 'Estimación de mercado (~0,03% mensual del saldo), no tarifa de un banco concreto. No es oferta CMF.' },
      { id: 'incluyeSeguroIncendio', label: '¿Estimar seguro incendio? (mercado)', type: 'boolean', required: false, defaultValue: false, tooltip: 'Estimación de mercado sobre el monto; no es cotización oficial.' },
      { id: 'incluyeComisionAdministracion', label: '¿Estimar comisión de administración? (mercado)', type: 'boolean', required: false, defaultValue: false },
      { id: 'calcularTablaAmortizacion', label: '¿Calcular tabla de amortización?', type: 'boolean', required: false, defaultValue: false },
      { id: 'calcularCAE', label: '¿Estimar CAE con cargos activados?', type: 'boolean', required: false, defaultValue: false, tooltip: 'CAE aproximada por TIR incluyendo seguros/comisión si los activaste. No es la CAE contractual del banco.' },
      { id: 'calcularGastosNotariales', label: '¿Estimar gastos notariales (~1,5%)?', type: 'boolean', required: false, defaultValue: false, tooltip: 'Estimación gruesa de mercado, no arancel notarial oficial.' },
      { id: 'simularPrepago', label: '¿Simular ahorro por prepago?', type: 'boolean', required: false, defaultValue: false },
      { id: 'montoPrepago', label: 'Monto de prepago (UF)', type: 'number', unit: 'UF', placeholder: '0', required: false, min: 0 },
    ],
    faq: [
      {
        question: '¿Cómo se calcula el dividendo hipotecario?',
        answer: 'El dividendo se calcula con la fórmula de amortización francesa: PMT = P × [r(1+r)^n] / [(1+r)^n - 1], donde P es el monto del crédito, r es la tasa mensual y n el total de cuotas. Esta fórmula asegura cuotas iguales durante todo el plazo. Por ejemplo, 2000 UF a 25 años con 4.5% anual da un dividendo de aproximadamente 10.7 UF mensuales.'
      },
      {
        question: '¿Cuánto pie necesito para un crédito hipotecario?',
        answer: 'Los bancos exigen entre 10% y 20% del valor de la propiedad como pie. En UF, si la propiedad vale 3000 UF, necesitas al menos 300-600 UF de pie. Un pie mayor reduce el dividendo mensual y el interés total. Algunos bancos ofrecen créditos con 5% de pie pero con seguro adicional.'
      },
      {
        question: '¿Es mejor un crédito en UF o en pesos?',
        answer: 'Los créditos en UF protegen al banco de la inflación pero tu dividendo sube con la UF. Los créditos en pesos tienen dividendo fijo pero tasas más altas (2-3% más). Para plazos largos (20+ años), la UF es más común en Chile. Si tu ingreso se reajusta con UF, un crédito en UF es más seguro.'
      },
      {
        question: '¿Qué gastos adicionales debo considerar?',
        answer: 'Además del dividendo, considera: seguro de desgravamen (0.3-0.5% anual), seguro de incendio (0.02% del valor propiedad), gastos notariales (0.2-0.5% del valor), y contribuciones (0.93% del avalúo fiscal anual). Estos pueden sumar 1-2 UF mensuales adicionales.'
      },
      {
        question: '¿Cuál es el costo total del crédito?',
        answer: 'El costo total incluye: monto solicitado + intereses totales + seguros. Por ejemplo, 2000 UF a 25 años con 4.5% genera aproximadamente 1218 UF de intereses totales. El costo total sería 3218 UF. Usar la calculadora te muestra el desglose exacto según tus parámetros.'
      },
      {
        question: '¿Qué es la tabla de amortización?',
        answer: 'La tabla de amortización detalla mes a mes cómo se distribuye cada dividendo entre interés y capital. Al principio, la mayor parte del dividendo paga intereses, pero con el tiempo se invierte y se paga más capital. Esto permite ver cómo disminuye el saldo deudor.'
      },
      {
        question: '¿Qué es la CAE (Carga Anual Equivalente)?',
        answer: 'La CAE es la tasa efectiva anual que incluye todos los costos del crédito: intereses, seguros, comisiones y otros gastos. Permite comparar créditos de diferentes bancos de forma estandarizada. Una CAE más baja indica un crédito más barato.'
      },
      {
        question: '¿Cómo afecta el tipo de tasa al crédito?',
        answer: 'La tasa fija mantiene el dividendo constante durante todo el plazo. La tasa variable puede subir o bajar según el mercado. La tasa mixta combina ambos: fija por un período inicial y luego variable. La elección depende de tu tolerancia al riesgo y expectativas de tasas.'
      },
      {
        question: '¿Qué es el período de gracia?',
        answer: 'El período de gracia es un tiempo inicial (generalmente 6-12 meses) donde solo pagas intereses, no capital. Esto reduce temporalmente el dividendo pero alarga el tiempo de pago y aumenta el costo total del crédito.'
      },
      {
        question: '¿Cómo ahorro con prepago?',
        answer: 'El prepago consiste en pagar parte del capital antes de lo previsto. Esto reduce el saldo deudor y por tanto los intereses futuros. Puedes reducir el plazo o el dividendo mensual. La calculadora te muestra el ahorro aproximado según el monto de prepago.'
      },
    ],
  },
  // ============================================
  // FASE 2 — 15 Calculadoras Nicho
  // ============================================
  {
    id: 'operacion-renta',
    name: 'Operación Renta Independientes 2026',
    description: 'Calcula tu impuesto a la renta como trabajador independiente. Deduce gastos, cotizaciones y ahorro previsional voluntario.',
    slug: 'calculadora-operacion-renta',
    category: 'impuestos',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'SII', url: 'https://www.sii.cl', note: 'Operación renta y formulario 22' },
      { name: 'BCN — Ley Chile', url: 'https://www.bcn.cl/leychile', note: 'DL 824, Ley sobre Impuesto a la Renta' },
    ],
    keywords: ['operación renta', 'impuesto independientes', 'renta trabajo independiente', 'formulario 22', 'impuesto anual Chile'],
    inputs: [
      { id: 'ingresosAnuales', label: 'Ingresos Brutos Anuales', type: 'number', placeholder: '$12.000.000', required: true, min: 0, tooltip: 'Suma de todos tus ingresos del año como independiente. Incluye boletas de honorarios y otros ingresos.' },
      { id: 'gastosAnuales', label: 'Gastos Anuales', type: 'number', placeholder: '$2.000.000', required: true, min: 0, tooltip: 'Gastos necesarios para tu actividad: oficina, insumos, servicios, etc. Deben estar respaldados con facturas.' },
      { id: 'cotizacionesObligatorias', label: 'Cotizaciones Obligatorias', type: 'number', placeholder: '$1.500.000', required: true, min: 0, tooltip: 'AFP (10% + comisión), salud (7%) y SIS (1.62%) pagados durante el año.' },
      { id: 'ahorroPrevisional', label: 'Ahorro Previsional (APV)', type: 'number', placeholder: '$0', required: false, min: 0, tooltip: 'Aportes APV hasta 600 UF anuales dan beneficio tributario. Reduce tu renta imponible.' },
    ],
    faq: [
      {
        question: '¿Cómo declaro renta como independiente?',
        answer: 'Los trabajadores independientes deben declarar renta anual en el Formulario 22 del SII entre abril y mayo. Se declaran ingresos brutos y se descuentan gastos necesarios, cotizaciones previsionales obligatorias y aportes APV. El impuesto se calcula con tramos progresivos de 0% a 40%.'
      },
      {
        question: '¿Qué gastos puedo deducir?',
        answer: 'Puedes deducir gastos necesarios para tu actividad: arriendo de oficina, insumos, servicios básicos, capacitaciones, equipos computacionales, y cotizaciones previsionales obligatorias. También el ahorro previsional voluntario (APV) hasta 600 UF anuales. Todos deben estar respaldados con facturas o boletas.'
      },
      {
        question: '¿Cuánto impuesto pago como independiente?',
        answer: 'El impuesto depende de tu renta líquida imponible. Los tramos 2026 son: 0% hasta 13.5 UTA, 4% de 13.5-30 UTA, 8% de 30-50 UTA, 13.5% de 50-70 UTA, 23% de 70-90 UTA, 30.4% de 90-120 UTA, 35% de 120-310 UTA, y 40% sobre 310 UTA. Una UTA equivale a 12 UTM.'
      },
      {
        question: '¿Qué es el APV y cómo beneficia?',
        answer: 'El Ahorro Previsional Voluntario (APV) permite deducir hasta 600 UF anuales de tu renta imponible. Si estás en el tramo del 13.5%, ahorrar 100 UF en APV reduce tu impuesto en 13.5 UF. Además, el APV crece con rentabilidad libre de impuestos hasta el retiro.'
      },
      {
        question: '¿Cuándo se paga el impuesto?',
        answer: 'El impuesto anual se paga en abril-mayo del año siguiente. Durante el año, pagas PPM (Pagos Provisionales Mensuales): 10% de boletas para profesionales. En la operación renta, los PPM pagados se restan del impuesto anual. Si pagaste de más, el SII te devuelve.'
      },
    ],
  },
  {
    id: 'contribuciones',
    name: 'Contribuciones (Impuesto Territorial)',
    description: 'Calcula el monto de tus contribuciones semestrales según avalúo fiscal y tipo de propiedad. Actualizado 2026.',
    slug: 'calculadora-contribuciones',
    category: 'vivienda',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'SII', url: 'https://www.sii.cl', note: 'Contribuciones (impuesto territorial)' },
      { name: 'MINVU', url: 'https://www.minvu.gob.cl', note: 'Avalúo fiscal de propiedades' },
    ],
    keywords: ['contribuciones', 'impuesto territorial', 'avalúo fiscal', 'contribuciones semestrales', 'impuesto bienes raíces Chile'],
    inputs: [
      { id: 'avaluoFiscal', label: 'Avalúo Fiscal', type: 'number', placeholder: '$50.000.000', required: true, min: 0, tooltip: 'Valor asignado por el SII a tu propiedad. No es el valor comercial. Aparece en el certificado de dominio vigente.' },
      { id: 'destino', label: 'Tipo de Propiedad', type: 'select', required: true, options: [
        { value: 'habitacional', label: 'Habitacional' },
        { value: 'comercial', label: 'Comercial' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'sitio_eriado', label: 'Sitio Eriado' },
        { value: 'agrario', label: 'Agrario' },
      ], tooltip: 'El tipo afecta la tasa: habitacional 0.93%, comercial/industrial 1.2%, sitio eriado 2%, agrario 0.5%.' },
    ],
    faq: [
      {
        question: '¿Cuánto son las contribuciones?',
        answer: 'Las contribuciones corresponden a un porcentaje del avalúo fiscal según el tipo de propiedad: 0.93% para habitacional, 1.2% para comercial/industrial, 2% para sitios eriazos y 0.5% para agrícola. Se pagan semestralmente en abril y septiembre. Por ejemplo, una casa con avalúo de $50.000.000 paga $465.000 anuales ($232.500 semestrales).'
      },
      {
        question: '¿Hay exención de contribuciones?',
        answer: 'Sí. Las propiedades habitacionales con avalúo fiscal inferior a 225.96 UTM están exentas de contribuciones. En marzo 2026, con UTM a $69.889, esto equivale a aproximadamente $15.79 millones de avalúo fiscal. Si tu propiedad es nueva, puede tener exención por 10-15 años.'
      },
      {
        question: '¿Cuándo se pagan las contribuciones?',
        answer: 'Las contribuciones se pagan en cuatro cuotas: abril, junio, septiembre y noviembre. También puedes pagar el semestre completo en abril o septiembre. Si la propiedad se vende, el vendedor debe pagar hasta la fecha de venta y el comprador desde esa fecha.'
      },
      {
        question: '¿Cómo se calcula el avalúo fiscal?',
        answer: 'El avalúo fiscal lo determina el SII considerando: valor del terreno (según ubicación y zona), valor de construcción (costo por m² según materiales), y depreciación por antigüedad. Se actualiza anualmente con el IPC. Puedes reclamar si lo consideras sobrevaluado.'
      },
      {
        question: '¿Qué pasa si no pago las contribuciones?',
        answer: 'El no pago genera intereses y multas. Después de cierto tiempo, el SII puede iniciar un proceso de cobro judicial que puede terminar en remate de la propiedad. Las contribuciones son un gravamen que sigue a la propiedad, no al dueño.'
      },
    ],
  },
  {
    id: 'costo-notaria',
    name: 'Costo Notaría Compraventa',
    description: 'Calcula el costo total de notaría, derechos registrales e impuestos en la compraventa de un inmueble en Chile.',
    slug: 'calculadora-costo-notaria',
    category: 'vivienda',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'BCN — Ley Chile', url: 'https://www.bcn.cl/leychile', note: 'Arancel de Notarios y Conservadores' },
      { name: 'SII', url: 'https://www.sii.cl', note: 'Impuesto a las ganancias de capital y timbres' },
    ],
    keywords: ['costo notaría', 'compraventa inmueble', 'derechos registrales', 'impuesto timbres', 'notaría Chile'],
    inputs: [
      { id: 'valorPropiedad', label: 'Valor de la Propiedad', type: 'number', placeholder: '$100.000.000', required: true, min: 0, tooltip: 'Valor de venta de la propiedad. Se usa para calcular honorarios notariales e impuestos.' },
      { id: 'tipo', label: 'Tipo de Trámite', type: 'select', required: true, options: [
        { value: 'compraventa', label: 'Compraventa' },
        { value: 'hipoteca', label: 'Hipoteca' },
        { value: 'donacion', label: 'Donación' },
        { value: 'testamento', label: 'Testamento' },
      ], tooltip: 'Cada trámite tiene costos diferentes. Compraventa es el más común para propiedades usadas.' },
      { id: 'notariaAdicional', label: '¿Notaría adicional?', type: 'boolean', required: false, defaultValue: false, tooltip: 'Si usas dos notarías (una por parte), se duplican algunos costos.' },
    ],
    faq: [
      {
        question: '¿Cuánto cobra una notaría por compraventa?',
        answer: 'El costo notarial varía entre 0.2% y 0.5% del valor de la propiedad, más derechos registrales (0.2%) e impuesto de timbres y estampillas (0.2%). Para una propiedad de $100.000.000, el costo total notarial es aproximadamente $600.000-$800.000.'
      },
      {
        question: '¿Qué son los derechos registrales?',
        answer: 'Los derechos registrales (0.2% del valor de la propiedad) se pagan al Conservador de Bienes Raíces para inscribir la propiedad a tu nombre. Es un trámite obligatorio que la notaría gestiona. Sin esta inscripción, la propiedad no es legalmente tuya.'
      },
      {
        question: '¿Qué es el impuesto de timbres y estampillas?',
        answer: 'El impuesto de timbres y estampillas (0.2%) se aplica a documentos que contienen obligaciones de dinero, como escrituras de compraventa con hipoteca. Se paga una sola vez al momento de firmar la escritura ante notario.'
      },
      {
        question: '¿Puedo elegir cualquier notaría?',
        answer: 'Sí, puedes elegir cualquier notaría de la comuna donde se encuentra la propiedad. Los honorarios son libres, por lo que conviene cotizar en varias notarías. Algunas ofrecen paquetes con todos los costos incluidos.'
      },
      {
        question: '¿Cuánto demora el proceso notarial?',
        answer: 'El proceso completo toma 2-4 semanas: 1 semana para preparar escrituras, 1-2 semanas para inscripción en el Conservador de Bienes Raíces, y algunos días más para retirar copias autorizadas. El pago se hace al momento de firmar.'
      },
    ],
  },
  {
    id: 'plusvalia',
    name: 'Plusvalía por Venta de Propiedad',
    description: 'Calcula el impuesto por plusvalía al vender una propiedad. Tasa decreciente según años de tenencia. Exento después de 10 años.',
    slug: 'calculadora-plusvalia',
    category: 'impuestos',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'SII', url: 'https://www.sii.cl', note: 'Impuesto a la plusvalía y renta inmobiliaria' },
      { name: 'BCN — Ley Chile', url: 'https://www.bcn.cl/leychile', note: 'DL 824, Art. 17 (plusvalía exenta hasta 8 UTM)' },
    ],
    keywords: ['plusvalía', 'impuesto venta propiedad', 'ganancia capital Chile', 'venta inmueble impuesto', 'plusvalía años tenencia'],
    inputs: [
      { id: 'precioCompra', label: 'Precio de Compra', type: 'number', placeholder: '$80.000.000', required: true, min: 0, tooltip: 'Valor que pagaste originalmente por la propiedad. Debe estar en la escritura de compraventa.' },
      { id: 'precioVenta', label: 'Precio de Venta', type: 'number', placeholder: '$120.000.000', required: true, min: 0, tooltip: 'Valor de venta actual. La diferencia con el precio de compra es tu ganancia bruta.' },
      { id: 'anosTenencia', label: 'Años de Tenencia', type: 'number', placeholder: '5', required: true, min: 0, tooltip: 'Años desde que compraste la propiedad. A mayor tenencia, menor impuesto (exento después de 10 años).' },
      { id: 'mejoras', label: 'Mejoras realizadas', type: 'number', placeholder: '$5.000.000', required: false, min: 0, tooltip: 'Inversiones en mejoras (no mantención) que reducen la ganancia imponible. Deben estar documentadas con facturas.' },
    ],
    faq: [
      {
        question: '¿Qué es la plusvalía?',
        answer: 'La plusvalía es la ganancia obtenida al vender una propiedad por un precio superior al de compra. Se calcula como: precio de venta - precio de compra - mejoras. La Ley 21.210 establece un impuesto progresivo que disminuye con los años de tenencia.'
      },
      {
        question: '¿Cuánto impuesto pago por vender una propiedad?',
        answer: 'La tasa depende de los años de tenencia: menos de 1 año paga 30%, 1-2 años 25%, 2-3 años 20%, 3-4 años 15%, 4-5 años 10%, 5-10 años 5%, más de 10 años exento. Por ejemplo, si ganas $40.000.000 y tuviste la propiedad 6 años, pagas 5% = $2.000.000.'
      },
      {
        question: '¿Las mejoras reducen el impuesto?',
        answer: 'Sí. Las mejoras (ampliaciones, remodelaciones mayores) documentadas con facturas se restan de la ganancia antes de calcular el impuesto. La mantención ordinaria (pintura, reparaciones menores) no es deducible.'
      },
      {
        question: '¿Quién paga el impuesto de plusvalía?',
        answer: 'El vendedor es responsable del pago del impuesto. Se declara y paga en el Formulario 22 del SII del año siguiente a la venta. El notario que autoriza la escritura debe informar la venta al SII.'
      },
      {
        question: '¿Hay exenciones adicionales?',
        answer: 'Sí. Está exenta la venta de tu vivienda principal (con ciertos requisitos), ventas entre cónyuges, y propiedades adquiridas antes de 2017 que se vendan con más de 10 años de tenencia. Consulta con un contador para tu caso específico.'
      },
    ],
  },
  {
    id: 'subsidio-habitacional',
    name: 'Subsidio Habitacional DS49/DS01/DS19',
    description: 'Estima subsidio habitacional MINVU en UF según programa (DS49, DS01, DS19), tramo RSH, ahorro y tope de vivienda. Referencial: no garantiza elegibilidad SERVIU.',
    slug: 'calculadora-subsidio-habitacional',
    category: 'vivienda',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-08',
    sources: [
      { name: 'ChileAtiende — DS1 Tramo 1', url: 'https://www.chileatiende.gob.cl/fichas/19094-ds-1-tramo-1-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-100-uf', note: 'Ahorro y tope T1' },
      { name: 'ChileAtiende — DS1 Tramo 2', url: 'https://www.chileatiende.gob.cl/fichas/5172-ds-1-tramo-2-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-600-uf', note: 'Tope 1.600 UF' },
      { name: 'ChileAtiende — DS1 Tramo 3', url: 'https://www.chileatiende.gob.cl/fichas/5436-ds-1-tramo-3-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-2-200-uf', note: 'Tope 2.200 UF' },
      { name: 'MINVU — DS19', url: 'https://www.minvu.gob.cl/beneficio/vivienda/subsidio-de-integracion-social-y-territorial-ds19/', note: 'Integración social' },
    ],
    keywords: ['subsidio habitacional', 'DS49', 'DS01', 'DS19', 'subsidio vivienda Chile', 'tramo subsidio', 'ahorro requerido'],
    inputs: [
      { id: 'tipoSubsidio', label: 'Programa de subsidio', type: 'select', required: true, options: [
        { value: 'ds49', label: 'DS49 — Fondo Solidario (sin crédito)' },
        { value: 'ds01', label: 'DS01 — Sectores medios' },
        { value: 'ds19', label: 'DS19 — Integración social' },
      ], tooltip: 'Obligatorio. Cada programa tiene ahorro mínimo, tope de vivienda y reglas distintas. No se puede “adivinar”.' },
      { id: 'tramo', label: 'Tramo RSH', type: 'select', required: true, options: [
        { value: 'tramo1', label: 'Tramo 1' },
        { value: 'tramo2', label: 'Tramo 2' },
        { value: 'tramo3', label: 'Tramo 3' },
      ], tooltip: 'Según Registro Social de Hogares / reglas del programa. Define elegibilidad y montos.' },
      { id: 'valorPropiedad', label: 'Valor de la propiedad (UF)', type: 'number', unit: 'UF', placeholder: '1600', required: true, min: 0, tooltip: 'Ingresa UF, no pesos. Ejemplo: 1.600 UF. El motor no vuelve a dividir por el valor de la UF.' },
      { id: 'ahorro', label: 'Ahorro disponible (UF)', type: 'number', unit: 'UF', placeholder: '40', required: true, min: 0, tooltip: 'Ahorro mínimo de referencia: DS49 ~10 UF; DS01 T1/T2/T3 ~30/40/80 UF (verificar llamado vigente).' },
      { id: 'esZonaExtrema', label: '¿Zona extrema?', type: 'boolean', required: false, defaultValue: false, tooltip: 'Aysén, Magallanes y comunas aisladas: sube el tope de precio de vivienda según programa (ChileAtiende).' },
    ],
    faq: [
      {
        question: '¿Cómo postular al subsidio habitacional?',
        answer: 'Debes inscribirte en el Serviu o Minvu cuando abren los procesos de postulación. Necesitas ahorro mínimo según tramo, estar inscrito en el Registro Social de Hogares, y no ser propietario de vivienda. Las postulaciones son periódicas.'
      },
      {
        question: '¿Cuánto subsidio puedo recibir?',
        answer: 'Depende del tramo: Tramo 1 (vulnerabilidad media-alta) recibe hasta 500 UF, Tramo 2 (vulnerabilidad media) hasta 400 UF, y Tramo 3 (vulnerabilidad baja) hasta 300 UF. Zona extrema agrega hasta 150 UF adicionales.'
      },
      {
        question: '¿Qué requisitos necesito?',
        answer: 'Requisitos básicos: ser mayor de 18 años, no ser propietario de vivienda, tener ahorro mínimo según tramo, estar en el Registro Social de Hogares, y no haber recibido subsidio antes. Algunos programas exigen cotización previsional.'
      },
      {
        question: '¿Cuánto demora la obtención del subsidio?',
        answer: 'Desde la postulación hasta obtener la vivienda pueden pasar 6 meses a 2 años, dependiendo del programa y la disponibilidad de proyectos. Una vez adjudicado, tienes 12-18 meses para usar el subsidio.'
      },
      {
        question: '¿Puedo combinar con crédito hipotecario?',
        answer: 'Sí. El subsidio puede usarse como pie para un crédito hipotecario. De hecho, muchos programas requieren que complementes el subsidio con ahorro adicional o crédito para alcanzar el valor de la vivienda.'
      },
    ],
  },
  {
    id: 'patente-comercial',
    name: 'Patente Comercial Municipal',
    description: 'Calcula el costo de la patente comercial según capital propio tributario, actividad y comuna. Pago anual en dos cuotas con topes UTM.',
    slug: 'calculadora-patente-comercial',
    category: 'empresas',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'SII', url: 'https://www.sii.cl', note: 'Patente municipal e impuestos empresariales' },
      { name: 'BCN — Ley Chile', url: 'https://www.bcn.cl/leychile', note: 'DL 3063, Ley de Rentas Municipales' },
    ],
    seoTitle: 'Patente Comercial 2026: ¿cuánto pagar? | Calcula',
    seoDescription:
      'Calcula tu patente comercial 2026 con capital propio tributario y tasa de tu comuna. Desde 1 UTM hasta 8.000 UTM. Pago anual, opción 2 cuotas. Gratis.',
    keywords: [
      'patente comercial',
      'patente municipal',
      'valor patente comercial',
      'cálculo patente comercial',
      'cálculo patente municipal',
      'valor patente municipal 2026',
      'cuando se pagan las patentes comerciales 2026',
      'capital propio tributario patente',
      'costo patente Chile',
      'tasa municipal',
    ],
    inputs: [
      { id: 'capitalInvertido', label: 'Capital Propio Tributario', type: 'number', placeholder: '$10.000.000', required: true, min: 0, tooltip: 'Capital propio declarado al SII (patrimonio inicial ajustado por corrección monetica). No es lo mismo que capital social ni patrimonio neto.' },
      { id: 'actividad', label: 'Actividad', type: 'select', required: true, options: [
        { value: 'comercio', label: 'Comercio' },
        { value: 'industria', label: 'Industria' },
        { value: 'servicios', label: 'Servicios' },
        { value: 'transporte', label: 'Transporte' },
      ], tooltip: 'La actividad afecta la tasa. Industrial y comercial pagan más que servicios.' },
      { id: 'comuna', label: 'Comuna', type: 'select', required: true, options: [
        { value: 'santiago', label: 'Santiago' },
        { value: 'providencia', label: 'Providencia' },
        { value: 'las_condes', label: 'Las Condes' },
        { value: 'otra', label: 'Otra' },
      ], tooltip: 'Cada municipalidad fija su tasa dentro del rango legal. Santiago cobra 0.5%, otras comunas menos.' },
    ],
    faq: [
      {
        question: '¿Cuánto vale una patente comercial en Chile?',
        answer: 'La patente comercial se calcula como un porcentaje del capital propio tributario (0,25% a 0,5% según comuna), con un mínimo de 1 UTM y máximo de 8.000 UTM anuales. Para un capital de $10.000.000 en Santiago (0,5%), la patente anual es $50.000. El valor exacto depende de la comuna donde opera el negocio y del tipo de actividad.'
      },
      {
        question: '¿Cómo se calcula la patente municipal?',
        answer: 'La patente municipal se calcula aplicando la tasa fijada por la municipalidad (entre 0,25% y 0,5%) sobre el capital propio tributario declarado. El resultado se ajusta a los topes legales: mínimo 1 UTM anual y máximo 8.000 UTM anuales. La actividad (comercio, industria, servicios, transporte) también afecta la tasa aplicable.'
      },
      {
        question: '¿Cuándo se paga la patente comercial?',
        answer: 'La patente se paga anualmente en dos cuotas: 31 de enero (primer semestre) y 31 de julio (segundo semestre). El pago se hace en la municipalidad donde funciona el negocio. Si inicias actividades a mitad de período, pagas proporcional por los meses restantes.'
      },
      {
        question: '¿Qué es el capital propio tributario de la patente?',
        answer: 'El capital propio tributario es el patrimonio inicial declarado al inicio de actividades, ajustado por la corrección monetaria del SII cada año. No es el capital social del contrato ni el patrimonio neto del balance. Se obtiene del Form. 22 del año anterior. Empresas nuevas pueden declarar capital cero el primer año (mínimo 1 UTM).'
      },
      {
        question: '¿Necesito patente para todo negocio?',
        answer: 'Sí, todo negocio o actividad comercial necesita patente municipal. Las únicas excepciones son trabajadores independientes sin local, vendedores ambulantes autorizados y algunas actividades agrícolas. El no pago tiene multas y puede derivar en el cierre del local.'
      },
      {
        question: '¿Puedo perder la patente?',
        answer: 'Sí. La municipalidad puede cancelar la patente por: no pago, infracciones graves, cambio de actividad no autorizado o cierre del negocio. Para reanudar, debes pagar las patentes adeudadas más las multas correspondientes.'
      },
    ],
  },
  {
    id: 'comparador-afp',
    name: 'Comparador de Comisiones AFP',
    description: 'Compara las comisiones de las 7 AFP y calcula cuánto ahorras cambiándote a la más barata. Proyección a años de pensión.',
    slug: 'calculadora-comparador-afp',
    category: 'pension',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'Superintendencia de Pensiones', url: 'https://www.spensiones.cl/portal/prevision', note: 'Comisiones AFP comparadas' },
    ],
    keywords: ['comparador AFP', 'comisiones AFP', 'mejor AFP', 'cambio AFP', 'ahorro pensiones Chile'],
    inputs: [
      { id: 'sueldoBruto', label: 'Sueldo Bruto', type: 'number', placeholder: '$800.000', required: true, min: 0, tooltip: 'Tu sueldo bruto mensual. La comisión AFP se calcula como porcentaje de este monto.' },
      { id: 'afpActual', label: 'AFP Actual', type: 'select', required: true, options: [
        { value: 'capital', label: 'Capital' },
        { value: 'cuprum', label: 'Cuprum' },
        { value: 'habitat', label: 'Habitat' },
        { value: 'modelo', label: 'Modelo' },
        { value: 'planvital', label: 'PlanVital' },
        { value: 'provida', label: 'ProVida' },
        { value: 'uno', label: 'Uno' },
      ], tooltip: 'Tu AFP actual. Compara con las demás para ver cuánto ahorrarías cambiándote.' },
      { id: 'anosPension', label: 'Años hasta pensión', type: 'number', placeholder: '25', required: true, min: 1, max: 50, tooltip: 'Años que faltan para tu jubilación. A más años, mayor el impacto de la comisión en tu pensión final.' },
    ],
    faq: [
      {
        question: '¿Cuál es la AFP más barata?',
        answer: 'En 2026, AFP Uno tiene la comisión más baja (0.49%), seguida de Modelo (0.58%). Las más caras son ProVida (1.45%), Cuprum y Capital (1.44%). La diferencia parece pequeña pero impacta significativamente en tu pensión final.'
      },
      {
        question: '¿Cómo afecta la comisión a mi pensión?',
        answer: 'La comisión se cobra mensualmente sobre tu sueldo imponible. Con sueldo de $800.000, AFP Uno cobra $3.920 mensuales y ProVida cobra $11.600. En 25 años, esa diferencia de $7.680 mensuales puede significar 5-10% más de pensión.'
      },
      {
        question: '¿Puedo cambiarme de AFP?',
        answer: 'Sí, puedes cambiarte de AFP gratuitamente en cualquier momento. El proceso se hace en la nueva AFP que elijas y toma 1-2 meses. Tu saldo se transfiere automáticamente. No pierdes tus cotizaciones ni antigüedad.'
      },
      {
        question: '¿Todas las AFP pagan lo mismo?',
        answer: 'No. Las AFP tienen diferentes rentabilidades históricas. Además de la comisión, compara la rentabilidad de los multifondos. Un fondo con mejor rentabilidad puede compensar una comisión más alta.'
      },
      {
        question: '¿Qué es el multifondo?',
        answer: 'Las AFP tienen 5 multifondos (A, B, C, D, E) con diferente riesgo/rentabilidad. Fondo A es más riesgoso (más acciones), E es más conservador (más instrumentos de deuda). Tu edad determina en qué fondos puedes estar.'
      },
    ],
  },
  {
    id: 'simulador-apv',
    name: 'Simulador APV (Ahorro Previsional)',
    description: 'Simula cuánto acumularás con ahorro previsional voluntario. Incluye beneficio tributario y rentabilidad compuesta.',
    slug: 'calculadora-simulador-apv',
    category: 'pension',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'Superintendencia de Pensiones', url: 'https://www.spensiones.cl/portal/prevision', note: 'APV y ahorro previsional voluntario' },
      { name: 'SII', url: 'https://www.sii.cl', note: 'Beneficio tributario del APV (tope 600 UF)' },
    ],
    keywords: ['APV', 'ahorro previsional voluntario', 'simulador APV', 'beneficio tributario APV', 'ahorro pensiones'],
    inputs: [
      { id: 'sueldoBruto', label: 'Sueldo Bruto Mensual', type: 'number', placeholder: '$1.000.000', required: true, min: 0, tooltip: 'Tu sueldo bruto determina el beneficio tributario. A mayor sueldo, mayor el ahorro de impuestos.' },
      { id: 'montoMensualAPV', label: 'Ahorro Mensual APV', type: 'number', placeholder: '$100.000', required: true, min: 0, tooltip: 'Monto mensual que ahorras. Máximo 600 UF anuales para beneficio tributario completo.' },
      { id: 'rentabilidadAnual', label: 'Rentabilidad Anual Esperada (%)', type: 'number', placeholder: '5', required: true, min: 0, max: 20, tooltip: 'Rentabilidad anual estimada. Multifondos históricamente rinden 4-8% anual real.' },
      { id: 'anosAhorro', label: 'Años de Ahorro', type: 'number', placeholder: '20', required: true, min: 1, max: 40, tooltip: 'Período de acumulación. A más años, más impacto del interés compuesto.' },
    ],
    faq: [
      {
        question: '¿Qué es el APV?',
        answer: 'El Ahorro Previsional Voluntario (APV) es un ahorro adicional para tu pensión con beneficios tributarios. Puedes depositar hasta 600 UF anuales y descontarlos de tu base imponible, reduciendo el impuesto que pagas. El APV se retira al jubilar.'
      },
      {
        question: '¿Qué beneficio tributario tiene?',
        answer: 'El APV reduce tu renta imponible hasta en 600 UF anuales. Si ganas $2.000.000 y aportas 100 UF ($4.000.000), pagas impuesto como si ganaras $1.996.000. El beneficio depende de tu tramo: 4% a 40% de lo ahorrado.'
      },
      {
        question: '¿Cuánto puedo ahorrar en APV?',
        answer: 'Puedes ahorrar hasta 600 UF anuales (aproximadamente $24 millones) con beneficio tributario completo. El mínimo depende de la administradora. Puedes hacer aportes únicos o mensuales, y cambiar el monto cuando quieras.'
      },
      {
        question: '¿Cuándo puedo retirar el APV?',
        answer: 'El APV se retira al jubilar (65 años hombres, 60 mujeres), por invalidez o fallecimiento. También puedes retirar hasta 70% para pie de vivienda (con condiciones) o 100% si emigras definitivamente.'
      },
      {
        question: '¿Dónde puedo contratar APV?',
        answer: 'Puedes contratar APV en tu AFP, compañías de seguros, corredoras de bolsa, bancos y administradoras de fondos mutuos. Compara comisiones y opciones de inversión antes de elegir.'
      },
    ],
  },
  {
    id: 'intereses-mora',
    name: 'Intereses por Mora Laboral',
    description: 'Calcula los intereses por mora en pagos laborales. Tasa máxima convencional sobre deuda impaga.',
    slug: 'calculadora-intereses-mora',
    category: 'beneficios',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'Dirección del Trabajo', url: 'https://www.dt.gob.cl', note: 'Mora en pago de remuneraciones, Código del Trabajo Art. 96' },
      { name: 'CMF', url: 'https://www.cmfchile.cl', note: 'Tasa máxima convencional (TMC) para intereses' },
    ],
    keywords: ['intereses mora', 'mora laboral Chile', 'TMC', 'deuda laboral', 'intereses por mora trabajo'],
    inputs: [
      { id: 'montoDeuda', label: 'Monto de la Deuda', type: 'number', placeholder: '$500.000', required: true, min: 0, tooltip: 'Monto adeudado en pesos. Puede ser sueldo, indemnización, horas extra, etc.' },
      { id: 'diasMora', label: 'Días de Mora', type: 'number', placeholder: '30', required: true, min: 0, tooltip: 'Días de retraso desde que debió pagarse hasta la fecha de pago.' },
    ],
    faq: [
      {
        question: '¿Cuál es la tasa de interés por mora laboral?',
        answer: 'La tasa de interés por mora se calcula usando la Tasa Máxima Convencional (TMC) que fija la SBIF. Para deudas laborales sobre 200 UF, se usa aproximadamente 8.5% anual. Para montos menores, la tasa es mayor.'
      },
      {
        question: '¿Cómo se calcula el interés por mora?',
        answer: 'El interés se calcula: Monto × (Tasa/100) × (Días/365). Por ejemplo, $500.000 adeudados por 30 días al 8.5% anual generan: $500.000 × 0.085 × (30/365) = $3.493 de interés.'
      },
      {
        question: '¿Desde cuándo se cobran intereses?',
        answer: 'Los intereses corren desde el día siguiente en que debió pagarse la obligación hasta el pago efectivo. En el caso de sueldos, desde el día de pago establecido en el contrato.'
      },
      {
        question: '¿Los intereses por mora son obligatorios?',
        answer: 'Sí. El empleador debe pagar intereses por mora automáticamente cuando retrasa pagos laborales. Si no lo hace, el trabajador puede demandar. Los intereses prescriben en 6 meses.'
      },
      {
        question: '¿Qué pasa si el empleador no paga?',
        answer: 'Si el empleador no paga la deuda más intereses, puedes demandar en el Juzgado de Letras del Trabajo. La demanda es gratuita y no necesitas abogado para montos menores a 10 UTA.'
      },
    ],
  },
  {
    id: 'asignacion-familiar',
    name: 'Asignación Familiar por Tramo',
    description: 'Calcula tu asignación familiar según tramo de ingresos y número de hijos causantes.',
    slug: 'calculadora-asignacion-familiar',
    category: 'familia',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'Dirección del Trabajo', url: 'https://www.dt.gob.cl', note: 'Asignación familiar, Código del Trabajo' },
      { name: 'SII', url: 'https://www.sii.cl', note: 'Tramos y montos de asignación familiar' },
    ],
    keywords: ['asignación familiar', 'asignación por hijo', 'tramo asignación', 'subsidio familiar Chile'],
    inputs: [
      { id: 'sueldoBruto', label: 'Sueldo Bruto', type: 'number', placeholder: '$500.000', required: true, min: 0, tooltip: 'Tu sueldo bruto mensual determina el tramo. Incluye todas las remuneraciones imponibles.' },
      { id: 'numeroHijos', label: 'Número de Hijos', type: 'number', placeholder: '2', required: true, min: 0, tooltip: 'Hijos menores de 18 años (o 24 si estudian, sin límite si son discapacitados).' },
    ],
    faq: [
      {
        question: '¿Cuánto es la asignación familiar?',
        answer: 'Depende de tu tramo de ingresos: Tramo A (sueldo hasta $430.560) recibe $18.624 por hijo, Tramo B (hasta $630.816) recibe $11.358 por hijo, y Tramo C (sobre $630.816) no recibe asignación. Valores 2026.'
      },
      {
        question: '¿Quiénes tienen derecho a asignación familiar?',
        answer: 'Trabajadores dependientes e independientes con hijos menores de 18 años. También hijos mayores de 18 si estudian (hasta 24 años) o hijos con discapacidad sin límite de edad. Debes estar en FONASA o Isapre.'
      },
      {
        question: '¿Cómo se solicita la asignación familiar?',
        answer: 'Trabajadores dependientes: el empleador la paga automáticamente. Independientes: la paga la AFP o IPS. Necesitas inscribir a los hijos en el Registro de Asignaciones Familiares del IPS.'
      },
      {
        question: '¿La asignación familiar afecta otros beneficios?',
        answer: 'No. La asignación familiar no es renta imponible, no paga impuestos ni cotizaciones. No afecta el cálculo de otros beneficios como subsidios o pensiones.'
      },
      {
        question: '¿Puedo perder la asignación familiar?',
        answer: 'Sí. Pierdes el derecho si: el hijo cumple la edad límite, deja de estudiar, se casa, o comienza a trabajar. Debes informar estos cambios al IPS dentro de 30 días.'
      },
    ],
  },
  {
    id: 'credito-cae',
    name: 'Calculadora CAE (Crédito Aval Estado)',
    description:
      'Simula la cuota del Crédito con Aval del Estado (CAE): monto, tasa, plazo y total a pagar. Tasa de referencia 2% en UF.',
    slug: 'calculadora-credito-cae',
    category: 'educacion',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-08',
    sources: [
      { name: 'MINEDUC', url: 'https://www.mineduc.cl', note: 'Crédito con Aval del Estado (CAE)' },
      { name: 'Ingresa / Comisión Ingresa', url: 'https://www.ingresa.cl', note: 'Administración y pagos del CAE' },
      { name: 'ChileAtiende', url: 'https://www.chileatiende.gob.cl', note: 'Información oficial de beneficios estudiantiles y trámites' },
    ],
    seoTitle: 'Simulador CAE 2026: calcula tu cuota | Tasa 2%',
    seoDescription:
      'Simula el Crédito con Aval del Estado: cuota mensual, total a pagar y plazo 10–20 años. Tasa fija 2% en UF. CAE vigente 2026 (no es FES). Gratis.',
    keywords: [
      'calculadora CAE',
      'simulador CAE 2026',
      'calculadora cae crédito',
      'calcular CAE crédito',
      'cuota CAE',
      'CAE',
      'crédito aval estado',
      'credito universidad Chile',
      'dividendo CAE',
      'crédito estudios',
      'como se calcula el cae',
      'cae porcentaje',
    ],
    inputs: [
      { id: 'montoCredito', label: 'Monto del Crédito', type: 'number', placeholder: '$15.000.000', required: true, min: 0, tooltip: 'Monto total del crédito (arancel/matrícula financiados). El CAE puede cubrir hasta el 90% del arancel con garantía estatal según reglas vigentes.' },
      { id: 'tasaAnual', label: 'Tasa Anual (%)', type: 'number', placeholder: '2', required: true, min: 0, max: 15, tooltip: 'Tasa de referencia del CAE: 2% real anual en UF. Puedes simular otro valor si tu contrato indica una tasa distinta.' },
      { id: 'plazoMeses', label: 'Plazo (meses)', type: 'number', placeholder: '180', required: true, min: 12, max: 240, tooltip: 'Plazo máximo habitual 20 años (240 meses). Prueba 120, 180 o 240 meses.' },
      { id: 'tieneGarantiaEstatal', label: '¿Con garantía estatal?', type: 'boolean', required: false, defaultValue: true, tooltip: 'El Estado garantiza hasta el 90% del crédito en el esquema CAE. Actívalo para el escenario típico.' },
    ],
    faq: [
      {
        question: '¿Cómo se calcula la cuota del CAE?',
        answer:
          'El CAE usa tasa fija de referencia del 2% real anual en UF, con cobro que comienza 18 meses después del egreso y plazo máximo de 240 cuotas (20 años). Esta calculadora estima la cuota con la fórmula de crédito (monto, tasa y plazo). El resultado es referencial: tu cuota contractual la define Ingresa / tu institución financiera.',
      },
      {
        question: '¿Cuándo se empieza a pagar el CAE?',
        answer:
          'En el esquema general comienzas a pagar 18 meses después de egresar. Durante los estudios y el período de gracia aplican reglas de subsidio de intereses según normativa vigente. El plazo máximo de pago suele ser 20 años; revisa tu contrato y el portal Ingresa para tu caso.',
      },
      {
        question: '¿Cuál es el plazo máximo del CAE?',
        answer:
          'El plazo máximo habitual es de 20 años (240 cuotas mensuales). Según las reglas del programa, el saldo que reste al final del plazo puede condonarse. Confirma siempre en Ingresa: no confundas el CAE con el FES u otros esquemas de pago contingente al ingreso.',
      },
      {
        question: '¿El CAE es lo mismo que el pago contingente al ingreso (FES)?',
        answer:
          'No. El CAE es el Crédito con Aval del Estado con tasa fija en UF y cuotas definidas por monto/tasa/plazo. El pago contingente al ingreso (FES u otros proyectos) es un esquema distinto. Esta página simula CAE, no FES.',
      },
      {
        question: '¿Qué pasa si no puedo pagar el CAE?',
        answer:
          'Puedes explorar reprogramación, suspensión por desempleo u otras vías en Comisión Ingresa / tu acreedor. La cuota del CAE no se recalcula sola como un % de tu sueldo (eso sería un esquema contingente al ingreso). Contacta Ingresa antes de acumular mora.',
      },
      {
        question: '¿Quiénes pueden postular al CAE?',
        answer:
          'Estudiantes chilenos o con residencia que cumplan requisitos académicos y socioeconómicos de educación superior (universidades, IP, CFT). El CAE cubre arancel y matrícula según cupos y reglas del año. Consulta MINEDUC / Ingresa para la convocatoria vigente.',
      },
    ],
  },
  {
    id: 'credito-automotriz',
    name: 'Simulador Crédito Automotriz',
    description: 'Calcula la cuota mensual de tu crédito automotriz. Incluye pie, intereses, seguro y costo total del crédito.',
    slug: 'calculadora-credito-automotriz',
    category: 'vehiculos',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-08',
    sources: [
      { name: 'CMF', url: 'https://www.cmfchile.cl', note: 'Regulación de créditos de consumo' },
      { name: 'SERNAC', url: 'https://www.sernac.cl', note: 'Derechos del consumidor en créditos automotrices' },
    ],
    seoTitle: 'Crédito Automotriz 2026: simula cuota y pie',
    seoDescription:
      'Simula la cuota de tu crédito de auto en Chile: pie, tasa, plazo y costo total. Compara escenarios antes de firmar. Gratis.',
    keywords: [
      'crédito automotriz',
      'simulador credito automotriz',
      'simulador auto',
      'crédito vehículo Chile',
      'pie auto',
      'cuota mensual auto',
      'tasa crédito automotriz chile 2026',
    ],
    inputs: [
      { id: 'valorVehiculo', label: 'Valor del Vehículo', type: 'number', placeholder: '$15.000.000', required: true, min: 0, tooltip: 'Valor total del vehículo nuevo o usado.' },
      { id: 'pie', label: 'Pie', type: 'number', placeholder: '$3.000.000', required: true, min: 0, tooltip: 'Ahorro inicial. Generalmente 20-30% del valor del vehículo.' },
      { id: 'tasaAnual', label: 'Tasa Anual (%)', type: 'number', placeholder: '5.5', required: true, min: 0, max: 30, tooltip: 'Tasa de interés anual. Varía según banco, monto y tu perfil crediticio.' },
      { id: 'plazoMeses', label: 'Plazo (meses)', type: 'number', placeholder: '48', required: true, min: 6, max: 84, tooltip: 'Plazo típico: 12-72 meses. A mayor plazo, menor cuota pero más intereses.' },
      { id: 'incluyeSeguro', label: '¿Incluye seguro?', type: 'boolean', required: false, defaultValue: true, tooltip: 'Seguro vehicular (incendio, robo) es obligatorio con crédito.' },
    ],
    faq: [
      {
        question: '¿Cuánto pie necesito para un auto?',
        answer: 'Generalmente se exige entre 20% y 30% del valor del vehículo como pie. Para un auto de $15.000.000, necesitas entre $3.000.000 y $4.500.000. Algunos bancos ofrecen créditos con 10% de pie pero con mayor tasa.'
      },
      {
        question: '¿Qué tasa de interés tiene un crédito automotriz?',
        answer: 'Las tasas varían entre 4% y 10% anual según el banco, monto, plazo y tu perfil crediticio. Compara el CAE (Carga Anual Equivalente) que incluye todos los costos, no solo la tasa.'
      },
      {
        question: '¿Qué seguros son obligatorios?',
        answer: 'Con crédito automotriz, el banco exige seguro de incendio y robo hasta que pagues el crédito. También es obligatorio el SOAP anual. El seguro todo riesgo es opcional pero recomendado.'
      },
      {
        question: '¿Puedo pagar el crédito anticipadamente?',
        answer: 'Sí, puedes hacer abonos a capital sin penalidad. Esto reduce el plazo o la cuota. El prepago total también es posible, ahorrando los intereses futuros.'
      },
      {
        question: '¿Nuevo o usado?',
        answer: 'Los créditos para autos nuevos tienen mejores tasas (4-6%) y plazos más largos (hasta 72 meses). Para usados, las tasas son mayores (6-10%) y el plazo máximo es menor (48-60 meses).'
      },
    ],
  },
  {
    id: 'multas-transito',
    name: 'Calculadora Multas de Tránsito',
    description: 'Calcula el valor de multas de tránsito en UTM y pesos chilenos según gravedad de la infracción.',
    slug: 'calculadora-multas-transito',
    category: 'vehiculos',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'BCN — Ley Chile', url: 'https://www.bcn.cl/leychile', note: 'Ley de Tránsito y multas en UTM' },
      { name: 'Tesorería General de la República', url: 'https://www.tesoreria.cl', note: 'Cobro de multas de tránsito' },
    ],
    keywords: ['multas tránsito', 'multa UTM', 'infracción tránsito Chile', 'valor multa', 'multa leve grave gravísima'],
    inputs: [
      { id: 'tipoMulta', label: 'Tipo de Infracción', type: 'select', required: true, options: [
        { value: 'leve', label: 'Leve' },
        { value: 'menos_grave', label: 'Menos Grave' },
        { value: 'grave', label: 'Grave' },
        { value: 'gravisima', label: 'Gravísima' },
      ], tooltip: 'La gravedad la determina Carabineros según la Ley 18.290 de Tránsito.' },
      { id: 'cantidadMultas', label: 'Cantidad de Multas', type: 'number', placeholder: '1', required: false, min: 1, defaultValue: 1, tooltip: 'Número de multas del mismo tipo. Se multiplican por la cantidad.' },
    ],
    faq: [
      {
        question: '¿Cuánto cuesta una multa de tránsito?',
        answer: 'Las multas se calculan en UTM según gravedad: leve 0.5 UTM (~$34.945), menos grave 1 UTM (~$69.889), grave 2 UTM (~$139.778), gravísima 4 UTM (~$279.556). Valores marzo 2026 con UTM a $69.889.'
      },
      {
        question: '¿Qué es una infracción leve?',
        answer: 'Infracciones leves: estacionar en lugar prohibido, no portar documentos, luces defectuosas, neumáticos en mal estado. Son las de menor gravedad pero se acumulan.'
      },
      {
        question: '¿Qué es una infracción gravísima?',
        answer: 'Infracciones gravísimas: conducir en estado de ebriedad, exceso de velocidad sobre 50%, no respetar luz roja, manejar sin licencia. Pueden incluir suspensión de licencia y arresto.'
      },
      {
        question: '¿Cómo pago una multa?',
        answer: 'Las multas se pagan en la municipalidad donde se cometió la infracción o en línea. Tienes 30 días para pagar o reclamar. Después de 30 días, se aplica recargo.'
      },
      {
        question: '¿Puedo reclamar una multa?',
        answer: 'Sí. Tienes 30 días hábiles para reclamar ante el Juzgado de Policía Local. Puedes hacerlo personalmente o mediante abogado. Si ganas, la multa se anula.'
      },
    ],
  },
  {
    id: 'costo-tag',
    name: 'Costo TAG Autopista',
    description: 'Calcula el costo mensual y anual del TAG en autopistas chilenas. Incluye descuento por convenio frecuente.',
    slug: 'calculadora-costo-tag',
    category: 'vehiculos',
    noIndex: true,
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'Ministerio de Transportes', url: 'https://www.mtt.gob.cl', note: 'Concesiones viales y telepeaje TAG' },
      { name: 'SERNAC', url: 'https://www.sernac.cl', note: 'Derechos del consumidor en peajes' },
    ],
    keywords: ['costo TAG', 'autopista Chile', 'peaje TAG', 'santiago rancagua TAG', 'descuento frecuente'],
    inputs: [
      { id: 'peajes', label: 'Ruta', type: 'select', required: true, options: [
        { value: 'santiago_rancagua', label: 'Santiago - Rancagua' },
        { value: 'santiago_valparaiso', label: 'Santiago - Valparaíso' },
        { value: 'santiago_los_andes', label: 'Santiago - Los Andes' },
        { value: 'santiago_san_fernando', label: 'Santiago - San Fernando' },
        { value: 'urbano_santiago', label: 'Urbano Santiago' },
      ], tooltip: 'Selecciona la ruta que más usas. Cada autopista tiene tarifas diferentes.' },
      { id: 'viajesMes', label: 'Viajes al Mes', type: 'number', placeholder: '20', required: true, min: 1, tooltip: 'Número de viajes mensuales. Considera viajes de ida y vuelta.' },
      { id: 'tieneConvenio', label: '¿Tienes convenio frecuente?', type: 'boolean', required: false, defaultValue: false, tooltip: 'Convenio frecuente da 30% de descuento. Requiere mínimo 15-20 viajes mensuales.' },
    ],
    faq: [
      {
        question: '¿Cuánto cuesta el TAG?',
        answer: 'El costo varía por ruta y hora: Santiago-Rancagua ~$3.800 por viaje, Santiago-Valparaíso ~$3.200, Santiago-Los Andes ~$4.500, urbano Santiago ~$1.200. Con convenio frecuente obtienes 30% de descuento.'
      },
      {
        question: '¿Qué es el convenio frecuente?',
        answer: 'El convenio frecuente es un descuento del 30% para usuarios que realizan al menos 15-20 viajes mensuales en la misma autopista. Se solicita directamente a la concesionaria.'
      },
      {
        question: '¿Cómo obtengo el TAG?',
        answer: 'El TAG se obtiene en oficinas de las concesionarias, supermercados, o en línea. Es un dispositivo que se instala en el parabrisas. El pago se hace con tarjeta de crédito o débito.'
      },
      {
        question: '¿Qué pasa si no pago el TAG?',
        answer: 'Si no pagas, la concesionaria puede bloquear tu TAG y cobrar multas. Además, no podrás usar las autopistas. El impago se reporta a Dicom afectando tu historial crediticio.'
      },
      {
        question: '¿Hay tarifas diferenciadas?',
        answer: 'Sí. Las autopistas tienen tarifas por hora: punta (7-10h, 17-21h) más cara, valle (10-17h) más barata, y noche (21-7h) la más económica. Planificar viajes puede ahorrar dinero.'
      },
    ],
  },
  {
    id: 'cuenta-luz',
    name: 'Calculadora Cuenta de Luz (Tarifa BT1)',
    description: 'Estima tu cuenta de luz según consumo kWh, zona y tipo de tarifa. Incluye cargo fijo, energía e IVA.',
    slug: 'calculadora-cuenta-luz',
    category: 'hogar',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'Comisión Nacional de Energía', url: 'https://www.cne.cl', note: 'Tarifas eléctricas reguladas (BT1)' },
      { name: 'SERNAC', url: 'https://www.sernac.cl', note: 'Derechos del consumidor en servicios básicos' },
    ],
    keywords: ['cuenta de luz', 'tarifa BT1', 'costo electricidad Chile', 'consumo kWh', 'cuenta electrica'],
    inputs: [
      { id: 'consumoKWH', label: 'Consumo (kWh)', type: 'number', placeholder: '250', required: true, min: 0, tooltip: 'Consumo mensual en kWh. Aparece en tu boleta. Un hogar promedio consume 200-300 kWh.' },
      { id: 'tipoTarifa', label: 'Tipo de Tarifa', type: 'select', required: true, options: [
        { value: 'bt1_residencial', label: 'Residencial' },
        { value: 'bt1_comercial', label: 'Comercial' },
        { value: 'bt1_industrial', label: 'Industrial' },
      ], tooltip: 'BT1 residencial es la más común. Comercial e industrial tienen tarifas diferentes.' },
      { id: 'zona', label: 'Zona', type: 'select', required: true, options: [
        { value: 'norte', label: 'Norte' },
        { value: 'central', label: 'Central' },
        { value: 'sur', label: 'Sur' },
      ], tooltip: 'El precio de la energía varía por zona: norte ~$150/kWh, central ~$135/kWh, sur ~$145/kWh.' },
    ],
    faq: [
      {
        question: '¿Cómo se calcula la cuenta de luz?',
        answer: 'La cuenta se compone de: cargo fijo mensual (~$800-$1.200), cargo por energía consumida (kWh × tarifa según zona), e IVA del 19%. La tarifa BT1 residencial varía entre $120-$180 por kWh según zona.'
      },
      {
        question: '¿Por qué cambia el precio según la zona?',
        answer: 'Chile tiene 4 sistemas eléctricos (norte grande, norte chico, central, sur). El precio depende de las plantas generadoras locales y costos de transmisión. La zona central es más barata por mayor oferta.'
      },
      {
        question: '¿Qué es el cargo fijo?',
        answer: 'El cargo fijo es un monto mensual por estar conectado al sistema eléctrico. No depende del consumo. Incluye medidor, lectura, y costos administrativos. Es aproximadamente $800-$1.200 mensuales.'
      },
      {
        question: '¿Cómo reducir la cuenta de luz?',
        answer: 'Consejos: usa ampolletas LED, electrodomésticos eficientes (A++), apaga equipos en standby, usa lavadora/secadora en horarios valle (10-17h), y mantén limpios los equipos.'
      },
      {
        question: '¿Qué es el subsidio eléctrico?',
        answer: 'El subsidio eléctrico beneficia a familias vulnerables con hasta $37.000 trimestrales. Se postula en el municipio. El subsidio se descuenta directamente de la boleta.'
      },
    ],
  },
  // ============================================
  // FASE 3 — 10 Calculadoras Crecimiento
  // ============================================
  {
    id: 'impuesto-segunda-categoria',
    name: 'Impuesto Segunda Categoría 2026',
    description: 'Calcula tu impuesto de segunda categoría según sueldo mensual y tramo progresivo. Actualizado con tramos 2026.',
    slug: 'calculadora-impuesto-segunda-categoria',
    category: 'impuestos',
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'SII', url: 'https://www.sii.cl', note: 'Impuesto de segunda categoría y tabla mensual' },
      { name: 'BCN — Ley Chile', url: 'https://www.bcn.cl/leychile', note: 'DL 824, Ley sobre Impuesto a la Renta' },
    ],
    keywords: ['impuesto segunda categoría', 'retención impuesto', 'tramos impuesto Chile', 'impuesto sueldo 2026'],
    inputs: [
      { id: 'sueldoBrutoMensual', label: 'Sueldo Bruto Mensual', type: 'number', placeholder: '$800.000', required: true, min: 0, tooltip: 'Sueldo bruto antes de descuentos. El impuesto se calcula sobre la renta imponible anual.' },
      { id: 'mesesTrabajados', label: 'Meses Trabajados', type: 'number', placeholder: '12', required: false, min: 1, max: 12, defaultValue: 12, tooltip: 'Meses con ingresos en el año. Si trabajaste menos de 12 meses, el impuesto es menor.' },
    ],
    faq: [
      {
        question: '¿Qué es el impuesto de segunda categoría?',
        answer: 'Es el impuesto que pagan los trabajadores dependientes e independientes sobre sus remuneraciones. Se calcula con tramos progresivos desde 0% hasta 40% según el nivel de ingresos anuales expresados en UTA (1 UTA = 12 UTM).'
      },
      {
        question: '¿Cuáles son los tramos del impuesto?',
        answer: 'Tramos 2026: 0% hasta 13.5 UTA, 4% de 13.5-30 UTA, 8% de 30-50 UTA, 13.5% de 50-70 UTA, 23% de 70-90 UTA, 30.4% de 90-120 UTA, 35% de 120-310 UTA, y 40% sobre 310 UTA.'
      },
      {
        question: '¿Cómo se calcula el impuesto mensual?',
        answer: 'El empleador retiene mensualmente proyectando tu ingreso anual. Si ganas $800.000 mensuales, tu anual son $9.600.000 (aprox. 11.4 UTA), bajo el tramo de 0%. Si ganas $2.000.000, anual $24.000.000 (28.5 UTA), paga 4%.'
      },
      {
        question: '¿El impuesto se devuelve?',
        answer: 'En la Operación Renta (abril), se calcula el impuesto real anual. Si te retuvieron de más, el SII devuelve. Si retuvieron de menos, debes pagar. Los independientes hacen este proceso anualmente.'
      },
      {
        question: '¿Qué es la UTA?',
        answer: 'La UTA (Unidad Tributaria Anual) equivale a 12 UTM. Se usa para definir los tramos del impuesto. En marzo 2026, con UTM a $69.889, una UTA es $838.668.'
      },
    ],
  },
  {
    id: 'ppm',
    name: 'PPM (Pagos Provisionales Mensuales)',
    description: 'Calcula tus pagos provisionales mensuales según actividad y ingresos brutos anuales.',
    slug: 'calculadora-ppm',
    category: 'impuestos',
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'SII', url: 'https://www.sii.cl', note: 'Pagos Provisionales Mensuales (PPM)' },
    ],
    keywords: ['PPM', 'pagos provisionales mensuales', 'PPM independientes', 'retención mensual Chile'],
    inputs: [
      { id: 'ingresosBrutosAnuales', label: 'Ingresos Brutos Anuales', type: 'number', placeholder: '$12.000.000', required: true, min: 0, tooltip: 'Ingresos brutos del año anterior. El SII usa este monto para calcular el PPM del año siguiente.' },
      { id: 'gastosPresuntos', label: 'Gastos Presuntos', type: 'number', placeholder: '$1.200.000', required: false, min: 0, tooltip: 'Gastos estimados que reducen la base imponible. Por defecto, el SII acepta 10% para profesionales.' },
      { id: 'actividad', label: 'Actividad', type: 'select', required: true, options: [
        { value: 'profesional', label: 'Profesional (10%)' },
        { value: 'comercio', label: 'Comercio (1%)' },
        { value: 'transporte', label: 'Transporte (0.5%)' },
        { value: 'construccion', label: 'Construcción (0.2%)' },
      ], tooltip: 'La tasa depende de la actividad. Profesionales 10%, comercio 1%, transporte 0.5%, construcción 0.2%.' },
    ],
    faq: [
      {
        question: '¿Qué son los PPM?',
        answer: 'Los Pagos Provisionales Mensuales (PPM) son abonos mensuales al impuesto anual a la renta. Se calculan aplicando una tasa a los ingresos brutos del mes. La tasa varía según actividad: profesionales 10%, comercio 1%, transporte 0.5%, construcción 0.2%.'
      },
      {
        question: '¿Cómo se calcula el PPM?',
        answer: 'PPM = Ingresos Brutos Mensuales × Tasa. Si eres profesional y facturas $1.000.000, el PPM es $100.000 (10%). Este monto se paga mensualmente y se acredita al impuesto anual.'
      },
      {
        question: '¿Cuándo se paga el PPM?',
        answer: 'El PPM se paga entre el 1 y 12 de cada mes, declarando los ingresos del mes anterior. Se paga en línea en el sitio del SII o en bancos autorizados.'
      },
      {
        question: '¿Puedo variar el PPM?',
        answer: 'Sí. Si estimas que tu renta anual será menor, puedes solicitar al SII una variación del PPM. Debes fundamentar con antecedentes. El SII acepta o rechaza la solicitud.'
      },
      {
        question: '¿Qué pasa si no pago el PPM?',
        answer: 'El no pago genera intereses y multas. Además, en la Operación Renta tendrás que pagar todo el impuesto de una vez sin los abonos mensuales. Puede haber sanciones por evasión.'
      },
    ],
  },
  {
    id: 'subsidio-agua',
    name: 'Subsidio Agua Potable',
    description: 'Estima el subsidio al pago de agua potable según consumo, personas y tramo (referencial; noIndex).',
    slug: 'calculadora-subsidio-agua',
    category: 'hogar',
    noIndex: true,
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-08',
    sources: [
      { name: 'SISS', url: 'https://www.siss.gob.cl', note: 'Subsidio de agua potable y servicios sanitarios' },
      { name: 'SERNAC', url: 'https://www.sernac.cl', note: 'Derechos del consumidor en servicios básicos' },
    ],
    keywords: ['subsidio agua potable', 'descuento agua', 'subsidio servicios básicos Chile'],
    inputs: [
      { id: 'consumoM3', label: 'Consumo Mensual (m³)', type: 'number', placeholder: '15', required: true, min: 0 },
      { id: 'numeroPersonas', label: 'Personas en el Hogar', type: 'number', placeholder: '4', required: true, min: 1 },
      { id: 'tramo', label: 'Tramo', type: 'select', required: true, options: [
        { value: 'tramo1', label: 'Tramo 1' },
        { value: 'tramo2', label: 'Tramo 2' },
      ]},
    ],
    faq: [
      { question: '¿Cómo obtengo subsidio de agua?', answer: 'El subsidio se obtiene a través del municipio, evaluando el Registro Social de Hogares. El tramo 1 cubre hasta 15m³ por persona, el tramo 2 el 70% y el tramo 3 el 50%.' },
    ],
  },
  {
    id: 'cotizacion-independientes',
    name: 'Cotización Independientes (Ley 21.133)',
    description: 'Calcula tus cotizaciones previsionales como trabajador independiente: AFP, salud y SIS.',
    slug: 'calculadora-cotizacion-independientes',
    category: 'pension',
    noIndex: true,
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'Superintendencia de Pensiones', url: 'https://www.spensiones.cl/portal/prevision', note: 'Cotización de independientes (Ley 21.133)' },
      { name: 'SII', url: 'https://www.sii.cl', note: 'Declaración de cotizaciones de independientes' },
    ],
    keywords: ['cotización independientes', 'Ley 21.133', 'cotización AFP independiente', 'base imponible 80%'],
    inputs: [
      { id: 'rentaBrutaMensual', label: 'Renta Bruta Mensual', type: 'number', placeholder: '$800.000', required: true, min: 0 },
      { id: 'afp', label: 'AFP', type: 'select', required: true, options: [
        { value: 'capital', label: 'Capital' },
        { value: 'cuprum', label: 'Cuprum' },
        { value: 'habitat', label: 'Habitat' },
        { value: 'modelo', label: 'Modelo' },
        { value: 'planvital', label: 'PlanVital' },
        { value: 'provida', label: 'ProVida' },
        { value: 'uno', label: 'Uno' },
      ]},
      { id: 'salud', label: 'Sistema de Salud', type: 'select', required: true, options: [
        { value: 'fonasa', label: 'FONASA' },
        { value: 'isapre', label: 'Isapre' },
      ]},
    ],
    faq: [
      { question: '¿Cuánto cotiza un independiente?', answer: 'Los independientes cotizan sobre el 80% de su renta bruta. AFP (10% + comisión), salud (7%) y la distribución legal vigente para SIS y seguro de accidentes. El total depende del año del calendario de cotizaciones.' },
    ],
  },
  {
    id: 'propina-legal',
    name: 'Calculadora Propina Legal (10%)',
    description: 'Calcula o extrae la propina del 10%. Ideal para dividir cuentas en restaurantes chilenos.',
    slug: 'calculadora-propina-legal',
    category: 'servicios',
    noIndex: true,
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'SERNAC', url: 'https://www.sernac.cl', note: 'Propina voluntaria del 10%' },
      { name: 'BCN — Ley Chile', url: 'https://www.bcn.cl/leychile', note: 'Normativa sobre propina en servicios' },
    ],
    keywords: ['propina 10%', 'calculadora propina', 'propina restaurante Chile', 'dividir cuenta'],
    inputs: [
      { id: 'montoConsumo', label: 'Monto', type: 'number', placeholder: '$25.000', required: true, min: 0 },
      { id: 'incluyePropina', label: '¿El monto incluye propina?', type: 'boolean', required: false, defaultValue: false },
      { id: 'porcentajePropina', label: 'Porcentaje de Propina (%)', type: 'number', placeholder: '10', required: false, min: 0, max: 50, defaultValue: 10 },
    ],
    faq: [
      { question: '¿Es obligatoria la propina del 10%?', answer: 'La propina del 10% es voluntaria según la ley chilena. Sin embargo, es una costumbre muy arraigada. El código del trabajo la menciona como un derecho del trabajador de establecimientos que la incluyan en la cuenta.' },
    ],
  },
  {
    id: 'gastos-comunes',
    name: 'Calculadora Gastos Comunes',
    description: 'Estima tus gastos comunes mensuales según superficie, estacionamiento y amenities del edificio.',
    slug: 'calculadora-gastos-comunes',
    category: 'hogar',
    noIndex: true,
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'SERNAC', url: 'https://www.sernac.cl', note: 'Gastos comunes y derechos del consumidor' },
      { name: 'MINVU', url: 'https://www.minvu.gob.cl', note: 'Copropiedad inmobiliaria y vivienda' },
    ],
    keywords: ['gastos comunes', 'condominio Chile', 'gasto común m²', 'departamento gastos'],
    inputs: [
      { id: 'superficieM2', label: 'Superficie (m²)', type: 'number', placeholder: '65', required: true, min: 0 },
      { id: 'incluyeEstacionamiento', label: '¿Incluye estacionamiento?', type: 'boolean', required: false, defaultValue: false },
      { id: 'estacionamientos', label: 'N° de Estacionamientos', type: 'number', placeholder: '1', required: false, min: 0 },
      { id: 'tienePiscina', label: '¿Piscina?', type: 'boolean', required: false, defaultValue: false },
      { id: 'tieneGimnasio', label: '¿Gimnasio?', type: 'boolean', required: false, defaultValue: false },
      { id: 'tieneConserje', label: '¿Conserje 24h?', type: 'boolean', required: false, defaultValue: false },
    ],
    faq: [
      { question: '¿Cómo se calculan los gastos comunes?', answer: 'Se calculan según la superficie de tu departamento (m² × tarifa), más cargos por estacionamientos y amenities (piscina, gimnasio, conserje). La tarifa promedio es de $12.000-$18.000 por m².' },
    ],
  },
  {
    id: 'conversor-divisas',
    name: 'Conversor Dólar / Euro a CLP',
    description: 'Convierte entre dólares americanos, euros y pesos chilenos con tasas aproximadas actualizadas.',
    slug: 'calculadora-conversor-divisas',
    category: 'conversiones',
    noIndex: true,
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'Banco Central de Chile', url: 'https://www.bcentral.cl/areas/estadisticas', note: 'Tipo de cambio dólar y euro' },
    ],
    keywords: ['dólar a peso', 'euro a peso', 'conversor divisas Chile', 'USD CLP', 'EUR CLP'],
    inputs: [
      { id: 'monto', label: 'Monto', type: 'number', placeholder: '100', required: true, min: 0 },
      { id: 'moneda', label: 'Moneda', type: 'select', required: true, options: [
        { value: 'usd', label: 'Dólar Americano (USD)' },
        { value: 'eur', label: 'Euro (EUR)' },
      ]},
      { id: 'direccion', label: 'Conversión', type: 'select', required: true, options: [
        { value: 'a_clp', label: 'Divisa → CLP' },
        { value: 'desde_clp', label: 'CLP → Divisa' },
      ]},
    ],
    faq: [
      { question: '¿Cuánto vale el dólar hoy?', answer: 'El valor del dólar cambia diariamente. A marzo 2026, el dólar se aproxima a $960 CLP y el euro a $1.040 CLP. Para el valor exacto consulta el Banco Central de Chile.' },
    ],
  },
  {
    id: 'aguinaldo',
    name: 'Aguinaldo Fiestas Patrias / Navidad',
    description:
      'Estima el aguinaldo de Fiestas Patrias o Navidad del sector público 2026 (tramo 1 Ley 21.806) o prorratea por meses. Pensionados IPS: ver montos oficiales en ChileAtiende.',
    slug: 'calculadora-aguinaldo',
    category: 'beneficios',
    noIndex: true,
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-10',
    sources: [
      {
        name: 'Ley 21.806 (BCN)',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1221118',
        note: 'Reajuste sector público 2026: aguinaldos FP y Navidad por tramos',
      },
      {
        name: 'ChileAtiende / IPS',
        url: 'https://www.chileatiende.gob.cl/fichas/26553-aguinaldo-de-fiestas-patrias-para-pensionados-ips',
        note: 'Aguinaldo FP pensionados: $25.280 + $12.969 por carga (2026)',
      },
      {
        name: 'Ministerio de Hacienda',
        url: 'https://www.hacienda.cl/noticias-y-eventos/noticias/gobierno-y-cut-mesa-del-sector-publico-firman-protocolo-de-acuerdo-por-reajuste',
        note: 'Protocolo reajuste: tramos y montos de aguinaldos 2026',
      },
    ],
    keywords: [
      'aguinaldo',
      'aguinaldo fiestas patrias 2026',
      'aguinaldo navidad 2026',
      'aguinaldo sector público',
      'aguinaldo pensionados IPS',
    ],
    inputs: [
      {
        id: 'tipo',
        label: 'Tipo de Aguinaldo',
        type: 'select',
        required: true,
        options: [
          { value: 'fiestas_patrias', label: 'Fiestas Patrias (SP tramo 1)' },
          { value: 'navidad', label: 'Navidad (SP tramo 1)' },
          { value: 'escolar', label: 'Bono escolaridad (total)' },
        ],
      },
      {
        id: 'sueldoBruto',
        label: 'Sueldo Bruto (referencial)',
        type: 'number',
        placeholder: '$800.000',
        required: true,
        min: 0,
      },
      {
        id: 'mesesTrabajados',
        label: 'Meses Trabajados',
        type: 'number',
        placeholder: '12',
        required: true,
        min: 0,
        max: 12,
      },
    ],
    faq: [
      {
        question: '¿Cuánto es el aguinaldo de Fiestas Patrias 2026 en el sector público?',
        answer:
          'Según la Ley 21.806, en septiembre 2026 el tramo 1 es $91.682 si la remuneración líquida de agosto es igual o inferior a $1.060.493, y el tramo 2 es $63.645 si supera ese umbral (con los topes de elegibilidad de la ley). Esta calculadora usa el tramo 1 como base y puede prorratear por meses. En el sector privado el aguinaldo no es obligatorio por ley general: depende del contrato o convenio colectivo.',
      },
      {
        question: '¿Y los pensionados del IPS?',
        answer:
          'Es otro beneficio. ChileAtiende informa $25.280 base más $12.969 por cada carga familiar acreditada al 31 de agosto de 2026, pagado con la pensión de septiembre. No uses el monto del sector público para pensionados ni al revés.',
      },
    ],
  },
  {
    id: 'pgu',
    name: 'PGU (Pensión Garantizada Universal)',
    description: 'Calcula tu Pensión Garantizada Universal según pensión actual y años cotizados. Ley 21.400.',
    slug: 'calculadora-pgu',
    category: 'pension',
    noIndex: true,
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-04',
    sources: [
      { name: 'Superintendencia de Pensiones', url: 'https://www.spensiones.cl/portal/prevision', note: 'PGU, Pensión Garantizada Universal' },
      { name: 'IPS', url: 'https://www.ips.gob.cl', note: 'Pago de PGU y pensiones solidarias' },
    ],
    keywords: ['PGU', 'pensión garantizada universal', 'PGU Chile', 'bono pensión', 'Ley 21.400'],
    inputs: [
      { id: 'pensionActual', label: 'Pensión Actual', type: 'number', placeholder: '$250.000', required: true, min: 0 },
      { id: 'anosCotizados', label: 'Años Cotizados', type: 'number', placeholder: '20', required: true, min: 0, max: 50 },
      { id: 'esHombre', label: '¿Hombre?', type: 'boolean', required: false, defaultValue: true },
    ],
    faq: [
      { question: '¿Qué es la PGU?', answer: 'La Pensión Garantizada Universal (Ley 21.400) es un beneficio del Estado que complementa las pensiones bajas. El monto base 2026 es de aproximadamente $214.296, ajustado según años cotizados y pensión actual.' },
    ],
  },
];

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculators.find(c => c.slug === slug);
}

export function getCalculatorsByCategory(category: Calculator['category']): Calculator[] {
  return calculators.filter(c => c.category === category);
}
