# Ledger de migracion de contenido

Fecha: 2026-05-04

Este documento baja la migracion al nivel item por item. Sirve para validar criterio editorial antes de automatizar `scripts/migrate-from-wp.ts`.

Estados de este ledger humano:

- `migrar`: el item entra en el alcance del nuevo sitio
- `no migrar`: el item queda fuera por pertenecer a LMS, pagos o soporte operativo

Importante:

- Este ledger no equivale a `import ready`.
- La aprobacion tecnica para import se separa en artefactos posteriores (`inventory`, `editorial decisions`, `proposed seeds`, `import-ready seeds`).

Decision cerrada adicional:

- `suscripcion` no se migra como pagina WordPress. En `ivujus-web` debe resolverse como CTA, formulario integrado o proxy tecnico hacia Perfit.

## Paginas

| WP ID | Slug actual | Titulo | Estado | Destino propuesto | Prioridad | Nota |
|---|---|---|---|---|---|---|
| 6 | `el-nuevo-umoma-abre-sus-puertas-2` | inicio | migrar | `home` | alta | No copiar literal. Solo usar como referencia del contenido y jerarquia actuales. |
| 24152 | `nosotros` | Nosotros | migrar | `instituto`, `instituto/estatuto`, `instituto/consejo-directivo`, `instituto/comite-cientifico` | muy alta | Es la fuente mas rica para finalidades, consejo, estatuto y comite cientifico. |
| 24231 | `comite-cientifico` | Comite Cientifico | no migrar | absorber en `instituto/comite-cientifico` | media | Duplica informacion de `nosotros` pero con menor detalle. |
| 21399 | `capacitacion-y-actividades` | Capacitacion y actividades | migrar | `formacion/ciclos` + `Ciclos` + `Dossiers/Publicaciones` | alta | Desarmar por actividad, video y PDF. |
| 24055 | `campus-virtual` | Campus Virtual | migrar | `formacion/diplomatura` | alta | Solo como landing institucional; no migrar tienda ni operacion LMS. |
| 24632 | `simposio-2026` | Simposio 2026 | migrar | `simposios/2026-buenos-aires` + `Declaraciones` | muy alta | Pieza central para arquitectura publica y GEO. |
| 19975 | `contacto` | contacto | migrar | `contacto` | media | Rehacer como pagina limpia con formulario nuevo. |
| 18848 | `terms-privacy` | Politicas de privacidad | migrar | `terms-privacy` | media | Reescribir o limpiar markup WP. |
| 22720 | `suscripcion` | Suscripcion | no migrar | CTA o proxy a Perfit | baja | El brief dice que Perfit se mantiene; no hace falta clonar la pagina completa. |
| 9 | `blog` | Blog | migrar | `novedades` | alta | La page en si no importa tanto; importa el listado de posts. |
| 19637 | `entrevistas-en-la-radio` | ENTREVISTAS EN LA RADIO | migrar | archivo audiovisual secundario dentro de `formacion/ciclos` o `novedades` | baja | Tiene videos reales; migrar solo si aporta valor al archivo institucional. |
| 21312 | `preguntas-frecuentes` | Preguntas frecuentes | no migrar | fuera del frontend principal | media | FAQ operativa del LMS, pagos, usuarios y certificados. |
| 19075 | `tienda` | Tienda | no migrar | fuera de alcance | alta | WooCommerce / pagos, explicitamente excluido por el brief. |
| 19900 | `carrito` | Carrito | no migrar | fuera de alcance | alta | WooCommerce. |
| 19896 | `finalizar-compra-2` | Finalizar compra | no migrar | fuera de alcance | alta | WooCommerce. |
| 19897 | `mi-cuenta-2` | Mi cuenta | no migrar | fuera de alcance | alta | Login del campus / usuarios WP. |
| 20157 | `gracias` | gracias | no migrar | fuera de alcance | baja | Flujo auxiliar del sistema actual. |
| 21874 | `encuesta-de-calidad-de-servicio` | Encuesta de calidad de servicio | no migrar | fuera de alcance | baja | Parece pieza operativa del campus. |
| 21422 | `guia-rapida` | Guia rapida | no migrar | fuera del frontend principal | baja | Guia rapida del campus; soporte operativo del LMS. |
| 23174 | `servicio` | servicio | no migrar | fuera del frontend principal | baja | Pagina contingente de caida tecnica del campus. |

## Posts

