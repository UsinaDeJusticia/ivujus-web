# ESTADO — fuente de verdad viva del proyecto `ivujus-web`

> Cualquier sesión nueva de Claude Code retoma desde acá. Actualizar al cierre de cada sesión: qué se hizo, decisiones, pendientes, próximo paso exacto.

**Última actualización:** 18 de julio de 2026 (sesión 2 — gate G0 resuelto, design system oficial recibido, plan maestro propuesto)
**Rama de trabajo:** `claude/ivujus-rebuild-planning-gvcf25`
**Etapa:** ✅ G0-IVUJUS decidido → **Fase 1 (fundación de diseño) lista para arrancar** tras confirmación del plan por Emanuel.

---

## Marco vinculante

- `docs/ARQUITECTURA.md` (brief abril 2026): contexto rico, NO especificación vinculante (reabierto por Emanuel el 16-jul).
- Vinculante: el prompt de handoff (`docs/PROMPT-NUEVA-SESION.md`), los hechos de `docs/USINA-CONTENIDO-RESERVADO.md`, `docs/AUDITORIA-G0-IVUJUS.md` (incl. addendum §9), y las decisiones de Emanuel en gates.
- Método (probado en Usina): auditar antes de tocar · nunca inventar contenido · gates humanos · olas atómicas delegadas a Sonnet con build verde · design system sobre base sólida · optimización como fase propia.

## Decisiones tomadas

| Fecha | Decisión | Quién |
|---|---|---|
| 16-jul-2026 | Reapertura del brief de abril; trabajo previo no es final | Emanuel |
| 18-jul-2026 | **G0-IVUJUS: WordPress sigue como CMS para agregar contenido, como en Usina.** Posts/novedades se consumen vía REST API; las páginas institucionales (Elementor + las HTML artesanales de Emanuel) se reconstruyen en el frontend nuevo manteniendo el contenido | Emanuel |
| 18-jul-2026 | **Diseño: design system oficial nuevo** (azul `#0D3B66` + dorado `#C9A46A`, Cinzel/Montserrat, logo nuevo). Supersede el navy ad-hoc de `globals.css` y el bordeaux/ochre de julio. Versionado en `docs/reference/design-system-oficial/` | Emanuel |
| 18-jul-2026 | Consecuencia G0: Payload queda fuera del camino de v1 (colecciones sin datos ni consumidores). Propuesta: parkearlo en rama `payload-v2-parked` — **a confirmar** | Claude (orquestador) |

## Qué se hizo

**Sesión 16-jul:** TAREA 0 completa · auditoría de código (build verde sin DB; frontend 100% desacoplado de Payload; 7 rutas estáticas de calidad) · verificación viva de Usina (cutover pendiente, 22 redirects aún no activos) · `docs/AUDITORIA-G0-IVUJUS.md` con recomendación.

**Sesión 18-jul:** allowlist de `ivujus.org.ar` activo · **re-inventario vivo del WP** (deltas vs. mayo: +2 posts categoría nueva `oea` —alianza INDODPRO / Convención Interamericana—, +1 página stub `victimasconderechos` → redirect 302 a app externa `victimas-derechos-app.vercel.app`, media 317→320, home/nav/Simposio sin cambios) · páginas clave verificadas como Elementor (las "HTML puro" de Emanuel no aparecen vía API) · **design system oficial** analizado y versionado en `docs/reference/design-system-oficial/` (tokens, 5 logos, lámina de identidad, UI kit ES/EN/FR, guía de voz) · addendum §9 en la auditoría · plan maestro propuesto (abajo).

## Plan maestro por fases (propuesto 18-jul, estilo Usina — cada fase cierra con gate de Emanuel)

