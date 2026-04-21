# ivujus-web

Sitio oficial del **Instituto de Victimología de Usina de Justicia (IVUJUS)**.

Proyecto monolítico Next.js 16 + Payload CMS 3, deployado en Vercel contra Neon Postgres.

La fuente de verdad sobre arquitectura, decisiones y plan por fases está en
[`docs/ARQUITECTURA.md`](./docs/ARQUITECTURA.md). Leer ese documento antes de
tocar código.

## Stack

- **Next.js 16.2.4** (App Router, `src/` directory, TypeScript estricto)
- **Payload CMS 3.83.0** integrado en el mismo repo
- **Neon Postgres** vía `@payloadcms/db-postgres`
- **Tailwind CSS v4** (import sin directivas, Oxide engine)
- **Bun** como runtime para scripts

## Requisitos

- Node.js 20.9+ (o Bun ≥ 1.2)
- Acceso a una instancia de Postgres (Neon recomendado)
- Variables de entorno según `.env.example`

## Comandos

```bash
bun install
bun run dev               # next dev
bun run build             # next build
bun run start             # next start
bun run typecheck         # tsc --noEmit
bun run lint              # next lint
bun run generate:types    # payload generate:types
bun run generate:importmap
```

## Estructura de carpetas

Ver sección 5.1 del brief. Resumen:

```
src/
├── app/
│   ├── (frontend)/         # rutas públicas, bajo [locale]
│   └── (payload)/          # admin + API de Payload
├── collections/            # definiciones de colecciones
├── globals/                # singletons de Payload
├── components/
├── lib/
├── hooks/                  # hooks de Payload (beforeChange, afterChange)
├── middleware.ts
├── payload.config.ts
└── payload-types.ts        # generado por Payload
```

## Fases

Ver sección 13 de `docs/ARQUITECTURA.md`. Fase 1 (Bootstrap) completada.
Las siguientes fases se ejecutan en orden, cada una con sus criterios de
aceptación documentados.
