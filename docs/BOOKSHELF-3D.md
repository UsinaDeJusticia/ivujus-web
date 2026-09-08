# Biblioteca académica 3D de IVUJUS

Implementación en `feat/interactive-3d-library`, integrada en
`/[locale]/publicaciones/libros`. Conserva la identidad activa de
`globals.css`: azul institucional, dorado, Cinzel, Montserrat y los tres temas.

## Arquitectura y contenido

```text
Payload Publicaciones + respaldo editorial curado existente
  → getBookshelfPublications() en el servidor
  → normalización a BookViewModel[]
  → página Server Component con metadata y JSON-LD
  → BookshelfExperience (controles y catálogo HTML prerenderizado)
  → import dinámico de BookshelfCanvas
  → escenario GLB + libros creados por React Three Fiber
  → ficha editorial HTML y rutas individuales
```

`src/lib/publicaciones/bookshelf.ts` utiliza Payload Local API directamente,
con `overrideAccess: false`, `draft: false`, selección de campos y páginas de
100 documentos. No realiza HTTP contra la propia aplicación. Los documentos
solo entran al catálogo si `estado=publicado` y `_status=published`.

La consulta se guarda cinco minutos en `unstable_cache`, con tags para
Publicaciones, Media y Autores. Los hooks existentes invalidan esos tags.
La aplicación no escribe contenido en el CMS ni modifica su schema.

Los títulos y subtítulos bibliográficos se leen en español, sin traducción
automática de nombres de obras. Los resúmenes utilizan el locale solicitado;
si una obra requiere revisión de autor, solo se muestran traducciones
marcadas como revisadas o publicadas. ES, EN y FR tienen el mismo contrato
de textos de interfaz, en `bookshelf-copy.ts`.

### Transición del contenido curado

El catálogo existente conserva `getLibroNuevosParadigmas()`. No se crea otro
dataset editorial ni se importan categorías reservadas para Usina.
El adaptador reutiliza título, subtítulo, párrafos, autoría y fuentes. Un
documento de CMS prevalece por slug, ISBN o título normalizado. Los slugs
existentes en CMS, incluso retirados, suprimen el respaldo curado para no
volver a publicar una obra archivada.

Sin `DATABASE_URI` o `PAYLOAD_SECRET`, o ante un error de consulta, se utiliza
el respaldo curado. El estado real de esta copia del repositorio ofrece una
obra curada; no se inventaron publicaciones adicionales para llenar la escena.

`coverImage` en ese dataset es una fotografía de las compiladoras, no una
portada. Se mantiene en la página editorial original y se omite como textura.
La fecha del dataset corresponde al anuncio; no se utiliza como año editorial
sin evidencia adicional. El catálogo genera una cubierta tipográfica en ese caso.

### BookViewModel

Contiene `id`, `slug`, `title`, `subtitle`, `authors`, `authorsLabel`, `year`,
`publisher`, `isbn`, `doi`, `summary`, `coverUrl`, `type`, `href` y `links`.
Los campos ausentes permanecen ausentes. Las relaciones no pobladas se
omiten; los objetos de Payload y sus campos internos no cruzan al cliente.
Los enlaces admiten HTTP(S) y rutas locales, excluyendo protocolos ejecutables.

Los tipos admitidos son libro, coedición, capítulo, artículo científico y
dossier. El JSON-LD distingue `Book`, `Chapter`, `ScholarlyArticle` y
`CreativeWork`. La lista utiliza `ItemList` y cada obra tiene una URL propia.
El serializador escapa `<` para impedir que el contenido cierre el script.

## Blender y asset

- Generador: `tools/blender/generate_ivujus_bookshelf.py`.
- Fuente: `assets/blender/ivujus-bookshelf.blend` (723.421 bytes).
- Asset web: `public/models/ivujus-bookshelf.glb` (659.960 bytes).
- Póster de carga: `public/models/ivujus-bookshelf-poster.webp`.
- Render de trabajo: `output/blender/ivujus-bookshelf-preview.png`, no versionado.

Se ejecutó Blender 5.1.2 instalado en Windows, mediante CLI y `bpy`, incluyendo
un render Cycles y exportación real. Se intentó iniciar el conector de computer
use; su kernel falló por `apply deny-read ACLs`. No se operó con éxito la UI y
no se modificó la escena ajena abierta sin guardar.

El generador crea una escena propia, sin borrar escenas previas. Separa
`IVU_Export`, `IVU_Studio_NoExport` y `IVU_Placeholders_NoExport`. Modela cinco
niveles, paneles posteriores, montantes, zócalo, cornisa, filetes y placa de
latón. Usa bevels pequeños y normales ponderadas. La textura de nogal de
512 × 512 se genera de forma determinista, se empaqueta y se exporta junto
con materiales PBR. El modelo tiene 39 meshes y seis materiales.

