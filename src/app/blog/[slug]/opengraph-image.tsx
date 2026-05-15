// ============================================
// OG image dinámica para /blog/[slug]
// ----------------------------------------------
// Card OG personalizada por artículo. Color púrpura/azul para
// distinguir visualmente del color índigo de calculadoras.
// ============================================

import { ImageResponse } from 'next/og';
import { getArticleBySlug } from '@/data/articles';

export const runtime = 'edge';

export const alt = 'Artículo del blog - CalculaChile';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CATEGORY_LABELS: Record<string, string> = {
  laboral: 'Laboral',
  impuestos: 'Impuestos',
  vivienda: 'Vivienda',
  'educacion-financiera': 'Finanzas personales',
};

export default async function OgImage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            background: '#0a0f1c',
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 64,
          }}
        >
          CalculaChile
        </div>
      ),
      size,
    );
  }

  const categoryLabel = CATEGORY_LABELS[article.category] ?? article.category;
  const formattedDate = new Date(article.date).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          background:
            'linear-gradient(135deg, #1a0d2e 0%, #2d1b4e 50%, #3b2469 100%)',
          color: 'white',
          padding: '64px 72px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative orb */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            left: -180,
            width: 540,
            height: 540,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(168,85,247,0) 70%)',
          }}
        />

        {/* Header: brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 14,
              background:
                'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            CC
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            CalculaChile · Blog
          </div>
        </div>

        {/* Tag */}
        <div
          style={{
            display: 'flex',
            marginTop: 60,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              padding: '10px 22px',
              borderRadius: 9999,
              background: 'rgba(168,85,247,0.15)',
              border: '1px solid rgba(168,85,247,0.4)',
              color: '#e9d5ff',
            }}
          >
            {categoryLabel}
          </div>
        </div>

        {/* Title + description */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            marginTop: 28,
            marginBottom: 'auto',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            {article.title.length > 100
              ? article.title.slice(0, 100) + '…'
              : article.title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: '#cbd5e1',
              lineHeight: 1.4,
              maxWidth: 1000,
              display: 'flex',
            }}
          >
            {article.description.length > 130
              ? article.description.slice(0, 130) + '…'
              : article.description}
          </div>
        </div>

        {/* Footer: date + brand */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 32,
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: '#94a3b8',
            }}
          >
            {formattedDate}
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#94a3b8',
            }}
          >
            calculadorachile.cl
          </div>
        </div>
      </div>
    ),
    size,
  );
}
