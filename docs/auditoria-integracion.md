# Auditoría de integración — 2026-11-03

## Estado real de las entregas

| PR  | Rama origen → destino                                        | Commit de la entrega | ¿En `main` antes de la integración? |
| --- | ------------------------------------------------------------ | -------------------- | ----------------------------------- |
| #1  | `feat/entrega-1-base` → `main`                               | `2a126ac`            | Sí (merge `6f32e6a`)                |
| #2  | `feat/entrega-2-contenido` → `feat/entrega-1-base`           | `75ef1f5`            | **No**                              |
| #3  | `feat/entrega-3-exploracion` → `feat/entrega-2-contenido`    | `d67a343`            | **No**                              |
| #4  | `feat/entrega-4-mapa-calidad` → `feat/entrega-3-exploracion` | `b7f1680`            | **No**                              |

Orden real de las fusiones (UTC): #4 a las 14:40:13, #1 a las 14:42:59, #2 a las 14:43:19 y #3 a las 14:43:41. Como #1 se fusionó en `main` antes que #2 en `feat/entrega-1-base`, `main` quedó solo con la entrega 1.

Estado de las ramas remotas:

- `main` = `6f32e6a`: entrega 1 (árbol idéntico a `2a126ac`).
- `feat/entrega-1-base` = `709a5ef`: entregas 1–2.
- `feat/entrega-3-exploracion` = `6f7b5b4`: entregas 1–4.
- `feat/entrega-2-contenido` = `a25de7c`: entregas 1–4; árbol idéntico a `b7f1680` (rama final de la entrega 4).

Diferencia `main` ↔ entrega 4: 67 archivos, +4133/−90 líneas. Sin conflictos: la entrega 4 desciende directamente de `2a126ac`, que es todo lo que contiene `main`.

## Integración

La rama de integración fusiona `a25de7c` con `--no-ff` sobre `main`, sin reescribir historia, sin duplicar commits y sin borrar ramas. Tras la fusión, el árbol es idéntico a `b7f1680`; después se añaden las correcciones descritas abajo en commits separados.

## Problemas encontrados y correcciones

1. **Entregas 2–4 ausentes de `main`** → fusión de integración (arriba).
2. **12 avisos moderados de `npm audit`** → todos derivan de GHSA-g3hv-75wg-m249 en `minimatch` 10.2.6 (transitivo de ESLint/typescript-eslint, solo desarrollo). El "arreglo" de npm degradaba ESLint a la v4. Se aplicó `overrides.minimatch = ^11.0.4`; ESLint validado; 0 vulnerabilidades.
3. **El sitio no funcionaba bajo una subruta** (necesario para GitHub Pages de proyecto): ~45 enlaces internos absolutos. Se añadió `BASE_PATH` opcional y el helper `src/lib/paths.ts`; sin `BASE_PATH` el HTML no cambia. El verificador de enlaces acepta `BASE_PATH`.
4. **Sin flujo de publicación** → `.github/workflows/pages.yml`, manual, desde `main`, `noindex` por defecto.

No se encontraron errores funcionales en el código de Codex: todas las comprobaciones pasaron antes de los cambios. Los resultados están en [validacion.md](validacion.md#integración-en-main--2026-11-03).

## Pendiente para publicar

1. Revisar y aprobar el PR de integración y fusionarlo en `main`.
2. Decidir si el sitio puede ser público: Pages publica en internet aunque el repositorio sea privado, y en repos privados requiere plan de pago.
3. Activar Pages (Source: GitHub Actions) y ejecutar el workflow **GitHub Pages** manualmente.
4. Antes de indexar: revisión editorial, política de privacidad y canal de contacto definitivos, condiciones de uso de teselas de OpenStreetMap para el tráfico previsto y, si hay dominio propio, configurarlo en Pages (entonces `BASE_PATH` pasa a `/` automáticamente).
5. Probar en dispositivos físicos Android/iPhone (hasta ahora, emulación).
