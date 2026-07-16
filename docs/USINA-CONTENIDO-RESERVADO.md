# Contenido real reservado para IVUJUS desde `usinadejusticia.org.ar`

**Fecha:** 16 de julio de 2026 · **Origen:** sesión de rebuild completo de `usina-de-justicia` (repo hermano). No es una propuesta — es el resultado ya ejecutado del lado de Usina.

Este documento resuelve la sección 2.3 y 9.1 de `ARQUITECTURA.md` ("Lista no exhaustiva... el relevamiento final lo hace Claude Code Web durante la fase de migración"). Ese relevamiento ya se hizo, pero **del lado de Usina, no de este repo**, como parte de la Fase 1 (inventario) y Fase 2 (reasignación de categorías) del rebuild de `usina-de-justicia`. Acá está el resultado completo, con contenido real extraído, no solo IDs.

## 1. Primero, una discrepancia real con el brief de abril

`ARQUITECTURA.md` §2.3 asumía que **tres** categorías de Usina migrarían enteras a IVUJUS: `publicaciones`, `debatesyconferencias` y `capacitacion`. En la ejecución real de julio (gate G1 del proyecto Usina, aprobado por Jair), eso **no fue lo que pasó**:

| Categoría de Usina (marzo 2026) | Posts | Qué pasó realmente en julio |
|---|---|---|
| `capacitacion` | 15 | **Los 15 fueron a IVUJUS** (redirect 301 a `ivujus.org.ar`) — coincide con el brief |
| `publicaciones` | 6 | **Se quedaron en Usina**, van a la sección `observatorio` del sitio de Usina — NO coincide con el brief |
| `debatesyconferencias` | 21 | **Se quedaron en Usina** casi todos (los de política criminal/reforma penal a `incidencia`, el resto a `institucional`) — solo se rescataron 2 para IVUJUS (ver abajo) — NO coincide con el brief |

Además de los 15 de `capacitacion`, se rescataron **4 posts individuales** que no estaban en esa categoría pero son sustancialmente de IVUJUS (el Simposio 2026, la jornada del CPACF organizada por IVUJUS, y el encuentro académico con la Universidad Nacional de Asunción). Total: **19 posts + 3 páginas planas**.

**Qué implica para este proyecto:** si `scripts/migrate-from-wp.ts` o cualquier fase futura pensaba traer `publicaciones` o `debatesyconferencias` completas desde Usina, hay que descartar esa idea — ese contenido ya es parte del sitio de Usina y no va a tener redirect hacia acá. Solo lo que sigue en la tabla de la sección 2 está realmente disponible.

## 2. Los 19 posts (contenido completo en `docs/reference/usina-source-content/posts-completos.md`)

| WP ID (Usina) | Fecha | Título | Mapeo propuesto a colección Payload |
|---|---|---|---|
| 22614 | 2026-04-03 | Cronograma del Primer Simposio Americano y Europeo de Victimología Penal | `Simposios` (campo `temario` de la entrada 2026-buenos-aires) |
| 22612 | 2026-04-03 | Primer Simposio: Inscripciones Abiertas | `Simposios` o `Novedades` relacionada |
| 22365 | 2025-11-12 | Jornada «Hacia un Derecho Científico» en el CPACF | `Ciclos` (nombre_ciclo: "Jornadas CPACF") |
| 22362 | 2025-11-12 | Jornada «Hacia un Derecho Científico»: Medición Cualitativa en la Era del Algoritmo | `Ciclos`, posible duplicado editorial del anterior — revisar antes de importar ambos |
| 21108 | 2024-07-01 | Encuentro con la Universidad Nacional de Asunción sobre formación en Victimología | `Novedades` o `Instituciones` (Paraguay, si se modela como institución de la Red) |
| 19693, 19657, 19478, 18724, 18399, 17918, 17322, 17243, 17210, 8888, 8884, 9818, 9877, 9998 | 2019–2025 | Capacitaciones históricas (UBA, UADE, Colegio Público de Abogados, Campus Virtual, Subsecretaría de DDHH, UdeMM) | `Ciclos` en su mayoría; el lanzamiento del Campus Virtual (19478) podría ser una nota histórica en `Novedades` en vez de un `Ciclo` |

Todos con `fuente = 'migracion_usina'` según el campo ya definido en `commonFields`.

## 3. Las 3 páginas planas (contenido completo en `docs/reference/usina-source-content/paginas-planas.md`)

