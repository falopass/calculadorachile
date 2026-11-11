// ============================================
// E-023 + E-025: guía /guias/licencia-medica-chile
// ----------------------------------------------
// Texto publicable del borrador 2026-11-10 (versión noche, criterio
// §§ 10 y 11 del Compendio). Las cifras del ejemplo salen de
// calculateLicenciaMedica, INGRESO_MINIMO y formatCLP. Sin schema
// FAQPage y sin CvListo.
// ============================================

import type { Guia } from './guias';
import { formatCLP } from '@/lib/formatters';
import { calculateLicenciaMedica } from '@/lib/calculations/licencia-medica';
import { INGRESO_MINIMO } from '@/lib/values/constants';

const LICENCIA_GUIA_NETA = 900_000;
const LICENCIA_GUIA_15 = calculateLicenciaMedica({
  remuneracionNetaPromedio: LICENCIA_GUIA_NETA,
  diasLicencia: 15,
});
const LICENCIA_GUIA_10 = calculateLicenciaMedica({
  remuneracionNetaPromedio: LICENCIA_GUIA_NETA,
  diasLicencia: 10,
});
const MINIMO_DIARIO = Math.round((INGRESO_MINIMO.no_remuneracional * 0.5) / 30);

const DT_95277 = 'https://www.dt.gob.cl/portal/1628/w3-article-95277.html';
const DT_60141 = 'https://www.dt.gob.cl/portal/1628/w3-article-60141.html';
const DT_60542 = 'https://www.dt.gob.cl/portal/1628/w3-article-60542.html';
const DT_95288 = 'https://www.dt.gob.cl/portal/1628/w3-article-95288.html';
const DT_ORD_595 = 'https://www.dt.gob.cl/legislacion/1624/w3-article-114571.html';
const SUSESO_568 = 'https://www.suseso.gob.cl/606/w3-propertyvalue-568.html';
const SUSESO_19931 = 'https://www.suseso.gob.cl/606/w3-article-19931.html';
const SUSESO_19217 = 'https://www.suseso.gob.cl/606/w3-article-19217.html';
const SUSESO_599 = 'https://www.suseso.gob.cl/606/w3-propertyvalue-599.html';
const SUSESO_ART_168 = 'https://www.suseso.gob.cl/612/w3-propertyvalue-173277.html';
const SUSESO_60340 = 'https://www.suseso.gob.cl/612/w3-article-36015.html';
const SUSESO_COMPENDIO_PDF = 'https://www.suseso.gob.cl/622/articles-761354_archivo_03.pdf';
const SUSESO_COMPENDIO_6_2 = 'https://www.suseso.gob.cl/622/w3-propertyvalue-768473.html';
const SUSESO_COMPENDIO_REPOSICION = 'https://www.suseso.gob.cl/622/w3-propertyvalue-774962.html';
const SUSESO_PLAZOS_TRABAJADOR = 'https://www.suseso.gob.cl/622/alt-propertyvalue-774938.pdf';
const SUSESO_PLAZOS_COMPIN = 'https://www.suseso.gob.cl/622/alt-propertyvalue-774943.pdf';
const SUSESO_CIRCULAR_3917 = 'https://www.suseso.gob.cl/605/w3-article-786199.html';
const SUSESO_BOLETIN_21746 = 'https://www.suseso.gob.cl/612/w3-article-773030.html';
const SUSESO_DFL44_ART15 = 'https://www.suseso.gob.cl/612/w3-propertyvalue-222055.html';
const SUSESO_DFL44_ART20 = 'https://www.suseso.gob.cl/612/w3-propertyvalue-222060.html';
const BCN_DFL44 = 'https://www.bcn.cl/leychile/navegar?idNorma=4252';
const BCN_DS3 = 'https://www.bcn.cl/leychile/navegar?idNorma=7281';
const BCN_LEY_16744 = 'https://www.bcn.cl/leychile/navegar?idNorma=28650';
const SUPER_SALUD_3468 =
  'https://www.superdesalud.gob.cl/tax-materias-isapres/licencias-medicas-y-subsidios-por-incapacidad-laboral-3468/';
