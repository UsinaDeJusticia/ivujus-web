# Inventario inicial de API WordPress (`ivujus.org.ar`)

Fecha del relevamiento: 2026-05-04

## Confirmacion

El sitio actual de `ivujus.org.ar` expone la REST API publica de WordPress.

Endpoints verificados:

- `https://ivujus.org.ar/wp-json/`
- `https://ivujus.org.ar/wp-json/wp/v2/posts`
- `https://ivujus.org.ar/wp-json/wp/v2/pages`
- `https://ivujus.org.ar/wp-json/wp/v2/categories`
- `https://ivujus.org.ar/wp-json/wp/v2/media`
- `https://ivujus.org.ar/wp-json/wp/v2/types`
- `https://ivujus.org.ar/wp-json/wp/v2/taxonomies`

## Estado general

La instalacion actual no es solo un sitio institucional. La API publica muestra namespaces y tipos de contenido de:

- WordPress core
- WooCommerce
- LearnDash / LMS
- Elementor
- Jetpack

Esto confirma que el WordPress actual mezcla contenido institucional, blog, campus y e-commerce. La migracion a `ivujus-web` debe separar esas responsabilidades segun el brief.

## Tipos de contenido detectados

Tipos relevantes para la migracion publica:

- `post` -> entradas / novedades
- `page` -> paginas institucionales y estaticas
- `attachment` -> medios

Tipos detectados pero fuera de alcance para esta migracion:

- `product` -> WooCommerce
- `sfwd-courses`
- `sfwd-lessons`
- `sfwd-topic`
- `sfwd-quiz`
- `sfwd-question`
- `ld-exam`
- `sfwd-certificates`
- `groups`

Esto coincide con el brief: el LMS y pagos no deben migrarse a este proyecto.

## Volumen publico detectado

- Posts publicos: `11`
- Paginas publicas: `20`
- Media public: `317`

## Paginas publicas detectadas

Paginas con valor directo para migracion o relevamiento:

- `/` (`inicio`)
- `/nosotros/`
- `/comite-cientifico/`
- `/campus-virtual/`
- `/capacitacion-y-actividades/`
- `/preguntas-frecuentes/`
- `/simposio-2026/`
- `/contacto/`
- `/suscripcion/`
- `/blog/`
- `/terms-privacy/`
- `/entrevistas-en-la-radio/`

Paginas detectadas pero probablemente no migrables al nuevo frontend publico:

- `/tienda/`
- `/carrito/`
- `/finalizar-compra-2/`
- `/mi-cuenta-2/`
- `/gracias/`
- `/encuesta-de-calidad-de-servicio/`
- `/servicio/`
- `/guia-rapida/`

## Categorias detectadas en posts

- `difusion` (`5`)
- `entrevistas` (`4`)
- `debate` (`1`)
- `reconocimiento` (`1`)

## Lectura inicial del contenido

Los `posts` publicos actuales funcionan como mezcla de:

- novedades institucionales
- difusion de actividades
- entrevistas
- cobertura de eventos
- reconocimientos academicos

No aparece una separacion editorial limpia entre novedades, ciclos, entrevistas y archivo institucional. Esa normalizacion debe ocurrir durante la migracion.

## Mapeo inicial hacia `ivujus-web`

Segun `docs/ARQUITECTURA.md`, el mapeo inicial mas razonable es:

- `wp/v2/pages` -> `PaginasEstaticas` o rutas institucionales dedicadas
- `wp/v2/posts` categoria `difusion` -> `Ciclos` o `novedades`, segun contenido
- `wp/v2/posts` categoria `debate` -> `Ciclos`
- `wp/v2/posts` categoria `entrevistas` -> `Ciclos` con enfasis en video / archivo audiovisual
- `wp/v2/posts` categoria `reconocimiento` -> `novedades` institucionales o contenido de perfil
- `/simposio-2026/` -> `Simposios` + `Declaraciones` + archivos relacionados
- `media` -> `Media` en Payload con re-upload posterior

## Implicancias para SEO y GEO

La migracion no debe limitarse a copiar contenido. Hay que normalizarlo para cumplir el brief:

- primera oracion citable en cada pieza
- jerarquia clara de H2/H3
- slugs estables y limpios
- contenido institucional separado de contenido de campus
- perfiles y glosario con estructura util para JSON-LD y `llms.txt`

El inventario de API confirma que esta limpieza es necesaria antes de importar, porque el WordPress actual mezcla demasiadas responsabilidades en una sola instalacion.

## Limite de este relevamiento

Este inventario fue hecho sin autenticacion, solo con la API publica.

Con acceso autenticado se podria relevar con mayor precision:

- borradores
- contenido privado
- menu items reales
- metadatos de Elementor
- campos custom
- taxonomias o relaciones no visibles publicamente

## Proximo paso recomendado

1. Relevar con detalle cada `page` publica relevante.
2. Clasificar cada `post` en `novedades`, `ciclos`, `simposios` o `contenido descartable`.
3. Identificar medios criticos para home, instituto, comite cientifico y simposio.
4. Implementar un primer `scripts/migrate-from-wp.ts` basado en este inventario.
