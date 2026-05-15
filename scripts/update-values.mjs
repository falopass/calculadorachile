#!/usr/bin/env node
// ============================================
// update-values.mjs
// ----------------------------------------------
// Consulta fuentes oficiales y genera
// `src/lib/values/snapshot.json`.
//
// Pensado para correr en CI (GitHub Action diario),
// pero también puede ejecutarse a mano:
//
//   node scripts/update-values.mjs
//
// Estrategia: por cada métrica (UF, UTM, dólar,
// IPC) consultamos varias fuentes y nos quedamos
// con la primera que responda con un valor
// numérico válido. Esto evita depender de una
// sola fuente.
// ============================================

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const SNAPSHOT_PATH = path.join(REPO_ROOT, 'src', 'lib', 'values', 'snapshot.json');

const FETCH_TIMEOUT_MS = 15_000;

/** fetch + JSON parse defensivo, nunca lanza. */
async function safeFetchJSON(url, init = {}) {
  try {
    const r = await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        Accept: 'application/json',
        'User-Agent': 'CalculaChile-AutoUpdate/1.0',
        ...init.headers,
      },
    });
    if (!r.ok) {
      console.error(`[fetch] ${url} -> HTTP ${r.status}`);
      return null;
    }
    return await r.json();
  } catch (err) {
    console.error(`[fetch] ${url} -> ${err.message}`);
    return null;
  }
}

const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : null);

// ============================================
// Fuentes
// ============================================

/** Mindicador.cl (público, sin credenciales). */
async function fromMindicador() {
  const data = await safeFetchJSON('https://mindicador.cl/api');
  if (!data) return null;
  return {
    uf: num(data?.uf?.valor),
    utm: num(data?.utm?.valor),
    dolarObservado: num(data?.dolar?.valor),
    ipcMensual: num(data?.ipc?.valor),
    asOf: data?.uf?.fecha ?? data?.dolar?.fecha ?? data?.fecha ?? null,
  };
}

/** Banco Central (oficial, requiere credenciales). */
async function fromBCentral() {
  const user = process.env.BCENTRAL_USER;
  const pass = process.env.BCENTRAL_PASS;
  if (!user || !pass) {
    console.log('[bcentral] sin credenciales, omitido');
    return null;
  }

  const today = new Date();
  const since = new Date(today.getTime() - 30 * 24 * 3600 * 1000);
  const fmt = (d) => d.toISOString().split('T')[0];

  const fetchSeries = async (code) => {
    const params = new URLSearchParams({
      user,
      pass,
      function: 'GetSeries',
      timeseries: code,
      firstdate: fmt(since),
      lastdate: fmt(today),
    });
    const data = await safeFetchJSON(
      `https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?${params}`,
    );
    if (!data || data.Codigo !== 0 || !data.Series?.Obs?.length) return null;
    const obs = data.Series.Obs.filter((o) => o.statusCode === 'OK');
    if (!obs.length) return null;
    const last = obs[obs.length - 1];
    return num(parseFloat(String(last.value).replace(',', '.')));
  };

  // Códigos oficiales BCentral
  const [uf, utm, dolar] = await Promise.all([
    fetchSeries('F073.UFF.PRE.Z.D'),
    fetchSeries('F073.UTR.PRE.Z.M'),
    fetchSeries('F073.TCO.PRE.Z.D'),
  ]);
  return {
    uf,
    utm,
    dolarObservado: dolar,
    ipcMensual: null, // BCentral expone IPC en otro endpoint; lo dejamos a Mindicador
    asOf: today.toISOString(),
  };
}

/**
 * Para cada métrica, devuelve el primer valor no-null entre las
 * fuentes provistas, junto con el nombre de la fuente elegida.
 */
function pickFirst(metric, sources) {
  for (const [name, payload] of sources) {
    const v = payload?.[metric];
    if (v != null) return { value: v, source: name };
  }
  return { value: null, source: 'unknown' };
}

async function main() {
  console.log('[update-values] consultando fuentes...');
  const [mindicador, bcentral] = await Promise.all([
    fromMindicador(),
    fromBCentral(),
  ]);

  const sourcesByPriority = [
    ['bcentral', bcentral],
    ['mindicador', mindicador],
  ];

  const uf = pickFirst('uf', sourcesByPriority);
  const utm = pickFirst('utm', sourcesByPriority);
  const dolar = pickFirst('dolarObservado', sourcesByPriority);
  const ipc = pickFirst('ipcMensual', sourcesByPriority);

  if (uf.value == null && utm.value == null && dolar.value == null) {
    console.error(
      '[update-values] FATAL: ninguna fuente respondio con valores validos',
    );
    process.exit(1);
  }

  const asOf =
    bcentral?.asOf ??
    mindicador?.asOf ??
    new Date().toISOString().split('T')[0] + 'T00:00:00.000Z';

  // Leer snapshot anterior (si existe) para preservar campos que hoy no llegaron.
  let previous = {};
  try {
    const raw = await fs.readFile(SNAPSHOT_PATH, 'utf8');
    previous = JSON.parse(raw);
  } catch {
    // archivo no existe o no es valido aun; ok
  }

  const snapshot = {
    uf: uf.value ?? previous.uf ?? null,
    utm: utm.value ?? previous.utm ?? null,
    dolarObservado: dolar.value ?? previous.dolarObservado ?? null,
    ipcMensual: ipc.value ?? previous.ipcMensual ?? null,
    asOf,
    sources: {
      uf: uf.source,
      utm: utm.source,
      dolarObservado: dolar.source,
      ipcMensual: ipc.source,
    },
    generatedAt: new Date().toISOString(),
  };

  // Validar minimos: UF y UTM son criticos para casi todas las calculadoras.
  if (snapshot.uf == null || snapshot.utm == null) {
    console.error('[update-values] FATAL: faltan UF o UTM tras consolidar');
    process.exit(1);
  }

  await fs.writeFile(
    SNAPSHOT_PATH,
    JSON.stringify(snapshot, null, 2) + '\n',
    'utf8',
  );

  console.log('[update-values] snapshot escrito:');
  console.log(JSON.stringify(snapshot, null, 2));
}

main().catch((err) => {
  console.error('[update-values] error fatal:', err);
  process.exit(1);
});