const CHILEATIENDE_682 = 'https://www.chileatiende.gob.cl/fichas/682';
const SALUD_RESPONDE_21746 =
  'https://saludresponde.minsal.cl/ley-n21-746-modifica-normativa-sobre-licencias-medicas/';

const ext = (href: string, text: string) =>
  `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
const int = (href: string, text: string) => `<a href="${href}">${text}</a>`;

export const guiaLicenciaMedica: Guia = {
  slug: 'licencia-medica-chile',
  title: 'Licencia médica en Chile 2026: quién paga, desde qué día y cómo se cobra',
  intent: '¿Quién me paga la licencia médica, desde qué día y qué hago si me la rechazan?',
  description:
    'Quién paga tu licencia (Compin, Caja o Isapre), desde qué día, plazos para entregarla, cuándo pagan y cómo reclamar si la rechazan. SUSESO y DT.',
  category: 'laboral',
  categoryLabel: 'Laboral y sueldo',
  keywords: [
    'pago licencia médica',
    'cómo se pagan las licencias médicas',
    'quién paga la licencia médica',
    'plazo para presentar licencia médica',
    'licencia médica rechazada',
    'despido con licencia médica',
    'trabajar con licencia médica',
  ],
  publishedAt: '2026-11-10',
  updatedAt: '2026-11-10',
  readingTime: 12,
  embedCalculatorId: 'licencia-medica',
  sections: [
    {
      id: 'resumen',
      title: 'Resumen',
      level: 2,
      html: `<p><em>Actualizado el 10 de noviembre de 2026.</em></p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Alcance YMYL</strong><p>Esta guía ordena plazos, quién paga y cómo reclamar en el subsidio de origen común de Fonasa e Isapre. Es información de orientación; no determina tu caso ni reemplaza la resolución de la COMPIN, la Isapre, la SUSESO o la Dirección del Trabajo. Prevalecen tu licencia autorizada, tu régimen y las fuentes oficiales citadas.</p></div></aside>
<p>Esta guía describe el subsidio por incapacidad laboral (SIL) de origen común en el régimen general de Fonasa e Isapre, sobre todo para trabajadores dependientes del sector privado. No calcula el subsidio de un accidente del trabajo ni de una enfermedad profesional (Ley 16.744). En el sector público y municipal, quienes tienen estatuto especial suelen mantener la remuneración durante la licencia, no este subsidio. Las personas trabajadoras independientes pueden acceder al SIL, pero con otros requisitos de afiliación y cotización.</p>
<p>Si tienes Fonasa, el subsidio de origen común lo paga la COMPIN (por BancoEstado), o la Caja de Compensación si tu empleador está afiliado a una. Si tienes Isapre, lo paga la Isapre (${ext(SUSESO_COMPENDIO_PDF, 'SUSESO, Compendio')}). Esa tabla no describe el pago de una mutualidad o del Instituto de Seguridad Laboral, ni la mantención de remuneración de un estatuto especial.</p>
<p>Cuando la licencia de origen común dura más de 10 días, el subsidio se paga desde el día 1. Si dura 10 días o menos, se paga desde el 4.º día (${ext(DT_95277, 'DT')}; ${ext(SUSESO_568, 'SUSESO')}). El empleador no está obligado a cubrir los 3 primeros días en ese caso. Si una licencia de 10 días o menos es seguida de inmediato por otra con el mismo diagnóstico, se consideran una sola licencia para contar los días de subsidio y calcular el monto: si en conjunto superan los 10 días, el subsidio se determina desde el día 1, también el de la primera licencia (${ext(SUSESO_568, 'SUSESO')}; ${ext(SUSESO_19931, 'SUSESO 19931')}).</p>
<p>Ejemplo, en el régimen general de origen común: con una remuneración neta promedio de ${formatCLP(LICENCIA_GUIA_NETA)}, 15 días de licencia equivalen a <strong>${formatCLP(LICENCIA_GUIA_15.totalSubsidio)}</strong>. Con 10 días, si no hay una continuación que cambie el conteo, se pagan ${LICENCIA_GUIA_10.diasPagados}, es decir <strong>${formatCLP(LICENCIA_GUIA_10.totalSubsidio)}</strong>. ${int('/calculadoras/calculadora-licencia-medica', 'Calcula cuánto te pagan')}.</p>`,
    },
    {
      id: 'quien-paga',
      title: '¿Quién paga la licencia médica?',
      level: 2,
      html: `<p>La tabla siguiente es la del SIL de origen común en Fonasa o Isapre.</p>
