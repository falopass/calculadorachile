// ============================================
// Autor editorial — fuente única para E-E-A-T
// ----------------------------------------------
// Información del autor / equipo editorial detrás de las guías y
// los artículos del blog. Centralizada acá para que tanto el schema
// JSON-LD (Article.author como Person) como la página `/acerca-de`
// (perfil público) consuman el mismo origen.
//
// Cambiar el autor o sus credenciales aquí lo actualiza:
//   - Article author Person en blog y guías
//   - Person schema de /acerca-de
//   - Bio visible en /acerca-de
//   - sameAs de redes sociales
// ============================================

import { SITE_URL, absoluteUrl } from '@/lib/site';

/** ID estable del Person para que otros schemas lo referencien. */
export const AUTHOR_ID = `${SITE_URL}/acerca-de#diego`;

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
  /** Bio extendida — varios párrafos en HTML, para /acerca-de. */
  bioLongHtml: string;
  /** Temas que cubre el proyecto (mapean a `knowsAbout`). */
  expertise: string[];
  /** Credenciales / formación verificable. */
  credentials: string[];
  /** URLs de perfiles públicos verificables. */
  sameAs: string[];
  /** Email público. */
  email: string;
  /** URL absoluta de la página de perfil del autor. */
  url: string;
  /** URL absoluta de la imagen / avatar (1:1, mínimo 400x400). */
  imageUrl: string;
}

/**
 * Diego Bravo Opazo — autor principal de CalculaChile. Bio escrita en
 * primera persona enfocada en E-E-A-T: historia, experiencia,
 * principios editoriales y por qué citamos siempre la fuente legal.
 *
 * NOTA: Si en el futuro hay más autores, este archivo puede exportar
 * `authors: AuthorProfile[]` y los schemas elegir según el slug.
 */
export const AUTHOR: AuthorProfile = {
  id: AUTHOR_ID,
  name: 'Diego Bravo Opazo',
  alternateName: 'falopass',
  jobTitle: 'Editor jefe y desarrollador de CalculaChile',
  bioShort:
    'Estudiante de tercer año de Ingeniería Civil en Computación en la Universidad de Talca; creador, desarrollador y editor de CalculaChile desde Curicó.',
  bioLongHtml: `
    <p>Soy <strong>Diego Bravo Opazo</strong>, creador, desarrollador y editor de CalculaChile. Curso tercer año de Ingeniería Civil en Computación en la Universidad de Talca y desarrollo el proyecto desde Curicó. Lo inicié en 2025 después de encontrar resultados distintos para cálculos cotidianos como sueldo líquido, finiquito y reajuste de arriendo.</p>
    <p>CalculaChile reúne herramientas referenciales y explica las fuentes, supuestos y límites detrás de cada estimación. Para cada tema se priorizan documentos, fichas y normas específicas de organismos como BCN, SII, Superintendencia de Pensiones, Dirección del Trabajo y Banco Central.</p>
    <p>Las calculadoras se revisan con tres criterios antes de publicarse:</p>
    <ol>
      <li><strong>Fórmula</strong> — implementada en TypeScript y acompañada por controles de regresión cuando la herramienta contiene reglas legales o valores críticos.</li>
      <li><strong>Casos de borde</strong> — se prueban escenarios conocidos donde la regla puede cambiar, sin sustituir una revisión profesional del caso real.</li>
      <li><strong>Fuente y alcance</strong> — cada ficha identifica referencias oficiales, supuestos y situaciones que requieren revisión profesional.</li>
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
    'Estudiante de tercer año de Ingeniería Civil en Computación en la Universidad de Talca',
    'Autor y mantenedor de CalculaChile desde 2025',
    'Desarrollador del repositorio público de CalculaChile',
  ],
  sameAs: [
    'https://github.com/falopass',
    'https://github.com/falopass/calculadorachile',
  ],
  email: 'ddiegosebastianbb@gmail.com',
  url: absoluteUrl('/acerca-de'),
  // Reusamos el logo del sitio como Person.image. Google acepta el
  // logo de marca para sole-operators y evita depender de una foto
  // personal real. La página /acerca-de muestra un avatar con iniciales
  // estilizado en el propio HTML para la presentación visual.
  imageUrl: absoluteUrl('/logo.png'),
};
