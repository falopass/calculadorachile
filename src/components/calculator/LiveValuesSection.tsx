'use client';

import { memo } from 'react';
import { useValues } from '@/lib/context/ValuesContext';

/**
 * LiveValuesSection - Sección que muestra los valores actualizados del día
 * 
 * Muestra los valores actualizados de UF, UTM, ingreso mínimo, etc.
 * con actualizaciones en tiempo real para mejorar la experiencia del usuario.
 */
const LiveValuesSection = memo(function LiveValuesSection() {
  const { uf, utm, dolar, loading, source, lastUpdated } = useValues();

  return (
    <div className="mt-6 p-4 bg-[var(--background-secondary)]/50 rounded-xl border border-[var(--border)]/50">
      <h3 className="font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-[var(--color-primary-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        Valores actualizados 2026
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-[var(--surface)] p-3 rounded-lg border border-[var(--border)]/30">
          <div className="text-xs text-[var(--foreground-muted)] uppercase tracking-wide">UF</div>
          <div className="font-bold text-[var(--foreground)] text-sm">
            {loading ? '...' : `$${uf.toLocaleString('es-CL')}`}
          </div>
        </div>
        
        <div className="bg-[var(--surface)] p-3 rounded-lg border border-[var(--border)]/30">
          <div className="text-xs text-[var(--foreground-muted)] uppercase tracking-wide">UTM</div>
          <div className="font-bold text-[var(--foreground)] text-sm">
            {loading ? '...' : `$${utm.toLocaleString('es-CL')}`}
          </div>
        </div>
        
        <div className="bg-[var(--surface)] p-3 rounded-lg border border-[var(--border)]/30">
          <div className="text-xs text-[var(--foreground-muted)] uppercase tracking-wide">Dólar</div>
          <div className="font-bold text-[var(--foreground)] text-sm">
            {loading ? '...' : `$${dolar.observado.toLocaleString('es-CL')}`}
          </div>
        </div>
        
        <div className="bg-[var(--surface)] p-3 rounded-lg border border-[var(--border)]/30">
          <div className="text-xs text-[var(--foreground-muted)] uppercase tracking-wide">Ingreso Mínimo</div>
          <div className="font-bold text-[var(--foreground)] text-sm">$539.000</div>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-[var(--foreground-muted)] flex items-center gap-2">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {source === 'bcentral' ? (
          <span>Valores actualizados en tiempo real desde Banco Central de Chile</span>
        ) : (
          <span>Valores actualizados desde fuente oficial</span>
        )}
      </div>
    </div>
  );
});

export default LiveValuesSection;