<table>
<thead><tr><th>Situación</th><th>Quién paga</th><th>Dónde se cobra</th></tr></thead>
<tbody>
<tr><td>Fonasa, empleador sin Caja de Compensación</td><td>COMPIN</td><td>BancoEstado, por caja o transferencia si la pediste</td></tr>
<tr><td>Fonasa, empleador afiliado a una Caja</td><td>Caja de Compensación</td><td>La Caja</td></tr>
<tr><td>Isapre</td><td>La Isapre</td><td>La Isapre</td></tr>
</tbody>
</table>
<p>Un convenio entre el empleador y la entidad pagadora cubre solo el subsidio. Las cotizaciones previsionales las paga siempre la entidad. Si hay problemas con el empleador o con un exempleador, la primera obligada a pagar el subsidio es la entidad (${ext(SUSESO_COMPENDIO_PDF, 'SUSESO, Compendio')}).</p>
<p>En el caso de los trabajadores del sector público y municipal afectos a estatutos especiales, durante la licencia médica tienen derecho a la mantención de la remuneración según las normas de su estatuto (${ext(SUSESO_60340, 'SUSESO, dictamen 60340-2009')}). Esa situación no se calcula aquí.</p>
<p>Si la incapacidad viene de un accidente del trabajo o de una enfermedad profesional, el subsidio lo paga la mutualidad o el Instituto de Seguridad Laboral, desde el día del accidente o de la comprobación de la enfermedad, no la COMPIN, la Caja ni la Isapre de esta tabla (${ext(BCN_LEY_16744, 'Ley 16.744, art. 31')}). Esta guía y la calculadora no estiman ese subsidio.</p>`,
    },
    {
      id: 'desde-que-dia',
      title: '¿Desde qué día se paga?',
      level: 2,
      html: `<p>En el SIL de origen común, con 10 días o menos de licencia el subsidio se paga desde el 4.º día. Con más de 10 días, se paga desde el día 1 (${ext(DT_95277, 'DT 95277')}; ${ext(SUSESO_568, 'SUSESO')}). Por eso, 10 días se traducen en 7 días pagados, y 11 días, en 11, salvo que una licencia posterior con el mismo diagnóstico se sume a la anterior y cambie el conteo, como se explicó arriba.</p>
<p>Esa carencia de 3 días no es la regla del subsidio de la Ley 16.744 por accidente del trabajo o enfermedad profesional, que se paga desde el día del accidente o de la comprobación de la enfermedad.</p>
<p>La ${int('/calculadoras/calculadora-licencia-medica', 'calculadora de licencia médica')} tiene la tabla de 1 a 15 días del régimen general de origen común; esta guía no la duplica.</p>`,
    },
    {
      id: 'cuanto-me-pagan',
      title: '¿Cuánto me pagan?',
      level: 2,
      html: `<p>En el SIL de origen común, el subsidio diario es 1/30 de la remuneración neta promedio de los 3 meses calendario anteriores al inicio de la licencia (${ext(SUSESO_568, 'SUSESO')}).</p>
