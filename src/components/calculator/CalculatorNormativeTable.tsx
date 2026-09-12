import React from 'react';

interface NormativeTableProps {
  calculatorId: string;
}

interface TableData {
  title: string;
  source: string;
  sourceUrl?: string;
  headers: string[];
  rows: (string | number)[][];
  note?: string;
}

const NORMATIVE_DATA: Record<string, TableData> = {
  'sueldo-liquido': {
    title: 'Tabla de Tramos del Impuesto Único de Segunda Categoría (IUSC) 2026',
    source: 'Servicio de Impuestos Internos (SII) · D.L. 824 Art. 43',
    sourceUrl: 'https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm',
    headers: ['Tramo Imponible (UTM)', 'Factor Impuesto', 'Rebaja (UTM)', 'Tasa Máxima'],
    rows: [
      ['0 a 13,5 UTM', '0,00 (Exento)', '0,00 UTM', '0%'],
      ['Más de 13,5 a 30 UTM', '0,04', '0,54 UTM', '4%'],
      ['Más de 30 a 50 UTM', '0,08', '1,74 UTM', '8%'],
      ['Más de 50 a 70 UTM', '0,135', '4,49 UTM', '13,5%'],
      ['Más de 70 a 90 UTM', '0,23', '11,14 UTM', '23%'],
      ['Más de 90 a 120 UTM', '0,304', '17,80 UTM', '30,4%'],
      ['Más de 120 a 310 UTM', '0,35', '23,32 UTM', '35%'],
      ['Más de 310 UTM', '0,40', '38,82 UTM', '40%'],
    ],
    note: 'El impuesto se calcula sobre la remuneración imponible tras descontar AFP (tope 90 UF), salud y seguro de cesantía.',
  },
  'impuesto-segunda-categoria': {
    title: 'Escala Mensual del Impuesto Único de Segunda Categoría (SII)',
    source: 'Servicio de Impuestos Internos (SII) · Ley de la Renta',
    sourceUrl: 'https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm',
    headers: ['Rango Remuneración Neta (UTM)', 'Factor', 'Cantidad a Rebajar (UTM)'],
    rows: [
      ['0 a 13,5 UTM', 'Exento', '0,00 UTM'],
      ['13,5 a 30 UTM', '0,04', '0,54 UTM'],
      ['30 a 50 UTM', '0,08', '1,74 UTM'],
      ['50 a 70 UTM', '0,135', '4,49 UTM'],
      ['70 a 90 UTM', '0,23', '11,14 UTM'],
      ['90 a 120 UTM', '0,304', '17,80 UTM'],
      ['120 a 310 UTM', '0,35', '23,32 UTM'],
      ['Más de 310 UTM', '0,40', '38,82 UTM'],
    ],
    note: 'Tabla vigente mensual. Para obtener el monto en pesos (CLP), multiplica el valor en UTM por la UTM del mes en curso.',
  },
  'boleta-honorarios': {
    title: 'Calendario Oficial de Retención de Boletas de Honorarios (Ley 21.133)',
    source: 'Servicio de Impuestos Internos (SII) · Ley 21.133',
    sourceUrl: 'https://www.sii.cl/destacados/boletas_honorarios/',
    headers: ['Año Calendario', 'Tasa de Retención', 'Factor Líquido a Bruto', 'Estado'],
    rows: [
      ['2024', '13,75%', '0,8625', 'Histórico'],
      ['2025', '14,50%', '0,8550', 'Histórico'],
      ['2026', '15,25%', '0,8475', 'Vigente hoy'],
      ['2027', '16,00%', '0,8400', 'Próximo tramo'],
      ['2028 en adelante', '17,00%', '0,8300', 'Tasa final definitiva'],
    ],
    note: 'Para calcular el bruto a partir del líquido en 2026: divide el monto líquido por 0,8475. Para calcular la retención: multiplica el bruto por 15,25%.',
  },
  'horas-extra': {
    title: 'Factores Oficiales de Horas Extraordinarias según Jornada Semanal',
    source: 'Dirección del Trabajo (DT) · Ley 21.561 (40 Horas)',
    sourceUrl: 'https://www.dt.gob.cl',
    headers: ['Jornada Semanal', 'Factor Oficial DT (Recargo 50%)', 'Normativa Vigente'],
    rows: [
      ['42 horas semanales', '0,0079365', 'Vigente desde 26 abril 2026 (Ley 21.561)'],
      ['44 horas semanales', '0,0075757', 'Vigente entre abril 2024 y abril 2026'],
      ['45 horas semanales', '0,0074074', 'Jornada anterior a la reforma'],
      ['40 horas semanales', '0,0083333', 'Implementación final (abril 2028)'],
    ],
    note: 'Fórmula legal DT: Sueldo base mensual × Factor de jornada × Número de horas extra = Monto a pagar.',
  },
  'asignacion-familiar': {
    title: 'Tramos y Montos Oficiales de Asignación Familiar 2026',
    source: 'Superintendencia de Seguridad Social (SUSESO) · Ley 21.830',
    sourceUrl: 'https://www.suseso.cl',
    headers: ['Tramo de Ingreso', 'Renta Mensual Imponible', 'Valor por Carga Acreditada'],
    rows: [
      ['Tramo A', 'Hasta $613.626', '$22.601 por carga'],
      ['Tramo B', 'Entre $613.626 y $896.264', '$13.870 por carga'],
      ['Tramo C', 'Entre $896.264 y $1.397.778', '$4.382 por carga'],
      ['Tramo D', 'Superior a $1.397.778', '$0 (mantiene otras prestaciones)'],
    ],
    note: 'Valores reajustados por ley. Si el beneficiario tiene causantes con invalidez, el monto de la asignación familiar se duplica.',
  },
  'comparador-afp': {
    title: 'Comisiones de AFP en Chile 2026 (Superintendencia de Pensiones)',
    source: 'Superintendencia de Pensiones (SP) · Previred',
    sourceUrl: 'https://www.spensiones.cl',
    headers: ['AFP', 'Comisión Dependiente', 'Cotización Total al Trabajador', 'Ranking Costo'],
    rows: [
      ['Uno', '0,46%', '10,46%', '#1 Más económica'],
      ['Modelo', '0,58%', '10,58%', '#2'],
      ['PlanVital', '1,16%', '11,16%', '#3'],
      ['Habitat', '1,27%', '11,27%', '#4'],
      ['Capital', '1,44%', '11,44%', '#5'],
      ['Cuprum', '1,44%', '11,44%', '#6'],
      ['ProVida', '1,45%', '11,45%', '#7 Más costosa'],
    ],
    note: 'El Seguro de Invalidez y Sobrevivencia (SIS, 1,49%) es pagado íntegramente por el empleador y no se descuenta al trabajador dependiente.',
  },
};

