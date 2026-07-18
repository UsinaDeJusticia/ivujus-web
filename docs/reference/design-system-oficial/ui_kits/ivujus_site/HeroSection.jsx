// HeroSection.jsx — institutional landing hero.
// Theme-aware bg gradient + display ink. The mark (book + rays + IVU|JUS)
// switches to the white variant in dark mode for legibility.

function HeroSection({ onCursos, onSimposio }) {
  const { theme } = useTheme();
  const { t } = useT();
  const isDark = theme === 'dark';

  return (
    <section style={{
      background: 'var(--ui-hero-gradient)',
      borderBottom: '1px solid var(--ui-border)',
      transition: 'background 300ms var(--easing-standard)',
    }}>
      <div style={{
        maxWidth: 'var(--container-default)',
        margin: '0 auto',
        padding: '96px 32px 112px',
        display: 'grid',
        gridTemplateColumns: '1.35fr 1fr',
        gap: 64,
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(40px, 5.2vw, 64px)',
            lineHeight: 1.08,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--ui-display-ink)',
            margin: 0,
            textWrap: 'balance',
          }}>
            {t('hero.title.1')}<br/>{t('hero.title.2')}<br/>{t('hero.title.3')}
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            lineHeight: 1.7,
            color: 'var(--ui-ink-3)',
            margin: 0,
            maxWidth: '52ch',
            textWrap: 'pretty',
          }}>
            {t('hero.lead')}
          </p>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: '14px',
            color: 'var(--ui-accent-ink)',
            paddingLeft: 16,
            borderLeft: '2px solid var(--color-dorado-acento)',
            maxWidth: '40ch',
          }}>
            {t('hero.tagline')}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 8, flexWrap: 'wrap' }}>
            <ButtonPrincipal onClick={onCursos}>{t('hero.cta.cursos')}</ButtonPrincipal>
            <ButtonTerciario inverted={isDark} onClick={onSimposio}>{t('hero.cta.simposio')}</ButtonTerciario>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={isDark ? '../../assets/logo-ivujus-mark-white.png' : '../../assets/logo-ivujus-mark.png'}
            alt=""
            style={{
              maxWidth: '100%',
              width: 360,
              height: 'auto',
              mixBlendMode: isDark ? 'normal' : 'multiply',
            }} />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HeroSection });