<p>Hay un mínimo diario equivalente a la trigésima parte del 50% del ingreso mínimo para efectos no remuneracionales. Con el valor vigente de ${formatCLP(INGRESO_MINIMO.no_remuneracional)} (Ley 21.830; ${ext(DT_60141, 'DT 60141')}), ese piso es <strong>${formatCLP(MINIMO_DIARIO)}</strong> en el régimen general de trabajadores dependientes, cualquiera sea el origen del subsidio (común o maternal). La calculadora lo aplica en ese régimen. Este piso no rige para el independiente de Fonasa obligado a cotizar que optó por cobertura parcial: si el cálculo da un valor menor, recibe ese valor y no el mínimo (${ext(SUSESO_COMPENDIO_PDF, 'Compendio SUSESO')}, Título II, 5.1). Quienes optaron por cobertura total y quienes cotizan voluntariamente sí tienen el mínimo (Compendio, 5.1 y 5.3; ${ext(SUSESO_568, 'SUSESO 568')}).</p>
<p>Ejemplo con una neta promedio de ${formatCLP(LICENCIA_GUIA_NETA)}: ${formatCLP(LICENCIA_GUIA_15.montoDiario)} por día. Diez días, sin una continuación que cambie el conteo, = ${LICENCIA_GUIA_10.diasPagados} pagados = ${formatCLP(LICENCIA_GUIA_10.totalSubsidio)}. Quince días = ${formatCLP(LICENCIA_GUIA_15.totalSubsidio)}.</p>
<p>Para ver el descuento en una liquidación, también puedes usar la ${int('/guias/sueldo-liquido-chile', 'guía de sueldo líquido')}.</p>`,
    },
    {
      id: 'requisitos',
      title: 'Requisitos para recibir el subsidio',
      level: 2,
      html: `<p>Para trabajadores dependientes del sector privado, en general se piden 6 meses de afiliación previsional anteriores al mes en que se inicia la licencia y 3 meses de cotizaciones (equivalentes a 90 días) dentro de los 6 meses anteriores a la fecha inicial. Si te contratan por día, por turnos o por jornadas, basta 1 mes de cotizaciones, además de los 6 meses de afiliación (${ext(DT_95288, 'DT 95288')}; ${ext(SUSESO_568, 'SUSESO')}; DFL 44, art. 4).</p>
<p>Esas exigencias de afiliación y cotización no se piden si la incapacidad laboral es causada por un accidente, aunque no sea un accidente del trabajo (${ext(SUPER_SALUD_3468, 'Superintendencia de Salud')}; ${ext(SUSESO_60340, 'SUSESO, dictamen 60340-2009')}, que cita el art. 6 del DFL 44). Esa excepción habla de los requisitos para tener derecho al subsidio, no de la carencia de los 3 primeros días.</p>
<p>Las personas trabajadoras independientes no se rigen por la regla de 6 meses de afiliación y 3 de cotizaciones. Para el SIL necesitan, en lo sustancial, una licencia autorizada, 12 meses de afiliación a salud anteriores al mes en que se inicia la licencia, al menos 6 meses de cotizaciones (continuas o discontinuas) dentro de esos 12 meses, y estar al día en el pago de las cotizaciones (se considera al día quien pagó la cotización del mes anterior a la incapacidad) (${ext(SUSESO_568, 'SUSESO')}; DFL 1 de 2005 del Ministerio de Salud, art. 149).</p>`,
    },
    {
      id: 'plazos',
      title: 'Plazos: entregar, tramitar y resolver la licencia',
      level: 2,
      html: `<table>
