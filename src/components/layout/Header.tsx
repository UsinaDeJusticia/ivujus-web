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
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

export interface HeaderNavItem {
  label: string
  href: string
}

export interface HeaderCta {
  label: string
  href: string
  /** Ej.: '_blank' para el CTA "Acceder al Campus", que apunta a un dominio externo. */
  target?: string
  rel?: string
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
  /** Locale activo. Habilita los selectores de idioma y tema en la barra derecha. */
  locale?: string
}

// Umbral de scroll (px) a partir del cual el header pasa a su estado compacto.
const SCROLL_THRESHOLD = 24

// Copys del botón/menú móvil. Fuera del componente porque no dependen de
// props que cambien entre renders; `locale` solo indexa este mapa.
const MOBILE_MENU_LABELS: Record<string, { open: string; close: string; nav: string }> = {
  es: { open: 'Abrir menú de navegación', close: 'Cerrar menú de navegación', nav: 'Menú' },
  en: { open: 'Open navigation menu', close: 'Close navigation menu', nav: 'Menu' },
  fr: { open: 'Ouvrir le menu de navigation', close: 'Fermer le menu de navigation', nav: 'Menu' },
}

const MOBILE_PANEL_ID = 'header-mobile-panel'

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  )
}

export function Header({ homeHref = '/', subtitle, items, activeHref, cta, locale }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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

  useEffect(() => {
    // Cierre con Esc: solo se registra mientras el panel está abierto.
    if (!mobileOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const menuLang = MOBILE_MENU_LABELS[locale ?? ''] ? (locale as string) : 'es'
  const menuLabels = MOBILE_MENU_LABELS[menuLang]

  return (
    <header
      className="sticky top-0 z-50 border-b border-[color:var(--ui-border)] bg-[var(--ui-header-bg)] backdrop-blur-[8px]"
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
          {/* Doble logo: el isotipo azul se ve bien sobre claro/sepia; en
              tema oscuro el azul es casi invisible sobre el fondo azul-950,
              así que se cambia por la versión blanca. El toggle es por CSS
              (reglas .logo-theme-* en globals.css) para no depender de JS. */}
          <Image
            src="/logos/logo-ivujus-mark.png"
            alt="IVUJUS"
            width={172}
            height={140}
            priority
            className={[
              'logo-theme-light w-auto',
              'transition-[height] duration-[var(--motion-base)] ease-[var(--easing-standard)] motion-reduce:transition-none',
              scrolled ? 'h-9' : 'h-11',
            ].join(' ')}
          />
          <Image
            src="/logos/logo-ivujus-mark-white.png"
            alt="IVUJUS"
            width={172}
            height={140}
            priority
            className={[
              'logo-theme-dark w-auto',
              'transition-[height] duration-[var(--motion-base)] ease-[var(--easing-standard)] motion-reduce:transition-none',
              scrolled ? 'h-9' : 'h-11',
            ].join(' ')}
          />
          {subtitle ? (
            <span
              className={[
                'flex-col justify-center text-[9.5px] uppercase leading-tight tracking-[0.14em] text-[color:var(--ui-ink-3)]',
                scrolled ? 'hidden' : 'flex',
              ].join(' ')}
            >
              {subtitle}
            </span>
          ) : null}
        </Link>

        {items.length > 0 ? (
          <nav aria-label="Principal" className="ml-auto hidden items-center gap-7 md:flex">
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
                      ? 'border-dorado-600 text-[color:var(--ui-display-ink)]'
                      : 'border-transparent text-[color:var(--ui-ink-3)] hover:text-[color:var(--ui-ink-1)]',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        ) : null}

        {/* Barra de controles: idioma + tema de lectura. Se agrupan a la
            derecha; toman `ml-auto` si no hubo nav que ya lo empujara.
            Debajo de `md` se ocultan acá y reaparecen en el panel móvil. */}
        <div
          className={[
            'hidden items-center gap-4 md:flex',
            items.length > 0 ? '' : 'md:ml-auto',
          ].join(' ')}
        >
          {cta ? (
            <ButtonSecundario href={cta.href} target={cta.target} rel={cta.rel} size="sm">
              {cta.label}
            </ButtonSecundario>
          ) : null}
          {locale ? (
            <>
              <LanguageSwitcher locale={locale} />
              <ThemeSwitcher locale={locale} />
            </>
          ) : null}
        </div>

        {/* Disparador del menú móvil: solo existe por debajo de `md`, donde
            nav + controles de arriba quedan ocultos por falta de espacio
            (ver diagnóstico Ola 7 — a 360px el header desbordaba ~467px). */}
        {items.length > 0 || locale || cta ? (
          <button
            type="button"
            className={[
              'ml-auto flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] md:hidden',
              'text-[color:var(--ui-ink-2)] transition-colors duration-[var(--motion-fast)] ease-[var(--easing-standard)]',
              'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]',
            ].join(' ')}
            aria-expanded={mobileOpen}
            aria-controls={MOBILE_PANEL_ID}
            aria-label={mobileOpen ? menuLabels.close : menuLabels.open}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        ) : null}
      </div>

      {/* Panel móvil desplegable: vive dentro del <header> sticky y empuja
          el contenido de la página hacia abajo al abrirse (no es un overlay
          fijo), para que nunca tape contenido de forma inaccesible. Se
          mantiene montado siempre y se anima con la técnica grid-rows
          para poder tener transición + `inert` sin recalcular alturas. */}
      <div
        id={MOBILE_PANEL_ID}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={[
          'grid overflow-hidden border-[color:var(--ui-border)] md:hidden',
          'transition-[grid-template-rows] duration-[var(--motion-base)] ease-[var(--easing-standard)] motion-reduce:transition-none',
          mobileOpen ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr]',
        ].join(' ')}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-6 px-8 py-6">
            {items.length > 0 ? (
              <nav aria-label={menuLabels.nav} className="flex flex-col gap-1">
                {items.map((item) => {
                  const isActive = item.href === activeHref
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={[
                        'border-l-2 py-2 pl-4 text-[13px] font-semibold uppercase tracking-[0.18em] no-underline',
                        'transition-colors duration-[var(--motion-fast)] ease-[var(--easing-standard)]',
                        isActive
                          ? 'border-dorado-600 text-[color:var(--ui-display-ink)]'
                          : 'border-transparent text-[color:var(--ui-ink-3)] hover:text-[color:var(--ui-ink-1)]',
                      ].join(' ')}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            ) : null}

            {cta ? (
              <ButtonSecundario
                href={cta.href}
                target={cta.target}
                rel={cta.rel}
                size="sm"
                className="self-start"
                onClick={() => setMobileOpen(false)}
              >
                {cta.label}
              </ButtonSecundario>
            ) : null}

            {locale ? (
              <div className="flex flex-wrap items-center gap-4 border-t border-[color:var(--ui-border)] pt-5">
                <LanguageSwitcher locale={locale} />
                <ThemeSwitcher locale={locale} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
