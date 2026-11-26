// ============================================
// Guía /guias/credito-automotriz-chile
// ----------------------------------------------
// Demanda GSC (export 25-oct a 21-nov-2026): "simulador credito
// automotriz" con 133 impresiones y posición media 28,5; el cluster
// automotriz no tiene pieza editorial dedicada (solo la calculadora).
// Marco legal: Ley 20.555 (hoja de resumen/CAE) y DL 3.475 (timbres
// y estampillas), verificados en CMF y SII (noviembre 2026).
// Ejemplos calculados con calculateCreditoAutomotriz.
// ============================================

import type { Guia } from './guias';
import { formatCLP } from '@/lib/formatters';
import { calculateCreditoAutomotriz } from '@/lib/calculations/credito-automotriz';

const SII_TIMBRES = 'https://www.sii.cl/normativa_legislacion/timbres.pdf';
const SII_TIMBRES_FAQ =
  'https://www.sii.cl/preguntas_frecuentes/otros_impuestos/001_390_0354.htm';
const BCN_LEY_20555 =
  'https://www.bcn.cl/leychile/navegar?idNorma=1032865';
const SERNAC_CAE = 'https://www.sernac.cl/portal/607/w3-article-2463.html';
const ext = (href: string, text: string) =>
  `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
const int = (href: string, text: string) => `<a href="${href}">${text}</a>`;

// Auto $12.000.000, pie 20%, tasa 1,2% mensual, 36 meses, con seguro.
const EJ = calculateCreditoAutomotriz({
  valorVehiculo: 12_000_000,
  pie: 2_400_000,
  tasaAnual: 14.4,
  plazoMeses: 36,
  incluyeSeguro: true,
});

// Mismo auto sin pie y mismo plazo, para comparar el efecto del pie.
const SIN_PIE = calculateCreditoAutomotriz({
  valorVehiculo: 12_000_000,
  pie: 0,
  tasaAnual: 14.4,
  plazoMeses: 36,
  incluyeSeguro: true,
});

export const guiaCreditoAutomotriz: Guia = {
  slug: 'credito-automotriz-chile',
  title: 'Crédito automotriz en Chile 2026: cómo funciona, CAE, pie y costo total',
  intent: '¿Cómo funciona el crédito automotriz y cuánto termino pagando por el auto?',
  description:
    'Guía del crédito automotriz en Chile: cuota francesa, pie, tasa vs CAE, impuesto de timbres y estampillas, seguros y cómo comparar ofertas con la hoja de resumen de la CMF.',
  category: 'vehiculos',
  categoryLabel: 'Vehículos',
  keywords: [
    'simulador credito automotriz',
    'credito automotriz chile',
    'credito automotriz como funciona',
    'cae credito automotriz',
    'cuota credito automotriz',
    'pie credito automotriz',
    'hoja de resumen credito',
    'costo total credito automotriz',
  ],
  publishedAt: '2026-11-26',
  updatedAt: '2026-11-26',
  readingTime: 12,
  embedCalculatorId: 'credito-automotriz',
  sections: [
    {
      id: 'resumen',
      title: 'Resumen',
      level: 2,
      html: `<p><em>Publicado el 26 de noviembre de 2026.</em></p>