<thead><tr><th>Quién</th><th>Plazo</th></tr></thead>
<tbody>
<tr><td>Trabajador del sector privado (licencia en papel)</td><td>2 días hábiles, desde el día hábil siguiente al inicio del reposo</td></tr>
<tr><td>Trabajador del sector público (licencia en papel)</td><td>3 días hábiles, desde el día hábil siguiente al inicio del reposo</td></tr>
<tr><td>Trabajador independiente</td><td>2 días hábiles siguientes a la fecha de inicio del reposo</td></tr>
<tr><td>Empleador (licencia electrónica)</td><td>3 días hábiles desde que la recibe</td></tr>
<tr><td>COMPIN, para resolver</td><td>7 días hábiles (más 7 si requiere un estudio especial)</td></tr>
<tr><td>Isapre, para resolver</td><td>3 días hábiles desde que la recibe</td></tr>
</tbody>
</table>
<p>Con licencia electrónica, el plazo del trabajador se cumple con la emisión. Si el empleador la tramita fuera de plazo, la entidad le paga igual al trabajador y después le cobra al empleador (${ext(SUSESO_19217, 'SUSESO 19217')}).</p>
<p>Fuentes de los plazos: ${ext(BCN_DS3, 'DS 3/1984, art. 11')}, ${ext(SUSESO_599, 'SUSESO 599')}, ${ext(SUSESO_PLAZOS_TRABAJADOR, 'Compendio, plazos del trabajador y del empleador')} y ${ext(SUSESO_PLAZOS_COMPIN, 'Compendio, plazos de COMPIN e Isapre')}.</p>`,
    },
    {
      id: 'cuando-pagan',
      title: '¿Cuándo pagan la licencia?',
      level: 2,
      html: `<p>El subsidio se paga al menos con la misma periodicidad que la remuneración, y el intervalo entre pagos no puede ser, en caso alguno, superior a un mes (${ext(SUSESO_DFL44_ART20, 'DFL 44, art. 20')}; ${ext(BCN_DFL44, 'BCN')}). El subsidio de la primera licencia debe pagarse dentro de los 30 días contados desde la recepción de ese instrumento; el de las licencias siguientes, con la periodicidad de la remuneración, sin que el intervalo pueda ser superior a un mes (${ext(SUSESO_COMPENDIO_6_2, 'Compendio SUSESO 6.2')}). Esa regla de 30 días se cuenta desde la recepción, no desde el inicio ni desde la emisión de la licencia.</p>`,
    },
    {
      id: 'contrato-durante-licencia',
      title: '¿Qué pasa si termina mi contrato durante la licencia?',
      level: 2,
      html: `<p>Si el reposo ya había empezado antes del día en que termina el contrato, el subsidio se mantiene hasta que esa licencia termine, aunque el contrato expire (${ext(SUSESO_DFL44_ART15, 'DFL 44, art. 15')}; ${ext(BCN_DFL44, 'BCN')}). También pueden autorizarse licencias posteriores presentadas cuando la persona ya está cesante, si ese reposo se inició antes del término, sin solución de continuidad y por el mismo diagnóstico o cuadro clínico (incluidas las continuadas). Debe rechazarse, en cambio, la licencia emitida el mismo día del término o después que no es continuación de ese reposo, aun cuando declare una fecha de inicio anterior al término. Esta regla no aplica a funcionarios públicos ni a quienes tienen un estatuto especial (${ext(SUSESO_COMPENDIO_PDF, 'Compendio SUSESO')}, §§ 5, 10 y 11). Es especialmente relevante en diciembre, cuando vencen muchos contratos a plazo fijo. Si te despiden, revisa también el ${int('/blog/checklist-despues-despido-chile-2026', 'checklist después de un despido')}.</p>`,
    },
    {
      id: 'licencia-rechazada',
      title: 'Licencia rechazada: cómo reclamar',
      level: 2,
      html: `<ol>
<li>Si la rechazó la Isapre, puedes reclamar ante la COMPIN dentro de <strong>15 días hábiles</strong> desde que recibes la resolución (${ext(CHILEATIENDE_682, 'ChileAtiende 682')}; ${ext(SUPER_SALUD_3468, 'Superintendencia de Salud')}).</li>
<li>Ante la COMPIN, puedes presentar un recurso de reposición dentro de <strong>5 días</strong> desde la notificación. La COMPIN resuelve en un plazo no superior a 30 días (${ext(SUSESO_COMPENDIO_REPOSICION, 'SUSESO, Compendio')}).</li>
<li>Ante la SUSESO, el plazo es de <strong>6 meses corridos</strong> desde el término de cada licencia, después de agotar la vía ante la COMPIN (${ext(SUSESO_CIRCULAR_3917, 'SUSESO, Circular 3917')}).</li>
</ol>`,
    },
    {
      id: 'despido-con-licencia',
      title: '¿Me pueden despedir estando con licencia médica?',
      level: 2,
      html: `<p>No te pueden despedir por necesidades de la empresa ni por desahucio (artículo 161 del Código del Trabajo) mientras estás con licencia, y tampoco pueden darte el aviso en ese periodo. Según la Dirección del Trabajo, ese aviso o despido no produce efecto (${ext(DT_ORD_595, 'DT, ORD. 595 de 2018')}).</p>
<p>Si el aviso te lo dieron antes de la licencia, el plazo del preaviso se suspende mientras dura el reposo, también si la licencia es de origen común, maternal, por accidente del trabajo o por enfermedad profesional (${ext(DT_60542, 'DT 60542')}).</p>
<p>Para un caso concreto, la vía es la Inspección del Trabajo. Si además te corresponde un finiquito, puedes usar la ${int('/calculadoras/calculadora-finiquito', 'calculadora de finiquito')}.</p>`,
    },
    {
      id: 'trabajar-con-licencia',
      title: '¿Qué pasa si trabajo estando con licencia?',
      level: 2,
      html: `<p>Trabajar durante el reposo puede llevar al rechazo o a la invalidación de la licencia (Decreto Supremo 3 de 1984 del Ministerio de Salud, artículo 55 letra b) y a devolver lo que se haya pagado (artículo 63). El empleador debe gestionar esa devolución (${ext(BCN_DS3, 'BCN, DS 3/1984')}). Eso no es, por sí solo, el delito de simulación o engaño.</p>
