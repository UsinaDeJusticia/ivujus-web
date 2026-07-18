// Modals.jsx — CourseModal (course detail) + CampusModal (fake login). Theme + i18n aware.

function Backdrop({ onClose, children }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(13,59,102,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 32,
        animation: 'fadeIn 200ms var(--easing-standard)',
      }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--ui-bg-surface)',
          color: 'var(--ui-ink-2)',
          borderRadius: 'var(--radius-md)',
          maxWidth: 640, width: '100%',
          maxHeight: '90vh', overflow: 'auto',
          boxShadow: '0 24px 64px rgba(13,59,102,0.30)',
          position: 'relative',
          border: '1px solid var(--ui-border)',
        }}>
        <button onClick={onClose} aria-label="Cerrar" style={{
          position: 'absolute', top: 16, right: 16,
          background: 'transparent', border: 'none',
          width: 32, height: 32, borderRadius: 999,
          cursor: 'pointer', fontSize: 18, color: 'var(--ui-ink-3)',
        }}>×</button>
        {children}
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  );
}

function CourseModal({ course, onClose, onInscribir }) {
  const { t } = useT();
  if (!course) return null;
  return (
    <Backdrop onClose={onClose}>
      <div style={{ padding: '40px 44px 36px' }}>
        <Eyebrow>{course.tag} · IVUJUS</Eyebrow>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600, fontSize: '28px',
          letterSpacing: '0.04em', textTransform: 'uppercase',
          color: 'var(--ui-display-ink)', lineHeight: 1.18,
          marginTop: 18, marginBottom: 18, textWrap: 'balance',
        }}>{course.title}</h2>
        <p style={{
          fontSize: '15px', lineHeight: 1.7, color: 'var(--ui-ink-2)',
          margin: '0 0 28px', textWrap: 'pretty',
        }}>{course.desc}</p>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
          padding: '20px 0', borderTop: '1px solid var(--ui-border)',
          borderBottom: '1px solid var(--ui-border)',
          marginBottom: 24,
        }}>
          {[
            [t('modal.course.duracion'), course.duration],
            [t('modal.course.nivel'), course.level],
            [t('modal.course.cert'), course.cert],
            [t('modal.course.modalidad'), t('modal.course.modalidad.val')],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{
                fontWeight: 600, fontSize: '10px', letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'var(--ui-accent-ink)',
              }}>{k}</span>
              <span style={{ fontSize: '13px', color: 'var(--ui-ink-1)' }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <ButtonPrincipal onClick={onInscribir}>{t('modal.course.cta.inscribir')}</ButtonPrincipal>
          <ButtonTerciario onClick={onClose}>{t('modal.course.cta.volver')}</ButtonTerciario>
        </div>
      </div>
    </Backdrop>
  );
}

function CampusModal({ open, onClose }) {
  const { t } = useT();
  const [user, setUser] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  if (!open) return null;
  return (
    <Backdrop onClose={onClose}>
      <div style={{ padding: '36px 40px 32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <img src="../../assets/logo-ivujus-mark.png" alt="" style={{ height: 64, mixBlendMode: 'multiply' }} />
          <Eyebrow>{t('modal.campus.eyebrow')}</Eyebrow>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 600,
            fontSize: '20px', letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--ui-display-ink)', margin: 0,
          }}>{t('modal.campus.title')}</h3>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 600,
              fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--ui-ink-3)',
            }}>{t('modal.campus.email')}</span>
            <input type="email" value={user} onChange={(e) => setUser(e.target.value)} required
              placeholder={t('newsletter.placeholder')}
              style={{
                padding: '12px 14px', fontSize: '14px',
                fontFamily: 'var(--font-body)',
                border: '1px solid var(--ui-border-strong)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--ui-ink-1)',
                background: 'var(--ui-bg-surface)',
              }} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 600,
              fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--ui-ink-3)',
            }}>{t('modal.campus.password')}</span>
            <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} required
              style={{
                padding: '12px 14px', fontSize: '14px',
                fontFamily: 'var(--font-body)',
                border: '1px solid var(--ui-border-strong)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--ui-ink-1)',
                background: 'var(--ui-bg-surface)',
              }} />
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <a href="#" style={{ fontSize: '12px', color: 'var(--ui-link)', textDecorationColor: 'var(--dorado-600)' }}>
              {t('modal.campus.forgot')}
            </a>
            <span style={{ fontSize: '11px', color: 'var(--ui-ink-4)' }}>usinadejusticiacampus.org.ar</span>
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
            <ButtonPrincipal as="button" size="md">{t('modal.campus.cta.enter')}</ButtonPrincipal>
            <ButtonTerciario onClick={onClose}>{t('modal.campus.cta.cancel')}</ButtonTerciario>
          </div>
        </form>
      </div>
    </Backdrop>
  );
}

Object.assign(window, { CourseModal, CampusModal });
