# IVUJUS — Sistema de Diseño

> **Conocimiento que ilumina, formación que transforma.**
>
> Identidad visual del **Instituto de Victimología de Usina de Justicia (IVUJUS)** — recursos, tokens, componentes y reglas para producir piezas (web, redes, presentaciones, diplomas, papelería) coherentes con la marca institucional.

---

## ¿Qué es IVUJUS?

El **Instituto de Victimología de Usina de Justicia** es un instituto académico argentino dedicado al estudio científico de la victimología y los derechos de las víctimas de delito. Funciona bajo el paraguas de **Usina de Justicia**, una asociación civil que trabaja por los derechos de los familiares de víctimas de homicidio y femicidio.

El instituto:

- Dicta la **Diplomatura en Victimología y Leyes de Víctimas** y otros cursos a través del Campus virtual.
- Organiza simposios y jornadas académicas — por ejemplo el **Primer Simposio Americano y Europeo de Victimología Penal** realizado en el CPACF (Av. Corrientes 1441, CABA).
- Publica un **blog** con notas, debates y reconocimientos del campo.
- Trabaja conjuntamente con el **Programa de Derechos y Garantías de las Víctimas de Delito del CPACF**.

**Directora:** María Jimena Molina.

### Superficies del producto

| Superficie | URL | Rol |
|---|---|---|
| Sitio institucional IVUJUS | `https://ivujus.org.ar` | Vitrina académica, oferta de cursos, blog, contacto |
| Campus virtual | `https://usinadejusticiacampus.org.ar` | Plataforma de cursos online |
| Asociación madre | `https://usinadejusticia.org.ar` | Usina de Justicia (asociación civil) |
| Sitio del simposio | `https://simposiousinadejusticia.org.ar` | Microsite del simposio anual |

**Contacto:** `info@ivujus.org.ar` · Redes: LinkedIn, Instagram, Facebook, YouTube.

### Fuentes de este sistema

Este design system se construyó a partir de los siguientes recursos provistos por el equipo:

1. **`uploads/identidad visual_ivujus.png`** — Lámina oficial "IDENTIDAD VISUAL – IVUJUS" con paleta, tipografía, versiones del logo, reglas de uso, área de seguridad, aplicaciones y estilo web recomendado. *(Conservada como `assets/identidad-visual-board.png`.)*
2. **`uploads/logo_ivujus nuevo.jpeg`** — Logo principal a alta resolución. *(Conservado como `assets/logo-ivujus-primary.jpeg`.)*
3. Contexto investigado en: `ivujus.org.ar/blog`, notas del Simposio en Infobae y Quórum, proyecto de declaración en la Legislatura, y páginas del Campus.

> **Importante:** este repositorio **no tiene acceso al código fuente** de `ivujus.org.ar` ni a Figma. Los componentes del UI kit son recreaciones de fidelidad media-alta inferidas a partir del manual de identidad y el contexto público.

---

## Índice del repositorio

```
.
├── README.md                          ← este archivo
├── SKILL.md                           ← instrucciones para agentes (Claude Skills)
├── colors_and_type.css                ← tokens base (colores, tipografía, espacios, sombras, motion)
├── fonts/
│   └── fonts.css                      ← @font-face locales (opt-in, ver archivo)
├── assets/
│   ├── logo-ivujus-primary.jpeg              ← logo principal (alta res, fondo blanco)
│   ├── logo-ivujus-principal-from-board.png  ← versión principal recortada del manual
│   ├── logo-ivujus-monocromatica-azul.png    ← monocromática azul
│   ├── logo-ivujus-negra.png                 ← versión negra
│   ├── logo-ivujus-negativo.png              ← negativo (blanco sobre azul)
│   └── identidad-visual-board.png            ← lámina oficial de identidad
├── preview/                           ← tarjetas para la pestaña Design System
│   ├── 01-brand-card.html
│   ├── 02-logo-versions.html
│   ├── ...
└── ui_kits/
    └── ivujus_site/
        ├── README.md
        ├── index.html                 ← maqueta interactiva del sitio
        ├── Header.jsx
        ├── HeroSection.jsx
        ├── CourseCard.jsx
        ├── BlogPostCard.jsx
        ├── BlogList.jsx
        ├── EventBanner.jsx
        ├── Footer.jsx
        └── Buttons.jsx
```

