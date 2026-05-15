// ============================================
// Guías profundas (pillar content) — Chile 2026
// ----------------------------------------------
// Cada guía es un artículo de referencia (2000-3500 palabras) que
// agrupa conceptos legales, fórmulas, ejemplos numéricos y enlaces
// a calculadoras y blog posts relacionados.
//
// Convención editorial:
//   - Tono: explicativo, sin jerga innecesaria.
//   - Estructura: H2 por sección principal, H3 para subtemas.
//   - Cada bloque debe poder responder por sí mismo a una intención
//     de búsqueda específica (siempre cierra con un enlace a la
//     calculadora correspondiente).
//   - Bases legales se citan con artículo y ley, idealmente dentro
//     de un <aside class="callout callout--legal">...</aside>.
//   - Ejemplos numéricos van en <div class="numeric-example">...</div>
//     para que sean visualmente prominentes.
//   - Las fuentes oficiales se enlazan a `bcn.cl`, `dt.gob.cl`,
//     `sii.cl`, `bcentral.cl`, `spensiones.cl`, `cmfchile.cl`.
//
// Las guías se renderizan en `/guias/[slug]` con su propio metadata,
// JSON-LD Article + LearningResource + BreadcrumbList, y un bloque
// de calculadoras relacionadas y artículos de blog complementarios.
// ============================================

export interface GuiaSection {
  id: string;
  title: string;
  level: 2 | 3;
  /** HTML serializado del cuerpo de la sección. Usar entidades para `<` y `>`. */
  html: string;
}

export interface Guia {
  slug: string;
  title: string;
  /** Pregunta principal que responde la guía (intent). */
  intent: string;
  description: string;
  category:
    | 'laboral'
    | 'tributario'
    | 'vivienda'
    | 'vehiculos'
    | 'previsional'
    | 'finanzas'
    | 'familia'
    | 'educacion';
  /** Etiqueta legible de la categoría. */
  categoryLabel: string;
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  /** Estimación de tiempo de lectura en minutos. */
  readingTime: number;
  sections: GuiaSection[];
  /** Slugs de calculadoras (sin el prefijo `/calculadoras/`). */
  relatedCalculators: string[];
  /** Slugs de artículos del blog (sin `/blog/`). */
  relatedArticles: string[];
  /** Fuentes oficiales citadas en la guía. */
  sources: { label: string; url: string }[];
}

