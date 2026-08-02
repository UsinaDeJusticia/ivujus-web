# ESTADO — fuente de verdad viva del proyecto `ivujus-web`

> Cualquier sesión nueva de Claude Code retoma desde acá. Actualizar al cierre de cada sesión: qué se hizo, decisiones, pendientes, próximo paso exacto.

**Última actualización:** 2 de agosto de 2026 (sesión 5 — **dossiers y primeros encuentros publicados**; GitHub reconectado, push directo restablecido)
**Rama de trabajo:** `claude/ivujus-rebuild-planning-gvcf25` = `main` (push directo funcionando de nuevo — ver nota abajo; consultar `git log -1` para el HEAD exacto)
**Etapa:** ✅ G0 · ✅ Fase 1 · ✅ G1 · ✅ Fase 2 (contenido v1) · ✅ Fase 4 (SEO/GEO/perf) · ✅ **G4** · ✅ **Ola 1 Jimena** · ✅ **Traducción completa ES/EN/FR** · ✅ **Dossiers + 2 de 3 Encuentros** → ⏭️ **Observatorio, evento del Colón y foto de Jimena, bloqueados por insumos de contenido**.

## ✅ Dossiers + Encuentros y conferencias (2-ago)

Jimena mandó un segundo documento (`PARA_PÁGINA_DE_IVUJUS.doc`, formato legacy — sin
`olefile` no se puede leer con las herramientas estándar del proyecto; se parseó a mano
el Clx/PlcPcd del FIB para extraer el texto, ver notas de la sesión si hay que repetirlo)
con el dossier que faltaba y tres eventos. Antes de usarlo se verificó/complementó todo
contra las REST API públicas de `ivujus.org.ar` y `usinadejusticia.org.ar` (ambas
accesibles por `curl` en este entorno; Clarín, Infobae y Revista Quorum NO lo son —
bloqueadas por la política de red del sandbox, se linkean sin fetchear).

**Publicado:**
- `/publicaciones/dossiers` (nuevo) — los 3 dossiers (prisión perpetua, salud mental,
  responsabilidad penal juvenil) con resumen fiel + PDF real. El de responsabilidad penal
  juvenil no existía en el sitio hasta ahora: se encontró en la biblioteca de medios de
  ivujus.org.ar (media id 24350, HTTP 200, 1.8 MB).
- `/simposios/encuentros` (nuevo) — «Encuentros y conferencias»: presentación del libro en
  la Facultad de Derecho (UBA), 24-abr-2025 (contenido nuevo, corroborado por 4 posts
  independientes de usinadejusticia.org.ar); DAIN Usina Cultural (cross-link a
  `/publicaciones/libros`, **no duplicado** — ya estaba completo ahí); Jornadas «Edad de
  Imputabilidad» (cross-link a la novedad que ya existía —
  `el-ivujus-presente-en-el-ciclo-de-formacion-2026`—, con los 2 flyers reales que Jimena
  había mandado antes, guardados en `public/eventos/`, que la novedad no tenía).
- Dataset nuevo `src/lib/encuentros/` (mismo patrón `{types,es,en,fr,index}.ts`).
- `src/lib/publicaciones/{types,es,en,fr,index}.ts` — agregado `dossiers: Dossier[]`.
- `next.config.ts` — sumado `usinadejusticia.org.ar` a `remotePatterns` (foto real de UBA).
- `check:i18n` ahora corre sobre **8 datasets**.

**Dos discrepancias entre fuentes, resueltas (no bloqueantes, quedó documentado en
`src/lib/encuentros/es.ts`):** el doc de Jimena decía «23 de febrero de **2025**» para las
jornadas de imputabilidad, pero el post en vivo de ivujus.org.ar (publicado 6-feb-2026) y
los 2 flyers ya enviados coinciden en **2026** — se usa 2026. El primer flyer decía
«Ricardo Picozzi»; 3 posts propios de usinadejusticia.org.ar dicen «**Roberto** Picozzi» —
se usa Roberto.

