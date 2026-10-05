# Iteraciones del portfolio

## Puntos de referencia originales

- Iteración 1: rama `iteracion-1`, commit `03afdf3eaacb1894b5cc30667f680fefc6394db5`, árbol `b5aabbebc2334f53e121e3117fcb72a4e5bf0e97`.
- Iteración 2: rama `iteracion-2`, commit `808922f55f93f6c37716087281ae6c54651c2aa7`, árbol `d045bfdd67f6f58eb3a4c6813c563b287be0b051`.
- No mover ni editar estas ramas: conservan ambas versiones completas.

Para una restauración completa, crear un nuevo commit con el árbol del
punto de referencia solicitado y el `main` actual como padre. Así se
conserva el historial y se recuperan exactamente todos los archivos.
Verificar el árbol y esperar a que GitHub Pages termine la publicación.

## Estado actual — Iteración 1 con la entrada de Iteración 2

Solicitud de Zainab, 5 de octubre de 2026: «vuelve a la iteracion 1,
aunque deja el index de la iteracion 2».

Se restaura íntegramente el árbol de Iteración 1 salvo estas excepciones:

- `index.html`: archivo exacto de Iteración 2.
- `portfolio-theme.css` y `images/mineral-surface.svg`: dependencias exactas
  de esa entrada, tomadas de Iteración 2.
- Este documento de versiones.

El tema de Iteración 2 solo se carga desde `index.html`. Home, Quick Scan,
About, todos los casos, las demás páginas y el contacto usan los archivos
originales de Iteración 1. Los dos snapshots originales se conservan.

## Iteración 3 — estado previo a la acuarela

- Rama inmutable: `iteracion-3`.
- Commit exacto: `60b28e35a54343bca1696bda10f2e8988255e27b`.
- Árbol completo: `f240d5bc601197bf21141718f8fd2fc8d4585857`.
- Es el estado publicado de Iteración 1 con el index de Iteración 2.
- Para volver a Iteración 3, restaurar ese árbol completo mediante un
  nuevo commit con el main actual como padre; no mover la referencia.

## Iteración 4 — papel y veladuras de acuarela

Se mantienen el contenido, las tipografías, la estructura y los modos.
El index conserva sus SVG originales, el seguimiento del puntero y el
parpadeo: iris transparentes y delineado sobre el relleno. La aguada
real está detrás de los ojos y se disuelve en el papel granuloso.

Cursor de tres pastillas de pigmento, pequeño y con reflejo suave.
Los botones de entrada alternan azul, salvia y arcilla mediante un
blushing suave antes de navegar. Se respetan clics modificados, teclado
y movimiento reducido. Sin JavaScript los enlaces siguen funcionando.

Papel con relieve ligero en navegación, tarjetas, contacto y cookies.
Los bloques introductorios, resúmenes, tarjetas de texto y footer reciben
una aguada azul de izquierda a derecha una sola vez al aparecer; queda
fija. Contacto y cookies comparten textura y bordes ligeramente irregulares.
El contacto conserva sus campos, validación, envío y confirmación sin check.

Archivos nuevos: `portfolio-watercolor.css`, `portfolio-watercolor.js`,
`images/watercolor-paper.webp`, `images/watercolor-wash.webp` y
`images/watercolor-cursor.svg`. La rama `iteracion-4` guardará la versión
validada y publicada, sin cambiar los puntos anteriores.

## Iteration 5 — estado anterior a las correcciones de accesibilidad

- Rama de referencia: `iteration-5`; no moverla ni editarla.
- Commit exacto: `381f06dc02e69ff17b9f863d1fcc2537a3491455`.
- Árbol completo: `66c954486c5421c0e3a880de4d542457d09adc79`.
- Guarda todo el portfolio tal como estaba cuando Zainab autorizó la
  primera tanda de la checklist de accesibilidad, el 6 de octubre de 2026.
- Para volver, crear un nuevo commit con ese árbol completo y el main
  vigente como padre; después comprobar la publicación de GitHub Pages.
- Los cambios posteriores se registran en `ACCESSIBILITY_CHECKLIST.md`.
