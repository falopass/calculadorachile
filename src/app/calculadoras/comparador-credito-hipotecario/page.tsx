'use client';

import { ScenarioComparator } from '@/components/calculator';
import type { ScenarioResult } from '@/components/calculator';

// ============================================
// Configuración de inputs para el comparador
// ============================================

const CREDITO_INPUTS = [
  {
    id: 'montoUF',
    label: 'Monto del Crédito (UF)',
    type: 'number' as const,
    defaultValue: 2000,
    min: 100,
    max: 10000,
  },
  {
    id: 'pieUF',
    label: 'Pie (UF)',
    type: 'number' as const,
    defaultValue: 200,
    min: 0,
  },
  {
    id: 'plazoAnos',
    label: 'Plazo (años)',
    type: 'number' as const,
    defaultValue: 20,
    min: 1,
    max: 30,
    suffix: 'años',
  },
  {
    id: 'tasaAnual',
    label: 'Tasa de Interés Anual (%)',
    type: 'number' as const,
    defaultValue: 4.5,
    min: 0.5,
    max: 15,
    suffix: '%',
  },
];

// ============================================
// Función de cálculo para cada escenario
// ============================================

function calcularPMT(monto: number, tasaMensual: number, plazoMeses: number): number {
  if (tasaMensual === 0) return monto / plazoMeses;
  const factor = Math.pow(1 + tasaMensual, plazoMeses);
  return monto * (tasaMensual * factor) / (factor - 1);
}

function calculateCreditoScenario(inputs: Record<string, number | string>): ScenarioResult[] {
  const montoUF = Number(inputs.montoUF) || 0;
  const pieUF = Number(inputs.pieUF) || 0;
  const plazoAnos = Number(inputs.plazoAnos) || 1;
  const tasaAnual = Number(inputs.tasaAnual) || 0;

  const montoFinanciarUF = Math.max(0, montoUF - pieUF);
  const plazoMeses = plazoAnos * 12;
  const tasaMensual = tasaAnual / 100 / 12;

  const dividendoMensualUF = montoFinanciarUF > 0 ? calcularPMT(montoFinanciarUF, tasaMensual, plazoMeses) : 0;
  const totalPagoUF = dividendoMensualUF * plazoMeses;
  const totalInteresesUF = totalPagoUF - montoFinanciarUF;

  return [
    {
      label: 'Monto a financiar',
      value: Math.round(montoFinanciarUF),
      format: 'number',
    },
    {
      label: 'Dividendo mensual (UF)',
      value: Math.round(dividendoMensualUF * 100) / 100,
      format: 'number',
    },
    {
      label: 'Total intereses pagados',
      value: Math.round(totalInteresesUF),
      format: 'number',
    },
    {
      label: 'Costo total del crédito',
      value: Math.round(totalPagoUF),
      format: 'number',
      highlight: true,
    },
  ];
}

// ============================================
// Página principal
// ============================================

export default function ComparadorCreditoHipotecarioPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScenarioComparator
          title="Comparador de Crédito Hipotecario"
          description="Compara diferentes escenarios de crédito hipotecario y encuentra la mejor opción para ti"
          inputs={CREDITO_INPUTS}
          calculateFn={calculateCreditoScenario}
          maxScenarios={3}
        />

        {/* Información adicional */}
        <div className="mt-8 bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            ¿Cómo comparar créditos hipotecarios?
          </h3>
          <div className="prose prose-sm max-w-none text-[var(--foreground-secondary)]">
            <p>
              Al comparar créditos hipotecarios, es importante considerar no solo la tasa de interés,
              sino también el plazo, el pie requerido y los costos asociados como seguros y comisiones.
            </p>
            <p>
              Un crédito con tasa más baja pero con plazo más largo puede resultar en un costo total mayor
              debido a los intereses acumulados. Usa este comparador para evaluar diferentes escenarios
              y tomar la mejor decisión para tu presupuesto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
