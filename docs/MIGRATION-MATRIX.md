# Matriz inicial de migracion desde `ivujus.org.ar`

Fecha: 2026-05-04

Base de este documento:

- `docs/ARQUITECTURA.md`
- `docs/WORDPRESS-API-INVENTORY.md`
- relevamiento directo de la REST API publica de WordPress

## Criterio general

No migrar el frontend actual tal como esta. El contenido existente vive dentro de bloques Elementor muy acoplados al render de WordPress y mezcla responsabilidades institucionales, editoriales y de LMS.

La migracion debe extraer informacion canonica y reubicarla en las rutas y colecciones previstas por `ivujus-web`.

## Paginas clave y destino

### 1. `/nosotros/`

Contenido detectado:

- finalidades institucionales
- consejo directivo completo
- estatuto
- comite cientifico completo
- fotos y bios cortas / largas embebidas en atributos HTML

Problema actual:

- junta en una sola pagina lo que en el nuevo sitio debe estar dividido en varias rutas
- usa modales y contenido inline dentro de Elementor

Destino recomendado:

- `instituto` -> resumen institucional y finalidades
- `instituto/estatuto` -> texto del estatuto + PDF si existe
- `instituto/consejo-directivo` -> listado
- `instituto/consejo-directivo/[slug]` -> bio individual
- `instituto/comite-cientifico` -> listado
- `instituto/comite-cientifico/[slug]` -> bio individual

Colecciones implicadas:

- `PaginasEstaticas`
- futura coleccion dedicada a consejo directivo si se implementa segun brief
- futura coleccion dedicada a comite cientifico si se implementa segun brief
- `Media`

Nota SEO/GEO:

- este bloque es critico para `NGO`, `Person`, `sameAs`, `Wikidata` y `llms.txt`

### 2. `/comite-cientifico/`

Contenido detectado:

- version separada y mas pobre del comite cientifico
- fichas resumidas con foto, pais y descripcion corta
- fuerte dependencia de un PDF enlazado externamente

Problema actual:

- duplica contenido ya presente en `/nosotros/`
- no parece ser la fuente mas rica del dato

Destino recomendado:

- usar esta pagina solo como referencia secundaria
- tomar como fuente principal la version mas completa detectada en `/nosotros/`

### 3. `/capacitacion-y-actividades/`

Contenido detectado:

- `Ciclo Usina Debate - Ley de Salud Mental`
- 2 enlaces YouTube asociados
- `Dossier-Salud-Mental.pdf`
- `Ciclo Usina Debate - Juicio por Jurados`
- 1 enlace YouTube asociado
- PDF `prision-perpetua.pdf`

Problema actual:

- mezcla ciclos, videos y publicaciones en una sola pagina
- no hay objetos editoriales separados

Destino recomendado:

- cada ciclo / actividad -> `Ciclos`
- cada PDF doctrinario -> `Dossiers` o `Publicaciones`, segun formalidad editorial
- videos -> embebidos o referenciados desde cada entrada `Ciclos`

Rutas objetivo:

- `formacion/ciclos`
- `formacion/ciclos/[slug]`
- eventualmente `publicaciones/dossiers/[slug]`

### 4. `/campus-virtual/`

Contenido detectado:

- diplomatura MOOC
- link a `tienda`
- PDF del programa de diplomatura
- links a entrevistas y FAQ
- metricas de inscriptos / certificados
- reseñas de alumnos

Problema actual:

- mezcla marketing institucional con funciones del LMS y WooCommerce

Destino recomendado:

- crear landing limpia de `formacion/diplomatura`
- CTA a `campus.ivujus.org.ar`
- conservar programa PDF y contexto institucional
- no migrar tienda, carrito, checkout, login ni operacion de alumnos

Rutas objetivo:

- `formacion`
- `formacion/diplomatura`

### 5. `/preguntas-frecuentes/`

Contenido detectado:

- FAQ enteramente ligada al LMS y compra de cursos
- pago, cuenta, certificados, cupones, acceso, correo de soporte
- JSON-LD `FAQPage` ya presente en WordPress

Problema actual:

- pertenece al campus, no al sitio institucional principal

