# SEO y GEO

Fecha: 2026-05-04

## Estado actual

Se implemento una primera capa tecnica de SEO/GEO sobre rutas publicas reales del frontend.

### Implementado

- `src/app/robots.ts`
  - permite crawlers estandar
  - permite explicitamente `GPTBot`, `ClaudeBot`, `PerplexityBot`, `GoogleOther`, `Amazonbot`
  - bloquea `/admin`, `/api` y `graphql-playground`
- `src/app/llms.txt/route.ts`
  - version curada inicial
  - lista `Instituto`, `Estatuto`, `Consejo Directivo`, `Comite Cientifico`, `Simposios` y `Simposio 2026`
- `src/app/sitemap.ts`
  - sitemap inicial con hreflang para rutas publicas ya existentes
- metadata por pagina en rutas institucionales y simposios
- JSON-LD en:
  - `Instituto` -> `NGO`
  - `Consejo Directivo` -> `ItemList` de `Person`
  - `Comite Cientifico` -> `ItemList` de `Person`
  - `Simposio 2026` -> `Event`

## Alcance de esta primera version

Esta implementacion es deliberadamente chica y curada. No es todavia la version completa CMS-driven descripta en el brief.

### No implementado aun

- `llms.txt` generado desde contenido de Payload
- `sitemap.xml` con todas las colecciones publicables desde base de datos
- metadata automatica para `Novedades`, `Publicaciones`, `FichasGlosario`, `Indice Legislativo`
- `sameAs` enriquecido con Wikidata o perfiles academicos externos
- validacion final de rich snippets en herramientas externas

## Regla para agentes

- No asumir que `llms.txt` ni `sitemap.ts` ya reflejan todo el sitio futuro.
- Esta capa sirve para el contenido publico implementado hoy.
- Si se agregan nuevas rutas publicas relevantes, actualizar estos archivos en el mismo cambio.

## Pendientes manuales

- Crear item Wikidata para IVUJUS.
- Vincular futuros perfiles con ORCID, Google Scholar, ResearchGate o Wikidata si existen.
- Validar structured data y coverage una vez que el sitio tenga mas contenido persistido en Payload.
