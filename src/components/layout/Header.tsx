// Header.tsx — header institucional sticky con compactación al scroll.
// Puerto tipado de docs/reference/design-system-oficial/ui_kits/ivujus_site/Header.jsx.
//
// Único componente de esta ola que necesita 'use client': la compactación
// 88px → 64px depende de la posición de scroll, que solo se conoce en el
// navegador. El resto (logo, nav, CTA) es puramente presentacional.
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ButtonSecundario } from '@/components/ui/Buttons'

export interface HeaderNavItem {
  label: string
  href: string
}

export interface HeaderCta {
  label: string
  href: string
}

export interface HeaderProps {
  /** Ruta del logo/home. Default '/': el layout de [locale] resuelve el prefijo real. */
  homeHref?: string
  /** Subtítulo institucional bajo la marca (ej.: "Instituto de Victimología de Usina de Justicia"). */
  subtitle?: string
  items: HeaderNavItem[]
  /** href del item activo, para resaltar la navegación (borde inferior dorado). */
  activeHref?: string
  cta?: HeaderCta
}

// Umbral de scroll (px) a partir del cual el header pasa a su estado compacto.
const SCROLL_THRESHOLD = 24

export function Header({ homeHref = '/', subtitle, items, activeHref, cta }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // La compactación en sí es funcional (no cosmética): se calcula siempre.
    // `prefers-reduced-motion` solo se respeta desactivando la transición
    // animada vía la clase `motion-reduce:transition-none` en el JSX de
    // abajo, no evitando el cambio de tamaño.
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 border-b border-gris-200 bg-[rgba(255,255,255,0.92)] backdrop-blur-[8px]"
      // El header sticky en sí no anima; lo que compacta es el padding/alto
      // interno (ver contenedor de abajo), tal como en el manual.
    >
      <div
        className={[
          'mx-auto flex max-w-[var(--container-default)] items-center gap-7 px-8',
          'transition-[padding] duration-[var(--motion-base)] ease-[var(--easing-standard)] motion-reduce:transition-none',
          scrolled ? 'py-3' : 'py-5',
        ].join(' ')}
      >
        <Link href={homeHref} className="flex items-center gap-3.5 no-underline">
          <Image
            src="/logos/logo-ivujus-mark.png"
            alt="IVUJUS"
            width={172}
            height={140}
            priority
            className={[
              'w-auto',
              'transition-[height] duration-[var(--motion-base)] ease-[var(--easing-standard)] motion-reduce:transition-none',
              scrolled ? 'h-9' : 'h-11',
            ].join(' ')}
          />
          {subtitle ? (
            <span
              className={[
                'flex-col justify-center text-[9.5px] uppercase leading-tight tracking-[0.14em] text-gris-700',
                scrolled ? 'hidden' : 'flex',
              ].join(' ')}
            >
              {subtitle}
            </span>
          ) : null}
        </Link>

        {items.length > 0 ? (
          <nav aria-label="Principal" className="ml-auto flex items-center gap-7">
            {items.map((item) => {
              const isActive = item.href === activeHref
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'border-b-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] no-underline',
                    'transition-colors duration-[var(--motion-fast)] ease-[var(--easing-standard)]',
                    isActive
                      ? 'border-dorado-600 text-azul-900'
                      : 'border-transparent text-gris-700 hover:text-azul-800',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        ) : null}

        {cta ? (
          <ButtonSecundario href={cta.href} size="sm" className={items.length > 0 ? '' : 'ml-auto'}>
            {cta.label}
          </ButtonSecundario>
        ) : null}
      </div>
    </header>
  )
}
