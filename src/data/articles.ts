// ============================================
// Blog — artículos cortos y prácticos
// ----------------------------------------------
// Cada artículo apunta a una intención de búsqueda específica con
// un formato más conciso que las guías pillar (800-1500 palabras).
// Sirve como puerta de entrada a las calculadoras y a las guías.
//
// Convenciones:
//   - HTML serializado con clases ".callout", ".numeric-example",
//     ".data-grid", ".steps" definidas en globals.css.
//   - Tipografía base (h2/h3/p/a): globals.css `.prose` — NO hay
//     @tailwindcss/typography; no uses prose-h2: de Tailwind.
//   - Tablas: <table><thead>…</thead><tbody>…</tbody></table>
//     (no inventar filas en .data-grid; ese es solo ul>li label/value).
//   - Cada artículo cierra con un párrafo "Para profundizar…" que
//     enlaza a la guía pillar correspondiente.
// ============================================

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  keywords: string[];
  content: string;
  relatedCalculators: string[];
  /** Slug de la guía pillar relacionada (opcional). */
  relatedGuia?: string;
  /** Tiempo de lectura estimado (minutos). */
  readingTime?: number;
  /**
   * Título SEO opcional que reemplaza a `title` en `<title>` y OG.
   * Útil para subir CTR sin alterar el H1 visible. Si se omite,
   * se usa `title`.
   */
  seoTitle?: string;
  /**
   * Descripción SEO opcional que reemplaza a `description` en meta
   * y OG. Si se omite, se usa `description`.
   */
  seoDescription?: string;
  /**
   * Fecha de última actualización (ISO YYYY-MM-DD). Se usa como
   * `dateModified` en Article schema y `lastmod` en el sitemap de
   * blog, lo que ayuda a Google a detectar frescura y reindexar.
   */
  updatedAt?: string;
  /**
   * FAQ embebido para la página del artículo. Se renderiza al final
   * del contenido y se inyecta como `FAQPage` en JSON-LD, capturando
   * rich results para preguntas reales detectadas en Search Console.
   */
  faq?: { question: string; answer: string }[];
}

