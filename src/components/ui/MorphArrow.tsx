// Flecha que se estira (adaptada de «Chevron morph», microinteractions.dev,
// Juan Di Nella, licencia MIT). En reposo es un chevron; cuando el elemento
// que la contiene (con la clase `morph-trigger`) recibe hover de mouse o foco
// de teclado, el trazo crece desde su base y el chevron avanza. Estilos en
// globals.css (`.morph-arrow`). Es decorativa: el texto del enlace ya dice
// adónde lleva.
export function MorphArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={['morph-arrow', className].filter(Boolean).join(' ')}>
      <path className="morph-arrow__chevron" d="M10 7L15 12L10 17" />
      <path className="morph-arrow__stem" d="M7 12H15" />
    </svg>
  )
}
