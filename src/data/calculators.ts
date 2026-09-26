// ============================================
// Catálogo de calculadoras disponibles
// ============================================

import type { Calculator } from '@/types/calculator';
import { calculatorMethodologies } from '@/data/calculator-methodologies';

const calculatorCatalog: Omit<Calculator, 'methodology'>[] = [
  {
    id: 'sueldo-liquido',
    name: 'Sueldo Líquido 2026',
    description:
      'Calcula tu sueldo líquido a partir del bruto, considerando AFP, salud y seguro de cesantía.',
    slug: 'calculadora-sueldo-liquido',
    category: 'sueldo',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-08',
    sources: [
      {
        name: 'SII — Impuesto 2ª categoría',
        url: 'https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm',
        note: 'Tabla IUSC mensual',
      },
      {
        name: 'Superintendencia de Salud',
        url: 'https://www.superdesalud.gob.cl/preguntas-frecuentes/tax-grupos-de-interes/personas-6051/beneficiarios-isapres-6059/',
        note: '7% salud y tope 90 UF',
      },
      {
        name: 'AFC Chile',
        url: 'https://www.afc.cl/seguro-de-cesantia/',
        note: 'Seguro de cesantía',
      },
      {
        name: 'Previred — indicadores',
        url: 'https://www.previred.com/wp-content/uploads/2026/06/Indicadores-Previsionales-Previred-Junio-2026v2.pdf',
        note: 'Comisiones AFP, SIS, topes',
      },
    ],
    keywords: [
      'sueldo líquido',
      'calculadora sueldo',
      'descuentos AFP',
      'sueldo bruto a líquido',
      'descuentos legales Chile',
    ],
    inputs: [
      {
        id: 'sueldoBruto',
        label: 'Sueldo Bruto (o líquido objetivo si inverso)',
        type: 'number',
        unit: 'CLP',
        placeholder: '$1.000.000',
        required: true,
        min: 0,
        tooltip:
          'Remuneración imponible mensual. Si activas cálculo inverso, ingresa el líquido que quieres recibir.',
      },
      {
        id: 'afp',
        label: 'AFP',
        type: 'select',
        required: true,
        options: [
          { value: 'uno', label: 'Uno (0,46%)' },
          { value: 'modelo', label: 'Modelo (0,58%)' },
          { value: 'planvital', label: 'PlanVital (1,16%)' },
          { value: 'habitat', label: 'Habitat (1,27%)' },
          { value: 'capital', label: 'Capital (1,44%)' },
          { value: 'cuprum', label: 'Cuprum (1,44%)' },
          { value: 'provida', label: 'ProVida (1,45%)' },
        ],
      },
      {
        id: 'saludTipo',
        label: 'Sistema de Salud',
        type: 'select',
        required: true,
        options: [
          { value: 'fonasa', label: 'FONASA (7%)' },
          { value: 'isapre', label: 'Isapre (máx. 7% o plan)' },
        ],
        tooltip:
          'FONASA descuenta 7% del imponible topado. Isapre: el mayor entre 7% y el precio del plan en UF.',
      },
      {
        id: 'isapreMonto',
        label: 'Plan Isapre (UF)',
        type: 'number',
        unit: 'UF',
        placeholder: '3.5',
        required: false,
        min: 0,
        tooltip:
          'Precio del plan en UF. Si supera el 7% legal, se descuenta el plan. Con FONASA puedes dejarlo en 0.',
      },
      {
        id: 'contratoIndefinido',
        label: '¿Contrato indefinido?',
        type: 'boolean',
        required: false,
        defaultValue: true,
        tooltip:
          'Indefinido: el trabajador cotiza 0,6% de cesantía. Plazo fijo/obra: 0% trabajador / 3% empleador.',
      },
      {
        id: 'bonoMovilizacion',
        label: 'Bono movilización (no imponible)',
        type: 'number',
        unit: 'CLP',
        placeholder: '$0',
        required: false,
        min: 0,
      },
      {
        id: 'bonoColacion',
        label: 'Bono colación (no imponible)',
        type: 'number',
        unit: 'CLP',
        placeholder: '$0',
        required: false,
        min: 0,
      },
      {
        id: 'bonoPerdidaCaja',
        label: 'Bono pérdida de caja (no imponible)',
        type: 'number',
        unit: 'CLP',
        placeholder: '$0',
        required: false,
        min: 0,
      },
      {
        id: 'comisiones',
        label: 'Comisiones (imponibles)',
        type: 'number',
        unit: 'CLP',
        placeholder: '$0',
        required: false,
        min: 0,
      },
      {
        id: 'asignacionFamiliar',
        label: 'Asignación familiar (no imponible)',
        type: 'number',
        unit: 'CLP',
        placeholder: '$0',
        required: false,
        min: 0,
      },
      {
        id: 'prestamoEmpleador',
        label: 'Préstamo con empleador',
        type: 'number',
        unit: 'CLP',
        placeholder: '$0',
        required: false,
        min: 0,
      },
      {
        id: 'descuentoSindical',
        label: 'Descuento sindical',
        type: 'number',
        unit: 'CLP',
        placeholder: '$0',
        required: false,
        min: 0,
      },
      {
        id: 'descuentoCajaCompensacion',
        label: 'Descuento caja de compensación',
        type: 'number',
        unit: 'CLP',
        placeholder: '$0',
        required: false,
        min: 0,
      },
      {
        id: 'calculoInverso',
        label: '¿Cálculo inverso (líquido → bruto)?',
        type: 'boolean',
        required: false,
        defaultValue: false,
        tooltip:
          'Estimación iterativa del bruto necesario para un líquido objetivo. Es aproximado: IUSC y topes no son lineales.',
      },
    ],
    faq: [
      {
        question: '¿Qué es el sueldo líquido?',
        answer:
          'El sueldo líquido es el monto que recibes en tu cuenta bancaria después de todos los descuentos legales obligatorios. Estos descuentos incluyen: cotización AFP (10% + comisión), cotización de salud (7% para FONASA o Isapre), y el seguro de cesantía (0.6% para contrato indefinido). La diferencia entre sueldo bruto y líquido suele ser aproximadamente un 20%.',
      },
      {
        question: '¿Cuánto me descuentan del sueldo bruto?',
        answer:
          'Los descuentos legales obligatorios suman aproximadamente un 20% del sueldo bruto: AFP 10% + comisión (varía por AFP, entre 0.46% y 1.45%), salud 7% (FONASA o Isapre), y seguro de cesantía 0.6% (contrato indefinido) o 0% (contrato a plazo fijo). Además, si tu sueldo supera ciertos topes, se aplica retención de impuesto de segunda categoría.',
      },
      {
        question: '¿La gratificación se incluye en el sueldo líquido?',
        answer:
          'Sí, la gratificación legal (25% de remuneración mensual o 4.75% del sueldo mínimo anual) se suma al sueldo base antes de aplicar los descuentos. Por lo tanto, el sueldo líquido que recibes ya incluye la gratificación, siempre que tu empleador la pague mensualmente.',
      },
      {
        question: '¿Puedo elegir mi AFP?',
        answer:
          'Sí, puedes cambiar libremente de AFP en cualquier momento. El proceso es gratuito y se realiza a través de la nueva AFP que elijas. Sin embargo, todas las AFP tienen la misma tasa de cotización obligatoria del 10%, lo que varía es la comisión que cobran y la rentabilidad de los fondos.',
      },
      {
        question: '¿Qué pasa si gano más del tope imponible?',
        answer:
          'Si tu sueldo supera el tope imponible (90 UF mensuales en 2026 para AFP y salud, 135.2 UF para seguro de cesantía), las cotizaciones se calculan solo sobre ese tope, no sobre el total de tu sueldo. Esto significa que el porcentaje de descuento efectivo es menor para sueldos muy altos.',
      },
      {
        question: '¿Cómo se calcula el factor de conversión bruto a líquido?',
        answer:
          'El factor de conversión bruto a líquido es el porcentaje que representa tu sueldo líquido respecto a tu sueldo bruto. Por ejemplo, si tu sueldo bruto es $1.000.000 y tu líquido es $800.000, el factor de conversión es del 80%. Este factor varía según tus cotizaciones y descuentos.',
      },
      {
        question: '¿Puedo calcular de líquido a bruto?',
        answer:
          'Sí, nuestra calculadora permite calcular el sueldo bruto necesario para obtener un sueldo líquido objetivo. Esta función es útil para negociar remuneraciones o entender cuánto debes ganar bruto para recibir un cierto monto líquido.',
      },
      {
        question: '¿Se consideran bonos y asignaciones?',
        answer:
          'Sí, puedes incluir bonos de movilización, colación, pérdida de caja, comisiones y asignación familiar. Los bonos de movilización y colación son no imponibles (no afectan cotizaciones), mientras que las comisiones sí son imponibles.',
      },
      {
        question: '¿Se consideran descuentos adicionales?',
        answer:
          'Sí, puedes incluir descuentos por préstamos con el empleador, sindicatos o cajas de compensación. Estos descuentos se restan del sueldo líquido final.',
      },
      {
        question: '¿El tramo FONASA cambia el descuento de salud?',
        answer:
          'No. En la liquidación el descuento de salud FONASA es 7% del imponible topado. Los tramos A/B/C/D afectan copagos de atención médica, no el descuento mensual de cotización.',
      },
    ],
  },
  {
    id: 'finiquito',
    name: 'Finiquito',
    description:
      'Calcula el monto de tu finiquito considerando indemnización, vacaciones y gratificación proporcional.',
    slug: 'calculadora-finiquito',
    category: 'beneficios',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-08',
    sources: [
      {
        name: 'DT — plazo y pago del finiquito',
        url: 'https://www.dt.gob.cl/portal/1628/w3-article-109632.html',
        note: 'Reglas generales del finiquito y plazo de 10 días hábiles',
      },
      {
        name: 'SUSESO — Art. 168',
        url: 'https://www.suseso.gob.cl/612/w3-propertyvalue-69859.html',
        note: 'Recargos judiciales por despido injustificado',
      },
    ],
    keywords: [
      'finiquito',
      'calculadora finiquito',
      'indemnización por años de servicio',
      'vacaciones proporcionales',
      'renuncia trabajo Chile',
    ],
    inputs: [
      {
        id: 'ultimoSueldo',
        label: 'Último sueldo bruto (base)',
        type: 'number',
        unit: 'CLP',
        placeholder: '$1.000.000',
        required: true,
        min: 0,
      },
      {
        id: 'añosTrabajados',
        label: 'Años trabajados',
        type: 'number',
        placeholder: '5',
        required: true,
        min: 0,
      },
      {
        id: 'causaTermino',
        label: 'Causa de término',
        type: 'select',
        required: true,
        options: [
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
        ],
      },
      {
        id: 'mesesTrabajados',
        label: 'Meses adicionales (fracción de año)',
        type: 'number',
        placeholder: '0',
        required: false,
        min: 0,
        max: 11,
        defaultValue: 0,
      },
      {
        id: 'diasVacacionesPendientes',
        label: 'Días de vacaciones pendientes (año en curso)',
        type: 'number',
        placeholder: '0',
        required: false,
        min: 0,
        defaultValue: 0,
      },
      {
        id: 'vacacionesAniosAnteriores',
        label: 'Días de feriado pendiente de años anteriores',
        type: 'number',
        placeholder: '0',
        required: false,
        min: 0,
        tooltip: 'Se pagan siempre al término (Art. 73). Ingresa días, no años.',
      },
      {
        id: 'tieneGratificacion',
        label: '¿Incluir gratificación proporcional?',
        type: 'boolean',
        required: false,
        defaultValue: true,
      },
      {
        id: 'horasExtraPromedio',
        label: 'Horas extra pendientes (monto CLP)',
        type: 'number',
        unit: 'CLP',
        placeholder: '0',
        required: false,
        min: 0,
        defaultValue: 0,
      },
      {
        id: 'bonosHabituales',
        label: 'Bonos habituales pendientes (CLP)',
        type: 'number',
        unit: 'CLP',
        placeholder: '0',
        required: false,
        min: 0,
        defaultValue: 0,
      },
      {
        id: 'diasTrabajadosUltimoMes',
        label: 'Días trabajados último mes (sueldo pendiente)',
        type: 'number',
        placeholder: '0',
        required: false,
        min: 0,
        max: 31,
        defaultValue: 0,
      },
      {
        id: 'sueldoPromedio',
        label: 'Sueldo promedio (opcional, base Art. 172)',
        type: 'number',
        unit: 'CLP',
        placeholder: '0',
        required: false,
        min: 0,
        tooltip:
          'Si es mayor que 0, se usa como base en vez del último sueldo (tope 90 UF en indemnización).',
      },
      {
        id: 'diasAdicionalesConvenio',
        label: 'Días feriado extra por convenio',
        type: 'number',
        placeholder: '0',
        required: false,
        min: 0,
      },
      {
        id: 'incluyeAvisoPrevio',
        label: '¿Pagar indemnización sustitutiva de aviso previo?',
        type: 'boolean',
        required: false,
        defaultValue: false,
        tooltip:
          'Actívalo solo si el empleador NO dio el aviso de 30 días (Art. 162). Suma ~1 mes de remuneración (tope 90 UF). Default: no (asume que sí avisó).',
      },
      {
        id: 'recargoArt168Pct',
        label: 'Escenario recargo Art. 168 (judicial)',
        type: 'select',
        required: false,
        options: [
          { value: '0', label: '0% — sin recargo (default)' },
          { value: '30', label: '30% — Art. 161 improcedente' },
          { value: '50', label: '50% — despido injustificado / sin causal' },
          { value: '80', label: '80% — causal indebida (falta de probidad, etc.)' },
          { value: '100', label: '100% — aplicación indebida grave' },
        ],
        defaultValue: '0',
        tooltip:
          'Solo aplica si un juez declara el despido injustificado. NO es automático. Es un escenario hipotético sobre la indemnización por años.',
      },
    ],
    faq: [
      {
        question: '¿Qué es el finiquito?',
        answer:
          'El finiquito es el documento legal que pone término a la relación laboral y detalla los pagos que el empleador debe entregar al trabajador. Incluye: sueldo devengado no pagado, vacaciones proporcionales o pendientes, y según la causal, indemnización por años de servicio. Es un derecho irrenunciable establecido en el Código del Trabajo.',
      },
      {
        question: '¿Cómo se calcula la indemnización por años de servicio?',
        answer:
          'La indemnización por años de servicio equivale a 30 días de la última remuneración mensual por cada año trabajado (Art. 163 Código del Trabajo). Se calcula sobre el sueldo bruto y se paga solo en caso de despido injustificado o mutuo acuerdo con indemnización. El tope máximo es de 330 días (11 años).',
      },
      {
        question: '¿Qué son las vacaciones proporcionales?',
        answer:
          'Las vacaciones proporcionales son los días de feriado legal que te corresponden por el tiempo trabajado en el año en que terminas tu contrato. Se calculan dividiendo los 15 días hábiles de vacaciones anuales entre 12 meses, dando 1.25 días por mes trabajado. Se pagan junto con el finiquito.',
      },
      {
        question: '¿Tengo derecho a indemnización si renuncio?',
        answer:
          'No. Si renuncias voluntariamente, no tienes derecho a indemnización por años de servicio. Solo recibes el pago de días trabajados no pagados y vacaciones proporcionales o pendientes. Sin embargo, si es un mutuo acuerdo, puedes negociar una indemnización con tu empleador.',
      },
      {
        question: '¿Cuál es el tope de la indemnización?',
        answer:
          'La indemnización por años de servicio tiene un tope máximo de 11 años de servicio (330 días), según el Art. 163 del Código del Trabajo. Además, la base de cálculo no puede exceder de 90 UF mensuales. Esto significa que hay un límite máximo legal que puede recibir el trabajador.',
      },
      {
        question: '¿Qué es la indemnización sustitutiva del aviso previo?',
        answer:
          'La indemnización sustitutiva del aviso previo equivale a 1 mes de sueldo y se paga cuando el empleador despide sin dar el aviso previo correspondiente (30 días). El monto está limitado al tope de 90 UF mensuales.',
      },
      {
        question: '¿Se consideran vacaciones pendientes de años anteriores?',
        answer:
          'Sí. El feriado pendiente de períodos anteriores se paga al término (Art. 73 CdT), sumado al proporcional del año en curso. Ingresa los días pendientes en el campo correspondiente.',
      },
      {
        question: '¿Qué es el recargo del Art. 168?',
        answer:
          'Es un recargo judicial (30%, 50%, 80% o 100%) sobre la indemnización por años de servicio cuando el juez declara el despido injustificado o la causal improcedente. No es automático ni una “multa por pagar tarde el finiquito”. Úsalo solo como escenario hipotético.',
      },
      {
        question: '¿Cuándo se paga el aviso previo?',
        answer:
          'Si el empleador despide sin el aviso de 30 días, debe pagar indemnización sustitutiva de un mes de remuneración (Art. 162), con tope de 90 UF. Activa esa opción solo en ese caso.',
      },
    ],
  },
  {
    id: 'uf-clp',
    name: 'Conversor UF ↔ CLP',
    description:
      'Convierte entre UF y pesos chilenos con el valor de UF del snapshot/API del sitio (Banco Central / Mindicador). Sin histórico inventado ni proyecciones.',
    slug: 'calculadora-uf-clp',
    category: 'conversiones',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-08',
    sources: [
      {
        name: 'Banco Central — indicadores diarios',
        url: 'https://si3.bcentral.cl/indicadoressiete/secure/indicadoresdiarios.aspx',
        note: 'Valor diario de la UF',
      },
      {
        name: 'Banco Central — serie UF',
        url: 'https://si3.bcentral.cl/Indicadoressiete/secure/Serie.aspx?gcode=UF',
        note: 'Serie histórica oficial',
      },
    ],
    keywords: ['UF a CLP', 'convertir UF', 'valor UF hoy', 'calculadora UF', 'UF pesos chilenos'],
    inputs: [
      {
        id: 'monto',
        label: 'Monto',
        type: 'number',
        placeholder: '100',
        required: true,
        min: 0,
        tooltip: 'Cantidad de UF o de pesos según la dirección elegida.',
      },
      {
        id: 'direccion',
        label: 'Conversión',
        type: 'select',
        required: true,
        options: [
          { value: 'uf-a-clp', label: 'UF → CLP' },
          { value: 'clp-a-uf', label: 'CLP → UF' },
        ],
      },
    ],
    faq: [
      {
        question: '¿Qué es la UF?',
        answer:
          'La UF (Unidad de Fomento) es una unidad de cuenta reajustada según la inflación, usada en Chile para transacciones de largo plazo (créditos hipotecarios, arriendos, contratos). Su valor se actualiza diariamente según el IPC.',
      },
      {
        question: '¿Qué valor de UF usa esta calculadora?',
        answer:
          'Usa el valor de UF disponible en el sitio (API /api/values con prioridad Banco Central → Mindicador → snapshot local). El resultado muestra ese valor de referencia; para operaciones formales usa el valor oficial del día en el Banco Central.',
      },
      {
        question: '¿Cómo se convierte UF a pesos?',
        answer:
          'Multiplica la cantidad de UF por el valor de la UF del día. Ejemplo: 10 UF × valor UF = monto en CLP. La dirección inversa divide pesos por el valor UF.',
      },
      {
        question: '¿Por qué se usa la UF en Chile?',
        answer:
          'Para proteger el valor real del dinero frente a la inflación en contratos de largo plazo. Al expresar montos en UF, el valor se reajusta con el IPC.',
      },
      {
        question: '¿Puedo ver histórico o proyección de la UF aquí?',
        answer:
          'No en esta calculadora: solo convierte con el valor de UF cargado en el sitio. El histórico oficial está en la serie del Banco Central. No ofrecemos proyecciones inventadas.',
      },
      {
        question: '¿Dónde verifico el valor oficial?',
        answer:
          'En el Banco Central de Chile (indicadores diarios / serie UF) y, de forma complementaria, en mindicador.cl u otras réplicas. Para escritura o crédito, usa siempre el valor del día exacto de la operación.',
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
      {
        name: 'SII',
        url: 'https://www.sii.cl/destacados/iva/',
        note: 'Impuesto al Valor Agregado (19%)',
      },
      {
        name: 'BCN — Ley Chile',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=825',
        note: 'DL 825 de 1974, Ley de IVA',
      },
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
        tooltip:
          'Si agregas IVA, ingresa el neto. Si quitas IVA, ingresa el bruto (precio de boleta/factura con IVA).',
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
        answer: 'IVA = $100.000 × 0,19 = $19.000. Bruto = $119.000. Fórmula: bruto = neto × 1,19.',
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
    description:
      'Calcula el pago de horas extraordinarias con recargo legal mínimo 50% y jornada vigente de 42 h/semana (Ley 21.561 desde abr-2026).',
    slug: 'calculadora-horas-extra',
    category: 'beneficios',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-13',
    sources: [
      {
        name: 'DT — valor hora extraordinaria',
        url: 'https://www.dt.gob.cl/portal/1628/w3-article-95182.html',
        note: 'Fórmula y jornada vigente',
      },
      {
        name: 'DT — Art. 32 horas extra',
        url: 'https://www.dt.gob.cl/portal/1628/w3-article-60173.html',
        note: 'Recargo 50%; sin recargo nocturno automático',
      },
    ],
    keywords: [
      'horas extra',
      'pago horas extraordinarias',
      'recargo 50%',
      'jornada 42 horas',
      'Código del Trabajo horas extra',
    ],
    inputs: [
      {
        id: 'sueldoBruto',
        label: 'Sueldo bruto mensual',
        type: 'number',
        unit: 'CLP',
        placeholder: '$1.000.000',
        required: true,
        min: 0,
      },
      {
        id: 'horasExtra',
        label: 'Horas extra (ordinarias del período)',
        type: 'number',
        placeholder: '10',
        required: true,
        min: 0,
      },
      {
        id: 'jornadaSemanal',
        label: 'Jornada semanal (horas)',
        type: 'select',
        required: false,
        options: [
          { value: '42', label: '42 h — vigente desde 26-04-2026 (default)' },
          { value: '44', label: '44 h — vigente abr-2024 a abr-2026' },
          { value: '45', label: '45 h — histórica (antes 2024)' },
          { value: '40', label: '40 h — desde abr-2028 / pactada' },
        ],
        defaultValue: '42',
        tooltip: 'La fórmula DT divide sueldo/30 × 28 por las horas de cuatro semanas.',
      },
      {
        id: 'recargoPersonalizado',
        label: 'Recargo pactado (%)',
        type: 'number',
        placeholder: '50',
        required: false,
        min: 50,
        max: 200,
        tooltip:
          'Vacío = mínimo legal de 50%. Un contrato o convenio puede pactar un porcentaje superior.',
      },
      {
        id: 'sueldoVariable',
        label: '¿Usar promedio de sueldo variable?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      {
        id: 'sueldoPromedio3Meses',
        label: 'Promedio últimos 3 meses (si variable)',
        type: 'number',
        unit: 'CLP',
        placeholder: '0',
        required: false,
        min: 0,
      },
      {
        id: 'calcularImpactoCotizaciones',
        label: '¿Estimar impacto en cotizaciones (10%+7%+0,6%)?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      {
        id: 'mostrarTopeLegal',
        label: '¿Mostrar tope legal (2 h/día)?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
    ],
    faq: [
      {
        question: '¿Cuánto me pagan por una hora extra?',
        answer:
          'El recargo legal mínimo es 50% sobre la hora ordinaria. Para sueldo mensual, la DT indica: sueldo ÷ 30 × 28 ÷ (jornada semanal × 4), y luego multiplicar por 1,5. Con $1.000.000 y 42 horas, una hora extra equivale a $8.333.',
      },
      {
        question: '¿Existe recargo nocturno automático?',
        answer:
          'No. Tampoco existe un 100% general automático por domingo o festivo. El mínimo de 50% rige para la hora que jurídicamente es extraordinaria, sin perjuicio de descansos compensatorios o pactos más favorables.',
      },
      {
        question: '¿Cuál es la jornada semanal vigente?',
        answer:
          'Desde el 26 de abril de 2026 la jornada máxima ordinaria es 42 horas semanales (Ley 21.561, 2ª etapa). En 2028 baja a 40. Elige la jornada correcta para no subestimar el valor hora.',
      },
      {
        question: '¿Cuál es el tope de horas extra?',
        answer:
          'Como regla general, máximo 2 horas extraordinarias por día (Art. 31), para atender necesidades temporales y con pacto. Exceder el tope puede ser sancionado por la Inspección del Trabajo.',
      },
      {
        question: '¿Las horas extra cotizan AFP y salud?',
        answer:
          'Sí, forman parte de la remuneración imponible y se cotizan. Puedes activar el estimado de impacto (10% AFP obligatoria + 7% salud + 0,6% cesantía trabajador, sin comisión AFP variable).',
      },
    ],
  },
  {
    id: 'vacaciones-proporcionales',
    name: 'Vacaciones Proporcionales',
    description:
      'Estima el feriado proporcional al término del contrato e incorpora fines de semana y feriados al pago.',
    slug: 'calculadora-vacaciones-proporcionales',
    category: 'beneficios',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-13',
    sources: [
      {
        name: 'DT — Feriado proporcional',
        url: 'https://www.dt.gob.cl/portal/1628/w3-article-60183.html',
        note: 'Procedimiento de días hábiles y proyección de sábados, domingos y festivos',
      },
      {
        name: 'BCN — Código del Trabajo',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=207436',
        note: 'Artículos 67 a 73 sobre feriado',
      },
    ],
    seoTitle: 'Vacaciones Proporcionales 2026: calcula en pesos',
    seoDescription:
      'Calcula tus días y el monto en pesos de vacaciones proporcionales en Chile. Ideal al renunciar o al finiquito. Gratis, Código del Trabajo.',
    keywords: [
      'vacaciones proporcionales',
      'feriado proporcional',
      'días de vacaciones',
      'finiquito vacaciones',
      'Código del Trabajo Art. 67',
      'calculadora vacaciones',
    ],
    inputs: [
      {
        id: 'sueldoBruto',
        label: 'Sueldo Bruto',
        type: 'number',
        placeholder: '$500.000',
        required: true,
        min: 0,
      },
      {
        id: 'mesesTrabajados',
        label: 'Meses Trabajados',
        type: 'number',
        placeholder: '6',
        required: true,
        min: 0,
        max: 11,
      },
      {
        id: 'diasTrabajadosUltimoMes',
        label: 'Días adicionales del último mes',
        type: 'number',
        placeholder: '0',
        required: false,
        min: 0,
        max: 30,
        defaultValue: 0,
      },
      {
        id: 'diasNoTomados',
        label: 'Días de vacaciones no tomados',
        type: 'number',
        placeholder: '0',
        required: false,
        min: 0,
        defaultValue: 0,
      },
      {
        id: 'fechaTermino',
        label: 'Fecha de término (AAAA-MM-DD)',
        type: 'text',
        placeholder: '2026-07-31',
        required: true,
        tooltip:
          'Permite proyectar los días hábiles e incorporar sábados, domingos y feriados nacionales.',
      },
    ],
    faq: [
      {
        question: '¿Cómo se calculan las vacaciones proporcionales?',
        answer:
          'Se acumulan 1,25 días hábiles por mes completo y 1,25/30 por cada día adicional. Al terminar el contrato, esos días se proyectan desde el día siguiente y se agregan los sábados, domingos y festivos que caen dentro del período.',
      },
      {
        question: '¿Cuántos días de vacaciones me corresponden por año?',
        answer:
          'La regla general es 15 días hábiles por año. La cantidad de días corridos no es siempre 21: depende de la fecha concreta, fines de semana y feriados incluidos en la proyección.',
      },
      {
        question: '¿Se pagan las vacaciones proporcionales en el finiquito?',
        answer:
          'Sí, al terminar el contrato se compensa el feriado proporcional y el feriado pendiente que corresponda. La remuneración íntegra puede requerir promedios o componentes variables; esta versión usa el sueldo mensual declarado y debe contrastarse con el finiquito.',
      },
      {
        question: '¿Qué pasa si no tomé mis vacaciones?',
        answer:
          'Los días hábiles pendientes se agregan antes de proyectar el calendario. El valor diario de un sueldo mensual se obtiene dividiendo por 30, pero la base puede cambiar si existen remuneraciones variables.',
      },
      {
        question: '¿Qué dice el Art. 67 del Código del Trabajo?',
        answer:
          'El artículo 67 regula el feriado anual; el 68, el feriado progresivo; el 70 impide compensarlo en dinero mientras sigue vigente el contrato; y el 73 ordena compensar el feriado al terminar la relación laboral. La acumulación de hasta dos períodos está en el artículo 70.',
      },
    ],
  },
  {
    id: 'boleta-honorarios',
    name: 'Boleta de Honorarios 2026',
    description:
      'Calcula la retención de boleta de honorarios (calendario Ley 21.133: 15,25% en 2026), monto líquido y desglose informativo. Sin doble descuento de cotizaciones.',
    slug: 'calculadora-boleta-honorarios',
    category: 'impuestos',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-08',
    sources: [
      {
        name: 'SII — Boletas de honorarios',
        url: 'https://www.sii.cl/destacados/boletas_honorarios/',
        note: 'Régimen y emisión',
      },
      {
        name: 'SII — Aumento gradual de retención',
        url: 'https://www.sii.cl/destacados/boletas_honorarios/aumento_gradual.html',
        note: 'Calendario % por año (Ley 21.133)',
      },
      {
        name: 'SII — Cotizaciones independientes',
        url: 'https://www.sii.cl/destacados/renta/2025/cotizaciones_previsionales_informacion_general.html',
        note: 'La retención financia cotizaciones en Operación Renta',
      },
    ],
    keywords: [
      'boleta de honorarios',
      'retención honorarios',
      'impuesto independientes',
      '15.25% retención',
      'honorarios Chile',
    ],
    inputs: [
      {
        id: 'montoBruto',
        label: 'Monto bruto',
        type: 'number',
        unit: 'CLP',
        placeholder: '$100.000',
        required: true,
        min: 0,
      },
      {
        id: 'ano',
        label: 'Año de la boleta',
        type: 'select',
        required: true,
        options: [
          { value: '2025', label: '2025 (14,5%)' },
          { value: '2026', label: '2026 (15,25%)' },
          { value: '2027', label: '2027 (16%)' },
          { value: '2028', label: '2028 (17%)' },
        ],
        defaultValue: '2026',
        tooltip:
          'Calendario de retención gradual (Ley 21.133). El % se aplica sobre el bruto de la boleta.',
      },
      {
        id: 'incluyeCotizaciones',
        label: '¿Mostrar desglose de la retención? (informativo)',
        type: 'boolean',
        required: false,
        defaultValue: false,
        tooltip:
          'No descuenta nada extra. Solo estima cómo se reparte la retención (impuesto/AFP/salud/SIS). El líquido sigue siendo bruto − retención.',
      },
      {
        id: 'moneda',
        label: 'Mostrar también en UF',
        type: 'select',
        required: false,
        options: [
          { value: 'CLP', label: 'Solo CLP' },
          { value: 'UF', label: 'CLP + equivalente UF' },
        ],
        defaultValue: 'CLP',
      },
      {
        id: 'calcularPPM',
        label: '¿Estimar componente PPM (impuesto renta)?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      {
        id: 'calcularCostoEmpleador',
        label: '¿Mostrar costo del pagador (bruto)?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
    ],
    faq: [
      {
        question: '¿Cuánto es la retención de boleta de honorarios?',
        answer:
          'En 2026 la retención es 15,25% del monto bruto (calendario de la Ley 21.133, no de la 21.578 de ingreso mínimo). Sube gradualmente hasta 17% en 2028. El emisor recibe el bruto menos esa retención.',
      },
      {
        question: '¿La retención ya incluye cotizaciones previsionales?',
        answer:
          'Sí. La retención es el vehículo con el que el SII retiene para impuesto y cotizaciones de independientes, que se liquidan en la Operación Renta. No debes restar otra vez AFP o salud sobre el mismo bruto al calcular el líquido de la boleta.',
      },
      {
        question: '¿Cuál es la diferencia entre monto bruto y líquido?',
        answer:
          'Bruto = valor del servicio. Líquido = bruto − retención del año. Ejemplo 2026: $1.000.000 bruto → $152.500 de retención → $847.500 líquidos.',
      },
      {
        question: '¿Cómo cambia la retención por año?',
        answer:
          'Según el SII: 14,5% (2025), 15,25% (2026), 16% (2027), 17% (2028). Elige el año de emisión de la boleta.',
      },
      {
        question: '¿Qué es el PPM en este contexto?',
        answer:
          'Estimación del componente de impuesto a la renta dentro de la retención (referencia Art. 84 LIR). No es un descuento adicional al líquido de la boleta.',
      },
    ],
  },
  // ============================================
  // NUEVAS CALCULADORAS FASE 1 - Marzo 2026
  // ============================================
  {
    id: 'utm-clp',
    name: 'Conversor UTM ↔ CLP',
    description:
      'Convierte entre UTM y pesos chilenos con el valor oficial del mes. Calcula multas, permisos y trámites tributarios.',
    slug: 'calculadora-utm-clp',
    category: 'conversiones',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'Banco Central de Chile',
        url: 'https://www.bcentral.cl/areas/estadisticas/estadisticas-de-precios/utm',
        note: 'Valor mensual de la UTM',
      },
    ],
    keywords: [
      'UTM a CLP',
      'convertir UTM',
      'valor UTM hoy',
      'calculadora UTM',
      'UTM pesos chilenos',
      'unidad tributaria mensual',
    ],
    inputs: [
      { id: 'monto', label: 'Monto', type: 'number', placeholder: '10', required: true, min: 0 },
      {
        id: 'direccion',
        label: 'Conversión',
        type: 'select',
        required: true,
        options: [
          { value: 'utm-a-clp', label: 'UTM a CLP' },
          { value: 'clp-a-utm', label: 'CLP a UTM' },
        ],
      },
    ],
    faq: [
      {
        question: '¿Qué es la UTM?',
        answer:
          'La UTM (Unidad Tributaria Mensual) es una unidad de cuenta usada en Chile para fines tributarios y multas. A diferencia de la UF, la UTM se actualiza mensualmente según la variación del IPC del penúltimo mes. Se usa para calcular multas de tránsito, permisos municipales, patentes comerciales y otros trámites tributarios.',
      },
      {
        question: '¿Cuánto vale la UTM hoy?',
        answer:
          'La UTM se reajusta cada mes según la variación del IPC del penúltimo mes. El valor vigente aparece al inicio de esta página con su fecha y fuente; la calculadora usa ese mismo valor para la conversión.',
      },
      {
        question: '¿Cuál es la diferencia entre UTM y UF?',
        answer:
          'La UTM se actualiza mensualmente por el IPC y se usa para fines tributarios (multas, patentes, permisos). La UF se actualiza diariamente y se usa para transacciones financieras de largo plazo (créditos hipotecarios, arriendos). Ambas son unidades de cuenta reajustables pero tienen usos diferentes.',
      },
      {
        question: '¿Para qué se usa la UTM?',
        answer:
          'La UTM se usa para: multas de tránsito (0.5 a 3 UTM), permiso de circulación (calculado en UTM), patentes comerciales, contribuciones de bienes raíces, multas del SII, tasas municipales, y muchos otros trámites tributarios. Conocer el valor de la UTM te permite calcular el costo real en pesos.',
      },
      {
        question: '¿Cómo se calcula una multa en UTM?',
        answer:
          'Para calcular una multa expresada en UTM, multiplica la cantidad de UTM por el valor vigente del mes. Por ejemplo, una multa de 1,5 UTM equivale a 1,5 veces el valor UTM mostrado en esta página. Nuestra calculadora hace esta conversión automáticamente.',
      },
    ],
  },
  {
    id: 'gratificacion-legal',
    name: 'Gratificación Legal 2026',
    description:
      'Calcula tu gratificación legal según el Art. 50 del Código del Trabajo. Conoce el tope anual de 4.75 IMM y cómo afecta tu sueldo.',
    slug: 'calculadora-gratificacion-legal',
    category: 'beneficios',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'DT — gratificación del artículo 47',
        url: 'https://www.dt.gob.cl/portal/1628/w3-article-60156.html',
        note: 'Requisitos del sistema sobre utilidades',
      },
      {
        name: 'BCN — Código del Trabajo',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=207436',
        note: 'Artículos 47 a 50 sobre gratificación legal',
      },
    ],
    keywords: [
      'gratificación legal',
      'calculadora gratificación',
      '25% remuneración',
      '4.75 IMM',
      'Art. 47 Código del Trabajo',
      'Art. 50 Código del Trabajo',
      'aguinaldo legal',
    ],
    inputs: [
      {
        id: 'sueldoBruto',
        label: 'Sueldo Bruto Mensual',
        type: 'number',
        placeholder: '$500.000',
        required: true,
        min: 0,
      },
      {
        id: 'mesesTrabajados',
        label: 'Meses Trabajados',
        type: 'number',
        placeholder: '12',
        required: true,
        min: 1,
        max: 12,
      },
      {
        id: 'tipoGratificacion',
        label: 'Tipo de Cálculo',
        type: 'select',
        required: true,
        options: [
          { value: 'mensual', label: 'Mensual' },
          { value: 'anual', label: 'Anual' },
        ],
      },
    ],
    faq: [
      {
        question: '¿Qué es la gratificación legal?',
        answer:
          'La gratificación legal es un beneficio obligatorio que el empleador debe pagar a los trabajadores que devengan remuneraciones variables o que ganen menos de 4.75 UTA anuales (Art. 47 del Código del Trabajo). La modalidad más usada (Art. 50) corresponde al 25% de la remuneración mensual, con un tope de 4.75 ingresos mínimos mensuales (IMM) anuales.',
      },
      {
        question: '¿Cómo se calcula la gratificación?',
        answer:
          'La gratificación (Art. 50 del Código del Trabajo) se calcula de dos formas y se paga la que resulte MENOR: (1) 25% de la remuneración mensual, o (2) 4.75 ingresos mínimos mensuales (IMM) anuales divididos en 12. En la práctica, los sueldos bajos y medios pagan el 25% (porque es menor que el tope), y los sueldos altos quedan topeados en 4.75 IMM/12 mensual.',
      },
      {
        question: '¿Cuál es el tope de la gratificación?',
        answer:
          'El tope máximo de la gratificación (Art. 50 del Código del Trabajo) es de 4.75 ingresos mínimos mensuales (IMM) anuales. En 2026, con IMM a $553.553, el tope anual es $2.629.377 (4.75 × $553.553), lo que equivale a unos $219.114 mensuales máximos de gratificación.',
      },
      {
        question: '¿Todos los trabajadores tienen derecho a gratificación?',
        answer:
          'Tienen derecho a gratificación los trabajadores que ganen menos de 4.75 UTA anuales. Los trabajadores que excedan este monto no tienen derecho legal a gratificación, aunque el empleador puede otorgarla voluntariamente. También están excluidos los trabajadores de casa particular y algunos regímenes especiales.',
      },
      {
        question: '¿La gratificación se paga mensual o anualmente?',
        answer:
          'El empleador puede pagar la gratificación mensualmente (anticipo) o en un solo pago anual. Lo más común es pagarla mensualmente junto con el sueldo. Si se paga anualmente, debe liquidarse en abril de cada año por el período abril-marzo anterior.',
      },
      {
        question: '¿Qué diferencia hay entre el artículo 47 y el artículo 50?',
        answer:
          'Son las dos formas legales de cumplir la obligación de gratificar. En el artículo 47 el empleador reparte al menos el 30% de la utilidad líquida del ejercicio entre los trabajadores, en proporción a lo devengado por cada uno, sin tope de 4,75 IMM. En el artículo 50 queda eximido de ese reparto si paga a cada trabajador el 25% de sus remuneraciones del ejercicio, con el tope individual de 4,75 IMM. Si el contrato o un instrumento colectivo pacta una condición más favorable, manda el pacto.',
      },
      {
        question: '¿Cómo se reliquidan los anticipos mensuales de gratificación?',
        answer:
          'La gratificación legal se determina anualmente, así que los pagos mensuales son anticipos. Al cerrar el ejercicio el empleador debe reajustar cada anticipo por IPC, sumarlos y compararlos con el derecho definitivo (calculado con el IMM vigente al 31 de diciembre, con el tope prorrateado por tiempo trabajado o jornada parcial cuando corresponda). La diferencia a favor del trabajador se paga a más tardar en abril del año siguiente.',
      },
      {
        question: '¿Qué remuneraciones entran en la base de la gratificación?',
        answer:
          'Para el artículo 50 se consideran las contraprestaciones en dinero y las especies avaluables en dinero recibidas por los servicios: sueldo, sobresueldo por horas extraordinarias, comisiones, participaciones y bonos remuneracionales. Las asignaciones razonables de colación o movilización, viáticos y devoluciones de gastos quedan fuera solo si realmente tienen ese carácter (art. 41); la etiqueta en la liquidación no basta.',
      },
    ],
  },
  {
    id: 'indemnizacion-anos-servicio',
    name: 'Indemnización por Años de Servicio',
    description:
      'Calcula tu indemnización por años de servicio según el Art. 163 del Código del Trabajo. 30 días por año, tope 11 años.',
    slug: 'calculadora-indemnizacion-anos-servicio',
    category: 'beneficios',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'DT — tope de indemnización',
        url: 'https://www.dt.gob.cl/portal/1628/w3-article-60604.html',
        note: 'Base y tope de 90 UF del artículo 172',
      },
      {
        name: 'BCN — Código del Trabajo',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=207436',
        note: 'Artículos 163 y 172 sobre indemnización',
      },
    ],
    keywords: [
      'indemnización años de servicio',
      'calculadora indemnización',
      '30 días por año',
      'Art. 163 Código del Trabajo',
      'despido injustificado',
      'tope 11 años',
    ],
    inputs: [
      {
        id: 'ultimoSueldo',
        label: 'Último Sueldo Bruto',
        type: 'number',
        placeholder: '$500.000',
        required: true,
        min: 0,
      },
      {
        id: 'añosTrabajados',
        label: 'Años Trabajados',
        type: 'number',
        placeholder: '5',
        required: true,
        min: 0,
        max: 50,
      },
      {
        id: 'incluyeGratificacion',
        label: '¿Incluye gratificación?',
        type: 'boolean',
        required: false,
        defaultValue: true,
      },
      {
        id: 'gratificacionMensual',
        label: 'Gratificación Mensual (si aplica)',
        type: 'number',
        placeholder: '$100.000',
        required: false,
        min: 0,
      },
    ],
    faq: [
      {
        question: '¿Qué es la indemnización por años de servicio?',
        answer:
          'La indemnización por años de servicio es una compensación que el empleador debe pagar al trabajador cuando el contrato termina por despido injustificado o mutuo acuerdo con indemnización. Corresponde a 30 días de remuneración por cada año trabajado, con un tope de 11 años (330 días).',
      },
      {
        question: '¿Cómo se calcula la indemnización?',
        answer:
          'La indemnización se calcula multiplicando 30 días de remuneración por cada año de servicio. La base de cálculo es el último sueldo bruto (incluye gratificación). Por ejemplo, con $500.000 de sueldo y 5 años: $500.000 × 5 = $2.500.000 de indemnización.',
      },
      {
        question: '¿Cuál es el tope de la indemnización?',
        answer:
          'La indemnización tiene dos topes: (1) máximo 11 años de servicio (330 días), y (2) la base de cálculo no puede exceder 90 UF mensuales. En 2026, con UF a $37.600, el sueldo tope para cálculo es aproximadamente $3.384.000 mensuales.',
      },
      {
        question: '¿Tengo derecho a indemnización si renuncio?',
        answer:
          'No. Si renuncias voluntariamente, no tienes derecho a indemnización por años de servicio. Solo la recibes si eres despedido sin causa justificada, o si terminas por mutuo acuerdo y el empleador acepta pagarla. Sí tienes derecho a vacaciones proporcionales independientemente de la causal.',
      },
      {
        question: '¿Qué dice el Art. 163 del Código del Trabajo?',
        answer:
          'El Art. 163 establece que el empleador debe pagar indemnización equivalente a 30 días de la última remuneración mensual por cada año de servicio, con tope de 330 días. La base de cálculo incluye sueldo, gratificación y otras remuneraciones, pero no colación ni movilización.',
      },
      {
        question: '¿Qué remuneraciones cuentan para la base del artículo 172?',
        answer:
          'La última remuneración mensual es más amplia que el sueldo base: incluye lo que el trabajador percibe mensualmente por sus servicios, como comisiones, bonos mensuales, semana corrida, gratificación mensual y las asignaciones de colación y movilización pagadas mensualmente (según la doctrina vigente de la DT). Quedan excluidas las horas extraordinarias, la asignación familiar legal y los beneficios esporádicos o anuales como aguinaldos y gratificación anual. Si la remuneración es variable, se promedia lo percibido en los últimos tres meses calendario.',
      },
      {
        question: '¿Cuánto aumenta la indemnización si el despido se declara injustificado?',
        answer:
          'El recargo del artículo 168 solo procede por sentencia o acuerdo y se aplica sobre la indemnización por años de servicio: 30% si el artículo 161 se aplicó improcedentemente, 50% si se invocaron causales del artículo 159 sin justificación o se despidió sin causal legal, 80% si las causales del artículo 160 se aplicaron indebidamente, y 100% en los numerales 1, 5 y 6 del artículo 160 cuando además se declara carente de motivo plausible. Despedir sin invocar causal no lleva automáticamente el 100%.',
      },
      {
        question: '¿Cuál es el plazo para reclamar un despido?',
        answer:
          'La acción por despido injustificado, indebido, improcedente o indirecto debe presentarse dentro de 60 días hábiles desde la separación. Un reclamo administrativo ante la Inspección del Trabajo suspende el plazo mientras se tramita, pero en ningún caso se puede demandar después de 90 días hábiles desde el despido. Antes de firmar el finiquito, una reserva de derechos específica puede permitir cobrar lo no discutido sin renunciar a reclamar la diferencia.',
      },
    ],
  },
  {
    id: 'pension-alimenticia',
    name: 'Pensión Alimenticia',
    description:
      'Consulta el piso legal para menores y compáralo con el límite general de ingresos. No reemplaza la decisión del tribunal.',
    slug: 'calculadora-pension-alimenticia',
    category: 'familia',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-13',
    sources: [
      {
        name: 'BCN — Ley 14.908, artículo 3',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=172986&idParte=8720734',
        note: 'Pisos de 40% o 30% del ingreso mínimo remuneracional',
      },
      {
        name: 'BCN — Ley 14.908, artículo 7',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=172986&idParte=8720735',
        note: 'Límite general de 50% y excepción por razones fundadas',
      },
    ],
    keywords: [
      'pensión alimenticia',
      'calculadora pensión',
      'Ley 14.908',
      'alimentos hijos',
      'porcentaje pensión',
      'alimentos Chile',
    ],
    inputs: [
      {
        id: 'sueldoBruto',
        label: 'Sueldo Bruto',
        type: 'number',
        placeholder: '$500.000',
        required: true,
        min: 0,
      },
      {
        id: 'numeroHijos',
        label: 'Número de Hijos',
        type: 'number',
        placeholder: '2',
        required: true,
        min: 1,
        max: 10,
      },
      {
        id: 'tieneOtroIngreso',
        label: '¿Tienes otros ingresos?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      {
        id: 'otroIngreso',
        label: 'Otros ingresos mensuales',
        type: 'number',
        placeholder: '$0',
        required: false,
        min: 0,
      },
    ],
    faq: [
      {
        question: '¿Cómo se calcula la pensión alimenticia?',
        answer:
          'No existe una tabla legal que convierta el sueldo en una pensión sugerida. El tribunal considera las necesidades del alimentario, la capacidad económica de las partes, los cuidados y otros antecedentes. Esta herramienta solo muestra el piso presunto y el límite general regulados por la Ley 14.908.',
      },
      {
        question: '¿Qué dice la Ley 14.908 sobre pensión alimenticia?',
        answer:
          'Para un menor, el artículo 3 establece un piso de 40% del ingreso mínimo remuneracional. Si se solicitan alimentos para dos o más menores, el piso es 30% del ingreso mínimo por cada uno. El juez puede rebajarlo si se acredita falta de medios.',
      },
      {
        question: '¿Cuál es el monto mínimo de pensión alimenticia?',
        answer:
          'Con el ingreso mínimo de $553.553 vigente desde mayo de 2026, la referencia es $221.421 para un menor. Para dos o más menores, corresponde $166.066 por cada uno. Son pisos presuntos: una resolución puede fijar otro monto según los antecedentes del caso.',
      },
      {
        question: '¿La pensión se calcula sobre el bruto o líquido?',
        answer:
          'La ley habla de las rentas del alimentante para el límite general de 50%, pero el monto no se obtiene aplicando automáticamente un porcentaje al sueldo bruto o líquido. El tribunal determina qué antecedentes de ingresos y capacidad económica resultan pertinentes.',
      },
      {
        question: '¿Qué pasa si no pago la pensión alimenticia?',
        answer:
          'Puede dar lugar a liquidación de deuda, retenciones, apremios y, cuando se cumplen sus requisitos, inscripción en el Registro Nacional de Deudores. No corresponde afirmar que toda mora produce automáticamente un reporte comercial o una pena de prisión.',
      },
    ],
  },
  {
    id: 'reajuste-arriendo',
    name: 'Reajuste de Arriendo UF/IPC',
    description:
      'Calcula el reajuste de tu arriendo según variación UF o IPC. Conoce cuánto puede subir tu arriendo legalmente en Chile.',
    slug: 'calculadora-reajuste-arriendo',
    category: 'vivienda',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'Banco Central de Chile',
        url: 'https://www.bcentral.cl/areas/estadisticas',
        note: 'Variación IPC para reajuste de arriendo',
      },
      {
        name: 'BCN — Ley 18.101',
        url: 'https://www.bcn.cl/leychile/Navegar?idNorma=29526&idVersion=2022-02-12',
        note: 'Arrendamiento de predios urbanos',
      },
    ],
    keywords: [
      'reajuste arriendo',
      'aumento arriendo',
      'IPC arriendo',
      'UF arriendo',
      'reajuste contrato arriendo',
      'tope aumento arriendo Chile',
    ],
    inputs: [
      {
        id: 'arriendoActual',
        label: 'Arriendo Actual',
        type: 'number',
        placeholder: '$300.000',
        required: true,
        min: 0,
      },
      {
        id: 'arriendoEnUF',
        label: '¿El arriendo está en UF?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      {
        id: 'variacionIPC',
        label: 'Variación IPC Anual (%)',
        type: 'number',
        placeholder: '4.5',
        required: true,
        min: 0,
        max: 100,
      },
      {
        id: 'mesesDesdeUltimoReajuste',
        label: 'Meses desde último reajuste',
        type: 'number',
        placeholder: '12',
        required: true,
        min: 1,
        max: 60,
      },
    ],
    faq: [
      {
        question: '¿Cuánto puede subir el arriendo en Chile?',
        answer:
          'El reajuste del arriendo depende del contrato. Si está en UF, se reajusta automáticamente con la variación de la UF. Si está en pesos, se reajusta según el IPC acumulado del período. No hay un tope legal de aumento, pero debe estar estipulado en el contrato y no puede ser abusivo.',
      },
      {
        question: '¿Con qué frecuencia se puede reajustar el arriendo?',
        answer:
          'La frecuencia del reajuste debe estar establecida en el contrato de arriendo. Lo más común es reajustar anualmente, pero puede ser cada 6 meses o incluso mensualmente si así se pactó. Sin cláusula de reajuste, el arrendador no puede aumentar el arriendo unilateralmente.',
      },
      {
        question: '¿Es mejor arrendar en UF o pesos?',
        answer:
          'Arrendar en UF protege al arrendador de la inflación y al arrendatario de aumentos arbitrarios. En UF, el valor se reajusta automáticamente. En pesos, el aumento se negocia según IPC. Para contratos de largo plazo, la UF es más predecible.',
      },
      {
        question: '¿Qué es el IPC y cómo afecta el arriendo?',
        answer:
          'El IPC (Índice de Precios al Consumidor) mide la variación de precios en la economía. Si el arriendo está en pesos, el reajuste se calcula según el IPC acumulado. Por ejemplo, si el IPC anual fue 4.5%, un arriendo de $300.000 subiría a $313.500.',
      },
      {
        question: '¿Puedo negarme a un aumento de arriendo?',
        answer:
          'Si el contrato establece el reajuste y este se calcula correctamente según UF o IPC, no puedes negarte. Sin embargo, si el aumento es abusivo o no está en el contrato, puedes negociar o rechazarlo. En caso de disputa, puedes recurrir al Tribunal de Policía Local o SERNAC.',
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
      {
        name: 'SII — Tasación vehicular 2026',
        url: 'https://www.sii.cl/destacados/tasacion_vehiculos/2026/index.html',
        note: 'Consulta oficial por código, marca y modelo',
      },
      {
        name: 'SII — Cómo se determina el permiso',
        url: 'https://www.sii.cl/preguntas_frecuentes/tasac_fiscal_vehiculos/001_170_5079.htm',
        note: 'Escala progresiva y UTM de enero',
      },
      {
        name: 'SII — Resolución Exenta 6/2026',
        url: 'https://www.sii.cl/normativa_legislacion/resoluciones/2026/reso6.pdf',
        note: 'Tasaciones, permiso mínimo y exención de vehículos elegibles',
      },
      {
        name: 'ChileAtiende',
        url: 'https://www.chileatiende.gob.cl/fichas/9611-permiso-de-circulacion',
        note: 'Plazos y cuotas',
      },
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
        tooltip:
          'No basta con ser híbrido o eléctrico: confirma que el código exacto aparezca en la lista SII beneficiada.',
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
    description:
      'Estima el costo mensual según contrato y período 2026, sin duplicar SIS ni descuentos del trabajador.',
    slug: 'calculadora-costo-empleado-pyme',
    category: 'empresas',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-13',
    sources: [
      {
        name: 'Superintendencia de Pensiones — aporte empleador',
        url: 'https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-10906.html',
        note: 'Gradualidad de 1% y distribución previsional',
      },
      {
        name: 'Superintendencia de Pensiones — SIS',
        url: 'https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-9893.html',
        note: 'Tasa SIS 1,62% desde abril de 2026',
      },
      {
        name: 'AFC Chile',
        url: 'https://www.afc.cl/seguro-de-cesantia/',
        note: 'Seguro de cesantía (aporte empleador 2.4%)',
      },
    ],
    keywords: [
      'costo empleado PYME',
      'cuánto cuesta un empleado',
      'gasto empleador',
      'cotizaciones patronales',
      'costo total trabajador Chile',
      'sueldo real empresa',
    ],
    inputs: [
      {
        id: 'sueldoBruto',
        label: 'Sueldo Bruto Mensual',
        type: 'number',
        placeholder: '$500.000',
        required: true,
        min: 0,
      },
      {
        id: 'afp',
        label: 'AFP del Empleado',
        type: 'select',
        required: true,
        options: [
          { value: 'capital', label: 'Capital' },
          { value: 'cuprum', label: 'Cuprum' },
          { value: 'habitat', label: 'Habitat' },
          { value: 'modelo', label: 'Modelo' },
          { value: 'planvital', label: 'PlanVital' },
          { value: 'provida', label: 'ProVida' },
          { value: 'uno', label: 'Uno' },
        ],
      },
      {
        id: 'saludTipo',
        label: 'Sistema de Salud',
        type: 'select',
        required: true,
        options: [
          { value: 'fonasa', label: 'FONASA' },
          { value: 'isapre', label: 'Isapre' },
        ],
      },
      {
        id: 'contratoIndefinido',
        label: '¿Contrato Indefinido?',
        type: 'boolean',
        required: false,
        defaultValue: true,
      },
      {
        id: 'agregarGratificacion',
        label: '¿Agregar gratificación Art. 50?',
        type: 'boolean',
        required: false,
        defaultValue: false,
        tooltip:
          'Actívala solo si el sueldo ingresado no la incluye. Se aplica 25% con tope de 4,75 ingresos mínimos anuales.',
      },
      {
        id: 'periodoCotizacion',
        label: 'Período de remuneración',
        type: 'select',
        required: true,
        options: [
          { value: 'hasta_julio_2026', label: 'Hasta julio 2026: 1% + SIS separado' },
          { value: 'desde_agosto_2026', label: 'Desde agosto 2026: 3,5% total con SIS incluido' },
        ],
        defaultValue: 'hasta_julio_2026',
      },
    ],
    faq: [
      {
        question: '¿Cuánto cuesta realmente un empleado en Chile?',
        answer:
          'No existe un multiplicador universal de 1,3 o 1,5. Depende de si el sueldo ya incluye gratificación, el tipo de contrato, la tasa adicional de la mutual, beneficios pactados y el período previsional. La herramienta muestra solo componentes configurados y obligatorios de referencia.',
      },
      {
        question: '¿Qué aportes debe pagar el empleador?',
        answer:
          'Hasta julio de 2026 paga 1% de la reforma previsional más SIS de 1,62%, además de cesantía y mutual. Desde agosto, la cotización previsional total sube a 3,5% e incluye el financiamiento SIS: no se debe sumar SIS otra vez. El 7% de salud se descuenta al trabajador, no es aporte patronal adicional.',
      },
      {
        question: '¿Qué significa el factor costo?',
        answer:
          'Es la división entre el costo mensual estimado y el sueldo bruto ingresado. Sirve para comparar este escenario, pero no es una tasa legal ni incluye colación, movilización, licencias, reemplazos, indemnizaciones u otros beneficios.',
      },
      {
        question: '¿Cómo afectan las horas extra al costo?',
        answer:
          'Las horas extra forman parte de la remuneración imponible, pero no se incorporan aquí porque requieren su propia base y cantidad. Calcula primero su monto en la herramienta de horas extra y súmalo al escenario remuneracional correspondiente.',
      },
      {
        question: '¿Hay diferencias para PYME?',
        answer:
          'La calculadora no presume exenciones por tamaño de empresa. Si existe un subsidio de contratación vigente y cumples sus requisitos, debe tratarse por separado; no reduzcas las cotizaciones obligatorias solo por ser PYME.',
      },
    ],
  },
  // ============================================
  // FASE 1 RESTANTE
  // ============================================
  {
    id: 'credito-hipotecario',
    name: 'Simulador Crédito Hipotecario 2026',
    description:
      'Simula capital, dividendo e intereses con amortización francesa. No estima seguros, CAE contractual ni aprobación bancaria.',
    slug: 'calculadora-credito-hipotecario',
    category: 'vivienda',
    featured: true,
    phase: 1,
    lastReviewed: '2026-07-08',
    sources: [
      {
        name: 'SERNAC — CAE',
        url: 'https://www.sernac.cl/portal/618/w3-article-11834.html',
        note: 'Carga Anual Equivalente',
      },
      {
        name: 'Banco Central — UF',
        url: 'https://www.bcentral.cl/areas/estadisticas/estadisticas-de-precios/uf',
        note: 'UF del día',
      },
    ],
    keywords: [
      'crédito hipotecario',
      'simulador dividendo',
      'crédito vivienda Chile',
      'hipoteca UF',
      'amortización francesa',
      'dividendo mensual',
    ],
    inputs: [
      {
        id: 'montoUF',
        label: 'Monto del crédito (UF)',
        type: 'number',
        unit: 'UF',
        placeholder: '2000',
        required: true,
        min: 0,
        tooltip: 'Monto en UF (ej. 2000 UF).',
      },
      {
        id: 'pieUF',
        label: 'Pie (UF)',
        type: 'number',
        unit: 'UF',
        placeholder: '200',
        required: false,
        min: 0,
      },
      {
        id: 'plazoAnos',
        label: 'Plazo (años)',
        type: 'number',
        placeholder: '25',
        required: true,
        min: 1,
        max: 40,
      },
      {
        id: 'tasaAnual',
        label: 'Tasa anual (%)',
        type: 'number',
        placeholder: '4.5',
        required: true,
        min: 0,
        max: 20,
      },
      {
        id: 'calcularTablaAmortizacion',
        label: '¿Calcular tabla de amortización?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
    ],
    faq: [
      {
        question: '¿Cómo se calcula el dividendo hipotecario?',
        answer:
          'El dividendo se calcula con la fórmula de amortización francesa: PMT = P × [r(1+r)^n] / [(1+r)^n - 1], donde P es el monto del crédito, r es la tasa mensual y n el total de cuotas. Esta fórmula asegura cuotas iguales durante todo el plazo. Por ejemplo, 2000 UF a 25 años con 4.5% anual da un dividendo de aproximadamente 10.7 UF mensuales.',
      },
      {
        question: '¿Cuánto pie necesito para un crédito hipotecario?',
        answer:
          'No existe un pie único exigido por ley. Cada entidad evalúa el porcentaje financiado, el inmueble y el perfil de riesgo. Usa en la simulación el pie de una cotización formal, no un supuesto de aprobación.',
      },
      {
        question: '¿Es mejor un crédito en UF o en pesos?',
        answer:
          'En UF, la obligación y el dividendo se expresan en una unidad que se reajusta con la inflación, por lo que el equivalente en pesos cambia. No se puede afirmar que sea más seguro sin comparar ingresos, tasa, plazo y oferta concreta.',
      },
      {
        question: '¿Qué gastos adicionales debo considerar?',
        answer:
          'Revisa en la cotización desgravamen, incendio, eventuales coberturas adicionales, tasación, estudio de títulos, notaría, impuesto de timbres cuando corresponda e inscripción en el Conservador. La herramienta no inventa porcentajes nacionales para estos costos.',
      },
      {
        question: '¿Cuál es el costo total del crédito?',
        answer:
          'El resultado suma capital e intereses del escenario matemático. Para comparar ofertas reales usa la CAE y el costo total del crédito incluidos en la hoja de resumen del proveedor, porque incorporan cargos que este simulador no conoce.',
      },
      {
        question: '¿Qué es la tabla de amortización?',
        answer:
          'La tabla de amortización detalla mes a mes cómo se distribuye cada dividendo entre interés y capital. Al principio, la mayor parte del dividendo paga intereses, pero con el tiempo se invierte y se paga más capital. Esto permite ver cómo disminuye el saldo deudor.',
      },
      {
        question: '¿Qué es la CAE (Carga Anual Equivalente)?',
        answer:
          'La CAE es la tasa efectiva anual que incluye todos los costos del crédito: intereses, seguros, comisiones y otros gastos. Permite comparar créditos de diferentes bancos de forma estandarizada. Una CAE más baja indica un crédito más barato.',
      },
      {
        question: '¿Cómo afecta el tipo de tasa al crédito?',
        answer:
          'La tasa fija mantiene el dividendo constante durante todo el plazo. La tasa variable puede subir o bajar según el mercado. La tasa mixta combina ambos: fija por un período inicial y luego variable. La elección depende de tu tolerancia al riesgo y expectativas de tasas.',
      },
      {
        question: '¿Qué es el período de gracia?',
        answer:
          'El período de gracia es un tiempo inicial (generalmente 6-12 meses) donde solo pagas intereses, no capital. Esto reduce temporalmente el dividendo pero alarga el tiempo de pago y aumenta el costo total del crédito.',
      },
      {
        question: '¿Cómo funciona el prepago?',
        answer:
          'Para operaciones reajustables de hasta 5.000 UF, la comisión legal máxima es un mes y medio de intereses sobre el capital prepagado; si el abono es inferior a 10% del saldo se requiere consentimiento del acreedor. Sobre 5.000 UF rige lo pactado. Solicita una liquidación formal: esta herramienta no simula ese cargo.',
      },
    ],
  },
  // ============================================
  // FASE 2 — 15 Calculadoras Nicho
  // ============================================
  {
    id: 'operacion-renta',
    name: 'Operación Renta Independientes 2026',
    description:
      'Calcula tu impuesto a la renta como trabajador independiente. Deduce gastos, cotizaciones y ahorro previsional voluntario.',
    slug: 'calculadora-operacion-renta',
    category: 'impuestos',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'SII — Formulario 22 Renta 2026',
        url: 'https://www.sii.cl/servicios_online/renta/2026/rentaform.html',
        note: 'Formularios e instrucciones del año tributario',
      },
      {
        name: 'BCN — Ley sobre Impuesto a la Renta',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=6368',
        note: 'DL 824 vigente',
      },
    ],
    keywords: [
      'operación renta',
      'impuesto independientes',
      'renta trabajo independiente',
      'formulario 22',
      'impuesto anual Chile',
    ],
    inputs: [
      {
        id: 'ingresosAnuales',
        label: 'Ingresos Brutos Anuales',
        type: 'number',
        placeholder: '$12.000.000',
        required: true,
        min: 0,
        tooltip:
          'Suma de todos tus ingresos del año como independiente. Incluye boletas de honorarios y otros ingresos.',
      },
      {
        id: 'gastosAnuales',
        label: 'Gastos Anuales',
        type: 'number',
        placeholder: '$2.000.000',
        required: true,
        min: 0,
        tooltip:
          'Gastos necesarios para tu actividad: oficina, insumos, servicios, etc. Deben estar respaldados con facturas.',
      },
      {
        id: 'cotizacionesObligatorias',
        label: 'Cotizaciones Obligatorias',
        type: 'number',
        placeholder: '$1.500.000',
        required: true,
        min: 0,
        tooltip: 'AFP (10% + comisión), salud (7%) y SIS (1.62%) pagados durante el año.',
      },
      {
        id: 'ahorroPrevisional',
        label: 'Ahorro Previsional (APV)',
        type: 'number',
        placeholder: '$0',
        required: false,
        min: 0,
        tooltip:
          'Aportes APV hasta 600 UF anuales dan beneficio tributario. Reduce tu renta imponible.',
      },
    ],
    faq: [
      {
        question: '¿Cómo declaro renta como independiente?',
        answer:
          'Los trabajadores independientes deben declarar renta anual en el Formulario 22 del SII entre abril y mayo. Se declaran ingresos brutos y se descuentan gastos necesarios, cotizaciones previsionales obligatorias y aportes APV. El impuesto se calcula con tramos progresivos de 0% a 40%.',
      },
      {
        question: '¿Qué gastos puedo deducir?',
        answer:
          'Puedes deducir gastos necesarios para tu actividad: arriendo de oficina, insumos, servicios básicos, capacitaciones, equipos computacionales, y cotizaciones previsionales obligatorias. También el ahorro previsional voluntario (APV) hasta 600 UF anuales. Todos deben estar respaldados con facturas o boletas.',
      },
      {
        question: '¿Cuánto impuesto pago como independiente?',
        answer:
          'El impuesto depende de tu renta líquida imponible. Los tramos 2026 son: 0% hasta 13.5 UTA, 4% de 13.5-30 UTA, 8% de 30-50 UTA, 13.5% de 50-70 UTA, 23% de 70-90 UTA, 30.4% de 90-120 UTA, 35% de 120-310 UTA, y 40% sobre 310 UTA. Una UTA equivale a 12 UTM.',
      },
      {
        question: '¿Qué es el APV y cómo beneficia?',
        answer:
          'El Ahorro Previsional Voluntario (APV) permite deducir hasta 600 UF anuales de tu renta imponible. Si estás en el tramo del 13.5%, ahorrar 100 UF en APV reduce tu impuesto en 13.5 UF. Además, el APV crece con rentabilidad libre de impuestos hasta el retiro.',
      },
      {
        question: '¿Cuándo se paga el impuesto?',
        answer:
          'El impuesto anual se paga en abril-mayo del año siguiente. Durante el año, pagas PPM (Pagos Provisionales Mensuales): 10% de boletas para profesionales. En la operación renta, los PPM pagados se restan del impuesto anual. Si pagaste de más, el SII te devuelve.',
      },
    ],
  },
  {
    id: 'contribuciones',
    name: 'Contribuciones (Impuesto Territorial)',
    description:
      'Estima tus contribuciones (impuesto territorial) según el avalúo fiscal: exención habitacional, tasas SII y la cuota de cada trimestre.',
    slug: 'calculadora-contribuciones',
    category: 'vivienda',
    featured: true,
    phase: 2,
    lastReviewed: '2026-09-23',
    sources: [
      {
        name: 'SII — Impuesto Territorial',
        url: 'https://www.sii.cl/destacados/impuesto_territorial/index.html',
        note: 'Avalúo afecto, tasas y cuatro cuotas',
      },
      {
        name: 'SII — reajustes y exenciones',
        url: 'https://www.sii.cl/ayudas/ayudas_por_servicios/2242-reajustes_exenciones-2468.html',
        note: 'Montos y tasas vigentes por semestre',
      },
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
          'No es el valor comercial: es el avalúo del certificado o del sitio del SII. Contra él se compara la exención habitacional y el umbral de cambio de tasa.',
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
          { value: 'sitio_eriado', label: 'Sitio no edificado (eriado)' },
        ],
        tooltip:
          'Habitacional tiene exención sobre la primera franja del avalúo; comercial e industrial pagan la tasa general más la sobretasa fiscal; el sitio no edificado urbano suma una sobretasa del 100% de la tasa.',
      },
    ],
    faq: [
      {
        question: '¿Cómo se estiman las contribuciones aquí?',
        answer:
          'Con las reglas del SII del semestre vigente: la vivienda queda exenta si su avalúo fiscal no supera la exención habitacional; sobre ella paga 0,893% anual hasta un umbral de avalúo total y 1,042% más sobretasa fiscal de 0,025% por el exceso. Los destinos no habitacionales pagan 1,042% más 0,025% sin exención, y el sitio no edificado urbano suma una sobretasa del 100% de la tasa. El resultado es una estimación: tu giro oficial lo emite el SII/TGR.',
      },
      {
        question: '¿Cuándo se pagan las 4 cuotas?',
        answer:
          'El calendario habitual de pago es en cuatro cuotas (abril, junio, septiembre y noviembre). La calculadora muestra el monto de una cuota (anual ÷ 4) y también el semestre (anual ÷ 2). Fechas exactas y recargos: TGR / SII del año.',
      },
      {
        question: '¿Hay exención de contribuciones?',
        answer:
          'Sí, para uso habitacional: si el avalúo fiscal no supera la exención vigente del semestre (se reajusta por IPC cada 1 de enero y 1 de julio), no se pagan contribuciones. La herramienta muestra la exención vigente aplicada. No modela la alza gradual post-reavalúo ni otras exenciones como la rebaja para adultos mayores.',
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
    description:
      'Calcula el costo total de notaría, derechos registrales e impuestos en la compraventa de un inmueble en Chile.',
    slug: 'calculadora-costo-notaria',
    category: 'vivienda',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'BCN — Decreto 872',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=222851',
        note: 'Arancel de los notarios',
      },
      {
        name: 'BCN — Ley 21.772',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1217156',
        note: 'Modernización y regulación de notarios y conservadores',
      },
    ],
    keywords: [
      'costo notaría',
      'compraventa inmueble',
      'derechos registrales',
      'impuesto timbres',
      'notaría Chile',
    ],
    inputs: [
      {
        id: 'valorPropiedad',
        label: 'Valor de la Propiedad',
        type: 'number',
        placeholder: '$100.000.000',
        required: true,
        min: 0,
        tooltip:
          'Valor de venta de la propiedad. Se usa para calcular honorarios notariales e impuestos.',
      },
      {
        id: 'tipo',
        label: 'Tipo de Trámite',
        type: 'select',
        required: true,
        options: [
          { value: 'compraventa', label: 'Compraventa' },
          { value: 'hipoteca', label: 'Hipoteca' },
          { value: 'donacion', label: 'Donación' },
          { value: 'testamento', label: 'Testamento' },
        ],
        tooltip:
          'Cada trámite tiene costos diferentes. Compraventa es el más común para propiedades usadas.',
      },
      {
        id: 'notariaAdicional',
        label: '¿Notaría adicional?',
        type: 'boolean',
        required: false,
        defaultValue: false,
        tooltip: 'Si usas dos notarías (una por parte), se duplican algunos costos.',
      },
    ],
    faq: [
      {
        question: '¿Cuánto cobra una notaría por compraventa?',
        answer:
          'El costo notarial varía entre 0.2% y 0.5% del valor de la propiedad, más derechos registrales (0.2%) e impuesto de timbres y estampillas (0.2%). Para una propiedad de $100.000.000, el costo total notarial es aproximadamente $600.000-$800.000.',
      },
      {
        question: '¿Qué son los derechos registrales?',
        answer:
          'Los derechos registrales (0.2% del valor de la propiedad) se pagan al Conservador de Bienes Raíces para inscribir la propiedad a tu nombre. Es un trámite obligatorio que la notaría gestiona. Sin esta inscripción, la propiedad no es legalmente tuya.',
      },
      {
        question: '¿Qué es el impuesto de timbres y estampillas?',
        answer:
          'El impuesto de timbres y estampillas (0.2%) se aplica a documentos que contienen obligaciones de dinero, como escrituras de compraventa con hipoteca. Se paga una sola vez al momento de firmar la escritura ante notario.',
      },
      {
        question: '¿Puedo elegir cualquier notaría?',
        answer:
          'Sí, puedes elegir cualquier notaría de la comuna donde se encuentra la propiedad. Los honorarios son libres, por lo que conviene cotizar en varias notarías. Algunas ofrecen paquetes con todos los costos incluidos.',
      },
      {
        question: '¿Cuánto demora el proceso notarial?',
        answer:
          'El proceso completo toma 2-4 semanas: 1 semana para preparar escrituras, 1-2 semanas para inscripción en el Conservador de Bienes Raíces, y algunos días más para retirar copias autorizadas. El pago se hace al momento de firmar.',
      },
    ],
  },
  {
    id: 'plusvalia',
    name: 'Plusvalía por Venta de Propiedad',
    description:
      'Calcula el impuesto por plusvalía al vender una propiedad. Tasa decreciente según años de tenencia. Exento después de 10 años.',
    slug: 'calculadora-plusvalia',
    category: 'impuestos',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'SII — venta de bienes raíces 2026',
        url: 'https://www.sii.cl/destacados/renta/2026/personas/documents/pap_venta_bienes_raices_2026.pdf',
        note: 'Asistente sobre mayor valor y beneficio acumulado de 8.000 UF',
      },
      {
        name: 'BCN — Ley sobre Impuesto a la Renta',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=6368',
        note: 'Tratamiento del mayor valor inmobiliario',
      },
    ],
    keywords: [
      'plusvalía',
      'impuesto venta propiedad',
      'ganancia capital Chile',
      'venta inmueble impuesto',
      'plusvalía años tenencia',
    ],
    inputs: [
      {
        id: 'precioCompra',
        label: 'Precio de Compra',
        type: 'number',
        placeholder: '$80.000.000',
        required: true,
        min: 0,
        tooltip:
          'Valor que pagaste originalmente por la propiedad. Debe estar en la escritura de compraventa.',
      },
      {
        id: 'precioVenta',
        label: 'Precio de Venta',
        type: 'number',
        placeholder: '$120.000.000',
        required: true,
        min: 0,
        tooltip:
          'Valor de venta actual. La diferencia con el precio de compra es tu ganancia bruta.',
      },
      {
        id: 'anosTenencia',
        label: 'Años de Tenencia',
        type: 'number',
        placeholder: '5',
        required: true,
        min: 0,
        tooltip:
          'Años desde que compraste la propiedad. A mayor tenencia, menor impuesto (exento después de 10 años).',
      },
      {
        id: 'mejoras',
        label: 'Mejoras realizadas',
        type: 'number',
        placeholder: '$5.000.000',
        required: false,
        min: 0,
        tooltip:
          'Inversiones en mejoras (no mantención) que reducen la ganancia imponible. Deben estar documentadas con facturas.',
      },
    ],
    faq: [
      {
        question: '¿Qué es la plusvalía?',
        answer:
          'La plusvalía es la ganancia obtenida al vender una propiedad por un precio superior al de compra. Se calcula como: precio de venta - precio de compra - mejoras. La Ley 21.210 establece un impuesto progresivo que disminuye con los años de tenencia.',
      },
      {
        question: '¿Cuánto impuesto pago por vender una propiedad?',
        answer:
          'La tasa depende de los años de tenencia: menos de 1 año paga 30%, 1-2 años 25%, 2-3 años 20%, 3-4 años 15%, 4-5 años 10%, 5-10 años 5%, más de 10 años exento. Por ejemplo, si ganas $40.000.000 y tuviste la propiedad 6 años, pagas 5% = $2.000.000.',
      },
      {
        question: '¿Las mejoras reducen el impuesto?',
        answer:
          'Sí. Las mejoras (ampliaciones, remodelaciones mayores) documentadas con facturas se restan de la ganancia antes de calcular el impuesto. La mantención ordinaria (pintura, reparaciones menores) no es deducible.',
      },
      {
        question: '¿Quién paga el impuesto de plusvalía?',
        answer:
          'El vendedor es responsable del pago del impuesto. Se declara y paga en el Formulario 22 del SII del año siguiente a la venta. El notario que autoriza la escritura debe informar la venta al SII.',
      },
      {
        question: '¿Hay exenciones adicionales?',
        answer:
          'Sí. Está exenta la venta de tu vivienda principal (con ciertos requisitos), ventas entre cónyuges, y propiedades adquiridas antes de 2017 que se vendan con más de 10 años de tenencia. Consulta con un contador para tu caso específico.',
      },
    ],
  },
  {
    id: 'subsidio-habitacional',
    name: 'Subsidio Habitacional DS49/DS01/DS19',
    description:
      'Estima subsidio habitacional MINVU en UF según programa (DS49, DS01, DS19), tramo RSH, ahorro y tope de vivienda. Referencial: no garantiza elegibilidad SERVIU.',
    slug: 'calculadora-subsidio-habitacional',
    category: 'vivienda',
    featured: true,
    phase: 2,
    lastReviewed: '2026-09-26',
    sources: [
      {
        name: 'ChileAtiende — DS1 Tramo 1',
        url: 'https://www.chileatiende.gob.cl/fichas/19094-ds-1-tramo-1-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-100-uf',
        note: 'Ahorro y tope T1',
      },
      {
        name: 'ChileAtiende — DS1 Tramo 2',
        url: 'https://www.chileatiende.gob.cl/fichas/5172-ds-1-tramo-2-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-1-600-uf',
        note: 'Tope 1.600 UF',
      },
      {
        name: 'ChileAtiende — DS1 Tramo 3',
        url: 'https://www.chileatiende.gob.cl/fichas/5436-ds-1-tramo-3-subsidio-habitacional-para-comprar-una-vivienda-de-hasta-2-200-uf',
        note: 'Promedio 270 UF y tope 2.200 UF',
      },
      {
        name: 'ChileAtiende — DS49 Fondo Solidario',
        url: 'https://www.chileatiende.gob.cl/fichas/37960-subsidio-para-comprar-una-vivienda-de-hasta-950-uf-llamado-individual-ds-n-49',
        note: 'Subsidio base desde 314 UF + complementarios',
      },
      {
        name: 'MINVU — DS19 llamado especial 2026',
        url: 'https://www.minvu.gob.cl/postulacion/llamado-especial-a-concurso-ano-2026-para-proyectos-habitacionales-ds-19/',
        note: 'Res. Ex. N°700: montos por segmento y zona',
      },
    ],
    keywords: [
      'subsidio habitacional',
      'DS49',
      'DS01',
      'DS19',
      'subsidio vivienda Chile',
      'tramo subsidio',
      'ahorro requerido',
    ],
    inputs: [
      {
        id: 'tipoSubsidio',
        label: 'Programa de subsidio',
        type: 'select',
        required: true,
        options: [
          { value: 'ds49', label: 'DS49 — Fondo Solidario (sin crédito)' },
          { value: 'ds01', label: 'DS01 — Sectores medios' },
          { value: 'ds19', label: 'DS19 — Integración social' },
        ],
        tooltip:
          'Obligatorio. Cada programa tiene ahorro mínimo, tope de vivienda y reglas distintas. No se puede “adivinar”.',
      },
      {
        id: 'tramo',
        label: 'Tramo RSH',
        type: 'select',
        required: true,
        options: [
          { value: 'tramo1', label: 'Tramo 1' },
          { value: 'tramo2', label: 'Tramo 2' },
          { value: 'tramo3', label: 'Tramo 3' },
        ],
        tooltip:
          'Según Registro Social de Hogares / reglas del programa. Define elegibilidad y montos.',
      },
      {
        id: 'valorPropiedad',
        label: 'Valor de la propiedad (UF)',
        type: 'number',
        unit: 'UF',
        placeholder: '1600',
        required: true,
        min: 0,
        tooltip:
          'Ingresa UF, no pesos. Ejemplo: 1.600 UF. El motor no vuelve a dividir por el valor de la UF.',
      },
      {
        id: 'ahorro',
        label: 'Ahorro disponible (UF)',
        type: 'number',
        unit: 'UF',
        placeholder: '40',
        required: true,
        min: 0,
        tooltip:
          'Ahorro mínimo de referencia: DS49 ~10 UF; DS01 T1/T2/T3 ~30/40/80 UF (verificar llamado vigente).',
      },
      {
        id: 'esZonaExtrema',
        label: '¿Zona extrema?',
        type: 'boolean',
        required: false,
        defaultValue: false,
        tooltip:
          'Aysén, Magallanes y comunas aisladas: sube el tope de precio de vivienda según programa (ChileAtiende).',
      },
    ],
    faq: [
      {
        question: '¿Cómo postular al subsidio habitacional?',
        answer:
          'Debes inscribirte en el Serviu o Minvu cuando abren los procesos de postulación. Necesitas ahorro mínimo según tramo, estar inscrito en el Registro Social de Hogares, y no ser propietario de vivienda. Las postulaciones son periódicas.',
      },
      {
        question: '¿Cuánto subsidio puedo recibir?',
        answer:
          'Depende del programa: DS49 parte desde un subsidio base de 314 UF y puede aumentar con complementarios según ubicación (localización 200 UF, factibilización rural 120 UF, densificación en altura 110 UF, discapacidad 20 u 80 UF, superficie adicional hasta 50 UF) más un premio al ahorro de 1,5 UF por cada UF sobre 10 UF (tope 30 UF). DS19 2026 entrega subsidio base según segmento: 1.200 UF menores ingresos, 425 UF intermedio y 350 UF sectores medios en la mayoría de las comunas (1.700 / 537,5 / 500 UF en zonas extremas). DS1 Tramo 3 informa un promedio de 270 UF.',
      },
      {
        question: '¿Qué valores de DS19 no cubre esta calculadora?',
        answer:
          'El llamado DS19 2026 (Res. Ex. N°700) fija valores propios para Gran Santiago y otras zonas definidas —por ejemplo 1.300 UF de subsidio con precio hasta 1.600 UF para menores ingresos— que esta herramienta no modela. Además pueden sumar el Bono de Integración Social (200–300 UF) y el Bono por Captación (hasta 250 UF), que tampoco se incluyen en la estimación.',
      },
      {
        question: '¿Qué requisitos necesito?',
        answer:
          'Requisitos básicos: ser mayor de 18 años, no ser propietario de vivienda, tener ahorro mínimo según tramo, estar en el Registro Social de Hogares, y no haber recibido subsidio antes. Algunos programas exigen cotización previsional.',
      },
      {
        question: '¿Cuánto demora la obtención del subsidio?',
        answer:
          'Desde la postulación hasta obtener la vivienda pueden pasar 6 meses a 2 años, dependiendo del programa y la disponibilidad de proyectos. Una vez adjudicado, tienes 12-18 meses para usar el subsidio.',
      },
      {
        question: '¿Puedo combinar con crédito hipotecario?',
        answer:
          'Sí. El subsidio puede usarse como pie para un crédito hipotecario. De hecho, muchos programas requieren que complementes el subsidio con ahorro adicional o crédito para alcanzar el valor de la vivienda.',
      },
    ],
  },
  {
    id: 'patente-comercial',
    name: 'Patente Comercial Municipal',
    description:
      'Calcula el costo de la patente comercial según capital propio tributario, actividad y comuna. Pago anual en dos cuotas con topes UTM.',
    slug: 'calculadora-patente-comercial',
    category: 'empresas',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'SII — capital propio para patente',
        url: 'https://www.sii.cl/normativa_legislacion/jurisprudencia_administrativa/ley_impuesto_renta/2011/ja1045.htm',
        note: 'Determinación e información del capital propio tributario',
      },
      {
        name: 'BCN — Ley de Rentas Municipales',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=18967',
        note: 'DL 3.063 y reglas de patente municipal',
      },
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
      {
        id: 'capitalInvertido',
        label: 'Capital Propio Tributario',
        type: 'number',
        placeholder: '$10.000.000',
        required: true,
        min: 0,
        tooltip:
          'Capital propio declarado al SII (patrimonio inicial ajustado por corrección monetica). No es lo mismo que capital social ni patrimonio neto.',
      },
      {
        id: 'actividad',
        label: 'Actividad',
        type: 'select',
        required: true,
        options: [
          { value: 'comercio', label: 'Comercio' },
          { value: 'industria', label: 'Industria' },
          { value: 'servicios', label: 'Servicios' },
          { value: 'transporte', label: 'Transporte' },
        ],
        tooltip: 'La actividad afecta la tasa. Industrial y comercial pagan más que servicios.',
      },
      {
        id: 'comuna',
        label: 'Comuna',
        type: 'select',
        required: true,
        options: [
          { value: 'santiago', label: 'Santiago' },
          { value: 'providencia', label: 'Providencia' },
          { value: 'las_condes', label: 'Las Condes' },
          { value: 'otra', label: 'Otra' },
        ],
        tooltip:
          'Cada municipalidad fija su tasa dentro del rango legal. Santiago cobra 0.5%, otras comunas menos.',
      },
    ],
    faq: [
      {
        question: '¿Cuánto vale una patente comercial en Chile?',
        answer:
          'La patente comercial se calcula como un porcentaje del capital propio tributario (0,25% a 0,5% según comuna), con un mínimo de 1 UTM y máximo de 8.000 UTM anuales. Para un capital de $10.000.000 en Santiago (0,5%), la patente anual es $50.000. El valor exacto depende de la comuna donde opera el negocio y del tipo de actividad.',
      },
      {
        question: '¿Cómo se calcula la patente municipal?',
        answer:
          'La patente municipal se calcula aplicando la tasa fijada por la municipalidad (entre 0,25% y 0,5%) sobre el capital propio tributario declarado. El resultado se ajusta a los topes legales: mínimo 1 UTM anual y máximo 8.000 UTM anuales. La actividad (comercio, industria, servicios, transporte) también afecta la tasa aplicable.',
      },
      {
        question: '¿Cuándo se paga la patente comercial?',
        answer:
          'La patente se paga anualmente en dos cuotas: 31 de enero (primer semestre) y 31 de julio (segundo semestre). El pago se hace en la municipalidad donde funciona el negocio. Si inicias actividades a mitad de período, pagas proporcional por los meses restantes.',
      },
      {
        question: '¿Qué es el capital propio tributario de la patente?',
        answer:
          'El capital propio tributario es el patrimonio inicial declarado al inicio de actividades, ajustado por la corrección monetaria del SII cada año. No es el capital social del contrato ni el patrimonio neto del balance. Se obtiene del Form. 22 del año anterior. Empresas nuevas pueden declarar capital cero el primer año (mínimo 1 UTM).',
      },
      {
        question: '¿Necesito patente para todo negocio?',
        answer:
          'Sí, todo negocio o actividad comercial necesita patente municipal. Las únicas excepciones son trabajadores independientes sin local, vendedores ambulantes autorizados y algunas actividades agrícolas. El no pago tiene multas y puede derivar en el cierre del local.',
      },
      {
        question: '¿Puedo perder la patente?',
        answer:
          'Sí. La municipalidad puede cancelar la patente por: no pago, infracciones graves, cambio de actividad no autorizado o cierre del negocio. Para reanudar, debes pagar las patentes adeudadas más las multas correspondientes.',
      },
    ],
  },
  {
    id: 'comparador-afp',
    name: 'Comparador de Comisiones AFP',
    description:
      'Compara las comisiones de las 7 AFP y calcula cuánto ahorras cambiándote a la más barata. Proyección a años de pensión.',
    slug: 'calculadora-comparador-afp',
    category: 'pension',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'Superintendencia de Pensiones — comisiones',
        url: 'https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-9893.html',
        note: 'Comisiones y SIS vigentes por AFP',
      },
    ],
    keywords: [
      'comparador AFP',
      'comisiones AFP',
      'mejor AFP',
      'cambio AFP',
      'ahorro pensiones Chile',
    ],
    inputs: [
      {
        id: 'sueldoBruto',
        label: 'Sueldo Bruto',
        type: 'number',
        placeholder: '$800.000',
        required: true,
        min: 0,
        tooltip:
          'Tu sueldo bruto mensual. La comisión AFP se calcula como porcentaje de este monto.',
      },
      {
        id: 'afpActual',
        label: 'AFP Actual',
        type: 'select',
        required: true,
        options: [
          { value: 'capital', label: 'Capital' },
          { value: 'cuprum', label: 'Cuprum' },
          { value: 'habitat', label: 'Habitat' },
          { value: 'modelo', label: 'Modelo' },
          { value: 'planvital', label: 'PlanVital' },
          { value: 'provida', label: 'ProVida' },
          { value: 'uno', label: 'Uno' },
        ],
        tooltip: 'Tu AFP actual. Compara con las demás para ver cuánto ahorrarías cambiándote.',
      },
      {
        id: 'anosPension',
        label: 'Años hasta pensión',
        type: 'number',
        placeholder: '25',
        required: true,
        min: 1,
        max: 50,
        tooltip:
          'Años que faltan para tu jubilación. A más años, mayor el impacto de la comisión en tu pensión final.',
      },
    ],
    faq: [
      {
        question: '¿Cuál es la AFP más barata?',
        answer:
          'En 2026, AFP Uno tiene la comisión más baja (0.49%), seguida de Modelo (0.58%). Las más caras son ProVida (1.45%), Cuprum y Capital (1.44%). La diferencia parece pequeña pero impacta significativamente en tu pensión final.',
      },
      {
        question: '¿Cómo afecta la comisión a mi pensión?',
        answer:
          'La comisión se cobra mensualmente sobre tu sueldo imponible. Con sueldo de $800.000, AFP Uno cobra $3.920 mensuales y ProVida cobra $11.600. En 25 años, esa diferencia de $7.680 mensuales puede significar 5-10% más de pensión.',
      },
      {
        question: '¿Puedo cambiarme de AFP?',
        answer:
          'Sí, puedes cambiarte de AFP gratuitamente en cualquier momento. El proceso se hace en la nueva AFP que elijas y toma 1-2 meses. Tu saldo se transfiere automáticamente. No pierdes tus cotizaciones ni antigüedad.',
      },
      {
        question: '¿Todas las AFP pagan lo mismo?',
        answer:
          'No. Las AFP tienen diferentes rentabilidades históricas. Además de la comisión, compara la rentabilidad de los multifondos. Un fondo con mejor rentabilidad puede compensar una comisión más alta.',
      },
      {
        question: '¿Qué es el multifondo?',
        answer:
          'Las AFP tienen 5 multifondos (A, B, C, D, E) con diferente riesgo/rentabilidad. Fondo A es más riesgoso (más acciones), E es más conservador (más instrumentos de deuda). Tu edad determina en qué fondos puedes estar.',
      },
    ],
  },
  {
    id: 'simulador-apv',
    name: 'Simulador APV (Ahorro Previsional)',
    description:
      'Simula cuánto acumularás con ahorro previsional voluntario. Incluye beneficio tributario y rentabilidad compuesta.',
    slug: 'calculadora-simulador-apv',
    category: 'pension',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'Superintendencia de Pensiones — APV',
        url: 'https://www.spensiones.cl/portal/institucional/594/w3-article-2908.html',
        note: 'Características del ahorro previsional voluntario',
      },
      {
        name: 'SP — beneficios tributarios APV',
        url: 'https://www.spensiones.cl/portal/institucional/594/w3-article-5795.html',
        note: 'Regímenes y tope anual de 600 UF',
      },
    ],
    keywords: [
      'APV',
      'ahorro previsional voluntario',
      'simulador APV',
      'beneficio tributario APV',
      'ahorro pensiones',
    ],
    inputs: [
      {
        id: 'sueldoBruto',
        label: 'Sueldo Bruto Mensual',
        type: 'number',
        placeholder: '$1.000.000',
        required: true,
        min: 0,
        tooltip:
          'Tu sueldo bruto determina el beneficio tributario. A mayor sueldo, mayor el ahorro de impuestos.',
      },
      {
        id: 'montoMensualAPV',
        label: 'Ahorro Mensual APV',
        type: 'number',
        placeholder: '$100.000',
        required: true,
        min: 0,
        tooltip:
          'Monto mensual que ahorras. Máximo 600 UF anuales para beneficio tributario completo.',
      },
      {
        id: 'rentabilidadAnual',
        label: 'Rentabilidad Anual Esperada (%)',
        type: 'number',
        placeholder: '5',
        required: true,
        min: 0,
        max: 20,
        tooltip: 'Rentabilidad anual estimada. Multifondos históricamente rinden 4-8% anual real.',
      },
      {
        id: 'anosAhorro',
        label: 'Años de Ahorro',
        type: 'number',
        placeholder: '20',
        required: true,
        min: 1,
        max: 40,
        tooltip: 'Período de acumulación. A más años, más impacto del interés compuesto.',
      },
    ],
    faq: [
      {
        question: '¿Qué es el APV?',
        answer:
          'El Ahorro Previsional Voluntario (APV) es un ahorro adicional para tu pensión con beneficios tributarios. Puedes depositar hasta 600 UF anuales y descontarlos de tu base imponible, reduciendo el impuesto que pagas. El APV se retira al jubilar.',
      },
      {
        question: '¿Qué beneficio tributario tiene?',
        answer:
          'El APV reduce tu renta imponible hasta en 600 UF anuales. Si ganas $2.000.000 y aportas 100 UF ($4.000.000), pagas impuesto como si ganaras $1.996.000. El beneficio depende de tu tramo: 4% a 40% de lo ahorrado.',
      },
      {
        question: '¿Cuánto puedo ahorrar en APV?',
        answer:
          'Puedes ahorrar hasta 600 UF anuales (aproximadamente $24 millones) con beneficio tributario completo. El mínimo depende de la administradora. Puedes hacer aportes únicos o mensuales, y cambiar el monto cuando quieras.',
      },
      {
        question: '¿Cuándo puedo retirar el APV?',
        answer:
          'El APV se retira al jubilar (65 años hombres, 60 mujeres), por invalidez o fallecimiento. También puedes retirar hasta 70% para pie de vivienda (con condiciones) o 100% si emigras definitivamente.',
      },
      {
        question: '¿Dónde puedo contratar APV?',
        answer:
          'Puedes contratar APV en tu AFP, compañías de seguros, corredoras de bolsa, bancos y administradoras de fondos mutuos. Compara comisiones y opciones de inversión antes de elegir.',
      },
    ],
  },
  {
    id: 'intereses-mora',
    name: 'Intereses por Mora Laboral',
    description:
      'Calcula los intereses por mora en pagos laborales. Tasa máxima convencional sobre deuda impaga.',
    slug: 'calculadora-intereses-mora',
    category: 'beneficios',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'BCN — Código del Trabajo',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=207436',
        note: 'Reajustes e intereses de obligaciones laborales',
      },
      {
        name: 'CMF — normativa TMC',
        url: 'https://www.cmfchile.cl/portal/principal/613/articles-28928_doc_pdf.pdf',
        note: 'Aplicación de la Tasa Máxima Convencional',
      },
    ],
    keywords: [
      'intereses mora',
      'mora laboral Chile',
      'TMC',
      'deuda laboral',
      'intereses por mora trabajo',
    ],
    inputs: [
      {
        id: 'montoDeuda',
        label: 'Monto de la Deuda',
        type: 'number',
        placeholder: '$500.000',
        required: true,
        min: 0,
        tooltip: 'Monto adeudado en pesos. Puede ser sueldo, indemnización, horas extra, etc.',
      },
      {
        id: 'diasMora',
        label: 'Días de Mora',
        type: 'number',
        placeholder: '30',
        required: true,
        min: 0,
        tooltip: 'Días de retraso desde que debió pagarse hasta la fecha de pago.',
      },
    ],
    faq: [
      {
        question: '¿Cuál es la tasa de interés por mora laboral?',
        answer:
          'La tasa de interés por mora se calcula usando la Tasa Máxima Convencional (TMC) que fija la SBIF. Para deudas laborales sobre 200 UF, se usa aproximadamente 8.5% anual. Para montos menores, la tasa es mayor.',
      },
      {
        question: '¿Cómo se calcula el interés por mora?',
        answer:
          'El interés se calcula: Monto × (Tasa/100) × (Días/365). Por ejemplo, $500.000 adeudados por 30 días al 8.5% anual generan: $500.000 × 0.085 × (30/365) = $3.493 de interés.',
      },
      {
        question: '¿Desde cuándo se cobran intereses?',
        answer:
          'Los intereses corren desde el día siguiente en que debió pagarse la obligación hasta el pago efectivo. En el caso de sueldos, desde el día de pago establecido en el contrato.',
      },
      {
        question: '¿Los intereses por mora son obligatorios?',
        answer:
          'Sí. El empleador debe pagar intereses por mora automáticamente cuando retrasa pagos laborales. Si no lo hace, el trabajador puede demandar. Los intereses prescriben en 6 meses.',
      },
      {
        question: '¿Qué pasa si el empleador no paga?',
        answer:
          'Si el empleador no paga la deuda más intereses, puedes demandar en el Juzgado de Letras del Trabajo. La demanda es gratuita y no necesitas abogado para montos menores a 10 UTA.',
      },
    ],
  },
  {
    id: 'asignacion-familiar',
    name: 'Asignación Familiar por Tramo',
    description:
      'Calcula tu asignación familiar según tramo de ingresos y número de hijos causantes.',
    slug: 'calculadora-asignacion-familiar',
    category: 'familia',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-13',
    sources: [
      {
        name: 'BCN — Ley 21.830',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1225354',
        note: 'Montos y tramos vigentes desde mayo de 2026',
      },
      {
        name: 'SUSESO — Asignación Familiar',
        url: 'https://www.suseso.cl/606/w3-propertyvalue-571.html',
        note: 'Beneficiarios, causantes y reconocimiento',
      },
    ],
    keywords: [
      'asignación familiar',
      'asignación por hijo',
      'tramo asignación',
      'subsidio familiar Chile',
    ],
    inputs: [
      {
        id: 'sueldoBruto',
        label: 'Ingreso mensual promedio',
        type: 'number',
        placeholder: '$500.000',
        required: true,
        min: 0,
        tooltip:
          'Referencia para estimar el tramo. La entidad administradora determina el ingreso promedio conforme al período legal aplicable.',
      },
      {
        id: 'numeroHijos',
        label: 'Número de Hijos',
        type: 'number',
        placeholder: '2',
        required: true,
        min: 0,
        tooltip: 'Hijos menores de 18 años (o 24 si estudian, sin límite si son discapacitados).',
      },
    ],
    faq: [
      {
        question: '¿Cuánto es la asignación familiar?',
        answer:
          'Desde mayo de 2026: $22.601 hasta $649.039; $13.870 sobre $649.039 y hasta $947.990; $4.382 sobre $947.990 y hasta $1.478.539. Sobre ese último límite el monto es $0. El pago es por carga reconocida, no necesariamente por cada hijo declarado en esta simulación.',
      },
      {
        question: '¿Quiénes tienen derecho a asignación familiar?',
        answer:
          'Pueden acceder las personas beneficiarias del Sistema Único de Prestaciones Familiares que tengan causantes reconocidos y cumplan sus requisitos. No basta con tener hijos ni existe un requisito general de afiliación a FONASA o Isapre para originar el beneficio.',
      },
      {
        question: '¿Cómo se solicita la asignación familiar?',
        answer:
          'Primero debes solicitar el reconocimiento de la carga ante la entidad administradora que corresponda, como caja de compensación, IPS u otra institución previsional. El canal y quién paga dependen de la situación laboral y previsional; no siempre es automático.',
      },
      {
        question: '¿La asignación familiar afecta otros beneficios?',
        answer:
          'No. La asignación familiar no es renta imponible, no paga impuestos ni cotizaciones. No afecta el cálculo de otros beneficios como subsidios o pensiones.',
      },
      {
        question: '¿Puedo perder la asignación familiar?',
        answer:
          'Sí. Pierdes el derecho si: el hijo cumple la edad límite, deja de estudiar, se casa, o comienza a trabajar. Debes informar estos cambios al IPS dentro de 30 días.',
      },
    ],
  },
  {
    id: 'bono-bodas-oro',
    name: 'Calculadora Bono Bodas de Oro',
    description:
      'Verifica si cumples los requisitos del Bono Bodas de Oro (Ley 20.506) y estima el monto vigente por cónyuge y para el matrimonio.',
    slug: 'calculadora-bono-bodas-oro',
    category: 'familia',
    featured: false,
    phase: 2,
    lastReviewed: '2026-09-26',
    sources: [
      {
        name: 'ChileAtiende — Bono Bodas de Oro (IPS)',
        url: 'https://www.chileatiende.gob.cl/fichas/5369-bono-bodas-de-oro',
        note: 'Monto vigente, requisitos, plazo de un año y regla de viudez',
      },
    ],
    keywords: [
      'bono bodas de oro',
      '50 años de matrimonio',
      'bono bodas de oro monto',
      'bono bodas de oro requisitos',
      'beneficio adultos mayores matrimonio',
      'ips bodas de oro',
    ],
    inputs: [
      {
        id: 'anosMatrimonio',
        label: 'Años de matrimonio cumplidos',
        type: 'number',
        placeholder: '50',
        required: true,
        min: 0,
        unit: 'years',
        tooltip:
          'El beneficio se solicita dentro del año siguiente al 50º aniversario. Con 51 o más años cumplidos el plazo legal ya venció.',
      },
      {
        id: 'situacionConyuges',
        label: 'Situación de los cónyuges',
        type: 'select',
        required: true,
        defaultValue: 'ambos-vivos',
        options: [
          { value: 'ambos-vivos', label: 'Ambos cónyuges vivos' },
          {
            value: 'viudez-en-plazo',
            label: 'Mi cónyuge falleció dentro del año de plazo',
          },
          {
            value: 'viudez-fuera-plazo',
            label: 'Mi cónyuge falleció fuera del año de plazo',
          },
        ],
      },
      {
        id: 'perteneceAl80Vulnerable',
        label: '¿Perteneces al 80% más vulnerable según RSH?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      {
        id: 'convivenSinSeparacion',
        label: '¿Conviven en el mismo hogar (o en hogar de larga estadía) sin separación ni divorcio?',
        type: 'boolean',
        required: false,
        defaultValue: false,
        tooltip:
          'Si uno o ambos residen en establecimientos de larga estadía, se puede acreditar esa residencia.',
      },
      {
        id: 'residencia4de5',
        label: '¿Has residido en Chile 4 de los últimos 5 años?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
    ],
    seoTitle: 'Calculadora Bono Bodas de Oro 2026: monto y requisitos',
    seoDescription:
      'Bono Bodas de Oro 2026: $482.295 por matrimonio desde octubre ($241.147 por cónyuge). Verifica requisitos, plazo de un año y regla de viudez.',
    faq: [
      {
        question: '¿Cuánto es el Bono Bodas de Oro?',
        answer:
          'Desde el 1 de octubre de 2026 el bono es $482.295, que se entrega una sola vez en partes iguales: $241.147 para cada cónyuge vivo. El monto se reajusta en octubre de cada año en el 100% de la variación del IPC. Entre el 1 de octubre de 2025 y el 30 de septiembre de 2026 el valor fue $463.166 ($231.583 por cónyuge).',
      },
      {
        question: '¿Qué requisitos pide el Bono Bodas de Oro?',
        answer:
          'Cumplir 50 años de matrimonio, no encontrarse separados ni divorciados, pertenecer al 80% más vulnerable según el Registro Social de Hogares, convivir en el mismo hogar o acreditar residencia en hogares de larga estadía, y haber residido en Chile 4 años dentro de los últimos 5 anteriores a la solicitud.',
      },
      {
        question: '¿Cuál es el plazo para solicitar el bono?',
        answer:
          'Una vez cumplido el 50º aniversario, tienen plazo de un año para realizar el trámite y debes solicitarlo junto a tu cónyuge. Si ya cumplieron 51 o más años de matrimonio, el plazo legal venció.',
      },
      {
        question: '¿Qué pasa si mi cónyuge fallece?',
        answer:
          'Si habiendo cumplido 50 años de matrimonio tu cónyuge fallece después de esa fecha, puedes optar a su parte del bono siempre que el fallecimiento se produzca dentro del año de plazo que indica la ley para solicitar el beneficio. Si el cónyuge fallece durante la tramitación y el bono ya fue otorgado, su parte constituye herencia.',
      },
      {
        question: '¿El monto de la calculadora es el definitivo?',
        answer:
          'No. El resultado usa el monto publicado por ChileAtiende/IPS según la fecha de referencia; el pago real lo determina el IPS según la fecha y antecedentes de tu solicitud. El bono se reajusta cada octubre, por lo que el valor puede cambiar.',
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
      {
        name: 'Comisión Ingresa — pago del CAE',
        url: 'https://portal.ingresa.cl/como-pagar/como-pagar-el-cae/recomendaciones-para-pagar/',
        note: 'Pago, rebaja y alternativas operativas',
      },
      {
        name: 'TGR — convenio de pago CAE',
        url: 'https://portal-ayuda.tgr.cl/ayuda/convenios-particulares/crear-convenio-de-pago-para-el-credito-de-educacion-superior-con-aval-del-estado-cae',
        note: 'Cobro fiscal y convenios',
      },
      {
        name: 'BCN — Ley 20.027',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=240080',
        note: 'Ley del CAE',
      },
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
        tooltip:
          'Referencia legal del CAE: 2% real anual. Solo cámbiala si tu contrato indica otra.',
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
      {
        name: 'SERNAC — Carga Anual Equivalente',
        url: 'https://www.sernac.cl/portal/618/w3-article-11834.html',
        note: 'Comparación por CAE y costo total del crédito',
      },
      {
        name: 'CMF — créditos universales',
        url: 'https://www.cmfchile.cl/transparencia/documentos/Decreto_1512_Creditos_Universales_201511.pdf',
        note: 'Precio y cálculo de la CAE en créditos de consumo',
      },
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
        tooltip:
          'Usa la tasa de la cotización del banco/financiera. En 2026 los rangos de mercado suelen ser de un dígito a teen según perfil; no hay tasa única.',
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
        tooltip:
          'Estimación simple del sitio (no es prima de aseguradora). El banco exige seguros; SOAP es aparte.',
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
        tooltip:
          'Solo para la CAE educativa del resultado. La CAE legal de la hoja de resumen la calcula el acreedor.',
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
      {
        name: 'BCN — Ley 18.290, artículos 197 a 201',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=29708&idParte=8756096',
        note: 'Clasificación, rangos y reincidencia',
      },
      {
        name: 'BCN — Ley 21.377 No Chat',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1166274',
        note: 'Uso de dispositivos como infracción gravísima',
      },
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
        tooltip:
          'Solo para graves dentro de 2 años o gravísimas dentro de 3 años: una duplica la multa y una nueva reincidencia la triplica.',
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
    description:
      'Proyecta tu gasto mensual usando la tarifa vigente del pórtico, horario y categoría que consultaste.',
    slug: 'calculadora-costo-tag',
    category: 'vehiculos',
    noIndex: true,
    featured: false,
    phase: 2,
    lastReviewed: '2026-07-13',
    sources: [
      {
        name: 'MOP — Peajes y pórticos 2026',
        url: 'https://concesiones.mop.gob.cl/peajes-y-porticos/',
        note: 'Tarifarios oficiales por concesión, categoría y horario',
      },
      {
        name: 'MOP — Preguntas sobre concesiones',
        url: 'https://concesiones.mop.gob.cl/preguntas-y-respuestas/',
        note: 'La tarifa depende del contrato y tramo recorrido',
      },
    ],
    keywords: ['costo TAG', 'autopista Chile', 'peaje TAG', 'presupuesto TAG', 'tarifa pórtico'],
    inputs: [
      {
        id: 'tarifaPorPaso',
        label: 'Tarifa vigente por pasada',
        type: 'number',
        placeholder: '$1.250',
        required: true,
        min: 0,
        tooltip:
          'Cópiala del tarifario MOP o de la concesionaria para tu pórtico, horario y categoría.',
      },
      {
        id: 'pasadasMes',
        label: 'Pasadas al mes',
        type: 'number',
        placeholder: '20',
        required: true,
        min: 0,
        tooltip: 'Cuenta cada paso facturable; una ida y vuelta puede incluir varios pórticos.',
      },
      {
        id: 'cargoFijoMensual',
        label: 'Cargo fijo mensual',
        type: 'number',
        placeholder: '$0',
        required: false,
        min: 0,
      },
      {
        id: 'otrosCargosMensuales',
        label: 'Otros cargos mensuales',
        type: 'number',
        placeholder: '$0',
        required: false,
        min: 0,
      },
    ],
    faq: [
      {
        question: '¿Cuánto cuesta el TAG?',
        answer:
          'No existe una tarifa nacional por viaje. El cobro cambia según concesión, pórtico o tramo, categoría de vehículo y horario. Consulta el tarifario 2026 de la Dirección General de Concesiones y usa aquí el valor que corresponde a tu recorrido.',
      },
      {
        question: '¿La herramienta calcula viajes sin TAG?',
        answer:
          'No. Los pases diarios, tarifas para usuarios sin TAG y mecanismos de regularización dependen de cada autopista. Aplicar un recargo universal de 50% produciría resultados falsos.',
      },
      {
        question: '¿Cómo obtengo el TAG?',
        answer:
          'Solicítalo a una concesionaria y revisa sus canales oficiales. El dispositivo es interoperable en las autopistas concesionadas, pero la contratación, habilitación y cobro se rigen por las condiciones informadas por la empresa.',
      },
      {
        question: '¿Qué pasa si no pago el TAG?',
        answer:
          'Puede generarse deuda contractual y, si circulas con el dispositivo inhabilitado sin regularizar por el mecanismo correspondiente, también consecuencias bajo la Ley de Tránsito. Revisa la cuenta y los canales de la concesionaria; no todo impago produce automáticamente un reporte comercial.',
      },
      {
        question: '¿Hay tarifas diferenciadas?',
        answer:
          'Sí, pero los horarios y categorías no son iguales en todas las concesiones. Algunos tarifarios distinguen base fuera de punta, punta o saturación; otros usan tramos o tarifas manuales. Verifica el documento específico de tu ruta.',
      },
    ],
  },
  {
    id: 'cuenta-luz',
    name: 'Calculadora Cuenta de Luz (Tarifa BT1)',
    description:
      'Estima tu cuenta de luz según consumo kWh, zona y tipo de tarifa. Incluye cargo fijo, energía e IVA.',
    slug: 'calculadora-cuenta-luz',
    category: 'hogar',
    featured: true,
    phase: 2,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'Comisión Nacional de Energía — tarifas eléctricas',
        url: 'https://www.cne.cl/tarificacion/electrica/',
        note: 'Procesos y pliegos tarifarios regulados',
      },
    ],
    keywords: [
      'cuenta de luz',
      'tarifa BT1',
      'costo electricidad Chile',
      'consumo kWh',
      'cuenta electrica',
    ],
    inputs: [
      {
        id: 'consumoKWH',
        label: 'Consumo (kWh)',
        type: 'number',
        placeholder: '250',
        required: true,
        min: 0,
        tooltip:
          'Consumo mensual en kWh. Aparece en tu boleta. Un hogar promedio consume 200-300 kWh.',
      },
      {
        id: 'tipoTarifa',
        label: 'Tipo de Tarifa',
        type: 'select',
        required: true,
        options: [
          { value: 'bt1_residencial', label: 'Residencial' },
          { value: 'bt1_comercial', label: 'Comercial' },
          { value: 'bt1_industrial', label: 'Industrial' },
        ],
        tooltip:
          'BT1 residencial es la más común. Comercial e industrial tienen tarifas diferentes.',
      },
      {
        id: 'zona',
        label: 'Zona',
        type: 'select',
        required: true,
        options: [
          { value: 'norte', label: 'Norte' },
          { value: 'central', label: 'Central' },
          { value: 'sur', label: 'Sur' },
        ],
        tooltip:
          'El precio de la energía varía por zona: norte ~$150/kWh, central ~$135/kWh, sur ~$145/kWh.',
      },
    ],
    faq: [
      {
        question: '¿Cómo se calcula la cuenta de luz?',
        answer:
          'La cuenta se compone de: cargo fijo mensual (~$800-$1.200), cargo por energía consumida (kWh × tarifa según zona), e IVA del 19%. La tarifa BT1 residencial varía entre $120-$180 por kWh según zona.',
      },
      {
        question: '¿Por qué cambia el precio según la zona?',
        answer:
          'Chile tiene 4 sistemas eléctricos (norte grande, norte chico, central, sur). El precio depende de las plantas generadoras locales y costos de transmisión. La zona central es más barata por mayor oferta.',
      },
      {
        question: '¿Qué es el cargo fijo?',
        answer:
          'El cargo fijo es un monto mensual por estar conectado al sistema eléctrico. No depende del consumo. Incluye medidor, lectura, y costos administrativos. Es aproximadamente $800-$1.200 mensuales.',
      },
      {
        question: '¿Cómo reducir la cuenta de luz?',
        answer:
          'Consejos: usa ampolletas LED, electrodomésticos eficientes (A++), apaga equipos en standby, usa lavadora/secadora en horarios valle (10-17h), y mantén limpios los equipos.',
      },
      {
        question: '¿Qué es el subsidio eléctrico?',
        answer:
          'El subsidio eléctrico beneficia a familias vulnerables con hasta $37.000 trimestrales. Se postula en el municipio. El subsidio se descuenta directamente de la boleta.',
      },
    ],
  },
  // ============================================
  // FASE 3 — 10 Calculadoras Crecimiento
  // ============================================
  {
    id: 'impuesto-segunda-categoria',
    name: 'Impuesto Segunda Categoría 2026',
    description:
      'Calcula tu impuesto de segunda categoría según sueldo mensual y tramo progresivo. Actualizado con tramos 2026.',
    slug: 'calculadora-impuesto-segunda-categoria',
    category: 'impuestos',
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'SII — Impuesto Único 2026',
        url: 'https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm',
        note: 'Tablas mensuales vigentes',
      },
      {
        name: 'BCN — Ley sobre Impuesto a la Renta',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=6368',
        note: 'DL 824 vigente',
      },
    ],
    keywords: [
      'impuesto segunda categoría',
      'retención impuesto',
      'tramos impuesto Chile',
      'impuesto sueldo 2026',
    ],
    inputs: [
      {
        id: 'sueldoBrutoMensual',
        label: 'Sueldo Bruto Mensual',
        type: 'number',
        placeholder: '$800.000',
        required: true,
        min: 0,
        tooltip:
          'Sueldo bruto antes de descuentos. El impuesto se calcula sobre la renta imponible anual.',
      },
      {
        id: 'mesesTrabajados',
        label: 'Meses Trabajados',
        type: 'number',
        placeholder: '12',
        required: false,
        min: 1,
        max: 12,
        defaultValue: 12,
        tooltip:
          'Meses con ingresos en el año. Si trabajaste menos de 12 meses, el impuesto es menor.',
      },
    ],
    faq: [
      {
        question: '¿Qué es el impuesto de segunda categoría?',
        answer:
          'Es el impuesto que pagan los trabajadores dependientes e independientes sobre sus remuneraciones. Se calcula con tramos progresivos desde 0% hasta 40% según el nivel de ingresos anuales expresados en UTA (1 UTA = 12 UTM).',
      },
      {
        question: '¿Cuáles son los tramos del impuesto?',
        answer:
          'Tramos 2026: 0% hasta 13.5 UTA, 4% de 13.5-30 UTA, 8% de 30-50 UTA, 13.5% de 50-70 UTA, 23% de 70-90 UTA, 30.4% de 90-120 UTA, 35% de 120-310 UTA, y 40% sobre 310 UTA.',
      },
      {
        question: '¿Cómo se calcula el impuesto mensual?',
        answer:
          'El empleador retiene mensualmente proyectando tu ingreso anual. Si ganas $800.000 mensuales, tu anual son $9.600.000 (aprox. 11.4 UTA), bajo el tramo de 0%. Si ganas $2.000.000, anual $24.000.000 (28.5 UTA), paga 4%.',
      },
      {
        question: '¿El impuesto se devuelve?',
        answer:
          'En la Operación Renta (abril), se calcula el impuesto real anual. Si te retuvieron de más, el SII devuelve. Si retuvieron de menos, debes pagar. Los independientes hacen este proceso anualmente.',
      },
      {
        question: '¿Qué es la UTA?',
        answer:
          'La UTA (Unidad Tributaria Anual) equivale a 12 veces la UTM y se usa para expresar los tramos anuales del impuesto. Los tramos mensuales del impuesto único se expresan en UTM del mes.',
      },
    ],
  },
  {
    id: 'ppm',
    name: 'PPM (Pagos Provisionales Mensuales)',
    description:
      'Calcula tus pagos provisionales mensuales según actividad y ingresos brutos anuales.',
    slug: 'calculadora-ppm',
    category: 'impuestos',
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'SII — base imponible de PPM',
        url: 'https://www.sii.cl/preguntas_frecuentes/impuestos_mensuales/001_130_1908.htm',
        note: 'Ingresos brutos sin IVA declarados en F29',
      },
      {
        name: 'SII — guía Formulario 29',
        url: 'https://www.sii.cl/pagina/iva/guia_f29.htm',
        note: 'Declaración mensual de IVA y PPM',
      },
    ],
    keywords: [
      'PPM',
      'pagos provisionales mensuales',
      'PPM independientes',
      'retención mensual Chile',
    ],
    inputs: [
      {
        id: 'ingresosBrutosAnuales',
        label: 'Ingresos Brutos Anuales',
        type: 'number',
        placeholder: '$12.000.000',
        required: true,
        min: 0,
        tooltip:
          'Ingresos brutos del año anterior. El SII usa este monto para calcular el PPM del año siguiente.',
      },
      {
        id: 'gastosPresuntos',
        label: 'Gastos Presuntos',
        type: 'number',
        placeholder: '$1.200.000',
        required: false,
        min: 0,
        tooltip:
          'Gastos estimados que reducen la base imponible. Por defecto, el SII acepta 10% para profesionales.',
      },
      {
        id: 'actividad',
        label: 'Actividad',
        type: 'select',
        required: true,
        options: [
          { value: 'profesional', label: 'Profesional (10%)' },
          { value: 'comercio', label: 'Comercio (1%)' },
          { value: 'transporte', label: 'Transporte (0.5%)' },
          { value: 'construccion', label: 'Construcción (0.2%)' },
        ],
        tooltip:
          'La tasa depende de la actividad. Profesionales 10%, comercio 1%, transporte 0.5%, construcción 0.2%.',
      },
    ],
    faq: [
      {
        question: '¿Qué son los PPM?',
        answer:
          'Los Pagos Provisionales Mensuales (PPM) son abonos mensuales al impuesto anual a la renta. Se calculan aplicando una tasa a los ingresos brutos del mes. La tasa varía según actividad: profesionales 10%, comercio 1%, transporte 0.5%, construcción 0.2%.',
      },
      {
        question: '¿Cómo se calcula el PPM?',
        answer:
          'PPM = Ingresos Brutos Mensuales × Tasa. Si eres profesional y facturas $1.000.000, el PPM es $100.000 (10%). Este monto se paga mensualmente y se acredita al impuesto anual.',
      },
      {
        question: '¿Cuándo se paga el PPM?',
        answer:
          'El PPM se paga entre el 1 y 12 de cada mes, declarando los ingresos del mes anterior. Se paga en línea en el sitio del SII o en bancos autorizados.',
      },
      {
        question: '¿Puedo variar el PPM?',
        answer:
          'Sí. Si estimas que tu renta anual será menor, puedes solicitar al SII una variación del PPM. Debes fundamentar con antecedentes. El SII acepta o rechaza la solicitud.',
      },
      {
        question: '¿Qué pasa si no pago el PPM?',
        answer:
          'El no pago genera intereses y multas. Además, en la Operación Renta tendrás que pagar todo el impuesto de una vez sin los abonos mensuales. Puede haber sanciones por evasión.',
      },
    ],
  },
  {
    id: 'subsidio-agua',
    name: 'Subsidio Agua Potable',
    description:
      'Estima el subsidio según tu cuenta, porcentaje asignado y tope oficial. El resultado real aparece en la boleta.',
    slug: 'calculadora-subsidio-agua',
    category: 'hogar',
    noIndex: true,
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-13',
    sources: [
      {
        name: 'ChileAtiende — Subsidio al agua',
        url: 'https://www.chileatiende.gob.cl/fichas/51314-subsidio-al-pago-de-consumo-de-agua-potable-y-servicio-de-alcantarillado',
        note: 'Cobertura de 25% a 85%, tope de 13 m³ y régimen especial',
      },
      {
        name: 'BCN — Ley 18.778',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=30157',
        note: 'Subsidio al consumo de agua potable y alcantarillado',
      },
    ],
    keywords: ['subsidio agua potable', 'descuento agua', 'subsidio servicios básicos Chile'],
    inputs: [
      {
        id: 'consumoM3',
        label: 'Consumo Mensual (m³)',
        type: 'number',
        placeholder: '15',
        required: true,
        min: 0,
      },
      {
        id: 'numeroPersonas',
        label: 'Personas en el Hogar',
        type: 'number',
        placeholder: '4',
        required: true,
        min: 1,
      },
      {
        id: 'montoCuenta',
        label: 'Total de la cuenta antes del subsidio',
        type: 'number',
        placeholder: '$25.000',
        required: true,
        min: 0,
      },
      {
        id: 'porcentajeAsignado',
        label: 'Porcentaje asignado (%)',
        type: 'number',
        placeholder: '50',
        required: true,
        min: 25,
        max: 85,
        tooltip:
          'Revisa la resolución municipal o tu boleta. En el régimen general varía entre 25% y 85%.',
      },
      {
        id: 'seguridadesYOportunidades',
        label: '¿Participas en Seguridades y Oportunidades?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
    ],
    faq: [
      {
        question: '¿Cómo funciona el subsidio al agua?',
        answer:
          'Se postula en la municipalidad del domicilio. El régimen general cubre entre 25% y 85% del valor hasta un consumo máximo de 13 m³; el porcentaje depende de la evaluación socioeconómica. No existen tres porcentajes nacionales fijos.',
      },
      {
        question: '¿Qué cambia para Seguridades y Oportunidades?',
        answer:
          'Los hogares participantes obtienen una cobertura de 100% para los primeros 15 m³ registrados en la cuenta. La herramienta aplica ese régimen especial cuando marcas la opción correspondiente.',
      },
    ],
  },
  {
    id: 'cotizacion-independientes',
    name: 'Cotización Independientes (Ley 21.133)',
    description:
      'Calcula tus cotizaciones previsionales como trabajador independiente: AFP, salud y SIS.',
    slug: 'calculadora-cotizacion-independientes',
    category: 'pension',
    noIndex: true,
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'Superintendencia de Pensiones — afiliados y cotizantes',
        url: 'https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-9772.html',
        note: 'Cotizaciones obligatorias e instrumentos previsionales',
      },
      {
        name: 'SII — boletas y cotizaciones',
        url: 'https://www.sii.cl/destacados/boletas_honorarios/',
        note: 'Retenciones y cotizaciones de independientes',
      },
    ],
    keywords: [
      'cotización independientes',
      'Ley 21.133',
      'cotización AFP independiente',
      'base imponible 80%',
    ],
    inputs: [
      {
        id: 'rentaBrutaMensual',
        label: 'Renta Bruta Mensual',
        type: 'number',
        placeholder: '$800.000',
        required: true,
        min: 0,
      },
      {
        id: 'afp',
        label: 'AFP',
        type: 'select',
        required: true,
        options: [
          { value: 'capital', label: 'Capital' },
          { value: 'cuprum', label: 'Cuprum' },
          { value: 'habitat', label: 'Habitat' },
          { value: 'modelo', label: 'Modelo' },
          { value: 'planvital', label: 'PlanVital' },
          { value: 'provida', label: 'ProVida' },
          { value: 'uno', label: 'Uno' },
        ],
      },
      {
        id: 'salud',
        label: 'Sistema de Salud',
        type: 'select',
        required: true,
        options: [
          { value: 'fonasa', label: 'FONASA' },
          { value: 'isapre', label: 'Isapre' },
        ],
      },
    ],
    faq: [
      {
        question: '¿Cuánto cotiza un independiente?',
        answer:
          'Los independientes cotizan sobre el 80% de su renta bruta. AFP (10% + comisión), salud (7%) y la distribución legal vigente para SIS y seguro de accidentes. El total depende del año del calendario de cotizaciones.',
      },
    ],
  },
  {
    id: 'propina-legal',
    name: 'Calculadora Propina Legal (10%)',
    description:
      'Calcula o extrae la propina del 10%. Ideal para dividir cuentas en restaurantes chilenos.',
    slug: 'calculadora-propina-legal',
    category: 'servicios',
    noIndex: true,
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'BCN — Ley 20.918',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1086882',
        note: 'Propina sugerida y derecho del trabajador',
      },
    ],
    keywords: ['propina 10%', 'calculadora propina', 'propina restaurante Chile', 'dividir cuenta'],
    inputs: [
      {
        id: 'montoConsumo',
        label: 'Monto',
        type: 'number',
        placeholder: '$25.000',
        required: true,
        min: 0,
      },
      {
        id: 'incluyePropina',
        label: '¿El monto incluye propina?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      {
        id: 'porcentajePropina',
        label: 'Porcentaje de Propina (%)',
        type: 'number',
        placeholder: '10',
        required: false,
        min: 0,
        max: 50,
        defaultValue: 10,
      },
    ],
    faq: [
      {
        question: '¿Es obligatoria la propina del 10%?',
        answer:
          'La propina del 10% es voluntaria según la ley chilena. Sin embargo, es una costumbre muy arraigada. El código del trabajo la menciona como un derecho del trabajador de establecimientos que la incluyan en la cuenta.',
      },
    ],
  },
  {
    id: 'gastos-comunes',
    name: 'Calculadora Gastos Comunes',
    description:
      'Estima tus gastos comunes mensuales según superficie, estacionamiento y amenities del edificio.',
    slug: 'calculadora-gastos-comunes',
    category: 'hogar',
    noIndex: true,
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'BCN — Ley 21.442',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1174663',
        note: 'Nueva Ley de Copropiedad Inmobiliaria',
      },
    ],
    keywords: ['gastos comunes', 'condominio Chile', 'gasto común m²', 'departamento gastos'],
    inputs: [
      {
        id: 'superficieM2',
        label: 'Superficie (m²)',
        type: 'number',
        placeholder: '65',
        required: true,
        min: 0,
      },
      {
        id: 'incluyeEstacionamiento',
        label: '¿Incluye estacionamiento?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      {
        id: 'estacionamientos',
        label: 'N° de Estacionamientos',
        type: 'number',
        placeholder: '1',
        required: false,
        min: 0,
      },
      {
        id: 'tienePiscina',
        label: '¿Piscina?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      {
        id: 'tieneGimnasio',
        label: '¿Gimnasio?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      {
        id: 'tieneConserje',
        label: '¿Conserje 24h?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
    ],
    faq: [
      {
        question: '¿Cómo se calculan los gastos comunes?',
        answer:
          'Se calculan según la superficie de tu departamento (m² × tarifa), más cargos por estacionamientos y amenities (piscina, gimnasio, conserje). La tarifa promedio es de $12.000-$18.000 por m².',
      },
    ],
  },
  {
    id: 'conversor-divisas',
    name: 'Conversor Dólar / Euro a CLP',
    description:
      'Convierte entre dólares americanos, euros y pesos chilenos con tasas aproximadas actualizadas.',
    slug: 'calculadora-conversor-divisas',
    category: 'conversiones',
    noIndex: true,
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-04',
    sources: [
      {
        name: 'Banco Central de Chile',
        url: 'https://www.bcentral.cl/areas/estadisticas',
        note: 'Tipo de cambio dólar y euro',
      },
    ],
    keywords: ['dólar a peso', 'euro a peso', 'conversor divisas Chile', 'USD CLP', 'EUR CLP'],
    inputs: [
      { id: 'monto', label: 'Monto', type: 'number', placeholder: '100', required: true, min: 0 },
      {
        id: 'moneda',
        label: 'Moneda',
        type: 'select',
        required: true,
        options: [
          { value: 'usd', label: 'Dólar Americano (USD)' },
          { value: 'eur', label: 'Euro (EUR)' },
        ],
      },
      {
        id: 'direccion',
        label: 'Conversión',
        type: 'select',
        required: true,
        options: [
          { value: 'a_clp', label: 'Divisa → CLP' },
          { value: 'desde_clp', label: 'CLP → Divisa' },
        ],
      },
    ],
    faq: [
      {
        question: '¿Cuánto vale el dólar hoy?',
        answer:
          'El valor del dólar cambia cada día hábil. El observado vigente aparece al inicio de esta página con su fecha y fuente; para el valor oficial consulta el Banco Central de Chile.',
      },
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
    description:
      'Estima el monto PGU 2026 según edad y pensión base declarada. No verifica residencia ni focalización.',
    slug: 'calculadora-pgu',
    category: 'pension',
    noIndex: true,
    featured: false,
    phase: 3,
    lastReviewed: '2026-07-13',
    sources: [
      {
        name: 'ChileAtiende — PGU',
        url: 'https://www.chileatiende.gob.cl/fichas/102077-pension-garantizada-universal-pgu',
        note: 'Montos, límites, edad y requisitos vigentes en 2026',
      },
      {
        name: 'BCN — Ley 21.419',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1171923',
        note: 'Crea la Pensión Garantizada Universal',
      },
    ],
    keywords: ['PGU', 'pensión garantizada universal', 'PGU Chile', 'bono pensión', 'Ley 21.419'],
    inputs: [
      {
        id: 'pensionActual',
        label: 'Pensión base estimada',
        type: 'number',
        placeholder: '$250.000',
        required: true,
        min: 0,
        tooltip:
          'La pensión base legal puede diferir de lo que recibes actualmente. Usa el dato informado por IPS o ChileAtiende si lo tienes.',
      },
      {
        id: 'edad',
        label: 'Edad',
        type: 'number',
        placeholder: '70',
        required: true,
        min: 0,
        max: 120,
      },
    ],
    faq: [
      {
        question: '¿Cuáles son los montos PGU vigentes?',
        answer:
          'Desde febrero de 2026 el monto base es $231.732 y el máximo $250.275. El máximo se aplica según un calendario por edad: desde los 82 años hasta agosto de 2026, desde los 75 años entre septiembre de 2026 y agosto de 2027, y para todas las personas de 65 años o más desde septiembre de 2027. Hasta una pensión base de $789.139 se entrega el monto del tramo completo; entre ese valor y $1.252.602 el monto disminuye.',
      },
      {
        question: '¿Los años cotizados cambian la PGU?',
        answer:
          'No. La PGU es un beneficio no contributivo y su monto no se multiplica por años cotizados. Sí existen requisitos de edad, residencia y focalización que esta estimación no puede verificar.',
      },
    ],
  },
  {
    id: 'aporte-familiar-permanente',
    name: 'Calculadora Aporte Familiar Permanente',
    description:
      'Estima el Aporte Familiar Permanente 2026 ($66.834 por carga o grupo familiar al 31-12-2025) según tus cargas y situación.',
    slug: 'calculadora-aporte-familiar-permanente',
    category: 'beneficios',
    featured: false,
    phase: 2,
    lastReviewed: '2026-09-26',
    sources: [
      {
        name: 'ChileAtiende — Aporte Familiar Permanente (IPS)',
        url: 'https://www.chileatiende.gob.cl/fichas/38913-aporte-familiar-permanente',
        note: 'Monto, corte de cargas al 31-12-2025 y plazo de cobro de 9 meses',
      },
    ],
    keywords: [
      'aporte familiar permanente 2026',
      'bono marzo 2026',
      'aporte familiar monto',
      'aporte por carga familiar',
      'chile solidario aporte',
      'suf aporte familiar',
    ],
    inputs: [
      {
        id: 'cargas',
        label: 'Cargas con derecho a SUF / Asignación Familiar o Maternal al 31-12-2025',
        type: 'number',
        placeholder: '2',
        required: true,
        min: 0,
        unit: 'count',
        tooltip:
          'Personas que al 31 de diciembre de 2025 te daban derecho a cobrar el Subsidio Familiar o Maternal, o la Asignación Familiar o Maternal.',
      },
      {
        id: 'grupoSSyOO',
        label: '¿Tu grupo familiar pertenecía a Chile Solidario o Seguridades y Oportunidades al 31-12-2025?',
        type: 'boolean',
        required: false,
        defaultValue: false,
        tooltip:
          'Si no tienes cargas pero tu grupo familiar estaba en Chile Solidario o en el Subsistema de Seguridades y Oportunidades (Ingreso Ético Familiar), corresponde un aporte por el grupo.',
      },
      {
        id: 'madreSUF',
        label: '¿Eres madre que recibe el SUF por hijos menores de 18 que viven contigo?',
        type: 'boolean',
        required: false,
        defaultValue: false,
        tooltip:
          'En ese caso obtienes el aporte por cada hijo o hija y además un aporte propio como persona que genera el beneficio.',
      },
    ],
    seoTitle: 'Aporte Familiar Permanente 2026: calcula cuánto te corresponde',
    seoDescription:
      'Calcula el Aporte Familiar Permanente 2026: $66.834 por carga familiar o grupo en Chile Solidario/SSyOO al 31-12-2025. Gratis.',
    faq: [
      {
        question: '¿Cuánto es el Aporte Familiar Permanente 2026?',
        answer:
          '$66.834 por cada carga familiar o persona que al 31 de diciembre de 2025 te daba derecho a cobrar el Subsidio Familiar o Maternal, o la Asignación Familiar o Maternal; o por tu grupo familiar si a esa fecha pertenecía a Chile Solidario o al Subsistema de Seguridades y Oportunidades.',
      },
      {
        question: 'Si tengo cargas y además estoy en Seguridades y Oportunidades, ¿recibo el doble?',
        answer:
          'No. Según la ficha oficial, si te encuentras en ambos casos recibirás $66.834 por cada una de tus cargas. La condición de grupo familiar solo genera un aporte cuando no hay cargas con derecho.',
      },
      {
        question: '¿Qué pasa si soy madre que recibe el SUF?',
        answer:
          'Como madre que recibe el SUF por uno o más hijos o hijas menores de 18 años que viven contigo, obtienes el aporte por cada uno de ellos y además los $66.834 que te corresponden como persona que genera el beneficio.',
      },
      {
        question: '¿Cuánto tiempo tengo para cobrarlo?',
        answer:
          'Tienes 9 meses para cobrarlo desde que se genera el documento de pago. El IPS emite el pago y el estado se puede revisar en los canales oficiales.',
      },
      {
        question: '¿Necesito estar al día con las cargas familiares?',
        answer:
          'Sí. Para recibir el aporte debes tener el pago de tus cargas familiares al día según la institución que corresponda.',
      },
    ],
  },
  {
    id: 'seguro-cesantia',
    name: 'Calculadora Seguro de Cesantía',
    description:
      'Estima los pagos del Seguro de Cesantía (CIC y Fondo de Cesantía Solidario) según contrato, cotizaciones, causal y saldo.',
    slug: 'calculadora-seguro-cesantia',
    category: 'beneficios',
    featured: false,
    phase: 2,
    lastReviewed: '2026-09-26',
    sources: [
      {
        name: 'ChileAtiende — Seguro de Cesantía',
        url: 'https://www.chileatiende.gob.cl/fichas/62932-seguro-de-cesantia',
        note: 'CIC: 1 a 13 pagos, 70% del promedio el primero',
      },
      {
        name: 'ChileAtiende — Fondo de Cesantía Solidario',
        url: 'https://www.chileatiende.gob.cl/fichas/36646-fondo-de-cesantia-solidario-fcs',
        note: 'Requisitos FCS: causal, 10 cotizaciones en 24 meses',
      },
      {
        name: 'AFC — Beneficios del seguro',
        url: 'https://www.afc.cl/mi-seguro-de-cesantia/beneficios/',
        note: 'Porcentajes, mínimos y máximos vigentes al 28-02-2027',
      },
    ],
    keywords: [
      'seguro de cesantía',
      'calculadora seguro cesantía',
      'fondo de cesantía solidario',
      'afc pagos',
      'cuenta individual cesantía',
      'cuánto paga el seguro de cesantía',
    ],
    inputs: [
      {
        id: 'tipoContrato',
        label: 'Tipo de contrato',
        type: 'select',
        required: true,
        defaultValue: 'indefinido',
        options: [
          { value: 'indefinido', label: 'Indefinido' },
          { value: 'plazo-fijo', label: 'Plazo fijo / obra o servicio' },
        ],
      },
      {
        id: 'remuneracionPromedio',
        label: 'Remuneración mensual promedio',
        type: 'number',
        unit: 'CLP',
        placeholder: '$900.000',
        required: true,
        min: 0,
        tooltip:
          'Promedio de tus últimas remuneraciones: últimas 10 si tu contrato era indefinido, últimas 5 si era a plazo fijo u obra.',
      },
      {
        id: 'cotizaciones',
        label: 'Cotizaciones pagadas',
        type: 'number',
        placeholder: '24',
        required: true,
        min: 0,
        unit: 'count',
        tooltip:
          'Para el Fondo de Cesantía Solidario cuentan las cotizaciones de los últimos 24 meses.',
      },
      {
        id: 'ultimas3Continuas',
        label: '¿Las últimas 3 cotizaciones fueron continuas con el mismo empleador?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      {
        id: 'causalFCS',
        label: '¿La causal es necesidades de la empresa, quiebra, vencimiento de plazo, fin de obra o caso fortuito?',
        type: 'boolean',
        required: false,
        defaultValue: false,
        tooltip:
          'Solo esas causales dan derecho al Fondo de Cesantía Solidario. Renuncia voluntaria o mutuo acuerdo no lo activan.',
      },
      {
        id: 'saldoCIC',
        label: 'Saldo de tu Cuenta Individual de Cesantía (opcional)',
        type: 'number',
        unit: 'CLP',
        placeholder: '$0',
        required: false,
        min: 0,
        tooltip:
          'Déjalo en 0 si no lo sabes: la calculadora estimará el primer pago o el esquema del Fondo Solidario.',
      },
    ],
    seoTitle: 'Seguro de Cesantía 2026: calcula tus pagos CIC y FCS',
    seoDescription:
      'Estima los pagos del Seguro de Cesantía: CIC hasta 13 cuotas (70% inicial) y Fondo Solidario con mínimos y máximos vigentes.',
    faq: [
      {
        question: '¿Cuántos pagos entrega la Cuenta Individual de Cesantía?',
        answer:
          'Entre 1 y 13 pagos según el saldo y el promedio de las últimas remuneraciones. El primer pago es el 70% del promedio (de las últimas 10 remuneraciones si el contrato era indefinido, de las últimas 5 si era a plazo fijo) y luego los montos bajan: 60%, 45%, 40%, 35% y 30% hasta agotar el saldo.',
      },
      {
        question: '¿Cuántas cotizaciones necesito para cobrar?',
        answer:
          'Para la Cuenta Individual: 10 cotizaciones si tu contrato era indefinido o de casa particular, y 5 si era a plazo fijo, obra o servicio. Para el Fondo Solidario se exigen además 10 cotizaciones dentro de los últimos 24 meses, con las últimas 3 continuas con el mismo empleador.',
      },
      {
        question: '¿Qué es el Fondo de Cesantía Solidario?',
        answer:
          'Un complemento estatal que aplica solo cuando el saldo de tu cuenta individual no alcanza para cubrir al menos 5 pagos. Requiere una causal con derecho (necesidades de la empresa, quiebra, vencimiento del plazo, conclusión de la obra o caso fortuito) e inscripción en la Bolsa Nacional de Empleo. Son 5 pagos mensuales que se financian primero con tu saldo y se complementan con el Fondo.',
      },
      {
        question: '¿Cuáles son los montos del Fondo Solidario?',
        answer:
          'Contrato indefinido: 70/60/45/40/35% del promedio, con mínimos de $301.201 a $150.602 y máximos de $1.004.003 a $502.002. Plazo fijo u obra: 60/40/35/30/30%, con mínimos de $258.161 a $129.085 y máximos de $860.574 a $430.288. Valores vigentes hasta el 28-02-2027.',
      },
      {
        question: '¿Puede haber más de 5 pagos del Fondo Solidario?',
        answer:
          'La norma contempla hasta 2 pagos adicionales solo cuando el desempleo nacional supera en un punto el promedio de los últimos 4 años. Esta calculadora muestra los 5 pagos regulares.',
      },
    ],
  },
  {
    id: 'licencia-medica',
    name: 'Calculadora Licencia Médica',
    description:
      'Estima el subsidio por licencia médica: monto diario desde la remuneración neta, mínimo legal y días pagados según la duración.',
    slug: 'calculadora-licencia-medica',
    category: 'sueldo',
    featured: false,
    phase: 2,
    lastReviewed: '2026-09-26',
    sources: [
      {
        name: 'SUSESO — Subsidio por incapacidad laboral',
        url: 'https://www.suseso.gob.cl/606/w3-propertyvalue-568.html',
        note: 'Base de cálculo: remuneración neta y mínimo legal diario',
      },
      {
        name: 'Dirección del Trabajo — Licencias médicas',
        url: 'https://www.dt.gob.cl/portal/1628/w3-article-95288.html',
        note: 'Pago desde el primer día si supera 10 días; desde el 4° si es menor o igual',
      },
    ],
    keywords: [
      'licencia médica',
      'calculadora licencia médica',
      'subsidio incapacidad laboral',
      'cuánto pagan por licencia',
      'licencia médica sueldo',
      'subsidio licencia chile',
    ],
    inputs: [
      {
        id: 'remuneracionNetaPromedio',
        label: 'Remuneración neta mensual promedio',
        type: 'number',
        unit: 'CLP',
        placeholder: '$900.000',
        required: true,
        min: 0,
        tooltip:
          'Promedio de la remuneración mensual neta (imponible menos cotizaciones previsionales e impuestos) de los 3 meses calendario anteriores al inicio de la licencia.',
      },
      {
        id: 'diasLicencia',
        label: 'Días de licencia',
        type: 'number',
        unit: 'days',
        placeholder: '15',
        required: true,
        min: 1,
        tooltip:
          'Si la licencia supera los 10 días el subsidio se paga desde el primer día; si es de 10 días o menos, desde el cuarto día.',
      },
    ],
    seoTitle: 'Licencia Médica 2026: calcula el subsidio por tus días',
    seoDescription:
      'Calcula el subsidio de licencia médica: monto diario desde la remuneración neta con mínimo legal y pago desde el 1° o 4° día.',
    faq: [
      {
        question: '¿Cómo se calcula el monto diario de la licencia?',
        answer:
          'La base es el promedio de la remuneración mensual neta —imponible menos cotizaciones previsionales e impuestos— de los 3 meses calendario anteriores al mes de inicio de la licencia. Ese promedio se divide por 30 para obtener el monto diario.',
      },
      {
        question: '¿Existe un mínimo diario para el subsidio?',
        answer:
          'Sí. El monto diario no puede ser inferior a 1/30 del 50% del ingreso mínimo para fines no remuneracionales. La calculadora aplica ese piso automáticamente.',
      },
      {
        question: '¿Desde qué día se paga la licencia?',
        answer:
          'Cuando la licencia es superior a 10 días, el subsidio se paga desde el primer día; si es igual o inferior a 10 días, se paga desde el cuarto día.',
      },
      {
        question: '¿Qué requisitos debo cumplir para tener derecho al subsidio?',
        answer:
          'En general se exige 6 meses de afiliación y al menos 3 meses de cotización dentro de los 6 meses anteriores al inicio de la licencia. Para trabajadores contratados por día o por turnos el requisito baja a 1 mes de cotización.',
      },
      {
        question: '¿Hay un tope en la base de cálculo?',
        answer:
          'La remuneración imponible considerada está limitada por el tope imponible vigente (90 UF mensuales), lo que acota la base sobre la que se calcula la remuneración neta promedio.',
      },
    ],
  },
  {
    id: 'sueldo-part-time',
    name: 'Calculadora Sueldo Part-Time',
    description:
      'Calcula el ingreso mínimo legal para jornadas parciales (30 h o menos) y verifica si el sueldo pactado lo cumple.',
    slug: 'calculadora-sueldo-part-time',
    category: 'sueldo',
    featured: false,
    phase: 2,
    lastReviewed: '2026-09-26',
    sources: [
      {
        name: 'Dirección del Trabajo — Jornada parcial e ingreso mínimo',
        url: 'https://www.dt.gob.cl/portal/1626/w3-article-60136.html',
        note: 'IMM proporcional solo hasta 30 h semanales; jornada intermedia exige IMM íntegro',
      },
    ],
    keywords: [
      'sueldo part time',
      'jornada parcial sueldo mínimo',
      'media jornada sueldo',
      'sueldo mínimo proporcional',
      'jornada 20 horas sueldo',
      'jornada intermedia',
    ],
    inputs: [
      {
        id: 'horasSemanales',
        label: 'Horas semanales pactadas',
        type: 'number',
        unit: 'count',
        placeholder: '20',
        required: true,
        min: 1,
        max: 42,
        tooltip:
          'Hasta 30 horas es jornada parcial (IMM proporcional). Entre 30 y 42 horas es jornada intermedia y corresponde el IMM íntegro.',
      },
      {
        id: 'sueldoPactado',
        label: 'Sueldo mensual pactado (opcional)',
        type: 'number',
        unit: 'CLP',
        placeholder: '$0',
        required: false,
        min: 0,
        tooltip:
          'Ingrésalo para verificar si cumple el mínimo legal. Déjalo en 0 para ver solo el mínimo proporcional.',
      },
    ],
    seoTitle: 'Sueldo Part-Time 2026: mínimo legal según horas semanales',
    seoDescription:
      'Calcula el sueldo mínimo para jornada parcial en Chile: proporcional hasta 30 h semanales e íntegro en jornada intermedia.',
    faq: [
      {
        question: '¿Se puede pagar el sueldo mínimo en forma proporcional?',
        answer:
          'Sí, pero solo cuando se pacta una jornada parcial de 30 horas semanales o menos. En ese caso el ingreso mínimo mensual se puede pagar en proporción a las horas acordadas.',
      },
      {
        question: '¿Qué pasa si trabajo más de 30 y menos de 42 horas?',
        answer:
          'Esa es la jornada intermedia: según la Dirección del Trabajo, el trabajador debe percibir el ingreso mínimo mensual íntegro, sin cálculos proporcionales.',
      },
      {
        question: '¿Cómo se calcula el proporcional?',
        answer:
          'Se multiplica el ingreso mínimo mensual por las horas pactadas y se divide por la jornada máxima legal vigente de 42 horas. Por ejemplo, 20 horas semanales dan un mínimo proporcional de aproximadamente 47,6% del IMM.',
      },
      {
        question: '¿La calculadora incluye horas extra?',
        answer:
          'No. Muestra el mínimo legal y un valor hora de referencia calculado con la fórmula legal de la hora ordinaria (sueldo / 30 × 28 dividido por la jornada semanal × 4). Para horas extraordinarias usa la calculadora de horas extra.',
      },
    ],
  },
  {
    id: 'subsidio-unificado-empleo',
    name: 'Calculadora Subsidio Unificado de Empleo',
    description:
      'Estima el aporte mensual del Subsidio Unificado de Empleo (Ley 21.808) para trabajador y empresa. Los parámetros dependen del decreto del art. 8, pendiente de publicación.',
    slug: 'calculadora-subsidio-unificado-empleo',
    category: 'beneficios',
    featured: false,
    phase: 2,
    noIndex: true,
    lastReviewed: '2026-09-26',
    sources: [
      {
        name: 'Ley 21.808 — Diario Oficial (13-03-2026)',
        url: 'https://www.diariooficial.interior.gob.cl/publicaciones/2026/03/13/44399/01/2782286.pdf',
        note: 'Texto de la ley: IMM del subsidio, PV del primer año y tramos de renta',
      },
      {
        name: 'BCN / Ley Chile — Ley 21.808',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1222281',
        note: 'Norma vigente desde el 01-10-2026',
      },
    ],
    keywords: [
      'subsidio unificado de empleo',
      'ley 21808 subsidio',
      'subsidio al empleo chile',
      'calculadora subsidio empleo',
      'aporte estatal contratación',
      'subsidio trabajador empresa',
    ],
    inputs: [
      {
        id: 'rentaBruta',
        label: 'Renta bruta mensual pactada',
        type: 'number',
        unit: 'CLP',
        placeholder: '$600.000',
        required: true,
        min: 0,
        tooltip:
          'Sobre 2,25 IMM del subsidio ($1.190.250) no hay aporte ese mes. Entre 1,25 y 2,25 IMM el aporte baja gradualmente.',
      },
      {
        id: 'grupoPrioritario',
        label: 'Grupo prioritario',
        type: 'select',
        required: true,
        defaultValue: 'ninguno',
        options: [
          { value: 'joven-18-24', label: 'Joven de 18 a 24 años' },
          { value: 'mujer-25-54', label: 'Mujer de 25 a 54 años' },
          { value: 'mayor-55', label: 'Persona de 55 años o más' },
          {
            value: 'discapacidad',
            label: 'Persona con discapacidad (18+, inscrita en el RND)',
          },
          { value: 'ninguno', label: 'Ninguno de los anteriores' },
        ],
      },
      {
        id: 'desempleoPrevio',
        label: '¿Tuviste 6 meses de desempleo continuos u 8 discontinuos en los últimos 18 meses?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      {
        id: 'rsh40',
        label: '¿Tu hogar está dentro del 40% más vulnerable según RSH?',
        type: 'boolean',
        required: false,
        defaultValue: false,
        tooltip:
          'Se exige el primer año, pero no aplica a personas con discapacidad.',
      },
    ],
    seoTitle: 'Subsidio Unificado de Empleo 2026: calcula el aporte mensual',
    seoDescription:
      'Estima el aporte del Subsidio Unificado de Empleo (Ley 21.808) para trabajador y empresa según renta bruta y grupo prioritario.',
    faq: [
      {
        question: '¿Los valores de esta estimación son definitivos?',
        answer:
          'No. La Ley 21.808 fija el IMM del subsidio en $529.000 y los porcentajes de valorización del primer año (10% trabajador, 20% empresa), pero los parámetros finales se materializan en el decreto del art. 8, que al 26-09-2026 aún no se publica. La ley rige desde el 01-10-2026.',
      },
      {
        question: '¿Quiénes son los grupos prioritarios del subsidio?',
        answer:
          'Jóvenes de 18 a 24 años, mujeres de 25 a 54 años, personas de 55 años o más y personas con discapacidad desde los 18 años inscritas en el Registro Nacional de la Discapacidad.',
      },
      {
        question: '¿Qué requisitos debe cumplir la persona trabajadora?',
        answer:
          'Haber estado 6 meses de desempleo continuos u 8 discontinuos dentro de los 18 meses anteriores a la contratación, y pertenecer al 40% más vulnerable según RSH durante el primer año (este requisito no aplica a personas con discapacidad).',
      },
      {
        question: '¿Cuánto dura el subsidio y cómo se paga?',
        answer:
          '12 meses para la persona trabajadora (15 si es persona con discapacidad); la empresa recibe el aporte por 15 meses si es micro o pequeña. Los pagos mensuales al trabajador son provisionales por el 90% y se reliquidan anualmente.',
      },
      {
        question: '¿Hasta qué sueldo existe el aporte?',
        answer:
          'Hasta 2,25 IMM del subsidio ($1.190.250 con el valor actual). Entre 1,25 y 2,25 IMM el aporte baja de forma gradual y el del trabajador nunca es inferior al 2,5% del IMM ($13.225). Sobre 2,25 IMM no hay aporte ese mes.',
      },
    ],
  },
  {
    id: 'factor-hora-extra',
    name: 'Calculadora Factor de Hora Extra',
    description:
      'Calcula el factor legal de la hora extraordinaria (sueldo × factor) y el valor de la hora extra con el recargo del 50%.',
    slug: 'calculadora-factor-hora-extra',
    category: 'sueldo',
    featured: false,
    phase: 2,
    lastReviewed: '2026-09-26',
    sources: [
      {
        name: 'Dirección del Trabajo — Valor de la hora extraordinaria',
        url: 'https://www.dt.gob.cl/portal/1628/w3-article-95182.html',
        note: 'Fórmula legal: sueldo/30 × 28 / jornada, más recargo del 50%',
      },
      {
        name: 'Dirección del Trabajo — Límite de horas extraordinarias',
        url: 'https://www.dt.gob.cl/portal/1628/w3-article-60157.html',
        note: 'Máximo 2 horas por día y 12 horas semanales',
      },
    ],
    keywords: [
      'factor hora extra',
      'valor hora extraordinaria',
      '0.0083333 sueldo',
      'calculadora hora extra factor',
      'recargo 50% horas extra',
      'cómo calcular hora extra',
    ],
    inputs: [
      {
        id: 'sueldoBase',
        label: 'Sueldo mensual base',
        type: 'number',
        unit: 'CLP',
        placeholder: '$1.000.000',
        required: true,
        min: 0,
      },
      {
        id: 'jornadaSemanal',
        label: 'Jornada semanal pactada',
        type: 'number',
        unit: 'count',
        placeholder: '42',
        required: false,
        defaultValue: 42,
        min: 1,
        max: 45,
        tooltip:
          'Jornada legal vigente: 42 horas desde el 26-04-2026 (bajará a 40 desde el 26-04-2028). Puedes usar 44 si tu contrato mantiene la jornada anterior.',
      },
      {
        id: 'horasExtra',
        label: 'Horas extra del mes',
        type: 'number',
        unit: 'count',
        placeholder: '10',
        required: false,
        defaultValue: 0,
        min: 0,
        tooltip:
          'Máximo legal: 2 horas extraordinarias por día y 12 por semana.',
      },
    ],
    seoTitle: 'Factor Hora Extra 2026: valor legal de la hora extraordinaria',
    seoDescription:
      'Calcula el factor de la hora extra en Chile (0,0083333 con jornada de 42 h) y el valor de tus horas extraordinarias con recargo del 50%.',
    faq: [
      {
        question: '¿Cuál es la fórmula legal del factor?',
        answer:
          'Según la Dirección del Trabajo, el sueldo se divide por 30, se multiplica por 28 y el resultado se divide por la jornada semanal por 4; ese es el valor de la hora ordinaria. La hora extra aumenta un 50% (×1,5). Con jornada de 42 horas equivale a multiplicar el sueldo mensual por 0,0083333.',
      },
      {
        question: '¿Qué jornada semanal debo usar?',
        answer:
          'La jornada máxima legal es de 42 horas desde el 26-04-2026 y bajará a 40 horas desde el 26-04-2028. Si tu contrato sigue en 44 horas o pactaste otra jornada, ingrésala y el factor se ajusta.',
      },
      {
        question: '¿Cuántas horas extra se pueden trabajar?',
        answer:
          'El máximo legal es de 2 horas extraordinarias por día y 12 horas por semana. Esta calculadora solo estima el valor, no valida el límite.',
      },
      {
        question: '¿En qué se diferencia de la calculadora de horas extra?',
        answer:
          'Esta herramienta entrega el factor multiplicador y el valor por hora. La calculadora de horas extra del sitio calcula el pago mensual completo de horas extraordinarias con más desglose.',
      },
      {
        question: '¿El recargo siempre es del 50%?',
        answer:
          'La fórmula de la Dirección del Trabajo aumenta el valor de la hora ordinaria en un 50%. Esta calculadora usa ese recargo; convenios individuales o colectivos pueden pactar recargos mayores.',
      },
    ],
  },
  {
    id: 'subsidio-familiar-suf',
    name: 'Calculadora Subsidio Familiar (SUF)',
    description:
      'Estima el Subsidio Familiar SUF según tus cargas acreditadas: $22.601 por carga y $45.202 por cada persona con discapacidad.',
    slug: 'calculadora-subsidio-familiar-suf',
    category: 'familia',
    featured: false,
    phase: 2,
    lastReviewed: '2026-09-26',
    sources: [
      {
        name: 'ChileAtiende — Subsidio Familiar (SUF)',
        url: 'https://www.chileatiende.gob.cl/fichas/33112-subsidio-familiar-suf',
        note: 'Montos vigentes desde el 01-05-2026 (Ley 21.830) y requisitos del beneficio',
      },
    ],
    keywords: [
      'subsidio familiar suf',
      'calculadora suf',
      'cuánto paga el subsidio familiar',
      'suf carga familiar',
      'subsidio por carga chile',
      'suf 22601',
    ],
    inputs: [
      {
        id: 'causantes',
        label: 'Cargas familiares acreditadas (sin discapacidad)',
        type: 'number',
        unit: 'count',
        placeholder: '2',
        required: true,
        min: 0,
        tooltip:
          'Menores de 18 años con las condiciones del beneficio: los menores de 8 deben participar en programas de salud y los mayores de 6 deben ser alumnos regulares.',
      },
      {
        id: 'causantesDiscapacidad',
        label: 'Cargas con discapacidad',
        type: 'number',
        unit: 'count',
        placeholder: '0',
        required: false,
        defaultValue: 0,
        min: 0,
        tooltip:
          'Las personas con discapacidad pueden ser causantes a cualquier edad y el monto sube a $45.202 por cada una.',
      },
      {
        id: 'rsh60',
        label: '¿Tu hogar está dentro del 60% más vulnerable según RSH?',
        type: 'boolean',
        required: false,
        defaultValue: false,
        tooltip:
          'Además se exige no tener previsión social. Con 40% RSH y un causante menor de 18 el SUF puede asignarse automáticamente.',
      },
    ],
    seoTitle: 'Subsidio Familiar SUF 2026: calcula el monto por tus cargas',
    seoDescription:
      'Calcula el Subsidio Familiar (SUF): $22.601 por carga y $45.202 por persona con discapacidad, valores vigentes desde mayo de 2026.',
    faq: [
      {
        question: '¿Cuánto se recibe por cada carga?',
        answer:
          'El beneficio mensual es de $22.601 por cada carga familiar acreditada y de $45.202 si se trata de una persona con discapacidad. Son los montos vigentes desde el 01-05-2026 según la Ley 21.830.',
      },
      {
        question: '¿Quiénes pueden ser causantes del SUF?',
        answer:
          'Menores de 18 años (los menores de 8 deben estar en programas de salud y los mayores de 6 ser alumnos regulares, salvo discapacidad) y personas con discapacidad de cualquier edad. No deben tener un ingreso igual o superior al valor del SUF.',
      },
      {
        question: '¿Qué requisitos debe cumplir el beneficiario?',
        answer:
          'Pertenecer al 60% más vulnerable según el Registro Social de Hogares y no tener previsión social. Si el hogar está dentro del 40% más vulnerable y hay un causante menor de 18 años, el SUF puede asignarse de forma automática.',
      },
      {
        question: '¿Cuánto tiempo dura el beneficio?',
        answer:
          'Tres años mientras se sigan cumpliendo los requisitos. Para causantes menores de edad rige hasta el 31 de diciembre del año en que cumplen 18 años, salvo que sean personas con discapacidad.',
      },
      {
        question: '¿Se puede recibir junto con la asignación familiar?',
        answer:
          'No. El SUF es incompatible con la asignación familiar: debes optar por uno de los dos beneficios.',
      },
    ],
  },
  {
    id: 'subsidio-electrico',
    name: 'Calculadora Subsidio Eléctrico',
    description:
      'Estima el descuento del Subsidio Eléctrico de la 5ª convocatoria según los integrantes de tu hogar: hasta $31.224 en 6 cuotas.',
    slug: 'calculadora-subsidio-electrico',
    category: 'hogar',
    featured: false,
    phase: 2,
    lastReviewed: '2026-09-26',
    sources: [
      {
        name: 'ChileAtiende — Subsidio Eléctrico',
        url: 'https://www.chileatiende.gob.cl/fichas/124375-subsidio-electrico',
        note: 'Tramos y requisitos de la 5ª convocatoria (2º semestre 2026)',
      },
      {
        name: 'Ventanilla Única Social — Subsidio Eléctrico',
        url: 'https://www.ventanillaunicasocial.gob.cl/ficha/381/subsidio-electrico',
        note: 'Ficha oficial del beneficio transitorio',
      },
    ],
    keywords: [
      'subsidio eléctrico',
      'calculadora subsidio eléctrico',
      'descuento cuenta de luz',
      'subsidio luz 2026',
      '5 convocatoria subsidio eléctrico',
      'descuento electricidad hogares',
    ],
    inputs: [
      {
        id: 'integrantes',
        label: 'Integrantes del hogar',
        type: 'number',
        unit: 'count',
        placeholder: '3',
        required: true,
        min: 1,
        tooltip:
          'Tramos de la 5ª convocatoria: 1 integrante $17.346; 2 a 3 integrantes $22.548; 4 o más $31.224.',
      },
      {
        id: 'rsh40',
        label: '¿Tu hogar está dentro del 40% más vulnerable según RSH?',
        type: 'boolean',
        required: false,
        defaultValue: false,
        tooltip:
          'Se exige la Cartola del Hogar (CSE) vigente durante la segunda quincena de mayo de 2026.',
      },
      {
        id: 'electrodependiente',
        label: '¿En tu hogar vive una persona inscrita en el Registro de Pacientes Electrodependientes?',
        type: 'boolean',
        required: false,
        defaultValue: false,
        tooltip:
          'Los hogares con una persona electrodependiente registrada en el RSH acceden por cualquier tramo de vulnerabilidad.',
      },
      {
        id: 'alDiaPago',
        label: '¿Estabas al día en el pago de la cuenta eléctrica al 22-06-2026?',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
    ],
    seoTitle: 'Subsidio Eléctrico 2026: calcula tu descuento en la cuenta de luz',
    seoDescription:
      'Calcula el descuento del Subsidio Eléctrico 5ª convocatoria: hasta $31.224 repartidos en 6 cuotas según los integrantes del hogar.',
    faq: [
      {
        question: '¿El Subsidio Eléctrico es un beneficio permanente?',
        answer:
          'No. Es un beneficio transitorio que aplica durante 2024, 2025 y 2026. Los resultados de la 5ª convocatoria (2º semestre 2026) ya están publicados; aún no hay fechas oficiales de nuevas convocatorias.',
      },
      {
        question: '¿Cuánto descuenta la 5ª convocatoria?',
        answer:
          'Según los integrantes del hogar: $17.346 para 1 integrante, $22.548 para 2 a 3 integrantes y $31.224 para 4 o más. Es el descuento total del semestre julio–diciembre de 2026.',
      },
      {
        question: '¿Cómo se paga el beneficio?',
        answer:
          'El descuento del semestre julio–diciembre 2026 se reparte en 6 cuotas mensuales desde septiembre de 2026, aplicadas directamente en la cuenta de electricidad: $2.891, $3.758 o $5.204 según el tramo.',
      },
      {
        question: '¿Qué requisitos se exigen?',
        answer:
          'Ser mayor de 18 años, ser cliente (arrendatario o propietario) de la distribuidora o cooperativa y estar al día en el pago al 22-06-2026. Además, el hogar debe estar dentro del 40% más vulnerable según RSH, o tener una persona inscrita en el Registro de Pacientes Electrodependientes (cualquier tramo, registrada en el RSH).',
      },
      {
        question: '¿Qué puedo hacer si no quedé seleccionado?',
        answer:
          'El plazo para presentar reposiciones de la 5ª convocatoria finalizó el 19-08-2026. Revisa tu estado en los canales oficiales de ChileAtiende o la Ventanilla Única Social.',
      },
    ],
  },
];

export const calculators: Calculator[] = calculatorCatalog.map((calculator) => ({
  ...calculator,
  methodology: calculatorMethodologies[calculator.id],
}));

/** Calculadoras visibles en home, catálogo, categorías y búsqueda. */
export const discoverableCalculators = calculators.filter((calculator) => !calculator.noIndex);

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(category: Calculator['category']): Calculator[] {
  return discoverableCalculators.filter((c) => c.category === category);
}
