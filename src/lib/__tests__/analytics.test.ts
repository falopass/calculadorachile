import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type FakeWindow = {
  location: { search: string };
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  gtagInitialized?: boolean;
};

function setupDom(
  opts: { search?: string; cookie?: string; ua?: string; webdriver?: boolean } = {},
) {
  const appended: { src: string; async: boolean }[] = [];
  const win: FakeWindow = { location: { search: opts.search ?? '' } };
  vi.stubGlobal('window', win);
  vi.stubGlobal('document', {
    cookie: opts.cookie ?? '',
    createElement: () => ({ src: '', async: false }),
    head: { appendChild: (el: { src: string; async: boolean }) => appended.push(el) },
  });
  vi.stubGlobal('navigator', {
    webdriver: opts.webdriver ?? false,
    userAgent: opts.ua ?? 'Mozilla/5.0 Chrome/130.0.0.0 Safari/537.36',
  });
  return { win, appended };
}

describe('analytics GA4', () => {
  beforeEach(() => {
    vi.resetModules();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('usa G-PHMWEP3S9T en builds de producción si NEXT_PUBLIC_GA_MEASUREMENT_ID no está definida', async () => {
    vi.stubEnv('NEXT_PUBLIC_GA_MEASUREMENT_ID', '');
    vi.stubEnv('NODE_ENV', 'production');
    const { GA_MEASUREMENT_ID } = await import('@/lib/analytics');
    expect(GA_MEASUREMENT_ID).toBe('G-PHMWEP3S9T');
  });

  it('no usa el ID fijo fuera de producción (next dev)', async () => {
    vi.stubEnv('NEXT_PUBLIC_GA_MEASUREMENT_ID', '');
    vi.stubEnv('NODE_ENV', 'development');
    const { GA_MEASUREMENT_ID } = await import('@/lib/analytics');
    expect(GA_MEASUREMENT_ID).toBe('');
  });

  it('la variable de entorno tiene prioridad sobre el ID fijo', async () => {
    vi.stubEnv('NEXT_PUBLIC_GA_MEASUREMENT_ID', 'G-OTRO');
    vi.stubEnv('NODE_ENV', 'production');
    const { GA_MEASUREMENT_ID } = await import('@/lib/analytics');
    expect(GA_MEASUREMENT_ID).toBe('G-OTRO');
  });

  it('initGA carga gtag.js y empuja objetos arguments (no arrays) sin page_view automático', async () => {
    const { win, appended } = setupDom();
    const { initGA, pageview } = await import('@/lib/analytics');
    initGA('G-PHMWEP3S9T');
    pageview('/calculadoras/calculadora-uf');

    expect(appended).toHaveLength(1);
    expect(appended[0].src).toBe('https://www.googletagmanager.com/gtag/js?id=G-PHMWEP3S9T');
    expect(appended[0].async).toBe(true);

    const entries = win.dataLayer as ArrayLike<unknown>[];
    expect(entries).toHaveLength(3);
    for (const entry of entries) {
      expect(Array.isArray(entry)).toBe(false);
      expect(Object.prototype.toString.call(entry)).toBe('[object Arguments]');
    }
    expect(Array.from(entries[1])).toEqual(['config', 'G-PHMWEP3S9T', { send_page_view: false }]);
    expect(Array.from(entries[2])).toEqual([
      'event',
      'page_view',
      { page_path: '/calculadoras/calculadora-uf' },
    ]);

    initGA('G-PHMWEP3S9T');
    expect(appended).toHaveLength(1);
  });

  it('analyticsBlocked respeta ?noads, la cookie cc_noads y los navegadores automatizados', async () => {
    const { analyticsBlocked } = await import('@/lib/analytics');
    setupDom();
    expect(analyticsBlocked()).toBe(false);
    setupDom({ search: '?noads=1' });
    expect(analyticsBlocked()).toBe(true);
    setupDom({ search: '?noads=0', cookie: 'cc_noads=1' });
    expect(analyticsBlocked()).toBe(false);
    setupDom({ cookie: 'a=b; cc_noads=1' });
    expect(analyticsBlocked()).toBe(true);
    setupDom({ webdriver: true });
    expect(analyticsBlocked()).toBe(true);
    setupDom({ ua: 'Mozilla/5.0 HeadlessChrome/130.0.0.0' });
    expect(analyticsBlocked()).toBe(true);
  });
});
