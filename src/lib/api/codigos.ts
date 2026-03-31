// Códigos de series estadísticas del BCentral
// Fuente: https://si3.bcentral.cl/Siete/es/Siete/API
// Documentación: https://si3.bcentral.cl/siete/ES/Siete/API
// Códigos verificados desde catálogo de series del BCentral

export const BCENTRAL_CODES = {
  // UF - Unidad de Fomento (diario)
  UF_DIARIO: 'F073.UFF.PRE.Z.D',
  
  // UTM - Unidad Tributaria Mensual (mensual)
  UTM_MENSUAL: 'F073.UTR.PRE.Z.M',
  
  // Dólar observado (diario)
  DOLAR_OBSERVADO: 'F073.TCO.PRE.Z.D',
  
  // Dólar venta (diario)
  DOLAR_VENTA: 'F073.TCO.VTA.Z.D',
  
  // IPC - Índice de Precios al Consumidor base 2018=100 (mensual)
  IPC: 'G073.IPC.IND.2018.M',
  
  // TPM - Tasa de Política Monetaria (diario)
  TPM: 'F022.TPM.TIN.D001.NO.Z.D',
} as const;

export type BCentralCode = typeof BCENTRAL_CODES[keyof typeof BCENTRAL_CODES];
