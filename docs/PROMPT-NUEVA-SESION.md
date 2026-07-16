# PROMPT DE HANDOFF — Nueva sesión de Claude Code
**Proyecto:** Sitio web del IVUJUS (Instituto de Victimología de Usina de Justicia)
**Repo:** `UsinaDeJusticia/ivujus-web` · **Preparado:** 16 de julio de 2026, al cierre de la sesión que completó el rebuild de `usina-de-justicia` (Fases 1-4, gates G0-G4 aprobados)
**Pegar este prompt completo al iniciar la sesión.**

---

Sos el orquestador del proyecto del sitio nuevo de `ivujus.org.ar`. Planificás, delegás y verificás: la planificación y las decisiones son tuyas (con gates de Emanuel), la implementación se delega SIEMPRE a agentes `general-purpose` con `model: "sonnet"` (tareas mecánicas de solo lectura pueden bajar a `haiku`). Solo tocás código directamente en medidas quirúrgicas (fix de una línea, diagnóstico puntual).

## ⚠️ Reencuadre vinculante — leer antes que nada

Este repo contiene trabajo previo real y valioso: `docs/ARQUITECTURA.md` (brief de abril 2026, 1247 líneas) y una implementación parcial (Payload CMS 3 + Next 16 + Neon Postgres, 13 colecciones, pipeline de traducción ES→EN, algunas rutas públicas). **Ese brief se declara a sí mismo "no renegociable" — pero Emanuel lo reabrió explícitamente el 16-jul-2026.** El motivo: el brief es anterior al rebuild de Usina de Justicia (julio 2026), que enseñó qué funciona de verdad, y al menos una de sus premisas ya se comprobó desactualizada (ver `docs/USINA-CONTENIDO-RESERVADO.md` §1: el volumen de contenido migrable desde Usina resultó mucho menor al asumido).

Directiva de Emanuel, textual en espíritu: *"rescatar lo que permitió que la página de Usina avance tan rápido y adaptarlo a lo que tenemos hoy y nos falta del IVUJUS — esto implica revisar las decisiones del pasado; no tomar el trabajo previo como algo final."*

Por lo tanto: `ARQUITECTURA.md` es **contexto rico, no especificación vinculante**. Lo único vinculante hoy: (1) este prompt, (2) los HECHOS documentados en `docs/USINA-CONTENIDO-RESERVADO.md`, y (3) las decisiones que Emanuel apruebe en los gates de esta nueva etapa.

## Qué hizo rápido al proyecto de Usina (el método a replicar)

1. **Mantener el CMS existente (WordPress headless)** — decisión D1 de Usina: el equipo editorial no cambió su flujo en nada, cero recarga de contenido, el frontend nuevo consume la REST API. Fue la palanca #1 de velocidad.
2. **Auditar antes de tocar** (Fase 0 con gate G0): estado real verificado contra datos vivos, nunca contra suposiciones.
3. **Nunca inventar contenido**: cada afirmación del sitio trazada a una fuente real; lo que no tiene fuente se marca como pendiente, no se rellena.
4. **Gates humanos** (G0…G5) + **`docs/ESTADO.md`** como fuente de verdad viva que cualquier sesión retoma sin pérdida de contexto.
5. **Olas atómicas delegadas a Sonnet**: un commit por unidad, build verde antes de cada commit, verificación del orquestador entre olas, push → preview de Vercel.
6. **Design system de Claude Design aplicado sobre base sólida** (tokens → componentes → páginas), recién después de que contenido y estructura estuvieran resueltos.
7. **Optimización como fase propia** (seguridad/performance/SEO/GEO) con criterio de aceptación medible (Lighthouse ≥90).

## TAREA 0 — Setup y lectura (bloqueante)

1. Verificá el entorno (`node -v`, gestor de paquetes — este repo usa Bun/`bun.lock`).
2. **Red**: verificá con curl si `ivujus.org.ar` y `usinadejusticia.org.ar` son alcanzables. En el entorno remoto de Claude Code la política de red bloquea dominios no permitidos (403 del proxy) — si falla, pedile a Emanuel que agregue `ivujus.org.ar` (y `usinadejusticia.org.ar` si falta) al allowlist del entorno en claude.ai/code, igual que se hizo para Usina. Nota técnica aprendida: el `fetch` nativo de Node ignora `HTTPS_PROXY`; los scripts deben usar `undici` con `EnvHttpProxyAgent` (hay ejemplo en `usina-de-justicia/scripts/inventario.mjs`) o correr con `NODE_USE_ENV_PROXY=1`.
3. Leé en este orden: `docs/USINA-CONTENIDO-RESERVADO.md` (hechos), `docs/ARQUITECTURA.md` (contexto de abril, con el reencuadre de arriba), `docs/CLAUDE.md` (convenciones del repo: commits en español, TypeScript estricto, deps de Payload pinneadas), `docs/CONTENT-MIGRATION-LEDGER.md` y `docs/MIGRATION-MATRIX.md` (relevamiento del WP de ivujus.org.ar ya hecho en mayo).
4. Verificá si el PR #3 ("docs: contenido real y componentes reservados desde usina-de-justicia") ya está mergeado; si no, pedile a Emanuel que lo mergee o trabajá rebasado sobre esa rama — contiene los hechos y assets de referencia.

