// Declaraciones de tipos para archivos CSS
// Esto permite a TypeScript reconocer las importaciones de CSS

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Para importaciones de efectos secundarios (side-effect imports)
declare module '*.css';
