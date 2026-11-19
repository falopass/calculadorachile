import ts from 'typescript';

export function parseCatalog(source) {
  const file = ts.createSourceFile('calculators.ts', source, ts.ScriptTarget.Latest, true);
  const fail = (entry, reason) => {
    throw new Error(`Catálogo YMYL: no se pudo analizar ${entry}: ${reason}`);
  };
  if (file.parseDiagnostics.length) {
    const diagnostic = file.parseDiagnostics[0];
    const position = file.getLineAndCharacterOfPosition(diagnostic.start ?? 0);
    const preceding = source.slice(0, diagnostic.start).matchAll(/\bid:\s*['"]([^'"]+)['"]/g);
    const id = [...preceding].at(-1)?.[1] ?? 'calculatorCatalog';
    fail(id, `sintaxis inválida en línea ${position.line + 1}`);
  }
  let catalog;
  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    catalog =
      statement.declarationList.declarations.find(
        (declaration) => declaration.name.getText(file) === 'calculatorCatalog',
      )?.initializer ?? catalog;
  }
  if (!catalog || !ts.isArrayLiteralExpression(catalog)) {
    fail('calculatorCatalog', 'se esperaba un array literal');
  }
  if (!catalog.elements.length) fail('calculatorCatalog', 'catálogo vacío');
  const ids = new Set();
  return catalog.elements.map((entry, index) => {
    let label = `entrada #${index + 1}`;
    if (!ts.isObjectLiteralExpression(entry)) fail(label, 'se esperaba un objeto literal');
    const properties = new Map();
    for (const property of entry.properties) {
      if (ts.isPropertyAssignment(property) && !ts.isComputedPropertyName(property.name)) {
        const key = property.name.text;
        if (key === 'id' && ts.isStringLiteral(property.initializer))
          label = property.initializer.text;
        if (properties.has(key)) fail(label, `propiedad duplicada ${key}`);
        properties.set(key, property.initializer);
      }
    }
    if (
      entry.properties.some(
        (property) =>
          !ts.isPropertyAssignment(property) || ts.isComputedPropertyName(property.name),
      )
    ) {
      fail(label, 'propiedad dinámica o spread no soportado');
    }
    const string = (key, props = properties) => {
      const value = props.get(key);
      if (!value || !ts.isStringLiteral(value)) fail(label, `${key} debe ser un string literal`);
      return value.text;
    };
    const id = string('id');
    if (ids.has(id)) fail(id, 'id duplicado');
    ids.add(id);
    const inputs = properties.get('inputs');
    if (!inputs || !ts.isArrayLiteralExpression(inputs))
      fail(id, 'inputs debe ser un array literal');
    const inputIds = inputs.elements.map((input) => {
      if (!ts.isObjectLiteralExpression(input)) fail(id, 'input no soportado');
      const fields = new Map();
      for (const property of input.properties) {
        if (!ts.isPropertyAssignment(property) || ts.isComputedPropertyName(property.name)) {
          fail(id, 'propiedad de input dinámica o spread no soportado');
        }
        if (fields.has(property.name.text))
          fail(id, `propiedad de input duplicada ${property.name.text}`);
        fields.set(property.name.text, property.initializer);
      }
      return string('id', fields);
    });
    const noIndex = properties.get('noIndex');
    if (
      noIndex &&
      ![ts.SyntaxKind.TrueKeyword, ts.SyntaxKind.FalseKeyword].includes(noIndex.kind)
    ) {
      fail(id, 'noIndex debe ser un boolean literal');
    }
    const sources = properties.get('sources');
    if (sources && !ts.isArrayLiteralExpression(sources))
      fail(id, 'sources debe ser un array literal');
    return {
      id,
      name: properties.get('name')?.getText(file) ?? id,
      slug: string('slug'),
      category: string('category'),
      inputs: inputIds,
      noIndex: noIndex?.kind === ts.SyntaxKind.TrueKeyword,
      lastReviewed: properties.has('lastReviewed') ? string('lastReviewed') : null,
      hasSources: Boolean(sources),
      featured: properties.get('featured')?.kind === ts.SyntaxKind.TrueKeyword,
      phase: properties.get('phase')?.getText(file) ?? '?',
      source: entry.getText(file),
    };
  });
}