export const articles: Article[] = [
  {
    slug: 'permiso-circulacion-segunda-cuota-agosto-2026',
    title:
      'Segunda cuota del permiso de circulación 2026: plazo hasta el 31 de agosto',
    description:
      'Si pagaste el permiso de circulación en dos cuotas, la segunda vence el 31 de agosto de 2026. Fechas, qué necesitas y cómo estimar el monto antes de ir a la municipalidad.',
    date: '2026-07-09',
    updatedAt: '2026-07-09',
    category: 'vehiculos',
    readingTime: 6,
    seoTitle: 'Permiso de circulación 2ª cuota 2026: hasta el 31 de agosto',
    seoDescription:
      'Segunda cuota del permiso de circulación 2026: del 1 al 31 de agosto. Requisitos, multas por atraso y cómo estimar el valor. Fuente ChileAtiende.',
    keywords: [
      'permiso de circulación segunda cuota 2026',
      'permiso circulación agosto 2026',
      'segunda cuota permiso circulación',
      'permiso circulación plazo',
      'pagar permiso de circulación',
    ],
    relatedCalculators: [
      'calculadora-permiso-circulacion',
      'calculadora-multas-transito',
    ],
    faq: [
      {
        question: '¿Hasta cuándo se paga la segunda cuota del permiso 2026?',
        answer:
          'Según ChileAtiende, si elegiste pago en dos cuotas, la segunda se paga desde el 1 hasta el 31 de agosto de 2026. La primera cuota fue entre el 1 de febrero y el 31 de marzo de 2026.',
      },
      {
        question: '¿Puedo pagar la segunda cuota en cualquier municipalidad?',
        answer:
          'El permiso se paga en la municipalidad correspondiente a la inscripción del vehículo o en los canales que cada municipio habilite (presencial, web o convenios). Confirma en tu comuna antes de agendar.',
      },
      {
        question: '¿Qué pasa si no pago a tiempo?',
        answer:
          'Circular sin permiso al día puede acarrear multas y fiscalización. El monto exacto y recargos los define la normativa de tránsito y la municipalidad. No dejes el pago para el último día del plazo.',
      },
    ],
    content: `<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Aviso</strong><p>Los plazos y requisitos generales provienen de <strong>ChileAtiende</strong>. El valor exacto del permiso, la forma de pago y los documentos adicionales los fija cada <strong>municipalidad</strong> y pueden variar. Consulta con tu planta o sitio municipal antes de agendar.</p></div></aside>

<h2>Quién debe pagar la segunda cuota</h2>
<p>Si eres dueño de un vehículo motorizado y en 2026 optaste por pagar el <strong>permiso de circulación en dos cuotas</strong>, la segunda cuota corresponde al saldo pendiente del impuesto anual municipal. ChileAtiende indica expresamente esta modalidad para el proceso 2026.</p>
<ul>
<li><strong>Primera cuota:</strong> 1 de febrero al 31 de marzo de 2026.</li>
<li><strong>Segunda cuota:</strong> 1 al 31 de agosto de 2026.</li>
</ul>
<p>Si pagaste el permiso <strong>completo en una sola cuota</strong> en el primer plazo, <strong>no</strong> debes una segunda cuota por ese mismo período.</p>

<h2>Plazo crítico: 31 de agosto de 2026</h2>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>No lo dejes para el último día</strong><p>El vencimiento de la segunda cuota es el <strong>31 de agosto de 2026</strong>. En fechas límite hay filas, caídas de sitios municipales y demoras en medios de pago. Idealmente paga en la primera quincena de agosto.</p></div></aside>

<h2>Qué preparar antes de pagar</h2>
<ol class="steps">
<li><strong>Identificación del vehículo</strong> (padrón / inscripción) y cédula del propietario.</li>
<li><strong>Comprobante o liquidación de la primera cuota</strong>, si el municipio la pide para conciliar el saldo.</li>
<li><strong>Revisión técnica y SOAP al día</strong>, según lo exija tu comuna para emitir o validar el permiso. Guía: <a href="/blog/revision-tecnica-chile-2026-calendario-patente">revisión técnica 2026 por dígito de patente</a>.</li>
<li><strong>Medio de pago</strong> habilitado (caja municipal, web, servipag u otros convenios locales).</li>
</ol>
<p>Los documentos exactos los publica cada municipalidad. No asumas que el listado de una comuna sirve en otra.</p>

<h2>Cómo estimar el monto</h2>
<p>El valor del permiso depende de la <strong>tasación fiscal del vehículo</strong>, el tipo (auto, moto, carga, etc.) y reglas municipales. No hay un “precio único nacional” para todos los autos.</p>
<p>Puedes obtener una <strong>estimación orientativa</strong> con la <a href="/calculadoras/calculadora-permiso-circulacion">calculadora de permiso de circulación</a> de CalculaChile e ingresar el valor del vehículo y su antigüedad. El resultado es referencial: el monto oficial es el que cobra la municipalidad.</p>
<div class="numeric-example"><div class="numeric-example__title">Idea de orden de magnitud</div><ul><li>La segunda cuota suele ser el <strong>50% restante</strong> del permiso anual si pagaste la mitad en marzo.</li><li>Si no recuerdas el total, revisa el comprobante de la primera cuota o la cartola municipal.</li></ul><span class="total">Confirma siempre el saldo en tu municipio</span></div>

<h2>¿Qué pasa si se me pasó el plazo?</h2>
<p>Circular sin permiso vigente expone a fiscalización y multas. Los montos y recargos no son fijos en este artículo: dependen de la infracción y la comuna. Si ya venció el plazo, regulariza en la municipalidad lo antes posible y, si te multaron, puedes estimar el orden de magnitud de infracciones de tránsito con la <a href="/calculadoras/calculadora-multas-transito">calculadora de multas de tránsito</a> (también referencial).</p>

<h2>Checklist rápido de agosto</h2>
<ul>
<li>¿Pagué en dos cuotas en 2026? → Segunda cuota entre el 1 y el 31 de agosto.</li>
<li>¿Pagué todo en marzo? → No aplica segunda cuota por ese permiso.</li>
<li>¿Tengo SOAP y revisión técnica vigentes según mi comuna?</li>
<li>¿Confirmé el canal de pago del municipio (web o presencial)?</li>
</ul>

<h2>Fuentes</h2>
<ul>
<li><a href="https://www.chileatiende.gob.cl/fichas/9611-permiso-de-circulacion" target="_blank" rel="noopener">ChileAtiende — Permiso de circulación</a> (plazos 2026: 1.ª cuota feb–mar; 2.ª cuota 1–31 ago).</li>
</ul>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Disclaimer</strong><p>Contenido informativo. No reemplaza el cobro municipal ni la normativa de tránsito. Valores y filas de pago pueden cambiar sin aviso en cada comuna.</p></div></aside>
<p>Estima tu caso en la <a href="/calculadoras/calculadora-permiso-circulacion">calculadora de permiso de circulación</a> y valida el monto final en tu municipalidad.</p>`,
  },
  {
    slug: 'revision-tecnica-chile-2026-calendario-patente',
    title:
      'Revisión técnica Chile 2026: calendario por dígito de patente y requisitos',
    description:
      'Cuándo te toca la revisión técnica según el último dígito de la patente, qué se revisa, cómo consultar el estado y por qué la necesitas para el permiso de circulación.',
    date: '2026-07-10',
    updatedAt: '2026-07-10',
    category: 'vehiculos',
    readingTime: 7,
    seoTitle: 'Revisión técnica 2026: calendario por patente y requisitos',
    seoDescription:
      'Calendario de revisión técnica 2026 por dígito de patente, consulta en PRT, multas y vínculo con el permiso de circulación. Fuentes ChileAtiende y MTT/PRT.',
    keywords: [
      'revisión técnica 2026',
      'calendario revisión técnica patente',
      'cuándo me toca la revisión técnica',
      'revisión técnica por dígito',
      'PRT Chile',
      'revisión técnica y permiso de circulación',
    ],
    relatedCalculators: [
      'calculadora-permiso-circulacion',
      'calculadora-multas-transito',
    ],
    faq: [
      {
        question: '¿Cómo sé en qué mes me toca la revisión técnica?',
        answer:
          'En vehículos de revisión anual, el mes de preferencia o vencimiento se asigna según el último dígito de la placa patente única, según el calendario del Ministerio de Transportes / plantas PRT. La fecha exacta de vencimiento de tu certificado es la que aparece en el documento o al consultar por patente en el sitio de la PRT.',
      },
      {
        question: '¿Puedo hacer la revisión técnica antes del mes que me toca?',
        answer:
          'En la práctica muchas plantas permiten adelantar la revisión dentro de una ventana previa al vencimiento (a menudo hasta 90 días, según planta y normativa vigente). Confirma en la PRT donde agendes: lo importante es no circular con el certificado vencido.',
      },
      {
        question: '¿Sirve la revisión técnica para el permiso de circulación?',
        answer:
          'Sí. ChileAtiende indica que la revisión técnica vigente es necesaria para obtener el permiso de circulación. Sin ella (y sin SOAP al día, según comuna), el municipio puede rechazar o retrasar el pago del permiso.',
      },
    ],
    content: `<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Aviso</strong><p>Los precios de las plantas, filas y ventanas de agendamiento los fija cada <strong>Planta de Revisión Técnica (PRT)</strong>. El calendario por dígito es el esquema general del sistema MTT/PRT; la <strong>fecha de vencimiento real</strong> es la de tu certificado. Antes de agendar, consulta <a href="https://www.prt.cl" target="_blank" rel="noopener">prt.cl</a> o la planta de tu zona y, si hay prórrogas regionales, el sitio del <strong>MTT</strong>.</p></div></aside>

<h2>Qué es la revisión técnica</h2>
<p>La revisión técnica certifica que tu vehículo motorizado está en condiciones de circular: sistemas de seguridad, frenos, luces, neumáticos, emisiones y otros ítems regulados. ChileAtiende la describe como validación del buen estado del vehículo para caminos públicos y control ambiental.</p>
<p>Circular <strong>sin revisión técnica vigente</strong> constituye, en términos generales, una <strong>infracción grave</strong> de tránsito. Además, sin certificado al día no puedes completar el <a href="/blog/permiso-circulacion-segunda-cuota-agosto-2026">permiso de circulación</a> en la municipalidad.</p>

<h2>Calendario 2026 por último dígito de la patente</h2>
<p>Para la mayoría de los vehículos particulares de revisión <strong>anual</strong>, el mes de referencia se define por el <strong>último dígito</strong> de la placa patente única. Tabla de uso habitual (preferencia / mes de revisión):</p>
<table>
<thead>
<tr><th>Último dígito</th><th>Mes de referencia</th></tr>
</thead>
<tbody>
<tr><td>9</td><td>Enero</td></tr>
<tr><td>0</td><td>Febrero</td></tr>
<tr><td>1</td><td>Abril</td></tr>
<tr><td>2</td><td>Mayo</td></tr>
<tr><td>3</td><td>Junio</td></tr>
<tr><td>4</td><td>Julio</td></tr>
<tr><td><strong>5</strong></td><td><strong>Agosto</strong></td></tr>
<tr><td>6</td><td>Septiembre</td></tr>
<tr><td>7</td><td>Octubre</td></tr>
<tr><td>8</td><td>Noviembre</td></tr>
</tbody>
</table>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Marzo y diciembre</strong><p>Suelen reservarse para reinspecciones, rechazos o casos especiales, no para un dígito “ordinario”. <strong>No te guíes solo por el mes del dígito</strong> si tu certificado vence en otra fecha: manda el papel o la consulta online por patente.</p></div></aside>
<p>Ejemplo: patente terminada en <strong>5</strong> → mes de referencia <strong>agosto</strong> (útil si estás alineando papeles con la <a href="/blog/permiso-circulacion-segunda-cuota-agosto-2026">segunda cuota del permiso</a>).</p>

<h2>Cómo consultar si estás al día</h2>
<ol class="steps">
<li>Entra al sitio de la <a href="https://www.prt.cl/Paginas/RevisionTecnica.aspx" target="_blank" rel="noopener">Planta de Revisión Técnica (consulta por patente)</a>.</li>
<li>Ingresa la placa patente del vehículo.</li>
<li>Revisa si el estado es vigente, vencida o rechazada y hasta cuándo corre la vigencia.</li>
</ol>
<p>ChileAtiende publica el trámite <em>Consultar el estado de la revisión técnica de un vehículo motorizado</em> (sin costo de consulta en el canal web de la PRT).</p>

<h2>Qué se revisa (visión general)</h2>
<p>Según la ficha de ChileAtiende, la inspección cubre entre otros: dirección, frenos, luces, llantas y neumáticos, chasis y suspensión, emisiones y escape, vidrios, carrocería, espejos, bocina, limpiaparabrisas y elementos de seguridad, velocímetro e instrumentos. Lleva el vehículo en condiciones razonables (luces, frenos, gases) para evitar un rechazo y una segunda visita.</p>

<h2>Documentos y precio</h2>
<ul>
<li><strong>Documentos:</strong> suelen pedirse padrón o identificación del vehículo y cédula; confirma en la planta al agendar.</li>
<li><strong>Precio:</strong> lo fija cada PRT (varía por tipo de vehículo y comuna). No hay un arancel único nacional fijo en este artículo; pregunta al agendar.</li>
<li><strong>Vehículos nuevos:</strong> pueden tener plazos distintos de primera revisión (homologación / meses desde inscripción). Verifica la regla vigente en MTT/PRT si tu auto es 0 km reciente.</li>
</ul>

<h2>Revisión técnica, SOAP y permiso de circulación</h2>
<p>Para pagar o renovar el <strong>permiso de circulación</strong> la municipalidad exige, en la práctica, revisión técnica y <strong>SOAP</strong> vigentes (y no tener multas impagas, según comuna). Si te falta la RT, resuélvela antes de la fila del permiso.</p>
<ul>
<li>Estima el orden de magnitud del permiso con la <a href="/calculadoras/calculadora-permiso-circulacion">calculadora de permiso de circulación</a> (referencial).</li>
<li>Si te multaron por documentación o infracciones, la <a href="/calculadoras/calculadora-multas-transito">calculadora de multas de tránsito</a> orienta montos típicos (no sustituye la boleta municipal o del juzgado).</li>
</ul>

<h2>Si te rechazan la revisión</h2>
<p>La planta indica las fallas. Tienes un plazo para reparar y volver a reinspección (plazos y costo de reingreso dependen de la PRT). No circules con certificado vencido o rechazado sin regularizar: el riesgo es multa y fiscalización.</p>

<h2>Checklist rápido</h2>
<ul>
<li>¿Consulté vigencia por patente en prt.cl?</li>
<li>¿Sé el mes de mi dígito y la fecha impresa en el certificado?</li>
<li>¿SOAP y permiso de circulación alineados con la RT?</li>
<li>¿Agendé con anticipación si estoy en mes de alta demanda (ej. dígito 5 en agosto)?</li>
</ul>

<h2>Fuentes</h2>
<ul>
<li><a href="https://www.chileatiende.gob.cl/fichas/23978-revision-tecnica-de-vehiculos-motorizados" target="_blank" rel="noopener">ChileAtiende — Revisión técnica de vehículos motorizados</a></li>
<li><a href="https://www.chileatiende.gob.cl/fichas/86124-consultar-el-estado-de-la-revision-tecnica-de-un-vehiculo-motorizado" target="_blank" rel="noopener">ChileAtiende — Consultar estado de la RT</a></li>
<li><a href="https://www.prt.cl" target="_blank" rel="noopener">PRT — Plantas de Revisión Técnica</a> (consulta y calendario de preferencias)</li>
<li><a href="https://www.chileatiende.gob.cl/fichas/9611-permiso-de-circulacion" target="_blank" rel="noopener">ChileAtiende — Permiso de circulación</a></li>
</ul>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Disclaimer</strong><p>Contenido informativo. No es dictamen del MTT ni de una PRT. Precios, prórrogas y tablas de dígitos pueden actualizarse: confirma siempre en canales oficiales antes de agendar. Cada año conviene <strong>revalidar el calendario</strong> (mantenimiento anual de este artículo).</p></div></aside>
<p>Relacionado: <a href="/blog/permiso-circulacion-segunda-cuota-agosto-2026">segunda cuota del permiso de circulación 2026</a>.</p>`,
  },
  {
    slug: 'cotizacion-empleador-3-5-agosto-2026-costo-pyme',
    title:
      'Cotización del empleador 3,5% desde agosto 2026: cómo impacta el costo de un trabajador',
    description:
      'Desde las remuneraciones de agosto 2026 la cotización adicional del empleador sube a 3,5% (Ley 21.735). Ejemplos en CLP, qué no se descuenta del trabajador y cómo estimar el costo PYME.',
    date: '2026-07-15',
    updatedAt: '2026-07-15',
    category: 'laboral',
    readingTime: 7,
    relatedGuia: 'sueldo-liquido-chile',
    seoTitle: 'Cotización empleador 3,5% agosto 2026: costo empresa Chile',
    seoDescription:
      'Reforma de pensiones: cotización adicional del empleador 3,5% desde agosto 2026. Ejemplos con $800.000 y $1.500.000, desglose y calculadora de costo empleado.',
    keywords: [
      'cotización empleador 3,5% 2026',
      'cotización adicional empleador',
      'Ley 21.735 cotización',
      'costo empleado Chile 2026',
      'reforma previsional empleador',
      'aportes del empleador pensiones',
    ],
    relatedCalculators: [
      'calculadora-costo-empleado-pyme',
      'calculadora-sueldo-liquido',
      'calculadora-comparador-afp',
    ],
    faq: [
      {
        question: '¿La cotización del 3,5% se descuenta del sueldo del trabajador?',
        answer:
          'No. Según la Ley 21.735 y la información de ChileAtiende, el aporte adicional es de cargo del empleador: no reduce el sueldo líquido del trabajador. Sí aumenta el costo total de la empresa por cada trabajador dependiente afecto a cotización.',
      },
      {
        question: '¿Desde cuándo rige el 3,5%?',
        answer:
          'El tramo de 3,5% aplica a las remuneraciones y cotizaciones de agosto de 2026 en adelante, dentro de la gradualidad de la reforma previsional. Entre agosto 2025 y julio 2026 el aporte adicional inicial fue de 1%. Verifica siempre la ficha oficial de ChileAtiende o la Superintendencia de Pensiones al declarar en Previred.',
      },
      {
        question: '¿Se calcula sobre el sueldo bruto completo?',
        answer:
          'Se calcula sobre la remuneración imponible del trabajador, sujeta a los topes imponibles previsionales vigentes (por ejemplo el tope de AFP/salud en UF). Si el sueldo supera el tope, la base de cotización se topa; no se cotiza el 3,5% sobre el exceso no imponible.',
      },
    ],
    content: `<h2>Qué cambia en agosto 2026</h2>
<p>La <strong>Ley 21.735</strong> de reforma previsional estableció una cotización adicional de cargo del <strong>empleador</strong>, con subida gradual. Según ChileAtiende y el calendario de implementación de la reforma, desde las remuneraciones de <strong>agosto de 2026</strong> el aporte adicional total del empleador pasa a <strong>3,5%</strong> de la remuneración imponible (antes, en la etapa agosto 2025–julio 2026, el tramo adicional inicial fue de 1%).</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>No es un descuento al trabajador</strong><p>Este 3,5% <strong>no se rebaja del sueldo líquido</strong>. Es un costo de la empresa, similar en lógica al SIS o a la parte empleador del seguro de cesantía: lo paga quien contrata, no quien recibe la liquidación.</p></div></aside>

<h2>Desglose del 3,5% (ChileAtiende, tramo ago 2026)</h2>
<p>Según la ficha oficial de ChileAtiende <em>Aportes del empleador al Sistema de Pensiones</em>, en <strong>agosto de 2026 (3,5% total)</strong> el reparto informado es:</p>
<ul>
<li><strong>0,1%</strong> — cuenta individual de la trabajadora o trabajador.</li>
<li><strong>0,9%</strong> — Cotización con Rentabilidad Protegida (CRP).</li>
<li><strong>2,5%</strong> — Seguro de Invalidez y Sobrevivencia (SIS) y Compensación por Diferencias de Expectativa de Vida.</li>
</ul>
<p>Hacienda publica además la tabla de gradualidad del art. 4.º transitorio de la Ley 21.735 (1% en ago 2025–jul 2026; 3,5% en ago 2026–jul 2027). La Superintendencia de Pensiones regula recaudación y procedimientos: ante duda operativa (Previred, códigos de planilla), prioriza su norma y la ficha de ChileAtiende del mes de devengamiento.</p>
<ul>
<li><strong>Quién paga:</strong> empleador (dependientes afectos a cotización).</li>
<li><strong>Efecto en el líquido del trabajador:</strong> ninguno por este ítem.</li>
<li><strong>Efecto en la PYME:</strong> sube el costo laboral mensual y anual.</li>
</ul>

<h2>Ejemplos en pesos (base imponible sin tope)</h2>
<p>Los siguientes ejemplos asumen que el sueldo imponible está <strong>bajo el tope</strong> de AFP/salud del mes. Si el sueldo es muy alto, la base se topa en UF y el 3,5% se aplica sobre ese tope, no sobre el bruto completo.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo A: sueldo imponible $800.000</div><ul><li>Cotización adicional empleador 3,5% = $800.000 × 0,035</li><li>Costo extra mensual solo por este ítem</li></ul><span class="total">+$28.000 al mes · +$336.000 al año</span></div>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo B: sueldo imponible $1.500.000</div><ul><li>Cotización adicional empleador 3,5% = $1.500.000 × 0,035</li><li>Costo extra mensual solo por este ítem</li></ul><span class="total">+$52.500 al mes · +$630.000 al año</span></div>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Estimación referencial</strong><p>Estos montos son aritmética del 3,5% sobre el imponible del ejemplo. No incluyen mutual, cesantía empleador, SIS ni gratificación. El costo total del puesto es la suma de todos los aportes patronales más el bruto y, si corresponde, gratificación.</p></div></aside>

<h2>Cómo se suma al costo total del empleado</h2>
<p>Para una PYME, el costo de un dependiente suele incluir al menos:</p>
<ul>
<li>Sueldo bruto (y gratificación legal si aplica).</li>
<li>Aportes clásicos del empleador: SIS, seguro de cesantía (parte empleador), mutual de seguridad (Ley 16.744).</li>
<li><strong>Desde ago 2026:</strong> cotización adicional de reforma (3,5% en esta etapa).</li>
</ul>
<p>Puedes estimar el bloque “clásico” (bruto + SIS + cesantía empleador + mutual) con la <a href="/calculadoras/calculadora-costo-empleado-pyme">calculadora de costo empleado PYME</a> y <strong>sumar a mano el 3,5%</strong> sobre la base imponible topada mientras el motor no incorpore la tabla gradual de la reforma. Para ver el líquido del trabajador (AFP, salud, cesantía trabajador, IUSC), usa la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a>.</p>

<h2>Errores frecuentes en liquidaciones y presupuestos</h2>
<ol class="steps">
<li><strong>Descontar el 3,5% al trabajador.</strong> Incorrecto: es cargo empleador.</li>
<li><strong>Aplicarlo sobre el bruto sin topes.</strong> Si hay tope imponible, la base se limita.</li>
<li><strong>Olvidarlo en el presupuesto de contratación.</strong> Un puesto de $1.500.000 imponibles implica del orden de $52.500 extra al mes solo por este ítem.</li>
<li><strong>Confundirlo con la comisión AFP del trabajador.</strong> La comisión AFP sigue saliendo de la cotización del trabajador; no es este 3,5%.</li>
</ol>

<h2>Relación con el sueldo líquido</h2>
<p>El <strong>líquido del trabajador no baja</strong> por el 3,5% patronal. Lo que cambia es la cuenta de la empresa. Si necesitas comparar AFP o proyectar descuentos del trabajador, usa el <a href="/calculadoras/calculadora-comparador-afp">comparador de comisiones AFP</a> y la calculadora de sueldo líquido; si contratas o presupuestas plantilla, parte del costo empleado y añade el 3,5%.</p>

<h2>Bases y fuentes oficiales</h2>
<ul>
<li><a href="https://www.chileatiende.gob.cl/fichas/130987-aportes-del-empleador-al-sistema-de-pensiones" target="_blank" rel="noopener">ChileAtiende — Aportes del empleador al Sistema de Pensiones</a></li>
<li><a href="https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-10906.html" target="_blank" rel="noopener">Superintendencia de Pensiones — Cotización de cargo del empleador</a></li>
<li>Ley 21.735 (reforma previsional) — Biblioteca del Congreso Nacional</li>
</ul>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Disclaimer YMYL</strong><p>Estimación referencial educativa. No reemplaza la determinación de la Superintendencia de Pensiones, Previred, tu contador o la liquidación oficial. Antes de cada período de cotización, confirma tasas y desglose en fuentes oficiales.</p></div></aside>
<p>Para profundizar en descuentos del trabajador y topes imponibles, lee la <a href="/guias/sueldo-liquido-chile">guía de sueldo líquido en Chile 2026</a> o simula tu caso en las calculadoras enlazadas.</p>`,
  },
  {
    slug: 'aguinaldo-fiestas-patrias-2026-pensionados-sector-publico',
    title:
      'Aguinaldo de Fiestas Patrias 2026: montos para pensionados IPS y sector público',
    description:
      'Montos oficiales del aguinaldo de Fiestas Patrias 2026: pensionados IPS ($25.280 + cargas) y funcionarios del sector público ($91.682 / $63.645). Fechas de corte, ejemplos y diferencias con la gratificación.',
    date: '2026-07-10',
    updatedAt: '2026-07-10',
    category: 'beneficios',
    readingTime: 14,
    relatedGuia: 'familia-pension-alimenticia-chile',
    seoTitle: 'Aguinaldo Fiestas Patrias 2026: IPS $25.280 y sector público $91.682',
    seoDescription:
      'Aguinaldo septiembre 2026: pensionados IPS $25.280 + $12.969 por carga; sector público $91.682 o $63.645 según líquido de agosto. Fuentes ChileAtiende y Ley 21.806.',
    keywords: [
      'aguinaldo fiestas patrias 2026',
      'aguinaldo pensionados 2026',
      'aguinaldo sector público 2026',
      'aguinaldo IPS septiembre',
      'monto aguinaldo 18 septiembre 2026',
      'Ley 21.806 aguinaldo',
      'aguinaldo fiestas patrias cuánto pagan',
      'aguinaldo PGU 2026',
    ],
    relatedCalculators: [
      'calculadora-aguinaldo',
      'calculadora-sueldo-liquido',
      'calculadora-asignacion-familiar',
      'calculadora-pgu',
    ],
    faq: [
      {
        question: '¿Cuánto es el aguinaldo de Fiestas Patrias 2026 para pensionados?',
        answer:
          'Según ChileAtiende (ficha del IPS), el monto base es $25.280. Se incrementa en $12.969 por cada carga familiar acreditada al 31 de agosto de 2026. Se paga de forma automática con la pensión de septiembre y no es imponible ni tributable.',
      },
      {
        question: '¿Cuánto pagan de aguinaldo en el sector público en 2026?',
        answer:
          'Con la Ley 21.806, el aguinaldo de Fiestas Patrias 2026 es de $91.682 si la remuneración líquida de agosto es igual o inferior a $1.060.493, y de $63.645 si es superior (según los tramos y topes de la ley). Se paga con la remuneración de septiembre.',
      },
      {
        question: '¿Cuándo se paga el aguinaldo de Fiestas Patrias 2026?',
        answer:
          'En la práctica, con la liquidación de septiembre: en pensionados IPS, junto a la pensión de septiembre; en el sector público, con la remuneración de septiembre. El derecho de pensionados se evalúa al 31 de agosto de 2026. Las fechas exactas de depósito dependen de cada entidad pagadora (IPS, Capredena, Dipreca, servicio empleador, etc.).',
      },
      {
        question: '¿Hay que postular al aguinaldo de Fiestas Patrias?',
        answer:
          'No. Si cumples los requisitos, el pago es automático. No es un bono al que se postule en un portal separado. Debes tener cargas familiares bien acreditadas si quieres el incremento por carga (pensionados) y estar pensionado o en servicio al corte legal que corresponda.',
      },
      {
        question: '¿El aguinaldo es lo mismo que la gratificación legal?',
        answer:
          'No. El aguinaldo de Fiestas Patrias del Estado (funcionarios o pensionados de regímenes cubiertos) es un beneficio fijo por ley o ficha oficial. La gratificación legal del Código del Trabajo (Arts. 47 y 50) es otra figura, típica del sector privado, calculada sobre utilidades o el 25% con tope de 4,75 ingresos mínimos. Confundirlas genera montos y expectativas incorrectas.',
      },
      {
        question: '¿En el sector privado es obligatorio el aguinaldo de Fiestas Patrias?',
        answer:
          'No por una ley general de aguinaldo privado. ChileAtiende y la Dirección del Trabajo señalan que en el privado el aguinaldo es exigible solo si está en el contrato individual o en un convenio/contrato colectivo. Si no hay cláusula ni costumbre consolidada en el contrato, el empleador no está obligado a pagarlo como aguinaldo de Fiestas Patrias.',
      },
      {
        question: '¿El aguinaldo de pensionados tiene descuentos de AFP o impuestos?',
        answer:
          'ChileAtiende indica expresamente que este dinero no tiene descuentos, no se considera para impuestos (no es tributable) y no es imponible para cotizaciones previsionales ni de salud.',
      },
    ],
    content: `<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Dos beneficios distintos en septiembre</strong><p>En Chile el “aguinaldo de Fiestas Patrias” no es un solo monto nacional. Hay al menos dos regímenes que la gente confunde: (1) <strong>pensionados y pensionadas</strong> cubiertos por la ficha del <strong>IPS / ChileAtiende</strong>, y (2) <strong>trabajadoras y trabajadores del sector público</strong> bajo la <strong>Ley 21.806</strong> de reajuste. Los montos, el corte de derecho y quién paga son diferentes. Este artículo separa ambos casos con cifras 2026 y fuentes oficiales.</p></div></aside>

<p>Cada año, entre <strong>fines de agosto y mediados de septiembre</strong>, suben las búsquedas por <em>aguinaldo fiestas patrias 2026</em>, <em>cuánto pagan</em> y <em>cuándo cae</em>. El pico de interés suele concentrarse en la ventana del <strong>10 al 18 de septiembre</strong>, cuando ya se espera ver el abono en la liquidación de pensión o en el sueldo. Publicar y indexar con antelación ayuda a responder esas preguntas con fuentes, no con rumores de redes.</p>

<h2>Resumen rápido 2026 (tabla comparativa)</h2>
<table>
<thead>
<tr><th>Quién</th><th>Monto 2026</th><th>Corte / referencia</th><th>Cuándo se ve el pago</th><th>Fuente</th></tr>
</thead>
<tbody>
<tr>
<td><strong>Pensionados IPS y regímenes listados</strong></td>
<td><strong>$25.280</strong> base + <strong>$12.969</strong> por cada carga familiar acreditada al 31 ago 2026</td>
<td>Ser pensionado/a al <strong>31 de agosto de 2026</strong></td>
<td>Con la <strong>pensión de septiembre</strong> (automático)</td>
<td><a href="https://www.chileatiende.gob.cl/fichas/26553-aguinaldo-de-fiestas-patrias-para-pensionados-ips" target="_blank" rel="noopener">ChileAtiende 26553</a></td>
</tr>
<tr>
<td><strong>Sector público (funcionarios)</strong></td>
<td><strong>$91.682</strong> o <strong>$63.645</strong> según tramo de renta líquida de <strong>agosto</strong></td>
<td>Umbral tramo: líquido ago ≤ o &gt; <strong>$1.060.493</strong> (Ley 21.806 / reajuste 2026)</td>
<td>Con la <strong>remuneración de septiembre</strong></td>
<td>Ley <strong>21.806</strong> (D.O. 5 feb 2026); protocolo Hacienda–CUT/MSP</td>
</tr>
<tr>
<td><strong>Sector privado</strong></td>
<td>Lo que diga el <strong>contrato</strong> o el <strong>convenio colectivo</strong> (no hay tarifa legal única de aguinaldo FP)</td>
<td>Cláusula contractual / colectiva</td>
<td>Según pacto con el empleador</td>
<td>ChileAtiende (sección privado) · DT (gratificación ≠ aguinaldo)</td>
</tr>
</tbody>
</table>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>No mezcles montos</strong><p>El <strong>$91.682</strong> del funcionario público <strong>no</strong> es el aguinaldo del pensionado IPS. El <strong>$25.280</strong> del IPS <strong>no</strong> es el aguinaldo del sector público. Si usas la calculadora del sitio, interpreta el resultado como <strong>base referencial del tramo 1 del sector público</strong> (o prorrateo), no como liquidación oficial del IPS.</p></div></aside>

<h2>1. Aguinaldo de Fiestas Patrias para pensionados (IPS / ChileAtiende) 2026</h2>
<p>ChileAtiende describe el beneficio como un <strong>monto de dinero</strong> que se recibe <strong>automáticamente con la pensión de septiembre</strong> si se cumplen los requisitos. No es un “postula aquí”.</p>

<h3>1.1 Montos oficiales 2026</h3>
<ul>
<li><strong>Base:</strong> <strong>$25.280</strong>.</li>
<li><strong>Incremento por carga:</strong> <strong>$12.969</strong> por cada persona causante de asignación familiar <strong>acreditada al 31 de agosto de 2026</strong>.</li>
<li><strong>Condición de derecho:</strong> estar pensionada o pensionado al <strong>31 de agosto de 2026</strong>.</li>
</ul>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo A — sin cargas acreditadas</div><ul><li>Base FP 2026</li></ul><span class="total">$25.280</span></div>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo B — 1 carga familiar acreditada al 31 ago</div><ul><li>Base $25.280 + 1 × $12.969</li></ul><span class="total">$38.249</span></div>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo C — 2 cargas acreditadas</div><ul><li>Base $25.280 + 2 × $12.969</li></ul><span class="total">$51.218</span></div>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo D — 3 cargas acreditadas</div><ul><li>Base $25.280 + 3 × $12.969</li></ul><span class="total">$64.187</span></div>

<h3>1.2 Quiénes pueden recibirlo (lista ChileAtiende)</h3>
<p>La ficha oficial indica que corresponde el aguinaldo si, al 31 de agosto de 2026, eres pensionada o pensionado de, entre otros:</p>
<ul>
<li><strong>IPS:</strong> <a href="/calculadoras/calculadora-pgu">PGU</a>, Pensión Básica Solidaria de Invalidez (PBSI) o Subsidio de Discapacidad (menores de 18, según ficha).</li>
<li>Ex cajas de previsión o ex Servicio de Seguro Social.</li>
<li><strong>ISL</strong> (Instituto de Seguridad Laboral).</li>
<li>Leyes de <strong>exonerados políticos</strong> (Ley 19.234).</li>
<li><strong>Mutualidades</strong> de empleadores (Ley 16.744).</li>
<li><strong>Dipreca</strong> y <strong>Capredena</strong>.</li>
<li>Pensiones de reparación (<strong>Ley Valech</strong>, <strong>Ley Rettig</strong>).</li>
<li>AFP o compañías de seguro <strong>si recibes PGU</strong>, o Aporte Previsional Solidario (vejez/invalidez), o pensiones mínimas con Garantía Estatal.</li>
</ul>
<p>Si tienes más de una pensión, subsidio o indemnización cubierta, ChileAtiende señala que <strong>igual puedes tener derecho a un aguinaldo</strong> (no “uno por cada pensión” de forma automática: la regla de pago la aplica el pagador; la ficha aclara el principio de derecho al beneficio aun con múltiples beneficios).</p>

<h3>1.3 Cargas familiares: cuándo sube el monto y cuándo no</h3>
<p>El incremento de <strong>$12.969</strong> exige carga <strong>acreditada</strong> al corte. Dos matices de la ficha oficial:</p>
<ul>
<li>Si el pago de la <strong>asignación familiar</strong> lo recibe <strong>otra persona</strong>, esa persona puede tener derecho al <strong>incremento</strong> del aguinaldo (la ficha lo indica expresamente).</li>
<li>Si recibes asignación familiar por cargas que son <strong>beneficiarias de una pensión de sobrevivencia</strong>, en general <strong>solo</strong> te corresponde el aguinaldo como pensionado/a (la base), <strong>sin</strong> el incremento de $12.969; el aumento sí puede operar si las cargas tienen pensión de <strong>orfandad</strong> (se tratan como carentes de renta, según la ficha).</li>
</ul>
<p>Para entender tramos de asignación familiar (otro beneficio, no el aguinaldo), usa la <a href="/calculadoras/calculadora-asignacion-familiar">calculadora de asignación familiar</a> y valida tu acreditación en el sistema del empleador o del IPS.</p>

<h3>1.4 Tributación e imponibilidad (pensionados)</h3>
<p>ChileAtiende es explícito: este dinero <strong>no tiene descuentos</strong>, <strong>no es tributable</strong> y <strong>no es imponible</strong> para cotizaciones previsionales ni de salud. Eso diferencia el aguinaldo IPS de un “sueldo extra” sujeto a AFP o impuesto único.</p>

<h3>1.5 Sanción si lo recibes sin derecho</h3>
<p>La misma ficha advierte: si recibes el aguinaldo <strong>sin que te corresponda</strong>, deberás devolver <strong>5 veces</strong> el monto, con posibles sanciones administrativas y penales. Por eso conviene revisar la liquidación de septiembre y no asumir el abono si no estás en la lista de regímenes o no cumples el corte del 31 de agosto.</p>

<h2>2. Aguinaldo de Fiestas Patrias del sector público 2026 (Ley 21.806)</h2>
<p>Los funcionarios y funcionarias del sector público incluidos en la ley de reajuste reciben un aguinaldo de Fiestas Patrias con <strong>montos fijos por tramo</strong>, no un porcentaje del sueldo. La <strong>Ley 21.806</strong> (publicada en el Diario Oficial el <strong>5 de febrero de 2026</strong>) fija el reajuste general y actualiza bonos y aguinaldos. El protocolo de acuerdo Gobierno–CUT/Mesa del Sector Público y comunicados de servicios públicos reproducen los mismos tramos de Fiestas Patrias 2026.</p>

<h3>2.1 Montos y tramos 2026</h3>
<table>
<thead>
<tr><th>Tramo</th><th>Condición (remuneración líquida de agosto 2026)</th><th>Monto aguinaldo FP</th></tr>
</thead>
<tbody>
<tr>
<td><strong>Tramo 1</strong></td>
<td>Igual o inferior a <strong>$1.060.493</strong></td>
<td><strong>$91.682</strong></td>
</tr>
<tr>
<td><strong>Tramo 2</strong></td>
<td>Superior a <strong>$1.060.493</strong> (con los topes de elegibilidad de la ley; el acuerdo menciona alineación con rentas de hasta ~$3.511.800 en la escala de beneficios)</td>
<td><strong>$63.645</strong></td>
</tr>
</tbody>
</table>
<p>Observa la lógica: el tramo de <strong>menor renta líquida</strong> recibe el <strong>monto más alto</strong> de aguinaldo. No es un error de tabla.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo E — funcionario con líquido de agosto $900.000</div><ul><li>Líquido ago ≤ $1.060.493 → tramo 1</li></ul><span class="total">Aguinaldo FP 2026: $91.682</span></div>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo F — funcionaria con líquido de agosto $1.200.000</div><ul><li>Líquido ago &gt; $1.060.493 → tramo 2</li></ul><span class="total">Aguinaldo FP 2026: $63.645</span></div>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo G — justo en el umbral $1.060.493</div><ul><li>Igual al techo del tramo 1 → tramo 1</li></ul><span class="total">Aguinaldo FP 2026: $91.682</span></div>

<h3>2.2 ¿Qué es “remuneración líquida de agosto”?</h3>
<p>Es el <strong>líquido del mes de agosto</strong> que usa tu servicio de personal/remuneraciones para clasificar el tramo del aguinaldo, según la definición de la ley y las instrucciones internas del servicio (no el bruto, no el promedio anual). Si tu liquidación de agosto ronda el umbral, un bono o descuento puntual puede empujarte de un tramo a otro: la clasificación la hace el empleador público con la norma, no esta guía.</p>
<p>Para estimar tu líquido de un mes “normal” (AFP, salud, cesantía trabajador, impuesto único) puedes usar la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a>. El resultado es <strong>referencial</strong>: no reemplaza la liquidación oficial de tu servicio.</p>

<h3>2.3 Cuándo se paga en el sector público</h3>
<p>El pago del aguinaldo de Fiestas Patrias 2026 se asocia a la <strong>remuneración de septiembre</strong>. La fecha exacta del depósito (si el sueldo cae el 30, el 28 o un día hábil anterior) la define cada servicio o municipalidad. Planifica el flujo de caja de Fiestas Patrias con esa liquidación, no solo con el 18 de septiembre.</p>

<h3>2.4 Relación con el reajuste 3,4%</h3>
<p>La Ley 21.806 también fija el reajuste de remuneraciones del sector público en <strong>3,4%</strong> total, en dos tramos: <strong>2,0%</strong> desde el 1 de diciembre de 2025 y <strong>1,4%</strong> desde el 1 de junio de 2026. Los aguinaldos y varios bonos se actualizaron en el mismo cuerpo legal. Si comparas tu liquidación 2025 con 2026, verás el efecto del reajuste en el sueldo base <strong>y</strong> montos de aguinaldo distintos a los del año anterior.</p>

<h2>3. Sector privado: ¿existe “el” aguinaldo de Fiestas Patrias?</h2>
<p>ChileAtiende aclara que, para empleadores privados, <strong>otorgar aguinaldo no es una obligación legal general</strong>, a diferencia de figuras como la <strong>gratificación</strong> cuando corresponde según el Código del Trabajo. Puedes exigir aguinaldo de Fiestas Patrias en el privado si:</p>
<ul>
<li>Está en tu <strong>contrato de trabajo</strong>, o</li>
<li>Existe un <strong>contrato o convenio colectivo</strong> que lo incorpore.</li>
</ul>
<p>En esos casos sí es un derecho exigible frente al empleador. Si no hay cláusula, no inventes el monto del sector público ni el del IPS en la liquidación privada: son regímenes distintos.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Aguinaldo ≠ gratificación legal</strong><p>La <strong>gratificación legal</strong> (Arts. 47 y 50 del Código del Trabajo) se calcula sobre utilidades o con el sistema del 25% con tope de <strong>4,75 ingresos mínimos mensuales</strong>. Es independiente del aguinaldo de Fiestas Patrias del Estado. Profundiza en la <a href="/blog/como-funciona-gratificacion-legal">guía de gratificación legal</a> o en la <a href="/calculadoras/calculadora-gratificacion">calculadora de gratificación</a>.</p></div></aside>

<h2>4. Calendario práctico: agosto → septiembre 2026</h2>
<ol class="steps">
<li><strong>Hasta el 31 de agosto de 2026 (pensionados):</strong> corte de derecho. Revisa que tus cargas familiares estén acreditadas si esperas el +$12.969 por carga.</li>
<li><strong>Agosto (funcionarios públicos):</strong> el <strong>líquido de este mes</strong> define el tramo $91.682 vs $63.645.</li>
<li><strong>Septiembre:</strong> pago automático con pensión (IPS y regímenes) o con remuneración (sector público). Revisa la liquidación línea por línea.</li>
<li><strong>Ventana 10–18 de septiembre:</strong> mayor volumen de consultas y de gasto de Fiestas Patrias; ten el monto esperado claro con antelación.</li>
</ol>

<h2>5. Cómo verificar el abono en la liquidación</h2>
<ul>
<li><strong>Pensionados IPS:</strong> liquidación de pago de pensión/beneficio de septiembre; canales ChileAtiende / IPS (call center 101). Código de trámite de la ficha de aguinaldo: <strong>26553</strong>.</li>
<li><strong>Capredena / Dipreca / mutuales / otras:</strong> el pagador de tu pensión informa el abono; no asumas el mismo extracto que el IPS.</li>
<li><strong>Sector público:</strong> liquidación de remuneraciones de septiembre en tu portal de personal o unidad de remuneraciones. Busca la glosa de aguinaldo de Fiestas Patrias y el tramo aplicado.</li>
<li><strong>Privado con cláusula:</strong> liquidación de septiembre o el mes pactado; conserva contrato o convenio colectivo.</li>
</ul>

<h2>6. Errores frecuentes (y cómo evitarlos)</h2>
<ol class="steps">
<li><strong>Usar el monto del sector público para un pensionado IPS</strong> (o al revés). Son tablas distintas.</li>
<li><strong>Creer que hay que postular</strong> al aguinaldo de Fiestas Patrias del IPS o del SP. El pago es automático si cumples requisitos.</li>
<li><strong>Olvidar acreditar cargas</strong> antes del 31 de agosto y después reclamar el incremento de $12.969.</li>
<li><strong>Confundir aguinaldo con gratificación</strong> o con el bono de escolaridad / bono de vacaciones (otros montos de la Ley 21.806).</li>
<li><strong>Asumir que el privado “siempre” paga $91.682.</strong> Sin contrato o convenio, no hay tarifa legal de aguinaldo FP privado.</li>
<li><strong>No revisar la liquidación</strong> y gastar de más en Fiestas Patrias antes de confirmar el abono real.</li>
</ol>

<h2>7. Otros beneficios de la misma temporada (no confundir)</h2>
<table>
<thead>
<tr><th>Beneficio</th><th>Orden de magnitud 2026 (referencial)</th><th>Cuándo</th></tr>
</thead>
<tbody>
<tr>
<td>Aguinaldo Navidad pensionados IPS</td>
<td>Base <strong>$29.055</strong> + <strong>$16.415</strong>/carga (corte 30 nov 2026) — ficha ChileAtiende 30171</td>
<td>Diciembre</td>
</tr>
<tr>
<td>Aguinaldo Navidad sector público</td>
<td><strong>$71.206</strong> / <strong>$37.666</strong> según tramos (Ley 21.806)</td>
<td>Remuneración de diciembre</td>
</tr>
<tr>
<td>Bono de escolaridad (SP)</td>
<td><strong>$89.164</strong> en 2 cuotas de $44.582 (+ adicional en tramo bajo, según ley)</td>
<td>Marzo y junio</td>
</tr>
<tr>
<td>Gratificación legal (privado)</td>
<td>% de utilidades o 25% con tope 4,75 IMM — no es aguinaldo FP</td>
<td>Según cierre y política de la empresa</td>
</tr>
</tbody>
</table>
<p>En este sitio trataremos el aguinaldo de Navidad en piezas editoriales propias (#30 pensionados, #35 sector público del plan editorial). Hasta entonces, las fichas oficiales de ChileAtiende y el texto de la Ley 21.806 son la fuente de verdad.</p>

<h2>8. Estima y contrasta con la calculadora</h2>
<p>Puedes usar la <a href="/calculadoras/calculadora-aguinaldo">calculadora de aguinaldo</a> para ver el <strong>monto base del tramo 1 del sector público</strong> ($91.682 en Fiestas Patrias 2026) y un <strong>prorrateo por meses trabajados</strong> si tu caso o convenio lo permite. Limitaciones honestas del motor:</p>
<ul>
<li>No clasifica automáticamente tu tramo 1 vs 2 (no lee tu líquido oficial de agosto).</li>
<li>No calcula el paquete IPS de $25.280 + cargas (haz la suma de la sección 1 o revisa ChileAtiende).</li>
<li>No sustituye la liquidación de tu servicio, municipalidad, IPS, Capredena o Dipreca.</li>
</ul>
<p>Complementos útiles:</p>
<ul>
<li><a href="/calculadoras/calculadora-sueldo-liquido">Sueldo líquido</a> — para aproximar el líquido de agosto (tramo SP).</li>
<li><a href="/calculadoras/calculadora-asignacion-familiar">Asignación familiar</a> — contexto de cargas (no es el aguinaldo).</li>
<li><a href="/calculadoras/calculadora-pgu">PGU</a> — si tu pensión base es PGU y quieres entender el contexto previsional.</li>
<li><a href="/calculadoras/calculadora-gratificacion">Gratificación</a> — si lo que te pagan en la empresa privada es gratificación y no aguinaldo.</li>
</ul>

<h2>9. Fuentes oficiales (verificación YMYL)</h2>
<ul>
<li><a href="https://www.chileatiende.gob.cl/fichas/26553-aguinaldo-de-fiestas-patrias-para-pensionados-ips" target="_blank" rel="noopener">ChileAtiende — Aguinaldo de Fiestas Patrias para pensionados IPS</a> (base $25.280; +$12.969/carga al 31 ago 2026; pago con pensión de septiembre; no imponible ni tributable).</li>
<li><a href="https://www.chileatiende.gob.cl/fichas/30171-aguinaldo-de-navidad-para-pensionados-ips" target="_blank" rel="noopener">ChileAtiende — Aguinaldo de Navidad para pensionados IPS</a> (contexto; no es el de Fiestas Patrias).</li>
<li><a href="https://www.bcn.cl/leychile/navegar?idNorma=1221118" target="_blank" rel="noopener">Biblioteca del Congreso Nacional — Ley 21.806</a> (reajuste sector público 2026; aguinaldos y bonos).</li>
<li><a href="https://www.hacienda.cl/noticias-y-eventos/noticias/gobierno-y-cut-mesa-del-sector-publico-firman-protocolo-de-acuerdo-por-reajuste" target="_blank" rel="noopener">Ministerio de Hacienda — Protocolo de acuerdo reajuste 2025–2026</a> (tramos $91.682 / $63.645 y umbral $1.060.493).</li>
<li>Dirección del Trabajo — gratificaciones y beneficios laborales (para no confundir con aguinaldo privado).</li>
</ul>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Disclaimer YMYL</strong><p>Artículo informativo y educativo. Los montos y requisitos se tomaron de fichas y normas públicas vigentes al publicar (julio 2026). No es un dictamen del IPS, de la Contraloría, de tu servicio de personal ni de un abogado. Antes de gastar o reclamar, confirma tu liquidación y, si hay duda, la ficha ChileAtiende 26553, la Ley 21.806 o tu unidad de remuneraciones/previsión. Si la norma o la ficha se actualizan, prevalece el texto oficial.</p></div></aside>
<p>Para profundizar en beneficios familiares y contexto de cargas, revisa la <a href="/guias/familia-pension-alimenticia-chile">guía de familia y pensión alimenticia</a> y las calculadoras enlazadas. Si buscas el sueldo del mes que define el tramo público, parte por la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a>.</p>`,
  },
  {
    slug: 'horas-extra-jornada-42-horas-chile-2026',
    title:
      'Horas extra con jornada de 42 horas: cómo calcularlas en Chile 2026',
    description:
      'Desde el 26 de abril de 2026 la jornada ordinaria máxima es 42 horas semanales (Ley 21.561). Cómo se calcula la hora ordinaria, el recargo legal del 50% y ejemplos en CLP con la calculadora de horas extra.',
    date: '2026-07-11',
    updatedAt: '2026-07-11',
    category: 'laboral',
    readingTime: 11,
    relatedGuia: 'horas-extra-chile',
    seoTitle: 'Horas extra Chile 2026: jornada 42 h y recargo 50%',
    seoDescription:
      'Jornada de 42 horas desde el 26-04-2026 (Ley 21.561). Cómo calcular horas extra con recargo mínimo 50%, valor hora y ejemplos. Fuente Dirección del Trabajo.',
    keywords: [
      'horas extra 42 horas 2026',
      'horas extraordinarias Chile',
      'recargo 50% horas extra',
      'jornada 42 horas Ley 21.561',
      'calcular horas extra sueldo',
      'Ley 40 horas etapa 2026',
      'valor hora extraordinaria',
    ],
    relatedCalculators: [
      'calculadora-horas-extra',
      'calculadora-sueldo-liquido',
      'calculadora-finiquito',
      'calculadora-costo-empleado-pyme',
    ],
    faq: [
      {
        question: '¿Cuál es la jornada semanal máxima en 2026?',
        answer:
          'Desde el 26 de abril de 2026 la jornada ordinaria máxima es de 42 horas semanales, según la gradualidad de la Ley 21.561 (conocida como Ley de 40 Horas). En 2024 bajó a 44; en 2028 baja a 40. Confirma en la Dirección del Trabajo y en tu contrato.',
      },
      {
        question: '¿Cuánto es el recargo de las horas extra?',
        answer:
          'El Código del Trabajo (Art. 32) fija un recargo legal mínimo del 50% sobre el valor de la hora ordinaria. Convenio o pacto puede ser más favorable, nunca menos. No existe un recargo nocturno automático distinto en la ley general.',
      },
      {
        question: '¿Cómo se calcula el valor de la hora ordinaria con 42 horas?',
        answer:
          'Una práctica habitual de liquidación es: valor hora ordinaria = sueldo base del período ÷ (jornada semanal × 4,33). Con 42 h: divisor ≈ 181,86 horas mensuales de referencia. Luego la hora extra = hora ordinaria × 1,5 (si el recargo es 50%).',
      },
      {
        question: '¿Pueden bajar mi sueldo porque bajó la jornada a 42 horas?',
        answer:
          'La reducción de jornada de la Ley 21.561 no autoriza por sí sola a rebajar la remuneración convenida para “compensar” menos horas. Ante dudas o cobros indebidos, consulta a la Dirección del Trabajo o a tu organización sindical.',
      },
      {
        question: '¿Hay tope de horas extra al día?',
        answer:
          'Como regla general, las horas extraordinarias no pueden exceder de dos por día (Art. 31 del Código del Trabajo), con las excepciones y regímenes especiales que la ley contempla. El exceso sobre la jornada ordinaria semanal debe tratarse como extraordinario y documentarse.',
      },
    ],
    content: `<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Qué cambió en 2026</strong><p>Desde el <strong>26 de abril de 2026</strong> la jornada ordinaria máxima pasó de <strong>44 a 42 horas semanales</strong> (2.ª etapa de la <strong>Ley 21.561</strong>). Toda hora que exceda la jornada ordinaria pactada/legal aplicable se paga, en principio, como <strong>hora extraordinaria</strong> con recargo mínimo del <strong>50%</strong> (Art. 32 del Código del Trabajo), salvo compensación en feriado adicional cuando la ley y el pacto lo permiten.</p></div></aside>

<p>Si buscas <em>horas extra 42 horas 2026</em> o <em>calcular recargo 50%</em>, el error más frecuente es seguir dividiendo el sueldo por una jornada de <strong>45 o 44 horas</strong>. Eso <strong>infla</strong> las horas mensuales de referencia y <strong>baja</strong> el valor de la hora (y de la extra). Este artículo alinea el cálculo con la etapa vigente y con la <a href="/calculadoras/calculadora-horas-extra">calculadora de horas extra</a> del sitio.</p>

<h2>1. Calendario de la Ley 21.561 (jornada ordinaria máxima)</h2>
<table>
<thead>
<tr><th>Desde</th><th>Jornada máxima ordinaria</th><th>Estado en 2026</th></tr>
</thead>
<tbody>
<tr><td>26 abr 2024</td><td><strong>44</strong> horas/semana</td><td>Etapa anterior</td></tr>
<tr><td><strong>26 abr 2026</strong></td><td><strong>42</strong> horas/semana</td><td><strong>Vigente ahora</strong></td></tr>
<tr><td>26 abr 2028</td><td><strong>40</strong> horas/semana</td><td>Etapa final</td></tr>
</tbody>
</table>
<p>Fuente de la gradualidad: Dirección del Trabajo / Ley 21.561 (art. primero transitorio). La implementación de la rebaja se hace de mutuo acuerdo y por escrito; a falta de acuerdo aplican las reglas de distribución que ha interpretado la DT (p. ej. dictámenes sobre cómo repartir la reducción en jornadas de 5 o 6 días).</p>

<h2>2. Qué es hora ordinaria y qué es hora extraordinaria</h2>
<ul>
<li><strong>Hora ordinaria:</strong> la que forma parte de la jornada pactada, dentro del máximo legal aplicable (hoy, en la generalidad, <strong>42 h/semana</strong> si no hay régimen especial).</li>
<li><strong>Hora extraordinaria:</strong> la que excede la jornada ordinaria. Debe pactarse por escrito cuando la ley lo exige, respetar topes (regla general: máx. <strong>2 horas extra al día</strong>, Art. 31) y pagarse con el recargo legal o compensarse según las figuras permitidas.</li>
</ul>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>No es “recargo nocturno automático”</strong><p>En Chile <strong>no</strong> hay un recargo legal general distinto solo por trabajar de noche en horas extra. El mínimo del Art. 32 es el <strong>50%</strong> sobre la hora ordinaria, de día o de noche, salvo pacto o convenio más favorable. Evita calculadoras o rumores que inventen un “+25% nocturno” sin base en tu contrato.</p></div></aside>

<h2>3. Fórmula práctica del valor hora (con 42 h)</h2>
<p>Para liquidaciones mensuales se usa con frecuencia el factor <strong>4,33 semanas/mes</strong> (promedio comercial). Entonces:</p>
<ol class="steps">
<li><strong>Horas mensuales de referencia</strong> = jornada semanal × 4,33 → con 42 h: <strong>181,86</strong> h.</li>
<li><strong>Valor hora ordinaria</strong> = sueldo base del período ÷ 181,86.</li>
<li><strong>Valor hora extra (50%)</strong> = valor hora ordinaria × <strong>1,5</strong>.</li>
<li><strong>Total horas extra</strong> = valor hora extra × cantidad de horas extra del período.</li>
</ol>
<p>Si el sueldo es muy variable, muchas liquidaciones usan un promedio de los últimos meses (la calculadora del sitio permite ese escenario). El detalle de tu liquidación lo define el empleador según contrato, pacto y fiscalización DT.</p>

<h2>4. Ejemplos en pesos (jornada 42 h, recargo 50%)</h2>
<p>Aritmética de referencia con el mismo motor que la calculadora del sitio (4,33 semanas/mes). Redondeos en liquidación real pueden variar en pesos.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo A — sueldo $800.000 · 10 horas extra</div><ul>
<li>Horas mes ref. = 42 × 4,33 = 181,86</li>
<li>Hora ordinaria ≈ $800.000 ÷ 181,86 ≈ <strong>$4.399</strong></li>
<li>Hora extra (×1,5) ≈ <strong>$6.598</strong></li>
<li>10 horas extra ≈ <strong>$65.985</strong></li>
</ul><span class="total">≈ $65.985 por 10 h extra</span></div>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo B — sueldo $1.200.000 · 8 horas extra</div><ul>
<li>Hora ordinaria ≈ $1.200.000 ÷ 181,86 ≈ <strong>$6.598</strong></li>
<li>Hora extra ≈ <strong>$9.897</strong></li>
<li>8 horas extra ≈ <strong>$79.180</strong></li>
</ul><span class="total">≈ $79.180 por 8 h extra</span></div>
<div class="numeric-example"><div class="numeric-example__title">Error típico: usar todavía 45 h de jornada</div><ul>
<li>Con $800.000 y 45 × 4,33 = 194,85 h → hora ordinaria ≈ $4.106</li>
<li>Hora extra ×1,5 ≈ $6.159 · 10 h ≈ $61.590</li>
<li>Diferencia vs 42 h: del orden de <strong>$4.400 menos</strong> en 10 h (subpago si la jornada real es 42)</li>
</ul><span class="total">Usar la jornada vigente evita subestimar la extra</span></div>

<h2>5. Compensación en feriado adicional (opcional)</h2>
<p>La Ley 21.561 permite, en ciertos casos y <strong>por acuerdo escrito</strong>, compensar horas extraordinarias con días adicionales de feriado, con el mismo recargo (cada hora extra equivale a una hora y media de feriado, según el texto legal). Hay límites anuales y plazos para usar esos días. Si no se solicitan en tiempo, corresponde el pago en dinero. No asumas compensación automática: sin pacto, la regla general es el pago en la liquidación.</p>

<h2>6. Errores frecuentes</h2>
<ol class="steps">
<li><strong>Dividir por 45 o 44 horas</strong> cuando tu jornada máxima ordinaria ya es 42.</li>
<li><strong>Aplicar menos del 50%</strong> de recargo (ilegal como mínimo legal general).</li>
<li><strong>Inventar recargo nocturno</strong> sin convenio que lo establezca.</li>
<li><strong>No registrar</strong> asistencia / pacto de horas extra (debilita prueba y fiscalización).</li>
<li><strong>Bajar el sueldo base</strong> “porque ahora son menos horas” sin base legal ni acuerdo válido.</li>
<li><strong>Confundir festivo trabajado</strong> con “siempre 100%”: el Art. 32 fija el 50% mínimo; regímenes de descanso compensatorio (p. ej. Art. 38) y convenios pueden cambiar el escenario. Revisa tu contrato y la DT.</li>
</ol>

<h2>7. Cómo simularlo en CalculaChile</h2>
<p>En la <a href="/calculadoras/calculadora-horas-extra">calculadora de horas extra</a>:</p>
<ul>
<li>Ingresa tu <strong>sueldo bruto</strong> (o promedio si usas sueldo variable).</li>
<li>Elige jornada <strong>42 h</strong> (default desde abr-2026) u otra si tu caso es histórico o ya 40 h pactadas.</li>
<li>Indica las horas extra del período y, si aplica, horas en festivos o un recargo personalizado <em>solo si</em> tu convenio lo mejora.</li>
<li>Opcional: estimar impacto de cotizaciones sobre el monto de extras (referencial).</li>
</ul>
<p>Complementos:</p>
<ul>
<li><a href="/calculadoras/calculadora-sueldo-liquido">Sueldo líquido</a> — descuentos del mes (AFP, salud, cesantía, IUSC).</li>
<li><a href="/calculadoras/calculadora-costo-empleado-pyme">Costo empleado PYME</a> — si miras el costo empresa de las extras.</li>
<li><a href="/calculadoras/calculadora-finiquito">Finiquito</a> — si las extras entran en promedios de indemnización (caso a caso).</li>
<li>Guía general (pre-hito 42 h, útil como marco): <a href="/blog/guia-horas-extra-chile">guía de horas extra</a>.</li>
</ul>

<h2>8. Fuentes oficiales</h2>
<ul>
<li><a href="https://www.dt.gob.cl/portal/1628/w3-article-125909.html" target="_blank" rel="noopener">Dirección del Trabajo — implementación gradual 45→40 horas</a> (44 en 2024, <strong>42 en 2026</strong>, 40 en 2028).</li>
<li><a href="https://www.mintrab.gob.cl/40horas/" target="_blank" rel="noopener">Ministerio del Trabajo — Ley 40 Horas</a> (exceso sobre 42 h como extraordinarias; recargo 50%).</li>
<li><a href="https://www.dt.gob.cl/portal/1628/w3-article-60173.html" target="_blank" rel="noopener">DT — horas extraordinarias (Art. 32)</a>.</li>
<li><a href="https://www.bcn.cl/leychile/navegar?idNorma=1191554" target="_blank" rel="noopener">BCN — Ley 21.561</a>.</li>
<li>DT — valor de la hora extraordinaria / jornada vigente (consulta y dictámenes actualizados en el portal DT).</li>
</ul>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Disclaimer YMYL</strong><p>Contenido informativo. No es un dictamen de la Dirección del Trabajo ni reemplaza tu contrato, convenio colectivo o liquidación. Los ejemplos usan el factor 4,33 y recargo 50% como referencia educativa. Si hay conflicto, prevalecen la norma, la DT y tu documentación laboral.</p></div></aside>
<p>Simula tu caso en la <a href="/calculadoras/calculadora-horas-extra">calculadora de horas extra</a> y cruza el resultado con tu liquidación del mes.</p>`,
  },
  {
    slug: 'como-calcular-finiquito-chile',
    title: 'Cómo calcular tu finiquito en Chile 2026 paso a paso',
    description:
      'Guía paso a paso para calcular tu finiquito: indemnización, vacaciones proporcionales y gratificación. Con ejemplos en CLP y bases legales.',
    date: '2026-03-30',
    updatedAt: '2026-07-04',
    category: 'laboral',
    readingTime: 8,
    relatedGuia: 'finiquito-laboral-chile',
    keywords: [
      'finiquito Chile',
      'calcular finiquito',
      'indemnización años servicio',
      'vacaciones proporcionales',
      'Código del Trabajo',
      'art 161',
    ],
    relatedCalculators: [
      'calculadora-finiquito',
      'calculadora-indemnizacion-anos-servicio',
      'calculadora-vacaciones-proporcionales',
    ],
    content: `<h2>¿Qué es el finiquito?</h2>
<p>El finiquito es el documento legal que pone término a la relación laboral entre empleador y trabajador. Detalla los pagos finales que corresponden al trabajador según la causal de término. Está regulado por los artículos 9, 159 a 163, 168, 172 y 177 del Código del Trabajo.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Validez del finiquito</strong><p>Para tener fuerza liberatoria debe firmarse ante ministro de fe (notario, inspector del trabajo) y pagarse en su totalidad en el acto. Sin estas formalidades, el trabajador puede impugnar diferencias hasta 2 años después.</p></div></aside>

<h2>Componentes del finiquito</h2>
<p>Un finiquito puede incluir uno o más de los siguientes conceptos, según la causal de término:</p>
<ul>
<li><strong>Sueldo devengado:</strong> días trabajados del último mes no pagados.</li>
<li><strong>Vacaciones proporcionales:</strong> días de feriado legal calculados proporcionalmente a los meses trabajados.</li>
<li><strong>Vacaciones pendientes:</strong> días de vacaciones de años anteriores que no se tomaron.</li>
<li><strong>Indemnización por años de servicio:</strong> 30 días por cada año (despido sin causa o mutuo acuerdo con indemnización).</li>
<li><strong>Indemnización sustitutiva del aviso:</strong> 1 mes adicional si despiden sin avisar 30 días antes.</li>
<li><strong>Gratificación proporcional:</strong> parte proporcional de la gratificación anual.</li>
</ul>

<h2>Cálculo de la indemnización por años de servicio</h2>
<p>Según el Art. 163 del Código del Trabajo: 30 días de la última remuneración mensual por cada año de servicio o fracción superior a 6 meses. La base incluye sueldo + gratificación, excluye colación y movilización (Art. 172).</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo: sueldo $800.000, 5 años</div><ul><li>Indemnización = $800.000 × 5 años</li><li>Tope: 11 años (este caso está bajo)</li><li>Base máxima: 90 UF (este caso está bajo)</li></ul><span class="total">Total indemnización: $4.000.000</span></div>

<h2>Cálculo de las vacaciones proporcionales</h2>
<p>Se calculan dividiendo los 15 días hábiles anuales entre 12 meses, dando 1,25 días por mes trabajado. El valor de cada día se obtiene dividiendo el sueldo mensual por 30.</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo: sueldo $600.000, 8 meses</div><ul><li>Días proporcionales: 8 × 1,25 = 10 días</li><li>Valor del día: $600.000 ÷ 30 = $20.000</li></ul><span class="total">Total vacaciones: $200.000</span></div>

<h2>¿Tengo derecho a indemnización si renuncio?</h2>
<p>No. La indemnización por años de servicio solo corresponde cuando el empleador pone término al contrato (despido injustificado, necesidades de la empresa, o mutuo acuerdo con indemnización). Si renuncias voluntariamente, solo recibes días trabajados y vacaciones.</p>

<h2>Plazo de pago</h2>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>10 días hábiles</strong><p>El empleador tiene un plazo de 10 días hábiles desde la separación del trabajador para pagar el finiquito. Si no paga, puedes reclamar en la Inspección del Trabajo, demandar judicialmente (prescripción 2 años) y exigir intereses según la TMC.</p></div></aside>

<h2>Bases legales</h2>
<ul>
<li>Art. 159 al 163 del Código del Trabajo (causales y consecuencias)</li>
<li>Art. 67 al 70 (vacaciones)</li>
<li>Art. 172 (base de cálculo, excluye colación y movilización)</li>
<li>Art. 177 (formalidades del finiquito)</li>
<li>Ley 21.133 (trabajadores independientes)</li>
</ul>
<p>Para el detalle completo con todos los casos especiales, lee la <a href="/guias/finiquito-laboral-chile">guía de finiquito laboral en Chile 2026</a> o calcula tu caso específico con la <a href="/calculadoras/calculadora-finiquito">calculadora de finiquito</a>.</p>
<p>Fuentes: <a href="https://www.bcn.cl" target="_blank" rel="noopener">Biblioteca del Congreso Nacional (BCN)</a>, <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>.</p>`,
  },
  {
    slug: 'diferencia-sueldo-bruto-liquido',
    title: 'Diferencia entre sueldo bruto y líquido en Chile 2026',
    description:
      'Entiende la diferencia entre sueldo bruto y líquido. Descubre cuánto te descuentan por AFP, salud, cesantía e impuesto único en Chile.',
    date: '2026-03-30',
    updatedAt: '2026-07-04',
    category: 'laboral',
    readingTime: 7,
    relatedGuia: 'sueldo-liquido-chile',
    keywords: [
      'sueldo bruto líquido',
      'descuentos legales Chile',
      'AFP salud cesantía',
      'sueldo líquido 2026',
      'tope imponible 90 UF',
    ],
    relatedCalculators: [
      'calculadora-sueldo-liquido',
      'calculadora-costo-empleado-pyme',
      'calculadora-comparador-afp',
    ],
    content: `<h2>¿Qué es el sueldo bruto?</h2>
<p>El sueldo bruto es el monto total que el empleador acuerda pagarte antes de cualquier descuento legal. Es el número que aparece en tu contrato de trabajo. No es lo que llega a tu cuenta bancaria.</p>

<h2>¿Qué es el sueldo líquido?</h2>
<p>El sueldo líquido es el dinero que efectivamente recibes en tu cuenta después de todos los descuentos legales obligatorios. Es el monto real con el que cuentas para tus gastos mensuales.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Diferencia típica</strong><p>El factor de conversión bruto → líquido oscila entre 77% y 83% según AFP, sistema de salud y si caes en tramos de impuesto único. De cada $1 millón bruto, recibes $770.000 a $830.000 líquidos.</p></div></aside>

<h2>Descuentos legales obligatorios</h2>
<p>Los descuentos suman aproximadamente 17%-20% del sueldo bruto:</p>
<ul>
<li><strong>Cotización AFP (10% + comisión):</strong> el 10% va a tu cuenta de capitalización individual. La comisión varía entre 0,46% (AFP Uno) y 1,45% (ProVida).</li>
<li><strong>Cotización de salud (7%):</strong> a FONASA o tu Isapre. Si tu plan de Isapre cuesta más del 7%, pagas el costo total del plan.</li>
<li><strong>Seguro de cesantía (0,6%):</strong> solo en contratos indefinidos. El empleador aporta 2,4% adicional (3% para contratos plazo fijo, todo del empleador).</li>
<li><strong>Impuesto único de segunda categoría:</strong> solo si tu base tributable supera 13,5 UTM mensuales (~$952.880 con UTM julio 2026).</li>
</ul>

<h2>Ejemplo práctico 2026</h2>
<div class="numeric-example"><div class="numeric-example__title">Sueldo bruto $800.000, AFP Habitat (1,27%), FONASA</div><ul><li>AFP (11,27%): $800.000 × 11,27% = $90.160</li><li>Salud FONASA (7%): $800.000 × 7% = $56.000</li><li>Seguro cesantía (0,6%): $800.000 × 0,6% = $4.800</li><li>Impuesto único: $0 (base tributable bajo 13,5 UTM)</li><li>Total descuentos: $150.960</li></ul><span class="total">Sueldo líquido: $649.040</span></div>

<h2>El tope imponible 2026</h2>
<p>Las cotizaciones se calculan sobre la remuneración imponible, con tope de <strong>90 UF</strong> mensuales (~$3.674.340 con UF julio 2026). Si ganas más, las cotizaciones se calculan solo hasta ese tope. Esto reduce el porcentaje efectivo de descuento para sueldos altos.</p>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Cesantía tiene tope distinto</strong><p>El seguro de cesantía tiene tope imponible 135,2 UF (más alto que AFP/Salud). Esto puede confundir al revisar liquidaciones de sueldos altos.</p></div></aside>

<h2>La gratificación legal</h2>
<p>La gratificación legal equivale al 25% de tu remuneración mensual con tope anual de 4,75 ingresos mínimos mensuales. La mayoría de empleadores la pagan mensualmente incluida en el sueldo bruto, pero técnicamente es un haber distinto.</p>
<p>Para profundizar en cada concepto y casos especiales (Isapre con plan UF, sueldos sobre el tope, bonos no imponibles), lee la <a href="/guias/sueldo-liquido-chile">guía de sueldo líquido en Chile 2026</a>. O calcula tu caso con la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a>.</p>
<p>Fuentes: <a href="https://www.spensiones.cl" target="_blank" rel="noopener">Superintendencia de Pensiones</a>, <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>, <a href="https://www.sii.cl" target="_blank" rel="noopener">SII</a>.</p>`,
  },
  {
    slug: 'guia-iva-chile-2026',
    title: 'Guía del IVA en Chile 2026: cómo calcularlo correctamente',
    description:
      'Guía completa sobre el IVA en Chile: qué es, cómo se calcula, quién lo paga, exenciones y cuándo aplica el 19%. Con ejemplos prácticos en CLP.',
    date: '2026-03-30',
    updatedAt: '2026-07-04',
    category: 'impuestos',
    readingTime: 7,
    relatedGuia: 'iva-boleta-honorarios-chile',
    keywords: [
      'IVA Chile',
      'impuesto valor agregado',
      '19% IVA',
      'calcular IVA',
      'precio neto bruto',
      'exenciones IVA',
    ],
    relatedCalculators: [
      'calculadora-iva',
      'calculadora-boleta-honorarios',
      'calculadora-costo-empleado-pyme',
    ],
    content: `<h2>¿Qué es el IVA?</h2>
<p>El Impuesto al Valor Agregado (IVA) es un tributo indirecto del 19% que se aplica a la venta de bienes muebles, prestación de servicios e importaciones en Chile. Fue instaurado en 1974 (DL 825) y su tasa actual se mantiene en 19% desde 2003.</p>

<h2>¿Cómo se calcula?</h2>
<p>Hay dos operaciones fundamentales:</p>
<ul>
<li><strong>Agregar IVA:</strong> precio neto × 1,19 = precio bruto.</li>
<li><strong>Quitar IVA:</strong> precio bruto ÷ 1,19 = precio neto.</li>
</ul>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo: producto neto $100.000</div><ul><li>Precio neto: $100.000</li><li>IVA (19%): $19.000</li><li>Precio bruto facturado: $119.000</li></ul><span class="total">Cliente paga $119.000 — empresa entera $19.000 al SII</span></div>

<h2>¿Quién paga el IVA?</h2>
<p>El consumidor final es quien realmente paga el IVA. Los vendedores y prestadores de servicios actúan como agentes retenedores: cobran el IVA al cliente y luego lo declaran y pagan al Servicio de Impuestos Internos (SII).</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Mecanismo de débito y crédito fiscal</strong><p>Una empresa cobra IVA en sus ventas (débito fiscal) y paga IVA en sus compras (crédito fiscal). En el F29 mensual declara la diferencia: si débito &gt; crédito, paga; si crédito &gt; débito, lo arrastra al mes siguiente.</p></div></aside>

<h2>Bienes y servicios exentos</h2>
<p>El artículo 12 del DL 825 lista los exentos:</p>
<ul>
<li>Servicios profesionales prestados por personas naturales (van con boleta de honorarios)</li>
<li>Servicios de educación</li>
<li>Salud prestada por hospitales y clínicas</li>
<li>Transporte público de pasajeros</li>
<li>Seguros de vida y salud</li>
<li>Venta de libros, diarios y revistas</li>
<li>Servicios financieros (créditos, depósitos)</li>
<li>Exportaciones</li>
</ul>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Cambio Ley 21.420 (2023)</strong><p>Desde el 1 de enero de 2023, los servicios profesionales prestados por <em>sociedades</em> sí están afectos a IVA, salvo que se constituyan como sociedad de profesionales clasificada en 2da categoría.</p></div></aside>

<h2>IVA en boletas y facturas</h2>
<p>Las boletas de venta incluyen el IVA en el precio final. Las facturas separan el valor neto del IVA, lo que es importante para empresas que pueden recuperar el crédito fiscal.</p>

<h2>Declaración mensual</h2>
<p>Los contribuyentes deben declarar el IVA mensualmente en el Formulario 29 del SII, dentro de los primeros 12 días del mes siguiente. La declaración incluye débito fiscal (IVA cobrado) y crédito fiscal (IVA pagado en compras).</p>
<p>Para profundizar y ver el detalle de la boleta de honorarios, lee la <a href="/guias/iva-boleta-honorarios-chile">guía de IVA y boleta de honorarios</a> o calcula con la <a href="/calculadoras/calculadora-iva">calculadora de IVA</a>.</p>
<p>Fuentes: <a href="https://www.sii.cl" target="_blank" rel="noopener">Servicio de Impuestos Internos</a>, DL 825 sobre Impuesto a las Ventas y Servicios.</p>`,
  },
  {
    slug: 'todo-sobre-uf-chile',
    title: 'Todo sobre la UF en Chile: qué es y cómo se usa',
    description:
      'Guía completa sobre la Unidad de Fomento (UF) en Chile: qué es, cómo se actualiza, para qué se usa y cómo convertirla a pesos.',
    date: '2026-03-30',
    updatedAt: '2026-07-04',
    category: 'educacion-financiera',
    readingTime: 6,
    relatedGuia: 'uf-utm-indicadores-chile',
    keywords: [
      'UF Chile',
      'Unidad de Fomento',
      'valor UF',
      'convertir UF CLP',
      'UF inflación',
      'reajuste UF diario',
    ],
    relatedCalculators: [
      'calculadora-uf-clp',
      'calculadora-reajuste-arriendo',
      'calculadora-credito-hipotecario',
    ],
    content: `<h2>¿Qué es la UF?</h2>
<p>La Unidad de Fomento (UF) es una unidad de cuenta reajustable según la inflación, creada en Chile en 1967. Su valor se actualiza diariamente según la variación del Índice de Precios al Consumidor (IPC) del mes anterior. Se usa para mantener el valor real del dinero en contratos y transacciones de largo plazo.</p>
<ul class="data-grid"><li><span class="data-grid__label">Valor UF julio 2026</span><span class="data-grid__value">$40.826</span></li><li><span class="data-grid__label">Reajuste</span><span class="data-grid__value">Diario por IPC</span></li><li><span class="data-grid__label">Origen</span><span class="data-grid__value">Decreto 40 de 1967</span></li><li><span class="data-grid__label">Calcula</span><span class="data-grid__value">Banco Central</span></li></ul>

<h2>¿Cuánto vale la UF?</h2>
<p>En julio 2026 la UF vale aproximadamente $40.826 pesos chilenos. El Banco Central de Chile publica los valores con un día de anticipación. Los fines de semana y festivos mantiene el valor del último día hábil.</p>

<h2>¿Para qué se usa?</h2>
<ul>
<li><strong>Créditos hipotecarios:</strong> dividendos en UF, pago en pesos varía mes a mes.</li>
<li><strong>Arriendos:</strong> muchos contratos están en UF para protección contra inflación.</li>
<li><strong>Seguros:</strong> pólizas suelen expresarse en UF.</li>
<li><strong>Multas y sanciones:</strong> algunas multas SII y judiciales se calculan en UF.</li>
<li><strong>Contratos de largo plazo:</strong> cualquier contrato que necesite mantener su valor real.</li>
<li><strong>Topes legales:</strong> AFP/Salud (90 UF) y cesantía (135,2 UF) son topes mensuales.</li>
</ul>

<h2>¿Cómo convertir UF a pesos?</h2>
<div class="numeric-example"><div class="numeric-example__title">Conversiones rápidas con UF $40.826</div><ul><li>50 UF × $40.826 = <strong>$2.041.300</strong></li><li>$1.000.000 ÷ $40.826 = <strong>24,49 UF</strong></li><li>3.000 UF (vivienda típica) × $40.826 = <strong>$122.478.000</strong></li></ul><span class="total">Usa siempre el valor de la UF del día específico</span></div>

<h2>¿Por qué es mejor que pesos para contratos largos?</h2>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Protección contra inflación</strong><p>La UF se reajusta con la inflación, por lo que 100 UF de hoy tendrán el mismo poder adquisitivo dentro de 10 años. Si firmas un contrato en pesos, la inflación erosiona el valor real con el tiempo. Por eso los créditos hipotecarios y arriendos altos están en UF.</p></div></aside>

<h2>¿Quién la calcula?</h2>
<p>El Banco Central de Chile es la institución encargada de calcular y publicar el valor diario de la UF, según la variación del IPC que publica el INE. Los valores oficiales están en <a href="https://www.bcentral.cl/inicio/indicadores" target="_blank" rel="noopener">bcentral.cl/indicadores</a>.</p>
<p>Para ver la UF junto con UTM, IPC, dólar y otros indicadores en una guía completa, lee <a href="/guias/uf-utm-indicadores-chile">UF, UTM e IPC en Chile</a>. Para conversiones rápidas usa la <a href="/calculadoras/calculadora-uf-clp">calculadora UF a CLP</a>.</p>
<p>Fuentes: <a href="https://www.bcentral.cl" target="_blank" rel="noopener">Banco Central de Chile</a>, <a href="https://www.ine.gob.cl" target="_blank" rel="noopener">INE</a>.</p>`,
  },
  {
    slug: 'boleta-honorarios-completo',
    title: 'Guía completa de boleta de honorarios en Chile 2026',
    description:
      'Todo sobre la boleta de honorarios: retención 15,25%, cómo emitirla, monto líquido y obligaciones tributarias para independientes.',
    date: '2026-03-30',
    updatedAt: '2026-07-04',
    category: 'impuestos',
    readingTime: 8,
    relatedGuia: 'iva-boleta-honorarios-chile',
    keywords: [
      'boleta honorarios',
      'retención 15.25%',
      'honorarios Chile',
      'independientes SII',
      'impuesto profesionales',
      'ley 21.133',
    ],
    relatedCalculators: [
      'calculadora-boleta-honorarios',
      'calculadora-operacion-renta',
      'calculadora-ppm',
    ],
    content: `<h2>¿Qué es la boleta de honorarios?</h2>
<p>La boleta de honorarios electrónica es un documento tributario que emiten las personas naturales por servicios profesionales o técnicos prestados de forma independiente, sin relación laboral con el cliente. Se emite electrónicamente a través del sitio del SII desde 2017.</p>

<h2>Retención 2026: 15,25%</h2>
<p>La <strong>Ley 21.133</strong> estableció un calendario progresivo de retención. En 2026, la retención total es del 15,25% del monto bruto:</p>
<table>
<thead><tr><th>Año</th><th>Retención total</th><th>Impuesto renta</th><th>Cotización previsional</th></tr></thead>
<tbody>
<tr><td>2025</td><td>14,5%</td><td>10%</td><td>4,5%</td></tr>
<tr><td><strong>2026</strong></td><td><strong>15,25%</strong></td><td>10%</td><td>5,25%</td></tr>
<tr><td>2027</td><td>16%</td><td>10%</td><td>6%</td></tr>
<tr><td>2028</td><td>17%</td><td>10%</td><td>7%</td></tr>
</tbody>
</table>
<div class="numeric-example"><div class="numeric-example__title">Boleta bruta $500.000 en 2026</div><ul><li>Bruto: $500.000</li><li>Retención (15,25%): $76.250</li><li>— Impuesto renta (10%): $50.000</li><li>— Cotización previsional (5,25%): $26.250</li></ul><span class="total">Líquido recibido: $423.750</span></div>

<h2>¿Quiénes pueden emitir?</h2>
<p>Toda persona natural que preste servicios profesionales o técnicos de forma independiente: abogados, contadores, diseñadores, programadores, consultores, profesores particulares, y cualquier profesional que no tenga relación laboral con su cliente.</p>

<h2>¿Cómo se emite?</h2>
<ol class="steps">
<li>Ingresa a <a href="https://www.sii.cl" target="_blank" rel="noopener">sii.cl</a> con tu RUT y clave tributaria.</li>
<li>Ve a "Servicios Online" → "Emisión de Documentos" → "Boleta de Honorarios Electrónica".</li>
<li>Ingresa los datos del pagador (RUT y razón social), monto y descripción del servicio.</li>
<li>El sistema calcula automáticamente la retención y emite la boleta en PDF.</li>
<li>El SII envía copia al pagador automáticamente.</li>
</ol>

<h2>¿Estoy exento de retención?</h2>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Persona natural no retiene</strong><p>Si emites a una persona natural (no a una empresa), no hay retención y tú declaras y pagas directamente. Si emites a una empresa, la retención es obligatoria y la empresa la entera al SII al mes siguiente.</p></div></aside>
<p>También hay exenciones especiales para personas que cotizan poco al año o pensionados que pueden eximirse de la cotización previsional con declaración jurada anual.</p>

<h2>¿Qué pasa en la Operación Renta?</h2>
<p>La retención del 15,25% es un pago provisional. En tu declaración anual (Formulario 22 en abril) se calcula el impuesto real considerando todos tus ingresos del año, gastos presuntos (30%, tope 15 UTA) o gastos efectivos. Si pagaste de más, recibes devolución; si pagaste de menos, debes la diferencia.</p>

<h2>Cotizaciones obligatorias para independientes</h2>
<p>La Ley 21.133 estableció la cotización obligatoria para honorarios independientes, que se paga de forma anual en la Operación Renta. La porción "previsional" del 5,25% (en 2026) se descompone en AFP, salud (FONASA o Isapre), SIS y Mutual de Seguridad.</p>
<p>Para ver el detalle completo de la operación renta de independientes y cómo optimizar, lee la <a href="/guias/iva-boleta-honorarios-chile">guía de IVA y boleta de honorarios</a>. Calcula tu líquido con la <a href="/calculadoras/calculadora-boleta-honorarios">calculadora de boleta de honorarios</a>.</p>
<p>Fuentes: <a href="https://www.sii.cl" target="_blank" rel="noopener">SII</a>, Ley 21.133, Ley sobre Impuesto a la Renta.</p>`,
  },
  {
    slug: 'guia-horas-extra-chile',
    title: 'Guía completa de horas extra en Chile 2026',
    description:
      'Todo sobre horas extraordinarias en Chile: recargo 50%, tope máximo, cómo calcular el valor hora extra y qué dice el Código del Trabajo.',
    date: '2026-03-30',
    updatedAt: '2026-07-04',
    category: 'laboral',
    readingTime: 6,
    relatedGuia: 'sueldo-liquido-chile',
    keywords: [
      'horas extra Chile',
      'horas extraordinarias',
      'recargo 50%',
      'tope horas extra',
      'Código del Trabajo',
      'art 30 32',
    ],
    relatedCalculators: [
      'calculadora-horas-extra',
      'calculadora-sueldo-liquido',
      'calculadora-costo-empleado-pyme',
    ],
    content: `<h2>¿Qué son las horas extra?</h2>
<p>Las horas extraordinarias son aquellas que se trabajan fuera de la jornada laboral ordinaria, con un máximo de 2 horas diarias. Solo pueden pactarse para atender necesidades o situaciones temporales (Art. 30 del Código del Trabajo).</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Pacto escrito (Art. 32)</strong><p>Las horas extra deben pactarse por escrito entre empleador y trabajador. Sin pacto, el trabajador no está obligado a quedarse después de su jornada. El empleador debe llevar un registro detallado del tiempo trabajado.</p></div></aside>

<h2>¿Cuánto se paga?</h2>
<p>Las horas extra se pagan con un recargo del <strong>50%</strong> sobre el valor de la hora ordinaria (Art. 32). Si trabajas en domingo o festivos, el recargo es del <strong>100%</strong>.</p>

<h2>Cálculo del valor hora extra</h2>
<p>Fórmula:</p>
<ul>
<li><strong>Valor hora ordinaria</strong> = sueldo bruto ÷ 30 ÷ horas diarias de jornada (típicamente 8).</li>
<li><strong>Valor hora extra</strong> = valor hora ordinaria × 1,50 (o × 2,00 en domingo/festivo).</li>
</ul>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo: sueldo $600.000, jornada 8 horas</div><ul><li>Valor hora ordinaria: $600.000 ÷ 30 ÷ 8 = <strong>$2.500</strong></li><li>Valor hora extra (50%): $2.500 × 1,5 = <strong>$3.750</strong></li><li>Hora extra domingo (100%): $2.500 × 2 = <strong>$5.000</strong></li></ul><span class="total">10 horas extra/mes ≈ $37.500 adicionales</span></div>

<h2>Tope de horas extra</h2>
<p>No puedes trabajar más de 2 horas extra diarias. En casos calificados y con autorización de la Dirección del Trabajo, se puede extender hasta 4 horas diarias en períodos temporales (estacionalidad).</p>

<h2>¿Afectan las cotizaciones?</h2>
<p>Sí. Las horas extra son haber imponible y están afectas a cotizaciones previsionales (AFP, salud, seguro de cesantía) e impuesto único de segunda categoría. Se deben declarar en la planilla de remuneraciones del mes correspondiente.</p>

<h2>¿Puedo negarme a hacer horas extra?</h2>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Las horas extra son voluntarias</strong><p>El empleador no puede obligarte a trabajar horas extra sin pacto previo. Si firmaste un pacto general anual, puedes desistir con aviso razonable. Las represalias por negarse a horas extra constituyen práctica antisindical o despido injustificado.</p></div></aside>

<h2>Reducción de jornada (Ley 21.561)</h2>
<p>La Ley 40 horas (Ley 21.561 de 2023) reduce gradualmente la jornada ordinaria de 45 a 40 horas semanales:</p>
<ul>
<li><strong>Abril 2024</strong>: 44 horas semanales.</li>
<li><strong>Abril 2026</strong>: 42 horas semanales.</li>
<li><strong>Abril 2028</strong>: 40 horas semanales.</li>
</ul>
<p>Esto NO reduce el sueldo y aumenta el valor de la hora ordinaria, lo que indirectamente sube el valor de las horas extra. Calcula tu hora extra con la <a href="/calculadoras/calculadora-horas-extra">calculadora de horas extra</a>.</p>
<p>Fuentes: <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>, <a href="https://www.bcn.cl" target="_blank" rel="noopener">BCN</a>, Código del Trabajo Arts. 30-32, Ley 21.561.</p>`,
  },
  {
    slug: 'como-funciona-gratificacion-legal',
    title: 'Cómo funciona la gratificación legal en Chile 2026',
    seoTitle: 'Tope de Gratificación Legal 2026 en Chile: cálculo y monto',
    seoDescription:
      'Conoce el tope de gratificación legal 2026 en Chile, cómo se calcula (25% con tope 4,75 IMM) y cuándo corresponde pagarla.',
    description:
      'Explicación clara de la gratificación legal: 25% de remuneración, tope 4,75 IMM, quién tiene derecho y cómo se calcula mensual o anualmente.',
    date: '2026-03-30',
    updatedAt: '2026-07-04',
    category: 'laboral',
    readingTime: 6,
    relatedGuia: 'sueldo-liquido-chile',
    keywords: [
      'gratificación legal',
      '25% remuneración',
      '4.75 IMM',
      'aguinaldo legal',
      'Art. 47 Código del Trabajo',
      'tope gratificación legal 2026',
      'nuevo tope gratificación 2026',
    ],
    relatedCalculators: [
      'calculadora-gratificacion-legal',
      'calculadora-sueldo-liquido',
      'calculadora-costo-empleado-pyme',
    ],
    faq: [
      {
        question: '¿Cuál es el tope de gratificación legal 2026 en Chile?',
        answer:
          'El tope de gratificación legal 2026 es de 4,75 ingresos mínimos mensuales (IMM) al año. Con sueldo mínimo de $553.553, el tope anual es $2.629.377, equivalente a $219.115 mensuales. Si el 25% de tu sueldo supera ese monto, se aplica el tope y recibes $219.115. Si no lo supera, recibes el 25% íntegro.',
      },
      {
        question: '¿Cómo se calcula la gratificación legal?',
        answer:
          'En el sistema más usado (Art. 50 del Código del Trabajo), la gratificación equivale al 25% de la remuneración mensual con tope de 4,75 IMM anuales. Por ejemplo, con sueldo base de $600.000: 25% × $600.000 = $150.000, que está bajo el tope mensual de $219.115, así que se paga $150.000. Con sueldo de $1.500.000: 25% = $375.000, que excede el tope, así que se paga $219.115.',
      },
      {
        question: '¿Quién tiene derecho a gratificación legal?',
        answer:
          'Tienen derecho los trabajadores que devenguen remuneraciones variables o que ganen menos de 4,75 IMM anuales. La gratificación es obligatoria cuando la empresa registra utilidad líquida, y la inmensa mayoría de empresas opta por el sistema de 25% con tope (Art. 50) en vez del 30% de utilidad líquida (Art. 47).',
      },
      {
        question: '¿La gratificación se paga mensual o anual?',
        answer:
          'El empleador puede pagarla mensualmente (anticipo, lo más común) o en un pago anual liquidado en abril. El sistema mensual hace que la mayoría de los trabajadores reciba la gratificación incluida en el sueldo bruto. La gratificación es haber imponible: cotiza para AFP, salud y cesantía, y se considera en la base de la indemnización por años de servicio.',
      },
    ],
    content: `<h2>¿Qué es la gratificación legal?</h2>
<p>La gratificación legal es un beneficio obligatorio que el empleador debe pagar a los trabajadores cuando la empresa registra utilidad líquida. Está regulado por los artículos 47 a 50 del Código del Trabajo.</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Dos sistemas (Art. 47 y Art. 50)</strong><p>El empleador puede elegir entre:<br><strong>A.</strong> 30% de utilidad líquida del ejercicio, repartida proporcionalmente.<br><strong>B.</strong> 25% de la remuneración mensual, tope 4,75 IMM al año.<br>La inmensa mayoría de empresas elige el sistema B (más predecible).</p></div></aside>

<h2>¿Quién tiene derecho?</h2>
<p>Tienen derecho los trabajadores que devenguen remuneraciones variables o que ganen menos de 4,75 IMM (ingresos mínimos mensuales) anuales. En 2026, con sueldo mínimo de $553.553, el tope anual es $2.629.377 (≈$219.115 mensuales).</p>

<h2>¿Cómo se calcula?</h2>
<p>En el sistema B (Art. 50, el más usado):</p>
<ul>
<li><strong>Cálculo mensual</strong>: 25% del sueldo del mes, hasta el tope mensual de 4,75 IMM ÷ 12.</li>
<li><strong>Tope mensual 2026</strong>: $2.629.377 ÷ 12 = <strong>$219.115</strong>.</li>
</ul>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo 1: sueldo base $600.000</div><ul><li>25% × $600.000 = $150.000</li><li>Está bajo el tope de $219.115</li></ul><span class="total">Gratificación mensual: $150.000</span></div>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo 2: sueldo base $1.500.000</div><ul><li>25% × $1.500.000 = $375.000</li><li>Excede tope de $219.115 → se aplica tope</li></ul><span class="total">Gratificación mensual (topada): $219.115</span></div>

<h2>¿Mensual o anual?</h2>
<p>El empleador puede pagarla mensualmente (anticipo, lo más común) o en un pago anual liquidado en abril. El sistema mensual hace que la mayoría de los trabajadores reciba gratificación incluida en su sueldo bruto.</p>

<h2>¿Puede ser mayor?</h2>
<p>Sí. El empleador puede pagar una gratificación superior a la legal por contrato individual o convenio colectivo. Muchas empresas pagan gratificaciones adicionales en septiembre o diciembre, además de la legal mensual.</p>

<h2>Implicaciones del cálculo de gratificación</h2>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Por qué importa para tu sueldo neto</strong><p>La gratificación es haber imponible: cotiza para AFP, salud y cesantía. También se considera para calcular la base de la indemnización por años de servicio en el finiquito. Por eso entender si tu sueldo bruto incluye gratificación o no es clave al firmar contrato.</p></div></aside>
<p>Para ver cómo se integra con el cálculo de sueldo líquido, lee la <a href="/guias/sueldo-liquido-chile">guía de sueldo líquido en Chile</a>. Calcula tu gratificación específica con la <a href="/calculadoras/calculadora-gratificacion-legal">calculadora de gratificación legal</a>.</p>
<p>Fuentes: <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>, Código del Trabajo Arts. 47-50.</p>`,
  },
  {
    slug: 'calcular-indemnizacion-por-anos',
    title: 'Cómo calcular la indemnización por años de servicio',
    description:
      'Guía para calcular la indemnización: 30 días por año, tope 11 años, base 90 UF. Cuándo corresponde y cuándo no. Art. 163 Código del Trabajo.',
    date: '2026-03-30',
    updatedAt: '2026-07-04',
    category: 'laboral',
    readingTime: 7,
    relatedGuia: 'finiquito-laboral-chile',
    keywords: [
      'indemnización años servicio',
      'Art. 163',
      'despido injustificado',
      '30 días por año',
      'tope 11 años',
      'recargo art 168',
    ],
    relatedCalculators: [
      'calculadora-indemnizacion-anos-servicio',
      'calculadora-finiquito',
      'calculadora-intereses-mora',
    ],
    content: `<h2>¿Qué es la indemnización por años de servicio?</h2>
<p>Es una compensación económica que el empleador debe pagar al trabajador cuando despide invocando "necesidades de la empresa" (Art. 161) o cuando el despido se declara judicialmente injustificado. Equivale a <strong>30 días de remuneración por cada año de servicio o fracción superior a 6 meses</strong>, con tope de 11 años (330 días). Está regulada por el Art. 163 del Código del Trabajo.</p>

<h2>¿Cuándo corresponde?</h2>
<ul>
<li>Despido por necesidades de la empresa (Art. 161, con aviso previo o pago sustitutivo).</li>
<li>Despido injustificado declarado por tribunal (con recargo del Art. 168).</li>
<li>Mutuo acuerdo con indemnización pactada.</li>
<li>Casos fortuitos o fuerza mayor (Art. 159 N°6) — en algunos casos.</li>
</ul>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Renuncia: NO corresponde</strong><p>Si renuncias voluntariamente (Art. 159 N°2), no recibes indemnización por años de servicio. Solo días trabajados, vacaciones proporcionales y vacaciones pendientes.</p></div></aside>

<h2>¿Cómo se calcula?</h2>
<p>Indemnización = última remuneración × años de servicio. La base incluye sueldo + gratificación. No incluye colación ni movilización (Art. 172).</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo: sueldo $700.000, 8 años</div><ul><li>Indemnización = $700.000 × 8 = <strong>$5.600.000</strong></li><li>Bajo tope 11 años ✓</li><li>Base 19,9 UF, bajo 90 UF ✓</li></ul><span class="total">Total: $5.600.000</span></div>

<h2>Topes legales</h2>
<ul>
<li><strong>Máximo 11 años</strong>: 330 días de remuneración (incluso si trabajaste 20 años, solo se pagan 11). Excepción: contratos anteriores al 14/08/1981 no tienen tope.</li>
<li><strong>Base máxima 90 UF mensuales</strong> (≈$3.674.340 con UF julio 2026).</li>
</ul>

<h2>Recargo por despido injustificado (Art. 168)</h2>
<p>Si el tribunal declara que el despido fue injustificado, indebido o improcedente, la indemnización se incrementa con un recargo:</p>
<table>
<thead><tr><th>Causal invocada y desestimada</th><th>Recargo</th></tr></thead>
<tbody>
<tr><td>Necesidades de la empresa (Art. 161)</td><td>30%</td></tr>
<tr><td>Conducta poco apropiada (Art. 160)</td><td>50%</td></tr>
<tr><td>Falta de probidad u otros graves (Art. 160)</td><td>80%</td></tr>
<tr><td>Despido sin invocar causal</td><td>100%</td></tr>
</tbody>
</table>

<h2>Indemnización sustitutiva del aviso (Art. 162)</h2>
<p>Si el empleador no avisa con 30 días de anticipación cuando invoca el Art. 161, debe pagar adicionalmente <strong>una remuneración mensual</strong> como sustitución del aviso.</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>Ley Bustos: nulidad del despido</strong><p>Si el empleador no había pagado las cotizaciones previsionales al despido, el contrato se considera vigente hasta el pago. El trabajador recibe las remuneraciones del período entre despido y convalidación, no solo el finiquito.</p></div></aside>
<p>Para el detalle completo del finiquito incluyendo todos los componentes, lee la <a href="/guias/finiquito-laboral-chile">guía de finiquito laboral</a>. Calcula tu indemnización específica con la <a href="/calculadoras/calculadora-indemnizacion-anos-servicio">calculadora de indemnización</a>.</p>
<p>Fuentes: <a href="https://www.bcn.cl" target="_blank" rel="noopener">BCN</a>, <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>, Código del Trabajo Art. 161-168, 172, 177.</p>`,
  },
  {
    slug: 'reajuste-arriendo-uf-2026',
    title: 'Reajuste de arriendo por UF e IPC en Chile 2026',
    seoTitle: 'Reajuste de Arriendo por UF 2026: cómo calcularlo en Chile',
    seoDescription:
      'Aprende cómo calcular el reajuste de arriendo por UF o IPC en Chile, con ejemplo paso a paso, conversión a pesos y calculadora.',
    description:
      'Todo sobre el reajuste de arriendo: cuánto puede subir, UF vs IPC, qué dice tu contrato y cuándo puedes negociar.',
    date: '2026-03-30',
    updatedAt: '2026-07-04',
    category: 'vivienda',
    readingTime: 6,
    relatedGuia: 'comprar-vivienda-chile',
    keywords: [
      'reajuste arriendo',
      'IPC arriendo',
      'UF arriendo',
      'aumento arriendo Chile',
      'tope arriendo',
      'Ley 18.101',
      'reajuste arriendo UF 2026',
      'cómo calcular reajuste arriendo',
    ],
    relatedCalculators: [
      'calculadora-reajuste-arriendo',
      'calculadora-uf-clp',
      'calculadora-credito-hipotecario',
    ],
    faq: [
      {
        question: '¿Cómo se calcula el reajuste de arriendo por UF?',
        answer:
          'Si tu contrato está pactado en UF, el reajuste es automático y diario: el valor en UF se mantiene fijo y el pago en pesos varía según el valor de la UF de cada mes. Por ejemplo, si pagas 10 UF de arriendo y la UF sube de $40.000 a $40.500, tu arriendo pasa de $400.000 a $405.000 sin que el arrendador tenga que hacer ningún cálculo.',
      },
      {
        question: '¿Cómo se calcula el reajuste de arriendo por IPC?',
        answer:
          'Si tu arriendo está en pesos, el reajuste se calcula con el IPC acumulado del período definido en el contrato (usualmente 12 meses). Por ejemplo: arriendo $400.000 con IPC anual 4,5% → reajuste = $400.000 × 4,5% = $18.000 → nuevo arriendo $418.000. La frecuencia (anual, semestral) debe estar en el contrato.',
      },
      {
        question: '¿Cuánto puede subir el arriendo en Chile?',
        answer:
          'No hay un tope legal de aumento. El reajuste depende exclusivamente de lo que establezca el contrato de arriendo. Si está en UF, sube con la UF. Si está en pesos, sube con el IPC acumulado del período pactado. Si el contrato no incluye cláusula de reajuste, el arrendador no puede aumentar unilateralmente el canon.',
      },
      {
        question: '¿Puedo negarme al aumento de arriendo?',
        answer:
          'Si el contrato establece el reajuste y se calcula correctamente según ese contrato, no puedes negarte. Si el aumento es abusivo o no está en el contrato, puedes negociar o recurrir al Tribunal de Policía Local o SERNAC. Sin cláusula de reajuste, el arrendador debe esperar a renegociar el contrato (típicamente al año) y proponer un nuevo monto que tú puedes aceptar o no.',
      },
    ],
    content: `<h2>¿Cuánto puede subir el arriendo?</h2>
<p>No hay un tope legal de aumento. El reajuste depende de lo que establezca el contrato de arriendo. Si está pactado en UF, se reajusta automáticamente con la variación de la UF. Si está en pesos, se reajusta según el IPC acumulado del período pactado en el contrato.</p>

<h2>Arriendo en UF vs pesos</h2>
<div class="comparison">
<div class="comparison__header"><div>Arriendo en UF</div><div>Arriendo en pesos</div></div>
<div class="comparison__row"><div>Reajuste automático diario</div><div>Reajuste por IPC acumulado</div></div>
<div class="comparison__row"><div>Pago en pesos varía mes a mes</div><div>Pago en pesos fijo entre reajustes</div></div>
<div class="comparison__row"><div>Valor real estable</div><div>Valor real cae si no se reajusta</div></div>
<div class="comparison__row"><div>Predecible para arrendador</div><div>Predecible para arrendatario</div></div>
<div class="comparison__row"><div>Común en oficinas y propiedades altas</div><div>Común en arriendos económicos</div></div>
</div>

<h2>Ejemplo de reajuste por IPC</h2>
<div class="numeric-example"><div class="numeric-example__title">Arriendo $400.000, IPC anual 4,5%</div><ul><li>Arriendo actual: $400.000</li><li>IPC últimos 12 meses: 4,5%</li><li>Reajuste: $400.000 × 4,5% = $18.000</li></ul><span class="total">Nuevo arriendo: $418.000</span></div>

<h2>¿Puedo negarme al aumento?</h2>
<p>Si el contrato establece el reajuste y se calcula correctamente según ese contrato, no puedes negarte. Si el aumento es abusivo o no está en el contrato, puedes negociar o recurrir al Tribunal de Policía Local o SERNAC.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Sin cláusula = sin reajuste</strong><p>Si tu contrato no incluye cláusula de reajuste, el arrendador no puede aumentar unilateralmente el canon. Debe esperar a renegociar contrato (típicamente al año) y proponerte un nuevo monto, que tú puedes aceptar o no.</p></div></aside>

<h2>Frecuencia del reajuste</h2>
<p>Debe estar definida en el contrato. Lo más común:</p>
<ul>
<li><strong>Anual</strong>: lo más usual en arriendos en pesos.</li>
<li><strong>Cada 6 meses</strong>: usado a veces para arriendos largos.</li>
<li><strong>Mensual (UF)</strong>: automático en arriendos pactados en UF.</li>
</ul>

<h2>Renovación de contrato y desalojo</h2>
<p>La <strong>Ley 18.101 (Arrendamiento de Inmuebles Urbanos)</strong> protege al arrendatario:</p>
<ul>
<li>Si el contrato es a plazo fijo, termina automáticamente al vencer.</li>
<li>Si es indefinido, requiere desahucio con 2 meses de anticipación, que puede ampliarse a 4 meses según los años de tenencia.</li>
<li>El arrendatario puede dejar la propiedad antes con aviso de 30 días, pagando arriendo proporcional.</li>
</ul>
<p>Para el panorama completo (compra de vivienda, subsidios, contribuciones), lee la <a href="/guias/comprar-vivienda-chile">guía de comprar vivienda en Chile</a>. Calcula tu reajuste con la <a href="/calculadoras/calculadora-reajuste-arriendo">calculadora de reajuste de arriendo</a>.</p>
<p>Fuentes: <a href="https://www.sernac.cl" target="_blank" rel="noopener">SERNAC</a>, Ley 18.101 (Arrendamiento de Inmuebles Urbanos).</p>`,
  },
  {
    slug: 'vacaciones-proporcionales-guia',
    title: 'Guía de vacaciones proporcionales en Chile 2026',
    description:
      'Cómo calcular tus vacaciones proporcionales al finiquito: días que te corresponden, valor por día y pago en el finiquito.',
    date: '2026-03-30',
    updatedAt: '2026-07-04',
    category: 'laboral',
    readingTime: 5,
    relatedGuia: 'finiquito-laboral-chile',
    keywords: [
      'vacaciones proporcionales',
      'feriado proporcional',
      'días vacaciones',
      'finiquito vacaciones',
      'Art. 67',
      'vacaciones progresivas',
    ],
    relatedCalculators: [
      'calculadora-vacaciones-proporcionales',
      'calculadora-finiquito',
      'calculadora-indemnizacion-anos-servicio',
    ],
    content: `<h2>¿Qué son las vacaciones proporcionales?</h2>
<p>Son los días de feriado legal que te corresponden por el tiempo trabajado en el año en que termina tu contrato. Se calculan y pagan en el finiquito. Están reguladas por los Arts. 67 y 70 del Código del Trabajo.</p>

<h2>¿Cuántos días me corresponden?</h2>
<p>El feriado anual chileno es de <strong>15 días hábiles</strong> por año trabajado. Para vacaciones proporcionales, se dividen entre 12 meses, dando <strong>1,25 días por cada mes trabajado</strong>:</p>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo: 9 meses trabajados</div><ul><li>Días proporcionales: 9 × 1,25 = <strong>11,25 días</strong></li></ul><span class="total">Días que se pagan en el finiquito: 11,25 hábiles</span></div>

<h2>¿Cuánto vale cada día?</h2>
<p>El valor de cada día se calcula dividiendo tu sueldo mensual por 30:</p>
<ul>
<li><strong>Valor día</strong> = sueldo bruto ÷ 30</li>
<li><strong>Total vacaciones</strong> = días proporcionales × valor día</li>
</ul>
<div class="numeric-example"><div class="numeric-example__title">Ejemplo: sueldo $600.000, 7 meses trabajados</div><ul><li>Días proporcionales: 7 × 1,25 = 8,75</li><li>Valor del día: $600.000 ÷ 30 = $20.000</li></ul><span class="total">Total vacaciones: $175.000</span></div>

<h2>Vacaciones pendientes vs proporcionales</h2>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Diferencia clave</strong><p>Las <strong>proporcionales</strong> son del año en curso (1,25 × meses). Las <strong>pendientes</strong> son días no tomados de años anteriores. Ambas se pagan en el finiquito al mismo valor por día. Las pendientes no prescriben mientras dure la relación laboral.</p></div></aside>

<h2>Vacaciones progresivas (Art. 68)</h2>
<p>Después de <strong>10 años de trabajo</strong> (continuos o no, con cualquier empleador), tienes derecho a días adicionales: +1 día por cada 3 nuevos años, con un máximo de 5 días extra (total 20 días hábiles anuales). Para hacer valer este derecho debes presentar al empleador un certificado de cotizaciones del IPS o AFP que acredite tus años de cotización.</p>
<table>
<thead><tr><th>Años cotizados (cualquier empleador)</th><th>Días anuales</th></tr></thead>
<tbody>
<tr><td>0 a 9 años</td><td>15 días</td></tr>
<tr><td>10 a 12 años</td><td>16 días</td></tr>
<tr><td>13 a 15 años</td><td>17 días</td></tr>
<tr><td>16 a 18 años</td><td>18 días</td></tr>
<tr><td>19 a 21 años</td><td>19 días</td></tr>
<tr><td>22+ años</td><td>20 días</td></tr>
</tbody>
</table>

<h2>Días hábiles vs corridos</h2>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Hábiles, no corridos</strong><p>Los 15 días anuales son <em>hábiles</em> (lunes a viernes, sin feriados). Si tomas vacaciones por 3 semanas continuas, son aproximadamente 15 días hábiles. Algunos finiquitos calculan mal usando días corridos: revisa siempre.</p></div></aside>
<p>Para el detalle completo del finiquito y cómo se integran con la indemnización, lee la <a href="/guias/finiquito-laboral-chile">guía de finiquito laboral</a>. Calcula tus vacaciones específicas con la <a href="/calculadoras/calculadora-vacaciones-proporcionales">calculadora de vacaciones proporcionales</a>.</p>
<p>Fuentes: <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">Dirección del Trabajo</a>, Código del Trabajo Arts. 67, 68, 70.</p>`,
  },
  {
    slug: 'subsidios-minvu-2026-guia',
    title: 'Subsidios MINVU 2026: DS49, DS01, DS19 y DFL2 explicados',
    seoTitle: 'Subsidios MINVU 2026: DS49, DS1, DS19 y simulador',
    seoDescription:
      'Revisa los subsidios MINVU 2026 en Chile: DS49, DS1, DS19, requisitos, montos en UF y cómo simular tu subsidio habitacional.',
    description:
      'Cómo postular a los subsidios habitacionales del MINVU en 2026: DS49, DS01, DS19 y DFL2. Montos en UF, requisitos por tramo RSH y combinación de beneficios.',
    date: '2026-05-16',
    updatedAt: '2026-07-04',
    category: 'vivienda',
    readingTime: 9,
    relatedGuia: 'comprar-vivienda-chile',
    keywords: [
      'subsidio MINVU 2026',
      'DS49 fondo solidario',
      'DS01 sectores medios',
      'DS19 integración social',
      'DFL2 vivienda económica',
      'serviu chile',
      'RSH 40% 70% 90%',
      'subsidio habitacional UF',
      'simulador subsidio vivienda',
      'subsidio ds49 2026',
    ],
    relatedCalculators: [
      'calculadora-subsidio-habitacional',
      'calculadora-credito-hipotecario',
      'calculadora-contribuciones',
    ],
    faq: [
      {
        question: '¿Qué subsidios MINVU hay en 2026?',
        answer:
          'En 2026 los principales programas son: DS49 (Fondo Solidario, para el 40% más vulnerable, sin crédito hipotecario), DS01 (Sectores Medios, para RSH 40%-90%, con crédito complementario) y DS19 (Integración Social, adicional de hasta 200 UF que se suma al DS49 o DS01). El DFL2 no es un subsidio sino un régimen tributario favorable para viviendas económicas.',
      },
      {
        question: '¿Cómo simular mi subsidio de vivienda en Chile?',
        answer:
          'Para simular tu subsidio necesitas saber tu tramo de RSH (Registro Social de Hogares), tu ingreso mensual en UF y el ahorro acumulado. El DS49 entrega hasta 450 UF (tramo más bajo), el DS01 hasta 650 UF (tramo 1) o 520 UF (tramo 2). Usa la calculadora de subsidio habitacional para estimar tu monto según ingreso y tramo.',
      },
      {
        question: '¿El subsidio DS49 requiere crédito hipotecario?',
        answer:
          'No. El DS49 (Fondo Solidario de Elección de Vivienda) está diseñado para familias del 40% más vulnerable según RSH y NO requiere crédito hipotecario: el subsidio más el ahorro previo (mínimo 10 UF) cubren el precio total de la vivienda. El DS01, en cambio, sí requiere crédito hipotecario complementario.',
      },
      {
        question: '¿Cuándo se abren las postulaciones a subsidios MINVU 2026?',
        answer:
          'Las llamadas a postulación se publican en serviu.cl con calendario semestral. Cada llamado tiene cupos limitados (entre 5.000 y 30.000 según programa). Postula en cuanto se abra el llamado: cuando se llena el cupo, debes esperar al siguiente. Requisitos: cédula vigente, libreta de ahorro (mínimo 6 meses para DS49, 12 para DS01) y certificado RSH actualizado.',
      },
    ],
    content: `<h2>Panorama de los subsidios habitacionales 2026</h2>
<p>El <strong>MINVU</strong> (Ministerio de Vivienda y Urbanismo) administra varios programas de subsidio según ingreso del postulante, tramo de RSH y tipo de vivienda. En 2026, con UF a $40.826, los subsidios entregan entre <strong>$10 y $34 millones</strong> según el programa y tramo.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Calendario de postulación 2026</strong><p>Las llamadas a postulación se publican en <a href="https://www.serviu.cl" target="_blank" rel="noopener">serviu.cl</a> con calendario semestral. Cada llamado tiene cupos limitados (entre 5.000 y 30.000 según programa). Postula en cuanto se abra el llamado: cuando se llena el cupo, debes esperar al siguiente.</p></div></aside>

<h2>DS49 — Fondo Solidario de Elección de Vivienda</h2>
<p>Para familias del 40% más vulnerable según RSH. <strong>NO requiere crédito hipotecario</strong>: el subsidio + ahorro previo cubre el precio total de la vivienda.</p>
<table>
<thead><tr><th>Tramo ingreso UF</th><th>Subsidio máximo UF</th><th>Subsidio en CLP (UF julio 2026)</th></tr></thead>
<tbody>
<tr><td>0 – 12 UF</td><td>450 UF</td><td>~$18.160.000</td></tr>
<tr><td>12 – 18 UF</td><td>380 UF</td><td>~$15.336.000</td></tr>
<tr><td>18 – 24 UF</td><td>310 UF</td><td>~$12.510.000</td></tr>
</tbody>
</table>
<p>Ahorro mínimo previo: 10 UF (~$403.000).</p>

<h2>DS01 — Sectores Medios</h2>
<p>Para clase media con RSH entre 40% y 90%. <strong>Requiere crédito hipotecario complementario</strong> (típicamente UF 700-1.500). Tiene dos tramos:</p>
<ul>
<li><strong>Tramo 1</strong>: ingreso ≤ 15 UF. Subsidio hasta 650 UF. Ahorro mínimo: 30 UF.</li>
<li><strong>Tramo 2</strong>: ingreso 15-22 UF. Subsidio hasta 520 UF. Ahorro mínimo: 50 UF.</li>
</ul>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>El subsidio se pierde si la vivienda excede 2.200 UF</strong><p>El DS01 solo aplica a viviendas con valor de tasación ≤ 2.200 UF (~$88,8M en 2026). Si te enamoras de una vivienda de 2.400 UF, el subsidio se cae completo. Verifica el precio fiscal de tasación antes de pagar reserva.</p></div></aside>

<h2>DS19 — Integración Social y Territorial</h2>
<p>Subsidio <strong>adicional</strong> que se suma al DS49 o DS01 cuando el proyecto inmobiliario tiene mix social (al menos 20% de unidades destinadas a sectores vulnerables). Aporta hasta <strong>200 UF extra</strong> al beneficiario.</p>
<div class="numeric-example"><div class="numeric-example__title">Combinación DS01 + DS19 — tramo medio</div><ul><li>Subsidio DS01: 520 UF</li><li>Subsidio DS19: 200 UF</li><li>Total subsidio: 720 UF (~$29M)</li><li>Ahorro mínimo: 50 UF (~$2M)</li><li>Capacidad de compra (sin crédito): 770 UF</li><li>Con crédito hipotecario UF 1.000 → vivienda hasta 1.770 UF (~$71,4M)</li></ul><span class="total">El crédito complementario es la palanca: el subsidio cubre el pie</span></div>

<h2>DFL2 — Viviendas Económicas</h2>
<p>El DFL2 (1959, vigente con modificaciones) NO es un subsidio sino un <strong>régimen tributario favorable</strong> para viviendas de hasta 140 m² construidos. Beneficios:</p>
<ul>
<li><strong>50% rebaja en contribuciones</strong> por 15 años desde la construcción.</li>
<li>Exención de impuesto al pago de herencia o donación entre cónyuges/hijos.</li>
<li>Renta de arriendo del DFL2 NO tributa (hasta 2 unidades por contribuyente, Ley 21.420 limitó este beneficio desde 2022).</li>
</ul>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Ley 21.420 limitó el beneficio DFL2 a 2 viviendas por persona natural</strong><p>Antes de 2022 una persona podía tener decenas de DFL2 sin tributar arriendos. Ahora el beneficio aplica solo a las primeras 2 viviendas DFL2 por contribuyente persona natural. Las viviendas DFL2 de personas jurídicas no tienen el beneficio de exención de renta.</p></div></aside>

<h2>Pasos para postular</h2>
<ol class="steps">
<li><strong>Actualizar tu RSH</strong> en chileatiende.gob.cl. El RSH determina tu tramo de vulnerabilidad.</li>
<li><strong>Abrir y mantener libreta de ahorro</strong> en BancoEstado o Coopeuch (mínimo 6 meses para DS49, 12 meses para DS01).</li>
<li><strong>Esperar el llamado</strong> oficial en serviu.cl (semestral).</li>
<li><strong>Postular online</strong> con cédula vigente, libreta y certificado RSH.</li>
<li>Si quedas seleccionado, <strong>tienes 21 meses</strong> para usar el subsidio (renovable una vez).</li>
</ol>
<p>Estima tu subsidio según ingreso y tramo con la <a href="/calculadoras/calculadora-subsidio-habitacional">calculadora de subsidio habitacional</a>. Para simular el dividendo del crédito complementario, usa la <a href="/calculadoras/calculadora-credito-hipotecario">calculadora de crédito hipotecario</a>.</p>
<p>Fuentes: <a href="https://www.minvu.cl" target="_blank" rel="noopener">MINVU</a>, <a href="https://www.serviu.cl" target="_blank" rel="noopener">SERVIU</a>, DS 49/2011, DS 01/2011, DS 19/2016 (todos del MINVU).</p>`,
  },
  {
    slug: 'comparativa-comisiones-afp-2026',
    title: 'Comparativa de comisiones AFP 2026: cuál te conviene',
    seoTitle: 'Comisiones AFP 2026 Chile: la más barata y la más cara',
    seoDescription:
      'Compara las comisiones AFP 2026 en Chile. Revisa cuál AFP cobra menos, cuál cobra más y cuánto impacta en tu sueldo líquido.',
    description:
      'Análisis de las 7 AFP en 2026: comisión, rentabilidad histórica y SIS. Cuánto ahorras al año cambiándote de AFP cara a la más barata.',
    date: '2026-05-16',
    updatedAt: '2026-07-04',
    category: 'previsional',
    readingTime: 7,
    relatedGuia: 'afp-pension-chile',
    keywords: [
      'comisión AFP 2026',
      'cambiar de AFP',
      'AFP Uno 0.46%',
      'AFP Modelo 0.58%',
      'rentabilidad AFP',
      'tope imponible AFP',
      'tasa AFP 10%',
      'AFP más barata Chile',
      'AFP más cara Chile',
      'comisiones AFP 2026 Chile',
    ],
    relatedCalculators: [
      'calculadora-comparador-afp',
      'calculadora-sueldo-liquido',
      'calculadora-cotizacion-independientes',
    ],
    faq: [
      {
        question: '¿Cuál es la AFP más barata en Chile 2026?',
        answer:
          'En 2026, AFP Uno tiene la comisión más baja del mercado chileno, seguida de AFP Modelo. La diferencia entre la más barata y la más cara (ProVida) ronda 1 punto porcentual, lo que para un sueldo de $1.000.000 significa cerca de $10.000 mensuales y más de $100.000 al año. Compara tu caso con la calculadora comparadora de AFPs.',
      },
      {
        question: '¿Cuál es la AFP más cara en Chile?',
        answer:
          'En 2026, ProVida encabeza el ranking de comisiones más altas, seguida por Capital y Cuprum. La comisión se descuenta cada mes de tu sueldo bruto junto al 10% obligatorio que va a tu cuenta individual. Aunque la diferencia parece pequeña, capitalizada a 30 años de vida laboral puede significar varios millones de pesos menos en tu pensión final.',
      },
      {
        question: '¿Conviene cambiarse de AFP por comisión?',
        answer:
          'Para la mayoría de los trabajadores sí, porque la comisión es certera (se descuenta cada mes) mientras que las diferencias de rentabilidad entre AFP en el mismo multifondo suelen ser menores a 0,5 puntos anual. Las excepciones son: si te falta poco para jubilar (prioriza estabilidad) o si estás en multifondos agresivos A o B donde la rentabilidad puede compensar. El cambio es gratuito, se hace en previred.com y no tienes que avisar a tu empleador.',
      },
      {
        question: '¿Cómo me cambio de AFP en Chile?',
        answer:
          'El cambio es gratuito y se hace online: ingresa a previred.com con tu RUT y clave única, selecciona "Cambio de AFP", elige la AFP de destino y confirma. El cambio se hace efectivo el mes siguiente y tu saldo se transfiere automáticamente. No necesitas avisar a tu empleador: PreviRed coordina la cotización con la nueva AFP.',
      },
    ],
    content: `<h2>Las 7 AFP en Chile 2026</h2>
<p>El sistema chileno de pensiones tiene 7 administradoras de fondos de pensiones, cada una con su propia comisión y rentabilidad histórica. La <strong>comisión</strong> es lo que la AFP cobra por administrar tu cuenta y se descuenta de tu sueldo bruto cada mes (sumada al 10% obligatorio que va a tu cuenta individual).</p>
<table>
<thead><tr><th>AFP</th><th>Comisión 2026</th><th>Total descontado al trabajador</th></tr></thead>
<tbody>
<tr><td><strong>Uno</strong></td><td>0,46%</td><td>10,46%</td></tr>
<tr><td>Modelo</td><td>0,58%</td><td>10,58%</td></tr>
<tr><td>Planvital</td><td>1,16%</td><td>11,16%</td></tr>
<tr><td>Habitat</td><td>1,27%</td><td>11,27%</td></tr>
<tr><td>Capital</td><td>1,44%</td><td>11,44%</td></tr>
<tr><td>Cuprum</td><td>1,44%</td><td>11,44%</td></tr>
<tr><td><strong>ProVida</strong></td><td>1,45%</td><td>11,45%</td></tr>
</tbody>
</table>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>La diferencia entre la más cara y la más barata es ~1 punto</strong><p>De la misma renta bruta, AFP Uno descuenta 10,46% y AFP ProVida descuenta 11,45%. Para un sueldo de $1.000.000, la diferencia es $9.900 al mes — $118.800 al año, equivalente a un sueldo líquido extra cada año.</p></div></aside>

<h2>Cuánto ahorras cambiándote de AFP</h2>
<div class="numeric-example"><div class="numeric-example__title">Sueldo $1.500.000 — pasar de Capital (1,44%) a Uno (0,46%)</div><ul><li>Comisión actual Capital: 1,44% × $1.500.000 = $21.600/mes</li><li>Comisión nueva Uno: 0,46% × $1.500.000 = $6.900/mes</li><li>Ahorro mensual: $14.700</li><li>Ahorro anual: $176.400</li><li>Ahorro a 30 años (vida laboral típica): $5.292.000 (sin considerar capitalización)</li></ul><span class="total">Ahorrarte 1 punto en comisión equivale a 1,5 sueldos líquidos al año</span></div>

<h2>¿La AFP más barata es la mejor?</h2>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Comisión vs rentabilidad: cuál pesa más</strong><p>La comisión es certera: descuenta cada mes lo mismo. La rentabilidad varía año a año. Históricamente las diferencias de rentabilidad entre AFP en mismo multifondo son menores a 0,5 puntos anual. La comisión, en cambio, se diferencia por hasta 3 veces. Para la mayoría de los trabajadores, optimizar la comisión rinde más que perseguir rentabilidad.</p></div></aside>
<p>Hay <strong>dos excepciones</strong>: (1) si tienes pensión cercana (5 años o menos), prioriza estabilidad de rentabilidad sobre comisión; (2) si tu fondo está en multifondo agresivo (A o B), las diferencias de rentabilidad pueden ser mayores. Para multifondos C, D o E (conservadores), la comisión domina.</p>

<h2>Cómo cambiarte de AFP</h2>
<ol class="steps">
<li>Ingresa a <a href="https://www.previred.com" target="_blank" rel="noopener">previred.com</a> con tu RUT y clave única.</li>
<li>Selecciona "Cambio de AFP" → escoge la AFP de destino.</li>
<li>Confirma con tu clave única. El cambio se hace efectivo el mes siguiente.</li>
<li>NO tienes que avisar a tu empleador: PreviRed coordina automáticamente.</li>
</ol>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>El SIS NO cambia con la comisión</strong><p>El Seguro de Invalidez y Sobrevivencia (SIS) es 1,62% adicional, lo paga el empleador (no el trabajador), y es el mismo para todas las AFP. Por lo tanto el SIS NO entra en la decisión de cuál AFP elegir.</p></div></aside>

<h2>Tope imponible y comisiones para sueldos altos</h2>
<p>La comisión solo se cobra hasta el tope imponible (90 UF en 2026, ≈$3.674.340). Sueldos sobre el tope pagan la misma comisión absoluta independiente del bruto. Eso significa que la diferencia entre AFPs <strong>se aplana en términos absolutos</strong> para sueldos altos.</p>
<p>Compara las 7 AFPs con tu sueldo específico y proyecta el ahorro a varios años con la <a href="/calculadoras/calculadora-comparador-afp">calculadora comparadora de AFPs</a>.</p>
<p>Fuentes: <a href="https://www.spensiones.cl" target="_blank" rel="noopener">Superintendencia de Pensiones</a>, comisiones publicadas mensualmente.</p>`,
  },
  {
    slug: 'plusvalia-dfl2-vs-comun-chile',
    title: 'Plusvalía DFL2 vs común: ¿cuándo pagas impuesto al vender?',
    description:
      'Diferencias tributarias al vender una vivienda DFL2 vs una común en Chile 2026. Exención 8.000 UF, impuesto único 10% y casos donde DFL2 conviene.',
    date: '2026-05-16',
    updatedAt: '2026-07-04',
    category: 'vivienda',
    readingTime: 6,
    relatedGuia: 'comprar-vivienda-chile',
    keywords: [
      'plusvalía DFL2',
      'plusvalía vivienda común',
      'mayor valor enajenación inmueble',
      'art 17 N°8 LIR',
      'ley 21.210 plusvalía',
      'exención 8000 UF',
      'impuesto único 10%',
    ],
    relatedCalculators: [
      'calculadora-plusvalia',
      'calculadora-credito-hipotecario',
      'calculadora-contribuciones',
    ],
    content: `<h2>Tributación al vender una vivienda en Chile</h2>
<p>Cuando vendes una vivienda en Chile y obtienes una <strong>ganancia</strong> (precio venta &gt; precio compra), esa ganancia puede o no tributar según la normativa del <strong>Art. 17 N°8 letra b) LIR</strong>, modificada por la <strong>Ley 21.210 de 2020</strong>.</p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Resumen: cuatro reglas clave</strong><p>(1) Persona natural + vivienda habitacional: exenta hasta 8.000 UF acumulados de mayor valor en su vida. (2) Sobre el exceso: 10% impuesto único sustitutivo. (3) Persona natural + inmueble no habitacional: 10% sobre toda la ganancia. (4) Persona jurídica: tributación general (IDPC + IGC al socio).</p></div></aside>

<h2>Vivienda DFL2 vs común: ¿hay diferencia tributaria al vender?</h2>
<p>Mucha gente cree que vender una <strong>DFL2</strong> está exento automáticamente. <strong>No es así</strong>. La normativa del Art. 17 N°8 aplica igual a viviendas DFL2 y a viviendas comunes. La diferencia está en otros aspectos:</p>
<table>
<thead><tr><th>Concepto</th><th>Vivienda común</th><th>Vivienda DFL2</th></tr></thead>
<tbody>
<tr><td>Plusvalía exenta (vivienda habitacional)</td><td>Hasta 8.000 UF</td><td>Hasta 8.000 UF (igual)</td></tr>
<tr><td>Plusvalía sobre exceso</td><td>10% sustitutivo</td><td>10% sustitutivo</td></tr>
<tr><td>Renta de arriendo</td><td>Tributa con IGC</td><td>Exenta hasta 2 viviendas (Ley 21.420)</td></tr>
<tr><td>Contribuciones</td><td>Pago normal</td><td>50% rebaja por 15 años</td></tr>
<tr><td>Herencia / donación cónyuge-hijos</td><td>Impuesto progresivo</td><td>Exenta</td></tr>
</tbody>
</table>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>El DFL2 conviene por arriendo y herencia, NO por plusvalía</strong><p>Si comparas dos viviendas idénticas (una DFL2 y una común) con la misma plusvalía, el impuesto al vender es exactamente el mismo. La ventaja del DFL2 está en el arriendo (exento) y la herencia (exenta), no en la enajenación.</p></div></aside>

<h2>Cómo se cuenta la exención 8.000 UF</h2>
<p>La exención de 8.000 UF es <strong>acumulada en la vida del contribuyente</strong>, no por operación. Si vendes 3 viviendas con ganancias de 4.000 UF, 4.000 UF y 4.000 UF, las dos primeras quedan dentro de la exención (8.000 acumulados); la tercera tributa completa.</p>
<div class="numeric-example"><div class="numeric-example__title">Vendiste tu departamento por $250M, comprado en $150M</div><ul><li>Ganancia bruta: $100.000.000</li><li>Equivalente UF (UF julio 2026 $40.826): 100M / 40.826 ≈ 2.450 UF</li><li>Exención disponible: 8.000 UF</li><li>Ganancia gravada: 0 UF (toda absorbida por exención)</li></ul><span class="total">Impuesto a pagar: $0</span></div>
<div class="numeric-example"><div class="numeric-example__title">Mismo caso, pero ya habías usado 7.000 UF de exención</div><ul><li>Ganancia: 2.478 UF</li><li>Exención disponible: 1.000 UF</li><li>Ganancia gravada: 1.478 UF (~$59.648.000)</li><li>Impuesto único 10%: ~$5.964.800</li></ul><span class="total">Impuesto a pagar: $5.964.800</span></div>

<h2>Cómo declarar la exención al SII</h2>
<p>El SII lleva un registro acumulado de exención por contribuyente. Cuando vendes una vivienda, debes:</p>
<ol class="steps">
<li>Reportar la enajenación en el Form. 22 del año tributario siguiente.</li>
<li>Adjuntar escritura de compra, escritura de venta y certificado de avalúo fiscal vigente.</li>
<li>El SII descuenta automáticamente el saldo de la exención disponible.</li>
<li>Si hay impuesto, se paga vía Operación Renta de abril.</li>
</ol>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>Mejoras documentadas reducen la base imponible</strong><p>Las mejoras estructurales documentadas con factura (ampliación, remodelación cocina, baños, instalaciones eléctricas) se restan de la ganancia neta. Guarda todas las facturas: pueden bajar tu impuesto en millones. Reparaciones menores y mantención NO califican.</p></div></aside>

<h2>Persona jurídica: la cosa cambia</h2>
<p>Si la vivienda está a nombre de una sociedad (limitada, SpA, anónima), la exención de 8.000 UF NO aplica. La ganancia tributa íntegramente con el Impuesto de Primera Categoría (25% en 14D, 27% en 14A) y luego con Global Complementario al socio cuando se distribuya. Carga total típica: 35%-44%.</p>
<p>Calcula el impuesto a la plusvalía según vivienda habitacional o de inversión con la <a href="/calculadoras/calculadora-plusvalia">calculadora de plusvalía</a>.</p>
<p>Fuentes: <a href="https://www.bcn.cl/leychile/navegar?idNorma=6368" target="_blank" rel="noopener">Ley sobre Impuesto a la Renta</a> Art. 17 N°8 letra b), <a href="https://www.bcn.cl/leychile/navegar?idNorma=1142667" target="_blank" rel="noopener">Ley 21.210</a> (Modernización Tributaria), <a href="https://www.sii.cl" target="_blank" rel="noopener">SII</a>.</p>`,
  },
  {
    slug: 'cae-renegociacion-condonacion-2026',
    title: 'CAE en 2026: cuota, renegociación y condonación',
    description:
      'Cómo funciona el CAE en 2026: tasa 2% en UF, cuota, renegociación y condonación. Simula tu cuota gratis con la calculadora.',
    date: '2026-05-16',
    updatedAt: '2026-07-08',
    category: 'educacion',
    readingTime: 7,
    relatedGuia: 'credito-cae-educacion-chile',
    keywords: [
      'CAE 2026',
      'simulador CAE 2026',
      'calculadora CAE',
      'cuota CAE',
      'ley 21.605',
      'renegociar CAE',
      'condonación CAE',
      'INGRESA',
      'tasa CAE 2%',
      'pago contingente al ingreso CAE',
    ],
    relatedCalculators: [
      'calculadora-credito-cae',
      'calculadora-uf-clp',
      'calculadora-sueldo-liquido',
      'calculadora-credito-hipotecario',
    ],
    content: `<p>Simula tu cuota ahora en la <a href="/calculadoras/calculadora-credito-cae"><strong>calculadora / simulador CAE 2026</strong></a> (tasa de referencia 2% en UF) y vuelve a esta guía para renegociación y reglas de pago.</p>
<h2>El CAE en 2026: cómo se paga ahora</h2>
<p>Desde la <a href="https://www.bcn.cl/leychile/navegar?idNorma=1196118" target="_blank" rel="noopener">Ley 21.605 (2023)</a>, los créditos CAE operan con reglas de <strong>pago acotado al ingreso</strong> (tope referencial 10% del ingreso bruto) y tasa real en UF. Confirma siempre tu caso en Ingresa: la calculadora estima cuota por monto/tasa/plazo; el tope por ingreso puede bajar la cuota contractual.</p>
<ul class="data-grid"><li><span class="data-grid__label">Cuota máxima</span><span class="data-grid__value">10% del ingreso bruto</span></li><li><span class="data-grid__label">Tasa anual</span><span class="data-grid__value">2% real (sobre UF)</span></li><li><span class="data-grid__label">Plazo máximo</span><span class="data-grid__value">240 cuotas (20 años)</span></li><li><span class="data-grid__label">Saldo a los 20 años</span><span class="data-grid__value">Condonado</span></li></ul>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Si tu ingreso baja, tu cuota baja</strong><p>El nuevo régimen elimina el riesgo de "no poder pagar". Si te quedas sin trabajo, la cuota se suspende. Si tu sueldo baja a $700.000 bruto, la cuota máxima legal es $70.000 — independiente del monto original del crédito.</p></div></aside>

<h2>Cómo recalcular tu cuota cada año</h2>
<p>La Comisión INGRESA recalcula la cuota anualmente con la información del Form. 22 del año tributario anterior:</p>
<ol class="steps">
<li>Tu ingreso bruto del año anterior se obtiene del SII.</li>
<li>La cuota máxima 2026 = 10% × ingreso bruto mensual promedio.</li>
<li>Si tu cuota original (la del crédito a 20 años) supera el 10%, queda topeada al 10%.</li>
<li>El "saldo no pagado" se aplaza, NO se condona automáticamente.</li>
<li>El plazo se extiende hasta 240 cuotas (20 años); pasado eso, el saldo se condona.</li>
</ol>
<div class="numeric-example"><div class="numeric-example__title">Egresada con sueldo bruto $1.200.000 y CAE de UF 1.000</div><ul><li>Cuota original (20 años, 2% anual): ~5,1 UF/mes ≈ $206.000</li><li>Cuota máxima (10% bruto): $120.000</li><li>Cuota efectiva pagada: $120.000 (limitada por ingreso)</li><li>Saldo del mes: ~$86.000 que se aplaza al final del crédito</li></ul><span class="total">Cuota mensual real: $120.000 — el resto se difiere</span></div>

<h2>Renegociación del CAE: cuándo conviene</h2>
<p>Hay tres mecanismos de renegociación disponibles:</p>
<h3>1. Reprogramación con descuento de mora (Ley 21.605)</h3>
<p>Si estás en mora, puedes reprogramar la deuda con descuento de hasta 50% de los intereses moratorios acumulados. Aplicación en <a href="https://www.ingresa.cl" target="_blank" rel="noopener">ingresa.cl</a> con clave única.</p>
<h3>2. Suspensión por desempleo o ingreso bajo</h3>
<p>Si tu ingreso mensual es menor al sueldo mínimo, puedes solicitar suspensión temporal de la cuota. Se mantiene durante el período de cesantía con prórroga máxima de 24 meses.</p>
<h3>3. Pago anticipado</h3>
<p>Pagar el crédito anticipadamente NO genera comisión (Ley 21.605). Si tienes liquidez, prepagar el CAE rinde 2% real anual garantizado, mejor que la mayoría de instrumentos conservadores.</p>

<h2>Estado del proyecto de condonación 2025-2026</h2>
<p>El proyecto de ley de <strong>condonación parcial del CAE</strong> está en segundo trámite constitucional al cierre de mayo 2026. Las propuestas en discusión son:</p>
<ul>
<li><strong>Condonación total</strong> para deudores con CAE pagado correctamente por 10+ años.</li>
<li><strong>Condonación parcial 50%</strong> para deudores con 5-10 años de pago sin atrasos.</li>
<li><strong>Condonación de intereses moratorios</strong> para deudores que se acojan al beneficio antes de una fecha límite (a definir).</li>
<li>Reemplazo del CAE por el nuevo <strong>FES</strong> (Sistema de Financiamiento Público) para nuevas generaciones, administrado directamente por el Estado.</li>
</ul>
<aside class="callout callout--warning"><span class="callout__icon" aria-hidden="true">⚠️</span><div class="callout__body"><strong>No tomes decisiones en base a expectativas de condonación</strong><p>El proyecto puede modificarse, postergarse o no aprobarse. Mantén pago al día y suscríbete a las actualizaciones de INGRESA. Si calificas para reprogramación con descuento bajo el régimen actual, no esperes: gana certeza ahora.</p></div></aside>

<h2>Si te quedaste sin pagar: el Registro de Morosidad</h2>
<p>Estar en el Registro de Morosidad CAE tiene consecuencias serias: aparecen en boletín comercial, retención automática del 50% de devolución de impuestos vía SII y no pueden renovar pasaporte ni licencia de conducir hasta acordar pago. Para salir del registro hay que pagar al menos 6 meses consecutivos sin atrasos.</p>
<p>Calcula tu cuota actual y simula renegociaciones con la <a href="/calculadoras/calculadora-credito-cae">calculadora de crédito CAE</a>. Para estimar mora si estás atrasado, usa la <a href="/calculadoras/calculadora-intereses-mora">calculadora de intereses por mora</a>.</p>
<p>Fuentes: <a href="https://www.ingresa.cl" target="_blank" rel="noopener">Comisión INGRESA</a>, <a href="https://www.bcn.cl/leychile/navegar?idNorma=1196118" target="_blank" rel="noopener">Ley 21.605</a>, <a href="https://www.bcn.cl/leychile/navegar?idNorma=240080" target="_blank" rel="noopener">Ley 20.027</a> (CAE original).</p>`,
  },
  {
    slug: 'tope-imponible-2026',
    title: 'Tope imponible 90 UF: qué es y por qué importa en 2026',
    seoTitle: 'Tope Imponible 2026 en Chile: AFP, salud y cesantía',
    seoDescription:
      'Revisa el tope imponible 2026 para AFP, salud y seguro de cesantía, con valores en UF, equivalente en pesos y ejemplos.',
    description:
      'Qué es el tope imponible AFP/salud (90 UF en 2026), cómo se ajusta cada año y por qué reduce las cotizaciones efectivas para sueldos altos.',
    date: '2026-05-16',
    updatedAt: '2026-07-04',
    category: 'previsional',
    readingTime: 5,
    relatedGuia: 'sueldo-liquido-chile',
    keywords: [
      'tope imponible 90 UF',
      'tope cesantía 135.2 UF',
      'imponible AFP salud',
      'D.L. 3500 art 16',
      'sueldo alto Chile',
      'cotización tope',
      'remuneración tope',
      'tope imponible 2026',
      'tope imponible julio 2026',
    ],
    relatedCalculators: [
      'calculadora-sueldo-liquido',
      'calculadora-comparador-afp',
      'calculadora-cotizacion-independientes',
      'calculadora-costo-empleado-pyme',
    ],
    faq: [
      {
        question: '¿Cuál es el tope imponible 2026 en Chile?',
        answer:
          'El tope imponible 2026 para AFP y salud es de 90 UF mensuales (aproximadamente $3.674.340 con UF de julio 2026). El tope de cesantía es distinto y más alto: 135,2 UF mensuales (aproximadamente $5.519.635). Si tu sueldo bruto supera el tope, las cotizaciones se calculan solo hasta ese monto, no sobre el total.',
      },
      {
        question: '¿Cómo afecta el tope imponible a mi sueldo líquido?',
        answer:
          'Para sueldos bajo el tope (la mayoría), no hay efecto: cotizas sobre el bruto completo. Para sueldos sobre el tope, el porcentaje efectivo de cotización cae a medida que sube el bruto. Por ejemplo, con AFP Habitat (1,27%): un sueldo de $3.000.000 paga 11,27% efectivo, pero un sueldo de $5.000.000 paga solo 8,17% efectivo porque las cotizaciones se calculan sobre $3.674.340 (el tope), no sobre los $5M.',
      },
      {
        question: '¿Cuándo se actualiza el tope imponible?',
        answer:
          'El tope se reajusta cada febrero por la Superintendencia de Pensiones, aplicando la variación real de las remuneraciones del país (Índice de Remuneraciones Reales del INE, no IPC). Histórico: 2023 = 83,4 UF, 2024 = 84,3 UF, 2025 = 87,8 UF, 2026 = 90 UF. Si el ISR es negativo, el tope podría bajar.',
      },
      {
        question: '¿El tope imponible aplica a trabajadores independientes?',
        answer:
          'Sí. Los trabajadores independientes (boletas de honorarios bajo Ley 21.133) cotizan sobre el 80% de su renta bruta anual, también con tope mensual de 90 UF. La base imponible mensual = (renta anual × 0,8) ÷ 12, hasta el tope. Por eso los altos ingresos requieren APV o ahorro complementario para mantener el nivel de vida al jubilar.',
      },
    ],
    content: `<h2>¿Qué es el tope imponible?</h2>
<p>El <strong>tope imponible</strong> es el monto máximo de remuneración mensual sobre el cual se calculan las cotizaciones obligatorias de AFP y salud (FONASA o Isapre). Es decir: si tu sueldo bruto supera el tope, las cotizaciones se calculan solo hasta ese tope, y la porción que excede no cotiza.</p>
<aside class="callout callout--legal"><span class="callout__icon" aria-hidden="true">⚖️</span><div class="callout__body"><strong>D.L. 3500, Art. 16</strong><p>"La remuneración y renta máximas mensuales sobre las que se efectúan las cotizaciones obligatorias se reajustarán anualmente, en el mes de febrero, considerando la variación anual del Índice de Remuneraciones Reales (ISR) determinado por el INE."</p></div></aside>
<ul class="data-grid"><li><span class="data-grid__label">Tope AFP/Salud 2026</span><span class="data-grid__value">90 UF mensuales</span></li><li><span class="data-grid__label">Equivalente CLP (UF julio 2026)</span><span class="data-grid__value">~$3.674.340</span></li><li><span class="data-grid__label">Tope cesantía 2026</span><span class="data-grid__value">135,2 UF mensuales</span></li><li><span class="data-grid__label">Equivalente CLP cesantía</span><span class="data-grid__value">~$5.519.635</span></li></ul>

<h2>Cómo se actualiza cada año</h2>
<p>El tope se reajusta cada febrero por la <strong>Superintendencia de Pensiones</strong> aplicando la variación real de las remuneraciones del país (ISR del INE). Histórico reciente:</p>
<table>
<thead><tr><th>Año</th><th>Tope AFP/Salud</th><th>Tope Cesantía</th></tr></thead>
<tbody>
<tr><td>2023</td><td>83,4 UF</td><td>125,1 UF</td></tr>
<tr><td>2024</td><td>84,3 UF</td><td>126,5 UF</td></tr>
<tr><td>2025</td><td>87,8 UF</td><td>131,9 UF</td></tr>
<tr><td><strong>2026</strong></td><td><strong>90 UF</strong></td><td><strong>135,2 UF</strong></td></tr>
</tbody>
</table>

<h2>Cómo afecta tu sueldo líquido</h2>
<p>Para sueldos <strong>bajo el tope</strong> (la mayoría de los trabajadores chilenos), el tope no tiene efecto: cotizan sobre el bruto completo. Para sueldos <strong>sobre el tope</strong>, el porcentaje efectivo de cotización cae a medida que sube el bruto.</p>
<div class="numeric-example"><div class="numeric-example__title">Comparación: bruto $3.000.000 vs $5.000.000 (AFP Habitat 1,27%)</div><ul><li>Sueldo $3M (bajo tope): AFP descuenta 11,27% × $3M = $338.100 (11,27% efectivo)</li><li>Sueldo $5M (sobre tope $3,63M): AFP descuenta 11,27% × $3.674.340 = $408.711 (8,17% efectivo)</li></ul><span class="total">Sueldo más alto, descuento previsional efectivo más bajo</span></div>
<aside class="callout callout--tip"><span class="callout__icon" aria-hidden="true">💡</span><div class="callout__body"><strong>Por eso los altos ingresos requieren APV o ahorro complementario</strong><p>Si tu sueldo supera el tope, tu pensión futura quedará anclada al tope (no a tu sueldo real). Para mantener el nivel de vida en la jubilación necesitas APV (Régimen B) o ahorro voluntario en otro instrumento. La diferencia se nota a los 65: pensión sobre 90 UF sin APV vs sobre tu bruto real con APV.</p></div></aside>

<h2>Tope imponible para independientes</h2>
<p>Los <strong>trabajadores independientes</strong> (boletas de honorarios bajo Ley 21.133) cotizan sobre el 80% de su renta bruta anual, también con tope mensual de 90 UF. La base imponible mensual = (renta anual × 0,8) ÷ 12, hasta el tope.</p>

<h2>Tope cesantía: distinto y más alto</h2>
<p>El <strong>seguro de cesantía</strong> tiene tope propio (135,2 UF en 2026), mucho más alto que el de AFP/salud. Esto fue cambio reciente: hasta 2017 el tope cesantía era el mismo que AFP. La idea fue dar mayor cobertura a sueldos medios-altos en caso de cesantía (subsidio del Fondo Solidario).</p>

<h2>Por qué cambia cada año</h2>
<p>El tope se ajusta por <strong>variación real de las remuneraciones</strong> (ISR), no por IPC. La diferencia es importante: en 2025 el ISR fue ~+2,4% real (las remuneraciones crecieron por encima de la inflación), por eso el tope subió de 87,8 a 90 UF (+2,4%). Si el ISR hubiera sido negativo, el tope habría bajado.</p>
<p>Calcula tu cotización efectiva considerando el tope con la <a href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</a> o la <a href="/calculadoras/calculadora-cotizacion-independientes">calculadora de cotización independiente</a>.</p>
<p>Fuentes: <a href="https://www.spensiones.cl" target="_blank" rel="noopener">Superintendencia de Pensiones</a>, <a href="https://www.bcn.cl/leychile/navegar?idNorma=7147" target="_blank" rel="noopener">D.L. 3500 Art. 16</a>, <a href="https://www.ine.cl" target="_blank" rel="noopener">INE — Índice de Remuneraciones Reales</a>.</p>`,
  },
];

// ============================================
// Helpers
// ============================================

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedCalculators(article: Article): string[] {
  return article.relatedCalculators;
}
