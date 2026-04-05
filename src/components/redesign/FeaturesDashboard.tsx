'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Shield, Clock, DollarSign, Percent, Building2, CreditCard } from 'lucide-react';
import { gsap } from '@/lib/gsap';

// Componente para animar números
function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1;
    const startTime = Date.now();
    const startValue = displayValue;
    const targetValue = value;

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        const currentValue = startValue + (targetValue - startValue) * progress;
        setDisplayValue(currentValue);
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValue);
      }
    };

    animate();
  }, [value]);

  const formattedValue = new Intl.NumberFormat('es-CL').format(Math.floor(displayValue));

  return (
    <span className="font-mono text-lg md:text-xl font-bold text-white">
      {prefix}{formattedValue}{suffix}
    </span>
  );
}

// Card 1: Sueldo Líquido Mini-Calculator
function LiveCalculatorCard() {
  const [sueldoBruto, setSueldoBruto] = useState(1000000);
  const afp = 0.1;
  const salud = 0.07;
  const cesantia = 0.006;

  const descuentoAfp = sueldoBruto * afp;
  const descuentoSalud = sueldoBruto * salud;
  const descuentoCesantia = sueldoBruto * cesantia;
  const totalDescuentos = descuentoAfp + descuentoSalud + descuentoCesantia;
  const sueldoLiquido = sueldoBruto - totalDescuentos;

  return (
    <div className="bg-[#1E293B]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#1E3A8A]/50 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-[#1E3A8A]/20">
          <Calculator className="w-5 h-5 text-[#60A5FA]" />
        </div>
        <h3 className="text-lg font-semibold text-white">Sueldo Líquido</h3>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm text-white/50 mb-2">Sueldo Bruto (CLP)</label>
          <input
            type="range"
            min="300000"
            max="5000000"
            step="10000"
            value={sueldoBruto}
            onChange={(e) => setSueldoBruto(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
          />
          <div className="text-right text-sm text-white/80 font-mono mt-1">
            <AnimatedNumber value={sueldoBruto} prefix="$" />
          </div>
        </div>

        <div className="pt-3 space-y-2 border-t border-white/10">
          <div className="flex justify-between">
            <span className="text-white/50">AFP (10%)</span>
            <span className="text-red-400 font-mono">-<AnimatedNumber value={descuentoAfp} prefix="$" /></span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Salud (7%)</span>
            <span className="text-red-400 font-mono">-<AnimatedNumber value={descuentoSalud} prefix="$" /></span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Cesantía (0.6%)</span>
            <span className="text-red-400 font-mono">-<AnimatedNumber value={descuentoCesantia} prefix="$" /></span>
          </div>
          <div className="flex justify-between pt-3 border-t border-white/10 font-bold">
            <span className="text-white">Líquido</span>
            <span className="text-green-400 font-mono text-xl"><AnimatedNumber value={sueldoLiquido} prefix="$" /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Valores más realistas basados en datos reales de Chile
const PHRASES = [
  'UF hoy: $38.640,20',
  'UTM Abril: $67.996',
  'IPC Marzo: +0,4%',
  'TMC: 8,25%',
  'UF prevista: $38.720,10',
  'UTA: $67.996'
];

// Card 2: Indicadores Typewriter
function IndicatorsFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = PHRASES[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % PHRASES.length);
      } else if (isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  // Indicadores estáticos adicionales
  const indicators = [
    { label: 'UF', value: '$38.640,20', change: '+0,12%', icon: DollarSign },
    { label: 'UTM', value: '$67.996', change: '+0,08%', icon: Percent },
    { label: 'IPC', value: '+0,4%', change: 'Marzo', icon: TrendingUp },
    { label: 'TMC', value: '8,25%', change: 'Banco Central', icon: Building2 },
  ];

  return (
    <div className="bg-[#1E293B]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#DC2626]/50 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-[#DC2626]/20">
          <TrendingUp className="w-5 h-5 text-[#DC2626]" />
        </div>
        <h3 className="text-lg font-semibold text-white">Indicadores</h3>
      </div>

      {/* Typewriter principal */}
      <div className="p-3 bg-black/30 rounded-lg font-mono text-white mb-4 min-h-[3rem] flex items-center">
        <div className="flex items-center gap-2">
          <span className="text-green-400">$</span>
          <span className="font-mono">{displayText}</span>
          <span className="animate-pulse text-[#DC2626]">|</span>
        </div>
      </div>
      
      {/* Indicadores en grid */}
      <div className="grid grid-cols-2 gap-2">
        {indicators.map((ind) => {
          const Icon = ind.icon;
          return (
            <div key={ind.label} className="p-2 bg-black/20 rounded-lg">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="w-3 h-3 text-white/40" />
                <span className="text-xs text-white/50">{ind.label}</span>
              </div>
              <div className="text-sm font-mono text-white">{ind.value}</div>
              <div className="text-xs text-white/30">{ind.change}</div>
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center gap-2 mt-3">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DC2626]"></span>
        </div>
        <span className="text-xs text-white/50">En vivo</span>
      </div>
    </div>
  );
}

// Card 3: Categorías
function CategoryGrid() {
  const categories = [
    { name: 'Laboral', count: 15, icon: Clock, color: 'from-[#1E3A8A] to-[#312E81]' },
    { name: 'Tributario', count: 12, icon: Calculator, color: 'from-[#DC2626] to-[#991B1B]' },
    { name: 'Prevensional', count: 8, icon: Shield, color: 'from-[#059669] to-[#047857]' },
    { name: 'Financiero', count: 10, icon: CreditCard, color: 'from-[#0891B2] to-[#0E7490]' },
  ];

  return (
    <div className="bg-[#1E293B]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#1E3A8A]/50 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-[#1E3A8A]/20">
          <Clock className="w-5 h-5 text-[#60A5FA]" />
        </div>
        <h3 className="text-lg font-semibold text-white">Categorías</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.name}
              className={`p-4 bg-gradient-to-br ${category.color} rounded-xl hover:scale-105 transition-all duration-200 cursor-pointer group`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
                <span className="text-sm text-white font-medium">{category.name}</span>
              </div>
              <div className="text-xs text-white/60">
                {category.count} calculadoras
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function FeaturesDashboard() {
  return (
    <section className="py-20 md:py-28 bg-[#0F172A] px-4" id="calculadoras">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Herramientas <span className="text-[#60A5FA]">interactivas</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Calculadoras en tiempo real con datos actualizados constantemente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <LiveCalculatorCard />
          <IndicatorsFeed />
          <CategoryGrid />
        </div>
      </div>
    </section>
  );
}