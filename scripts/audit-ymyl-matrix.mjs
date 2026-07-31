/**
 * Auditoría YMYL: matriz catálogo ↔ adapter ↔ módulo.
 * Uso: node scripts/audit-ymyl-matrix.mjs
 */
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const cat = fs.readFileSync(path.join(root, 'src/data/calculators.ts'), 'utf8');
const methodologySource = fs.readFileSync(
  path.join(root, 'src/data/calculator-methodologies.ts'),
  'utf8',
);
// Adapters viven en load-calculator.ts (code-split). Fallback al client legacy.
const adapterPathCandidates = [
  path.join(root, 'src/lib/calculations/load-calculator.ts'),
  path.join(root, 'src/app/calculadoras/[slug]/CalculatorPageClient.tsx'),
];
const adapterFilePath = adapterPathCandidates.find((p) => fs.existsSync(p));
const adapterSource = fs.readFileSync(adapterFilePath, 'utf8');

// Normalize CRLF so regexes are stable on Windows.
const catN = cat.replace(/\r\n/g, '\n');
const clientN = adapterSource.replace(/\r\n/g, '\n');

const calcBlocks = [];
// Each calculator object starts with 2-space indent `{` then `id:` at 4 spaces.
const re =
  /\n  \{\n    id: '([^']+)',\n    name: '([^']*)',[\s\S]*?\n    slug: '([^']+)',[\s\S]*?\n    category: '([^']+)',[\s\S]*?\n    inputs: \[([\s\S]*?)\n    \],/g;
let m;
while ((m = re.exec(catN))) {
  const inputIds = [...m[5].matchAll(/id: '([^']+)'/g)].map((x) => x[1]);
  const blockStart = m.index;
  // Look ahead for metadata that may sit before or after inputs
  const after = catN.slice(blockStart, blockStart + 5000);
  const noIndex = /noIndex:\s*true/.test(after);
  const lastReviewed = (after.match(/lastReviewed:\s*'([^']+)'/) || [])[1] || null;
  const hasSources = /sources:\s*\[/.test(after);
  const featured = /featured:\s*true/.test(after);
  const phase = (after.match(/phase:\s*([123])/) || [])[1] || '?';
  calcBlocks.push({
    id: m[1],
    name: m[2],
    slug: m[3],
    category: m[4],
    inputs: inputIds,
    noIndex,
    lastReviewed,
    hasSources,
    featured,
    phase,
  });
}

const adapters = {};

/** Parse object map style: `"id": (inputs) => { ... },` (legacy client). */
const adapterMapRe = /(?:\"([^\"]+)\"|([a-zA-Z0-9_-]+)):\s*\(inputs\)\s*=>\s*\{([\s\S]*?)\n  \},/g;
/** Parse switch style: `case 'id': { ... return (inputs) => { ... }; }` (load-calculator). */
const adapterCaseRe = /case\s+['\"]([^'\"]+)['\"]:\s*\{([\s\S]*?)(?=\n    case |\n    default:)/g;

function registerAdapter(key, body) {
  const objMatch = body.match(/calculate\w+\(\{\s*([\s\S]*?)\}\s*\)/);
  if (!objMatch) {
    adapters[key] = { fields: [], note: 'NO_CALC' };
    return;
  }
  // Prefer fields read from inputs.* in the whole adapter body (not only the
  // object literal), so `const x = num(inputs.ano)` still counts as wired.
  const fromInputs = [...body.matchAll(/inputs\.([A-Za-z_\u00f1\u00d1][\w\u00f1\u00d1]*)/g)].map(
    (x) => x[1],
  );
  // Also accept object keys that are plain aliases of catalog fields
  const objectKeys = [
    ...objMatch[1].matchAll(/^\s*([A-Za-z_\u00f1\u00d1][\w\u00f1\u00d1]*)\s*:/gm),
  ].map((x) => x[1]);
  const fields = [...new Set([...fromInputs, ...objectKeys])];
  const hardcodes = [
    ...objMatch[1].matchAll(/([A-Za-z_\u00f1\u00d1][\w\u00f1\u00d1]*)\s*:\s*([^,\n]+)/g),
  ]
    .filter(
      (x) => !x[2].includes('inputs.') && !x[2].includes('live?.') && !x[2].includes('coerce'),
    )
    .map((x) => `${x[1]}=${x[2].trim()}`);
  adapters[key] = { fields, hardcodes };
}

let a;
while ((a = adapterMapRe.exec(clientN))) {
  registerAdapter(a[1] || a[2], a[3]);
}
while ((a = adapterCaseRe.exec(clientN))) {
  registerAdapter(a[1], a[2]);
}

const calcDir = path.join(root, 'src/lib/calculations');
const files = fs.readdirSync(calcDir).filter((f) => f.endsWith('.ts'));

const idToModule = {
  'vacaciones-proporcionales': 'vacaciones',
  'gratificacion-legal': 'gratificacion',
  'indemnizacion-anos-servicio': 'indemnizacion',
  'costo-empleado-pyme': 'costo-empleado',
};

function findModuleForId(id) {
  const base = idToModule[id] || id;
  if (files.includes(base + '.ts')) return base + '.ts';
  return null;
}

/** Catalog input → adapter field renames that are intentional */
const catalogToAdapter = {
  esDomingo: 'esDomingoFestivo',
  diasNoTomados: 'diasVacacionesPendientes',
  // Boleta: catálogo dice incluyeCotizaciones; motor usa desgloseCotizaciones
  incluyeCotizaciones: 'desgloseCotizaciones',
  // Subsidio: catálogo valorPropiedad/ahorro; adapter/motor en UF
  valorPropiedad: 'valorPropiedadUF',
  ahorro: 'ahorroUF',
};

const rows = [];
for (const c of calcBlocks) {
  const ad = adapters[c.id];
  const adapterFields = ad ? ad.fields : null;
  const modFile = findModuleForId(c.id);
  let moduleFields = [];
  if (modFile) {
    const src = fs.readFileSync(path.join(calcDir, modFile), 'utf8');
    const im = src.match(/export interface \w+Input \{([\s\S]*?)\n\}/);
    if (im) {
      moduleFields = [...im[1].matchAll(/^\s+(\w+)[\?:]/gm)].map((x) => x[1]);
    }
  }

  const truePhantoms = [];
  for (const i of c.inputs) {
    if (!adapterFields) {
      truePhantoms.push(i);
      continue;
    }
    const mapped = catalogToAdapter[i] || i;
    if (!adapterFields.includes(mapped) && !adapterFields.includes(i)) {
      truePhantoms.push(i);
    }
  }

  const dead = (adapterFields || []).filter((f) => {
    if (f === 'esDomingoFestivo' && c.inputs.includes('esDomingo')) return false;
    if (f === 'diasVacacionesPendientes' && c.inputs.includes('diasNoTomados')) return false;
    // reverse: adapter field not in catalog
    const reverse = Object.entries(catalogToAdapter).find(([, v]) => v === f);
    if (reverse && c.inputs.includes(reverse[0])) return false;
    return !c.inputs.includes(f);
  });

  // Module supports more than adapter passes
  const moduleOrphans = moduleFields.filter((f) => {
    if (!adapterFields) return true;
    if (adapterFields.includes(f)) return false;
    // catalog might have it but adapter doesn't = already phantom
    return true;
  });

  rows.push({
    id: c.id,
    name: c.name,
    phase: c.phase,
    noIndex: c.noIndex,
    hasSources: c.hasSources,
    lastReviewed: c.lastReviewed,
    catalogInputs: c.inputs,
    adapterFields: adapterFields || [],
    hardcodes: ad?.hardcodes || [],
    moduleFile: modFile,
    moduleFields,
    phantoms: truePhantoms,
    dead,
    moduleOrphans,
  });
}

const withPh = rows.filter((r) => r.phantoms.length);
const missingAdapter = rows.filter((r) => !adapters[r.id]);
const noSources = rows.filter((r) => !r.hasSources);

console.log('=== RESUMEN ===');
console.log('Calculadoras catálogo:', calcBlocks.length);
console.log('Adapters:', Object.keys(adapters).length);
console.log('Con fantasma(s):', withPh.length);
console.log(
  'Campos fantasma totales:',
  withPh.reduce((s, r) => s + r.phantoms.length, 0),
);
console.log('Sin adapter:', missingAdapter.map((r) => r.id).join(', ') || 'ninguno');
console.log('Sin sources en catálogo:', noSources.length);

console.log('\n=== DETALLE FANTASMAS (por calculadora) ===');
for (const r of withPh.sort((a, b) => b.phantoms.length - a.phantoms.length)) {
  const tag = r.noIndex ? ' [noIndex]' : '';
  console.log(`\n## ${r.id}${tag} (phase ${r.phase}) — ${r.phantoms.length} fantasmas`);
  console.log('  FANTASMA:', r.phantoms.join(', '));
  if (r.dead.length) console.log('  DEAD/adapter-only:', r.dead.join(', '));
  if (r.hardcodes.length) console.log('  HARDCODE:', r.hardcodes.join(', '));
  const usableModule = r.moduleOrphans.filter(
    (f) => r.phantoms.includes(f) || r.catalogInputs.includes(f),
  );
  if (r.moduleFields.length) {
    const wired = r.moduleFields.filter((f) => r.adapterFields.includes(f));
    console.log(
      `  Módulo ${r.moduleFile}: ${wired.length}/${r.moduleFields.length} campos cableados`,
    );
  }
}

console.log('\n=== TOP TRÁFICO (detalle cableado) ===');
const top = [
  'sueldo-liquido',
  'finiquito',
  'boleta-honorarios',
  'iva',
  'credito-hipotecario',
  'comparador-afp',
  'uf-clp',
  'horas-extra',
];
for (const id of top) {
  const r = rows.find((x) => x.id === id);
  if (!r) {
    console.log(id, 'NOT FOUND');
    continue;
  }
  console.log(`\n### ${id}`);
  console.log('  cat:', r.catalogInputs.join(', '));
  console.log('  adp:', r.adapterFields.join(', '));
  console.log('  mod:', r.moduleFields.join(', '));
  console.log('  ph:', r.phantoms.join(', ') || '—');
  console.log('  sources:', r.hasSources, 'reviewed:', r.lastReviewed, 'noIndex:', !!r.noIndex);
}

// Gates de rescate AdSense. Se segmenta cada objeto por el siguiente `id`
// para evitar atribuir `noIndex` o fuentes a la calculadora vecina.
const rescueStarts = [...catN.matchAll(/\n  \{\n    id: '([^']+)'/g)];
const methodologyIds = new Set(
  [...methodologySource.matchAll(/^  (?:'([^']+)'|([a-z][\w-]*)):\s*\{/gm)].map(
    (match) => match[1] || match[2],
  ),
);

const rescueRows = rescueStarts.map((match, index) => {
  const next = rescueStarts[index + 1];
  const end = next?.index ?? catN.indexOf('\n];', match.index);
  const block = catN.slice(match.index, end);
  const urls = [...block.matchAll(/url:\s*'([^']+)'/g)].map((sourceMatch) => sourceMatch[1]);
  const hasSpecificSources =
    urls.length > 0 &&
    urls.every((url) => {
      const parsed = new URL(url);
      return !(
        parsed.pathname === '/' ||
        parsed.pathname === '/leychile' ||
        parsed.pathname === '/portal/prevision'
      );
    });

  return {
    id: match[1],
    noIndex: /noIndex:\s*true/.test(block),
    lastReviewed: (block.match(/lastReviewed:\s*'([^']+)'/) || [])[1] || '',
    hasMethodology: methodologyIds.has(match[1]),
    hasSpecificSources,
  };
});

for (const row of rows) {
  const accurateRow = rescueRows.find((item) => item.id === row.id);
  if (accurateRow) row.noIndex = accurateRow.noIndex;
}

fs.writeFileSync(
  path.join(root, 'scripts/audit-ymyl-matrix-out.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), rows }, null, 2),
);
console.log('\nWrote scripts/audit-ymyl-matrix-out.json');

const rescueFailures = [];
for (const row of rescueRows.filter((item) => !item.noIndex)) {
  if (!row.hasMethodology) {
    rescueFailures.push(`${row.id}: sin metodología`);
  }
  if (!row.hasSpecificSources) {
    rescueFailures.push(`${row.id}: fuente ausente o genérica`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.lastReviewed)) {
    rescueFailures.push(`${row.id}: lastReviewed inválido`);
  }
}

const discoveryFiles = [
  'src/app/calculadoras/page.tsx',
  'src/app/categoria/page.tsx',
  'src/app/categoria/[slug]/page.tsx',
  'src/components/home/CategoryCatalog.tsx',
  'src/components/home/PopularCalculators.tsx',
  'src/components/home/SearchHero.tsx',
  'src/components/search/SiteSearch.tsx',
];
for (const file of discoveryFiles) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  if (/import\s*\{\s*calculators\s*\}\s*from\s*['"]@\/data\/calculators['"]/.test(source)) {
    rescueFailures.push(`${file}: expone calculators sin filtrar noIndex`);
  }
}

const trustSource = [
  'src/lib/seo/author.ts',
  'src/lib/seo/schema.ts',
  'src/app/acerca-de/page.tsx',
  'src/app/calculadoras/[slug]/page.tsx',
  'src/app/calculadoras/[slug]/CalculatorPageClient.tsx',
]
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');
const prohibitedClaims = [
  /ingeniero de software/i,
  /Áreas de expertise/i,
  /twitter\.com\/calculachile/i,
  /todos con valores oficiales/i,
  /modifiedTime:\s*new Date/i,
];
for (const pattern of prohibitedClaims) {
  if (pattern.test(trustSource)) {
    rescueFailures.push(`claim prohibido: ${pattern}`);
  }
}

console.log('\n=== GATES ADSENSE ===');
console.log('Indexables reales:', rescueRows.filter((row) => !row.noIndex).length);
console.log('noIndex reales:', rescueRows.filter((row) => row.noIndex).length);
console.log('Fallos:', rescueFailures.length);
for (const failure of rescueFailures) console.error(`- ${failure}`);

if (withPh.length || missingAdapter.length || noSources.length || rescueFailures.length) {
  process.exitCode = 1;
}
