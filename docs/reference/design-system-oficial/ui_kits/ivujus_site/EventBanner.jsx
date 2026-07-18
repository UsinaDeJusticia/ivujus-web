// EventBanner.jsx — full-width institutional banner promoting the Simposio.
// ALWAYS brand-blue regardless of theme (it's an identity surface, not chrome).

function EventBanner({ onInscribir }) {
  const { t } = useT();
  return (
    <section id="simposio" style={{
      background: 'var(--azul-900)',
      color: '#fff',
      borderTop: '1px solid var(--azul-800)',
      borderBottom: '1px solid var(--azul-800)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: 'var(--container-default)', margin: '0 auto',
        padding: '88px 32px 96px',
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: 64,
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Eyebrow color="var(--dorado-400)">{t('event.eyebrow')}</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(32px, 4vw, 48px)',
            lineHeight: 1.12,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#fff',
            margin: 0,
            textWrap: 'balance',
          }}>
            {t('event.title.1')}<br/>{t('event.title.2')}<br/>{t('event.title.3')}
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            lineHeight: 1.7,
            color: 'var(--azul-200)',
            margin: 0,
            maxWidth: '54ch',
          }}>
            {t('event.lead')}
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            <ButtonSecundario onClick={onInscribir}>{t('event.cta.inscribir')}</ButtonSecundario>
            <ButtonTerciario inverted onClick={onInscribir}>{t('event.cta.programa')}</ButtonTerciario>
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(201,164,106,0.30)',
          padding: '32px 28px',
          borderRadius: 6,
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}>
          {['fechas','horario','sede','modalidad','organizan'].map(k => (
            <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{
                fontFamily: 'var(--font-body)', fontWeight: 600,
                fontSize: '10px', letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'var(--dorado-400)',
              }}>{t(`event.info.${k}.k`)}</span>
              <span style={{ fontSize: '14px', lineHeight: 1.5, color: '#fff' }}>{t(`event.info.${k}.v`)}</span>
            </div>
          ))}
        </div>
      </div>
      <span style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 96, height: 2, background: 'var(--color-dorado-acento)',
      }} />
    </section>
  );
}

Object.assign(window, { EventBanner });
