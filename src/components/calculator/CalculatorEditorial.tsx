import Link from 'next/link';
import type { ReactNode } from 'react';
import { VERIFICACION_VALORES } from '@/lib/values/constants';
import { buildCvlistoUrl } from '@/lib/cvlisto';

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
const SII_RETENCION_2026 = 'https://www.sii.cl/noticias/2025/261225noti01smn.htm';

const EDITORIAL: Record<string, EditorialContent> = {
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
  'seguro-cesantia': {
    bottom: (
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
          <Int href="/calculadoras/calculadora-horas-extra">horas extra</Int>, o lee la{' '}
          <Int href="/guias/sueldo-liquido-chile">guía de sueldo líquido</Int>.
        </p>
      </Section>
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
