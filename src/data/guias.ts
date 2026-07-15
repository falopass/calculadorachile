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
      'Cómo se calcula el sueldo líquido 2026: AFP, 7% salud, cesantía, IUSC y topes. Ejemplos en pesos y calculadora gratis. Fuentes DT y SP.',
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
      'calculadora sueldo líquido',
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-07-08',
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
<ul class="data-grid"><li><span class="data-grid__label">Tope imponible AFP/Salud</span><span class="data-grid__value">90 UF</span></li><li><span class="data-grid__label">Tope imponible cesantía</span><span class="data-grid__value">135,2 UF</span></li><li><span class="data-grid__label">Tasa AFP obligatoria</span><span class="data-grid__value">10% + comisión</span></li><li><span class="data-grid__label">Tasa salud mínima</span><span class="data-grid__value">7%</span></li></ul>`,
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
<p>Solo aplica a trabajadores con contrato indefinido. El trabajador aporta <strong>0,6%</strong> y el empleador <strong>2,4%</strong> (Ley 19.728). Para contratos a plazo fijo, el trabajador no aporta nada y el empleador paga 3,0%. El tope imponible para cesantía es <strong>135,2 UF</strong> mensuales en 2026, distinto y más alto que el tope de AFP/Salud.</p>

<h3>4. Impuesto único de segunda categoría</h3>
<p>Es un impuesto progresivo que aplica solo sobre el sueldo que excede 13,5 UTM mensuales (~$952.880 con UTM julio 2026). Se calcula con la tabla del SII (artículo 43 N°1 LIR), que tiene 8 tramos con tasas marginales de 0%, 4%, 8%, 13,5%, 23%, 30,4%, 35% y 40%.</p>
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
        title: 'Topes imponibles 2026: 90 UF y 135,2 UF',
        level: 2,
        html: `<p>Las cotizaciones de AFP y salud se calculan sobre la <strong>remuneración imponible</strong>, que tiene un tope mensual de <strong>90 UF</strong> en 2026 (Superintendencia de Pensiones, Res. Exenta 237). Con UF a $40.826 el tope mensual equivale aproximadamente a $3.674.340.</p>
<p>El seguro de cesantía tiene un tope distinto: <strong>135,2 UF</strong> mensuales, lo que da espacio adicional para sueldos altos.</p>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Por qué tu descuento efectivo baja con sueldos altos</strong><p>Si tu sueldo bruto supera $3.674.340, las cotizaciones de AFP y salud se calculan solo sobre el tope. La porción que excede no cotiza, lo que reduce el porcentaje efectivo de descuento. Para un bruto de $5.000.000, el descuento previsional efectivo cae a ~14% del bruto en lugar del 18% típico.</p></div></aside>
<p>El tope se actualiza anualmente cada febrero por la Superintendencia de Pensiones aplicando la variación real de remuneraciones (ISR) calculada por el INE. La memoria 2025-2026 fijó el tope en 90 UF, levemente superior al 87,8 UF del año anterior.</p>`,
      },
      {
        id: 'ejemplo-completo',
        title: 'Ejemplo completo paso a paso: bruto $1.500.000',
        level: 2,
        html: `<p>Tomemos un caso concreto y desglosémoslo línea por línea para que puedas replicarlo con tus propios números.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Supuestos del ejemplo</strong><p>AFP Habitat (1,27% comisión), FONASA, contrato indefinido, sin bonos ni horas extra, sin asignaciones no imponibles. UF julio 2026: $40.826. UTM julio 2026: $71.649.</p></div></aside>
<div class="numeric-example"><div class="numeric-example__title">Cálculo paso a paso — sueldo bruto $1.500.000</div><ul><li><strong>Imponible</strong>: $1.500.000 (bajo el tope de 90 UF = $3.674.340)</li><li><strong>AFP</strong>: $1.500.000 × 11,27% = <code>$169.050</code></li><li><strong>Salud (7% FONASA)</strong>: $1.500.000 × 7% = <code>$105.000</code></li><li><strong>Cesantía (0,6%)</strong>: $1.500.000 × 0,6% = <code>$9.000</code></li><li><strong>Base tributable</strong>: $1.500.000 − ($169.050 + $105.000 + $9.000) = $1.216.950</li><li><strong>Base en UTM</strong>: $1.216.950 ÷ $71.649 ≈ 17,24 UTM</li><li>Tramo: 13,5 a 30 UTM → factor 4%, rebaja 0,54 UTM</li><li><strong>Impuesto</strong>: (17,24 × 0,04 − 0,54) × $71.649 = <code>$10.557</code></li><li><strong>Total descuentos</strong>: $169.050 + $105.000 + $9.000 + $10.557 = $293.607</li></ul><span class="total">Sueldo líquido: $1.206.393 (factor 80,4%)</span></div>
<p>Para validar tu propio cálculo con tu AFP y plan de salud específicos, usa la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a>, que también permite simular cambios de AFP, FONASA vs Isapre y presupuestar el efecto de bonos imponibles.</p>`,
      },
      {
        id: 'casos-bajo-medio-alto',
        title: 'Casos numéricos: sueldo bajo, medio y alto',
        level: 2,
        html: `<p>Tres escenarios típicos para entender cómo cambia el factor bruto-líquido según el tramo del sueldo. Todos los ejemplos asumen AFP Habitat (1,27%), FONASA y contrato indefinido.</p>
<div class="numeric-example"><div class="numeric-example__title">Sueldo bajo — bruto $553.553 (ingreso mínimo)</div><ul><li><strong>AFP (11,27%)</strong>: <code>$62.385</code></li><li><strong>Salud FONASA (7%)</strong>: <code>$38.749</code></li><li><strong>Cesantía (0,6%)</strong>: <code>$3.321</code></li><li><strong>Base tributable</strong>: $553.553 − $104.455 = $449.098</li><li><strong>Base UTM</strong>: $449.098 ÷ $71.649 ≈ 6,4 UTM (bajo 13,5 UTM exento)</li><li><strong>Impuesto</strong>: $0 (tramo exento)</li><li><strong>Total descuentos</strong>: $104.455</li></ul><span class="total">Líquido: $449.098 — factor 81,1% (sin impuesto único)</span></div>
<div class="numeric-example"><div class="numeric-example__title">Sueldo medio — bruto $1.500.000 (ya calculado arriba)</div><ul><li>Total descuentos: $293.607 (incluye $10.557 de impuesto único 4% marginal)</li></ul><span class="total">Líquido: $1.206.393 — factor 80,4%</span></div>
<div class="numeric-example"><div class="numeric-example__title">Sueldo alto — bruto $4.000.000 (sobre tope imponible)</div><ul><li><strong>Imponible AFP/Salud</strong>: tope 90 UF = <code>$3.674.340</code> (no $4M)</li><li><strong>AFP (11,27% sobre tope)</strong>: <code>$408.714</code></li><li><strong>Salud FONASA (7% sobre tope)</strong>: <code>$253.860</code></li><li><strong>Imponible cesantía</strong>: $4.000.000 (bajo tope cesantía 135,2 UF ≈ $5,5M)</li><li><strong>Cesantía (0,6%)</strong>: <code>$24.000</code></li><li><strong>Base tributable</strong>: $4.000.000 − $686.574 = $3.313.426</li><li><strong>Base UTM</strong>: $3.313.426 ÷ $71.649 ≈ 46,9 UTM (tramo 30-50 UTM, factor 8%, rebaja 1,2 UTM)</li><li><strong>Impuesto</strong>: (46,9 × 0,08 − 1,2) × $71.649 ≈ <code>$179.953</code></li><li><strong>Total descuentos</strong>: $866.527</li></ul><span class="total">Líquido: $3.133.473 — factor 78,3% (a pesar del impuesto, el tope ayuda)</span></div>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Patrones que aparecen</strong><p>(1) En sueldo mínimo el factor es alto (~81%) porque no hay impuesto único. (2) En sueldo medio el factor cae al rondar 80% por el impuesto que empieza a morder. (3) En sueldo alto el factor vuelve a subir levemente porque el tope imponible "frena" las cotizaciones, aunque el impuesto crece.</p></div></aside>`,
      },
      {
        id: 'gratificacion-legal',
        title: 'Gratificación legal: el 25% que casi nadie entiende',
        level: 2,
        html: `<p>La <strong>gratificación legal</strong> es uno de los conceptos más confusos del derecho laboral chileno. Está regulada por los artículos 47 a 50 del Código del Trabajo: las empresas con fines de lucro y que registren utilidad líquida deben gratificar a sus trabajadores con uno de estos dos sistemas — el que les convenga al empleador:</p>
<ol class="steps">
<li><strong>Gratificación legal A (art. 47)</strong>: 30% de la utilidad líquida del ejercicio, repartida entre los trabajadores en proporción a sus remuneraciones.</li>
<li><strong>Gratificación legal B (art. 50)</strong>: 25% de la remuneración mensual de cada trabajador, con tope anual de 4,75 ingresos mínimos mensuales (≈$2.629.377 en 2026 con sueldo mínimo $553.553).</li>
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
<li><strong>Aplicar el 10% AFP sobre todos los haberes</strong>: solo aplica sobre los <em>imponibles</em> y solo hasta el tope de 90 UF.</li>
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
<p>Porque el imponible excluye haberes no imponibles (movilización, colación) y porque está topado en 90 UF. Si tu bruto incluye $50.000 de movilización, tu imponible será $50.000 menor que el bruto.</p>`,
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
    updatedAt: '2026-07-13',
    readingTime: 22,
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
      'seguro-cesantia-finiquito-2026-afc',
      'finiquito-2026-ejemplo-sueldo-minimo',
    ],
    sources: [
      { label: 'Código del Trabajo (BCN)', url: 'https://www.bcn.cl/leychile/navegar?idNorma=207436' },
      { label: 'DT — oportunidad del finiquito', url: 'https://dt.gob.cl/portal/1628/w3-article-60613.html' },
      { label: 'DT — cálculo del feriado proporcional', url: 'https://dt.gob.cl/portal/1628/w3-article-60200.html' },
      { label: 'DT — reclamo por despido', url: 'https://www.dt.gob.cl/portal/1626/w3-article-125086.html' },
      { label: 'DT — indemnización por obra o faena', url: 'https://dt.gob.cl/portal/1628/w3-article-118059.html' },
      { label: 'AFC — certificado aporte empleador', url: 'https://www.afc.cl/empleadores/sus-certificados/' },
    ],
    sections: [
      {
        id: 'que-es-finiquito',
        title: '¿Qué es el finiquito?',
        level: 2,
        html: `<p>El <strong>finiquito</strong> documenta la causal de término, los pagos pendientes y los acuerdos con que se cierra una relación laboral. No es, en la mayoría de los casos, lo que produce el despido: el contrato ya terminó por la causal y fecha comunicadas. Su importancia está en que puede pagar derechos y adquirir efecto liberatorio respecto de las materias que las partes aceptaron.</p>
<p>Un buen finiquito permite reconstruir el cálculo. Debe separar remuneraciones, feriado, indemnización por años, aviso previo, descuentos y cualquier reserva. Una cifra global impide saber si la causal, la base o los días fueron correctos.</p>
<p>El artículo 177 del <a href="https://www.bcn.cl/leychile/navegar?idNorma=207436" target="_blank" rel="noopener">Código del Trabajo</a> exige al empleador otorgarlo y poner su pago a disposición dentro de <strong>10 días hábiles</strong> desde la separación. La firma del trabajador puede ocurrir después; el plazo obliga al empleador, no fuerza al trabajador a aceptar en diez días.</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Papel o Mi DT</strong><p>Puede ratificarse ante ministro de fe o tramitarse como finiquito laboral electrónico. En Mi DT el trabajador puede aceptar, rechazar o aceptar con reserva. Si se pactan cuotas, el acuerdo debe cumplir los artículos 63 bis y 169: escrito, con reajustes e intereses y ratificado ante la Inspección del Trabajo.</p></div></aside>`,
      },
      {
        id: 'componentes-finiquito',
        title: 'Componentes del finiquito',
        level: 2,
        html: `<h3>1. Sueldo devengado</h3>
<p>Días trabajados del último mes que aún no se han pagado. Se calcula como <code>sueldo_mensual × días_trabajados ÷ 30</code>.</p>

<h3>2. Vacaciones proporcionales</h3>
<p>La regla general acumula <strong>1,25 días hábiles</strong> por mes completo, más la fracción diaria desde la contratación o última anualidad. Después hay que proyectar esos días desde el día siguiente al término e incluir sábados, domingos y festivos que atraviese el período. Por eso el monto no se obtiene multiplicando solo 1,25 por el valor diario.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo DT: 8 meses y 2 días</div><ul><li>Días hábiles: 1,25 × 8 + 0,04167 × 2 = <code>10,08</code></li><li>El calendario del caso oficial agrega 4 días inhábiles</li><li>Total indemnizable: <code>14,08 días corridos × valor diario</code></li></ul><span class="total">La fecha exacta cambia el resultado</span></div>

<h3>3. Vacaciones pendientes</h3>
<p>El feriado legal o progresivo ya devengado y no usado también debe compensarse al terminar. Revisa comprobantes y solicitudes: la ley permite acumular hasta dos períodos y obliga al empleador a otorgar al menos el primero antes de completar el tercero. No existe un tope general de cinco días progresivos.</p>

<h3>4. Indemnización por años de servicio</h3>
<p>En la regla legal común corresponde cuando el empleador termina por artículo 161 y el contrato duró un año o más: <strong>30 días de la última remuneración por cada año y fracción superior a seis meses</strong>. El máximo general es 11 años para contratos posteriores al 14 de agosto de 1981 y la base mensual no puede superar 90 UF. Un pacto individual o colectivo puede mejorar esta cobertura.</p>

<h3>5. Gratificación proporcional</h3>
<p>Si se pagó mes a mes como anticipo, no se agrega nuevamente todo el año: solo corresponde la cuota del mes de término que esté pendiente. Cuando el sistema depende de utilidades anuales, el derecho proporcional puede quedar sujeto al cierre y determinación posterior. Además, una gratificación mensual puede integrar la base del artículo 172, pero no la base del feriado proporcional.</p>

<h3>6. Indemnización sustitutiva del aviso (art. 162)</h3>
<p>Cuando se invoca el artículo 161, el empleador debe avisar con al menos 30 días de anticipación o pagar una última remuneración mensual. Este concepto es independiente de los años de servicio y no se reduce con la imputación AFC.</p>

<h3>7. Otros haberes y descuentos</h3>
<p>Comisiones ya devengadas, bonos contractuales, horas extra impagas y asignaciones pendientes pueden aparecer según el caso. Todo descuento necesita fundamento. En especial, la rebaja AFC del artículo 13 solo puede afectar años de servicio por artículo 161 y debe coincidir con el certificado de aporte empleador.</p>`,
      },
      {
        id: 'causales-y-derechos',
        title: 'Causales de término y qué se paga en cada una',
        level: 2,
        html: `<table>
<thead><tr><th>Causal</th><th>Indemnización legal</th><th>Dato decisivo</th></tr></thead>
<tbody>
<tr><td>Mutuo acuerdo, art. 159 N.º 1</td><td>Solo la que se pacte</td><td>Leer alcance del acuerdo antes de firmar</td></tr>
<tr><td>Renuncia, art. 159 N.º 2</td><td>No hay años de servicio legales</td><td>Debe constar y ratificarse; se liquidan derechos pendientes</td></tr>
<tr><td>Vencimiento del plazo, art. 159 N.º 4</td><td>No hay IAS general</td><td>Verificar que el plazo no se transformó en indefinido</td></tr>
<tr><td>Conclusión obra/faena, art. 159 N.º 5</td><td><strong>2,5 días por mes</strong> para contratos celebrados desde 2022 y fracción superior a 15 días</td><td>Debe terminar realmente la obra que originó el contrato</td></tr>
<tr><td>Caso fortuito, art. 159 N.º 6</td><td>No hay IAS general</td><td>El empleador debe acreditar imprevisibilidad e irresistibilidad</td></tr>
<tr><td>Causales disciplinarias, art. 160</td><td>No, salvo que tribunal rechace la causal</td><td>Carta y hechos deben ser específicos y probados</td></tr>
<tr><td>Necesidades de la empresa o desahucio, art. 161</td><td><strong>30 días por año</strong>, si cumple antigüedad</td><td>Aviso de 30 días o sustitutiva; posible imputación AFC</td></tr>
<tr><td>Autodespido, art. 171</td><td>Puede generar indemnizaciones y recargos si el tribunal acoge</td><td>Requiere comunicación y demanda dentro de plazo</td></tr>
</tbody>
</table>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Recargos del artículo 168</strong><p>Un tribunal puede aumentar la indemnización por años en 30% si declara improcedente el artículo 161; 50% si rechaza una causal del artículo 159 o no se invocó causa; y 80% si rechaza el artículo 160. Para las causales 1, 5 o 6 del artículo 160 invocadas sin motivo plausible, el recargo puede llegar a 100%.</p></div></aside>
<p>“Despido injustificado” no es una causal que el empleador elige en el finiquito. Es una declaración judicial posterior. Mientras no exista sentencia o acuerdo, la propuesta reflejará la causal que figura en la carta, aunque el trabajador la discuta.</p>`,
      },
      {
        id: 'ejemplo-finiquito',
        title: 'Ejemplo numérico: despido por necesidades de la empresa',
        level: 2,
        html: `<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Caso reproducible</strong><p>Última remuneración computable de $900.000, contrato desde el 1 de marzo de 2018 y término por artículo 161 el 15 de julio de 2026. No hubo aviso. El sueldo de julio está pendiente y no existen vacaciones de anualidades anteriores. El ejemplo omite una eventual imputación AFC para mostrar primero el bruto.</p></div></aside>
<p>La antigüedad es de ocho años y cuatro meses: la fracción no supera seis meses, por lo que se pagan ocho años. Desde la última anualidad hasta el término transcurrieron cuatro meses y 14 días, equivalentes a 5,58 días hábiles de feriado proporcional.</p>
<p>Al proyectarlos desde el 16 de julio aparecen el feriado legal del 16, el sábado 18 y el domingo 19. La compensación llega aproximadamente a 8,58 días corridos, no a 5,58.</p>
<div class="numeric-example"><div class="numeric-example__title">Cálculo antes de descuentos</div><ul>
<li>Sueldo 15 días de julio: 15 × $30.000 = <code>$450.000</code></li>
<li>Feriado proporcional: 8,58 × $30.000 ≈ <code>$257.500</code></li>
<li>Años de servicio: 8 × $900.000 = <code>$7.200.000</code></li>
<li>Aviso previo: <code>$900.000</code></li>
</ul><span class="total">Total ilustrativo: $8.807.500</span></div>
<p>El certificado AFC podría reducir solo la línea de $7.200.000. Una gratificación ya pagada mensualmente no se añade de nuevo, aunque puede haber integrado la base de $900.000. Usa la <a href="/calculadoras/calculadora-finiquito">calculadora de finiquito</a> para ordenar conceptos, pero reproduce el feriado con fecha y calendario.</p>`,
      },
      {
        id: 'finiquito-casos-bajo-medio-alto',
        title: 'La base no es siempre el sueldo bruto de la liquidación',
        level: 2,
        html: `<p>Antes de multiplicar por años, construye la última remuneración mensual del artículo 172. Incluye cantidades que se recibían mensualmente por prestar servicios y las cotizaciones de cargo del trabajador. Excluye asignación familiar, horas extra y beneficios esporádicos o de pago anual. Para remuneración variable utiliza el promedio de los últimos tres meses calendario.</p>
<table><thead><tr><th>Concepto</th><th>Años de servicio / aviso</th><th>Feriado</th></tr></thead><tbody>
<tr><td>Sueldo fijo</td><td>Se incluye</td><td>Se incluye</td></tr>
<tr><td>Comisión variable</td><td>Promedio últimos 3 meses</td><td>Promedio últimos 3 meses</td></tr>
<tr><td>Gratificación mensual</td><td>Puede integrar por periodicidad</td><td>No integra la base según DT</td></tr>
<tr><td>Horas extra</td><td>Se excluyen</td><td>No forman la remuneración íntegra ordinaria</td></tr>
<tr><td>Colación y movilización</td><td>Revisar naturaleza; normalmente no son remuneración</td><td>No se incorporan como sueldo</td></tr>
<tr><td>Bono anual</td><td>Se excluye por esporádico</td><td>No se prorratea automáticamente</td></tr>
</tbody></table>
<h3>Tope de 90 UF</h3>
<p>La base de años de servicio y aviso no puede superar 90 UF del último día del mes anterior al pago. Si en esa fecha la UF fuera $40.826, el máximo mensual sería $3.674.340. Cinco años darían $18.371.700, no cinco sueldos completos de $4 millones. La UF del ejemplo es una fotografía: consulta el valor aplicable al pago real.</p>
<p>El tope no limita sueldo pendiente ni feriado. Tampoco limita el total del finiquito: limita la remuneración mensual usada en las indemnizaciones del título correspondiente.</p>`,
      },
      {
        id: 'plazos-legales',
        title: 'Plazos legales: cuánto tiempo tiene el empleador para pagar',
        level: 2,
        html: `<p>El empleador tiene <strong>10 días hábiles</strong> desde la separación para otorgar el finiquito y poner el pago a disposición. Ese plazo no debe confundirse con los plazos para reclamar. Si no cumple, el trabajador puede:</p>
<ol class="steps">
<li>Ingresar un reclamo por despido o prestaciones adeudadas en la <a href="https://www.dt.gob.cl/portal/1626/w3-article-125086.html" target="_blank" rel="noopener">Inspección del Trabajo</a>.</li>
<li>Exigir el pago y los reajustes e intereses laborales que correspondan. El artículo 173 establece intereses para indemnizaciones desde el término, incluso si se ofrecen dentro de los diez días.</li>
<li>Demandar dentro del plazo específico de la acción, sin esperar indefinidamente la audiencia administrativa.</li>
</ol>
<table><thead><tr><th>Acción</th><th>Plazo orientador</th><th>Cómo se cuenta</th></tr></thead><tbody>
<tr><td>Despido injustificado, indebido, improcedente o autodespido</td><td><strong>60 días hábiles</strong></td><td>Desde la separación; el reclamo DT suspende, con máximo absoluto de 90 días hábiles</td></tr>
<tr><td>Acciones por derechos regidos por el Código</td><td>Regla de 2 años desde que se hicieron exigibles</td><td>Al terminar el vínculo, las acciones derivadas de actos o contratos prescriben en 6 meses, sin extender el plazo original</td></tr>
<tr><td>Cobro de horas extra</td><td>6 meses</td><td>Desde que debieron pagarse</td></tr>
</tbody></table>
<p>Estos plazos no son intercambiables. Decir “tengo dos años para impugnar el finiquito” puede hacer perder la acción de despido de 60 días. La DT cuenta los días hábiles laborales de lunes a sábado, excluidos festivos.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Nulidad del despido por cotizaciones</strong><p>Si al término existen cotizaciones previsionales impagas y se cumplen los requisitos del artículo 162, un tribunal puede aplicar la sanción de nulidad: el empleador debe pagar remuneraciones y prestaciones desde el despido hasta su convalidación. No se activa solo por marcar una casilla en la calculadora; exige revisar certificados y normalmente ejercer la acción judicial.</p></div></aside>`,
      },
      {
        id: 'requisitos-validez',
        title: 'Requisitos de validez del finiquito',
        level: 2,
        html: `<p>La fuerza liberatoria depende del texto aceptado y de las formalidades. Antes de ratificar:</p>
<ul>
<li>Comprueba que causal y fecha coincidan con la carta de término.</li>
<li>Exige conceptos y montos separados, incluida cualquier imputación AFC.</li>
<li>Revisa que el pago esté disponible o que las cuotas hayan sido aceptadas expresamente.</li>
<li>Ratifica ante un ministro de fe habilitado o mediante el sistema electrónico de la DT.</li>
<li>Descarga el PDF, comprobantes y certificado AFC; una vista temporal del portal no basta.</li>
</ul>
<h3>Reserva de derechos</h3>
<p>El trabajador puede aceptar con una reserva específica y recibir las sumas no discutidas. No necesita el consentimiento del empleador para formular la reserva. Conviene identificar materias concretas: causal de despido, diferencia en base del artículo 172, feriado, nulidad por cotizaciones o descuento AFC.</p>
<p>Una frase genérica puede generar una discusión posterior sobre su alcance. Tampoco es necesario reservar lo que ya se rechazó íntegramente, pero rechazar todo puede retrasar fondos no controvertidos. La decisión depende del documento y de la estrategia del caso.</p>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Finiquito electrónico</strong><p>La propuesta en Mi DT no se entiende aceptada por silencio. Si la aceptas con o sin reserva, el empleador debe efectuar el pago dentro del flujo electrónico. Si rechazas, el empleador aún debe disponer el finiquito por otra vía y las acciones judiciales siguen sujetas a sus plazos.</p></div></aside>`,
      },
      {
        id: 'errores-frecuentes',
        title: 'Errores frecuentes en el cálculo del finiquito',
        level: 2,
        html: `<aside class="callout callout--error"><span class="callout__icon" aria-hidden="true">❌</span><div class="callout__body"><strong>Un total plausible también puede estar mal</strong><p>La mayoría de los errores nace antes de la multiplicación: causal equivocada, base incompleta, fecha ausente o pago duplicado.</p></div></aside>