export default function CalculatorNormativeTable({ calculatorId }: NormativeTableProps) {
  const data = NORMATIVE_DATA[calculatorId];
  if (!data) return null;

  return (
    <section
      className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:mt-10 md:p-7"
      aria-label={data.title}
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary-600)]">
            Datos normativos oficiales 2026
          </p>
          <h2 className="mt-1 text-lg font-semibold text-[var(--foreground)] md:text-xl">
            {data.title}
          </h2>
        </div>
        {data.sourceUrl ? (
          <a
            href={data.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[var(--color-primary-600)] hover:underline self-start sm:self-auto mt-1 sm:mt-0"
          >
            Fuente: {data.source} ↗
          </a>
        ) : (
          <span className="text-xs text-[var(--foreground-muted)]">{data.source}</span>
        )}
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--background-secondary)]/60">
              {data.headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-3.5 py-2.5 font-semibold text-[var(--foreground)] first:rounded-l-lg last:rounded-r-lg"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {data.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-[var(--background-secondary)]/30 transition-colors"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-3.5 py-2.5 text-[var(--foreground-secondary)] ${
                      cellIndex === 0 ? 'font-medium text-[var(--foreground)]' : ''
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.note && (
        <p className="mt-3 text-xs leading-relaxed text-[var(--foreground-muted)] border-t border-[var(--border)] pt-3">
          💡 <strong>Nota técnica:</strong> {data.note}
        </p>
      )}
    </section>
  );
}
