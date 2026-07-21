# Redirects cruzados desde `usina-de-justicia` hacia `ivujus.org.ar`

**Para:** Jair · **Repo a modificar:** `usina-de-justicia` (este documento vive acá porque
es este repo el que sabe cuáles son las rutas finales; la aplicación del cambio es
trabajo del otro repo).

## Contexto

Según `docs/USINA-CONTENIDO-RESERVADO.md` §4, en `usina-de-justicia/next.config.mjs`
(mergeado a `master`, ya deployado) existen **22 reglas de redirect 301** que hoy
mandan URLs viejas del WordPress de Usina a `https://ivujus.org.ar/` (la raíz, sin
ruta específica), porque cuando se implementaron esas reglas la estructura de rutas
de este proyecto todavía no existía.

Ese contenido — 19 posts + 3 páginas planas — ya tiene destino real en este repo (ver
`docs/reference/usina-source-content/posts-completos.md` y `paginas-planas.md`).
Este documento resuelve el `docs/generate-redirects.ts` (§9.3 del brief, todavía no
implementado en este repo) para la porción que le corresponde a Usina: qué URL final
de `ivujus.org.ar` debería reemplazar la raíz genérica en cada una de las 22 reglas.

**Nada de esto se aplica en este repo.** Es material de traspaso para que Jair (o un
agente en el repo `usina-de-justicia`) actualice las 22 reglas existentes.

### Decisión de locale en el destino

Igual que en `next.config.ts` de este repo (ver comentario ahí), las rutas nuevas
usan prefijo `/[locale]` y no hay detección de locale en `/`. Todos los destinos de
esta tabla apuntan a `/es/...` explícito.

### Convención de fuente

Los 19 posts usan el patrón de permalink de WordPress
`/:year(\d{4})/:month(\d{2})/:day(\d{2})/<slug-exacto>/`. Se transcribe la URL vieja
completa tal cual figura en `posts-completos.md` (incluyendo el slug con emoji
percent-encoded del post 22365, que Usina confirma que ya funciona así en su config
actual).

## Tabla: 19 posts

