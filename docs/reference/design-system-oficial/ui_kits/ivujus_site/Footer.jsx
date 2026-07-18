// Footer.jsx — institutional footer. Stays brand-blue in ALL themes (identity surface).
// Logo uses the white-mark variant on transparent for clean dark-bg rendering.

function Footer() {
  const { t } = useT();
  return (
    <footer style={{
      background: 'var(--azul-900)',
      color: '#fff',
      paddingTop: 72,
    }}>
      <div style={{
        maxWidth: 'var(--container-default)', margin: '0 auto', padding: '0 32px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
          gap: 48,
          paddingBottom: 56,
          borderBottom: '1px solid rgba(255,255,255,0.10)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <img src="../../assets/logo-ivujus-mark-white.png" alt="IVUJUS"
              style={{ height: 112, width: 'auto', alignSelf: 'flex-start' }} />
            <p style={{
              fontStyle: 'italic',
              fontSize: '13px',
              color: 'var(--dorado-300)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: '30ch',
            }}>
              {t('footer.tagline')}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--azul-200)', lineHeight: 1.6, margin: 0, maxWidth: '34ch' }}>
              {t('footer.about')}
            </p>
          </div>

          {['col1','col2','col3'].map(col => {
            const title = t(`footer.${col}.title`);
            const items = t(`footer.${col}.items`).split('|');
            return (
              <div key={col} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600, fontSize: '12px',
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: 'var(--dorado-400)',
                  margin: 0,
                }}>{title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {items.map(l => (
                    <li key={l}>
                      <a href="#" style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: 'var(--azul-200)',
                        textDecoration: 'none',
                        transition: 'color 120ms',
                      }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--azul-200)'}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div style={{
          padding: '28px 0 36px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 24, flexWrap: 'wrap',
          fontSize: '11px', color: 'var(--azul-300)', letterSpacing: '0.04em',
        }}>
          <div>
            <strong style={{ color: '#fff' }}>www.ivujus.org.ar</strong>
            <span style={{ margin: '0 12px', color: 'rgba(255,255,255,0.20)' }}>·</span>
            <a href="mailto:info@ivujus.org.ar" style={{ color: 'var(--dorado-300)', textDecoration: 'none' }}>info@ivujus.org.ar</a>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['LinkedIn','in'],['Instagram','ig'],['Facebook','fb'],['YouTube','yt']].map(([label, abbr]) => (
              <a key={label} href="#" aria-label={label}
                style={{
                  width: 32, height: 32, borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.20)',
                  color: 'var(--azul-200)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', fontWeight: 600, letterSpacing: '0.04em',
                  textDecoration: 'none', textTransform: 'uppercase',
                  transition: 'border-color 200ms, color 200ms',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--dorado-600)'; e.currentTarget.style.color = 'var(--dorado-400)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)'; e.currentTarget.style.color = 'var(--azul-200)'; }}>
                {abbr}
              </a>
            ))}
          </div>
          <div>{t('footer.copyright')}</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