---

## CONTENT FUNDAMENTALS — Voz, tono y copy

IVUJUS comunica desde una posición **institucional, académica y sobria**, en **español rioplatense** (Argentina). La marca trata temas sensibles —víctimas de delitos violentos, homicidio, femicidio— y eso atraviesa todo el copy: nunca es alegre, nunca es marketinero. Cuando ilumina, ilumina con gravedad.

### Tono

- **Académico** sin ser árido. Se citan leyes (Ley 27.372, Ley 6115 CABA), autores, organismos (OEA, CPACF, OEA). Se argumenta. Las notas son ensayísticas más que noticiosas.
- **Institucional**. La voz es la del Instituto, no la de una persona. Se habla en **tercera persona** ("el Instituto…", "IVUJUS…") o en **plural inclusivo** ("nuestra propuesta", "abordamos").
- **Respetuoso del lector**. Se usa **usted/ustedes** en formularios y contactos directos; el voseo argentino ("vos") aparece sólo en piezas de redes con tono más cálido (ej.: "Suscribite para recibir nuestras novedades").
- **Esperanzador pero no celebratorio**. El campo se renueva, pero hay dolor de fondo. Frases como *"giro copernicano a favor de quien sufrió un delito"* o *"las víctimas ya no son invisibles"* — esperanza con peso.

### Reglas concretas

| Norma | Cómo |
|---|---|
| **Mayúsculas** | Tipográficas en titulares (CINZEL en VERSALES); oraciones normales en cuerpo. Evitar mayúsculas de "Marketing Cap Case" en cuerpo. |
| **Tildes** | Siempre. "Victimología", "según", "más". Es marca de prolijidad académica. |
| **Pronombre** | Tercera persona ("el IVUJUS…", "la directora del Instituto…") o plural ("ofrecemos", "nuestra diplomatura"). El "tú" no se usa. |
| **Emoji** | **No** en piezas institucionales. **Sí, mínimos**, en redes (ej.: ⚖️💻 abriendo un posteo de jornada). Nunca decorativos en web ni en documentos. |
| **CTAs** | Verbos directos en infinitivo o imperativo formal: "Ver curso", "Inscribirse", "Conocer más", "Acceder al Campus", "Descargar programa". Evitar "¡Comprá ahora!" o exclamaciones. |
| **Cifras y leyes** | Con punto separador de miles a la argentina: "Ley 27.372". Fechas escritas: "9 y 10 de abril de 2026". |
| **Títulos largos** | Permitidos y comunes: *"Primer Simposio Americano y Europeo de Victimología Penal: Las víctimas de homicidio en contexto de inseguridad"*. La tipografía debe respirar para sostenerlos. |

### Vocabulario de la marca

| Sí | Evitar |
|---|---|
| víctima · victimología · derecho victimal | "usuario" como sinónimo de víctima |
| diplomatura · capacitación · formación | "curso online express", "training" |
| jornada · simposio · panel · ponencia | "webinar", "evento", "meetup" |
| Instituto · IVUJUS · Usina de Justicia | "la organización", "la ONG" a secas |
| dictado por · a cargo de · disertante | "presentado por", "speaker" |
| conocer más · acceder · inscribirse | "click acá", "descubrí", "sumate ya" |

### Ejemplos reales

> *"Nuestra propuesta de capacitación profesional se orienta a que el cursante adquiera un exhaustivo conocimiento acerca de las leyes de víctimas vigentes hasta el momento en el país, así como también la legislación internacional que protege los derechos humanos de las víctimas, en el contexto de la Victimología, una disciplina científica en constante evolución."* — descripción de la Diplomatura.

