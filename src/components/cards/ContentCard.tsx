// ContentCard.tsx — card genérica del estilo del kit (CourseCard/BlogPostCard
// comparten esta estructura: eyebrow opcional, título Cinzel, descripción,
// meta opcional, borde inferior dorado animado al hover).
// Puerto tipado de docs/reference/design-system-oficial/ui_kits/ivujus_site/
// CoursesGrid.jsx y BlogList.jsx, generalizado a props de contenido neutro.
//
// El <h3> no repite font-family/uppercase/tracking: ya los define la regla
// global `h1, h2, h3` en globals.css (Fase 1 · Ola 1).

import Link from 'next/link'
import type { ReactNode } from 'react'

export interface ContentCardProps {
  title: string
  description?: string
  href: string
  /** Fila de metadatos libre (fecha, duración, categoría...). */
  meta?: ReactNode
  eyebrow?: string
  className?: string
}

export function ContentCard({ title, description, href, meta, eyebrow, className }: ContentCardProps) {
  return (
    <Link
      href={href}
      className={[
        'group relative flex flex-col gap-3.5 overflow-hidden rounded-md border border-gris-200 bg-white p-7 no-underline',
        'shadow-[var(--shadow-1)] transition-shadow duration-[var(--motion-base)] ease-[var(--easing-standard)] hover:shadow-[var(--shadow-3)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Borde inferior dorado, animado 200ms — variante mínima de hover del manual. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-dorado-600 transition-transform duration-200 ease-[var(--easing-out)] group-hover:scale-x-100"
      />

      {eyebrow ? (
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-dorado-700">{eyebrow}</span>
      ) : null}

      <h3 className="m-0 text-[19px] leading-[1.25] tracking-[0.04em] transition-colors duration-[var(--motion-fast)] group-hover:text-azul-700">
        {title}
      </h3>

      {description ? (
        <p className="m-0 flex-1 text-sm leading-[1.6] text-gris-700">{description}</p>
      ) : null}

      {meta ? (
        <div className="flex items-center gap-2 border-t border-gris-200 pt-2 text-[11px] text-gris-600">
          {meta}
        </div>
      ) : null}
    </Link>
  )
}
