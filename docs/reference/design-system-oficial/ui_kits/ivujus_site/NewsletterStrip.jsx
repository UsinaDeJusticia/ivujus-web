// NewsletterStrip.jsx — quiet email-subscribe section. Theme + i18n aware.

function NewsletterStrip({ onSubscribe }) {
  const { t } = useT();
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    onSubscribe && onSubscribe(email);
    setTimeout(() => { setSent(false); setEmail(''); }, 2400);
  };

  return (
    <section id="contacto" style={{ background: 'var(--ui-bg-page)', padding: '96px 0', transition: 'background 300ms' }}>
      <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <Eyebrow>{t('newsletter.eyebrow')}</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(28px, 3.4vw, 38px)',
            lineHeight: 1.15,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'var(--ui-display-ink)',
            margin: 0,
            textWrap: 'balance',
            maxWidth: '20ch',
          }}>
            {t('newsletter.title')}
          </h2>
          <p style={{
            fontSize: '15px', lineHeight: 1.7, color: 'var(--ui-ink-3)',
            margin: 0, maxWidth: '54ch', textWrap: 'pretty',
          }}>
            {t('newsletter.lead')}
          </p>
          <form onSubmit={submit} style={{
            display: 'flex', gap: 8, marginTop: 8, width: '100%', maxWidth: 440,
          }}>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.placeholder')}
              style={{
                flex: 1, padding: '14px 16px',
                fontFamily: 'var(--font-body)', fontSize: '14px',
                border: '1px solid var(--ui-border-strong)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--ui-ink-1)',
                background: 'var(--ui-bg-surface)',
              }} />
            <ButtonPrincipal as="button" size="md">
              {sent ? t('newsletter.cta.done') : t('newsletter.cta')}
            </ButtonPrincipal>
          </form>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { NewsletterStrip });
