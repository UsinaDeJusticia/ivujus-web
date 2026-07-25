# Plan de contenido — organigrama de trabajo

> Documento vivo. Une **lo que pidió Jimena** (`Sugerencias_para_la_página_de_IVUJUS.docx`,
> julio 2026) con la **arquitectura de pilares** aprobada
> ([`ARQUITECTURA-CONTENIDO.md`](./ARQUITECTURA-CONTENIDO.md)). Se va poblando a medida
> que llega el material. Cada ítem entra cumpliendo el checklist de
> [`GOBERNANZA-CONTENIDO.md`](./GOBERNANZA-CONTENIDO.md).
>
> **Última actualización:** 25 de julio de 2026.

## Estado global

**12 de 19 pedidos de Jimena están hechos y publicados.** Los 7 restantes no están
frenados por trabajo técnico: **esperan material**. Regla del proyecto: sin fuente
verificable no se publica (no se inventa ni se deja a medias).

| Bloque del documento de Jimena | Hechos | Pendientes |
|---|---|---|
| 1 · Título de presentación | 2 / 2 | — |
| 2 · Explorar el Instituto | 3 / 4 | foto de Jimena |
| 3 · Formación | 2 / 2 | — |
| 4 · Publicaciones | 2 / 3 | dossiers |
| 5 · Simposios → Eventos académicos | 3 / 4 | Encuentros y conferencias |
| 6 · Secciones nuevas | 0 / 4 | Estadísticas · IUJ · Biblioteca · App |

---

## Tabla maestra — cada pedido, su destino y su estado

### Bloque 1 · Título de presentación → **Home**

| Pedido | Estado | Detalle |
|---|---|---|
| Cambiar el título por «Un portal académico destinado a la difusión, la capacitación y la investigación de la Victimología Penal» | ✅ | Literal. Se mantuvo un título corto para el `<title>` de Google (el largo quedaría truncado). |
| Cambiar el párrafo siguiente por el de las finalidades del IVUJUS | ✅ | Literal, en ES/EN/FR. |

### Bloque 2 · Explorar el Instituto → **Instituto**

| Pedido | Estado | Detalle / qué falta |
|---|---|---|
| Cambiar el párrafo bajo el título | ✅ | Literal. Alimenta también los datos estructurados de la organización. |
| Consejo Directivo: cambiar la foto de Jimena | ⏳ | **Falta el archivo.** Reemplaza `src/lib/instituto.ts:53` (hoy `jimena_molina_profiles.jpg`). Actualiza su tarjeta, su perfil y los datos estructurados de una sola vez. |
| Consejo Directivo: sacar a Patri | ✅ | Patricia Borras eliminada. Su perfil devuelve 404 y el sitemap bajó de 150 a 147 URLs. |
| Premios Científicos: nueva descripción | ✅ | Literal. |

### Bloque 3 · Formación → **Formación**

| Pedido | Estado | Detalle |
|---|---|---|
| Cambiar la descripción por el texto sobre capacitación y Victimología Penal | ✅ | Literal. |
| «Diplomatura de posgrado» → «Diplomatura» | ✅ | El texto anterior no queda en ningún archivo. |

### Bloque 4 · Publicaciones → **Publicaciones**

| Pedido | Estado | Detalle / qué falta |
|---|---|---|
| Nueva bajada + sacar el punto | ✅ | Ambas cosas: el título quedó sin punto y la bajada termina en «…del IVUJUS». |
| «Dos frentes de producción…» → «Fuentes de producción: declaraciones, libros, dossier» | ✅ | Literal. |
| Agregar los dossiers debajo de Libros (prisión perpetua · salud mental · responsabilidad penal juvenil) | ⏳ | **Falta 1 de 3.** Ya tenemos: `Dossier-Salud-Mental.pdf` y `prision-perpetua.pdf` (referenciados en `formacion.ts:316` y `:332`). **Falta el de responsabilidad penal juvenil.** Cada dossier entra con su propia página que lo resume + el PDF descargable (regla 2 de gobernanza). |

