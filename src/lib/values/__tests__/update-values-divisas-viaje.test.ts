import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

/**
 * Prueba el pipeline `scripts/update-values.mjs` con un `fetch` simulado
 * (sin credenciales reales de BCentral) en una copia temporal del repo.
 */
const REPO = path.resolve(__dirname, '../../../..');

function runPipeline(series: Record<string, [string, string]>, previous: object) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'update-values-'));
  fs.mkdirSync(path.join(dir, 'scripts'));
  fs.mkdirSync(path.join(dir, 'src/lib/values'), { recursive: true });
  fs.copyFileSync(
    path.join(REPO, 'scripts/update-values.mjs'),
    path.join(dir, 'scripts/update-values.mjs'),
  );
  fs.writeFileSync(path.join(dir, 'src/lib/values/snapshot.json'), JSON.stringify(previous));
  const preload = path.join(dir, 'mock-fetch.mjs');
  fs.writeFileSync(
    preload,
    `const SERIES = ${JSON.stringify(series)};
globalThis.fetch = async (url) => {
  const u = new URL(String(url));
  const code = u.searchParams.get('timeseries');
  if (!u.hostname.includes('bcentral') || !SERIES[code]) return { ok: false, status: 404, json: async () => null };
  const [value, indexDateString] = SERIES[code];
  return { ok: true, json: async () => ({ Codigo: 0, Series: { Obs: [{ statusCode: 'OK', value, indexDateString }] } }) };
};`,
  );
  execFileSync(
    process.execPath,
    ['--import', preload, path.join(dir, 'scripts/update-values.mjs')],
    {
      env: { ...process.env, BCENTRAL_USER: 'mock', BCENTRAL_PASS: 'mock' },
      stdio: 'pipe',
    },
  );
  return JSON.parse(fs.readFileSync(path.join(dir, 'src/lib/values/snapshot.json'), 'utf8'));
}

const BASE: Record<string, [string, string]> = {
  'F073.UFF.PRE.Z.D': ['41343.55', '17-11-2026'],
  'F073.UTR.PRE.Z.M': ['72440', '01-11-2026'],
  'F073.TCO.PRE.Z.D': ['999.1', '17-11-2026'],
};

describe('update-values: monedas de viaje BRL/PEN', () => {
  it('guarda valor, fecha de observación y fuente bcentral', () => {
    const snap = runPipeline(
      {
        ...BASE,
        'F072.CLP.BRL.N.O.D': ['173.21', '17-11-2026'],
        'F072.CLP.PEN.N.O.D': ['293.2', '17-11-2026'],
      },
      {},
    );
    expect(snap.realBrasileno).toBe(173.21);
    expect(snap.solPeruano).toBe(293.2);
    expect(snap.observedAsOf.realBrasileno).toBe('2026-11-17');
    expect(snap.sources.realBrasileno).toBe('bcentral');
    expect(snap.sources.solPeruano).toBe('bcentral');
  });

  it('si la serie no llega, conserva el valor previo con fuente unknown (nunca «hoy»)', () => {
    const snap = runPipeline(BASE, {
      realBrasileno: 170,
      solPeruano: 290,
      observedAsOf: { realBrasileno: '2026-11-10', solPeruano: '2026-11-10' },
    });
    expect(snap.realBrasileno).toBe(170);
    expect(snap.observedAsOf.realBrasileno).toBe('2026-11-10');
    expect(snap.sources.realBrasileno).toBe('unknown');
    expect(snap.sources.solPeruano).toBe('unknown');
  });
});
