// Tipos para la API del Banco Central de Chile
// Formato de respuesta de la API REST: https://si3.bcentral.cl/SieteRestWS/

export interface BCentralObservation {
  indexDateString: string;  // Formato: DD-MM-YYYY
  value: string;
  statusCode: string;  // 'OK' si el dato es válido
}

export interface BCentralSeriesData {
  descripEsp: string | null;
  descripIng: string | null;
  seriesId: string | null;
  Obs: BCentralObservation[] | null;
}

export interface BCentralSerieResponse {
  Codigo: number;  // 0 = éxito
  Descripcion: string;  // 'Success' si todo ok
  Series: BCentralSeriesData;
  SeriesInfos: unknown[];
}

export interface ValorBCentral {
  fecha: string;  // YYYY-MM-DD
  valor: number;
}

export interface ValoresActuales {
  uf: number;
  utm: number;
  dolar: {
    observado: number;
    venta: number;
  };
  updatedAt: string;
  source: 'bcentral' | 'fallback';
}

// Tipo legacy para compatibilidad
export interface BCentralResponse {
  CODIGO: string;
  NOMBRE: string;
  FRECUENCIA: string;
  SERIES: {
    FECHA: string;
    VALOR: string;
  }[];
}
