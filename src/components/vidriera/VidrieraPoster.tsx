import Link from 'next/link';

import { COLOR_ENCUADERNACION, GROSOR_RELATIVO, type PiezaVidriera } from './piezas';

// Versión plana de la vidriera: una fila de lomos apoyados sobre un estante.
//
// No es un "placeholder mientras carga": es la vidriera por defecto. Se
// renderiza siempre, en el servidor, y es lo único que se ve en móvil, con
// `prefers-reduced-motion`, sin JavaScript o si WebGL falla. La escena de
// Three.js se monta encima solo cuando corresponde (ver VidrieraSlot).
//
// Por eso acá el título de cada pieza es texto real dentro de un enlace real:
// aunque la capa 3D nunca arranque, la vidriera sigue siendo navegable y
// legible por un lector de pantalla.

export function VidrieraPoster({
  piezas,
  atenuado = false,
}: {
  piezas: PiezaVidriera[];
  /** Se atenúa cuando la escena 3D ya tomó el relevo encima. */
  atenuado?: boolean;
}) {
  return (
    <div
      className={[
        'flex h-full w-full items-end justify-center gap-2.5 px-6 pb-12 transition-opacity duration-[var(--motion-slow)] sm:gap-3.5',
        atenuado ? 'opacity-0' : 'opacity-100',
      ].join(' ')}
      // Cuando la escena 3D está encima, esta capa deja de existir para el
      // teclado y para el lector de pantalla. Si no, cada enlace quedaría
      // duplicado e invisible, que es la trampa de foco clásica de este patrón.
      aria-hidden={atenuado || undefined}
      inert={atenuado || undefined}
    >
      {piezas.map((pieza) => {
        const { lomo, texto } = COLOR_ENCUADERNACION[pieza.tipo];
        const grosor = GROSOR_RELATIVO[pieza.tipo];

        return (
          <Link
            key={pieza.id}
            href={pieza.href}
            className="group relative flex h-[clamp(150px,26vw,250px)] shrink-0 flex-col items-center overflow-hidden rounded-[2px] py-3 no-underline shadow-[var(--shadow-2)] outline-none transition-transform duration-[var(--motion-base)] ease-[var(--easing-out)] hover:-translate-y-2 focus-visible:-translate-y-2 focus-visible:shadow-[var(--shadow-focus)]"
            style={{
              width: `clamp(${36 + grosor * 24}px, ${5 + grosor * 3}vw, ${50 + grosor * 40}px)`,
              backgroundColor: lomo,
              color: texto,
            }}
          >
            {/* Bisagra: el canto oscuro por donde abre el libro. */}
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[5px] bg-black/25" />
            <span aria-hidden="true" className="absolute inset-y-0 right-0 w-[3px] bg-white/10" />

            <span className="relative text-[8px] font-semibold uppercase tracking-[0.14em] opacity-70">
              {pieza.anio}
            </span>

            {/* El título corre de abajo hacia arriba, como en el lomo de un
                libro real en español. Con `writing-mode` vertical el alto pasa
                a ser la medida en línea, así que `max-h-full` + `text-ellipsis`
                cortan el título por el final; sin eso el centrado lo recortaba
                por los dos extremos y quedaba ilegible. */}
            <span className="relative flex flex-1 items-center justify-center overflow-hidden py-2">
              <span
                className="max-h-full overflow-hidden text-ellipsis whitespace-nowrap text-[9.5px] font-semibold leading-none tracking-[0.02em] sm:text-[11px]"
                style={{ writingMode: 'vertical-rl', rotate: '180deg' }}
              >
                {pieza.titulo}
              </span>
            </span>

            <span
              aria-hidden="true"
              className="relative h-[3px] w-4 rounded-full bg-current opacity-40"
            />
          </Link>
        );
      })}
    </div>
  );
}