> *"Conocimiento que ilumina, formación que transforma."* — tagline institucional. Tres notas: dos paralelismos, palabra "ilumina" (que rima con los rayos dorados del logo), y la promesa de transformación (académica y social).

> *"⚖️💻 ¡Así vivimos la jornada 'Hacia un Derecho Científico' en el CPACF"* — único registro donde aparecen emoji y signos de exclamación: posteos de blog/redes contando cómo fue una jornada.

---

## VISUAL FOUNDATIONS — Fundamentos visuales

> Filosofía resumida del manual oficial:
> **estética minimalista, académica, institucional, elegante y respirada**.
> Se prohíben explícitamente los colores chillones, las sombras exageradas, los gradientes fuertes, las animaciones excesivas y los elementos decorativos innecesarios.

Si dudás entre dos opciones de diseño, elegí la más sobria.

### Colores

| Token | Hex | Uso |
|---|---|---|
| `--color-azul-institucional` | `#0D3B66` | Color primario. Logo, titulares, botón principal, fondos oscuros. **80–90 % del peso cromático de la pieza.** |
| `--color-dorado-acento` | `#C9A46A` | Acento dorado. Líneas decorativas, eyebrows, botón secundario, subrayados de enlaces. **Sólo en pequeños puntos**. |
| `--color-gris-apoyo` | `#6B7280` | Texto secundario, separadores, metadatos. |
| `--color-blanco` | `#FFFFFF` | Fondo por defecto. La marca respira blanco. |

Para escalas armónicas (50–950) ver `colors_and_type.css`.

**Reglas de combinación:**

- Azul institucional sobre blanco, o blanco sobre azul institucional. Esa es la dupla principal.
- El dorado **nunca** se usa como color de fondo grande. Sólo como filete, ícono pequeño, botón secundario o detalle tipográfico.
- Gradientes: **prohibidos** salvo un sutilísimo `linear-gradient(180deg, white, var(--azul-50))` para diferenciar secciones. Nunca degradados azul→violeta tipo SaaS.

### Tipografía

| Rol | Familia | Cuándo |
|---|---|---|
| **Display / titulares** | **Cinzel** (serif romana, en versales) | h1, h2, h3, eyebrows en redes. Siempre en mayúsculas con `letter-spacing: 0.06em`. |
| **Cuerpo / UI** | **Montserrat** (geométrica sans) | Párrafos, botones, navegación, formularios, h4–h6. |
| **Mono** | `ui-monospace` system | Excepcional. Code blocks en docs. |

Cinzel hace todo el trabajo de "señorío institucional"; Montserrat aporta la modernidad y legibilidad. **Nunca** sustituir esas dos por Inter, Roboto o similares — el manual lo prohíbe explícitamente ("No modificar tipografía").

> ⚠️ **Sustitución activa:** los archivos `.woff2` no fueron provistos; este sistema carga **Cinzel y Montserrat desde Google Fonts**. Si Aspectos legales o de despliegue requieren las fuentes empaquetadas (ej.: PDF de diplomas), pedir al equipo de IVUJUS las licencias o los archivos originales y descomentar los `@font-face` en `fonts/fonts.css`.

### Espacios y aire

- Escala 4 px (`--space-1` = 4 px … `--space-32` = 128 px).
- **Respirar** es regla: secciones de landing con `padding-block: 96–128px`. Cards con `padding: 32px`.
- Texto cuerpo con `line-height: 1.7` y `text-wrap: pretty`. Titulares con `1.15` y `text-wrap: balance`.
- Contenedor principal: `max-width: 1180px`. Prosa: `68ch`.

### Backgrounds e imágenes

