// LanguageSwitcher.tsx — cambio de idioma ES/EN/FR.
//
// Los locales viven en el primer segmento de la ruta (/es/..., /en/...).
// El switcher lleva a la MISMA página en el otro idioma reemplazando ese
// primer segmento del pathname actual. Cada opción emite un <Link> con
// hreflang y aria-current en el idioma activo.
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LOCALES = ['es', 'en', 'fr'] as const
type Locale = (typeof LOCALES)[number]

const LABEL: Record<Locale, string> = { es: 'ES', en: 'EN', fr: 'FR' }

const GROUP_LABEL: Record<string, string> = {
  es: 'Cambiar idioma',
  en: 'Change language',
  fr: 'Changer de langue',
}

function pathForLocale(pathname: string, target: Locale): string {
  const segments = pathname.split('/')
  // segments[0] es '' (pathname arranca con '/'); segments[1] es el locale.
  if (LOCALES.includes(segments[1] as Locale)) {
    segments[1] = target
  } else {
    return `/${target}`
  }
  return segments.join('/') || `/${target}`
}

export interface LanguageSwitcherProps {
  locale: string
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? `/${locale}`
  const lang = GROUP_LABEL[locale] ? locale : 'es'

  return (
    <div
      role="group"
      aria-label={GROUP_LABEL[lang]}
      className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
    >
      {LOCALES.map((target, index) => {
        const active = target === locale
        return (
          <span key={target} className="flex items-center gap-1">
            {index > 0 ? <span aria-hidden="true" className="text-[color:var(--ui-ink-4)]">·</span> : null}
            <Link
              href={pathForLocale(pathname, target)}
              hrefLang={target}
              aria-current={active ? 'true' : undefined}
              className={[
                'no-underline transition-colors duration-[var(--motion-fast)] ease-[var(--easing-standard)]',
                'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] rounded-[var(--radius-xs)]',
                active
                  ? 'text-[color:var(--ui-display-ink)]'
                  : 'text-[color:var(--ui-ink-4)] hover:text-[color:var(--ui-ink-2)]',
              ].join(' ')}
            >
              {LABEL[target]}
            </Link>
          </span>
        )
      })}
    </div>
  )
}
