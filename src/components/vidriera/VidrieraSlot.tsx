'use client';

import { useEffect, useRef, useState, type ComponentType } from 'react';

import { VidrieraPoster } from './VidrieraPoster';
import type { PiezaVidriera } from './piezas';

type EscenaProps = { piezas: PiezaVidriera[] };

// Decide si la vidriera se queda en su versión plana o si monta la escena de
// Three.js encima.
//
// La escena NO se importa arriba: `import()` dinámico dentro del efecto, así
// el bundle de three (que pesa bastante más que todo el JS que hoy manda este
// sitio) no entra en el grafo del primer pintado. Se usa `import()` directo en
// vez de `next/dynamic` porque `ssr: false` no está permitido en un Server
// Component del App Router, y porque acá el fallback no es un "loading": es la
// vidriera real, que se queda en el DOM debajo de la escena.
//
// Escalera de arranque — todas las condiciones tienen que darse, en orden. Si
// alguna falla, la página se queda con la versión plana y no pasa nada:
//   1. ancho >= 768px            (en móvil no arranca nunca)
//   2. sin prefers-reduced-motion (el bloque CSS global solo frena
//      transiciones, no un bucle de rAF: hay que cortarlo acá)
//   3. la franja entró en viewport (IntersectionObserver)
//   4. el navegador está ocioso   (requestIdleCallback)
//   5. el módulo carga y el renderer se crea sin tirar (try/catch)

export function VidrieraSlot({ piezas }: { piezas: PiezaVidriera[] }) {
  const contenedorRef = useRef<HTMLDivElement | null>(null);
  const [Escena, setEscena] = useState<ComponentType<EscenaProps> | null>(null);

  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    const anchoOk = window.matchMedia('(min-width: 768px)');
    const prefiereQuieto = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!anchoOk.matches || prefiereQuieto.matches) return;

    let cancelado = false;
    let idleId: number | undefined;
    // `'requestIdleCallback' in window` haría que TypeScript estreche `window`
    // a `never` en la rama else; con `typeof` el narrowing no se propaga.
    const hayIdle = typeof window.requestIdleCallback === 'function';

    const cargar = () => {
      import('./VidrieraTresD')
        .then((mod) => {
          if (!cancelado) setEscena(() => mod.VidrieraTresD);
        })
        .catch(() => {
          // Sin escena 3D la página funciona igual: queda la versión plana.
        });
    };

    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((e) => e.isIntersecting)) return;
        observador.disconnect();

        idleId = hayIdle
          ? window.requestIdleCallback(cargar, { timeout: 2500 })
          : window.setTimeout(cargar, 300);
      },
      { rootMargin: '200px' },
    );

    observador.observe(contenedor);

    return () => {
      cancelado = true;
      observador.disconnect();
      if (idleId === undefined) return;
      if (hayIdle) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  return (
    <div ref={contenedorRef} className="relative h-full w-full">
      <VidrieraPoster piezas={piezas} atenuado={Escena !== null} />
      {Escena ? (
        <div className="absolute inset-0">
          <Escena piezas={piezas} />
        </div>
      ) : null}
    </div>
  );
}