Destino recomendado:

- no migrar al frontend principal como seccion destacada
- si hace falta, resumir solo una mini-FAQ en `formacion/diplomatura`
- el FAQ operativo debe vivir con el campus o en soporte dedicado

### 6. `/simposio-2026/`

Contenido detectado:

- landing del Primer Simposio Americano y Europeo de Victimologia Penal
- Declaracion de Buenos Aires
- programa por jornadas
- archivo y cobertura en medios

Problema actual:

- esta todavia acoplada a una page monolitica de WordPress

Destino recomendado:

- `Simposios` para la edicion 2026
- `Declaraciones` para la Declaracion de Buenos Aires
- medios y materiales asociados como relaciones del simposio

Rutas objetivo:

- `simposios`
- `simposios/2026-buenos-aires`
- `publicaciones/declaraciones`
- `publicaciones/declaraciones/declaracion-de-buenos-aires`

## Clasificacion de posts publicos

### Migrar a `novedades`

- `hito-en-la-justicia-argentina-sera-sede-del-primer-simposio-americano-y-europeo-de-victimologia-penal`
- `el-ivujus-presente-en-el-ciclo-de-formacion-2026`
- `reconocimiento-a-marcelo-aebi`
- `jornada-en-el-cpacf-derecho-y-algoritmos-...`
- `encuentro-empresarial-argentina-israel-2025`
- `la-esc-difundio-las-proximas-presentaciones-de-usina-de-justicia`

Razon:

- funcionan como novedades institucionales, anuncios o difusion general

### Revisar para `ciclos` o `novedades`

- `asi-vivimos-la-jornada-hacia-un-derecho-cientifico-en-el-cpacf`

Razon:

- puede ser noticia de evento o archivo de actividad. Requiere leer contenido completo antes del import final.

### Revisar para `indice legislativo`, `publicaciones` o `novedades`

- `usina-de-justicia-lanza-el-primer-indice-de-calidad-legislativa-enfocado-en-victimas`

Razon:

- semantica mas fuerte hacia `indice-legislativo` que hacia blog general

### Revisar para `publicaciones` o `novedades`

- `resumen-de-la-presentacion-nuevos-paradigmas-para-la-justicia-penal`
- `usina-de-justicia-presenta-el-libro-nuevos-paradigmas-para-la-justicia-penal`

Razon:

- estan editorialmente conectadas con libro / lanzamiento y pueden alimentar `Publicaciones`

### Revisar para `comite cientifico` o `novedades`

- `en-el-marco-de-la-presentacion-del-indice-legislativo... marcelo-aebi ...`

Razon:

- cruza perfil de autor, indice legislativo y difusion institucional

## Reglas de normalizacion antes del import

- remover emojis y ruido de slugs cuando afecten URL canonical
- convertir bloques Elementor en datos estructurados
- separar PDFs, videos e imagenes como assets relacionados
- completar `alt` en media relevante
- reescribir primeras oraciones para que sean citables cuando el original no alcance el nivel requerido por GEO
- evitar crear una pagina-monstruo que replique `/nosotros/`

## Base para `scripts/migrate-from-wp.ts`

El script deberia trabajar en cuatro fases:

1. extraer `pages`, `posts`, `media`, `categories`
2. mapear origen -> coleccion destino segun reglas de este documento
3. descargar y re-subir media necesaria
4. generar reporte de items importados y items que quedan `needs_review`

Campos de auditoria sugeridos durante la importacion:

- `source_wp_id`
- `source_wp_url`
- `source_wp_type`
- `source_wp_category`
- `migration_status`
- `migration_notes`

## Prioridad de migracion

1. `nosotros` -> instituto / consejo / comite / estatuto
2. `simposio-2026` -> simposios + declaraciones
3. `capacitacion-y-actividades` -> ciclos + dossiers/publicaciones
4. posts -> `novedades` / revisiones manuales
5. `campus-virtual` -> nueva landing institucional sin LMS embebido

## Conclusion

El relevamiento confirma que la migracion correcta no es copiar el sitio actual, sino desarmarlo por dominios conceptuales para reconstruirlo con el modelo editorial y academico definido en `ivujus-web`.
