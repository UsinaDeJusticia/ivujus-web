// AccessibilityBar.jsx — small inline control row.
// Three theme buttons (sun/half/moon) + language picker (ES/EN/FR).
// Designed to live inside the header, before the Campus CTA.
// Quiet and academic — no flashy badges.

function AccessibilityBar({ inverted = false }) {
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useT();
  const [langOpen, setLangOpen] = React.useState(false);
  const langRef = React.useRef(null);

  React.useEffect(() => {
    const onDocClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const fgInk = inverted ? 'rgba(255,255,255,0.78)' : 'var(--ui-ink-3)';
  const fgInkActive = inverted ? '#fff' : 'var(--ui-ink-1)';
  const border = inverted ? 'rgba(255,255,255,0.20)' : 'var(--ui-border)';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {/* Theme segmented control */}
      <div
        role="radiogroup"
        aria-label={t('a11y.theme')}
        style={{
          display: 'flex',
          border: `1px solid ${border}`,
          borderRadius: 999,
          padding: 2,
          gap: 2,
        }}>
        {THEMES.map(opt => {
          const active = theme === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={active}
              title={t(opt.label)}
              onClick={() => setTheme(opt.id)}
              style={{
                width: 26, height: 26, borderRadius: 999,
                border: 'none',
                background: active ? (inverted ? 'rgba(201,164,106,0.20)' : 'var(--azul-100)') : 'transparent',
                color: active ? (inverted ? 'var(--dorado-400)' : 'var(--azul-800)') : fgInk,
                cursor: 'pointer',
                fontSize: 13, lineHeight: 1,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 200ms, color 200ms',
              }}>
              {opt.icon}
            </button>
          );
        })}
      </div>

      {/* Language picker (dropdown to keep header compact) */}
      <div ref={langRef} style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={() => setLangOpen(o => !o)}
          aria-haspopup="listbox"
          aria-expanded={langOpen}
          aria-label={t('a11y.lang')}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 10.5, fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: fgInkActive,
            background: 'transparent',
            border: `1px solid ${border}`,
            borderRadius: 999,
            padding: '6px 12px',
            cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            transition: 'border-color 200ms, color 200ms',
          }}>
          {lang.toUpperCase()}
          <span style={{ fontSize: 8, opacity: 0.6, transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>▾</span>
        </button>
        {langOpen && (
          <ul
            role="listbox"
            style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0,
              background: 'var(--ui-bg-surface)',
              border: '1px solid var(--ui-border)',
              borderRadius: 6,
              boxShadow: 'var(--ui-shadow-2)',
              listStyle: 'none', margin: 0, padding: 4,
              minWidth: 140,
              zIndex: 60,
            }}>
            {[
              { id: 'es', label: 'Español' },
              { id: 'en', label: 'English' },
              { id: 'fr', label: 'Français' },
            ].map(opt => (
              <li key={opt.id} role="option" aria-selected={lang === opt.id}>
                <button
                  type="button"
                  onClick={() => { setLang(opt.id); setLangOpen(false); }}
                  style={{
                    width: '100%', textAlign: 'left',
                    background: lang === opt.id ? 'var(--ui-bg-muted)' : 'transparent',
                    border: 'none', cursor: 'pointer',
                    padding: '9px 12px', borderRadius: 4,
                    fontFamily: 'var(--font-body)',
                    fontSize: 12, fontWeight: lang === opt.id ? 600 : 400,
                    color: 'var(--ui-ink-1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                  <span>{opt.label}</span>
                  <span style={{
                    fontSize: 9, letterSpacing: '0.18em',
                    color: 'var(--ui-ink-4)',
                  }}>{opt.id.toUpperCase()}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { AccessibilityBar });
