# Entrega de Codex para revisión

Revisión del 19 de noviembre de 2026. Rama `codex/relevamiento-contenido-2026-10`. Base comparada: `origin/main` local; no se pudo actualizar remotamente antes de esta entrega. `main` local incluye los tres commits de biblioteca que todavía no están en esa referencia remota.

## Commits

- `dbe59e6`: modela en Blender una biblioteca más angosta con el nombre institucional completo.
- `d1402f1`: integra biblioteca 3D, catálogo accesible y lectura opcional de Payload.
- `fff7490`: documenta biblioteca, mantenimiento y verificación previa.
- `25a28cb`: agrega tres novedades y documenta el primer relevamiento.
- `4821558`: actualiza el estado del relevamiento.
- `906eb32`: agrega cinco novedades, entrevistas radiales y redirecciones.
- `aad4ada`: documenta propuesta de presentación y quita notas internas visibles en el Simposio.
- El commit que contiene este archivo se identifica mediante `git log -1` (su hash no puede incluirse en su propio contenido).

## Biblioteca

El libro de respaldo es «Nuevos Paradigmas para la Justicia Penal», datos existentes en `src/lib/publicaciones/{es,en,fr}.ts`, consumidos por `getLibroNuevosParadigmas`. La fotografía existente muestra a las compiladoras y no se usa como portada. Los libros web son objetos generados a partir de datos; agregar uno no requiere modificar Blender.

`src/lib/publicaciones/bookshelf.ts` consulta la colección existente `publicaciones` mediante Payload, con relaciones a `media` y `autores`; acepta documentos publicados y usa caché. Se requieren `DATABASE_URI` y `PAYLOAD_SECRET` para intentar esa lectura. Si faltan o falla la consulta, se muestra el libro curado. La implementación no añadió colecciones ni migraciones de base de datos. El resto de las páginas editoriales sigue usando archivos curados, no sincronización automática con WordPress. Más detalle en `docs/BOOKSHELF-3D.md`.

## Cuatro PDF pendientes

El censo anterior identificó estos medios huérfanos en WordPress. No se guardaron las URL directas `source_url`; las URL REST siguientes identifican exactamente el registro fuente, pero sus respuestas no pudieron verificarse en esta sesión. No se debe inventar la ruta del archivo.

- `Como_elige_un_delincuente_a_sus_victima-2`, ID 24667: https://ivujus.org.ar/wp-json/wp/v2/media/24667 — obra de terceros con aviso de derechos; sin autorización de publicación confirmada.
- `2017-Politicas-publicas-2ed-1`, ID 24664: https://ivujus.org.ar/wp-json/wp/v2/media/24664 — obra de terceros con aviso de derechos; autorización pendiente.
- `Laguna-Hermida, Manual-de-Victimologia`, ID 24663: https://ivujus.org.ar/wp-json/wp/v2/media/24663 — obra de terceros con aviso de derechos; autorización pendiente.
- `Leyes-de-victimas-en-Argentina-1`, ID 24430: https://ivujus.org.ar/wp-json/wp/v2/media/24430 — material de referencia del curso; no se confirmó su publicación como pieza institucional.

## Rutas revisadas el 9 de noviembre

Todas respondieron HTTP 200 tras reiniciar el servidor local. Antes del reinicio algunas devolvieron HTTP 500 por un error JSON del proceso de desarrollo; no se identificó causa definitiva. La comprobación fue HTTP, no validación integral de interacción ni de enlaces externos.

`/es`, `/es/instituto`, `/es/instituto/estatuto`, `/es/instituto/consejo-directivo`, `/es/instituto/comite-cientifico`, `/es/formacion`, `/es/formacion/diplomatura`, `/es/formacion/ciclos`, `/es/publicaciones`, `/es/publicaciones/libros`, `/es/publicaciones/dossiers`, `/es/publicaciones/declaraciones`, `/es/novedades`, `/es/simposios`, `/es/simposios/2026-buenos-aires`, `/es/simposios/encuentros`, `/es/contacto`, `/es/terms-privacy`, `/en/formacion/diplomatura`, `/fr/publicaciones/dossiers`.

## Fuentes y límites

