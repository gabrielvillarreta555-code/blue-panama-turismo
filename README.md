# Blue Panamá Turismo 🇵🇦

Catálogo turístico de Blue Lab Studios. Proyecto privado, en desarrollo editorial. Sin publicación ni despliegue autorizado.

## Desarrollo

Requiere Node.js 24 y npm. Ejecutar `npm ci`, `npm run dev` y abrir http://localhost:4321.

- `npm run check`: tipos y plantillas Astro.
- `npm run lint`: ESLint.
- `npm test`: Vitest.
- `npm run build`: genera `dist/`.
- `npm run preview`: sirve la compilación local.
- `npx playwright install --with-deps chromium webkit` y `npm run test:e2e`: pruebas de navegador.

Consulta [arquitectura](docs/arquitectura.md), [modelo](docs/modelo-datos.md), [fuentes](docs/fuentes.md), [hoja de ruta](docs/hoja-de-ruta.md) y [criterios editoriales](docs/criterios-editoriales.md).

## Revisión

Las entregas se proponen en ramas y PR en borrador. Los PR siguientes se apilan sobre la entrega anterior; revisar en orden. No fusionar ni desplegar sin autorización. La configuración predeterminada excluye la indexación.

El código no concede una licencia pública al proyecto privado. Las fotografías conservan sus licencias individuales y atribución, visibles en el sitio y en `src/lib/photos.ts`.
