# ESTADO — fuente de verdad viva del proyecto `ivujus-web`

> Cualquier sesión nueva de Claude Code retoma desde acá. Actualizar al cierre de cada sesión: qué se hizo, decisiones, pendientes, próximo paso exacto.

**Última actualización:** 18 de julio de 2026 (sesión 2 — Fase 1 + iteración G1 con feedback de Emanuel)
**Rama de trabajo:** `claude/ivujus-rebuild-planning-gvcf25`
**Etapa:** ✅ G0 decidido · ✅ plan aprobado · ✅ Fase 1 (olas 1-5) · ✅ **iteración G1 (olas 6-7)** aplicando el feedback de Emanuel → ⏸️ **re-revisión de gate G1** sobre el preview.

## Iteración G1 (18-jul) — feedback de Emanuel sobre el primer preview

Emanuel pidió 4 cosas; las 4 resueltas y verificadas con Chromium:
- **Ola 6 — temas de lectura + cambio de idioma** (commits 692709a, 2a82bdd, 224c448): 3 temas (claro/sepia/oscuro) con tokens `--ui-*`, selectores de idioma (ES·EN·FR) y tema en el Header, script anti-flash. Superficies de marca (banda Simposio, footer, botones) fijas. **Bug sistémico corregido**: el baseline de elementos estaba sin `@layer` y pisaba las utilidades de Tailwind → todo enlace/botón tomaba color de link + subrayado (texto de botones invisible, peor en sepia). Movido a `@layer base`; verificado por estilos computados en los 3 temas.
- **Ola 7 — responsive + imágenes** (commit c5a2b3a): Header con menú móvil accesible (hamburguesa, aria-expanded/controls, Esc, cierre al navegar, inert cuando cerrado) < 768px; a 768px+ intacto. Overflow horizontal eliminado — verificado scrollWidth == viewport a 360px y 414px en las 4 rutas (antes ~467). `<img>` → `next/image` con aspect-ratio + object-cover; `remotePatterns` sumados (ivujus.org.ar, infobae, defonline, revistaquorum). Fix extra en home: `min-w-0` en grid items + `break-words` en el h1.

Nota menor pendiente de criterio de Emanuel: a 360px el h1 del hero parte "INVESTIGACIÓN" a mitad de palabra (tradeoff del display grande sin overflow) — se puede refinar con clamp responsivo si molesta.
Sandbox: las imágenes hotlinkeadas dan 403 (red bloquea esos hosts); el `next/image` es correcto y cargará en producción, con fondo de token mientras tanto.

## Fase 1 ejecutada (18-jul, olas atómicas por Sonnet, verificadas por el orquestador)

| Ola | Commit | Contenido |
|---|---|---|
| 1 | `a8e5020` | Tokens oficiales azul/dorado en `globals.css` (@theme Tailwind v4), Cinzel/Montserrat vía next/font (autohospedadas), 7 logos en `public/logos/` |
| 2 | `fee39f5` | Ortografía española completa restaurada en datasets y todo el copy (verificada contra las páginas vivas; slugs/URLs intactos) |
| 3 | `225077f` | Componentes base TS estricto: `Header` sticky, `Footer`, `Buttons` (3 variantes + LinkArrow), `SectionHeader`/`Eyebrow`, `ContentCard` + tokens de espaciado/tipo/radios (en `:root` para no pisar utilidades Tailwind) |
| 4 | `ab2c05d` | Re-skin de las 6 rutas instituto/simposios + layout compartido con Header/Footer. Contenido intacto. Nav solo con rutas existentes |
| 5 | `ffadba3` | Home nueva: hero + banda Simposio (datos reales) + grilla de acceso (5 rutas reales) + newsletter con endpoint Perfit real. Alias `usina-*` eliminados. Cero contenido inventado del kit |