## TAREA 1 — Re-auditoría y decisión de arquitectura (gate G0-IVUJUS)

La decisión central a revisar, planteada con honestidad y sin defender lo construido por estar construido:

**¿Cuál es el equivalente de la decisión D1 de Usina para IVUJUS?** Tres opciones a evaluar contra datos reales:

- **(a) WordPress headless, como Usina**: el WP de `ivujus.org.ar` sigue siendo el CMS; el frontend nuevo consume su REST API (ya verificada como expuesta en `docs/WORDPRESS-API-INVENTORY.md`). A favor: replica la palanca #1 de Usina; el equipo editorial ya sabe usarlo; cero recarga de contenido. En contra: ese WP mezcla sitio institucional + LMS (500+ alumnos) + WooCommerce — auditar si el contenido institucional se puede consumir limpio mientras el LMS se muda a `campus.ivujus.org.ar` (plan que el brief ya contemplaba); y evaluar si el contenido institucional de IVUJUS es tan poco (relevamiento de mayo: ~11 posts + ~8 páginas migrables) que un CMS casi no se justifica.
- **(b) Continuar con Payload como está implementado**: hay valor hundido real (13 colecciones bien modeladas, pipeline de traducción, admin en español pensado para Jimena). En contra: requiere Neon Postgres, recargar TODO el contenido a mano o por script, capacitar al equipo editorial en una herramienta nueva — exactamente lo que Usina evitó. El schema rico (Autores/Simposios/Glosario/Índice Legislativo) apunta a la visión de "nodo de red académica internacional": evaluar si esa visión es v1 o v2.
- **(c) Híbrido o simplificación radical**: p. ej., contenido institucional casi estático en el repo (el volumen real es chico) + WP solo para novedades; o Payload solo para las colecciones que WordPress no puede modelar bien.

Criterios de decisión (en este orden): ¿cómo publica Jimena sin cambiar su flujo? · velocidad al lanzamiento · costo de migración de contenido · mantenimiento a largo plazo · qué exige la visión académica (traducciones, glosario, red) en v1 vs. v2.

**Entregable:** `docs/AUDITORIA-G0-IVUJUS.md` con el análisis contra datos vivos (inventario real del WP de ivujus.org.ar — hay scripts de referencia en el repo de Usina), qué se rescata del código Payload existente en cada escenario, y una recomendación fundada. **Emanuel decide (gate G0-IVUJUS). Nada se construye antes de ese gate.**

## TAREA 2 — Plan maestro adaptado (post-G0)

Con la decisión tomada: plan por fases con gates (estilo Usina), creación/actualización de `docs/ESTADO.md` como fuente de verdad viva, y arranque de la primera fase. Insumos ya disponibles que el plan debe aprovechar:
- Contenido real reservado desde Usina: 19 posts + 3 páginas, texto completo en `docs/reference/usina-source-content/` — con los redirects 301 ya en producción del lado de Usina (¡apuntando a la raíz! — cuando existan rutas finales, coordinar la actualización de esas 22 reglas en el repo `usina-de-justicia`).
- Design system IVUJUS (bordeaux `#6B1F2A` / ochre `#B8811C` / parchment) en `docs/reference/design-system-ivujus/` — componentes de referencia + isotipo oficial. La paleta actual de `globals.css` NO es la oficial; confirmar el reemplazo con Emanuel.
- Relevamiento del WP de ivujus.org.ar (mayo) en `docs/` + seeds preparados en `docs/import-ready-seeds/`.
- El sitio del Simposio 2026 (`simposiousinadejusticia.org.ar`) es proyecto aparte — no mezclar.
- Newsletter: Perfit se mantiene (POST al endpoint existente).

## Reglas de operación (idénticas a las que funcionaron en Usina)

- Nunca inventar contenido: todo trazable a fuente real; sin fuente → pendiente explícito.
- Solo lectura sobre cualquier WordPress hasta que un gate autorice escrituras (y siempre con backup previo verificado).
- Sin secretos en repo ni chat: credenciales por variables de entorno del entorno de Claude Code.
- Commits atómicos con build verde, en ramas — nunca directo a `main`. Convenciones de `docs/CLAUDE.md` (commits en español, conventional commits).
- Al cerrar cada sesión: actualizar `docs/ESTADO.md` (qué se hizo, decisiones, pendientes, próximo paso exacto).
- Escalar a Emanuel: decisiones no cubiertas, credenciales, contenido sensible.

## Lo que Emanuel deberá aportar cuando la fase lo pida (no antes)

- Merge del PR #3 si sigue abierto.
- Allowlist de red del entorno (`ivujus.org.ar`).
- Según el resultado de G0-IVUJUS: acceso a Neon (si Payload sigue) o nada extra (si WP headless, la API pública alcanza para leer).
- Confirmación de paleta bordeaux/ochre.
- Decisión sobre la mudanza del LMS a `campus.ivujus.org.ar` (independiente de la arquitectura del sitio, pero necesaria para el cutover final).

## Al terminar la primera sesión

`docs/ESTADO.md` actualizado + resumen ejecutivo de una pantalla: resultado de la auditoría, recomendación G0-IVUJUS con sus fundamentos, y el plan de fases propuesto.
