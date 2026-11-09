# Decisión de presentación y alcance del nuevo sitio IVUJUS

**Revisión:** 9 de noviembre de 2026  
**Rama:** `codex/relevamiento-contenido-2026-10`  
**Servidor local:** <http://127.0.0.1:3000/es>

## Decisión ejecutiva

Presentar el sitio nuevo como la sede institucional y editorial del IVUJUS. Mantener el WordPress/Campus como sistema de cursada y comercio: cuentas, inscripciones, pagos, carrito, clases, evaluaciones, certificados y soporte. La página nueva de la Diplomatura explica la oferta y deriva al Campus; no reemplaza el LMS.

No retirar el sitio público actual ni cambiar el dominio hasta confirmar el destino del acceso al Campus, la gestión cotidiana del contenido, el formulario de contacto y los datos comerciales del curso.

## Qué mostrar como parte del sitio nuevo

| Área | Estado local | Decisión de presentación |
|---|---|---|
| Inicio e identidad | Presenta al Instituto de Victimología de Usina de Justicia y organiza las secciones del sitio. | Presentar como nueva puerta institucional. |
| Instituto | Instituto, Estatuto, Consejo Directivo y Comité Científico. | Presentar como reemplazo ordenado del contenido institucional que WordPress concentraba en páginas extensas. |
| Formación | Landing de la Diplomatura y archivo de 13 ciclos, jornadas y actividades, incluidas las entrevistas radiales. | Presentar la información pública y enlazar la cursada al Campus. |
| Publicaciones | Biblioteca 3D con un título editorial cargado en el modo local actual, tres dossiers y la Declaración de Buenos Aires. | Presentar la experiencia visual, el libro y los tres dossiers; aclarar que ampliar el catálogo es una carga editorial/CMS, no un trabajo de Blender. |
| Eventos | Archivo del Simposio 2026 con programa de dos jornadas, videos, galería, prensa y Declaración; además, tres encuentros y conferencias. | Presentar como archivo académico del Simposio ya realizado y de las otras actividades. |
| Novedades | 14 entradas locales, incluida la actualización del 9 de octubre de 2026 sobre Hilda Marchiori. | Presentar como archivo editorial vigente según el último censo de WordPress documentado. |
| Contacto y privacidad | Rutas nuevas disponibles. | Mostrar el correo directo y la política; no anunciar el formulario como canal activo hasta conectarlo. |

El censo del 11 de octubre documentó 20 páginas publicadas, 14 entradas y cinco categorías en el WordPress. Las tres páginas históricas de formación se consolidaron en las nuevas landings; las 19 notas reservadas desde el repositorio de Usina y las tres páginas acordadas tienen destino en Formación, Eventos, Publicaciones o Simposio. No se importaron en bloque las 37 candidatas del anexo.

## Qué debe seguir en WordPress/Campus

- Registro e inicio de sesión de cursantes.
- Tienda, producto, carrito, checkout, pagos, cupones y pedidos.
- Acceso a módulos, videos de cursada, cuestionarios, progreso y certificados.
- FAQ operativa, recuperación de contraseña y soporte de compras/cuentas.
- Gestión de inscripciones y datos históricos del alumnado.

El WordPress público actual enlaza desde su página de Campus a esas funciones. El sitio nuevo debe ofrecer descripción, programa descargable y una llamada clara a la acción; la operación académica y comercial se conserva en el Campus.

## Pendientes antes de presentar como listo para publicar