Decisiones de ejecución documentadas en los commits: sin CTA de campus ni redes sociales (URLs no confirmadas — props opcionales listas); tema claro único (sepia/oscuro difieren a v2); los links de la home vieja a rutas inexistentes (`/formacion`, `/publicaciones`, `/novedades`, `/red`, `/indice-legislativo`, `/contacto`, `/terms-privacy`) se retiraron y se restauran cuando esas rutas existan (Fases 2-3); FR de la home tenía acentos rotos y se corrigió.

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

## Páginas artesanales de Emanuel (aclarado 18-jul)

Emanuel confirmó: sus páginas "HTML puro" son **`/nosotros/` y `/simposio-2026/`** (un único widget HTML de Elementor con HTML+CSS+JS artesanal adentro). `/campus-virtual/` no es suya, se tocará más adelante — **omitida por ahora**. Son fuente canónica de contenido: se adaptan al diseño nuevo manteniendo contenido.

**Auditoría de fidelidad contra los datasets del repo (18-jul):** `src/lib/instituto.ts` y `src/lib/simposio2026.ts` cubren casi todo. Hallazgos y estado:

- ✅ **Corregido** (commit de esta sesión): bio de Irvin Waller estaba truncada (faltaba la oración final sobre su obra); Art. 3 del estatuto estaba parafraseado — restaurado verbatim con sus 6 incisos.
- ⚠️ **Galería de 14 fotos del evento en `/simposio-2026/`** (widget `media-carousel` separado del HTML artesanal, `wp-content/uploads/2026/04/`: slotolow, pascua, molina, garavano, console, casares, bargna, aebi + 6 WhatsApp-Image): NO está en el dataset ni en la ruta. **Decisión pendiente de Emanuel**: ¿migrar completa, curada o descartar?
- ⚠️ Alt-text de la nota de Infobae menciona "Distinción Fundación TAEDA" — dato no presente en ningún otro lado; verificar con la fuente antes de usar o descartar.
- Menores: la página viva rotula a Aebi solo "Argentina" (el repo usa "Argentina-Suiza", más preciso — mantener repo salvo indicación); `organizingInstitution: 'Usina de Justicia y CPACF'` del dataset no está declarado en la página viva (confirmar); los resúmenes de jornada son paráfrasis editorial aceptable.
- 🔧 **Deuda sistémica detectada**: los datasets y páginas del repo eliminan TODAS las tildes/ñ ("Emerito", "Declaracion") — el sitio renderiza español sin acentos. El design system oficial exige "Tildes: siempre". **Restaurar ortografía completa es ítem obligatorio de Fase 1/2.**
- 🔧 Las 15 fotos de perfiles + galería + PDF de la Declaración siguen hosteadas en `ivujus.org.ar/wp-content/` (y las 6 imágenes de prensa en dominios de medios): plan de re-alojamiento de assets propio va en Fase 2.

## Decisiones de Emanuel del 18-jul (registradas)

- Plan de fases: **aprobado**. Ejecución con modelo económico (Sonnet), orquestación y verificación con Fable; escalar solo ante problemas.
- Galería del Simposio: **versión curada** (a ejecutar en Fase 2).
- Deuda de tildes: **obligatoria** → ✅ cumplida (ola 2).
- Dato "Distinción Fundación TAEDA": verificar antes de usar → pendiente (infobae.com bloqueado por el proxy; pedir allowlist o el texto de la nota).

## Vercel: integración GitHub desconectada (diagnosticado 18-jul)

Ningún push dispara deploys desde el 4 de mayo (ni siquiera los merges de Emanuel de julio). Se probó el truco de mayo (commit vacío `00e402a` con identidad git válida): **no disparó nada** → no es el filtro de autoría, la integración GitHub↔Vercel del proyecto está caída/desvinculada. **Solo Emanuel puede reconectarla**: vercel.com → proyecto `ivujus-web` → Settings → Git → reconectar `UsinaDeJusticia/ivujus-web` (o en GitHub: Settings → GitHub Apps → Vercel → dar acceso al repo). **Causa raíz confirmada (18-jul):** Vercel rechaza la conexión porque el repo es privado (el plan gratuito no conecta repos privados de organizaciones). `usina-de-justicia`, `mapa-delito-usina` y `simposio2026` son públicos — por eso funcionan. Solución: hacer público `ivujus-web` (GitHub → Settings → Danger Zone → Change visibility). **Chequeo de seguridad previo hecho**: historial completo sin secretos (cero `.env` commiteados, cero claves reales; único hit = placeholder de `.env.example`). Reconectada, cualquier push regenera previews; para el gate G1 alcanza con "Create Deployment"/Redeploy de la rama `claude/ivujus-rebuild-planning-gvcf25` desde el dashboard.