<p>Quienes, sin ser beneficiarios, obtengan mediante simulación o engaño los beneficios de este régimen, o quienes siendo beneficiarios obtengan así un beneficio mayor que el que les corresponde, pueden ser sancionados con reclusión menor en sus grados mínimo a medio. La misma sanción alcanza a quienes faciliten los medios para cometer esos delitos (${ext(SUSESO_ART_168, 'DFL 1 de 2005 del Ministerio de Salud, art. 168')}). La normativa sobre licencias también contempla el uso malicioso de documentos falsos; esta guía no publica montos de multa (${ext(SALUD_RESPONDE_21746, 'Salud Responde')}).</p>
<p>Las sanciones nuevas de la Ley 21.746 apuntan a quienes emiten licencias y a quienes las contralorean, no al trabajador que pregunta por su subsidio (${ext(SUSESO_BOLETIN_21746, 'SUSESO')}).</p>`,
    },
    {
      id: 'ley-21746',
      title: 'Ley 21.746: qué cambió',
      level: 2,
      html: `<ul>
<li>Desde el 23 de agosto de 2025, solo pueden emitir licencias los profesionales inscritos en el Registro Nacional de Prestadores Individuales (RNPI).</li>
<li>Desde el 24 de mayo de 2026, se exige el EUNACOM a los médicos titulados desde el 19 de abril de 2009.</li>
<li>La licencia electrónica es la modalidad principal; la de papel queda como excepción.</li>
</ul>
<p>Fuentes: ${ext(SUSESO_BOLETIN_21746, 'SUSESO, Boletín 2026 n.º 1')} y ${ext(SALUD_RESPONDE_21746, 'Salud Responde')}.</p>`,
    },
    {
      id: 'preguntas-frecuentes',
      title: 'Preguntas frecuentes',
      level: 2,
      html: `<h3>¿Quién paga la licencia médica si tengo Fonasa?</h3>
<p>En el subsidio de origen común, la COMPIN, por BancoEstado, si tu empleador no está en una Caja de Compensación. Si está afiliado a una Caja, paga la Caja. Eso no describe un accidente del trabajo (mutualidad o ISL) ni el caso de un funcionario que mantiene la remuneración según su estatuto.</p>
<h3>¿Cuál es el plazo para presentar una licencia médica?</h3>
<p>En el sector privado, 2 días hábiles (en papel). En el sector público, 3 días hábiles. Si la licencia es electrónica, el plazo del trabajador se cumple al emitirla. La persona trabajadora independiente tiene un plazo de 2 días hábiles siguientes a la fecha de inicio del reposo (DS 3, art. 11).</p>
<h3>¿Cómo cobro mi licencia médica?</h3>
<p>Según quién pague: BancoEstado (COMPIN), la Caja de Compensación o la Isapre, en el régimen general de origen común. El subsidio de la primera licencia debe pagarse dentro de los 30 días contados desde la recepción de ese instrumento, no desde el inicio ni desde la emisión. El de las licencias siguientes se paga al menos con la misma periodicidad que tu sueldo, y el intervalo entre pagos no puede ser superior a un mes.</p>
<h3>¿Qué hago si me rechazan la licencia médica?</h3>
<p>Si la rechazó la Isapre, reclama ante la COMPIN en 15 días hábiles. Ante la COMPIN puedes pedir reposición en 5 días. Después puedes ir a la SUSESO, en 6 meses corridos desde el término de esa licencia.</p>
<h3>¿Me pueden despedir estando con licencia médica?</h3>
<p>No por necesidades de la empresa ni por desahucio (artículo 161), y no pueden darte el aviso mientras dura la licencia.</p>
<h3>¿Me pueden multar por trabajar con licencia?</h3>
<p>Trabajar en reposo puede significar que rechacen o invaliden la licencia y que debas devolver el subsidio. Eso es distinto de la responsabilidad penal por simulación, engaño o uso malicioso de documentos falsos. Esta guía no publica montos de multa.</p>
<h3>Si me finiquitan, ¿sigo recibiendo el subsidio?</h3>
<p>Si el reposo ya había empezado antes del día en que termina el contrato, el subsidio se mantiene hasta que esa licencia termine, aunque el contrato expire. También pueden autorizarse licencias posteriores presentadas cuando la persona ya está cesante, si ese reposo se inició antes del término, sin solución de continuidad y por el mismo diagnóstico o cuadro clínico (incluidas las continuadas). Debe rechazarse, en cambio, la licencia emitida el mismo día del término o después que no es continuación de ese reposo, aun cuando declare una fecha de inicio anterior al término. Esta regla no aplica a funcionarios públicos ni a quienes tienen un estatuto especial.</p>
<h3>¿La regla de los 3 días de carencia vale también para un accidente del trabajo?</h3>
<p>No. El subsidio de la Ley 16.744 se paga desde el día del accidente o de la comprobación de la enfermedad, por la mutualidad o el ISL. Esta calculadora no lo estima.</p>
<h3>¿Los independientes tienen los mismos requisitos que un dependiente?</h3>
<p>No. En lo sustancial necesitan 12 meses de afiliación a salud, al menos 6 meses de cotizaciones dentro de ese periodo y estar al día, además de la licencia autorizada. No se les aplica la regla de 6 + 3 meses de los dependientes del sector privado.</p>
<p><em>Contenido verificado al 10 de noviembre de 2026.</em></p>`,
    },
    {
      id: 'relacionadas',
      title: 'Calculadoras y guías relacionadas',
      level: 2,
      html: `<ul>
