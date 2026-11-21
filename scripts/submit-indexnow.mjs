// ============================================
// IndexNow: envia las URLs de los sitemaps publicos
// a api.indexnow.org (Bing, Yandex y crawlers afiliados).
// ----------------------------------------------
// Uso: node scripts/submit-indexnow.mjs [url1 url2 ...]
// Sin argumentos lee los sitemap-*.xml del origen en vivo.
// Requiere que el archivo de clave este servido en
// https://calculadorachile.cl/<INDEXNOW_KEY>.txt
// ============================================

const INDEXNOW_KEY = '4086dac7730f55ca0838c2cdf52174fe';
const HOST = 'calculadorachile.cl';
const ORIGIN = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const SITEMAPS = [
  '/sitemap-pages.xml',
  '/sitemap-calculadoras.xml',
  '/sitemap-guias.xml',
  '/sitemap-blog.xml',
];

async function urlsFromSitemaps() {
  const urls = [];
  for (const path of SITEMAPS) {
    const res = await fetch(`${ORIGIN}${path}`);
    if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
    const xml = await res.text();
    for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const loc = match[1].trim();
      if (loc.startsWith(ORIGIN)) urls.push(loc);
    }
  }
  return [...new Set(urls)];
}

const urlList = process.argv.slice(2);
const urls = urlList.length > 0 ? urlList : await urlsFromSitemaps();
if (urls.length === 0) {
  console.error('No hay URLs para enviar.');
  process.exit(1);
}
// IndexNow acepta hasta 10.000 URLs por POST.
for (let i = 0; i < urls.length; i += 10000) {
  const batch = urls.slice(i, i + 10000);
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${ORIGIN}/${INDEXNOW_KEY}.txt`,
      urlList: batch,
    }),
  });
  console.log(`Lote ${Math.floor(i / 10000) + 1}: ${batch.length} URLs -> HTTP ${res.status}`);
  if (!res.ok) process.exit(1);
}