| WP ID (Usina) | Slug | Destino propuesto |
|---|---|---|
| 15851 | `capacitacion` | Contenido institucional del programa de capacitación — insumo para `/formacion` |
| 18480 | `inscripcion-al-curso-de-victimologia` | Insumo para `/formacion/diplomatura` (ya existe como landing propia en el brief) |
| 18452 | `preinscripcion-al-curso` | Ídem — probablemente se fusiona con la anterior, quedan casi idénticas en contenido |

## 4. Los redirects ya están en producción del lado de Usina — no hay que coordinarlos, ya existen

En `usina-de-justicia/next.config.mjs` (mergeado a `master`, deployado) ya existen 22 reglas de redirect 301 que mandan estas URLs exactas a `https://ivujus.org.ar/` (raíz — no a rutas específicas, porque cuando se implementaron todavía no existía la estructura de rutas de este proyecto):

```
/:year(\d{4})/:month(\d{2})/:day(\d{2})/<slug-exacto-de-cada-uno-de-los-19-posts> → https://ivujus.org.ar/
/capacitacion → https://ivujus.org.ar/
/inscripcion-al-curso-de-victimologia → https://ivujus.org.ar/
/preinscripcion-al-curso → https://ivujus.org.ar/
```

**Acción recomendada cuando este proyecto tenga rutas reales para este contenido:** actualizar esas 22 reglas en el repo de Usina para que apunten a la ruta específica en vez de a la raíz de `ivujus.org.ar` (ej. `/2025/11/12/...cpacf → https://ivujus.org.ar/formacion/ciclos/jornada-cpacf-2025`). Esto es trabajo en el OTRO repo (`usina-de-justicia`), no en este. Avisar a Jair cuando `scripts/generate-redirects.ts` (mencionado en el brief §9.3 pero todavía no existe en este repo) esté listo, para hacer ese ajuste cruzado.

Nota: uno de los 19 slugs contiene un emoji percent-encoded en la URL (`%e2%9a%96%ef%b8%8f%f0%9f%92%bb-asi-vivimos-la-jornada...`, post 22365) — ya está probado y funcionando en el redirect de Usina tal cual viene codificado.

## 5. Componentes de diseño de IVUJUS que existen y no están portados

`src/components/{ui,editorial,cards,layout}/` en este repo son carpetas vacías (`.gitkeep`). Mientras tanto, en la misma sesión de Claude Design que generó el sistema de diseño de Usina, se generó también un sub-sistema específico para IVUJUS con paleta propia (bordeaux académico + ochre, distinta del navy de Usina). Está copiado en `docs/reference/design-system-ivujus/`:

- **Paleta real** (no la de `globals.css` actual de este repo, que usa colores ad-hoc `#0b1f3a`/`#9d5b3d` sin relación con la identidad de marca oficial):
  ```css
  --ivu-bordeaux: #6B1F2A;   /* primary académico */
  --ivu-bordeaux-900: #3E0F18;
  --ivu-bordeaux-700: #6B1F2A;
  --ivu-bordeaux-500: #A53E46;
  --ivu-ochre: #B8811C;      /* acento dorado */
  --ivu-parchment: #F6F1E7;  /* fondo pergamino */
  --ivu-ink: #1B1410;        /* texto */
  ```
- **Componentes de referencia** (JSX + Tailwind, sin tipar — son prototipos de diseño, no producción; hay que portarlos a TypeScript estricto con props explícitas para cumplir la convención de este repo): `IvuHeader`, `IvuFooter`, `HeroEditorialIvu`, `HeroAuthority`, `Programa`, `Publicaciones`, `WhyStudy`, `Cohorte`, `Docentes`, `Alianzas`.
- `ivujus.html` es la composición completa de referencia (home armada con estos componentes).
- `logo_ivujus.png`/`.jpeg`: el isotipo oficial (balanza sobre libro abierto).

**Decisión que le corresponde a Jair antes de portar esto:** confirmar si la paleta bordeaux/ochre reemplaza a la actual de `globals.css`, o si hay una razón para el cambio a los colores actuales que no está documentada. El brief (§15.2) dice explícitamente "no tocar la paleta más allá del navy heredado de Usina sin coordinar con la fase de diseño visual (Claude Design)" — y esta ES esa fase de diseño visual, ya hecha, solo que nunca llegó a este repo.

## 6. Qué NO traer de Usina (para no reabrir lo ya decidido)

Todo lo demás del contenido de Usina (historias de víctimas, prensa, incidencia, acompañamiento — las 6 categorías finales del sitio de Usina) es exclusivo de ese proyecto y no tiene ninguna relación con IVUJUS. No hace falta revisarlo.
