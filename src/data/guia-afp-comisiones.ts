// ============================================
// Guía pillar /guias/afp-mas-barata-comisiones-chile
// ----------------------------------------------
// Demanda GSC (export 25-oct a 21-nov-2026): cluster
// "afp más barata / comisiones afp" ~1.067 impresiones con todas
// las URLs fuera del top 10. Cifras de comisión verificadas en el
// documento informativo mensual de la Superintendencia de Pensiones
// (noviembre 2026) y en la tabla AFP de src/lib/values/constants.ts.
// ============================================

import type { Guia } from './guias';
import { formatCLP } from '@/lib/formatters';
import { AFP, TOPE_IMPOSITIVO, UF } from '@/lib/values/constants';

const SP_DOCUMENTO_TRASPASOS = 'https://www.spensiones.cl/apps/GetFile.php?id=002&namefile=traspasos';
const SP_COMISION_DEFINICION =
  'https://www.spensiones.gob.cl/portal/institucional/594/w3-article-2810.html';
const SP_COMISION_PANEL =
  'https://www.spensiones.gob.cl/portal/institucional/594/w3-article-2815.html';
const SP_TRASPASO =
  'https://www.spensiones.gob.cl/portal/institucional/594/w3-propertyvalue-9915.html';
const SP_ORDEN_TRASPASO =
  'https://www.spensiones.cl/portal/institucional/594/w3-article-6965.html';
const SP_COMPENDIO_TRASPASO =
  'https://www.spensiones.cl/portal/compendio/596/w3-propertyvalue-3630.html';
const BCN_DL3500 = 'https://www.bcn.cl/leychile/navegar?idNorma=6125';
const CHILEATIENDE_AFP = 'https://www.chileatiende.gob.cl/fichas/7736';
const SP_INFOAFP = 'https://www.spensiones.cl/infoafp';

const ext = (href: string, text: string) =>
  `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
const int = (href: string, text: string) => `<a href="${href}">${text}</a>`;

const SUELDO_EJEMPLO = 1_000_000;
const TOPE_CLP = Math.round(TOPE_IMPOSITIVO.afp_salud * UF.valor);

const comisionMensual = (key: keyof typeof AFP, base: number) =>
  Math.round((base * AFP[key].comision) / 100);

const UNO_MES = comisionMensual('uno', SUELDO_EJEMPLO);
const MODELO_MES = comisionMensual('modelo', SUELDO_EJEMPLO);
const PROVIDA_MES = comisionMensual('provida', SUELDO_EJEMPLO);
const AHORRO_MES = PROVIDA_MES - UNO_MES;
const AHORRO_ANO = AHORRO_MES * 12;
const AHORRO_10_ANOS = AHORRO_ANO * 10;

export const guiaAfpComisiones: Guia = {
  slug: 'afp-mas-barata-comisiones-chile',
  title: 'AFP más barata en Chile 2026: comisiones, comparación y cómo cambiarse',
  intent: '¿Cuál es la AFP más barata en Chile y cuánto ahorro si me cambio?',
  description:
    'Qué AFP cobra menos comisión en 2026 (Uno 0,46% y Modelo 0,58% lideran), cuánto pagas por sueldo y cómo cambiarte paso a paso. Fuente: SP.',
  category: 'previsional',
  categoryLabel: 'Previsional y pensiones',
  keywords: [
    'afp más barata',
    'cuál es la afp más barata',
    'comisiones afp 2026',
    'afp con menos comisión',
    'afp que menos descuenta',
    'comparar afp chile',
    'cambio de afp',
    'comisión administradora fondos pensiones',
  ],
  publishedAt: '2026-11-23',
  updatedAt: '2026-11-23',
  readingTime: 11,
  embedCalculatorId: 'comparador-afp',
  sections: [
    {
      id: 'resumen',
      title: 'Resumen',
      level: 2,
      html: `<p><em>Publicado el 23 de noviembre de 2026.</em></p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Alcance YMYL</strong><p>Las comisiones de esta guía son las publicadas por la Superintendencia de Pensiones en su documento informativo vigente a noviembre de 2026. Es información de orientación: la comisión es solo uno de los factores para elegir AFP, junto a la rentabilidad de tu multifondo y el servicio. No es una recomendación financiera individual.</p></div></aside>
