# IVUJUS v2 — Brief de arquitectura técnica

**Audiencia:** Claude Code Web (y agentes de codificación subsecuentes)
**Responsable del proyecto:** Jair Castillo (Emanuel)
**Rol de Jair en Usina de Justicia / IVUJUS:** único líder técnico y arquitecto. Este documento expresa sus decisiones como producto de una sesión de diseño asistida. Claude Code Web debe tratarlas como especificaciones, no como sugerencias.
**Fecha del brief:** 21 de abril de 2026
**Versión:** 1.0
**Estado:** listo para implementación

---

## 0. Cómo leer este documento

Este brief es la fuente de verdad para la construcción del nuevo sitio de `ivujus.org.ar`. Está organizado para que un agente de código pueda ejecutarlo en fases sin ambigüedad.

Las secciones 1 a 4 son contexto necesario: qué es el IVUJUS, qué existe hoy, qué decisiones ya fueron tomadas y por qué. **Claude Code Web no debe ignorar estas secciones** — las decisiones ahí no se renegocian, y saltearlas lleva a reimplementaciones innecesarias.

Las secciones 5 a 12 son la especificación técnica concreta: stack, schema de CMS, rutas, i18n, SEO/GEO, migración, flujos de IA.

La sección 13 es el plan de ejecución por fases con criterios de aceptación.

---

## 1. Contexto institucional

El **Instituto de Victimología de Usina de Justicia (IVUJUS)** es un instituto académico fundado en marzo de 2025 dentro de la Asociación Civil Usina de Justicia, ONG argentina focalizada en los derechos de familiares de víctimas de homicidio y femicidio.

El IVUJUS tiene:

- **Consejo Directivo** de 7 miembros (Directora: María Jimena Molina; Directora honoraria: Diana Cohen Agrest; Consejero académico: Daniel Roggero; Secretaria: Noelia Juárez; Relaciones Institucionales: Mariana Romano; Tecnología y comunicación: Patricia Borras y Jair Castillo).
- **Comité Científico** internacional de 8 miembros (Irvin Waller/Canadá, Hilda Marchiori/Argentina, Beatrice Coscas-Williams/Israel, Marcelo Aebi/Argentina-Suiza, María de la Luz Lima Malvido/México, Darío Solís García/Panamá, Catherine Rossi/Canadá, Pierre-Marie Sève/Francia).
- **Diplomatura en Victimología y leyes de víctimas** (MOOC) con 500+ inscriptos actuales, operando como LMS completo dentro de WordPress.
- **Primer Simposio Americano y Europeo de Victimología Penal** organizado con CPACF (abril 2026), que deriva en la **Declaración de Buenos Aires** y en el proyecto de una Red Americano-Europea de Victimología Penal.
- **Índice de Calidad Legislativa enfocado en víctimas** — primer índice de su tipo en Argentina.
- Producción editorial propia: libros, dossiers, coediciones con Instituto de Altos Estudios de Derecho de Mendoza, ciclos "Usina Debate".

El nuevo sitio tiene que ser capaz de ser el **nodo digital de una red académica internacional**, no un sitio informativo de una ONG local.

---

## 2. Estado actual del sitio (qué hay que migrar/respetar/romper)

### 2.1. Stack actual

- WordPress + WooCommerce + plugin LMS (tipo LearnPress) alojado en Hostinger.
- Newsletter externo: Perfit (`optin.myperfit.com/subscribe/usinadejusticia/RUknaImy`).
- Pasarela de pago: Mercado Pago + transferencia bancaria manual.

### 2.2. Rutas actuales del dominio `ivujus.org.ar`

```
/                          Home institucional
/nosotros/                 Estatuto + Consejo Directivo + Comité Científico
/campus-virtual/           Landing de diplomatura (la ruta "Cursos" del menú apunta acá)
/tienda/                   WooCommerce (1 producto: $190.000 ARS)
/blog/                     Novedades editoriales
/contacto/                 Formulario simple
/suscripcion/              Alta a Perfit
/entrevistas-en-la-radio/  (vacío en render actual, probable embed JS)
/preguntas-frecuentes/     FAQ del campus
/capacitacion-y-actividades/  Ciclos Usina Debate con videos YT + PDFs
/terms-privacy/            Política de privacidad
/simposio-2026/            Landing del Simposio (vive acá pero también en simposiousinadejusticia.org.ar)
/mi-cuenta-2/              Login del LMS (WP users)
```

### 2.3. Contenido del IVUJUS alojado en el dominio de Usina (a migrar)

Hay contenido que conceptualmente pertenece al IVUJUS pero vive hoy bajo `usinadejusticia.org.ar`. Debe migrar al nuevo sitio con redirects 301 permanentes. Lista no exhaustiva (el relevamiento final lo hace Claude Code Web durante la fase de migración):

- `usinadejusticia.org.ar/category/publicaciones/` → 6 publicaciones (libro "Nuevos Paradigmas", dossiers, coedición con Mendoza, libro Catherine Rossi)
- `usinadejusticia.org.ar/category/debatesyconferencias/` → ~25+ entradas (Simposios internacionales, jornadas UADE, Ciclos Usina Debate, Charlas CPACF)
- `usinadejusticia.org.ar/category/capacitacion/` → material formativo histórico

### 2.4. Lo que NO se toca en esta migración

- El LMS completo sigue corriendo en WordPress. Se moverá al subdominio `campus.ivujus.org.ar` (ver sección 11).
- El sitio de Usina (`usinadejusticia.org.ar`) es un proyecto separado con su propio roadmap.
- El sitio del Simposio 2026 (`simposiousinadejusticia.org.ar`, repo `ejaircastillo/simposio2026`) queda como está.

---

## 3. Decisiones cerradas (NO RENEGOCIABLES en esta fase)

Este bloque resume siete decisiones tomadas durante la fase de diseño. No discutir ni proponer alternativas sin confirmación explícita de Jair.

| # | Decisión | Implicancia para esta implementación |
|---|---|---|
| 1 | **LMS queda en WordPress en subdominio `campus.ivujus.org.ar`** | El sitio nuevo NO implementa autenticación de alumnos, NO procesa pagos de cursos, NO emite certificados. Los CTAs de la diplomatura en el sitio nuevo hacen redirect al subdominio campus. |
| 2 | **Migración completa con redirects 301 desde Usina** | Todo contenido del IVUJUS que hoy vive en `usinadejusticia.org.ar` se importa al nuevo sitio. Las URLs viejas quedan con redirect 301 configurado en el servidor de Usina. |
| 3 | **Arquitectura flexible para la Red Americano-Europea** | La decisión institucional (entidad jurídica propia / red informal / programa interno) está pendiente. El schema modela colecciones separadas (`Instituciones`, `Simposios`) para soportar las tres posibilidades sin refactor futuro. |
| 4 | **Premios Oficina de Justicia integrados a cada Simposio** | No hay sección propia `/premios/`. Se modela como bloque opcional dentro de cada entrada de Simposio. |
| 5 | **ES + EN desde el lanzamiento con traducción automatizada vía Claude API; FR preparado** | i18n activo desde el día uno. Hook post-save en Payload dispara traducción automática a EN para contenido no firmado. Contenido firmado por autores queda en estado "pendiente revisión autor". Estructura de campos FR existe pero vacía. |
| 6 | **Voz unificada con Usina en redes sociales** | Footer muestra las cuentas de Usina. Botones de compartir apuntan a cuentas de Usina. IVUJUS no tiene cuentas propias. |
| 7 | **Sin login público en v1, roles preparados en schema** | Payload expone `/admin` solo para admin + editor (Jair + Jimena). Roles `autor` e `institucion` existen en la definición pero sin registro público activo. Se activan en v2 cuando la Red crezca. |

