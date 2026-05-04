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

## Fase 3: traducción automática

### Alcance v1

- **Solo ES → EN.** FR queda soportado por schema y localization, pero **no**
  se traduce automáticamente. Decisión motivada por costo de Claude API y
  porque el brief solo exige ES + EN al lanzamiento.
- Hook `afterChange` (`src/hooks/translateContent.ts`) cableado a las 10
  colecciones publicables. **No** está en `Autores`, `Users` ni `Media`.
- Proveedor: Claude API, modelo `claude-haiku-4-5` con structured outputs
  (`output_config.format: json_schema`). Cliente en `src/lib/translate.ts`.

### Reglas de gating (en orden)

1. `req.context.skipTranslation === true` → salir. Lo usa el propio update
   interno del hook para evitar loops, y los seeds/scripts deberían pasarlo.
2. `req.locale && req.locale !== 'es'` → salir. Solo traducimos desde ES.
3. `doc.requiere_revision_autor === true` → marcar
   `traduccion_estado = 'pendiente'` y salir. Contenido firmado no se
   autotraduce; espera revisión humana.
4. Si ningún campo localizado ES cambió respecto a `previousDoc` → salir.
5. Despachar el trabajo pesado a `after()` de `next/server` para que el
   guardado del admin no se bloquee. Si `after()` no está disponible
   (Local API fuera de App Router), se loguea y se saltea.

### Cómo se evita el loop

El hook no se autollama porque cada update interno (sea de traducción o de
gating) pasa `context: { skipTranslation: true }`. La primera línea del hook
chequea esa flag. Igual: si alguna vez se removiera ese flag por error, el
gating de cambios (paso 4) cortaría el loop a los pocos hops porque las
traducciones ya quedaron guardadas y no detectaría nuevos cambios ES.

### Estados de `traduccion_estado`

- `pendiente`: requiere revisión autor, falló traducción, o todavía no se
  procesó.
- `automatica`: traducción EN generada por el pipeline, sin revisión
  humana. Lista para uso pero no auditada.
- `revisada_humano`: reservado para flujo editorial manual posterior. El
  pipeline automático **no** marca este valor.
- `publicada`: reservado para cuando exista lógica explícita de publicación
  de traducción. El pipeline automático **no** lo marca.

### Diferido a Fase 3.1

- **Arrays con subcampos localizados** (Publicaciones, IndiceLegislativo,
  Simposios). El walker actual recorre top-level + groups. Para arrays se
  requiere recorrer cada item; quedó fuera para no expandir alcance ahora.
- **Blocks con subcampos localizados** (no se usan todavía en el schema
  v1, pero anotado por completitud).
- **Traducción FR**: estructura ya soportada; no hay pipeline.
- **Cola/cron/batch nocturno** explícitamente excluido del v1.

### Costo y observabilidad

`@anthropic-ai/sdk` está pinneado con `^0.92.0`. Cada save dispara entre 1 y
N llamadas a la API según campos cambiados. Si el budget se vuelve un
problema, próximo paso natural: agrupar más leaves por llamada o pasar a
batches.

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
