# Resultados de validación

## Entrega 1 — 2026-11-03

- Astro/TypeScript: 0 errores, advertencias o hints.
- ESLint, compilación (6 páginas) y Vitest (1 prueba): correctos.
- Playwright Chromium escritorio y Pixel 7 emulado: 5 pruebas correctas, 1 omitida intencionalmente (menú móvil en escritorio).
- axe detectó contraste insuficiente en dos etiquetas: corregido el color turquesa y repetida la verificación con éxito.
- `npm audit --omit=dev`: 0 vulnerabilidades notificadas.
- WebKit descargado; faltan bibliotecas del sistema. La instalación automática solicitó acceso root no disponible y no se completó. No se afirma validación en Safari/iPhone físico.
- Inicio de catálogo vacío intencional. Regiones completas, fichas, filtros y mapa corresponden a las siguientes entregas.
- Astro detecta agentes y puede iniciar preview en segundo plano; Playwright usa `--ignore-lock` para mantener el proceso en primer plano.
