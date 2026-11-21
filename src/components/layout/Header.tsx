// Header.tsx — header institucional sticky con compactación al scroll.
// Puerto tipado de docs/reference/design-system-oficial/ui_kits/ivujus_site/Header.jsx.
//
// Único componente de esta ola que necesita 'use client': la compactación
// 88px → 64px depende de la posición de scroll, que solo se conoce en el
// navegador. El resto (logo, nav, CTA) es puramente presentacional.
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ButtonSecundario } from '@/components/ui/Buttons'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

export interface HeaderNavItem {
  label: string
  href: string
  /** Una línea que dice qué hay ahí; se muestra en el desplegable. */
  description?: string
  external?: boolean
}

/** Sección del menú con desplegable. Los href ya llevan el prefijo de idioma. */
export interface HeaderNavSection {
  id: string
  label: string
  /** Portada de la sección («Ver todo …»), si tiene. */
  href?: string
  overview?: string
  links: HeaderNavItem[]
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
  sections: HeaderNavSection[]
  cta?: HeaderCta
  /** Locale activo. Habilita los selectores de idioma y tema en la barra derecha. */
  locale?: string
}

// Umbral de scroll (px) a partir del cual el header pasa a su estado compacto.
const SCROLL_THRESHOLD = 24

// Copys del botón/menú móvil. Fuera del componente porque no dependen de
// props que cambien entre renders; `locale` solo indexa este mapa.
// `mainNav` etiqueta el landmark de navegación de escritorio: no se ve, pero
// es lo que anuncia un lector de pantalla al llegar al menú. Estaba fijo en
// español, así que en inglés y francés se leía «Principal».
const MOBILE_MENU_LABELS: Record<
  string,
  { open: string; close: string; nav: string; mainNav: string }
> = {
  es: {
    open: 'Abrir menú de navegación',
    close: 'Cerrar menú de navegación',
    nav: 'Menú',
    mainNav: 'Principal',
  },
  en: {
    open: 'Open navigation menu',
    close: 'Close navigation menu',
    nav: 'Menu',
    mainNav: 'Main',
  },
  fr: {
    open: 'Ouvrir le menu de navigation',
    close: 'Fermer le menu de navigation',
    nav: 'Menu',
    mainNav: 'Principal',
  },
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


function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      width="10"
      height="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className={[
        'shrink-0 transition-transform duration-[var(--motion-fast)] motion-reduce:transition-none',
        open ? 'rotate-180' : '',
      ].join(' ')}
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  )
}

/** La sección está activa si la ruta actual es su portada o uno de sus enlaces. */
function isSectionActive(section: HeaderNavSection, pathname: string | null): boolean {
  if (!pathname) return false
  const hrefs = [section.href, ...section.links.filter((link) => !link.external).map((link) => link.href)]
  return hrefs.some((href) => href && (pathname === href || pathname.startsWith(`${href}/`)))
}

function DropdownLink({ link, onNavigate }: { link: HeaderNavItem; onNavigate: () => void }) {
  const content = (
    <>
      <span className="block text-[13px] font-semibold text-[color:var(--ui-display-ink)]">{link.label}</span>
      {link.description ? (
        <span className="mt-0.5 block text-[12px] leading-snug text-[color:var(--ui-ink-3)]">{link.description}</span>
      ) : null}
    </>
  )
  const className = [
    'block rounded-[var(--radius-sm)] px-3 py-2.5 no-underline',
    'transition-colors duration-[var(--motion-fast)] hover:bg-[color:var(--ui-bg-muted)]',
    'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]',
  ].join(' ')
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener" className={className} onClick={onNavigate}>
      {content}
    </a>
  ) : (
    <Link href={link.href} className={className} onClick={onNavigate}>
      {content}
    </Link>
  )
}

