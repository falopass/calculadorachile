'use client';

import { useState, memo } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface EnhancedFAQProps {
  items: FAQItem[];
  title?: string;
  className?: string;
}

/**
 * EnhancedFAQ - Componente rediseñado para preguntas frecuentes
 * 
 * Mejora visual y funcionalidad de las preguntas frecuentes con:
 * - Diseño tipo acordeón con animaciones
 * - Iconos y colores de marca
 * - Transiciones suaves
 * - Espaciado mejorado
 */
const EnhancedFAQ = memo(function EnhancedFAQ({ items, title = 'Preguntas Frecuentes', className = '' }: EnhancedFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`bg-[var(--surface-elevated)] rounded-2xl border border-[var(--border)] p-6 md:p-8 shadow-sm ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)] dark:from-[var(--color-primary-900)] dark:to-[var(--color-primary-800)]">
          <HelpCircle className="w-5 h-5 text-[var(--color-primary-600)] dark:text-[var(--color-primary-300)]" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)]">{title}</h2>
      </div>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="border border-[var(--border)] rounded-xl overflow-hidden transition-all duration-300 hover:border-[var(--border-hover)]"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-5 py-4 text-left flex items-center justify-between bg-[var(--surface)] hover:bg-[var(--background-secondary)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]/30 rounded-xl"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-semibold text-[var(--foreground)]">{item.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-[var(--color-primary-500)] flex-shrink-0 ml-2" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[var(--foreground-muted)] flex-shrink-0 ml-2" />
              )}
            </button>
            
            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-5 py-4 bg-[var(--background)]/50 border-t border-[var(--border)] text-[var(--foreground-secondary)]">
                <p className="leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default EnhancedFAQ;