**Bug encontrado y corregido de paso:** `publicaciones/page.tsx` tenía un `PAGE_COPY` con
las 3 traducciones completas, pero el cuerpo de la página nunca lo leía (solo
`generateMetadata`) — el h1, la bajada y las 2 tarjetas quedaban siempre en español sin
importar el idioma. Iba a pasar desapercibido porque nadie clickea hasta esa página
buscando específicamente eso; se encontró al ir a agregar la tercera tarjeta de Dossiers.

**GitHub reconectado:** el push directo volvió a funcionar a mitad de esta sesión (antes
había que generar `git bundle` porque se había perdido la credencial). Confirmar con
`git push` antes de asumir que hace falta un bundle.

**Pendiente de este documento:** el evento del Colón y los demás "Usina de Justicia
Debate" sin cargar — no se encontró nada al buscar en ivujus.org.ar ni usinadejusticia.org.ar,
sigue en espera de material. La foto de Jimena llegó pegada en el chat, no como archivo:
no hay forma de guardarla a disco desde el contenido del mensaje: hace falta que la
reenvíe como adjunto o dé una URL.

## ✅ Traducción completa a inglés y francés (26-jul)

Antes, el selector de idioma solo cambiaba el menú y la portada: el resto del sitio quedaba en español. **Ahora todo el contenido está en los tres idiomas** (~6.500 palabras por idioma). Publicado en `main`, 11 commits (`6d908c3`→`311186e`).

**Antes de tocar cualquier traducción, leer [`GLOSARIO-TRADUCCION.md`](./GLOSARIO-TRADUCCION.md).** Es la fuente única de terminología (~70 términos) y de lo que nunca se traduce. Si un término resulta mejorable **se corrige ahí y se propaga**; nunca se improvisa una variante en un archivo suelto.

### Cómo está organizado
Cada dataset es un directorio `src/lib/<nombre>/{types,es,en,fr,index}.ts`. El `index.ts` mantiene los exports viejos apuntando a español (compatibilidad) y agrega `Record<Locale,T>` + `getXxx(locale)`. La ruta de importación `@/lib/<nombre>` no cambió. Base compartida en `src/lib/i18n.ts` (`Locale`, `resolveLocale`, `pickLocale`, `formatDateLong`), que consolidó **cuatro** implementaciones duplicadas que existían con nombres distintos.

### El verificador es la red de seguridad
`bun run check:i18n` (`scripts/check-i18n.ts`) compara los tres idiomas y falla si un campo invariante difiere, si una lista cambia de largo, o si un texto quedó idéntico al español. **Correrlo siempre después de tocar contenido.** Hoy: 7 datasets × 3 idiomas, sin problemas.

Lección de su primera corrida (reportó 108 problemas, casi todos de su propia configuración): **los invariantes no se identifican por el nombre del campo**. `fecha` puede ser el dato ISO (idéntico) o la etiqueta «Fecha»→«Date» (traducible); igual con `fuente` y `email`. Se detectan por su **valor**. Los nombres propios necesitan su categoría aparte: se esperan iguales pero no se exigen iguales.

### Decisiones editoriales vigentes (Jair)
Estatuto y política de privacidad → traducción de cortesía con aviso de que el español prevalece · citas textuales → traducidas con nota de que se pronunciaron en español · títulos de notas de prensa → **sin traducir**, indicando que el artículo está en español · el lema del hero **sí** se traduce · la Declaración de Buenos Aires tiene **traducción oficial** en PDF (ES/EN/FR/PT): no se traduce a máquina.

### Pendiente menor de traducción
`llms.txt` (mapa para IA) y las imágenes de vista previa de redes siguen solo en español.

## ⚠️ Hallazgo a corregir en el texto fuente (no es de traducción)
La **política de privacidad en español** contiene un párrafo de plantilla sobre derechos de residentes europeos, que no corresponde a una asociación civil argentina. Se tradujo tal cual a propósito: corregirlo solo en inglés y francés haría divergir las tres versiones. **Hay que corregirlo primero en español y después propagarlo.** Está documentado en un comentario en `src/lib/legal/es.ts`.

## ▶️ RETOMAR ACÁ (próximo paso literal)