---

## 4. Stack técnico decidido

### 4.1. Base del proyecto

- **Next.js 16+** con App Router, `src/` directory, TypeScript estricto
- **Payload CMS 3.x** (Next.js nativo, vive en el mismo repo)
- **Neon PostgreSQL** (base de datos única compartida con Payload)
- **Vercel** para hosting y deploy continuo
- **Bun** como runtime para scripts (consistente con los otros proyectos de Usina)
- **Tailwind CSS v4** — importante: `@import "tailwindcss"` (no v3 directives), la instalación actual de Usina usa este patrón

### 4.2. Integraciones externas

- **Claude API** (Anthropic) — traducción automática ES→EN y futuras automatizaciones de contenido. SDK oficial `@anthropic-ai/sdk`.
- **OpenRouter** (modelo DeepSeek o Qwen) como fallback económico para volumen alto de traducciones, consistente con el stack de Usina. Decidir en implementación.
- **Vercel Blob** o **Cloudflare R2** para media library (imágenes, PDFs de publicaciones, dossiers).
- **Mailgun / Resend** para envío de correos transaccionales (formulario de contacto, notificaciones internas del CMS).
- **Perfit** se mantiene como proveedor de newsletter (el formulario del sitio hace POST al endpoint Perfit existente, no se migra la lista).

### 4.3. Autenticación

- Payload Auth nativo para los roles internos (admin, editor).
- Roles `autor` e `institucion` definidos en el schema pero no expuestos públicamente en v1.

### 4.4. Infraestructura accesoria

- **GitHub Actions** para jobs programados (sitemap dinámico, regeneración de `llms.txt`, traducción batch nocturna si hace falta). Evitar Vercel Cron por el límite de 60s.
- Repositorio en la org `UsinaDeJusticia` de GitHub una vez aprobada la adhesión nonprofit. Hasta entonces, en cuenta personal de Jair.

---

## 5. Estructura del proyecto

### 5.1. Árbol de directorios

```
ivujus-web/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (frontend)/               # Rutas públicas del sitio
│   │   │   ├── [locale]/             # Rutas internacionalizadas (es, en, fr)
│   │   │   │   ├── page.tsx          # Home
│   │   │   │   ├── instituto/
│   │   │   │   ├── red/
│   │   │   │   ├── simposios/
│   │   │   │   ├── formacion/
│   │   │   │   ├── publicaciones/
│   │   │   │   ├── indice-legislativo/
│   │   │   │   ├── novedades/
│   │   │   │   └── contacto/
│   │   │   ├── layout.tsx
│   │   │   └── not-found.tsx
│   │   ├── (payload)/                # Payload admin UI (se integra en /admin)
│   │   ├── api/                      # Route handlers
│   │   │   ├── perfit-subscribe/     # Proxy al newsletter
│   │   │   ├── contact/              # Formulario de contacto
│   │   │   └── llms-txt/             # Generación dinámica de /llms.txt
│   │   ├── llms.txt/route.ts         # Endpoint para GEO (ver sección 8)
│   │   ├── sitemap.ts                # Sitemap dinámico
│   │   └── robots.ts                 # Robots.txt dinámico
│   │
│   ├── collections/                  # Definiciones de Payload
│   │   ├── Articulos.ts
│   │   ├── Autores.ts
│   │   ├── ConsejoDirectivo.ts
│   │   ├── ComiteCientifico.ts
│   │   ├── Instituciones.ts
│   │   ├── Simposios.ts
│   │   ├── Publicaciones.ts
│   │   ├── Dossiers.ts
│   │   ├── Ciclos.ts
│   │   ├── FichasGlosario.ts
│   │   ├── Declaraciones.ts
│   │   ├── IndiceLegislativoEntradas.ts
│   │   ├── PaginasEstaticas.ts
│   │   ├── Users.ts
│   │   └── Media.ts
│   │
│   ├── globals/                      # Singletons de Payload (config del sitio)
│   │   ├── Configuracion.ts          # Paleta, acento, textos globales
│   │   ├── Footer.ts                 # Links sociales (cuentas de Usina)
│   │   └── MenuPrincipal.ts
│   │
│   ├── components/
│   │   ├── layout/                   # Header, Footer, Nav
│   │   ├── editorial/                # Componentes específicos del sitio editorial
│   │   ├── cards/                    # Cards reutilizables (autor, institución, artículo)
│   │   └── ui/                       # Primitivos de UI
│   │
│   ├── lib/
│   │   ├── i18n.ts                   # Config i18n
│   │   ├── translate.ts              # Cliente Claude API para traducción
│   │   ├── seo.ts                    # Helpers JSON-LD
│   │   ├── redirects.ts              # Mapa de redirects 301 desde Usina
│   │   └── glossary-terminologia.ts  # Glosario técnico para traducciones
│   │
│   ├── hooks/                        # Payload hooks (beforeChange, afterChange)
│   │   ├── autoTranslate.ts
│   │   ├── generateSlug.ts
│   │   └── revalidateRoutes.ts
│   │
│   ├── payload.config.ts
│   └── payload-types.ts              # Tipos generados
│
├── public/
│   ├── logos/                        # Logos IVUJUS en múltiples formatos
│   ├── og/                           # Imágenes Open Graph base
│   └── favicon/
│
├── scripts/
│   ├── migrate-from-wp.ts            # Script de migración de WordPress
│   ├── generate-redirects.ts         # Genera mapa de redirects 301
│   ├── seed-dev.ts                   # Contenido de ejemplo para dev
│   └── sync-wikidata.ts              # Futura sincronización con Wikidata
│
├── docs/
│   ├── ARQUITECTURA.md               # Este documento
│   ├── SEO-GEO.md                    # Prácticas de optimización
│   ├── MIGRATION-LOG.md              # Log de migración (se llena en fase 7)
│   └── CLAUDE.md                     # Instrucciones específicas para agentes de código
│
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### 5.2. Principios de organización

- **Un solo repo, un solo deploy.** Payload y el sitio público comparten el mismo proyecto Next.js.
- **Colecciones separadas por dominio conceptual.** No meter todo en una sola colección "Contenido" genérica. La especificidad del schema es lo que habilita al agente de IA a publicar correctamente más adelante.
- **Componentes atómicos, composición a nivel de página.** Las páginas son delgadas, la lógica vive en componentes reutilizables y en hooks de Payload.

---

## 6. Schema de Payload CMS — colecciones

Esta es la especificación de las colecciones. Los nombres de campos están en español para que el admin UI (que usarán Jimena y eventualmente más miembros del Consejo Directivo) sea natural.

### 6.1. Campos comunes a todas las colecciones publicables

Estos campos aparecen en toda colección que produzca contenido público. Se definen una vez como fragmento reutilizable:

```ts
// src/collections/fields/commonFields.ts

