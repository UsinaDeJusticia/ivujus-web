# Relevamiento de contenido IVUJUS - octubre de 2026

**Fecha:** 11 de octubre de 2026  
**Fuentes:** sitio público `ivujus.org.ar`, archivo de novedades y API REST pública de WordPress; inventario de `USINA DE JUSTICIA-WEB` (`COLA-LARGA-decisiones.md`, `ANEXO-listas.md` y `docs/reference/usina-source-content/`).

## Resultado

El sitio público conserva seis piezas estructurales que ya tienen destino en el
frontend nuevo: inicio, instituto, campus/diplomatura, capacitación y ciclos,
Simposio 2026, contacto y política de privacidad. Los 19 posts y las tres
páginas planas reservadas en el repositorio de Usina ya están representados en
los datasets de `Formación`, `Eventos académicos`, `Publicaciones` y el detalle
del Simposio. Las páginas planas del curso no se duplican: sus contenidos se
fusionan en `/formacion` y `/formacion/diplomatura`.

El archivo vivo de IVUJUS incorporó tres publicaciones que faltaban en el sitio
nuevo:

| Fecha | WordPress | Destino nuevo | Tratamiento |
|---|---:|---|---|
| 9 oct 2026 | 24785 | `/es/novedades/felicitamos-a-hilda-marchiori-por-el-reconocimiento-a-su-trayectoria-en-la-asistencia-a-las-victimas` | Reconocimiento a una integrante del Comité Científico, con imagen oficial. |
| 5 jun 2026 | 24773 | `/es/novedades/alianza-academica-internacional-ivujus-e-indodpro-promueven-la-convencion-interamericana-para-los-derechos-de-las-victimas` | Convenio académico internacional, con enlace a la cobertura de Noticias Dominicanas. |
| 4 jun 2026 | 24768 | `/es/novedades/aporte-normativo-y-academico-texto-completo-del-proyecto-de-convencion-interamericana-sobre-derechos-de-las-victimas` | Aporte académico con página HTML y enlace al PDF fuente. |

Las tres entradas se cargaron en español, inglés y francés con los mismos slugs,
fechas, IDs, imágenes y URLs de origen. Las traducciones son de cortesía; los
enlaces conservan el documento y la cobertura publicados originalmente en
español.

## Mapa de lo ya trasladado

| Fuente pública | Ruta canónica nueva |
|---|---|
| `/` | `/[locale]` |
| `/campus-virtual/` | `/[locale]/formacion/diplomatura` |
| `/capacitacion-y-actividades/` | `/[locale]/formacion/ciclos` |
| `/simposio-2026/` | `/[locale]/simposios/2026-buenos-aires` |
| `/blog/` | `/[locale]/novedades` |
| `/contacto/` | `/[locale]/contacto` |
| `/terms-privacy/` | `/[locale]/terms-privacy` |
| `/capacitacion`, `/inscripcion-al-curso-de-victimologia`, `/preinscripcion-al-curso` | `/es/formacion` o `/es/formacion/diplomatura` |

También se conserva el redirect del stub histórico `/victimasconderechos` hacia
la aplicación externa `victimas-derechos-app.vercel.app`, que no forma parte del
frontend institucional.

## Contenido que sigue fuera de alcance o pendiente de insumos

- `tienda`, carrito, checkout, cuenta, certificados, FAQ operativa y cualquier
  otra operación del LMS siguen en el Campus; no se clonan en el sitio
  institucional.
- Los 37 candidatos del anexo no son 37 migraciones: la decisión aprobada en
  Usina sigue siendo 19 posts y tres páginas. Las categorías `publicaciones` y
  `debatesyconferencias` no se trasladan en bloque.
- El `Observatorio` todavía no se publica en el menú. La fuente disponible solo
  describe el Índice Legislativo y la campaña OEA; faltan los datos canónicos
  del índice, las estadísticas de Noe y el nombre/URL de la aplicación de
  sentencias. Publicar una sección vacía o inventar esas fichas rompería la
  gobernanza editorial.
- La navegación del WordPress viejo todavía mezcla enlaces hacia Usina y hacia
  el Campus. El nuevo sitio ya dispone de rutas internas para el contenido que
  sí corresponde a IVUJUS.

## Verificación

Después de incorporar las tres novedades deben ejecutarse `bun run check:i18n`,
`bun run typecheck` y `bun run build`. El contenido se mantiene en datasets
versionados hasta que exista una fuente editorial estable para pasarlo a la
colección de Payload.
