import { readFile } from 'node:fs/promises';

const files = [
  'src/data/articles.ts',
  'src/data/guias.ts',
  'src/data/calculators.ts',
];

const urls = new Set();
for (const file of files) {
  const source = await readFile(file, 'utf8');
  for (const match of source.matchAll(/https?:\/\/[^\s"'<>`)]+/g)) {
    urls.add(match[0].replace(/[.,;:]$/, ''));
  }
}

const queue = [...urls].sort();
const results = [];
let cursor = 0;

async function worker() {
  while (cursor < queue.length) {
    const url = queue[cursor++];
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'user-agent': 'CalculaChile editorial link audit/1.0' },
      });
      results.push({ url, status: response.status, ok: response.status < 400 });
      await response.body?.cancel();
    } catch (error) {
      results.push({
        url,
        status: 0,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      clearTimeout(timeout);
    }
  }
}

await Promise.all(Array.from({ length: 8 }, () => worker()));

const failed = results.filter((result) => !result.ok).sort((a, b) => a.url.localeCompare(b.url));
console.log(`Enlaces únicos: ${results.length}`);
console.log(`Correctos/alcanzables: ${results.length - failed.length}`);
console.log(`Fallidos o bloqueados: ${failed.length}`);
for (const result of failed) {
  console.log(`${result.status || 'ERR'}\t${result.url}${result.error ? `\t${result.error}` : ''}`);
}

process.exitCode = failed.length === 0 ? 0 : 1;
