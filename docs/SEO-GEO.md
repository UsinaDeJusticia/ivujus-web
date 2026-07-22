# SEO / GEO — estado y checklist manual

**Actualizado:** 21 de julio de 2026 (Fase 4). Optimización implementada en código + tareas manuales pendientes (requieren un humano).

## Implementado en el sitio (Fase 4)

### Crawling & discovery
- `src/app/robots.ts` — permite buscadores; reglas explícitas que **permiten crawlers LLM** (GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, Claude-Web, PerplexityBot, Google-Extended, Amazonbot, Applebot-Extended); `Disallow /admin`, `/api`; declara sitemap y host.
- `src/app/sitemap.ts` — 150 URLs (50 rutas × es/en/fr) con `alternates.languages` (hreflang) y `lastModified`.
- `src/app/llms.txt/route.ts` — mapa curado para LLMs (institución, Comité Científico con enlaces, conceptos del estatuto, Simposio + Declaración de BA, formación, novedades). Contenido real, trazable.

### Metadata & datos estructurados
- Todas las rutas: `buildLocalizedMetadata` (title/description propios, canonical, hreflang es/en/fr, OpenGraph, Twitter).
- JSON-LD por tipo, inline por página (verificado con Rich-Results-friendly `@type`): `Organization`(NGO) + `WebSite` (home), `NGO`/`ItemList`+`Person` (instituto/consejo/comité), `Person` (bios), `Event` (Simposio 2026), `Course` (diplomatura), `Article`/`NewsArticle` (ciclos, novedades), `CreativeWork` (Declaración de BA), `Book` (Nuevos Paradigmas), `ContactPage`, `WebPage` (terms), y **`BreadcrumbList` en todas las subpáginas**.
- `sameAs` de la organización: usa las cuentas **oficiales de Usina de Justicia** (Facebook, Twitter/X, YouTube, Instagram), según la decisión D6 del brief (IVUJUS no tiene cuentas propias). **Verificar que las URLs sean las vigentes.**
- Builders JSON-LD tipados disponibles en `src/lib/seo.ts` (P2) — hoy las páginas usan JSON-LD inline; queda como refactor DRY futuro migrar las páginas a esos builders.

### OG images
- `opengraph-image.tsx` (default + Simposio 2026) generadas con `next/og` (azul institucional + logo blanco + título). Next las enlaza como `og:image`/`twitter:image` automáticamente.

### Redirects
- `next.config.ts` → 9 redirects 301/308 de URLs viejas del WP (`/nosotros`→`/es/instituto`, `/campus-virtual`→`/es/formacion/diplomatura`, etc.).
- `docs/usina-redirects.md` → las 22 reglas del repo `usina-de-justicia` reapuntadas a rutas finales, **para que Jair las aplique en ESE repo** (cross-repo).

### Performance
- Rutas de contenido estáticas (SSG). Fuentes Cinzel/Montserrat autohospedadas (`next/font`, display swap). `next/image` con `priority` en la imagen LCP de cada ruta, `sizes` y dimensiones/aspecto fijos (sin CLS), `quality≈75`. `<h1>` único por página, jerarquía H2/H3, `<time dateTime>`, `alt` reales.

## Verificación gate G4 — Lighthouse (P6, hecho)

Medido con Lighthouse 12 (preset desktop, las 4 categorías) sobre un **build de producción local** (`bun run build` + `bun run start`), home + 1 ruta por sección. Tras los micro-fixes de accesibilidad/favicon:

| Ruta | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/es` (home) | 100 | 100 | 100 | 100 |
| `/es/instituto` | 100 | 100 | 96* | 100 |
| `/es/instituto/comite-cientifico` | 100 | 100 | 96* | 100 |
| `/es/formacion` | 100 | 100 | 100 | 100 |
| `/es/simposios/2026-buenos-aires` | 100 | 100 | 100 | 100 |
| `/es/novedades` | 100 | 100 | 100 | 100 |

**Gate G4 cumplido** (todas las categorías ≥90, la mayoría en 100).

\* El 96 en instituto y comité-científico es **solo** por `errors-in-console`: los retratos hotlinked desde `ivujus.org.ar` dan 403 en este entorno (la política de red del sandbox bloquea ese host). No es un defecto de código; se resuelve solo cuando esas imágenes carguen contra el host real o se re-alojen (tarea manual #5 más abajo).

Fixes aplicados en P6 (commits de la rama): contraste WCAG AA del acento dorado (`--ui-accent-ink` → `#856726`, y el componente `Eyebrow` migrado a ese token; antes usaba `text-dorado-700` = `#b5905c`, 2.7:1); `heading-order` (footer h4→h2 + h2 accesible antes de las grillas de tarjetas de `/instituto` y `/novedades`); favicon (`favicon.ico` 16/32/48 + `icon.png` + `apple-icon.png`).

**Nota sobre Performance:** el 100 local no incluye la latencia real de las imágenes de `ivujus.org.ar` (acá dan 403 rápido). Conviene confirmar el Performance definitivo con **PageSpeed Insights** sobre `ivujus-web.vercel.app` una vez propagado el deploy.

### Pendiente de correr (humano)
- **Rich Results Test** (search.google.com/test/rich-results) sobre home, un perfil de autor, el Simposio y una novedad — confirmar 0 errores.

## Tareas manuales (requieren humano — no se pueden hacer desde el código)
1. **Wikidata**: crear ítem "Instituto de Victimología de Usina de Justicia (IVUJUS)"; verificar/crear ítems de miembros del Comité (Lima Malvido, Aebi, Waller, Marchiori probablemente existen) y vincularlos; agregar `sameAs` del sitio. Luego sumar el Wikidata ID al `sameAs` del JSON-LD de la organización.
2. **Google Search Console**: dar de alta la propiedad (cuando `ivujus.org.ar` apunte a Vercel), enviar el sitemap `https://ivujus.org.ar/sitemap.xml`.
3. **Bing Webmaster Tools**: ídem alta + sitemap.
4. **Confirmar redes sociales**: validar las URLs de las cuentas de Usina usadas en `sameAs` y decidir si se muestran también en el footer (hoy el footer no las muestra; la prop `socialLinks` está lista para cablearlas).
5. **Imágenes**: evaluar re-alojar las críticas (retratos, galería, prensa, portada del libro) desde `ivujus.org.ar` (WordPress/Hostinger) a Vercel Blob/R2, para mejorar LCP y robustez. Decisión de alcance.

## Notas
- Canonical y hreflang apuntan a `https://ivujus.org.ar/...` (dominio final), correcto para cuando ocurra el cutover DNS (Fase 5). Mientras se revisa en `ivujus-web.vercel.app`, las URLs canónicas ya son las definitivas.