<p>La AFP más barata de Chile a noviembre de 2026 es <strong>AFP Uno, con 0,46%</strong> de comisión mensual sobre la remuneración o renta imponible. Le sigue <strong>AFP Modelo con 0,58%</strong>. La más cara es ProVida, con 1,45% (${ext(SP_DOCUMENTO_TRASPASOS, 'Superintendencia de Pensiones, documento informativo de traspasos, noviembre 2026')}).</p>
<p>En un sueldo imponible de ${formatCLP(SUELDO_EJEMPLO)}, estar en ProVida cuesta ${formatCLP(PROVIDA_MES)} al mes contra ${formatCLP(UNO_MES)} en Uno: una diferencia de <strong>${formatCLP(AHORRO_MES)} mensuales o ${formatCLP(AHORRO_ANO)} al año</strong> en tu sueldo líquido. Ojo: bajar la comisión reduce el descuento, no aumenta la cotización obligatoria; el ahorro solo crece en tu cuenta si decides ahorrarlo (por ejemplo, como APV). Compara tu caso con el ${int('/calculadoras/calculadora-comparador-afp', 'comparador de comisiones AFP')}.</p>`,
    },
    {
      id: 'comisiones-2026',
      title: 'Comisiones de cada AFP en 2026',
      level: 2,
      html: `<p>La comisión es el porcentaje de tu remuneración o renta imponible que la administradora cobra por gestionar tu cuenta de capitalización individual. Se suma al 10% de cotización obligatoria que descuenta tu empleador: no es lo mismo, y por eso dos personas con el mismo sueldo pueden tener descuentos previsionales distintos según su AFP (${ext(SP_COMISION_DEFINICION, 'Superintendencia de Pensiones')}).</p>
<p>Estas son las comisiones mensuales vigentes para afiliados dependientes, independientes y voluntarios, según el documento informativo de la Superintendencia de Pensiones de noviembre de 2026:</p>
<table>
<thead><tr><th>AFP</th><th>Comisión mensual (% de la renta imponible)</th></tr></thead>
<tbody>
<tr><td>Uno</td><td>0,46%</td></tr>
<tr><td>Modelo</td><td>0,58%</td></tr>
<tr><td>PlanVital</td><td>1,16%</td></tr>
<tr><td>Habitat</td><td>1,27%</td></tr>
<tr><td>Capital</td><td>1,44%</td></tr>
<tr><td>Cuprum</td><td>1,44%</td></tr>
<tr><td>ProVida</td><td>1,45%</td></tr>
</tbody>
</table>
<p>AFP Uno tiene la comisión más baja desde el 1 de octubre de 2025 (${ext(SP_COMISION_DEFINICION, 'Superintendencia de Pensiones')}). Las AFP están obligadas a publicar sus comisiones vigentes y sus cambios futuros en un panel visible en todas sus oficinas: las bajas se avisan con 30 días de anticipación y los aumentos con 90 días (${ext(SP_COMISION_PANEL, 'Superintendencia de Pensiones')}).</p>
<p>Además de la comisión, existe el Seguro de Invalidez y Sobrevivencia (SIS). Para los trabajadores dependientes, desde las remuneraciones de agosto de 2026 ese seguro se financia dentro del aporte del empleador al Seguro Social de la reforma previsional (Ley 21.735), no como un descuento separado en la liquidación del trabajador. Los trabajadores independientes y voluntarios sí lo pagan como cotización adicional, por lo que su costo total supera la comisión de la tabla (${ext(SP_DOCUMENTO_TRASPASOS, 'Superintendencia de Pensiones')}).</p>`,
    },
    {
      id: 'cuanto-pagas',
      title: '¿Cuánto pagas tú según tu sueldo?',
      level: 2,
      html: `<p>La comisión se calcula sobre tu remuneración imponible, con un techo: el tope imponible AFP y de salud, de 90 UF mensuales (${formatCLP(TOPE_CLP)} con la UF al valor de esta fecha). Quienes ganan sobre ese tope pagan la misma comisión que alguien con sueldo de 90 UF, porque el porcentaje no se aplica al exceso.</p>
