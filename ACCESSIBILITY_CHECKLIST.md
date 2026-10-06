# Checklist de accesibilidad

Actualizada: 6 de octubre de 2026 (UTC). Cambios aprobados publicados en
https://zainababadi.com/ mediante la PR 1 y la revisión posterior de foco y
nombres accesibles. Código: `f9591c144b62c52a6511b272318b5e8bbd045ba7`.

Iteration 5 conserva el portfolio anterior completo en la rama `iteration-5`,
commit `381f06dc02e69ff17b9f863d1fcc2537a3491455`.

Esta checklist registra correcciones concretas; no certifica conformidad
completa con WCAG. Las casillas marcadas se refieren al alcance comprobado
que se describe. Las pruebas adicionales pendientes se mantienen en C5 y V1–V3.

## Contraste y consistencia visual

- [x] C1 — “Click here” y flecha: `#9A9A9A` → `#52627A`, conservando tipografía e inclinación. Color publicado comprobado; contraste base 5,63:1 sobre `#F3F4F6`.
- [x] C2 — Fechas, roles y números: `#8B96A8` → `#3E4E64`, en la misma familia azul grisácea. Color comprobado; contraste base 6,83:1 sobre `#E4E7EB`.
- [x] C3 — Descripciones, tiempo de lectura y captions: `#66758C` → `#3E4E64`. Clases afectadas comprobadas; captions con el tono oscuro existente `#43536B` lo conservan.
- [x] C4 — Bordes de contacto: `#6D798A` opaco, mismo grosor de 1px y esquinas. En la captura publicada: mínimo 3,89:1 contra el papel adyacente en nombre/email, y 3,53:1 en mensaje.
- [ ] C5 — Completar contraste de todas las texturas, aguadas y estados hover/focus. Proponer ajustes donde fallen manteniendo la paleta.

## Teclado y ventanas

- [x] K1 — About: foco inicial en Close, Tab/Shift+Tab dentro del modal, fondo inerte, Escape y devolución a Expand cards. Comprobado en la web.
- [x] K2 — Tarjetas de About con botones nativos, Enter y Espacio, conservando orden del DOM y foco. Nombres accesibles separados correctamente entre líneas. Desactivadas en el diseño móvil estático; revisión visual móvil pendiente en V1.
- [x] K3 — Nueve imágenes responsive: Enter/Espacio abren el grupo y posición correctos; Escape devuelve el foco a la imagen. Las nueve comprobadas.
- [ ] K4 — Cookies: retener el foco dentro si se mantiene como modal y devolverlo a Cookie settings al cerrar. Fallo confirmado: Tab puede salir y Decline deja el foco en body. Cambio pendiente de aprobación.
- [x] K5 — Estado expandido, relación con navegación, Escape y retorno al botón en los 15 menús. Marcado/handlers revisados y prueba funcional con DOM simulado superada. Interacción real en viewport móvil pendiente en V1/V3.

## Estructura y orientación

- [ ] E1 — Añadir enlace para saltar al contenido principal, visible al recibir foco. Pendiente de aprobación.
- [x] E2 — Encabezados lógicos conservando estilos. Las 16 páginas publicadas tienen un h1, un main y ningún salto de nivel.
- [x] E3 — “All fields are required” en contacto, relacionado mediante aria-describedby. Texto, relación, etiquetas y validación nativa de campos vacíos comprobados.

## Feedback y movimiento

- [x] M1 — Confirmación del contacto persistente hasta cierre explícito. Eliminado el cierre automático; prueba de funciones reales con DOM simulado superada, sin enviar mensajes.
- [ ] M2 — Revisar reduced-motion en animación de cookies y scroll suave. Pendiente de aprobación.
- [x] M3 — Foco visible de 3px: azul sobre papel, blanco en footer y visores oscuros, interior en imágenes para evitar recortes. Comprobados contacto, About y galerías; revisión exhaustiva de estados pendiente en C5.

## Contenido

- [ ] A1 — Revisar equivalencia de los textos de vídeos sin voz. Proponer descripciones donde falte información visual relevante, sin añadir voz ni captions redundantes. Cambios pendientes de aprobación.
- [x] A2 — Alternativas específicas en galerías, ilustraciones y enlaces a prototipos. Imágenes inspeccionadas y alternativas publicadas comprobadas. Transcripciones completas de gráficos/tablas fuera de esta corrección.
- [ ] A3 — CV PDF: revisar etiquetas, orden, idioma y enlaces. Mejorar originales en Canva/Google Docs y verificar exportaciones. Pendiente de aprobación y acceso a originales.

## Pruebas y declaración

- [ ] V1 — Móvil, 320 CSS px y zoom 200–400%. Pendiente: este entorno no ofrece control de viewport/zoom para esta prueba.
- [ ] V2 — NVDA/VoiceOver. Autorizado, pendiente: no hay lector de pantalla real disponible. El árbol accesible no sustituye esa sesión.
- [ ] V3 — Recorridos completos de teclado. Contacto, About, nueve imágenes responsive y un visor nativo de Quick Scan comprobados en escritorio. Quedan K4 y navegación móvil real; mantener pendiente.
- [ ] V4 — Redactar declaración con resultados y limitaciones verificadas; presentar para aprobación antes de publicar.

## Evidencia y límites

- Revisión de nombres y foco: commit `f9591c144b62c52a6511b272318b5e8bbd045ba7`; despliegue Pages `37391477244`, completado correctamente.
- Publicación inicial: commit `0b513d9c75dcfe72b37a756cfcb66db0f0084ea2`; despliegue Pages `37390470253`, completado correctamente.
- Las 16 páginas publicadas revisadas: estilos actualizados, estructura, alternativas de imágenes y marcado de navegación.
- Contacto: Enter abre; Close recibe foco; Tab/Shift+Tab circulan dentro; Escape devuelve a Email me. Envío vacío activa validación nativa. No se envió ningún mensaje a Formspree.
- About: Enter/Espacio activan tarjetas manteniendo DOM y foco; modal con fondo inerte, foco contenido y retorno al disparador.
- Galería responsive: nueve aperturas con grupo/índice correctos y nueve retornos de foco. Visor nativo de Quick Scan: apertura, foco inicial y retorno con Escape.
- Los 28 scripts analizados sin errores de sintaxis. Pruebas del código con DOM simulado para modal, tarjetas, menú y confirmación superadas.
- C4 compara el color CSS del borde con píxeles del papel adyacente en una captura de escritorio con textura visible; no demuestra todos los tamaños y estados.
- No se han cubierto todos los navegadores, dispositivos, tecnologías de asistencia, niveles de zoom o estados visuales. Los pendientes anteriores siguen vigentes.