### Bloque 5 · Simposios → **Eventos académicos**

| Pedido | Estado | Detalle / qué falta |
|---|---|---|
| Renombrar la sección a un término más genérico | ✅ | «Eventos académicos», **manteniendo la URL `/simposios`** para no perder posicionamiento. En el menú la etiqueta es corta («Eventos») por una restricción de ancho; el nombre completo está en el título, los breadcrumbs, la metadata y la tarjeta de la home. |
| «Archivo de encuentros…» → «Espacios de conocimiento e innovación» | ✅ | Literal. |
| Nuevo párrafo sobre encuentros de alto nivel | ✅ | Literal. |
| Nueva subsección «Encuentros y conferencias» | ⏳ | **Falta el material de cada evento**: fecha + descripción breve + imagen o enlace verificable. Ítems pedidos: (a) evento del Colón · (b) presentación del libro en UBA y en DAIN · (c) los «Usina de Justicia Debate» · (d) debate sobre edad de imputabilidad — **de este ya tenemos los 2 flyers** del propio documento (Jornadas «Edad de Imputabilidad», 23-24 feb 2026, Grupo Diálogo y Debate) · (e) toda otra actividad con registro. Cada evento se publica como ficha con datos estructurados de tipo `Event`. |

### Bloque 6 · Secciones nuevas → **reagrupadas, no sueltas**

Esta es la parte donde más se aplicó la contrapropuesta: en vez de 4 ítems nuevos en el
menú, van **un solo pilar nuevo (Observatorio)** más una rama dentro de Publicaciones.

| Pedido | Destino | Estado | Qué falta |
|---|---|---|---|
| **Estadísticas** (la de Noe + todas las disponibles) | Observatorio | ⏳ | El archivo/planilla + definir qué se muestra. Se publica como `Dataset` con página de lectura, no como archivo suelto. |
| **IUJ — Índice Legislativo** | Observatorio | ⏳ | El material a cargar. **Ventaja:** la base ya existe en el CMS (colección `indice-legislativo-entradas`, con campos de norma, jurisdicción, puntaje, dimensiones y análisis). Falta cargar datos y construir la página pública. Es el ítem más grande. |
| **Biblioteca** (PDFs + libro de Usina para comprar + recomendados con tapas) | Publicaciones | ⏳ | Qué libros, sus PDF **y confirmación de que tenemos derecho a publicarlos**, el enlace de compra, y las tapas de los recomendados. Los libros propios y los recomendados van claramente separados para no atribuir mal la autoría. |
| **App de lectura de sentencias** | Observatorio | ⏳ | Identificar cuál es (¿la misma que `victimas-derechos-app`?), con qué nombre se presenta y a qué URL enlaza. Se publica como `SoftwareApplication` con su propia landing. |

---

## Lo que agregamos nosotros (no estaba en el documento)

| Ítem | Estado | Por qué |
|---|---|---|
| `ARQUITECTURA-CONTENIDO.md` + `GOBERNANZA-CONTENIDO.md` | ✅ | El mecanismo que evita que el sitio se desordene al crecer. Es lo que permite decir «sí» a las propuestas del equipo sin perder el orden. |
| Fix del header: logo deformado | ✅ | Apareció al verificar: el isotipo se achataba (50×44 en vez de respetar su proporción). |
| Fix del header: desborde horizontal en tablet | ✅ | **Defecto preexistente** (WCAG 1.4.10): entre 768 y 1024px la página desbordaba. No se había detectado porque las pruebas anteriores solo cubrieron 360 y 414px en español. |

---

## Orden de ejecución acordado

Distinto al del documento de Jimena, que va por orden de página. El nuestro ordena por
**(1)** material que ya tenemos, **(2)** valor de posicionamiento, **(3)** tamaño.

