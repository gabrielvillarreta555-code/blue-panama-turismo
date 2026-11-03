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

## Entrega 2 — 2026-11-03

- Colecciones y relaciones: 7 pruebas unitarias correctas.
- TypeScript, ESLint y compilación de 22 páginas: correctos.
- Playwright Chromium escritorio/móvil: 7 pruebas correctas y 1 omisión intencional.
- 10 provincias y 6 comarcas con páginas propias; 4 destinos documentados. Las fichas individuales se conectan en la entrega 3.
- Sin fotos para todos los territorios: se muestran estados explícitos, no imágenes de otras regiones.

## Entrega 3 — 2026-11-03

- TypeScript, ESLint y compilación de 26 páginas: correctos.
- Vitest: 12 pruebas correctas, incluidos borradores, filtros por costo, tildes, referencias y serialización segura.
- Playwright Chromium escritorio/móvil: 15 pruebas correctas, 1 omisión intencional.
- Búsqueda y filtros compartibles; historial, limpieza, ausencia de resultados, navegación regional y fichas comprobados.
- Catálogo y fichas navegables con JavaScript desactivado.
- Cuatro fichas con fuentes y límites explícitos. No se inventan horarios, servicios, rutas ni precios para completar campos.
