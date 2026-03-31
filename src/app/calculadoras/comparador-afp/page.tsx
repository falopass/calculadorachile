'use client';

import { ScenarioComparator } from '@/components/calculator';
import { AFP } from '@/lib/values/constants';
import type { ScenarioResult } from '@/components/calculator';

// ============================================
// Configuración de inputs para el comparador
// ============================================

const AFP_INPUTS = [
  {
    id: 'sueldoBruto',
    label: 'Sueldo Bruto',
    type: 'number' as const,
    defaultValue: 800000,
    min: 0,
    prefix: '$',
  },
  {
    id: 'afp',
    label: 'AFP',
    type: 'select' as const,
    options: Object.entries(AFP).map(([key, value]) => ({
      value: key,
      label: value.nombre,
    })),
    defaultValue: 'provida',
  },
  {
    id: 'anosPension',
    label: 'Años hasta pensión',
    type: 'number' as const,
    defaultValue: 25,
    min: 1,
    max: 50,
    suffix: 'años',
  },
];

// ============================================
// Función de cálculo para cada escenario
// ============================================

function calculateAFPScenario(inputs: Record<string, number | string>): ScenarioResult[] {
  const sueldoBruto = Number(inputs.sueldoBruto) || 0;
  const afpKey = String(inputs.afp) as keyof typeof AFP;
  const anosPension = Number(inputs.anosPension) || 1;

  const afpData = AFP[afpKey];
  if (!afpData) return [];

  const comisionMensual = sueldoBruto * (afpData.comision / 100);
  const costoAnual = comisionMensual * 12;
  const costoTotalPeriodo = costoAnual * anosPension;

  return [
    {
      label: 'Comisión mensual',
      value: Math.round(comisionMensual),
      format: 'CLP',
    },
    {
      label: 'Costo anual',
      value: Math.round(costoAnual),
      format: 'CLP',
    },
    {
      label: `Costo total en ${anosPension} años`,
      value: Math.round(costoTotalPeriodo),
      format: 'CLP',
      highlight: true,
    },
  ];
}

// ============================================
// Página principal
// ============================================

export default function ComparadorAFPPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScenarioComparator
          title="Comparador de AFP"
          description="Compara el costo real de diferentes AFP y descubre cuánto puedes ahorrar para tu pensión"
          inputs={AFP_INPUTS}
          calculateFn={calculateAFPScenario}
          maxScenarios={4}
        />

        {/* Información adicional */}
        <div className="mt-8 bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            ¿Por qué comparar AFP?
          </h3>
          <div className="prose prose-sm max-w-none text-[var(--foreground-secondary)]">
            <p>
              Las AFP cobran una comisión sobre tu sueldo bruto que se descuenta mensualmente.
              Aunque todas descuentan el 10% para tu cuenta de capitalización individual,
              la comisión varía entre AFP y puede significar una diferencia significativa
              a lo largo de tu vida laboral.
            </p>
            <p>
              Por ejemplo, con un sueldo de $800.000 y 25 años hasta la pensión,
              la diferencia entre la AFP más cara y la más barata puede representar
              más de $1.000.000 en comisiones pagadas de más.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
