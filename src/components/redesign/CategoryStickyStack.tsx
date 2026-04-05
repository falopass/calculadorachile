'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import { Clock, Calculator, Shield, CreditCard, ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'laboral',
    title: 'Laboral',
    description: 'Calculadoras relacionadas con el mundo del trabajo',
    calculators: [
      'Sueldo Líquido',
      'Finiquito',
      'Horas Extra',
      'Vacaciones',
      'Gratificación',
      'Indemnización'
    ],
    bgColor: 'from-[#1E3A8A] to-[#312E81]',
    icon: Clock
  },
  {
    id: 'tributario',
    title: 'Tributario',
    description: 'Cálculos relacionados con impuestos y obligaciones fiscales',
    calculators: [
      'IVA',
      'Boleta de Honorarios',
      'Operación Renta',
      'PPM',
      'Impuesto Segunda Categoría',
      'Plusvalía'
    ],
    bgColor: 'from-[#DC2626] to-[#991B1B]',
    icon: Calculator
  },
  {
    id: 'previsional',
    title: 'Previsional',
    description: 'Sistemas de pensiones, cotizaciones y beneficios sociales',
    calculators: [
      'AFP vs IPS',
      'Simulador APV',
      'Comparador AFP',
      'Pensión Garantizada',
      'Cotizaciones Independientes',
      'Ahorro Previsional'
    ],
    bgColor: 'from-[#059669] to-[#047857]',
    icon: Shield
  },
  {
    id: 'financiero',
    title: 'Financiero',
    description: 'Conversiones, créditos y herramientas financieras',
    calculators: [
      'UF/UTM/CLP',
      'Crédito Hipotecario',
      'Crédito Automotriz',
      'Conversor Divisas',
      'Costo de Crédito',
      'Ahorro e Inversión'
    ],
    bgColor: 'from-[#0891B2] to-[#0E7490]',
    icon: CreditCard
  }
];

export default function CategoryStickyStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      categoryRefs.current.forEach((category) => {
        if (category) {
          gsap.to(category, {
            scale: 0.95,
            filter: 'blur(4px)',
            opacity: 0.5,
            scrollTrigger: {
              trigger: category,
              start: 'top top',
              end: 'bottom top',
              scrub: 1
            }
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-28 bg-[#0F172A]"
      aria-label="Categorías de calculadoras"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Explora por <span className="text-[#60A5FA]">categoría</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Encuentra la calculadora que necesitas organizada por área
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                ref={(el) => {
                  categoryRefs.current[index] = el;
                }}
                className={`relative rounded-2xl p-8 bg-gradient-to-br ${category.bgColor} text-white shadow-2xl border border-white/10 transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] hover:scale-[1.02]`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-white/10">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                </div>
                <p className="text-white/70 mb-6">{category.description}</p>
                
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-white/90 text-sm uppercase tracking-wider">Calculadoras:</h4>
                  <ul className="space-y-1.5">
                    {category.calculators.map((calc, idx) => (
                      <li key={idx} className="text-sm text-white/70 flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/40"></span>
                        {calc}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link
                  href={`/calculadoras#${category.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 group"
                >
                  Explorar
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}