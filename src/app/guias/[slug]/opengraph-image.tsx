// ============================================
// OG image dinámica para /guias/[slug]
// ----------------------------------------------
// Card OG personalizada por guía pillar. Tonos verde-esmeralda
// para distinguir visualmente del blog (púrpura) y calculadoras
// (índigo).
// ============================================

import { ImageResponse } from 'next/og';
import { getGuiaBySlug } from '@/data/guias';

export const runtime = 'edge';

export const alt = 'Guía pillar de CalculaChile';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({
  params,
}: {
  params: { slug: string };
}) {
  const guia = getGuiaBySlug(params.slug);
  if (!guia) {
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

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          background:
            'linear-gradient(135deg, #042f2e 0%, #064e3b 50%, #065f46 100%)',
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
            bottom: -200,
            right: -180,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(16,185,129,0) 70%)',
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
                'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
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
            CalculaChile · Guías
          </div>
        </div>

        {/* Category badge */}
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
              background: 'rgba(16,185,129,0.15)',
              border: '1px solid rgba(16,185,129,0.4)',
              color: '#a7f3d0',
            }}
          >
            Guía pillar · {guia.categoryLabel}
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
            {guia.title.length > 100 ? guia.title.slice(0, 100) + '…' : guia.title}
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
            {guia.description.length > 140
              ? guia.description.slice(0, 140) + '…'
              : guia.description}
          </div>
        </div>

        {/* Footer */}
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
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 22,
              color: '#94a3b8',
            }}
          >
            <span style={{ fontSize: 26 }}>⏱</span>
            {guia.readingTime} minutos de lectura
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
