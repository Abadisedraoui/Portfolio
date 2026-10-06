# Checklist de accesibilidad

Actualizada: 6 de octubre de 2026 (UTC), tras aprobación de las V y A1.
Cambios aprobados publicados en https://zainababadi.com/. Revisión K4, E1 y M2:
`a4f7d3362ae1b6a6ef306f402e5c5f8744e53c1f`.

La revisión V1–V3/C5 fue de lectura. Después de la aprobación, C5.1 se ha
aplicado y comprobado en la web: hover `#355F9C` para los dos enlaces de empresas
en About. Se conserva el azul normal `#234D8D` y el resto del diseño.

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
- [ ] C5 — Revisión de contraste sobre texturas, aguadas y estados hover/focus. Comprobaciones de escritorio realizadas y ajuste C5.1 resuelto; queda ampliar tamaños/estados. No cerrar como conformidad completa.
  - [x] Colores base: revisadas 1.241 muestras de texto visible en las 16 páginas, componiendo transparencias. Superan el umbral AA correspondiente sobre el color base CSS. Este cálculo no incluye por sí solo texturas o gradientes.
  - [x] Muestras de papel renderizado: comprobados texto, bordes y foco del contacto; texto y enlaces del banner de cookies; footer y estados representativos de navegación. Las muestras medidas superan sus umbrales. No equivalen a una medición de cada píxel o estado del sitio.
  - [x] C5.1 — Hover de “Oxford University Press” y “Plytix” en About. Ajuste aprobado, publicado y comprobado: color de texto y subrayado del hover de `#3E6FB3` a `#355F9C`. Sobre la muestra de papel adyacente `#E1E0E5`, el contraste pasa de 3,87:1 a 4,89:1. Estos enlaces de 16px en negrita requieren 4,5:1 (WCAG 1.4.3, AA). El azul normal `#234D8D` mantiene 6,35:1 en esa muestra. Se conservan forma, textura, tipografía, distribución y resto de azules.

## Teclado y ventanas

- [x] K1 — About: foco inicial en Close, Tab/Shift+Tab dentro del modal, fondo inerte, Escape y devolución a Expand cards. Comprobado en la web.
- [x] K2 — Tarjetas de About con botones nativos, Enter y Espacio, conservando orden del DOM y foco. Nombres accesibles separados correctamente entre líneas. Desactivadas en el diseño móvil estático; revisión visual móvil pendiente en V1.
- [x] K3 — Nueve imágenes responsive: Enter/Espacio abren el grupo y posición correctos; Escape devuelve el foco a la imagen. Las nueve comprobadas.
- [x] K4 — Cookies como diálogo no modal: Tab sigue el orden natural y el fondo permanece accesible. Al cerrar desde el banner, el foco vuelve al disparador sin desplazar la página; se conserva al recargar tras retirar un consentimiento previo. Pruebas con DOM simulado superadas. En Quick Scan publicado, comprobados Tab libre, retorno a Cookie settings y conservación del desplazamiento al cerrar con Decline; aceptar y retirada con recarga se probaron con DOM simulado.
- [x] K5 — Estado expandido, relación con navegación, Escape y retorno al botón en los 15 menús. Marcado/handlers revisados y prueba funcional con DOM simulado superada. Interacción real en viewport móvil pendiente en V1/V3.

## Estructura y orientación

- [x] E1 — “Skip to main content” en las 16 páginas actuales con navegación repetida; aparece solo con foco de teclado y apunta al main enfocable. La entrada de selección de modo no tiene navegación repetida. Marcado y destino comprobados en las 15 páginas iniciales y en la nueva declaración. En Quick Scan, primer Tab muestra el enlace, Enter enfoca main y siguiente Tab alcanza Human CV; el enlace vuelve a ocultarse al perder foco. En la declaración, primer Tab y Enter también enfocan main correctamente.
- [x] E2 — Encabezados lógicos conservando estilos. Las 16 páginas iniciales y la nueva declaración (17 en total) tienen un h1, un main y ningún salto de nivel.
- [x] E3 — “All fields are required” en contacto, relacionado mediante aria-describedby. Texto, relación, etiquetas y validación nativa de campos vacíos comprobados.

## Feedback y movimiento

