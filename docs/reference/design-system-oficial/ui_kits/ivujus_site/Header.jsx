// Header.jsx — sticky institutional header.
// Logo on the left, primary nav centered, AccessibilityBar (theme + language)
// and "Acceder al Campus" CTA on the right.
// Theme-aware: bg adapts; in dark mode the wordmark uses the white-mark variant.

function Header({ active = 'instituto', onNavigate, onCampus }) {
  const [scrolled, setScrolled] = React.useState(false);
  const { theme } = useTheme();
  const { t } = useT();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { id: 'instituto',    key: 'nav.instituto' },
    { id: 'diplomaturas', key: 'nav.diplomaturas' },
    { id: 'simposio',     key: 'nav.simposio' },
    { id: 'blog',         key: 'nav.blog' },
    { id: 'contacto',     key: 'nav.contacto' },
  ];

  const isDark = theme === 'dark';
  const headerBg = isDark
    ? 'rgba(10,46,80,0.85)'
    : theme === 'sepia'
      ? 'rgba(244,236,216,0.92)'
      : 'rgba(255,255,255,0.92)';

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: headerBg,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--ui-border)',
      transition: 'background 300ms var(--easing-standard), border-color 300ms',
    }}>
      <div style={{
        maxWidth: 'var(--container-default)',
        margin: '0 auto',
        padding: scrolled ? '12px 32px' : '20px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: 28,
        transition: 'padding 200ms var(--easing-standard)',
      }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('instituto'); }}
          style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
          <img
            src={isDark ? '../../assets/logo-ivujus-mark-white.png' : '../../assets/logo-ivujus-primary.jpeg'}
            alt="IVUJUS"
            style={{
              height: scrolled ? 36 : 44,
              transition: 'height 200ms var(--easing-standard)',
              mixBlendMode: isDark ? 'normal' : 'multiply',
            }} />
          <div style={{ display: scrolled ? 'none' : 'flex', flexDirection: 'column', gap: 2, lineHeight: 1.1 }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.16em',
              color: 'var(--ui-display-ink)',
            }}>IVUJUS</span>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '9.5px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ui-ink-3)',
            }}>{t('header.subtitle')}</span>
          </div>
        </a>

        <nav style={{ display: 'flex', gap: 26, marginLeft: 'auto' }}>
          {items.map(it => (
            <a key={it.id} href="#"
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(it.id); }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: active === it.id ? 'var(--ui-ink-1)' : 'var(--ui-ink-3)',
                borderBottom: `2px solid ${active === it.id ? 'var(--dorado-600)' : 'transparent'}`,
                paddingBottom: 4,
                transition: 'color 120ms, border-color 200ms',
              }}>
              {t(it.key)}
            </a>
          ))}
        </nav>

        <AccessibilityBar inverted={isDark} />
        <ButtonSecundario size="sm" onClick={onCampus}>{t('nav.campus')}</ButtonSecundario>
      </div>
    </header>
  );
}

Object.assign(window, { Header });
