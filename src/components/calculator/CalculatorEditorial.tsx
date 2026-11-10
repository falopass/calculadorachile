import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ASIGNACION_FAMILIAR_2026,
  INDEMNIZACION,
  INGRESO_MINIMO,
  RECARGO_ART_168,
  RECARGO_ART_171,
  SEGURO_CESANTIA_BENEFICIOS,
  UF,
  VERIFICACION_VALORES,
} from '@/lib/values/constants';
import { buildCvlistoUrl } from '@/lib/cvlisto';
import { formatCLP } from '@/lib/formatters';
import { calculateLicenciaMedica } from '@/lib/calculations/licencia-medica';
import { calculateIndemnizacion } from '@/lib/calculations/indemnizacion';

/**
 * Contenido editorial visible por calculadora (texto, tablas y preguntas
 * frecuentes como texto). No emite structured data: el schema FAQPage
 * sigue saliendo solo de `calculator.faq` vía SeoStructuredData.
 */

interface EditorialContent {
  /** Bloque destacado sobre la calculadora (opcional). */
  top?: ReactNode;
  /** Secciones bajo la calculadora. */
  bottom?: ReactNode;
}

const sectionClass =
  'mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:mt-10 md:p-7';
const h2Class = 'text-lg font-semibold text-[var(--foreground)] md:text-xl';
const pClass = 'mt-3 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base';
const aClass = 'font-medium text-[var(--color-primary-600)] hover:underline';

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={aClass}>
      {children}
    </a>
  );
}

function Int({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={aClass}>
      {children}
    </Link>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={sectionClass}>
      <h2 className={h2Class}>{title}</h2>
      {children}
    </section>
  );
}

function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <dl className="mt-3 space-y-4">
      {items.map((item) => (
        <div key={item.q}>
          <dt className="text-sm font-semibold text-[var(--foreground)] md:text-base">{item.q}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base">
            {item.a}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function SimpleTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[28rem] text-sm">
        <thead>
          <tr className="border-b border-[var(--border)]">
            {headers.map((h) => (
              <th
                key={h}
                scope="col"
                className="py-2 pr-4 text-left font-semibold text-[var(--foreground)] last:pr-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-[var(--border)] last:border-0">
              {row.map((cell, j) =>
                j === 0 ? (
                  <th
                    key={j}
                    scope="row"
                    className="py-2 pr-4 text-left font-medium text-[var(--foreground-secondary)]"
                  >
                    {cell}
                  </th>
                ) : (
                  <td key={j} className="py-2 pr-4 tabular-nums text-[var(--foreground)] last:pr-0">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function fechaDMY(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}-${m}-${y}`;
}

const DT_INDEMNIZACION = 'https://www.dt.gob.cl/portal/1628/w3-article-60604.html';
const DT_PLAZO = 'https://www.dt.gob.cl/portal/1628/w3-article-60613.html';
const DT_FERIADO = 'https://www.dt.gob.cl/legislacion/1624/w3-propertyvalue-150384.html';

const SII_CUOTAS = 'https://www.sii.cl/preguntas_frecuentes/aval_contrib_bbrr/001_165_0310.htm';
const SII_TASAS = 'https://www.sii.cl/ayudas/ayudas_por_servicios/2242-reajustes_exenciones-2468.html';
const CVLISTO_FINIQUITO = buildCvlistoUrl({
  origen: 'finiquito',
  placement: 'guia_footer',
  calculatorId: 'finiquito',
});
const TGR = 'https://www.tgr.cl/tramites/contribuciones/';

// Licencia médica (E-020, verificado 29-10-2026)
const DT_CARENCIA = 'https://www.dt.gob.cl/consultas/1613/w3-article-95277.html';
const SUSESO_SIL = 'https://www.suseso.gob.cl/606/w3-propertyvalue-568.html';
const SUSESO_CARENCIA_EMPLEADOR = 'https://www.suseso.gob.cl/606/w3-article-19933.html';
const SUSESO_QUIEN_PAGA = 'https://www.suseso.gob.cl/622/w3-propertyvalue-768472.html';
const DT_INGRESO_MINIMO = 'https://www.dt.gob.cl/portal/1628/w3-article-60141.html';
const LICENCIA_10 = calculateLicenciaMedica({ remuneracionNetaPromedio: 0, diasLicencia: 10 });
const LICENCIA_3 = calculateLicenciaMedica({ remuneracionNetaPromedio: 0, diasLicencia: 3 });
const LICENCIA_MINIMO_DIARIO = formatCLP(Math.round(LICENCIA_10.minimoDiario));

// Seguro de cesantía (E-022, verificado 29-10-2026)
const AFC_REQUISITOS = 'https://www.afc.cl/mi-seguro-de-cesantia/requisitos-y-documentos/';
const AFC_SIMULE = 'https://www.afc.cl/mi-seguro-de-cesantia/simule-su-cobro/';
const CA_SEGURO_CESANTIA = 'https://www.chileatiende.gob.cl/fichas/62932-seguro-de-cesantia';
const SP_FCS_MONTOS =
  'https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-9925.html';
const FCS = SEGURO_CESANTIA_BENEFICIOS.fcs;
const CIC = SEGURO_CESANTIA_BENEFICIOS.cic;
const SII_RETENCION_2026 = 'https://www.sii.cl/noticias/2025/261225noti01smn.htm';

// Enlaces internos del clúster cesantía (desempleo INE jul-sep 2026: 9,8%)
const AFC_COBRAR = 'https://www.afc.cl/mi-seguro-de-cesantia/cobrar-seguro-de-cesantia/';
const LEY_19728 = 'https://www.bcn.cl/leychile/navegar?idNorma=184979';
const SIMULADOR_CESANTIA = '/calculadoras/calculadora-seguro-cesantia';
const GUIA_COBRAR_CESANTIA = '/blog/como-cobrar-seguro-cesantia-afc-2026';

// Indemnización por años de servicio (E-026, fuentes abiertas el 03-11-2026).
// Cifras generadas desde INDEMNIZACION, RECARGO_ART_168/171 y la UF del snapshot.
const DT_IAS_DERECHO = 'https://www.dt.gob.cl/portal/1628/w3-article-60593.html';
const DT_IAS_DESPIDO = 'https://www.dt.gob.cl/portal/1626/w3-article-96287.html';
const DT_IAS_SIN_TOPE = 'https://www.dt.gob.cl/portal/1628/w3-article-60600.html';
const DT_IAS_BASE = 'https://www.dt.gob.cl/portal/1628/w3-article-60585.html';
const DT_IAS_AVISO = 'https://www.dt.gob.cl/portal/1628/w3-article-60531.html';
const DT_IAS_SUSTITUTIVA = 'https://www.dt.gob.cl/portal/1628/w3-article-60541.html';
const DT_IAS_CARTA = 'https://www.dt.gob.cl/portal/1628/w3-article-60543.html';
const DT_IAS_CARTA_ELECTRONICA = 'https://www.dt.gob.cl/portal/1626/w3-article-100380.html';
const DT_ORD_296 = 'https://www.dt.gob.cl/legislacion/1624/w3-article-114437.html';
const DT_AUTODESPIDO = 'https://www.dt.gob.cl/portal/1628/w3-article-60579.html';
const DT_OBRA_FAENA = 'https://www.dt.gob.cl/portal/1628/w3-article-118059.html';
const DT_IAS_CUOTAS = 'https://www.dt.gob.cl/portal/1628/w3-article-60584.html';
const SII_INDEMNIZACION =
  'https://www.sii.cl/preguntas_frecuentes/declaracion_renta/001_140_0838.htm';
const SII_OFICIO_988 =
  'https://www.sii.cl/normativa_legislacion/jurisprudencia_administrativa/ley_impuesto_renta/2014/ja988.htm';
const IAS = {
  dias: INDEMNIZACION.dias_por_año,
  anios: INDEMNIZACION.tope_años,
  topeDias: INDEMNIZACION.tope_años * INDEMNIZACION.dias_por_año,
  topeUF: INDEMNIZACION.tope_uf_mensual,
  topeCLP: formatCLP(Math.round(INDEMNIZACION.tope_uf_mensual * UF.valor)),
  ufFecha: fechaDMY(UF.fecha_actualizacion),
};
const IAS_EJ1_INPUT = { sueldo: 800_000, grat: 200_000, otros: 60_000 };
const IAS_EJ1 = calculateIndemnizacion({
  ultimoSueldo: IAS_EJ1_INPUT.sueldo,
  añosTrabajados: 7,
  mesesTrabajados: 8,
  incluyeGratificacion: true,
  gratificacionMensual: IAS_EJ1_INPUT.grat,
  otrasRemuneracionesMensuales: IAS_EJ1_INPUT.otros,
  causal: 'art161',
  avisoPrevio30Dias: false,
});
const IAS_EJ2 = calculateIndemnizacion({
  ultimoSueldo: 5_000_000,
  añosTrabajados: 14,
  incluyeGratificacion: false,
  causal: 'art161',
  avisoPrevio30Dias: false,
});
const ulClass =
  'mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base';
const olClass =
  'mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base';
const h3Class = 'mt-6 text-base font-semibold text-[var(--foreground)]';

const EDITORIAL: Record<string, EditorialContent> = {
  'horas-extra': {
    bottom: (
      <Section title="Factor hora extra con jornada de 42 horas">
        <p className={pClass}>
          Si solo necesitas el multiplicador para tu sueldo mensual, usa la calculadora del{' '}
          <Int href="/calculadoras/calculadora-factor-hora-extra">factor hora extra 42 horas</Int>,
          que ya incluye el recargo mínimo de 50%.
        </p>
      </Section>
    ),
  },
  finiquito: {
    bottom: (
      <>
        <Section title="Cómo se calcula el finiquito">
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base">
            <li>
              <strong>Indemnización por años de servicio:</strong> 30 días de la última remuneración
              mensual por cada año trabajado, con tope de 11 años (art. 163). La remuneración que se
              usa para el cálculo tiene un tope de 90 UF (art. 172) (
              <Ext href={DT_INDEMNIZACION}>DT</Ext>).
            </li>
            <li>
              <strong>Vacaciones proporcionales:</strong> los días de feriado ganados y no usados.
              Calcúlalos con la{' '}
              <Int href="/calculadoras/calculadora-vacaciones-proporcionales">
                calculadora de vacaciones proporcionales
              </Int>
              .
            </li>
            <li>
              <strong>Indemnización sustitutiva del aviso previo:</strong> una remuneración mensual,
              con tope de 90 UF (art. 172), cuando el empleador despide sin dar 30 días de aviso (
              <Ext href={DT_INDEMNIZACION}>DT</Ext>).
            </li>
            <li>
              <strong>Remuneraciones pendientes:</strong> días trabajados del mes y, si corresponde,
              la gratificación proporcional, con tope de 4,75 ingresos mínimos al año (
              <Ext href="https://www.dt.gob.cl/portal/1626/w3-article-99034.html">DT, art. 50</Ext>
              ).
            </li>
          </ol>
          <p className={pClass}>
            Para el detalle con ejemplos, revisa la{' '}
            <Int href="/guias/finiquito-laboral-chile">guía de finiquito laboral</Int>. Si solo
            necesitas una parte, usa la calculadora de{' '}
            <Int href="/calculadoras/calculadora-indemnizacion-anos-servicio">
              indemnización por años de servicio
            </Int>
            , la de <Int href="/calculadoras/calculadora-sueldo-liquido">sueldo líquido</Int> o el{' '}
            <Int href="/blog/checklist-despues-despido-chile-2026">checklist después del despido</Int>.
          </p>
        </Section>

        <Section title="Finiquito por renuncia vs. por despido">
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  {['Causal', 'Indemnización por años', 'Aviso previo', 'Vacaciones proporcionales'].map(
                    (h) => (
                      <th
                        key={h}
                        scope="col"
                        className="py-2 pr-4 text-left font-semibold text-[var(--foreground)] last:pr-0"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Renuncia voluntaria', 'No', 'No', 'Sí'],
                  [
                    'Necesidades de la empresa (art. 161)',
                    'Sí, con 1 año o más',
                    'Sí, si no hubo aviso de 30 días (tope de 90 UF)',
                    'Sí',
                  ],
                  ['Término de plazo fijo', 'No', 'No', 'Sí'],
                  ['Despido por falta grave (art. 160)', 'No', 'No', 'Sí'],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-[var(--border)] last:border-0">
                    {row.map((cell, j) =>
                      j === 0 ? (
                        <th
                          key={j}
                          scope="row"
                          className="py-2 pr-4 text-left font-medium text-[var(--foreground-secondary)]"
                        >
                          {cell}
                        </th>
                      ) : (
                        <td key={j} className="py-2 pr-4 text-[var(--foreground)] last:pr-0">
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={pClass}>
            Solo el despido por el art. 161 da indemnización por años de servicio (
            <Ext href="https://www.dt.gob.cl/legislacion/1624/w3-article-88293.html">DT</Ext>). Las
            vacaciones proporcionales se pagan en cualquier causal (
            <Ext href={DT_FERIADO}>DT, art. 73</Ext>), salvo en contratos de 30 días o menos, o de
            hasta 60 días con la prórroga.
          </p>
          <p className={pClass}>
            <strong>Si el despido es injustificado:</strong> si un juez lo declara así, la
            indemnización se recarga según el art. 168: 30 % si el art. 161 se aplicó mal, 50 % si
            la causal del art. 159 fue injustificada o no se dio una causal legal, 80 % si la causal
            del art. 160 fue improcedente, y 100 % en los casos del art. 160 N.º 1, 5 o 6 sin
            motivo plausible. Para demandar hay 60 días hábiles, o hasta 90 si antes se reclama en
            la Inspección del Trabajo (
            <Ext href="https://www.dt.gob.cl/legislacion/1624/w3-article-114437.html">DT</Ext>).{' '}
            <em>La calculadora no estima recargos judiciales.</em>
          </p>
        </Section>

        <Section title="Plazo para pagar el finiquito">
          <p className={pClass}>
            El empleador tiene 10 días hábiles desde la separación para pagar el finiquito (
            <Ext href={DT_PLAZO}>DT, art. 177</Ext>).
          </p>
        </Section>

        <Section title="Después del finiquito: cobra el seguro de cesantía">
          <p className={pClass}>
            El finiquito lo paga tu empleador. El seguro de cesantía es aparte: lo financia tu
            empleador y, si tienes contrato indefinido, también tú con un 0,6% de tu sueldo
            imponible (salvo en trabajo de casa particular, donde aporta solo el empleador). Se
            cobra en la <Ext href={AFC_COBRAR}>AFC</Ext>. Revisa{' '}
            <Int href={GUIA_COBRAR_CESANTIA}>cómo cobrar el seguro de cesantía en la AFC</Int>{' '}
            (documentos, pasos y fecha de pago) y{' '}
            <Int href={SIMULADOR_CESANTIA}>simula cuánto te paga el seguro de cesantía</Int> según
            tu sueldo y tu tipo de contrato. Fuente del financiamiento:{' '}
            <Ext href={LEY_19728}>Ley 19.728, art. 5</Ext>.
          </p>
        </Section>

        <Section title="Ejemplo con sueldo mínimo">
          <p className={pClass}>
            Con el ingreso mínimo de $553.553, una persona despedida por necesidades de la empresa
            con 2 años de antigüedad recibe por indemnización 2 × $553.553 = $1.107.106, a lo que se
            suman las vacaciones proporcionales y, si no hubo aviso, $553.553 de aviso previo (por
            debajo del tope de 90 UF). Ver el caso completo en el{' '}
            <Int href="/blog/finiquito-2026-ejemplo-sueldo-minimo">
              post de finiquito con sueldo mínimo
            </Int>
            .
          </p>
        </Section>

        <Section title="Cómo hacer el cálculo de finiquito paso a paso">
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base">
            <li>
              Identifica la causal de término (renuncia, necesidades de la empresa, mutuo acuerdo,
              etc.). De ella depende qué conceptos entran.
            </li>
            <li>Ingresa tu última remuneración mensual y tus años trabajados.</li>
            <li>Indica los días de vacaciones pendientes.</li>
            <li>
              La calculadora suma la indemnización por años de servicio y el aviso previo cuando
              corresponden, y las vacaciones proporcionales en todos los casos. Ver &quot;Cómo se
              calcula el finiquito&quot; más arriba.
            </li>
          </ol>
          <p className={pClass}>
            El resultado es una estimación. El monto final lo fija el finiquito firmado ante un
            ministro de fe, y ante dudas puedes consultar en la{' '}
            <Ext href={DT_INDEMNIZACION}>Dirección del Trabajo</Ext>.
          </p>
        </Section>

        <Section title="Más preguntas sobre el finiquito">
          <Faq
            items={[
              {
                q: '¿Cómo se calcula un finiquito?',
                a: 'Se suman los conceptos que correspondan según la causal: indemnización por años de servicio (si es despido por necesidades de la empresa o desahucio), indemnización sustitutiva del aviso previo (si no se avisó con 30 días) y vacaciones proporcionales o pendientes (siempre). En "Cómo se calcula el finiquito" está el detalle de cada uno.',
              },
              {
                q: '¿Cómo es el cálculo de finiquito por renuncia?',
                a: 'Si renuncias no recibes indemnización por años de servicio ni aviso previo, salvo que tu contrato o un convenio colectivo diga otra cosa. Sí te corresponden las vacaciones proporcionales y pendientes, y las remuneraciones adeudadas. Ver "Finiquito por renuncia vs. por despido".',
              },
              {
                q: '¿Cuánto se demora en pagar un finiquito?',
                a: 'Ver "Plazo para pagar el finiquito", más arriba en esta página, con su fuente de la Dirección del Trabajo.',
              },
              {
                q: '¿Sirve el simulador de finiquito de la DT o ChileAtiende?',
                a: 'Sí, es una referencia oficial. Esta calculadora usa las mismas reglas del Código del Trabajo y muestra el cálculo paso a paso. Ninguna de las dos reemplaza el finiquito firmado.',
              },
            ]}
          />
        </Section>
        <section className={sectionClass}>
          <p className={pClass}>
            <strong>¿Terminó tu contrato? Arma tu CV.</strong> Mientras revisas tu finiquito,
            prepara tu currículum en minutos en{' '}
            <Ext href={CVLISTO_FINIQUITO}>cvlisto.cl</Ext>.
          </p>
        </section>
      </>
    ),
  },
  'indemnizacion-anos-servicio': {
    bottom: (
      <>
        <Section title="¿Quién tiene derecho a indemnización por años de servicio?">
          <p className={pClass}>
            Por ley, la indemnización por años de servicio corresponde cuando el empleador pone
            término al contrato por{' '}
            <strong>necesidades de la empresa o desahucio (art. 161)</strong> y el contrato duró{' '}
            <strong>un año o más</strong> (<Ext href={DT_IAS_DERECHO}>DT</Ext>).
          </p>
          <ul className={ulClass}>
            <li>
              <strong>Art. 159</strong> (renuncia, mutuo acuerdo, vencimiento del plazo, término de
              la obra o faena, muerte del trabajador, caso fortuito): no da indemnización por años
              de servicio por ley. El contrato por obra o faena tiene su propia indemnización (ver
              más abajo).
            </li>
            <li>
              <strong>Art. 160</strong> (causales disciplinarias, como falta de probidad o abandono
              del trabajo): no da indemnización.
            </li>
            <li>
              En ambos casos sí corresponde si el contrato o un contrato colectivo la pactan, o si
              un juez declara que el despido fue injustificado o indebido (
              <Ext href={DT_IAS_DESPIDO}>DT</Ext>).
            </li>
          </ul>
          <h3 className={h3Class}>¿Se paga indemnización por renuncia voluntaria?</h3>
          <p className={pClass}>
            No por ley. Solo si tu contrato o un contrato colectivo la pactan. Con cualquier causal
            sí recibes el feriado proporcional y lo que se te adeude (ver la{' '}
            <Int href="/calculadoras/calculadora-vacaciones-proporcionales">
              calculadora de vacaciones proporcionales
            </Int>
            ).
          </p>
        </Section>

        <Section title="Cómo se calcula la indemnización por años de servicio">
          <ol className={olClass}>
            <li>
              <strong>Suma tu última remuneración mensual</strong>: sueldo, gratificación mensual y
              los demás pagos mensuales.
            </li>
            <li>
              <strong>Aplica el tope de {IAS.topeUF} UF</strong> a esa suma.
            </li>
            <li>
              <strong>Cuenta los años</strong>: cada año completo y la fracción superior a seis
              meses suman un año, hasta {IAS.anios} años.
            </li>
            <li>
              <strong>Multiplica</strong>: (remuneración ÷ 30) × {IAS.dias} días × años. En la
              práctica, es una remuneración mensual por cada año.
            </li>
            <li>
              <strong>Suma la sustitutiva</strong> si no te avisaron con 30 días (art. 161).
            </li>
          </ol>
          <p className={pClass}>
            Ejemplo: sueldo base de {formatCLP(IAS_EJ1_INPUT.sueldo)}, gratificación mensual de{' '}
            {formatCLP(IAS_EJ1_INPUT.grat)} y colación y movilización por{' '}
            {formatCLP(IAS_EJ1_INPUT.otros)}; trabajaste 7 años y 8 meses; te despiden por
            necesidades de la empresa sin aviso.
          </p>
          <ul className={ulClass}>
            <li>
              Base: {formatCLP(IAS_EJ1_INPUT.sueldo)} + {formatCLP(IAS_EJ1_INPUT.grat)} +{' '}
              {formatCLP(IAS_EJ1_INPUT.otros)} = <strong>{formatCLP(IAS_EJ1.baseCalculo)}</strong>{' '}
              (bajo el tope de {IAS.topeCLP}).
            </li>
            <li>
              Años: 7 años y 8 meses → <strong>{IAS_EJ1.añosIndemnizables} años</strong>.
            </li>
            <li>
              Indemnización por años: {formatCLP(IAS_EJ1.baseCalculo)} × {IAS_EJ1.añosIndemnizables}{' '}
              = <strong>{formatCLP(IAS_EJ1.indemnizacionTotal)}</strong>.
            </li>
            <li>
              Sustitutiva del aviso previo:{' '}
              <strong>{formatCLP(IAS_EJ1.indemnizacionAvisoPrevio)}</strong>.
            </li>
            <li>
              Total: <strong>{formatCLP(IAS_EJ1.totalAPagar)}</strong>.
            </li>
          </ul>
          <p className={pClass}>
            Con remuneración sobre el tope (ejemplo: {formatCLP(5_000_000)} y 14 años): la base
            queda en {IAS.topeCLP}, los años en {IAS.anios}, y la indemnización por años es{' '}
            <strong>{formatCLP(IAS_EJ2.indemnizacionTotal)}</strong>; la sustitutiva también queda
            en {formatCLP(IAS_EJ2.indemnizacionAvisoPrevio)}. Cifras con la UF del {IAS.ufFecha}.
          </p>
          <h3 className={h3Class}>Qué entra en la base de cálculo</h3>
          <p className={pClass}>
            Entra todo lo que recibías cada mes por tu trabajo: sueldo, comisiones, bonos mensuales,
            semana corrida, gratificación pagada mes a mes y las asignaciones de colación y
            movilización. No entran las horas extra, la asignación familiar legal ni los pagos
            esporádicos o anuales, como aguinaldos o la gratificación anual (
            <Ext href={DT_IAS_BASE}>DT</Ext>).
          </p>
          <h3 className={h3Class}>Tope de {IAS.topeUF} UF</h3>
          <p className={pClass}>
            La remuneración que se usa no puede pasar de {IAS.topeUF} UF, con el valor de la UF del
            último día del mes anterior al pago. Con la UF del {IAS.ufFecha}, {IAS.topeUF} UF son{' '}
            {IAS.topeCLP}. El mismo tope se aplica a la indemnización sustitutiva del aviso previo (
            <Ext href={DT_INDEMNIZACION}>DT</Ext>).
          </p>
          <h3 className={h3Class}>Tope de {IAS.anios} años y contratos anteriores a 1981</h3>
          <p className={pClass}>
            El máximo es {IAS.topeDias} días de remuneración ({IAS.anios} años) para quienes fueron
            contratados desde el 14 de agosto de 1981 (<Ext href={DT_IAS_DESPIDO}>DT</Ext>). Quienes
            fueron contratados antes de esa fecha, y cuyo contrato estaba vigente al 1 de diciembre
            de 1990, no tienen tope de años (<Ext href={DT_IAS_SIN_TOPE}>DT</Ext>). La calculadora
            no cubre ese caso.
          </p>
        </Section>

        <Section title="Aviso previo y carta de despido">
          <p className={pClass}>
            Si te despiden por el art. 161, el empleador debe avisarte por escrito con{' '}
            <strong>30 días de anticipación</strong> o pagarte la{' '}
            <strong>indemnización sustitutiva del aviso previo</strong>, equivalente a un mes de tu
            última remuneración (<Ext href={DT_IAS_AVISO}>DT</Ext>). La sustitutiva se paga
            completa, no en proporción a los días que faltaron (
            <Ext href={DT_IAS_SUSTITUTIVA}>DT</Ext>).
          </p>
          <p className={pClass}>
            La carta de despido debe (<Ext href={DT_IAS_CARTA}>DT</Ext>):
          </p>
          <ul className={ulClass}>
            <li>
              entregarse en persona o enviarse por carta certificada (también existe la carta
              electrónica, <Ext href={DT_IAS_CARTA_ELECTRONICA}>DT</Ext>);
            </li>
            <li>
              indicar la causal, los hechos en que se funda y, en el art. 161, el monto de las
              indemnizaciones;
            </li>
            <li>
              informar el estado de pago de tus cotizaciones previsionales, con los comprobantes;
            </li>
            <li>enviarse con copia a la Inspección del Trabajo.</li>
          </ul>
          <p className={pClass}>
            Plazos de entrega: 30 días antes en el art. 161 (o sin aviso, pagando la sustitutiva); 3
            días hábiles desde la separación en las causales de los arts. 159 y 160; 6 días hábiles
            en caso fortuito o fuerza mayor (<Ext href={DT_IAS_CARTA}>DT</Ext>). Al firmar el
            finiquito puedes dejar una reserva de derechos sobre lo que no compartes (
            <Int href="/guias/finiquito-laboral-chile">guía de finiquito</Int>).
          </p>
        </Section>

        <Section title="Recargos si el despido es injustificado (art. 168)">
          <p className={pClass}>
            Si demandas dentro de 60 días hábiles y el juez declara el despido injustificado,
            indebido o improcedente, ordena pagar la indemnización por años de servicio con un
            recargo (<Ext href={DT_ORD_296}>DT, ORD. 296</Ext>):
          </p>
          <ul className={ulClass}>
            <li>
              <strong>{RECARGO_ART_168.necesidades_empresa}%</strong> si se aplicó mal el art. 161;
            </li>
            <li>
              <strong>{RECARGO_ART_168.causal_no_demostrada}%</strong> si se invocaron causales del
              art. 159 sin justificación o no se invocó ninguna causal;
            </li>
            <li>
              <strong>{RECARGO_ART_168.falta_probidad}%</strong> si se aplicaron indebidamente
              causales del art. 160;
            </li>
            <li>
              <strong>{RECARGO_ART_168.aplicacion_indebida}%</strong> si se invocaron los N° 1, 5 o
              6 del art. 160 y el juez declara además que no había motivo plausible.
            </li>
          </ul>
          <p className={pClass}>
            En esos casos también corresponde la sustitutiva del aviso previo. Los recargos los
            declara un juez; la calculadora los muestra solo si marcas la opción de sentencia.
          </p>
        </Section>

        <Section title="Autodespido (art. 171)">
          <p className={pClass}>
            Si es el empleador quien incurre en ciertas causales del art. 160, puedes poner término
            al contrato tú mismo con una carta escrita, con copia a la Inspección del Trabajo, y
            demandar dentro de 60 días hábiles. Si el juez acoge la demanda, ordena pagar la
            sustitutiva y la indemnización por años de servicio, aumentada en{' '}
            {RECARGO_ART_171.conducta_grave_o_seguridad}% por los N° 1 y 5 del art. 160 y en{' '}
            {RECARGO_ART_171.incumplimiento_grave}% por el N° 7 (<Ext href={DT_AUTODESPIDO}>DT</Ext>
            ).
          </p>
        </Section>

        <Section title="Contrato por obra o faena">
          <p className={pClass}>
            En los contratos por obra o faena celebrados desde el 1 de enero de 2022, al terminar la
            obra corresponde una indemnización de 2,5 días de remuneración por cada mes trabajado y
            fracción superior a 15 días (<Ext href={DT_OBRA_FAENA}>DT</Ext>).
          </p>
        </Section>

        <Section title="¿La indemnización paga impuestos?">
          <p className={pClass}>
            Las indemnizaciones legales, y las pactadas en contratos o convenios colectivos, no
            constituyen renta. Si recibes otras indemnizaciones por término de contrato, se suman
            para ver qué parte tributa (<Ext href={SII_INDEMNIZACION}>SII</Ext>). Los recargos que
            ordena un juez tampoco constituyen renta (
            <Ext href={SII_OFICIO_988}>SII, Oficio 988</Ext>).
          </p>
        </Section>

        <Section title="Plazo de pago y qué hacer si no te pagan">
          <ul className={ulClass}>
            <li>
              El empleador tiene <strong>10 días hábiles</strong> desde la separación para pagarte
              el finiquito (<Ext href={DT_PLAZO}>DT</Ext>).
            </li>
            <li>
              Solo puede pagarse en cuotas si lo acuerdan y lo ratifican ante la Inspección del
              Trabajo. Si no paga una cuota, se hace exigible el total, y el juez puede incrementar
              la deuda hasta en 150% (<Ext href={DT_IAS_CUOTAS}>DT</Ext>;{' '}
              <Ext href={DT_IAS_DESPIDO}>DT</Ext>).
            </li>
            <li>
              Puedes reclamar en la Inspección del Trabajo o demandar dentro de 60 días hábiles.
              Para casos concretos, consulta en la Inspección o con un abogado.
            </li>
            <li>
              Revisa también tu <Int href="/cesantia">seguro de cesantía</Int> (
              <Int href="/calculadoras/calculadora-seguro-cesantia">calculadora</Int>;{' '}
              <Int href="/blog/seguro-cesantia-finiquito-2026-afc">guía AFC</Int>), el{' '}
              <Int href="/calculadoras/calculadora-finiquito">finiquito completo</Int>, el{' '}
              <Int href="/blog/finiquito-2026-ejemplo-sueldo-minimo">ejemplo con sueldo mínimo</Int>{' '}
              y el{' '}
              <Int href="/blog/checklist-despues-despido-chile-2026">
                checklist después de un despido
              </Int>
              .
            </li>
          </ul>
        </Section>

        <Section title="Más preguntas sobre la indemnización">
          <Faq
            items={[
              {
                q: '¿Qué indemnización me corresponde por despido injustificado?',
                a: (
                  <>
                    Si el juez declara injustificado el despido, ordena pagar la indemnización por
                    años de servicio con el recargo que corresponda a la causal (
                    {RECARGO_ART_168.necesidades_empresa}%, {RECARGO_ART_168.causal_no_demostrada}
                    %, {RECARGO_ART_168.falta_probidad}% o {RECARGO_ART_168.aplicacion_indebida}%) y
                    la sustitutiva del aviso previo si no se dio. Hay que demandar dentro de 60 días
                    hábiles (<Ext href={DT_ORD_296}>DT, ORD. 296</Ext>).
                  </>
                ),
              },
              {
                q: '¿Cuáles son los 3 tipos de despido?',
                a: (
                  <>
                    El Código del Trabajo agrupa las causales en tres artículos: el 159 (causas
                    objetivas, como renuncia, mutuo acuerdo o fin del plazo), el 160 (causas
                    disciplinarias, sin indemnización) y el 161 (necesidades de la empresa o
                    desahucio, con indemnización por años de servicio si llevabas un año o más) (
                    <Ext href={DT_IAS_DERECHO}>DT</Ext>; <Ext href={DT_IAS_DESPIDO}>DT</Ext>).
                  </>
                ),
              },
            ]}
          />
        </Section>

        <Section title="Si te despidieron: seguro de cesantía">
          <p className={pClass}>
            La indemnización por años de servicio la paga tu empleador. Además, puedes cobrar el
            seguro de cesantía en la <Ext href={AFC_COBRAR}>AFC</Ext>:{' '}
            <Int href={SIMULADOR_CESANTIA}>simula cuánto te paga el seguro de cesantía</Int> y sigue
            la guía de{' '}
            <Int href={GUIA_COBRAR_CESANTIA}>cómo cobrar el seguro de cesantía en la AFC</Int>. Para
            el monto total del término de contrato, usa la{' '}
            <Int href="/calculadoras/calculadora-finiquito">calculadora de finiquito</Int>.
          </p>
        </Section>
      </>
    ),
  },
  contribuciones: {
    top: (
      <aside className="mb-6 rounded-2xl border border-[var(--color-primary-600)] bg-[var(--surface)] p-5 md:p-6">
        <p className="text-sm leading-relaxed text-[var(--foreground)] md:text-base">
          <strong>4.ª cuota 2026: vence el lunes 30 de noviembre.</strong> Puedes pagarla en el sitio
          de la <Ext href={TGR}>Tesorería General de la República</Ext> con tu rol de avalúo o tu
          RUT. <Ext href={SII_CUOTAS}>Fuente: SII</Ext>
        </p>
      </aside>
    ),
    bottom: (
      <>
        <Section title="¿Cuándo se pagan las contribuciones?">
          <p className={pClass}>
            Las contribuciones se pagan en cuatro cuotas al año. La cuarta cuota de 2026 vence el
            lunes 30 de noviembre (<Ext href={SII_CUOTAS}>SII</Ext>). Las otras tres vencen el 30 de
            abril, el 30 de junio y el 30 de septiembre. Si la fecha cae en fin de semana o feriado,
            se paga el día hábil siguiente sin recargo (<Ext href={SII_CUOTAS}>SII</Ext>).
          </p>
        </Section>

        <Section title="Cómo se calcula tu cuota">
          <p className={pClass}>
            El monto depende del avalúo fiscal de tu propiedad, que fija el SII. En las viviendas, la
            parte del avalúo hasta $61.711.570 está exenta desde el 1 de julio de 2026. Sobre el
            resto se aplica una tasa anual de 0,893 % hasta un avalúo de $220.398.431, y de 1,042 %
            sobre lo que exceda ese monto (<Ext href={SII_TASAS}>SII</Ext>). El total anual se divide
            en cuatro cuotas.
          </p>
          <p className={pClass}>
            Ingresa el avalúo fiscal en la calculadora de arriba para ver tu cuota estimada. El monto
            oficial es el que informa la TGR en tu cupón de pago.
          </p>
          <p className={pClass}>
            <strong>Ejemplo:</strong> una vivienda con avalúo fiscal de $100.000.000.
          </p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base">
            <li>Parte afecta: $100.000.000 − $61.711.570 = $38.288.430.</li>
            <li>Impuesto anual: $38.288.430 × 0,893 % = $341.916.</li>
            <li>Cuota trimestral aproximada: $341.916 ÷ 4 = $85.479.</li>
          </ol>
          <p className={pClass}>
            <em>
              El ejemplo es una estimación: no incluye sobretasas, reajustes o montos que agregue la
              TGR. El valor oficial es el de tu cupón.
            </em>
          </p>
        </Section>

        <Section title="Cómo pagar las contribuciones por rol o por RUT">
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base">
            <li>
              Entra al sitio de la <Ext href={TGR}>Tesorería General de la República</Ext>.
            </li>
            <li>Busca tu propiedad por rol de avalúo o por RUT del propietario.</li>
            <li>Elige la cuota y paga en línea.</li>
          </ol>
          <p className={pClass}>
            Si no conoces tu rol, aparece en el cupón de pago o en el certificado de avalúo del SII.{' '}
            <em>calculadorachile.cl no recibe pagos: solo te ayuda a estimar el monto.</em> Si tienes
            deudas con la TGR, revisa también los{' '}
            <Int href="/blog/embargos-cae-tgr-2026-cuentas-bienes-raices">embargos de la TGR</Int>.
          </p>
        </Section>

        <Section title="Más preguntas sobre contribuciones">
          <Faq
            items={[
              {
                q: '¿Cuándo se pagan las contribuciones?',
                a: 'En cuatro cuotas al año. La cuarta cuota de 2026 vence el lunes 30 de noviembre, según el SII.',
              },
              {
                q: '¿Cómo pago las contribuciones por rol?',
                a: 'En el sitio de la TGR, con el rol de avalúo de la propiedad: lo ingresas, eliges la cuota y pagas en línea.',
              },
              {
                q: '¿Cómo pago las contribuciones por RUT?',
                a: 'En el mismo sitio de la TGR también puedes buscar las propiedades por el RUT del propietario.',
              },
            ]}
          />
          <p className={pClass}>
            Lee más:{' '}
            <Int href="/blog/contribuciones-cuarta-cuota-noviembre-2026">
              Cuarta cuota de contribuciones 2026
            </Int>
          </p>
        </Section>
      </>
    ),
  },
  'boleta-honorarios': {
    top: (
      <Section title="Cómo calcular la boleta de honorarios">
        <p className={pClass}>
          <strong>De bruto a líquido:</strong> multiplica el bruto por 0,8475 (100% − 15,25%) (
          <Ext href={SII_RETENCION_2026}>SII</Ext>).
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base">
          <li>
            $100.000 × 0,8475 = <strong>$84.750</strong> líquidos (retención $15.250)
          </li>
          <li>
            $1.000.000 × 0,8475 = <strong>$847.500</strong> líquidos (retención $152.500)
          </li>
        </ul>
        <p className={pClass}>
          <strong>De líquido a bruto:</strong> si acordaste un monto líquido, divídelo por 0,8475.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base">
          <li>
            $1.000.000 ÷ 0,8475 = <strong>$1.179.941</strong> brutos (retención $179.941)
          </li>
        </ul>
      </Section>
    ),
    bottom: (
      <>
        <Section title="Qué cubre la retención">
          <p className={pClass}>
            Lo retenido no es solo impuesto. En la Operación Renta se usa primero para pagar las
            cotizaciones de seguridad social de los trabajadores independientes (Ley 21.133) y lo
            que sobra se imputa al impuesto o se devuelve (<Ext href={SII_RETENCION_2026}>SII</Ext>
            ). Es un pago provisional que se reliquida en el Formulario 22. Más detalle en la{' '}
            <Int href="/guias/iva-boleta-honorarios-chile">guía de IVA y boleta de honorarios</Int>.
            Si tienes un sueldo de contrato, compáralo con la{' '}
            <Int href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</Int>
            .
          </p>
        </Section>

        <Section title="Emitir la boleta">
          <p className={pClass}>
            Esta página calcula montos. Para emitir la boleta, entra con tu RUT y clave en{' '}
            <Ext href="https://www.sii.cl">sii.cl</Ext>. El paso a paso está en la{' '}
            <Int href="/guias/iva-boleta-honorarios-chile">guía</Int>.
          </p>
        </Section>

        <Section title="Más preguntas sobre la boleta de honorarios">
          <Faq
            items={[
              {
                q: '¿Cómo se hace el cálculo de boleta de honorarios?',
                a: (
                  <>
                    Multiplica el monto bruto por 0,8475 para obtener el líquido de 2026, o divide
                    el líquido por 0,8475 para obtener el bruto. Ejemplo: $100.000 brutos dejan
                    $84.750 líquidos (<Ext href={SII_RETENCION_2026}>SII</Ext>).
                  </>
                ),
              },
              {
                q: '¿Cuánto se retiene en una boleta de honorarios en 2026?',
                a: (
                  <>
                    15,25% del monto bruto, entre el 1 de enero y el 31 de diciembre de 2026 (
                    <Ext href={SII_RETENCION_2026}>SII</Ext>).
                  </>
                ),
              },
              {
                q: '¿Cómo emitir una boleta de honorarios?',
                a: (
                  <>
                    En <Ext href="https://www.sii.cl">sii.cl</Ext>, con tu RUT y clave tributaria.
                    La{' '}
                    <Int href="/guias/iva-boleta-honorarios-chile">
                      guía de IVA y boleta de honorarios
                    </Int>{' '}
                    explica el paso a paso.
                  </>
                ),
              },
            ]}
          />
        </Section>
      </>
    ),
  },
  'licencia-medica': {
    bottom: (
      <>
        <Section title="¿Por qué no me pagan los 3 primeros días?">
          <p className={pClass}>
            Es el período de carencia: en una licencia de 10 días o menos, el subsidio se paga desde
            el 4.º día. Si la licencia dura más de 10 días, se paga desde el día 1 (
            <Ext href={SUSESO_SIL}>SUSESO</Ext> ·{' '}
            <Ext href={DT_CARENCIA}>Dirección del Trabajo</Ext>
            ).
          </p>
          <p className={pClass}>
            Tu empleador no está obligado a pagarte esos 3 días, salvo que lo diga tu contrato
            individual o colectivo, un convenio o un fallo arbitral (
            <Ext href={SUSESO_CARENCIA_EMPLEADOR}>SUSESO</Ext>). En una licencia de 4 a 10 días, las
            cotizaciones de los días de carencia las paga la entidad que paga el subsidio (
            <Ext href={DT_CARENCIA}>Dirección del Trabajo</Ext>).
          </p>
        </Section>

        <Section title="¿Cuánto me pagan por día?">
          <p className={pClass}>
            Cada día pagado vale 1/30 de tu remuneración mensual neta promedio (imponible menos
            cotizaciones e impuestos) de los 3 meses calendario anteriores al mes en que empieza la
            licencia (<Ext href={SUSESO_SIL}>SUSESO</Ext>).
          </p>
          <p className={pClass}>
            El subsidio diario no puede ser menor a <strong>{LICENCIA_MINIMO_DIARIO}</strong>: la
            mitad del ingreso mínimo para fines no remuneracionales (
            {formatCLP(INGRESO_MINIMO.no_remuneracional)}, Ley {INGRESO_MINIMO.ley}) dividida por 30
            (<Ext href={DT_INGRESO_MINIMO}>Dirección del Trabajo</Ext>).
          </p>
          <p className={pClass}>
            Para recibirlo necesitas 6 meses de afiliación previsional y 3 meses de cotizaciones
            dentro de los 6 meses anteriores a la licencia. Si te contratan por día, por turnos o
            jornadas, basta 1 mes de cotizaciones (<Ext href={SUSESO_SIL}>SUSESO</Ext>).
          </p>
        </Section>

        <Section title="¿Quién paga la licencia?">
          <SimpleTable
            headers={['Tu sistema de salud', 'Quién paga el subsidio']}
            rows={[
              ['Fonasa, empleador sin Caja de Compensación', 'La COMPIN'],
              ['Fonasa, empleador afiliado a una Caja', 'La Caja de Compensación'],
              ['Isapre', 'La Isapre'],
            ]}
          />
          <p className={pClass}>
            Fuente: <Ext href={SUSESO_QUIEN_PAGA}>SUSESO, Compendio de licencias médicas</Ext>. Para
            la remuneración neta, usa las liquidaciones de los 3 meses calendario anteriores al
            mes en que empieza la licencia: el imponible menos las cotizaciones y el impuesto. No uses el líquido a pago tal cual, porque suma haberes no
            imponibles (colación, movilización) y resta descuentos personales. Para entender cada
            descuento, revisa la{' '}
            <Int href="/calculadoras/calculadora-sueldo-liquido">calculadora de sueldo líquido</Int>{' '}
            o la <Int href="/guias/sueldo-liquido-chile">guía de sueldo líquido</Int>.
          </p>
        </Section>

        <Section title="¿Y si tengo otra licencia por lo mismo?">
          <p className={pClass}>
            Si una licencia se da inmediatamente a continuación de otra y por el mismo diagnóstico,
            se consideran una sola licencia para contar los días pagados y calcular el monto (
            <Ext href={SUSESO_SIL}>SUSESO</Ext>). Por ejemplo, 7 días seguidos de otros 7 por lo
            mismo suman 14 días: se pagan desde el día 1. La calculadora no suma licencias por su
            cuenta: en ese caso ingresa el total de días (14).
          </p>
        </Section>

        <Section title="Preguntas frecuentes sobre la licencia médica">
          <Faq
            items={[
              {
                q: 'Si me dan 10 días de licencia, ¿cuántos me pagan?',
                a: (
                  <>
                    {LICENCIA_10.diasPagados} días: del 4.º al 10.º. Los 3 primeros no se pagan
                    porque la licencia no supera 10 días (<Ext href={SUSESO_SIL}>SUSESO</Ext>).
                  </>
                ),
              },
              {
                q: 'Por 3 días de licencia médica, ¿cuánto me pagan?',
                a: (
                  <>
                    El subsidio es {formatCLP(LICENCIA_3.totalSubsidio)}: en una licencia de 3 días
                    todos caen en el período de carencia. Tu empleador solo te los paga si lo dice
                    tu contrato, un convenio o un fallo arbitral (
                    <Ext href={SUSESO_CARENCIA_EMPLEADOR}>SUSESO</Ext>).
                  </>
                ),
              },
              {
                q: '¿Desde cuántos días pagan la licencia?',
                a: (
                  <>
                    Con 11 días o más se paga desde el día 1. Con 10 días o menos, desde el 4.º día
                    (<Ext href={DT_CARENCIA}>Dirección del Trabajo</Ext>).
                  </>
                ),
              },
              {
                q: '¿Cómo se calcula el pago de una licencia médica?',
                a: (
                  <>
                    Remuneración neta promedio de los 3 meses anteriores ÷ 30 × días pagados, con un
                    mínimo de {LICENCIA_MINIMO_DIARIO} por día (<Ext href={SUSESO_SIL}>SUSESO</Ext>
                    ).
                  </>
                ),
              },
              {
                q: '¿Quién paga la licencia médica?',
                a: (
                  <>
                    Con Fonasa, la COMPIN o la Caja de Compensación si tu empleador está afiliado a
                    una. Con Isapre, la Isapre (<Ext href={SUSESO_QUIEN_PAGA}>SUSESO</Ext>).
                  </>
                ),
              },
            ]}
          />
          <p className={pClass}>
            <em>Contenido verificado al 29-10-2026.</em>
          </p>
        </Section>
      </>
    ),
  },
  'seguro-cesantia': {
    bottom: (
      <>
        <Section title="Cuenta individual vs. Fondo Solidario: cuál se usa primero">
          <p className={pClass}>
            Primero se paga con el saldo de tu Cuenta Individual de Cesantía (CIC):{' '}
            {CIC.porcentajes.join('%, ')}% de tu remuneración promedio en los pagos sucesivos, hasta
            que se acabe el saldo (<Ext href={CA_SEGURO_CESANTIA}>ChileAtiende</Ext>). Si tu cuenta
            no alcanza para {FCS.pagos} pagos y cumples los requisitos, el Fondo de Cesantía
            Solidario completa los pagos, con un mínimo y un máximo por giro (
            <Ext href={AFC_REQUISITOS}>AFC</Ext>).
          </p>
        </Section>

        <Section title="Mínimos y máximos del Fondo Solidario 2026">
          <h3 className="mt-4 text-base font-semibold text-[var(--foreground)]">
            Contrato indefinido
          </h3>
          <SimpleTable
            headers={['Giro', '% de la remuneración', 'Mínimo', 'Máximo']}
            rows={FCS.indefinido.porcentajes.map((pct, i) => [
              `${i + 1}.º`,
              `${pct}%`,
              formatCLP(FCS.indefinido.minimos[i]),
              formatCLP(FCS.indefinido.maximos[i]),
            ])}
          />
          <h3 className="mt-6 text-base font-semibold text-[var(--foreground)]">
            Contrato a plazo fijo, por obra o servicio
          </h3>
          <SimpleTable
            headers={['Giro', '% de la remuneración', 'Mínimo', 'Máximo']}
            rows={FCS.plazoFijo.porcentajes.map((pct, i) => [
              `${i + 1}.º`,
              `${pct}%`,
              formatCLP(FCS.plazoFijo.minimos[i]),
              formatCLP(FCS.plazoFijo.maximos[i]),
            ])}
          />
          <p className={pClass}>
            Montos vigentes hasta el {fechaDMY(FCS.vigenteHasta)} (
            <Ext href={SP_FCS_MONTOS}>Superintendencia de Pensiones</Ext>).
          </p>
        </Section>

        <Section title="¿Es igual al simulador de AFC?">
          <p className={pClass}>
            No. El simulador de AFC usa tu saldo real y requiere iniciar sesión; esta calculadora es
            una estimación sin login. Incluso el resultado de AFC es orientativo: el monto real lo
            calcula AFC al aprobar tu solicitud (<Ext href={AFC_SIMULE}>AFC, simule su cobro</Ext>).
          </p>
        </Section>

        <Section title="Requisitos para que el simulador aplique">
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base">
            <li>
              Cuenta individual: {CIC.minCotizaciones.indefinido} cotizaciones con contrato
              indefinido o {CIC.minCotizaciones.plazoFijo} con contrato a plazo fijo, por obra o
              servicio (<Ext href={CA_SEGURO_CESANTIA}>ChileAtiende</Ext>).
            </li>
            <li>
              Fondo Solidario: {FCS.minCotizaciones24m} cotizaciones en los últimos 24 meses, las
              últimas {FCS.ultimasContinuasMismoEmpleador} continuas con el mismo empleador, y un
              despido por una causal que dé derecho al Fondo. Si renunciaste, solo usas tu cuenta
              individual (<Ext href={AFC_REQUISITOS}>AFC</Ext>).
            </li>
          </ul>
          <p className={pClass}>
            Para el trámite y las fechas de pago, revisa{' '}
            <Int href="/blog/como-cobrar-seguro-cesantia-afc-2026">
              cómo cobrar el seguro de cesantía
            </Int>
            .
          </p>
        </Section>

        <Section title="Preguntas frecuentes sobre el simulador">
          <Faq
            items={[
              {
                q: '¿Cómo se calcula el seguro de cesantía en Chile?',
                a: (
                  <>
                    Cada pago es un porcentaje de tu remuneración promedio: el primero es el{' '}
                    {CIC.porcentajes[0]}% y luego baja, hasta donde alcance tu saldo. Se paga con tu cuenta individual y, si no
                    alcanza y cumples los requisitos, con el Fondo Solidario (
                    <Ext href={CA_SEGURO_CESANTIA}>ChileAtiende</Ext>).
                  </>
                ),
              },
              {
                q: '¿Cuánto paga el seguro de cesantía?',
                a: (
                  <>
                    Depende de tu remuneración y de tu saldo. Con el Fondo Solidario y contrato
                    indefinido, el primer giro va de {formatCLP(FCS.indefinido.minimos[0])} a{' '}
                    {formatCLP(FCS.indefinido.maximos[0])} (
                    <Ext href={SP_FCS_MONTOS}>Superintendencia de Pensiones</Ext>).
                  </>
                ),
              },
              {
                q: '¿Cómo se calcula el seguro de cesantía solidario?',
                a: (
                  <>
                    Con un porcentaje de tu remuneración promedio por giro, sin bajar del mínimo ni
                    pasar del máximo de cada giro. Tu cuenta individual paga primero y el Fondo pone
                    la diferencia (<Ext href={SP_FCS_MONTOS}>Superintendencia de Pensiones</Ext>
                    ).
                  </>
                ),
              },
              {
                q: '¿Cuánto dinero es el seguro de cesantía?',
                a: (
                  <>
                    No es un monto fijo. Usa esta calculadora para estimarlo y confirma el monto
                    real en tu solicitud en AFC (<Ext href={AFC_SIMULE}>AFC</Ext>).
                  </>
                ),
              },
            ]}
          />
          <p className={pClass}>
            <em>Contenido verificado al 29-10-2026.</em>
          </p>
        </Section>

        <Section title="Giros adicionales del Fondo de Cesantía Solidario">
        <p className={pClass}>
          Si la tasa de desempleo del INE supera en más de 1 punto su promedio de los 4 años
          anteriores, quienes cobran el 5° giro del Fondo de Cesantía Solidario reciben 2 giros
          adicionales de 30% de la remuneración promedio (mínimo $129.085, máximo $430.288).
        </p>
        <p className={pClass}>
          Fuentes:{' '}
          <Ext href="https://www.bcn.cl/leychile/navegar?idNorma=184979">Ley 19.728, art. 25</Ext>{' '}
          ·{' '}
          <Ext href="https://www.spensiones.cl/portal/institucional/594/w3-article-17135.html">
            Superintendencia de Pensiones
          </Ext>{' '}
          ·{' '}
          <Ext href="https://www.spensiones.gob.cl/portal/institucional/594/w3-propertyvalue-9925.html">
            Superintendencia de Pensiones: montos
          </Ext>
        </p>
      </Section>
      </>
    ),
  },
  iva: {
    bottom: (
      <Section title="Calculadoras y guías relacionadas">
        <p className={pClass}>
          Si emites boletas, revisa la{' '}
          <Int href="/calculadoras/calculadora-boleta-honorarios">
            retención de boleta de honorarios
          </Int>
          ; si eres contribuyente con IVA, estima tu{' '}
          <Int href="/calculadoras/calculadora-ppm">PPM mensual</Int> o lee la{' '}
          <Int href="/guias/iva-boleta-honorarios-chile">guía del IVA y boletas</Int>.
        </p>
      </Section>
    ),
  },
  ppm: {
    bottom: (
      <Section title="Calculadoras relacionadas">
        <p className={pClass}>
          Para separar neto, IVA y total de tus ventas, usa la{' '}
          <Int href="/calculadoras/calculadora-iva">calculadora de IVA</Int>.
        </p>
      </Section>
    ),
  },
  'sueldo-liquido': {
    bottom: (
      <Section title="Calculadoras y guías relacionadas">
        <p className={pClass}>
          Revisa el detalle del{' '}
          <Int href="/calculadoras/calculadora-impuesto-segunda-categoria">
            impuesto único de segunda categoría
          </Int>
          , compara la <Int href="/calculadoras/calculadora-comparador-afp">comisión de tu AFP</Int>
          , calcula la{' '}
          <Int href="/calculadoras/calculadora-gratificacion-legal">gratificación legal</Int> y las{' '}
          <Int href="/calculadoras/calculadora-horas-extra">horas extra</Int> (o solo el{' '}
          <Int href="/calculadoras/calculadora-factor-hora-extra">
            factor hora extra con jornada de 42 horas
          </Int>
          ), o lee la{' '}
          <Int href="/guias/sueldo-liquido-chile">guía de sueldo líquido</Int>.
        </p>
      </Section>
    ),
  },
  'aguinaldo': {
    bottom: (
      <Section title="Bono de vacaciones del sector público">
        <p className={pClass}>
          El bono de vacaciones del sector público es otro beneficio, distinto del aguinaldo de
          Navidad (anualidad 2026). Esta calculadora no lo estima. El texto vigente está explicado
          en el{' '}
          <Int href="/blog/aguinaldo-navidad-pensionados-2026">
            artículo de aguinaldo de Navidad 2026
          </Int>
          .
        </p>
        <Faq
          items={[
            {
              q: '¿Esta calculadora entrega el bono de vacaciones del sector público?',
              a: (
                <>
                  No. El bono de vacaciones es distinto del aguinaldo de Navidad. El texto vigente
                  (Ley 21.724, art. 23, anualidad 2026) está explicado en el{' '}
                  <Int href="/blog/aguinaldo-navidad-pensionados-2026">artículo de Navidad</Int>. No
                  uses los $112.915 o $56.457 como el bono de enero de 2027.
                </>
              ),
            },
          ]}
        />
      </Section>
    ),
  },
  'asignacion-familiar': {
    bottom: (
      <>
        <Section title="Tramos y montos 2026">
          <p className={pClass}>
            El tramo no se fija con el sueldo de un mes suelto: se usa el promedio de ingresos del
            periodo que corresponda. La{' '}
            <Int href="/blog/asignacion-familiar-2026-tramos-montos">
              guía de tramos y pago por carga
            </Int>{' '}
            explica esa regla y quién paga según la situación laboral.
          </p>
          <p className={pClass}>
            Ejemplo 2026: 2 cargas en tramo A equivalen a 2 ×{' '}
            {formatCLP(ASIGNACION_FAMILIAR_2026.tramoA.montoPorCargaCLP)} ={' '}
            {formatCLP(2 * ASIGNACION_FAMILIAR_2026.tramoA.montoPorCargaCLP)}. No es una proyección
            de 2027.
          </p>
        </Section>
        <Section title="Qué cambia el 1 de enero de 2027">
          <p className={pClass}>
            La Ley 21.830, artículo 6, dispone que, a contar del 1 de enero de 2027, se elevan en
            la misma proporción en que aumente el ingreso mínimo mensual del artículo 1 «los montos
            señalados en los artículos 2 y 3, así como los tramos de ingresos mensuales establecidos
            en los artículos 4 y 5». Un decreto supremo del Ministerio de Hacienda, suscrito también
            por el Ministro del Trabajo y Previsión Social, debe fijar los valores resultantes a más
            tardar el 15 de enero de 2027.
          </p>
          <p className={pClass}>
            El artículo 1 reajusta el ingreso mínimo de 18 a 65 años según el IPC acumulado entre el
            1 de mayo y el 31 de diciembre de 2026. Ese IPC y el decreto todavía no existen, así que
            esta página no anticipa montos ni cortes de 2027. El artículo 6 habla de «tramos de
            ingresos mensuales» en los artículos 4 y 5; no adelantamos, ni para afirmarlo ni para
            negarlo, qué hará el decreto con los montos por carga vigentes (
            {formatCLP(ASIGNACION_FAMILIAR_2026.tramoA.montoPorCargaCLP)},{' '}
            {formatCLP(ASIGNACION_FAMILIAR_2026.tramoB.montoPorCargaCLP)} y{' '}
            {formatCLP(ASIGNACION_FAMILIAR_2026.tramoC.montoPorCargaCLP)}). Hasta que se publique, la
            calculadora y la tabla siguen en valores 2026.
          </p>
        </Section>
        <Section title="Preguntas frecuentes">
          <Faq
            items={[
              {
                q: '¿La asignación familiar cambia el 1 de enero de 2027?',
                a: 'Sí, en el sentido de que la Ley 21.830 ordena reajustar, en la misma proporción que el ingreso mínimo, los tramos de ingresos de los artículos 4 y 5 (y los montos de los artículos 2 y 3). Los valores resultantes los fija un decreto, a más tardar el 15 de enero de 2027.',
              },
              {
                q: '¿Ya se conocen los montos de la asignación familiar 2027?',
                a: 'No. Ni el IPC de mayo a diciembre de 2026 ni el decreto están publicados. Hasta entonces, esta calculadora usa solo los tramos y montos vigentes desde el 1 de mayo de 2026.',
              },
            ]}
          />
        </Section>
      </>
    ),
  },
  'vacaciones-proporcionales': {
    bottom: (
      <Section title="Calculadoras relacionadas">
        <p className={pClass}>
          Si terminó tu contrato,{' '}
          <Int href="/calculadoras/calculadora-finiquito">calcula tu finiquito completo</Int> o la{' '}
          <Int href="/calculadoras/calculadora-indemnizacion-anos-servicio">
            indemnización por años de servicio
          </Int>
          .
        </p>
      </Section>
    ),
  },
};

function formatFechaISO(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}-${m}-${y}`;
}

/** "Valores verificados al [fecha]" con enlace a la fuente oficial de cada valor. */
function VerifiedValues({ calculatorId }: { calculatorId: string }) {
  const items = Object.values(VERIFICACION_VALORES).filter((v) =>
    v.calculadoras.includes(calculatorId),
  );
  if (items.length === 0) return null;
  const fecha = items.map((v) => v.verificadoAl).sort().at(-1) as string;
  return (
    <section className={sectionClass}>
      <h2 className={h2Class}>Valores verificados al {formatFechaISO(fecha)}</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base">
        {items.map((v) => (
          <li key={v.valor}>
            {v.valor}: <Ext href={v.fuente}>fuente oficial</Ext>
            {v.verificadoAl !== fecha && <> (verificado al {formatFechaISO(v.verificadoAl)})</>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function CalculatorEditorial({
  calculatorId,
  position,
}: {
  calculatorId: string;
  position: 'top' | 'bottom';
}) {
  const content = EDITORIAL[calculatorId]?.[position];
  if (position === 'bottom') {
    return (
      <>
        {content}
        <VerifiedValues calculatorId={calculatorId} />
      </>
    );
  }
  return content ? <>{content}</> : null;
}
