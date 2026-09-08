# Estado de la entrega — 7 de septiembre de 2026

La biblioteca fue remodelada en Blender: 2,31 m de ancho (antes 4,51 m),
cinco niveles y placa con «Instituto de Victimología de Usina de Justicia».
El modelo editable, GLB y póster están guardados en el repositorio.

La adaptación visual pasó la revisión independiente (`disposition: ship`)
y la comprobación en navegador a 360, 390, 430 y 1440 px, sin desbordamiento
horizontal ni errores de consola. Selección, Escape, teclado, foco restaurado
y reduced motion pasaron. También se comprobaron dos publicaciones sintéticas,
paginación con 101, catálogo sin JavaScript, GLB bloqueado y pérdida simulada
del contexto WebGL. Los datos sintéticos y su ruta de prueba fueron retirados.

El cierre técnico se reanudó al volver a estar disponibles los comandos:
lint pasó sin errores (cuatro warnings preexistentes), i18n verificó ocho
datasets en tres idiomas, las catorce comprobaciones de biblioteca pasaron
y el build de producción terminó correctamente. Se verificó en navegador
que, tras bloquear el GLB, el botón «Volver a abrir la biblioteca» recupera
la escena al restablecer la carga. El bloqueo anterior por créditos quedó
superado; ya no representa un pendiente de validación.

Falta verificar la conexión a una base Payload real. La biblioteca actualmente
utiliza el respaldo editorial curado si no está configurado el CMS. Ese
respaldo incorpora el libro Nuevos Paradigmas; los tres dossiers ya presentes
en la rama y en main siguen en su página propia y todavía no entran a la
estantería. El modelo de datos y el generador de libros ya admiten dossiers,
coediciones, capítulos y artículos, sin nuevas operaciones en Blender.

Vista móvil local: http://127.0.0.1:3000/__bookshelf-qa/mobile.html

Ruta del producto: http://127.0.0.1:3000/es/publicaciones/libros

Dossiers existentes: http://127.0.0.1:3000/es/publicaciones/dossiers
