# Modelo de datos

Destino: identificador estable, slug descriptivo, nombre, territorios asociados, distrito y corregimiento cuando estén documentados, categorías, actividades, descripción original, fotografías con créditos, coordenadas, acceso, costos, horarios, servicios, recomendaciones, fuentes y fecha de verificación.

Los datos verificables distinguen `confirmado` (valor y referencias), `desconocido` (sin afirmación) y `no_aplica` (razón). Una ubicación de referencia no equivale a una entrada: solo las entradas verificadas pueden originar enlaces de navegación hasta coordenadas.

Los territorios tienen tipo, nivel administrativo y relaciones explícitas. Una comarca no es automáticamente una provincia. Los borradores nunca deben aparecer en HTML, búsqueda ni mapas.

## Colecciones implementadas

`src/content/*.json` contiene arrays con IDs únicos: `territories`, `destinations`, `sources`. Los esquemas Zod y la validación de referencias bloquean fuentes ausentes, ciclos, fechas inválidas/futuras y relaciones administrativas incoherentes.

`Destination.regions` permite múltiples provincias/comarcas: Coiba y su zona especial de protección marina está asociado a Veraguas y Chiriquí, según el alcance del bien UNESCO. Una región superior puede incluir destinos de sus comarcas mediante relaciones de ascendencia.

`coordinates.value.kind` es `referencia` o `entrada`. La coordenada UNESCO de Coiba se convirtió de grados/minutos/segundos a decimal: 7.433, -81.766. No usar como entrada ni calcular rutas terrestres hasta ella.

Naso Tjër Di conserva su condición de comarca con representación de nivel distrito y sin padre provincial impuesto. Guna Yala no recibe un distrito ficticio. Madugandí y Wargandí se enlazan a Chepo y Pinogana. El catálogo no pretende contener todos los distritos y corregimientos nacionales.
