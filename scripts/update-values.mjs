#!/usr/bin/env node
// ============================================
// update-values.mjs
// ----------------------------------------------
// Consulta fuentes oficiales y genera:
//   - `src/lib/values/snapshot.json`       (UF, UTM, dólar, EUR, IPC; diario)
//   - `src/lib/values/tmc-snapshot.json`   (Tasa Máxima Convencional CMF; mensual)
//
// Pensado para correr en CI (GitHub Action diario),
// pero también puede ejecutarse a mano:
//
//   node scripts/update-values.mjs
//
// Estrategia: por cada métrica consultamos varias
// fuentes y nos quedamos con la primera que responda
// con un valor numérico válido. Esto evita depender
// de una sola fuente.
// ============================================

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const SNAPSHOT_PATH = path.join(REPO_ROOT, 'src', 'lib', 'values', 'snapshot.json');
const TMC_SNAPSHOT_PATH = path.join(
  REPO_ROOT,
  'src',
  'lib',
  'values',
  'tmc-snapshot.json',
);

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

/** fetch text defensivo, nunca lanza. */
async function safeFetchText(url, init = {}) {
  try {
    const r = await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        'User-Agent': 'CalculaChile-AutoUpdate/1.0',
        Accept: 'text/html,application/xhtml+xml',
        ...init.headers,
      },
    });
    if (!r.ok) {
      console.error(`[fetch-text] ${url} -> HTTP ${r.status}`);
      return null;
    }
    return await r.text();
  } catch (err) {
    console.error(`[fetch-text] ${url} -> ${err.message}`);
    return null;
  }
}

const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : null);

// ============================================
// Fuentes (snapshot diario)
// ============================================