- [x] M1 — Confirmación del contacto persistente hasta cierre explícito. Eliminado el cierre automático; prueba de funciones reales con DOM simulado superada, sin enviar mensajes.
- [x] M2 — Con “reducir movimiento”, los 23 desplazamientos programados pasan a ser inmediatos y el corazón aparece estático, sin puntitos amarillos, hasta su retirada a los 2,6 segundos. Sin esa preferencia, se mantienen el scroll suave y la animación original del corazón. Ramas de scroll probadas y reglas CSS publicadas verificadas en el navegador, incluidas las dos hojas usadas por las distintas páginas. Animación habitual del corazón comprobada; no se ha activado la preferencia del sistema en un dispositivo real.
- [x] M3 — Foco visible de 3px: azul sobre papel, blanco en footer y visores oscuros, interior en imágenes para evitar recortes. Comprobados contacto, About y galerías; revisión exhaustiva de estados pendiente en C5.

## Contenido

- [x] A1 — Descripciones textuales aprobadas para los vídeos sin voz. Revisadas secuencias de los 10 archivos usados y sus pistas de audio: una no contiene audio y las nueve restantes son silenciosas en el análisis (−91 dB). Añadidas descripciones equivalentes a las 14 apariciones publicadas y a la aparición guardada en el template pausado de Educational Platform, sin reactivar ese bloque. Los captions visibles se conservan exactamente. Cada vídeo tiene nombre y relación con su descripción mediante aria-describedby; las descripciones permanecen en el árbol accesible sin ocupar espacio visual. Comprobación con lector de pantalla real pendiente en V2.
- [x] A2 — Alternativas específicas en galerías, ilustraciones y enlaces a prototipos. Imágenes inspeccionadas y alternativas publicadas comprobadas. Transcripciones completas de gráficos/tablas fuera de esta corrección.
- [ ] A3 — CV PDF: revisar etiquetas, orden, idioma y enlaces. Mejorar originales en Canva/Google Docs y verificar exportaciones. Pendiente de aprobación y acceso a originales.

## Pruebas y declaración

Aprobadas las V con sus límites. La aprobación permite aceptar la revisión previa y publicar una declaración honesta; no convierte una evaluación del código en una prueba de dispositivo o lector de pantalla.

- [ ] V1 — Móvil, 320 CSS px y zoom 200–400%. Revisión de código aceptada con sus límites; pendiente de prueba real: este entorno no ofrece control de viewport; el atajo de zoom probado no cambió el tamaño ni la escala observados. No se ha validado el diseño móvil o el reflow a esos tamaños.
- [ ] V2 — NVDA/VoiceOver. Revisión previa aceptada con sus límites; pendiente de sesión con lector de pantalla real. Revisión previa de estructura, nombres y relaciones accesibles realizada en las 16 páginas; etiquetas del contacto y nombre del diálogo About comprobados. El árbol accesible no sustituye esa sesión.
- [ ] V3 — Recorridos completos de teclado. Escritorio completado en las 16 páginas: orden de Tab, foco visible y llegada a footer/Back to top, o a las dos opciones del index. Los siete vídeos del walkthrough permiten continuar a los siguientes controles y salir al footer; no se observó bloqueo. Contacto y About: foco contenido, Escape y retorno al disparador comprobados de nuevo. Cookies: apertura y cierre comprobados; las pruebas previas de Tab libre y retorno siguen registradas en K4. Nueve imágenes responsive y visor de Quick Scan ya comprobados. La usuaria aprueba el recorrido de escritorio y su alcance. Queda menú/navegación en viewport móvil real; mantener V3 pendiente.
- [x] V4 — Declaración de accesibilidad aprobada con el alcance explicado. Creada en accessibility.html, con enlace Accessibility en los footers, estilo existente y fecha de revisión. Explica mejoras, comprobaciones y pruebas pendientes; no afirma conformidad WCAG completa.

## Evidencia y límites

- A1/V4 aprobadas y publicadas: commit `d2a9010fa52da200b5157bf2c3679e6a63f423e0`, despliegue Pages `37451262308`, build y deploy completados correctamente. Comprobadas las cuatro páginas que muestran los 14 vídeos activos: todos tienen su descripción en el árbol accesible, asociada mediante aria-describedby; los párrafos se recortan a 1 × 1 px y no usan display:none. Los captions originales se compararon y permanecen idénticos. La aparición adicional en el template pausado tiene descripción preparada, sin reactivar el bloque. La declaración https://zainababadi.com/accessibility.html se abrió desde el nuevo enlace del footer; comprobados encabezados, salto al main con teclado y footer. No se observó desbordamiento horizontal en estas cinco páginas al tamaño de escritorio. Esta comprobación del árbol accesible no sustituye una sesión con NVDA/VoiceOver. Captura completa guardada de la declaración.

