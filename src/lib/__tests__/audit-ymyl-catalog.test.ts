import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const parser = path.resolve('scripts/audit-ymyl-catalog.mjs');
const entry = `{
  id: 'boleta-honorarios', name: HON.enabled ? 'Boleta ' + HON.year : 'Boleta',
  slug: 'calculadora-boleta-honorarios', category: 'impuestos',
  inputs: [{ id: 'ano', label: formatYear(), options: years.map(y => ({ value: y })) }],
}`;
const source = (body: string) => `const calculatorCatalog = [${body}];`;
function parse(body: string) {
  return JSON.parse(
    execFileSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        `import { parseCatalog } from ${JSON.stringify(parser)};
     import fs from 'node:fs';
     console.log(JSON.stringify(parseCatalog(fs.readFileSync(0, 'utf8'))));`,
      ],
      { encoding: 'utf8', input: body, stdio: ['pipe', 'pipe', 'pipe'] },
    ),
  );
}

describe('YMYL catalog audit parser', () => {
  it('covers every real entry including dynamic boleta metadata', () => {
    const rows = parse(fs.readFileSync('src/data/calculators.ts', 'utf8'));
    expect(rows).toHaveLength(79);
    expect(rows.find((row: { id: string }) => row.id === 'boleta-honorarios').inputs).toEqual([
      'modo',
      'montoBruto',
      'ano',
      'moneda',
      'calcularCostoEmpleador',
    ]);
  });

  it('accepts dynamic display fields without evaluating them and isolates metadata', () => {
    const rows = parse(
      source(
        `${entry}, ${entry.replaceAll('boleta-honorarios', 'next').replace('inputs:', 'noIndex: true, inputs:')}`,
      ),
    );
    expect(rows.map((row: { noIndex: boolean }) => row.noIndex)).toEqual([false, true]);
    expect(rows[0].inputs).toEqual(['ano']);
  });

  it('accepts an empty inputs array', () => {
    expect(parse(source(entry.replace(/inputs: \[[\s\S]*\],/, 'inputs: [],')))[0].inputs).toEqual(
      [],
    );
  });

  it.each([
    entry.replace(/inputs: \[[\s\S]*\],/, 'inputs: dynamicInputs,'),
    entry.replace("id: 'ano'", 'id: dynamicId'),
    entry.replace('inputs:', '...dynamicFields, inputs:'),
    entry.replace('inputs:', 'noIndex: dynamicFlag, inputs:'),
    `${entry}, ${entry}`,
  ])('rejects unsupported entries with their id', (body) => {
    expect(() => parse(source(body))).toThrow(/boleta-honorarios/);
  });

  it('rejects an empty catalog', () => {
    expect(() => parse(source(''))).toThrow(/catálogo vacío/);
  });

  it('exits non-zero and names an unparseable entry in the audit CLI', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ymyl-audit-'));
    try {
      fs.mkdirSync(path.join(root, 'src/data'), { recursive: true });
      fs.mkdirSync(path.join(root, 'src/lib/calculations'), { recursive: true });
      fs.writeFileSync(
        path.join(root, 'src/data/calculators.ts'),
        source(entry.replace("id: 'ano'", 'id: dynamicId')),
      );
      fs.writeFileSync(path.join(root, 'src/data/calculator-methodologies.ts'), '');
      fs.writeFileSync(path.join(root, 'src/lib/calculations/load-calculator.ts'), '');
      const result = spawnSync(process.execPath, [path.resolve('scripts/audit-ymyl-matrix.mjs')], {
        cwd: root,
        encoding: 'utf8',
      });
      expect(result.status).toBe(1);
      expect(result.stderr).toContain('Catálogo YMYL: no se pudo analizar boleta-honorarios');
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});
