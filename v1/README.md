# Calculadora TENS e Interferenciales

Aplicación web estática creada a partir del archivo Excel proporcionado.

## Tecnologías

- HTML5
- CSS3
- JavaScript vanilla
- Sin backend
- Sin base de datos
- Sin framework
- Puede alojarse en hosting estático/gratuito.

## Archivos

- `index.html` — estructura de la página.
- `styles.css` — diseño responsive.
- `script.js` — validación y fórmulas.
- `assets/images/` — carpeta reservada para las imágenes de electrodos.

## Fórmulas reproducidas

### IMC

`IMC = peso / (estatura × estatura)`

### Clasificación

- IMC < 18.5 → Bajo peso
- IMC < 24.9 → Normal
- IMC < 29.9 → Sobrepeso
- IMC >= 29.9 → Obesidad

### Parámetros

| Clasificación | Hz | Pulso (µs) | Intensidad (mA) | Sesión (min) | Sesiones |
|---|---:|---:|---:|---:|---:|
| Bajo peso | 10 | 150 | 5 | 15 | 2 |
| Normal | 20 | 200 | 7 | 20 | 3 |
| Sobrepeso | 25 | 300 | 10 | 25 | 4 |
| Obesidad | 30 | 400 | 12 | 30 | 5 |

La recomendación textual también reproduce el contenido de la fórmula del Excel.

## Observación importante

Edad y sexo se conservan como campos porque forman parte del formulario original. Sin embargo, las fórmulas del Excel revisado no utilizan edad ni sexo para determinar los resultados: la dosificación depende del IMC.

El contenido debe ser validado por el responsable clínico antes de utilizar la aplicación para decisiones reales.

## Imágenes

En `index.html` hay tres espacios preparados para imágenes. Cuando se tengan los archivos, se pueden colocar en:

`assets/images/`

y sustituir los placeholders por etiquetas `<img>`.

## Publicación

La carpeta completa puede subirse directamente a un hosting estático que permita servir archivos HTML, CSS y JS. No requiere ejecutar procesos en el servidor.
