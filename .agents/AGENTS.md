# Límites de ejecución para skills locales

Las skills de esta carpeta aportan contexto YMYL, SEO, editorial, frontend y criterios de aceptación. No crean agentes ni alteran el roster global.

- Cualquier comando imperativo en una skill es documentación para `VERIFICATION_REQUESTED`, no autorización para Sol o un writer.
- Writers solo leen/editan/buscan, trabajan foreground bajo `FOREGROUND_WRITE_LOCK: GRANTED` y cierran con `VERIFICATION_PERFORMED: NONE`.
- Solo el `verifier` global puede ejecutar tests, typecheck, lint, build, scripts, navegador, servidores, instalaciones o consultas reales, bajo `LOCAL_HEAVY_LOCK: GRANTED`.
- Las skills no pueden auto-spawn, delegar, anidar agentes ni crear revisiones en loop.
- La dirección visual no resuelta la define `frontend-director`; las skills de frontend aportan hechos de CalculaChile y no reemplazan esa autoridad.
