// ============================================
// RSS feed del blog — /blog/feed.xml
// ----------------------------------------------
// Route Handler que sirve RSS 2.0 con todos los artículos del blog.
// Usado por:
//   - Lectores RSS (Feedly, Inoreader, NetNewsWire)
//   - Google News como fuente de descubrimiento (si el sitio entra
//     en Google Publisher Center)
//   - Bots de discovery (Bing, IndexNow)
//
// El feed se descubre desde el `<link rel="alternate">` que añadimos
// en `src/app/layout.tsx`.
//
// Formato: RSS 2.0 + Atom self-link (necesario según validador RSS).
//
// Notas de implementación:
//   - Server-side, runtime nodejs (default). Static cache de 1h
//     vía Cache-Control para que Vercel no regenere en cada hit.
//   - El cuerpo del item usa `description` (resumen) en vez del
//     HTML completo para mantener el feed liviano. Si en el futuro
//     queremos full-text RSS, podemos pasar `article.content` con
//     `<content:encoded>` (namespace adicional).
// ============================================

import { articles } from '@/data/articles';
import { SITE_NAME, SITE_URL, absoluteUrl, CONTACT_EMAIL } from '@/lib/site';
import { AUTHOR } from '@/lib/seo/author';

// Static rendering: el feed se genera en build y se cachea. Si
// agregas/modificas artículos, requiere un nuevo deploy.
export const dynamic = 'force-static';
// Revalidación cada hora — un compromiso entre frescura y costo.
export const revalidate = 3600;

const FEED_URL = `${SITE_URL}/blog/feed.xml`;
const FEED_TITLE = `${SITE_NAME} — Blog`;
const FEED_DESC =
  'Artículos sobre sueldo líquido, finiquito, IVA, créditos, AFP y derechos laborales en Chile, con bases legales citadas.';
const FEED_LANGUAGE = 'es-CL';

/**
 * Escape de caracteres especiales para XML. NO usar en CDATA: ahí
 * basta con cerrar correctamente el bloque (no tenemos `]]>` en
 * descripciones generadas, así que es seguro).
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Empaqueta texto en un bloque CDATA para que el lector RSS no
 * interprete entidades HTML (sirve para descripciones que pueden
 * contener "<" o "&").
 */
function cdata(text: string): string {
  // Defensivo: si el contenido ya cierra un CDATA, lo neutralizamos.
  return `<![CDATA[${text.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

/** Convierte una fecha ISO (YYYY-MM-DD) a RFC-822 (RSS spec). */
function toRfc822(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toUTCString();
}

export async function GET() {
  // Ordenar artículos por fecha descendente (más recientes primero).
  // Esta es la convención esperada por la mayoría de lectores RSS.
  const sorted = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // lastBuildDate = fecha del artículo más reciente (proxy de
  // "última actualización del feed"). Si no hay artículos, usar
  // fecha actual del request.
  const lastBuildDate = sorted[0]
    ? toRfc822(sorted[0].date)
    : new Date().toUTCString();

  const items = sorted
    .map((article) => {
      const url = absoluteUrl(`/blog/${article.slug}`);
      const ogImage = absoluteUrl(`/blog/${article.slug}/opengraph-image`);
      const pubDate = toRfc822(article.date);
      // RFC-822 + identidad del email + nombre legible es el
      // formato que valida la mayoría de lectores RSS.
      const dcCreator = `${escapeXml(AUTHOR.name)}`;

      return `    <item>
      <title>${cdata(article.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${dcCreator}</dc:creator>
      <category>${escapeXml(article.category)}</category>
      <description>${cdata(article.description)}</description>
      <enclosure url="${escapeXml(ogImage)}" type="image/png" length="0"/>
    </item>`;
    })
    .join('\n');

  // RSS 2.0 con namespaces:
  //   - atom: para <atom:link rel="self">  (validación RSS)
  //   - dc:   para <dc:creator> (nombre del autor)
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${cdata(FEED_TITLE)}</title>
    <link>${escapeXml(`${SITE_URL}/blog`)}</link>
    <description>${cdata(FEED_DESC)}</description>
    <language>${FEED_LANGUAGE}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <managingEditor>${escapeXml(CONTACT_EMAIL)} (${escapeXml(AUTHOR.name)})</managingEditor>
    <webMaster>${escapeXml(CONTACT_EMAIL)} (${escapeXml(AUTHOR.name)})</webMaster>
    <generator>Next.js / CalculaChile</generator>
    <atom:link href="${escapeXml(FEED_URL)}" rel="self" type="application/rss+xml"/>
    <image>
      <url>${escapeXml(absoluteUrl('/logo.png'))}</url>
      <title>${escapeXml(FEED_TITLE)}</title>
      <link>${escapeXml(`${SITE_URL}/blog`)}</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    status: 200,
    headers: {
      // RFC 7231: el tipo correcto para RSS 2.0 es application/rss+xml,
      // pero algunos navegadores lo descargan como archivo en lugar de
      // mostrarlo inline. application/xml también es aceptado por todos
      // los lectores RSS y se renderiza inline en navegadores modernos.
      'Content-Type': 'application/rss+xml; charset=utf-8',
      // Cache 1 hora en CDN, 5 minutos en navegadores.
      'Cache-Control':
        'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
