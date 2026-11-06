import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { withDeadline } from '../deadline';

describe('withDeadline', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('devuelve el valor si la promesa termina antes del plazo', async () => {
    await expect(withDeadline(Promise.resolve(1), 1000, 0)).resolves.toBe(1);
  });

  it('devuelve el respaldo si la promesa nunca termina', async () => {
    const onTimeout = vi.fn();
    const result = withDeadline(new Promise<number>(() => {}), 1000, 0, onTimeout);
    await vi.advanceTimersByTimeAsync(1000);
    await expect(result).resolves.toBe(0);
    expect(onTimeout).toHaveBeenCalledOnce();
  });
});

describe('fetchMindicadorValores con un fetch que nunca responde', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetModules();
    // Simula un fetch que ignora el signal y no termina (lo observado en Cloudflare).
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise<Response>(() => {})),
    );
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('resuelve con valores vacíos dentro del plazo', async () => {
    const { fetchMindicadorValores } = await import('../mindicador');
    const result = fetchMindicadorValores();
    await vi.advanceTimersByTimeAsync(6_000);
    await expect(result).resolves.toMatchObject({ uf: null, utm: null, dolar: null, euro: null });
  });

  it('no abre otro fetch mientras el anterior sigue pendiente', async () => {
    const { fetchMindicadorValores } = await import('../mindicador');
    const first = fetchMindicadorValores();
    await vi.advanceTimersByTimeAsync(6_000);
    await first;
    // Pasa el memo de 30 s: la siguiente llamada reutiliza el request colgado.
    await vi.advanceTimersByTimeAsync(31_000);
    const second = fetchMindicadorValores();
    await vi.advanceTimersByTimeAsync(6_000);
    await second;
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe('fetchBCentral con un fetch que nunca responde', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetModules();
    vi.stubEnv('BCENTRAL_USER', 'usuario');
    vi.stubEnv('BCENTRAL_PASS', 'clave');
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise<Response>(() => {})),
    );
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('resuelve con lista vacía dentro del plazo', async () => {
    const { fetchBCentral } = await import('../bcentral');
    const result = fetchBCentral('F073.UFF.PRE.Z.D');
    await vi.advanceTimersByTimeAsync(6_000);
    await expect(result).resolves.toEqual([]);
  });

  it('no abre otro fetch para la misma serie mientras el anterior sigue pendiente', async () => {
    const { fetchBCentral } = await import('../bcentral');
    const first = fetchBCentral('F073.UFF.PRE.Z.D', '2026-11-01', '2026-11-06');
    await vi.advanceTimersByTimeAsync(6_000);
    await first;
    const second = fetchBCentral('F073.UFF.PRE.Z.D', '2026-11-01', '2026-11-06');
    await vi.advanceTimersByTimeAsync(6_000);
    await expect(second).resolves.toEqual([]);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
