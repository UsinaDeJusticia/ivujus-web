# Auditoría G0-IVUJUS — Decisión de arquitectura del sitio nuevo

**Fecha:** 16 de julio de 2026
**Propósito:** responder la pregunta central del gate G0-IVUJUS: *¿cuál es el equivalente de la decisión D1 de Usina para IVUJUS?* — es decir, de dónde sale el contenido del sitio nuevo y quién lo administra.
**Estado:** análisis completo con recomendación. **Decide Emanuel. Nada se construye antes de ese gate.**

---

## 1. Método y fuentes

Qué se verificó **contra datos vivos hoy** (16-jul-2026):

- `usinadejusticia.org.ar` responde 200 y **sigue sirviendo el WordPress viejo en Hostinger** (headers: `PHP/8.3.30`, `platform: hostinger`, LiteSpeed, 92 referencias a `wp-content` en la home). El rebuild Next.js de Usina está mergeado y deployado en Vercel, pero **el cutover de dominio no ocurrió** (coherente con gates G0-G4 aprobados, G5 pendiente).
- Consecuencia directa: los **22 redirects 301 hacia `ivujus.org.ar` NO están activos para el público** (se probaron `/capacitacion/`, `/inscripcion-al-curso-de-victimologia/`, `/preinscripcion-al-curso/` y un post del Simposio: todos devuelven 200 en el WP viejo, cero hops). Existen en `next.config.mjs` del repo de Usina y se activarán con el cutover de Usina. Esto **relaja la urgencia** de tener rutas finales para ese contenido, pero **acopla la secuencia**: cuando Usina haga su cutover, IVUJUS debería tener al menos una home decente que reciba ese tráfico.
- **`ivujus.org.ar` está bloqueado por la política de red del entorno** (proxy responde 403 CONNECT a `ivujus.org.ar:443`). El re-inventario vivo del WP de IVUJUS **queda pendiente** hasta que Emanuel agregue el dominio al allowlist en claude.ai/code. Este análisis usa el relevamiento de mayo 2026 (`docs/WORDPRESS-API-INVENTORY.md`, `docs/MIGRATION-MATRIX.md`, `docs/CONTENT-MIGRATION-LEDGER.md`), hecho en su momento contra la API viva. Riesgo asumido: el volumen puede haber crecido marginalmente desde mayo (2-3 posts nuevos a juzgar por el ritmo histórico); no cambia las conclusiones de escala.
- El estado del código de este repo se auditó con una revisión de solo lectura archivo por archivo + build real (detalle en §3).

## 2. Hechos: el contenido real es muy chico

Este es el dato que gobierna toda la decisión.

| Fuente | Volumen migrable real |
|---|---|
| WP de `ivujus.org.ar` (relevamiento mayo) | **11 posts** públicos + **9 páginas** marcadas `migrar` en el ledger (de 20; el resto es LMS/WooCommerce/operativa) + 317 media (mayoría del LMS) |
| Reservado desde Usina (hechos de julio, ya extraído) | **19 posts + 3 páginas**, texto completo ya versionado en `docs/reference/usina-source-content/` — la mayoría son notas históricas breves (1-3 oraciones, 2016-2023); las piezas sustantivas son ~6 (Simposio 2026 ×2, jornadas CPACF ×2, UNA Asunción, capacitación Ministerio de Seguridad) |
| **Total** | **~30 posts + ~12 páginas**, del cual el contenido "vivo" (que Jimena seguirá publicando) es solo la categoría novedades: ~5-8 posts/año según el ritmo 2025-2026 |

Además:

- Los seeds de `docs/import-ready-seeds/*.json` están **todos vacíos** (capa conservadora del protocolo de migración: nada llegó a aprobación editorial de import). No hay contenido "listo para cargar a Payload" — hay criterio editorial documentado, no datos.
- Las páginas institucionales del WP de IVUJUS son **monolitos Elementor** (`docs/MIGRATION-MATRIX.md`): `/nosotros/` mezcla finalidades + consejo + estatuto + comité en una sola página con modales inline. **No son consumibles limpias vía REST API** — cualquier escenario exige desarmarlas a mano una única vez. Esto ya está hecho en gran parte: `src/lib/instituto.ts` (206 líneas) contiene consejo, comité y estatuto curados.
- Para las colecciones "académicas" del brief no existe contenido hoy: glosario (0 fichas), red de instituciones (no constituida), índice legislativo (1 índice lanzado, cubierto como noticia), artículos firmados (0).