<li>${int('/calculadoras/calculadora-licencia-medica', 'Calculadora de licencia médica')}</li>
<li>${int('/guias/sueldo-liquido-chile', 'Guía de sueldo líquido')}</li>
<li>${int('/blog/checklist-despues-despido-chile-2026', 'Checklist después de un despido')}</li>
</ul>`,
    },
  ],
  relatedCalculators: ['calculadora-licencia-medica', 'calculadora-finiquito'],
  relatedArticles: ['checklist-despues-despido-chile-2026'],
  sources: [
    { label: 'Dirección del Trabajo, carencia de origen común (95277)', url: DT_95277 },
    { label: 'Dirección del Trabajo, IMM no remuneracional (60141)', url: DT_60141 },
    { label: 'Dirección del Trabajo, suspensión del preaviso (60542)', url: DT_60542 },
    { label: 'Dirección del Trabajo, requisitos de dependientes (95288)', url: DT_95288 },
    { label: 'Dirección del Trabajo, ORD. 595 de 2018', url: DT_ORD_595 },
    { label: 'SUSESO, subsidio por incapacidad laboral', url: SUSESO_568 },
    { label: 'SUSESO 19931, licencias continuadas', url: SUSESO_19931 },
    { label: 'SUSESO, DFL 1/2005 art. 168', url: SUSESO_ART_168 },
    { label: 'SUSESO, dictamen 60340-2009', url: SUSESO_60340 },
    { label: 'SUSESO, Compendio de normas (archivo_03)', url: SUSESO_COMPENDIO_PDF },
    { label: 'SUSESO, Compendio 6.2 (primer pago)', url: SUSESO_COMPENDIO_6_2 },
    { label: 'SUSESO, Circular 3917', url: SUSESO_CIRCULAR_3917 },
    { label: 'DFL 44 (BCN idNorma 4252)', url: BCN_DFL44 },
    { label: 'DS 3/1984 (BCN idNorma 7281)', url: BCN_DS3 },
    { label: 'Ley 16.744, art. 31 (BCN idNorma 28650)', url: BCN_LEY_16744 },
    { label: 'Superintendencia de Salud, licencias y subsidios', url: SUPER_SALUD_3468 },
    { label: 'ChileAtiende, reclamo de licencia (682)', url: CHILEATIENDE_682 },
    { label: 'Salud Responde, Ley 21.746', url: SALUD_RESPONDE_21746 },
  ],
};
