'use client';

// ============================================
// TocSticky — Tabla de contenidos sticky con scroll-spy
// ----------------------------------------------
// Cliente component que renderiza una tabla de contenidos lateral
// (lg+) o colapsable (mobile) con scroll-spy: la sección activa
// queda resaltada visualmente cuando el usuario scrollea.
//
// Usa IntersectionObserver para detectar cuál sección está visible
// (técnicamente: la última cuya parte superior cruzó cierta línea
// vertical, lo que coincide con la noción intuitiva de "estoy
// leyendo esta sección").
//
// Props:
//   - items: lista de { id, title } correspondiente a los <h2> del
//     artículo (en guías) o headings del blog. Los IDs deben
//     coincidir con los `id` de los headings server-side.
//   - title: encabezado del bloque (default "En esta página").
// ============================================

import { useEffect, useState, useCallback } from 'react';

export interface TocItem {
  id: string;
  title: string;
}

interface TocStickyProps {
  items: TocItem[];
  title?: string;
}

export default function TocSticky({
  items,
  title = 'En esta página',
}: TocStickyProps) {
  const [activeId, setActiveId] = useState<string | null>(
    items.length > 0 ? items[0].id : null,
  );

  // Scroll-spy: marcar la sección activa según el scroll.
  // Estrategia: trackeamos qué heading está más cerca del topo del
  // viewport (-30% de la altura) — esto da la sensación natural de
  // "estoy leyendo esta sección" sin requerir que la sección esté
  // completamente visible.
  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // -30% top: trigger se activa antes de llegar al borde
        // superior. -60% bottom: el heading se considera "fuera"
        // mucho antes de salir por abajo, evitando que TOC marque
        // dos secciones a la vez.
        rootMargin: '-15% 0px -65% 0px',
        threshold: 0,
      },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  // Click en el TOC: scroll suave al heading + actualizar activeId
  // inmediatamente para feedback visual instantáneo (sin esperar al
  // observer, que tiene latencia natural).
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const target = document.getElementById(id);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: 'smooth' });
        setActiveId(id);
        history.replaceState(null, '', `#${id}`);
      }
    },
    [],
  );

  if (items.length === 0) return null;

  return (
    <nav aria-label={title} className="text-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--foreground-muted)] mb-3 px-3">
        {title}
      </p>
      <ol className="space-y-0.5 list-none">
        {items.map((item, idx) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`toc-link ${activeId === item.id ? 'is-active' : ''}`}
            >
              <span className="text-[var(--foreground-muted)] mr-2 tabular-nums">
                {String(idx + 1).padStart(2, '0')}
              </span>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
