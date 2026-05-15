'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqPageSchema, serializeSchema } from '@/lib/seo/schema';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  /** Lista de preguntas frecuentes */
  items: FAQItem[];
  /** Título de la sección */
  title?: string;
  /**
   * Si emite o no el JSON-LD `FAQPage`. Default `true` por
   * retrocompatibilidad. Páginas que ya inyectan su propio FAQPage
   * (como /faq con grupos múltiples) deben pasar `false` para
   * evitar duplicación de structured data.
   */
  emitSchema?: boolean;
}

/**
 * FAQ - Componente de preguntas frecuentes con Schema.org opcional.
 *
 * Por defecto emite el FAQPage. Cuando se renderiza dentro de una
 * página que ya inyecta el schema globalmente, pasar `emitSchema={false}`.
 */
export default function FAQ({
  items,
  title = 'Preguntas Frecuentes',
  emitSchema = true,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Schema.org JSON-LD (opt-out cuando una página ya lo emite). */}
      {emitSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeSchema(faqPageSchema(items)),
          }}
        />
      )}

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="mt-10 bg-[var(--surface)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--background-secondary)] to-[var(--surface)] px-6 py-5 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-500)]/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-[var(--color-primary-500)]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[var(--foreground)]">{title}</h2>
              <p className="text-sm text-[var(--foreground-muted)] mt-0.5">
                Haz clic en una pregunta para ver la respuesta
              </p>
            </div>
          </div>
        </div>

        {/* Lista de preguntas */}
        <div className="divide-y divide-[var(--border)]/50">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className={`w-full px-6 py-4 flex justify-between items-center text-left transition-colors duration-200 ${
                  openIndex === index
                    ? 'bg-[var(--color-primary-50)]/50'
                    : 'hover:bg-[var(--background-secondary)]/50'
                }`}
                aria-expanded={openIndex === index}
              >
                <span className={`font-medium pr-4 transition-colors duration-200 ${
                  openIndex === index
                    ? 'text-[var(--color-primary-600)]'
                    : 'text-[var(--foreground)] group-hover:text-[var(--color-primary-600)]'
                }`}>
                  <span className="inline-flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200 ${
                      openIndex === index
                        ? 'bg-[var(--color-primary-500)] text-white'
                        : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] group-hover:bg-[var(--color-primary-100)] group-hover:text-[var(--color-primary-600)]'
                    }`}>
                      {index + 1}
                    </span>
                    {item.question}
                  </span>
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex-shrink-0 p-1 rounded-lg transition-colors duration-200 ${
                    openIndex === index
                      ? 'text-[var(--color-primary-500)]'
                      : 'text-[var(--foreground-muted)]'
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-2 text-[var(--foreground-secondary)] leading-relaxed border-l-2 border-[var(--color-primary-200)] ml-8">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </>
  );
}
