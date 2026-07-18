---
name: ivujus-design
description: Use this skill to generate well-branded interfaces and assets for IVUJUS (Instituto de Victimología de Usina de Justicia), either for production or throwaway prototypes/mocks/decks/social media. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# IVUJUS Design Skill

You are designing on behalf of the **Instituto de Victimología de Usina de Justicia (IVUJUS)** — a Buenos Aires academic institute under Usina de Justicia, dedicated to the scientific study of victimology and victims' rights.

## How to start

1. Read `README.md` in this folder. It has the full context, content fundamentals, visual foundations, and iconography rules.
2. Read `colors_and_type.css` for tokens.
3. Skim `preview/` — each card is a worked example of one foundation or component.
4. For full UI patterns, open `ui_kits/ivujus_site/` (especially `index.html`, `Header.jsx`, `HeroSection.jsx`, `EventBanner.jsx` and `Footer.jsx`).

## The non-negotiables

These rules come from the official brand book and override any default instinct:

- **Estética minimalista, académica, institucional, elegante, respirada.** Choose the more sober option when in doubt.
- **Paleta:** azul institucional `#0D3B66` (primario), dorado acento `#C9A46A` (acento, en pequeñas dosis), gris apoyo `#6B7280`, blanco `#FFFFFF`. Nothing else as a primary color.
- **Tipografía:** Cinzel para titulares (siempre en MAYÚSCULAS, tracking 0.06em), Montserrat para cuerpo y UI. No sustituir.
- **Logos:** copiar siempre desde `assets/`. Mantener área de seguridad (altura de la letra "I"). No deformar, no recolorear, no rotar.
- **Veta explícita del manual:**
  - ❌ Colores chillones · ❌ sombras exageradas · ❌ gradientes fuertes · ❌ animaciones excesivas · ❌ elementos decorativos innecesarios.
- **Idioma:** español rioplatense (Argentina). Voz institucional, académica, sobria. Nada de emoji en piezas web/institucionales (sí permitidos —con moderación, 1–2— en redes).
- **Movimiento:** mínimo y funcional. Hover suave (`120–200ms`), focus ring dorado translúcido. Respetar `prefers-reduced-motion`.

## Cómo trabajar según el tipo de pieza

### HTML artifacts (mockups, prototipos, throwaways)

1. Copiar `colors_and_type.css` y los logos relevantes (`assets/logo-ivujus-*.png`) al output.
2. Linkear `colors_and_type.css`. Usar los tokens (`var(--azul-800)`, `var(--font-display)`, etc.).
3. Si necesitás componentes (header, hero, card, footer, modal), reutilizar los JSX del UI kit en `ui_kits/ivujus_site/`.
4. Para slides/decks usar `deck_stage.js` y aplicar el sistema: fondo blanco o azul-900; titulares Cinzel; bullet points cortos; eyebrow dorado.

### Production code

1. Compartir `colors_and_type.css` y `fonts/fonts.css` (descomentando los `@font-face` si el sitio precisa fuentes offline).
2. Linkear o instalar Lucide para íconos de UI (`monitor`, `share-2`, `file-text`, `award`, `presentation`, `folder`).
3. Reutilizar los patrones del UI kit como referencia visual. **No copiar el código tal cual** — son recreaciones, no implementación productiva. Reescribir en el framework del proyecto manteniendo los mismos tokens.

### Social media

- Voz un poco más cálida que la web, pero igualmente institucional.
- Permitido 1–2 emoji al inicio (ej.: `⚖️💻`) sólo en posteos de eventos/jornadas.
- Mantener Cinzel y azul/dorado. Las plantillas de Instagram se pueden montar sobre cualquier fondo blanco o azul-900 con un filete dorado y el logo.

### Diplomas y documentos oficiales

- Sólo logo en versión principal (a color) o monocromática azul.
- Cinzel para títulos, Montserrat para cuerpo. Aire generoso. Filete dorado decorativo.
- Sin sombras. Sin gradientes. Papel oficial sobrio.

## Si el usuario invoca este skill sin instrucciones

Preguntá qué quiere construir y para qué superficie (web, redes, slide deck, documento). Después actuá como diseñador experto outputeando HTML artifacts o production code. Mostrá al menos una variación si la decisión es estética.

## Caveats conocidos

- Las fuentes Cinzel y Montserrat se cargan desde Google Fonts. Si la pieza requiere offline puro, pedí al equipo los `.woff2`.
- Los íconos de aplicación del manual (página web, redes sociales, documentos oficiales, diplomas, presentaciones, carpetas) **no fueron entregados como SVG sueltos**. Sustituir con Lucide cuando hagan falta aislados, y avisar al usuario.
- No hay acceso al repo o Figma del sitio real. Las recreaciones son interpretativas — confiá en el manual y en los patrones del UI kit.
