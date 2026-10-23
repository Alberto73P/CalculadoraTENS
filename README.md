# Dosificación TENS e interferenciales

Aplicación web estática en HTML, CSS y JavaScript. Abre `index.html` en un navegador o publica los archivos en GitHub Pages.

## Funcionalidades
- Formulario principal para información del paciente y cálculo basado en las reglas existentes del Excel.
- Orientación guiada por síntomas con catálogo editable en `script.js` (`conditionCatalog`).
- Formulario independiente de dosificación + AMF: vuelve a solicitar edad, sexo, peso, estatura, signos, síntomas y observaciones; calcula la misma dosificación que el formulario principal y la frecuencia de amplitud modulada con `AMF = |f1 - f2|`.
- Los formularios son independientes. El botón de limpiar del formulario AMF borra sus campos y resultados; «Nuevo registro / Limpiar» también limpia el formulario principal y el formulario AMF.
- Los datos se procesan localmente y no se guardan en una base de datos.

## Publicación
Sube `index.html`, `styles.css`, `script.js`, `README.md` y la carpeta `assets/` al repositorio. En GitHub, habilita Pages desde la rama y carpeta correspondientes.

## Nota importante
Las reglas de dosificación reproducen los valores existentes en el Excel y no constituyen una recomendación clínica validada. El contenido debe ser revisado por personal clínico antes de usarlo en un contexto real.
