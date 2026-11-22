// Índice lateral de una página larga: una marca fina por sección.
//
// Adaptado de «Tick rail» (microinteractions.dev, Juan Di Nella, licencia
// MIT) y de la guía «scrollspy» de Modern Web Guidance. Qué hace:
// - Una marca (2px × 24px) por sección; la de la sección que se está
//   leyendo es más larga y dorada (largo + color: no depende solo del color).
// - Con el mouse, las marcas crecen alrededor del puntero y una tarjeta
//   muestra el título de la sección que tiene debajo.
// - Cada marca es un enlace real (`href="#id"`) con el título como texto
//   para lectores de pantalla; la tarjeta es solo visual (`aria-hidden`).
// - Teclado: Tab llega a las marcas; ↑/↓ mueven entre ellas, Inicio/Fin
//   saltan a los extremos y Esc oculta la tarjeta. Con teclado no hay
//   animaciones que esperar.
// - Movimiento reducido: todo cambia sin transiciones.
// - Solo se muestra en pantallas anchas (lo decide la página con `showFrom`),
//   donde hay margen libre al costado del texto. En pantallas chicas no
//   aparece y la página se lee igual.
'use client'

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'

export interface SectionRailItem {
  /** id de la sección en la página (sin «#»). */
  id: string
  /** Título de la sección: texto del enlace y de la tarjeta. */
  label: string
}

interface SectionRailProps {
  items: SectionRailItem[]
  /** Nombre accesible del índice, p. ej. «En esta página». */
  ariaLabel: string
  /** Desde qué ancho aparece. `xl` = 1280px; `wide` = 1440px. */
  showFrom?: 'xl' | 'wide'
}

const ROW = 24
const REST = 1 / 3
const CURRENT = 2 / 3
// Cuántas filas alrededor del puntero crecen (efecto lupa).
const REACH = 2.5

export function SectionRail({ items, ariaLabel, showFrom = 'xl' }: SectionRailProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)
  // Posición del puntero en filas (con decimales) mientras está sobre el índice.
  const [pointerRow, setPointerRow] = useState<number | null>(null)
  // Fila cuya tarjeta se muestra (por hover o por foco de teclado).
  const [cardRow, setCardRow] = useState<number | null>(null)
  const [keyboard, setKeyboard] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([])

  // Sección actual: la última cuyo inicio ya pasó una línea a 160px del
  // borde superior (justo debajo de donde queda un título al saltar desde el
  // índice: encabezado fijo + `scroll-mt-28`); al llegar al final de la
  // página, la última sección. Se mide en
  // el scroll (un cálculo por cuadro) en vez de con IntersectionObserver,
  // porque con secciones cortas el observador marcaba la anterior.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = Math.min(160, window.innerHeight / 3)
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let current = items[0]?.id ?? null
      for (const item of items) {
        const element = document.getElementById(item.id)
        if (element && element.getBoundingClientRect().top <= line) current = item.id
      }
      if (atBottom && items.length > 0) current = items[items.length - 1].id
      setActiveId(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [items])

  // Esc oculta la tarjeta desde cualquier lugar de la página (WCAG 1.4.13).
  useEffect(() => {
    if (cardRow === null) return
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setCardRow(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [cardRow])

  const onPointerMove = useCallback((event: PointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== 'mouse' || !listRef.current) return
    const top = listRef.current.getBoundingClientRect().top
    const row = (event.clientY - top) / ROW - 0.5
    setKeyboard(false)
    setPointerRow(row)
    setCardRow(Math.min(items.length - 1, Math.max(0, Math.round(row))))
  }, [items.length])

  const onPointerLeave = useCallback(() => {
    setPointerRow(null)
    setCardRow(null)
  }, [])

  const onKeyDown = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    const last = items.length - 1
    const target =
      event.key === 'ArrowDown' ? Math.min(last, index + 1)
      : event.key === 'ArrowUp' ? Math.max(0, index - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null
    if (target === null) return
    event.preventDefault()
    linkRefs.current[target]?.focus()
  }

  const scaleFor = (index: number, isCurrent: boolean) => {
    const base = isCurrent ? CURRENT : REST
    if (pointerRow === null) return base
    const closeness = Math.max(0, 1 - Math.abs(index - pointerRow) / REACH)
    return base + (1 - base) * closeness * closeness
  }

  if (items.length < 2) return null

  return (
    <nav
      aria-label={ariaLabel}
      className={[
        'fixed left-6 top-1/2 z-30 -translate-y-1/2',
        showFrom === 'wide' ? 'hidden min-[1440px]:block' : 'hidden xl:block',
      ].join(' ')}
    >
      <ul
        ref={listRef}
        className="relative w-12 py-4"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {items.map((item, index) => {
          const isCurrent = item.id === activeId
          return (
            <li key={item.id} style={{ height: ROW }}>
              <a
                ref={(element) => {
                  linkRefs.current[index] = element
                }}
                href={`#${item.id}`}
                aria-current={isCurrent ? 'location' : undefined}
                onKeyDown={(event) => onKeyDown(event, index)}
                onFocus={(event) => {
                  if (event.currentTarget.matches(':focus-visible')) {
                    setKeyboard(true)
                    setCardRow(index)
                  }
                }}
                onBlur={() => setCardRow((row) => (row === index ? null : row))}
                className={[
                  'flex h-full w-full items-center rounded-sm pl-2 no-underline',
                  'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]',
                  isCurrent ? 'text-dorado-600' : 'text-[color:var(--ui-ink-3)]',
                ].join(' ')}
              >
                <span className="sr-only">{item.label}</span>
                <span
                  aria-hidden="true"
                  className={[
                    'block h-0.5 w-6 origin-left rounded-[1px] bg-current',
                    'transition-transform duration-[160ms] ease-[var(--easing-emphasized)] motion-reduce:transition-none',
                    keyboard ? 'transition-none' : '',
                  ].join(' ')}
                  style={{ transform: `scaleX(${scaleFor(index, isCurrent)})` }}
                />
              </a>
            </li>
          )
        })}

        {/* Tarjeta: solo visual. Se ubica a la altura de la fila señalada. */}
        <li
          aria-hidden="true"
          className={[
            'pointer-events-none absolute left-12 top-4 w-max max-w-[220px]',
            'rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] px-3 py-2 shadow-[var(--shadow-2)]',
            'text-[12px] font-semibold leading-snug text-[color:var(--ui-display-ink)]',
            'transition-[opacity,translate] duration-[180ms] ease-[var(--easing-emphasized)] motion-reduce:transition-none',
            keyboard ? 'transition-none' : '',
            cardRow === null ? 'opacity-0' : 'opacity-100',
          ].join(' ')}
          style={{ translate: `0 ${(cardRow ?? 0) * ROW - 6}px` }}
        >
          {cardRow !== null ? items[cardRow]?.label : ''}
        </li>
      </ul>
    </nav>
  )
}