<ul>
<li><strong>Usar el líquido bancario:</strong> las indemnizaciones se calculan con la última remuneración mensual del artículo 172, antes de descuentos del trabajador.</li>
<li><strong>Tratar toda gratificación igual:</strong> la mensual puede integrar la base indemnizatoria; la anual o esporádica se excluye. Si ya se anticipó mes a mes, no se vuelve a sumar como deuda anual.</li>
<li><strong>Aplicar tope de 11 años cuando el contrato es anterior al 14/08/1981</strong>: para esos casos no aplica el tope (artículo 7 transitorio Ley 19.010).</li>
<li><strong>Pagar solo días hábiles de feriado:</strong> primero se determina el saldo hábil y después se agregan sábados, domingos y festivos incluidos al proyectarlo desde el día siguiente al término.</li>
<li><strong>Olvidar la indemnización sustitutiva del aviso</strong>: si despiden sin avisar 30 días antes, hay que sumar una remuneración mensual.</li>
<li><strong>Redondear seis meses:</strong> solo una fracción superior a seis meses suma un año; seis meses exactos no.</li>
<li><strong>Aplicar el tope de 90 UF cuando no corresponde</strong>: el tope solo aplica a la BASE (remuneración mensual), no al monto total del finiquito.</li>
<li><strong>Inventar un máximo de cinco días progresivos:</strong> el artículo 68 no fija ese tope. Exige diez años de trabajo y luego un día por cada tres nuevos años con el empleador actual, pudiendo hacerse valer hasta diez años anteriores.</li>
<li><strong>Omitir la indemnización de obra/faena:</strong> para contratos celebrados desde 2022, la conclusión válida de la obra puede generar 2,5 días por mes y fracción superior a 15 días.</li>
<li><strong>Descontar toda la AFC:</strong> en artículo 161 solo se imputa el aporte CIC del empleador certificado, nunca el 0,6% del trabajador.</li>
</ul>

<h3>Checklist documental antes de decidir</h3>
<ol class="steps">
<li>Carta de término con causal, hechos y fecha de separación.</li>
<li>Contrato, anexos y fecha de ingreso.</li>
<li>Últimas tres liquidaciones y comprobantes de pago.</li>
<li>Certificados de AFP, salud y AFC para revisar cotizaciones.</li>
<li>Registro de vacaciones usadas, progresivas y última anualidad.</li>
<li>Propuesta de finiquito con cada concepto separado.</li>
<li>Certificado de Saldo Aporte Empleador si existe descuento AFC.</li>
<li>Copia de cualquier reserva, reclamo DT y comprobante de recepción.</li>
</ol>

<h3>Cómo usar las calculadoras sin delegar la decisión</h3>
<p>La <a href="/calculadoras/calculadora-finiquito">calculadora de finiquito</a> ordena años de servicio, aviso y conceptos pendientes. La de <a href="/calculadoras/calculadora-indemnizacion-anos-servicio">indemnización</a> aísla la base y los recargos. Hoy la herramienta de <a href="/calculadoras/calculadora-vacaciones-proporcionales">vacaciones proporcionales</a> no pide fecha de término y, por ello, no puede incluir con exactitud el calendario: usa el resultado hábil como punto de partida, no como liquidación final.</p>
<p>Las preguntas de foros laborales se utilizaron para identificar errores reales —gratificación duplicada, seis meses redondeados, cuenta AFC completa y firma sin reserva—, pero las reglas de esta guía se comprobaron en Código del Trabajo, Dirección del Trabajo y AFC. Contenido revisado al 13 de julio de 2026.</p>

<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Alcance YMYL</strong><p>Esta guía enseña a revisar un cálculo; no determina la causal ni reemplaza asesoría jurídica. Si hay despido discutido, cotizaciones impagas, tutela de derechos, fuero, embarazo, accidente laboral o montos relevantes, obtén orientación antes de que venza el plazo judicial.</p></div></aside>`,
      },
    ],
  },

  // ============================================
  // 3. UF, UTM e IPC en Chile
  // ============================================
  {
    slug: 'uf-utm-indicadores-chile',
    title: 'UF, UTM e IPC en Chile: cómo leerlos y usarlos en 2026',
    intent: '¿Qué son y cómo se usan la UF, UTM e IPC?',
    description:
      'Qué significan UF, UTM, UTA e IPC, qué fecha usar en contratos y multas, cómo se conectan con la inflación y cómo interpretar dólar, TPM y TMC sin mezclar indicadores.',
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
    updatedAt: '2026-07-13',
    readingTime: 19,
    relatedCalculators: [
      'calculadora-uf-clp',
      'calculadora-utm-clp',
      'calculadora-conversor-divisas',
      'calculadora-reajuste-arriendo',
    ],
    relatedArticles: ['todo-sobre-uf-chile', 'reajuste-arriendo-uf-2026', 'tope-imponible-2026'],
    sources: [
      { label: 'Banco Central — metodología UF', url: 'https://si3.bcentral.cl/estadisticas/Principal1/Metodologias/EMF/UF.pdf' },
      { label: 'Banco Central — preguntas estadísticas', url: 'https://www.bcentral.cl/es/areas/estadisticas/preguntas-frecuentes-estadisticas' },
      { label: 'SII — UTM, UTA e IPC 2026', url: 'https://www.sii.cl/valores_y_fechas/utm/utm2026.htm' },
      { label: 'INE — IPC de junio 2026', url: 'https://www.ine.gob.cl/sala-de-prensa/prensa/general/noticia/2026/07/08/%C3%ADndice-de-precios-al-consumidor-%28ipc%29-de-junio-present%C3%B3-una-variaci%C3%B3n-mensual-de-0-0' },
      { label: 'CMF — Tasa Máxima Convencional', url: 'https://www.cmfchile.cl/educa/621/w3-article-27169.html' },
    ],
    sections: [
      {
        id: 'que-es-uf',
        title: '¿Qué es la UF (Unidad de Fomento)?',
        level: 2,
        html: `<p>La <strong>Unidad de Fomento</strong> es una unidad de cuenta reajustable expresada en pesos. No es una moneda que se compre en billetes ni una tasa de interés. Permite mantener en términos reales el valor de créditos, contratos, topes y coberturas mientras cambia el nivel de precios.</p>
<p>El Banco Central calcula una trayectoria diaria usando la variación mensual del IPC publicada por el INE. El nuevo tramo se publica en el Diario Oficial a más tardar el día 9 y rige desde el <strong>10 de ese mes hasta el 9 del siguiente</strong>, ambos incluidos.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Reajuste geométrico, no un salto mensual</strong><p>Si el IPC del mes anterior fue <em>p</em> y el período tiene <em>d</em> días, el factor diario responde a <code>(1 + p)^(1/d)</code>. El alza o baja se distribuye gradualmente. Si el IPC es 0,0%, la UF permanece constante durante el tramo. Para pagos y escrituras siempre prevalece la tabla oficial, porque intervienen redondeos.</p></div></aside>
<p>Ejemplo de calendario: el IPC de junio de 2026 fue 0,0%. Ese dato determina que la UF se mantenga sin variación acumulada durante el período del 10 de julio al 9 de agosto, aunque su valor de partida sea el alcanzado el 9 de julio. El IPC publicado el 8 de julio no reescribe los valores de los primeros nueve días del mes.</p>
<h3>Qué fecha de UF usar</h3>
<p>No existe un único “valor UF de julio” para todas las operaciones. Un dividendo puede convertir con la UF del día de pago; una indemnización laboral con la UF del último día del mes anterior; una compraventa con la fecha pactada en la escritura. Antes de convertir, busca en la norma o contrato la fecha de referencia.</p>
<div class="numeric-example"><div class="numeric-example__title">Conversión fechada</div><ul><li>10 UF × $40.844,79 (valor oficial del 9 de julio de 2026)</li><li>Resultado: $408.447,90</li><li>Redondeo comercial ilustrativo: $408.448</li></ul><span class="total">La misma cantidad de UF puede dar otro CLP al día siguiente</span></div>`,
      },
      {
        id: 'donde-se-usa-uf',
        title: '¿Dónde se usa la UF?',
        level: 2,
        html: `<table><thead><tr><th>Uso</th><th>Qué queda fijo</th><th>Qué puede cambiar</th></tr></thead><tbody>
<tr><td>Crédito hipotecario</td><td>Saldo y dividendo expresados en UF según contrato</td><td>Equivalente mensual en pesos, seguros y tasa pactada</td></tr>
<tr><td>Arriendo pactado en UF</td><td>Cantidad de UF durante el período acordado</td><td>Pesos de cada vencimiento</td></tr>
<tr><td>Seguros</td><td>Prima, deducible o cobertura en UF</td><td>Equivalente CLP en la fecha del siniestro o pago</td></tr>
<tr><td>Topes previsionales 2026</td><td>90 UF para AFP/salud y 135,2 UF para cesantía</td><td>Pesos imponibles de cada mes</td></tr>
<tr><td>Subsidios de vivienda</td><td>Topes y aportes definidos en el programa</td><td>Valor en pesos al momento que indique el beneficio</td></tr>
<tr><td>Ganancia inmobiliaria</td><td>Límite acumulado de 8.000 UF bajo requisitos</td><td>Conversión de cada enajenación y costo tributario</td></tr>
</tbody></table>
<p>La UF reajusta el capital, pero <strong>no reemplaza el interés</strong>. En un hipotecario “UF + 4%”, la deuda se expresa en UF y además devenga la tasa contractual. Decir que el crédito solo sube con el IPC omite esa segunda capa.</p>
<p>Tampoco todo contrato se reajusta automáticamente. Un arriendo en pesos queda en pesos hasta que opere la cláusula pactada o una renovación; no se puede imponer UF retroactivamente porque aumentó la inflación. La <a href="/calculadoras/calculadora-reajuste-arriendo">calculadora de reajuste de arriendo</a> debe usarse con el período y mecanismo escrito en el contrato.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>UF no significa precio justo</strong><p>Que una deuda, arriendo o multa esté expresada en UF explica su reajuste, no prueba que el cobro sea legal, que la tasa sea conveniente o que no existan comisiones. Revisa por separado capital, interés, seguros, gastos y fecha de conversión.</p></div></aside>`,
      },
      {
        id: 'que-es-utm',
        title: '¿Qué es la UTM y la UTA?',
        level: 2,
        html: `<p>La <strong>Unidad Tributaria Mensual</strong> es una cantidad de dinero en pesos que sirve como medida o referencia tributaria. Se actualiza por IPC y tiene un solo valor para cada mes. Por eso se usa en multas, límites, sanciones y parámetros legales que necesitan conservar poder adquisitivo sin cambiar la ley cada mes.</p>
<p>En julio de 2026 la UTM oficial es <strong>$71.649</strong>. Una multa de 1,5 UTM cuyo valor se determina en julio equivale a $107.473,50 antes del redondeo aplicable. Si la resolución manda convertir al día de pago o al mes de la infracción, esa instrucción decide cuál UTM usar.</p>
<div class="comparison">
<div class="comparison__header"><div>UF</div><div>UTM</div></div>
<div class="comparison__row"><div>Cambia diariamente</div><div>Cambia por mes</div></div>
<div class="comparison__row"><div>Créditos, contratos, seguros y topes</div><div>Impuestos, multas y umbrales legales</div></div>
<div class="comparison__row"><div>Banco Central calcula y publica</div><div>SII publica la tabla tributaria</div></div>
<div class="comparison__row"><div>La fecha exacta suele importar</div><div>Normalmente importa el mes indicado</div></div>
</div>
<h3>UTA: dos usos que suelen confundirse</h3>
<p>La tabla mensual del SII muestra una equivalencia UTA igual a la UTM de cada fila multiplicada por 12; para julio de 2026 son $859.788. Sin embargo, el artículo 8 del Código Tributario define la <strong>unidad tributaria anual del año comercial</strong> como la UTM vigente en el último mes de ese año multiplicada por doce. El valor anual definitivo de 2026 depende, por tanto, de diciembre.</p>
<p>No uses la equivalencia UTA de julio como si fuera necesariamente la UTA final para la Operación Renta 2027. Revisa qué año comercial y qué tabla pide el formulario, tramo o sanción.</p>
<p>Convierte con el <a href="/calculadoras/calculadora-uf-clp">conversor UF→CLP</a> o el <a href="/calculadoras/calculadora-utm-clp">conversor UTM→CLP</a>, anotando junto al resultado la fecha o mes. Un número sin período no es auditable.</p>`,
      },
      {
        id: 'ipc-chile',
        title: '¿Qué es el IPC?',
        level: 2,
        html: `<p>El <strong>Índice de Precios al Consumidor</strong> mide la variación de precios de una canasta representativa del consumo de los hogares urbanos. No es la Canasta Básica de Alimentos ni significa que cada familia haya sufrido exactamente la misma inflación: cada producto tiene una ponderación promedio y el patrón de gasto personal puede ser distinto.</p>
<p>El INE publica el índice general, variación mensual, acumulada en el año y a doce meses. En junio de 2026 el IPC fue <strong>0,0% mensual</strong>, <strong>2,8% acumulado</strong> y <strong>4,3% a doce meses</strong>. Esas tres cifras responden preguntas diferentes:</p>
<ul>
<li><strong>Mensual:</strong> cuánto cambió el nivel entre mayo y junio.</li>
<li><strong>Acumulado:</strong> cambio desde diciembre de 2025 hasta junio.</li>
<li><strong>Doce meses:</strong> cambio entre junio de 2025 y junio de 2026.</li>
</ul>
<p>En junio, transporte cayó 1,3% y aportó una incidencia negativa, mientras alimentos y bebidas no alcohólicas subieron 0,8%. El 0,0% general no significa que todos los precios quedaron inmóviles: alzas y bajas se compensaron en el índice agregado.</p>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>IPC sin volátiles no es “el IPC verdadero”</strong><p>El INE y el Banco Central publican medidas que excluyen componentes con cambios frecuentes para analizar persistencia. En junio el IPC sin volátiles varió 0,2%. Es una herramienta de análisis monetario; contratos y reajustes que dicen simplemente “IPC” suelen referirse al índice general oficial, salvo definición distinta.</p></div></aside>
<h3>Qué ajusta automáticamente el IPC y qué no</h3>
<p>El IPC alimenta directamente el cálculo de UF y la actualización de UTM. Un contrato en pesos solo se reajusta si contiene una cláusula válida que lo ordena. Sueldo mínimo, PGU y tarifas tienen leyes o metodologías propias: la inflación puede influir en sus decisiones, pero un IPC de 4% no autoriza sumar 4% automáticamente a cada beneficio o precio regulado.</p>
<p>Para reajustar un monto en pesos entre índices, la operación correcta es <code>monto inicial × IPC final ÷ IPC inicial</code>, usando una serie compatible. Sumar porcentajes mensuales produce errores por composición y redondeo.</p>`,
      },
      {
        id: 'dolar-y-otros',
        title: 'Dólar, euro y otros indicadores',
        level: 2,
        html: `<h3>Dólar observado</h3>
<p>El <strong>dólar observado</strong> es un tipo de cambio de referencia calculado por el Banco Central a partir de operaciones del mercado cambiario formal del día hábil bancario anterior. Se publica en el Diario Oficial y rige para el día hábil de publicación. No es necesariamente el precio al que un banco o casa de cambio vende dólares: esas instituciones agregan spread, costos y condiciones comerciales.</p>
<p>Para una factura, declaración tributaria o contrato, no elijas el precio más conveniente entre “observado”, “comprador”, “vendedor” o tarjeta. Usa la regla del documento o del SII para la fecha. En fines de semana y festivos puede regir el último valor hábil según el procedimiento aplicable.</p>

<h3>Paridad y euro</h3>
<p>El Banco Central distingue tipo de cambio nominal —pesos por una unidad de moneda extranjera— y paridad —unidades de moneda respecto del dólar estadounidense—. El valor CLP/EUR puede derivarse de las series oficiales, pero no existe una prima histórica fija de 8% que permita estimarlo sin consultar el día.</p>
<p>El llamado <strong>dólar acuerdo</strong> dejó de ser parte del instrumental cambiario y el Banco Central descontinuó su publicación en enero de 2018. No debe presentarse como un indicador corriente. Si un contrato antiguo todavía lo menciona, requiere interpretar su cláusula de sustitución.</p>

<h3>TPM y TMC no son lo mismo</h3>
<p>La <strong>Tasa de Política Monetaria</strong> es la tasa operacional fijada por el Consejo del Banco Central para conducir la política monetaria. Influye en tasas de corto plazo y se transmite al crédito, ahorro, actividad y precios; no es un piso contractual que obligue a un banco a prestar a “TPM más margen”.</p>
<p>La <strong>Tasa Máxima Convencional</strong> es el límite legal de interés para determinadas operaciones de crédito de dinero. La CMF publica varias TMC según moneda, reajustabilidad, plazo y monto: no existe una sola tasa para todos los créditos. La Ley 18.010 establece consecuencias cuando se pacta un interés superior; antes de comparar convierte tasas a la misma base anual, identifica el tramo y separa interés de cargos permitidos.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>CAE no se compara con TMC de consumo</strong><p>Un crédito estudiantil, hipotecario reajustable, tarjeta y avance tienen reglas y tramos distintos. Comparar solo porcentajes sin moneda, plazo y base puede llevar a una conclusión falsa sobre legalidad o costo.</p></div></aside>`,
      },
      {
        id: 'fuentes-oficiales',
        title: 'Fuentes oficiales de los indicadores',
        level: 2,
        html: `<table><thead><tr><th>Dato</th><th>Fuente que manda</th><th>Frecuencia</th></tr></thead><tbody>
<tr><td>UF</td><td><a href="https://si3.bcentral.cl/indicadoressiete/secure/indicadoresdiarios.aspx" target="_blank" rel="noopener">Banco Central / Diario Oficial</a></td><td>Valor para cada día</td></tr>
<tr><td>UTM y tabla UTA</td><td><a href="https://www.sii.cl/valores_y_fechas/utm/utm2026.htm" target="_blank" rel="noopener">SII</a></td><td>Mensual</td></tr>
<tr><td>IPC general y medidas</td><td><a href="https://www.ine.gob.cl/estadisticas-por-tema/precios-e-inflacion/indice-de-precios-al-consumidor" target="_blank" rel="noopener">INE</a></td><td>Mensual</td></tr>
<tr><td>Dólar observado y paridades</td><td>Banco Central / Diario Oficial</td><td>Días hábiles</td></tr>
<tr><td>TPM</td><td><a href="https://www.bcentral.cl/web/banco-central/areas/politica-monetaria/tasa-de-politica-monetaria" target="_blank" rel="noopener">Banco Central</a></td><td>Según Reunión de Política Monetaria</td></tr>
<tr><td>TMC</td><td><a href="https://www.cmfchile.cl/portal/principal/613/w3-propertyvalue-19272.html" target="_blank" rel="noopener">CMF</a></td><td>Publicaciones por período y tipo de operación</td></tr>
</tbody></table>

<h3>Cómo leer el dato mostrado por CalculaChile</h3>
<p>El sitio intenta resolver valores con prioridad de fuente del Banco Central, luego Mindicador y finalmente un snapshot local de respaldo. La automatización del repositorio actualiza ese snapshot, pero una API puede fallar o el archivo puede tener una fecha anterior. Por eso cada resultado debe mostrar <strong>fecha de observación y origen</strong>; “en vivo” y “fallback” no tienen la misma fuerza para firmar una escritura o pagar una multa.</p>
<p>Al auditar esta guía, el snapshot local estaba generado el 10 de julio de 2026 con UF $40.844,79 y UTM $71.649, pero su campo de IPC mensual mostraba -0,2%, mientras el INE ya había publicado 0,0% para junio. Esa diferencia demuestra por qué no conviene describir todo el bloque como “siempre actualizado”. Para IPC manda el boletín fechado del INE.</p>

<h3>Checklist antes de convertir</h3>
<ol class="steps">
<li>Identifica la unidad: UF, UTM, UTA, IPC o moneda.</li>
<li>Busca la fecha o mes exigido por la norma o contrato.</li>
<li>Consulta la fuente oficial y guarda el valor.</li>
<li>Multiplica unidades por pesos sin redondear prematuramente.</li>
<li>Aplica el redondeo que corresponda al trámite.</li>
<li>Registra fuente, fecha y fórmula junto al resultado.</li>
</ol>
<p>Las dudas observadas en foros —“por qué subió mi dividendo si el IPC dio cero”, “qué UTM usa una multa” o “el dólar observado es el precio de compra”— se utilizaron para ordenar esta guía, no como evidencia estadística. Contenido verificado al 13 de julio de 2026.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Alcance</strong><p>Esta guía explica unidades y fuentes; no predice UF, dólar, inflación ni tasas. Para operaciones financieras o tributarias prevalecen la fecha contractual, la norma aplicable y el valor oficial.</p></div></aside>`,
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
      'ley 21.133',
      'SII',
      'impuesto valor agregado',
      'operación renta independientes',
      'PPM',
      'cotización independientes',
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-07-13',
    readingTime: 20,
    relatedCalculators: [
      'calculadora-iva',
      'calculadora-boleta-honorarios',
      'calculadora-operacion-renta',
      'calculadora-cotizacion-independientes',
      'calculadora-ppm',
    ],
    relatedArticles: ['guia-iva-chile-2026', 'boleta-honorarios-completo'],
    sources: [
      { label: 'SII — boletas de honorarios 2026', url: 'https://www.sii.cl/destacados/boletas_honorarios/' },
      { label: 'SII — nuevos contribuyentes a honorarios', url: 'https://www.sii.cl/ayudas/nuevos_contribuyentes/boleta-honorarios.html' },
      { label: 'Ley sobre Impuesto a las Ventas y Servicios (DL 825)', url: 'https://www.bcn.cl/leychile/navegar?idNorma=6369' },
      { label: 'Ley 21.133 (calendario retención honorarios)', url: 'https://www.bcn.cl/leychile/navegar?idNorma=1128420' },
      { label: 'Previsión Social — opciones para cotizar', url: 'https://previsionsocial.gob.cl/ley-honorarios/opciones-para-cotizar/' },
    ],
    sections: [
      {
        id: 'que-es-iva',
        title: '¿Qué es el IVA?',
        level: 2,
        html: `<p>El <strong>Impuesto al Valor Agregado</strong> grava, con tasa general de <strong>19%</strong>, ventas y servicios definidos por el DL 825, además de importaciones y otros hechos especiales. Desde 2023 la definición de servicio afecto se amplió: la pregunta ya no es solo si una actividad pertenece a primera o segunda categoría, sino si existe una exención expresa.</p>