**La arquitectura de información está aprobada y documentada** en
[`ARQUITECTURA-CONTENIDO.md`](./ARQUITECTURA-CONTENIDO.md) (versión clara para el equipo) y
[`GOBERNANZA-CONTENIDO.md`](./GOBERNANZA-CONTENIDO.md) (checklist obligatorio para publicar).
**Leer ambos antes de sumar contenido nuevo** — son el filtro que evita el desorden tipo Usina.
Decisiones cerradas: pilar nuevo = **Observatorio** (IUJ + Estadísticas + app de sentencias) · Biblioteca **dentro de Publicaciones** · sección «Simposios» renombrada a **«Eventos académicos»** manteniendo la URL `/simposios`.

**No hay tarea desbloqueada de código.** Las Olas 2 y 3 esperan material verificable de Emanuel/Jimena (regla: sin fuente → PENDIENTE, no se inventa):

| Ola | Qué falta |
|---|---|
| 2 | Foto nueva de Jimena (`instituto.ts:53`, hoy `jimena_molina_profiles.jpg`) · dossier de **responsabilidad penal juvenil** (los de prisión perpetua y salud mental ya están referenciados en `formacion.ts`) · «Encuentros y conferencias»: fecha + descripción + imagen/enlace de cada evento (Colón · libro en UBA y DAIN · los «Usina de Justicia Debate» · imputabilidad —de este hay 2 flyers en el .docx de Jimena—) |
| 3 | **Observatorio**: material del IUJ (la colección `IndiceLegislativoEntradas` ya existe, sin datos ni página pública) · estadísticas de Noe + formato · Biblioteca (PDFs con derechos, enlace de compra, tapas de recomendados) · identificar la app de lectura de sentencias (nombre + URL) |

**Decisión de diseño pendiente (chica, ~10 min):** el menú pasó a desplegable entre 1024 y 1280px porque la barra horizontal desbordaba (el francés necesita ~1100px). Si Emanuel prefiere conservar la barra en ese rango: acortar el CTA «Acceder al Campus» → «Campus» y bajar el breakpoint a `lg`.

**Pendientes de humano heredados de Fase 4** (en `docs/SEO-GEO.md`, no bloquean): PageSpeed real sobre el deploy · Rich Results Test · Wikidata · Search Console · Bing · URLs de redes para `sameAs` · decisión de re-alojar imágenes críticas en Vercel Blob.

**Fase 3** (WordPress headless: `/novedades` en vivo con ISR, formulario real, Perfit) sigue en cola y requiere: destino de la categoría `oea`, idioma de novedades v1, proveedor/credencial de email.

## Ola 1 de las sugerencias de Jimena (25-jul) — publicada en `main`

Jimena revisó el sitio y mandó `Sugerencias_para_la_página_de_IVUJUS.docx` (6 bloques). Emanuel pidió **contrapropuesta** para no replicar el desorden de Usina y **preservar accesibilidad + SEO/GEO**. Se aprobó la arquitectura de pilares y se ejecutó solo la Ola 1 (lo que no depende de insumos):

| Commit | Contenido |
|---|---|
| `62733d7` | `docs/ARQUITECTURA-CONTENIDO.md` + `docs/GOBERNANZA-CONTENIDO.md` |
| `82dae11` | Reescrituras de Jimena (hero home ES/EN/FR, `instituto.intro`, «Premios científicos», `formacion.intro`, «Diplomatura» sin «de posgrado», bajada y títulos de Publicaciones) · renombre a «Eventos académicos» (nav, H1 «Espacios de conocimiento e innovación», breadcrumbs, metadata, card de home) · **quitada Patricia Borras** del consejo (sitemap 150→147 URLs) |
| `d94485c` | **Fix del header** (ver abajo) |

**Lo que NO se hizo a propósito** (y por qué): cero secciones nuevas en el menú, cero PDFs sueltos, cero URLs cambiadas. Los dossiers, Encuentros, Biblioteca, Estadísticas, IUJ y la app esperan contenido real + su página HTML propia (reglas 2 y 6 de la gobernanza). El renombre mantuvo `/simposios` para no perder posicionamiento ni pedir redirects; el slug de la colección Payload y el nombre propio del evento («Primer Simposio Americano y Europeo…») quedaron intactos.

