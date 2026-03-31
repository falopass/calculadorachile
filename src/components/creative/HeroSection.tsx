'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Sparkles,
  ArrowDown,
  Calculator,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';

/**
 * HeroSection - Hero inmersivo optimizado
 *
 * Características:
 * - Parallax en múltiples capas con framer-motion
 * - Animaciones de entrada orquestadas
 * - Scroll indicator animado
 * - Estadísticas destacadas
 * - Accesibilidad mejorada
 */
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax basado en scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  
  // Transformaciones de parallax con springs suaves
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 450]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  // Spring suave para el parallax
  const springY1 = useSpring(y1, { stiffness: 80, damping: 25 });
  const springY2 = useSpring(y2, { stiffness: 80, damping: 25 });
  const springY3 = useSpring(y3, { stiffness: 80, damping: 25 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
      aria-label="Sección principal - Calculadoras laborales para Chile"
    >
      {/* Capas de parallax */}
      <motion.div
        style={{ y: springY3 }}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#164e63]" />
        
        {/* Grid pattern sutil */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </motion.div>

      {/* Elementos flotantes decorativos */}
      <motion.div
        style={{ y: springY2 }}
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
      >
        {/* Esfera decorativa 1 */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-[#6366f1]/25 to-[#8b5cf6]/15 blur-3xl"
        />
        
        {/* Esfera decorativa 2 */}
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 right-[15%] w-40 h-40 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-[#22d3ee]/15 to-[#06b6d4]/10 blur-3xl"
        />
        
        {/* Esfera decorativa 3 */}
        <motion.div
          animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 left-[20%] w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-[#10b981]/15 to-[#059669]/10 blur-3xl"
        />
      </motion.div>

      {/* Contenido principal */}
      <motion.div
        style={{ y: springY1, opacity, scale }}
        className="relative z-20 container-base text-center px-4"
      >
        {/* Badge de estado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6 md:mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#22d3ee]" />
          <span>Valores actualizados a 2026</span>
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-[0.95] tracking-tight"
        >
          <span className="block">Calculadoras</span>
          <span className="block bg-gradient-to-r from-[#a5b4fc] via-[#67e8f9] to-[#6ee7b7] bg-clip-text text-transparent">
            Laborales
          </span>
          <span className="block text-white/80 text-2xl sm:text-3xl md:text-4xl mt-2">para Chile</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
        >
          Herramientas precisas y actualizadas para calcular sueldos, impuestos, beneficios y más.
          <span className="text-[#67e8f9] font-medium"> 100% gratis.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
        >
          <motion.a
            href="#calculadoras"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-6 md:px-8 py-3.5 md:py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full text-white font-semibold text-base md:text-lg overflow-hidden shadow-lg shadow-[#6366f1]/30 hover:shadow-[#6366f1]/40 transition-shadow"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Explorar calculadoras
            </span>
          </motion.a>
          
          <motion.a
            href="#como-funciona"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 md:px-8 py-3.5 md:py-4 rounded-full text-white/80 font-medium text-base md:text-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          >
            ¿Cómo funciona?
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {[
            { icon: Calculator, value: '40+', label: 'Calculadoras', color: '#a5b4fc' },
            { icon: TrendingUp, value: '100%', label: 'Precisión', color: '#67e8f9' },
            { icon: Shield, value: 'Gratis', label: 'Sin registro', color: '#6ee7b7' },
            { icon: Zap, value: '24/7', label: 'Siempre disponible', color: '#fcd34d' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              className="flex flex-col items-center p-3 md:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <stat.icon className="w-5 h-5 md:w-6 md:h-6 mb-1.5" style={{ color: stat.color }} />
              <span className="text-xl md:text-2xl font-bold text-white" style={{ color: stat.color }}>
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-white/60">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ y: springY1 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
