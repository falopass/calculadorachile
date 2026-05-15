'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Download, Image, Share2, Check, ChevronDown } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { SITE_URL } from '@/lib/site';

export interface ExportMenuProps {
  /** Título del resultado */
  title: string;
  /** Resultados a exportar */
  results: { label: string; value: string }[];
  /** Resultado principal */
  mainResult?: { label: string; value: string };
  /** ID de la calculadora */
  calculatorId: string;
}

/**
 * ExportMenu - Menú de exportación para resultados
 * 
 * Soporta copiar al portapapeles, descargar PNG y compartir.
 */
export default function ExportMenu({ title, results, mainResult, calculatorId }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  // Cerrar al hacer click fuera
  const handleClickOutside = (e: React.MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  // Copiar resumen al portapapeles
  const handleCopy = async () => {
    const text = [
      `CalculaChile - ${title}`,
      `Calculadora: ${calculatorId}`,
      `Fecha: ${new Date().toLocaleDateString('es-CL')}`,
      '',
      mainResult ? `${mainResult.label}: ${mainResult.value}` : '',
      ...results.map(r => `${r.label}: ${r.value}`),
    ].filter(Boolean).join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copiado', 'Resultados copiados al portapapeles');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Error', 'No se pudo copiar al portapapeles');
    }
    setIsOpen(false);
  };

  // Descargar como imagen (usando canvas nativo)
  const handleDownloadPNG = async () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = 400;
      const lineHeight = 28;
      const padding = 24;
      const headerHeight = 60;
      const height = headerHeight + results.length * lineHeight + padding * 2 + 40;

      canvas.width = width;
      canvas.height = height;

      // Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Header
      ctx.fillStyle = '#6366f1';
      ctx.fillRect(0, 0, width, headerHeight);

      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px Inter, sans-serif';
      ctx.fillText(title, padding, 38);

      // Date
      ctx.font = '12px Inter, sans-serif';
      ctx.fillStyle = '#e0e7ff';
      ctx.fillText(new Date().toLocaleDateString('es-CL'), padding, 52);

      // Results
      ctx.fillStyle = '#0f172a';
      ctx.font = '14px Inter, sans-serif';
      let y = headerHeight + padding;

      if (mainResult) {
        ctx.fillStyle = '#6366f1';
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.fillText(`${mainResult.label}: ${mainResult.value}`, padding, y);
        y += lineHeight + 8;
        ctx.fillStyle = '#0f172a';
        ctx.font = '14px Inter, sans-serif';
      }

      results.forEach((r) => {
        ctx.fillStyle = '#475569';
        ctx.fillText(r.label, padding, y);
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.fillText(r.value, width - padding - ctx.measureText(r.value).width, y);
        ctx.font = '14px Inter, sans-serif';
        y += lineHeight;
      });

      // Footer
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Inter, sans-serif';
      // Mostramos sólo el host (sin protocolo) en el watermark
      ctx.fillText(SITE_URL.replace(/^https?:\/\//, ''), padding, height - 12);

      // Download
      const link = document.createElement('a');
      link.download = `calculachile-${calculatorId}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast.success('Descargado', 'Imagen PNG descargada correctamente');
    } catch {
      toast.error('Error', 'No se pudo generar la imagen');
    }
    setIsOpen(false);
  };

  // Compartir (Web Share API)
  const handleShare = async () => {
    const shareData = {
      title: `CalculaChile - ${title}`,
      text: mainResult ? `${mainResult.label}: ${mainResult.value}` : title,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Compartido', 'Resultado compartido exitosamente');
      } catch (e) {
        if ((e as Error).name !== 'AbortError') {
          toast.error('Error', 'No se pudo compartir');
        }
      }
    } else {
      // Fallback: copiar link
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copiado', 'URL copiada al portapapeles');
      } catch {
        toast.error('Error', 'No se pudo copiar el enlace');
      }
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef} onClick={handleClickOutside}>
      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--background-secondary)] border border-[var(--border)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-elevated)] hover:border-[var(--border-hover)] transition-all"
        aria-label="Exportar resultados"
        aria-expanded={isOpen}
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">Exportar</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-52 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl shadow-xl z-50 overflow-hidden"
          >
            <div className="py-1">
              <button
                onClick={handleCopy}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--background-secondary)] transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-[var(--color-success-500)]" />
                ) : (
                  <Copy className="w-4 h-4 text-[var(--foreground-muted)]" />
                )}
                <span>{copied ? '¡Copiado!' : 'Copiar resultados'}</span>
              </button>

              <button
                onClick={handleDownloadPNG}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--background-secondary)] transition-colors"
              >
                <Image className="w-4 h-4 text-[var(--foreground-muted)]" />
                <span>Descargar PNG</span>
              </button>

              <button
                onClick={handleShare}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--background-secondary)] transition-colors border-t border-[var(--border)]"
              >
                <Share2 className="w-4 h-4 text-[var(--foreground-muted)]" />
                <span>Compartir</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