export const guias: Guia[] = [
  // ============================================
  // 1. Sueldo y descuentos legales en Chile 2026
  // ============================================
  {
    slug: 'sueldo-liquido-chile',
    title: 'Sueldo líquido en Chile 2026: cómo se calcula paso a paso',
    intent: '¿Cuánto recibo de sueldo líquido si gano X bruto?',
    description:
      'Guía completa del sueldo líquido en Chile 2026: AFP, salud, seguro de cesantía, impuesto único, topes imponibles y ejemplos numéricos en pesos chilenos.',
    category: 'laboral',
    categoryLabel: 'Laboral y sueldo',
    keywords: [
      'sueldo líquido chile 2026',
      'cómo calcular sueldo líquido',
      'descuentos legales sueldo',
      'AFP comisión',
      'tope imponible 2026',
      'impuesto segunda categoría',
      'seguro cesantía 0.6%',
      'tasa AFP obligatoria 10%',
      'gratificación legal 25%',
      'sueldo bruto a líquido',
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 16,
    relatedCalculators: [
      'calculadora-sueldo-liquido',
      'calculadora-comparador-afp',
      'calculadora-costo-empleado-pyme',
      'calculadora-impuesto-segunda-categoria',
      'calculadora-gratificacion-legal',
      'calculadora-horas-extra',
    ],
    relatedArticles: [
      'diferencia-sueldo-bruto-liquido',
      'guia-horas-extra-chile',
      'como-funciona-gratificacion-legal',
    ],
    sources: [
      { label: 'Dirección del Trabajo (DT)', url: 'https://www.dt.gob.cl' },
      { label: 'Superintendencia de Pensiones', url: 'https://www.spensiones.cl' },
      { label: 'Servicio de Impuestos Internos (SII)', url: 'https://www.sii.cl' },
      { label: 'Biblioteca del Congreso Nacional (BCN)', url: 'https://www.bcn.cl' },
      { label: 'Código del Trabajo', url: 'https://www.bcn.cl/leychile/navegar?idNorma=207436' },
      { label: 'D.L. 3500 (Sistema de pensiones)', url: 'https://www.bcn.cl/leychile/navegar?idNorma=7147' },
    ],
    sections: [
      {
        id: 'que-es-sueldo-liquido',
        title: '¿Qué es el sueldo líquido?',
        level: 2,
        html: `<p>El <strong>sueldo líquido</strong> es el monto que un trabajador dependiente recibe efectivamente en su cuenta bancaria cada mes después de aplicarse todos los descuentos legales obligatorios. En Chile, la diferencia entre el <strong>sueldo bruto</strong> (lo pactado en el contrato) y el líquido oscila entre un 17% y un 25%, dependiendo del sistema de salud, la AFP elegida y si el sueldo entra o no en tramos del impuesto único de segunda categoría.</p>
<p>La estructura legal de estos descuentos está definida principalmente en el <a href="https://www.bcn.cl/leychile/navegar?idNorma=7147" target="_blank" rel="noopener">D.L. 3500 (sistema de pensiones)</a>, la Ley 18.469 (Régimen de Salud), la Ley 19.728 (Seguro de Cesantía) y los artículos 42 y 43 de la <a href="https://www.bcn.cl/leychile/navegar?idNorma=6368" target="_blank" rel="noopener">Ley sobre Impuesto a la Renta</a>.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>En síntesis</strong><p>De cada $1.000.000 brutos, un trabajador típico recibe entre $770.000 y $830.000 líquidos. La diferencia se distribuye entre AFP (≈11%), salud (7%), cesantía (0,6%) e impuesto único (variable).</p></div></aside>
<ul class="data-grid"><li><span class="data-grid__label">Tope imponible AFP/Salud</span><span class="data-grid__value">89,9 UF</span></li><li><span class="data-grid__label">Tope imponible cesantía</span><span class="data-grid__value">134,9 UF</span></li><li><span class="data-grid__label">Tasa AFP obligatoria</span><span class="data-grid__value">10% + comisión</span></li><li><span class="data-grid__label">Tasa salud mínima</span><span class="data-grid__value">7%</span></li></ul>`,
      },
      {
        id: 'descuentos-obligatorios',
        title: 'Descuentos obligatorios sobre la remuneración bruta',
        level: 2,
        html: `<h3>1. Cotización AFP (10% + comisión variable)</h3>
<p>La cotización obligatoria a la cuenta de capitalización individual es del <strong>10%</strong> sobre la remuneración imponible (D.L. 3500, art. 17). Sobre ese 10% se suma la <strong>comisión variable</strong> que cobra cada AFP y que en 2026 va desde 0,46% (AFP Uno) hasta 1,45% (AFP ProVida). El SIS (Seguro de Invalidez y Sobrevivencia) NO se descuenta al trabajador desde la Ley 20.255 de 2008: lo paga íntegramente el empleador.</p>
<p>En 2026 la <strong>tasa total descontada al trabajador</strong> por AFP queda entre 10,46% (Uno) y 11,45% (ProVida). La diferencia anual entre la AFP más cara y la más barata, sobre un sueldo de $1.000.000, supera los $120.000 — equivalente a un sueldo líquido extra al año.</p>
<table>
<thead><tr><th>AFP</th><th>Comisión 2026</th><th>Total descuento</th><th>Sobre $1M bruto</th></tr></thead>
<tbody>
<tr><td>Uno</td><td>0,46%</td><td>10,46%</td><td>$104.600</td></tr>
<tr><td>Modelo</td><td>0,58%</td><td>10,58%</td><td>$105.800</td></tr>
<tr><td>Planvital</td><td>1,16%</td><td>11,16%</td><td>$111.600</td></tr>
<tr><td>Habitat</td><td>1,27%</td><td>11,27%</td><td>$112.700</td></tr>
<tr><td>Capital</td><td>1,44%</td><td>11,44%</td><td>$114.400</td></tr>
<tr><td>Cuprum</td><td>1,44%</td><td>11,44%</td><td>$114.400</td></tr>
<tr><td>ProVida</td><td>1,45%</td><td>11,45%</td><td>$114.500</td></tr>
</tbody>
</table>

<h3>2. Cotización de salud (7% mínimo)</h3>
<p>El <strong>7% del imponible</strong> va a FONASA o al plan de Isapre. El plan de Isapre puede costar más del 7% legal: en ese caso el trabajador paga el mayor entre 7% y el costo del plan. El monto pactado en UF se transforma a pesos con el valor UF del último día del mes anterior al pago.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Plan de Isapre superior al 7%</strong><p>Si tu plan en UF cuesta más del 7% del imponible, pagas el costo total del plan. Esa diferencia adicional NO rebaja base tributable. Cambiar a un plan más barato o a FONASA puede aumentar tu sueldo líquido entre 1% y 6%.</p></div></aside>

<h3>3. Seguro de cesantía (0,6%)</h3>
<p>Solo aplica a trabajadores con contrato indefinido. El trabajador aporta <strong>0,6%</strong> y el empleador <strong>2,4%</strong> (Ley 19.728). Para contratos a plazo fijo, el trabajador no aporta nada y el empleador paga 3,0%. El tope imponible para cesantía es <strong>134,9 UF</strong> mensuales en 2026, distinto y más alto que el tope de AFP/Salud.</p>

<h3>4. Impuesto único de segunda categoría</h3>
<p>Es un impuesto progresivo que aplica solo sobre el sueldo que excede 13,5 UTM mensuales (~$952.880 con UTM mayo 2026). Se calcula con la tabla del SII (artículo 43 N°1 LIR), que tiene 8 tramos con tasas marginales de 0%, 4%, 8%, 13,5%, 23%, 30,4%, 35% y 40%.</p>
<table>
<thead><tr><th>Tramo en UTM</th><th>Tasa marginal</th><th>Cantidad a rebajar</th></tr></thead>
<tbody>
<tr><td>0 a 13,5 UTM</td><td>0%</td><td>—</td></tr>
<tr><td>13,5 a 30 UTM</td><td>4%</td><td>0,54 UTM</td></tr>
<tr><td>30 a 50 UTM</td><td>8%</td><td>1,74 UTM</td></tr>
<tr><td>50 a 70 UTM</td><td>13,5%</td><td>4,49 UTM</td></tr>
<tr><td>70 a 90 UTM</td><td>23%</td><td>11,14 UTM</td></tr>
<tr><td>90 a 120 UTM</td><td>30,4%</td><td>17,80 UTM</td></tr>
<tr><td>120 a 310 UTM</td><td>35%</td><td>23,32 UTM</td></tr>
<tr><td>Sobre 310 UTM</td><td>40%</td><td>38,82 UTM</td></tr>
</tbody>
</table>`,
      },
      {
        id: 'topes-imponibles',
        title: 'Topes imponibles 2026: 89,9 UF y 134,9 UF',
        level: 2,
        html: `<p>Las cotizaciones de AFP y salud se calculan sobre la <strong>remuneración imponible</strong>, que tiene un tope mensual de <strong>89,9 UF</strong> en 2026 (Superintendencia de Pensiones, circular vigente). Con UF a $40.340 el tope mensual equivale aproximadamente a $3.626.566.</p>
<p>El seguro de cesantía tiene un tope distinto: <strong>134,9 UF</strong> mensuales, lo que da espacio adicional para sueldos altos.</p>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Por qué tu descuento efectivo baja con sueldos altos</strong><p>Si tu sueldo bruto supera $3.626.566, las cotizaciones de AFP y salud se calculan solo sobre el tope. La porción que excede no cotiza, lo que reduce el porcentaje efectivo de descuento. Para un bruto de $5.000.000, el descuento previsional efectivo cae a ~14% del bruto en lugar del 18% típico.</p></div></aside>
<p>El tope se actualiza anualmente cada febrero por la Superintendencia de Pensiones aplicando la variación real de remuneraciones (ISR) calculada por el INE. La memoria 2025-2026 fijó el tope en 89,9 UF, levemente superior al 87,8 UF del año anterior.</p>`,
      },
      {
        id: 'ejemplo-completo',
        title: 'Ejemplo completo paso a paso: bruto $1.500.000',
        level: 2,
        html: `<p>Tomemos un caso concreto y desglosémoslo línea por línea para que puedas replicarlo con tus propios números.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Supuestos del ejemplo</strong><p>AFP Habitat (1,27% comisión), FONASA, contrato indefinido, sin bonos ni horas extra, sin asignaciones no imponibles. UF mayo 2026: $40.340. UTM mayo 2026: $70.588.</p></div></aside>
<div class="numeric-example"><div class="numeric-example__title">Cálculo paso a paso — sueldo bruto $1.500.000</div><ul><li><strong>Imponible</strong>: $1.500.000 (bajo el tope de 89,9 UF = $3.626.566)</li><li><strong>AFP</strong>: $1.500.000 × 11,27% = <code>$169.050</code></li><li><strong>Salud (7% FONASA)</strong>: $1.500.000 × 7% = <code>$105.000</code></li><li><strong>Cesantía (0,6%)</strong>: $1.500.000 × 0,6% = <code>$9.000</code></li><li><strong>Base tributable</strong>: $1.500.000 − ($169.050 + $105.000 + $9.000) = $1.216.950</li><li><strong>Base en UTM</strong>: $1.216.950 ÷ $70.588 ≈ 17,24 UTM</li><li>Tramo: 13,5 a 30 UTM → factor 4%, rebaja 0,54 UTM</li><li><strong>Impuesto</strong>: (17,24 × 0,04 − 0,54) × $70.588 = <code>$10.557</code></li><li><strong>Total descuentos</strong>: $169.050 + $105.000 + $9.000 + $10.557 = $293.607</li></ul><span class="total">Sueldo líquido: $1.206.393 (factor 80,4%)</span></div>
<p>Para validar tu propio cálculo con tu AFP y plan de salud específicos, usa la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a>, que también permite simular cambios de AFP, FONASA vs Isapre y presupuestar el efecto de bonos imponibles.</p>`,
      },
      {
        id: 'gratificacion-legal',
        title: 'Gratificación legal: el 25% que casi nadie entiende',
        level: 2,
        html: `<p>La <strong>gratificación legal</strong> es uno de los conceptos más confusos del derecho laboral chileno. Está regulada por los artículos 47 a 50 del Código del Trabajo: las empresas con fines de lucro y que registren utilidad líquida deben gratificar a sus trabajadores con uno de estos dos sistemas — el que les convenga al empleador:</p>
<ol class="steps">
<li><strong>Gratificación legal A (art. 47)</strong>: 30% de la utilidad líquida del ejercicio, repartida entre los trabajadores en proporción a sus remuneraciones.</li>
<li><strong>Gratificación legal B (art. 50)</strong>: 25% de la remuneración mensual de cada trabajador, con tope anual de 4,75 ingresos mínimos mensuales (≈$2.731.875 en 2026 con sueldo mínimo $575.000).</li>
</ol>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Art. 50 del Código del Trabajo</strong><p>"El empleador podrá eximirse de la obligación si abona a sus trabajadores el 25% de lo devengado mensualmente con tope de 4,75 ingresos mínimos mensuales al año."</p></div></aside>
<p>En la práctica, la inmensa mayoría de empresas chilenas opta por el régimen B (más predecible y siempre acotado). Esto significa que tu sueldo bruto típicamente <em>ya incluye</em> la gratificación: cuando lees "sueldo bruto $1.000.000" en una oferta laboral, lo más probable es que $200.000 sean gratificación legal y $800.000 sueldo base.</p>
<p>Esta distinción importa para:</p>
<ul>
<li><strong>Cálculo del finiquito</strong>: la indemnización por años de servicio se calcula sobre la última remuneración INCLUYENDO gratificación.</li>
<li><strong>Vacaciones</strong>: el día de feriado se calcula con remuneración íntegra incluyendo gratificación.</li>
<li><strong>Ofertas laborales</strong>: pregunta siempre si el "bruto" anunciado incluye gratificación o no.</li>
</ul>
<p>Para calcular tu gratificación específica según tu sueldo, usa la <a href="/calculadoras/calculadora-gratificacion-legal">calculadora de gratificación legal</a>.</p>`,
      },
      {
        id: 'bonos-imponibles-no-imponibles',
        title: 'Bonos imponibles y no imponibles',
        level: 2,
        html: `<p>No todo lo que recibe un trabajador se descuenta de la misma forma. La ley distingue entre haberes <strong>imponibles</strong> (forman base de cotizaciones e impuesto) y haberes <strong>no imponibles</strong> (no se descuentan).</p>
<div class="comparison">
<div class="comparison__header"><div>Imponibles (cotizan)</div><div>No imponibles (no cotizan)</div></div>
<div class="comparison__row"><div>Sueldo base</div><div>Asignación de movilización</div></div>
<div class="comparison__row"><div>Gratificación legal</div><div>Asignación de colación</div></div>
<div class="comparison__row"><div>Comisiones</div><div>Asignación de pérdida de caja</div></div>
<div class="comparison__row"><div>Horas extra</div><div>Asignación de desgaste de herramientas</div></div>
<div class="comparison__row"><div>Bonos por desempeño</div><div>Viáticos efectivos</div></div>
<div class="comparison__row"><div>Bono de antigüedad</div><div>Asignación familiar</div></div>
<div class="comparison__row"><div>Bono de producción</div><div>Indemnización por años de servicio</div></div>
</div>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Atención al recategorizamiento del SII</strong><p>Las asignaciones no imponibles deben ser razonables y proporcionales al gasto real. Si el SII detecta que el monto excede el costo real (por ejemplo, $200.000 mensuales de "movilización" sin justificación), recalifica esa porción como imponible y exige cotizaciones e impuesto retroactivos, más reajustes y multas.</p></div></aside>`,
      },
      {
        id: 'calculo-inverso',
        title: 'Cálculo inverso: ¿cuánto bruto necesito para X líquido?',
        level: 2,
        html: `<p>El cálculo de bruto a líquido no es lineal porque el impuesto único de segunda categoría es progresivo. La forma correcta de obtener el bruto que produce un líquido específico es por <strong>búsqueda iterativa (bisección)</strong>: probar un bruto, calcular el líquido resultante, ajustar y repetir hasta converger.</p>
<p>Como aproximación rápida, puedes usar estos factores típicos para estimar el bruto desde el líquido:</p>
<table>
<thead><tr><th>Líquido objetivo</th><th>Factor aproximado</th><th>Bruto estimado</th></tr></thead>
<tbody>
<tr><td>$500.000</td><td>÷ 0,82</td><td>$610.000</td></tr>
<tr><td>$1.000.000</td><td>÷ 0,80</td><td>$1.250.000</td></tr>
<tr><td>$1.500.000</td><td>÷ 0,77</td><td>$1.950.000</td></tr>
<tr><td>$2.500.000</td><td>÷ 0,72</td><td>$3.470.000</td></tr>
<tr><td>$4.000.000</td><td>÷ 0,68</td><td>$5.880.000</td></tr>
</tbody>
</table>
<p>Nuestra calculadora hace este cálculo iterativo automáticamente cuando activas la opción "cálculo inverso". Para una negociación salarial, lleva ambas cifras (bruto y líquido) calculadas con tu AFP específica para evitar sorpresas.</p>`,
      },
      {
        id: 'errores-comunes',
        title: 'Errores comunes en el cálculo del sueldo líquido',
        level: 2,
        html: `<aside class="callout callout--error"><span class="callout__icon" aria-hidden="true">❌</span><div class="callout__body"><strong>5 errores que vemos siempre</strong><p>Estos son los errores más frecuentes al calcular sueldo líquido manualmente o validar una liquidación de remuneraciones.</p></div></aside>
<ul>
<li><strong>Aplicar el 10% AFP sobre todos los haberes</strong>: solo aplica sobre los <em>imponibles</em> y solo hasta el tope de 89,9 UF.</li>
<li><strong>Olvidar la gratificación legal</strong>: el 25% de gratificación (tope 4,75 IMM/12) sí es imponible y forma parte del sueldo bruto declarado.</li>
<li><strong>Confundir "sueldo base" con "sueldo bruto"</strong>: el bruto incluye base + gratificación + bonos imponibles.</li>
<li><strong>Asumir que el plan de Isapre es siempre 7%</strong>: si el plan cuesta más, el trabajador paga el mayor entre 7% y el plan.</li>
<li><strong>Ignorar el tope imponible</strong>: para sueldos sobre $3,6 M, el descuento efectivo es menor al 22% típico.</li>
<li><strong>Calcular el impuesto sin restar la cantidad a rebajar</strong>: cada tramo del impuesto único tiene una rebaja fija que muchas calculadoras simplistas omiten.</li>
<li><strong>No considerar el aporte solidario adicional</strong>: la Ley 21.735 agrega cotizaciones del empleador (1% en 2025, sube hasta 7% en 2033). Esto NO descuenta al trabajador, pero es relevante para calcular el costo total empleador.</li>
</ul>`,
      },
      {
        id: 'preguntas-frecuentes',
        title: 'Preguntas frecuentes',
        level: 2,
        html: `<h3>¿Las horas extra entran en la base de AFP?</h3>
<p>Sí. El recargo del 50% sobre el valor hora ordinaria se considera remuneración imponible. La <a href="/calculadoras/calculadora-horas-extra">calculadora de horas extra</a> muestra el impacto exacto en cotizaciones.</p>

<h3>¿Cómo afecta cambiarme de AFP?</h3>
<p>El 10% obligatorio es el mismo en todas las AFP. Solo cambia la comisión variable y la rentabilidad histórica del fondo. Para 2026, AFP Uno tiene la comisión más baja (0,46%) y ProVida la más alta (1,45%). Compara con la <a href="/calculadoras/calculadora-comparador-afp">calculadora comparadora de AFP</a>.</p>

<h3>¿El finiquito se calcula con sueldo bruto o líquido?</h3>
<p>Con sueldo bruto, considerando promedio de los últimos 3 meses si la remuneración es variable. La indemnización por años de servicio se calcula sobre la remuneración mensual incluyendo gratificación pero excluyendo colación y movilización (artículo 172 del Código del Trabajo). Lee la <a href="/guias/finiquito-laboral-chile">guía completa del finiquito</a>.</p>

<h3>¿Qué pasa con el aporte adicional del empleador (Ley 21.735)?</h3>
<p>No se descuenta del trabajador. Es un costo del empleador que va al sistema solidario. En 2026 es 1,75% del imponible. No afecta tu sueldo líquido.</p>

<h3>¿Por qué mi liquidación dice "imponible $X" y mi bruto es distinto?</h3>
<p>Porque el imponible excluye haberes no imponibles (movilización, colación) y porque está topado en 89,9 UF. Si tu bruto incluye $50.000 de movilización, tu imponible será $50.000 menor que el bruto.</p>`,
      },
    ],
  },

  // ============================================
  // 2. Finiquito laboral en Chile
  // ============================================
  {
    slug: 'finiquito-laboral-chile',
    title: 'Finiquito laboral en Chile 2026: guía completa con ejemplos',
    intent: '¿Cuánto me corresponde de finiquito si me despiden?',
    description:
      'Guía completa del finiquito en Chile 2026: causales, indemnización, vacaciones proporcionales, plazos legales y ejemplos numéricos en pesos.',
    category: 'laboral',
    categoryLabel: 'Laboral y sueldo',
    keywords: [
      'finiquito chile 2026',
      'cómo calcular finiquito',
      'indemnización años servicio',
      'vacaciones proporcionales',
      'art 161 código del trabajo',
      'recargo art 168',
      'tope 11 años indemnización',
      'plazo pago finiquito',
      'finiquito injustificado',
      'tope 90 UF indemnización',
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 18,
    relatedCalculators: [
      'calculadora-finiquito',
      'calculadora-indemnizacion-anos-servicio',
      'calculadora-vacaciones-proporcionales',
      'calculadora-gratificacion-legal',
      'calculadora-intereses-mora',
    ],
    relatedArticles: [
      'como-calcular-finiquito-chile',
      'calcular-indemnizacion-por-anos',
      'vacaciones-proporcionales-guia',
    ],
    sources: [
      { label: 'Código del Trabajo (BCN)', url: 'https://www.bcn.cl/leychile/navegar?idNorma=207436' },
      { label: 'Dirección del Trabajo', url: 'https://www.dt.gob.cl' },
      { label: 'Comisión para el Mercado Financiero (TMC)', url: 'https://www.cmfchile.cl' },
    ],
    sections: [
      {
        id: 'que-es-finiquito',
        title: '¿Qué es el finiquito?',
        level: 2,
        html: `<p>El <strong>finiquito</strong> es el documento que pone término formal a una relación laboral en Chile. Detalla los pagos finales que el empleador debe al trabajador (sueldos pendientes, vacaciones, gratificación proporcional, indemnización si corresponde) y otorga al empleador un finiquito de obligaciones laborales — siempre que cumpla los requisitos legales de validez.</p>
<p>Está regulado en los artículos 9, 159, 161, 162, 163, 168 y 177 del <a href="https://www.bcn.cl/leychile/navegar?idNorma=207436" target="_blank" rel="noopener">Código del Trabajo</a>.</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Validez del finiquito (art. 177)</strong><p>Para que el finiquito tenga valor liberatorio debe firmarse ante un ministro de fe (notario, inspector del trabajo, presidente del sindicato) y pagarse en su totalidad en el acto. Sin estas formalidades, el trabajador puede impugnar diferencias hasta 2 años después.</p></div></aside>`,
      },
      {
        id: 'componentes-finiquito',
        title: 'Componentes del finiquito',
        level: 2,
        html: `<h3>1. Sueldo devengado</h3>
<p>Días trabajados del último mes que aún no se han pagado. Se calcula como <code>sueldo_mensual × días_trabajados ÷ 30</code>.</p>

<h3>2. Vacaciones proporcionales</h3>
<p>Por cada mes trabajado en el año en curso te corresponden <strong>1,25 días hábiles</strong> (15 días anuales ÷ 12 meses). El valor del día hábil es <code>sueldo_mensual ÷ 30</code>.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo: 8 meses con sueldo $700.000</div><ul><li>Días proporcionales: 8 × 1,25 = <code>10 días</code></li><li>Valor del día: $700.000 ÷ 30 = <code>$23.333</code></li><li>Total vacaciones: 10 × $23.333</li></ul><span class="total">$233.330</span></div>

<h3>3. Vacaciones pendientes</h3>
<p>Días no tomados de períodos anteriores (artículo 67 CT). No prescriben mientras dura la relación laboral. Se pagan al mismo valor que las proporcionales.</p>

<h3>4. Indemnización por años de servicio</h3>
<p>Solo cuando el empleador pone término al contrato sin causa justificada (artículo 161, "necesidades de la empresa") o por mutuo acuerdo con indemnización pactada. Es <strong>30 días de la última remuneración por cada año de servicio o fracción superior a 6 meses</strong>, con tope de 11 años (330 días). La base no puede superar 90 UF (artículo 172).</p>

<h3>5. Gratificación proporcional</h3>
<p>Si el empleador paga gratificación legal mensual, ya está incluida en el sueldo. Si la paga anualmente, se calcula la fracción proporcional al período trabajado en el año.</p>

<h3>6. Indemnización sustitutiva del aviso (art. 162)</h3>
<p>Cuando se invoca el artículo 161, el empleador debe avisar con 30 días de anticipación. Si no avisa, paga una indemnización equivalente a una remuneración mensual.</p>`,
      },
      {
        id: 'causales-y-derechos',
        title: 'Causales de término y qué se paga en cada una',
        level: 2,
        html: `<table>
<thead><tr><th>Causal</th><th>Indemnización años servicio</th><th>Aviso previo</th></tr></thead>
<tbody>
<tr><td>Renuncia voluntaria (art. 159 N°2)</td><td>NO</td><td>30 días al empleador</td></tr>
<tr><td>Mutuo acuerdo (art. 159 N°1)</td><td>Solo si se pacta</td><td>NO</td></tr>
<tr><td>Vencimiento de plazo (art. 159 N°4)</td><td>NO</td><td>NO</td></tr>
<tr><td>Conclusión obra/faena (art. 159 N°5)</td><td>NO</td><td>NO</td></tr>
<tr><td>Caso fortuito o fuerza mayor (art. 159 N°6)</td><td>NO</td><td>NO</td></tr>
<tr><td>Falta de probidad, vías de hecho (art. 160)</td><td>NO</td><td>NO</td></tr>
<tr><td>Necesidades de la empresa (art. 161)</td><td><strong>SÍ</strong></td><td>30 días o pago</td></tr>
<tr><td>Despido injustificado (declarado por tribunal)</td><td><strong>SÍ + recargo</strong></td><td>30 días o pago</td></tr>
</tbody>
</table>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Recargos del art. 168</strong><p>Si el tribunal declara que el despido fue injustificado, indebido o improcedente, la indemnización se incrementa con un recargo del 30%, 50%, 80% o 100% según la causal invocada y desestimada. Para falta de probidad invocada sin pruebas, el recargo es 80%.</p></div></aside>`,
      },
      {
        id: 'ejemplo-finiquito',
        title: 'Ejemplo numérico: despido por necesidades de la empresa',
        level: 2,
        html: `<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Caso del ejemplo</strong><p>Trabajador con sueldo bruto de $900.000, contratado el 1 de marzo 2018, despedido el 15 de julio 2026 (8 años y 4 meses). No le avisaron con 30 días de anticipación. Tiene 8 días pendientes de vacaciones del año anterior.</p></div></aside>
<div class="numeric-example"><div class="numeric-example__title">Cálculo del finiquito</div><ul><li><strong>Días trabajados último mes</strong>: 15 × ($900.000 ÷ 30) = <code>$450.000</code></li><li><strong>Vacaciones proporcionales</strong>: 4 meses × 1,25 = 5 días × $30.000 = <code>$150.000</code></li><li><strong>Vacaciones pendientes</strong>: 8 días × $30.000 = <code>$240.000</code></li><li><strong>Indemnización años servicio</strong>: 8 años × $900.000 = <code>$7.200.000</code> (sin tope, base 25,7 UF está bajo 90 UF)</li><li><strong>Indemnización sustitutiva del aviso</strong>: <code>$900.000</code></li><li>Gratificación proporcional: incluida en el sueldo mensual</li></ul><span class="total">Total finiquito: $8.940.000</span></div>
<p>Para validar tu caso con datos reales (incluyendo gratificación, bonos, recargos por despido injustificado, vacaciones progresivas), usa la <a href="/calculadoras/calculadora-finiquito">calculadora de finiquito</a>.</p>`,
      },
      {
        id: 'plazos-legales',
        title: 'Plazos legales: cuánto tiempo tiene el empleador para pagar',
        level: 2,
        html: `<p>El empleador tiene <strong>10 días hábiles</strong> desde la separación del trabajador para liquidar y pagar el finiquito (artículo 177 CT). Si no paga en ese plazo, el trabajador puede:</p>
<ol class="steps">
<li>Presentar reclamo administrativo en la <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Inspección del Trabajo</a> (gratuito, online).</li>
<li>Demandar laboralmente — el plazo de prescripción es de <strong>2 años</strong> desde el término del contrato (artículo 510 CT) — o <strong>6 meses</strong> si la demanda es por nulidad de despido (Ley Bustos).</li>
<li>Solicitar intereses de mora desde el día 11. Para ello se usa la Tasa Máxima Convencional (TMC) que publica mensualmente la <a href="https://www.cmfchile.cl" target="_blank" rel="noopener">CMF</a>.</li>
</ol>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Ley Bustos (nulidad del despido)</strong><p>Si el empleador no había pagado las cotizaciones previsionales al momento del despido, el contrato se considera vigente hasta el pago de cotizaciones. El trabajador tiene derecho a las remuneraciones del período entre el despido y la convalidación (a veces 12+ meses), no solo al finiquito.</p></div></aside>
<p>Para calcular intereses por finiquito impago, usa la <a href="/calculadoras/calculadora-intereses-mora">calculadora de intereses de mora</a>.</p>`,
      },
      {
        id: 'requisitos-validez',
        title: 'Requisitos de validez del finiquito',
        level: 2,
        html: `<p>Un finiquito mal hecho puede impugnarse posteriormente. Para tener fuerza liberatoria debe:</p>
<ul>
<li>Constar por escrito en un documento firmado por ambas partes.</li>
<li>Ratificarse ante <strong>ministro de fe</strong>: notario público, inspector del trabajo, oficial del registro civil o presidente del sindicato.</li>
<li>Detallar conceptos y montos pagados (no solo un total agregado).</li>
<li>Pagarse íntegramente en el acto. Si se paga en cuotas, debe quedar expreso y la firma libera solo lo pagado.</li>
<li>Indicar la causal invocada con el artículo del Código del Trabajo.</li>
</ul>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Reserva de derechos</strong><p>El trabajador puede firmar el finiquito "con reserva de derechos", lo que le permite reclamar diferencias posteriores sin renunciar a las cantidades pagadas. Si tienes dudas, no firmes "renunciando a toda acción" — pide expresamente reserva.</p></div></aside>`,
      },
      {
        id: 'errores-frecuentes',
        title: 'Errores frecuentes en el cálculo del finiquito',
        level: 2,
        html: `<aside class="callout callout--error"><span class="callout__icon" aria-hidden="true">❌</span><div class="callout__body"><strong>Estos errores cuestan dinero</strong><p>Los siguientes son errores frecuentes que vemos en finiquitos calculados manualmente o por software desactualizado.</p></div></aside>
<ul>
<li><strong>No considerar gratificación al calcular indemnización</strong>: la base incluye sueldo + gratificación legal pagada (Dictamen DT 1.067/0021).</li>
<li><strong>Aplicar tope de 11 años cuando el contrato es anterior al 14/08/1981</strong>: para esos casos no aplica el tope (artículo 7 transitorio Ley 19.010).</li>
<li><strong>Calcular vacaciones con días corridos en vez de hábiles</strong>: los 15 días anuales son <em>hábiles</em> (lunes a viernes, sin feriados).</li>
<li><strong>Olvidar la indemnización sustitutiva del aviso</strong>: si despiden sin avisar 30 días antes, hay que sumar una remuneración mensual.</li>
<li><strong>No proporcionar más de 6 meses</strong>: una fracción mayor a 6 meses se cuenta como año completo.</li>
<li><strong>Aplicar el tope de 90 UF cuando no corresponde</strong>: el tope solo aplica a la BASE (remuneración mensual), no al monto total del finiquito.</li>
<li><strong>Calcular vacaciones progresivas mal</strong>: tras 10 años el trabajador suma +1 día cada 3 nuevos años, con máximo 5 días extra.</li>
</ul>`,
      },
    ],
  },

  // ============================================
  // 3. UF, UTM e IPC en Chile
  // ============================================
  {
    slug: 'uf-utm-indicadores-chile',
    title: 'UF, UTM e IPC en Chile: la guía definitiva 2026',
    intent: '¿Qué son y cómo se usan la UF, UTM e IPC?',
    description:
      'Guía completa de los indicadores económicos chilenos: UF, UTM, UTA, IPC, IPSA y dólar observado. Cómo se calculan, dónde se usan y conversión a pesos.',
    category: 'finanzas',
    categoryLabel: 'Educación financiera',
    keywords: [
      'UF chile 2026',
      'UTM chile',
      'UTA',
      'IPC chile',
      'unidad fomento',
      'unidad tributaria mensual',
      'banco central chile',
      'INE',
      'reajuste UF diario',
      'TPM TMC',
      'dólar observado',
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 13,
    relatedCalculators: [
      'calculadora-uf-clp',
      'calculadora-utm-clp',
      'calculadora-conversor-divisas',
      'calculadora-reajuste-arriendo',
    ],
    relatedArticles: ['todo-sobre-uf-chile', 'reajuste-arriendo-uf-2026'],
    sources: [
      { label: 'Banco Central de Chile', url: 'https://www.bcentral.cl' },
      { label: 'Servicio de Impuestos Internos', url: 'https://www.sii.cl' },
      { label: 'Instituto Nacional de Estadísticas', url: 'https://www.ine.gob.cl' },
      { label: 'Comisión para el Mercado Financiero', url: 'https://www.cmfchile.cl' },
    ],
    sections: [
      {
        id: 'que-es-uf',
        title: '¿Qué es la UF (Unidad de Fomento)?',
        level: 2,
        html: `<p>La <strong>Unidad de Fomento</strong> es una unidad de cuenta reajustable creada por el Decreto 40 del 20 de enero de 1967. Su valor se actualiza diariamente según la variación del Índice de Precios al Consumidor (IPC) del mes anterior. El <a href="https://www.bcentral.cl" target="_blank" rel="noopener">Banco Central de Chile</a> es responsable de calcular y publicar el valor de la UF.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Fórmula del reajuste UF</strong><p><code>UF_día_t = UF_día_t-1 × (1 + IPC_mes_anterior)^(1/d)</code>, donde <em>d</em> es el número de días del período de reajuste (mes a mes calendario, desde el día 10 de cada mes hasta el día 9 del siguiente).</p></div></aside>
<ul class="data-grid"><li><span class="data-grid__label">Valor UF mayo 2026</span><span class="data-grid__value">$40.340</span></li><li><span class="data-grid__label">UF al cierre 2025</span><span class="data-grid__value">$38.890</span></li><li><span class="data-grid__label">Variación 12 meses</span><span class="data-grid__value">+3,73%</span></li><li><span class="data-grid__label">Frecuencia</span><span class="data-grid__value">Diaria</span></li></ul>`,
      },
      {
        id: 'donde-se-usa-uf',
        title: '¿Dónde se usa la UF?',
        level: 2,
        html: `<ul>
<li><strong>Créditos hipotecarios</strong>: el saldo y los dividendos se denominan en UF. La cuota en pesos varía mes a mes con el IPC.</li>
<li><strong>Arriendos de oficinas y propiedades altas</strong>: muchos contratos pactan el canon en UF para protegerse de la inflación.</li>
<li><strong>Seguros de vida y salud</strong>: las primas y coberturas suelen expresarse en UF.</li>
<li><strong>Tope imponible AFP/Salud (89,9 UF) y cesantía (134,9 UF)</strong>: los topes legales mensuales se ajustan automáticamente con la UF.</li>
<li><strong>Subsidios habitacionales</strong>: los topes de propiedad y montos de subsidio (DS49, DS01, DS19) se expresan en UF.</li>
<li><strong>Plusvalía inmobiliaria</strong>: la exención de 8.000 UF para vivienda habitual está en UF acumuladas.</li>
<li><strong>Multas SII</strong>: muchas multas tributarias se expresan en UTM o UF.</li>
<li><strong>Pago de matrículas universitarias</strong>: instituciones privadas suelen expresarlas en UF.</li>
</ul>`,
      },
      {
        id: 'que-es-utm',
        title: '¿Qué es la UTM y la UTA?',
        level: 2,
        html: `<p>La <strong>Unidad Tributaria Mensual</strong> es un indicador <em>mensual</em> reajustado según el IPC. Se usa principalmente en el ámbito tributario y para multas. La <a href="https://www.sii.cl" target="_blank" rel="noopener">SII</a> publica el valor cada mes.</p>
<p>La UTA (Unidad Tributaria Anual) es simplemente <strong>UTM × 12</strong>, y se usa para los tramos del Impuesto Global Complementario y la Operación Renta.</p>
<div class="comparison">
<div class="comparison__header"><div>UF</div><div>UTM</div></div>
<div class="comparison__row"><div>Reajuste diario por IPC</div><div>Reajuste mensual por IPC</div></div>
<div class="comparison__row"><div>Contratos privados, créditos, arriendos</div><div>Impuestos, multas, trámites públicos</div></div>
<div class="comparison__row"><div>≈ $40.340 (mayo 2026)</div><div>≈ $70.588 (mayo 2026)</div></div>
<div class="comparison__row"><div>Publicada por Banco Central</div><div>Publicada por SII</div></div>
<div class="comparison__row"><div>Origen: 1967</div><div>Origen: 1974 (reforma tributaria)</div></div>
</div>
<p>Para convertir entre UF/UTM y pesos chilenos, usa el <a href="/calculadoras/calculadora-uf-clp">conversor UF→CLP</a> o <a href="/calculadoras/calculadora-utm-clp">conversor UTM→CLP</a>.</p>`,
      },
      {
        id: 'ipc-chile',
        title: '¿Qué es el IPC?',
        level: 2,
        html: `<p>El <strong>Índice de Precios al Consumidor</strong> mide la variación de precios de una canasta básica de bienes y servicios. Lo calcula y publica mensualmente el <a href="https://www.ine.gob.cl" target="_blank" rel="noopener">Instituto Nacional de Estadísticas (INE)</a> con los datos del mes anterior, alrededor del día 8 de cada mes.</p>
<p>El IPC es la variable maestra que determina el reajuste de UF, UTM, salarios mínimos, pensiones (PGU), arriendos en pesos y tarifas eléctricas. Un IPC anual de 4% significa que UF, UTM y otros indicadores aumentaron aproximadamente 4% en el año.</p>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>IPC vs IPC subyacente</strong><p>El IPC oficial incluye toda la canasta. El "IPC subyacente" excluye alimentos volátiles y energía, y es el que el Banco Central usa para decisiones de política monetaria porque refleja mejor las presiones inflacionarias estructurales.</p></div></aside>
<p>El IPC se descompone en 12 divisiones (alimentos, vivienda, transporte, salud, educación, etc.). Los datos completos están en el portal del INE.</p>`,
      },
      {
        id: 'dolar-y-otros',
        title: 'Dólar, euro y otros indicadores',
        level: 2,
        html: `<h3>Dólar observado vs dólar acuerdo</h3>
<p>El <strong>dólar observado</strong> es el promedio ponderado de las transacciones del día anterior en el mercado cambiario formal. El Banco Central lo publica diariamente y es el valor que usa el SII para impuestos. El <strong>dólar acuerdo</strong> (también llamado paridad) es un valor de referencia que algunos contratos invocan.</p>

<h3>Euro</h3>
<p>El euro observado se publica también diariamente. La paridad EUR/USD oscila entre 1,05 y 1,15 históricamente, así que el euro está aproximadamente un 8% sobre el dólar en pesos chilenos.</p>

<h3>TPM y TMC</h3>
<p>La <strong>Tasa de Política Monetaria</strong> es la tasa de referencia que fija el Consejo del Banco Central. Sirve de piso para la mayoría de las tasas del mercado. La <strong>Tasa Máxima Convencional (TMC)</strong> la publica mensualmente la <a href="https://www.cmfchile.cl" target="_blank" rel="noopener">CMF</a> y es el techo legal para créditos según la Ley 18.010. Si un crédito te cobra más TMC, ese exceso es nulo de pleno derecho.</p>`,
      },
      {
        id: 'fuentes-oficiales',
        title: 'Fuentes oficiales de los indicadores',
        level: 2,
        html: `<ul>
<li><strong>UF, dólar, euro</strong>: <a href="https://www.bcentral.cl/inicio/indicadores" target="_blank" rel="noopener">bcentral.cl/indicadores</a> (oficial). Espejo público en mindicador.cl.</li>
<li><strong>UTM, UTA</strong>: <a href="https://www.sii.cl/valores_y_fechas/utm/utm2026.htm" target="_blank" rel="noopener">sii.cl</a>.</li>
<li><strong>IPC</strong>: <a href="https://www.ine.gob.cl/estadisticas/economia/indices-de-precio-e-inflacion" target="_blank" rel="noopener">ine.gob.cl</a>.</li>
<li><strong>TMC mensual</strong>: <a href="https://www.cmfchile.cl/portal/principal/613/w3-propertyvalue-19272.html" target="_blank" rel="noopener">cmfchile.cl</a>.</li>
<li><strong>TPM</strong>: <a href="https://www.bcentral.cl/web/banco-central/areas/politica-monetaria/tasa-de-politica-monetaria" target="_blank" rel="noopener">bcentral.cl</a>.</li>
</ul>
<aside class="callout callout--success"><span class="callout__icon" aria-hidden="true">✅</span><div class="callout__body"><strong>Datos actualizados a diario</strong><p>En CalculaChile, los valores se actualizan automáticamente cada 24 horas vía GitHub Actions desde mindicador.cl con respaldo en las series oficiales del Banco Central. Tus cálculos siempre usan la cifra del día.</p></div></aside>`,
      },
    ],
  },

  // ============================================
  // 4. IVA y Boleta de Honorarios
  // ============================================
  {
    slug: 'iva-boleta-honorarios-chile',
    title: 'IVA y boleta de honorarios en Chile 2026: guía tributaria',
    intent: '¿Cómo funcionan el IVA y las boletas de honorarios?',
    description:
      'Guía completa del IVA (19%) y la boleta de honorarios en Chile 2026. Cuándo aplicar, cómo emitir, retención del 15,25% y obligaciones tributarias.',
    category: 'tributario',
    categoryLabel: 'Impuestos y tributos',
    keywords: [
      'IVA chile 2026',
      '19% IVA',
      'boleta honorarios',
      'retención 15.25%',
      'ley 21.578',
      'SII',
      'impuesto valor agregado',
      'operación renta independientes',
      'PPM',
      'cotización independientes',
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 15,
    relatedCalculators: [
      'calculadora-iva',
      'calculadora-boleta-honorarios',
      'calculadora-operacion-renta',
      'calculadora-cotizacion-independientes',
      'calculadora-ppm',
    ],
    relatedArticles: ['guia-iva-chile-2026', 'boleta-honorarios-completo'],
    sources: [
      { label: 'Servicio de Impuestos Internos', url: 'https://www.sii.cl' },
      { label: 'Ley sobre Impuesto a las Ventas y Servicios (DL 825)', url: 'https://www.bcn.cl/leychile/navegar?idNorma=6369' },
      { label: 'Ley 21.578 (calendario retención honorarios)', url: 'https://www.bcn.cl/leychile/navegar?idNorma=1191980' },
    ],
    sections: [
      {
        id: 'que-es-iva',
        title: '¿Qué es el IVA?',
        level: 2,
        html: `<p>El <strong>Impuesto al Valor Agregado</strong> es un tributo indirecto chileno con tasa única del <strong>19%</strong>. Grava la venta de bienes muebles, prestación de servicios e importaciones (DL 825 de 1974). Lo paga finalmente el consumidor, pero se recauda en cada eslabón de la cadena productiva mediante el mecanismo de débito y crédito fiscal.</p>
<p>Una empresa cobra IVA en sus ventas (<strong>débito fiscal</strong>) y paga IVA en sus compras (<strong>crédito fiscal</strong>). En el Formulario 29 mensual declara la diferencia: si el débito supera al crédito, paga; si el crédito supera al débito, lo arrastra al mes siguiente.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Tasa única desde 2003</strong><p>Chile mantiene la tasa de IVA en 19% desde octubre de 2003 (antes era 18%). Es una de las tasas más altas de Latinoamérica para tributos al consumo, comparada con 16% en México o 21% en Argentina.</p></div></aside>`,
      },
      {
        id: 'calculo-iva',
        title: 'Cómo calcular el IVA',
        level: 2,
        html: `<h3>Agregar IVA al precio neto</h3>
<p><code>precio_bruto = precio_neto × 1,19</code></p>

<h3>Quitar IVA al precio bruto</h3>
<p><code>precio_neto = precio_bruto ÷ 1,19</code></p>

<h3>Solo el IVA</h3>
<p><code>iva = precio_neto × 0,19</code> o <code>iva = precio_bruto − precio_bruto/1,19</code></p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo: producto con precio neto de $100.000</div><ul><li>Precio neto: $100.000</li><li>IVA (19%): $19.000</li><li>Precio bruto facturado: $119.000</li></ul><span class="total">Cliente paga: $119.000 — empresa entera $19.000 al SII</span></div>
<p>Para evitar errores de redondeo, usa la <a href="/calculadoras/calculadora-iva">calculadora de IVA</a> que también permite calcular en sentido inverso (de bruto a neto).</p>`,
      },
      {
        id: 'exenciones-iva',
        title: 'Bienes y servicios exentos de IVA',
        level: 2,
        html: `<p>El artículo 12 del DL 825 lista los bienes y servicios exentos:</p>
<ul>
<li>Servicios profesionales prestados por personas naturales (van con boleta de honorarios, no con factura).</li>
<li>Servicios de educación.</li>
<li>Salud prestada por hospitales, clínicas y profesionales.</li>
<li>Transporte público de pasajeros.</li>
<li>Seguros de vida y salud.</li>
<li>Venta de libros, diarios y revistas.</li>
<li>Servicios financieros (intereses bancarios, depósitos).</li>
<li>Exportaciones de bienes.</li>
</ul>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Reforma Ley 21.420 (2022)</strong><p>Desde el 1 de enero de 2023, los servicios profesionales prestados por <em>sociedades</em> sí están afectos a IVA, salvo que se constituyan como sociedad de profesionales clasificada en 2da categoría. Esto cambió radicalmente el panorama tributario para empresas de consultoría.</p></div></aside>`,
      },
      {
        id: 'boleta-honorarios',
        title: 'Boleta de honorarios: qué es y cuándo emitir',
        level: 2,
        html: `<p>La <strong>boleta de honorarios electrónica</strong> es el documento tributario que emiten las personas naturales por servicios profesionales independientes. Se emite en el portal del SII, no requiere imprimirse y se envía por correo al pagador.</p>
<p>Pueden emitirla profesionales (abogados, médicos, ingenieros), técnicos (contadores, diseñadores, programadores) y trabajadores que prestan servicios sin relación laboral. La emisión es <strong>electrónica obligatoria</strong> desde 2017.</p>`,
      },
      {
        id: 'retencion-honorarios',
        title: 'Retención de la boleta de honorarios (Ley 21.578)',
        level: 2,
        html: `<p>Cuando el pagador es una empresa o institución, debe <strong>retener una porción del bruto</strong> y enterarla al SII al mes siguiente. Si el pagador es una persona natural, no hay retención y el receptor declara y paga directamente.</p>
<p>La <strong>Ley 21.578 de 2023</strong> estableció un calendario progresivo de retención que sube del 14,5% en 2025 al 17% en 2028:</p>
<table>
<thead><tr><th>Año</th><th>Retención total</th><th>Impuesto renta</th><th>Cotización previsional</th></tr></thead>
<tbody>
<tr><td>2025</td><td>14,5%</td><td>10%</td><td>4,5%</td></tr>
<tr><td><strong>2026</strong></td><td><strong>15,25%</strong></td><td>10%</td><td>5,25%</td></tr>
<tr><td>2027</td><td>16%</td><td>10%</td><td>6%</td></tr>
<tr><td>2028</td><td>17%</td><td>10%</td><td>7%</td></tr>
</tbody>
</table>
<p>La porción "cotización previsional" se descompone en AFP, salud (FONASA o Isapre), SIS y Mutual de Seguridad. La distribución exacta la fija la Subsecretaría de Previsión Social cada año.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo 2026: boleta bruta $1.000.000</div><ul><li>Bruto facturado: $1.000.000</li><li>Retención total (15,25%): $152.500</li><li>— Impuesto renta (10%): $100.000</li><li>— Cotización previsional (5,25%): $52.500</li></ul><span class="total">Líquido recibido: $847.500</span></div>`,
      },
      {
        id: 'exencion-honorarios',
        title: 'Exenciones y casos especiales',
        level: 2,
        html: `<ul>
<li><strong>Boletas bajo 5 UTM mensuales</strong>: el SII no exige cotización obligatoria si el total anual está bajo 7,5 UTA. La retención de impuesto sigue aplicando en su totalidad.</li>
<li><strong>Profesionales con régimen de gastos efectivos</strong>: pueden rebajar gastos reales (oficina, vehículo, tecnología) en lugar de la presunción 30% del artículo 50.</li>
<li><strong>Pensionados</strong>: pueden eximirse de la cotización previsional adicional con declaración jurada anual.</li>
<li><strong>Mujeres mayores de 50 años con cotizaciones mínimas</strong>: pueden eximirse de la cotización previsional obligatoria.</li>
</ul>
<p>Para calcular tu boleta líquida considerando el año vigente y tu situación específica, usa la <a href="/calculadoras/calculadora-boleta-honorarios">calculadora de boleta de honorarios</a>.</p>`,
      },
      {
        id: 'operacion-renta-independientes',
        title: 'Operación Renta para independientes',
        level: 2,
        html: `<p>En abril de cada año, los profesionales independientes deben presentar el Formulario 22 (Declaración de Impuesto a la Renta). El proceso es:</p>
<ol class="steps">
<li>El SII totaliza tus boletas emitidas en el año calendario anterior.</li>
<li>Aplica la presunción de gastos del 30% (Art. 50 LIR), con tope de 15 UTA anuales — o tus gastos efectivos si optaste por ese régimen.</li>
<li>Calcula el impuesto según los tramos progresivos en UTA (8% – 40%).</li>
<li>Te descuenta lo retenido a lo largo del año (PPM = retenciones de boletas).</li>
<li>Si el PPM excede el impuesto, recibes <strong>devolución</strong>; si fue insuficiente, debes <strong>pagar la diferencia</strong>.</li>
</ol>
<p>Los tramos UTA 2026 son: 0% hasta 8 UTA, 4% hasta 16, 8% hasta 24, 13,5% hasta 32, 23% hasta 48, 30% hasta 64, 35% hasta 96, 40% sobre 96. Una UTA en 2026 ≈ $847.060, así que el primer tramo gravado empieza sobre los ~$6,8 millones anuales.</p>
<p>Para estimar tu Operación Renta, usa la <a href="/calculadoras/calculadora-operacion-renta">calculadora de operación renta</a>.</p>`,
      },
    ],
  },

  // ============================================
  // 5. Crédito hipotecario en Chile
  // ============================================
  {
    slug: 'credito-hipotecario-chile',
    title: 'Crédito hipotecario en Chile 2026: guía completa',
    intent: '¿Cómo funciona un crédito hipotecario y cuánto pagaré?',
    description:
      'Guía del crédito hipotecario en Chile 2026: dividendo en UF, CAE real, seguros, pie mínimo, capacidad de endeudamiento y simuladores.',
    category: 'vivienda',
    categoryLabel: 'Vivienda y hogar',
    keywords: [
      'crédito hipotecario chile 2026',
      'dividendo UF',
      'CAE crédito',
      'seguro desgravamen',
      'seguro incendio',
      'pie crédito hipotecario',
      'capacidad endeudamiento 25%',
      'tasa hipotecaria 2026',
      'prepago hipotecario',
      'tabla amortización francesa',
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 16,
    relatedCalculators: [
      'calculadora-credito-hipotecario',
      'calculadora-uf-clp',
      'calculadora-subsidio-habitacional',
      'calculadora-costo-notaria',
      'calculadora-contribuciones',
    ],
    relatedArticles: ['todo-sobre-uf-chile', 'reajuste-arriendo-uf-2026'],
    sources: [
      { label: 'Comisión para el Mercado Financiero (CMF)', url: 'https://www.cmfchile.cl' },
      { label: 'SERNAC Financiero', url: 'https://www.sernac.cl/portal/604/w3-propertyname-1056.html' },
      { label: 'Banco Central de Chile', url: 'https://www.bcentral.cl' },
    ],
    sections: [
      {
        id: 'estructura-credito',
        title: 'Estructura de un crédito hipotecario',
        level: 2,
        html: `<p>Un crédito hipotecario chileno típico se estructura así:</p>
<ul class="data-grid"><li><span class="data-grid__label">Monto del crédito</span><span class="data-grid__value">80%-90% valor</span></li><li><span class="data-grid__label">Plazo típico</span><span class="data-grid__value">20-25 años</span></li><li><span class="data-grid__label">Tasa anual UF</span><span class="data-grid__value">4,5%-6,5%</span></li><li><span class="data-grid__label">Sistema</span><span class="data-grid__value">Francés (cuota fija UF)</span></li></ul>
<p>El saldo crece y decrece con la UF, así que la cuota en pesos cambia mes a mes. La fórmula del dividendo (PMT) es:</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Fórmula de amortización francesa</strong><p><code>PMT = P × r(1+r)^n / ((1+r)^n − 1)</code> donde <em>P</em> es el monto financiado en UF, <em>r</em> es la tasa mensual (anual/12) y <em>n</em> es el número de cuotas.</p></div></aside>`,
      },
      {
        id: 'pie-y-financiamiento',
        title: 'Pie: el pago inicial',
        level: 2,
        html: `<p>El <strong>pie</strong> es el porcentaje del valor de la propiedad que el comprador aporta de su bolsillo. Los bancos chilenos exigen pies que van del 10% al 20%, aunque algunos exigen 30% para extranjeros o para inmuebles de inversión.</p>
<table>
<thead><tr><th>Tipo</th><th>Pie típico</th><th>Quién aplica</th></tr></thead>
<tbody>
<tr><td>Subsidio (DS01, DS19)</td><td>10%</td><td>Vivienda principal con subsidio</td></tr>
<tr><td>Estándar</td><td>20%</td><td>Vivienda principal sin subsidio</td></tr>
<tr><td>Inversión / segundas viviendas</td><td>30%</td><td>Propiedades para arriendo</td></tr>
<tr><td>Extranjeros sin RUT definitivo</td><td>30%-40%</td><td>Residentes recientes</td></tr>
</tbody>
</table>
<p>El subsidio habitacional puede contar como pie. Por ejemplo, una vivienda de 2.500 UF con un subsidio DS01 de 600 UF y ahorro de 50 UF requiere financiar 1.850 UF (74%).</p>`,
      },
      {
        id: 'capacidad-endeudamiento',
        title: 'Capacidad de endeudamiento: la regla del 25%',
        level: 2,
        html: `<p>Los bancos no aprueban créditos cuyo dividendo mensual supere el <strong>25% del ingreso líquido</strong> del deudor. Esto es una práctica de la industria, no una norma legal, pero está alineada con la <a href="https://www.cmfchile.cl/educa/621/w3-article-27160.html" target="_blank" rel="noopener">recomendación de la CMF</a> sobre endeudamiento responsable.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo: capacidad para sueldo líquido $1.500.000</div><ul><li>Sueldo líquido mensual: $1.500.000</li><li>Dividendo máximo (25%): $375.000</li><li>Dividendo en UF (≈$40.340): ≈ 9,3 UF/mes</li><li>A 25 años, tasa 5%: capacidad de financiamiento</li></ul><span class="total">Crédito máximo aprox.: 1.590 UF (≈ $64 millones)</span></div>
<p>Algunos bancos relajan el criterio al 30% o 35% para profesionales con ingresos altos y estables. Otros exigen 22% para deudores con créditos de consumo previos.</p>`,
      },
      {
        id: 'cae-real',
        title: 'CAE: la tasa que importa',
        level: 2,
        html: `<p>La <strong>Carga Anual Equivalente</strong> (Ley 19.496 + Ley 20.555 SERNAC Financiero) es la tasa anual efectiva que iguala el valor presente de TODOS los pagos del crédito al monto entregado. Incluye:</p>
<ul>
<li>Tasa de interés nominal del crédito.</li>
<li>Seguro de desgravamen (sobre saldo insoluto).</li>
<li>Seguro de incendio (sobre monto original).</li>
<li>Comisiones de administración.</li>
<li>Cargos por estados de cuenta y mantención.</li>
</ul>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Compara CAE, no tasa nominal</strong><p>Para un crédito de 2.500 UF a 4,5% nominal, la CAE típica está entre 5,1% y 5,8% según los seguros incluidos. Un banco con tasa nominal 4,7% pero seguros baratos puede ser más barato que otro con 4,5% nominal y seguros altos. Pide siempre la CAE oficial.</p></div></aside>
<p>La <a href="/calculadoras/calculadora-credito-hipotecario">calculadora de crédito hipotecario</a> calcula la CAE real por TIR (tasa interna de retorno), tomando en cuenta el flujo mensual completo en lugar de aproximaciones simplistas.</p>`,
      },
      {
        id: 'seguros-obligatorios',
        title: 'Seguros obligatorios: desgravamen e incendio',
        level: 2,
        html: `<h3>Seguro de desgravamen</h3>
<p>Cubre el saldo del crédito si el deudor fallece o queda con incapacidad permanente. Es <strong>obligatorio para créditos hipotecarios</strong>. La prima mensual oscila entre 0,02% y 0,05% del saldo insoluto. Como el saldo decrece, el costo del desgravamen también decrece mes a mes.</p>

<h3>Seguro de incendio</h3>
<p>Cubre la propiedad ante siniestros (incendio, terremoto, daños estructurales). También obligatorio. La prima se calcula sobre el monto reconstrucción de la propiedad y suele costar 0,01% a 0,03% mensual sobre ese monto.</p>

<aside class="callout callout--success"><span class="callout__icon" aria-hidden="true">✅</span><div class="callout__body"><strong>Derecho a contratar seguros con cualquier compañía (Ley 19.496)</strong><p>Puedes contratar el seguro con cualquier compañía autorizada, no solo con la del banco. El banco está obligado a aceptar la póliza si cumple las condiciones mínimas. Esto puede generar ahorros del 30%-50% en seguros frente a las pólizas atadas que ofrecen los bancos.</p></div></aside>`,
      },
      {
        id: 'gastos-asociados',
        title: 'Gastos asociados al crédito',
        level: 2,
        html: `<p>Más allá del dividendo, comprar una propiedad con crédito implica gastos de una sola vez:</p>
<table>
<thead><tr><th>Concepto</th><th>Monto típico</th><th>Quién paga</th></tr></thead>
<tbody>
<tr><td>Tasación</td><td>3-5 UF</td><td>Comprador</td></tr>
<tr><td>Estudio de títulos</td><td>5-10 UF</td><td>Comprador</td></tr>
<tr><td>Notaría (escritura)</td><td>0,2%-0,5% del valor</td><td>Comprador</td></tr>
<tr><td>Conservador de Bienes Raíces</td><td>0,2% del valor (mín. $30.000)</td><td>Comprador</td></tr>
<tr><td>Impuesto timbres y estampillas</td><td>0,8% del mutuo</td><td>Comprador</td></tr>
</tbody>
</table>
<p>En total, los gastos de cierre suelen sumar 1,5%-3% del valor de la propiedad. Para una propiedad de UF 3.000 (≈$120 millones), eso son $1,8 a $3,6 millones adicionales al pie. Calcula los costos de notaría con la <a href="/calculadoras/calculadora-costo-notaria">calculadora de costo notaría</a>.</p>`,
      },
      {
        id: 'prepago',
        title: 'Prepago: cuándo conviene',
        level: 2,
        html: `<p>La Ley 19.496 (artículo 17 D) garantiza al deudor el derecho a <strong>prepagar parcial o totalmente</strong> el crédito en cualquier momento, con una comisión de prepago máxima de 1,5 mensualidades del crédito.</p>
<p>El prepago en años tempranos del crédito tiene mayor impacto porque al inicio la mayor parte del dividendo va a intereses. Prepagar 200 UF en el año 2 de un crédito a 25 años puede ahorrar el doble de intereses que prepagar la misma cantidad en el año 15.</p>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Estrategia: prepago vs invertir</strong><p>Si la rentabilidad esperada de tus inversiones (después de impuestos) es superior a la CAE real del crédito, financieramente conviene invertir en lugar de prepagar. Si no, prepagar reduce años de intereses garantizados. Las matemáticas son claras pero el factor psicológico de quedar libre de hipoteca también pesa.</p></div></aside>
<p>La <a href="/calculadoras/calculadora-credito-hipotecario">calculadora hipotecaria</a> permite simular el impacto exacto de prepagos en distintos meses.</p>`,
      },
    ],
  },

  // ============================================
  // 6. Pensiones, AFP y reforma previsional
  // ============================================
  {
    slug: 'afp-pension-chile',
    title: 'AFP, pensiones y reforma previsional en Chile 2026',
    intent: '¿Cómo funciona la pensión en Chile y cuánto recibiré?',
    description:
      'Guía del sistema previsional chileno 2026: cotizaciones AFP, PGU, reforma Ley 21.735, comparación de comisiones y cómo estimar tu pensión futura.',
    category: 'previsional',
    categoryLabel: 'Pensiones y previsión',
    keywords: [
      'AFP chile 2026',
      'pensión jubilación',
      'PGU 2026',
      'reforma previsional ley 21.735',
      'seguro social previsional',
      'comparador AFP',
      'APV',
      'tasa cotización 10%',
      'multifondos AFP',
      'aporte adicional empleador',
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 15,
    relatedCalculators: [
      'calculadora-comparador-afp',
      'calculadora-simulador-apv',
      'calculadora-pgu',
      'calculadora-cotizacion-independientes',
      'calculadora-bono-bodas-oro',
    ],
    relatedArticles: ['diferencia-sueldo-bruto-liquido'],
    sources: [
      { label: 'Superintendencia de Pensiones', url: 'https://www.spensiones.cl' },
      { label: 'Ley 21.735 (Reforma Previsional)', url: 'https://www.bcn.cl/leychile/navegar?idNorma=1208948' },
      { label: 'D.L. 3500', url: 'https://www.bcn.cl/leychile/navegar?idNorma=7147' },
    ],
    sections: [
      {
        id: 'sistema-previsional',
        title: 'El sistema previsional chileno',
        level: 2,
        html: `<p>Chile tiene un sistema previsional <strong>mixto</strong> tras la <a href="https://www.bcn.cl/leychile/navegar?idNorma=1208948" target="_blank" rel="noopener">Ley 21.735 de 2025 (Reforma Previsional)</a>:</p>
<ol class="steps">
<li><strong>Pilar contributivo individual</strong> — AFP: cotización del 10% sobre el imponible, va a la cuenta personal. La rentabilidad de los fondos determina el monto futuro.</li>
<li><strong>Pilar solidario</strong> — PGU: pensión universal pagada por el Estado a personas mayores de 65 años, financiada con impuestos generales y aportes específicos.</li>
<li><strong>Pilar de seguridad social previsional</strong> (nuevo desde 2025): aporte adicional del empleador (1% en 2025, sube progresivamente hasta 7% en 2033) que financia un fondo colectivo administrado por el Estado.</li>
<li><strong>Pilar voluntario</strong> — APV: ahorro adicional con beneficios tributarios.</li>
</ol>`,
      },
      {
        id: 'cotizacion-obligatoria',
        title: 'Cotización obligatoria del 10%',
        level: 2,
        html: `<p>El artículo 17 del D.L. 3500 establece que todo trabajador dependiente debe cotizar el <strong>10%</strong> de su remuneración imponible a su cuenta de capitalización individual en una AFP. Sobre ese 10% se suma la <strong>comisión variable</strong> de la AFP.</p>
<table>
<thead><tr><th>AFP</th><th>Comisión 2026</th><th>Total descuento</th><th>Sobre $1M</th></tr></thead>
<tbody>
<tr><td>Uno</td><td>0,46%</td><td>10,46%</td><td>$104.600</td></tr>
<tr><td>Modelo</td><td>0,58%</td><td>10,58%</td><td>$105.800</td></tr>
<tr><td>Planvital</td><td>1,16%</td><td>11,16%</td><td>$111.600</td></tr>
<tr><td>Habitat</td><td>1,27%</td><td>11,27%</td><td>$112.700</td></tr>
<tr><td>Capital</td><td>1,44%</td><td>11,44%</td><td>$114.400</td></tr>
<tr><td>Cuprum</td><td>1,44%</td><td>11,44%</td><td>$114.400</td></tr>
<tr><td>ProVida</td><td>1,45%</td><td>11,45%</td><td>$114.500</td></tr>
</tbody>
</table>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>El SIS lo paga el empleador</strong><p>El SIS (Seguro de Invalidez y Sobrevivencia) NO se descuenta al trabajador desde Ley 20.255 (2008): lo paga 100% el empleador (~1,15% adicional sobre el imponible).</p></div></aside>`,
      },
      {
        id: 'topes-y-tipos-cuenta',
        title: 'Tope imponible y tipos de cuenta',
        level: 2,
        html: `<p>El <strong>tope imponible AFP/Salud 2026</strong> es <strong>89,9 UF</strong> mensuales (ajustado anualmente por la Superintendencia de Pensiones). Las cotizaciones se calculan solo sobre ese tope: si ganas $5.000.000 brutos, cotizas como si ganaras ~$3.626.566.</p>
<p>Cada afiliado tiene 4 tipos de cuenta en la AFP:</p>
<ul>
<li><strong>Cuenta de capitalización individual obligatoria</strong>: 10% mensual.</li>
<li><strong>Cuenta de ahorro voluntario (CAV)</strong>: aportes voluntarios sin beneficio tributario.</li>
<li><strong>Cuenta de APV</strong>: ahorro previsional voluntario con régimen tributario A o B.</li>
<li><strong>Cuenta indemnización (solo para empleadas de casa particular)</strong>.</li>
</ul>`,
      },
      {
        id: 'multifondos',
        title: 'Multifondos: del A al E',
        level: 2,
        html: `<p>Las AFP ofrecen 5 tipos de fondo con distinta exposición a renta variable:</p>
<table>
<thead><tr><th>Fondo</th><th>% renta variable</th><th>Perfil de riesgo</th></tr></thead>
<tbody>
<tr><td>A (Más riesgoso)</td><td>80% máx</td><td>Joven, plazo largo</td></tr>
<tr><td>B (Riesgoso)</td><td>60% máx</td><td>30-50 años</td></tr>
<tr><td>C (Intermedio)</td><td>40% máx</td><td>50-55 años</td></tr>
<tr><td>D (Conservador)</td><td>20% máx</td><td>55-65 años</td></tr>
<tr><td>E (Más conservador)</td><td>5% máx</td><td>Cerca de jubilación</td></tr>
</tbody>
</table>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Cambiar de fondo: cuidado con el timing</strong><p>El cambio de fondo es gratuito y se hace en línea. Mover de A a E justo antes de un evento bursátil bajista (como 2020) puede preservar capital, pero salir y volver al fondo A en mal momento suele dejar al afiliado peor parado. La regla de mercado: a 10+ años de jubilación, mantente en A o B y no respondas a movimientos pánico.</p></div></aside>`,
      },
      {
        id: 'pgu-2026',
        title: 'PGU: Pensión Garantizada Universal',
        level: 2,
        html: `<p>La <strong>PGU</strong> es un beneficio mensual del Estado para personas de 65+ años pertenecientes al 90% más vulnerable según el Registro Social de Hogares. Tras la <a href="https://www.bcn.cl/leychile/navegar?idNorma=1208948" target="_blank" rel="noopener">Ley 21.735</a>, el monto base 2026 es:</p>
<ul class="data-grid"><li><span class="data-grid__label">PGU 65 a 81 años</span><span class="data-grid__value">$240.931</span></li><li><span class="data-grid__label">PGU mayorada (82+)</span><span class="data-grid__value">$260.286</span></li><li><span class="data-grid__label">Tope pensión completa</span><span class="data-grid__value">$820.704</span></li><li><span class="data-grid__label">Tope cero PGU</span><span class="data-grid__value">$1.302.705</span></li></ul>
<p>La PGU se reduce gradualmente conforme la pensión base supera ciertos topes. Hasta una pensión base de $820.704, recibes la PGU completa. Entre $820.704 y $1.302.705, la PGU se reduce linealmente hasta cero.</p>
<p>Para estimar tu PGU según pensión y edad, usa la <a href="/calculadoras/calculadora-pgu">calculadora de PGU</a>.</p>`,
      },
      {
        id: 'reforma-2025',
        title: 'Reforma previsional 2025 (Ley 21.735)',
        level: 2,
        html: `<p>La reforma agrega una cotización adicional del empleador, llamada <strong>Aporte Adicional con Solidaridad y Seguro Social</strong>, que entra en vigencia gradualmente:</p>
<table>
<thead><tr><th>Vigente desde</th><th>Tasa empleador</th></tr></thead>
<tbody>
<tr><td>1 de agosto 2025</td><td>1,0%</td></tr>
<tr><td>1 de agosto 2026</td><td>1,75%</td></tr>
<tr><td>1 de agosto 2027</td><td>2,5%</td></tr>
<tr><td>1 de agosto 2028</td><td>3,25%</td></tr>
<tr><td>1 de agosto 2029</td><td>4,0%</td></tr>
<tr><td>1 de agosto 2030</td><td>4,75%</td></tr>
<tr><td>1 de agosto 2031</td><td>5,5%</td></tr>
<tr><td>1 de agosto 2032</td><td>6,25%</td></tr>
<tr><td>1 de agosto 2033</td><td>7,0%</td></tr>
</tbody>
</table>
<p>Este aporte se reparte entre la cuenta individual del trabajador y un fondo colectivo administrado por el Estado, que financia complementos a las pensiones bajas y un seguro social previsional.</p>`,
      },
      {
        id: 'apv-beneficios',
        title: 'APV: ahorro previsional voluntario',
        level: 2,
        html: `<p>El <strong>APV</strong> permite ahorrar más para la jubilación con beneficios tributarios. Hay dos regímenes:</p>
<div class="comparison">
<div class="comparison__header"><div>Régimen A (sin descuento renta)</div><div>Régimen B (rebaja base imponible)</div></div>
<div class="comparison__row"><div>Aportas con dinero ya tributado</div><div>El aporte rebaja base imponible (hasta 600 UF anuales)</div></div>
<div class="comparison__row"><div>Al retirar en pensión: SIN impuesto a la renta</div><div>Al retirar: paga Global Complementario</div></div>
<div class="comparison__row"><div>Bonificación fiscal 15%, tope 6 UTM/año</div><div>Sin bonificación, beneficio en flujo</div></div>
<div class="comparison__row"><div>Ideal para tramos bajos del impuesto</div><div>Ideal para tramos altos (35%-40% marginales)</div></div>
</div>
<p>El régimen B conviene a contribuyentes en tramos altos del impuesto único: ahorras hoy a tasa marginal alta y retiras en jubilación a tasa marginal típicamente menor.</p>
<p>Para simular cuánto acumularías con APV, usa el <a href="/calculadoras/calculadora-simulador-apv">simulador APV</a>.</p>`,
      },
    ],
  },

  // ============================================
  // 7. Vivienda completa: subsidios, contribuciones, notaría
  // ============================================
  {
    slug: 'comprar-vivienda-chile',
    title: 'Comprar vivienda en Chile 2026: subsidios, contribuciones y notaría',
    intent: '¿Qué subsidios existen y cuánto cuesta comprar una propiedad?',
    description:
      'Guía integral para comprar vivienda en Chile 2026: subsidios DS49/DS01/DS19, contribuciones de bienes raíces, costos de notaría, plusvalía y reajuste de arriendo.',
    category: 'vivienda',
    categoryLabel: 'Vivienda y hogar',
    keywords: [
      'comprar casa chile 2026',
      'subsidio habitacional',
      'DS49 fondo solidario',
      'DS01 sectores medios',
      'DS19 integración social',
      'contribuciones bienes raíces',
      'costo notaría compraventa',
      'plusvalía vivienda exención 8000 UF',
      'reajuste arriendo IPC UF',
      'Ley 18.101 arrendamiento',
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 17,
    relatedCalculators: [
      'calculadora-subsidio-habitacional',
      'calculadora-contribuciones',
      'calculadora-costo-notaria',
      'calculadora-plusvalia',
      'calculadora-reajuste-arriendo',
      'calculadora-credito-hipotecario',
      'calculadora-gastos-comunes',
    ],
    relatedArticles: ['reajuste-arriendo-uf-2026', 'todo-sobre-uf-chile'],
    sources: [
      { label: 'Ministerio de Vivienda y Urbanismo (MINVU)', url: 'https://www.minvu.cl' },
      { label: 'Servicio de Impuestos Internos (SII)', url: 'https://www.sii.cl' },
      { label: 'Servicio de Vivienda y Urbanización (SERVIU)', url: 'https://www.minvu.gob.cl/servius/' },
      { label: 'Ley 18.101 (Arrendamiento)', url: 'https://www.bcn.cl/leychile/navegar?idNorma=29279' },
    ],
    sections: [
      {
        id: 'panorama-comprar',
        title: 'Panorama: comprar vivienda en Chile 2026',
        level: 2,
        html: `<p>Comprar una propiedad en Chile combina varios elementos que conviene entender antes de firmar promesa: el <strong>precio neto en UF</strong>, los <strong>gastos de cierre</strong> (notaría, conservador, timbres), los <strong>subsidios habitacionales</strong> que pueden financiar parte del pie, las <strong>contribuciones</strong> que pagarás cada año por la propiedad y, eventualmente, el <strong>impuesto a la plusvalía</strong> si la vendes con ganancia.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Costo total de comprar (no solo el precio)</strong><p>Para una propiedad de UF 3.000 (≈$120 millones), el costo total incluyendo cierre y crédito ronda 1,5%-3% adicional ($1,8M-$3,6M). Sin contar los seguros mensuales y contribuciones anuales que arrastrarás durante toda la tenencia.</p></div></aside>
<ul class="data-grid"><li><span class="data-grid__label">UF mayo 2026</span><span class="data-grid__value">$40.340</span></li><li><span class="data-grid__label">Tasa hipotecaria típica</span><span class="data-grid__value">4,5%-6,5% UF</span></li><li><span class="data-grid__label">Pie estándar</span><span class="data-grid__value">20%</span></li><li><span class="data-grid__label">Costo de cierre</span><span class="data-grid__value">1,5%-3% del valor</span></li></ul>`,
      },
      {
        id: 'subsidios-habitacionales',
        title: 'Subsidios habitacionales: DS49, DS01 y DS19',
        level: 2,
        html: `<p>El <a href="https://www.minvu.cl" target="_blank" rel="noopener">MINVU</a>, a través del SERVIU, administra tres programas principales de subsidio para compra de vivienda nueva o usada. Cada uno tiene tramos según puntaje del Registro Social de Hogares (RSH) y precio máximo de la vivienda.</p>

<h3>DS49 — Fondo Solidario de Elección de Vivienda</h3>
<p>Para familias del 40% más vulnerable (RSH bajo 40%). El subsidio cubre <strong>la mayor parte del valor de la vivienda</strong>, sin necesidad de crédito hipotecario. Requiere ahorro previo de 10 UF (~$403.400) y vivienda valor máximo entre 950 UF y 1.400 UF según zona.</p>

<h3>DS01 — Subsidio para Sectores Medios</h3>
<p>Para familias del 40%-60% (RSH bajo 60%). Tres tramos:</p>
<table>
<thead><tr><th>Tramo</th><th>Precio máximo vivienda</th><th>Subsidio máximo</th><th>Ahorro mínimo</th></tr></thead>
<tbody>
<tr><td>Tramo 1</td><td>1.100 UF</td><td>500 UF</td><td>30 UF</td></tr>
<tr><td>Tramo 2</td><td>1.600 UF</td><td>400 UF</td><td>50 UF</td></tr>
<tr><td>Tramo 3</td><td>2.200 UF</td><td>250 UF</td><td>80 UF</td></tr>
</tbody>
</table>

<h3>DS19 — Integración Social y Territorial</h3>
<p>Para familias del 60%-90% (clase media). Aplica a proyectos seleccionados por el SERVIU, con subsidios entre 100 UF y 500 UF. Vivienda hasta 2.600 UF.</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Postulación y plazos</strong><p>Las postulaciones a DS49 y DS01 son por <strong>llamados específicos</strong> que el MINVU abre 2-3 veces al año. La postulación se hace en línea en minvu.gob.cl con clave única. El subsidio entregado tiene 21 meses de vigencia para usarse.</p></div></aside>
<p>Para estimar a qué tramo accedes según precio y ahorro, usa la <a href="/calculadoras/calculadora-subsidio-habitacional">calculadora de subsidio habitacional</a>.</p>`,
      },
      {
        id: 'contribuciones',
        title: 'Contribuciones de bienes raíces',
        level: 2,
        html: `<p>Las <strong>contribuciones</strong> son el impuesto territorial anual que paga todo dueño de propiedad raíz en Chile. Lo cobra el SII en 4 cuotas (abril, junio, septiembre, noviembre) y se calcula sobre el <strong>avalúo fiscal</strong>, no sobre el precio de mercado.</p>
<p>Las tasas anuales según destino son:</p>
<table>
<thead><tr><th>Destino</th><th>Tasa anual</th><th>Exención</th></tr></thead>
<tbody>
<tr><td>Habitacional</td><td>0,98% (con sobretasa 0,025% si avalúo &gt; 76 UF)</td><td>Hasta avalúo 41,4M (~860 UF)</td></tr>
<tr><td>Comercial</td><td>1,2%</td><td>Sin exención</td></tr>
<tr><td>Industrial</td><td>1,2%</td><td>Sin exención</td></tr>
<tr><td>Sitio eriazo</td><td>1,2% + 100% recargo</td><td>Sin exención</td></tr>
<tr><td>Agrario</td><td>1,0%</td><td>Variable</td></tr>
</tbody>
</table>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Avalúo fiscal vs comercial</strong><p>El avalúo fiscal suele ser entre 30%-60% del valor de mercado. Para una casa que vale $200 millones, el avalúo puede estar en $80-100 millones. Las contribuciones se calculan sobre ese avalúo, no sobre el precio de venta.</p></div></aside>
<p>Las propiedades habitacionales con avalúo bajo $41.353.348 (≈860 UF) están <strong>exentas</strong> de pagar contribuciones. Para calcular tus contribuciones específicas, usa la <a href="/calculadoras/calculadora-contribuciones">calculadora de contribuciones</a>.</p>`,
      },
      {
        id: 'costo-notaria',
        title: 'Costos de notaría y conservador',
        level: 2,
        html: `<p>La compraventa de una propiedad implica costos notariales fijos y variables según el valor del inmueble:</p>
<div class="numeric-example"><div class="numeric-example__title">Compraventa de propiedad UF 3.000 (≈$120M)</div><ul><li><strong>Escritura pública</strong>: ~0,3% del valor = $360.000</li><li><strong>Conservador de Bienes Raíces</strong>: 0,2% del valor = $240.000</li><li><strong>Estudio de títulos</strong>: ~$300.000 (5-10 UF)</li><li><strong>Tasación bancaria</strong>: $150.000 (3-5 UF)</li><li><strong>Impuesto timbres y estampillas</strong>: 0,8% sobre mutuo = $768.000 (sobre crédito UF 2.400)</li><li><strong>Comisión corretaje</strong>: 2% + IVA del valor = $2.856.000</li></ul><span class="total">Total cierre: ≈ $4.674.000 (3,9% del valor)</span></div>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Comisión de corretaje: 2% por parte</strong><p>Si trabajas con corredor, lo habitual es 2% + IVA del lado del comprador y 2% + IVA del lado del vendedor. Total 4,76% del valor de la propiedad. Algunos corredores aceptan 1,5% en operaciones grandes.</p></div></aside>
<p>Para calcular costos por tipo de operación (compraventa, hipoteca, donación), usa la <a href="/calculadoras/calculadora-costo-notaria">calculadora de costo de notaría</a>.</p>`,
      },
      {
        id: 'plusvalia',
        title: 'Plusvalía: impuesto a la ganancia de capital',
        level: 2,
        html: `<p>Si vendes una propiedad con ganancia, el SII grava la <strong>diferencia entre precio de venta y precio de compra ajustado por inflación</strong>. La Ley sobre Impuesto a la Renta (artículo 17 N°8) permite eximir esa ganancia hasta cierto monto si la propiedad fue tu vivienda habitual.</p>

<h3>Exención de 8.000 UF acumuladas</h3>
<p>Para propiedades de uso habitacional, hay una exención de hasta <strong>8.000 UF acumuladas</strong> en toda la vida del contribuyente. Sobre el exceso aplica el régimen tributario que el contribuyente elija al momento de presentar Renta:</p>
<ul>
<li><strong>Régimen único 10%</strong>: tasa fija sobre el mayor valor que excede las 8.000 UF.</li>
<li><strong>Régimen Global Complementario</strong>: la ganancia se suma a las rentas del año y tributa en los tramos progresivos del Global. Conviene si el contribuyente está en tramos bajos.</li>
</ul>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Reajuste del precio de compra</strong><p>El precio de compra se actualiza por la variación del IPC desde la fecha de compra hasta la venta. Una casa comprada en $80M en 2010 que se vende en $200M en 2026 tiene precio de compra reajustado a ~$125M, así la ganancia gravable es $75M, no $120M.</p></div></aside>
<p>Para calcular la ganancia neta y el impuesto aproximado, usa la <a href="/calculadoras/calculadora-plusvalia">calculadora de plusvalía</a>.</p>`,
      },
      {
        id: 'reajuste-arriendo',
        title: 'Reajuste de arriendo: UF vs IPC',
        level: 2,
        html: `<p>La <a href="https://www.bcn.cl/leychile/navegar?idNorma=29279" target="_blank" rel="noopener">Ley 18.101 (Arrendamiento de Inmuebles Urbanos)</a> no fija un tope de aumento. El reajuste depende del contrato:</p>
<div class="comparison">
<div class="comparison__header"><div>Arriendo en UF</div><div>Arriendo en pesos</div></div>
<div class="comparison__row"><div>Reajuste automático diario</div><div>Reajuste por IPC acumulado</div></div>
<div class="comparison__row"><div>Pago en pesos varía mes a mes</div><div>Pago en pesos fijo entre reajustes</div></div>
<div class="comparison__row"><div>Valor real estable</div><div>Valor real cae si no se reajusta</div></div>
<div class="comparison__row"><div>Predecible para arrendador</div><div>Predecible para arrendatario</div></div>
<div class="comparison__row"><div>Común en oficinas y propiedades altas</div><div>Común en arriendos económicos</div></div>
</div>
<p>Para arriendo en pesos con cláusula de reajuste anual por IPC: si tu arriendo es $400.000 y el IPC anual fue 4,5%, el nuevo arriendo es $400.000 × 1,045 = <strong>$418.000</strong>.</p>
<p>Calcula tu reajuste específico con la <a href="/calculadoras/calculadora-reajuste-arriendo">calculadora de reajuste de arriendo</a>.</p>`,
      },
      {
        id: 'gastos-comunes',
        title: 'Gastos comunes en edificios y condominios',
        level: 2,
        html: `<p>Si compras un departamento o casa en condominio, paga gastos comunes mensuales que cubren mantención de áreas comunes, conserje, luz/agua del edificio, ascensores, piscina, etc. Los gastos comunes se rigen por la <strong>Ley 21.442 (Copropiedad Inmobiliaria, 2022)</strong> y el reglamento interno del edificio.</p>
<p>Componentes típicos:</p>
<ul>
<li>Sueldo conserjes y administración: ~30% del total.</li>
<li>Mantención y reparaciones: ~20%.</li>
<li>Luz, agua y gas comunes: ~15%.</li>
<li>Aseo, jardinería: ~10%.</li>
<li>Seguros: ~5%.</li>
<li>Fondo de reserva (legal mínimo 5%): ~5%-10%.</li>
<li>Servicios extra (piscina, gimnasio, sala de eventos): ~10%-15%.</li>
</ul>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Pregunta antes de firmar</strong><p>Pide los gastos comunes promedio del último año antes de cerrar la compra. Edificios con piscina, gym y conserjería 24h pueden duplicar lo que pagarías en un edificio sin amenities (típico: $80.000 vs $180.000 por departamento de 50 m²).</p></div></aside>
<p>Estima el costo de gastos comunes según superficie y servicios con la <a href="/calculadoras/calculadora-gastos-comunes">calculadora de gastos comunes</a>.</p>`,
      },
    ],
  },

  // ============================================
  // 8. Vehículos: permiso, multas, TAG, SOAP
  // ============================================
  {
    slug: 'vehiculos-chile-permiso-multas',
    title: 'Vehículos en Chile 2026: permiso de circulación, multas y TAG',
    intent: '¿Cuánto cuesta tener un auto al año en Chile?',
    description:
      'Costos anuales de tener un vehículo en Chile 2026: permiso de circulación, SOAP, revisión técnica, multas, TAG, peajes y seguros. Con tablas y ejemplos.',
    category: 'vehiculos',
    categoryLabel: 'Vehículos y transporte',
    keywords: [
      'permiso circulación 2026',
      'SOAP chile',
      'multas tránsito chile',
      'TAG peajes',
      'revisión técnica',
      'tabla valor vehículos SII',
      'ley tránsito 18.290',
      'multas gravísimas alcohol',
      'descuento marzo permiso',
      'patente comercial',
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 14,
    relatedCalculators: [
      'calculadora-permiso-circulacion',
      'calculadora-multas-transito',
      'calculadora-costo-tag',
      'calculadora-credito-automotriz',
      'calculadora-patente-comercial',
    ],
    relatedArticles: [],
    sources: [
      { label: 'Servicio de Impuestos Internos — Tabla de tasación', url: 'https://www.sii.cl/destacados/aranceles/' },
      { label: 'Ley 18.290 (Tránsito)', url: 'https://www.bcn.cl/leychile/navegar?idNorma=29708' },
      { label: 'Ministerio de Transportes', url: 'https://www.mtt.gob.cl' },
      { label: 'Subsecretaría de Prevención del Delito', url: 'https://www.preveciondeldelito.cl' },
    ],
    sections: [
      {
        id: 'costos-anuales-auto',
        title: 'Costos anuales de tener un auto en Chile',
        level: 2,
        html: `<p>Tener un vehículo en Chile implica costos fijos anuales y costos variables según uso. Para un auto de tasación SII $8.000.000 (vehículo familiar 2020-2022), los costos típicos son:</p>
<ul class="data-grid"><li><span class="data-grid__label">Permiso circulación</span><span class="data-grid__value">$320.000/año</span></li><li><span class="data-grid__label">SOAP obligatorio</span><span class="data-grid__value">$8.000-$15.000/año</span></li><li><span class="data-grid__label">Revisión técnica</span><span class="data-grid__value">$15.000-$25.000/año</span></li><li><span class="data-grid__label">Seguro voluntario</span><span class="data-grid__value">$300.000-$700.000/año</span></li></ul>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Suma total anual</strong><p>Para un vehículo familiar promedio: $640.000 a $1.060.000 anuales en costos fijos, sin contar combustible, mantenciones, peajes ni multas. El permiso de circulación es el costo fijo más alto.</p></div></aside>`,
      },
      {
        id: 'permiso-circulacion',
        title: 'Permiso de circulación',
        level: 2,
        html: `<p>El <strong>permiso de circulación</strong> es un impuesto municipal anual que se paga en marzo (50%) y septiembre (50%) o íntegramente en marzo con descuento. Lo recauda la municipalidad donde está empadronado el vehículo.</p>
<p>El cálculo se basa en la <strong>tabla de tasación del SII</strong> (publicada anualmente) y aplica la siguiente progresión sobre el valor:</p>
<table>
<thead><tr><th>Tramo de tasación SII</th><th>Tasa</th></tr></thead>
<tbody>
<tr><td>0 a $3.000.000</td><td>1,0%</td></tr>
<tr><td>$3.000.000 a $5.500.000</td><td>2,0%</td></tr>
<tr><td>$5.500.000 a $9.000.000</td><td>3,0%</td></tr>
<tr><td>$9.000.000 a $12.000.000</td><td>4,0%</td></tr>
<tr><td>Sobre $12.000.000</td><td>4,5%</td></tr>
</tbody>
</table>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Descuento por pago en marzo</strong><p>Si pagas el permiso completo en marzo (en lugar de las dos cuotas marzo/septiembre), algunas municipalidades ofrecen descuento del 5%-10%. Verifica con tu municipalidad: las grandes (Santiago, Providencia, Las Condes) suelen mantener el descuento histórico del 5%.</p></div></aside>
<p>Vehículos eléctricos pagan tarifa reducida (50% del permiso normal) hasta 2030 según la Ley 21.305. Calcula tu permiso específico con la <a href="/calculadoras/calculadora-permiso-circulacion">calculadora de permiso de circulación</a>.</p>`,
      },
      {
        id: 'soap',
        title: 'SOAP: Seguro Obligatorio Automotriz',
        level: 2,
        html: `<p>El <strong>SOAP</strong> (Seguro Obligatorio de Accidentes Personales, Ley 18.490) cubre lesiones y muerte de personas (conductor, pasajeros, terceros) en accidentes de tránsito. Es <strong>obligatorio</strong> y debe pagarse antes del permiso de circulación.</p>
<p>Coberturas básicas SOAP 2026:</p>
<ul>
<li>Muerte: 300 UF (~$12 millones).</li>
<li>Incapacidad permanente total: 300 UF.</li>
<li>Incapacidad parcial: hasta 200 UF según tabla.</li>
<li>Gastos médicos: hasta 300 UF.</li>
</ul>
<p>El costo típico es entre $8.000 y $15.000 al año según el aseguradora y tipo de vehículo. Lo cobran las compañías de seguros y muchas municipalidades lo incluyen en el pago del permiso.</p>`,
      },
      {
        id: 'multas-transito',
        title: 'Multas de tránsito',
        level: 2,
        html: `<p>La <a href="https://www.bcn.cl/leychile/navegar?idNorma=29708" target="_blank" rel="noopener">Ley 18.290 (Ley de Tránsito)</a> clasifica las infracciones en 4 categorías con multas en UTM:</p>
<table>
<thead><tr><th>Tipo</th><th>Multa UTM</th><th>Multa $ (UTM $70.588)</th><th>Ejemplos</th></tr></thead>
<tbody>
<tr><td>Leve</td><td>0,5 a 1 UTM</td><td>$35.294 a $70.588</td><td>Estacionamiento prohibido, no llevar documentos</td></tr>
<tr><td>Menos grave</td><td>1 a 1,5 UTM</td><td>$70.588 a $105.882</td><td>Sin cinturón, exceso velocidad &lt; 20%</td></tr>
<tr><td>Grave</td><td>1,5 a 3 UTM</td><td>$105.882 a $211.764</td><td>Pasar luz roja, exceso velocidad 20%-30%</td></tr>
<tr><td>Gravísima</td><td>1,5 a 5 UTM + suspensión licencia</td><td>$105.882 a $352.940</td><td>Adelantar zona prohibida, exceso &gt; 30%</td></tr>
<tr><td>Gravísima por alcohol</td><td>2 a 10 UTM</td><td>$141.176 a $705.880</td><td>Conducir con alcohol &gt; 0,3 g/L</td></tr>
</tbody>
</table>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Reincidencia: dobla la multa</strong><p>Si cometes la misma infracción dentro de 12 meses, la multa se incrementa al doble. Conducir con alcohol en estado de ebriedad (&gt; 0,8 g/L) implica suspensión de licencia por 2 años en primera oportunidad y revocación definitiva en segunda.</p></div></aside>
<p>Calcula multas según tipo y reincidencia con la <a href="/calculadoras/calculadora-multas-transito">calculadora de multas</a>.</p>`,
      },
      {
        id: 'tag-peajes',
        title: 'TAG y peajes en autopistas',
        level: 2,
        html: `<p>Las autopistas urbanas e interurbanas concesionadas usan el sistema <strong>TAG</strong> (free-flow) o cobro electrónico. Las tarifas dependen del tramo, hora (peak/off-peak) y tipo de vehículo (categorías 1, 2 o 3).</p>
<p>Tarifas referenciales 2026 (categoría 1 — auto particular):</p>
<table>
<thead><tr><th>Ruta</th><th>Tarifa hora normal</th><th>Tarifa hora peak</th></tr></thead>
<tbody>
<tr><td>Santiago - Rancagua (Autopista del Sol)</td><td>~$3.500</td><td>~$5.200</td></tr>
<tr><td>Santiago - Valparaíso (Ruta 68)</td><td>~$5.800</td><td>~$8.500</td></tr>
<tr><td>Santiago - Los Andes (Ruta 57)</td><td>~$3.200</td><td>~$4.700</td></tr>
<tr><td>Urbano Santiago (Costanera Norte, Vespucio)</td><td>$300-$1.200/tramo</td><td>$500-$2.000/tramo</td></tr>
</tbody>
</table>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Convenios y descuentos</strong><p>Suscribir convenio con la concesionaria (típicamente 5%-10% de descuento) y mantener saldo positivo te ahorra el 5% adicional que se cobra a usuarios sin convenio (multa por ausencia de TAG válido).</p></div></aside>
<p>Calcula tu costo mensual de TAG según viajes y rutas con la <a href="/calculadoras/calculadora-costo-tag">calculadora de costo TAG</a>.</p>`,
      },
      {
        id: 'patente-comercial',
        title: 'Patente comercial: si tu vehículo es de trabajo',
        level: 2,
        html: `<p>Si usas tu vehículo para actividades comerciales (transporte, distribución, taxi, Uber/Cabify formal), debes pagar <strong>patente comercial</strong> en la municipalidad donde tributa la actividad. La patente se calcula sobre el <strong>capital propio declarado</strong>:</p>
<ul>
<li><strong>Tasa</strong>: 0,25% a 0,5% del capital propio (varía por comuna).</li>
<li><strong>Mínimo</strong>: 1 UTM anual.</li>
<li><strong>Máximo</strong>: 8.000 UTM anuales por contribuyente y comuna.</li>
</ul>
<p>Las patentes comerciales se pagan en julio (50%) y enero (50%). Calcula tu patente con la <a href="/calculadoras/calculadora-patente-comercial">calculadora de patente comercial</a>.</p>`,
      },
      {
        id: 'credito-auto',
        title: 'Crédito automotriz: ¿conviene?',
        level: 2,
        html: `<p>Los créditos automotrices en Chile tienen plazos típicos de 12 a 60 meses con tasas anuales entre 9% y 18% (CAE), considerablemente más altas que las hipotecarias. Algunas concesionarias ofrecen "tasa cero" pero compensan con precio inflado.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Auto con crédito pierde valor más rápido</strong><p>Un auto pierde 15%-25% de valor el primer año y 10%-15% cada año siguiente. Si financias 100% del valor, durante los primeros 12-18 meses debes más de lo que vale el auto. Considera al menos 30% de pie para evitar quedar "patas para arriba".</p></div></aside>
<p>Calcula dividendo y CAE real con la <a href="/calculadoras/calculadora-credito-automotriz">calculadora de crédito automotriz</a>.</p>`,
      },
    ],
  },

  // ============================================
  // 9. Familia: pensión alimenticia, asignación, subsidios
  // ============================================
  {
    slug: 'familia-pension-alimenticia-chile',
    title: 'Familia en Chile 2026: pensión alimenticia, asignación familiar y bonos',
    intent: '¿Cuánto debo pagar de pensión alimenticia y qué beneficios familiares existen?',
    description:
      'Guía sobre pensión alimenticia, asignación familiar, subsidios habitacionales y bonos para familias en Chile 2026. Bases legales y cálculos paso a paso.',
    category: 'familia',
    categoryLabel: 'Familia y dependientes',
    keywords: [
      'pensión alimenticia chile 2026',
      'ley 14.908',
      'asignación familiar',
      'tramo A B C asignación',
      'subsidio agua potable',
      'bono bodas oro',
      'aguinaldo fiestas patrias',
      'PGU mayorada 82 años',
      'pensión hijos sueldo bruto',
      'tribunales familia',
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 14,
    relatedCalculators: [
      'calculadora-pension-alimenticia',
      'calculadora-asignacion-familiar',
      'calculadora-subsidio-agua',
      'calculadora-bono-bodas-oro',
      'calculadora-aguinaldo',
      'calculadora-pgu',
    ],
    relatedArticles: [],
    sources: [
      { label: 'Ley 14.908 (Abandono familia y pensiones alimenticias)', url: 'https://www.bcn.cl/leychile/navegar?idNorma=172986' },
      { label: 'Tribunales de Familia', url: 'https://www.pjud.cl' },
      { label: 'IPS — Instituto de Previsión Social', url: 'https://www.ips.gob.cl' },
      { label: 'Ministerio de Desarrollo Social', url: 'https://www.desarrollosocialyfamilia.gob.cl' },
    ],
    sections: [
      {
        id: 'pension-alimenticia',
        title: 'Pensión alimenticia: cuánto y a quién',
        level: 2,
        html: `<p>La <strong>pensión alimenticia</strong> es la obligación legal de un padre o madre de aportar al sustento de sus hijos cuando no vive con ellos. Está regulada por la <a href="https://www.bcn.cl/leychile/navegar?idNorma=172986" target="_blank" rel="noopener">Ley 14.908 (Abandono de familia y pago de pensiones alimenticias)</a> y el Código Civil.</p>
<p>Los Tribunales de Familia fijan el monto considerando:</p>
<ul>
<li>El número de hijos.</li>
<li>Las necesidades del alimentario (educación, salud, vivienda).</li>
<li>La capacidad económica del alimentante (sueldo, otros ingresos, patrimonio).</li>
</ul>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Topes legales (Art. 7 Ley 14.908)</strong><p>La pensión NO puede exceder el <strong>50% de la renta líquida</strong> del alimentante. El piso legal es del <strong>40% del ingreso mínimo mensual</strong> por hijo (≈$230.000 en 2026 con sueldo mínimo $575.000).</p></div></aside>
<p>Reglas prácticas que aplican los tribunales:</p>
<table>
<thead><tr><th>Hijos</th><th>% típico del sueldo bruto</th><th>Ejemplo sueldo $1.000.000</th></tr></thead>
<tbody>
<tr><td>1 hijo</td><td>20%-25%</td><td>$200.000-$250.000</td></tr>
<tr><td>2 hijos</td><td>30%-35%</td><td>$300.000-$350.000</td></tr>
<tr><td>3+ hijos</td><td>40%-50%</td><td>$400.000-$500.000</td></tr>
</tbody>
</table>
<p>Para estimar la pensión según tu sueldo y número de hijos, usa la <a href="/calculadoras/calculadora-pension-alimenticia">calculadora de pensión alimenticia</a>.</p>`,
      },
      {
        id: 'incumplimiento-pension',
        title: 'Incumplimiento: nuevo Registro Nacional de Deudores',
        level: 2,
        html: `<p>La <strong>Ley 21.389 (2021)</strong> creó el <strong>Registro Nacional de Deudores de Pensiones Alimenticias</strong>, administrado por el Servicio de Registro Civil. Las personas en este registro:</p>
<ul>
<li>No pueden renovar licencia de conducir, pasaporte ni cédula de identidad.</li>
<li>Tienen retención automática del sueldo (orden judicial al empleador).</li>
<li>Aparecen en <strong>boletín comercial</strong> y son considerados deudores en DICOM.</li>
<li>El 50% de cualquier devolución de impuestos del SII se desvía a pagar la deuda.</li>
<li>Si solicitan crédito hipotecario o consumo, la institución debe verificar el registro.</li>
</ul>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Salida del registro</strong><p>Para salir del registro hay que pagar todas las deudas, incluyendo intereses (UF + reajustes). Mantener al día la pensión durante 6 meses consecutivos también permite la suspensión, pero no la eliminación, del registro.</p></div></aside>`,
      },
      {
        id: 'asignacion-familiar',
        title: 'Asignación familiar: el bono mensual por carga',
        level: 2,
        html: `<p>La <strong>asignación familiar</strong> es un beneficio mensual del Estado para trabajadores con cargas familiares (cónyuges, hijos menores de 18, hijos estudiantes hasta 24, padres mayores de 65). Se paga junto con el sueldo y depende del ingreso del trabajador.</p>
<p>Tramos vigentes 2026 (DL 150 reajustado):</p>
<table>
<thead><tr><th>Tramo</th><th>Ingreso mensual del trabajador</th><th>Monto por carga</th></tr></thead>
<tbody>
<tr><td>A</td><td>Hasta $620.251</td><td>$22.007</td></tr>
<tr><td>B</td><td>$620.252 a $905.941</td><td>$13.505</td></tr>
<tr><td>C</td><td>$905.942 a $1.412.957</td><td>$4.267</td></tr>
<tr><td>D</td><td>Sobre $1.412.957</td><td>$0 (sin asignación)</td></tr>
</tbody>
</table>
<p>Las cargas se reconocen oficialmente postulando ante el IPS o la Caja de Compensación correspondiente. Para hijos estudiantes 18-24 años, se requiere certificado anual de estudios.</p>
<p>Calcula tu asignación con la <a href="/calculadoras/calculadora-asignacion-familiar">calculadora de asignación familiar</a>.</p>`,
      },
      {
        id: 'subsidio-agua',
        title: 'Subsidio del agua potable',
        level: 2,
        html: `<p>El <strong>SAP</strong> (Subsidio al pago del consumo de agua potable y servicio de alcantarillado, Ley 18.778) es un beneficio para familias del 70% más vulnerable. Subsidia entre el 25% y el 100% de la cuenta del agua, según tramo de vulnerabilidad y disponibilidad presupuestaria comunal.</p>
<p>Tramos de subsidio 2026:</p>
<ul>
<li><strong>Tramo 1</strong> (40% más vulnerable): 100% subsidio sobre los primeros 15 m³.</li>
<li><strong>Tramo 2</strong> (40%-70% vulnerable): 50% subsidio sobre los primeros 15 m³.</li>
</ul>
<p>El subsidio se postula en la municipalidad correspondiente con cédula de identidad y boletas de agua de los últimos 3 meses. Es renovable cada 3 años. Calcula tu beneficio con la <a href="/calculadoras/calculadora-subsidio-agua">calculadora de subsidio agua</a>.</p>`,
      },
      {
        id: 'aguinaldo',
        title: 'Aguinaldo: Fiestas Patrias, Navidad y Escolar',
        level: 2,
        html: `<p>El <strong>aguinaldo</strong> es un bono especial pagado al sector público por leyes específicas, y al sector privado en muchos casos por convenio colectivo o costumbre laboral. Hay tres aguinaldos típicos:</p>
<table>
<thead><tr><th>Aguinaldo</th><th>Mes</th><th>Sector público (referencial 2026)</th></tr></thead>
<tbody>
<tr><td>Fiestas Patrias</td><td>Septiembre</td><td>$84.000-$110.000</td></tr>
<tr><td>Navidad</td><td>Diciembre</td><td>$104.000-$132.000</td></tr>
<tr><td>Escolar</td><td>Marzo</td><td>$30.000-$50.000 por hijo en edad escolar</td></tr>
</tbody>
</table>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>No es obligatorio en sector privado</strong><p>El aguinaldo no es legalmente obligatorio para empresas privadas (a diferencia de la gratificación legal del 25%). Muchas pagan por costumbre o convenio colectivo. Si tu contrato lo menciona, sí es exigible.</p></div></aside>
<p>Calcula tu aguinaldo según sector y meses trabajados con la <a href="/calculadoras/calculadora-aguinaldo">calculadora de aguinaldo</a>.</p>`,
      },
      {
        id: 'bono-bodas-oro',
        title: 'Bono Bodas de Oro y otros beneficios para adultos mayores',
        level: 2,
        html: `<p>El <strong>Bono Bodas de Oro</strong> es un beneficio único entregado por el IPS a parejas casadas con 50+ años de matrimonio que pertenecen al 60% más vulnerable. El monto 2026 es de <strong>$363.776</strong> dividido en partes iguales para cada cónyuge (≈$181.888 cada uno).</p>
<p>Otros beneficios para adultos mayores:</p>
<ul>
<li><strong>PGU básica</strong>: $240.931 mensuales para 65+ años. Lee la <a href="/guias/afp-pension-chile">guía de AFP y pensión</a>.</li>
<li><strong>PGU mayorada (82+ años)</strong>: $260.286 mensuales.</li>
<li><strong>Aporte previsional solidario</strong>: complementa pensiones bajas hasta el monto base.</li>
<li><strong>Tarifa rebajada en transporte público</strong>: 50% en Metro y buses para 65+ años con tarjeta TNE Adulto Mayor.</li>
</ul>
<p>Para verificar elegibilidad y montos, usa la <a href="/calculadoras/calculadora-bono-bodas-oro">calculadora de bono bodas de oro</a>.</p>`,
      },
    ],
  },

  // ============================================
  // 10. Crédito CAE y educación superior
  // ============================================
  {
    slug: 'credito-cae-educacion-chile',
    title: 'Crédito CAE en Chile 2026: tasa, condonación y alternativas',
    intent: '¿Cómo funciona el CAE y cuánto pagaré por mi carrera?',
    description:
      'Guía del Crédito con Aval del Estado (CAE) en Chile 2026: tasa, plazos, garantía estatal, contingencia al ingreso y reforma de condonación 2025.',
    category: 'educacion',
    categoryLabel: 'Educación y créditos',
    keywords: [
      'CAE chile 2026',
      'crédito aval del estado',
      'condonación CAE',
      'gratuidad educación superior',
      'beca bicentenario',
      'beca juan gómez millas',
      'reforma educación 2025',
      'tasa CAE 2%',
      'contingencia ingreso 10%',
      'INGRESA',
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 12,
    relatedCalculators: [
      'calculadora-credito-cae',
      'calculadora-credito-hipotecario',
      'calculadora-intereses-mora',
    ],
    relatedArticles: [],
    sources: [
      { label: 'Comisión INGRESA', url: 'https://www.ingresa.cl' },
      { label: 'Ministerio de Educación', url: 'https://www.mineduc.cl' },
      { label: 'Ley 20.027 (CAE original)', url: 'https://www.bcn.cl/leychile/navegar?idNorma=240080' },
    ],
    sections: [
      {
        id: 'que-es-cae',
        title: '¿Qué es el CAE?',
        level: 2,
        html: `<p>El <strong>Crédito con Aval del Estado</strong> es un crédito otorgado por bancos privados a estudiantes de educación superior, con garantía estatal subsidiaria. Fue creado por la <a href="https://www.bcn.cl/leychile/navegar?idNorma=240080" target="_blank" rel="noopener">Ley 20.027 de 2005</a> y administrado por la <a href="https://www.ingresa.cl" target="_blank" rel="noopener">Comisión INGRESA</a>.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>El CAE en cifras</strong><p>Más de 1,2 millones de estudiantes han usado CAE desde su creación. La deuda total acumulada supera los US$10 mil millones. La tasa fue reducida de 5,8% inicial a 2% por la reforma de 2012, y la reforma de 2025 establece un calendario de condonación parcial para deudores en ciertas condiciones.</p></div></aside>
<ul class="data-grid"><li><span class="data-grid__label">Tasa de interés 2026</span><span class="data-grid__value">2% real anual</span></li><li><span class="data-grid__label">Plazo máximo</span><span class="data-grid__value">20 años</span></li><li><span class="data-grid__label">Cuota máxima (ley)</span><span class="data-grid__value">10% del ingreso bruto</span></li><li><span class="data-grid__label">Inicio del pago</span><span class="data-grid__value">18 meses post-egreso</span></li></ul>`,
      },
      {
        id: 'condicion-ingreso',
        title: 'Pago contingente al ingreso (Ley 21.605)',
        level: 2,
        html: `<p>Desde 2023, el CAE pasó a régimen de <strong>pago contingente al ingreso</strong>. Esto significa que la cuota mensual se ajusta a la situación económica del deudor:</p>
<ul>
<li><strong>Cuota máxima</strong>: 10% del ingreso bruto mensual.</li>
<li><strong>Si el ingreso baja</strong>: la cuota baja proporcionalmente.</li>
<li><strong>Si el ingreso es bajo el sueldo mínimo</strong>: cuota suspendida temporalmente.</li>
<li><strong>Tras 240 cuotas pagadas (20 años)</strong>: el saldo restante se condona.</li>
</ul>
<p>Esta reforma elimina el riesgo de "no poder pagar nunca" del CAE original (donde la cuota era fija y podía superar el ingreso del egresado). Ahora la deuda nunca puede consumir más del 10% bruto, lo que protege al deudor en períodos de cesantía o sueldos bajos.</p>`,
      },
      {
        id: 'condonacion-2025',
        title: 'Reforma de condonación 2025',
        level: 2,
        html: `<p>El proyecto de ley de <strong>condonación parcial del CAE</strong> en discusión en 2025-2026 propone:</p>
<ul>
<li><strong>Condonación total para deudores con CAE pagado correctamente por 10+ años</strong>.</li>
<li><strong>Condonación parcial 50%</strong> para deudores que han pagado 5-10 años sin atrasos.</li>
<li><strong>Condonación de mora</strong> para deudores en el Registro de Morosidad CAE que se acojan al beneficio.</li>
<li>Reemplazo del CAE por un nuevo Sistema de Financiamiento Público (FES) administrado directamente por el Estado.</li>
</ul>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Estado del proyecto</strong><p>Al cierre de mayo 2026, la reforma de condonación está en segundo trámite constitucional. Las fechas exactas y mecanismos de aplicación pueden cambiar. Sigue las novedades en <a href="https://www.ingresa.cl" target="_blank" rel="noopener">ingresa.cl</a> y <a href="https://www.mineduc.cl" target="_blank" rel="noopener">mineduc.cl</a>.</p></div></aside>`,
      },
      {
        id: 'gratuidad',
        title: 'Gratuidad: la alternativa al CAE',
        level: 2,
        html: `<p>La <strong>Gratuidad</strong> es un beneficio del Estado que cubre el 100% del arancel y matrícula en instituciones de educación superior adheridas, para estudiantes del 60% más vulnerable según RSH. Aplica a:</p>
<ul>
<li>Universidades del CRUCH (estatales y privadas tradicionales).</li>
<li>Universidades privadas adheridas (con acreditación 4+ años).</li>
<li>Institutos profesionales y centros de formación técnica acreditados.</li>
</ul>
<aside class="callout callout--success"><span class="callout__icon" aria-hidden="true">✅</span><div class="callout__body"><strong>Postula primero a Gratuidad y becas</strong><p>Antes de tomar CAE, postula a Gratuidad y a becas Bicentenario, Juan Gómez Millas, Excelencia Académica, etc. La Gratuidad es la mejor opción si calificas, porque NO genera deuda. El CAE debe ser tu última opción de financiamiento.</p></div></aside>`,
      },
      {
        id: 'becas',
        title: 'Becas: el complemento perfecto',
        level: 2,
        html: `<p>El sistema de <strong>becas estatales</strong> chileno cubre matrícula y arancel para estudiantes con buen rendimiento o vulnerabilidad económica:</p>
<table>
<thead><tr><th>Beca</th><th>Cobertura</th><th>Requisito principal</th></tr></thead>
<tbody>
<tr><td>Beca Bicentenario</td><td>Arancel completo</td><td>RSH ≤ 70%, NEM/PSU mínimos</td></tr>
<tr><td>Beca Juan Gómez Millas</td><td>Arancel completo</td><td>RSH ≤ 70%, NEM/PSU mínimos, distintos a Bicentenario</td></tr>
<tr><td>Beca Excelencia Académica</td><td>Arancel hasta tope</td><td>10% mejor rendimiento del colegio</td></tr>
<tr><td>Beca Vocación de Profesor</td><td>Arancel + bono mensual</td><td>Pedagogías</td></tr>
<tr><td>Beca de Articulación</td><td>Arancel TP a Pregrado</td><td>Continuidad de estudios técnicos</td></tr>
</tbody>
</table>
<p>Las becas se postulan en el FUAS (Formulario Único de Acreditación Socioeconómica) en octubre/noviembre del año previo a comenzar la carrera.</p>`,
      },
      {
        id: 'simulacion-cae',
        title: 'Simulación: cuánto pagarás por tu CAE',
        level: 2,
        html: `<div class="numeric-example"><div class="numeric-example__title">Carrera 5 años, arancel anual UF 200, total UF 1.000</div><ul><li>Monto crédito: UF 1.000 (≈$40.340.000 al cambio mayo 2026)</li><li>Tasa anual: 2% real</li><li>Plazo: 20 años (240 cuotas)</li><li>Cuota fija UF: ≈ 5,1 UF/mes</li><li>Cuota inicial en pesos: ≈ $205.700/mes (mayo 2026)</li><li>Total a pagar: UF 1.213 (≈$48,9M, intereses UF 213)</li></ul><span class="total">Cuota mensual ≈ $206.000 — limitada a 10% ingreso bruto</span></div>
<p>Si tu ingreso bruto al egresar es $1.500.000, la cuota máxima legal es $150.000. La diferencia se aplaza con extensión de plazo. Con la <a href="/calculadoras/calculadora-credito-cae">calculadora de CAE</a> puedes simular distintos escenarios de ingreso y plazo.</p>`,
      },
    ],
  },

];

// ============================================
// Helpers
// ============================================

export function getGuiaBySlug(slug: string): Guia | undefined {
  return guias.find((g) => g.slug === slug);
}

export function getGuiasByCategory(category: Guia['category']): Guia[] {
  return guias.filter((g) => g.category === category);
}
