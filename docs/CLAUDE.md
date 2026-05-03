# Instrucciones para agentes de código en `ivujus-web`

Este documento guía a agentes de código (Claude Code, OpenCode, y similares)
que trabajan en este repositorio. Leer primero
[`ARQUITECTURA.md`](./ARQUITECTURA.md) — es la fuente de verdad.

## Convenciones

### Idioma

- **Commits, comentarios, nombres de campos en el schema de Payload y copys del
  admin → español.**
- **Nombres de variables, funciones, tipos y archivos → inglés** (excepto donde
  coincide con terminología de negocio, p. ej. `Articulos`, `Autores`,
  `ComiteCientifico`).

### Commits

- Conventional Commits en español: `feat:`, `fix:`, `chore:`, `docs:`,
  `refactor:`, `test:`, `build:`, `ci:`, `perf:`.
- Cuerpo del commit descriptivo, no solo el título. Si el cambio toca el brief,
  referenciarlo.

### Estilo de código

- TypeScript estricto, sin `any` salvo justificación en comentario.
- Componentes funcionales con tipos explícitos para props.
- Nada de comentarios que expliquen QUÉ hace el código; solo comentarios donde
  sea necesario explicar POR QUÉ una decisión no obvia.
- Identaciones con 2 espacios.
- LF como line ending (forzado en `.gitattributes`).

### Dependencias

- **Next.js y Payload pinneados exactos** en `package.json` (sin `^` ni `~`).
  Todas las subpackages de Payload (`@payloadcms/*`) deben coincidir en
  versión con `payload`.
- Otras dependencias pueden usar `^` para minor updates.
- No agregar dependencias nuevas sin justificación en el brief o aprobación
  explícita de Jair.

## Flujo de trabajo por fases

Cada fase del brief tiene criterios de aceptación cerrados. No avanzar a la
siguiente sin que la actual esté 100%. Si un criterio no puede cumplirse por
razones externas (credencial faltante, decisión pendiente), escalar a Jair.

## Pendientes técnicos a resolver antes del lanzamiento

### Reemplazar `db.push: true` por migraciones (Fase 7)

El adapter de Postgres en `src/payload.config.ts` tiene `push: true`. Eso
hace que Drizzle sincronice el schema contra Neon en cada arranque. Es
práctico durante Fases 1–6 (el schema cambia mucho), pero **antes del
lanzamiento de producción** hay que:

1. Quitar `push: true` (o ponerlo detrás de un guard tipo
   `process.env.NODE_ENV !== 'production'`).
2. Generar migraciones reales con `bun run payload migrate:create`.
3. Agregar `payload migrate &&` al `build` script de `package.json` para
   que cada deploy de Vercel aplique las migraciones pendientes.

Este paso queda anotado como acción explícita en la Fase 7 (QA y
lanzamiento).

## Qué NO hacer

Sección 15.2 del brief. Resumen:

- No implementar LMS, pagos, gestión de alumnos.
- No crear cuentas de redes sociales propias del IVUJUS.
- No traducir masivamente todo el contenido migrado (costo alto).
- No implementar el agente IA publicador en v1.
- No mezclar el sitio del Simposio 2026 con este proyecto.
