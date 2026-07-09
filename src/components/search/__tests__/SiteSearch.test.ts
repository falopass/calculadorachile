// @vitest-environment jsdom

import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const pushMock = vi.fn();

Object.assign(globalThis, {
  React,
  IS_REACT_ACT_ENVIRONMENT: true,
});

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    onClick,
    onMouseDown,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    onMouseDown?: React.MouseEventHandler<HTMLAnchorElement>;
    className?: string;
  }) => React.createElement('a', { href, onClick, onMouseDown, className }, children),
}));

import SiteSearch from '../SiteSearch';

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  if (!setter) throw new Error('HTMLInputElement value setter not found');
  setter.call(input, value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

describe('SiteSearch overlay navigation', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    pushMock.mockReset();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('keeps overlay links mounted on mouse down so the click can navigate', async () => {
    await act(async () => {
      root.render(
        React.createElement(SiteSearch, {
          variant: 'overlay',
          maxResults: 20,
        }),
      );
    });

    const input = container.querySelector('input');
    expect(input).not.toBeNull();

    await act(async () => {
      setInputValue(input!, 'finiq');
    });

    const resultLink = container.querySelector<HTMLAnchorElement>(
      'a[href="/calculadoras/calculadora-finiquito"]',
    );
    expect(resultLink).not.toBeNull();

    await act(async () => {
      resultLink!.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(input!.value).toBe('finiq');
    expect(container.querySelector('a[href="/calculadoras/calculadora-finiquito"]')).not.toBeNull();

    const viewAllLink = container.querySelector<HTMLAnchorElement>('a[href="/buscar?q=finiq"]');
    expect(viewAllLink).not.toBeNull();

    await act(async () => {
      viewAllLink!.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(container.querySelector('a[href="/buscar?q=finiq"]')).not.toBeNull();
  });

  it('notifies the parent when Enter navigates from the overlay', async () => {
    const onNavigate = vi.fn();

    await act(async () => {
      root.render(
        React.createElement(SiteSearch, {
          variant: 'overlay',
          maxResults: 20,
          onNavigate,
        }),
      );
    });

    const input = container.querySelector('input');
    const form = container.querySelector('form');
    expect(input).not.toBeNull();
    expect(form).not.toBeNull();

    await act(async () => {
      setInputValue(input!, 'finiq');
    });

    await act(async () => {
      form!.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
    });

    expect(pushMock).toHaveBeenCalledWith('/buscar?q=finiq');
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });
});
