import { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';
import { SITE_URL, CONTACT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Política de Cookies | CalculaChile',
  description: 'Conoce qué cookies usamos en CalculaChile y cómo puedes gestionarlas.',
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="Política de Cookies"
      description="Utilizamos cookies para mejorar tu experiencia. Aquí te explicamos qué son y cómo gestionarlas."
      lastUpdated="31 de Marzo de 2026"
    >
      <h2>1. ¿Qué son las Cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. 
        Se utilizan para recordar tus preferencias, analizar el uso del sitio y mostrar contenido personalizado.
      </p>

      <h2>2. Tipos de Cookies que Usamos</h2>
      
      <h3>Cookies Esenciales</h3>
      <p>Estas cookies son necesarias para el funcionamiento básico del sitio:</p>
      <ul>
        <li><strong>theme:</strong> Guarda tu preferencia de tema (claro/oscuro). Se almacena en localStorage.</li>
      </ul>

      <h3>Cookies Analíticas</h3>
      <p>Nos ayudan a entender cómo usas el sitio para mejorar la experiencia:</p>
      <ul>
        <li><strong>Google Analytics (_ga, _gid, _gat):</strong> Analizan el tráfico del sitio y generan estadísticas de uso. 
        <a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener noreferrer"> Más información</a></li>
      </ul>

      <h3>Cookies de Publicidad</h3>
      <p>Se utilizan para mostrar anuncios relevantes:</p>
      <ul>
        <li><strong>Google AdSense (NID, IDE, etc.):</strong> Muestran anuncios personalizados según tus intereses. 
        <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer"> Más información</a></li>
      </ul>

      <h2>3. Cómo Gestionar las Cookies</h2>
      <p>Puedes controlar y desactivar las cookies desde tu navegador:</p>
      <ul>
        <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
        <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
        <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
        <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
      </ul>
      <p>
        <strong>Nota:</strong> Desactivar cookies puede afectar la funcionalidad del sitio.
      </p>

      <h2>4. Cookies de Terceros</h2>
      <p>Algunas cookies son colocadas por servicios de terceros. No tenemos control sobre estas cookies. Te recomendamos revisar las políticas de privacidad de estos servicios:</p>
      <ul>
        <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
        <li><a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a></li>
      </ul>

      <h2>5. Consentimiento</h2>
      <p>
        Al usar CalculaChile, consientes el uso de cookies según lo descrito en esta política. 
        Puedes retirar tu consentimiento en cualquier momento modificando la configuración de cookies en tu navegador.
      </p>

      <h2>6. Actualizaciones</h2>
      <p>
        Esta política puede actualizarse cuando agreguemos o modifiquemos los servicios que utilizamos. 
        Te notificaremos cambios significativos a través de un aviso en el sitio.
      </p>

      <h2>7. Contacto</h2>
      <p>Si tienes dudas sobre esta política de cookies:</p>
      <ul>
        <li><strong>Email:</strong> {CONTACT_EMAIL}</li>
        <li><strong>Sitio web:</strong> {SITE_URL}</li>
      </ul>
    </LegalPageLayout>
  );
}
