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

const SII_CUOTAS = 'https://www.sii.cl/preguntas_frecuentes/aval_contrib_bbrr/001_165_0310.htm';
const SII_TASAS = 'https://www.sii.cl/ayudas/ayudas_por_servicios/2242-reajustes_exenciones-2468.html';
const TGR = 'https://www.tgr.cl/tramites/contribuciones/';

const EDITORIAL: Record<string, EditorialContent> = {
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
