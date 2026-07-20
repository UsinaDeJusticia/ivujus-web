// SectionHeader.tsx — Eyebrow (regla dorada + micro caps) y SectionHeader
// (eyebrow + h2 Cinzel + lead opcional).
// Puerto tipado de docs/reference/design-system-oficial/ui_kits/ivujus_site/SectionHeader.jsx.
//
// El <h2> no repite font-family/uppercase/tracking/line-height: esas
// propiedades ya las define la regla global `h1, h2, h3` en globals.css
// (Fase 1 · Ola 1), así que este componente solo agrega lo específico
// (tamaño clamp, max-width, color invertido).

import type { ReactNode } from 'react'

export interface EyebrowProps {
  children: ReactNode
  className?: string
  /** Variante para fondos oscuros: dorado-400 en vez de dorado-700. */
  invert?: boolean
}

export function Eyebrow({ children, className, invert = false }: EyebrowProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em]',
        invert ? 'text-dorado-400' : 'text-dorado-700',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span aria-hidden="true" className="inline-block h-px w-8 bg-dorado-600" />
      {children}
    </span>
  )
}

export interface SectionHeaderProps {
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  /** Variante para fondos oscuros (ej.: EventBanner sobre azul-900). */
  invert?: boolean
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'left',
  invert = false,
  className,
}: SectionHeaderProps) {
  const alignClasses = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={['flex flex-col gap-[18px]', alignClasses, className].filter(Boolean).join(' ')}>
      {eyebrow ? <Eyebrow invert={invert}>{eyebrow}</Eyebrow> : null}
      <h2
        className={[
          'm-0 max-w-[22ch] text-balance text-[length:clamp(28px,3.6vw,40px)]',
          invert ? 'text-white' : 'text-[color:var(--ui-display-ink)]',
        ].join(' ')}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={[
            'm-0 max-w-[60ch] text-pretty text-[17px] leading-[1.7]',
            invert ? 'text-azul-200' : 'text-[color:var(--ui-ink-3)]',
          ].join(' ')}
        >
          {lead}
        </p>
      ) : null}
    </div>
  )
}