**Detalle de idioma:** la etiqueta del nav es corta a propósito («Eventos» / «Events» / «Événements»); el nombre completo «Eventos académicos» vive en H1, breadcrumb, metadata y card de home.

### Fix del header (`d94485c`) — dos defectos encontrados al verificar
1. **Logo deformado:** el header es flex y el enlace del isotipo era comprimible; con el nav ancho quedaba en 50×44 (ratio 1.14) contra el 1.23 del archivo. Arreglado con `shrink-0` en el enlace y en las dos imágenes.
2. **Desborde horizontal 768–1024px** (WCAG 1.4.10 Reflow), **preexistente** — las etiquetas nuevas son más cortas que las viejas, y no se había detectado porque la verificación de la Ola 7 solo probó 360 y 414px en español. Contenido mínimo medido: es 1071px · en 1027px · fr 1103px. La barra horizontal pasó de `md` (768px) a `xl` (1280px); debajo se usa el menú desplegable, que ya incluía navegación, CTA y los dos selectores.

**Verificación:** Lighthouse desktop **100/100/100/100** en home, eventos, formación y publicaciones · **33 casos** (3 idiomas × 11 anchos, 360–1920px) sin desborde ni deformación del logo · menú desplegable abierto y funcional en 900/1024/1180px.

**Lección operativa:** el push se rompió a mitad de sesión (se desconectó el MCP de GitHub y se perdió la credencial del proxy de git; `credential.helper` vacío, falla incluso `git ls-remote`). No es reparable dentro de la sesión: las credenciales se provisionan al inicio. Se resolvió generando un `git bundle` y publicándolo Emanuel desde su máquina (fast-forward de rama y `main`). **Ante un push roto: bundle + `SendUserFile`, no esperar.** Los commits quedan como «Unverified» en GitHub por falta de clave de firmado (cosmético).

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

## Acceso de revisión y mecanismo de producción (20-jul)
- **Certificados = 500** en `/formacion/diplomatura` (commit `644749b`): decisión editorial de Emanuel, documentada en `formacion.ts` como override explícito del valor real de la fuente (0).
- **URL pública de revisión**: se mergeó (fast-forward, permiso explícito de Emanuel) la rama a **`main`** → Vercel dispara deployment de **producción público** en **`https://ivujus-web.vercel.app`** (esa es la URL para Jimena/equipo; sin login, sin caducidad, se actualiza en cada re-merge a main). **NO toca `ivujus.org.ar`** (DNS sigue en el WP viejo).
- **Mecanismo de lanzamiento aclarado** (corrige una respuesta previa imprecisa): desplegar código en Vercel SÍ se hace desde el entorno vía git (push a rama = preview; merge a `main` = producción pública). Lo único que NO puede hacer el agente: (a) ajustes de cuenta Vercel (protección, rama de producción, miembros) — dashboard de Emanuel; (b) el cutover DNS de `ivujus.org.ar` → Vercel, que es infra (Cloudflare/registrar), Fase 5. La rama de producción del proyecto es `main` (verificado: el push disparó `target:production`).
- Flujo de trabajo: seguir desarrollando en `claude/ivujus-rebuild-planning-gvcf25`; re-mergear a `main` (ff) cuando haya avances para que el equipo los vea en `ivujus-web.vercel.app`.

## Fase 2 — olas ejecutadas (todas en `main`, públicas en ivujus-web.vercel.app)
- ✅ **Formación** (`3bc3961`): /formacion, /diplomatura, /ciclos +[slug].
- ✅ **A · Novedades** (`f96ff84`): /novedades +[slug], 6 posts reales del WP (slugs limpios, imágenes destacadas).
- ✅ **B · Contacto + Privacidad** (`56d5ae2`, worktree paralelo): /contacto (maqueta form, info@ivujus.org.ar; POST en Fase 3) + /terms-privacy (texto real del WP page 18848; EN/FR muestran ES con aviso, sin traducción jurídica).
- ✅ **C · Publicaciones** (`c662c08`, worktree paralelo): /publicaciones hub + /declaraciones + declaracion-de-buenos-aires (de simposio2026.ts) + /libros "Nuevos Paradigmas" (posts WP 24509/24540, con fuente real).
- ✅ **Integración** (`1eae1a2`): Publicaciones al nav; Contacto+Privacidad columna "Institucional" del footer; card Publicaciones en home (ES/EN/FR). Build+tsc verdes, 0 overflow 360px en las 6 rutas nuevas. B y C se hicieron en worktrees aislados en paralelo y se trajeron por cherry-pick (disjuntos, sin conflicto).