## Víctimas con Derechos (aclarado por Emanuel 18-jul)

Fue una **campaña camino a la OEA**, nada más. Su app (`victimas-derechos-app.vercel.app`, proyecto propio de la cuenta de Vercel de Emanuel) rompe la estética del sitio. **Propuesta de ordenamiento (a confirmar en el gate de Fase 3):**
- Los 2 posts de la categoría `oea` se mapean a **`novedades`** (cobertura de campaña; sin sección propia — la campaña no es una línea editorial permanente).
- La app queda como **microsite externo archivado** (mismo estatus que el sitio del Simposio): no se integra ni se re-estiliza en v1.
- Al lanzar el sitio nuevo, la URL `/victimasconderechos` se preserva con un redirect en `next.config` hacia la app de Vercel (hoy lo hace el plugin Redirection del WP) — histórico de campaña no se rompe.
- Si el trabajo OEA se vuelve línea permanente (Convención Interamericana avanza), en v2 se evalúa sección de proyección internacional.

## Pendientes de Emanuel (no bloquean, se cablean cuando lleguen)

1. **Gate G1**: aprobar el look del preview de Vercel de la rama (o pedir ajustes). (Repo hecho público y Vercel reconectado por Emanuel el 18-jul ✅)
3. **Destino editorial de la categoría `oea`** (Convención Interamericana / INDODPRO): ¿novedades o sección propia? (necesario en Fase 3).
4. **Dominio real del campus** (`usinadejusticiacampus.org.ar` vs `campus.ivujus.org.ar`) → habilita el CTA "Acceder al Campus" del Header (prop ya lista).
5. **Redes sociales oficiales** (URLs confirmadas) → habilita `socialLinks` del Footer (prop ya lista).
6. **Parkear código Payload** en rama `payload-v2-parked` (recomendado) ¿ok?
7. **Novedades en inglés v1**: ¿ES-only o traducción selectiva? (necesario en Fase 3).

## Roadmap por fases hasta el lanzamiento v1 (aprobado por Emanuel 20-jul)

Detalle completo en el plan de la sesión; resumen persistido acá:
- **Fase 2 — Contenido v1 (gate G2):** rutas faltantes con contenido real. Olas: **Formación** (`/formacion`, `/formacion/diplomatura` [desarme de `campus-virtual` + páginas planas de Usina; CTA campus = dec. dominio], `/formacion/ciclos` + `[slug]` [~16 posts de Ciclos de Usina + `capacitacion-y-actividades`]; nuevo `src/lib/formacion.ts`); **Novedades** (estructura `/novedades` + `[slug]`); **Publicaciones** (`/publicaciones/declaraciones/declaracion-de-buenos-aires`, ya en `simposio2026.ts`; evaluar `/publicaciones/libros` "Nuevos Paradigmas"); **Contacto** y **Términos/Privacidad**; **galería curada del Simposio**; **cierre**: restaurar accesos en home/nav/footer. Opcional: bios `[slug]`.
- **Fase 3 — WordPress headless + formularios (gate G3):** cliente REST del WP → `/novedades` con ISR; contacto (route handler + proveedor email); Perfit; fallback si el WP cae.
- **Fase 4 — SEO/GEO + performance (gate G4):** robots/sitemap/llms.txt, builders JSON-LD tipados en `src/lib/seo.ts`, OG dinámicas, redirects internos + coordinar las 22 reglas de Usina con Jair; Lighthouse ≥90.
- **Fase 5 — Cutover (gate G5):** parkear Payload (sacar `withPayload`/`db.push` del build), DNS→Vercel, mudanza LMS, Search Console/Sentry, verificar 301.
- **Diferido a v2 (sin contenido hoy):** `/red/*`, `/publicaciones/articulos`, glosario, análisis del índice legislativo, reactivación de Payload + pipeline de traducción.

