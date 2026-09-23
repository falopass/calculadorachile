# Límites de ejecución para skills locales

Las skills de esta carpeta aportan contexto YMYL, SEO, editorial, frontend y criterios de aceptación. No crean agentes ni alteran el roster global.

- Una skill no autoriza comandos por sí sola. Root asigna `WRITE_SCOPE` y `VALIDATION_COMMANDS` acotados; los writers de implementación pueden hacer un ciclo de autocorrección con ellos, mientras `mechanical-worker` no ejecuta.
- Los writers corren en background con ownership disjunto; los cambios compartidos van en secuencia y más de un writer requiere pregrant de escritura.
- Root o el implementador comprueba directamente lo ordinario. `verifier` bajo `LOCAL_HEAVY_LOCK` se reserva para riesgo concreto; build, navegador y servidor no son rutinarios. Instalaciones y consultas reales conservan sus autorizaciones.
- Las skills no pueden auto-spawn, delegar, anidar agentes ni crear revisiones en loop.
- En páginas públicas/editoriales dirige `design-taste-frontend`; en calculadoras y herramientas, `interface-design`. `frontend-director` se reserva para identidad o crítica difícil. Las skills de proyecto aportan hechos de CalculaChile.
