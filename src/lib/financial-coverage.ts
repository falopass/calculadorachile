export interface FinancialCoverageInput {
  severanceCLP: number;
  savingsCLP: number;
  monthlyEssentialSpendCLP: number;
}

export interface FinancialCoverageResult {
  isValid: boolean;
  totalResourcesCLP: number;
  months: number;
}

function nonNegativeFinite(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

/**
 * Estima cuántos meses cubren el finiquito y los ahorros frente al gasto
 * esencial mensual. No incluye giros futuros de AFC ni otros ingresos.
 */
export function calculateFinancialCoverage(input: FinancialCoverageInput): FinancialCoverageResult {
  const severanceCLP = nonNegativeFinite(input.severanceCLP);
  const savingsCLP = nonNegativeFinite(input.savingsCLP);
  const monthlyEssentialSpendCLP = nonNegativeFinite(input.monthlyEssentialSpendCLP);
  const totalResourcesCLP = severanceCLP + savingsCLP;

  if (monthlyEssentialSpendCLP <= 0) {
    return { isValid: false, totalResourcesCLP, months: 0 };
  }

  return {
    isValid: true,
    totalResourcesCLP,
    months: totalResourcesCLP / monthlyEssentialSpendCLP,
  };
}