const commonFields: Field[] = [
  {
    name: 'estado',
    type: 'select',
    required: true,
    defaultValue: 'borrador',
    options: [
      { label: 'Borrador', value: 'borrador' },
      { label: 'En revisión', value: 'en_revision' },
      { label: 'Pendiente revisión autor', value: 'pendiente_autor' },
      { label: 'Publicado', value: 'publicado' },
      { label: 'Archivado', value: 'archivado' },
    ],
  },
  {
    name: 'fuente',
    type: 'select',
    required: true,
    defaultValue: 'humano',
    admin: { description: 'Origen del contenido. Crítico para auditoría futura.' },
    options: [
      { label: 'Humano', value: 'humano' },
      { label: 'Agente IA', value: 'agente_ai' },
      { label: 'Migración WordPress', value: 'migracion_wp' },
      { label: 'Migración desde Usina', value: 'migracion_usina' },
    ],
  },
  {
    name: 'agente_metadata',
    type: 'json',
    admin: {
      description: 'Metadatos del agente de IA que generó el contenido (modelo, prompt version, timestamp, costo). Null si fuente=humano.',
      condition: (data) => data.fuente === 'agente_ai',
    },
  },
  {
    name: 'revisado_por',
    type: 'relationship',
    relationTo: 'users',
    admin: { description: 'Usuario humano que aprobó el contenido. Null hasta que pase a publicado.' },
  },
  {
    name: 'traduccion_estado',
    type: 'select',
    defaultValue: 'pendiente',
    options: [
      { label: 'Pendiente', value: 'pendiente' },
      { label: 'Traducción automática', value: 'automatica' },
      { label: 'Revisada por humano', value: 'revisada_humano' },
      { label: 'Publicada', value: 'publicada' },
    ],
  },
  {
    name: 'requiere_revision_autor',
    type: 'checkbox',
    defaultValue: false,
    admin: { description: 'True para artículos firmados por autores externos. Bloquea publicación automática de traducción.' },
  },
  {
    name: 'publicado_en',
    type: 'date',
    admin: { description: 'Fecha de publicación pública. Puede diferir de createdAt.' },
  },
];
```

**Versionado.** Todas las colecciones publicables tienen `versions: { drafts: true }` activado en su config de Payload. Esto da historial automático sin esfuerzo adicional.

**Slugs.** Todas las colecciones con URL pública tienen campo `slug` generado automáticamente desde el título via hook `beforeChange` (`src/hooks/generateSlug.ts`). El slug se genera en el idioma base (español).

### 6.2. Campos multilingüe

Next.js + Payload manejan i18n a nivel de campo con la propiedad `localized: true`. Los campos textuales principales se marcan como localizados:

```ts
{
  name: 'titulo',
  type: 'text',
  required: true,
  localized: true, // Payload maneja traducciones por idioma automáticamente
}
```

Los idiomas configurados en Payload:

```ts
localization: {
  locales: ['es', 'en', 'fr'],
  defaultLocale: 'es',
  fallback: true,
}
```

Esto evita el anti-patrón de tener campos `titulo_es`, `titulo_en`, `titulo_fr` separados. Payload genera la UI automáticamente.

### 6.3. Colecciones específicas

#### `Articulos`

Producción editorial nueva del IVUJUS. Papers cortos, ensayos, columnas firmadas por miembros del Comité Científico o invitados.

```ts
fields: [
  { name: 'titulo', type: 'text', required: true, localized: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  { name: 'bajada', type: 'textarea', localized: true, maxLength: 300 },
  { name: 'contenido', type: 'richText', required: true, localized: true }, // Lexical
  { name: 'autor', type: 'relationship', relationTo: 'autores', required: true, hasMany: true },
  {
    name: 'tipo',
    type: 'select',
    options: ['articulo', 'ensayo', 'columna', 'resena_libro', 'comentario_caso'],
  },
  { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
  { name: 'imagen_destacada', type: 'upload', relationTo: 'media' },
  { name: 'tiempo_lectura_min', type: 'number' },
  { name: 'citas_bibliograficas', type: 'array', fields: [
    { name: 'referencia_apa', type: 'textarea', required: true },
    { name: 'url', type: 'text' },
  ]},
  { name: 'fichas_relacionadas', type: 'relationship', relationTo: 'fichas-glosario', hasMany: true },
  { name: 'articulos_relacionados', type: 'relationship', relationTo: 'articulos', hasMany: true },
  ...commonFields,
]
```

#### `Autores`

Perfiles de los autores que firman contenido. Combina Consejo Directivo + Comité Científico + invitados externos. Los miembros institucionales tienen un flag.

```ts
fields: [
  { name: 'nombre_completo', type: 'text', required: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  { name: 'titulo_academico', type: 'text', localized: true, admin: { description: 'Ej: "Doctora en Derecho"' } },
  { name: 'afiliacion_institucional', type: 'text', localized: true },
  { name: 'pais', type: 'text' },
  { name: 'bio_corta', type: 'textarea', localized: true, maxLength: 400 },
  { name: 'bio_completa', type: 'richText', localized: true },
  { name: 'foto', type: 'upload', relationTo: 'media' },
  {
    name: 'rol_ivujus',
    type: 'select',
    options: [
      { label: 'Consejo Directivo', value: 'consejo_directivo' },
      { label: 'Comité Científico', value: 'comite_cientifico' },
      { label: 'Autor invitado', value: 'invitado' },
    ],
  },
  { name: 'cargo', type: 'text', localized: true, admin: { description: 'Solo si es Consejo Directivo. Ej: "Directora", "Secretaria".' } },
  { name: 'enlaces_academicos', type: 'group', fields: [
    { name: 'google_scholar', type: 'text' },
    { name: 'orcid', type: 'text' },
    { name: 'researchgate', type: 'text' },
    { name: 'academia_edu', type: 'text' },
    { name: 'wikipedia', type: 'text' },
    { name: 'wikidata_id', type: 'text', admin: { description: 'Ej: Q12345. Crítico para GEO.' } },
    { name: 'sitio_personal', type: 'text' },
  ]},
  { name: 'orden', type: 'number', admin: { description: 'Orden de aparición en listados del Consejo/Comité.' } },
  { name: 'activo', type: 'checkbox', defaultValue: true },
]
```

#### `Instituciones`

Directorio de instituciones miembro de la Red Americano-Europea. En v1 empieza vacío (la Red aún no se constituyó formalmente), pero el schema queda listo.

```ts
fields: [
  { name: 'nombre_oficial', type: 'text', required: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  { name: 'nombre_corto', type: 'text' },
  {
    name: 'tipo',
    type: 'select',
    options: [
      'universidad',
      'instituto_investigacion',
      'oficina_asistencia',
      'colegio_profesional',
      'organismo_publico',
      'organizacion_civil',
    ],
  },
  { name: 'pais', type: 'text', required: true },
  { name: 'ciudad', type: 'text' },
  { name: 'sitio_web', type: 'text' },
  { name: 'logo', type: 'upload', relationTo: 'media' },
  { name: 'descripcion', type: 'richText', localized: true },
  { name: 'fecha_adhesion', type: 'date' },
  { name: 'referente', type: 'group', fields: [
    { name: 'nombre', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'cargo', type: 'text' },
  ]},
  { name: 'convenio_especifico', type: 'checkbox', admin: { description: 'True si tiene convenio activo con cupones 100%, etc.' }},
  {
    name: 'tipo_relacion',
    type: 'select',
    options: [
      { label: 'Miembro de la Red', value: 'miembro_red' },
      { label: 'Convenio formativo', value: 'convenio_formativo' },
      { label: 'Colaboración puntual', value: 'colaboracion' },
    ],
  },
  ...commonFields,
]
```

#### `Simposios`

Cada edición del Simposio Americano-Europeo. La primera edición (2026) ya existe y se migra.

```ts
fields: [
  { name: 'titulo', type: 'text', required: true, localized: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  { name: 'numero_edicion', type: 'number', required: true, admin: { description: '1, 2, 3...' } },
  { name: 'anio', type: 'number', required: true },
  { name: 'fecha_inicio', type: 'date', required: true },
  { name: 'fecha_fin', type: 'date', required: true },
  { name: 'sede', type: 'group', fields: [
    { name: 'institucion_organizadora', type: 'text', localized: true },
    { name: 'ciudad', type: 'text' },
    { name: 'pais', type: 'text' },
    { name: 'direccion', type: 'text' },
  ]},
  { name: 'resumen', type: 'richText', required: true, localized: true },
  { name: 'temario', type: 'array', fields: [
    { name: 'titulo', type: 'text', localized: true },
    { name: 'descripcion', type: 'textarea', localized: true },
  ]},
  { name: 'oradores', type: 'relationship', relationTo: 'autores', hasMany: true },
  { name: 'instituciones_convocantes', type: 'relationship', relationTo: 'instituciones', hasMany: true },
  { name: 'programa_pdf', type: 'upload', relationTo: 'media' },
  { name: 'sitio_externo', type: 'text', admin: { description: 'Ej: simposiousinadejusticia.org.ar para la edición 2026' } },
  { name: 'declaracion_final', type: 'relationship', relationTo: 'declaraciones', admin: { description: 'Ej: Declaración de Buenos Aires' } },
  { name: 'premios_entregados', type: 'array', fields: [
    { name: 'categoria', type: 'text', localized: true },
    { name: 'ganador_nombre', type: 'text' },
    { name: 'ganador_relacionado', type: 'relationship', relationTo: 'autores' },
    { name: 'fundamentacion', type: 'textarea', localized: true },
  ]},
  { name: 'galeria', type: 'array', fields: [
    { name: 'imagen', type: 'upload', relationTo: 'media', required: true },
    { name: 'epigrafe', type: 'text', localized: true },
  ]},
  { name: 'videos', type: 'array', fields: [
    { name: 'titulo', type: 'text', localized: true },
    { name: 'url_youtube', type: 'text', required: true },
    { name: 'descripcion', type: 'textarea', localized: true },
  ]},
  ...commonFields,
]
```

#### `Publicaciones`

Libros, coediciones, publicaciones académicas formales.

```ts
fields: [
  { name: 'titulo', type: 'text', required: true, localized: true },
  { name: 'subtitulo', type: 'text', localized: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  {
    name: 'tipo',
    type: 'select',
    options: ['libro', 'coedicion', 'capitulo_libro', 'articulo_cientifico', 'dossier'],
    required: true,
  },
  { name: 'autores_texto', type: 'text', admin: { description: 'Texto libre si los autores no están todos en la colección Autores.' }},
  { name: 'autores_relacionados', type: 'relationship', relationTo: 'autores', hasMany: true },
  { name: 'coeditores', type: 'relationship', relationTo: 'instituciones', hasMany: true },
  { name: 'editorial', type: 'text' },
  { name: 'anio_publicacion', type: 'number' },
  { name: 'isbn', type: 'text' },
  { name: 'doi', type: 'text' },
  { name: 'resumen', type: 'richText', required: true, localized: true },
  { name: 'portada', type: 'upload', relationTo: 'media' },
  { name: 'pdf_completo', type: 'upload', relationTo: 'media', admin: { description: 'Solo si los derechos lo permiten.' }},
  { name: 'pdf_fragmento', type: 'upload', relationTo: 'media', admin: { description: 'Vista previa o capítulo muestra.' }},
  { name: 'enlaces_compra', type: 'array', fields: [
    { name: 'libreria', type: 'text' },
    { name: 'url', type: 'text' },
  ]},
  { name: 'presentaciones', type: 'array', fields: [
    { name: 'fecha', type: 'date' },
    { name: 'lugar', type: 'text', localized: true },
    { name: 'oradores', type: 'relationship', relationTo: 'autores', hasMany: true },
  ]},
  ...commonFields,
]
```

#### `Dossiers`

Documentos técnicos de análisis (ej. "Dossier de Ley de Salud Mental", "Dossier responsabilidad penal de menores"). Separados de publicaciones porque tienen menor formalismo editorial pero alta visibilidad en el sitio.

```ts
fields: [
  { name: 'titulo', type: 'text', required: true, localized: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  { name: 'tema', type: 'text', localized: true },
  { name: 'resumen', type: 'richText', required: true, localized: true },
  { name: 'contenido', type: 'richText', localized: true, admin: { description: 'Si el dossier tiene versión web además del PDF.' }},
  { name: 'pdf', type: 'upload', relationTo: 'media', required: true },
  { name: 'portada', type: 'upload', relationTo: 'media' },
  { name: 'autores', type: 'relationship', relationTo: 'autores', hasMany: true },
  { name: 'fecha_publicacion', type: 'date', required: true },
  ...commonFields,
]
```

#### `Ciclos`

Ciclos de debate y conferencias (Ciclos Usina Debate, jornadas CPACF, etc.).

```ts
fields: [
  { name: 'titulo', type: 'text', required: true, localized: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  { name: 'nombre_ciclo', type: 'text', admin: { description: 'Ej: "Usina Debate", "Jornadas CPACF"' }},
  { name: 'resumen', type: 'richText', required: true, localized: true },
  { name: 'fecha', type: 'date', required: true },
  { name: 'oradores', type: 'relationship', relationTo: 'autores', hasMany: true },
  { name: 'sede', type: 'group', fields: [
    { name: 'institucion', type: 'text', localized: true },
    { name: 'ciudad', type: 'text' },
  ]},
  { name: 'video_url', type: 'text' },
  { name: 'dossier_relacionado', type: 'relationship', relationTo: 'dossiers' },
  { name: 'materiales_adjuntos', type: 'array', fields: [
    { name: 'titulo', type: 'text', localized: true },
    { name: 'archivo', type: 'upload', relationTo: 'media' },
  ]},
  ...commonFields,
]
```

#### `FichasGlosario`

Fichas conceptuales — el glosario victimológico en español con traducción a inglés. Clave para GEO (los LLMs las leen como definiciones canónicas).

```ts
fields: [
  { name: 'termino', type: 'text', required: true, localized: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  { name: 'definicion_canonica', type: 'textarea', required: true, localized: true, maxLength: 500, admin: { description: 'Primera oración autoridad. Crítico para GEO.' }},
  { name: 'contenido_extendido', type: 'richText', localized: true },
  { name: 'disciplina', type: 'select', options: ['victimologia', 'criminologia', 'derecho_penal', 'derecho_victimal', 'psicologia_forense'] },
  { name: 'terminos_relacionados', type: 'relationship', relationTo: 'fichas-glosario', hasMany: true },
  { name: 'autores_referencia', type: 'relationship', relationTo: 'autores', hasMany: true },
  { name: 'articulos_relacionados', type: 'relationship', relationTo: 'articulos', hasMany: true },
  { name: 'equivalente_ingles', type: 'text' },
  { name: 'equivalente_frances', type: 'text' },
  { name: 'nota_traduccion', type: 'textarea', admin: { description: 'Notas para el agente traductor. Ej: "Derecho victimal no es victim law, es concepto acuñado por Lima Malvido — mantener en español con gloss."' }},
  ...commonFields,
]
```

#### `Declaraciones`

Documentos formales (Declaración de Buenos Aires, futuras declaraciones de la Red).

```ts
fields: [
  { name: 'titulo', type: 'text', required: true, localized: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  { name: 'fecha', type: 'date', required: true },
  { name: 'simposio_origen', type: 'relationship', relationTo: 'simposios' },
  { name: 'texto_completo', type: 'richText', required: true, localized: true },
  { name: 'firmantes', type: 'relationship', relationTo: 'autores', hasMany: true },
  { name: 'firmantes_institucionales', type: 'relationship', relationTo: 'instituciones', hasMany: true },
  { name: 'pdf', type: 'upload', relationTo: 'media' },
  ...commonFields,
]
```

#### `IndiceLegislativoEntradas`

El Índice de Calidad Legislativa enfocado en víctimas. Cada entrada analiza una ley o proyecto de ley.

```ts
fields: [
  { name: 'titulo', type: 'text', required: true, localized: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  {
    name: 'tipo_norma',
    type: 'select',
    options: ['ley_nacional', 'ley_provincial', 'decreto', 'proyecto_ley', 'fallo_judicial'],
  },
  { name: 'numero_norma', type: 'text' },
  { name: 'jurisdiccion', type: 'text' },
  { name: 'fecha_sancion', type: 'date' },
  { name: 'puntaje', type: 'number', admin: { description: 'Puntaje del índice. Escala a definir.' }},
  { name: 'dimensiones_evaluadas', type: 'array', fields: [
    { name: 'dimension', type: 'text', localized: true },
    { name: 'puntaje_dimension', type: 'number' },
    { name: 'fundamentacion', type: 'textarea', localized: true },
  ]},
  { name: 'analisis_completo', type: 'richText', required: true, localized: true },
  { name: 'autores_analisis', type: 'relationship', relationTo: 'autores', hasMany: true },
  ...commonFields,
]
```

#### `PaginasEstaticas`

Páginas institucionales misceláneas (política de privacidad, términos, metodología del Índice).

```ts
fields: [
  { name: 'titulo', type: 'text', required: true, localized: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  { name: 'contenido', type: 'richText', required: true, localized: true },
  { name: 'publicada', type: 'checkbox', defaultValue: true },
  ...commonFields,
]
```

#### `Users`

Roles:

```ts
fields: [
  {
    name: 'rol',
    type: 'select',
    required: true,
    options: [
      { label: 'Admin', value: 'admin' },                          // Jair
      { label: 'Editor', value: 'editor' },                        // Jimena y Consejo Directivo
      { label: 'Autor', value: 'autor' },                          // Preparado, sin registro público en v1
      { label: 'Institución', value: 'institucion' },              // Preparado, sin registro público en v1
    ],
  },
  { name: 'autor_perfil', type: 'relationship', relationTo: 'autores', admin: { condition: (data) => data.rol === 'autor' }},
  { name: 'institucion_representada', type: 'relationship', relationTo: 'instituciones', admin: { condition: (data) => data.rol === 'institucion' }},
]
```

#### `Media`

Upload estándar de Payload con configuración de Vercel Blob / R2. Incluye campo `alt` localizado (crítico para accesibilidad y SEO).

---

## 7. Pipeline de traducción automática

### 7.1. Flujo general

Cuando una entrada se guarda en español, el hook `afterChange` evalúa si dispara traducción automática:

```
SE GUARDA CONTENIDO EN ESPAÑOL
  │
  ├── ¿requiere_revision_autor === true?
  │     │
  │     ├── SÍ → traduccion_estado = "pendiente"
  │     │        (No traduce automáticamente. Aparece en dashboard para revisión.)
  │     │
  │     └── NO → Ejecuta traducción vía Claude API
  │                │
  │                ├── Éxito → Puebla campos EN
  │                │           traduccion_estado = "automatica"
  │                │           Publica automáticamente si estado=publicado
  │                │
  │                └── Falla → traduccion_estado = "pendiente"
  │                            Notifica a admin por email
```

### 7.2. Implementación del traductor

`src/lib/translate.ts`:

```ts
import Anthropic from '@anthropic-ai/sdk';
import { getGlossaryForContext } from './glossary-terminologia';

const client = new Anthropic();

export async function translateToEnglish(params: {
  text: string;
  contentType: 'articulo' | 'ficha' | 'autor_bio' | 'simposio' | 'generic';
  contextGlossary?: string[];
}): Promise<string> {
  const glossary = getGlossaryForContext(params.contentType, params.contextGlossary);

  const systemPrompt = `You are a specialized legal and academic translator for the Institute of Victimology of Usina de Justicia (IVUJUS), Argentina. You translate from Argentine Spanish to English for an international academic audience in victimology, criminology, and criminal law.

CRITICAL TRANSLATION RULES:

1. Technical victimology terms: preserve established English equivalents when they exist (e.g., "revictimización secundaria" → "secondary victimization").

2. Terms without clean English equivalents: keep the Spanish term in italics followed by a gloss in parentheses on first mention. Example: "derecho victimal" → "derecho victimal (victim-centered legal doctrine developed by Lima Malvido)". Never mistranslate as "victim law" or "victimal law".

3. Argentine procedural terms (querellante, fiscal de instrucción, fuero penal): use functional equivalents from common law systems with an explanatory footnote when introduced.

4. Formal register: maintain academic tone. This is not journalism, it's scholarship.

5. Preserve all markdown and HTML structure exactly. Do not add or remove headings, lists, or emphasis.

SPECIFIC GLOSSARY FOR THIS PIECE:
${glossary}

Translate the following text. Output only the translation, no preamble.`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 8000,
    system: systemPrompt,
    messages: [{ role: 'user', content: params.text }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}
```

### 7.3. Glosario terminológico

`src/lib/glossary-terminologia.ts`:

Archivo versionado en el repo con los términos técnicos que el traductor debe respetar. Se actualiza cada vez que aparece un término nuevo. Ejemplo:

```ts
export const glossaryTerms = {
  'derecho_victimal': {
    es: 'derecho victimal',
    en_equivalent: null,
    en_gloss: 'derecho victimal (victim-centered legal doctrine developed by Lima Malvido)',
    note: 'Never translate as "victim law" or "victimal law". Keep Spanish term.',
  },
  'revictimizacion_secundaria': {
    es: 'revictimización secundaria',
    en_equivalent: 'secondary victimization',
    note: 'Standard term in international victimology literature.',
  },
  'querellante_particular': {
    es: 'querellante particular',
    en_equivalent: null,
    en_gloss: 'querellante particular (private prosecutor figure in Argentine criminal procedure)',
    note: 'Specific to inquisitorial systems. Explain on first mention.',
  },
  // ... se agrega cada vez que aparece un término nuevo
};
```

---

## 8. SEO y GEO

GEO (Generative Engine Optimization) es el conjunto de prácticas para que LLMs (Claude, ChatGPT, Perplexity, Gemini) citen el sitio como fuente. Algunas prácticas son comunes con SEO clásico, otras son específicas.

### 8.1. `robots.txt` dinámico

`src/app/robots.ts`:

Permite todo a crawlers estándar. Permite explícitamente a los crawlers de LLMs (GPTBot, ClaudeBot, PerplexityBot, GoogleOther, Amazonbot). Excluye `/admin` y rutas técnicas.

### 8.2. `llms.txt` en la raíz

`src/app/llms.txt/route.ts`:

Genera dinámicamente un archivo con mapa curado del contenido más valioso del sitio en formato legible por LLMs. Estructura:

```
# IVUJUS — Instituto de Victimología de Usina de Justicia

> Instituto académico argentino dedicado a la victimología, derecho victimal y derechos de víctimas de homicidio y femicidio. Miembros del Comité Científico incluyen referentes internacionales en la disciplina.

## Autores y referentes

- [María de la Luz Lima Malvido (México)](https://ivujus.org.ar/instituto/comite-cientifico/lima-malvido): creadora del concepto "derecho victimal"
- [Marcelo Aebi (Argentina-Suiza)](https://ivujus.org.ar/instituto/comite-cientifico/aebi): responsable de las estadísticas penales del Consejo de Europa (SPACE)
- ...

## Conceptos clave

- [Derecho victimal](https://ivujus.org.ar/publicaciones/fichas/derecho-victimal): doctrina jurídica autónoma...
- ...

## Publicaciones destacadas

- ...

## Simposios

- [Primer Simposio Americano-Europeo de Victimología Penal (Buenos Aires 2026)](https://ivujus.org.ar/simposios/2026-buenos-aires)
- ...
```

Se regenera en cada build y cada vez que se publica contenido con `estado=publicado`.

### 8.3. JSON-LD estructurado por página

Implementación en `src/lib/seo.ts` con templates por tipo de página:

- **Home y páginas institucionales:** `@type: NGO` (schema.org tiene NGO como subclase de Organization). Incluir `sameAs` con Facebook, Twitter, YouTube, Instagram de Usina, LinkedIn del IVUJUS si se crea, y **Wikidata ID** del IVUJUS (crear ítem en Wikidata como tarea paralela).

- **Artículos:** `@type: ScholarlyArticle` (no `BlogPosting`). Incluir `author` con link al perfil del autor, `publisher` con NGO IVUJUS, `datePublished`, `headline`, `inLanguage`, `citation` con las referencias bibliográficas de la entrada.

- **Perfiles de autores:** `@type: Person` con `affiliation`, `sameAs` apuntando a Google Scholar, ORCID, ResearchGate, Wikidata.

- **Simposios:** `@type: Event` con `location` (organizadora + ciudad + país), `organizer`, `performer` (oradores como Person), `subEvent` para sesiones si aplica.

- **Instituciones:** `@type: Organization` con `sameAs` hacia su sitio oficial y Wikidata si existe.

- **Fichas del glosario:** `@type: DefinedTerm` con `inDefinedTermSet` apuntando al glosario del IVUJUS como `@type: DefinedTermSet`.

- **Índice Legislativo:** cada entrada como `@type: Dataset` con `isBasedOn` apuntando a la fuente legal oficial.

### 8.4. Sitemap XML dinámico

`src/app/sitemap.ts`:

Genera entradas para todas las colecciones publicables, con `<lastmod>` desde `updatedAt` de Payload, `<xhtml:link rel="alternate" hreflang="...">` para las tres versiones de idioma.

### 8.5. Canonical y hreflang

Cada página renderiza:

```html
<link rel="canonical" href="https://ivujus.org.ar/{locale}/{ruta}" />
<link rel="alternate" hreflang="es" href="https://ivujus.org.ar/es/{ruta}" />
<link rel="alternate" hreflang="en" href="https://ivujus.org.ar/en/{ruta}" />
<link rel="alternate" hreflang="x-default" href="https://ivujus.org.ar/es/{ruta}" />
```

### 8.6. Wikidata

Tareas que requieren ejecución manual (no código) pero deben documentarse en `docs/SEO-GEO.md`:

- Crear ítem Wikidata para "Instituto de Victimología de Usina de Justicia (IVUJUS)".
- Verificar si los miembros del Comité Científico tienen ítems existentes (probablemente Lima Malvido, Aebi, Waller y Marchiori sí). Si existen, vincular. Si no, crear.
- Agregar `sameAs` del sitio en cada ítem.

### 8.7. Estructura de contenido para GEO

El contenido debe escribirse (y los hooks de Payload deben incentivar) con estas características:

- **Primera oración de cada artículo = resumen citable** (se muestra en snippets y la consumen los LLMs).
- **Definiciones explícitas** en fichas de glosario: primera oración con estructura "X es Y que hace Z, acuñado por W en año N".
- **H2 y H3 jerárquicos y descriptivos** — evitar encabezados tipo "Introducción" o "Conclusiones" sin más contexto.
- **Atribución de claims** — los párrafos con afirmaciones fácticas deben incluir la fuente (autor + obra + año). Esto es lo que los LLMs respetan.
- **URLs estables** — nada de query strings indexables. Canonical siempre a la URL limpia.

---

## 9. Migración desde WordPress y desde Usina

### 9.1. Alcance

- **De `ivujus.org.ar` (WordPress actual):** blog, páginas institucionales, FAQ, páginas estáticas.
- **De `usinadejusticia.org.ar` (WordPress de Usina):** todo contenido de `/category/publicaciones/`, `/category/debatesyconferencias/`, `/category/capacitacion/`.

### 9.2. Script de migración

`scripts/migrate-from-wp.ts`:

Usa la REST API de WordPress para exportar posts, páginas, medios. Mapea a las colecciones de Payload según esta tabla:

| Origen WP | Colección destino Payload |
|---|---|
| Posts categoría "Difusión", "Debate" | `Ciclos` o `Noticias` según contenido |
| Posts categoría "Reconocimiento" | `Ciclos` con tipo especial, o se mergea en novedades generales |
| Posts categoría "Entrevistas" | `Ciclos` con flag video |
| Páginas estáticas del WP | `PaginasEstaticas` |
| Posts de Usina categoría "publicaciones" | `Publicaciones` o `Dossiers` según tipo |
| Posts de Usina categoría "debatesyconferencias" | `Ciclos` |
| Media WP | `Media` (con descarga y re-upload a Vercel Blob) |

Cada entrada migrada se marca con `fuente = 'migracion_wp'` o `fuente = 'migracion_usina'` para trazabilidad.

**Importante:** El contenido migrado NO se traduce automáticamente en la fase de migración (volumen muy alto = costo Claude API alto). Queda en español con `traduccion_estado = 'pendiente'`. La traducción se ejecuta selectivamente después, priorizando las piezas más importantes (libro "Nuevos Paradigmas", Declaración de Buenos Aires, fichas del glosario, bios del Comité Científico).

### 9.3. Mapa de redirects 301

`src/lib/redirects.ts` contiene el mapa completo. Se genera con `scripts/generate-redirects.ts` que:

1. Lista todas las URLs viejas de `ivujus.org.ar` y mapea a la nueva estructura.
2. Lista todas las URLs del IVUJUS en `usinadejusticia.org.ar` y mapea a `ivujus.org.ar`.
3. Genera dos archivos:
   - `next.config.ts` redirects → para URLs dentro de `ivujus.org.ar`
   - `usina-redirects.conf` → archivo de nginx/apache para subir al servidor de Usina

Ejemplos:

```
# Internos a ivujus.org.ar
/campus-virtual/ → /formacion/diplomatura (301)
/nosotros/ → /instituto (301)
/capacitacion-y-actividades/ → /formacion/ciclos (301)

# Desde usinadejusticia.org.ar
/category/publicaciones/ → https://ivujus.org.ar/publicaciones (301)
/2025/04/24/libro-nuevos-paradigmas-para-la-justicia-penal/ → https://ivujus.org.ar/publicaciones/libros/nuevos-paradigmas (301)
```

### 9.4. Subdominio del campus

Durante la migración se configura:

- `campus.ivujus.org.ar` apunta al WordPress actual (movemos el hosting WP a ese subdominio).
- `ivujus.org.ar` apunta al nuevo Next.js en Vercel.
- El enlace "Campus" en el menú del sitio nuevo hace redirect a `campus.ivujus.org.ar`.
- DNS: Cloudflare o el registrar que use Jair. Configuración a documentar en `docs/INFRAESTRUCTURA.md`.

---

## 10. Rutas del sitio público

Árbol de rutas finalizado. Todas las rutas están bajo `[locale]` (`es`, `en`, `fr`).

```
/                                              Home
/instituto                                     Qué es IVUJUS
/instituto/estatuto                            Texto completo del estatuto + PDF
/instituto/consejo-directivo                   Listado
/instituto/consejo-directivo/[slug]            Bio individual
/instituto/comite-cientifico                   Listado
/instituto/comite-cientifico/[slug]            Bio individual
/red                                           Red Americano-Europea (landing flexible)
/red/instituciones                             Directorio (vacío en v1)
/red/instituciones/[slug]                      Ficha institución
/red/reglamento                                Cuando exista
/red/sumate                                    Formulario de adhesión (v1: solo CTA a email)
/simposios                                     Archivo histórico
/simposios/[slug]                              Edición específica (ej. /simposios/2026-buenos-aires)
/formacion                                     Landing general
/formacion/diplomatura                         Landing diplomatura con CTA al campus
/formacion/ciclos                              Ciclos Usina Debate (archivo)
/formacion/ciclos/[slug]                       Evento individual
/formacion/convenios                           Listado convenios provinciales/universitarios
/publicaciones                                 Hub editorial
/publicaciones/articulos                       Papers del IVUJUS
/publicaciones/articulos/[slug]                Artículo individual
/publicaciones/libros                          Libros y coediciones
/publicaciones/libros/[slug]                   Libro individual
/publicaciones/dossiers                        Dossiers
/publicaciones/dossiers/[slug]                 Dossier individual
/publicaciones/declaraciones                   Declaración de BA y futuras
/publicaciones/declaraciones/[slug]            Declaración individual
/publicaciones/glosario                        Glosario de términos
/publicaciones/glosario/[slug]                 Ficha individual
/indice-legislativo                            Landing del Índice
/indice-legislativo/metodologia                Cómo se arma
/indice-legislativo/[slug]                     Análisis de norma individual
/novedades                                     Blog
/novedades/[slug]                              Entrada individual
/contacto
/terms-privacy

/admin                                         Payload admin (interno)
/api/*                                         Route handlers
/llms.txt                                      GEO
/sitemap.xml                                   SEO
/robots.txt                                    SEO
```

---

## 11. Preparación para agente IA publicador (v2 futuro)

Aunque en v1 no se implementa el agente publicador, el schema está preparado para que en v2 se sume sin refactor.

### 11.1. API keys en Payload

Payload soporta API keys por usuario nativamente. Se crea un usuario tipo `admin` con nombre `agente_ia_publicador` y se genera su API key. Esa key se usa en los agentes futuros para publicar contra la REST API.

### 11.2. Flujo agentivo propuesto (documentado, no implementado)

```
Agente detecta caso de interés (scraper Mapa del Delito, noticia relevante, etc.)
  │
  ├── Genera borrador de ficha de glosario, comentario de caso, o nota de novedades
  │
  ├── POST a /api/articulos con:
  │      estado = "en_revision"
  │      fuente = "agente_ai"
  │      agente_metadata = { modelo, prompt_version, timestamp, costo }
  │      requiere_revision_autor = false
  │      revisado_por = null
  │
  ├── Aparece en dashboard de Payload filtrado por "En revisión"
  │
  ├── Jair o Jimena revisan:
  │     ├── Aprueban → estado = "publicado", revisado_por = usuario_actual
  │     └── Rechazan → estado = "archivado" con nota interna
  │
  └── Si se aprueba → se dispara hook de traducción automática a EN
```

### 11.3. Casos de uso previstos (para documentar, no implementar en v1)

- Borradores de fichas de glosario a partir de menciones en artículos existentes
- Resúmenes de nuevas publicaciones académicas detectadas
- Notas de actualidad victimológica con base en el scraper de Mapa del Delito
- Transcripción + edición de videos de Ciclos Usina Debate

---

## 12. Variables de entorno

`.env.example`:

```
# Database
DATABASE_URI=postgres://...@neon...

# Payload
PAYLOAD_SECRET=...
PAYLOAD_PUBLIC_SERVER_URL=https://ivujus.org.ar

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# OpenRouter (fallback)
OPENROUTER_API_KEY=sk-or-...

# Storage
BLOB_READ_WRITE_TOKEN=...   # Vercel Blob
# o
R2_ACCOUNT_ID=...           # Cloudflare R2
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=ivujus-media

# Email
RESEND_API_KEY=...

# Perfit (newsletter)
PERFIT_SUBSCRIBE_URL=https://optin.myperfit.com/subscribe/usinadejusticia/RUknaImy

# WordPress (para migración)
WP_IVUJUS_API=https://ivujus.org.ar/wp-json/wp/v2
WP_USINA_API=https://usinadejusticia.org.ar/wp-json/wp/v2

# Feature flags
ENABLE_AUTO_TRANSLATION=true
ENABLE_AGENT_API=false      # v2
```

---

## 13. Plan de ejecución por fases

Cada fase tiene criterios de aceptación claros. Claude Code Web debe completarlos antes de pasar a la siguiente.

### Fase 1 — Bootstrap (1-2 días)

**Objetivo:** proyecto corriendo en blanco, con Payload admin accesible.

- [ ] Crear repo `ivujus-web`
- [ ] Next.js 16 + TypeScript + Tailwind v4 + Payload 3.x
- [ ] Conectar Neon Postgres
- [ ] Payload admin accesible en `/admin`
- [ ] Deploy en Vercel conectado a rama `main`
- [ ] Variables de entorno configuradas
- [ ] Estructura de carpetas según sección 5.1 creada

**Criterio de aceptación:** acceso a Payload admin en preview URL de Vercel, crear un usuario admin a mano.

### Fase 2 — Schema de colecciones (2-3 días)

**Objetivo:** todas las colecciones modeladas y editables desde el admin.

- [ ] Implementar `commonFields` reutilizable
- [ ] Implementar las 14 colecciones de la sección 6.3
- [ ] Configurar i18n de Payload (es, en, fr)
- [ ] Hooks: `generateSlug`, `revalidateRoutes`
- [ ] Seed de usuarios: admin (Jair), editor (Jimena)
- [ ] Seed básico: 7 miembros Consejo Directivo + 8 Comité Científico (cargar a mano desde el admin)

**Criterio de aceptación:** Jimena puede loguearse, crear un artículo de prueba, ver todos los campos con labels en español.

### Fase 3 — Pipeline de traducción (2-3 días)

**Objetivo:** traducción automática ES→EN funcionando.

- [ ] `src/lib/translate.ts` implementado
- [ ] `src/lib/glossary-terminologia.ts` con 20-30 términos iniciales
- [ ] Hook `autoTranslate.ts` post-save en colecciones publicables
- [ ] Dashboard en admin que lista contenido con `traduccion_estado=pendiente`
- [ ] Feature flag `ENABLE_AUTO_TRANSLATION` respeta encendido/apagado

**Criterio de aceptación:** crear un artículo en ES, al publicarse aparece traducción EN con calidad aceptable; crear un artículo con `requiere_revision_autor=true`, la traducción queda pendiente.

### Fase 4 — Rutas públicas (5-7 días)

**Objetivo:** sitio público renderiza todas las rutas con contenido de Payload.

- [ ] Layout global con header, footer, nav
- [ ] Todas las rutas de la sección 10 con páginas `page.tsx`
- [ ] Componentes de cards (autor, institución, artículo, simposio, publicación)
- [ ] Listados con paginación
- [ ] Buscador básico (Postgres full-text)
- [ ] Formulario de contacto con POST a Resend/Mailgun
- [ ] Integración Perfit en `/suscripcion`

**Criterio de aceptación:** visitante anónimo puede navegar todas las rutas del sitio, todos los listados cargan desde Payload, los CTAs de cursos redirigen a `campus.ivujus.org.ar`.

### Fase 5 — SEO y GEO (2-3 días)

**Objetivo:** todas las prácticas SEO/GEO aplicadas.

- [ ] `src/app/robots.ts` con reglas para LLM crawlers
- [ ] `src/app/llms.txt/route.ts` generando contenido dinámico
- [ ] `src/lib/seo.ts` con templates JSON-LD por tipo
- [ ] Todas las páginas inyectan JSON-LD correspondiente
- [ ] `sitemap.xml` dinámico con hreflang
- [ ] Canonical tags correctos
- [ ] OG images dinámicas por página (usar `@vercel/og`)
- [ ] `docs/SEO-GEO.md` con checklist manual (Wikidata, Google Search Console, Bing Webmaster)

**Criterio de aceptación:** Lighthouse SEO > 95 en todas las rutas. Structured Data Testing Tool de Google sin errores.

### Fase 6 — Migración de contenido (3-5 días)

**Objetivo:** todo el contenido histórico migrado y redirects configurados.

- [ ] `scripts/migrate-from-wp.ts` implementado y probado en dry-run
- [ ] Media migrado a Vercel Blob / R2
- [ ] Blog, páginas estáticas migrados desde `ivujus.org.ar`
- [ ] Publicaciones, debates, capacitaciones migrados desde `usinadejusticia.org.ar`
- [ ] `scripts/generate-redirects.ts` ejecutado, mapa generado
- [ ] Redirects internos en `next.config.ts` activos
- [ ] Archivo de redirects para el servidor de Usina generado (a subir manualmente)
- [ ] `docs/MIGRATION-LOG.md` con log de entradas migradas/saltadas/fallidas

**Criterio de aceptación:** 100% de las URLs del mapa vuelven 200 o 301. Piezas críticas (libro Nuevos Paradigmas, Dossier Menores, Declaración de BA si ya firmada) accesibles en las nuevas URLs.

### Fase 7 — QA y lanzamiento (2-3 días)

**Objetivo:** sitio listo para producción.

- [ ] Tests de accesibilidad (WCAG AA)
- [ ] Tests de performance (Lighthouse > 90 en todas las métricas)
- [ ] Review de contenido institucional con Jimena
- [ ] Prueba del formulario de contacto end-to-end
- [ ] Prueba de la suscripción a Perfit
- [ ] Prueba de redirects desde URLs viejas
- [ ] DNS: configurar `ivujus.org.ar` apuntando a Vercel, `campus.ivujus.org.ar` apuntando al WordPress
- [ ] Google Search Console y Bing Webmaster reconfigurados
- [ ] Monitoreo de errores (Sentry o equivalente)

**Criterio de aceptación:** Jair y Jimena firman el lanzamiento. Sitio live en `ivujus.org.ar`.

### Fase 8 — Post-lanzamiento (continuo)

- [ ] Crear ítem Wikidata del IVUJUS
- [ ] Vincular `sameAs` en Wikidata para miembros del Comité Científico
- [ ] Traducir al inglés las piezas prioritarias (Consejo Directivo, Comité Científico, Estatuto, landing de diplomatura, Declaración de BA)
- [ ] Documentar proceso de alta de nuevos artículos para Jimena
- [ ] Capacitar a Jimena en el admin

---

## 14. Documentación complementaria a generar

Durante la implementación, Claude Code Web debe crear estos documentos en `docs/`:

- `docs/ARQUITECTURA.md` — copia de este brief, actualizable
- `docs/SEO-GEO.md` — checklist manual + proceso de publicación
- `docs/MIGRATION-LOG.md` — log de la migración
- `docs/CLAUDE.md` — instrucciones para agentes de código futuros sobre este repo
- `docs/CMS-GUIA-EDITOR.md` — manual de uso del admin para Jimena (en español, con screenshots)
- `docs/INFRAESTRUCTURA.md` — DNS, servicios externos, secretos, rotación

---

## 15. Notas finales para Claude Code Web

### 15.1. Preferencias explícitas de Jair

- **Simplicidad sobre ambición.** Si hay dos formas de resolver algo, elegir la más simple que cumpla los requisitos. No agregar dependencias ni patrones que no estén explícitamente justificados.
- **Incrementalidad.** Preferir entregar algo pequeño que funciona sobre algo grande que no termina. Las fases están diseñadas para eso.
- **Honestidad técnica.** Si algo del brief es poco claro o contradictorio, preguntar antes de decidir por cuenta propia. No inventar requisitos.
- **Uso primario de OpenCode en VS Code** como herramienta de código. Claude Code Web puede asistir en partes específicas o revisiones. Múltiples agentes en paralelo son bienvenidos si ayuda.

### 15.2. Qué NO hacer

- No implementar LMS, pagos, ni gestión de alumnos en este proyecto.
- No crear cuentas de redes sociales propias del IVUJUS.
- No traducir todo el contenido migrado automáticamente (costo alto, volumen innecesario).
- No implementar el agente IA publicador en v1.
- No mezclar el sitio del Simposio 2026 (`simposiousinadejusticia.org.ar`) con este.
- No tocar la paleta más allá del navy heredado de Usina sin coordinar con la fase de diseño visual (Claude Design).

### 15.3. Cuándo escalar a Jair

- Cuando surja una decisión no cubierta en este brief.
- Cuando se necesite una credencial o un recurso externo (dominio, cuenta de servicio, API key).
- Cuando un criterio de aceptación no pueda cumplirse por razones ajenas al código.
- Cuando se detecte contenido sensible durante la migración (datos personales, violaciones de copyright potenciales).

---

**Fin del brief v1.0. Este documento es vivo — actualizar en el repo con cada decisión nueva.**