## Fase 2 en curso

- ✅ **Gate G1 aprobado** por Emanuel (20-jul): "me gusta la vista del preview".
- ✅ **Ola Formación** (commit `3bc3961`): rutas `/formacion`, `/formacion/diplomatura`, `/formacion/ciclos` (+ `[slug]`, 12 ciclos). Dataset `src/lib/formacion.ts`. CTA "Acceder al Campus" cableado a `usinadejusticiacampus.org.ar` (fuente: README del design system; confirmable con Jair). "Formación" sumado a nav/footer/home. Fidelidad auditada por el orquestador contra fuentes vivas: métricas (Inscriptos 500 / Certificados 0 / 9,7 de 10) y reseñas verbatim del WP `campus-virtual`; ciclos trazados a `posts-completos.md` con `source_wp_id`; faltantes marcados PENDIENTE (módulos de la diplomatura, mini-FAQ, un PDF histórico). Build/tsc verdes, responsive 360px OK, temas OK, logos sin recuadro.
- ⚠️ **A criterio de Emanuel**: la métrica "Certificados 0" es real (está en la página viva) pero se muestra prominente; puede leerse como poco favorable. Mantener (fiel), ocultar o reemplazar por otra métrica — decisión pendiente.

## Olas restantes de Fase 2 (próximo)
1. **Novedades** (estructura `/novedades` + `[slug]`).
2. **Publicaciones** mínimo v1: `/publicaciones/declaraciones/declaracion-de-buenos-aires` (texto en `simposio2026.ts`); evaluar `/publicaciones/libros` "Nuevos Paradigmas".
3. **Contacto** (maqueta; envío real en Fase 3) y **Términos/Privacidad** (dep. texto legal).
4. **Galería curada del Simposio** (dep. selección de fotos).
5. **Bios individuales** `[slug]` (opcional).

## Decisiones/insumos de Emanuel aún pendientes
- Dominio campus (usado `usinadejusticiacampus.org.ar`, confirmar) · redes sociales (footer) · destino `oea` · idioma novedades v1 · parkeo Payload · proveedor email (Fase 3) · texto legal (contacto/terms) · TAEDA · selección galería · **métrica "Certificados 0"** (nueva, ver arriba).

## Hechos de referencia rápida

- Contenido migrable: ~32 posts (13 del WP IVUJUS —11 de mayo +2 `oea`— + 19 de Usina) + ~12 páginas. `docs/import-ready-seeds/*.json` siguen vacíos (capa conservadora).
- WP vivo: WordPress 7.0.2 + Elementor 4.1.5 + WooCommerce + LearnDash; REST API pública OK; plugin Redirection activo.
- Usina: cutover pendiente (dominio sirve WP viejo en Hostinger); los 22 redirects 301 hacia `ivujus.org.ar` se activarán con ese cutover; el nav actual de IVUJUS linkea "Publicaciones" hacia una categoría que Usina retiene → anotar en mapa de redirects.
- Design system oficial: `docs/reference/design-system-oficial/` (el bordeaux/ochre de `design-system-ivujus/` queda como material histórico). El copy del UI kit es inferido, NO fuente de contenido (ej. "desde 2017" es incorrecto: IVUJUS se fundó en marzo 2025).
- Sitio del Simposio 2026: proyecto aparte, no mezclar. Newsletter: Perfit se mantiene.
- Reglas: solo lectura sobre cualquier WordPress hasta gate que autorice escrituras · commits atómicos en español con build verde · nunca directo a `main` · sin secretos en repo ni chat.
