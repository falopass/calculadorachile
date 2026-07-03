// ============================================
// Helpers de Metadata
// ----------------------------------------------
// Construyen objetos `Metadata` consistentes para todas las páginas.
//
// Reglas de diseño:
//  1. **No double-branding**: el `template` del root layout ya añade
//     "| CalculaChile" al título. Las páginas pasan el título PURO
//     (sin sufijo) a través de `buildPageMetadata`.
//  2. Toda página tiene canonical. Si no se pasa, se calcula desde
//     el `path`.
//  3. Toda página tiene `openGraph` y `twitter` derivados del título
//     y descripción base.
//  4. La descripción se valida y trunca a 160 caracteres si excede.
// ============================================

import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/site';

const META_DESCRIPTION_LIMIT = 160;
const DEFAULT_OG_IMAGE = absoluteUrl('/og-image.png');

export interface BuildMetadataArgs {
  /** Path absoluto del sitio (ej. '/blog/mi-post'). NO incluir dominio. */
  path: string;
  /** Título limpio, sin "| CalculaChile" ni separadores. */
  title: string;
  description: string;
  /** Si se omite, hereda los del root layout. */
  keywords?: string[];
  /** OG type. Default 'website'. */
  ogType?: 'website' | 'article' | 'profile';
  /** Imagen 1200x630. Si se omite, usa /og-image.png. */
  ogImage?: { url: string; alt?: string; width?: number; height?: number };
  /** ISO date de publicación (para artículos). */
  publishedTime?: string;
  /** ISO date de última modificación. */
  modifiedTime?: string;
  /** Tags del artículo (OG `article:tag`). */
  tags?: string[];
  /** Sección/categoría del artículo. */
  section?: string;
  /** No-index la página (útil para 404/error). */
  noIndex?: boolean;
}

/**
 * Trunca una descripción al límite recomendado, cortando en el
 * último espacio para evitar palabras partidas.
 */
function clampDescription(desc: string, limit = META_DESCRIPTION_LIMIT): string {
  if (desc.length <= limit) return desc;
  const truncated = desc.slice(0, limit);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated).trimEnd() + '…';
}

/**
 * Construye un `Metadata` completo para una página.
 *
 * Salida típica:
 *   - title: "<title>" (sin sufijo; el template del root añade "| CalculaChile")
 *   - canonical: absoluteUrl(path)
 *   - openGraph: type, url, title, description, siteName, locale, image
 *   - twitter: summary_large_image, title, description, image
 */
export function buildPageMetadata(args: BuildMetadataArgs): Metadata {
  const description = clampDescription(args.description);
  const url = absoluteUrl(args.path);
  const ogImage = args.ogImage ?? {
    url: DEFAULT_OG_IMAGE,
    alt: `${SITE_NAME} - ${args.title}`,
    width: 1200,
    height: 630,
  };

  const metadata: Metadata = {
    title: args.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: args.ogType ?? 'website',
      url,
      title: args.title,
      description,
      siteName: SITE_NAME,
      locale: 'es_CL',
      images: [
        {
          url: ogImage.url,
          width: ogImage.width ?? 1200,
          height: ogImage.height ?? 630,
          alt: ogImage.alt ?? `${SITE_NAME} - ${args.title}`,
        },
      ],
      ...(args.publishedTime ? { publishedTime: args.publishedTime } : {}),
      ...(args.modifiedTime ? { modifiedTime: args.modifiedTime } : {}),
      ...(args.tags && args.tags.length > 0 ? { tags: args.tags } : {}),
      ...(args.section ? { section: args.section } : {}),
      ...(args.ogType === 'article'
        ? { authors: [`${SITE_URL}/#organization`] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: args.title,
      description,
      images: [ogImage.url],
    },
    robots: args.noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };

  if (args.keywords && args.keywords.length > 0) {
    metadata.keywords = args.keywords.join(', ');
  }

  return metadata;
}

/**
 * Estima el conteo de palabras de un string HTML (para `wordCount`
 * de Article schema). Quita tags, colapsa espacios y cuenta tokens.
 */
export function estimateWordCount(html: string): number {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

/**
 * Calcula tiempo estimado de lectura en minutos (200 wpm).
 */
export function estimateReadingTime(wordCount: number): number {
  return Math.max(1, Math.round(wordCount / 200));
}