## 3. Hechos: qué hay construido en este repo

Auditoría de solo lectura + build real (16-jul-2026):

**Lo que funciona y tiene valor demostrado:**

- **Build verde total**: `bun install` OK, `tsc --noEmit` sin errores, `bun run build` (Next 16.2.4 + Turbopack) genera producción completa **sin credenciales de DB**.
- **7 rutas públicas reales** bajo `[locale]` (es/en/fr): home, `/instituto` (+estatuto, +consejo-directivo, +comite-cientifico), `/simposios`, `/simposios/2026-buenos-aires`. Dirección visual editorial consistente, con JSON-LD vía `src/lib/seo.ts`.
- **Datasets curados de calidad**: `src/lib/instituto.ts` y `src/lib/simposio2026.ts` (286 líneas: programa por jornadas, Declaración de Buenos Aires, prensa) — contenido real trazable, trilingüe.
- **Trabajo de análisis de migración** muy completo (ledger ítem por ítem, matriz, protocolo por capas).

**Lo que existe pero nunca se integró:**

- **13 colecciones Payload + Users** (1140 líneas), modelado denso y homogéneo, con hooks de slug/revalidación/traducción. Pero: **cero rutas leen de Payload** (`getPayload` no aparece en `src/app` ni `src/lib` fuera del route group del admin), **cero datos cargados** (nunca hubo DB conectada), sin `access` control configurado, `src/globals/` vacío.
- **Pipeline de traducción ES→EN** (`translateContent.ts`, 277 líneas, Claude Haiku): cableado a 11 colecciones, con gating correcto, pero **nunca ejecutado contra datos reales**, y sin soporte de arrays localizados (que casi todas las colecciones usan) — cobertura parcial por diseño.
- `scripts/migrate-from-wp.ts` (929 líneas) es un **clasificador/generador de reportes**, no un migrador que escriba datos.

**Deuda:** `src/components/{ui,editorial,cards,layout}/` — las 4 carpetas **vacías** (solo `.gitkeep`); todo el markup vive inline en cada página. La paleta de `globals.css` (navy heredado) **no es la oficial IVUJUS** (bordeaux/ochre en `docs/reference/design-system-ivujus/`, pendiente de confirmación). El README describe `middleware.ts` y globals que no existen.

**El hallazgo clave para la decisión:** el build pasa sin DB *precisamente porque* frontend y Payload están 100% desacoplados. El "valor hundido" de Payload es **backend puro sin un solo consumidor**; las 7 páginas existentes son reutilizables tal cual con cualquier origen de datos.

## 4. Evaluación de las tres opciones

Criterios en el orden definido: (1) flujo de Jimena · (2) velocidad al lanzamiento · (3) costo de migración de contenido · (4) mantenimiento a largo plazo · (5) visión académica v1 vs. v2.

### (a) WordPress headless puro, como Usina

El WP de `ivujus.org.ar` sigue siendo el CMS de todo; el frontend consume su REST API.

- **Flujo de Jimena:** ✅ intacto.
- **Velocidad:** ⚠️ media. Los posts se consumen limpio (11 posts, categorías `difusion/entrevistas/debate/reconocimiento` bien separadas de los tipos LMS/Woo). Pero las **páginas institucionales NO**: son Elementor monolítico; consumirlas headless significa renderizar sopa de markup o desarmarlas igual que en cualquier otro escenario. La palanca #1 de Usina funcionó porque su contenido era mayormente posts limpios y voluminosos; acá el grueso del valor institucional está en páginas sucias.
- **Migración:** ✅ cero para posts; ⚠️ el desarme de páginas hay que hacerlo igual.
- **Mantenimiento:** ⚠️ el sitio público queda dependiente de un WP en Hostinger que además opera el LMS (500+ alumnos) y que está planeado mudar a `campus.ivujus.org.ar`. La dependencia sobrevive a la mudanza (la API viaja con el WP), pero encadena el sitio institucional a la disponibilidad y a los plugins de un LMS.
- **Visión académica:** ❌ WordPress no modela glosario/autores/índice sin plugins custom; i18n de posts en WP es otro plugin más.
- **Veredicto:** replica la forma de D1 pero no su sustancia — acá no hay un cuerpo grande de contenido limpio que justifique la API como única fuente. Y los 19 posts de Usina **no están en este WP**: igual habría que cargarlos en algún lado.

