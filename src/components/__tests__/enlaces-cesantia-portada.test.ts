import * as React from "react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: () => {} }) }));

// Vitest compila JSX en modo clásico (tsconfig "jsx": "preserve"), así que
// los componentes necesitan `React` global. Se importan después de definirlo.
(globalThis as unknown as { React: typeof React }).React = React;

let PopularCalculators: typeof import("@/components/home/PopularCalculators").default;
let SearchHero: typeof import("@/components/home/SearchHero").default;

beforeAll(async () => {
  PopularCalculators = (await import("@/components/home/PopularCalculators"))
    .default;
  SearchHero = (await import("@/components/home/SearchHero")).default;
});

const SIMULADOR = 'href="/calculadoras/calculadora-seguro-cesantia"';
const GUIA = 'href="/blog/como-cobrar-seguro-cesantia-afc-2026"';

describe("Portada: enlaces hacia el clúster cesantía", () => {
  it('portada: frase del buscador y bloque "Más buscadas" enlazan al clúster', () => {
    const hero = renderToStaticMarkup(createElement(SearchHero));
    expect(hero).toContain(SIMULADOR);
    expect(hero).toContain("tu seguro de cesantía");
    const popular = renderToStaticMarkup(createElement(PopularCalculators));
    expect(popular).toContain(GUIA);
    expect(popular).toContain(SIMULADOR);
  });
});