- **Fase 0 — Auditoría y arquitectura** ✅ (gates G0 aprobado 18-jul).
- **Fase 1 — Fundación de diseño (gate G1):** portar tokens oficiales a `globals.css` (Tailwind v4) + fuentes Cinzel/Montserrat + logos a `public/` · componentes base en TS estricto (`Header`, `Footer`, `Buttons`, `SectionHeader`, cards) portados del UI kit · re-skin de las 7 rutas existentes manteniendo contenido · home nueva según composición del kit (Hero + oferta académica + banner Simposio + novedades + newsletter). **Criterio:** preview de Vercel con look oficial aprobado por Emanuel.
- **Fase 2 — Contenido institucional completo (gate G2):** desarme de las páginas Elementor restantes hacia rutas nuevas manteniendo contenido real (`campus-virtual`→`/formacion/diplomatura`, `capacitacion-y-actividades`→`/formacion/ciclos`, `contacto`, `terms-privacy`) · incorporar los 19 posts + 3 páginas reservados de Usina a sus rutas finales · integrar las páginas HTML artesanales de Emanuel (URLs pendientes) · todo trazable al ledger. **Criterio:** cero contenido inventado; ledger actualizado ítem por ítem.
- **Fase 3 — Integración WordPress headless (gate G3):** `/novedades` desde REST API con ISR/revalidación (incluye decisión de mapeo de categoría `oea`) · formulario de contacto · Perfit (POST al endpoint existente). **Criterio:** post nuevo publicado por Jimena en WP aparece en el sitio sin tocar código.
- **Fase 4 — SEO/GEO y optimización (gate G4):** JSON-LD por tipo, sitemap+hreflang, llms.txt, robots, OG images, redirects internos (`/nosotros`→`/instituto`, etc.) + archivo de redirects para Usina con rutas finales (coordinar con Jair las 22 reglas). **Criterio:** Lighthouse ≥90 en todas las métricas.
- **Fase 5 — Cutover (gate G5):** DNS `ivujus.org.ar`→Vercel · WP actual queda como origen headless (mudanza del LMS: decisión independiente) · Search Console/Bing · monitoreo. **Criterio:** sitio live, redirects verdes, Jimena publica normalmente.

## Pendientes de Emanuel (no bloquean Fase 1)

1. **Confirmar el plan de fases** de arriba (o ajustarlo) — con eso arranca Fase 1.
2. **URLs exactas de las páginas "HTML puro"** que hiciste a mano: no aparecen vía REST API (las páginas del WP son todas Elementor). ¿Es una de ellas la app `victimas-derechos-app.vercel.app` (descubierta como redirect desde `/victimasconderechos/`)? ¿Qué es esa app y se coordina con este proyecto? Si hay que inspeccionarla: agregar su dominio al allowlist.
3. **Destino editorial de la categoría `oea`** (Convención Interamericana / INDODPRO): ¿novedades o sección propia de proyección internacional?
4. **Dominio real del campus**: el design system dice `usinadejusticiacampus.org.ar`; el brief planeaba `campus.ivujus.org.ar`. ¿Cuál es el CTA correcto?
5. **Parkear código Payload** en rama `payload-v2-parked` (recomendado) ¿ok?
6. **Novedades en inglés v1**: ¿ES-only o traducción selectiva?

## Próximo paso exacto (sesión siguiente)

1. Con el plan confirmado → **Fase 1 en olas atómicas delegadas a Sonnet**: (1ª ola) tokens+fuentes+logos, (2ª) componentes base TS, (3ª) re-skin de rutas existentes, (4ª) home nueva. Un commit por ola, build verde antes de cada commit, push → preview Vercel → gate G1.
2. Incorporar las respuestas de los pendientes 2-6 donde correspondan.

## Hechos de referencia rápida

- Contenido migrable: ~32 posts (13 del WP IVUJUS —11 de mayo +2 `oea`— + 19 de Usina) + ~12 páginas. `docs/import-ready-seeds/*.json` siguen vacíos (capa conservadora).
- WP vivo: WordPress 7.0.2 + Elementor 4.1.5 + WooCommerce + LearnDash; REST API pública OK; plugin Redirection activo.
- Usina: cutover pendiente (dominio sirve WP viejo en Hostinger); los 22 redirects 301 hacia `ivujus.org.ar` se activarán con ese cutover; el nav actual de IVUJUS linkea "Publicaciones" hacia una categoría que Usina retiene → anotar en mapa de redirects.
- Design system oficial: `docs/reference/design-system-oficial/` (el bordeaux/ochre de `design-system-ivujus/` queda como material histórico). El copy del UI kit es inferido, NO fuente de contenido (ej. "desde 2017" es incorrecto: IVUJUS se fundó en marzo 2025).
- Sitio del Simposio 2026: proyecto aparte, no mezclar. Newsletter: Perfit se mantiene.
- Reglas: solo lectura sobre cualquier WordPress hasta gate que autorice escrituras · commits atómicos en español con build verde · nunca directo a `main` · sin secretos en repo ni chat.