<p>Con un sueldo imponible de ${formatCLP(SUELDO_EJEMPLO)}, el cargo mensual por AFP queda así:</p>
<table>
<thead><tr><th>AFP</th><th>Comisión</th><th>Cargo mensual sobre ${formatCLP(SUELDO_EJEMPLO)}</th><th>Cargo anual</th></tr></thead>
<tbody>
<tr><td>Uno</td><td>0,46%</td><td>${formatCLP(UNO_MES)}</td><td>${formatCLP(UNO_MES * 12)}</td></tr>
<tr><td>Modelo</td><td>0,58%</td><td>${formatCLP(MODELO_MES)}</td><td>${formatCLP(MODELO_MES * 12)}</td></tr>
<tr><td>PlanVital</td><td>1,16%</td><td>${formatCLP(comisionMensual('planvital', SUELDO_EJEMPLO))}</td><td>${formatCLP(comisionMensual('planvital', SUELDO_EJEMPLO) * 12)}</td></tr>
<tr><td>Habitat</td><td>1,27%</td><td>${formatCLP(comisionMensual('habitat', SUELDO_EJEMPLO))}</td><td>${formatCLP(comisionMensual('habitat', SUELDO_EJEMPLO) * 12)}</td></tr>
<tr><td>Capital</td><td>1,44%</td><td>${formatCLP(comisionMensual('capital', SUELDO_EJEMPLO))}</td><td>${formatCLP(comisionMensual('capital', SUELDO_EJEMPLO) * 12)}</td></tr>
<tr><td>Cuprum</td><td>1,44%</td><td>${formatCLP(comisionMensual('cuprum', SUELDO_EJEMPLO))}</td><td>${formatCLP(comisionMensual('cuprum', SUELDO_EJEMPLO) * 12)}</td></tr>
<tr><td>ProVida</td><td>1,45%</td><td>${formatCLP(PROVIDA_MES)}</td><td>${formatCLP(PROVIDA_MES * 12)}</td></tr>
</tbody>
</table>
<div class="numeric-example"><strong>Ejemplo.</strong> Cambiarse de la AFP más cara a la más barata con ese sueldo libera ${formatCLP(AHORRO_MES)} al mes en tu líquido: ${formatCLP(AHORRO_ANO)} al año y, si la diferencia se mantuviera, cerca de ${formatCLP(AHORRO_10_ANOS)} en diez años. Si además destinas ese ahorro a APV, suma además la rentabilidad que genere en tu cuenta.</div>
<p>Tu caso exacto depende de tu imponible y de tu AFP actual: la ${int('/calculadoras/calculadora-comparador-afp', 'calculadora comparadora de AFP')} muestra el costo de las siete administradoras y el ahorro anual proyectado de cambiarse.</p>`,
    },
    {
      id: 'mas-que-comision',
      title: 'La comisión no es lo único que importa',
      level: 2,
      html: `<p>Elegir AFP solo por la comisión puede salir caro si la administradora renta poco. La Superintendencia misma recomienda mirar tres cosas antes de cambiarse: la rentabilidad de los multifondos, la comisión y la calidad de servicio, y publica esa comparación en su plataforma Infórmate y Decide (${ext(SP_INFOAFP, 'spensiones.cl/infoafp')}).</p>
<p>La regla práctica que usan los analistas del sistema es comparar el <em>costo neto</em>: una AFP con comisión media pero con multifondos consistentemente más rentables puede dejar tu saldo final más alto que la más barata. La comisión se paga todos los meses y es cierta; la rentabilidad futura no está garantizada. Por eso la comisión pesa más cuanto más parecida es la rentabilidad histórica entre las opciones.</p>
<p>También conviene revisar en qué multifondo (A al E) está tu ahorro, porque el fondo cambia más el resultado que la administradora. La ${int('/guias/afp-pension-chile', 'guía de AFP y pensión')} explica los multifondos, la PGU y el resto del sistema previsional.</p>`,
    },
    {
      id: 'quien-puede-elegir',
      title: 'Quién puede elegir AFP y la regla de los 24 meses',
      level: 2,
      html: `<p>Toda persona afiliada puede cambiarse de AFP cuando quiera; no necesita permiso de su AFP actual ni de su empleador (${ext(SP_TRASPASO, 'Superintendencia de Pensiones')}).</p>