<aside class="callout callout--info"><span class="callout__icon" aria-hidden="true">ℹ️</span><div class="callout__body"><strong>Alcance YMYL</strong><p>Esta guía explica el mecanismo del crédito automotriz con fuentes oficiales (CMF, SII, BCN) verificadas en noviembre de 2026. Los números de ejemplo son ilustrativos: la CAE real de tu crédito es la que aparece en la hoja de resumen de cada oferta. Esto no es una recomendación de crédito.</p></div></aside>
<p>Un <strong>crédito automotriz</strong> es un préstamo para comprar vehículo que se repaga en <strong>cuotas mensuales iguales</strong> (sistema francés) sobre el <strong>capital financiado: precio del auto menos el pie</strong>. Tres números definen el trato: la tasa de interés, el plazo y los costos asociados —que la <strong>CAE (Carga Anual Equivalente)</strong> junta en una sola cifra comparable entre ofertas.</p>
<p>Ejemplo con números redondos: un auto de <strong>${formatCLP(EJ.valorVehiculo)}</strong> con pie del 20% (${formatCLP(EJ.pie)}) deja ${formatCLP(EJ.montoFinanciar)} a financiar. A 1,2% mensual (14,4% anual) en 36 cuotas, el dividendo del crédito sale <strong>${formatCLP(EJ.dividendoMensual)} al mes</strong> y los intereses del plazo suman <strong>${formatCLP(EJ.totalIntereses)}</strong>. Con un seguro vehicular estimado, el costo mensual sube a ${formatCLP(EJ.dividendoConSeguro)}. Simula tu caso en el ${int('/calculadoras/calculadora-credito-automotriz', 'simulador de crédito automotriz')}.</p>`,
    },
    {
      id: 'como-funciona',
      title: 'Cómo funciona el crédito automotriz',
      level: 2,
      html: `<p>El mecanismo es el de casi todo crédito de consumo chileno: te prestan un monto (el capital) y lo devuelves en cuotas idénticas mensuales. Cada cuota mezcla capital e interés: la primera cuota es la que más interés lleva, esa proporción baja mes a mes y hacia el final casi todo es capital. Esa estructura se llama <strong>amortización francesa</strong> y es la que usan bancos, financieras de automotoras y cooperativas.</p>
<p>Los tres inputs que mueven la cuota:</p>
<ul>
<li><strong>Monto a financiar</strong> = precio del vehículo − pie. Todo lo que no pagas al contado se financia, incluidos a veces el seguro y la patente.</li>
<li><strong>Tasa de interés</strong>, usualmente expresada mensual (1,2% mensual ≈ 14,4% anual nominal). La tasa anual nominal es la mensual × 12.</li>
<li><strong>Plazo en meses</strong>: más meses baja la cuota pero sube el total de intereses.</li>
</ul>
<p>El dividendo se calcula con la fórmula de anualidad: <code>cuota = capital × tasa_mensual × (1+tasa_mensual)^n ÷ ((1+tasa_mensual)^n − 1)</code>. Como es de manual, el interés solo compensa si la cuota mensual cabe en tu presupuesto sin apretar otros gastos.</p>`,
    },
    {
      id: 'pie',
      title: 'El pie: cuánto conviene poner',
      level: 2,
      html: `<p>El <strong>pie</strong> es la parte del precio que pagas al contado. Dos efectos directos:</p>
<ul>
<li><strong>Baja el capital financiado</strong>, por lo que caen tanto la cuota como el interés total.</li>
<li><strong>Mejora las condiciones que te ofrecen</strong>: más pie significa menos riesgo para el financista, lo que suele traducirse en mejor tasa.</li>
</ul>
<p>En el auto de ${formatCLP(EJ.valorVehiculo)} del ejemplo, pasar de 0% a 20% de pie baja el dividendo del crédito de ${formatCLP(SIN_PIE.dividendoMensual)} a ${formatCLP(EJ.dividendoMensual)} y recorta ${formatCLP(SIN_PIE.totalIntereses - EJ.totalIntereses)} de intereses en los 36 meses. El pie se paga al momento de la compra; si financias parte de él, estás tomando dos créditos a la vez.</p>
<p>Ojo con el <strong>pie en UF o en porcentaje del precio con accesorios</strong>: en algunas ofertas el precio mostrado ya incorpora accesorios, garantías extendidas o seguros cargados al crédito. Revisa qué incluye la base antes de comparar.</p>`,
    },
    {
      id: 'cae-vs-tasa',
      title: 'Tasa, CAE y por qué solo la CAE es comparable',
      level: 2,
      html: `<p>La tasa de interés dice cuánto cuesta el capital, pero el crédito trae más cargos: comisión de apertura, impuestos, seguros obligatorios, gastos de evaluación y notaría. La <strong>CAE (Carga Anual Equivalente)</strong> es el indicador diseñado por la CMF para capturar todo eso en un solo porcentaje anual. Dos ofertas con la misma tasa pueden tener CAE muy distintas.</p>
