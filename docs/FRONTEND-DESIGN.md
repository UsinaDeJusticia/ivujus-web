## Direccion visual del frontend

Estado: definida para la primera implementacion publica.

### Diagnostico

- El brief tecnico dejaba explicito que la paleta y la identidad visual no debian expandirse sin una fase especifica de diseno visual.
- El frontend implementado hasta ahora era solo un placeholder, por lo que no existia una decision de diseno aplicada en codigo.
- Las referencias actuales de `usinadejusticia.org.ar` e `ivujus.org.ar` comparten un tono institucional sobrio, con predominio de azul oscuro y comunicacion centrada en legitimidad, acompanamiento y formacion.

### Decision

Se adopta una direccion editorial institucional para `ivujus-web`.

Principios:

- Base heredada de Usina: mantener el navy como color dominante.
- Expansion controlada: sumar neutrales calidos y un acento cobre suave, sin convertir el sitio en una landing comercial generica.
- Tono academico internacional: el sitio debe sentirse como nodo de investigacion, formacion y produccion editorial, no como micrositio de campana.
- Jerarquia tipografica editorial: titulares con serif, cuerpo con sans legible, ritmo amplio y bloques bien respirados.
- Sobriedad antes que efecto: evitar gradientes agresivos, glassmorphism, dashboards falsos o recursos visuales de startup SaaS.

### Tokens iniciales

- `--color-usina-navy`: azul institucional profundo.
- `--color-usina-ink`: texto oscuro principal.
- `--color-usina-paper`: fondo marfil claro.
- `--color-usina-line`: bordes suaves.
- `--color-usina-accent`: cobre apagado para destacados y llamados de atencion.

### Aplicacion inicial

- Home con hero editorial.
- Modulos de acceso a instituto, formacion, publicaciones y simposios.
- CTA principal al campus, respetando la decision arquitectonica de mantener el LMS fuera de este repo.
- Componentes con bordes, contraste y ritmo de lectura consistentes con un portal academico.

### Que evitar

- Reutilizar patrones visuales de SaaS templates.
- Introducir muchos colores de acento sin validacion posterior.
- Disenar el home como si IVUJUS fuera solo una ONG local; el framing debe ser institucional e internacional.
