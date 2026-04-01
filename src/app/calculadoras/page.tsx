'use client';

import { calculators } from '@/data/calculators';
import CalculatorCard from '@/components/home/CalculatorCard';
import AdBanner from '@/components/ads/AdBanner';
import { Grid, List } from 'lucide-react';
import { useState } from 'react';

const categories = [...new Set(calculators.map(c => c.category))];

export default function CalculadorasPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = selectedCategory === 'all'
    ? calculators
    : calculators.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Todas las Calculadoras</h1>
          <p className="text-muted-foreground">
            {calculators.length} calculadoras gratuitas disponibles
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Todas
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Toggle vista */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>

        {/* Ad */}
        <AdBanner slot="1234567890" format="horizontal" className="mb-6" />

        {/* Grid/List */}
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            : 'flex flex-col gap-3'
        }>
          {filtered.map(calc => (
            <CalculatorCard key={calc.id} calculator={calc} />
          ))}
        </div>

        {/* Ad inferior */}
        <AdBanner slot="0987654321" format="horizontal" className="mt-8" />
      </div>
    </div>
  );
}
