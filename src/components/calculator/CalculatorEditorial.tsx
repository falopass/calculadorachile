import Link from 'next/link';
import type { ReactNode } from 'react';

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

        <Section title="Más preguntas sobre el finiquito">
          <Faq
            items={[
              {
                q: '¿Cómo se calcula un finiquito?',
                a: 'Se suman la indemnización por años de servicio (30 días por año, con tope de 11 años y una base de hasta 90 UF), las vacaciones proporcionales, el aviso previo si corresponde y las remuneraciones pendientes.',
              },
              {
                q: '¿Cuánto me corresponde de finiquito si renuncio?',
                a: (
                  <>
                    Si renuncias, no recibes indemnización por años de servicio ni aviso previo, pero
                    sí las vacaciones proporcionales y las remuneraciones pendientes (
                    <Ext href={DT_FERIADO}>DT</Ext>).
                  </>
                ),
              },
              {
                q: '¿Cuánto se demora en pagar un finiquito? ¿Cuál es el plazo?',
                a: (
                  <>
                    El empleador tiene 10 días hábiles desde la separación para pagarlo (
                    <Ext href={DT_PLAZO}>DT, art. 177</Ext>).
                  </>
                ),
              },
            ]}
          />
        </Section>
      </>
    ),
  },
};

export default function CalculatorEditorial({
  calculatorId,
  position,
}: {
  calculatorId: string;
  position: 'top' | 'bottom';
}) {
  const content = EDITORIAL[calculatorId]?.[position];
  return content ? <>{content}</> : null;
}