<p>El vendedor o prestador recarga IVA al cliente y genera <strong>débito fiscal</strong>. El IVA soportado en compras puede transformarse en <strong>crédito fiscal</strong> solo si cumple requisitos: documento tributario válido, vínculo con operaciones del giro, registro y ausencia de una prohibición legal. Una compra personal con factura no crea crédito por sí sola.</p>
<div class="numeric-example"><div class="numeric-example__title">Período mensual simplificado</div><ul><li>Débito por ventas: $570.000</li><li>Crédito admisible por compras: $190.000</li><li>IVA determinado: $570.000 − $190.000</li></ul><span class="total">IVA a enterar antes de otros ajustes: $380.000</span></div>
<p>Si el crédito supera el débito puede quedar remanente para períodos siguientes bajo las reglas del impuesto; no equivale automáticamente a una devolución en efectivo. Exportadores y situaciones especiales tienen mecanismos propios.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>IVA no es ingreso de la empresa</strong><p>Si una factura cobra $119.000 por un neto de $100.000, los $19.000 son débito fiscal. Para medir ventas, margen o utilidad no se deben tratar como precio neto ganado.</p></div></aside>`,
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
<p>El 19% se aplica al neto, por eso el IVA contenido en un precio final no es 19% del bruto: representa <code>19/119</code>, aproximadamente 15,9664%. Sobre $119.000 son $19.000, no $22.610.</p>
<p>La <a href="/calculadoras/calculadora-iva">calculadora de IVA</a> resuelve neto, impuesto y total, pero no decide si la operación está afecta, exenta o fuera del hecho gravado. Esa clasificación debe hacerse primero.</p>`,
      },
      {
        id: 'exenciones-iva',
        title: 'Bienes y servicios exentos de IVA',
        level: 2,
        html: `<p>Las exenciones deben leerse de forma estricta en el artículo 12 y normas especiales. No basta que una actividad parezca “social” o “profesional”. Entre las más relevantes están:</p>
<ul>
<li><strong>Personas naturales independientes:</strong> los ingresos del artículo 42 N.º 2 de la Ley de Renta documentados con boleta de honorarios están exentos de IVA.</li>
<li><strong>Sociedades de profesionales:</strong> pueden quedar exentas si cumplen todos los requisitos y tributan en segunda categoría. Una SpA comercial no se vuelve sociedad de profesionales por describir consultoría en su objeto.</li>
<li><strong>Educación:</strong> establecimientos educacionales, por ingresos propios de su actividad docente. Venta de materiales, arriendo u otros servicios requieren análisis separado.</li>
<li><strong>Salud:</strong> existen exenciones institucionales y para determinadas prestaciones ambulatorias; no toda facturación de una clínica o centro está exenta.</li>
<li><strong>Transporte de pasajeros:</strong> cubierto en los términos de la norma, distinto del transporte de carga.</li>
<li><strong>Exportaciones:</strong> tienen tratamiento especial y pueden dar derecho a recuperar crédito fiscal bajo procedimiento, por lo que “exento” no significa perder siempre todo crédito.</li>
</ul>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Los libros pagan IVA en Chile</strong><p>La venta de libros, diarios y revistas no tiene una exención general. Incluirlos en una lista automática de exentos produce precios y declaraciones erróneas. También son demasiado amplias las frases “toda salud” o “todo servicio financiero”.</p></div></aside>
<p>Desde el 1 de enero de 2023 la regla general es que los servicios están afectos salvo exención. Antes de emitir, revisa forma jurídica, categoría tributaria, naturaleza exacta del servicio y cliente; no copies el documento de otro profesional.</p>`,
      },
      {
        id: 'boleta-honorarios',
        title: 'Boleta de honorarios: qué es y cuándo emitir',
        level: 2,
        html: `<p>La <strong>boleta de honorarios electrónica</strong> documenta rentas de segunda categoría obtenidas por una persona que presta servicios de manera independiente. Identifica emisor, receptor, fecha, descripción, bruto, retención o PPM y líquido. No es una factura exenta ni una boleta de ventas.</p>
<p>Según la guía del SII, debe emitirse al momento en que se paga el servicio y admite un máximo de 90 días posteriores a ese pago. La fecha determina tasa y año de renta; acumular boletas de diciembre para emitirlas en abril distorsiona registros y puede cambiar el período tributario.</p>
<h3>Boleta no prueba independencia laboral</h3>
<p>Si en los hechos hay subordinación y dependencia —horario, jefatura, control, continuidad y obligación personal— el documento tributario no elimina los derechos laborales. En foros se repite “me obligan a boletear con horario”; esa pregunta se resuelve con la realidad del vínculo, no con el porcentaje de retención.</p>
<ol class="steps"><li>Inicia actividades de segunda categoría con un código coherente.</li><li>Emite en SII con RUT correcto y descripción verificable.</li><li>Define correctamente quién retiene.</li><li>Descarga la boleta y guarda contrato, pago y respaldo del servicio.</li><li>Corrige errores con la anulación del SII, no editando el PDF.</li></ol>`,
      },
      {
        id: 'retencion-honorarios',
        title: 'Retención de la boleta de honorarios (Ley 21.133)',
        level: 2,
        html: `<p>Desde el 1 de enero hasta el 31 de diciembre de 2026 la tasa es <strong>15,25%</strong> del honorario bruto. La Ley 21.133 la eleva a 16% en 2027 y 17% en 2028.</p>
<p>El sistema distingue dos flujos. Si el receptor está obligado a retener, descuenta el porcentaje, paga el líquido y entera la retención. Si no retiene, el emisor recibe el bruto y debe declarar y pagar su PPM en el Formulario 29. No basta decir que “una persona natural nunca retiene” o que “toda empresa retiene”: selecciona la opción que corresponda al receptor.</p>
<p>La <strong>Ley 21.133</strong> estableció un calendario progresivo de retención que sube del 14,5% en 2025 al 17% en 2028:</p>
<table>
<thead><tr><th>Año</th><th>Retención o PPM</th><th>Cambio</th></tr></thead>
<tbody>
<tr><td>2025</td><td>14,50%</td><td>+0,75 punto</td></tr>
<tr><td><strong>2026</strong></td><td><strong>15,25%</strong></td><td>+0,75 punto</td></tr>
<tr><td>2027</td><td>16,00%</td><td>+0,75 punto</td></tr>
<tr><td>2028</td><td>17,00%</td><td>+1 punto</td></tr>
</tbody>
</table>
<div class="numeric-example"><div class="numeric-example__title">Boleta bruta $1.000.000</div><ul><li>Retención: $1.000.000 × 15,25% = $152.500</li><li>Líquido cuando retiene el receptor: $847.500</li><li>Si no retiene: recibes $1.000.000 y reservas $152.500 para PPM</li></ul><span class="total">Disponible después de retención o reserva: $847.500</span></div>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>No existe una división 10% + 5,25% por boleta</strong><p>El 15,25% es pago provisional. En la Operación Renta se consolida con impuesto anual y cotizaciones según ingresos, gastos, topes, afiliación y modalidad de cobertura. No puedes afirmar que $100.000 de este ejemplo ya son impuesto definitivo y $52.500 cotizaciones.</p></div></aside>
<p>Si pactaste un líquido, el bruto es <code>líquido ÷ 0,8475</code>. Para recibir $500.000 líquidos debes emitir aproximadamente $589.971 brutos, sujeto al redondeo del SII.</p>`,
      },
      {
        id: 'exencion-honorarios',
        title: 'Cotizaciones y situaciones especiales',
        level: 2,
        html: `<p>La obligación previsional de independientes se determina anualmente. La renta imponible se calcula, en términos generales, sobre 80% de los honorarios brutos del año anterior, sujeta a mínimos, topes y coordinación con cotizaciones como dependiente.</p>
<p>En la Operación Renta 2026, basada en honorarios de 2025, existen dos modalidades transitorias:</p>
<ul>
<li><strong>Cobertura completa:</strong> cotiza sobre 100% de la renta imponible anual y entrega cobertura completa entre julio de 2026 y junio de 2027.</li>
<li><strong>Cobertura parcial:</strong> en 2026 calcula salud y pensiones sobre 80% de la renta imponible; ATEP, SANNA y SIS mantienen cobertura sobre la base completa definida para esos seguros. Puede aumentar la devolución, pero reduce prestaciones de salud y pensión.</li>
</ul>
<p>No todas las personas están obligadas en idénticos términos. El umbral oficial se expresa en honorarios anuales equivalentes a cinco ingresos mínimos mensuales y existen reglas por edad, pensión, afiliación y cotización simultánea. La guía anterior usaba “5 UTM mensuales” y “7,5 UTA”, parámetros que no corresponden a esta prueba.</p>
<p>La retención se aplica al emitir aunque después resulte una excepción previsional. La situación final se resuelve en el F22, no modificando manualmente el 15,25% de cada boleta.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Cobertura no es devolución</strong><p>Elegir solo por “cuánto me devuelven” puede reducir el monto de licencias médicas, protección maternal y ahorro previsional. Consulta el simulador de la Subsecretaría de Previsión Social antes de confirmar.</p></div></aside>`,
      },
      {
        id: 'operacion-renta-independientes',
        title: 'Operación Renta para independientes',
        level: 2,
        html: `<p>Las boletas emitidas durante 2026 se consolidarán, por regla general, en la <strong>Operación Renta 2027</strong>. La declaración realizada en abril de 2026 usa rentas y retenciones de 2025. Confundir año calendario con año tributario lleva a usar una tasa o UTA equivocada.</p>
<p>El proceso anual considera:</p>
<ol class="steps">
<li>El SII totaliza tus boletas emitidas en el año calendario anterior.</li>
<li>Rebaja gastos presuntos de 30% con tope de 15 UTA, o gastos efectivos acreditados; no ambos.</li>
<li>Integra otras rentas, rebajas y créditos para calcular el Global Complementario.</li>
<li>Determina cotizaciones obligatorias y modalidad previsional.</li>
<li>Imputa retenciones y PPM según el orden legal.</li>
<li>Obtiene devolución, saldo cero o monto por pagar.</li>
</ol>
<p>Para el Año Tributario 2026, el tope de gastos presuntos de 15 UTA fue $12.517.560 y el tramo exento del Global Complementario llegó a $11.265.804. Esas cifras corresponden a rentas 2025; no deben copiarse como cierre definitivo de rentas 2026 porque dependen de la UTA de diciembre.</p>
<div class="numeric-example"><div class="numeric-example__title">Honorarios 2025 usados por la guía SII</div><ul><li>Ingresos brutos: $22.000.000</li><li>Gasto presunto 30%: $6.600.000</li><li>Base de honorarios: $15.400.000</li></ul><span class="total">Después se integran otras rentas, créditos y retenciones</span></div>
<p>Una devolución alta no prueba que el impuesto esté “bien calculado” si faltan boletas, gastos fueron rechazados o existen cotizaciones pendientes. Revisa la propuesta del SII contra tus documentos antes de enviarla.</p>

<h3>Checklist mensual</h3>
<ol class="steps"><li>Clasifica la operación: factura afecta, factura exenta o boleta de honorarios.</li><li>Emite con fecha, RUT y descripción correctos.</li><li>Confirma quién retiene o paga PPM.</li><li>Declara F29 dentro del calendario SII aplicable a tu modalidad.</li><li>Concilia registro de compras/ventas, boletas y pagos.</li><li>Guarda respaldo de gastos efectivos o proyecta el 30% presunto.</li><li>Reserva caja para impuesto y cotizaciones; el líquido no es utilidad libre.</li></ol>
<p>Calcula bruto y líquido con la <a href="/calculadoras/calculadora-boleta-honorarios">calculadora de boleta</a>, IVA con la <a href="/calculadoras/calculadora-iva">calculadora de IVA</a> y el escenario anual con la <a href="/calculadoras/calculadora-operacion-renta">calculadora de Operación Renta</a>. Cada herramienta responde una etapa distinta.</p>
<p>Contenido verificado al 13 de julio de 2026 con DL 825, SII, Ley 21.133 y Subsecretaría de Previsión Social. Preguntas de comunidades se usaron para detectar la falsa división de la retención, dudas bruto/líquido y boleteo subordinado; no como fuente tributaria.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Alcance YMYL</strong><p>Una sociedad, exportación de servicios, cliente extranjero, plataforma digital o combinación de sueldo y honorarios puede requerir análisis específico. Prevalecen tu régimen, documentos y las instrucciones vigentes del SII.</p></div></aside>`,
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
      'Guía verificada del crédito hipotecario en Chile 2026: UF, tasa y CAE, evaluación bancaria, seguros, gastos operacionales, subsidio al dividendo y prepago.',
    category: 'vivienda',
    categoryLabel: 'Vivienda y hogar',
    keywords: [
      'crédito hipotecario chile 2026',
      'dividendo UF',
      'CAE crédito',
      'seguro desgravamen',
      'seguro incendio',
      'pie crédito hipotecario',
      'capacidad endeudamiento hipotecario',
      'tasa hipotecaria 2026',
      'prepago hipotecario',
      'tabla amortización francesa',
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-07-13',
    readingTime: 20,
    relatedCalculators: [
      'calculadora-credito-hipotecario',
      'calculadora-uf-clp',
      'calculadora-subsidio-habitacional',
      'calculadora-costo-notaria',
      'calculadora-contribuciones',
    ],
    relatedArticles: ['todo-sobre-uf-chile', 'reajuste-arriendo-uf-2026'],
    sources: [
      { label: 'CMF — información sobre créditos hipotecarios', url: 'https://www.cmfchile.cl/educa/621/w3-propertyvalue-45031.html' },
      { label: 'CMF — simulador de créditos hipotecarios', url: 'https://servicios.cmfchile.cl/simuladorhipotecario/' },
      { label: 'CMF — seguros hipotecarios obligatorios', url: 'https://www.cmfchile.cl/educa/621/w3-article-27508.html' },
      { label: 'CMF — costo y condiciones del prepago', url: 'https://www.cmfchile.cl/educa/621/w3-article-27382.html' },
      { label: 'Ley 18.010 sobre operaciones de crédito', url: 'https://www.bcn.cl/leychile/navegar?idNorma=29438' },
      { label: 'ChileAtiende — Subsidio al Dividendo', url: 'https://www.chileatiende.gob.cl/preguntas-frecuentes/subsidio-al-dividendo' },
    ],
    sections: [
      {
        id: 'estructura-credito',
        title: 'Qué se contrata realmente',
        level: 2,
        html: `<p>Un crédito hipotecario financia la compra, construcción, ampliación o reparación de un inmueble y deja la propiedad en garantía. No todos los productos son iguales: existen mutuos hipotecarios endosables y no endosables, créditos con letras y el Crédito Hipotecario Universal, cada uno con reglas de financiamiento, cesión y prepago.</p>
<p>La modalidad más usada para comparar ofertas es el mutuo no endosable en UF, tasa fija y dividendos periódicos. “Tasa fija” significa que la tasa no cambia; no congela el pago en pesos. Capital, dividendo y saldo se expresan en UF, cuyo equivalente en pesos varía diariamente con la inflación pasada.</p>
<p>En una cuota de amortización, una parte paga intereses y otra reduce capital. Al inicio suele predominar el interés; con el tiempo aumenta la amortización. La fórmula financiera permite estimar la cuota sin seguros, pero la obligación cobrada incluye pólizas y puede incorporar otros conceptos pactados.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>UF + tasa son dos efectos distintos</strong><p>La tasa remunera el crédito sobre capital reajustado. La UF actualiza ese capital en pesos. Decir “la tasa es 4%” no significa que el costo en pesos aumentará solo 4% anual; la trayectoria de la UF también influye.</p></div></aside>`,
      },
      {
        id: 'pie-y-financiamiento',
        title: 'Pie y relación entre precio y tasación',
        level: 2,
        html: `<p>El pie es la parte del precio que no cubre el crédito. No existe un porcentaje bancario universal: depende del producto, destino, perfil, garantía estatal y política de riesgo. Una publicidad de “hasta 90%” no obliga a aprobar ese financiamiento.</p>
<p>La institución encarga una tasación independiente del precio acordado. Si compras en 3.000 UF, solicitas 2.700 UF y el banco tasa en 2.800 UF, puede calcular su máximo sobre 2.800 UF. La diferencia entre precio y crédito la cubre el comprador, además de gastos operacionales. Una preaprobación por renta no garantiza que la propiedad pase tasación y estudio de títulos.</p>
<p>Antes de firmar una promesa, define qué ocurre si el crédito se rechaza, la tasación resulta menor o el estudio encuentra un defecto. Una cláusula de salida clara y un plazo realista reducen el riesgo de perder arras o pagar multas contractuales. La reserva comercial no reemplaza esa revisión.</p>
<p>Subsidios habitacionales pueden complementar ahorro y crédito bajo reglas propias. El <a href="https://www.chileatiende.gob.cl/preguntas-frecuentes/subsidio-al-dividendo" target="_blank" rel="noopener">Subsidio al Dividendo de la Ley 21.748</a> es distinto: reduce 0,6 puntos porcentuales de tasa para viviendas nuevas de hasta 4.000 UF, incorpora garantía estatal y se tramita por la entidad financiera. Está disponible hasta el 27 de mayo de 2027 o hasta agotar 50.000 cupos; exige, entre otros requisitos, que la promesa sea desde el 1 de enero de 2025.</p>`,
      },
      {
        id: 'capacidad-endeudamiento',
        title: 'Cómo evalúa el banco y cómo estresar el presupuesto',
        level: 2,
        html: `<p>La “regla del 25%” es una referencia doméstica, no una prohibición legal ni criterio idéntico en todos los bancos. La evaluación incorpora renta acreditable, estabilidad, edad, historial, deudas vigentes, cupos de tarjetas y líneas, número de dependientes, pie, plazo, codeudor y características de la propiedad.</p>
<p>Una persona independiente puede necesitar declaraciones de renta, boletas, pagos provisionales y antigüedad de actividad. Un bono anual o ingreso informal no siempre se reconoce igual que un sueldo. Si postulan dos personas, la institución evalúa la obligación conjunta y las coberturas de seguro para cada una.</p>
<p>La aprobación máxima tampoco es un presupuesto prudente. Antes de comprometerse, prueba tres escenarios:</p>
<ol class="steps">
<li><strong>UF más alta:</strong> aumenta el equivalente en pesos del dividendo durante doce meses.</li>
<li><strong>Menor ingreso:</strong> elimina bonos, horas extra o parte del ingreso variable.</li>
<li><strong>Propiedad real:</strong> suma seguros, contribuciones, gastos comunes, mantención y traslados.</li>
</ol>
<p>Si el hogar solo puede pagar usando cupo de tarjeta o sin fondo de emergencia, el problema no se resuelve alargando el crédito. Un plazo mayor baja el dividendo, pero aumenta el total de intereses y mantiene la exposición a UF por más años.</p>`,
      },
      {
        id: 'cae-real',
        title: 'Tasa, CAE y costo total: cómo comparar',
        level: 2,
        html: `<p>La tasa anual del mutuo calcula intereses; la <strong>CAE</strong> busca expresar el costo anual de la operación bajo supuestos comparables. No compares una tasa de vitrina con la CAE de otra oferta, ni ofertas con distintos montos, plazos, fecha, moneda o tipo de crédito.</p>
<p>La simulación pública de la CMF muestra tasa, dividendo con desgravamen e incendio y CAE para la modalidad seleccionada. Aun así advierte que las cifras son informativas y que su CAE considera esos seguros. Tasación, estudio de títulos, notaría, impuesto e inscripción son gastos de cierre que deben revisarse aparte en la cotización y escritura.</p>
<table>
<thead><tr><th>Dato</th><th>Pregunta que responde</th><th>Riesgo de leerlo solo</th></tr></thead>
<tbody>
<tr><td>Tasa</td><td>¿Qué interés se aplica?</td><td>Omite seguros y reajuste UF</td></tr>
<tr><td>Dividendo en UF</td><td>¿Cuál es la cuota financiera?</td><td>No fija el pago futuro en pesos</td></tr>
<tr><td>CAE</td><td>¿Cuál es el costo anual comparable?</td><td>Depende del flujo y conceptos incluidos</td></tr>
<tr><td>Costo total</td><td>¿Cuánto se desembolsa en el plazo?</td><td>Un plazo más largo puede parecer cómodo</td></tr>
</tbody>
</table>
<p>Solicita hoja resumen, tabla de desarrollo, cotización de seguros y gastos operacionales. La <a href="/calculadoras/calculadora-credito-hipotecario">calculadora hipotecaria</a> reproduce un escenario con los datos ingresados; una CAE “real” solo puede salir del flujo completo de la oferta, no de una tasa estimada.</p>`,
      },
      {
        id: 'seguros-obligatorios',
        title: 'Seguros obligatorios: desgravamen e incendio',
        level: 2,
        html: `<h3>Desgravamen</h3>
<p>La cobertura básica paga al acreedor el saldo insoluto en caso de muerte del deudor asegurado. Invalidez de dos tercios puede contratarse como adicional; no está incluida por el solo nombre “desgravamen”. Si hay codeudores, revisa porcentaje asegurado por persona, declaración de salud, exclusiones y edad máxima.</p>
<h3>Incendio y adicionales</h3>
<p>El seguro obligatorio cubre incendio del inmueble dado en garantía. Sismo, salida de mar, rotura de cañerías y otros riesgos son adicionales que deben constar en la póliza. El monto asegurado suele considerar valor de tasación sin terreno bajo las reglas aplicables; no equivale al precio comercial completo ni asegura muebles.</p>
<p>Las pólizas colectivas son licitadas por la entidad por cuenta y cargo de los clientes. Dentro de los primeros 30 días de vigencia se debe entregar información estandarizada de cobertura. En daños parciales, revisa cuánto de la indemnización se aplica a deuda y cuánto se destina a reparación.</p>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">✓</span><div class="callout__body"><strong>Se puede presentar una póliza individual</strong><p>La persona puede contratar con otra aseguradora, pero la póliza debe cumplir coberturas, beneficiario, vigencia y condiciones exigidas por la entidad. No hay un ahorro garantizado: compara prima, deducible, exclusiones y continuidad antes de cambiar.</p></div></aside>`,
      },
      {
        id: 'gastos-asociados',
        title: 'Gastos asociados al crédito',
        level: 2,
        html: `<p>Además del pie, el proceso puede cobrar los siguientes gastos, que deben acreditarse con documentos:</p>
<table>
<thead><tr><th>Concepto</th><th>Qué financia</th><th>Qué revisar</th></tr></thead>
<tbody>
<tr><td>Tasación</td><td>Valor de la garantía</td><td>Informe y devolución si no se usa</td></tr>
<tr><td>Estudio de títulos y escritura</td><td>Revisión jurídica y contrato</td><td>Alcance, observaciones y correcciones</td></tr>
<tr><td>Notaría</td><td>Firma y copias autorizadas</td><td>Arancel desglosado</td></tr>
<tr><td>Conservador</td><td>Dominio, hipoteca y prohibiciones</td><td>Carátula, inscripciones y derechos</td></tr>
<tr><td>Timbres y estampillas</td><td>Impuesto sobre el mutuo</td><td>Base, tasa y exención o rebaja aplicable</td></tr>
</tbody>
</table>
<p>No existe un porcentaje único de “gastos operacionales”: varían por institución, inmueble, número de inscripciones y arancel. El impuesto de timbres tiene reglas propias y ciertos refinanciamientos pueden acceder a exención proporcional. Exige liquidación final y devolución de provisiones no utilizadas.</p>
<p>La <a href="/calculadoras/calculadora-costo-notaria">calculadora de notaría</a> entrega escenarios, no una cotización. El banco debe conservar disponibles los antecedentes que justifican cobros del mutuo.</p>`,
      },
      {
        id: 'prepago',
        title: 'Prepago: cuándo conviene',
        level: 2,
        html: `<p>En mutuos otorgados después del 26 de junio de 2004 cuyo capital no supera 5.000 UF, el prepago es un derecho irrenunciable bajo el artículo 10 de la Ley 18.010. En operaciones reajustables —como un mutuo en UF— se paga capital anticipado, intereses hasta la fecha efectiva y una comisión máxima de <strong>un mes y medio de intereses sobre el capital prepagado</strong>. No son 1,5 dividendos.</p>
<p>Un prepago inferior al 10% del saldo requiere consentimiento del acreedor; sobre 5.000 UF, las condiciones se acuerdan. Los créditos con letras tienen reglas distintas. Pide liquidación escrita porque el saldo del portal no incorpora necesariamente intereses del día y comisión.</p>
<p>En un prepago parcial se puede reducir dividendo manteniendo plazo o acortar plazo manteniendo una cuota similar, conforme a escritura y acuerdo. Reducir plazo suele ahorrar más interés, pero la comparación debe incluir comisión, liquidez que pierde el hogar y fondo de emergencia.</p>
<h3>Refinanciar o portar</h3>
<p>Una tasa menor no garantiza ahorro si hay nueva tasación, estudio, notaría, inscripción, seguros y costo de prepago. Compara saldo actual, costo de salida, costo de entrada y flujo completo al mismo plazo restante. En refinanciamientos que cumplen requisitos puede operar una exención de timbres proporcional.</p>
<p>Si aparecen dificultades de pago, contactar antes del atraso permite evaluar alternativas. Una renegociación puede bajar la cuota alargando plazo y aumentar el costo total; exige nueva tabla. No entregues anticipos a gestores que prometen “tasa aprobada” fuera de canales de la entidad.</p>
<h3>Checklist antes de firmar</h3>
<ol class="steps"><li>Compara ofertas con igual monto, plazo, moneda y fecha.</li><li>Lee tasa, CAE, costo total, seguros y gastos por separado.</li><li>Confirma tasación y aprobación jurídica de la propiedad.</li><li>Simula UF alta y pérdida parcial de ingreso.</li><li>Revisa cláusula de prepago, mora, seguros y alzamiento.</li><li>No firmes promesa sin salida por rechazo o tasación insuficiente.</li></ol>
<p>Verifica que banco, cooperativa, compañía de seguros o administrador de mutuos figure en los registros de la CMF cuando corresponda. Un ejecutivo legítimo puede pedir antecedentes financieros para evaluar, pero no necesita tu ClaveÚnica, clave bancaria ni códigos de autorización. Tampoco transfieras “gastos de aprobación” a una cuenta personal: exige canal institucional y comprobante con el concepto.</p>
<p>La aprobación tiene etapas. Una simulación pública no revisa tus ingresos; una preevaluación no aprueba la garantía; y la aprobación comercial puede quedar condicionada al estudio de títulos, tasación, seguros y firma. Pregunta qué condiciones siguen pendientes y hasta qué fecha se mantiene la tasa ofrecida. Si la escritura difiere de la cotización, detén la firma y pide explicación por escrito.</p>
<p>Contenido revisado al 13 de julio de 2026. Una simulación no constituye aprobación ni oferta; prevalecen cotización, pólizas y escritura.</p>`,
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
    updatedAt: '2026-07-13',
    readingTime: 20,
    relatedCalculators: [
      'calculadora-comparador-afp',
      'calculadora-simulador-apv',
      'calculadora-pgu',
      'calculadora-cotizacion-independientes',
    ],
    relatedArticles: ['diferencia-sueldo-bruto-liquido'],
    sources: [
      { label: 'Superintendencia de Pensiones — nueva cotización del empleador', url: 'https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-10906.html' },
      { label: 'ChileAtiende — Pensión Garantizada Universal', url: 'https://www.chileatiende.gob.cl/fichas/102077-pension-garantizada-universal-pgu' },
      { label: 'ChileAtiende — Beneficio por Años Cotizados', url: 'https://www.chileatiende.gob.cl/preguntas-frecuentes/beneficio-anos-cotizados' },
      { label: 'Ley 21.735 (Reforma Previsional)', url: 'https://www.bcn.cl/leychile/navegar?idNorma=1208948' },
      { label: 'D.L. 3.500', url: 'https://www.bcn.cl/leychile/navegar?idNorma=7147' },
    ],
    sections: [
      {
        id: 'sistema-previsional',
        title: 'El sistema previsional chileno',
        level: 2,
        html: `<p>La pregunta “¿cuánto recibiré de pensión?” no se responde multiplicando el último sueldo por un porcentaje. La pensión contributiva depende del saldo acumulado, los meses efectivamente cotizados, la rentabilidad neta, la edad al pensionarse, las personas beneficiarias y la modalidad elegida. La edad legal es 60 años para las mujeres y 65 para los hombres, pero cumplirla no obliga a pensionarse de inmediato.</p>
<p>Desde la <a href="https://www.bcn.cl/leychile/navegar?idNorma=1208948" target="_blank" rel="noopener">Ley 21.735</a>, conviven cuatro capas que conviene separar:</p>
<ol class="steps">
<li><strong>Ahorro individual obligatorio:</strong> el 10% imponible del trabajador entra a su cuenta AFP. Ese dinero y su rentabilidad financian la parte contributiva individual.</li>
<li><strong>Seguro Social Previsional:</strong> recibe parte de la nueva cotización del empleador y financia prestaciones definidas por ley. No es una segunda cuenta AFP ni todo el aporte patronal queda disponible para retiro individual.</li>
<li><strong>PGU:</strong> es un beneficio estatal sujeto a edad, residencia, focalización y pensión base. No exige estar pensionado para solicitarla y no es correcto describirla como una pensión universal sin requisitos.</li>
<li><strong>Ahorro voluntario:</strong> APV, depósitos convenidos y otras alternativas permiten complementar el ahorro obligatorio, con costos y efectos tributarios distintos.</li>
</ol>
<p>Esta separación evita dos errores frecuentes: sumar la PGU como si estuviera garantizada para cualquier persona y atribuir todo el aporte del empleador al saldo individual. Una proyección responsable debe mostrar cada componente por separado y declarar sus supuestos.</p>`,
      },
      {
        id: 'cotizacion-obligatoria',
        title: 'Cotización obligatoria del 10%',
        level: 2,
        html: `<p>El artículo 17 del <a href="https://www.bcn.cl/leychile/navegar?idNorma=7147" target="_blank" rel="noopener">D.L. 3.500</a> establece que el trabajador dependiente cotiza un <strong>10% de su remuneración imponible</strong> en la cuenta de capitalización individual. Además paga la comisión de su AFP. Salud, seguro de cesantía e impuestos son descuentos distintos y no aparecen en el ejemplo siguiente.</p>
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
<p>Las tasas publicadas por la <a href="https://www.spensiones.cl/portal/institucional/594/w3-article-2815.html" target="_blank" rel="noopener">Superintendencia de Pensiones</a> muestran cuánto cobra cada administradora sobre la remuneración imponible. En un imponible de $1.000.000, la diferencia mensual entre 0,46% y 1,45% es $9.900. Es un costo verificable, pero no basta para anticipar la pensión: servicio, trámites y rentabilidad deben compararse en el mismo fondo y período, nunca mezclando un Fondo A con un Fondo E.</p>
<p>Quienes ingresan por primera vez al sistema son asignados a la AFP adjudicataria de la licitación vigente durante el período legal correspondiente. Por eso, “elegir la más barata” no siempre es una acción inmediata para una persona recién afiliada. La cartola y el certificado de afiliación permiten comprobar dónde están llegando las cotizaciones.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>El aporte patronal no se descuenta del líquido</strong><p>El SIS y la nueva cotización previsional son de cargo del empleador. Hasta julio de 2026, el SIS vigente es 1,62% y la nueva cotización suma 1%. Desde las remuneraciones de agosto cambia la estructura: el total legal llega a 3,5%, SIS incluido. Sumarlos nuevamente produciría un costo duplicado.</p></div></aside>`,
      },
      {
        id: 'topes-y-tipos-cuenta',
        title: 'Tope imponible y tipos de cuenta',
        level: 2,
        html: `<p>El <strong>tope imponible mensual para pensiones en 2026 es 90 UF</strong>. El equivalente en pesos cambia con la UF del día; por eso una cifra fija en pesos envejece rápido. Si la remuneración imponible supera el tope, la cotización obligatoria se calcula sobre 90 UF y no sobre todo el sueldo. El tope del seguro de cesantía es otro y no debe reutilizarse sin verificarlo.</p>
<p>Una persona puede tener distintas cuentas o productos previsionales:</p>
<ul>
<li><strong>Cuenta obligatoria:</strong> recibe el 10%, la fracción individual que corresponda de la nueva cotización y su rentabilidad.</li>
<li><strong>Cuenta 2 o ahorro voluntario:</strong> permite ahorrar y retirar bajo sus reglas, sin convertir cada depósito en APV.</li>
<li><strong>APV:</strong> puede contratarse en una AFP u otra institución autorizada y acogerse al régimen tributario A o B.</li>
<li><strong>Depósitos convenidos:</strong> se originan en acuerdos con el empleador y tienen tratamiento propio.</li>
<li><strong>Cuenta de indemnización:</strong> aplica a relaciones laborales específicas, como trabajadores de casa particular, y no reemplaza la cuenta obligatoria.</li>
</ul>
<p>Antes de simular una pensión, descarga la cartola y revisa las “lagunas”: meses trabajados sin pago registrado, remuneraciones imponibles menores a las reales o pagos declarados y no enterados. Un promedio de sueldo no revela esos vacíos. Si hay diferencias, contrasta liquidaciones, Previred y cartola; el reclamo debe dirigirse con documentos, no con una proyección hipotética.</p>`,
      },
      {
        id: 'multifondos',
        title: 'Multifondos: del A al E',
        level: 2,
        html: `<p>Hasta marzo de 2027, las AFP ofrecen cinco multifondos con límites distintos de renta variable. Los rangos legales ayudan a entender el riesgo, pero no describen la cartera exacta de un día:</p>
<table>
<thead><tr><th>Fondo</th><th>Renta variable permitida</th><th>Lectura práctica</th></tr></thead>
<tbody>
<tr><td>A</td><td>40% a 80%</td><td>Mayor variación esperable</td></tr>
<tr><td>B</td><td>25% a 60%</td><td>Riesgo alto, menor que A</td></tr>
<tr><td>C</td><td>15% a 40%</td><td>Posición intermedia</td></tr>
<tr><td>D</td><td>5% a 20%</td><td>Menor exposición accionaria</td></tr>
<tr><td>E</td><td>0% a 5%</td><td>Menor variación, no riesgo cero</td></tr>
</tbody>
</table>
<p>No existe un fondo “mejor” para toda persona ni una regla seria que ordene permanecer en A o B solo por tener más de diez años hasta la jubilación. Importan el horizonte, la tolerancia a caídas, la capacidad de mantener una decisión y las restricciones de edad. Rentabilidad pasada no asegura rentabilidad futura, y usar el resultado del último mes para perseguir al fondo ganador expone a vender después de una caída y recomprar después de una recuperación.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Los multifondos tienen fecha de término</strong><p>La reforma reemplazará los fondos A–E por fondos generacionales desde el <strong>1 de abril de 2027</strong>. La implementación y las carteras deben seguirse en la Superintendencia; una propuesta técnica difundida durante 2026 no equivale a la composición final. Antes de cambiarte por una noticia, confirma la norma vigente y calcula el plazo real que falta para usar los recursos.</p></div></aside>`,
      },
      {
        id: 'pgu-2026',
        title: 'PGU: Pensión Garantizada Universal',
        level: 2,
        html: `<p>La <strong>PGU</strong> es un beneficio estatal para personas desde los 65 años que cumplen requisitos de focalización, residencia y pensión base. A julio de 2026, los valores oficiales informados por <a href="https://www.chileatiende.gob.cl/fichas/102077-pension-garantizada-universal-pgu" target="_blank" rel="noopener">ChileAtiende</a> son:</p>
<ul class="data-grid"><li><span class="data-grid__label">Máximo entre 65 y 81 años</span><span class="data-grid__value">$231.732</span></li><li><span class="data-grid__label">Máximo desde 82 años</span><span class="data-grid__value">$250.275</span></li><li><span class="data-grid__label">Pensión base para máximo completo</span><span class="data-grid__value">Hasta $789.139</span></li><li><span class="data-grid__label">Límite superior de pensión base</span><span class="data-grid__value">$1.252.602</span></li></ul>
<p>Si la pensión base es igual o inferior a $789.139, corresponde el máximo del tramo de edad, siempre que se cumplan los demás requisitos. Entre $789.139 y $1.252.602 el monto disminuye; desde el límite superior no corresponde PGU. “Pensión base” es un concepto legal calculado por el IPS y no necesariamente coincide con el depósito mensual que la persona ve en su cuenta.</p>
<p>La focalización tampoco se resuelve mirando solo el tramo del Registro Social de Hogares: el requisito es no integrar el 10% más rico de la población y el IPS evalúa antecedentes del grupo familiar conforme a la ley. También se exige residencia en Chile por al menos 20 años desde los 20 años de edad —continuos o discontinuos— y cuatro de los últimos cinco años anteriores a la solicitud, salvo reglas especiales aplicables.</p>
<p>El aumento a $250.275 se implementa por edades: ya alcanza a quienes tienen 82 años o más; desde septiembre de 2026 se extiende a las personas de 75 años o más y desde septiembre de 2027, a quienes tengan 65 años o más. Se puede solicitar aunque la persona continúe trabajando. La <a href="/calculadoras/calculadora-pgu">calculadora de PGU</a> sirve para aproximar el componente por pensión base, pero no reemplaza la evaluación del IPS.</p>`,
      },
      {
        id: 'reforma-2025',
        title: 'Reforma previsional: qué cambia en 2026',
        level: 2,
        html: `<p>La nueva cotización del empleador comenzó en agosto de 2025 y aumenta gradualmente durante nueve años. El destino cambia por etapa; por eso una tabla con una sola tasa no explica cuánto llega a la cuenta individual y cuánto financia el Seguro Social Previsional.</p>
<table>
<thead><tr><th>Remuneración</th><th>Costo previsional de cargo del empleador</th><th>Distribución relevante</th></tr></thead>
<tbody>
<tr><td>Hasta julio de 2026</td><td>1% nuevo + SIS vigente de 1,62%</td><td>0,1% a cuenta individual y 0,9% al FAPP; SIS separado</td></tr>
<tr><td>Desde agosto de 2026</td><td>3,5% total, SIS incluido</td><td>0,1% individual; 1% compensación a mujeres; 0,9% cotización con rentabilidad protegida; 1,5% SIS</td></tr>
<tr><td>Etapa final en 2033</td><td>8,5% total, SIS incluido</td><td>6% a cuentas individuales y 2,5% al Seguro Social Previsional</td></tr>
</tbody>
</table>
<p>Para una remuneración imponible de $1.000.000, el costo de julio es $26.200: $10.000 de nueva cotización y $16.200 de SIS. En agosto, el total es $35.000. El aumento efectivo entre ambos meses es $8.800, no $18.800. Esta distinción importa en liquidaciones, presupuestos de contratación y calculadoras de costo empresa.</p>
<p>La cotización con rentabilidad protegida genera un registro a nombre del trabajador y se devuelve en la pensión bajo las reglas legales; no debe describirse como dinero líquido disponible. La <a href="https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-10906.html" target="_blank" rel="noopener">Superintendencia de Pensiones</a> publica la distribución y su calendario oficial.</p>
<h3>Beneficio por Años Cotizados</h3>
<p>Desde enero de 2026, el BAC agrega <strong>0,1 UF mensuales por cada 12 meses cotizados</strong>, con tope de 25 años, equivalente a un máximo de 2,5 UF mensuales. En la etapa inicial exige al menos 10 años cotizados para mujeres y 20 para hombres. El mínimo femenino aumenta gradualmente desde 2028 hasta llegar a 15 años en 2036. Se paga automáticamente a personas de 65 años o más pensionadas bajo las modalidades cubiertas por la ley; no se solicita como un bono aislado.</p>
<h3>Compensación por diferencias de expectativa de vida</h3>
<p>También desde enero de 2026, determinadas mujeres pensionadas reciben una compensación calculada para reducir la diferencia que produce una expectativa de vida mayor. Tiene un mínimo de 0,25 UF y el porcentaje depende de la edad de pensión: 100% a los 65 años, 75% a los 64, 50% a los 63, 25% a los 62, 15% a los 61 y 5% a los 60. Está afecta a cotización de salud e impuestos cuando corresponda.</p>
<p>Ambos beneficios cuentan como ingreso de pensión y pueden influir en el cálculo de la PGU. Sumarlos íntegros a una PGU estimada, sin recalcular la pensión base, puede sobrestimar el total. El IPS y las entidades previsionales determinan el monto final con el historial real.</p>`,
      },
      {
        id: 'modalidades-pension',
        title: 'Retiro programado, renta vitalicia y decisión de pensionarse',
        level: 2,
        html: `<p>Al pensionarse, el saldo no se transforma automáticamente en un pago fijo de por vida. Las principales modalidades son el <strong>retiro programado</strong>, pagado desde la AFP y recalculado periódicamente, y la <strong>renta vitalicia</strong>, contratada con una compañía de seguros que asume el compromiso de pago en las condiciones pactadas. Existen combinaciones y modalidades con características adicionales.</p>
<p>En retiro programado, los fondos permanecen en la cuenta individual, siguen expuestos a rentabilidad y el monto puede variar. En una renta vitalicia, la decisión es generalmente irrevocable y el saldo destinado a la prima deja de estar en la AFP. La elección depende de ofertas reales, beneficiarios, necesidad de estabilidad, herencia, salud financiera de largo plazo y requisitos de acceso; no se decide solo comparando el primer pago mensual.</p>
<p>El Sistema de Consultas y Ofertas de Montos de Pensión entrega ofertas comparables durante el proceso. Antes de aceptar, revisa si el monto está expresado en UF, las condiciones para beneficiarios de sobrevivencia, períodos garantizados y cláusulas adicionales. Una simulación realizada años antes es orientación, no una oferta vinculante.</p>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">✓</span><div class="callout__body"><strong>Una estimación útil parte por los datos</strong><p>Usa saldo real, fecha de nacimiento, remuneración imponible, meses cotizados y beneficiarios. Prueba escenarios de rentabilidad prudentes y separa la pensión autofinanciada de PGU, BAC y compensaciones. Si el resultado cambia drásticamente con una décima de rentabilidad, la conclusión necesita un rango, no una cifra única.</p></div></aside>`,
      },
      {
        id: 'apv-beneficios',
        title: 'APV: ahorro previsional voluntario',
        level: 2,
        html: `<p>El <strong>APV</strong> permite complementar la pensión y puede contratarse en AFP, bancos, compañías de seguros, administradoras generales de fondos y otras instituciones autorizadas. La rentabilidad no está garantizada: antes de aportar, compara comisión, riesgo, liquidez, calidad de información y costo de trasladar o retirar.</p>
<div class="comparison">
<div class="comparison__header"><div>Régimen A</div><div>Régimen B</div></div>
<div class="comparison__row"><div>El aporte no rebaja la base imponible al depositar</div><div>El aporte puede rebajar la base imponible dentro de los límites legales</div></div>
<div class="comparison__row"><div>Puede acceder a bonificación estatal de 15%, con tope de 6 UTM al año</div><div>El beneficio depende de la tasa de impuesto de la persona</div></div>
<div class="comparison__row"><div>El retiro anticipado obliga a revisar restitución de bonificación y reglas aplicables</div><div>El retiro anticipado queda sujeto a retención y sobretasa según la ley</div></div>
<div class="comparison__row"><div>Suele ser evaluado por personas con menor carga tributaria</div><div>Puede ser más valioso en tramos marginales altos, pero no siempre</div></div>
</div>
<p>En régimen B, el límite general llega a 600 UF anuales, con reglas mensuales según la vía de aporte. Esa cifra es un máximo tributario, no una recomendación de ahorro. En régimen A, la bonificación se calcula bajo condiciones legales y no convierte cualquier retiro en libre de impuestos o devoluciones.</p>
<p>Elegir entre A y B requiere estimar la tasa marginal actual, la situación esperada al pensionarse y la posibilidad real de necesitar el dinero antes. Para explorar saldo y plazo, usa el <a href="/calculadoras/calculadora-simulador-apv">simulador APV</a>, pero valida el tratamiento tributario con la institución y el SII antes de un aporte grande o un retiro.</p>`,
      },
      {
        id: 'checklist-previsional',
        title: 'Qué revisar en 2026 sin caer en atajos',
        level: 2,
        html: `<p>Las preguntas que se repiten en foros —“¿el aporte de mi empleador llega completo a mi AFP?”, “¿perderé la PGU si sigo trabajando?” o “¿qué fondo gana más?”— sirven para detectar confusiones, no para establecer la respuesta. La fuente debe ser la norma, la cartola y el organismo responsable.</p>
<ol class="steps">
<li><strong>Descarga cartola y certificado:</strong> confirma AFP, saldo, fondo, remuneración imponible y meses pagados.</li>
<li><strong>Busca lagunas:</strong> cruza períodos trabajados con liquidaciones y pagos previsionales. Una deuda del empleador no se arregla cambiando el supuesto de la calculadora.</li>
<li><strong>Distingue julio de agosto:</strong> desde agosto de 2026 el 3,5% patronal ya incluye SIS. Revisa que la liquidación o el cálculo de costo empresa no lo sume dos veces.</li>
<li><strong>Actualiza los beneficios:</strong> consulta PGU, BAC y compensación en ChileAtiende o IPS con edad e historial real. Sus montos pueden interactuar.</li>
<li><strong>No persigas rentabilidad mensual:</strong> compara fondos en horizontes equivalentes y considera la transición a fondos generacionales de abril de 2027.</li>
<li><strong>Revisa beneficiarios:</strong> matrimonio, convivencia civil, hijos y otras situaciones pueden cambiar pensiones de sobrevivencia y el cálculo al pensionarse.</li>
<li><strong>Simula un rango:</strong> compara retirarte a la edad legal con postergar, mantener o aumentar aportes. No presentes como promesa el escenario más favorable.</li>
</ol>
<p>Esta guía usa información oficial disponible al 13 de julio de 2026. Tasas, topes y montos previsionales cambian por fecha. Para una decisión irreversible —pensionarse, contratar renta vitalicia o retirar APV— solicita una oferta o certificado vigente y conserva el documento usado.</p>`,
      },
    ],
  },

  // ============================================
  // 7. Vivienda completa: subsidios, contribuciones, notaría
  // ============================================
  {
    slug: 'comprar-vivienda-chile',
    title: 'Comprar vivienda en Chile 2026: revisión, subsidios y escritura',
    intent: '¿Qué debo revisar y pagar antes de comprar e inscribir una vivienda en Chile?',
    description:
      'Guía verificada para comprar vivienda en Chile: promesa, estudio de títulos, subsidios 2026, contribuciones, gastos comunes, escritura e inscripción.',
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
      'estudio de títulos propiedad',
      'promesa compraventa vivienda',
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-07-13',
    readingTime: 22,
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
      { label: 'MINVU — llamado DS1 2026', url: 'https://www.minvu.gob.cl/noticia/minvu-anuncia-la-apertura-del-primer-llamado-de-2026-al-subsidio-para-sectores-medios/' },
      { label: 'MINVU — proyectos DS19 2026', url: 'https://www.minvu.gob.cl/postulacion/llamado-especial-a-concurso-ano-2026-para-proyectos-habitacionales-ds-19/' },
      { label: 'ChileAtiende — certificado de gravámenes y prohibiciones', url: 'https://www.chileatiende.gob.cl/fichas/457-certificado-de-los-registros-de-hipotecas-gravamenes-y-prohibiciones-de-una-propiedad-gp' },
      { label: 'SII — Impuesto Territorial', url: 'https://www.sii.cl/destacados/impuesto_territorial/' },
      { label: 'SII — mayor valor en venta de bienes raíces', url: 'https://www.sii.cl/destacados/renta/2026/personas_naturales.html' },
      { label: 'Ley 21.442 de Copropiedad Inmobiliaria', url: 'https://www.bcn.cl/leychile/navegar?idNorma=1174663' },
      { label: 'CMF — créditos hipotecarios', url: 'https://www.cmfchile.cl/educa/621/w3-propertyvalue-45031.html' },
    ],
    sections: [
      {
        id: 'panorama-comprar',
        title: 'La compra son tres decisiones, no una reserva',
        level: 2,
        html: `<p>Comprar exige decidir si el inmueble sirve, si el título es transferible y si el hogar puede sostenerlo. Una reserva o preaprobación responde, como mucho, una parte. El precio publicado tampoco incluye necesariamente estacionamiento, bodega, corretaje, gastos del crédito, reparaciones ni deudas asociadas.</p>
<p>El proceso responsable avanza en este orden:</p>
<ol class="steps">
<li><strong>Presupuesto:</strong> pie, gastos de cierre, dividendo bajo escenarios de UF, contribuciones, gastos comunes y mantención.</li>
<li><strong>Revisión material:</strong> superficie, estado, recepción municipal, ampliaciones, instalaciones, entorno y riesgos.</li>
<li><strong>Revisión jurídica:</strong> propietario, cadena de títulos, hipotecas, prohibiciones, litigios, deudas y facultades para vender.</li>
<li><strong>Contrato:</strong> promesa con condiciones claras, escritura coherente, pago trazable e inscripción.</li>
<li><strong>Entrega:</strong> llaves, lectura de medidores, inventario, administración y documentos.</li>
</ol>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Firmar no te convierte por sí solo en dueño</strong><p>La compraventa de un inmueble se otorga por escritura pública, pero la tradición del dominio se realiza mediante inscripción en el Registro de Propiedad del Conservador de Bienes Raíces competente. Coordina pago y entrega con ese hito.</p></div></aside>`,
      },
      {
        id: 'revision-propiedad',
        title: 'Qué revisar del inmueble y del vendedor',
        level: 2,
        html: `<p>El nombre del vendedor en una publicación no acredita dominio. Solicita copia de la inscripción vigente y el <a href="https://www.chileatiende.gob.cl/fichas/457-certificado-de-los-registros-de-hipotecas-gravamenes-y-prohibiciones-de-una-propiedad-gp" target="_blank" rel="noopener">certificado de hipotecas, gravámenes y prohibiciones</a>. Este muestra hipotecas, servidumbres, reglamento de copropiedad, embargos o prohibiciones SERVIU, pero debe ser interpretado junto con la historia de títulos.</p>
<p>El estudio suele revisar inscripciones anteriores, escrituras, estado civil, herencias, sociedades, poderes y alzamientos. Si vende una sociedad, una sucesión o un apoderado, hay que comprobar facultades y vigencia. Una hipoteca no impide toda venta, pero exige una estructura de alzamiento y pago coordinada.</p>
<p>Del inmueble, contrasta:</p>
<ul>
<li>dirección, rol, deslindes, superficie de terreno y construida;</li>
<li>certificado de avalúo y deuda de contribuciones o aseo;</li>
<li>permiso y recepción final municipal, incluidas ampliaciones;</li>
<li>certificados de no expropiación municipal y SERVIU cuando correspondan;</li>
<li>afectaciones, utilidad pública, servidumbres y ocupantes;</li>
<li>en condominio, reglamento, planos, deuda, actas y gastos extraordinarios aprobados.</li>
</ul>
<p>Una tasación bancaria estima la garantía; no certifica que una ampliación esté regularizada, que no haya filtraciones ni que el barrio sirva al comprador. Para usado, una inspección técnica independiente puede revisar humedad, techumbre, electricidad, gas, alcantarillado, estructura visible y terminaciones.</p>`,
      },
      {
        id: 'promesa',
        title: 'Promesa y reserva: dónde se concentra el riesgo',
        level: 2,
        html: `<p>La reserva suele apartar temporalmente la propiedad; la promesa obliga a celebrar la compraventa si se cumplen sus condiciones. Ninguna debería firmarse como formulario inocuo. Lee monto, imputación o devolución, plazo, multa, documentos pendientes y quién custodia el dinero.</p>
<p>Una promesa útil identifica propiedad y precio, forma de pago, fecha o condición para firmar, entrega y consecuencias de incumplimiento. Si hay crédito, debe regular qué ocurre ante rechazo, menor tasación, cambio material de tasa o títulos no aprobados. Si hay subsidio, debe respetar su vigencia, precio y mecanismo de pago.</p>
<p>No aceptes una cláusula que declare títulos “a satisfacción” sin plazo ni forma de corregir observaciones. Tampoco entregues todo el pie directamente antes de escritura e inscripción sin una estructura jurídica revisada. Vales vista, instrucciones notariales y desembolso bancario cumplen funciones diferentes; un abogado debe coordinarlos con el caso.</p>
<p>La corredora intermedia, pero no reemplaza estudio jurídico ni responde automáticamente por cada defecto. Su comisión es negociada: no existe una tasa legal obligatoria de 2% por parte. Define por escrito cuándo se devenga, si incluye IVA y qué ocurre si la operación falla por títulos o financiamiento.</p>`,
      },
      {
        id: 'subsidios-habitacionales',
        title: 'Subsidios 2026: programa, llamado y proyecto no son lo mismo',
        level: 2,
        html: `<p>Los programas permanentes se activan mediante llamados con fechas, ahorro y condiciones específicas. A julio de 2026, el primer llamado nacional DS1 cerró el 30 de junio; publicar “postula ahora” sin convocatoria abierta sería engañoso.</p>
<table>
<thead><tr><th>DS1 adquisición 2026</th><th>Zona regular</th><th>Ahorro del llamado</th><th>RSH general</th></tr></thead>
<tbody>
<tr><td>Tramo 1</td><td>Vivienda hasta 1.100 UF</td><td>30 UF</td><td>Hasta 60%</td></tr>
<tr><td>Tramo 2</td><td>Vivienda hasta 1.600 UF</td><td>40 UF</td><td>Hasta 80%</td></tr>
<tr><td>Tramo 3</td><td>Vivienda hasta 2.200 UF</td><td>80 UF</td><td>RSH; tope de ingreso si supera 90%</td></tr>
</tbody>
</table>
<p>En zonas norte, extremo sur, Chiloé, Palena, Juan Fernández y Rapa Nui los máximos pueden subir hasta 2.600 UF según tramo. La cuenta de ahorro debía tener 12 meses y el saldo estar disponible al 29 de mayo. Que el primer llamado no exigiera preaprobación no significa que el crédito posterior esté garantizado.</p>
<p>DS49 se orienta a familias vulnerables y puede permitir compra sin crédito en las modalidades convocadas; sus topes y ahorro dependen del llamado y zona. DS19 no es una postulación individual abierta al “90%”: son proyectos de integración seleccionados, con cupos y precios para grupos distintos. En 2026 las entidades desarrolladoras postulan proyectos hasta agosto; una familia debe verificar que el proyecto y la unidad estén efectivamente incorporados.</p>
<p>El Subsidio al Dividendo de Ley 21.748 tampoco es DS1: se asigna mediante entidad financiera para vivienda nueva de hasta 4.000 UF, sujeto a cupos y fecha. Consulta el estado real en MINVU y usa la <a href="/calculadoras/calculadora-subsidio-habitacional">calculadora de subsidio</a> solo como orientación; los montos exactos dependen de resolución, precio y zona.</p>`,
      },
      {
        id: 'gastos-escritura',
        title: 'Gastos de cierre: pide provisión y liquidación',
        level: 2,
        html: `<p>No hay un porcentaje universal de cierre. Con crédito pueden aparecer tasación, estudio de títulos, redacción, notaría, Conservador, impuesto de timbres y estampillas, seguros y alzamientos. Sin crédito siguen existiendo escritura, certificados e inscripción. Corretaje depende del acuerdo.</p>
<p>Antes de pagar, solicita una provisión desglosada que diga quién cobra, base de cálculo y si incluye IVA. Después exige liquidación y devolución del saldo no usado. Los derechos del Conservador dependen de actos e inscripciones; una escritura con dominio, hipoteca y prohibiciones no cuesta lo mismo que una compraventa al contado.</p>
<p>El impuesto de timbres grava el documento de crédito, no el precio completo por el solo hecho de comprar. Una vivienda nueva puede incorporar IVA en el precio según la operación, mientras la compraventa usada no se trata igual. No sumes ambos impuestos como cargos automáticos sin revisar factura, vendedor y mutuo.</p>
<p>La <a href="/calculadoras/calculadora-costo-notaria">calculadora de costos notariales</a> y la <a href="/guias/credito-hipotecario-chile">guía hipotecaria</a> permiten presupuestar escenarios, pero la cifra exigible surge de cotizaciones y documentos.</p>`,
      },
      {
        id: 'contribuciones',
        title: 'Contribuciones, aseo y costo tributario futuro',
        level: 2,
        html: `<p>El Impuesto Territorial se calcula sobre avalúo fiscal afecto, no precio comercial. En el primer semestre de 2026, la exención habitacional fue $60.030.710; hasta un avalúo de $214.395.361 se aplicó tasa anual de 0,893% sobre la parte afecta y al exceso, 1,042%. Avalúos y exenciones se reajustan semestralmente, así que al comprar en julio debe consultarse el certificado vigente.</p>
<p>Se paga en abril, junio, septiembre y noviembre. La cuota puede incluir sobretasa fiscal, recargo de sitio no edificado o aseo municipal. Una propiedad exenta de contribuciones no necesariamente está exenta de aseo. Estacionamiento y bodega pueden tener roles y tratamiento separados.</p>
<p>Pide certificado de deuda y acuerda prorrateo de la cuota según fecha de entrega. La <a href="/calculadoras/calculadora-contribuciones">calculadora de contribuciones</a> aproxima la tasa, pero el giro SII/TGR incorpora avalúo, exención, destino y sobretasas reales.</p>
<p>Si en el futuro vendes con ganancia, el mayor valor tiene reglas de costo reajustado, partes relacionadas, fecha de adquisición y cupo acumulado de 8.000 UF para determinadas personas naturales. No es una exención automática por “vivienda habitual”. Revisa la <a href="/blog/plusvalia-dfl2-vs-comun-chile">guía tributaria de plusvalía</a> antes de proyectar el neto de venta.</p>`,
      },
      {
        id: 'gastos-comunes',
        title: 'Condominio: deuda, reglamento y gastos futuros',
        level: 2,
        html: `<p>En copropiedad, la obligación de gastos comunes sigue al dominio incluso respecto de deuda anterior. Pide al administrador certificado actualizado y exige que la escritura e instrucciones resuelvan cualquier saldo. No basta una captura de la última transferencia.</p>
<p>Revisa doce meses de avisos, presupuesto, fondo de reserva, morosidad global, seguros, mantenciones y actas. Una cuota extraordinaria aprobada para ascensores, fachada o red de agua puede no aparecer en el promedio histórico. El reglamento define porcentajes de prorrateo, uso de bienes comunes, arriendos y otras reglas.</p>
<p>En proyectos nuevos, la inmobiliaria debe entregar el primer reglamento de copropiedad antes de la promesa o compraventa y dejar constancia. Confirma que estacionamiento y bodega estén incluidos como unidades o derechos en los planos y escritura; una frase comercial “uso y goce” no siempre equivale a dominio independiente.</p>
<p>La <a href="/calculadoras/calculadora-gastos-comunes">calculadora de gastos comunes</a> es un presupuesto exploratorio. La evidencia útil son cobros, contratos y acuerdos del condominio concreto.</p>`,
      },
      {
        id: 'vivienda-nueva-usada',
        title: 'Vivienda nueva y usada: riesgos distintos',
        level: 2,
        html: `<p>En vivienda nueva, verifica que la inmobiliaria y proyecto coincidan con la promesa, que las especificaciones técnicas sean anexas y que exista recepción definitiva antes de la entrega cuando corresponda. Registra observaciones en un acta con fotos, plazo y responsable. Equipamiento piloto, vista futura y fecha estimada no deben confundirse con obligación si no están en contrato.</p>
<p>En usada, el foco es historia de títulos, regularidad municipal, estado físico y ocupación. Pide cuentas de servicios y confirma quién entrega desocupado. Si existe arrendatario, revisa contrato y efectos de la venta; no asumas que la escritura termina de inmediato la ocupación.</p>
<p>Para ambas, visita a distintas horas, revisa ruido, transporte, seguridad vial, riesgo de inundación o incendio y planificación urbana. La plusvalía futura no se puede prometer. Noticias de una estación, carretera o cambio regulatorio sirven para investigar, no para pagar hoy un precio como si la obra estuviera terminada.</p>`,
      },
      {
        id: 'firma-inscripcion-entrega',
        title: 'Escritura, inscripción y entrega',
        level: 2,
        html: `<p>Antes de firmar la escritura, compara nombres, estado civil, precio, roles, deslindes, unidades anexas, forma de pago, alzamientos y fecha de entrega con la promesa. Si hay crédito, revisa también mutuo, tasa, seguros, prohibiciones y mandato. No firmes espacios en blanco ni confíes en que “se corrige después”.</p>
<p>La escritura se presenta al Conservador para inscribir dominio y, cuando corresponda, hipoteca y prohibición. Pide número de carátula y sigue observaciones. Si el Conservador rechaza, hay que subsanar; la transferencia no está concluida solo porque el banco desembolsó o la notaría cerró copias.</p>
<p>En la entrega documenta llaves, controles, medidores, cuentas, inventario y estado. Notifica a administración con copia de inscripción y actualiza contribuciones, aseo, servicios y seguros. Conserva promesa, escritura, inscripción, planos, recepción, liquidaciones y comprobantes: serán necesarios al vender o reclamar.</p>
<h3>Checklist de cierre</h3>
<ol class="steps"><li>Presupuesto con UF estresada y gastos permanentes.</li><li>Inspección física y documentos municipales.</li><li>Estudio de títulos y certificados recientes.</li><li>Promesa condicionada a financiamiento y títulos.</li><li>Subsidio verificado en resolución o proyecto, no en publicidad.</li><li>Deudas de contribuciones, aseo y gastos comunes resueltas.</li><li>Escritura cotejada antes de firmar.</li><li>Inscripción y entrega trazables.</li></ol>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Fraude de instrucciones de pago</strong><p>Confirma cualquier cambio de cuenta por un canal independiente con banco, notaría o parte contractual. No uses enlaces enviados por terceros para ingresar ClaveÚnica o banca. Una dirección de correo parecida no acredita al destinatario de cientos de UF.</p></div></aside>
<p>Información revisada al 13 de julio de 2026. Cada propiedad y llamado de subsidio requiere documentos vigentes; esta guía no reemplaza el estudio jurídico de la operación.</p>`,
      },
    ],
  },

  // ============================================
  // 8. Vehículos: permiso, multas, TAG, SOAP
  // ============================================
  {
    slug: 'vehiculos-chile-permiso-multas',
    title: 'Vehículos en Chile 2026: permiso de circulación, multas y TAG',
    intent: '¿Qué debo pagar y revisar para mantener un vehículo legalmente al día en Chile?',
    description:
      'Guía verificada 2026 de permiso de circulación, SOAP, revisión técnica, multas, TAG, peajes y compra de un vehículo usado en Chile.',
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
      'segunda cuota permiso agosto',
      'comprar auto usado multas',
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-07-13',
    readingTime: 20,
    relatedCalculators: [
      'calculadora-permiso-circulacion',
      'calculadora-multas-transito',
      'calculadora-costo-tag',
      'calculadora-credito-automotriz',
      'calculadora-patente-comercial',
    ],
    relatedArticles: ['todo-sobre-uf-chile'],
    sources: [
      { label: 'ChileAtiende — permiso de circulación 2026', url: 'https://www.chileatiende.gob.cl/fichas/9611-permiso-de-circulacion' },
      { label: 'SII — tasación fiscal de vehículos 2026', url: 'https://www.sii.cl/destacados/tasacion_vehiculos/2026/index.html' },
      { label: 'CMF — coberturas SOAP y Ley Jacinta', url: 'https://www.cmfchile.cl/educa/621/w3-propertyvalue-565.html' },
      { label: 'ChileAtiende — revisión técnica de vehículos', url: 'https://www.chileatiende.gob.cl/fichas/23978-revision-tecnica-de-vehiculos-motorizados' },
      { label: 'Ley 18.290 de Tránsito', url: 'https://www.bcn.cl/leychile/navegar?idNorma=29708' },
      { label: 'Dirección General de Concesiones — peajes y pórticos 2026', url: 'https://concesiones.mop.gob.cl/peajes-y-porticos/' },
      { label: 'ChileAtiende — certificado de multas impagas', url: 'https://www.chileatiende.gob.cl/fichas/3439-certificado-de-multas-de-transito-no-pagadas' },
    ],
    sections: [
      {
        id: 'costos-anuales-auto',
        title: 'El costo anual no sale de una tabla única',
        level: 2,
        html: `<p>Dos autos del mismo precio de compra pueden tener costos anuales muy distintos. El permiso depende de la tasación fiscal y el código SII; el seguro voluntario, del vehículo, conductor, deducible y cobertura; combustible y TAG, del uso; mantención, de kilometraje, garantía y estado mecánico. Publicar un rango “típico” sin esos datos produce una falsa precisión.</p>
<p>Para construir un presupuesto útil, separa:</p>
<ul>
<li><strong>Obligaciones para circular:</strong> permiso, SOAP y revisión técnica u homologación vigente.</li>
<li><strong>Protección voluntaria:</strong> seguro de daños, responsabilidad civil, robo y asistencias, según póliza.</li>
<li><strong>Uso:</strong> combustible o carga, peajes, estacionamiento, lavado y neumáticos.</li>
<li><strong>Propiedad:</strong> mantenciones, reparaciones, depreciación y costo financiero del crédito.</li>
</ul>
<p>Una hoja de cálculo seria usa documentos del auto: valor del permiso 2026 publicado por el SII, cotización SOAP, tarifa de la planta revisora, recorridos mensuales y plan de mantención. Las multas no son “costo de tener auto”; son contingencias evitables y pueden bloquear la renovación.</p>`,
      },
      {
        id: 'permiso-circulacion',
        title: 'Permiso de circulación',
        level: 2,
        html: `<p>Para autos particulares, motos, station wagons, furgones y camionetas, el período general de pago 2026 fue del <strong>1 de febrero al 31 de marzo</strong>. El permiso es un impuesto anual a beneficio municipal. No existe un descuento legal general por pagarlo completo en marzo: las frases que prometen 5% o 10% confunden facilidad de pago con rebaja del impuesto.</p>
<p>El <a href="https://www.sii.cl/destacados/tasacion_vehiculos/2026/index.html" target="_blank" rel="noopener">SII publica la tasación y el valor exacto del permiso</a> por marca, modelo, versión y año. Se consulta con esos datos o con el código SII del permiso anterior. En 2026, el mínimo nacional es $34.876 para vehículos bajo $3.487.600 de tasación. Una tabla porcentual simplificada no reemplaza la nómina oficial.</p>
<p>Los eléctricos e híbridos con recarga eléctrica exterior fabricados desde 2021 que cumplen la clasificación SII pagan en 2026 <strong>25% del impuesto anual</strong>. No basta con que el vendedor llame “híbrido” al modelo: debe aparecer dentro del beneficio oficial.</p>
<p>Para renovar un vehículo usado se exige permiso anterior, padrón, SOAP con vigencia hasta el 31 de marzo de 2027 y revisión técnica o certificado de homologación vigente. Un vehículo nuevo agrega factura, inscripción y certificados de homologación, y paga proporcionalmente por los meses restantes del año.</p>
<p>La <a href="/calculadoras/calculadora-permiso-circulacion">calculadora de permiso</a> puede ayudar a proyectar, pero el monto exigible es el publicado por SII y cobrado por la municipalidad.</p>`,
      },
      {
        id: 'segunda-cuota-y-atraso',
        title: 'Segunda cuota, atraso y vehículo fuera de circulación',
        level: 2,
        html: `<p>Quien eligió dos cuotas pagó 50% hasta marzo y debe enterar la segunda durante agosto, normalmente en la misma municipalidad. La segunda cuota se reajusta por la variación del IPC entre febrero y junio, por lo que no siempre coincide peso a peso con la primera. Septiembre no es el mes de vencimiento de autos particulares.</p>
<p>Si el permiso está atrasado, se agregan intereses, reajustes y una multa de 1,5% del valor del permiso al renovar. Circular sin permiso vigente puede generar una infracción y el retiro del vehículo. Pagar después regulariza el documento, pero no borra automáticamente una denuncia ya cursada.</p>
<p>Si el vehículo no circulará durante todo el año, se puede presentar una declaración jurada simple y pagar el derecho municipal correspondiente hasta el 30 de noviembre. No es una exención retroactiva para un auto que sí circuló. Si se cambia de municipalidad, la nueva entidad pedirá el permiso anterior y documentos vigentes; no se necesita pagar dos veces el mismo período.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Una multa empadronada sigue al vehículo</strong><p>Antes de comprar, consulta el certificado del Registro Civil. Una infracción detectada por patente puede aparecer después de la transferencia por tiempos de tramitación; conserva contrato, fecha de entrega y certificado para pedir al juzgado la corrección que corresponda.</p></div></aside>`,
      },
      {
        id: 'soap',
        title: 'SOAP: Seguro Obligatorio Automotriz',
        level: 2,
        html: `<p>El <strong>SOAP</strong> cubre muerte y lesiones corporales de conductor, pasajeros y terceros involucrados en un accidente en que participe el vehículo asegurado. No cubre daños del auto, robo, responsabilidad por daños materiales ni reemplaza un seguro voluntario.</p>
<p>La Ley 21.797, conocida como Ley Jacinta, cambió las coberturas. Durante 2026–2027 coexisten dos grupos según la fecha de contratación:</p>
<table>
<thead><tr><th>Cobertura por persona</th><th>Antes del 9 feb 2026</th><th>Desde el 9 feb 2026</th></tr></thead>
<tbody>
<tr><td>Muerte</td><td>300 UF</td><td>600 UF</td></tr>
<tr><td>Incapacidad permanente total</td><td>300 UF</td><td>600 UF</td></tr>
<tr><td>Incapacidad permanente parcial</td><td>Hasta 200 UF</td><td>Hasta 400 UF</td></tr>
<tr><td>Gastos médicos y hospitalarios</td><td>Hasta 300 UF</td><td>Hasta 600 UF</td></tr>
</tbody>
</table>
<p>La fecha relevante es la contratación, no el día del accidente. Revisa el certificado y la compañía antes de afirmar qué límite aplica. El precio depende del tipo de vehículo y aseguradora; lo que debe compararse es que la póliza sea válida, sus datos coincidan con la patente y cubra hasta el siguiente 31 de marzo.</p>
<p>Después de un accidente, hay que denunciar, identificar vehículos y solicitar certificado del parte o atención. Los reembolsos exigen documentos médicos y comprobantes. La <a href="https://www.cmfchile.cl/educa/621/w3-propertyvalue-565.html" target="_blank" rel="noopener">CMF</a> publica beneficiarios, exclusiones y antecedentes para cobrar.</p>`,
      },
      {
        id: 'revision-tecnica',
        title: 'Revisión técnica: la patente da preferencia, no vigencia',
        level: 2,
        html: `<p>La revisión técnica certifica sistemas de frenos, dirección, luces, neumáticos, suspensión, emisiones, vidrios, espejos y elementos de seguridad. Es necesaria para renovar el permiso y conducir sin ella constituye una infracción grave.</p>
<p>El calendario por último dígito de patente entrega <strong>preferencia en algunas plantas</strong>: enero 9; febrero 0; abril 1; mayo 2; junio 3; julio 4; agosto 5; septiembre 6; octubre 7; noviembre 8. Marzo y diciembre no tienen dígito preferente. No extiende el certificado hasta ese mes: manda la fecha impresa en el documento o la consulta de estado de la PRT.</p>
<p>Vehículos nuevos pueden usar certificado de homologación durante su vigencia. Desde 2026, algunos modelos nuevos tienen primera revisión entre 36 y 48 meses según el calendario oficial aplicable; no debe suponerse el mismo plazo para toda inscripción. Taxis, buses, transporte escolar y carga pueden tener periodicidades diferentes.</p>
<p>Antes de ir, revisa luces, neumáticos, limpiaparabrisas, cinturones, placas, vidrios y emisiones visibles. Si hay rechazo, conserva el informe: indica defectos y plazo para reinspección. Cotiza en la planta de tu región porque tarifas y reserva dependen de la concesión.</p>`,
      },
      {
        id: 'multas-transito',
        title: 'Multas de tránsito',
        level: 2,
        html: `<p>La <a href="https://www.bcn.cl/leychile/navegar?idNorma=29708" target="_blank" rel="noopener">Ley de Tránsito</a> clasifica las infracciones generales en UTM. Como la UTM cambia mensualmente, convertir hoy a pesos y publicar el resultado como “multa 2026” queda desactualizado.</p>
<table>
<thead><tr><th>Tipo</th><th>Rango general</th><th>Ejemplos orientativos</th></tr></thead>
<tbody>
<tr><td>Leve</td><td>0,2 a 0,5 UTM</td><td>Infracción no clasificada en una categoría superior</td></tr>
<tr><td>Menos grave</td><td>0,5 a 1 UTM</td><td>Estacionar en lugar prohibido; exceso de hasta 10 km/h</td></tr>
<tr><td>Grave</td><td>1 a 1,5 UTM</td><td>Conducir sin revisión técnica; exceso de 11 a 20 km/h</td></tr>
<tr><td>Gravísima</td><td>1,5 a 3 UTM</td><td>Luz roja o PARE; manipular celular; exceso mayor a 20 km/h</td></tr>
</tbody>
</table>
<p>El exceso se mide en kilómetros por hora sobre el límite, no en porcentajes. Alcohol y drogas tienen delitos, multas, suspensión o inhabilidad que dependen del nivel, reincidencia, lesiones o muerte; no corresponde agregarlos como una quinta fila de esta escala general.</p>
<p>Para reincidencia, la ley mira infracciones gravísimas en los últimos tres años y graves en los últimos dos: la multa se duplica y puede triplicarse ante una nueva conducta, además de suspensiones o cancelación. No existe una regla universal de “misma falta dentro de 12 meses”.</p>
<p>Distingue parte personal de multa empadronada. El <a href="https://www.chileatiende.gob.cl/fichas/3439-certificado-de-multas-de-transito-no-pagadas" target="_blank" rel="noopener">certificado del Registro Civil</a> incluye multas vinculadas a la patente y es clave al comprar o renovar. La <a href="/calculadoras/calculadora-multas-transito">calculadora de multas</a> convierte UTM a pesos, pero el juez fija la sanción dentro del rango y puede aplicar consecuencias adicionales.</p>`,
      },
      {
        id: 'tag-peajes',
        title: 'TAG y peajes en autopistas',
        level: 2,
        html: `<p>Las tarifas cambian por concesión, pórtico, categoría, horario y fecha. El MOP publica las <a href="https://concesiones.mop.gob.cl/peajes-y-porticos/" target="_blank" rel="noopener">tablas oficiales 2026</a>; una cifra para “Santiago–Valparaíso” no sirve si omite plazas, sentido, horario y reajustes.</p>
<p>Un TAG habilitado es interoperable, pero las cuentas siguen asociadas a las concesionarias y a la patente. Al vender un vehículo, no basta retirar el dispositivo: hay que cerrar o modificar el contrato, revisar tránsitos pendientes y conservar comprobante.</p>
<p>Si se circula sin TAG habilitado, las autopistas urbanas adheridas permiten comprar Pase Diario Único o Tardío. Otras rutas free flow usan cobro por pasada o su propio portal. “Pasaste sin TAG” centraliza accesos para identificar la concesionaria. Los plazos importan: vencidos, puede aplicarse tarifa infractora.</p>
<p>Hay dos obligaciones distintas. La concesionaria puede cobrar civilmente peaje o tarifa; además, transitar sin sistema habilitado puede generar una multa fiscal del artículo 114. Pagar una no extingue automáticamente la otra. La Ley 21.547 permite terminar ciertos procesos pagando la multa rebajada en 80% antes de sentencia, si no existe mora con concesionarias al solicitarlo.</p>
<p>La <a href="/calculadoras/calculadora-costo-tag">calculadora de TAG</a> debe tratar sus valores como escenarios y no como tarifa oficial. Para presupuesto, exporta tránsitos reales de las cuentas y cruza los pórticos frecuentes con la tabla vigente.</p>`,
      },
      {
        id: 'compra-usado',
        title: 'Comprar un usado sin heredar sorpresas',
        level: 2,
        html: `<p>El precio publicado no informa la situación jurídica ni mecánica. Antes de transferir, pide certificado de anotaciones vigentes, certificado de multas impagas, padrón, permiso, revisión, SOAP y comprobantes de mantención. Verifica número de chasis y motor físicamente.</p>
<p>Las limitaciones al dominio, prendas, prohibiciones o encargos no se resuelven con una promesa del vendedor. Tampoco confundas multas empadronadas con deuda TAG: consulta concesionarias o portales de tránsito sin TAG. Una inspección mecánica independiente debe revisar estructura, señales de choque, fugas, frenos, neumáticos, diagnóstico electrónico y kilometraje coherente.</p>
<p>Define por escrito fecha y hora de entrega, kilometraje, accesorios, deudas declaradas y quién asume tránsitos o multas anteriores. Haz la transferencia por un canal formal y no entregues ClaveÚnica. Después, contrata SOAP o seguro voluntario a tu nombre según corresponda y actualiza el TAG.</p>`,
      },
      {
        id: 'credito-auto',
        title: 'Crédito automotriz: compara costo total, no la cuota',
        level: 2,
        html: `<p>Plazo y tasa varían por perfil, pie, vehículo y garantía. No hay una banda anual que represente el mercado completo. Solicita una cotización escrita con precio al contado, pie, monto financiado, tasa, CAE, número de cuotas, costo total, seguros, gastos, pago final y condiciones de prepago.</p>
<p>Una “cuota desde” puede esconder un cuotón final, seguro financiado o precio al contado distinto. Compara el mismo vehículo y pie en todas las ofertas. Si hay compra inteligente, registra cuánto deberás pagar, refinanciar o cubrir con la devolución del auto al final, incluidos kilometraje y estado exigidos.</p>
<p>La <a href="/calculadoras/calculadora-credito-automotriz">calculadora de crédito automotriz</a> permite reproducir cuotas cuando ingresas la tasa y cargos reales. La depreciación no sigue un porcentaje universal: estima valor de reventa con publicaciones comparables, pero presupone un margen por negociación, kilometraje y condición.</p>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">✓</span><div class="callout__body"><strong>Checklist anual</strong><p>Guarda permiso, SOAP, revisión y padrón; agenda segunda cuota si corresponde; revisa multas y TAG antes de vender; compara pólizas por cobertura y deducible; y reserva mensualmente para mantención y neumáticos. Las fechas del documento prevalecen sobre un calendario genérico.</p></div></aside>
<p>Información revisada al 13 de julio de 2026. Tarifas, UTM, peajes y condiciones de seguros cambian; usa el certificado o tabla vigente el día del trámite.</p>`,
      },
    ],
  },

  // ============================================
  // 9. Familia: pensión alimenticia, asignación, subsidios
  // ============================================
  {
    slug: 'familia-pension-alimenticia-chile',
    title: 'Pensión de alimentos y beneficios familiares en Chile 2026',
    intent: '¿Cómo se fija y cobra una pensión de alimentos y qué beneficios familiares están vigentes?',
    description:
      'Guía verificada sobre pensión de alimentos, mediación, cobranza, Registro de Deudores, asignación familiar y beneficios vigentes en Chile durante 2026.',
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
    updatedAt: '2026-07-13',
    readingTime: 20,
    relatedCalculators: [
      'calculadora-pension-alimenticia',
      'calculadora-asignacion-familiar',
      'calculadora-subsidio-agua',
      'calculadora-aguinaldo',
      'calculadora-pgu',
    ],
    relatedArticles: [
      'diferencia-sueldo-bruto-liquido',
      'comparativa-comisiones-afp-2026',
    ],
    sources: [
      { label: 'Ley 14.908 sobre pago de pensiones de alimentos', url: 'https://www.bcn.cl/leychile/navegar?idNorma=172986' },
      { label: 'BCN Ley Fácil — pensión alimenticia', url: 'https://www.bcn.cl/portal/leyfacil/recurso/pension-alimenticia-para-menores' },
      { label: 'ChileAtiende — mediación familiar obligatoria', url: 'https://www.chileatiende.gob.cl/fichas/2344-mediacion-familiar-previa-y-obligatoria' },
      { label: 'ChileAtiende — Registro Nacional de Deudores', url: 'https://www.chileatiende.gob.cl/fichas/111396-inscripcion-en-el-registro-nacional-de-deudores-de-pensiones-de-alimentos' },
      { label: 'SUSESO — tramos de asignación familiar desde mayo de 2026', url: 'https://www.suseso.gob.cl/612/w3-article-686804.html' },
      { label: 'ChileAtiende — subsidio al consumo de agua potable', url: 'https://www.chileatiende.gob.cl/fichas/51314-subsidio-al-pago-de-consumo-de-agua-potable-y-servicio-de-alcantarillado' },
      { label: 'ChileAtiende — Bono Bodas de Oro', url: 'https://www.chileatiende.gob.cl/fichas/5369-bono-bodas-de-oro' },
    ],
    sections: [
      {
        id: 'pension-alimenticia',
        title: 'Qué cubre la pensión y hasta cuándo corresponde',
        level: 2,
        html: `<p>En derecho de familia, “alimentos” no significa solo comida. La obligación comprende vivienda, salud, vestuario, educación, transporte, recreación y lo necesario para que el hijo o hija se desarrolle conforme a sus circunstancias. Ambos padres deben contribuir según sus capacidades, incluso cuando uno asume diariamente el cuidado personal.</p>
<p>El derecho de hijos e hijas se mantiene, por regla general, hasta los <strong>21 años</strong>. Puede extenderse hasta los <strong>28 años</strong> si estudian una profesión u oficio. También puede continuar cuando una incapacidad física o mental impide subsistir por sí mismo o cuando el tribunal lo estima indispensable. Cumplir 18 años no extingue la pensión por sí solo, y cumplir la edad límite tampoco autoriza a suspender unilateralmente el pago: el cese debe tramitarse o aprobarse judicialmente.</p>
<p>La resolución puede incluir dinero y ciertos pagos en especie, como colegiatura, si el tribunal los regula expresamente. Transferir compras, regalos o gastos fuera del acuerdo no permite descontarlos por decisión propia. La obligación debe pagarse en la cuenta y fecha fijadas, de modo mensual y anticipado.</p>
<p>Los gastos extraordinarios son necesidades que surgen después y no podían preverse, por ejemplo una hospitalización o atención médica urgente. La resolución debe indicar en qué proporción los padres contribuyen a ellos. Guardar boletas, órdenes médicas y comunicaciones evita discutir después si el gasto existió y cómo se repartía.</p>`,
      },
      {
        id: 'monto-pension',
        title: 'Cómo se fija el monto: necesidades, capacidad y mínimos',
        level: 2,
        html: `<p>La <a href="https://www.bcn.cl/leychile/navegar?idNorma=172986" target="_blank" rel="noopener">Ley 14.908</a> no contiene una tabla que asigne 20%, 30% o 40% del sueldo según cantidad de hijos. El tribunal pondera tres grupos de antecedentes:</p>
<ul>
<li><strong>Necesidades acreditadas:</strong> gastos mensuales del hijo, parte razonable de vivienda y servicios, salud, educación, transporte, vestuario y cuidado.</li>
<li><strong>Capacidad económica y patrimonio:</strong> remuneraciones, honorarios, declaraciones de renta, cuentas, vehículos, propiedades y otros antecedentes de ambos padres.</li>
<li><strong>Trabajo de cuidados:</strong> la ley obliga a considerar su distribución y valor económico, no solo los depósitos en dinero.</li>
</ul>
<p>Para un solo alimentario menor de edad, el mínimo legal es <strong>40% del ingreso mínimo remuneracional que corresponda según la edad del alimentante</strong>. Si hay dos o más menores, el mínimo es 30% de ese ingreso mínimo por cada uno. Desde mayo de 2026, el IMM para una persona de 18 a 65 años es $553.553: el ejemplo matemático da $221.421 para un menor, o $166.066 por menor cuando son dos o más. Si el alimentante tiene más de 65 años, la base remuneracional aplicable es distinta; no debe copiarse el ejemplo anterior.</p>
<table>
<thead><tr><th>Situación</th><th>Regla legal</th><th>Ejemplo con IMM $553.553</th></tr></thead>
<tbody>
<tr><td>Un menor</td><td>Mínimo 40% del IMM aplicable</td><td>$221.421</td></tr>
<tr><td>Dos menores</td><td>Mínimo 30% por cada uno</td><td>$166.066 cada uno; $332.132 total</td></tr>
<tr><td>Tres menores</td><td>Mínimo 30% por cada uno</td><td>$166.066 cada uno; $498.198 total</td></tr>
</tbody>
</table>
<p>El máximo general es 50% de los ingresos totales de quien paga, pero el juez puede superarlo por razones fundadas, atendiendo especialmente al interés superior del niño. El mínimo también puede rebajarse si el alimentante acredita que carece de medios. Por eso el piso y el máximo son límites judiciales, no una fórmula que reemplace el presupuesto de necesidades.</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>No uses “40% del sueldo” como pensión sugerida</strong><p>El 40% se aplica al ingreso mínimo para determinar un piso de un menor, no automáticamente al sueldo real del padre o madre. La <a href="/calculadoras/calculadora-pension-alimenticia">calculadora</a> solo puede servir para explorar el mínimo y el límite general; la cifra final requiere antecedentes y resolución.</p></div></aside>`,
      },
      {
        id: 'mediacion-demanda',
        title: 'De la mediación a la resolución judicial',
        level: 2,
        html: `<p>Antes de demandar alimentos se debe intentar una <a href="https://www.chileatiende.gob.cl/fichas/2344-mediacion-familiar-previa-y-obligatoria" target="_blank" rel="noopener">mediación familiar previa</a>. Participar y alcanzar un acuerdo son decisiones voluntarias, pero pasar por la instancia es requisito para judicializar. Los centros licitados prestan el servicio generalmente gratis; también existen mediadores privados con arancel.</p>
<p>Si hay acuerdo, el mediador lo envía al tribunal. Una vez aprobado judicialmente, tiene fuerza obligatoria: un arreglo verbal o una transferencia informal no ofrece la misma vía de cumplimiento. Si no hay acuerdo o una parte no asiste, el certificado de mediación frustrada habilita para demandar con patrocinio de abogado. La Corporación de Asistencia Judicial orienta gratis y puede representar sin costo tras su evaluación socioeconómica.</p>
<p>Para preparar el caso conviene ordenar:</p>
<ul>
<li>certificado de nacimiento que acredita el vínculo;</li>
<li>presupuesto mensual con comprobantes y explicación de gastos compartidos del hogar;</li>
<li>antecedentes de ingresos y patrimonio conocidos de ambos padres;</li>
<li>certificado de mediación frustrada y datos de una causa previa, si existe;</li>
<li>domicilio y datos de contacto del demandado, cuando se conocen.</li>
</ul>
<p>En la primera actuación judicial, el juez debe fijar alimentos provisorios para hijos menores mientras se tramita el juicio. La resolución final expresa el pago en UTM, define el período del mes y ordena una cuenta exclusiva. Pagar por otra vía dificulta acreditar cumplimiento; quien necesita modificar monto, forma o fecha debe pedirlo en la causa.</p>`,
      },
      {
        id: 'incumplimiento-pension',
        title: 'Deuda, liquidación y Registro Nacional de Deudores',
        level: 2,
        html: `<p>El primer paso para cobrar no es publicar el caso ni acudir a DICOM, sino usar la causa de cumplimiento ante el Tribunal de Familia. La deuda debe liquidarse: el tribunal calcula cuotas, reajustes, pagos reconocidos y saldo. La liquidación y la eventual inscripción se notifican electrónicamente y pueden objetarse dentro de tres días en la causa correspondiente.</p>
<p>El <a href="https://www.chileatiende.gob.cl/fichas/111396-inscripcion-en-el-registro-nacional-de-deudores-de-pensiones-de-alimentos" target="_blank" rel="noopener">Registro Nacional de Deudores de Pensiones de Alimentos</a>, administrado por el Registro Civil, exige una obligación fijada o aprobada judicialmente y deuda total o parcial de <strong>tres mensualidades consecutivas o cinco discontinuas</strong>. Para pensiones fijadas desde el 18 de noviembre de 2021, el tribunal debe liquidar e inscribir cuando se cumplen los requisitos. En causas anteriores puede ser necesario pedir conversión a UTM y/o liquidación.</p>
<p>Entre sus efectos oficiales están:</p>
<ul>
<li>retención de fondos de ciertos créditos, devoluciones de impuestos, juicios ejecutivos y liquidaciones concursales;</li>
<li>restricciones para tramitar pasaporte o licencia de conducir;</li>
<li>impedimentos para inscribir vehículos e inmuebles mientras exista la inscripción;</li>
<li>deber de consulta por instituciones y organismos en operaciones señaladas por la ley;</li>
<li>inadmisibilidad de una demanda de rebaja o cese presentada por el deudor inscrito, salvo antecedentes calificados sobre falta de medios.</li>
</ul>
<p>La cédula de identidad y una anotación automática en DICOM no aparecen entre los efectos que enumera la ficha oficial; no deben prometerse como herramienta de presión. Tampoco existe una salida general por “pagar bien seis meses”. La inscripción se mantiene hasta que el tribunal ordena cancelarla conforme al pago o acuerdo suficiente establecido por la ley.</p>
<p>Además del registro, el juez puede ordenar retención por empleador o pagador de pensión, arraigo, suspensión de licencia, arresto nocturno o completo, garantías sobre bienes, embargo y remate. Cada medida requiere resolución: la persona beneficiaria no puede retirar dinero o embargar por cuenta propia.</p>`,
      },
      {
        id: 'pago-efectivo',
        title: 'Cobro desde cuentas bancarias y fondos previsionales',
        level: 2,
        html: `<p>La Ley de Responsabilidad Parental incorporó un procedimiento especial para buscar patrimonio y pagar deudas. Con deuda liquidada, el tribunal puede investigar cuentas bancarias, instrumentos financieros y de inversión; luego ordena retener y transferir hasta cubrir lo adeudado. La solicitud se presenta en la causa de cumplimiento mediante la Oficina Judicial Virtual o con apoyo jurídico.</p>
<p>Si el procedimiento ordinario no obtiene fondos suficientes, puede activarse de forma extraordinaria el pago con fondos previsionales obligatorios, bajo requisitos y límites legales. No es un retiro AFP solicitado directamente a la administradora: el tribunal consulta, determina procedencia, protege los límites aplicables y ordena el pago. La edad del deudor y la cercanía a su jubilación influyen en cuánto puede utilizarse.</p>
<p>En foros aparecen preguntas como “¿puedo cobrar si trabaja informal?”, “¿sirve depositar en la cuenta personal?” o “¿el tribunal ve las cuentas?”. Son señales de problemas reales, pero no prueba del procedimiento. La respuesta verificable es mantener la cuenta exclusiva, pedir liquidación y entregar al tribunal los antecedentes de patrimonio conocidos. Ocultar ingresos o presentar información falsa puede generar sanciones.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Convivencia y visitas son materias separadas</strong><p>No pagar alimentos no autoriza a impedir unilateralmente la relación directa y regular; tampoco incumplir visitas permite suspender la pensión. Cada incumplimiento debe reclamarse en su procedimiento correspondiente, con prioridad en el interés del niño o niña.</p></div></aside>`,
      },
      {
        id: 'asignacion-familiar',
        title: 'Asignación Familiar: nuevos tramos desde mayo de 2026',
        level: 2,
        html: `<p>La <strong>Asignación Familiar</strong> se paga por causantes reconocidos a trabajadores, pensionados y otras personas beneficiarias del sistema. “Carga” no equivale automáticamente a hijo declarado en el empleo: debe existir reconocimiento ante la entidad administradora correspondiente y cumplir requisitos de edad, estudios, dependencia económica u otros según el vínculo.</p>
<p>La Ley 21.830 actualizó retroactivamente los valores desde el 1 de mayo de 2026. La <a href="https://www.suseso.gob.cl/612/w3-article-686804.html" target="_blank" rel="noopener">SUSESO</a> instruyó los siguientes tramos:</p>
<table>
<thead><tr><th>Tramo</th><th>Ingreso mensual</th><th>Monto mensual por carga</th></tr></thead>
<tbody>
<tr><td>A</td><td>Hasta $649.039</td><td>$22.601</td></tr>
<tr><td>B</td><td>Más de $649.039 y hasta $947.990</td><td>$13.870</td></tr>
<tr><td>C</td><td>Más de $947.990 y hasta $1.478.539</td><td>$4.382</td></tr>
<tr><td>D</td><td>Más de $1.478.539</td><td>$0</td></tr>
</tbody>
</table>
<p>Para julio de 2026 en adelante se mantiene el monto, pero el tramo se determina con el promedio de ingresos de enero a junio de 2026. La asignación por invalidez corresponde al doble. Dependientes la reciben normalmente con el sueldo; pensionados, con la pensión; e independientes pueden recibirla anualmente según sus cotizaciones y reconocimiento.</p>
<p>Si mayo o junio se pagaron con la tabla antigua, la entidad debe reliquidar. La <a href="/calculadoras/calculadora-asignacion-familiar">calculadora de asignación familiar</a> requiere estos tramos nuevos; contrasta siempre el resultado con la liquidación y la entidad que reconoce la carga.</p>`,
      },
      {
        id: 'subsidio-agua',
        title: 'Subsidio del agua potable',
        level: 2,
        html: `<p>El <a href="https://www.chileatiende.gob.cl/fichas/51314-subsidio-al-pago-de-consumo-de-agua-potable-y-servicio-de-alcantarillado" target="_blank" rel="noopener">subsidio al consumo de agua potable y alcantarillado</a> ayuda a hogares que destinan 5% o más de sus ingresos a la cuenta. En 2026 cubre entre 25% y 85% del valor sobre un consumo máximo de <strong>13 m³</strong>, según evaluación socioeconómica y cupos comunales. Para familias de Chile Seguridades y Oportunidades, cubre 100% de los primeros 15 m³.</p>
<p>Se postula todo el año en la municipalidad del domicilio. Se requiere RSH, residencia permanente, conexión a la red, estar al día con la sanitaria o sistema rural y acreditar incapacidad de pago. Puede postular propietario, arrendatario que no viva con el dueño, usufructuario o allegado externo en ciertos sistemas colectivos.</p>
<p>Dura tres años y la renovación no es automática. Cambiar de domicilio, acumular tres meses sin pagar la parte no subsidiada o dejar de cumplir requisitos puede terminarlo. La <a href="/calculadoras/calculadora-subsidio-agua">calculadora</a> solo estima porcentajes: la municipalidad determina tramo y disponibilidad.</p>`,
      },
      {
        id: 'aguinaldo',
        title: 'Aguinaldos y Aporte Familiar Permanente',
        level: 2,
        html: `<p>El <strong>aguinaldo</strong> es un bono especial del <strong>sector público</strong> y de <strong>pensionados</strong> de regímenes cubiertos (leyes de reajuste / fichas IPS). En el sector privado solo es exigible si está en el contrato o convenio colectivo. No confundir con la <strong>gratificación legal</strong>.</p>
<table>
<thead><tr><th>Beneficio 2026</th><th>Mes típico</th><th>Monto (fuentes oficiales)</th></tr></thead>
<tbody>
<tr><td>Fiestas Patrias — sector público (Ley 21.806)</td><td>Septiembre</td><td><strong>$91.682</strong> o <strong>$63.645</strong> según líquido de agosto (umbral $1.060.493)</td></tr>
<tr><td>Fiestas Patrias — pensionados IPS</td><td>Septiembre</td><td><strong>$25.280</strong> base + <strong>$12.969</strong> por carga (corte 31 ago 2026)</td></tr>
<tr><td>Navidad — sector público</td><td>Diciembre</td><td><strong>$71.206</strong> / <strong>$37.666</strong> (mismos tramos de renta)</td></tr>
<tr><td>Bono de escolaridad — sector público</td><td>Marzo y junio</td><td><strong>$89.164</strong> total (2 cuotas de $44.582)</td></tr>
</tbody>
</table>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>No es obligatorio en sector privado</strong><p>El aguinaldo no es legalmente obligatorio para empresas privadas (a diferencia de la gratificación legal del 25%). Muchas pagan por costumbre o convenio colectivo. Si tu contrato lo menciona, sí es exigible.</p></div></aside>
<p>El <strong>Aporte Familiar Permanente 2026</strong> es $66.834 por carga o familia, según la vía de acceso y la situación existente al 31 de diciembre de 2025. No se postula. Si la persona causante vive con alguien distinto de quien recibe la asignación, la ley contempla la entrega del aporte dentro de 30 días.</p>
<p>Guía completa: <a href="/blog/aguinaldo-fiestas-patrias-2026-pensionados-sector-publico">aguinaldo de Fiestas Patrias 2026</a>. La <a href="/calculadoras/calculadora-aguinaldo">calculadora de aguinaldo</a> es referencial para el sector público y no transforma el beneficio en obligatorio para empleadores privados.</p>`,
      },
      {
        id: 'bono-bodas-oro',
        title: 'Bono Bodas de Oro y otros beneficios para adultos mayores',
        level: 2,
        html: `<p>El <a href="https://www.chileatiende.gob.cl/fichas/5369-bono-bodas-de-oro" target="_blank" rel="noopener"><strong>Bono Bodas de Oro</strong></a> vigente desde octubre de 2025 es <strong>$463.166</strong>, dividido en $231.583 para cada cónyuge vivo. Se solicita una sola vez y hay un año desde el aniversario número 50 para hacerlo.</p>
<p>La pareja debe estar casada, no separada ni divorciada, convivir en el mismo hogar —con regla para hogares de larga estadía—, pertenecer al 80% más vulnerable según RSH y acreditar cuatro de los últimos cinco años de residencia en Chile. No basta con cumplir 50 años de matrimonio.</p>
<p>Para beneficios de personas mayores, evita mezclar programas:</p>
<ul>
<li><strong>PGU:</strong> a julio de 2026 el máximo es $231.732 para 65–81 años y $250.275 desde 82 años; en septiembre el monto mayor se extiende a 75+. Tiene requisitos de residencia, focalización y pensión base.</li>
<li><strong>Bono por Hijo:</strong> incrementa la pensión de mujeres que cumplen requisitos; no es un pago en efectivo al nacer.</li>
<li><strong>Asignación Familiar:</strong> una persona beneficiaria de PGU puede tener causantes descendientes que vivan a su cargo bajo las reglas del sistema, pero quien recibe PGU no puede ser causante de otra Asignación Familiar.</li>
</ul>
<p>La <a href="/guias/afp-pension-chile">guía previsional 2026</a> separa PGU, pensión autofinanciada y nuevos beneficios. Verificar la ficha individual en ChileAtiende evita sumar prestaciones incompatibles.</p>`,
      },
      {
        id: 'checklist-familia',
        title: 'Checklist para actuar con documentos',
        level: 2,
        html: `<ol class="steps">
<li><strong>Si vas a pedir alimentos:</strong> arma el presupuesto del hijo con respaldo, solicita mediación y conserva el certificado.</li>
<li><strong>Si ya existe pensión:</strong> usa la cuenta exclusiva, registra pagos y pide en la causa cualquier modificación.</li>
<li><strong>Si hay deuda:</strong> solicita liquidación; revisa la notificación y objeta dentro del plazo si hay abonos omitidos o errores.</li>
<li><strong>Si buscas beneficios:</strong> actualiza RSH y cargas, pero consulta cada requisito; estar en un tramo no garantiza cupo ni pago.</li>
<li><strong>Si cambió el ingreso:</strong> revisa el promedio usado por Asignación Familiar y exige reliquidación desde mayo de 2026 cuando corresponda.</li>
<li><strong>Si un trámite es sensible:</strong> usa Oficina Judicial Virtual, ChileAtiende, SUSESO o municipalidad. No entregues ClaveÚnica a supuestos gestores.</li>
</ol>
<p>Información revisada al 13 de julio de 2026. Esta guía explica reglas generales y no reemplaza una resolución judicial ni asesoría sobre una causa concreta.</p>`,
      },
    ],
  },

  // ============================================
  // 10. Crédito CAE y educación superior
  // ============================================
  {
    slug: 'credito-cae-educacion-chile',
    title: 'Crédito CAE en Chile 2026: cómo se financia, paga y rebaja',
    intent: '¿Cómo funciona el CAE vigente y qué trámites debo hacer en 2026?',
    description:
      'Guía verificada del CAE 2026: arancel de referencia, renovación, firma, tasa UF+2%, rebaja al 10% de la renta, suspensión por cesantía y estado real del FES.',
    category: 'educacion',
    categoryLabel: 'Educación y créditos',
    keywords: [
      'CAE chile 2026',
      'crédito aval del estado',
      'condonación CAE',
      'gratuidad educación superior',
      'beca bicentenario',
      'beca juan gómez millas',
      'proyecto FES estado 2026',
      'tasa CAE 2%',
      'contingencia ingreso 10%',
      'INGRESA',
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-07-13',
    readingTime: 21,
    relatedCalculators: [
      'calculadora-credito-cae',
      'calculadora-credito-hipotecario',
      'calculadora-intereses-mora',
    ],
    relatedArticles: [
      'embargos-cae-tgr-2026-cuentas-bienes-raices',
      'cae-renegociacion-condonacion-2026',
      'todo-sobre-uf-chile',
    ],
    sources: [
      { label: 'Comisión Ingresa — qué es el CAE', url: 'https://portal.ingresa.cl/el-credito/que-es-el-credito-cae/' },
      { label: 'Ingresa — postulación CAE 2026', url: 'https://portal.ingresa.cl/como-postular/como-postulo-al-credito/' },
      { label: 'Ingresa — renovación CAE 2026', url: 'https://portal.ingresa.cl/como-renovar/como-renuevo-mi-credito/' },
      { label: 'Ingresa — rebaja al 10% de la renta', url: 'https://portal.ingresa.cl/preguntas-frecuentes/pago-del-credito-rebaja-cuotas-al-10-de-la-renta/' },
      { label: 'Ingresa — suspensión por cesantía', url: 'https://cesantia.ingresa.cl/docs/pfrecuentes.html' },
      { label: 'Beneficios Estudiantiles — Gratuidad', url: 'https://portal.beneficiosestudiantiles.cl/gratuidad' },
      { label: 'FUAS — proceso 2026', url: 'https://fuas.cl/preguntas-frecuentes.html' },
      { label: 'Ley 20.027 (CAE original)', url: 'https://www.bcn.cl/leychile/navegar?idNorma=240080' },
    ],
    sections: [
      {
        id: 'estado-2026',
        title: 'CAE 2026: qué está vigente hoy',
        level: 2,
        html: `<p>El Crédito con Garantía Estatal sigue vigente en julio de 2026. Es una línea de crédito entregada por una institución financiera para financiar parte del arancel de educación superior, regulada por la <a href="https://www.bcn.cl/leychile/navegar?idNorma=240080" target="_blank" rel="noopener">Ley 20.027</a> y administrada por Comisión Ingresa. El aval del Estado y de la institución educacional protege al acreedor frente al incumplimiento; <strong>no convierte el crédito en beca ni elimina la obligación del estudiante</strong>.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Alerta para nuevos beneficiarios 2026</strong><p>Comisión Ingresa extendió el plazo final para agendar y firmar el contrato CAE 2026 hasta el <strong>14 de julio de 2026</strong> en creditocae.cl. Si no se firma, se entiende que el estudiante no requiere el crédito y deberá financiar el arancel de otra forma. El plazo es temporal: verifica el mensaje personal antes de actuar.</p></div></aside>
<p>El proyecto que propone reemplazar el CAE por el FES no está vigente como ley. Mientras no exista una ley publicada y reglas de implementación, los contratos, pagos, beneficios y cobranzas del CAE siguen funcionando bajo el régimen actual.</p>`,
      },
      {
        id: 'que-financia',
        title: 'Qué financia y qué queda fuera',
        level: 2,
        html: `<p>El CAE financia el arancel anual de una carrera elegible. El máximo anual es el <strong>100% del arancel de referencia</strong> que Mineduc fija para esa carrera e institución. No cubre la matrícula. Si el arancel real que cobra la institución supera al de referencia, la diferencia es copago y debe financiarse con becas, recursos propios u otro acuerdo.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo de brecha de arancel</div><ul><li>Arancel real anual: $5.800.000.</li><li>Arancel de referencia: $4.900.000.</li><li>Beca de arancel: $800.000.</li><li>Máximo CAE útil para completar el cobro: $4.900.000, sujeto a asignación.</li><li>Saldo después de beca y CAE máximo: $100.000, además de matrícula.</li></ul><span class="total">El orden exacto de aplicación lo informa la institución</span></div>
<p>El estudiante puede solicitar desde $200.000 anuales hasta el máximo de referencia, o pedir “monto cero” si desea conservar el derecho sin usar financiamiento ese año. Pedir el máximo por defecto aumenta deuda e intereses. Antes de decidir, compara arancel real, referencia, becas, duración formal y probabilidad de necesitar años adicionales.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>No financia libremente cualquier carrera</strong><p>La institución debe participar del sistema, la carrera e institución deben cumplir acreditación y el estudiante debe satisfacer las condiciones académicas y legales. Una preselección no reemplaza matrícula, solicitud de monto ni firma del contrato.</p></div></aside>`,
      },
      {
        id: 'postulacion-renovacion',
        title: 'Postulación, asignación y renovación 2026',
        level: 2,
        html: `<p>La postulación a gratuidad, becas y créditos se realiza mediante FUAS. Para beneficios 2026 hubo un primer período entre octubre y noviembre de 2025 y un segundo entre febrero y marzo de 2026; ambos cerraron. Después vienen nivel socioeconómico, preselección, matrícula, acreditación de antecedentes y asignación. Completar FUAS no asegura CAE ni obliga a usarlo.</p>
<p>Para un nuevo beneficiario CAE, el flujo 2026 fue:</p>
<ol class="steps"><li>Completar FUAS en plazo.</li><li>Revisar preselección y condiciones de la institución.</li><li>Matricularse con derecho al crédito.</li><li>Solicitar a la casa de estudios el monto anual requerido.</li><li>Revisar la asignación definitiva.</li><li>Firmar personalmente el contrato; si es menor de edad, firma su representante legal.</li></ol>
<p>La renovación no es automática aunque el crédito pueda cubrir la duración de la malla. Cada año hay que matricularse con derecho al CAE y solicitar monto. Para 2026, el formulario de renovantes estuvo disponible desde el 16 de diciembre de 2025 al 25 de abril de 2026, con una extensión extraordinaria del 7 al 13 de mayo. Quien no lo envió debe pactar otra forma de pago con la institución, aunque cumpla requisitos académicos.</p>
<p>La renovación 2026 permite solicitar 100% del arancel de referencia, un monto específico de al menos $200.000 o monto cero. La última solicitud enviada dentro del plazo es la válida. Guarda comprobante, resultado y contrato; no confíes solo en el estado mostrado por la intranet de la universidad.</p>`,
      },
      {
        id: 'deuda-cuotas',
        title: 'Cómo se forma la deuda y cuándo empieza el cobro',
        level: 2,
        html: `<p>Desde 2012, los nuevos créditos tienen una tasa de <strong>UF + 2% anual</strong>. “UF + 2%” no significa inflación o 2%: el saldo se expresa en UF —por lo que su equivalente en pesos cambia con el IPC— y además devenga interés real de 2%. Los créditos otorgados entre 2006 y 2011 tenían tasas contractuales mayores, pero pueden acceder a una cuota rebajada a UF + 2% si están al día y pagan dentro del plazo mensual del beneficio.</p>
<p>No hay obligación de pagar cuotas mientras se estudia. El cobro comienza:</p>
<ul><li><strong>Egreso:</strong> 18 meses después de la fecha en que la institución informa que terminaste la malla. No depende de la ceremonia ni de obtener el título.</li><li><strong>Deserción:</strong> si completas dos años consecutivos sin matrícula, el cobro comienza en noviembre del segundo año sin estudiar y el plazo original se reduce a la mitad.</li></ul>
<p>El plazo puede ser de 5 a 20 años según deuda y situación académica. Para egresados, Ingresa informa plazos de 10, 15 o 20 años; para quienes abandonan, 5, 7 años y medio o 10. Los contratos desde 2012 usan cuotas escalonadas en tramos, por lo que una amortización bancaria con cuota nivelada es solo una aproximación.</p>
<div class="numeric-example"><div class="numeric-example__title">Simulación financiera, no calendario contractual</div><ul><li>Capital supuesto: 1.000 UF.</li><li>Tasa real: 2% anual.</li><li>Plazo supuesto: 240 meses.</li><li>Cuota nivelada matemática: cerca de 5,06 UF mensuales.</li><li>Total nivelado aproximado: 1.214 UF.</li></ul><span class="total">El contrato puede usar cuotas escalonadas y otro plazo</span></div>
<p>La <a href="/calculadoras/calculadora-credito-cae">calculadora de CAE</a> sirve para comparar capital, tasa y plazo. No predice el calendario oficial ni incorpora por sí sola beneficios, comisiones, mora, pagos ya realizados o diferencias entre desembolsos anuales.</p>`,
      },
      {
        id: 'rebaja-diez-por-ciento',
        title: 'Rebaja al 10% de la renta: se solicita y se renueva',
        level: 2,
        html: `<p>El CAE no cambió a una cuota automáticamente contingente al ingreso. Quien está pagando puede <strong>solicitar</strong> que sus cuotas no superen 10% del promedio de la renta bruta mensual acreditada. El formulario está disponible permanentemente en contingencia.ingresa.cl; si se presenta en los primeros quince días del mes, la rebaja puede aplicar desde la cuota siguiente, y desde el día 16, desde la subsiguiente.</p>
<p>Comisión Ingresa analiza las rentas del período solicitado. Si 10% del promedio es menor que la cuota normal, determina la cuota rebajada. La diferencia la subsidia el Estado y <strong>no se agrega al final ni debe devolverse</strong>. El beneficio dura seis meses y requiere una nueva solicitud para renovarlo.</p>
<div class="numeric-example"><div class="numeric-example__title">Cuota normal de $180.000 y renta promedio de $1.100.000</div><ul><li>10% de renta bruta promedio: $110.000.</li><li>Cuota que paga el deudor durante el beneficio: $110.000.</li><li>Diferencia subsidiada por el Estado: $70.000.</li><li>Vigencia: seis meses, si la solicitud es aprobada.</li></ul><span class="total">No se posterga una deuda de $70.000 mensuales</span></div>
<p>Si la cuota normal ya es menor que 10% de la renta, se mantiene porque favorece al deudor. Si no hubo ingresos en los últimos seis meses, o el promedio resulta igual o inferior a la cuota, Ingresa orienta a solicitar suspensión por cesantía o desempleo en vez de la rebaja.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Pagar al día sigue siendo necesario</strong><p>La aprobación no reemplaza el pago. Revisa la cuota rebajada en el banco y paga hasta el día 10 a las 14:00, o día hábil siguiente cuando corresponda, para mantener los beneficios. Guarda comprobante y resolución de Ingresa.</p></div></aside>`,
      },
      {
        id: 'suspension-cesantia',
        title: 'Suspensión por cesantía o desempleo',
        level: 2,
        html: `<p>La cesantía no detiene el cobro por sí sola. El deudor debe completar el formulario de suspensión y acreditar que está cesante o desempleado y que los ingresos de su grupo familiar son insuficientes. Ingresa también puede pedir antecedentes del cónyuge, conviviente o conviviente civil.</p>
<ul><li>La mora no puede superar 45 días corridos desde el vencimiento de la última cuota pagada al solicitar.</li><li>La suspensión se concede por seis meses y puede renovarse por períodos iguales mediante nuevas solicitudes.</li><li>Las cuotas suspendidas pasan al final del calendario con el mismo valor en UF y sin intereses generados por la suspensión.</li><li>Una cuota ya suspendida no vuelve a postergarse, aunque después puede solicitarse rebaja al 10% de la renta si corresponde.</li></ul>
<p>Si consigues trabajo durante los seis meses aprobados, Ingresa indica que no pierdes ese período de suspensión. Al terminar, revisa la fecha exacta en que vuelve el cobro y solicita a tiempo la rebaja al 10% si la cuota supera tu capacidad.</p>
<p>No confundas “suspender” con condonar. El capital permanece y el calendario se extiende. Tampoco esperes acumular varias cuotas impagas para presentar antecedentes: sobre 45 días de mora puedes quedar fuera de este mecanismo.</p>`,
      },
      {
        id: 'pago-prepago-mora',
        title: 'Pago, prepago y mora',
        level: 2,
        html: `<p>Las cuotas se pagan al banco que administra el crédito, no a Comisión Ingresa. Revisa en “Mi Crédito CAE” cuál es la institución y actualiza datos tanto en el banco como en Ingresa. Desde febrero de 2020, el pago hasta el día 10 a las 14:00 —o hábil siguiente si corresponde— conserva beneficios por pago al día.</p>
<p>Un prepago parcial debe ser al menos 10% del saldo adeudado, incluyendo intereses y comisiones. El banco descuenta intereses devengados y una comisión de prepago equivalente a 1,5 meses de interés sobre el capital prepagado. Después puede reducirse la cuota manteniendo plazo o acortarse el plazo manteniendo cuota. Por eso es falso afirmar que todo prepago CAE carece de comisión.</p>
<p>Antes de prepagar, compara tres datos: tasa real del crédito, comisión y necesidad de liquidez. Pagar una deuda UF + 2% reduce exposición a UF e intereses, pero no siempre conviene usar todo el fondo de emergencia. Solicita al banco una liquidación de prepago y no calcules el abono como si el 100% fuera a capital.</p>
<p>En mora prolongada, el banco puede cobrar y solicitar el pago de las garantías. Si el Estado paga su garantía, Tesorería se subroga hasta el monto cubierto y puede continuar la cobranza. TGR ofrece convenios CAE bajo requisitos, pie, cuotas y comportamiento de pago; no existe una regla general que borre la deuda por haber pasado a Tesorería.</p>
<p>Si ya existe deuda en TGR, consulta la Cuenta Única Tributaria y el convenio específico antes de pagar a terceros. La guía de <a href="/blog/embargos-cae-tgr-2026-cuentas-bienes-raices">cobranza CAE y TGR</a> explica el flujo, y la <a href="/calculadoras/calculadora-intereses-mora">calculadora de mora</a> solo entrega una estimación cuando conoces la tasa aplicable.</p>`,
      },
      {
        id: 'fes-condonacion',
        title: 'Proyecto FES y condonación: propuesta no es beneficio vigente',
        level: 2,
        html: `<p>El Boletín N° 17.169-04 propone un nuevo instrumento público de Financiamiento para la Educación Superior y un plan de reorganización y condonación para deudas CAE, Fondo Solidario y Corfo. El proyecto avanzó al Senado en segundo trámite constitucional, pero <strong>al 13 de julio de 2026 no constituye una ley publicada</strong>.</p>
<p>Los sitios informativos del proyecto describen condonaciones iniciales, mensuales y por pago anticipado según situación académica, de pago y cuotas cumplidas. Esas fórmulas son parte del diseño legislativo y pueden modificarse, rechazarse o reemplazarse. No existe hoy una regla vigente de “50% después de cinco años”, “condonación total después de diez” ni eliminación automática del saldo al completar 240 cuotas.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>No dejes de pagar esperando el FES</strong><p>La mora puede hacer perder beneficios actuales y activar cobranza. Una eventual ley tendrá condiciones, fechas de corte y procedimiento propios. Hasta entonces, usa suspensión, rebaja al 10%, regularización o convenio según tu situación real.</p></div></aside>
<p>Para verificar cambios, busca el boletín en los portales del Congreso y una eventual publicación en el Diario Oficial. Una declaración política, una aprobación en comisión o una calculadora de campaña no reemplazan el texto legal final.</p>`,
      },
      {
        id: 'alternativas',
        title: 'Gratuidad, becas y decisiones antes de endeudarse',
        level: 2,
        html: `<p>Gratuidad cubre matrícula y arancel durante la duración nominal para estudiantes que pertenecen al 60% de menores ingresos, cumplen los requisitos y se matriculan en una institución adscrita. Si se asigna gratuidad, reemplaza becas y créditos de arancel estatales que cubrían esos conceptos y elimina ese copago dentro de su cobertura.</p>
<p>Las becas no son intercambiables. Bicentenario, Juan Gómez Millas, Nuevo Milenio, Excelencia Académica, Vocación de Profesor y otras tienen instituciones, montos, requisitos socioeconómicos y académicos distintos. Algunas cubren un monto o el arancel de referencia, no necesariamente el arancel real. Usa la ficha 2026 de Beneficios Estudiantiles; no una tabla sin año.</p>
<p>Orden práctico antes de firmar:</p>
<ol class="steps"><li>Confirma gratuidad y becas asignadas, no solo preselección.</li><li>Compara arancel real, referencia, matrícula y duración formal.</li><li>Pregunta cómo se financian años extra, titulación y prácticas.</li><li>Solicita solo el CAE necesario después de otras ayudas.</li><li>Proyecta la deuda en UF, no congelada en pesos actuales.</li><li>Guarda contrato y cada desembolso anual.</li></ol>
<p>El CAE puede evitar abandonar una carrera por falta de financiamiento, pero su conveniencia depende de cuánto cubre, la brecha de arancel, duración efectiva, alternativas y capacidad futura. “Siempre malo” y “siempre conveniente” son atajos que no sustituyen ese cálculo.</p>`,
      },
      {
        id: 'checklist-cae',
        title: 'Checklist 2026 para estudiantes y deudores',
        level: 2,
        html: `<h3>Si estudias en 2026</h3><ul><li>Revisa asignación definitiva y arancel de referencia.</li><li>Confirma matrícula con derecho a CAE.</li><li>Verifica monto anual solicitado y copago.</li><li>Si eres nuevo beneficiario, comprueba de inmediato el plazo de firma extendido al 14 de julio.</li><li>Descarga contrato, comprobante y resultado.</li></ul>
<h3>Si ya estás pagando</h3><ul><li>Identifica banco, cuota, vencimiento y estado de mora.</li><li>Si la cuota supera 10% de tu renta bruta promedio, solicita rebaja y renueva cada seis meses.</li><li>Si estás sin ingresos, solicita suspensión antes de superar 45 días de mora.</li><li>Guarda resolución de Ingresa y verifica la cuota aplicada por el banco.</li><li>Pide liquidación antes de prepagar.</li></ul>
<h3>Si estás en mora</h3><ul><li>Determina si la deuda sigue en el banco o existe garantía pagada y deuda en TGR.</li><li>No entregues dinero a gestores que prometan condonación legislativa.</li><li>Pregunta por regularización o convenio en el acreedor correcto.</li><li>Conserva notificaciones judiciales y busca asesoría si hay cobranza.</li></ul>
<p>Contenido verificado al 13 de julio de 2026 con Comisión Ingresa, FUAS, Beneficios Estudiantiles, TGR, la Ley 20.027 y el estado público del Boletín 17.169-04. Las experiencias de foros se usaron para detectar confusiones sobre copago, fecha de cobro, subsidio al 10% y mora; las reglas provienen de fuentes oficiales.</p>`,
      },
    ],
  },

  // ============================================
  // 11. Empresas y PYMEs en Chile 2026
  // ============================================
  {
    slug: 'empresas-pymes-chile',
    title: 'Empresas y PYMEs en Chile 2026: costos, impuestos y obligaciones',
    intent: '¿Cuánto cuesta operar una PYME en Chile y qué impuestos paga?',
    description:
      'Guía completa para empresas y PYMEs en Chile 2026: costo empleador, régimen 14D / 14A, IVA, PPM, patente comercial, contribuciones, retención de honorarios y boletas. Con fórmulas y ejemplos.',
    category: 'tributario',
    categoryLabel: 'Tributario y empresas',
    keywords: [
      'pyme chile 2026',
      'régimen 14D Pro PYME',
      'régimen 14A semi integrado',
      'costo empleador chile',
      'patente comercial 2026',
      'PPM 1ra categoría',
      'IVA crédito débito',
      'retención boleta honorarios 15.25',
      'contribuciones bienes raíces',
      'tasa primera categoría 25%',
      'mutual de seguridad ley 16.744',
      'sii chile pyme',
      'reforma 21.713',
      'costo total empleado chile',
    ],
    publishedAt: '2026-05-16',
    updatedAt: '2026-07-04',
    readingTime: 18,
    relatedCalculators: [
      'calculadora-costo-empleado-pyme',
      'calculadora-cotizacion-independientes',
      'calculadora-ppm',
      'calculadora-patente-comercial',
      'calculadora-iva',
      'calculadora-contribuciones',
      'calculadora-intereses-mora',
      'calculadora-boleta-honorarios',
      'calculadora-impuesto-segunda-categoria',
      'calculadora-finiquito',
      'calculadora-plusvalia',
      'calculadora-operacion-renta',
    ],
    relatedArticles: [
      'boleta-honorarios-completo',
      'guia-iva-chile-2026',
      'como-calcular-finiquito-chile',
    ],
    sources: [
      { label: 'Servicio de Impuestos Internos (SII)', url: 'https://www.sii.cl' },
      {
        label: 'Ley sobre Impuesto a la Renta (LIR)',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=6368',
      },
      {
        label: 'DL 824 — Impuesto a la Renta',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=6368',
      },
      {
        label: 'DL 825 — IVA',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=6369',
      },
      {
        label: 'DL 3063 — Rentas Municipales (patente)',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=29842',
      },
      {
        label: 'Ley 21.133 — Calendario cotización honorarios',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1191726',
      },
      {
        label: 'Ley 21.713 — Cumplimiento de obligaciones tributarias',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1208656',
      },
      { label: 'Dirección del Trabajo', url: 'https://www.dt.gob.cl' },
    ],
    sections: [
      {
        id: 'panorama-pyme',
        title: 'Panorama: ¿qué es una PYME en Chile?',
        level: 2,
        html: `<p>El Servicio de Impuestos Internos (SII) clasifica a las empresas según el monto anual de sus ventas en UF (Ley 20.416 y Resolución Ex. SII N°55/2018):</p>
<table>
<thead><tr><th>Tamaño</th><th>Ventas anuales (UF)</th><th>Equivalente CLP (UF julio 2026)</th></tr></thead>
<tbody>
<tr><td>Micro</td><td>0 – 2.400 UF</td><td>~$96,9 millones</td></tr>
<tr><td>Pequeña</td><td>2.400 – 25.000 UF</td><td>~$96,9M – $1.009M</td></tr>
<tr><td>Mediana</td><td>25.000 – 100.000 UF</td><td>~$1.009M – $4.036M</td></tr>
<tr><td>Grande</td><td>+ 100.000 UF</td><td>+ $4.036M</td></tr>
</tbody>
</table>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Régimen Pro PYME (14D)</strong><p>Las empresas con ventas anuales hasta 75.000 UF y capital efectivo de hasta 85.000 UF al inicio pueden acogerse al régimen 14D, que permite contabilidad simplificada, depreciación instantánea y tributación en base a ingresos efectivos. Es la opción más eficiente para la inmensa mayoría de PYMEs chilenas.</p></div></aside>
<ul class="data-grid"><li><span class="data-grid__label">Tasa 1ra categoría 14D</span><span class="data-grid__value">25%</span></li><li><span class="data-grid__label">Tasa 1ra categoría 14A</span><span class="data-grid__value">27%</span></li><li><span class="data-grid__label">Tasa IVA</span><span class="data-grid__value">19%</span></li><li><span class="data-grid__label">Retención honorarios 2026</span><span class="data-grid__value">15,25%</span></li></ul>`,
      },
      {
        id: 'costo-empleador',
        title: 'Costo total de un empleado para la empresa',
        level: 2,
        html: `<p>Cuando una PYME contrata, el costo NO es el sueldo bruto pactado. Hay un sobrecargo previsional típico de 4%-6% que paga íntegramente el empleador. Es <strong>error común</strong> creer que la AFP (10%) y la salud (7%) son costos del empleador: esos descuentos los paga el trabajador.</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Quién paga qué</strong><p>D.L. 3500 Art. 17: el 10% de AFP lo paga el trabajador. Ley 20.255: el SIS lo paga el empleador. Ley 19.728: el seguro de cesantía lo paga 0,6% trabajador / 2,4% empleador (indefinido) o 0% / 3,0% (plazo fijo). Ley 16.744: la mutual de seguridad la paga el empleador.</p></div></aside>
<table>
<thead><tr><th>Aporte empleador</th><th>Tasa 2026</th><th>Sobre $1.000.000 bruto</th></tr></thead>
<tbody>
<tr><td>SIS (Seguro Invalidez/Sobrevivencia)</td><td>1,62%</td><td>$16.200</td></tr>
<tr><td>Seguro cesantía (indefinido)</td><td>2,40%</td><td>$24.000</td></tr>
<tr><td>Mutual seguridad (Ley 16.744)</td><td>0,90% – 4,30%</td><td>$9.000 – $43.000</td></tr>
<tr><td>Seguro Social Previsional (Ley 21.735)</td><td>1,0% (sube a 1,75% en agosto/2026)</td><td>$10.000</td></tr>
</tbody>
</table>
<div class="numeric-example"><div class="numeric-example__title">PYME contrata empleado con sueldo bruto $1.000.000 (indefinido)</div><ul><li>Sueldo bruto: $1.000.000</li><li>SIS empleador (1,62%): $16.200</li><li>Seguro cesantía empleador (2,4%): $24.000</li><li>Mutual seguridad (0,95% promedio): $9.500</li><li>Seguro Social Previsional (1,0% en 2026): $10.000</li></ul><span class="total">Costo total mensual: $1.059.700 — factor previsional ≈ 1,060</span></div>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Calendario Ley 21.735 (reforma de pensiones)</strong><p>El Seguro Social Previsional sube progresivamente el aporte del empleador desde 1% (2025) hasta 7% (2033), con incrementos anuales de 0,75 puntos cada agosto. En 2026 son 1,0% el primer semestre y 1,75% desde agosto. Planifica tu costo laboral con ese calendario en mano.</p></div></aside>
<p>Calcula el costo total de tu empleado considerando AFP, mutual y reforma con la <a href="/calculadoras/calculadora-costo-empleado-pyme">calculadora de costo empleador</a>.</p>`,
      },
      {
        id: 'regimen-14d-vs-14a',
        title: 'Régimen 14D vs 14A: cuál te conviene',
        level: 2,
        html: `<p>Después de la reforma tributaria (Ley 21.210 de 2020) y la modernización 21.713 de 2024, las empresas chilenas pueden tributar en uno de estos dos regímenes principales del Art. 14 LIR:</p>
<table>
<thead><tr><th>Característica</th><th>14D Pro PYME</th><th>14A Semi-integrado</th></tr></thead>
<tbody>
<tr><td>Requisitos</td><td>Ventas ≤ 75.000 UF/año + capital ≤ 85.000 UF</td><td>Cualquier empresa</td></tr>
<tr><td>Tasa Impuesto Primera Categoría</td><td>25%</td><td>27%</td></tr>
<tr><td>Contabilidad</td><td>Simplificada (caja)</td><td>Completa (devengado)</td></tr>
<tr><td>Crédito IDPC para socios</td><td>100% acreditable contra IGC</td><td>65% acreditable</td></tr>
<tr><td>Depreciación</td><td>Instantánea</td><td>Acelerada / lineal</td></tr>
<tr><td>PPM (pago provisional mensual)</td><td>Tasa fija 0,25% – 0,5%</td><td>Tasa variable según ejercicio anterior</td></tr>
</tbody>
</table>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Para casi todas las PYMEs, 14D gana</strong><p>El 14D no solo paga 2 puntos menos de impuesto, sino que acredita el 100% del IDPC contra el Global Complementario del socio. Una empresa rentable con utilidades retiradas paga, en promedio, 8-12 puntos menos de carga tributaria total bajo 14D que bajo 14A.</p></div></aside>
<p>Casos donde 14A puede convenir: empresas que reinvierten todas las utilidades durante muchos años (efecto del crédito acreditable se diluye), holdings con socios extranjeros, o sociedades con flujos de gastos no reembolsables muy grandes.</p>`,
      },
      {
        id: 'iva',
        title: 'IVA: el 19% que entra y sale todos los meses',
        level: 2,
        html: `<p>El <strong>IVA</strong> (DL 825 de 1974) grava todas las ventas y servicios afectos con tasa del <strong>19%</strong>. Las empresas funcionan como agentes recaudadores: cobran IVA débito en sus ventas, descuentan IVA crédito de sus compras, y pagan al SII la diferencia mensualmente (Form. 29).</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Art. 23 DL 825</strong><p>"Los contribuyentes afectos al pago del tributo de este Título tendrán derecho a un crédito fiscal contra el débito fiscal determinado por el mismo período tributario, equivalente al impuesto recargado en las facturas que acrediten las adquisiciones o servicios utilizados en el giro del negocio."</p></div></aside>
<div class="numeric-example"><div class="numeric-example__title">PYME comercial — mes de marzo 2026</div><ul><li>Ventas afectas (neto): $20.000.000</li><li>IVA débito (19%): $3.800.000</li><li>Compras afectas (neto): $14.000.000</li><li>IVA crédito (19%): $2.660.000</li></ul><span class="total">IVA a pagar al SII: $1.140.000 (déb − créd)</span></div>
<p>Calcula la separación IVA neto/bruto y conversiones de tu mes con la <a href="/calculadoras/calculadora-iva">calculadora de IVA</a>.</p>
<h3>Operaciones exentas y gravadas</h3>
<ul>
<li><strong>Exentas</strong>: arriendo de inmuebles habitacionales, servicios profesionales (boletas de honorarios), exportaciones (con derecho a recuperar crédito), educación, salud (parcial), transporte de pasajeros.</li>
<li><strong>Gravadas</strong>: venta de bienes corporales muebles e inmuebles (con condiciones), prestaciones de servicios mercantiles, importaciones.</li>
</ul>
<h3>Cambio Ley 21.713 (2024) — facturación electrónica universal</h3>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Boletas electrónicas obligatorias</strong><p>Desde marzo 2025 la totalidad de las boletas y facturas deben ser electrónicas (sin excepción para microempresas). El SII rechaza el crédito fiscal sobre comprobantes en papel que se emitan después de esa fecha. Si emites boleta de honorarios en papel, también se rechaza la deducción de gasto.</p></div></aside>`,
      },
      {
        id: 'ppm',
        title: 'PPM: pagos provisionales mensuales',
        level: 2,
        html: `<p>El <strong>PPM</strong> (Pago Provisional Mensual, Art. 84 LIR) es un anticipo a cuenta del Impuesto a la Renta anual que la empresa paga cada mes con el Form. 29. Funciona como una retención obligatoria sobre los ingresos brutos.</p>
<table>
<thead><tr><th>Régimen / Actividad</th><th>Tasa PPM 2026</th></tr></thead>
<tbody>
<tr><td>14D Pro PYME (1er año)</td><td>0,25%</td></tr>
<tr><td>14D Pro PYME (años siguientes)</td><td>Variable según resultado</td></tr>
<tr><td>14A Semi-integrado</td><td>Variable según ejercicio anterior (mínimo 0,5%)</td></tr>
<tr><td>Comercio (sin régimen específico)</td><td>1,0%</td></tr>
<tr><td>Transporte terrestre carga/pasajeros</td><td>0,3%</td></tr>
<tr><td>Construcción</td><td>0,2%</td></tr>
<tr><td>Profesionales 2da categoría</td><td>15,25% (calendario 21.133)</td></tr>
</tbody>
</table>
<div class="numeric-example"><div class="numeric-example__title">PYME comercial 14D — ventas $30.000.000/mes</div><ul><li>Ventas brutas con IVA: $30.000.000</li><li>Ventas netas: $30.000.000 ÷ 1,19 = $25.210.084</li><li>PPM (0,25%): $25.210.084 × 0,25% = $63.025</li></ul><span class="total">PPM a pagar al mes: $63.025</span></div>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Recargo / rebaja anual del PPM</strong><p>En abril de cada año, en la Operación Renta, se ajusta la tasa de PPM para los siguientes 12 meses según el resultado del ejercicio anterior. Si pagaste poco IDPC, la tasa baja. Si pagaste mucho, sube. Las empresas con utilidades en alza típicamente ven subidas de 0,1 a 0,2 puntos cada año.</p></div></aside>
<p>Para profesionales independientes la tasa coincide con la <a href="/guias/iva-boleta-honorarios-chile">retención de boletas de honorarios</a> según el calendario Ley 21.133: 14,5% (2025), 15,25% (2026), 16% (2027), 17% (2028). Calcula tu PPM con la <a href="/calculadoras/calculadora-ppm">calculadora de PPM</a>.</p>`,
      },
      {
        id: 'patente-comercial',
        title: 'Patente comercial municipal',
        level: 2,
        html: `<p>La <strong>patente comercial</strong> (DL 3063 / Ley de Rentas Municipales) es un tributo anual que pagan todas las personas naturales y jurídicas que ejerzan una actividad comercial, industrial o de servicios. La cobra la municipalidad donde tienes el domicilio comercial o sucursal.</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Art. 24 DL 3063</strong><p>"La patente grava la actividad que se ejerce por un mismo contribuyente, en su local, oficina, establecimiento, kiosco o lugar determinado con prescindencia de la clase o número de giros o rubros distintos que comprenda."</p></div></aside>
<ul class="data-grid"><li><span class="data-grid__label">Tasa legal</span><span class="data-grid__value">0,25% – 0,5% del capital propio</span></li><li><span class="data-grid__label">Mínimo anual</span><span class="data-grid__value">1 UTM (~$71.649)</span></li><li><span class="data-grid__label">Máximo anual</span><span class="data-grid__value">8.000 UTM (~$564M)</span></li><li><span class="data-grid__label">Cuotas</span><span class="data-grid__value">Enero y julio</span></li></ul>
<table>
<thead><tr><th>Comuna</th><th>Tasa típica</th><th>Capital $100M → patente anual</th></tr></thead>
<tbody>
<tr><td>Santiago</td><td>0,5%</td><td>$500.000</td></tr>
<tr><td>Providencia</td><td>0,4%</td><td>$400.000</td></tr>
<tr><td>Las Condes</td><td>0,35%</td><td>$350.000</td></tr>
<tr><td>Otras comunas (default)</td><td>0,25%</td><td>$250.000</td></tr>
</tbody>
</table>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>El "capital propio" no es el patrimonio neto</strong><p>El capital propio para efectos de patente es el patrimonio inicial declarado al inicio de actividades, ajustado por la corrección monetaria del SII cada año. NO es el capital social del contrato ni el patrimonio neto del balance. Se obtiene del Form. 22 del año anterior. Empresas nuevas pueden declarar capital cero el primer año (mínimo 1 UTM).</p></div></aside>
<p>Calcula tu patente comercial según comuna y capital con la <a href="/calculadoras/calculadora-patente-comercial">calculadora de patente comercial</a>.</p>`,
      },
      {
        id: 'contribuciones-empresa',
        title: 'Contribuciones de bienes raíces',
        level: 2,
        html: `<p>Si tu PYME es propietaria del local, oficina o galpón donde opera, paga <strong>contribuciones</strong> (Impuesto Territorial, Ley 17.235) anualmente, en cuatro cuotas (abril, junio, septiembre, noviembre). La tasa depende del destino del inmueble:</p>
<table>
<thead><tr><th>Destino</th><th>Tasa anual 2026</th><th>Sobre avalúo $200M (anual)</th></tr></thead>
<tbody>
<tr><td>Habitacional</td><td>0,93% (con descuento 0,025)</td><td>$1.810.000</td></tr>
<tr><td>Comercial</td><td>1,2%</td><td>$2.400.000</td></tr>
<tr><td>Industrial</td><td>1,2%</td><td>$2.400.000</td></tr>
<tr><td>Sitio eriado</td><td>2,0%</td><td>$4.000.000</td></tr>
<tr><td>Agrario</td><td>0,5%</td><td>$1.000.000</td></tr>
</tbody>
</table>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Las contribuciones son crédito contra IDPC</strong><p>Para empresas en régimen 14A, las contribuciones del inmueble destinado al giro son <strong>crédito contra el Impuesto de Primera Categoría</strong> (Art. 20 N°1 letra a) LIR). Para 14D no aplica este crédito, pero las contribuciones sí son gasto deducible.</p></div></aside>
<p>Calcula tus contribuciones por destino y avalúo con la <a href="/calculadoras/calculadora-contribuciones">calculadora de contribuciones</a>.</p>`,
      },
      {
        id: 'retencion-honorarios',
        title: 'Retención de honorarios y cotizaciones de independientes',
        level: 2,
        html: `<p>Cuando una empresa paga a un profesional independiente que emite <strong>boleta de honorarios</strong>, debe retener un porcentaje del bruto y enterarlo en el SII. La tasa sube progresivamente (Ley 21.133) hasta cubrir las cotizaciones previsionales del trabajador independiente:</p>
<table>
<thead><tr><th>Año</th><th>Retención</th><th>Sobre $1.000.000 bruto</th></tr></thead>
<tbody>
<tr><td>2025</td><td>14,5%</td><td>$145.000 retenidos</td></tr>
<tr><td><strong>2026</strong></td><td><strong>15,25%</strong></td><td><strong>$152.500 retenidos</strong></td></tr>
<tr><td>2027</td><td>16,0%</td><td>$160.000 retenidos</td></tr>
<tr><td>2028</td><td>17,0%</td><td>$170.000 retenidos</td></tr>
</tbody>
</table>
<p>La retención del 15,25% en 2026 financia <strong>internamente</strong>: 10% impuesto a la renta (PPM) + 2,18% salud + 0,62% AFP + 1,52% SIS + 0,93% accidentes del trabajo. El SII redistribuye automáticamente esos montos a las instituciones correspondientes en la Operación Renta de abril.</p>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Independiente: no descuentes cotizaciones adicionales</strong><p>Bug común al emitir una boleta: descontar el bruto en 15,25% de retención + descuentos adicionales por AFP, salud y SIS. Eso es contabilidad doble. La retención YA financia las cotizaciones; el líquido que recibes es bruto − retención. Las cotizaciones se materializan en abril vía Operación Renta.</p></div></aside>
<p>Calcula el líquido y el desglose interno de la retención con la <a href="/calculadoras/calculadora-boleta-honorarios">calculadora de boletas</a> y la <a href="/calculadoras/calculadora-cotizacion-independientes">calculadora de cotizaciones independientes</a>.</p>`,
      },
      {
        id: 'mora-y-multas',
        title: 'Mora tributaria: multas, recargos e intereses',
        level: 2,
        html: `<p>El SII aplica recargos automáticos cuando una declaración o pago se hace fuera de plazo (Art. 53 Código Tributario):</p>
<ul class="data-grid"><li><span class="data-grid__label">Reajuste IPC</span><span class="data-grid__value">Variación IPC del período</span></li><li><span class="data-grid__label">Interés mensual</span><span class="data-grid__value">1,5% por mes o fracción</span></li><li><span class="data-grid__label">Multa Form. 29</span><span class="data-grid__value">10% si paga ≤5 meses; +2% por mes adicional, tope 30%</span></li></ul>
<div class="numeric-example"><div class="numeric-example__title">PYME que paga IVA $1.500.000 con 90 días de atraso</div><ul><li>Capital: $1.500.000</li><li>Reajuste IPC (estim. 0,5%): $7.500</li><li>Interés (1,5% × 3 meses): $67.612 sobre reajustado</li><li>Multa (10%): $150.751</li></ul><span class="total">Total a pagar: $1.725.863 — recargo ~15% sobre el capital</span></div>
<p>Para deudas laborales (sueldos impagos, finiquitos), aplica el Art. 63 CdT: capital reajustado por IPC + interés simple a la TMC vigente desde el día del incumplimiento. Calcula tu mora laboral con la <a href="/calculadoras/calculadora-intereses-mora">calculadora de intereses por mora</a>.</p>`,
      },
      {
        id: 'cierre-checklist',
        title: 'Checklist mensual y anual del PYME',
        level: 2,
        html: `<aside class="callout callout--success"><span class="callout__icon" aria-hidden="true">✅</span><div class="callout__body"><strong>Lo mínimo para no tener problemas</strong><p>Estas son las obligaciones que debes tener al día. Si delegas, asegúrate de que tu contador las cumpla mes a mes.</p></div></aside>
<h3>Mensuales (Form. 29 — antes del día 12 del mes siguiente)</h3>
<ul>
<li>IVA débito y crédito (con factura electrónica al día).</li>
<li>PPM según régimen.</li>
<li>Retenciones de honorarios pagados (15,25% en 2026).</li>
<li>Pago de cotizaciones previsionales del personal (PreviRed antes del día 13).</li>
</ul>
<h3>Trimestrales</h3>
<ul>
<li>Declaración Jurada IVA proporcional (si tienes ventas mixtas exentas/gravadas).</li>
</ul>
<h3>Anuales</h3>
<ul>
<li>Operación Renta (abril) — Form. 22.</li>
<li>Patente comercial (enero y julio).</li>
<li>Contribuciones del inmueble del giro (4 cuotas).</li>
<li>Renovación de inicio de actividades / cambio de domicilio si aplica.</li>
<li>Inventario y declaración de existencias al cierre del ejercicio.</li>
</ul>
<p>Para profundizar en aspectos laborales del PYME (despidos, finiquitos, indemnizaciones), revisa la <a href="/guias/finiquito-laboral-chile">guía de finiquito laboral</a>. Para optimizar tu plantilla, calcula el costo total de cada empleado con la <a href="/calculadoras/calculadora-costo-empleado-pyme">calculadora de costo empleador</a>.</p>`,
      },
    ],
  },

  // ============================================
  // 12. Hogar y servicios básicos en Chile 2026
  // ============================================
  {
    slug: 'hogar-servicios-basicos-chile',
    title: 'Hogar y servicios básicos en Chile 2026: luz, agua, gas, gastos comunes',
    intent: '¿Cuánto se paga por servicios básicos en una casa o departamento?',
    description:
      'Guía de costos del hogar en Chile 2026: cuenta de la luz BT1, agua potable, subsidios, gas, internet, gastos comunes Ley 21.442, contribuciones y reajuste de arriendo (Ley 21.461).',
    category: 'finanzas',
    categoryLabel: 'Finanzas del hogar',
    keywords: [
      'cuenta de la luz chile',
      'tarifa BT1 2026',
      'subsidio agua potable',
      'gas licuado vs natural',
      'internet hogar chile',
      'gastos comunes ley 21.442',
      'contribuciones bienes raíces',
      'reajuste arriendo ley 21.461',
      'descongelamiento eléctrico ley 21.667',
      'kWh chile precio',
    ],
    publishedAt: '2026-05-16',
    updatedAt: '2026-07-04',
    readingTime: 14,
    relatedCalculators: [
      'calculadora-cuenta-luz',
      'calculadora-subsidio-agua',
      'calculadora-gastos-comunes',
      'calculadora-contribuciones',
      'calculadora-reajuste-arriendo',
      'calculadora-credito-hipotecario',
      'calculadora-subsidio-habitacional',
    ],
    relatedArticles: [
      'reajuste-arriendo-uf-2026',
      'todo-sobre-uf-chile',
      'subsidios-minvu-2026-guia',
    ],
    sources: [
      {
        label: 'Comisión Nacional de Energía (CNE)',
        url: 'https://www.cne.cl',
      },
      {
        label: 'Superintendencia de Servicios Sanitarios (SISS)',
        url: 'https://www.siss.gob.cl',
      },
      {
        label: 'Subsecretaría de Telecomunicaciones (Subtel)',
        url: 'https://www.subtel.gob.cl',
      },
      {
        label: 'Ley 21.667 — Descongelamiento de tarifas eléctricas',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1203795',
      },
      {
        label: 'Ley 21.442 — Nueva Ley de Copropiedad Inmobiliaria',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1175052',
      },
      {
        label: 'Ley 21.461 — Mejoras al arrendamiento de predios urbanos',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1180127',
      },
      {
        label: 'Ley 18.778 — Subsidio Agua Potable',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=30007',
      },
    ],
    sections: [
      {
        id: 'panorama-hogar',
        title: 'Cuánto cuesta el hogar promedio en Chile',
        level: 2,
        html: `<p>Para una familia tipo (2 adultos + 1 niño) en un departamento de 60 m² en Santiago, los servicios básicos en 2026 totalizan entre <strong>$240.000 y $420.000 mensuales</strong>, según consumo y ubicación.</p>
<table>
<thead><tr><th>Servicio</th><th>Mensual mínimo</th><th>Mensual promedio</th><th>Mensual alto</th></tr></thead>
<tbody>
<tr><td>Luz (200 kWh/mes)</td><td>$30.000</td><td>$45.000</td><td>$70.000</td></tr>
<tr><td>Agua (15 m³/mes)</td><td>$15.000</td><td>$22.000</td><td>$35.000</td></tr>
<tr><td>Gas licuado / red</td><td>$25.000</td><td>$45.000</td><td>$80.000</td></tr>
<tr><td>Internet hogar (200-600 Mbps)</td><td>$15.990</td><td>$25.990</td><td>$45.000</td></tr>
<tr><td>Gastos comunes</td><td>$50.000</td><td>$120.000</td><td>$220.000</td></tr>
<tr><td>Contribuciones (cuota)</td><td>$0 (exento)</td><td>$25.000</td><td>$80.000</td></tr>
</tbody>
</table>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>El gasto fijo del hogar pesa fuerte sobre el presupuesto</strong><p>Con sueldo líquido $1.200.000 (típico de un profesional joven), los servicios básicos pueden absorber 25%-35% del ingreso. Reducir luz, gas e internet con simples cambios de hábito puede liberar $40.000-$60.000/mes.</p></div></aside>`,
      },
      {
        id: 'cuenta-luz',
        title: 'Cuenta de la luz: tarifa BT1 y descongelamiento',
        level: 2,
        html: `<p>La <strong>tarifa BT1</strong> (Baja Tensión Tipo 1, residencial) es la tarifa que aplica a la inmensa mayoría de hogares chilenos. La fija la <strong>CNE</strong> (Comisión Nacional de Energía) en decretos tarifarios semestrales. Tras la <strong>Ley 21.667 (2024)</strong> que descongeló las tarifas congeladas desde 2019, los precios subieron progresivamente entre abril 2024 y enero 2026.</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Ley 21.667 — Estabilización de tarifas</strong><p>La ley creó el FET (Fondo de Estabilización de Tarifas) y un mecanismo de subsidio focalizado para hogares vulnerables. Los hogares del 40% más vulnerable según RSH reciben descuento automático en la cuenta de luz a través del subsidio eléctrico.</p></div></aside>
<table>
<thead><tr><th>Componente cuenta luz</th><th>Valor 2026 (Santiago, sin IVA)</th></tr></thead>
<tbody>
<tr><td>Cargo fijo mensual</td><td>$2.800</td></tr>
<tr><td>Energía: 0–150 kWh</td><td>$165 / kWh</td></tr>
<tr><td>Energía: 150–300 kWh</td><td>$185 / kWh</td></tr>
<tr><td>Energía: + 300 kWh</td><td>$220 / kWh</td></tr>
</tbody>
</table>
<div class="numeric-example"><div class="numeric-example__title">Familia con consumo 250 kWh/mes en Santiago</div><ul><li>Cargo fijo: $2.800</li><li>Tramo 0-150 kWh: 150 × $165 = $24.750</li><li>Tramo 150-300 kWh: 100 × $185 = $18.500</li><li>Subtotal neto: $46.050</li><li>IVA 19%: $8.749</li></ul><span class="total">Total cuenta luz: $54.799 — promedio ~$219/kWh con IVA</span></div>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Tres acciones que bajan la cuenta hasta 30%</strong><p>(1) Cambiar todas las ampolletas a LED (ahorra 80% vs incandescentes y 30% vs halógenas). (2) Bajar 1°C el termostato del agua caliente sanitaria (ACS). (3) Desconectar electrodomésticos en standby — pueden representar el 5%-10% del consumo total.</p></div></aside>
<p>Calcula tu cuenta exacta y simula consumos con la <a href="/calculadoras/calculadora-cuenta-luz">calculadora de cuenta de luz</a>.</p>`,
      },
      {
        id: 'agua',
        title: 'Agua potable y subsidio (Ley 18.778)',
        level: 2,
        html: `<p>El servicio de agua potable lo entregan empresas sanitarias privadas reguladas por la <strong>SISS</strong> (Aguas Andinas, ESSAL, ESSBIO, etc.). La cuenta tiene tres componentes: cargo fijo, agua potable consumida (m³) y servicio de alcantarillado proporcional.</p>
<ul class="data-grid"><li><span class="data-grid__label">Cargo fijo mensual</span><span class="data-grid__value">$1.500 – $3.500</span></li><li><span class="data-grid__label">Agua potable</span><span class="data-grid__value">$700 – $1.400 / m³</span></li><li><span class="data-grid__label">Alcantarillado</span><span class="data-grid__value">$400 – $900 / m³</span></li><li><span class="data-grid__label">Promedio nacional</span><span class="data-grid__value">$1.300 / m³ (todo incluido)</span></li></ul>
<h3>Subsidio Agua Potable (SAP)</h3>
<p>La <a href="https://www.bcn.cl/leychile/navegar?idNorma=30007" target="_blank" rel="noopener">Ley 18.778</a> creó el SAP para hogares vulnerables. Subsidia entre 25% y 100% del consumo según tramo de RSH y comuna. La tasa máxima del subsidio es 60% del consumo del primer tramo (15 m³).</p>
<table>
<thead><tr><th>Tramo RSH</th><th>Subsidio sobre primeros 15 m³</th></tr></thead>
<tbody>
<tr><td>0%-40% (más vulnerable)</td><td>60%</td></tr>
<tr><td>40%-70% (vulnerable medio)</td><td>40%</td></tr>
<tr><td>70%-90% (vulnerabilidad baja)</td><td>25%</td></tr>
</tbody>
</table>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Cómo postular al SAP</strong><p>El SAP se postula en la municipalidad correspondiente con cédula de identidad, certificado de RSH y boletas de agua de los últimos 3 meses. Vigencia: 3 años renovables. NO es automático aunque cumplas requisitos: hay que postular activamente.</p></div></aside>
<p>Estima el monto de tu subsidio según RSH y consumo con la <a href="/calculadoras/calculadora-subsidio-agua">calculadora de subsidio del agua</a>.</p>`,
      },
      {
        id: 'gas-internet',
        title: 'Gas e internet: dos costos que muchos sobre-pagan',
        level: 2,
        html: `<h3>Gas licuado (cilindros) vs gas natural por red</h3>
<p>El gas licuado en cilindros (45 kg, 15 kg, 11 kg, 5 kg) es el más usado fuera del Gran Santiago. El gas natural por red (Lipigas, Metrogas, Gasvalpo) llega solo a comunas urbanas.</p>
<table>
<thead><tr><th>Tipo</th><th>Precio promedio 2026</th><th>Comparación equivalente energético</th></tr></thead>
<tbody>
<tr><td>Cilindro 15 kg</td><td>$25.000 – $32.000</td><td>~$2.000 / Mcal</td></tr>
<tr><td>Cilindro 45 kg</td><td>$70.000 – $90.000</td><td>~$1.800 / Mcal</td></tr>
<tr><td>Gas natural red (Metrogas)</td><td>~$650 – $850 / m³</td><td>~$80 / Mcal</td></tr>
</tbody>
</table>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Gas natural vs licuado</strong><p>Si tienes acceso a red de gas natural, el precio por Megacaloría es 10-25 veces menor que el de cilindros. Para una familia que consume 30 Mcal/mes (cocina + agua caliente), el ahorro anual puede superar los $400.000.</p></div></aside>
<h3>Internet hogar (Ley General de Telecomunicaciones)</h3>
<p>El mercado chileno de internet residencial ofrece planes desde $15.990/mes (200 Mbps fibra) hasta $50.000+ (1 Gbps). Subtel publica indicadores trimestrales por proveedor:</p>
<ul>
<li><strong>Velocidad mínima exigible</strong>: el 70% de la velocidad contratada al menos el 95% del tiempo (Reglamento de Calidad de Servicio).</li>
<li><strong>Cláusula automática de baja</strong>: puedes cambiarte a un plan más barato del mismo proveedor sin recargo (Ley 21.387 de 2021).</li>
<li><strong>Portabilidad de número fijo</strong>: si tu plan incluye telefonía, puedes mantenerla al cambiar de proveedor.</li>
</ul>`,
      },
      {
        id: 'gastos-comunes',
        title: 'Gastos comunes: la nueva Ley 21.442',
        level: 2,
        html: `<p>La <a href="https://www.bcn.cl/leychile/navegar?idNorma=1175052" target="_blank" rel="noopener">Ley 21.442 (2022)</a>, vigente desde abril 2024, reemplazó la antigua Ley 19.537 y modernizó la regulación de gastos comunes en condominios.</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Cambios clave Ley 21.442</strong><p>(1) Prohibición de cobrar más a quienes pagan al día para subsidiar morosos. (2) Conceptos obligatorios deben aparecer separados (administración, mantención, fondo de reserva). (3) Asambleas pueden hacerse 100% remotas con quórum reducido. (4) Multas máximas a copropietarios morosos: 1 UF por mes.</p></div></aside>
<p>El gasto común se divide entre los copropietarios según el <strong>coeficiente de copropiedad</strong> definido en el reglamento (en general, proporcional a la superficie de cada unidad). NO existe una "tarifa por m²" obligatoria; los $/m² promedio que circulan son referenciales del mercado.</p>
<table>
<thead><tr><th>Concepto</th><th>% típico del gasto común</th></tr></thead>
<tbody>
<tr><td>Personal (conserjería, aseo)</td><td>35% – 45%</td></tr>
<tr><td>Administración</td><td>5% – 8%</td></tr>
<tr><td>Mantenimiento (ascensores, piscina, jardines)</td><td>15% – 25%</td></tr>
<tr><td>Servicios (luz / agua áreas comunes)</td><td>10% – 15%</td></tr>
<tr><td>Fondo de reserva (mín. 5% legal)</td><td>5% – 10%</td></tr>
<tr><td>Servicios premium (gym, salón eventos)</td><td>5% – 15%</td></tr>
</tbody>
</table>
<div class="numeric-example"><div class="numeric-example__title">Departamento 60 m² en Las Condes con piscina, gym y conserjería 24/7</div><ul><li>Base por superficie ($15.000/m²): $900.000 ÷ N° unidades = depende del edificio</li><li>Cuota promedio observada del mercado para departamentos similares: <strong>$120.000 – $180.000/mes</strong></li></ul><span class="total">El monto exacto sale del prorrateo del reglamento, NO de fórmulas externas</span></div>
<p>Estima un orden de magnitud según superficie y servicios con la <a href="/calculadoras/calculadora-gastos-comunes">calculadora de gastos comunes</a>. Recuerda: tu administración te dará el cálculo legal exacto basado en el coeficiente de copropiedad.</p>`,
      },
      {
        id: 'contribuciones-hogar',
        title: 'Contribuciones de la vivienda',
        level: 2,
        html: `<p>Si eres propietario de tu casa o departamento, pagas contribuciones (Impuesto Territorial, Ley 17.235). Aplica una <strong>exención automática</strong> para viviendas de avalúo fiscal bajo <strong>225,96 UTM</strong> (≈$15,9 millones con UTM julio 2026).</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Avalúo fiscal ≠ tasación comercial</strong><p>El avalúo fiscal es un valor administrativo que el SII fija para efectos de contribuciones. Suele ser 30%-60% del valor comercial real. Para departamentos en Santiago centro de 50 m², el avalúo fiscal típico es $25M-$45M (vs $80M-$150M comercial). Verifica tu avalúo en sii.cl con tu rol de propiedad.</p></div></aside>
<table>
<thead><tr><th>Avalúo fiscal</th><th>Estado</th><th>Contribución anual estimada (0,9%)</th></tr></thead>
<tbody>
<tr><td>≤ 225,96 UTM (~$15,9M)</td><td>Exenta</td><td>$0</td></tr>
<tr><td>$30.000.000</td><td>Tributa</td><td>~$270.000 anual</td></tr>
<tr><td>$60.000.000</td><td>Tributa</td><td>~$540.000 anual</td></tr>
<tr><td>$120.000.000</td><td>Tributa</td><td>~$1.080.000 anual</td></tr>
</tbody>
</table>
<p>Las contribuciones se pagan en 4 cuotas anuales (abril, junio, septiembre, noviembre). El SII envía aviso por correo, pero la responsabilidad del pago es del propietario aunque no llegue notificación. Calcula tu contribución por avalúo y destino con la <a href="/calculadoras/calculadora-contribuciones">calculadora de contribuciones</a>.</p>`,
      },
      {
        id: 'arriendo',
        title: 'Reajuste de arriendo (Ley 21.461)',
        level: 2,
        html: `<p>La <a href="https://www.bcn.cl/leychile/navegar?idNorma=1180127" target="_blank" rel="noopener">Ley 21.461</a> (2022) estableció reglas claras sobre reajuste y término de contratos de arrendamiento de predios urbanos. Cambió las reglas del juego para arrendadores y arrendatarios.</p>
<ul class="data-grid"><li><span class="data-grid__label">Plazo mínimo entre reajustes</span><span class="data-grid__value">6 meses (en CLP)</span></li><li><span class="data-grid__label">Pacto de reajuste por UF</span><span class="data-grid__value">Permitido (sin IPC adicional)</span></li><li><span class="data-grid__label">Garantía máxima</span><span class="data-grid__value">1 mes de arriendo</span></li><li><span class="data-grid__label">Multa máxima por término anticipado</span><span class="data-grid__value">2 meses de arriendo</span></li></ul>
<h3>Arriendo en UF vs en CLP</h3>
<p>Si tu contrato pacta el arriendo en <strong>UF</strong>, el monto en pesos se actualiza automáticamente todos los días con el valor de la UF. <strong>NO se le suma IPC</strong> adicional, porque la UF ya se reajusta por IPC del mes anterior.</p>
<p>Si tu contrato pacta el arriendo en <strong>CLP</strong>, debe especificar el mecanismo de reajuste. Si pacta IPC, debe esperarse al menos 6 meses entre reajustes. Si han pasado menos meses, el reajuste se prorratea linealmente.</p>
<div class="numeric-example"><div class="numeric-example__title">Arriendo $500.000 CLP con IPC anual 5% — 6 meses transcurridos</div><ul><li>Factor reajuste: 1 + 5% × (6/12) = 1,025</li><li>Nuevo arriendo: $500.000 × 1,025 = $512.500</li></ul><span class="total">Aumento: $12.500/mes (proporcional al período)</span></div>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>El arrendador NO puede reajustar a discreción</strong><p>Cualquier reajuste que no respete la cláusula del contrato y los plazos legales es inválido. Si tu arrendador sube el monto sin base legal, puedes pagar el monto antiguo y demandar la diferencia ante el Juzgado de Policía Local (causa de mediana cuantía).</p></div></aside>
<p>Calcula tu reajuste correcto con la <a href="/calculadoras/calculadora-reajuste-arriendo">calculadora de reajuste de arriendo</a>.</p>`,
      },
      {
        id: 'subsidios-vivienda',
        title: 'Subsidios habitacionales: para comprar tu casa',
        level: 2,
        html: `<p>El MINVU tiene varios programas de subsidio según ingreso, tramo de RSH y tipo de vivienda:</p>
<ul>
<li><strong>DS49 (Fondo Solidario)</strong>: para sectores vulnerables (RSH ≤ 40%). Subsidio hasta 450 UF para vivienda nueva o usada. Sin necesidad de crédito hipotecario.</li>
<li><strong>DS01 (Sectores Medios)</strong>: para clase media (RSH 40%-90%). Subsidio entre 250 y 650 UF según tramo. Requiere crédito hipotecario complementario.</li>
<li><strong>DS19 (Integración Social y Territorial)</strong>: subsidio adicional al DS01/DS49 cuando el proyecto incluye mix social. Hasta 200 UF extra.</li>
<li><strong>DFL2</strong>: viviendas de hasta 140 m² construidos con beneficios tributarios (50% rebaja en contribuciones por 15 años).</li>
</ul>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Combinar subsidios para maximizar</strong><p>Si calificas para DS01 + DS19 puedes recibir hasta 850 UF (~$34M con UF julio 2026), lo que cubre 50%-70% del precio de un departamento de 50 m² en comunas periféricas. Postula en serviu.cl con la documentación completa.</p></div></aside>
<p>Estima tu subsidio según ingreso y tramo con la <a href="/calculadoras/calculadora-subsidio-habitacional">calculadora de subsidio habitacional</a>. Para simular el dividendo de tu hipoteca complementaria, usa la <a href="/calculadoras/calculadora-credito-hipotecario">calculadora de crédito hipotecario</a>.</p>`,
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
