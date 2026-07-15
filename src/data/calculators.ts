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
    description:
      'Agrega o quita el IVA del 19% (neto ↔ bruto). Ejemplos: $100.000 neto = $119.000 bruto; $119.000 bruto = $100.000 neto.',
    slug: 'calculadora-iva',
    category: 'impuestos',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-10',
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
      'cómo quitar el IVA',
    ],
    inputs: [
      {
        id: 'monto',
        label: 'Monto en pesos',
        type: 'number',
        unit: 'CLP',
        placeholder: '$100.000',
        required: true,
        min: 0,
        tooltip: 'Si agregas IVA, ingresa el neto. Si quitas IVA, ingresa el bruto (precio de boleta/factura con IVA).',
      },
      {
        id: 'tipo',
        label: 'Operación',
        type: 'select',
        required: true,
        options: [
          { value: 'agregar-iva', label: 'Agregar IVA (neto → bruto)' },
          { value: 'quitar-iva', label: 'Quitar IVA (bruto → neto)' },
        ],
        defaultValue: 'agregar-iva',
      },
    ],
    faq: [
      {
        question: '¿Cuánto es el IVA en Chile 2026?',
        answer:
          'El IVA general es 19% (DL 825). Hay exenciones y regímenes especiales (educación, salud, exportadores, etc.): esta calculadora usa la tasa general del 19%.',
      },
      {
        question: 'Ejemplo: $100.000 neto ¿cuánto es con IVA?',
        answer:
          'IVA = $100.000 × 0,19 = $19.000. Bruto = $119.000. Fórmula: bruto = neto × 1,19.',
      },
      {
        question: '¿Cómo sacar el IVA de un precio con impuesto incluido?',
        answer:
          'Divide el bruto por 1,19. Ejemplo: $119.000 ÷ 1,19 = $100.000 neto; el IVA es $19.000. Elige “Quitar IVA” en la calculadora.',
      },
      {
        question: '¿$50.000 o $1.000.000 con IVA cuánto dan?',
        answer:
          'Neto $50.000 → bruto $59.500 (IVA $9.500). Neto $1.000.000 → bruto $1.190.000 (IVA $190.000). Siempre con tasa 19%.',
      },
      {
        question: '¿Es lo mismo que retención de boleta de honorarios?',
        answer:
          'No. El IVA 19% grava ventas/servicios afectos. La retención de boleta de honorarios 2026 (15,25%) es otro régimen (Ley 21.133). Usa la calculadora de boleta de honorarios para ese caso.',
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
    lastReviewed: '2026-07-13',
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
      ], defaultValue: '42', tooltip: 'La fórmula DT divide sueldo/30 × 28 por las horas de cuatro semanas.' },
      { id: 'recargoPersonalizado', label: 'Recargo pactado (%)', type: 'number', placeholder: '50', required: false, min: 50, max: 200, tooltip: 'Vacío = mínimo legal de 50%. Un contrato o convenio puede pactar un porcentaje superior.' },
      { id: 'sueldoVariable', label: '¿Usar promedio de sueldo variable?', type: 'boolean', required: false, defaultValue: false },
      { id: 'sueldoPromedio3Meses', label: 'Promedio últimos 3 meses (si variable)', type: 'number', unit: 'CLP', placeholder: '0', required: false, min: 0 },
      { id: 'calcularImpactoCotizaciones', label: '¿Estimar impacto en cotizaciones (10%+7%+0,6%)?', type: 'boolean', required: false, defaultValue: false },
      { id: 'mostrarTopeLegal', label: '¿Mostrar tope legal (2 h/día)?', type: 'boolean', required: false, defaultValue: false },
    ],
    faq: [
      {
        question: '¿Cuánto me pagan por una hora extra?',
        answer: 'El recargo legal mínimo es 50% sobre la hora ordinaria. Para sueldo mensual, la DT indica: sueldo ÷ 30 × 28 ÷ (jornada semanal × 4), y luego multiplicar por 1,5. Con $1.000.000 y 42 horas, una hora extra equivale a $8.333.',
      },
      {
        question: '¿Existe recargo nocturno automático?',
        answer: 'No. Tampoco existe un 100% general automático por domingo o festivo. El mínimo de 50% rige para la hora que jurídicamente es extraordinaria, sin perjuicio de descansos compensatorios o pactos más favorables.',
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
    description: 'Estima el feriado proporcional al término del contrato e incorpora fines de semana y feriados al pago.',
    slug: 'calculadora-vacaciones-proporcionales',
    category: 'beneficios',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-13',
    sources: [
      { name: 'DT — Feriado proporcional', url: 'https://www.dt.gob.cl/portal/1628/w3-article-60183.html', note: 'Procedimiento de días hábiles y proyección de sábados, domingos y festivos' },
      { name: 'BCN — Código del Trabajo', url: 'https://www.bcn.cl/leychile/navegar?idNorma=207436', note: 'Artículos 67 a 73 sobre feriado' },
    ],
    seoTitle: 'Vacaciones Proporcionales 2026: calcula en pesos',
    seoDescription:
      'Calcula tus días y el monto en pesos de vacaciones proporcionales en Chile. Ideal al renunciar o al finiquito. Gratis, Código del Trabajo.',
    keywords: ['vacaciones proporcionales', 'feriado proporcional', 'días de vacaciones', 'finiquito vacaciones', 'Código del Trabajo Art. 67', 'calculadora vacaciones'],
    inputs: [
      { id: 'sueldoBruto', label: 'Sueldo Bruto', type: 'number', placeholder: '$500.000', required: true, min: 0 },
      { id: 'mesesTrabajados', label: 'Meses Trabajados', type: 'number', placeholder: '6', required: true, min: 0, max: 11 },
      { id: 'diasTrabajadosUltimoMes', label: 'Días adicionales del último mes', type: 'number', placeholder: '0', required: false, min: 0, max: 30, defaultValue: 0 },
      { id: 'diasNoTomados', label: 'Días de vacaciones no tomados', type: 'number', placeholder: '0', required: false, min: 0, defaultValue: 0 },
      { id: 'fechaTermino', label: 'Fecha de término (AAAA-MM-DD)', type: 'text', placeholder: '2026-07-31', required: true, tooltip: 'Permite proyectar los días hábiles e incorporar sábados, domingos y feriados nacionales.' },
    ],
    faq: [
      {
        question: '¿Cómo se calculan las vacaciones proporcionales?',
        answer: 'Se acumulan 1,25 días hábiles por mes completo y 1,25/30 por cada día adicional. Al terminar el contrato, esos días se proyectan desde el día siguiente y se agregan los sábados, domingos y festivos que caen dentro del período.',
      },
      {
        question: '¿Cuántos días de vacaciones me corresponden por año?',
        answer: 'La regla general es 15 días hábiles por año. La cantidad de días corridos no es siempre 21: depende de la fecha concreta, fines de semana y feriados incluidos en la proyección.',
      },
      {
        question: '¿Se pagan las vacaciones proporcionales en el finiquito?',
        answer: 'Sí, al terminar el contrato se compensa el feriado proporcional y el feriado pendiente que corresponda. La remuneración íntegra puede requerir promedios o componentes variables; esta versión usa el sueldo mensual declarado y debe contrastarse con el finiquito.',
      },
      {
        question: '¿Qué pasa si no tomé mis vacaciones?',
        answer: 'Los días hábiles pendientes se agregan antes de proyectar el calendario. El valor diario de un sueldo mensual se obtiene dividiendo por 30, pero la base puede cambiar si existen remuneraciones variables.',
      },
      {
        question: '¿Qué dice el Art. 67 del Código del Trabajo?',
        answer: 'El artículo 67 regula el feriado anual; el 68, el feriado progresivo; el 70 impide compensarlo en dinero mientras sigue vigente el contrato; y el 73 ordena compensar el feriado al terminar la relación laboral. La acumulación de hasta dos períodos está en el artículo 70.',
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
    description: 'Consulta el piso legal para menores y compáralo con el límite general de ingresos. No reemplaza la decisión del tribunal.',
    slug: 'calculadora-pension-alimenticia',
    category: 'familia',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-13',
    sources: [
      { name: 'BCN — Ley 14.908, artículo 3', url: 'https://www.bcn.cl/leychile/navegar?idNorma=172986&idParte=8720734', note: 'Pisos de 40% o 30% del ingreso mínimo remuneracional' },
      { name: 'BCN — Ley 14.908, artículo 7', url: 'https://www.bcn.cl/leychile/navegar?idNorma=172986&idParte=8720735', note: 'Límite general de 50% y excepción por razones fundadas' },
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
        answer: 'No existe una tabla legal que convierta el sueldo en una pensión sugerida. El tribunal considera las necesidades del alimentario, la capacidad económica de las partes, los cuidados y otros antecedentes. Esta herramienta solo muestra el piso presunto y el límite general regulados por la Ley 14.908.',
      },
      {
        question: '¿Qué dice la Ley 14.908 sobre pensión alimenticia?',
        answer: 'Para un menor, el artículo 3 establece un piso de 40% del ingreso mínimo remuneracional. Si se solicitan alimentos para dos o más menores, el piso es 30% del ingreso mínimo por cada uno. El juez puede rebajarlo si se acredita falta de medios.',
      },
      {
        question: '¿Cuál es el monto mínimo de pensión alimenticia?',
        answer: 'Con el ingreso mínimo de $553.553 vigente desde mayo de 2026, la referencia es $221.421 para un menor. Para dos o más menores, corresponde $166.066 por cada uno. Son pisos presuntos: una resolución puede fijar otro monto según los antecedentes del caso.',
      },
      {
        question: '¿La pensión se calcula sobre el bruto o líquido?',
        answer: 'La ley habla de las rentas del alimentante para el límite general de 50%, pero el monto no se obtiene aplicando automáticamente un porcentaje al sueldo bruto o líquido. El tribunal determina qué antecedentes de ingresos y capacidad económica resultan pertinentes.',
      },
      {
        question: '¿Qué pasa si no pago la pensión alimenticia?',
        answer: 'Puede dar lugar a liquidación de deuda, retenciones, apremios y, cuando se cumplen sus requisitos, inscripción en el Registro Nacional de Deudores. No corresponde afirmar que toda mora produce automáticamente un reporte comercial o una pena de prisión.',
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
    description:
      'Estima el permiso de un vehículo liviano con la escala SII, UTM de enero y beneficio eléctrico 2026.',
    slug: 'calculadora-permiso-circulacion',
    category: 'vehiculos',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-13',
    sources: [
      { name: 'SII — Tasación vehicular 2026', url: 'https://www.sii.cl/destacados/tasacion_vehiculos/2026/index.html', note: 'Consulta oficial por código, marca y modelo' },
      { name: 'SII — Cómo se determina el permiso', url: 'https://www.sii.cl/preguntas_frecuentes/tasac_fiscal_vehiculos/001_170_5079.htm', note: 'Escala progresiva y UTM de enero' },
      { name: 'SII — Resolución Exenta 6/2026', url: 'https://www.sii.cl/normativa_legislacion/resoluciones/2026/reso6.pdf', note: 'Tasaciones, permiso mínimo y exención de vehículos elegibles' },
      { name: 'ChileAtiende', url: 'https://www.chileatiende.gob.cl/fichas/9611-permiso-de-circulacion', note: 'Plazos y cuotas' },
    ],
    seoTitle: 'Permiso de Circulación 2026: calcula el valor',
    seoDescription:
      'Estima el permiso 2026 de un vehículo liviano con tasación fiscal, escala SII y beneficio eléctrico. Confirma por código en el SII.',
    keywords: [
      'permiso de circulación',
      'calcular permiso de circulacion',
      'costo permiso circulación',
      'tasación fiscal vehículo',
      'segunda cuota permiso agosto',
      'permiso 2026',
      'vehículo eléctrico permiso circulación',
    ],
    inputs: [
      {
        id: 'valorVehiculo',
        label: 'Tasación fiscal SII (no precio de compra)',
        type: 'number',
        unit: 'CLP',
        placeholder: '$8.000.000',
        required: true,
        min: 0,
        tooltip:
          'Usa la tasación fiscal 2026 publicada para el código exacto de tu vehículo, no el precio comercial.',
      },
      {
        id: 'electricoHibridoElegible',
        label: '¿Figura con exención de 75% en la nómina SII 2026?',
        type: 'boolean',
        required: false,
        defaultValue: false,
        tooltip: 'No basta con ser híbrido o eléctrico: confirma que el código exacto aparezca en la lista SII beneficiada.',
      },
    ],
    faq: [
      {
        question: '¿Usa el precio de compra del auto?',
        answer:
          'No. Debes ingresar la tasación fiscal SII. El precio de la compraventa o de un portal no es la base legal del permiso.',
      },
      {
        question: '¿Cómo calcula esta herramienta?',
        answer:
          'Aplica la escala progresiva acumulativa SII sobre la tasación fiscal, con la UTM de enero de 2026 ($69.751). Para tasaciones de hasta $3.487.600 usa el permiso mínimo de $34.876. No aplica rebajas ficticias por antigüedad o tipo.',
      },
      {
        question: '¿Qué son la 1.ª y 2.ª cuota?',
        answer:
          'La herramienta muestra la mitad del monto anual como base. La segunda cuota, pagada normalmente en agosto, puede incorporar el reajuste legal; confirma el monto exacto en la municipalidad.',
      },
      {
        question: '¿Cuándo se paga el permiso 2026?',
        answer:
          'La renovación anual suele concentrarse a inicios de año (hasta marzo en muchas comunas) y la 2.ª cuota hacia agosto. Revisa el calendario de tu comuna: no es único para todo Chile.',
      },
      {
        question: '¿Qué documentos piden?',
        answer:
          'Típicamente padrón, revisión técnica, SOAP y cédula. Requisitos exactos: municipio donde está inscrito el vehículo.',
      },
    ],
  },
  {
    id: 'costo-empleado-pyme',
    name: 'Costo Total Empleado PYME',
    description: 'Estima el costo mensual según contrato y período 2026, sin duplicar SIS ni descuentos del trabajador.',
    slug: 'calculadora-costo-empleado-pyme',
    category: 'empresas',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-13',
    sources: [
      { name: 'Superintendencia de Pensiones — aporte empleador', url: 'https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-10906.html', note: 'Gradualidad de 1% y distribución previsional' },
      { name: 'Superintendencia de Pensiones — SIS', url: 'https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-9893.html', note: 'Tasa SIS 1,62% desde abril de 2026' },
      { name: 'AFC Chile', url: 'https://www.afc.cl/seguro-de-cesantia/', note: 'Seguro de cesantía (aporte empleador 2.4%)' },
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
      { id: 'agregarGratificacion', label: '¿Agregar gratificación Art. 50?', type: 'boolean', required: false, defaultValue: false, tooltip: 'Actívala solo si el sueldo ingresado no la incluye. Se aplica 25% con tope de 4,75 ingresos mínimos anuales.' },
      { id: 'periodoCotizacion', label: 'Período de remuneración', type: 'select', required: true, options: [
        { value: 'hasta_julio_2026', label: 'Hasta julio 2026: 1% + SIS separado' },
        { value: 'desde_agosto_2026', label: 'Desde agosto 2026: 3,5% total con SIS incluido' },
      ], defaultValue: 'hasta_julio_2026' },
    ],
    faq: [
      {
        question: '¿Cuánto cuesta realmente un empleado en Chile?',
        answer: 'No existe un multiplicador universal de 1,3 o 1,5. Depende de si el sueldo ya incluye gratificación, el tipo de contrato, la tasa adicional de la mutual, beneficios pactados y el período previsional. La herramienta muestra solo componentes configurados y obligatorios de referencia.',
      },
      {
        question: '¿Qué aportes debe pagar el empleador?',
        answer: 'Hasta julio de 2026 paga 1% de la reforma previsional más SIS de 1,62%, además de cesantía y mutual. Desde agosto, la cotización previsional total sube a 3,5% e incluye el financiamiento SIS: no se debe sumar SIS otra vez. El 7% de salud se descuenta al trabajador, no es aporte patronal adicional.',
      },
      {
        question: '¿Qué significa el factor costo?',
        answer: 'Es la división entre el costo mensual estimado y el sueldo bruto ingresado. Sirve para comparar este escenario, pero no es una tasa legal ni incluye colación, movilización, licencias, reemplazos, indemnizaciones u otros beneficios.',
      },
      {
        question: '¿Cómo afectan las horas extra al costo?',
        answer: 'Las horas extra forman parte de la remuneración imponible, pero no se incorporan aquí porque requieren su propia base y cantidad. Calcula primero su monto en la herramienta de horas extra y súmalo al escenario remuneracional correspondiente.',
      },
      {
        question: '¿Hay diferencias para PYME?',
        answer: 'La calculadora no presume exenciones por tamaño de empresa. Si existe un subsidio de contratación vigente y cumples sus requisitos, debe tratarse por separado; no reduzcas las cotizaciones obligatorias solo por ser PYME.',
      },
    ],
  },
  // ============================================
  // FASE 1 RESTANTE
  // ============================================
  {
    id: 'credito-hipotecario',
    name: 'Simulador Crédito Hipotecario 2026',
    description: 'Simula capital, dividendo e intereses con amortización francesa. No estima seguros, CAE contractual ni aprobación bancaria.',
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
      { id: 'calcularTablaAmortizacion', label: '¿Calcular tabla de amortización?', type: 'boolean', required: false, defaultValue: false },
    ],
    faq: [
      {
        question: '¿Cómo se calcula el dividendo hipotecario?',
        answer: 'El dividendo se calcula con la fórmula de amortización francesa: PMT = P × [r(1+r)^n] / [(1+r)^n - 1], donde P es el monto del crédito, r es la tasa mensual y n el total de cuotas. Esta fórmula asegura cuotas iguales durante todo el plazo. Por ejemplo, 2000 UF a 25 años con 4.5% anual da un dividendo de aproximadamente 10.7 UF mensuales.'
      },
      {
        question: '¿Cuánto pie necesito para un crédito hipotecario?',
        answer: 'No existe un pie único exigido por ley. Cada entidad evalúa el porcentaje financiado, el inmueble y el perfil de riesgo. Usa en la simulación el pie de una cotización formal, no un supuesto de aprobación.'
      },
      {
        question: '¿Es mejor un crédito en UF o en pesos?',
        answer: 'En UF, la obligación y el dividendo se expresan en una unidad que se reajusta con la inflación, por lo que el equivalente en pesos cambia. No se puede afirmar que sea más seguro sin comparar ingresos, tasa, plazo y oferta concreta.'
      },
      {
        question: '¿Qué gastos adicionales debo considerar?',
        answer: 'Revisa en la cotización desgravamen, incendio, eventuales coberturas adicionales, tasación, estudio de títulos, notaría, impuesto de timbres cuando corresponda e inscripción en el Conservador. La herramienta no inventa porcentajes nacionales para estos costos.'
      },
      {
        question: '¿Cuál es el costo total del crédito?',
        answer: 'El resultado suma capital e intereses del escenario matemático. Para comparar ofertas reales usa la CAE y el costo total del crédito incluidos en la hoja de resumen del proveedor, porque incorporan cargos que este simulador no conoce.'
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
        question: '¿Cómo funciona el prepago?',
        answer: 'Para operaciones reajustables de hasta 5.000 UF, la comisión legal máxima es un mes y medio de intereses sobre el capital prepagado; si el abono es inferior a 10% del saldo se requiere consentimiento del acreedor. Sobre 5.000 UF rige lo pactado. Solicita una liquidación formal: esta herramienta no simula ese cargo.'
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
    description:
      'Estima contribuciones 2026 por avalúo fiscal y destino: cuota (1 de 4), anual, exención habitacional en UTM y umbral en pesos.',
    slug: 'calculadora-contribuciones',
    category: 'vivienda',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-10',
    sources: [
      { name: 'SII', url: 'https://www.sii.cl', note: 'Contribuciones e impuesto territorial' },
      { name: 'Tesorería General de la República', url: 'https://www.tesoreria.cl', note: 'Pago de contribuciones / giros' },
      { name: 'ChileAtiende', url: 'https://www.chileatiende.gob.cl', note: 'Información de cuotas y plazos' },
    ],
    seoTitle: 'Contribuciones 2026: calcula por avalúo fiscal',
    seoDescription:
      'Estima tus contribuciones (impuesto territorial) 2026 según avalúo SII y destino. Cuotas abr/jun/sep/nov y exención UTM. Gratis.',
    keywords: [
      'contribuciones',
      'impuesto territorial',
      'avalúo fiscal',
      'contribuciones 2026',
      'cuota contribuciones septiembre',
      'exención contribuciones',
      'impuesto bienes raíces Chile',
    ],
    inputs: [
      {
        id: 'avaluoFiscal',
        label: 'Avalúo fiscal (SII)',
        type: 'number',
        unit: 'CLP',
        placeholder: '$50.000.000',
        required: true,
        min: 0,
        tooltip:
          'No es el valor comercial. Está en el certificado de avalúo o en el sitio del SII. La exención habitacional usa este valor en UTM.',
      },
      {
        id: 'destino',
        label: 'Destino / tipo de propiedad',
        type: 'select',
        required: true,
        options: [
          { value: 'habitacional', label: 'Habitacional' },
          { value: 'comercial', label: 'Comercial' },
          { value: 'industrial', label: 'Industrial' },
          { value: 'sitio_eriado', label: 'Sitio eriado' },
          { value: 'agrario', label: 'Agrario' },
        ],
        tooltip:
          'Tasas referenciales del motor: habitacional 0,93% (con descuento 0,025 pp), comercial/industrial 1,2%, eriado 2%, agrario 0,5%. Confirma en tu giro SII.',
      },
    ],
    faq: [
      {
        question: '¿Cómo se estiman las contribuciones aquí?',
        answer:
          'Se aplica una tasa anual referencial según destino sobre el avalúo fiscal. Habitacional usa 0,93% menos 0,025 puntos (≈0,905%). Comercial/industrial 1,2%, sitio eriado 2%, agrario 0,5%. El resultado es educativo: tu giro oficial está en el SII/TGR.',
      },
      {
        question: '¿Cuándo se pagan las 4 cuotas?',
        answer:
          'El calendario habitual de pago es en cuatro cuotas (abril, junio, septiembre y noviembre). La calculadora muestra el monto de una cuota (anual ÷ 4) y también el semestre (anual ÷ 2). Fechas exactas y recargos: TGR / SII del año.',
      },
      {
        question: '¿Hay exención de contribuciones?',
        answer:
          'Las propiedades habitacionales con avalúo fiscal ≤ 225,96 UTM suelen estar exentas en este modelo. El umbral en pesos se calcula con la UTM del sitio (resultado “Umbral exención”). Pueden existir otras exenciones (vivienda nueva, etc.) que esta herramienta no modela.',
      },
      {
        question: '¿Dónde veo mi avalúo fiscal?',
        answer:
          'En el SII (servicios en línea / certificado de avalúo) o en la documentación de la propiedad. No uses el valor comercial de portales inmobiliarios.',
      },
      {
        question: '¿Qué pasa si no pago?',
        answer:
          'El atraso genera intereses y multas. El cobro puede judicializarse. Las contribuciones gravan el inmueble. Consulta TGR/SII; esto no es asesoría de cobranzas.',
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
    lastReviewed: '2026-07-13',
    sources: [
      { name: 'BCN — Ley 21.830', url: 'https://www.bcn.cl/leychile/navegar?idNorma=1225354', note: 'Montos y tramos vigentes desde mayo de 2026' },
      { name: 'SUSESO — Asignación Familiar', url: 'https://www.suseso.cl/606/w3-propertyvalue-571.html', note: 'Beneficiarios, causantes y reconocimiento' },
    ],
    keywords: ['asignación familiar', 'asignación por hijo', 'tramo asignación', 'subsidio familiar Chile'],
    inputs: [
      { id: 'sueldoBruto', label: 'Ingreso mensual promedio', type: 'number', placeholder: '$500.000', required: true, min: 0, tooltip: 'Referencia para estimar el tramo. La entidad administradora determina el ingreso promedio conforme al período legal aplicable.' },
      { id: 'numeroHijos', label: 'Número de Hijos', type: 'number', placeholder: '2', required: true, min: 0, tooltip: 'Hijos menores de 18 años (o 24 si estudian, sin límite si son discapacitados).' },
    ],
    faq: [
      {
        question: '¿Cuánto es la asignación familiar?',
        answer: 'Desde mayo de 2026: $22.601 hasta $649.039; $13.870 sobre $649.039 y hasta $947.990; $4.382 sobre $947.990 y hasta $1.478.539. Sobre ese último límite el monto es $0. El pago es por carga reconocida, no necesariamente por cada hijo declarado en esta simulación.'
      },
      {
        question: '¿Quiénes tienen derecho a asignación familiar?',
        answer: 'Pueden acceder las personas beneficiarias del Sistema Único de Prestaciones Familiares que tengan causantes reconocidos y cumplan sus requisitos. No basta con tener hijos ni existe un requisito general de afiliación a FONASA o Isapre para originar el beneficio.'
      },
      {
        question: '¿Cómo se solicita la asignación familiar?',
        answer: 'Primero debes solicitar el reconocimiento de la carga ante la entidad administradora que corresponda, como caja de compensación, IPS u otra institución previsional. El canal y quién paga dependen de la situación laboral y previsional; no siempre es automático.'
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
      'Simula dividendo CAE a tasa 2% (PMT): UF, gracia, % del ingreso y garantía 90%. Aviso TGR si hay mora fiscal. No es Ingresa ni embargos.',
    slug: 'calculadora-credito-cae',
    category: 'educacion',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-10',
    sources: [
      { name: 'Ingresa / Comisión Ingresa', url: 'https://www.ingresa.cl', note: 'Administración y pagos del CAE' },
      { name: 'TGR — CAE', url: 'https://tgr.gob.cl', note: 'Cobro fiscal de deudas CAE morosas (tgr.cl/cae)' },
      { name: 'MINEDUC', url: 'https://www.mineduc.cl', note: 'Crédito con Aval del Estado' },
      { name: 'BCN — Ley 20.027', url: 'https://www.bcn.cl/leychile/navegar?idNorma=240080', note: 'Ley del CAE' },
    ],
    seoTitle: 'Simulador CAE 2026: cuota, UF y % del ingreso',
    seoDescription:
      'Simula cuota CAE a tasa 2%: total, UF, gracia y cuota vs ingreso. Aviso cobro TGR 2026. No es FES ni embargo. Gratis.',
    keywords: [
      'calculadora CAE',
      'simulador CAE 2026',
      'cuota CAE',
      'crédito aval estado',
      'dividendo CAE',
      'cae tasa 2%',
      'embargo CAE TGR',
      'cae vs fes',
      'condonación CAE',
      'deuda CAE tesorería',
    ],
    inputs: [
      {
        id: 'montoCredito',
        label: 'Monto del crédito (CLP o equivalente)',
        type: 'number',
        unit: 'CLP',
        placeholder: '$15.000.000',
        required: true,
        min: 0,
        tooltip:
          'Capital que simulas en cuotas. El CAE real se administra en UF; el dividendo se expresa también en UF con el valor del sitio.',
      },
      {
        id: 'tasaAnual',
        label: 'Tasa anual real (%)',
        type: 'number',
        placeholder: '2',
        required: true,
        min: 0,
        max: 15,
        defaultValue: 2,
        tooltip: 'Referencia legal del CAE: 2% real anual. Solo cámbiala si tu contrato indica otra.',
      },
      {
        id: 'plazoMeses',
        label: 'Plazo de pago (meses)',
        type: 'number',
        placeholder: '180',
        required: true,
        min: 12,
        max: 240,
        defaultValue: 180,
        tooltip: 'Máximo habitual 240 meses (20 años). Prueba 120, 180 o 240.',
      },
      {
        id: 'mesesGracia',
        label: 'Meses de gracia antes de la 1.ª cuota',
        type: 'number',
        placeholder: '18',
        required: false,
        min: 0,
        max: 120,
        defaultValue: 18,
        tooltip:
          'Educativo (p. ej. ~18 meses post-egreso). No modela subsidio de intereses real del período de estudios.',
      },
      {
        id: 'ingresoMensualBruto',
        label: 'Ingreso bruto mensual (opcional)',
        type: 'number',
        unit: 'CLP',
        placeholder: '$1.200.000',
        required: false,
        min: 0,
        tooltip:
          'Si lo completas, comparamos la cuota PMT con el 10% del ingreso (referencia Ley 21.605). Tu cuota contractual la define Ingresa, no este % automático.',
      },
      {
        id: 'tieneGarantiaEstatal',
        label: '¿Mostrar garantía estatal 90%?',
        type: 'boolean',
        required: false,
        defaultValue: true,
        tooltip:
          'Informativo: el Estado puede garantizar hasta el 90%. No es un descuento de tu cuota. Si hay mora y se activa la garantía, el Fisco puede cobrar vía TGR.',
      },
    ],
    faq: [
      {
        question: '¿Qué calcula exactamente esta página?',
        answer:
          'Una amortización francesa (PMT) con tasa fija (default 2%), plazo y capital: dividendo en pesos y UF, intereses, gracia estimada y, si ingresas sueldo, la cuota como % del ingreso. No reemplaza Ingresa ni la cartola TGR.',
      },
      {
        question: '¿Por qué mi cuota en Ingresa puede ser distinta al PMT?',
        answer:
          'Porque pueden aplicar tope por ingreso (referencia 10% del bruto en regímenes de la Ley 21.605), diferidos, reprogramaciones o subsidios. El PMT es el “dividendo teórico” del capital; la cuota contractual la define Ingresa/acreedor.',
      },
      {
        question: '¿Qué pasa si dejo de pagar el CAE? ¿Me embarga la TGR?',
        answer:
          'Si acumulas mora, el banco puede hacer efectiva la garantía estatal: el Fisco paga al banco y la TGR cobra la deuda fiscal. En 2026 la TGR anunció embargos y retenciones (cuentas, inversiones, vehículos, bienes raíces) tras notificaciones, con foco en morosos de mayores ingresos y convenios para otros tramos. Revisa tgr.cl/cae y el artículo del blog sobre embargos CAE 2026. Esta calculadora no simula embargos.',
      },
      {
        question: '¿Ingresos sobre $5 millones: sin convenio?',
        answer:
          'Según comunicados TGR de abril 2026, el cobro a morosos con ingresos mensuales superiores a $5 millones se orientó a acciones más directas, sin acceso a los convenios pensados para ingresos menores. Las reglas exactas y actualizaciones: TGR.',
      },
      {
        question: '¿Es lo mismo que el FES?',
        answer:
          'No. El CAE es crédito con tasa fija en UF. El FES u otros esquemas contingentes al ingreso son distintos. Esta herramienta no simula FES.',
      },
      {
        question: '¿Puede condonarse el saldo al final del plazo?',
        answer:
          'Según reglas del programa puede haber condonación del saldo al cumplir el plazo máximo (p. ej. 20 años). Condiciones: Ingresa / normativa. No se descuenta aquí.',
      },
      {
        question: '¿Dónde regularizo si me notificó la TGR?',
        answer:
          'En tgr.cl/cae (ClaveÚnica / clave tributaria), Formulario 34 y canales TGR. Si el cobro aún es bancario/Ingresa, usa ingresa.cl. No firmes ni pagues sin identificar al acreedor correcto.',
      },
    ],
  },
  {
    id: 'credito-automotriz',
    name: 'Simulador Crédito Automotriz',
    description:
      'Simula cuota, pie %, intereses, seguro estimado y CAE educativa. No es oferta bancaria ni la CAE de la hoja de resumen.',
    slug: 'calculadora-credito-automotriz',
    category: 'vehiculos',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-10',
    sources: [
      { name: 'CMF', url: 'https://www.cmfchile.cl', note: 'Créditos de consumo y CAE' },
      { name: 'SERNAC', url: 'https://www.sernac.cl', note: 'Derechos del consumidor financiero' },
    ],
    seoTitle: 'Crédito Automotriz 2026: simula cuota y pie',
    seoDescription:
      'Simula cuota de auto en Chile: pie %, tasa, plazo, intereses y CAE aproximada. Compara antes de firmar. Gratis.',
    keywords: [
      'crédito automotriz',
      'simulador credito automotriz',
      'cuota auto chile',
      'pie auto',
      'CAE crédito automotriz',
      'tasa crédito auto 2026',
    ],
    inputs: [
      {
        id: 'valorVehiculo',
        label: 'Valor del vehículo',
        type: 'number',
        unit: 'CLP',
        placeholder: '$15.000.000',
        required: true,
        min: 0,
      },
      {
        id: 'pie',
        label: 'Pie (ahorro inicial)',
        type: 'number',
        unit: 'CLP',
        placeholder: '$3.000.000',
        required: true,
        min: 0,
        tooltip: 'Suele pedirse 20–30% del valor. La calculadora muestra el % resultante.',
      },
      {
        id: 'tasaAnual',
        label: 'Tasa anual nominal (%)',
        type: 'number',
        placeholder: '12',
        required: true,
        min: 0,
        max: 40,
        defaultValue: 12,
        tooltip: 'Usa la tasa de la cotización del banco/financiera. En 2026 los rangos de mercado suelen ser de un dígito a teen según perfil; no hay tasa única.',
      },
      {
        id: 'plazoMeses',
        label: 'Plazo (meses)',
        type: 'number',
        placeholder: '48',
        required: true,
        min: 6,
        max: 84,
        defaultValue: 48,
      },
      {
        id: 'incluyeSeguro',
        label: '¿Sumar seguro vehicular estimado?',
        type: 'boolean',
        required: false,
        defaultValue: true,
        tooltip: 'Estimación simple del sitio (no es prima de aseguradora). El banco exige seguros; SOAP es aparte.',
      },
      {
        id: 'gastosAsociadosPct',
        label: 'Gastos/comisiones para CAE aprox. (%)',
        type: 'number',
        placeholder: '2',
        required: false,
        min: 0,
        max: 30,
        defaultValue: 2,
        tooltip: 'Solo para la CAE educativa del resultado. La CAE legal de la hoja de resumen la calcula el acreedor.',
      },
    ],
    faq: [
      {
        question: '¿Es la CAE oficial del banco?',
        answer:
          'No. La “CAE aproximada” de esta página es educativa (tasa + gastos prorrateados). La Carga Anual Equivalente legal aparece en la hoja de resumen del crédito (CMF/SERNAC).',
      },
      {
        question: '¿Cuánto pie piden?',
        answer:
          'Habitualmente 20–30% del valor. Menos pie suele subir tasa o endurecer condiciones. Compara siempre el total a pagar, no solo la cuota.',
      },
      {
        question: '¿Qué tasa debo poner?',
        answer:
          'La de tu cotización formal. Las tasas de mercado varían por perfil, nuevo/usado y plazo; no inventes un “promedio nacional” como oferta.',
      },
      {
        question: '¿SOAP y seguro del crédito son lo mismo?',
        answer:
          'No. El SOAP es obligatorio para circular. El banco suele exigir seguro de desgravamen e incendio/robo sobre el vehículo financiado. Esta tool solo estima un seguro genérico opcional.',
      },
      {
        question: '¿Puedo prepago?',
        answer:
          'En Chile el prepago de créditos de consumo tiene reglas de SERNAC/CMF. Revisa tu contrato: suele permitirse con condiciones de cargo.',
      },
    ],
  },
  {
    id: 'multas-transito',
    name: 'Calculadora Multas de Tránsito',
    description:
      'Convierte a pesos los rangos legales de multas y aplica la reincidencia de infracciones graves o gravísimas.',
    slug: 'calculadora-multas-transito',
    category: 'vehiculos',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-13',
    sources: [
      { name: 'BCN — Ley 18.290, artículos 197 a 201', url: 'https://www.bcn.cl/leychile/navegar?idNorma=29708&idParte=8756096', note: 'Clasificación, rangos y reincidencia' },
      { name: 'BCN — Ley 21.377 No Chat', url: 'https://www.bcn.cl/leychile/navegar?idNorma=1166274', note: 'Uso de dispositivos como infracción gravísima' },
    ],
    seoTitle: 'Multas de Tránsito 2026 Chile: calcula en UTM',
    seoDescription:
      'Consulta rangos de 0,2 a 3 UTM para multas de tránsito, su conversión a pesos y reglas de reincidencia. El JPL fija el monto.',
    keywords: [
      'multas tránsito',
      'multa UTM',
      'multa celular volante',
      'multa luz roja',
      'multa sin SOAP',
      'infracción tránsito Chile',
    ],
    inputs: [
      {
        id: 'tipoMulta',
        label: 'Infracción o tramo',
        type: 'select',
        required: true,
        options: [
          { value: 'leve', label: 'Tramo leve (0,2 a 0,5 UTM)' },
          { value: 'menos_grave', label: 'Tramo menos grave (0,5 a 1 UTM)' },
          { value: 'grave', label: 'Tramo grave (1 a 1,5 UTM)' },
          { value: 'gravisima', label: 'Tramo gravísima (1,5 a 3 UTM)' },
          { value: 'estacionar_prohibido', label: 'Estacionar o detenerse en lugar prohibido' },
          { value: 'no_cinturon', label: 'Sin cinturón de seguridad' },
          { value: 'celular', label: 'Manipular celular al conducir (gravísima)' },
          { value: 'luz_roja', label: 'No detenerse en luz roja o PARE (gravísima)' },
          { value: 'exceso_hasta_10', label: 'Exceso de hasta 10 km/h (menos grave)' },
          { value: 'exceso_11_a_20', label: 'Exceso de 11 a 20 km/h (grave)' },
          { value: 'exceso_mas_20', label: 'Exceso sobre 20 km/h (gravísima)' },
          { value: 'sin_revision_tecnica', label: 'Sin revisión técnica (grave)' },
          { value: 'sin_soap', label: 'Sin SOAP (grave)' },
          { value: 'sin_licencia', label: 'Sin haber obtenido licencia (gravísima)' },
        ],
        tooltip:
          'La herramienta muestra el mínimo y máximo del rango. El Juzgado de Policía Local fija el monto y puede aplicar suspensión u otras sanciones.',
      },
      {
        id: 'cantidadMultas',
        label: 'Cantidad de multas iguales',
        type: 'number',
        placeholder: '1',
        required: false,
        min: 1,
        defaultValue: 1,
      },
      {
        id: 'reincidenciasPrevias',
        label: 'Reincidencias previas de la misma gravedad',
        type: 'number',
        required: false,
        min: 0,
        max: 2,
        defaultValue: 0,
        tooltip: 'Solo para graves dentro de 2 años o gravísimas dentro de 3 años: una duplica la multa y una nueva reincidencia la triplica.',
      },
    ],
    faq: [
      {
        question: '¿Los montos son exactos?',
        answer:
          'No. La Ley 18.290 establece rangos: 0,2–0,5 UTM para leves, 0,5–1 para menos graves, 1–1,5 para graves y 1,5–3 para gravísimas. El JPL fija el monto dentro del rango y puede imponer otras sanciones.',
      },
      {
        question: '¿Por qué aparecen infracciones concretas?',
        answer:
          'Para evitar clasificaciones antiguas: manipular el celular, no detenerse ante luz roja o PARE y conducir sin haber obtenido licencia son gravísimas. La lista no reemplaza el texto vigente ni cubre todas las circunstancias.',
      },
      {
        question: '¿Cómo se actualiza el valor en pesos?',
        answer:
          'Con la UTM del snapshot/API del sitio. Si la UTM del día cambia, el monto en CLP cambia.',
      },
      {
        question: '¿Cómo pago o reclamo?',
        answer:
          'Pago en municipio / canales habilitados; reclamo ante Juzgado de Policía Local en los plazos legales. Revisa tu citación.',
      },
    ],
  },
  {
    id: 'costo-tag',
    name: 'Presupuesto TAG Autopista',
    description: 'Proyecta tu gasto mensual usando la tarifa vigente del pórtico, horario y categoría que consultaste.',
    slug: 'calculadora-costo-tag',
    category: 'vehiculos',
    noIndex: true,
    featured: false,
    phase: 2,
    lastReviewed: '2026-07-13',
    sources: [
      { name: 'MOP — Peajes y pórticos 2026', url: 'https://concesiones.mop.gob.cl/peajes-y-porticos/', note: 'Tarifarios oficiales por concesión, categoría y horario' },
      { name: 'MOP — Preguntas sobre concesiones', url: 'https://concesiones.mop.gob.cl/preguntas-y-respuestas/', note: 'La tarifa depende del contrato y tramo recorrido' },
    ],
    keywords: ['costo TAG', 'autopista Chile', 'peaje TAG', 'presupuesto TAG', 'tarifa pórtico'],
    inputs: [
      { id: 'tarifaPorPaso', label: 'Tarifa vigente por pasada', type: 'number', placeholder: '$1.250', required: true, min: 0, tooltip: 'Cópiala del tarifario MOP o de la concesionaria para tu pórtico, horario y categoría.' },
      { id: 'pasadasMes', label: 'Pasadas al mes', type: 'number', placeholder: '20', required: true, min: 0, tooltip: 'Cuenta cada paso facturable; una ida y vuelta puede incluir varios pórticos.' },
      { id: 'cargoFijoMensual', label: 'Cargo fijo mensual', type: 'number', placeholder: '$0', required: false, min: 0 },
      { id: 'otrosCargosMensuales', label: 'Otros cargos mensuales', type: 'number', placeholder: '$0', required: false, min: 0 },
    ],
    faq: [
      {
        question: '¿Cuánto cuesta el TAG?',
        answer: 'No existe una tarifa nacional por viaje. El cobro cambia según concesión, pórtico o tramo, categoría de vehículo y horario. Consulta el tarifario 2026 de la Dirección General de Concesiones y usa aquí el valor que corresponde a tu recorrido.'
      },
      {
        question: '¿La herramienta calcula viajes sin TAG?',
        answer: 'No. Los pases diarios, tarifas para usuarios sin TAG y mecanismos de regularización dependen de cada autopista. Aplicar un recargo universal de 50% produciría resultados falsos.'
      },
      {
        question: '¿Cómo obtengo el TAG?',
        answer: 'Solicítalo a una concesionaria y revisa sus canales oficiales. El dispositivo es interoperable en las autopistas concesionadas, pero la contratación, habilitación y cobro se rigen por las condiciones informadas por la empresa.'
      },
      {
        question: '¿Qué pasa si no pago el TAG?',
        answer: 'Puede generarse deuda contractual y, si circulas con el dispositivo inhabilitado sin regularizar por el mecanismo correspondiente, también consecuencias bajo la Ley de Tránsito. Revisa la cuenta y los canales de la concesionaria; no todo impago produce automáticamente un reporte comercial.'
      },
      {
        question: '¿Hay tarifas diferenciadas?',
        answer: 'Sí, pero los horarios y categorías no son iguales en todas las concesiones. Algunos tarifarios distinguen base fuera de punta, punta o saturación; otros usan tramos o tarifas manuales. Verifica el documento específico de tu ruta.'
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
    description: 'Estima el subsidio según tu cuenta, porcentaje asignado y tope oficial. El resultado real aparece en la boleta.',
    slug: 'calculadora-subsidio-agua',
    category: 'hogar',
    noIndex: true,
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-13',
    sources: [
      { name: 'ChileAtiende — Subsidio al agua', url: 'https://www.chileatiende.gob.cl/fichas/51314-subsidio-al-pago-de-consumo-de-agua-potable-y-servicio-de-alcantarillado', note: 'Cobertura de 25% a 85%, tope de 13 m³ y régimen especial' },
      { name: 'BCN — Ley 18.778', url: 'https://www.bcn.cl/leychile/navegar?idNorma=30157', note: 'Subsidio al consumo de agua potable y alcantarillado' },
    ],
    keywords: ['subsidio agua potable', 'descuento agua', 'subsidio servicios básicos Chile'],
    inputs: [
      { id: 'consumoM3', label: 'Consumo Mensual (m³)', type: 'number', placeholder: '15', required: true, min: 0 },
      { id: 'numeroPersonas', label: 'Personas en el Hogar', type: 'number', placeholder: '4', required: true, min: 1 },
      { id: 'montoCuenta', label: 'Total de la cuenta antes del subsidio', type: 'number', placeholder: '$25.000', required: true, min: 0 },
      { id: 'porcentajeAsignado', label: 'Porcentaje asignado (%)', type: 'number', placeholder: '50', required: true, min: 25, max: 85, tooltip: 'Revisa la resolución municipal o tu boleta. En el régimen general varía entre 25% y 85%.' },
      { id: 'seguridadesYOportunidades', label: '¿Participas en Seguridades y Oportunidades?', type: 'boolean', required: false, defaultValue: false },
    ],
    faq: [
      { question: '¿Cómo funciona el subsidio al agua?', answer: 'Se postula en la municipalidad del domicilio. El régimen general cubre entre 25% y 85% del valor hasta un consumo máximo de 13 m³; el porcentaje depende de la evaluación socioeconómica. No existen tres porcentajes nacionales fijos.' },
      { question: '¿Qué cambia para Seguridades y Oportunidades?', answer: 'Los hogares participantes obtienen una cobertura de 100% para los primeros 15 m³ registrados en la cuenta. La herramienta aplica ese régimen especial cuando marcas la opción correspondiente.' },
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
    description: 'Estima el monto PGU 2026 según edad y pensión base declarada. No verifica residencia ni focalización.',
    slug: 'calculadora-pgu',
    category: 'pension',
    noIndex: true,
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-13',
    sources: [
      { name: 'ChileAtiende — PGU', url: 'https://www.chileatiende.gob.cl/fichas/102077-pension-garantizada-universal-pgu', note: 'Montos, límites, edad y requisitos vigentes en 2026' },
      { name: 'BCN — Ley 21.419', url: 'https://www.bcn.cl/leychile/navegar?idNorma=1171923', note: 'Crea la Pensión Garantizada Universal' },
    ],
    keywords: ['PGU', 'pensión garantizada universal', 'PGU Chile', 'bono pensión', 'Ley 21.419'],
    inputs: [
      { id: 'pensionActual', label: 'Pensión base estimada', type: 'number', placeholder: '$250.000', required: true, min: 0, tooltip: 'La pensión base legal puede diferir de lo que recibes actualmente. Usa el dato informado por IPS o ChileAtiende si lo tienes.' },
      { id: 'edad', label: 'Edad', type: 'number', placeholder: '70', required: true, min: 0, max: 120 },
    ],
    faq: [
      { question: '¿Cuáles son los montos PGU vigentes?', answer: 'Desde febrero de 2026, el máximo es $231.732 para personas de 65 a 81 años y $250.275 para quienes tienen 82 años o más. Hasta una pensión base de $789.139 se entrega el máximo correspondiente; entre ese valor y $1.252.602 el monto disminuye.' },
      { question: '¿Los años cotizados cambian la PGU?', answer: 'No. La PGU es un beneficio no contributivo y su monto no se multiplica por años cotizados. Sí existen requisitos de edad, residencia y focalización que esta estimación no puede verificar.' },
    ],
  },
];

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculators.find(c => c.slug === slug);
}

export function getCalculatorsByCategory(category: Calculator['category']): Calculator[] {
  return calculators.filter(c => c.category === category);
}