### (b) Continuar con Payload como está implementado

- **Flujo de Jimena:** ❌ herramienta nueva, capacitación, flujo distinto — exactamente lo que Usina evitó.
- **Velocidad:** ❌ la más lenta: provisionar Neon, cargar TODO el contenido (que hoy está en datasets TS y en markdown de referencia) a colecciones, conectar por primera vez el frontend a Payload (integración que nunca existió), probar el pipeline de traducción en runtime, resolver `access` control público, reemplazar `db.push` por migraciones antes de producción.
- **Migración:** ❌ máxima: ~42 ítems a cargar por script o a mano, con la capa import-ready hoy vacía.
- **Mantenimiento:** ⚠️ DB gestionada + deps de Payload pinneadas a mantener + un admin que hay que sostener para ~5-8 publicaciones al año.
- **Visión académica:** ✅ es su punto fuerte — pero las colecciones que la encarnan (Glosario, Instituciones, Índice, Artículos) **no tienen contenido en v1**. Se estaría pagando hoy el costo operativo de un schema para datos que no existen.
- **Veredicto:** el costo hundido real es menor de lo que parece (backend sin consumidores, pipeline sin ejecutar) y el costo de activarlo es el mayor de las tres opciones. Payload es una respuesta correcta a una pregunta de v2.

### (c) Híbrido: contenido institucional curado en el repo + WP solo para novedades

Formalización del patrón que **ya funciona en este repo**: lo institucional/estable (instituto, consejo, comité, estatuto, simposios, formación, publicaciones históricas, los 19 posts de Usina, glosario cuando exista) vive como datasets TypeScript/MDX curados y trilingües, versionados en git; las **novedades** — lo único que Jimena publica con regularidad — se consumen de la REST API del WP actual (categorías limpias, endpoint público ya verificado).

- **Flujo de Jimena:** ✅ intacto — sigue publicando novedades en el WP de siempre; el sitio nuevo las levanta por API con ISR/revalidación.
- **Velocidad:** ✅ la más rápida: 7 rutas ya existen, el contenido faltante ya está extraído y versionado (`usina-source-content/`, ledger de mayo), y la única integración externa nueva es un fetch a `wp-json/wp/v2/posts?categories=…`.
- **Migración:** ✅ mínima y de una sola vez: desarmar las ~4 páginas Elementor sustantivas que faltan (capacitación-y-actividades, campus-virtual→formación, contacto, terms-privacy) hacia datasets curados — trabajo editorial trazable, sin scripts de carga, sin DB.
- **Mantenimiento:** ✅ el más bajo: sitio estático + una API externa con fallback (si el WP se cae, las novedades cacheadas siguen; el resto del sitio ni se entera). Sin DB propia, sin CMS propio que sostener. El contenido institucional se edita por PR — con Emanuel como único técnico, y agentes de código como herramienta de edición, es un flujo ya probado en Usina.
- **Visión académica:** ✅ diferida sin bloquearla: glosario/índice/red pueden nacer como contenido curado en repo (así empezó todo lo bueno de este proyecto) y **graduarse a un CMS en v2 cuando exista volumen y carga editorial real** que lo justifique. La decisión CMS se toma entonces con datos, no con anticipación.
- **Costo real de esta opción:** el contenido institucional deja de ser autoeditable por Jimena sin pasar por Emanuel/un agente. Con la frecuencia de cambio real de ese contenido (bios, estatuto: unas pocas veces al año), es un costo bajo y acotado.

## 5. Qué se rescata del código existente en cada escenario

