// ThemeSwitcher.tsx — selector de tema de lectura (claro/sepia/oscuro).
//
// Los tres temas se definen como tokens `--ui-*` en globals.css bajo
// `:root` (claro) y `[data-theme="sepia"|"dark"]`. Este control setea
// `data-theme` en <html> y lo persiste en localStorage. El script inline
// del layout aplica el valor guardado antes del primer paint (anti-flash);
// acá solo sincronizamos el estado de React con lo que ya haya en el DOM.
'use client'

import { useEffect, useState } from 'react'

export type ThemeName = 'light' | 'sepia' | 'dark'

const STORAGE_KEY = 'ivujus-theme'

interface ThemeOption {
  value: ThemeName
  label: Record<string, string>
  icon: React.ReactNode
}

const SUN = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

const BOOK = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 6.5C10.5 5 8 4.5 4 4.5v14c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-14c-4 0-6.5.5-8 2Z" />
    <path d="M12 6.5v13" />
  </svg>
)

const MOON = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 14.5A8 8 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5Z" />
  </svg>
)

const OPTIONS: ThemeOption[] = [
  { value: 'light', label: { es: 'Claro', en: 'Light', fr: 'Clair' }, icon: SUN },
  { value: 'sepia', label: { es: 'Sepia', en: 'Sepia', fr: 'Sépia' }, icon: BOOK },
  { value: 'dark', label: { es: 'Oscuro', en: 'Dark', fr: 'Sombre' }, icon: MOON },
]

const GROUP_LABEL: Record<string, string> = {
  es: 'Tema de lectura',
  en: 'Reading theme',
  fr: 'Thème de lecture',
}

function isTheme(value: string | undefined): value is ThemeName {
  return value === 'light' || value === 'sepia' || value === 'dark'
}

export interface ThemeSwitcherProps {
  locale: string
}

export function ThemeSwitcher({ locale }: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<ThemeName>('light')

  useEffect(() => {
    const current = document.documentElement.dataset.theme
    setTheme(isTheme(current) ? current : 'light')
  }, [])

  const apply = (next: ThemeName) => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // localStorage puede fallar (modo privado, cookies bloqueadas): el
      // cambio de tema en la sesión actual igual funciona.
    }
    setTheme(next)
  }

  const lang = GROUP_LABEL[locale] ? locale : 'es'

  return (
    <div
      role="group"
      aria-label={GROUP_LABEL[lang]}
      className="flex items-center gap-0.5 rounded-[var(--radius-pill)] border border-[color:var(--ui-border)] p-0.5"
    >
      {OPTIONS.map((option) => {
        const active = theme === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => apply(option.value)}
            aria-pressed={active}
            aria-label={option.label[lang]}
            title={option.label[lang]}
            className={[
              'flex h-7 w-7 items-center justify-center rounded-[var(--radius-pill)]',
              'transition-colors duration-[var(--motion-fast)] ease-[var(--easing-standard)]',
              'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]',
              active
                ? 'bg-[color:var(--color-azul-800)] text-white'
                : 'text-[color:var(--ui-ink-3)] hover:text-[color:var(--ui-ink-1)]',
            ].join(' ')}
          >
            {option.icon}
          </button>
        )
      })}
    </div>
  )
}
