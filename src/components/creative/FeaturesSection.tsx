'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Calculator,
  Lock,
  ArrowRight
} from 'lucide-react';

/**
 * FeaturesSection - Sección de características optimizada
 *
 * Características:
 * - Animaciones activadas por scroll con framer-motion
 * - Cards con efecto de reveal
 * - Mejor accesibilidad
 */

const FEATURES = [
  {
    icon: Calculator,
    title: 'Cálculos Precisos',
    description: 'Fórmulas actualizadas según la legislación chilena vigente. Valores oficiales de UF, UTM y más.',
    color: '#6366f1',
  },
  {
    icon: Zap,
    title: 'Resultados Instantáneos',
    description: 'Cálculos en tiempo real mientras escribes. Sin esperas, sin botones de calcular.',
    color: '#f59e0b',
  },
  {
    icon: Shield,
    title: '100% Privado',
    description: 'Todos los cálculos se realizan en tu navegador. No guardamos ningún dato personal.',
    color: '#10b981',
  },
  {
    icon: Clock,
    title: 'Siempre Actualizado',
    description: 'Valores oficiales actualizados mensualmente. UF, UTM, sueldo mínimo y más.',
    color: '#06b6d4',
  },
  {
    icon: TrendingUp,
    title: 'Desglose Completo',
    description: 'Visualiza cada componente del cálculo: descuentos, impuestos, cotizaciones.',
    color: '#8b5cf6',
  },
  {
    icon: Lock,
    title: 'Sin Registro',
    description: 'Usa todas las calculadoras sin crear cuenta. Sin emails, sin contraseñas.',
    color: '#ec4899',
  },
];

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  
  return (
    <section
      ref={containerRef}
      id="como-funciona"
      className="relative py-20 md:py-28 overflow-hidden"
      aria-labelledby="features-title"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f172a]" aria-hidden="true" />
      
      {/* Grid pattern sutil */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="container-base relative z-10">
        {/* Header de sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-sm font-medium mb-4">
            ¿Por qué elegirnos?
          </span>
          
          <h2
            id="features-title"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Herramientas diseñadas para
            <span className="block bg-gradient-to-r from-[#a5b4fc] via-[#67e8f9] to-[#6ee7b7] bg-clip-text text-transparent">
              simplificar tu vida
            </span>
          </h2>

          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Calculadoras precisas, rápidas y fáciles de usar. Todo lo que necesitas en un solo lugar.
          </p>
        </motion.div>

        {/* Grid de features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 md:mt-16"
        >
          <a
            href="#calculadoras"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300"
          >
            Ver todas las calculadoras
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Card individual de feature - Optimizada
 */
function FeatureCard({
  feature,
  index,
  isInView
}: {
  feature: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    color: string;
  };
  index: number;
  isInView: boolean;
}) {
  const IconComponent = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      whileHover={{ y: -3 }}
      className="group relative p-5 md:p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Glow effect en hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
        style={{ background: `radial-gradient(circle at center, ${feature.color}15 0%, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* Icono */}
      <div
        className="w-11 h-11 md:w-12 md:h-12 rounded-xl p-0.5 mb-4"
        style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}80)` }}
      >
        <div className="w-full h-full rounded-[10px] bg-[#1e1b4b] flex items-center justify-center">
          <span style={{ color: feature.color }}>
            <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
          </span>
        </div>
      </div>

      {/* Contenido */}
      <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-[#67e8f9] transition-colors duration-200">
        {feature.title}
      </h3>
      <p className="text-sm md:text-base text-white/60 leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}