Una unidad equivale a un metro. En web, X es horizontal, Y vertical y Z mira
al visitante; el script convierte esas coordenadas a Z-up de Blender antes
de exportar glTF Y-up. Origen: centro de la biblioteca en el suelo.
La estructura mide 2,31 m de ancho y 3,22 m de alto, con 2 m de ancho útil.
La revisión móvil redujo el ancho original de 4,51 m en un 49 %. La placa de
latón lleva «Instituto de Victimología de Usina de Justicia» en dos líneas,
con letras oscuras convertidas a malla, medidas y centradas dentro de la placa.
Las superficies útiles están a 0,30 / 0,78 / 1,26 / 1,74 / 2,22 m.

Los placeholders sirven solo para renderizar proporciones. La exportación
por selección excluye placeholders, cámaras y luces de trabajo. Después,
su colección queda oculta en el fuente. La web modela las publicaciones;
no hay un objeto de Blender por cada obra real.

Para regenerar en Windows, desde el repositorio:

```powershell
& 'C:\Program Files\Blender Foundation\Blender 5.1\blender.exe' --background --factory-startup --python tools/blender/generate_ivujus_bookshelf.py -- --preview
```

El flag `--preview` renderiza además de exportar y guardar. Sin él, solo se
reconstruyen el GLB y el `.blend`. Para modificar materiales, luces o geometría,
editar el generador, ejecutar, revisar el render y luego revisar el navegador.
Si cambian las alturas o la anchura útil, actualizar también las constantes
de `bookshelf-layout.ts`. No hace falta regenerar Blender al publicar contenido.

## Distribución y libros web

El ID determina dimensiones y color mediante un hash estable. No se utiliza
`Math.random()` durante el render. Las páginas de hasta 25 publicaciones se
reparten entre cinco niveles, empezando por los centrales. Cada fila calcula
el ancho total y centra las obras, con separación física constante.

En móvil hay páginas de cinco obras, una por nivel. La cámara encuadra el
mueble completo, desde la cornisa hasta el zócalo; el escenario mide 560 px
de alto y calcula la distancia según la relación de aspecto.
La paginación permite recorrer catálogos de más de cien publicaciones sin
mantener todo el catálogo en la GPU. La búsqueda opera sobre el catálogo
completo, no solo sobre la página visible.

Cada libro real tiene bloque de páginas, tapa, contraportada, lomo, filetes
y una textura frontal. Las portadas utilizan el optimizador de Next a 640 px;
la textura frontal se limita a 512 × 768. Si falla una imagen, la cubierta
tipográfica permanece. Los permisos de host del optimizador siguen siendo
los configurados en `next.config.ts`.

Los lomos decorativos no tienen título, autoría, enlaces ni eventos. Se
calculan después del layout y se excluyen alrededor de cada obra real.
Tres `InstancedMesh` comparten geometría y materiales para encuadernaciones,
páginas y filetes. El DOM informa qué elementos son decorativos; no aparecen
en búsquedas ni en el catálogo accesible.

## Interacción, accesibilidad y responsive

- Hover: adelanto y elevación pequeños, con etiqueta editorial.
- Selección: primero avanza desde la balda y luego se desplaza al espacio de
  lectura, aumenta su escala y gira para presentar la cubierta.
- Cierre: regresa a su posición y rotación calculadas; admite Escape.
- Ficha: diálogo HTML nativo, cierre visible, foco protegido y devolución de
  foco al control previo. Incluye navegación entre obras cuando existen varias.
- Búsqueda: título y autor, insensible a acentos; tipos disponibles en el
  catálogo y filtro de año cuando existen al menos dos años distintos.
- Lista: HTML semántico prerenderizado, con enlaces a las páginas completas.
- Sin JavaScript: el catálogo HTML permanece visible desde el servidor;
  `noscript` oculta el escenario y los controles que requieren interacción.
- Error de carga, contexto o GLB: recuperación a catálogo y botón de reintento.
  Un límite de 25 segundos evita dejar indefinidamente el estado de carga.
- Reduced motion: elimina la interpolación de selección y el parallax.
- Móvil: cámara frontal con el mueble completo, cinco obras por página,
  targets de 44 px y ficha inferior; al seleccionar, el libro avanza y crece
  sobre el área de lectura, mientras la ficha ocupa hasta el 55 % del alto.

La página editorial curada anterior se conserva como `LegacyBookPage.tsx`,
enlazada desde la nueva ruta individual. Mantiene sus párrafos, citas,
presentación, fotografía y fuentes. El hub de publicaciones enlaza la
biblioteca; dossiers y declaraciones conservan sus rutas.

## Performance