| WP ID (Usina) | Fecha | URL vieja en `usinadejusticia.org.ar` (fuente del redirect) | Destino final propuesto en `ivujus.org.ar` | Nota |
|---|---|---|---|---|
| 22614 | 2026-04-03 | `/2026/04/03/para-que-puedas-organizar-tu-agenda-y-aprovechar-al-maximo-cada-jornada-compartimos-el-cronograma-oficial-del-primer-simposio-americano-y-europeo-de-victimologia-penal/` | `/es/simposios/2026-buenos-aires` | Contenido pasa a ser el campo `temario` de la ficha del simposio; no tiene URL propia en el nuevo sitio. |
| 22612 | 2026-04-03 | `/2026/04/03/primer-simposio-americano-y-europeo-de-victimologia-penal-inscripciones-abiertas/` | `/es/simposios/2026-buenos-aires` | Mismo landing que el anterior; la info de inscripción vive en esa página. Alternativa si en el futuro existe un ítem propio en `Novedades`: redirigir puntual a ese slug. |
| 22365 | 2025-11-12 | `/2025/11/12/%e2%9a%96%ef%b8%8f%f0%9f%92%bb-asi-vivimos-la-jornada-hacia-un-derecho-cientifico-en-el-cpacf/` | `/es/formacion/ciclos` | Slug con emoji percent-encoded, ya probado funcionando en la config actual de Usina — mantener tal cual. Placeholder a la lista de `Ciclos`; refinar a `/es/formacion/ciclos/<slug>` cuando exista la entrada puntual "Jornadas CPACF" en Payload. |
| 22362 | 2025-11-10 | `/2025/11/10/hacia-un-derecho-cientifico-medicion-cualitativa-en-la-era-del-algoritmo/` | `/es/formacion/ciclos` | Posible duplicado editorial de 22365 (ver `MIGRATION-MATRIX.md`/§2 de `USINA-CONTENIDO-RESERVADO.md`) — pendiente decidir si se fusiona en una sola entrada de `Ciclos` antes de dar slug definitivo. |
| 21108 | 2024-07-01 | `/2024/07/01/encuentro-con-la-universidad-nacional-de-asuncion-para-conversar-sobre-la-formacion-en-victimologia/` | `/es/novedades` | Sin colección `Instituciones` implementada todavía; cae en Novedades hasta que exista modelado específico para instituciones de la Red. |
| 19693 | 2023-09-21 | `/2023/09/21/hoy-ultima-jornada-donde-usina-de-justicia-participa-activamente-en-el-dictado-del-curso-sobre-victimas-en-el-colegio-publico-de-abogados-de-la-capital-federal-cpacf/` | `/es/formacion/ciclos` | Capacitación histórica CPACF; placeholder a listado, refinar a slug puntual cuando se importe como `Ciclo`. |
| 19657 | 2023-07-31 | `/2023/07/31/ministerios-publicos-fiscales-otras-entidades-y-profesionales-particulares-ya-se-sumaron-a-la-capacitacion-en-campus-virtual-de-usina-de-justicia-ley-de-victimas-en-el-marco-de-la-victimologia/` | `/es/formacion/diplomatura` | Habla de la capacitación en Campus Virtual (antecesor de la diplomatura), no de un ciclo puntual. |
| 19478 | 2023-07-01 | `/2023/07/01/usina-de-justicia-lanzo-su-nuevo-campus-virtual/` | `/es/novedades` | Nota histórica del lanzamiento del Campus Virtual — `MIGRATION-MATRIX.md` sugiere Novedades en vez de Ciclo; se sigue esa recomendación. |
| 18724 | 2023-04-20 | `/2023/04/20/usina-de-justicia-participa-activamente-en-la-capacitacion-en-victimas-de-delito-de-acuerdo-al-convenio-celebrado-con-el-colegio-publico-de-la-abogacia-de-la-capital-federal/` | `/es/formacion/ciclos` | Capacitación CPACF; placeholder a listado. |
| 18399 | 2023-04-18 | `/2023/04/18/nota-en-agencia-universitaria-de-noticias-comenzo-una-capacitacion-inedita-para-la-proteccion-de-victimas-de-delito-el-programa-fue-lanzada-por-usina-de-justicia-en-colaboracion-con-la-facultad-de/` | `/es/formacion/ciclos` | Cobertura de prensa de la capacitación UADE; placeholder a listado. |
| 17918 | 2023-04-08 | `/2023/04/08/nota-en-infobae-se-lanzo-por-primera-vez-en-el-pais-un-programa-universitario-de-capacitacion-en-victimas-de-delitos/` | `/es/formacion/ciclos` | Ídem, cobertura Infobae de la capacitación UADE. |
| 17322 | 2023-04-03 | `/2023/04/03/usina-de-justicia-en-colaboracion-con-la-uade-comenzara-el-jueves-13-de-abril-con-el-programa-de-capacitacion-en-victimas-de-delito/` | `/es/formacion/ciclos` | Anuncio previo de la capacitación UADE; placeholder a listado. |
| 17243 | 2023-03-17 | `/2023/03/17/capacitacion-en-victimas-de-delito-colegio-publico-de-abogados-con-la-participacion-de-usina-en-el-dictado-de-la-capacitacion/` | `/es/formacion/ciclos` | Capacitación CPACF; placeholder a listado. |
| 17210 | 2023-03-08 | `/2023/03/08/colegio-publico-de-la-abogacia-de-la-capital-federal-16-de-marzo-capacitacion-en-victimas-de-delito-presentadora-mariana-romano-y-participa-en-la-apertura-a-cargo-de-diana-cohen-agrest/` | `/es/formacion/ciclos` | Ídem, misma capacitación CPACF (edición marzo 2023); placeholder a listado. |
| 8888 | 2019-10-30 | `/2019/10/30/uj-dicto-clases-en-la-facultad-de-derecho-uba/` | `/es/formacion/ciclos` | Clases en la UBA; placeholder a listado. |
| 8884 | 2019-10-03 | `/2019/10/03/uj-estuvo-presente-en-la-capacitacion-de-victimas-de-la-subsecretaria-de-justicia-caba/` | `/es/formacion/ciclos` | Capacitación Subsecretaría de Justicia CABA; placeholder a listado. |
| 9818 | 2019-03-07 | `/2019/03/07/participamos-en-la-jornada-dialogando-ba-proteccion-de-victimas-en-la-facultad-de-derecho-de-la-universidad-de-buenos-aires/` | `/es/formacion/ciclos` | Jornada UBA; placeholder a listado. |
| 9877 | 2017-11-08 | `/2017/11/08/ministerio-seguridad-la-nacion-capacitacion-fuerzas-seguridad/` | `/es/formacion/ciclos` | Capacitación a Fuerzas de Seguridad; placeholder a listado. |
| 9998 | 2016-05-05 | `/2016/05/05/seminario-en-la-udemm/` | `/es/formacion/ciclos` | Seminario UdeMM; placeholder a listado. |