export function Header({ homeHref = '/', subtitle, sections, cta, locale }: HeaderProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  // Desplegable abierto en escritorio (id de sección) y sección expandida en
  // el acordeón del celular. Son independientes: cada vista tiene el suyo.
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})

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

  // Al cambiar de página se cierra todo lo abierto. Ajuste de estado durante
  // el render (patrón recomendado por React) en vez de un efecto.
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setOpenSection(null)
    setMobileOpen(false)
  }

  useEffect(() => {
    // Esc cierra el desplegable (devolviendo el foco a su botón) o el panel
    // móvil. Clic fuera del menú cierra el desplegable.
    if (!mobileOpen && !openSection) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (openSection) {
        triggerRefs.current[openSection]?.focus()
        setOpenSection(null)
      } else {
        setMobileOpen(false)
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (openSection && navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenSection(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [mobileOpen, openSection])

  const menuLang = MOBILE_MENU_LABELS[locale ?? ''] ? (locale as string) : 'es'
  const menuLabels = MOBILE_MENU_LABELS[menuLang]
  const closeAll = () => {
    setOpenSection(null)
    setMobileOpen(false)
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-[color:var(--ui-border)] bg-[var(--ui-header-bg)] backdrop-blur-[8px]"
    >
      <div
        className={[
          'mx-auto flex max-w-[var(--container-default)] items-center gap-5 px-8',
          'transition-[padding] duration-[var(--motion-base)] ease-[var(--easing-standard)] motion-reduce:transition-none',
          scrolled ? 'py-3' : 'py-5',
        ].join(' ')}
      >
        {/* shrink-0 en el enlace: si se comprime, deforma el isotipo. */}
        <Link href={homeHref} className="flex shrink-0 items-center gap-3.5 no-underline">
          {/* Doble logo: el azul en claro/sepia, el blanco en oscuro (CSS). */}
          <Image
            src="/logos/logo-ivujus-mark.png"
            alt="IVUJUS"
            width={172}
            height={140}
            priority
            className={[
              'logo-theme-light w-auto shrink-0',
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
              'logo-theme-dark w-auto shrink-0',
              'transition-[height] duration-[var(--motion-base)] ease-[var(--easing-standard)] motion-reduce:transition-none',
              scrolled ? 'h-9' : 'h-11',
            ].join(' ')}
          />
          {subtitle ? (
            <span
              className={[
                // Con cinco secciones con desplegable la barra no tiene lugar
                // para el subtítulo: solo se muestra cuando no hay menú.
                'flex-col justify-center text-[9.5px] uppercase leading-tight tracking-[0.14em] text-[color:var(--ui-ink-3)]',
                scrolled || sections.length > 0 ? 'hidden' : 'flex',
              ].join(' ')}
            >
              {subtitle}
            </span>
          ) : null}
        </Link>

        {/* Desde xl (1280px): con los selectores de idioma y tema siempre a la
            vista, la fila completa necesita ~1.100px (medido en es/en/fr). Por
            debajo, el botón de menú abre el mismo contenido como acordeón.
            Menú de escritorio: cinco secciones con desplegable (patrón
            «disclosure»: botón con aria-expanded que muestra una lista de
            enlaces). Se abre con clic, no al pasar el mouse, para que no se
            abra solo al cruzar la barra; funciona entero con teclado. */}
        {sections.length > 0 ? (
          <nav ref={navRef} aria-label={menuLabels.mainNav} className="ml-auto hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {sections.map((section) => {
                const open = openSection === section.id
                const active = isSectionActive(section, pathname)
                const panelId = `nav-panel-${section.id}`
                return (
                  <li key={section.id} className="relative">
                    <button
                      type="button"
                      ref={(element) => {
                        triggerRefs.current[section.id] = element
                      }}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenSection(open ? null : section.id)}
                      className={[
                        'flex items-center gap-1.5 rounded-[var(--radius-sm)] border-b-2 px-2 pb-1 pt-1.5',
                        'text-[11px] font-semibold uppercase tracking-[0.12em]',
                        'transition-colors duration-[var(--motion-fast)] ease-[var(--easing-standard)]',
                        'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]',
                        active || open
                          ? 'border-dorado-600 text-[color:var(--ui-display-ink)]'
                          : 'border-transparent text-[color:var(--ui-ink-3)] hover:text-[color:var(--ui-ink-1)]',
                      ].join(' ')}
                    >
                      {section.label}
                      <ChevronIcon open={open} />
                    </button>
                    <div
                      id={panelId}
                      hidden={!open}
                      className="absolute left-1/2 top-full z-50 mt-3 w-[320px] -translate-x-1/2 rounded-md border border-[color:var(--ui-border)] bg-[color:var(--ui-bg-surface)] p-2 shadow-[var(--shadow-2)]"
                    >
                      <ul className="space-y-0.5">
                        {section.links.map((link) => (
                          <li key={link.href}>
                            <DropdownLink link={link} onNavigate={closeAll} />
                          </li>
                        ))}
                      </ul>
                      {section.href && section.overview ? (
                        <div className="mt-1 border-t border-[color:var(--ui-border)] px-3 pb-1 pt-2.5">
                          <Link
                            href={section.href}
                            onClick={closeAll}
                            className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ui-accent-ink)] no-underline hover:underline"
                          >
                            {section.overview} <span aria-hidden="true">→</span>
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  </li>
                )
              })}
            </ul>
          </nav>
        ) : null}

        <div className={['hidden items-center gap-4 xl:flex', sections.length > 0 ? '' : 'xl:ml-auto'].join(' ')}>
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

        {sections.length > 0 || locale || cta ? (
          <button
            type="button"
            className={[
              'ml-auto flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] xl:hidden',
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

      {/* Panel móvil: empuja el contenido (no es un overlay) y usa `inert`
          cuando está cerrado. Las secciones son un acordeón. */}
      <div
        id={MOBILE_PANEL_ID}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={[
          'grid overflow-hidden border-[color:var(--ui-border)] xl:hidden',
          'transition-[grid-template-rows] duration-[var(--motion-base)] ease-[var(--easing-standard)] motion-reduce:transition-none',
          mobileOpen ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr]',
        ].join(' ')}
      >
        <div className="min-h-0 overflow-y-auto" style={{ maxHeight: 'calc(100dvh - 72px)' }}>
          <div className="flex flex-col gap-6 px-6 py-5">
            {cta ? (
              <ButtonSecundario
                href={cta.href}
                target={cta.target}
                rel={cta.rel}
                size="sm"
                className="self-stretch justify-center"
                onClick={() => setMobileOpen(false)}
              >
                {cta.label}
              </ButtonSecundario>
            ) : null}

            {sections.length > 0 ? (
              <nav aria-label={menuLabels.nav}>
                <ul className="divide-y divide-[color:var(--ui-border)]">
                  {sections.map((section) => {
                    const open = mobileSection === section.id
                    const panelId = `nav-mobile-${section.id}`
                    return (
                      <li key={section.id}>
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={panelId}
                          onClick={() => setMobileSection(open ? null : section.id)}
                          className={[
                            'flex min-h-12 w-full items-center justify-between py-3 text-left',
                            'text-[13px] font-semibold uppercase tracking-[0.16em]',
                            'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]',
                            isSectionActive(section, pathname)
                              ? 'text-[color:var(--ui-display-ink)]'
                              : 'text-[color:var(--ui-ink-2)]',
                          ].join(' ')}
                        >
                          {section.label}
                          <ChevronIcon open={open} />
                        </button>
                        <div id={panelId} hidden={!open} className="pb-3">
                          <ul className="space-y-0.5">
                            {section.links.map((link) => (
                              <li key={link.href}>
                                <DropdownLink link={link} onNavigate={closeAll} />
                              </li>
                            ))}
                            {section.href && section.overview ? (
                              <li className="px-3 pt-2">
                                <Link
                                  href={section.href}
                                  onClick={closeAll}
                                  className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ui-accent-ink)] no-underline"
                                >
                                  {section.overview} <span aria-hidden="true">→</span>
                                </Link>
                              </li>
                            ) : null}
                          </ul>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </nav>
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
