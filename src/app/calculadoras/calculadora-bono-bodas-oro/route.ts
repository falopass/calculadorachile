// ============================================
// Route handler 410 Gone — Bono Bodas de Oro
// ----------------------------------------------
// Esta calculadora fue retirada porque su concepto era incorrecto:
// el Bono Bodas de Oro oficial (IPS) exige 50 años de matrimonio,
// no años trabajados. En vez de servir contenido erróneo, devolvemos
// 410 Gone para que Google lo elimine del índice rápidamente.
//
// Esta ruta estática toma precedencia sobre el dynamic route
// [slug]/page.tsx, por lo que nunca se llama a getCalculatorBySlug
// para este slug.
// ============================================

export const dynamic = 'force-static';

export function GET() {
  return new Response(
    '410 Gone — Esta calculadora fue retirada por contenido incorrecto.',
    {
      status: 410,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    },
  );
}
