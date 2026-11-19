import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { runnerImport } from 'vite';

// Auditoría editorial sobre el contenido tal como se renderiza: carga
// `articles` y `guias` en runtime (con el alias `@` de Next/Vitest), de modo
// que las plantillas con valores dinámicos (UF, IMM, tasas por año) y los
// artículos importados desde otros módulos quedan resueltos antes de medir.
// Es un gate: cualquier fallo devuelve exit code 1.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIN_WORDS = 1500;
const SHINGLE_WARNING = 0.04;
const SHINGLE_FAILURE = 0.08;
const OFFICIAL_HOSTS = [
  'afc.cl',
  'bcentral.cl',
  'bcn.cl',
  'chileatiende.gob.cl',
  'cmfchile.cl',
  'dt.gob.cl',
  'ine.gob.cl',
  'ingresa.cl',
  'minvu.gob.cl',
  'previsionsocial.gob.cl',
  'sii.cl',
  'spensiones.cl',
  'tgr.cl',
];
const GENERIC_PATTERNS = [
  /en un mundo cada vez más/giu,
  /en la era digital/giu,
  /en la actualidad/giu,
  /es importante (?:destacar|señalar|mencionar)/giu,
  /cabe destacar/giu,
  /a lo largo de este artículo/giu,
  /todo lo que necesitas saber/giu,
  /juega un papel crucial/giu,
  /marca un antes y un después/giu,
  /en conclusión/giu,
  /sin duda/giu,
];

const BROKEN_INTERPOLATION = /\b(?:undefined|NaN|Infinity)\b|\[object Object\]|\$\{/g;

async function loadModule(relativePath) {
  const { module } = await runnerImport(path.join(ROOT, relativePath), {
    configFile: false,
    root: ROOT,
    logLevel: 'error',
    resolve: { alias: { '@': path.join(ROOT, 'src') } },
  });
  return module;
}

function decodeEntities(value) {
  const named = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    nbsp: ' ',
    quot: '"',
  };
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, entity) => named[entity.toLowerCase()] ?? match);
}

