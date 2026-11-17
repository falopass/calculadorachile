/**
 * Impuestos de compras internacionales (Temu, AliExpress, Shein, Amazon, etc.).
 *
 * Fuente: Servicio Nacional de Aduanas, «¿Cuánto impuesto se paga al importar?»
 * y SII «IVA a bienes comprados en el extranjero» (Ley 21.713, desde 25-10-2025).
 * - Hasta US$500: IVA 19 %, exenta de arancel. Plataforma inscrita en el SII lo
 *   cobra al pagar; si no está inscrita (o no acredita el IVA), se paga al llegar.
 * - Sobre US$500: derecho ad valorem 6 % sobre CIF + IVA 19 % sobre (CIF + derecho).
 *   Un acuerdo comercial (TLC) con origen acreditado puede rebajar el derecho.
 */
import { DOLAR, IVA } from '@/lib/values/constants';
import type { CalculatorResult } from '@/types/calculator';

export const UMBRAL_REGIMEN_ESPECIAL_USD = 500;
export const DERECHO_AD_VALOREM_GENERAL = 6;
export const FUENTE_ADUANAS =
  'https://www.aduana.cl/cuanto-impuesto-se-paga-al-importar/aduana/2018-12-12/233227.html';

export type TratamientoArancel = 'general' | 'preferencial';

export interface ComprasInternacionalesInput {
  /** Valor de los productos en US$. */
  precioUSD: number;
  envioUSD?: number;
  seguroUSD?: number;
  plataformaInscrita: boolean;
  /** Solo aplica sobre US$500: «preferencial» = derecho 0 % por TLC con origen acreditado. */
  tratamientoArancel?: TratamientoArancel;
  /** CLP por US$1; si falta o no es positivo se usa el dólar observado del snapshot. */
  valorDolar?: number;
}

export type RegimenCompra = 'hasta500_inscrita' | 'hasta500_no_inscrita' | 'sobre500';

export interface ComprasInternacionalesResult {
  regimen: RegimenCompra;
  valorCifUSD: number;
  derechoUSD: number;
  ivaUSD: number;
  /** IVA cobrado por la plataforma al pagar (régimen ≤ US$500 inscrita). */
  ivaEnCompraUSD: number;
  /** Derecho + IVA pagados al llegar a Chile. */
  impuestosAlLlegarUSD: number;
  totalImpuestosUSD: number;
  costoTotalUSD: number;
  valorDolar: number;
  totalImpuestosCLP: number;
  costoTotalCLP: number;
}

const usd = (n: number) => Math.round(n * 100) / 100;
const nonNeg = (n: number | undefined) => (Number.isFinite(n) && (n as number) > 0 ? (n as number) : 0);

export function calculateComprasInternacionales(
  input: ComprasInternacionalesInput,
): ComprasInternacionalesResult {
  const precio = nonNeg(input.precioUSD);
  if (precio <= 0) throw new Error('Ingresa el valor de los productos en dólares (mayor a 0).');
  const valorCifUSD = usd(precio + nonNeg(input.envioUSD) + nonNeg(input.seguroUSD));
  const tasaIva = IVA.tasa / 100;

  // El umbral se mide sobre el valor de los bienes (SII: «bienes cuyo valor no supere US$500»).
  let regimen: RegimenCompra;
  let derechoUSD = 0;
  if (precio <= UMBRAL_REGIMEN_ESPECIAL_USD) {
    regimen = input.plataformaInscrita ? 'hasta500_inscrita' : 'hasta500_no_inscrita';
  } else {
    regimen = 'sobre500';
    const tasaDerecho =
      input.tratamientoArancel === 'preferencial' ? 0 : DERECHO_AD_VALOREM_GENERAL / 100;
    derechoUSD = usd(valorCifUSD * tasaDerecho);
  }
  const ivaUSD = usd((valorCifUSD + derechoUSD) * tasaIva);
  const ivaEnCompraUSD = regimen === 'hasta500_inscrita' ? ivaUSD : 0;
  const impuestosAlLlegarUSD = regimen === 'hasta500_inscrita' ? 0 : usd(derechoUSD + ivaUSD);
  const totalImpuestosUSD = usd(derechoUSD + ivaUSD);
  const costoTotalUSD = usd(valorCifUSD + totalImpuestosUSD);

  const valorDolar =
    input.valorDolar && input.valorDolar > 0 ? input.valorDolar : DOLAR.observado;
  if (!(valorDolar > 0)) throw new Error('No hay dólar observado disponible para convertir a pesos.');

  return {
    regimen,
    valorCifUSD,
    derechoUSD,
    ivaUSD,
    ivaEnCompraUSD,
    impuestosAlLlegarUSD,
    totalImpuestosUSD,
    costoTotalUSD,
    valorDolar,
    totalImpuestosCLP: Math.round(totalImpuestosUSD * valorDolar),
    costoTotalCLP: Math.round(costoTotalUSD * valorDolar),
  };
}

const REGIMEN_TEXTO: Record<RegimenCompra, string> = {
  hasta500_inscrita:
    'Compra de hasta US$500 en plataforma inscrita en el SII: el IVA de 19 % se cobra al pagar y la importación queda exenta de arancel e IVA.',
  hasta500_no_inscrita:
    'Compra de hasta US$500 en plataforma no inscrita (o que no acredita el IVA): pagas el IVA de 19 % cuando el envío llega a Chile, sin arancel. La empresa de envío gestiona el cobro.',
  sobre500:
    'Compra sobre US$500: derecho aduanero sobre el valor CIF (producto + flete + seguro) y luego IVA de 19 % sobre CIF + derecho.',
};

export function comprasInternacionalesToResults(r: ComprasInternacionalesResult): CalculatorResult[] {
  const enClp = (n: number) => Math.round(n * r.valorDolar);
  return [
    {
      label: 'Total de impuestos',
      value: r.totalImpuestosCLP,
      format: 'CLP',
      highlight: true,
      note: { text: REGIMEN_TEXTO[r.regimen], source: { name: 'Aduanas', url: FUENTE_ADUANAS } },
    },
    { label: 'Costo total (compra + impuestos)', value: r.costoTotalCLP, format: 'CLP' },
    { label: 'Valor CIF (producto + flete + seguro)', value: enClp(r.valorCifUSD), format: 'CLP' },
    { label: 'Derecho aduanero (arancel)', value: enClp(r.derechoUSD), format: 'CLP' },
    { label: 'IVA 19 %', value: enClp(r.ivaUSD), format: 'CLP' },
    { label: 'Total de impuestos en US$', value: r.totalImpuestosUSD, format: 'number' },
    {
      label: 'Dólar usado (CLP por US$1)',
      value: r.valorDolar,
      format: 'number',
      note: {
        text: 'Conversión referencial con el dólar observado. Aduanas liquida con el tipo de cambio vigente a la fecha de aceptación de la declaración, por lo que el monto en pesos puede variar.',
      },
    },
  ];
}