| WP ID | Fecha | Slug actual | Titulo | Categoria WP | Estado | Destino propuesto | Prioridad | Nota |
|---|---|---|---|---|---|---|---|---|
| 24625 | 2026-04-06 | `hito-en-la-justicia-argentina-sera-sede-del-primer-simposio-americano-y-europeo-de-victimologia-penal` | Hito en la Justicia: Argentina sera sede del Primer Simposio Americano y Europeo de Victimologia Penal | `difusion` | migrar | `novedades` relacionado a `Simposios` | alta | Puede vincularse a la ficha del simposio 2026. |
| 24591 | 2026-02-06 | `el-ivujus-presente-en-el-ciclo-de-formacion-2026` | El IVUJUS presente en el Ciclo de Formacion 2026 | `difusion` | migrar | `novedades` | media | Noticia institucional de agenda / presencia publica. |
| 24544 | 2025-11-13 | `reconocimiento-a-marcelo-aebi` | Reconocimiento a Marcelo Aebi | `reconocimiento` | migrar | `novedades` y posible relacion con perfil del comite cientifico | media | Util para autoridad academica y GEO del perfil de Aebi. |
| 24526 | 2025-11-12 | `%e2%9a%96%ef%b8%8f%f0%9f%92%bb-asi-vivimos-la-jornada-hacia-un-derecho-cientifico-en-el-cpacf` | Asi vivimos la jornada Hacia un Derecho Cientifico en el CPACF | `debate` | migrar | `indice-legislativo` + `novedades` | alta | Cronica del evento de presentacion del indice; no parece un ciclo autonomo. |
| 24523 | 2025-11-10 | `usina-de-justicia-lanza-el-primer-indice-de-calidad-legislativa-enfocado-en-victimas` | Usina de Justicia lanza el primer Indice de Calidad Legislativa enfocado en victimas | `entrevistas` | migrar | `indice-legislativo` | muy alta | Debe reforzar la seccion del indice legislativo, no quedar como post generico. |
| 24540 | 2025-11-10 | `%f0%9f%93%96-resumen-de-la-presentacion-nuevos-paradigmas-para-la-justicia-penal` | Resumen de la presentacion Nuevos paradigmas para la Justicia Penal | `entrevistas` | migrar | `publicaciones/libros` relacionado + `novedades` | alta | Pieza satelite del libro con video resumen. |
| 24509 | 2025-11-04 | `usina-de-justicia-presenta-el-libro-nuevos-paradigmas-para-la-justicia-penal` | Usina de Justicia presenta el libro Nuevos Paradigmas para la Justicia Penal | `entrevistas` | migrar | `publicaciones/libros` relacionado + `novedades` | muy alta | Debe conectarse al objeto editorial principal del libro. |
| 24513 | 2025-11-01 | `jornada-en-el-cpacf-derecho-y-algoritmos-%e2%9a%96%ef%b8%8f%f0%9f%92%bb` | Jornada en el CPACF: Derecho y Algoritmos | `difusion` | migrar | `novedades` | media | Limpiar slug y titulo al migrar. |
| 24517 | 2025-10-31 | `encuentro-empresarial-argentina-israel-2025` | Encuentro Empresarial Argentina-Israel 2025 | `difusion` | migrar | `novedades` | baja | Confirmar relevancia institucional antes del import definitivo. |
| 24504 | 2025-10-30 | `la-esc-difundio-las-proximas-presentaciones-de-usina-de-justicia` | La ESC difundio las proximas presentaciones de Usina de Justicia | `difusion` | migrar | `novedades` | baja | Noticia institucional convencional. |
| 24493 | 2025-10-29 | `en-el-marco-de-la-presentacion-del-indice-legislativo-de-usina-de-justicia-marcelo-aebi-miembro-de-nuestro-comite-cientifico-nos-invita-a-reflexionar-sobre-el-derecho-cientifico` | En el marco de la presentacion del Indice Legislativo..., Marcelo Aebi... | `entrevistas` | migrar | `indice-legislativo` relacionado + perfil de Marcelo Aebi | alta | Video corto que cruza indice legislativo y autoridad academica del comite. |

## Decisiones manuales pendientes

### Antes de automatizar paginas

- confirmar si `nosotros` sera la unica fuente canonica para consejo y comite
- revisar si existe PDF descargable del estatuto fuera del HTML incrustado

### Antes de automatizar posts

- decidir si `Nuevos Paradigmas para la Justicia Penal` ya debe modelarse como `Publicacion`
- decidir si el post del indice legislativo se convierte en noticia vinculada o en contenido derivado de la seccion `indice-legislativo`

## Criterios de importacion

- limpiar slugs rotos por emojis o strings URL-encoded
- separar assets (`pdf`, `youtube`, `imagenes`) del HTML principal
- no importar bloques Elementor ni scripts inline
- producir cuerpos editoriales limpios con H2/H3 y primera oracion citable
- dejar marcado `needs_review` en todo item que implique interpretacion editorial fuerte