### ✅ Etapa 1 — completada y publicada
Todas las reescrituras de texto + el renombre de la sección + los documentos de
gobernanza + los arreglos del header. No dependía de ningún material.
Publicado en `main` → `ivujus-web.vercel.app`. Lighthouse 100/100/100/100.

### Etapa 2 — con el material del equipo

| Orden | Ítem | Esfuerzo | Estado del insumo |
|---|---|---|---|
| 1 | Foto de Jimena | ~10 min | Falta el archivo |
| 2 | Dossiers en Publicaciones | chico | 2 de 3 PDF listos |
| 3 | Encuentros y conferencias | medio | Falta todo salvo los 2 flyers de imputabilidad |

**Por qué en este orden:** la foto es un reemplazo de una línea. Los dossiers ya tienen
dos tercios del material. Encuentros necesita datos de cada evento, que es lo que más
tarda en juntarse.

### Etapa 3 — Observatorio (el pilar nuevo)

| Orden | Ítem | Esfuerzo | Por qué en esta posición |
|---|---|---|---|
| 4 | IUJ · Índice Legislativo | grande | Va primero del pilar porque ya tiene la base armada en el CMS y es el contenido con más valor de posicionamiento: es material original y citable. |
| 5 | Estadísticas | medio | Depende de definir qué se muestra. |
| 6 | Biblioteca | medio | Puede adelantarse si los derechos de los PDF están claros; si no, conviene esperar. |
| 7 | App de lectura de sentencias | chico | Es el más simple del pilar, pero no aporta hasta que las demás piezas del Observatorio existan. |

**El Observatorio no aparece en el menú hasta tener al menos una sección con contenido
real** (regla 6: nada de secciones vacías).

> **Aclaración:** el pilar al que pertenece un ítem no determina cuándo se hace. La
> Biblioteca pertenece a Publicaciones pero está en la etapa 3 por los derechos; el IUJ
> pertenece al Observatorio y va antes que otros ítems del mismo pilar.

---

## Insumos pendientes, agrupados por quién los tiene

**Jimena**
- Su foto nueva.
- Datos de los eventos: evento del Colón, presentación del libro en UBA y en DAIN, los «Usina de Justicia Debate», y otras actividades con registro.
- El dossier de responsabilidad penal juvenil.

**Noelia (Noe)**
- Las estadísticas + criterio de qué mostrar.

**Emanuel / Jair**
- El material del IUJ.
- Biblioteca: libros, PDF, derechos de publicación, enlace de compra, tapas de recomendados.
- Identificación de la app de lectura de sentencias (nombre + URL).

**Se puede mandar de a uno.** Cada insumo desbloquea su ítem por separado; no hace falta
juntar todo para avanzar.

---

## Decisiones abiertas (chicas, no bloquean)

| Decisión | Opciones |
|---|---|
| Etiqueta del menú | Hoy dice «Eventos» (corto, por ancho disponible). Para que diga «Eventos académicos» completo: acortar el botón «Acceder al Campus» → «Campus» y bajar el punto de quiebre del menú. ~10 min. |
| Punto final en los títulos | Jimena pidió sacarlo solo del título de Publicaciones, y así quedó. Si se quiere sacar de todos los títulos, es un cambio menor y consistente. |
| Menú desplegable entre 1024 y 1280px | Fue necesario para eliminar el desborde. Si se prefiere la barra horizontal en ese rango, se resuelve con la misma decisión de la primera fila. |

## Pendientes de otras fases (no son de este documento)

- **SEO/GEO manual** ([`SEO-GEO.md`](./SEO-GEO.md)): PageSpeed real sobre el deploy · Rich Results Test · Wikidata · Search Console · Bing · URLs de redes para `sameAs` · decisión de re-alojar imágenes críticas.
- **Fase 3** (WordPress headless: novedades en vivo, formulario real, Perfit): requiere destino de la categoría `oea`, idioma de novedades v1, y proveedor/credencial de email.