<p>La ${ext(BCN_LEY_20555, 'Ley 20.555')} obliga a cada oferente a entregar una <strong>hoja de resumen estandarizada</strong> con la CAE, el valor de la cuota y el costo total del crédito, y el ${ext(SERNAC_CAE, 'SERNAC explica cómo leer la CAE')} para contrastar lo que te ofrecen. Pedir la hoja de resumen en cada automotora o banco es el único atajo real para comparar.</p>
<p>Un cargo que aparece detallado en la hoja de resumen y entra en la CAE: el <strong>impuesto de timbres y estampillas</strong>. La operación de crédito de dinero lo paga como un porcentaje sobre el capital: <strong>0,066% por cada mes o fracción entre emisión y vencimiento, con tope 0,8%</strong> (${ext(SII_TIMBRES_FAQ, 'SII, impuesto a los documentos de crédito')}). En el financiamiento de ${formatCLP(EJ.montoFinanciar)} a 36 meses son cerca de ${formatCLP(Math.round(EJ.montoFinanciar * 0.008))} adicionales que se suelen cargar al crédito o cobrar al inicio.</p>`,
    },
    {
      id: 'costos-y-seguros',
      title: 'Costos asociados y seguros',
      level: 2,
      html: `<p>Más allá del interés, la hoja de resumen lista los cargos que encarecen el crédito:</p>
<ul>
<li><strong>Comisión de apertura</strong>: cobro único por otorgar el crédito, frecuente en financieras de automotoras.</li>
<li><strong>Impuesto de timbres y estampillas</strong>: 0,066% mensual sobre el capital, tope 0,8% (${ext(SII_TIMBRES, 'SII')}).</li>
<li><strong>Seguro de desgravamen</strong>: cubre la deuda si el titular muere; suele ofrecerse como obligatorio, aunque la ley permite contratarlo fuera de la financiera.</li>
<li><strong>Seguro vehicular / contra daños</strong>: algunas ofertas lo obligan mientras dure el crédito; se cobra por cuota o se financia.</li>
<li><strong>Gastos notariales y de formalización</strong>, cuando el documento se firma ante notario.</li>
</ul>
<p>En el ejemplo, el seguro vehicular estimado agrega ${formatCLP(EJ.seguroMensual)} al mes —es decir, ${formatCLP(EJ.seguroMensual * EJ.plazoMeses)} en todo el plazo— y lleva el subtotal de crédito más seguros a ${formatCLP(EJ.costoTotal)} —sin contar el pie de ${formatCLP(EJ.pie)} ni el impuesto de timbres— sobre el auto de ${formatCLP(EJ.valorVehiculo)}. Si la oferta financia el seguro dentro del crédito, además pagas interés sobre él.</p>`,
    },
    {
      id: 'plazo-costo-total',
      title: 'Plazo y costo total: la cuenta que importa',
      level: 2,
      html: `<p>Alargar el plazo es la palanca más común para "que alcance la cuota", pero tiene precio: a plazo doble, la cuota baja menos de la mitad porque los intereses se acumulan más años. En el ejemplo, los intereses del crédito a 36 meses son ${formatCLP(EJ.totalIntereses)} — un ${EJ.pctIntereses}% sobre el capital financiado.</p>
<p>La métrica final no es la cuota sino el <strong>costo total: pie + todas las cuotas + seguros + comisiones + impuestos</strong>. La hoja de resumen lo muestra; el simulador lo estima como "costo total" separando crédito y seguros. Comparar dos ofertas por cuota sin mirar costo total es el error más caro del proceso.</p>`,
    },
    {
      id: 'como-comparar',
      title: 'Cómo comparar ofertas paso a paso',
      level: 2,
      html: `<ol class="steps">