| Activo | (a) WP headless | (b) Payload | (c) Híbrido |
|---|---|---|---|
| 7 rutas públicas + layout editorial | ✅ tal cual | ⚠️ reescribir contra Payload | ✅ tal cual |
| `src/lib/instituto.ts` + `simposio2026.ts` | ⚠️ semilla para cargar a WP (trabajo extra) | ⚠️ semilla para cargar a Payload | ✅ es la fuente canónica |
| `src/lib/seo.ts` (JSON-LD) | ✅ | ✅ | ✅ |
| 13 colecciones Payload + hooks | ❌ | ✅ | ⏸️ preservar en rama/carpeta para v2 |
| Pipeline traducción ES→EN | ❌ | ✅ (probarlo en runtime) | ♻️ reusable como script de build/CLI sobre datasets (el prompt+glosario valen igual) |
| `scripts/migrate-from-wp.ts` (clasificador) | ✅ auditoría | ✅ auditoría | ✅ auditoría |
| Ledger/matriz/protocolo de migración | ✅ | ✅ | ✅ (guían el desarme editorial) |
| Design system bordeaux/ochre (referencia) | ✅ | ✅ | ✅ |

En ningún escenario se tira trabajo de análisis; la diferencia real es qué pasa con las 1400 líneas de backend Payload. En (c) se recomienda **sacarlas del camino de build** (rama `payload-v2-parked` o carpeta excluida) para no pagar mantenimiento de deps pinneadas por código dormido — decisión menor que también corresponde a Emanuel.

## 6. Recomendación

**Opción (c): híbrido — contenido institucional curado en el repo + WP actual como fuente de novedades vía REST API.**

Fundamentos, en el orden de los criterios del gate:

1. Es la única opción que mantiene el flujo de Jimena intacto **y** a la vez resuelve el problema que (a) no resuelve: las páginas institucionales de este WP no son consumibles limpias — hay que desarmarlas una vez sí o sí, y una vez desarmadas, un CMS de por medio no agrega nada para ~12 páginas casi estáticas.
2. Es la más rápida al lanzamiento: extiende el patrón que ya produjo las 7 mejores páginas del proyecto, con el contenido faltante ya extraído y versionado.
3. Es la de menor costo de migración (cero scripts de carga, cero DB) y la de menor mantenimiento (un solo punto de integración externa, degradación elegante).
4. No mata la visión académica: la difiere a v2 con una ruta de graduación clara (repo → CMS cuando haya volumen), que es exactamente como Usina llegó a buen puerto — construir sobre lo real, no sobre lo aspiracional.

La lección de Usina no era "usá WordPress headless"; era **"no cambies el flujo editorial de la gente y no recargues contenido que ya existe"**. Para IVUJUS, aplicada honestamente a un corpus de ~40 ítems mayormente estáticos, esa lección apunta a (c).

## 7. Riesgos y verificaciones pendientes

- **Re-inventario vivo del WP de IVUJUS** (bloqueado por red): confirmar volumen actual de posts, que la API pública siga expuesta, y el detalle de las 4 páginas Elementor a desarmar. Primer paso obligatorio post-allowlist. Si aparece un volumen radicalmente distinto al de mayo, este análisis se revisa.
- **Secuencia con el cutover de Usina:** los 22 redirects se activarán cuando Usina apunte su dominio al rebuild. Coordinar con Jair para que ese cutover no ocurra antes de que `ivujus.org.ar` tenga (al menos) home + `/formacion` capaces de recibir ese tráfico — o que ocurra sabiendo que aterriza en la raíz.
- **Mudanza del LMS a `campus.ivujus.org.ar`:** independiente de esta decisión (la API de novedades viaja con el WP), pero necesaria para el cutover final de `ivujus.org.ar` → Vercel. Requiere plan propio con backup verificado.
- **Paleta:** confirmar reemplazo navy → bordeaux/ochre oficial antes de la fase de diseño.
- **Novedades bilingües:** en (c), los posts de WP llegan solo en ES. Propuesta v1: novedades ES-only (o traducción selectiva de piezas destacadas vía el script reciclado del pipeline). A validar en el gate.

## 8. Lo que Emanuel decide en este gate

1. **Arquitectura**: (a) WP headless / (b) Payload / **(c) híbrido — recomendada**.
2. Si (c): ¿parkear el código Payload en rama dedicada (recomendado) o dejarlo dormido en `main`?
3. Confirmación de paleta bordeaux `#6B1F2A` / ochre `#B8811C` / parchment.
4. Allowlist de red para `ivujus.org.ar` (necesario en cualquier escenario).
5. Política de novedades en EN para v1 (ES-only vs. traducción selectiva).

Con la decisión tomada se redacta el plan maestro por fases (TAREA 2) en `docs/ESTADO.md`.
