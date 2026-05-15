// ============================================
// OG image dinámica para /calculadoras/[slug]
// ----------------------------------------------
// Genera una imagen Open Graph 1200x630 personalizada por
// calculadora usando `ImageResponse` de Next 15. Se sirve
// automáticamente como /calculadoras/<slug>/opengraph-image y se
// referencia desde la metadata `openGraph.images` y desde
// `SoftwareApplication.image`.
//
// Beneficios SEO:
//   - Twitter, Facebook y LinkedIn muestran una card visual única
//     por calculadora (no la genérica /og-image.png).
//   - Google usa esto como `primaryImageOfPage` en algunos rich
//     results, mejorando CTR en SERPs.
//   - No se necesita ni `canvas` ni runtime extra: ImageResponse
//     viene built-in en Next 15 (edge runtime).
// ============================================

import { ImageResponse } from 'next/og';
import { getCalculatorBySlug } from '@/data/calculators';
import type { Calculator } from '@/types/calculator';

// Edge runtime para servir la imagen rápido en cualquier región.
export const runtime = 'edge';

export const alt = 'Calculadora chilena gratuita - CalculaChile';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CATEGORY_LABELS: Record<Calculator['category'], string> = {
  sueldo: 'Sueldo y remuneraciones',
  impuestos: 'Impuestos',
  beneficios: 'Beneficios laborales',
  conversiones: 'Conversores',
  familia: 'Familia',
  vivienda: 'Vivienda',
  vehiculos: 'Vehículos',
  empresas: 'Empresas',
  servicios: 'Servicios',
  pension: 'Pensiones',
  educacion: 'Educación',
  hogar: 'Hogar',
};

export default async function OgImage({
  params,
}: {
  params: { slug: string };
}) {
  const calculator = getCalculatorBySlug(params.slug);
  if (!calculator) {
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

  const categoryLabel = CATEGORY_LABELS[calculator.category] ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          background:
            'linear-gradient(135deg, #0a0f1c 0%, #131c2f 50%, #1a2540 100%)',
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
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(99,102,241,0) 70%)',
          }}
        />

        {/* Header: brand + category */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
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
                  'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
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
              CalculaChile
            </div>
          </div>
          {categoryLabel && (
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                padding: '10px 22px',
                borderRadius: 9999,
                background: 'rgba(99,102,241,0.15)',
                border: '1px solid rgba(99,102,241,0.4)',
                color: '#c7d2fe',
              }}
            >
              {categoryLabel}
            </div>
          )}
        </div>

        {/* Main: title + description */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            marginTop: 80,
            marginBottom: 'auto',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            {calculator.name}
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#cbd5e1',
              lineHeight: 1.4,
              maxWidth: 1000,
              display: 'flex',
            }}
          >
            {(() => {
              const desc = calculator.description;
              return desc.length > 140 ? desc.slice(0, 140) + '…' : desc;
            })()}
          </div>
        </div>

        {/* Footer: badges */}
        <div
          style={{
            display: 'flex',
            gap: 20,
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
            <span style={{ fontSize: 26 }}>✓</span>
            Gratis · Sin registro
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#94a3b8',
            }}
          >
            ·
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 22,
              color: '#94a3b8',
            }}
          >
            <span style={{ fontSize: 26 }}>📅</span>
            Actualizado a 2026
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#94a3b8',
            }}
          >
            ·
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 22,
              color: '#94a3b8',
            }}
          >
            <span style={{ fontSize: 26 }}>🇨🇱</span>
            Chile
          </div>
        </div>
      </div>
    ),
    size,
  );
}
