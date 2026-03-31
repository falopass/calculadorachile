'use client';

import { calculators } from '@/data/calculators';
import { motion } from 'framer-motion';
import {
  Calculator,
  TrendingUp,
  Shield,
  Zap,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Star,
  Users,
  ChevronDown
} from 'lucide-react';

// Importar componentes creativos
import HeroSection from '@/components/creative/HeroSection';
import BentoGrid from '@/components/creative/BentoGrid';
import FeaturesSection from '@/components/creative/FeaturesSection';

/**
 * Página Home - Landing page inmersiva estilo Awwwards
 *
 * Secciones:
 * - Hero inmersivo con animaciones avanzadas
 * - Bento Grid asimétrico de calculadoras
 * - Features con scroll-driven animations
 * - CTA final con efectos de glassmorphism
 */
export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] overflow-hidden">
      {/* Hero Section - Inmersivo */}
      <HeroSection />

      {/* Separador decorativo */}
      <div className="relative h-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1e1b4b]/50 to-[#0f172a]" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366f1] to-transparent"
        />
      </div>

      {/* Bento Grid de Calculadoras */}
      <section id="calculadoras" className="relative py-20 md:py-32">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f172a]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        <div className="container-base relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full bg-[#6366f1]/20 text-[#a5b4fc] text-sm font-medium mb-4"
            >
              {calculators.length} calculadoras disponibles
            </motion.span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Explora nuestras{' '}
              <span className="bg-gradient-to-r from-[#a5b4fc] via-[#67e8f9] to-[#6ee7b7] bg-clip-text text-transparent">
                calculadoras
              </span>
            </h2>

            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Herramientas precisas y actualizadas para todos tus cálculos laborales y financieros en Chile
            </p>
          </motion.div>

          {/* Bento Grid */}
          <BentoGrid calculators={calculators} />
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Final */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#164e63]" />

        {/* Efecto de glassmorphism */}
        <div className="absolute inset-0 backdrop-blur-3xl" />

        <div className="container-base relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#22d3ee]" />
              Comienza ahora
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              ¿Listo para calcular tu sueldo?
            </h2>

            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Nuestras calculadoras te ayudan a entender tu liquidación, beneficios y impuestos.
              Diseñadas para ser precisas, fáciles de usar y 100% gratuitas.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="#calculadoras"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold text-lg shadow-lg shadow-[#6366f1]/30"
                data-cursor
                data-magnetic
              >
                <Calculator className="w-5 h-5" />
                <span>Explorar calculadoras</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="#como-funciona"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all"
                data-cursor
              >
                <Shield className="w-5 h-5" />
                <span>Cómo funciona</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Elementos decorativos */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#6366f1]/20 blur-3xl"
        />

        <motion.div
          animate={{
            y: [0, 20, 0],
            scale: [1.1, 1, 1.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-[#22d3ee]/20 blur-3xl"
        />
      </section>
    </main>
  );
}