/** Mindicador.cl (público, sin credenciales). Incluye euro. */
async function fromMindicador() {
  const data = await safeFetchJSON('https://mindicador.cl/api');
  if (!data) return null;
  return {
    uf: num(data?.uf?.valor),
    utm: num(data?.utm?.valor),
    dolarObservado: num(data?.dolar?.valor),
    euro: num(data?.euro?.valor),
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
  const [uf, utm, dolar, euro] = await Promise.all([
    fetchSeries('F073.UFF.PRE.Z.D'),
    fetchSeries('F073.UTR.PRE.Z.M'),
    fetchSeries('F073.TCO.PRE.Z.D'),
    // Paridad EUR/CLP — serie diaria oficial.
    fetchSeries('F072.CLP.EUR.N.O.D'),
  ]);
  return {
    uf,
    utm,
    dolarObservado: dolar,
    euro,
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

// ============================================
// Fuente TMC (CMF) — best-effort scraping mensual
// ============================================

/**
 * Intenta extraer la TMC vigente desde el portal estadístico de la
 * CMF. Estos endpoints HTML cambian con cierta frecuencia, así que
 * el parsing es defensivo: si falla, el caller mantiene el snapshot
 * previo.
 *
 * Formato esperado: tabla con columnas "Operación", "Tasa Corriente",
 * "Tasa Máxima Convencional". Buscamos el primer porcentaje que
 * sigue al texto "Máxima Convencional" para cada categoría conocida.
 */
async function fromCMFTMC() {
  const candidateUrls = [
    'https://www.cmfchile.cl/institucional/estadisticas/tasas_int_g.php?lang=es',
    'https://www.cmfchile.cl/institucional/estadisticas/tasas_int.php',
    'https://www.cmfchile.cl/portal/estadisticas/617/w3-propertyvalue-19272.html',
  ];

  let html = null;
  for (const url of candidateUrls) {
    html = await safeFetchText(url);
    if (html && html.length > 1000) {
      console.log(`[cmf-tmc] datos obtenidos desde ${url}`);
      break;
    }
  }
  if (!html) {
    console.warn('[cmf-tmc] no se pudo obtener HTML de la CMF');
    return null;
  }

  // Limpiamos HTML a texto plano para parsear porcentajes.
  const text = html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');

  // Heurística: buscar tasas asociadas a las categorías típicas de la
  // tabla CMF. Cada categoría aparece junto con dos números (corriente
  // y máxima convencional). Tomamos el segundo, que es la TMC.
  const findRate = (label) => {
    const re = new RegExp(
      `${label}[^\\d%]{0,200}?(\\d{1,3}[.,]\\d{1,3})\\s*%[^\\d%]{0,200}?(\\d{1,3}[.,]\\d{1,3})\\s*%`,
      'i',
    );
    const m = text.match(re);
    if (!m) return null;
    const tmc = parseFloat(m[2].replace(',', '.'));
    return Number.isFinite(tmc) ? tmc : null;
  };

  const tramos = {
    no_reajustables_mayor_5000uf_mayor_90d: findRate('5\\.?000\\s*UF[^.]{0,80}superior'),
    no_reajustables_mayor_200uf_menor_5000uf_mayor_90d: findRate(
      '200\\s*UF[^.]{0,80}5\\.?000\\s*UF',
    ),
    no_reajustables_50_200uf_mayor_90d: findRate('50\\s*UF[^.]{0,80}200\\s*UF'),
    no_reajustables_menor_50uf_mayor_90d: findRate('inferiores\\s*o\\s*iguales[^.]{0,40}50\\s*UF'),
    reajustables_uf_mayor_1_anio: findRate('reajustables[^.]{0,80}superior\\s*a\\s*un\\s*a'),
    reajustables_uf_menor_1_anio: findRate('reajustables[^.]{0,80}inferior\\s*a\\s*un\\s*a'),
  };

  const haveAny = Object.values(tramos).some((v) => v != null);
  if (!haveAny) {
    console.warn('[cmf-tmc] HTML obtenido pero no se pudieron parsear tasas');
    return null;
  }

  return {
    asOf: new Date().toISOString().split('T')[0],
    vigenteDesde: new Date().toISOString().split('T')[0],
    fuente: 'CMF — scraping mensual de tasas vigentes',
    tramos,
    source: 'cmf',
  };
}

async function updateTMCSnapshot() {
  let previous = null;
  try {
    const raw = await fs.readFile(TMC_SNAPSHOT_PATH, 'utf8');
    previous = JSON.parse(raw);
  } catch {
    previous = null;
  }

  const cmf = await fromCMFTMC();
  if (!cmf) {
    console.log('[tmc] manteniendo snapshot previo (CMF inaccesible)');
    return;
  }

  // Mezclar con previo: si algún tramo falló en el parseo, conservar el valor anterior.
  const mergedTramos = { ...(previous?.tramos ?? {}) };
  for (const [k, v] of Object.entries(cmf.tramos)) {
    if (v != null) mergedTramos[k] = v;
  }

  const tmcSnapshot = {
    asOf: cmf.asOf,
    vigenteDesde: cmf.vigenteDesde,
    fuente: cmf.fuente,
    tramos: mergedTramos,
    generatedAt: new Date().toISOString(),
    source: cmf.source,
  };

  await fs.writeFile(
    TMC_SNAPSHOT_PATH,
    JSON.stringify(tmcSnapshot, null, 2) + '\n',
    'utf8',
  );
  console.log('[tmc] snapshot escrito');
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
  const euro = pickFirst('euro', sourcesByPriority);
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
    euro: euro.value ?? previous.euro ?? null,
    ipcMensual: ipc.value ?? previous.ipcMensual ?? null,
    asOf,
    sources: {
      uf: uf.source,
      utm: utm.source,
      dolarObservado: dolar.source,
      euro: euro.source,
      ipcMensual: ipc.source,
    },
    generatedAt: new Date().toISOString(),
  };

  // Validar mínimos: UF y UTM son críticos para casi todas las calculadoras.
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

  // TMC mensual (best-effort, no bloquea)
  try {
    await updateTMCSnapshot();
  } catch (err) {
    console.error('[tmc] error no fatal:', err);
  }
}

main().catch((err) => {
  console.error('[update-values] error fatal:', err);
  process.exit(1);
});