El relevamiento del 11 de octubre consultó la API pública y HTML de https://ivujus.org.ar/wp-json/wp/v2/ y las páginas https://ivujus.org.ar/, https://ivujus.org.ar/nosotros/, https://ivujus.org.ar/campus-virtual/, https://ivujus.org.ar/capacitacion-y-actividades/, https://ivujus.org.ar/entrevistas-en-la-radio/, https://ivujus.org.ar/simposio-2026/, https://ivujus.org.ar/blog/, https://ivujus.org.ar/contacto/ y https://ivujus.org.ar/terms-privacy/. Detalle por ID y destino: `docs/RELEVAMIENTO-CONTENIDO-2026-10.md` y fuentes citadas en los datasets. También se consultó el inventario reservado del repositorio de Usina.

El 9 de noviembre se consultaron resultados indexados de las páginas públicas y la ficha https://ivujus.org.ar/producto/curso-las-leyes-de-las-victimas-en-el-marco-de-la-victimologia-particulares/; la API no respondió desde el entorno. No se pudo confirmar el estado actual completo del inventario, las URL directas de los cuatro PDF, la vigencia de precios y cifras, el acceso a https://usinadejusticiacampus.org.ar, el flujo real de pago o login, ni la entrega del formulario de contacto. La ficha mostraba promoción vencida; la página de Campus mostraba 0 certificados frente a 500 en el sitio nuevo por una decisión editorial anterior a estos commits. El formulario nuevo se declara maqueta en su código.

## Cambios de contenido y trazabilidad

Se agregaron las entradas WordPress 24785, 24773 y 24768; después 24526, 24523, 24540, 24509 y 24493, en español, inglés y francés. Antes no figuraban en el dataset local; ahora figuran con los textos, imágenes y enlaces que se detallan en los diffs. Se agregó el ciclo de entrevistas radiales con tres videos. Se añadieron redirecciones históricas, sin cambiar el WordPress público. Se quitaron dos notas internas visibles que pedían reservar fotografías en ES/EN/FR; ahora no aparecen. La biblioteca pasó de presentación editorial del libro a escena 3D con ficha y lista accesible; el contenido curado anterior se conserva en `LegacyBookPage.tsx`. El mueble pasó de 4,51 m a 2,31 m y de la inscripción IVUJUS al nombre institucional completo. No se cambiaron las cifras de la Diplomatura en estos commits.

Para revisar cada valor anterior y nuevo, incluidos textos íntegros, imágenes y URLs, usar `git diff origin/main..codex/relevamiento-contenido-2026-10 -- src/lib/novedades src/lib/formacion src/lib/simposio2026 src/lib/publicaciones` y `git show` por commit. El inventario y motivos por archivo se incluyen abajo.

## Comprobaciones del 19 de noviembre

- `bun run typecheck`: correcto, salida 0.
- `bun run check:i18n`: correcto, 8 datasets y 3 idiomas, salida 0.
- `bun run build`: falló, salida 1. `next/font` no pudo descargar Cinzel y Montserrat desde `fonts.googleapis.com` por fallo de conexión. No se modificó el código para ocultar el problema. Las comprobaciones se iniciaron en paralelo.
- El inventario inicial mostró árbol limpio y `git stash list` vacío. No se encontraron archivos nuevos sin seguimiento que se deban incluir; `.env.example` ya estaba versionado. No se agregan credenciales ni bases locales.

## Archivos y motivos

El siguiente inventario se genera contra `origin/main` local e incluye el estado de creación/modificación y el commit que explica cada archivo. `docs/HANDOFF-CODEX.md` se agregó para esta entrega.

