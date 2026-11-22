// Pestañas con línea que se desliza a la elegida.
//
// Adaptado de «Tab indicator» (microinteractions.dev, Juan Di Nella, licencia
// MIT) y de las guías «search-hidden-content» y «anchor-positioning-tab-
// underline» de Modern Web Guidance:
// - Patrón de pestañas WAI-ARIA: `tablist` / `tab` (aria-selected,
//   aria-controls) / `tabpanel`. Una sola parada de Tab: ←/→ (con vuelta) e
//   Inicio/Fin mueven el foco y la selección juntos.
// - La línea se desliza a la pestaña elegida (250ms) desde donde esté. Con
//   teclado o movimiento reducido, salta sin animación.
// - La etiqueta elegida pasa a negrita sin mover nada: una copia invisible en
//   negrita reserva el ancho.
// - Las pestañas cerradas se ocultan con `hidden="until-found"`: «Buscar en
//   la página» y los buscadores encuentran su texto, y si alguien busca algo
//   que está adentro, la pestaña se abre sola (evento `beforematch`).
'use client'

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

export interface TabItem {
  id: string
  label: string
  /** Texto chico arriba de la etiqueta (p. ej. la fecha). */
  kicker?: string
  panel: ReactNode
}

interface TabsProps {
  /** Nombre accesible de la lista de pestañas. */
  label: string
  items: TabItem[]
}

// useLayoutEffect en el navegador; en el servidor, useEffect (sin aviso).
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export function Tabs({ label, items }: TabsProps) {
  const baseId = useId()
  const [selected, setSelected] = useState(0)
  const [instant, setInstant] = useState(true)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const panelRefs = useRef<Array<HTMLDivElement | null>>([])

  const tabId = (index: number) => `${baseId}-tab-${items[index].id}`
  const panelId = (index: number) => `${baseId}-panel-${items[index].id}`

  const measure = useCallback(() => {
    const tab = tabRefs.current[selected]
    if (tab) setIndicator({ left: tab.offsetLeft, width: tab.offsetWidth })
  }, [selected])

  useIsoLayoutEffect(() => {
    measure()
  }, [measure])

  // Re-medir si cambia el ancho (fuentes que cargan, giro de pantalla).
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const observer = new ResizeObserver(() => {
      setInstant(true)
      measure()
    })
    observer.observe(list)
    return () => observer.disconnect()
  }, [measure])

  // Pestañas cerradas: `hidden="until-found"` donde el navegador lo soporta
  // (React no escribe ese valor, solo el booleano). Donde no, quedan con
  // `hidden` común y se abren con su pestaña.
  useEffect(() => {
    if (!('onbeforematch' in HTMLElement.prototype)) return
    panelRefs.current.forEach((panel, index) => {
      if (panel && index !== selected) panel.setAttribute('hidden', 'until-found')
    })
  }, [selected])

  // «Buscar en la página» encontró texto en una pestaña cerrada: se abre.
  useEffect(() => {
    const cleanups = panelRefs.current.map((panel, index) => {
      if (!panel) return () => {}
      const onMatch = () => {
        setInstant(true)
        setSelected(index)
      }
      panel.addEventListener('beforematch', onMatch)
      return () => panel.removeEventListener('beforematch', onMatch)
    })
    return () => cleanups.forEach((cleanup) => cleanup())
  }, [items.length])

  const select = (index: number, fromKeyboard: boolean) => {
    setInstant(fromKeyboard)
    setSelected(index)
    if (fromKeyboard) tabRefs.current[index]?.focus({ preventScroll: true })
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1
    const target =
      event.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : event.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null
    if (target === null) return
    event.preventDefault()
    select(target, true)
  }

  return (
    <div>
      <div
        ref={listRef}
        role="tablist"
        aria-label={label}
        className="relative flex gap-2 border-b border-[color:var(--ui-border)]"
      >
        {items.map((item, index) => {
          const isSelected = index === selected
          return (
            <button
              key={item.id}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              type="button"
              role="tab"
              id={tabId(index)}
              aria-selected={isSelected}
              aria-controls={panelId(index)}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => select(index, false)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={[
                // En el celular las pestañas se reparten el ancho y el título baja de
                // línea; desde sm toman su ancho natural.
                'flex min-h-12 min-w-0 flex-1 flex-col items-start justify-center rounded-t-sm px-4 py-3 text-left sm:flex-none',
                'transition-colors duration-[120ms] ease-[ease]',
                'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]',
                isSelected
                  ? 'text-[color:var(--ui-display-ink)]'
                  : 'text-[color:var(--ui-ink-3)] hover:bg-[color:var(--ui-bg-muted)] hover:text-[color:var(--ui-ink-1)]',
              ].join(' ')}
            >
              {item.kicker ? (
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--ui-accent-ink)]">
                  {item.kicker}
                </span>
              ) : null}
              {/* Copia invisible en negrita: reserva el ancho para que el
                  cambio de peso no mueva las pestañas vecinas. */}
              <span className="grid text-[15px]">
                <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-bold">
                  {item.label}
                </span>
                <span className={['col-start-1 row-start-1', isSelected ? 'font-bold' : 'font-medium'].join(' ')}>
                  {item.label}
                </span>
              </span>
            </button>
          )
        })}

        {/* Línea indicadora: solo visual; el estado lo anuncia aria-selected.
            Es un borde (no un fondo) para que se vea en modo de alto
            contraste. */}
        {indicator ? (
          <span
            aria-hidden="true"
            className={[
              'pointer-events-none absolute bottom-0 left-0 h-0 border-b-[3px] border-dorado-600',
              'transition-[translate,width] duration-[250ms] ease-[var(--easing-emphasized)] motion-reduce:transition-none',
              instant ? 'transition-none' : '',
            ].join(' ')}
            style={{ width: indicator.width, translate: `${indicator.left}px 0` }}
          />
        ) : null}
      </div>

      {items.map((item, index) => (
        <div
          key={item.id}
          ref={(element) => {
            panelRefs.current[index] = element
          }}
          role="tabpanel"
          id={panelId(index)}
          aria-labelledby={tabId(index)}
          tabIndex={0}
          // Sin estilos de display en este elemento (rompería until-found):
          // el espaciado va en el hijo. React solo escribe `hidden` booleano;
          // el efecto de abajo lo pasa a «until-found» en el navegador.
          hidden={index !== selected}
          className="focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]"
        >
          <div className="pt-8">{item.panel}</div>
        </div>
      ))}
    </div>
  )
}
