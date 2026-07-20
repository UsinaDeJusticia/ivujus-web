// Buttons.tsx — ButtonPrincipal, ButtonSecundario, ButtonTerciario, LinkArrow.
// Puerto tipado de docs/reference/design-system-oficial/ui_kits/ivujus_site/Buttons.jsx.
//
// El prototipo de referencia simula hover/active con estado de React
// (`useState` + `onMouseEnter/onMouseLeave`). Acá no hace falta: todos los
// estados del manual (hover, focus, active, disabled) son expresables con
// pseudo-clases CSS puras (`:hover`, `:focus-visible`, `:active`,
// `:disabled`), así que estos componentes quedan como server components —
// no requieren 'use client'. Si algún consumidor pasa `onClick`, la
// interactividad la aporta el árbol cliente que lo invoca, no este módulo.

import Link from 'next/link'
import type { ReactNode } from 'react'

export type ButtonSize = 'sm' | 'md' | 'lg'

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-[9px] text-[10.5px]',
  md: 'px-6 py-[14px] text-[12px]',
  lg: 'px-[30px] py-[17px] text-[13px]',
}

// Base compartida: Montserrat 600 en versalitas, radio 4px (coincide con
// `rounded-sm` nativo de Tailwind), sin sombras, sin scale — solo cambios
// de color/opacidad en 200/120ms según el manual.
const BUTTON_BASE =
  'inline-flex items-center gap-2 whitespace-nowrap rounded-sm border font-semibold uppercase tracking-[0.18em] leading-none no-underline outline-none transition-[background-color,color,border-color,opacity] duration-[var(--motion-base)] ease-[var(--easing-standard)] focus-visible:shadow-[var(--shadow-focus)] active:opacity-[0.92] disabled:cursor-not-allowed disabled:opacity-45 disabled:active:opacity-45'

interface ButtonSharedProps {
  children: ReactNode
  size?: ButtonSize
  className?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  target?: string
  rel?: string
  ariaLabel?: string
}

function joinClasses(...parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

function ButtonRoot({
  children,
  size = 'md',
  className,
  href,
  onClick,
  type = 'button',
  disabled = false,
  target,
  rel,
  ariaLabel,
  variantClassName,
}: ButtonSharedProps & { variantClassName: string }) {
  const classes = joinClasses(BUTTON_BASE, SIZE_CLASSES[size], variantClassName, className)

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        className={classes}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  )
}

export interface ButtonPrincipalProps extends ButtonSharedProps {}

/** Botón primario: azul institucional, hover azul-900. Para la acción principal de una vista. */
export function ButtonPrincipal(props: ButtonPrincipalProps) {
  return (
    <ButtonRoot
      {...props}
      variantClassName="border-transparent bg-azul-800 text-white hover:bg-azul-900"
    />
  )
}

export interface ButtonSecundarioProps extends ButtonSharedProps {}

/** Botón secundario: dorado acento, hover dorado-700. Para CTAs de apoyo ("Acceder al Campus"). */
export function ButtonSecundario(props: ButtonSecundarioProps) {
  return (
    <ButtonRoot
      {...props}
      variantClassName="border-transparent bg-dorado-600 text-gris-950 hover:bg-dorado-700"
    />
  )
}

export interface ButtonTerciarioProps extends ButtonSharedProps {
  /** Variante para fondos oscuros (ej.: sobre azul-900): borde y texto blancos. */
  inverted?: boolean
}

/** Botón terciario: solo borde azul institucional, fondo transparente. */
export function ButtonTerciario({ inverted = false, ...props }: ButtonTerciarioProps) {
  return (
    <ButtonRoot
      {...props}
      variantClassName={
        inverted
          ? 'border-white/70 bg-transparent text-white hover:bg-white/10'
          : 'border-[color:var(--ui-display-ink)] bg-transparent text-[color:var(--ui-display-ink)] hover:bg-[color:var(--ui-bg-muted)]'
      }
    />
  )
}

export interface LinkArrowProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  /** Variante para fondos oscuros: texto/línea en dorado-400 en vez de azul-800. */
  invert?: boolean
}

/** Link discreto con flecha animada — para llamadas tipo "Ver más". */
export function LinkArrow({ children, href, onClick, className, invert = false }: LinkArrowProps) {
  const classes = joinClasses(
    'group inline-flex items-center gap-2.5 border-b border-dorado-600 pb-[3px] text-[11px] font-semibold uppercase tracking-[0.22em] no-underline outline-none transition-colors duration-[var(--motion-base)] hover:border-dorado-700 focus-visible:shadow-[var(--shadow-focus)]',
    invert ? 'text-dorado-400' : 'text-[color:var(--ui-link)]',
    className,
  )

  const arrow = (
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-[var(--motion-base)] ease-[var(--easing-out)] group-hover:translate-x-[3px]"
    >
      →
    </span>
  )

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
        {arrow}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
      {arrow}
    </button>
  )
}
