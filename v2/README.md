# Dosificación TENS e interferenciales

Aplicación web estática construida con HTML, CSS y JavaScript puro.

## Funciones
- Calculadora de dosificación que conserva las reglas del Excel original.
- Registro temporal de datos del paciente, signos, síntomas y observaciones.
- Cuestionario guiado por zona corporal y comparación orientativa con un catálogo editable en `script.js` (`conditionCatalog`).
- Cálculo de AMF: `|f1 - f2|`.
- No guarda expedientes ni envía los datos a un servidor. El botón **Nuevo registro / Limpiar** elimina los datos y resultados de la sesión actual.

## Añadir afecciones y síntomas
En `script.js`, edita el arreglo `conditionCatalog`. Cada afección contiene `id`, `name`, `zone`, `description` y `symptoms`. Cada síntoma contiene un identificador único (`id`) y un texto (`label`). Las zonas existentes son `codo`, `cuello`, `pulgar` y `espalda`; puedes añadir nuevas zonas al selector HTML y nuevos elementos al catálogo.

## Publicar en GitHub Pages
Sube `index.html`, `styles.css`, `script.js` y `assets/` al repositorio. No requiere compilación ni servidor.

## Advertencia
La orientación compara síntomas seleccionados con un catálogo demostrativo y no estima probabilidades clínicas. Debe revisarse por personal clínico antes de cualquier uso real. Los parámetros de dosificación reproducen el Excel proporcionado y también requieren validación clínica. No introduzcas datos personales identificables.
