'use client';

import { calculators } from '@/data/calculators';
import CalculatorCard from '@/components/home/CalculatorCard';
import AdBanner from '@/components/ads/AdBanner';
import { SearchBar } from '@/components/calculator/SearchBar';
import { Grid, List, Home, Calculator } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mapeo de categorías del rediseño a categorías reales
const categoryMapping: Record<string, string[]> = {
  'laboral': ['sueldo', 'beneficios'],
  'tributario': ['impuestos'],
  'previsional': ['pension', 'conversiones'],
  'financiero': ['conversiones', 'vivienda', 'vehiculos'],
};

const categories = [...new Set(calculators.map(c => c.category))];

export default function CalculadorasPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Leer el hash de la URL para filtrar por categoría
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Verificar si es una categoría del rediseño
      if (categoryMapping[hash]) {
        setSelectedCategory(hash);
      } else if (categories.includes(hash as any)) {
        setSelectedCategory(hash);
      }
    }
  }, []);

  // Filtrar calculadoras según la categoría seleccionada
  const filtered = selectedCategory === 'all'
    ? calculators
    : categoryMapping[selectedCategory]
      ? calculators.filter(c => categoryMapping[selectedCategory].includes(c.category))
      : calculators.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Navbar premium */}
      <nav className="sticky top-0 z-50 bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#DC2626] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">Calculadoras</span>
                <span className="text-white/60 italic ml-2">Chile.</span>
              </span>
            </Link>
            
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Inicio</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header premium */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
            Todas las Calculadoras
          </h1>
          <p className="text-white/50 text-lg">
            {calculators.length} calculadoras gratuitas disponibles
          </p>
        </div>

        {/* SearchBar premium */}
        <div className="mb-8">
          <div className="relative">
            <SearchBar />
          </div>
        </div>

        {/* Filtros premium */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-[#1E3A8A] to-[#DC2626] text-white shadow-lg shadow-[#1E3A8A]/30'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            Todas
          </button>
          {/* Categorías del rediseño */}
          {Object.keys(categoryMapping).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#1E3A8A] to-[#DC2626] text-white shadow-lg shadow-[#1E3A8A]/30'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
          {/* Categorías reales */}
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#1E3A8A] to-[#DC2626] text-white shadow-lg shadow-[#1E3A8A]/30'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Toggle vista premium */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-3 rounded-lg transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-gradient-to-r from-[#1E3A8A] to-[#DC2626] text-white shadow-lg'
                : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-3 rounded-lg transition-all duration-300 ${
              viewMode === 'list'
                ? 'bg-gradient-to-r from-[#1E3A8A] to-[#DC2626] text-white shadow-lg'
                : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>

        {/* Ad premium */}
        <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <AdBanner slot="1234567890" format="horizontal" />
        </div>

        {/* Grid/List premium */}
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'flex flex-col gap-4'
        }>
          {filtered.map(calc => (
            <div key={calc.id} className="group">
              <CalculatorCard calculator={calc} />
            </div>
          ))}
        </div>

        {/* Ad inferior premium */}
        <div className="mt-12 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <AdBanner slot="0987654321" format="horizontal" />
        </div>
      </div>
    </div>
  );
}