1. **Confirmar el acceso al Campus.** El código nuevo apunta a `usinadejusticiacampus.org.ar`; el destino no se pudo validar desde esta revisión. La página WordPress existente sigue presentando su botón de ingreso junto con enlaces a tienda y preguntas frecuentes. Confirmar cuál es la URL canónica y probar inicio de sesión y compra antes de cambiar enlaces o dominio.
2. **Validar las cifras de la Diplomatura.** La página nueva muestra 500 inscriptos y 500 certificados por una decisión editorial previa. La página pública de WordPress consultada muestra 500 inscriptos y 0 certificados, y una valoración de 9,7/10. Confirmar la cifra de certificados y su fecha de corte; no presentarla como dato actualizado hasta resolver la diferencia.
3. **Actualizar precio y promoción en el Campus.** La ficha pública consultada informa $190.000 y una promoción cuyo vencimiento fue el 31 de julio de 2026. No trasladar ese precio ni esa promoción al sitio nuevo sin confirmación vigente.
4. **Resolver el formulario de contacto.** El formulario de la página nueva es una maqueta sin envío; el correo directo sí funciona como vía de contacto. Antes del lanzamiento, conectar el formulario o dejar visible únicamente el contacto por correo.
5. **Elegir la fuente de edición.** El contenido de las páginas institucionales está curado en archivos del proyecto y no se sincroniza con WordPress. Hay colecciones de Payload definidas, pero esta instancia local no tiene `DATABASE_URI` ni `PAYLOAD_SECRET`; el catálogo editorial vuelve a un único libro curado. Acordar si se conectará el WordPress existente como CMS, o si se habilitará Payload y se migrará la carga. No prometer todavía que Emanuel podrá editar todo desde el WordPress actual.
6. **Completar el Observatorio cuando existan insumos.** Las noticias sobre el Índice Legislativo están en Novedades, pero aún no hay una sección de índice con datos canónicos, series estadísticas y aplicación de sentencias confirmadas. No presentarla como una herramienta terminada.
7. **Dejar fuera los archivos sin aprobación.** Cuatro PDFs huérfanos de la biblioteca de medios —tres obras de terceros y un material de referencia— y un programa antiguo no se publican hasta confirmar derechos, vigencia y autoría.
8. **Verificar los redireccionamientos en producción.** La matriz local cubre las rutas antiguas de WordPress; después de definir el dominio y alojamiento habrá que comprobar que cada permalink histórico llegue a la nueva ruta correspondiente.
9. **Pulir el video complementario del Simposio.** Una nota todavía imprime la URL del video individual de Franco Fiumara como texto. Antes de presentar la página, conviene mostrarla como enlace o video integrado.

## Guion sugerido para la presentación

1. Inicio: propósito del Instituto y navegación nueva.
2. Instituto: autoridades, Comité Científico y Estatuto.
3. Publicaciones: libro, dossiers y Declaración, destacando que el catálogo crecerá como contenido editorial.
4. Eventos: archivo del Simposio, programa, videos y cobertura.
5. Formación: presentación de la Diplomatura, programa y enlace al Campus externo.
6. Novedades y vista móvil.

Presentar el alcance editorial y visual como la propuesta del nuevo IVUJUS. Presentar la publicación en producción como pendiente de los puntos 1-5 y 8-9. En esta revisión, las 20 rutas locales consultadas respondieron HTTP 200 después de reiniciar el servidor.

## Fuentes

- [Inicio actual de IVUJUS](https://ivujus.org.ar/)
- [Campus Virtual actual](https://ivujus.org.ar/campus-virtual/)
- [Ficha actual de la Diplomatura](https://ivujus.org.ar/producto/curso-las-leyes-de-las-victimas-en-el-marco-de-la-victimologia-particulares/)
- [Programa oficial de la Diplomatura (PDF)](https://ivujus.org.ar/wp-content/uploads/2025/09/Diplomatura.pdf)
- [Simposio 2026 y archivo público](https://ivujus.org.ar/simposio-2026/)
- Inventario WordPress y decisiones de migración: [`RELEVAMIENTO-CONTENIDO-2026-10.md`](./RELEVAMIENTO-CONTENIDO-2026-10.md), [`MIGRATION-MATRIX.md`](./MIGRATION-MATRIX.md) y [`CONTENT-MIGRATION-LEDGER.md`](./CONTENT-MIGRATION-LEDGER.md).