<p>La excepción son las personas que se afilian por primera vez: por ley deben ingresar a la AFP que cobre la comisión más baja — desde octubre de 2025, AFP Uno — y permanecer ahí 24 meses. Esa obligación se suspende si la AFP sube la comisión o si otra pasa a cobrar menos (${ext(SP_COMISION_DEFINICION, 'Superintendencia de Pensiones')}). Cumplidos los 24 meses, pueden traspasarse como cualquier afiliado.</p>`,
    },
    {
      id: 'como-cambiarse',
      title: 'Cómo cambiarse de AFP paso a paso',
      level: 2,
      html: `<ol>
<li><strong>Compara antes de firmar.</strong> La AFP elegida debe entregarte el documento informativo oficial con las comisiones de todas las administradoras antes de suscribir el cambio (${ext(SP_COMPENDIO_TRASPASO, 'Compendio de Normas del Sistema de Pensiones, Título III')}).</li>
<li><strong>Firma la Orden de Traspaso Irrevocable</strong> en una oficina de la AFP a la que te quieres ir, presencial o por los canales electrónicos que habilita cada administradora. En el mismo acto puedes ordenar el traspaso de tu ahorro voluntario y elegir multifondo (${ext(SP_ORDEN_TRASPASO, 'Superintendencia de Pensiones')}).</li>
<li><strong>Espera la fecha de traspaso.</strong> Los fondos se mueven el primer día hábil del mes siguiente a la firma; si firmaste a contar del día 16, se mueven el día 15 del mes siguiente o el hábil posterior. Tu afiliación a la nueva AFP corre desde el día 1 del mes en que se traspasan los fondos, con un plazo máximo legal de 30 días para materializar el traspaso (${ext(SP_ORDEN_TRASPASO, 'SP')}; ${ext(SP_COMPENDIO_TRASPASO, 'Compendio')}).</li>
<li><strong>El aviso al empleador es automático.</strong> La AFP avisa directamente desde qué mes debe enterar tus cotizaciones en la nueva administradora; no tienes que llevar ningún papel a recursos humanos (${ext(SP_ORDEN_TRASPASO, 'SP')}).</li>
</ol>
<p>La orden se llama <em>irrevocable</em>, pero la Superintendencia la anula si detecta errores o antecedentes faltantes — por ejemplo, que no hayas elegido multifondo — y te informa la anulación o la fecha de incorporación por correo o email. El paso a paso detallado, con plazos y formularios, está en ${int('/blog/cambio-afp-2026-como-hacerlo', 'cómo cambiarse de AFP en 2026')}.</p>`,
    },
    {
      id: 'mitos',
      title: 'Lo que el cambio de AFP no hace',
      level: 2,
      html: `<p>Cambiarse de AFP <strong>no cambia tu multifondo automáticamente ni borra lagunas</strong>: se traspasa tu saldo completo tal como está, y tus cotizaciones futuras se entern en la nueva administradora (${ext(BCN_DL3500, 'DL 3.500')}). Tampoco toca tu APV ni tus depósitos convenidos salvo que firmes el traspaso conjunto en el mismo acto.</p>
<p>Cambiarse tampoco es retroactivo: el ahorro empieza el mes en que se materializa el traspaso, no antes. Y no puedes "volver atrás" de inmediato: el Compendio exige esperar hasta el mes siguiente a la materialización del traspaso para suscribir una nueva orden (${ext(SP_COMPENDIO_TRASPASO, 'Compendio, numerales 16 y 17')}).</p>`,
    },
    {
      id: 'casos',
      title: 'Cuándo conviene cambiarse y cuándo no',
      level: 2,
      html: `<ul>
<li><strong>Sí conviene mirar números</strong> si estás en una AFP de comisión alta (Capital, Cuprum, ProVida) y tu multifondo no ha rentado mejor que el de las baratas: el ahorro de comisión es seguro e inmediato.</li>
<li><strong>Conviene esperar o comparar rentabilidad</strong> si tu AFP actual cobra más pero sus multifondos rentan consistentemente mejor; una décima de rentabilidad anual puede superar el 1% de comisión ahorrada en saldos grandes.</li>
<li><strong>No cambia nada urgente</strong> si estás a meses de jubilar: a esa altura pesa más revisar tu multifondo y el tipo de pensión que el punto porcentual de comisión.</li>
<li><strong>Si eres independiente</strong>, recuerda que tú pagas además el SIS: compara el costo total, no solo la comisión de la tabla.</li>
</ul>
<p>Para dudas administrativas del traspaso, la ficha oficial es ${ext(CHILEATIENDE_AFP, 'ChileAtiende')} y la normativa base es el ${ext(BCN_DL3500, 'Decreto Ley 3.500 de 1980')}.</p>`,
    },
    {
      id: 'preguntas-frecuentes',
      title: 'Preguntas frecuentes',
      level: 2,
      html: `<h3>¿Cuál es la AFP que menos descuenta en Chile?</h3>
