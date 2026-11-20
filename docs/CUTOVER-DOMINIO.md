# Cambio de dominio: ivujus.org.ar → sitio nuevo, WordPress → cms.ivujus.org.ar

> **Estado 20-nov-2026:** pasos 1-3 hechos por OpenCode (WordPress funcionando en
> `cms.ivujus.org.ar`, backup en `~/backup-antes-cms-2026-11-20*`). Pasos 4-5 por
> Claude. Hallazgos del reporte de OpenCode:
> - La zona DNS real usa **ALIAS `@` → `ivujus.org.ar.cdn.hstgr.net.`** y **CNAME `www` →
>   `www.ivujus.org.ar.cdn.hstgr.net.`** (CDN de Hostinger); las IPs del paso 6 de abajo
>   ya no aplican. Vuelta atrás = restaurar ese ALIAS y ese CNAME.
> - **`info@ivujus.org.ar` no existe.** El correo institucional es
>   `info@usinadejusticia.org.ar` (Google Workspace). Los MX de ivujus.org.ar se
>   mantienen igual.
> - **No cambiar los nameservers a Vercel** aunque lo sugiera: se perderían MX/TXT.
> - Si aparece un 301 raro, purgar la caché del CDN en hPanel.

**Preparado:** 20-nov-2026. **Regla:** el WordPress NO se elimina. Sigue siendo el
CMS (novedades), el Campus (LearnDash), la tienda (WooCommerce) y el host de
`wp-content`. Solo cambia de dirección.

Estado de partida (verificado 20-nov):
- DNS de `ivujus.org.ar` en **Hostinger** (nameservers `*.dns-parking.com`).
  Registros A actuales del apex: `148.135.128.39` y `147.79.120.183` (anotarlos:
  son el plan de vuelta atrás). El hosting responde con CDN de Hostinger (`hcdn`).
- Vercel, proyecto `ivujus-web`: hoy solo `ivujus-web.vercel.app`.
- El código ya está listo: la dirección del WordPress sale de
  `NEXT_PUBLIC_WP_ORIGIN` (`src/lib/wordpress/origin.ts`). Mientras no se defina,
  vale `https://ivujus.org.ar`.

**Orden obligatorio:** el WordPress tiene que funcionar completo en
`cms.ivujus.org.ar` (pasos 1-3) **antes** de tocar el DNS del dominio principal
(paso 6). Si no, se corta el acceso de los alumnos al Campus.

---

## 1. Hostinger — preparar (manual, hPanel)

1. **DNS / Nameservers → `ivujus.org.ar`**: bajar el TTL de los registros `A @`
   y `CNAME www` a **300** segundos. Anotar todos los registros actuales (captura).
2. **Crear el subdominio `cms`** apuntando a la **misma carpeta del WordPress**
   (normalmente `public_html`), no a una carpeta nueva vacía.
3. **SSL** para `cms.ivujus.org.ar` (hPanel → Seguridad → SSL). Esperar a que
   `https://cms.ivujus.org.ar` cargue el WordPress con candado.
4. Si el CDN de Hostinger está activo para el dominio, revisar que el
   subdominio también responda; ante dudas, desactivar el CDN durante el cambio.

## 2. WordPress — copia de seguridad (obligatoria)

- hPanel → Copias de seguridad → generar una nueva (archivos + base de datos),
  **o** por SSH: `wp db export ~/backup-antes-cms-$(date +%F).sql`.
- No seguir sin una copia verificada.

## 3. WordPress — mudar a cms.ivujus.org.ar

Por SSH con WP-CLI (lo puede hacer OpenCode), desde la carpeta del WordPress:

```bash
wp option get home && wp option get siteurl
wp search-replace 'https://ivujus.org.ar' 'https://cms.ivujus.org.ar' --all-tables --precise --dry-run
wp search-replace 'https://ivujus.org.ar' 'https://cms.ivujus.org.ar' --all-tables --precise
wp search-replace 'https:\/\/ivujus.org.ar' 'https:\/\/cms.ivujus.org.ar' --all-tables --precise
wp option get home && wp option get siteurl
wp elementor flush-css
wp rewrite flush
wp cache flush
```

- La segunda pasada cubre las URLs con barras escapadas que guarda Elementor.
- Revisar el `--dry-run` antes: debe tocar URLs, nunca correos (`info@ivujus.org.ar`
  no contiene `https://`, así que no se afecta).
