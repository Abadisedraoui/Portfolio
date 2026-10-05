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
