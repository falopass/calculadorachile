import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { articles } from '../articles';
import { guias } from '../guias';

const SCRIPT = path.resolve(__dirname, '../../../scripts/audit-editorial-content.mjs');

describe('audit-editorial-content', () => {
  const run = spawnSync(process.execPath, [SCRIPT, '--json'], { encoding: 'utf8' });
  const report = JSON.parse(run.stdout);

  it('audita todas las piezas publicadas con su contenido renderizado', () => {
    expect(run.stderr).toBe('');
    const slugs = report.rows.map((row: { slug: string }) => row.slug).sort();
    expect(slugs).toEqual([...articles, ...guias].map((item) => item.slug).sort());
    for (const row of report.rows) expect(row.words).toBeGreaterThan(0);
  });

  it('no hay interpolaciones rotas, slugs duplicados ni URLs retiradas expuestas', () => {
    expect(report.failures.brokenInterpolation).toEqual([]);
    expect(report.failures.duplicateSlugs).toEqual([]);
    expect(report.failures.redirectLeaks).toEqual([]);
    expect(report.failures.missingRedirects).toEqual([]);
    expect(report.failures.retiredStillPublished).toEqual([]);
  });

  it('devuelve exit code 1 cuando hay fallos editoriales', () => {
    const hasFailures = Object.values(report.failures).some(
      (value) => Array.isArray(value) && value.length > 0,
    );
    expect(run.status).toBe(hasFailures ? 1 : 0);
  });
});
