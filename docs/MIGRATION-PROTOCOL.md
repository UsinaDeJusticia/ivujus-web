# Protocolo de migracion

Fecha: 2026-05-04

Este documento define como deben interpretarse los artefactos de migracion desde WordPress hacia `ivujus-web`.

## Objetivo

Evitar que agentes o scripts automaticen decisiones editoriales que todavia no estan cerradas.

La migracion tiene capas distintas. No deben mezclarse.

## Etapas del pipeline

### 1. Inventory

Pregunta que responde:

- que existe en WordPress

Artefactos tipicos:

- `docs/WORDPRESS-API-INVENTORY.md`
- `docs/wp-migration-report.json`

Regla:

- estos artefactos no aprueban importacion
- solo describen origen, volumen y presencia de contenido

### 2. Editorial decisions

Pregunta que responde:

- que entra al nuevo sitio
- que no entra
- que requiere desarme o criterio editorial adicional

Artefactos tipicos:

- `docs/CONTENT-MIGRATION-LEDGER.md`
- `docs/MIGRATION-MATRIX.md`
- `docs/wp-editorial-decisions.json`

Regla:

- esta capa define criterio, no import automatico
- si un item no tiene decision cerrada, no puede pasar a import

### 3. Proposed seeds

Pregunta que responde:

- como quedaria el contenido si se lo estructurara para una coleccion de Payload

Artefactos tipicos:

- `docs/wp-proposed-payload-exports.json`
- `docs/proposed-seeds/*.json`

Regla:

- estos archivos sirven para revision humana
- no deben alimentar importadores reales
- pueden contener transformaciones utiles pero todavia no aprobadas

### 4. Import-ready seeds

Pregunta que responde:

- que contenido esta aprobado tecnica y editorialmente para insertarse en Payload

Artefactos tipicos:

- `docs/wp-import-ready-payload-exports.json`
- `docs/import-ready-seeds/*.json`

Regla:

- solo esta capa puede ser usada por un importador real
- si un item no aparece aqui, no debe importarse

## Estados editoriales

En `docs/wp-editorial-decisions.json` aparecen los siguientes estados:

- `discarded`
  Significa que el item queda fuera del nuevo sitio.

- `manual_split_required`
  Significa que el origen mezcla varias piezas y debe desarmarse antes de cualquier import.

- `editorial_review_required`
  Significa que todavia falta una decision semantica o de modelado.

- `proposed_seed_only`
  Significa que existe una propuesta de seed para inspeccion, pero no aprobada para importar.

- `import_ready`
  Significa que el item ya puede usarse en import real.

## Reglas operativas para agentes

### Regla 1

- Nunca usar `docs/proposed-seeds/*.json` como fuente final de import.

### Regla 2

- Nunca inferir que `migrar` en el ledger humano equivale a `import_ready`.

### Regla 3

- Si el destino contiene mas de una posibilidad conceptual, el item no esta listo para import.

Ejemplos:

- `instituto | instituto/estatuto | instituto/consejo-directivo`
- `formacion/ciclos + Dossiers/Publicaciones`

Esos casos deben quedar como `manual_split_required` o backlog equivalente.

### Regla 4

- Si un item depende de una coleccion aun no modelada, de una relacion no resuelta o de una entidad canonica inexistente, no debe marcarse `import_ready`.

### Regla 5

- Si un agente modifica el criterio editorial, debe actualizar primero la documentacion y luego regenerar artefactos.

## Fuente de verdad actual

Orden de confianza recomendado:

1. `docs/ARQUITECTURA.md`
2. `docs/MIGRATION-PROTOCOL.md`
3. `docs/CONTENT-MIGRATION-LEDGER.md`
4. `docs/wp-editorial-decisions.json`
5. `docs/import-ready-seeds/*.json`

Los artefactos propuestos y los buckets son auxiliares, no fuente final de import.

## Estado actual

Al momento de este documento:

- existe relevamiento de WordPress
- existe clasificacion editorial inicial
- existen proposed seeds por coleccion
- la capa `import-ready` debe mantenerse conservadora hasta nueva aprobacion explicita
- existe una primera capa global SEO/GEO curada (`robots`, `llms.txt`, `sitemap`),
  pero todavia no es una version fully CMS-driven.

## Proximo uso esperado

Cuando se construya un importador real a Payload, debe leer solo:

- `docs/wp-import-ready-payload-exports.json`
  o
- `docs/import-ready-seeds/*.json`

Nunca debe leer directamente:

- `docs/wp-proposed-payload-exports.json`
- `docs/proposed-seeds/*.json`
- `docs/wp-migration-buckets.json`

## Importadores controlados

Si existe un importador especifico en `scripts/`, debe asumir por defecto modo
seguro o `dry-run`.

Estado actual:

- `scripts/import-simposio-2026.ts` existe para `Simposios` y `Declaraciones`.
- Su uso por defecto es solo de inspeccion.
- No debe escribirse a Payload desde ese script sin aprobacion explicita del
  usuario y sin revisar antes los drafts de `docs/proposed-seeds/`.
