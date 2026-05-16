// ============================================
// Autor editorial — fuente única para E-E-A-T
// ----------------------------------------------
// Información del autor / equipo editorial detrás de las guías y
// los artículos del blog. Centralizada acá para que tanto el schema
// JSON-LD (Article.author como Person) como la página `/equipo`
// (perfil público) consuman el mismo origen.
//
// Cambiar el autor o sus credenciales aquí lo actualiza:
//   - Article author Person en blog y guías
//   - Person schema de /equipo
//   - Bio visible en /equipo
//   - sameAs de redes sociales
// ============================================

import { SITE_URL, absoluteUrl } from '@/lib/site';

/** ID estable del Person para que otros schemas lo referencien. */
export const AUTHOR_ID = `${SITE_URL}/equipo#diego`;

/**
 * Autor principal del contenido editorial. Una persona real,
 * documentada, mejora E-E-A-T (Experience, Expertise, Authoritativeness,
 * Trustworthiness) — un factor que Google pondera fuerte en YMYL
 * (Your Money / Your Life), categoría a la que pertenecen las
 * calculadoras laborales y financieras de este sitio.
 */
export interface AuthorProfile {
  /** ID estable del Person en JSON-LD. */
  id: string;
  /** Nombre completo (mostrado en perfil y schema). */
  name: string;
  /** Nombre corto / alias (handle público). */
  alternateName: string;
  /** Cargo o rol editorial (ej. "Editor jefe"). */
  jobTitle: string;
  /** Bio corta — 1 párrafo, ~250 caracteres. Para cards y cabeceras. */
  bioShort: string;
  /** Bio extendida — varios párrafos en HTML, para /equipo. */
  bioLongHtml: string;
  /** Áreas de expertise (mapean a `knowsAbout`). */
  expertise: string[];
  /** Credenciales / formación verificable. */
  credentials: string[];
  /** URLs de perfiles públicos (Twitter, LinkedIn, GitHub). */
  sameAs: string[];
  /** Email público. */
  email: string;
  /** URL absoluta de la página de perfil del autor. */
  url: string;
  /** URL absoluta de la imagen / avatar (1:1, mínimo 400x400). */
  imageUrl: string;
}

/**
 * Diego Sebastián — autor principal de CalculaChile. Bio escrita en
 * primera persona enfocada en E-E-A-T: historia, experiencia,
 * principios editoriales y por qué citamos siempre la fuente legal.
 *
 * NOTA: Si en el futuro hay más autores, este archivo puede exportar
 * `authors: AuthorProfile[]` y los schemas elegir según el slug.
 */
export const AUTHOR: AuthorProfile = {
  id: AUTHOR_ID,
  name: 'Diego Sebastián',
  alternateName: 'falopass',
  jobTitle: 'Editor jefe y desarrollador de CalculaChile',
  bioShort:
    'Ingeniero y editor jefe de CalculaChile. Verifica cada cálculo contra el Código del Trabajo, el SII y el Banco Central de Chile antes de publicarlo.',
  bioLongHtml: `
    <p>Soy <strong>Diego Sebastián</strong>, ingeniero y creador de CalculaChile. Empecé el proyecto en 2025 porque cada vez que necesitaba calcular mi propio sueldo líquido, mi finiquito o el reajuste de mi arriendo, terminaba abriendo cinco pestañas distintas — y dos de las cinco daban resultados diferentes.</p>
    <p>CalculaChile nació para resolver eso: un solo lugar, con cálculos verificables y citas a la ley o a la fuente oficial detrás de cada número. No inventamos fórmulas: las leemos del <a href="https://www.bcn.cl" target="_blank" rel="noopener">Código del Trabajo en BCN</a>, del <a href="https://www.sii.cl" target="_blank" rel="noopener">SII</a>, del <a href="https://www.spensiones.cl" target="_blank" rel="noopener">SP</a>, del <a href="https://www.dt.gob.cl" target="_blank" rel="noopener">DT</a> y del <a href="https://www.bcentral.cl" target="_blank" rel="noopener">Banco Central</a>.</p>
    <p>Cada calculadora pasa por tres filtros antes de publicarse:</p>
    <ol>
      <li><strong>Fórmula</strong> — escrita en TypeScript puro, con tests unitarios que la comparan contra ejemplos publicados por la autoridad respectiva.</li>
      <li><strong>Caso de borde</strong> — probada con sueldos al tope imponible, contratos a plazo fijo, jornadas parciales y otros escenarios donde la regla cambia.</li>
      <li><strong>FAQ con base legal</strong> — cada pregunta se responde citando el artículo de la ley o la circular vigente.</li>
    </ol>
    <p>El sitio es código abierto en <a href="https://github.com/falopass/calculadorachile" target="_blank" rel="noopener">GitHub</a>. Si encuentras un cálculo incorrecto, escríbeme: prefiero corregirlo el mismo día a defender un error.</p>
  `.trim(),
  expertise: [
    'Cálculo de sueldo líquido y descuentos legales en Chile',
    'Indemnización por años de servicio y finiquito laboral',
    'IVA, boleta de honorarios y régimen tributario chileno',
    'Crédito hipotecario y reajuste por UF',
    'Cotizaciones previsionales (AFP, salud, cesantía)',
    'Operación Renta y trabajadores independientes',
    'Sistema previsional y pensión garantizada universal (PGU)',
  ],
  credentials: [
    'Ingeniero civil informático',
    'Más de 8 años desarrollando software financiero',
    'Lector activo de circulares de la Dirección del Trabajo y del SII',
    'Autor del repositorio open source falopass/calculadorachile',
  ],
  sameAs: [
    'https://github.com/falopass',
    'https://github.com/falopass/calculadorachile',
    'https://twitter.com/calculachile',
    'https://linkedin.com/company/calculachile',
  ],
  email: 'ddiegosebastianbb@gmail.com',
  url: absoluteUrl('/equipo'),
  // Reusamos el logo del sitio como Person.image. Google acepta el
  // logo de marca para sole-operators y evita depender de una foto
  // personal real. La página /equipo muestra un avatar con iniciales
  // estilizado en el propio HTML para la presentación visual.
  imageUrl: absoluteUrl('/logo.png'),
};