La página y los datos se resuelven en servidor. Solo el Canvas se importa con
`ssr: false`, tras acercarse al viewport mediante IntersectionObserver.
El póster y la estructura editorial llegan antes que WebGL. El póster se
importa como asset estático de Next para renovar su caché al regenerarlo;
el GLB utiliza una revisión explícita en su URL.

El Canvas utiliza `frameloop="demand"`; se invalida durante transiciones y
movimientos, sin un bucle visual permanente en reposo. Las animaciones
modifican objetos Three dentro de `useFrame`, sin actualizar estado React por
frame. `useDeferredValue`, memorización y callbacks estables aíslan el input
de búsqueda de la escena costosa.

DPR máximo 1,5 en escritorio y 1,25 en móvil, sombras de 1024/512 y un solo
modelo GLB cacheado. Las texturas por obra se liberan al desmontar. Cambiar a
lista desmonta el renderer; el asset de escenario conserva su caché para volver.

## Agregar una publicación

En Payload, completar una entrada de Publicaciones con su título original,
slug, tipo, resumen y campos bibliográficos disponibles. Subir una portada
real a Media si existe; adjuntar PDF completo o fragmento cuando corresponda,
y enlaces de librería. Publicar tanto el estado editorial como la versión de
Payload. La obra entra al catálogo mediante la invalidación existente o al
renovarse la caché. No se agregan posiciones manuales ni geometría en Blender.

## Validaciones realizadas y estado de entrega

Comandos efectivamente ejecutados:

```text
bun install --frozen-lockfile        OK
bun run typecheck                   OK
bun run lint                        OK: sin errores; cuatro warnings preexistentes
bun run check:i18n                  OK: 8 datasets / 3 idiomas
bun run check:bookshelf             OK: 14 grupos de comprobaciones
bun run build                       OK: compilación y 167 páginas generadas
git diff --check                    OK
```

`check:bookshelf` comprueba distribución de 0, 1, 5, 20, 50, 101 y 240 obras,
colisiones, determinismo, móvil, reducción de decorativos, búsqueda, filtros,
gating de publicación, sustitución del respaldo curado, enlaces, texto Lexical,
traducciones, serialización JSON-LD y estructura del GLB exportado.

El lint original usaba `next lint`, retirado en Next 16, y ESLint 10 fallaba
con el plugin de React. El comando utiliza ahora `eslint src scripts` y el
major compatible 9. Se corrigieron alias de tipos en Buttons y la suscripción
a cambios de tema en ThemeSwitcher. El layout reconoce el atributo de tema
que el script previo al primer paint modifica antes de hidratar.

QA real con Chromium y Playwright CLI:

- Inspección directa del render Cycles y de las capturas del mueble completo.
- Revisión final en 360 × 780, 390 × 844, 430 × 932 y 1440 × 1000:
  placa completa, cinco estantes, zócalo y ausencia de desborde horizontal.
- La revisión anterior también cubrió 1280 × 800 y 834 × 1112.
- Hover, selección, ficha dentro del viewport móvil, Escape, foco restaurado,
  apertura por Enter y reduced motion.
- Búsqueda por autor sin acentos, sin resultados, limpieza, tipo, cambio
  a lista y navegación a la página editorial completa.
- La última comprobación del flujo normal no registró errores de página
  ni consola. Permanece una advertencia de deprecación de Three.Clock
  emitida por una dependencia; no impide el funcionamiento.
- Escenario local con dos publicaciones sintéticas: segunda obra y navegación
  entre fichas. Con 101 obras: paginación de 25/5, búsqueda del catálogo
  completo y límites de render. La ruta de prueba se retiró tras verificar.
- JavaScript deshabilitado: catálogo y enlaces editoriales visibles. GLB
  bloqueado y pérdida simulada del contexto WebGL: catálogo de recuperación.
  Reintento tras restablecer la carga del GLB: escena recuperada.
- El detector de diseño de Impeccable devolvió una lista vacía de hallazgos.
- La revisión visual independiente terminó con `disposition: ship`,
  sin correcciones materiales para la adaptación solicitada.

La consulta contra una base Payload real no se verificó en este entorno:
sin credenciales se utiliza el catálogo editorial curado existente.

## Ver la implementación

```powershell
bun install --frozen-lockfile
bun run dev --hostname 127.0.0.1
```

Abrir `http://127.0.0.1:3000/es/publicaciones/libros`; también existen `/en/`
y `/fr/`. Para el contenido curado no se requieren variables de entorno.
Para utilizar Payload, configurar `DATABASE_URI` y `PAYLOAD_SECRET` de acuerdo
con `.env.example`. Nunca versionar esos valores.

Para una vista móvil local, abrir `http://127.0.0.1:3000/__bookshelf-qa/mobile.html`.
El visor permite alternar 360, 390 y 430 px y carga la ruta real dentro del
marco de teléfono. Es una ayuda de QA ignorada por Git, no parte del producto.