function plainText(html) {
  return decodeEntities(
    html
      .replace(/<!--.*?-->/gs, ' ')
      .replace(/<script\b[^>]*>.*?<\/script>/gis, ' ')
      .replace(/<style\b[^>]*>.*?<\/style>/gis, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordCount(html) {
  return plainText(html).match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

function externalLinks(html) {
  return new Set([...html.matchAll(/href=["'](https?:\/\/[^"']+)["']/gi)].map((match) => match[1]));
}

function officialLinks(html) {
  return new Set(
    [...externalLinks(html)].filter((url) => {
      const hostname = new URL(url).hostname.replace(/^www\d*\./, '');
      return OFFICIAL_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`));
    }),
  );
}

function genericHits(html) {
  const text = plainText(html);
  return GENERIC_PATTERNS.flatMap((pattern) =>
    [...text.matchAll(pattern)].map((match) => match[0]),
  );
}

function brokenInterpolations(html) {
  return [...plainText(html).matchAll(BROKEN_INTERPOLATION)].map((match) => match[0]);
}

function auditRow(type, item, content, sources) {
  return {
    type,
    slug: item.slug,
    title: item.title,
    words: wordCount(content),
    externalLinks: externalLinks(content).size,
    declaredSources: Math.max(sources?.length ?? 0, officialLinks(content).size),
    genericHits: genericHits(content),
    brokenInterpolations: [
      ...brokenInterpolations(content),
      ...brokenInterpolations(`${item.title} ${item.description}`),
    ],
    plain: plainText(content),
  };
}

function auditArticles(articles) {
  return articles.map((article) => {
    if (typeof article.content !== 'string') {
      throw new Error(`El artículo ${article.slug} no tiene contenido de texto.`);
    }
    return auditRow('blog', article, article.content, article.sources);
  });
}

function auditGuides(guias) {
  return guias.map((guia) => {
    const content = guia.sections.map((section) => section.html).join('\n');
    return auditRow('guía', guia, content, guia.sources);
  });
}

function shingles(text, size = 5) {
  const tokens =
    text
      .toLocaleLowerCase('es-CL')
      .normalize('NFD')
      .replace(/\p{M}/gu, '')
      .match(/[\p{L}\p{N}]+/gu) ?? [];
  const result = new Set();
  for (let index = 0; index <= tokens.length - size; index += 1) {
    result.add(tokens.slice(index, index + size).join(' '));
  }
  return result;
}

const { articles, RETIRED_ARTICLE_REDIRECTS: retiredRedirects } =
  await loadModule('src/data/articles.ts');
const { guias } = await loadModule('src/data/guias.ts');
const rows = [...auditArticles(articles), ...auditGuides(guias)].sort((a, b) => a.words - b.words);
const slugCounts = new Map();
for (const row of rows) {
  const key = `${row.type}:${row.slug}`;
  slugCounts.set(key, (slugCounts.get(key) ?? 0) + 1);
}
const duplicateSlugs = [...slugCounts].filter(([, count]) => count > 1).map(([key]) => key);
const withBrokenInterpolation = rows.filter((row) => row.brokenInterpolations.length > 0);
const retiredStillPublished = articles
  .map((article) => article.slug)
  .filter((slug) => slug in retiredRedirects);
const belowMinimum = rows.filter((row) => row.words < MIN_WORDS);
const withoutSources = rows.filter((row) => row.declaredSources === 0);
const rowShingles = rows.map((row) => ({ row, values: shingles(row.plain) }));
const similarities = [];

for (let left = 0; left < rowShingles.length; left += 1) {
  for (let right = left + 1; right < rowShingles.length; right += 1) {
    const a = rowShingles[left];
    const b = rowShingles[right];
    const smaller = a.values.size <= b.values.size ? a.values : b.values;
    const larger = smaller === a.values ? b.values : a.values;
    let shared = 0;
    for (const value of smaller) {
      if (larger.has(value)) shared += 1;
    }
    const containment = smaller.size === 0 ? 0 : shared / smaller.size;
    if (containment >= SHINGLE_WARNING) {
      similarities.push({
        a: a.row.slug,
        b: b.row.slug,
        containment,
      });
    }
  }
}

const excessiveSimilarity = similarities.filter((pair) => pair.containment > SHINGLE_FAILURE);
const redirectLeakFiles = [
  'src/data/guias.ts',
  'src/data/seo-overrides.ts',
  'src/app/sitemap-blog.xml/route.ts',
  'src/app/sitemap.xml/route.ts',
  'src/app/blog/page.tsx',
  'src/components/search/SiteSearch.tsx',
];
const redirectLeaks = [];
for (const file of redirectLeakFiles) {
  const source = fs.readFileSync(path.join(ROOT, file), 'utf8');
  for (const slug of Object.keys(retiredRedirects)) {
    if (source.includes(slug)) redirectLeaks.push(`${file}: ${slug}`);
  }
}
const nextConfig = fs.readFileSync(path.join(ROOT, 'next.config.ts'), 'utf8');
const missingRedirects = Object.entries(retiredRedirects).filter(
  ([slug, destination]) =>
    !nextConfig.includes(`source: '/blog/${slug}'`) ||
    !nextConfig.includes(`destination: '${destination}'`),
);

if (process.argv.includes('--json')) {
  process.stdout.write(
    `${JSON.stringify(
      {
        minimum: MIN_WORDS,
        rows: rows.map(({ plain, ...row }) => row),
        similarities,
        failures: {
          belowMinimum: belowMinimum.map((row) => row.slug),
          withoutSources: withoutSources.map((row) => row.slug),
          brokenInterpolation: withBrokenInterpolation.map((row) => row.slug),
          duplicateSlugs,
          excessiveSimilarity,
          redirectLeaks,
          missingRedirects: missingRedirects.map(([slug]) => slug),
          retiredStillPublished,
        },
      },
      null,
      2,
    )}\n`,
  );
} else {
  console.table(
    rows.map((row) => ({
      tipo: row.type,
      slug: row.slug,
      palabras: row.words,
      fuentes: row.declaredSources,
      links: row.externalLinks,
      genericas: row.genericHits.length,
      estado: row.words >= MIN_WORDS ? 'OK' : 'BAJO',
    })),
  );
  console.log(
    `\nTotal: ${rows.length} piezas | Bajo ${MIN_WORDS}: ${belowMinimum.length} | Cumplen: ${rows.length - belowMinimum.length}`,
  );
  console.log(`Sin fuentes declaradas: ${withoutSources.length}`);
  console.log(`Interpolaciones rotas: ${withBrokenInterpolation.length}`);
  for (const row of withBrokenInterpolation) {
    console.log(`FALLO interpolación: ${row.slug} (${row.brokenInterpolations.join(', ')})`);
  }
  console.log(`Slugs duplicados: ${duplicateSlugs.length}`);
  console.log(`Artículos retirados aún publicados: ${retiredStillPublished.length}`);
  console.log(`Fugas de URLs retiradas: ${redirectLeaks.length}`);
  console.log(`Redirects faltantes: ${missingRedirects.length}`);
  for (const pair of similarities.sort((a, b) => b.containment - a.containment)) {
    const level = pair.containment > SHINGLE_FAILURE ? 'FALLO' : 'ADVERTENCIA';
    console.log(
      `${level} similitud: ${pair.a} <> ${pair.b} = ${(pair.containment * 100).toFixed(2)}%`,
    );
  }
}

const failed =
  belowMinimum.length > 0 ||
  withoutSources.length > 0 ||
  withBrokenInterpolation.length > 0 ||
  duplicateSlugs.length > 0 ||
  excessiveSimilarity.length > 0 ||
  redirectLeaks.length > 0 ||
  missingRedirects.length > 0 ||
  retiredStillPublished.length > 0;

if (failed) {
  if (!process.argv.includes('--json')) console.error('\nAuditoría editorial: FALLO');
  process.exitCode = 1;
} else if (!process.argv.includes('--json')) {
  console.log('\nAuditoría editorial: OK');
}