<li><strong>Define el auto, el pie, el monto y el plazo primero.</strong> Sin eso, cada cotización sale en otra base y no hay comparación posible: una CAE menor con plazo mayor puede costar más en total.</li>
<li><strong>Pide la hoja de resumen</strong> en cada automotora, banco y cooperativa (obligatoria por la Ley 20.555): anota CAE, valor cuota, costo total y seguros incluidos.</li>
<li><strong>Ordena por CAE y costo total</strong>, no por la tasa ni por la cuota más baja.</li>
<li><strong>Revisa qué está financiado</strong>: seguros, patente, accesorios y la misma comisión pueden ir dentro del crédito y aumentar el capital. Ojo con las ofertas que bajan la cuota dejando un <strong>pago final elevado</strong> (cuota globo): el simulador asume cuotas iguales, así que la estructura real hay que leerla en la hoja de resumen.</li>
<li><strong>Simula el escenario</strong> en el ${int('/calculadoras/calculadora-credito-automotriz', 'simulador de crédito automotriz')} para ver el efecto de pie, tasa y plazo antes de firmar.</li>
</ol>
<p>Si el auto también es compra racional (no solo financiamiento), el permiso de circulación y la revisión técnica son gastos fijos que sumarán cada año —están en la ${int('/guias/vehiculos-chile-permiso-multas', 'guía de permiso de circulación y multas')}.</p>`,
    },
    {
      id: 'preguntas-frecuentes',
      title: 'Preguntas frecuentes',
      level: 2,
      html: `<h3>¿Qué es mejor: más pie o menor plazo?</h3>
<p>Las dos reducen intereses. El pie ataca el capital financiado; el plazo corto reduce el tiempo en que se genera interés. Si tienes que elegir, comparar la CAE y el costo total de ambas variantes en la hoja de resumen resuelve la duda con números propios.</p>
<h3>¿Puedo prepagar el crédito antes de plazo?</h3>
<p>La ley permite prepago total o parcial del crédito. Algunos contratos contemplan comisión o condiciones de prepago; verifícalo en la hoja de resumen y el contrato antes de firmar.</p>
<h3>¿La CAE incluye el seguro del auto?</h3>
<p>Incluye los costos obligatorios asociados al crédito (comisiones, impuestos, seguros exigidos por el crédito). El seguro vehicular voluntario que contrates por tu cuenta no forma parte de la CAE pero sí suma al costo mensual real.</p>
<h3>¿Conviene el crédito de la automotora o del banco?</h3>
<p>Depende de la CAE y el costo total, no del canal. Las automotoras a veces subsidian la tasa con el precio del auto o con bonos condicionados a financiar con ellas: por eso el paso de pedir la hoja de resumen en ambos lados es obligatorio.</p>
<h3>¿Cuánto es el impuesto del crédito?</h3>
<p>El impuesto de timbres y estampillas es 0,066% del capital por cada mes o fracción entre emisión y vencimiento, con tope de 0,8% (${ext(SII_TIMBRES_FAQ, 'SII')}). A 36 meses, el tope lo hace quedar en 0,8% del capital.</p>`,
    },
    {
      id: 'enlaces',
      title: 'Calculadoras y lecturas relacionadas',
      level: 2,
      html: `<ul>
<li>${int('/calculadoras/calculadora-credito-automotriz', 'Simulador de crédito automotriz')}</li>
<li>${int('/calculadoras/calculadora-credito-consumo', 'Calculadora de crédito de consumo')}</li>
<li>${int('/calculadoras/calculadora-permiso-circulacion', 'Valor del permiso de circulación')}</li>
<li>${int('/calculadoras/calculadora-costo-viaje', 'Costo de viaje en auto')}</li>
<li>${int('/guias/vehiculos-chile-permiso-multas', 'Guía de permiso de circulación y multas')}</li>
<li>${int('/blog/cuanto-cuesta-viajar-en-auto-verano-bencina-peajes-tag', 'Cuánto cuesta viajar en auto en verano')}</li>
</ul>`,
    },
  ],
  relatedCalculators: [
    'calculadora-credito-automotriz',
    'calculadora-credito-consumo',
    'calculadora-permiso-circulacion',
    'calculadora-costo-viaje',
  ],
  relatedArticles: ['cuanto-cuesta-viajar-en-auto-verano-bencina-peajes-tag'],
  sources: [
    { label: 'Ley 20.555, hoja de resumen y CAE (BCN)', url: BCN_LEY_20555 },
    { label: 'SERNAC — ¿Qué es la Carga Anual Equivalente (CAE)?', url: SERNAC_CAE },
    { label: 'SII — Impuesto de Timbres y Estampillas', url: SII_TIMBRES },
    { label: 'SII — Tasa del impuesto a documentos de crédito', url: SII_TIMBRES_FAQ },
  ],
};
