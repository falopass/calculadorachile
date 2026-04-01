'use client';

import { useState, useMemo } from 'react';
import { calculators } from '@/data/calculators';
import { Search } from 'lucide-react';
import Link from 'next/link';

interface SearchBarProps {
  maxResults?: number;
  className?: string;
}

export function SearchBar({ maxResults = 8, className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return calculators
      .filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q)
      )
      .slice(0, maxResults);
  }, [query, maxResults]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar calculadora..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-card border rounded-lg shadow-lg overflow-hidden">
          {results.map(calc => (
            <Link
              key={calc.id}
              href={`/calculadoras/${calc.slug}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors"
              onMouseDown={() => setQuery('')}
            >
              <span className="text-lg">{calc.icon}</span>
              <div>
                <p className="font-medium text-sm">{calc.name}</p>
                <p className="text-xs text-muted-foreground">{calc.category}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-card border rounded-lg shadow-lg p-4 text-center text-muted-foreground">
          No se encontraron calculadoras para "{query}"
        </div>
      )}
    </div>
  );
}