- `.gitignore` (modificado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `assets/blender/ivujus-bookshelf.blend` (creado): dbe59e6 feat(biblioteca): modela estantería compacta con nombre institucional.
- `bun.lock` (modificado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `docs/BOOKSHELF-3D-ESTADO.md` (creado): fff7490 docs(biblioteca): documenta mantenimiento y validación de la entrega.
- `docs/BOOKSHELF-3D.md` (creado): fff7490 docs(biblioteca): documenta mantenimiento y validación de la entrega.
- `docs/DECISION-PRESENTACION-ALCANCE-IVUJUS.md` (creado): aad4ada docs: consolida alcance de presentacion IVUJUS.
- `docs/ESTADO.md` (modificado): aad4ada docs: consolida alcance de presentacion IVUJUS; 906eb32 feat: completa el relevamiento editorial de IVUJUS; 4821558 docs: actualiza estado del relevamiento de IVUJUS.
- `docs/RELEVAMIENTO-CONTENIDO-2026-10.md` (creado): 906eb32 feat: completa el relevamiento editorial de IVUJUS; 25a28cb feat: incorpora novedades actuales de IVUJUS.
- `next.config.ts` (modificado): 906eb32 feat: completa el relevamiento editorial de IVUJUS; 25a28cb feat: incorpora novedades actuales de IVUJUS.
- `package.json` (modificado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `public/models/ivujus-bookshelf-poster.webp` (creado): dbe59e6 feat(biblioteca): modela estantería compacta con nombre institucional.
- `public/models/ivujus-bookshelf.glb` (creado): dbe59e6 feat(biblioteca): modela estantería compacta con nombre institucional.
- `scripts/check-bookshelf.ts` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/app/(frontend)/[locale]/layout.tsx` (modificado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/app/(frontend)/[locale]/publicaciones/libros/[slug]/page.tsx` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/app/(frontend)/[locale]/publicaciones/libros/page.tsx` (modificado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/app/(frontend)/[locale]/publicaciones/page.tsx` (modificado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/editorial/bookshelf/BlenderShelf.tsx` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/editorial/bookshelf/Book3D.tsx` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/editorial/bookshelf/BookCover.tsx` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/editorial/bookshelf/BookDetailPanel.tsx` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/editorial/bookshelf/BookMetadata.tsx` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/editorial/bookshelf/BookshelfCanvas.tsx` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/editorial/bookshelf/BookshelfExperience.tsx` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/editorial/bookshelf/BookshelfFallback.tsx` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/editorial/bookshelf/BookshelfScene.tsx` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/editorial/bookshelf/BookshelfToolbar.tsx` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/editorial/bookshelf/CameraRig.tsx` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/editorial/bookshelf/DecorativeBooks.tsx` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/editorial/bookshelf/LegacyBookPage.tsx` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/editorial/bookshelf/book-texture.ts` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/editorial/bookshelf/bookshelf.module.css` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/editorial/bookshelf/types.ts` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/ui/Buttons.tsx` (modificado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/components/ui/ThemeSwitcher.tsx` (modificado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/lib/formacion/en.ts` (modificado): 906eb32 feat: completa el relevamiento editorial de IVUJUS.
- `src/lib/formacion/es.ts` (modificado): 906eb32 feat: completa el relevamiento editorial de IVUJUS.
- `src/lib/formacion/fr.ts` (modificado): 906eb32 feat: completa el relevamiento editorial de IVUJUS.
- `src/lib/novedades/en.ts` (modificado): 906eb32 feat: completa el relevamiento editorial de IVUJUS; 25a28cb feat: incorpora novedades actuales de IVUJUS.
- `src/lib/novedades/es.ts` (modificado): 906eb32 feat: completa el relevamiento editorial de IVUJUS; 25a28cb feat: incorpora novedades actuales de IVUJUS.
- `src/lib/novedades/fr.ts` (modificado): 906eb32 feat: completa el relevamiento editorial de IVUJUS; 25a28cb feat: incorpora novedades actuales de IVUJUS.
- `src/lib/novedades/types.ts` (modificado): 906eb32 feat: completa el relevamiento editorial de IVUJUS; 25a28cb feat: incorpora novedades actuales de IVUJUS.
- `src/lib/publicaciones/bookshelf-copy.ts` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/lib/publicaciones/bookshelf-layout.ts` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/lib/publicaciones/bookshelf-normalize.ts` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/lib/publicaciones/bookshelf-seo.ts` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/lib/publicaciones/bookshelf.ts` (creado): d1402f1 feat(publicaciones): integra biblioteca 3D y catálogo accesible.
- `src/lib/simposio2026/en.ts` (modificado): aad4ada docs: consolida alcance de presentacion IVUJUS.
- `src/lib/simposio2026/es.ts` (modificado): aad4ada docs: consolida alcance de presentacion IVUJUS.
- `src/lib/simposio2026/fr.ts` (modificado): aad4ada docs: consolida alcance de presentacion IVUJUS.
- `tools/blender/generate_ivujus_bookshelf.py` (creado): dbe59e6 feat(biblioteca): modela estantería compacta con nombre institucional.
