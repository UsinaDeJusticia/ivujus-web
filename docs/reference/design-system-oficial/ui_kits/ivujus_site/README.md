# IVUJUS — UI kit del sitio institucional

Recreación de fidelidad media-alta del sitio `ivujus.org.ar` siguiendo el manual de identidad oficial. Es una maqueta **clicable** que demuestra los patrones visuales y componentes principales del Instituto.

## Cómo correrlo

Abrir `index.html` en el navegador. Carga React + Babel desde CDN y los componentes desde archivos `.jsx` adyacentes.

## Componentes

| Archivo | Qué expone |
|---|---|
| `Buttons.jsx` | `ButtonPrincipal` (azul), `ButtonSecundario` (dorado), `ButtonTerciario` (borde azul) y `LinkArrow` (link CTA con flecha animada). |
| `SectionHeader.jsx` | `Eyebrow` (regla dorada + texto en versalitas) + `SectionHeader` (eyebrow + h2 Cinzel + lead). |
| `Header.jsx` | Header sticky con logo, navegación principal y CTA "Acceder al Campus". Se compacta al hacer scroll. |
| `HeroSection.jsx` | Hero institucional con tagline, lead, CTAs y versión monocromática azul del logo. |
| `CoursesGrid.jsx` | Grilla de Diplomatura + Cursos. Cada `CourseCard` abre el detalle modal. |
| `EventBanner.jsx` | Banda oscura promocionando el Simposio anual, con datos clave (fechas, sede, organización). |
| `BlogList.jsx` | Sección de blog con un post destacado + dos posts secundarios. |
| `NewsletterStrip.jsx` | Suscripción a la newsletter. |
| `Footer.jsx` | Footer institucional sobre azul-900 con logo negativo, columnas de navegación y links a redes. |
| `Modals.jsx` | `CourseModal` (detalle de curso) y `CampusModal` (login del Campus virtual). |
| `App.jsx` | Composición + estado (modales, toasts, navegación). |

## Interacciones implementadas

- **Header sticky** que se compacta al hacer scroll (`88px → 64px`).
- **Navegación** scrollea suavemente a las anclas de cada sección.
- **"Acceder al Campus"** abre el modal de login.
- **Click en un curso** abre el modal de detalle.
- **Inscribirse / Suscribirse** muestran un toast inferior de confirmación.
- **Esc** cierra los modales; click fuera del card también.

## Cosas que NO están en producción real (caveat)

- Sin acceso al repo de `ivujus.org.ar` ni a Figma. El sitio real es WordPress con un theme distinto; lo que ves acá es una **interpretación canónica del manual de identidad** aplicado a la información pública de IVUJUS.
- Los íconos de redes son letras como placeholder. Si se reemplazan por SVGs, usar Lucide (`linkedin`, `instagram`, `facebook`, `youtube`) en azul/dorado.
- Las fotos de jornadas no se incluyen; el hero usa el logo en grande como punto focal — un patrón válido por brand book pero conviene complementar con fotografía real si se dispone.

## Cómo extenderlo

- Para una segunda landing (ej.: página del Simposio, o un detalle de curso completo) reutilizar `Header`, `Footer`, `SectionHeader`, `Buttons` y los tokens de `colors_and_type.css`. Los componentes están desacoplados.
- Para una página interna de blog/curso, partir de `BlogPostCard` extendiéndolo a una vista detalle con prose (`max-width: 68ch`).