## Tabla: 3 páginas planas

| WP ID (Usina) | Slug viejo | URL vieja en `usinadejusticia.org.ar` (fuente del redirect) | Destino final propuesto en `ivujus.org.ar` | Nota |
|---|---|---|---|---|
| 15851 | `capacitacion` | `/capacitacion/` | `/es/formacion` | Contenido institucional general del programa de capacitación; landing general de Formación, no un ciclo puntual. |
| 18480 | `inscripcion-al-curso-de-victimologia` | `/inscripcion-al-curso-de-victimologia/` | `/es/formacion/diplomatura` | Formulario/CTA de inscripción al curso de victimología → landing de la diplomatura. |
| 18452 | `preinscripcion-al-curso` | `/preinscripcion-al-curso/` | `/es/formacion/diplomatura` | Contenido casi idéntico al anterior (`USINA-CONTENIDO-RESERVADO.md` §3); mismo destino, probablemente se fusionan en una sola entrada del lado de Usina. |

## Ítems marcados como "placeholder a listado" (`/es/formacion/ciclos`)

12 de los 19 posts (todas las capacitaciones históricas 2016–2023, más las dos
jornadas CPACF de 2025) apuntan hoy a la página de listado `/es/formacion/ciclos`
porque en este repo todavía no existen entradas puntuales de `Ciclos` para ese
contenido histórico — no hay slugs reales para redirigir a nivel de ítem individual
todavía. Cuando `scripts/migrate-from-wp.ts` (o el import específico de contenido de
Usina) cree esas entradas con slug definitivo, esta tabla debería actualizarse para
apuntar cada URL a `/es/formacion/ciclos/<slug-real>` en lugar del listado genérico,
y ese cambio más fino trasladarse también a `usina-de-justicia/next.config.mjs`.

## Resumen de acción para Jair / repo `usina-de-justicia`

1. En `usina-de-justicia/next.config.mjs`, reemplazar el `destination` de cada una
   de las 22 reglas existentes (hoy `https://ivujus.org.ar/`) por la URL de la
   columna "Destino final propuesto" de este documento (con el host completo:
   `https://ivujus.org.ar/es/...`).
2. Mantener el `source` de cada regla exactamente como está (incluye el slug con
   emoji percent-encoded de 22365, que ya está probado funcionando).
3. Los 12 ítems marcados como "placeholder a listado" son candidatos a un segundo
   ajuste más adelante, no bloquean este primer traspaso.
4. No hace falta tocar nada en este repo (`ivujus-web`) para este punto — los
   redirects de Usina viven y se aplican enteramente en el otro repo.
