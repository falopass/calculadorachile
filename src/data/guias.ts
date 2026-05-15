// ============================================
// Guías profundas (pillar content) — Chile 2026
// ----------------------------------------------
// Cada guía es un artículo de referencia (1500-2500 palabras) que
// agrupa conceptos legales, fórmulas, ejemplos numéricos y enlaces
// a calculadoras y blog posts relacionados.
//
// Convención editorial:
//   - Tono: explicativo, sin jerga innecesaria.
//   - Estructura: H2 por sección principal, H3 para subtemas.
//   - Cada bloque debe poder responder por sí mismo a una intención
//     de búsqueda específica (siempre cierra con un enlace a la
//     calculadora correspondiente).
//   - Bases legales se citan con artículo y ley.
//   - Las fuentes oficiales se enlazan a `bcn.cl`, `dt.gob.cl`,
//     `sii.cl`, `bcentral.cl`, `spensiones.cl`, `cmfchile.cl`.
//
// Las guías se renderizan en `/guias/[slug]` con su propio metadata,
// JSON-LD Article + BreadcrumbList, y un bloque de calculadoras
// relacionadas y artículos de blog complementarios.
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
    | 'finanzas';
  /** Etiqueta legible de la categoría. */
  categoryLabel: string;
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  /** Estimación de tiempo de lectura en minutos (10 wpm/seg). */
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
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 12,
    relatedCalculators: [
      'calculadora-sueldo-liquido',
      'calculadora-comparador-afp',
      'calculadora-costo-empleado-pyme',
      'calculadora-impuesto-segunda-categoria',
    ],
    relatedArticles: [
      'diferencia-sueldo-bruto-liquido',
      'guia-horas-extra-chile',
      'como-funciona-gratificacion-legal',
    ],
    sources: [
      { label: 'Dirección del Trabajo', url: 'https://www.dt.gob.cl' },
      { label: 'Superintendencia de Pensiones', url: 'https://www.spensiones.cl' },
      { label: 'Servicio de Impuestos Internos (SII)', url: 'https://www.sii.cl' },
      { label: 'Biblioteca del Congreso Nacional', url: 'https://www.bcn.cl' },
    ],
    sections: [
      {
        id: 'que-es-sueldo-liquido',
        title: '¿Qué es el sueldo líquido?',
        level: 2,
        html: `<p>El <strong>sueldo líquido</strong> es el monto que un trabajador dependiente recibe efectivamente en su cuenta bancaria cada mes después de aplicarse todos los descuentos legales obligatorios. En Chile, la diferencia entre el <strong>sueldo bruto</strong> (lo pactado en el contrato) y el líquido oscila entre un 17% y un 25%, dependiendo del sistema de salud, la AFP elegida y si el sueldo entra o no en tramos del impuesto único de segunda categoría.</p>
<p>La estructura legal de estos descuentos está definida principalmente en el <a href="https://www.bcn.cl/leychile/navegar?idNorma=207436" target="_blank" rel="noopener">D.L. 3500 (sistema de pensiones)</a>, la Ley 18.469 (Régimen de Salud), la Ley 19.728 (Seguro de Cesantía) y los artículos 42 y 43 de la <a href="https://www.bcn.cl/leychile/navegar?idNorma=6368" target="_blank" rel="noopener">Ley sobre Impuesto a la Renta</a>.</p>`,
      },
      {
        id: 'descuentos-obligatorios',
        title: 'Descuentos obligatorios sobre la remuneración bruta',
        level: 2,
        html: `<h3>1. Cotización AFP (10% + comisión variable)</h3>
<p>La cotización obligatoria a la cuenta de capitalización individual es del <strong>10%</strong> sobre la remuneración imponible (D.L. 3500, art. 17). Sobre ese 10% se suma la <strong>comisión variable</strong> que cobra cada AFP y que en 2026 va desde 0,46% (AFP Uno) hasta 1,45% (AFP ProVida). El SIS (Seguro de Invalidez y Sobrevivencia) NO se descuenta al trabajador desde la Ley 20.255 de 2008: lo paga íntegramente el empleador.</p>
<p>En 2026 la <strong>tasa total descontada al trabajador</strong> por AFP queda entre 10,46% (Uno) y 11,45% (ProVida). Para un sueldo bruto de $1.000.000 con AFP Modelo (0,58%), el descuento mensual de AFP es de $105.800.</p>

<h3>2. Cotización de salud (7% mínimo)</h3>
<p>El <strong>7% del imponible</strong> va a FONASA o al plan de Isapre. El plan de Isapre puede costar más del 7% legal: en ese caso el trabajador paga el mayor entre 7% y el costo del plan. El monto pactado en UF se transforma a pesos con el valor UF del último día del mes anterior al pago.</p>

<h3>3. Seguro de cesantía (0,6%)</h3>
<p>Solo aplica a trabajadores con contrato indefinido. El trabajador aporta <strong>0,6%</strong> y el empleador <strong>2,4%</strong> (Ley 19.728). Para contratos a plazo fijo, el trabajador no aporta nada y el empleador paga 3,0%.</p>

<h3>4. Impuesto único de segunda categoría</h3>
<p>Es un impuesto progresivo que aplica solo sobre el sueldo que excede 13,5 UTM mensuales (~$952.880 con UTM mayo 2026). Se calcula con la tabla del SII (artículo 43 N°1 LIR), que tiene 8 tramos con tasas marginales de 0%, 4%, 8%, 13,5%, 23%, 30,4%, 35% y 40%.</p>`,
      },
      {
        id: 'topes-imponibles',
        title: 'Tope imponible 2026: 89,9 UF',
        level: 2,
        html: `<p>Las cotizaciones de AFP y salud se calculan sobre la <strong>remuneración imponible</strong>, que tiene un tope mensual de <strong>89,9 UF</strong> en 2026 (Superintendencia de Pensiones, circular vigente). Con UF a $40.340 el tope mensual equivale aproximadamente a $3.626.566.</p>
<p>El seguro de cesantía tiene un tope distinto: <strong>134,9 UF</strong> mensuales, lo que da espacio adicional para sueldos altos.</p>
<p>Esto significa que si tu sueldo bruto supera $3.626.566, las cotizaciones de AFP y salud se calcularán solo sobre ese tope. La porción que exceda no cotiza, lo que reduce el porcentaje efectivo de descuento.</p>`,
      },
      {
        id: 'ejemplo-completo',
        title: 'Ejemplo completo: sueldo bruto $1.500.000',
        level: 2,
        html: `<p>Supuestos: AFP Habitat (1,27% comisión), FONASA, contrato indefinido, sin bonos.</p>
<ul>
<li><strong>Imponible</strong>: $1.500.000 (bajo el tope de 89,9 UF)</li>
<li><strong>AFP</strong>: $1.500.000 × 11,27% = <strong>$169.050</strong></li>
<li><strong>Salud (7%)</strong>: $1.500.000 × 7% = <strong>$105.000</strong></li>
<li><strong>Cesantía (0,6%)</strong>: $1.500.000 × 0,6% = <strong>$9.000</strong></li>
<li><strong>Base tributable</strong>: $1.500.000 − ($169.050 + $105.000 + $9.000) = $1.216.950</li>
<li><strong>Base en UTM</strong>: $1.216.950 ÷ $70.588 ≈ 17,24 UTM (cae en el tramo 13,5–30 UTM, factor 4%, sin rebaja)</li>
<li><strong>Impuesto</strong>: 17,24 × 0,04 × $70.588 − $0 ≈ <strong>$48.685</strong></li>
<li><strong>Total descuentos</strong>: $169.050 + $105.000 + $9.000 + $48.685 = $331.735</li>
<li><strong>Sueldo líquido</strong>: $1.500.000 − $331.735 = <strong>$1.168.265</strong></li>
</ul>
<p>El factor de conversión bruto→líquido es 77,9%. Para validar tu propio cálculo con tu AFP y plan de salud, usa la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a>.</p>`,
      },
      {
        id: 'bonos-imponibles-no-imponibles',
        title: 'Bonos imponibles y no imponibles',
        level: 2,
        html: `<p>No todo lo que recibe un trabajador se descuenta de la misma forma. La ley distingue entre haberes <strong>imponibles</strong> (forman base de cotizaciones e impuesto) y haberes <strong>no imponibles</strong> (no se descuentan):</p>
<ul>
<li><strong>Imponibles</strong>: sueldo base, gratificación, comisiones, horas extra, bonos por desempeño, bono de producción, bono de antigüedad.</li>
<li><strong>No imponibles</strong>: asignación de movilización, asignación de colación, asignación de pérdida de caja, asignación de desgaste de herramientas, viáticos efectivos, asignación familiar.</li>
</ul>
<p>Las asignaciones no imponibles deben ser razonables y proporcionales al gasto real. Si el SII detecta que el monto excede el costo real (por ejemplo, $200.000 mensuales de "movilización" sin justificación), recalifica esa porción como imponible y exige cotizaciones e impuesto retroactivos.</p>`,
      },
      {
        id: 'calculo-inverso',
        title: 'Cálculo inverso: ¿cuánto bruto necesito para X líquido?',
        level: 2,
        html: `<p>El cálculo de bruto a líquido no es lineal porque el impuesto único de segunda categoría es progresivo. La forma correcta de obtener el bruto que produce un líquido específico es por <strong>búsqueda iterativa (bisección)</strong>: probar un bruto, calcular el líquido resultante, ajustar y repetir hasta converger.</p>
<p>Nuestra calculadora hace esto automáticamente cuando activas la opción "cálculo inverso". Como aproximación rápida sin impuesto, dividir el líquido entre 0,80 da una estimación razonable para sueldos por debajo del primer tramo gravado.</p>`,
      },
      {
        id: 'errores-comunes',
        title: 'Errores comunes en el cálculo del sueldo líquido',
        level: 2,
        html: `<ul>
<li><strong>Aplicar el 10% AFP sobre todos los haberes</strong>: solo aplica sobre los <em>imponibles</em> y solo hasta el tope de 89,9 UF.</li>
<li><strong>Olvidar la gratificación legal</strong>: el 25% de gratificación (tope 4,75 IMM/12) sí es imponible.</li>
<li><strong>Confundir "sueldo base" con "sueldo bruto"</strong>: el bruto incluye base + gratificación + bonos imponibles.</li>
<li><strong>Asumir que el plan de Isapre es siempre 7%</strong>: si el plan cuesta más, el trabajador paga el mayor entre 7% y el plan.</li>
<li><strong>Ignorar el tope imponible</strong>: para sueldos sobre $3,6 M, el descuento efectivo es menor al 22% típico.</li>
</ul>`,
      },
      {
        id: 'preguntas-frecuentes',
        title: 'Preguntas frecuentes',
        level: 2,
        html: `<h3>¿Las horas extra entran en la base de AFP?</h3>
<p>Sí. El recargo del 50% sobre el valor hora ordinaria se considera remuneración imponible. La calculadora de horas extra muestra el impacto en cotizaciones.</p>

<h3>¿Cómo afecta cambiarme de AFP?</h3>
<p>El 10% obligatorio es el mismo en todas las AFP. Solo cambia la comisión variable y la rentabilidad histórica del fondo. Para 2026, AFP Uno tiene la comisión más baja (0,46%) y ProVida la más alta (1,45%). Compara con la <a href="/calculadoras/calculadora-comparador-afp">calculadora comparadora de AFP</a>.</p>

<h3>¿El finiquito se calcula con sueldo bruto o líquido?</h3>
<p>Con sueldo bruto, considerando promedio de los últimos 3 meses si la remuneración es variable. La indemnización por años de servicio se calcula sobre la remuneración mensual incluyendo gratificación pero excluyendo colación y movilización (artículo 172 del Código del Trabajo).</p>`,
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
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 14,
    relatedCalculators: [
      'calculadora-finiquito',
      'calculadora-indemnizacion-anos-servicio',
      'calculadora-vacaciones-proporcionales',
      'calculadora-gratificacion-legal',
    ],
    relatedArticles: [
      'como-calcular-finiquito-chile',
      'calcular-indemnizacion-por-anos',
      'vacaciones-proporcionales-guia',
    ],
    sources: [
      {
        label: 'Código del Trabajo (BCN)',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=207436',
      },
      { label: 'Dirección del Trabajo', url: 'https://www.dt.gob.cl' },
    ],
    sections: [
      {
        id: 'que-es-finiquito',
        title: '¿Qué es el finiquito?',
        level: 2,
        html: `<p>El <strong>finiquito</strong> es el documento que pone término formal a una relación laboral en Chile. Detalla los pagos finales que el empleador debe al trabajador (sueldos pendientes, vacaciones, gratificación proporcional, indemnización si corresponde) y otorga al empleador un finiquito de obligaciones laborales — siempre que cumpla los requisitos legales de validez.</p>
<p>Está regulado en los artículos 9, 159, 161, 162, 163, 168 y 177 del <a href="https://www.bcn.cl/leychile/navegar?idNorma=207436" target="_blank" rel="noopener">Código del Trabajo</a>. Para que tenga valor liberatorio debe firmarse ante un ministro de fe (notario, inspector del trabajo, presidente del sindicato) y pagarse en su totalidad en el acto.</p>`,
      },
      {
        id: 'componentes-finiquito',
        title: 'Componentes del finiquito',
        level: 2,
        html: `<h3>1. Sueldo devengado</h3>
<p>Días trabajados del último mes que aún no se han pagado. Se calcula como <code>sueldo_mensual × días_trabajados ÷ 30</code>.</p>

<h3>2. Vacaciones proporcionales</h3>
<p>Por cada mes trabajado en el año en curso te corresponden <strong>1,25 días hábiles</strong> (15 días anuales ÷ 12 meses). El valor del día hábil es <code>sueldo_mensual ÷ 30</code>. Para 8 meses con sueldo $700.000: 8 × 1,25 = 10 días × $23.333 = $233.330.</p>

<h3>3. Vacaciones pendientes</h3>
<p>Días no tomados de períodos anteriores (artículo 67 CT). No prescriben mientras dura la relación laboral. Se pagan al mismo valor que las proporcionales.</p>

<h3>4. Indemnización por años de servicio</h3>
<p>Solo cuando el empleador pone término al contrato sin causa justificada (artículo 161, "necesidades de la empresa") o por mutuo acuerdo con indemnización pactada. Es <strong>30 días de la última remuneración por cada año de servicio o fracción superior a 6 meses</strong>, con tope de 11 años (330 días). La base no puede superar 90 UF (artículo 172).</p>

<h3>5. Gratificación proporcional</h3>
<p>Si el empleador paga gratificación legal mensual, ya está incluida en el sueldo. Si la paga anualmente, se calcula la fracción proporcional al período trabajado en el año.</p>

<h3>6. Indemnización sustitutiva del aviso</h3>
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
<p>Si el tribunal declara que el despido fue injustificado, indebido o improcedente, la indemnización se incrementa con un <strong>recargo del 30% al 100%</strong> según el artículo 168 CT. Para falta de probidad invocada sin pruebas, el recargo es 80%.</p>`,
      },
      {
        id: 'ejemplo-finiquito',
        title: 'Ejemplo numérico: despido por necesidades de la empresa',
        level: 2,
        html: `<p>Trabajador con sueldo bruto de $900.000, contratado el 1 de marzo 2018, despedido el 15 de julio 2026 (8 años y 4 meses). No le avisaron con 30 días de anticipación. Tiene 8 días pendientes de vacaciones del año anterior.</p>
<ul>
<li><strong>Días trabajados último mes</strong>: 15 días × ($900.000 ÷ 30) = $450.000</li>
<li><strong>Vacaciones proporcionales</strong>: 4 meses × 1,25 = 5 días × $30.000 = $150.000</li>
<li><strong>Vacaciones pendientes</strong>: 8 días × $30.000 = $240.000</li>
<li><strong>Indemnización años servicio</strong>: 8 años × $900.000 = $7.200.000 (sin tope, base 25,7 UF está bajo 90 UF)</li>
<li><strong>Indemnización sustitutiva del aviso</strong>: $900.000</li>
<li><strong>Gratificación proporcional</strong>: incluida en el sueldo mensual (pago mensual)</li>
<li><strong>Total finiquito</strong>: <strong>$8.940.000</strong></li>
</ul>
<p>Para validar tu caso con datos reales (incluyendo gratificación, bonos, recargos por despido injustificado), usa la <a href="/calculadoras/calculadora-finiquito">calculadora de finiquito</a>.</p>`,
      },
      {
        id: 'plazos-legales',
        title: 'Plazos legales: cuánto tiempo tiene el empleador para pagar',
        level: 2,
        html: `<p>El empleador tiene <strong>10 días hábiles</strong> desde la separación del trabajador para liquidar y pagar el finiquito (artículo 177 CT). Si no paga en ese plazo, el trabajador puede:</p>
<ol>
<li>Presentar reclamo administrativo en la <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Inspección del Trabajo</a> (gratuito).</li>
<li>Demandar laboralmente — el plazo de prescripción es de <strong>2 años</strong> desde el término del contrato (artículo 510 CT).</li>
<li>Solicitar intereses de mora desde el día 11. Para ello se usa la Tasa Máxima Convencional (TMC) que publica mensualmente la <a href="https://www.cmfchile.cl" target="_blank" rel="noopener">CMF</a>.</li>
</ol>
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
<p>El trabajador puede firmar el finiquito "con reserva de derechos", lo que le permite reclamar diferencias posteriores sin renunciar a las cantidades pagadas.</p>`,
      },
      {
        id: 'errores-frecuentes',
        title: 'Errores frecuentes en el cálculo del finiquito',
        level: 2,
        html: `<ul>
<li><strong>No considerar gratificación al calcular indemnización</strong>: la base incluye sueldo + gratificación legal pagada (Dictamen DT 1.067/0021).</li>
<li><strong>Aplicar tope de 11 años cuando el contrato es anterior al 14/08/1981</strong>: para esos casos no aplica el tope (artículo 7 transitorio Ley 19.010).</li>
<li><strong>Calcular vacaciones con días corridos en vez de hábiles</strong>: los 15 días anuales son <em>hábiles</em> (lunes a viernes, sin feriados).</li>
<li><strong>Olvidar la indemnización sustitutiva del aviso</strong>: si despiden sin avisar 30 días antes, hay que sumar una remuneración mensual.</li>
<li><strong>No proporcionar más de 6 meses</strong>: una fracción mayor a 6 meses se cuenta como año completo.</li>
</ul>`,
      },
    ],
  },

  // ============================================
  // 3. UF, UTM y otros indicadores económicos
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
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 11,
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
    ],
    sections: [
      {
        id: 'que-es-uf',
        title: '¿Qué es la UF (Unidad de Fomento)?',
        level: 2,
        html: `<p>La <strong>Unidad de Fomento</strong> es una unidad de cuenta reajustable creada por el Decreto 40 del 20 de enero de 1967. Su valor se actualiza diariamente según la variación del Índice de Precios al Consumidor (IPC) del mes anterior. El <a href="https://www.bcentral.cl" target="_blank" rel="noopener">Banco Central de Chile</a> es responsable de calcular y publicar el valor de la UF.</p>
<p>La fórmula del reajuste es: <code>UF_día_t = UF_día_t-1 × (1 + IPC_mes_anterior)^(1/d)</code>, donde <em>d</em> es el número de días del período de reajuste (mes a mes calendario, desde el día 10 de cada mes hasta el día 9 del siguiente).</p>
<p>En mayo 2026, una UF equivale aproximadamente a <strong>$40.340</strong> pesos chilenos. Su valor se publica con un día de anticipación en el sitio del Banco Central, mindicador.cl y otros agregadores.</p>`,
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
</ul>`,
      },
      {
        id: 'que-es-utm',
        title: '¿Qué es la UTM y la UTA?',
        level: 2,
        html: `<p>La <strong>Unidad Tributaria Mensual</strong> es un indicador <em>mensual</em> reajustado según el IPC. Se usa principalmente en el ámbito tributario y para multas. La <a href="https://www.sii.cl" target="_blank" rel="noopener">SII</a> publica el valor cada mes.</p>
<p>En mayo 2026, la UTM vale <strong>$70.588</strong>. La UTA (Unidad Tributaria Anual) es simplemente <strong>UTM × 12</strong>, y se usa para los tramos del Impuesto Global Complementario.</p>
<p><strong>Diferencias clave UF vs UTM</strong>:</p>
<ul>
<li>UF: reajuste diario por IPC. UTM: reajuste mensual.</li>
<li>UF: se usa en contratos privados, créditos, arriendos. UTM: se usa para impuestos, multas y trámites públicos.</li>
<li>UF ≈ $40.340 (mayo 2026). UTM ≈ $70.588 (mayo 2026).</li>
</ul>
<p>Para convertir entre UF/UTM y pesos chilenos, usa el <a href="/calculadoras/calculadora-uf-clp">conversor UF→CLP</a> o <a href="/calculadoras/calculadora-utm-clp">conversor UTM→CLP</a>.</p>`,
      },
      {
        id: 'ipc-chile',
        title: '¿Qué es el IPC?',
        level: 2,
        html: `<p>El <strong>Índice de Precios al Consumidor</strong> mide la variación de precios de una canasta básica de bienes y servicios. Lo calcula y publica mensualmente el <a href="https://www.ine.gob.cl" target="_blank" rel="noopener">Instituto Nacional de Estadísticas (INE)</a> con los datos del mes anterior, alrededor del día 8 de cada mes.</p>
<p>El IPC es la variable maestra que determina el reajuste de UF, UTM, salarios mínimos, pensiones (PGU), arriendos en pesos y tarifas eléctricas. Un IPC anual de 4% significa que UF, UTM y otros indicadores aumentaron aproximadamente 4% en el año.</p>
<p>El IPC se descompone en 12 divisiones (alimentos, vivienda, transporte, salud, educación, etc.) y se publica también el IPC subyacente (sin alimentos volátiles ni energía) que el Banco Central usa para decisiones de política monetaria.</p>`,
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
<p>La <strong>Tasa de Política Monetaria</strong> es la tasa de referencia que fija el Consejo del Banco Central. Sirve de piso para la mayoría de las tasas del mercado. La <strong>Tasa Máxima Convencional (TMC)</strong> la publica mensualmente la <a href="https://www.cmfchile.cl" target="_blank" rel="noopener">CMF</a> y es el techo legal para créditos según la Ley 18.010.</p>`,
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
<p>En CalculaChile, los valores se actualizan diariamente vía GitHub Actions desde mindicador.cl con respaldo de las series oficiales del Banco Central.</p>`,
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
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 13,
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
      {
        label: 'Ley sobre Impuesto a las Ventas y Servicios (DL 825)',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=6369',
      },
    ],
    sections: [
      {
        id: 'que-es-iva',
        title: '¿Qué es el IVA?',
        level: 2,
        html: `<p>El <strong>Impuesto al Valor Agregado</strong> es un tributo indirecto chileno con tasa única del <strong>19%</strong>. Grava la venta de bienes muebles, prestación de servicios e importaciones (DL 825 de 1974). Lo paga finalmente el consumidor, pero se recauda en cada eslabón de la cadena productiva mediante el mecanismo de débito y crédito fiscal.</p>
<p>Una empresa cobra IVA en sus ventas (<strong>débito fiscal</strong>) y paga IVA en sus compras (<strong>crédito fiscal</strong>). En el Formulario 29 mensual declara la diferencia: si el débito supera al crédito, paga; si el crédito supera al débito, lo arrastra al mes siguiente.</p>`,
      },
      {
        id: 'calculo-iva',
        title: 'Cómo calcular el IVA',
        level: 2,
        html: `<h3>Agregar IVA al precio neto</h3>
<p><code>precio_bruto = precio_neto × 1,19</code></p>
<p>Ejemplo: producto neto $100.000 → bruto $119.000.</p>

<h3>Quitar IVA al precio bruto</h3>
<p><code>precio_neto = precio_bruto ÷ 1,19</code></p>
<p>Ejemplo: producto bruto $119.000 → neto $100.000 (IVA $19.000).</p>

<h3>Solo el IVA</h3>
<p><code>iva = precio_neto × 0,19</code> o <code>iva = precio_bruto − precio_bruto/1,19</code></p>
<p>Para evitar errores de redondeo, usa la <a href="/calculadoras/calculadora-iva">calculadora de IVA</a>.</p>`,
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
<p><strong>Reforma Ley 21.420 (2022)</strong>: desde el 1 de enero de 2023, los servicios profesionales prestados por <em>sociedades</em> sí están afectos a IVA, salvo que se constituyan como sociedad de profesionales clasificada en 2da categoría. Esto cambió radicalmente el panorama tributario para empresas de consultoría.</p>`,
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
<p><strong>Ejemplo 2026</strong>: boleta bruta $1.000.000 → retención $152.500 → líquido recibido $847.500.</p>`,
      },
      {
        id: 'exencion-honorarios',
        title: 'Exenciones y casos especiales',
        level: 2,
        html: `<ul>
<li><strong>Boletas bajo 10 UTM mensuales</strong> (~$705.880 en mayo 2026): el SII no exige cotización obligatoria si el total anual está bajo 7,5 UTA. La retención de impuesto sigue aplicando.</li>
<li><strong>Profesionales con régimen de gastos efectivos</strong>: pueden rebajar gastos reales (oficina, vehículo, tecnología) en lugar de la presunción 30% del artículo 50.</li>
<li><strong>Pensionados</strong>: pueden eximirse de la cotización previsional adicional con declaración jurada anual.</li>
</ul>
<p>Para calcular tu boleta líquida considerando el año vigente, usa la <a href="/calculadoras/calculadora-boleta-honorarios">calculadora de boleta de honorarios</a>.</p>`,
      },
      {
        id: 'operacion-renta-independientes',
        title: 'Operación Renta para independientes',
        level: 2,
        html: `<p>En abril de cada año, los profesionales independientes deben presentar el Formulario 22 (Declaración de Impuesto a la Renta). El proceso es:</p>
<ol>
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
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 14,
    relatedCalculators: [
      'calculadora-credito-hipotecario',
      'calculadora-uf-clp',
      'calculadora-subsidio-habitacional',
      'calculadora-costo-notaria',
      'calculadora-contribuciones',
    ],
    relatedArticles: ['todo-sobre-uf-chile', 'reajuste-arriendo-uf-2026'],
    sources: [
      {
        label: 'Comisión para el Mercado Financiero (CMF)',
        url: 'https://www.cmfchile.cl',
      },
      {
        label: 'SERNAC Financiero',
        url: 'https://www.sernac.cl/portal/604/w3-propertyname-1056.html',
      },
      { label: 'Banco Central de Chile', url: 'https://www.bcentral.cl' },
    ],
    sections: [
      {
        id: 'estructura-credito',
        title: 'Estructura de un crédito hipotecario',
        level: 2,
        html: `<p>Un crédito hipotecario chileno típico se estructura así:</p>
<ul>
<li><strong>Monto del crédito</strong>: 80%-90% del valor de la propiedad (el resto es el pie).</li>
<li><strong>Plazo</strong>: 15 a 30 años (lo más común: 20-25 años).</li>
<li><strong>Tasa anual</strong>: en mayo 2026 oscila entre 4,5% y 6,5% UF, según institución y perfil.</li>
<li><strong>Sistema</strong>: amortización francesa (cuota fija en UF).</li>
<li><strong>Reajuste</strong>: el saldo crece y decrece con la UF, así que la cuota en pesos cambia mes a mes.</li>
</ul>
<p>La fórmula del dividendo (PMT) es: <code>PMT = P × r(1+r)^n / ((1+r)^n − 1)</code>, donde <em>P</em> es el monto financiado en UF, <em>r</em> es la tasa mensual (anual/12) y <em>n</em> es el número de cuotas.</p>`,
      },
      {
        id: 'pie-y-financiamiento',
        title: 'Pie: el pago inicial',
        level: 2,
        html: `<p>El <strong>pie</strong> es el porcentaje del valor de la propiedad que el comprador aporta de su bolsillo. Los bancos chilenos exigen pies que van del 10% al 20%, aunque algunos exigen 30% para extranjeros o para inmuebles de inversión.</p>
<ul>
<li><strong>Pie 10%</strong>: solo para créditos con subsidio (DS01, DS19) o programas especiales.</li>
<li><strong>Pie 20%</strong>: estándar de mercado para vivienda principal.</li>
<li><strong>Pie 30%+</strong>: segundas viviendas, propiedades de inversión.</li>
</ul>
<p>El subsidio habitacional puede contar como pie. Por ejemplo, una vivienda de 2.500 UF con un subsidio DS01 de 600 UF y ahorro de 50 UF requiere financiar 1.850 UF (74%).</p>`,
      },
      {
        id: 'capacidad-endeudamiento',
        title: 'Capacidad de endeudamiento: la regla del 25%',
        level: 2,
        html: `<p>Los bancos no aprueban créditos cuyo dividendo mensual supere el <strong>25% del ingreso líquido</strong> del deudor. Esto es una práctica de la industria, no una norma legal, pero está alineada con la <a href="https://www.cmfchile.cl/educa/621/w3-article-27160.html" target="_blank" rel="noopener">recomendación de la CMF</a> sobre endeudamiento responsable.</p>
<p>Ejemplo: si tu sueldo líquido es $1.500.000, el dividendo máximo razonable es $375.000. Si el dividendo en UF + seguros equivale a $400.000 mensuales, el banco te pedirá un codeudor o reducirá el monto.</p>
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
<p>La CAE permite comparar créditos entre bancos sin que te confundan con tasas nominales que esconden seguros caros. Para un crédito de 2.500 UF a 4,5% nominal, la CAE típica está entre 5,1% y 5,8% según los seguros incluidos.</p>
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

<h3>Derechos del deudor (Ley 19.496)</h3>
<p>Puedes <strong>contratar el seguro con cualquier compañía autorizada</strong>, no solo con la del banco. El banco está obligado a aceptar la póliza si cumple las condiciones mínimas. Esto puede generar ahorros del 30%-50% en seguros frente a las pólizas atadas que ofrecen los bancos.</p>`,
      },
      {
        id: 'gastos-asociados',
        title: 'Gastos asociados al crédito',
        level: 2,
        html: `<p>Más allá del dividendo, comprar una propiedad con crédito implica gastos de una sola vez:</p>
<ul>
<li><strong>Tasación</strong>: 3-5 UF, lo paga el comprador.</li>
<li><strong>Estudio de títulos</strong>: 5-10 UF.</li>
<li><strong>Notaría (escritura)</strong>: 0,2%-0,5% del valor de la propiedad (ver <a href="/calculadoras/calculadora-costo-notaria">calculadora de costo notaría</a>).</li>
<li><strong>Conservador de Bienes Raíces</strong>: 0,2% del valor de la propiedad, con mínimo $30.000.</li>
<li><strong>Impuesto de timbres y estampillas</strong>: 0,8% anual del mutuo (DL 3475 art. 1 N°3). Para mutuos hipotecarios la práctica es cobrar 0,8% del monto del crédito.</li>
</ul>
<p>En total, los gastos de cierre suelen sumar 1,5%-3% del valor de la propiedad. Para una propiedad de UF 3.000 (≈$120 millones), eso son $1,8 a $3,6 millones adicionales al pie.</p>`,
      },
      {
        id: 'prepago',
        title: 'Prepago: cuándo conviene',
        level: 2,
        html: `<p>La Ley 19.496 (artículo 17 D) garantiza al deudor el derecho a <strong>prepagar parcial o totalmente</strong> el crédito en cualquier momento, con una comisión de prepago máxima de 1,5 mensualidades del crédito.</p>
<p>El prepago en años tempranos del crédito tiene mayor impacto porque al inicio la mayor parte del dividendo va a intereses. Prepagar 200 UF en el año 2 de un crédito a 25 años puede ahorrar el doble de intereses que prepagar la misma cantidad en el año 15.</p>
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
    ],
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 13,
    relatedCalculators: [
      'calculadora-comparador-afp',
      'calculadora-simulador-apv',
      'calculadora-pgu',
      'calculadora-cotizacion-independientes',
      'calculadora-bono-bodas-oro',
    ],
    relatedArticles: ['diferencia-sueldo-bruto-liquido'],
    sources: [
      {
        label: 'Superintendencia de Pensiones',
        url: 'https://www.spensiones.cl',
      },
      {
        label: 'Ley 21.735 (Reforma Previsional)',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1208948',
      },
      {
        label: 'D.L. 3500',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=7147',
      },
    ],
    sections: [
      {
        id: 'sistema-previsional',
        title: 'El sistema previsional chileno',
        level: 2,
        html: `<p>Chile tiene un sistema previsional <strong>mixto</strong> tras la <a href="https://www.bcn.cl/leychile/navegar?idNorma=1208948" target="_blank" rel="noopener">Ley 21.735 de 2025 (Reforma Previsional)</a>:</p>
<ol>
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
<p>Comisiones AFP vigentes en 2026:</p>
<ul>
<li>AFP Uno: 0,46%</li>
<li>AFP Modelo: 0,58%</li>
<li>AFP Planvital: 1,16%</li>
<li>AFP Habitat: 1,27%</li>
<li>AFP Cuprum: 1,44%</li>
<li>AFP Capital: 1,44%</li>
<li>AFP ProVida: 1,45%</li>
</ul>
<p>El SIS (Seguro de Invalidez y Sobrevivencia) NO se descuenta al trabajador desde Ley 20.255 (2008): lo paga 100% el empleador (~1,15% adicional sobre el imponible).</p>`,
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
<p>El cambio de fondo es gratuito y se hace en línea. Mover de A a E justo antes de un evento bursátil bajista (como 2020) puede preservar capital, pero salir y volver al fondo A en mal momento (la "recomendación 4-1-1" de Mario Marcel) suele dejar al afiliado peor parado.</p>`,
      },
      {
        id: 'pgu-2026',
        title: 'PGU: Pensión Garantizada Universal',
        level: 2,
        html: `<p>La <strong>PGU</strong> es un beneficio mensual del Estado para personas de 65+ años pertenecientes al 90% más vulnerable según el Registro Social de Hogares. Tras la <a href="https://www.bcn.cl/leychile/navegar?idNorma=1208948" target="_blank" rel="noopener">Ley 21.735</a>, el monto base 2026 es:</p>
<ul>
<li><strong>65 a 81 años</strong>: $240.931 (post-reajuste IPC febrero 2026).</li>
<li><strong>82+ años</strong>: $260.286 (PGU mayorada).</li>
</ul>
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
<ul>
<li><strong>Régimen A</strong>: el aporte se realiza con dinero ya tributado. Al retirarse en pensión, no paga impuesto a la renta. Existe un beneficio adicional: bonificación fiscal del 15% del aporte, con tope de 6 UTM al año.</li>
<li><strong>Régimen B</strong>: el aporte rebaja la base imponible (hasta 600 UF anuales). Al retirarse, paga impuesto Global Complementario.</li>
</ul>
<p>El régimen B conviene a contribuyentes en tramos altos del impuesto único (35%-40% marginales): ahorras hoy a tasa marginal alta y retiras en jubilación a tasa marginal típicamente menor.</p>
<p>Para simular cuánto acumularías con APV, usa el <a href="/calculadoras/calculadora-simulador-apv">simulador APV</a>.</p>`,
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
