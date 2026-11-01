# VinWizard Catalogue

Catálogo digital en inglés de 16 páginas A4 verticales, con la identidad de VinWizard. Primera edición para revisión interna; sin precios.

## Abrirlo

La versión ya construida está en `dist/index.html`: puedes abrir ese archivo directamente en tu navegador. También funciona sin conexión a Internet. Para editar y previsualizar desde Visual Studio Code:

```sh
npm run dev
```

Abre `http://127.0.0.1:4173`. No hace falta instalar paquetes. Requiere Node.js 18 o posterior. Si cambias el contenido, detén el servidor con Ctrl+C y vuelve a ejecutar el comando para reconstruir.

## Subirlo a Netlify

- Publicación manual: sube la carpeta `dist` ya generada. `index.html` debe quedar en la raíz del sitio.
- Publicación desde GitHub: conecta este repositorio. `netlify.toml` ya configura `npm run build` y la carpeta de publicación `dist`.
- El archivo `VinWizard-Catalogue-Netlify.zip` contiene el sitio construido, con imágenes y fuentes locales. No contiene los archivos de trabajo ni el historial Git.

Para usar el ZIP, descomprímelo primero y sube la carpeta resultante. Referencia: [publicación manual de Netlify](https://docs.netlify.com/deploy/create-deploys/#drag-and-drop).

La etiqueta `noindex` y la cabecera de Netlify piden a los buscadores que no indexen esta edición. No equivalen a protección por contraseña.

## Editar

| Archivo | Qué contiene |
| --- | --- |
| `content.mjs` | Textos, fotografías y orden de las 16 páginas |
| `styles.css` | Colores, tipografía, diseño A4 y estilos de impresión |
| `viewer.html` | Barra de herramientas y estructura del visor |
| `app.js` | Índice, zoom, lectura, teclado, compartir y pantalla completa |
| `navigation.js` | Reglas de navegación entre páginas y dobles páginas |
| `assets/` | Recursos locales de VinWizard y fuentes Poppins con licencia |
| `docs/CONTENT-NOTES.md` | Fuentes y decisiones editoriales |

Después de editar:

```sh
npm test
npm run build
```

`dist` se genera automáticamente y está excluida de Git. El HTML final es estático; no necesita un servidor de aplicaciones, base de datos, cuenta de flipbook ni servicios de terceros.

## Uso del visor

- Ordenador ancho: dobles páginas; portada y contraportada individuales.
- Móvil o ventana estrecha: una página cada vez; gesto horizontal para avanzar.
- Flechas del teclado: anterior/siguiente. Home/End: portada/contraportada.
- Contents: acceso a todas las páginas. Los capítulos de la página 3 también son interactivos.
- Read: lectura continua. Zoom +: página a tamaño completo. Las capturas de software se pueden ampliar por separado.
- Share: copia un enlace a la página seleccionada. Los enlaces locales solo funcionan en el mismo ordenador; comparte la URL de Netlify después de publicarlo.
- Print: abre la impresión del navegador. La hoja A4 está preparada como base de la futura fase PDF; el PDF final todavía no forma parte de esta entrega. Al imprimir, activa gráficos de fondo y desactiva las cabeceras/pies del navegador.

## Git

Proyecto separado de la web original. El primer commit conserva el catálogo editable. No se ha publicado en GitHub ni se ha modificado `VinWizard-English`.

Cuando crees el repositorio vacío `VinWizard-Catalogue` en tu GitHub, podrás añadirlo como remoto y subir la rama `main`. Si trabajas después en GitHub, `git pull` trae los cambios al ordenador; `git push` sube tus cambios locales.

## Próxima revisión editorial

La edición utiliza la información y los recursos del repositorio facilitado por el usuario. Antes de distribuirla comercialmente, el equipo puede ajustar nomenclaturas, opciones de producto y la selección de fotografías. No incluye precios de ejemplo, testimonios inventados ni especificaciones de la competencia.