- Revisión V1–V3/C5, 6 de octubre: navegador de escritorio con viewport de 1.363 × 936 CSS px y DPR 1. No se han cambiado HTML/CSS/JS ni enviado formularios. Se revisaron 16 páginas y 1.256 muestras de texto; se excluyeron 15 enlaces de salto ocultos fuera de pantalla de la medición normal (1.241 restantes). Las imágenes y PDF incrustados requieren su revisión de contenido independiente en A1/A3.

- C5.1: CSS publicado en commit `3830a916aa6c20ce2ab2add094c52d97f77b7296`; versión del estilo en About actualizada en `493159fba6f78f3457ca8371b3e1cc8d6de291eb` para evitar servir la copia anterior en caché. Despliegue Pages `37448494155`, build y deploy completados correctamente. Comprobados con el cursor los dos enlaces en la web: estado `:hover` activo, texto y subrayado `rgb(53, 95, 156)`; estado normal `rgb(35, 77, 141)`. Captura guardada del estado hover de Plytix. Las proporciones usan la muestra sin letras inmediatamente encima de ambos enlaces registrada en la auditoría; no certifican todas las zonas de papel.

- Contacto con aguada asentada: muestras de contraste de etiquetas 5,15:1 o más, bordes 3,17:1 o más y foco azul 3,65:1 o más. Banner de cookies con aguada asentada: texto 10,12:1, enlace Privacy Policy 5,51:1 y foco 3,36:1 o más en la muestra. Hover de navegación sobre papel más blanco: 4,72:1 o más en las muestras. Estas cifras comparan los colores CSS con píxeles de fondo adyacentes de capturas JPEG; son mediciones representativas, sujetas a la ubicación del muestreo y la compresión.

- Referencias: WCAG 1.4.3 [Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html), 4,5:1 para texto normal y 3:1 para texto grande; WCAG 1.4.11 [Non-text Contrast](https://www.w3.org/WAI/WCAG22/understanding/non-text-contrast.html), 3:1 para información visual necesaria de controles y estados.

- Revisión posterior de regresiones: los scripts del footer seguían buscando `h4` tras el cambio a encabezados accesibles. Corregidas las dos rutinas para restaurar FIND ME (Email me, LinkedIn, GitHub, Behance) y MORE (Review me, Privacy Policy, Cookie settings). También restaurada la regla del título de la sección adicional del walkthrough y actualizadas las referencias de estilos de tarjetas. Se conservan los niveles accesibles. El fallo de foco K4 se corrige en esta revisión aprobada, manteniendo el banner no modal.

- Publicación K4/E1/M2: commit `a4f7d3362ae1b6a6ef306f402e5c5f8744e53c1f`, despliegue Pages `37441689470`, completado correctamente. Las 16 páginas cargan el script nuevo y las 15 con navegación tienen el enlace de salto. Footer correcto en las 15: FIND ME, LOCATION y MORE; sin desbordamiento horizontal ni imágenes visibles rotas en esta revisión de escritorio.

- K4/E1/M2: pruebas aisladas del código con ambos valores de preferencia de movimiento; ninguna petición de analítica ni envío de contacto durante estas pruebas. El corazón conserva su función y temporizador originales; las reglas de movimiento reducido están en las dos hojas que usan las distintas páginas.

- Revisión de nombres y foco: commit `f9591c144b62c52a6511b272318b5e8bbd045ba7`; despliegue Pages `37391477244`, completado correctamente.
- Publicación inicial: commit `0b513d9c75dcfe72b37a756cfcb66db0f0084ea2`; despliegue Pages `37390470253`, completado correctamente.
- Las 16 páginas publicadas revisadas: estilos actualizados, estructura, alternativas de imágenes y marcado de navegación.
- Contacto: Enter abre; en la revisión actual, tras la apertura el foco inicial llega al campo de nombre. Tab recorre email, mensaje, Send, Privacy Policy, Close y vuelve a nombre; permanece dentro. Escape devuelve a Email me. Envío vacío comprobado en la revisión anterior mediante validación nativa. No se envió ningún mensaje a Formspree.
- About: Enter/Espacio activan tarjetas manteniendo DOM y foco; modal con fondo inerte, foco contenido y retorno al disparador.
- Galería responsive: nueve aperturas con grupo/índice correctos y nueve retornos de foco. Visor nativo de Quick Scan: apertura, foco inicial y retorno con Escape.
- Los 28 scripts analizados sin errores de sintaxis. Pruebas del código con DOM simulado para modal, tarjetas, menú y confirmación superadas.
- C4 compara el color CSS del borde con píxeles del papel adyacente en una captura de escritorio con textura visible; no demuestra todos los tamaños y estados.
- No se han cubierto todos los navegadores, dispositivos, tecnologías de asistencia, niveles de zoom o estados visuales. Los pendientes anteriores siguen vigentes.