- Fondo por defecto: **blanco**. Variantes muy suaves: `--azul-50` (#F4F7FA) o `--gris-50` (#F8F9FA) para alternar bandas.
- Fondos oscuros: azul institucional pleno (`#0D3B66`) o `--azul-900` para footer.
- **Sin patrones ni texturas decorativas.** Sin papel rugoso, sin tramas.
- Imagenes fotográficas: documentales, color natural (no saturadas), tendiendo a frío. Foto de jornadas, retratos de disertantes, planos del CPACF. Tratamiento: sin filtros ni granos forzados. Si una foto es muy ruda, aplicar un overlay azul institucional al 30–40 % para integrarla.
- Las únicas ilustraciones aceptables son los **íconos institucionales del manual** (página web, redes sociales, documentos oficiales, diplomas y certificados, presentaciones, carpetas y papelería) — pictogramas de línea, en azul institucional o dorado.

### Animaciones y movimiento

- **Mínimas y funcionales.** El manual indica explícitamente "evitar animaciones excesivas".
- Hover en links/botones: cambio de color en `120ms` con `cubic-bezier(0.4, 0, 0.2, 1)`. Sin bounce, sin scale > 1.02.
- Reveal al hacer scroll: opacidad `0 → 1` + `translateY(8px → 0)` en `320ms`. Una sola vez.
- Sin parallax. Sin loops infinitos (excepto un breve "shimmer" en estados de carga si es necesario).
- Respetar `prefers-reduced-motion: reduce` siempre.

### Estados (hover / focus / press)

| Estado | Mecanismo |
|---|---|
| **Hover** sobre fondo claro | Botones primarios: oscurecen ~6 % (`--azul-900`). Botones dorados: oscurecen al `--dorado-700`. Cards: borde inferior dorado anima `width: 0 → 100%` en 200ms (variante mínima). |
| **Hover** sobre links | `color` pasa de `--azul-700` a `--azul-800`; el `text-decoration-color` pasa de dorado claro a dorado oscuro. Sin negrita súbita. |
| **Focus** (teclado) | Anillo dorado translúcido `0 0 0 3px rgba(201,164,106,0.40)`. Visible siempre, no se quita por estética. |
| **Press / active** | Botones bajan opacidad a `0.92`. No usamos `scale` ni "depresión" mecánica. |
| **Disabled** | Opacidad `0.45`, `cursor: not-allowed`. Sin tachado. |

### Bordes, radios y sombras

- Radios pequeños (`4–6px`) en botones y cards. La marca es "papel oficial", no app de mensajería.
- `--radius-pill` (999px) sólo para chips/badges de categoría.
- Sombras muy tenues, **siempre en azul translúcido** (`rgba(13,59,102,0.06–0.10)`), nunca en negro puro. No usar sombras grandes ni dramáticas — el manual lo veta.
- Bordes por defecto en `--border-subtle` (`#E2E5E9`). Para acento usar 1–2 px del dorado (no más).

### Capsulas vs gradients de protección

- Sobre fotografía oscura: caption blanca con sombra texto sutil `0 1px 2px rgba(0,0,0,0.45)`. Si la imagen está muy variada, sumar overlay lineal `rgba(0,0,0,0.0) → rgba(13,59,102,0.55)`.
- Nunca pill encapsulados de glassmorphism.

### Transparencia y blur

- Header sticky: fondo `rgba(255,255,255,0.92)` + `backdrop-filter: blur(8px)`. Muy sutil.
- Modales: backdrop `rgba(13,59,102,0.45)`, sin blur o blur mínimo (4 px).
- Evitar el "frosted glass" como motivo estético.

### Layout

- Header fijo de 88 px (64 px al scrollear). Logo a la izquierda, navegación al centro, CTA "Acceder al Campus" a la derecha (botón secundario dorado o terciario con borde azul).
- Footer de fondo `--azul-900` con texto blanco / dorado.
- Grilla principal: 12 columnas, gutter 24 px, max-width 1180 px.

### Iconografía — ver sección ICONOGRAPHY abajo.

---

## ICONOGRAPHY — Sistema de íconos

El manual de identidad incluye seis **íconos de aplicación** (pictogramas de línea, peso ~1.5 px, ángulos rectos, sin relleno) que representan los soportes donde vive la marca:

`PÁGINA WEB` · `REDES SOCIALES` · `DOCUMENTOS OFICIALES` · `DIPLOMAS Y CERTIFICADOS` · `PRESENTACIONES` · `CARPETAS Y PAPELERÍA`.

**No existe** un sistema propio de íconos de UI más allá de esos seis. Tampoco hay una fuente de íconos integrada en el sitio.

### Sustitución recomendada

Para íconos de interfaz (lupa, menú hamburguesa, flecha, mail, redes, etc.) usamos **Lucide** desde CDN. Razones: trazos de línea, peso uniforme (~1.5 px), ángulos rectos, sin relleno — coherentes con el estilo de los pictogramas del manual.

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="search" style="color: var(--color-azul-institucional); width: 20px; height: 20px;"></i>
<script>lucide.createIcons();</script>
```

> ⚠️ **Sustitución activa:** los íconos de aplicación del manual (web, redes, etc.) **no fueron provistos como SVG individuales**, sólo como recorte de la lámina. Para piezas finales que los usen aisladamente, se recomienda pedir al diseñador original los SVG sueltos o reproducirlos como pictogramas Lucide equivalentes (`monitor`, `share-2`, `file-text`, `award`, `presentation`, `folder`).

### Logotipos disponibles

| Archivo | Cuándo |
|---|---|
| `assets/logo-ivujus-primary.jpeg` | Versión principal, alta resolución. Para web y print sobre fondo claro. |
| `assets/logo-ivujus-principal-from-board.png` | Versión principal recortada del manual (alternativa con la misma composición). |
| `assets/logo-ivujus-monocromatica-azul.png` | Sin acentos dorados, todo azul institucional. Para piezas que no admiten dos tintas. |
| `assets/logo-ivujus-negra.png` | Monocromática negra. Para faxes, sellos, fotocopias. |
| `assets/logo-ivujus-negativo.png` | Blanco sobre azul institucional. Para footer y fondos oscuros. |

**Área de seguridad:** equivalente a la altura de la letra "I" del logo en cada lado. El manual lo establece como inviolable.

**Reglas de uso (manual oficial):**

- ❌ No deformar, estirar, aplastar, inclinar ni rotar el logo.
- ❌ No cambiar los colores oficiales del logo.
- ❌ No modificar la tipografía del logo.
- ✅ Mantener contraste adecuado en todos los usos.

### Emoji y caracteres unicode

Reservados a **redes sociales**, donde se usan con moderación (1 par de emoji al inicio de un copy de jornada, máximo). Ejemplos vistos en producción: `⚖️`, `💻`. **No usar emoji en el sitio web, diplomas, documentos ni presentaciones institucionales.**

Los caracteres especiales (´, ¿, ¡, ñ) son obligatorios; respetar siempre la ortografía del español rioplatense.

---

## Cómo usar este sistema

1. Linkear `colors_and_type.css` desde tu HTML.
2. Para piezas que necesiten fuentes offline, descomentar los bloques de `fonts/fonts.css` y descargar los `.woff2` desde Google Fonts.
3. Copiar los logos relevantes desde `assets/` a tu pieza.
4. Mirar `preview/` para ejemplos de cada token y componente, y `ui_kits/ivujus_site/index.html` para una composición completa.
5. Para construir piezas nuevas como agente, leer también `SKILL.md` que contiene instrucciones específicas.

---

## Caveats conocidos

- **Sin acceso a Figma ni al repositorio del sitio** — el UI kit es inferido. Si el equipo provee el repo de `ivujus.org.ar` o un archivo Figma, las recreaciones pueden ajustarse más finamente.
- **Fuentes**: cargadas desde Google Fonts (Cinzel + Montserrat); si se requiere offline, descomentar `fonts/fonts.css` y sumar `.woff2`.
- **Íconos de aplicación**: no entregados como SVG sueltos. Sustitución con Lucide. Ver sección ICONOGRAPHY.
- **Texto y datos del UI kit** son representativos pero no necesariamente verbatim del sitio en producción.
