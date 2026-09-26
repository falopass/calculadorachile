import { describe, it, expect } from 'vitest';
import {
  getValuesHealth,
  SNAPSHOT_STALE_HOURS,
  ALL_FALLBACK_ALERT_HOURS,
  type ValuesResponse,
  type ValuesSource,
} from '../current-values';

const NOW = new Date('2026-09-26T12:00:00.000Z');

const hoursAgo = (hours: number) =>
  new Date(NOW.getTime() - hours * 3_600_000).toISOString();

const all = (source: ValuesSource): ValuesResponse['freshness'] => ({
  uf: source,
  utm: source,
  dolarObservado: source,
  dolarVenta: source,
  euro: source,
});

describe('getValuesHealth', () => {
  it('snapshot fresco (10 h) y todo bcentral → sin alerta ni stale', () => {
    const h = getValuesHealth(all('bcentral'), hoursAgo(10), NOW);
    expect(h.snapshotAgeHours).toBe(10);
    expect(h.snapshotAsOf).toBe(hoursAgo(10));
    expect(h.stale).toBe(false);
    expect(h.allFallback).toBe(false);
    expect(h.alert).toBe(false);
  });

  it('snapshot 30 h todo fallback → alerta sin stale', () => {
    const h = getValuesHealth(all('fallback'), hoursAgo(30), NOW);
    expect(h.snapshotAgeHours).toBe(30);
    expect(h.stale).toBe(false);
    expect(h.allFallback).toBe(true);
    expect(h.alert).toBe(true);
  });

  it('snapshot 30 h con fuentes mixtas → sin alerta', () => {
    const mixed: ValuesResponse['freshness'] = {
      ...all('fallback'),
      uf: 'bcentral',
      utm: 'mindicador',
    };
    const h = getValuesHealth(mixed, hoursAgo(30), NOW);
    expect(h.stale).toBe(false);
    expect(h.allFallback).toBe(false);
    expect(h.alert).toBe(false);
  });

  it('snapshot 50 h → stale y alerta aunque las fuentes estén vivas', () => {
    const h = getValuesHealth(all('bcentral'), hoursAgo(50), NOW);
    expect(h.snapshotAgeHours).toBe(50);
    expect(h.stale).toBe(true);
    expect(h.alert).toBe(true);
  });

  it('snapshot sin asOf → stale, edad null', () => {
    const h = getValuesHealth(all('bcentral'), undefined, NOW);
    expect(h.snapshotAsOf).toBeNull();
    expect(h.snapshotAgeHours).toBeNull();
    expect(h.stale).toBe(true);
    expect(h.alert).toBe(true);
  });

  it('asOf inválido → stale, edad null', () => {
    const h = getValuesHealth(all('bcentral'), 'no-es-fecha', NOW);
    expect(h.snapshotAsOf).toBe('no-es-fecha');
    expect(h.snapshotAgeHours).toBeNull();
    expect(h.stale).toBe(true);
  });

  it('exactamente 48 h → no stale (umbral estricto >)', () => {
    const h = getValuesHealth(
      all('bcentral'),
      hoursAgo(SNAPSHOT_STALE_HOURS),
      NOW,
    );
    expect(h.snapshotAgeHours).toBe(48);
    expect(h.stale).toBe(false);
    expect(h.alert).toBe(false);
  });

  it('exactamente 24 h todo fallback → no alerta por esa regla (umbral estricto >)', () => {
    const h = getValuesHealth(
      all('fallback'),
      hoursAgo(ALL_FALLBACK_ALERT_HOURS),
      NOW,
    );
    expect(h.snapshotAgeHours).toBe(24);
    expect(h.allFallback).toBe(true);
    expect(h.stale).toBe(false);
    expect(h.alert).toBe(false);
  });
});
