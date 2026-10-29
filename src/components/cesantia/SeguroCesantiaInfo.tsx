import Link from 'next/link';
import type { ReactNode } from 'react';
import { buildCvlistoUrl } from '@/lib/cvlisto';
import { formatCLP } from '@/lib/formatters';
import { SEGURO_CESANTIA_BENEFICIOS } from '@/lib/values/constants';

/** Contenido informativo del seguro de cesantía para /cesantia (sin structured data). */

const CA_SEGURO = 'https://www.chileatiende.gob.cl/fichas/62932-seguro-de-cesantia';
const CA_FCS = 'https://www.chileatiende.gob.cl/fichas/36646-fondo-de-cesantia-solidario';
const SP_TOPE = 'https://www.spensiones.cl/portal/institucional/594/articles-16922_recurso_1.pdf';
const SP_383 =
  'https://www.spensiones.gob.cl/portal/institucional/594/articles-16977_recurso_1.pdf';
const SP_GIROS = 'https://www.spensiones.cl/portal/institucional/594/w3-article-17135.html';
const BCN_19728 = 'https://www.bcn.cl/leychile/navegar?idNorma=184979';
const AFC_FECHAS = 'https://www.afc.cl/mi-seguro-de-cesantia/fechas-y-medios-de-pago/';
const FCS = SEGURO_CESANTIA_BENEFICIOS.fcs;

/** Filas de la tabla FCS generadas desde la constante (no escribir montos a mano). */
function filasFcs(t: (typeof FCS)['indefinido'] | (typeof FCS)['plazoFijo']): string[][] {
  return t.porcentajes.map((pct, i) => [
    `${i + 1}°`,
    `${pct}%`,
    formatCLP(t.minimos[i]),
    formatCLP(t.maximos[i]),
  ]);
}
const CVLISTO = buildCvlistoUrl({ origen: 'cesantia', placement: 'guia_footer' });

const h2 = 'text-xl font-bold text-[var(--foreground)] md:text-2xl';
const h3 = 'mt-5 text-base font-semibold text-[var(--foreground)]';
const p = 'mt-3 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base';
const aCls = 'font-medium text-[var(--color-primary-600)] hover:underline';

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={aCls}>
      {children}
    </a>
  );
}

