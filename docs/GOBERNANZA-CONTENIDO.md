# Gobernanza de contenido — checklist para publicar

> Filtro obligatorio para todo contenido nuevo del sitio de IVUJUS, venga de
> quien venga. Complementa [`ARQUITECTURA-CONTENIDO.md`](./ARQUITECTURA-CONTENIDO.md),
> que explica el porqué y el mapa de secciones.

## Por qué existe este checklist

El sitio tiene hoy puntaje perfecto (100/100) en accesibilidad, SEO, buenas
prácticas y velocidad. Ese resultado es frágil: un contenido cargado sin
criterio lo degrada. Este checklist es lo que permite que el sitio siga
creciendo sin perderlo.

## Antes de publicar

### 1. Fuente verificable

- [ ] El contenido proviene de una fuente real y trazable (documento oficial,
      publicación propia, registro del evento, dato con autoría).
- [ ] **Sin fuente → no se publica.** Se marca como PENDIENTE y se espera el
      material. Nunca se completa "a ojo" ni se redacta contenido inventado
      para rellenar.
- [ ] Si es material de terceros (libro, PDF, imagen), está confirmado que
      tenemos derecho a publicarlo.

### 2. Ubicación correcta

- [ ] Pertenece a uno de los pilares existentes: Instituto · Formación ·
      Publicaciones · Observatorio · Eventos académicos · Novedades · Contacto.
- [ ] Si no encaja en ninguno, **se discute antes de crear una sección nueva**.
      Crear secciones sueltas es exactamente lo que queremos evitar.
- [ ] La sección de destino ya tiene contenido real. No publicamos secciones
      vacías ni "en construcción" en el menú.

### 3. Una página, un tema

- [ ] La página trata un solo asunto y se entiende por sí sola.
- [ ] No duplica contenido que ya vive en otra parte del sitio. Si el tema ya
      existe, se **enlaza**; no se copia.

### 4. Nada de archivos sueltos

- [ ] Todo PDF, planilla o documento descargable tiene una **página HTML** que
      lo presenta: título, fecha, de qué trata, autoría, y el enlace de
      descarga.
- [ ] Motivo: un archivo suelto es invisible para Google y para los buscadores
      con IA. La página que lo resume es lo que se indexa y lo que nos citan.

### 5. Datos estructurados según el tipo

Cada contenido se marca con el tipo que le corresponde (schema.org), para que
los buscadores y las IA entiendan qué es:

| Tipo de contenido | Marcado |
|---|---|
| Norma, ley o análisis legislativo | `Legislation` |
| Conjunto de datos / estadísticas | `Dataset` |
| Dossier o informe temático | `Report` |
| Libro | `Book` |
| Evento, jornada, simposio | `Event` |
| Artículo o novedad | `Article` / `NewsArticle` |
| Persona (bio) | `Person` |
| Herramienta o aplicación | `SoftwareApplication` |

- [ ] El tipo elegido es el correcto (no forzamos un tipo que no aplica).
- [ ] Los campos obligatorios de ese tipo están completos y son reales.

### 6. Enlazado interno

- [ ] La sección principal enlaza a la página nueva.
- [ ] La página nueva enlaza de vuelta a su sección.
- [ ] Si corresponde, enlaza a contenido relacionado del sitio.

### 7. Accesibilidad (no negociable)

- [ ] Un solo `<h1>` por página, y los subtítulos en orden (`h2`, después `h3`;
      sin saltos de nivel).
- [ ] Toda imagen tiene texto alternativo real y descriptivo (no "imagen1").
- [ ] Las imágenes tienen dimensiones declaradas, para que la página no salte
      al cargar.
- [ ] Los colores usan los tokens del sistema de diseño (`--ui-*`), que ya
      cumplen contraste WCAG AA en los tres modos de lectura. **No se
      hardcodean colores nuevos.**
- [ ] Se ve bien en los tres modos: claro, sepia y oscuro.
- [ ] Se ve bien en celular (probado a 360 px de ancho, sin desbordes
      horizontales).

### 8. Idioma

- [ ] El contenido va en español (es la lengua del contenido del sitio).
- [ ] Las etiquetas de interfaz que se agreguen tienen su versión en inglés y
      francés, siguiendo el patrón que ya usan los archivos existentes.

## Después de publicar

- [ ] `bun run build` termina sin errores.
- [ ] Lighthouse sigue en ≥ 95 en las cuatro categorías (idealmente 100) en la
      página nueva y en la sección que la contiene.
- [ ] La página aparece en el sitemap con sus versiones de idioma.
- [ ] Los datos estructurados pasan el Rich Results Test de Google sin errores.

## Quién revisa

Las propuestas de contenido las puede traer cualquier integrante del equipo. La
verificación técnica de este checklist queda del lado de quien implementa, antes
de publicar. Si un pedido no puede cumplir alguno de estos puntos, se avisa y se
busca una alternativa que sí lo cumpla, en lugar de publicarlo degradado.
