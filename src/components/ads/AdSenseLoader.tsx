'use client';

/**
 * Carga AdSense (anuncios automáticos) salvo en visitas de bots propios o de prueba.
 *
 * Bloquea anuncios cuando:
 *  - la URL trae ?noads=1  (deja una cookie por 30 días; ?noads=0 la borra)
 *  - existe la cookie cc_noads=1
 *  - el navegador está automatizado (navigator.webdriver) o es Chrome headless
 *
 * Por qué: los bots que auditan el sitio navegan desde un datacenter. Si cargan
 * anuncios, AdSense puede contar esas impresiones como tráfico no válido y
 * limitar la cuenta.
 */
import { useEffect } from 'react';

const NOADS_COOKIE = 'cc_noads';
const THIRTY_DAYS = 60 * 60 * 24 * 30;

function adsBlocked(): boolean {
  try {
    const param = new URLSearchParams(window.location.search).get('noads');
    if (param === '1') {
      document.cookie = `${NOADS_COOKIE}=1; path=/; max-age=${THIRTY_DAYS}; SameSite=Lax; Secure`;
      return true;
    }
    if (param === '0') {
      document.cookie = `${NOADS_COOKIE}=; path=/; max-age=0; SameSite=Lax; Secure`;
      return false;
    }
    if (document.cookie.split('; ').includes(`${NOADS_COOKIE}=1`)) return true;
    if (navigator.webdriver) return true;
    if (/HeadlessChrome/i.test(navigator.userAgent)) return true;
  } catch {
    // ante cualquier error, se comporta como una visita normal
  }
  return false;
}

/**
 * AdSenseLoader - inyecta adsbygoogle.js desde el cliente, respetando el modo
 * sin anuncios. El client (ca-pub-…) llega por prop desde layout.tsx, que es
 * quien lo lee de NEXT_PUBLIC_ADSENSE_PUBLISHER_ID.
 */
export default function AdSenseLoader({ client }: { client: string }) {
  useEffect(() => {
    if (adsBlocked()) return;
    if (document.querySelector('script[data-adsense-loader]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
    script.crossOrigin = 'anonymous';
    script.dataset.adsenseLoader = '1';
    document.head.appendChild(script);
  }, [client]);

  return null;
}
