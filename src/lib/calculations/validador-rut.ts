// ============================================
// Validador de RUT y dígito verificador (módulo 11)
// --------------------------------------------
// Algoritmo público del dígito verificador del RUT:
// suma ponderada cíclica con factores 2–7 de derecha a
// izquierda, DV = 11 − (suma mod 11); 11→'0', 10→'K'.
// Base: Ley 4.808 (ley orgánica del Registro Civil, RUN y cédula)
// y la página oficial del Registro Civil sobre el dígito verificador.
// No es contenido YMYL: no afecta montos ni obligaciones.
// ============================================

import type { CalculatorResult } from '@/types/calculator';

export interface ValidadorRutInput {
  /** RUT tal como lo escribe el usuario: con o sin puntos y con guion. */
  rut: string;
}

export type ErrorRut = 'vacio' | 'formato' | 'largo';

export interface ValidadorRutResult {
  /** true si el cuerpo y el dígito se pudieron interpretar. */
  parseable: boolean;
  error?: ErrorRut;
  /** Cuerpo numérico sin puntos, ej. '12345678'. */
  cuerpo: string;
  /** Dígito verificador declarado por el usuario (mayúscula), '' si no vino. */
  digitoIngresado: string;
  /** Dígito verificador que corresponde al cuerpo: '0'–'9' o 'K'. */
  digitoEsperado: string;
  /** RUT normalizado con puntos y guion, ej. '12.345.678-5'. */
  rutFormateado: string;
  /** true solo cuando el dígito ingresado coincide con el esperado. */
  esValido: boolean;
}

/** Dígito verificador módulo 11 de un cuerpo de RUT (dígitos, sin DV). */
export function calcularDigitoVerificador(cuerpo: string): string {
  let suma = 0;
  let factor = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const resto = 11 - (suma % 11);
  if (resto === 11) return '0';
  if (resto === 10) return 'K';
  return String(resto);
}

/** '12345678' → '12.345.678-5' con el dígito dado. */
export function formatearRut(cuerpo: string, digito: string): string {
  const conPuntos = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${conPuntos}-${digito}`;
}

export function calculateValidadorRut(input: ValidadorRutInput): ValidadorRutResult {
  const limpio = (input.rut ?? '')
    .trim()
    .toUpperCase()
    .replace(/[.\s]/g, '');

  const base = {
    cuerpo: '',
    digitoIngresado: '',
    digitoEsperado: '',
    rutFormateado: '',
    esValido: false,
  };

  if (!limpio) {
    return { ...base, parseable: false, error: 'vacio' };
  }

  // Acepta '12345678-5', '123456785' o 'K' final; el guion es opcional.
  const match = limpio.match(/^(\d{1,12})-?([0-9K])$/);
  if (!match) {
    return { ...base, parseable: false, error: 'formato' };
  }

  const cuerpo = match[1];
  const digitoIngresado = match[2];
  // Rango del tipo RUT del esquema de facturación electrónica del SII (1–8 dígitos).
  if (cuerpo.length < 1 || cuerpo.length > 8) {
    return { ...base, cuerpo, digitoIngresado, parseable: false, error: 'largo' };
  }

  const digitoEsperado = calcularDigitoVerificador(cuerpo);
  return {
    parseable: true,
    cuerpo,
    digitoIngresado,
    digitoEsperado,
    rutFormateado: formatearRut(cuerpo, digitoEsperado),
    esValido: digitoIngresado === digitoEsperado,
  };
}

export function validadorRutToResults(result: ValidadorRutResult): CalculatorResult[] {
  if (!result.parseable) {
    const detalle =
      result.error === 'vacio'
        ? 'Ingresa un RUT para validarlo.'
        : result.error === 'largo'
          ? 'El cuerpo del RUT debe tener entre 1 y 8 dígitos.'
          : 'Formato no reconocido: usa dígitos y guion (ej. 12.345.678-5).';
    return [
      {
        label: 'Resultado',
        value: 0,
        format: 'text',
        textValue: detalle,
        highlight: true,
      },
    ];
  }

  return [
    {
      label: 'Resultado',
      value: result.esValido ? 1 : 0,
      format: 'text',
      textValue: result.esValido ? 'RUT válido' : 'RUT inválido',
      highlight: true,
      note: result.esValido
        ? undefined
        : {
            text: `El dígito ingresado fue ${result.digitoIngresado} y el que corresponde es ${result.digitoEsperado}.`,
          },
    },
    {
      label: 'Dígito verificador que corresponde',
      value: 0,
      format: 'text',
      textValue: result.digitoEsperado,
    },
    {
      label: 'RUT con formato estándar',
      value: 0,
      format: 'text',
      textValue: result.rutFormateado,
    },
  ];
}
