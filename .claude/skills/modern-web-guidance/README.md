# Modern Web Guidance (habilidad del proyecto)

Guías de buenas prácticas de la plataforma web mantenidas por los equipos de
Chrome, Edge, Firefox y MDN: https://github.com/GoogleChrome/modern-web-guidance
(licencia Apache 2.0, ver `LICENSE`).

- `SKILL.md` es copia textual del paquete npm `modern-web-guidance@1.0.1`
  (20-nov-2026). Las guías no están en el repo: se descargan al usarlas con
  `npx -y modern-web-guidance@latest search|retrieve …`, así que hace falta
  salida a internet (registry.npmjs.org).
- Claude Code la lee de `.claude/skills/`. OpenCode también busca habilidades
  en `.claude/skills/`.
- Para actualizarla: `npx -y modern-web-guidance@latest update`, o volver a
  copiar `skills/modern-web-guidance/SKILL.md` del paquete.

Se usa antes de tocar HTML, CSS o JavaScript del navegador (menús, diálogos,
formularios, accesibilidad, rendimiento). No aplica a backend, scripts ni
configuración.
