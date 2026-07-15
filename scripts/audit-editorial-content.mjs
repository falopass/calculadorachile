import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const ROOT = process.cwd();
const MIN_WORDS = 1500;
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
    return (
      (ts.isIdentifier(key) || ts.isStringLiteral(key)) && key.text === name
    );
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
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== variableName) continue;
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
  return new Set(
    [...html.matchAll(/href=["'](https?:\/\/[^"']+)["']/gi)].map((match) => match[1]),
  );
}

function genericHits(html) {
  const text = plainText(html);
  return GENERIC_PATTERNS.flatMap((pattern) => [...text.matchAll(pattern)].map((match) => match[0]));
}

function countObjectArray(node) {
  return arrayValue(node).filter(ts.isObjectLiteralExpression).length;
}

function auditArticles() {
  const file = path.join(ROOT, 'src', 'data', 'articles.ts');
  const entries = findArray(parse(file), 'articles');
  return entries.filter(ts.isObjectLiteralExpression).map((entry) => {
    const content = stringValue(property(entry, 'content'));
    return {
      type: 'blog',
      slug: stringValue(property(entry, 'slug')),
      title: stringValue(property(entry, 'title')),
      words: wordCount(content),
      externalLinks: externalLinks(content).size,
      declaredSources: countObjectArray(property(entry, 'sources')),
      genericHits: genericHits(content),
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
    };
  });
}

const rows = [...auditArticles(), ...auditGuides()].sort((a, b) => a.words - b.words);
const belowMinimum = rows.filter((row) => row.words < MIN_WORDS);

if (process.argv.includes('--json')) {
  process.stdout.write(`${JSON.stringify({ minimum: MIN_WORDS, rows }, null, 2)}\n`);
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
}

if (process.argv.includes('--strict') && belowMinimum.length > 0) {
  process.exitCode = 1;
}
