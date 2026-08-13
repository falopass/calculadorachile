import { describe, expect, it } from 'vitest';
import { calculateFinancialCoverage } from '../financial-coverage';

describe('calculateFinancialCoverage', () => {
  it('divide recursos disponibles por gasto esencial mensual', () => {
    const result = calculateFinancialCoverage({
      severanceCLP: 1_000_000,
      savingsCLP: 500_000,
      monthlyEssentialSpendCLP: 500_000,
    });

    expect(result).toEqual({
      isValid: true,
      totalResourcesCLP: 1_500_000,
      months: 3,
    });
  });

  it('permite cero recursos y mantiene la cobertura en cero', () => {
    const result = calculateFinancialCoverage({
      severanceCLP: 0,
      savingsCLP: 0,
      monthlyEssentialSpendCLP: 400_000,
    });

    expect(result.isValid).toBe(true);
    expect(result.months).toBe(0);
  });

  it('rechaza un gasto mensual cero o negativo', () => {
    expect(
      calculateFinancialCoverage({
        severanceCLP: 1_000_000,
        savingsCLP: 0,
        monthlyEssentialSpendCLP: 0,
      }),
    ).toEqual({ isValid: false, totalResourcesCLP: 1_000_000, months: 0 });

    expect(
      calculateFinancialCoverage({
        severanceCLP: -100,
        savingsCLP: Number.NaN,
        monthlyEssentialSpendCLP: 500_000,
      }),
    ).toEqual({ isValid: true, totalResourcesCLP: 0, months: 0 });
  });
});
