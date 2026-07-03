import { describe, it, expect } from 'vitest';
import {
  renderUrlsetXml,
  renderSitemapIndexXml,
  escapeXml,
  type SitemapEntry,
} from '../sitemap-helpers';

describe('sitemap-helpers', () => {
  describe('renderUrlsetXml', () => {
    it('usa el namespace de imágenes 1.1 que exige Google', () => {
      const xml = renderUrlsetXml([
        {
          url: 'https://example.com/page',
          lastModified: new Date('2026-01-01T00:00:00.000Z'),
          images: ['https://example.com/image.png'],
        },
      ]);

      expect(xml).toContain(
        'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"',
      );
      // El namespace 0.9 es inválido para imágenes y dispara errores en
      // Search Console ("etiqueta image:loc no reconocida").
      expect(xml).not.toContain('sitemap-image/0.9');
    });

    it('renderiza cada imagen como <image:image><image:loc>...</image:loc></image:image>', () => {
      const entry: SitemapEntry = {
        url: 'https://example.com/page',
        lastModified: new Date('2026-01-01T00:00:00.000Z'),
        images: [
          'https://example.com/image1.png',
          'https://example.com/image2.png',
        ],
      };

      const xml = renderUrlsetXml([entry]);

      expect(xml).toContain(
        '<image:image><image:loc>https://example.com/image1.png</image:loc></image:image>',
      );
      expect(xml).toContain(
        '<image:image><image:loc>https://example.com/image2.png</image:loc></image:image>',
      );
    });

    it('incluye loc, lastmod, changefreq y priority en orden', () => {
      const xml = renderUrlsetXml([
        {
          url: 'https://example.com/page',
          lastModified: new Date('2026-01-01T00:00:00.000Z'),
          changeFrequency: 'monthly',
          priority: 0.8,
        },
      ]);

      expect(xml).toContain('<loc>https://example.com/page</loc>');
      expect(xml).toContain('<lastmod>2026-01-01T00:00:00.000Z</lastmod>');
      expect(xml).toContain('<changefreq>monthly</changefreq>');
      expect(xml).toContain('<priority>0.80</priority>');
    });
  });

  describe('renderSitemapIndexXml', () => {
    it('renderiza un <sitemapindex> válido con namespace 0.9', () => {
      const xml = renderSitemapIndexXml([
        {
          loc: 'https://example.com/sitemap-pages.xml',
          lastmod: new Date('2026-01-01T00:00:00.000Z'),
        },
      ]);

      expect(xml).toContain(
        '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      );
      expect(xml).toContain(
        '<loc>https://example.com/sitemap-pages.xml</loc>',
      );
    });
  });

  describe('escapeXml', () => {
    it('escapa los caracteres especiales de XML', () => {
      expect(escapeXml('a & b < c > d " e" \'f\'')).toBe(
        'a &amp; b &lt; c &gt; d &quot; e&quot; &apos;f&apos;',
      );
    });
  });
});
