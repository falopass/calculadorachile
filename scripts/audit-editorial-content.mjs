import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const ROOT = process.cwd();
const MIN_WORDS = 1500;
const SHINGLE_WARNING = 0.04;
const SHINGLE_FAILURE = 0.08;
const RETIRED_ARTICLE_SLUGS = new Set([
  'guia-horas-extra-chile',
  'vacaciones-proporcionales-guia',
  'como-calcular-finiquito-chile',
  'boleta-honorarios-completo',
  'guia-iva-chile-2026',
]);
const OFFICIAL_HOSTS = [
  'afc.cl',
  'bcentral.cl',
  'bcn.cl',
  'chileatiende.gob.cl',
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

function parse(file) {
  const source = fs.readFileSync(file, 'utf8');
  return ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

function property(object, name) {
  if (!object || !ts.isObjectLiteralExpression(object)) return undefined;
  return object.properties.find((item) => {
    if (!ts.isPropertyAssignment(item)) return false;
    const key = item.name;
    return (ts.isIdentifier(key) || ts.isStringLiteral(key)) && key.text === name;
  })?.initializer;
}

function stringValue(node) {
  if (!node) return '';
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  if (ts.isTemplateExpression(node)) {
    throw new Error('No se admiten expresiones dinámicas dentro del contenido editorial.');
  }
  return '';
}

function arrayValue(node) {
  return node && ts.isArrayLiteralExpression(node) ? node.elements : [];
}

function findArray(sourceFile, variableName) {
  let result;
  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;
    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== variableName) {
        continue;
      }
      if (declaration.initializer && ts.isArrayLiteralExpression(declaration.initializer)) {
        result = declaration.initializer;
      }
    }
  });
  if (!result) throw new Error(`No se encontró el arreglo ${variableName}.`);
  return result.elements;
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

function countObjectArray(node) {
  return arrayValue(node).filter(ts.isObjectLiteralExpression).length;
}

function auditArticles() {
  const file = path.join(ROOT, 'src', 'data', 'articles.ts');
  const entries = findArray(parse(file), 'articleCatalog');
  return entries
    .filter(ts.isObjectLiteralExpression)
    .filter((entry) => !RETIRED_ARTICLE_SLUGS.has(stringValue(property(entry, 'slug'))))
    .map((entry) => {
      const content = stringValue(property(entry, 'content'));
      return {
        type: 'blog',
        slug: stringValue(property(entry, 'slug')),
        title: stringValue(property(entry, 'title')),
        words: wordCount(content),
        externalLinks: externalLinks(content).size,
        declaredSources: Math.max(
          countObjectArray(property(entry, 'sources')),
          officialLinks(content).size,
        ),
        genericHits: genericHits(content),
        plain: plainText(content),
      };
    });
}

function auditGuides() {
  const file = path.join(ROOT, 'src', 'data', 'guias.ts');
  const entries = findArray(parse(file), 'guias');
  return entries.filter(ts.isObjectLiteralExpression).map((entry) => {
    const sections = arrayValue(property(entry, 'sections'));
    const content = sections
      .filter(ts.isObjectLiteralExpression)
      .map((section) => stringValue(property(section, 'html')))
      .join('\n');
    return {
      type: 'guía',
      slug: stringValue(property(entry, 'slug')),
      title: stringValue(property(entry, 'title')),
      words: wordCount(content),
      externalLinks: externalLinks(content).size,
      declaredSources: countObjectArray(property(entry, 'sources')),
      genericHits: genericHits(content),
      plain: plainText(content),
    };
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

const rows = [...auditArticles(), ...auditGuides()].sort((a, b) => a.words - b.words);
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
const retiredRedirects = {
  'guia-horas-extra-chile': '/blog/horas-extra-jornada-42-horas-chile-2026',
  'vacaciones-proporcionales-guia': '/calculadoras/calculadora-vacaciones-proporcionales',
  'como-calcular-finiquito-chile': '/guias/finiquito-laboral-chile',
  'boleta-honorarios-completo': '/guias/iva-boleta-honorarios-chile',
  'guia-iva-chile-2026': '/calculadoras/calculadora-iva',
};
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
  console.log(`Fugas de URLs retiradas: ${redirectLeaks.length}`);
  console.log(`Redirects faltantes: ${missingRedirects.length}`);
  for (const pair of similarities.sort((a, b) => b.containment - a.containment)) {
    const level = pair.containment > SHINGLE_FAILURE ? 'FALLO' : 'ADVERTENCIA';
    console.log(
      `${level} similitud: ${pair.a} <> ${pair.b} = ${(pair.containment * 100).toFixed(2)}%`,
    );
  }
}

if (
  process.argv.includes('--strict') &&
  (belowMinimum.length > 0 ||
    withoutSources.length > 0 ||
    excessiveSimilarity.length > 0 ||
    redirectLeaks.length > 0 ||
    missingRedirects.length > 0)
) {
  process.exitCode = 1;
}
