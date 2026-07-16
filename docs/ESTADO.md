# ESTADO — fuente de verdad viva del proyecto `ivujus-web`

> Cualquier sesión nueva de Claude Code retoma desde acá. Actualizar al cierre de cada sesión: qué se hizo, decisiones, pendientes, próximo paso exacto.

**Última actualización:** 16 de julio de 2026 (sesión 1 de la nueva etapa — re-auditoría G0-IVUJUS)
**Rama de trabajo:** `claude/ivujus-rebuild-planning-gvcf25`
**Etapa:** ⏸️ **esperando gate G0-IVUJUS** (decisión de arquitectura de Emanuel). Nada se construye antes de ese gate.

---

## Marco vinculante

- `docs/ARQUITECTURA.md` (brief abril 2026) fue **reabierto por Emanuel el 16-jul-2026**: es contexto rico, NO especificación vinculante.
- Vinculante hoy: el prompt de handoff (`docs/PROMPT-NUEVA-SESION.md`), los hechos de `docs/USINA-CONTENIDO-RESERVADO.md`, y las decisiones que Emanuel apruebe en gates.
- Método a replicar (probado en Usina): auditar antes de tocar · nunca inventar contenido · gates humanos · olas atómicas delegadas a Sonnet con build verde · design system sobre base sólida · optimización como fase propia.

## Qué se hizo (sesión 16-jul-2026)

1. **TAREA 0 completa**: entorno verificado (Node v22, Bun 1.3.11), PR #3 confirmado mergeado (`3cfa606`), toda la documentación leída.
2. **Auditoría de código** (solo lectura + build real): 13 colecciones Payload sin un solo consumidor ni dato cargado; 7 rutas públicas estáticas de buena calidad que NO tocan Payload; pipeline de traducción nunca ejecutado; carpetas de componentes vacías; build y typecheck **verdes sin DB**. Detalle en `docs/AUDITORIA-G0-IVUJUS.md` §3.
3. **Verificaciones contra datos vivos**:
   - `usinadejusticia.org.ar` sigue sirviendo el **WP viejo en Hostinger** → el cutover del rebuild de Usina no ocurrió → los **22 redirects 301 hacia ivujus.org.ar NO están activos aún** (matiza `USINA-CONTENIDO-RESERVADO.md` §4: existen en el código deployado, no en el dominio público).
   - `ivujus.org.ar` **bloqueado por la política de red del entorno** (403 del proxy) → re-inventario vivo pendiente de allowlist.
4. **Entregable del gate**: `docs/AUDITORIA-G0-IVUJUS.md` — análisis de las 3 opciones (WP headless / Payload / híbrido) contra los 5 criterios, matriz de rescate de código por escenario, y **recomendación: opción (c) híbrido** — contenido institucional curado en el repo (patrón ya probado en las 7 rutas existentes) + WP actual como fuente de novedades vía REST API (flujo de Jimena intacto).

## Decisiones tomadas

| Fecha | Decisión | Quién |
|---|---|---|
| 16-jul-2026 | Reapertura del brief de abril; trabajo previo no es final | Emanuel |
| 16-jul-2026 | Recomendación G0-IVUJUS: opción (c) híbrido | Claude (orquestador) — **pendiente de aprobación** |

## Pendientes de Emanuel (bloquean el arranque de fases)

1. **Gate G0-IVUJUS**: elegir (a)/(b)/(c) — ver `docs/AUDITORIA-G0-IVUJUS.md` §8.
2. **Allowlist de red**: agregar `ivujus.org.ar` al entorno en claude.ai/code (necesario en cualquier escenario).
3. Confirmar paleta bordeaux `#6B1F2A` / ochre `#B8811C` (reemplaza el navy actual de `globals.css`).
4. Si (c): ¿parkear código Payload en rama dedicada (recomendado) o dejarlo dormido en `main`?
5. Política de novedades en inglés para v1 (ES-only vs. traducción selectiva).

## Próximo paso exacto (sesión siguiente)

1. Si hay decisión de G0-IVUJUS → redactar **plan maestro por fases con gates** (TAREA 2 del handoff) acá en ESTADO.md y arrancar Fase 1.
2. Si además hay allowlist → **re-inventario vivo del WP de ivujus.org.ar** (validar volumen vs. relevamiento de mayo; usar `undici` + `EnvHttpProxyAgent` o `NODE_USE_ENV_PROXY=1` — el fetch nativo de Node ignora `HTTPS_PROXY`).
3. Coordinar con Jair la secuencia del cutover de Usina (los 22 redirects aterrizan en la raíz de `ivujus.org.ar` cuando ocurra).

## Hechos de referencia rápida

- Contenido migrable total: ~30 posts + ~12 páginas (11 posts + 9 páginas del WP de IVUJUS según ledger de mayo; 19 posts + 3 páginas reservados de Usina con texto completo en `docs/reference/usina-source-content/`).
- `docs/import-ready-seeds/*.json`: **todos vacíos** — no hay nada aprobado para import.
- Páginas institucionales del WP de IVUJUS = monolitos Elementor → no consumibles limpias por API; requieren desarme editorial único en cualquier escenario.
- Colecciones académicas del brief (glosario, red, índice, artículos): **sin contenido real hoy** → v2.
- Sitio del Simposio 2026 (`simposiousinadejusticia.org.ar`): proyecto aparte, no mezclar.
- Newsletter: Perfit se mantiene (POST al endpoint existente).
- Reglas de operación: solo lectura sobre cualquier WordPress hasta gate que autorice escrituras · commits atómicos en español con build verde · nunca directo a `main` · sin secretos en repo ni chat.