function Int({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={aCls}>
      {children}
    </Link>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[28rem] text-sm">
        <thead>
          <tr className="border-b border-[var(--border)]">
            {head.map((h) => (
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
          {rows.map((r) => (
            <tr key={r[0]} className="border-b border-[var(--border)] last:border-0">
              {r.map((c, j) => (
                <td key={j} className="py-2 pr-4 tabular-nums text-[var(--foreground)] last:pr-0">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const CALC = '/calculadoras/calculadora-seguro-cesantia';

export default function SeguroCesantiaInfo() {
  return (
    <div className="mt-12 space-y-12">
      <section>
        <p className="text-xs text-[var(--foreground-muted)]">
          <em>Valores verificados al 16-10-2026.</em>
        </p>
        <p className={p}>
          El seguro de cesantía es un seguro obligatorio administrado por la AFC que te paga giros
          mensuales si pierdes tu trabajo. Para cobrarlo necesitas al menos{' '}
          <strong>10 cotizaciones</strong> si tenías contrato indefinido o{' '}
          <strong>5 cotizaciones</strong> si tenías contrato a plazo fijo, por obra, faena o
          servicio (<Ext href={CA_SEGURO}>ChileAtiende</Ext>). Si quieres estimar tus montos, usa el{' '}
          <Int href={CALC}>simulador del seguro de cesantía</Int>.
        </p>
      </section>

      <section>
        <h2 className={h2}>¿Quién cotiza y cuánto?</h2>
        <p className={p}>
          El seguro se financia con cotizaciones mensuales sobre tu remuneración imponible (
          <Ext href={CA_FCS}>ChileAtiende</Ext>):
        </p>
        <Table
          head={['Tipo de contrato', 'Trabajador', 'Empleador']}
          rows={[
            ['Indefinido', '0,6%', '2,4%'],
            ['Plazo fijo, obra, faena o servicio', '0%', '3%'],
          ]}
        />
        <p className={p}>
          Las cotizaciones se calculan con un tope imponible de <strong>135,2 UF</strong> mensuales,
          vigente desde el 1 de febrero de 2026 (
          <Ext href={SP_TOPE}>Superintendencia de Pensiones</Ext>).
        </p>
      </section>

      <section>
        <h2 className={h2}>Requisitos para cobrar el seguro de cesantía</h2>
        <p className={p}>
          Según <Ext href={CA_SEGURO}>ChileAtiende</Ext>, las cotizaciones se cuentan desde que te
          afiliaste, o desde la última vez que cobraste el seguro, hasta el mes en que terminó tu
          contrato. Pueden ser continuas o discontinuas y de uno o más empleadores.
        </p>
        <h3 className={h3}>Contrato indefinido</h3>
        <p className={p}>Necesitas al menos 10 cotizaciones mensuales.</p>
        <h3 className={h3}>Contrato a plazo fijo, por obra, faena o servicio</h3>
        <p className={p}>Necesitas al menos 5 cotizaciones mensuales.</p>
      </section>

      <section>
        <h2 className={h2}>Cuenta individual (CIC) y Fondo de Cesantía Solidario</h2>
        <p className={p}>El seguro tiene dos partes:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base">
          <li>
            <strong>Cuenta Individual de Cesantía (CIC):</strong> es tu propio ahorro, formado con
            tus cotizaciones y parte de las de tu empleador. Cuando quedas cesante, retiras ese
            dinero en giros mensuales.
          </li>
          <li>
            <strong>Fondo de Cesantía Solidario (FCS):</strong> es un fondo común. Si los fondos de
            tu cuenta individual no alcanzan, puedes recurrir al Fondo Solidario, siempre que
            cumplas con la causal de término y el mínimo de cotizaciones exigido (
            <Ext href={CA_SEGURO}>ChileAtiende</Ext>).
          </li>
        </ul>
        <p className={p}>
          Para usar el Fondo Solidario necesitas 10 cotizaciones pagadas en los 24 meses anteriores
          al despido, y las 3 últimas deben ser continuas y con el mismo empleador (
          <Ext href={CA_FCS}>ChileAtiende</Ext>).
        </p>
      </section>

      <section>
        <h2 className={h2}>¿Cuánto paga el Fondo Solidario en 2026?</h2>
        <p className={p}>
          Cada giro es un porcentaje de tu remuneración promedio, con un mínimo y un máximo. Estos
          son los valores vigentes del 06-03-2026 al 28-02-2027, según la{' '}
          <Ext href={SP_383}>Resolución Exenta N° 383 de la Superintendencia de Pensiones</Ext>.
        </p>
        <h3 className={h3}>Contrato indefinido</h3>
        <Table
          head={['Giro', '% de la remuneración promedio', 'Mínimo', 'Máximo']}
          rows={filasFcs(FCS.indefinido)}
        />
        <h3 className={h3}>Contrato a plazo fijo, por obra, faena o servicio</h3>
        <Table
          head={['Giro', '% de la remuneración promedio', 'Mínimo', 'Máximo']}
          rows={filasFcs(FCS.plazoFijo)}
        />
        <h3 className={h3}>Ejemplo con un sueldo de $800.000</h3>
        <p className={p}>
          Supongamos que tenías contrato indefinido y tu remuneración promedio era de $800.000:
        </p>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base">
          <li>
            Primer giro: 70% × $800.000 = <strong>$560.000</strong>.
          </li>
          <li>
            Revisa los límites: $560.000 está entre el mínimo ({formatCLP(FCS.indefinido.minimos[0])})
            y el máximo ({formatCLP(FCS.indefinido.maximos[0])}), así que el giro estimado es
            $560.000.
          </li>
          <li>Segundo giro: 60% × $800.000 = $480.000, también dentro de sus límites.</li>
        </ol>
        <p className={p}>
          Es una estimación según la tabla vigente; el monto final lo determina la AFC. Para
          calcular todos tus giros, usa la <Int href={CALC}>calculadora del seguro de cesantía</Int>
          .
        </p>
        <h3 className={h3}>Giros adicionales por alto desempleo</h3>
        <p className={p}>
          La ley contempla 2 giros adicionales, cada uno del 30% de la remuneración promedio (mínimo
          $129.085 y máximo $430.288), para quienes estén cobrando el 5° giro del Fondo Solidario.{' '}
          <strong>Solo se pagan cuando la tasa de desempleo activa el beneficio</strong>, es decir,
          cuando supera en más de 1 punto el promedio de los cuatro años anteriores (
          <Ext href={BCN_19728}>Ley 19.728, art. 25</Ext>; <Ext href={SP_383}>Res. Ex. N° 383</Ext>
          ). Si el desempleo activa el beneficio, la{' '}
          <Ext href={SP_GIROS}>Superintendencia de Pensiones</Ext> informa qué personas y meses de
          pago cubre cada activación. No es un beneficio permanente: revisa en la AFC si está activo
          cuando llegues a tu 5° giro.
        </p>
      </section>

      <section>
        <h2 className={h2}>Cómo cobrar el seguro de cesantía en la AFC</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base">
          <li>Reúne el documento que acredita el término de tu contrato.</li>
          <li>
            Haz la solicitud en <Ext href="https://www.afc.cl/">afc.cl</Ext> o en una sucursal de la
            AFC.
          </li>
          <li>
            Si vas a usar el Fondo Solidario, inscríbete en la{' '}
            <Ext href="https://www.bne.cl/">Bolsa Nacional de Empleo</Ext>.
          </li>
        </ol>
        <h3 className={h3}>¿Cuándo llega el primer pago?</h3>
        <p className={p}>
          Los pagos se procesan los jueves. Si pides el seguro antes de cumplir 30 días corridos
          desde el término, el primero llega el jueves siguiente a ese día 30; si lo pides después,
          el jueves siguiente a la aprobación. En autodespido o despido indirecto (artículo 171 del
          Código del Trabajo), llega al menos 60 días corridos después del término (
          <Ext href={AFC_FECHAS}>AFC</Ext>).
        </p>
        <p className={p}>
          Tienes el paso a paso completo en nuestra guía{' '}
          <Int href="/blog/como-cobrar-seguro-cesantia-afc-2026">
            cómo cobrar el seguro de cesantía en la AFC
          </Int>
          . El finiquito es un pago distinto al seguro de cesantía y lo paga tu empleador: puedes
          estimarlo en la{' '}
          <Int href="/calculadoras/calculadora-finiquito">calculadora de finiquito</Int>.
        </p>
      </section>

      <section>
        <h2 className={h2}>Preguntas frecuentes sobre el seguro de cesantía</h2>
        <dl className="mt-3 space-y-4">
          {[
            [
              '¿Cuántas cotizaciones necesito para cobrar el seguro de cesantía?',
              '10 si tenías contrato indefinido y 5 si tenías contrato a plazo fijo, por obra, faena o servicio (ChileAtiende).',
            ],
            [
              '¿Cuánto paga el seguro de cesantía?',
              'Depende de tu cuenta individual y, si recurres al Fondo Solidario, de la tabla vigente: en contrato indefinido el primer giro es el 70% de tu remuneración promedio, entre $301.201 y $1.004.003.',
            ],
            [
              '¿Qué diferencia hay entre la cuenta individual y el Fondo Solidario?',
              'La cuenta individual es tu ahorro propio; el Fondo Solidario es un fondo común al que recurres si tu cuenta no alcanza y cumples los requisitos.',
            ],
            [
              '¿Puedo cobrar el seguro de cesantía si tenía contrato a plazo fijo?',
              'Sí, con al menos 5 cotizaciones.',
            ],
            [
              '¿Qué son los giros adicionales por desempleo?',
              'Son 2 giros extra del 30% para quienes cobran el 5° giro del Fondo Solidario. Solo se pagan si el desempleo activa el beneficio; en ese caso, la Superintendencia de Pensiones informa a quiénes cubre y en qué meses se pagan.',
            ],
          ].map(([q, a]) => (
            <div key={q}>
              <dt className="text-sm font-semibold text-[var(--foreground)] md:text-base">{q}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base">
                {a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:p-6">
        <p className="text-sm leading-relaxed text-[var(--foreground-secondary)] md:text-base">
          <strong>¿Buscando trabajo? Arma tu CV.</strong> Mientras cobras el seguro, prepara tu
          currículum en minutos en <Ext href={CVLISTO}>cvlisto.cl</Ext>.
        </p>
        <p className="mt-3 text-xs text-[var(--foreground-muted)]">
          Fuentes: ChileAtiende, Superintendencia de Pensiones (Res. Ex. N° 383 y Res. Ex. N° 236),
          Ley 19.728 (BCN). Valores verificados al 16-10-2026.
        </p>
      </section>
    </div>
  );
}