- Sin SSH: Ajustes → Generales (las dos direcciones) + plugin *Better Search
  Replace* (mismos reemplazos) + Elementor → Herramientas → Reemplazar URL y
  Regenerar CSS. Vaciar la caché (LiteSpeed/Hostinger).
- Recomendado: Ajustes → Lectura → "Pedir a los motores de búsqueda que no
  indexen este sitio" en el WordPress, para que no compita con el sitio nuevo.
- **Pasarela de pago:** si el medio de pago tiene configurada una URL de
  notificación/webhook con `ivujus.org.ar`, cambiarla a `cms.ivujus.org.ar`.

**Probar en `https://cms.ivujus.org.ar` antes de seguir:**
- [ ] `/mi-cuenta-2/`: un alumno inicia sesión y ve sus cursos.
- [ ] Abrir una lección del curso.
- [ ] `/producto/curso-las-leyes-de-las-victimas-en-el-marco-de-la-victimologia-particulares/` y carrito.
- [ ] `/wp-json/wp/v2/posts` devuelve JSON.
- [ ] Un PDF: `/wp-content/uploads/2023/07/prision-perpetua.pdf`.
- [ ] `/wp-admin/` permite publicar una entrada.

## 4. Vercel — apuntar el sitio nuevo al CMS (Claude)

1. Variable `NEXT_PUBLIC_WP_ORIGIN = https://cms.ivujus.org.ar` (Production y Preview).
2. Redeploy de producción. Desde ahí el sitio nuevo lee novedades, imágenes,
   PDFs y el botón del Campus desde `cms.ivujus.org.ar`, y activa los
   reenvíos (`/mi-cuenta-2`, tienda, LearnDash, `wp-admin`, `wp-content`…).
3. Verificar `ivujus-web.vercel.app` (imágenes, PDFs, Campus, novedades).

## 5. Vercel — agregar el dominio (Claude)

Agregar `ivujus.org.ar` y `www.ivujus.org.ar` al proyecto `ivujus-web`
(`www` redirige al apex). Vercel indica los registros exactos; los
recomendados el 20-nov eran:

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | `216.150.1.1` |
| CNAME | `www` | `cname.vercel-dns.com.` |

## 6. Hostinger — cambiar el DNS (manual)

- Reemplazar **solo** los registros `A @` (borrar los dos A actuales y dejar el
  de Vercel) y `www`. Si hay registro `AAAA @`, borrarlo.
- **No tocar:** `A cms` (o `CNAME cms`) que apunta a Hostinger, los `MX`, los
  `TXT` (SPF/DKIM/verificaciones) ni otros subdominios. Tocarlos corta el correo
  o el CMS.

## 7. Verificación final (Claude)

- [ ] `https://ivujus.org.ar` muestra el sitio nuevo con certificado válido.
- [ ] `https://ivujus.org.ar/mi-cuenta-2/` → reenvía a `cms.ivujus.org.ar/mi-cuenta-2/`.
- [ ] Botón "Acceder al Campus" → `cms.ivujus.org.ar/mi-cuenta-2/`.
- [ ] PDFs de dossiers y Declaración descargan.
- [ ] Una entrada de prueba publicada en WordPress aparece en `/es/novedades` en ≤5 min.
- [ ] URLs viejas (`/reconocimiento-a-marcelo-aebi`, `/campus-virtual`, `/blog`) redirigen.
- [ ] Correo de `@ivujus.org.ar` sigue recibiendo.
- [ ] Search Console: alta de la propiedad y envío de `/sitemap.xml`.

## Vuelta atrás

1. Hostinger DNS: volver los `A @` a `148.135.128.39` y `147.79.120.183`.
2. Vercel: borrar `NEXT_PUBLIC_WP_ORIGIN` y redesplegar (o dejarlo: el CMS en
   `cms.` sigue funcionando igual).
3. WordPress: solo si hace falta volver a `ivujus.org.ar`, restaurar la copia del
   paso 2 o repetir el `search-replace` al revés.

## Después del cambio (no bloquea)

- `ivujus.org.ar/admin` hoy expone el login de Payload (sin uso). Retirarlo o
  bloquearlo en una sesión posterior.
- En Vercel, `DATABASE_URI` y `PAYLOAD_SECRET` de producción figuran como
  "readable-secret": marcarlos como sensibles.
- Mudar el Campus a su propio nombre (p. ej. `campus.ivujus.org.ar`) es opcional;
  con `cms.` alcanza.
