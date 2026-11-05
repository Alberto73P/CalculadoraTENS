# Dosificación de electroterapia: TENS e interferencial

Aplicación web estática desarrollada con HTML, CSS y JavaScript puro. No requiere instalación ni servidor: abre `index.html` en un navegador o publica la carpeta en GitHub Pages.

## Funcionalidades

- Registro compartido de información del paciente: edad, sexo, peso y estatura.
- Cálculo del IMC y clasificación con los mismos límites de la hoja de Excel.
- Calculadora TENS con frecuencia, duración de pulso, intensidad, duración de sesión, sesiones sugeridas, M1 y recomendación.
- Calculadora de corriente interferencial con frecuencia, frecuencia portadora, duración de sesión, sesiones sugeridas, recomendación y campo manual de intensidad según tolerancia del paciente.
- Orientación guiada por síntomas conservada del proyecto anterior.
- Diseño adaptable a escritorio y dispositivos móviles.
- Los datos se procesan localmente y no se guardan de forma permanente.

## Reglas reproducidas del Excel

| IMC | Clasificación | TENS: Hz | Pulso µs | Intensidad TENS mA | Interferencial: Hz | Portadora Hz | Sesión min | Sesiones interferencial |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| < 18.5 | Bajo peso | 10 | 150 | 5 | 50 | 1000 | 15 | 4 |
| < 24.9 | Normal | 20 | 200 | 7 | 100 | 4000 | 20 | 5 |
| < 29.9 | Sobrepeso | 25 | 300 | 10 | 150 | 4500 | 25 | 6 |
| ≥ 29.9 | Obesidad | 30 | 400 | 12 | No especificada | 8000 | 30 | 7 |

Para TENS, M1 es igual a la intensidad. Para interferencial, la intensidad y M1 reflejan el valor manual que introduce el usuario. La fórmula de frecuencia interferencial del Excel no define valor para obesidad; la aplicación lo indica expresamente y no inventa uno. La fórmula de frecuencia portadora sí devuelve 8000 Hz en esa categoría.

Las recomendaciones son las mismas de la hoja de cálculo original:
- Bajo peso: Aumentar masa muscular y controlar la nutrición.
- Normal: Mantener peso saludable con ejercicio y dieta equilibrada.
- Sobrepeso: Controlar peso y realizar ejercicio regular.
- Obesidad: Reducir peso, consultar nutricionista y realizar ejercicio.

## Publicación en GitHub Pages

Sube `index.html`, `styles.css`, `script.js`, `README.md` y la carpeta `assets` (si se utiliza) al repositorio. En GitHub, entra a **Settings → Pages** y selecciona la rama y carpeta donde se encuentran los archivos.

## Nota importante

La aplicación reproduce las fórmulas suministradas y no valida su pertinencia clínica. Los parámetros y recomendaciones deben ser revisados y autorizados por el responsable clínico antes de utilizarse con pacientes. Edad y sexo se solicitan como información general, pero no intervienen en las fórmulas actuales.