- ✅ **E · Bios individuales** (`d982895`): `/instituto/consejo-directivo/[slug]` (7) y `/comite-cientifico/[slug]` (8), desde instituto.ts, con JSON-LD Person y links desde los listados. En `main`.

- ✅ **D · Galería del Simposio** (`573a016` + fix `3e048e3`): 11 fotos reales curadas ("usá tu criterio" de Emanuel) en `/simposios/2026-buenos-aires`, grid responsivo. Epígrafes corregidos por el orquestador: solo nombre + "expositor/a" (se quitó la atribución de panel/fecha que la fuente no establece). En `main`.
- ✅ **Fix "Canadá"** (`c4fdf18`): país no se repite en Comité (listado + bio).

## ✅ FASE 2 COMPLETA — gate G2 pendiente (revisión de Emanuel)
Todo el contenido v1 está en `main` → `ivujus-web.vercel.app`. Rutas: home, instituto (+estatuto, +consejo/[slug], +comité/[slug]), formación (+diplomatura, +ciclos/[slug]), simposios (+2026 con galería), publicaciones (+declaraciones/declaracion-de-buenos-aires, +libros si aplica), novedades (+[slug]), contacto, terms-privacy. Nav/footer/home integrados.

## Próximo (post-G2): Fase 3 — WordPress headless + formularios
`/novedades` desde REST API en vivo con ISR (reemplaza el dataset sembrado) + mapeo categoría `oea` + idioma EN/FR de novedades; formulario de contacto real (route handler + proveedor email); Perfit. Requiere de Emanuel: destino `oea`, idioma novedades v1, proveedor de email + credencial.

## Polish menor pendiente (no bloquea)
- Bio de comité (`[slug]`): muestra el país dos veces ("Canadá" como rol dorado + "CANADÁ" como label), porque en comité `role == country`. Fix trivial: no repetir country cuando coincide con role. Anotado para pulido.
- Imágenes hotlinked (retratos/prensa/portada libro) dan 403 en el sandbox de verificación (fetch server-side de Next sin proxy); cargan bien en producción. Día-2: evaluar re-alojar en Vercel Blob/R2.

## Decisiones/insumos de Emanuel aún pendientes
- Dominio campus (usado `usinadejusticiacampus.org.ar`, confirmar) · redes sociales (footer) · destino `oea` · idioma novedades v1 · parkeo Payload · proveedor email (Fase 3) · texto legal (contacto/terms) · TAEDA · selección galería · **métrica "Certificados 0"** (nueva, ver arriba).

## Hechos de referencia rápida

- Contenido migrable: ~32 posts (13 del WP IVUJUS —11 de mayo +2 `oea`— + 19 de Usina) + ~12 páginas. `docs/import-ready-seeds/*.json` siguen vacíos (capa conservadora).
- WP vivo: WordPress 7.0.2 + Elementor 4.1.5 + WooCommerce + LearnDash; REST API pública OK; plugin Redirection activo.
- Usina: cutover pendiente (dominio sirve WP viejo en Hostinger); los 22 redirects 301 hacia `ivujus.org.ar` se activarán con ese cutover; el nav actual de IVUJUS linkea "Publicaciones" hacia una categoría que Usina retiene → anotar en mapa de redirects.
- Design system oficial: `docs/reference/design-system-oficial/` (el bordeaux/ochre de `design-system-ivujus/` queda como material histórico). El copy del UI kit es inferido, NO fuente de contenido (ej. "desde 2017" es incorrecto: IVUJUS se fundó en marzo 2025).
- Sitio del Simposio 2026: proyecto aparte, no mezclar. Newsletter: Perfit se mantiene.
- Reglas: solo lectura sobre cualquier WordPress hasta gate que autorice escrituras · commits atómicos en español con build verde · nunca directo a `main` · sin secretos en repo ni chat.