<p>AFP Uno, con 0,46% mensual sobre la renta imponible desde octubre de 2025. Le sigue AFP Modelo con 0,58% (${ext(SP_COMISION_DEFINICION, 'Superintendencia de Pensiones')}).</p>
<h3>¿Cuánto se ahorra al año cambiándose a la AFP más barata?</h3>
<p>Con un imponible de ${formatCLP(SUELDO_EJEMPLO)}, pasar de la más cara (1,45%) a la más barata (0,46%) ahorra ${formatCLP(AHORRO_ANO)} al año. Con sueldos sobre el tope de 90 UF el ahorro se topea en ${formatCLP(comisionMensual('provida', TOPE_CLP) - comisionMensual('uno', TOPE_CLP))} mensuales.</p>
<h3>¿Pierdo plata o cotizaciones al cambiarme?</h3>
<p>No. Se traspasa todo tu saldo acumulado y tus cotizaciones futuras se entern en la AFP nueva. Lo único que cambia es quién administra la cuenta y cuánto cobra.</p>
<h3>¿Cada cuánto puedo cambiarme de AFP?</h3>
<p>Las veces que quieras, pero no dos seguidas: una vez materializado un traspaso, la nueva orden solo puede suscribirse desde el mes siguiente (${ext(SP_COMPENDIO_TRASPASO, 'Compendio')}). Cada cambio demora además hasta 30 días según la fecha de firma. Solo los nuevos afiliados deben quedarse 24 meses en la AFP de menor comisión.</p>
<h3>¿La comisión incluye el Seguro de Invalidez (SIS)?</h3>
<p>No. Para dependientes, desde agosto de 2026 el SIS lo financia el empleador dentro de su aporte al Seguro Social. Independientes y voluntarios lo pagan aparte, además de la comisión.</p>`,
    },
    {
      id: 'relacionadas',
      title: 'Calculadoras y artículos relacionados',
      level: 2,
      html: `<ul>
<li>${int('/calculadoras/calculadora-comparador-afp', 'Comparador de comisiones AFP')}</li>
<li>${int('/calculadoras/calculadora-sueldo-liquido', 'Calculadora de sueldo líquido')}</li>
<li>${int('/calculadoras/calculadora-simulador-pension-afp', 'Simulador de pensión AFP')}</li>
<li>${int('/blog/comparativa-comisiones-afp-2026', 'Comparativa de comisiones AFP 2026')}</li>
<li>${int('/blog/cambio-afp-2026-como-hacerlo', 'Cómo cambiarse de AFP en 2026')}</li>
<li>${int('/guias/afp-pension-chile', 'Guía de AFP y pensión en Chile')}</li>
</ul>`,
    },
  ],
  relatedCalculators: [
    'calculadora-comparador-afp',
    'calculadora-sueldo-liquido',
    'calculadora-simulador-pension-afp',
    'calculadora-tope-imponible-90-uf',
  ],
  relatedArticles: ['comparativa-comisiones-afp-2026', 'cambio-afp-2026-como-hacerlo'],
  sources: [
    {
      label: 'Superintendencia de Pensiones, documento informativo de traspasos (comisiones, nov-2026)',
      url: SP_DOCUMENTO_TRASPASOS,
    },
    { label: 'Superintendencia de Pensiones, ¿en qué consiste la comisión?', url: SP_COMISION_DEFINICION },
    { label: 'Superintendencia de Pensiones, traspaso a otra AFP', url: SP_TRASPASO },
    { label: 'Compendio de Normas del Sistema de Pensiones, Título III (traspaso)', url: SP_COMPENDIO_TRASPASO },
    { label: 'Decreto Ley 3.500 de 1980 (BCN)', url: BCN_DL3500 },
    { label: 'ChileAtiende, escoger o cambiarse de AFP', url: CHILEATIENDE_AFP },
  ],
};
