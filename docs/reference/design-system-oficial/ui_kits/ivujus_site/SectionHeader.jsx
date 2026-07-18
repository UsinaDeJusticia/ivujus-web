// SectionHeader.jsx — eyebrow + heading + optional lead
// Theme-aware: display ink and lead color use --ui-display-ink / --ui-ink-3.

function Eyebrow({ children, color }) {
  return (
    <span style={{
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: '11px',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: color || 'var(--ui-accent-ink)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      <span style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--color-dorado-acento)' }} />
      {children}
    </span>
  );
}

function SectionHeader({ eyebrow, title, lead, align='left', invert=false, maxWidth = '60ch' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '18px',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align === 'center' ? 'center' : 'left',
    }}>
      {eyebrow && <Eyebrow color={invert ? 'var(--dorado-400)' : undefined}>{eyebrow}</Eyebrow>}
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: invert ? '#fff' : 'var(--ui-display-ink)',
        fontSize: 'clamp(28px, 3.6vw, 40px)',
        lineHeight: 1.15,
        margin: 0,
        textWrap: 'balance',
        maxWidth: '22ch',
      }}>
        {title}
      </h2>
      {lead && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '17px',
          lineHeight: 1.7,
          color: invert ? 'var(--azul-200)' : 'var(--ui-ink-3)',
          margin: 0,
          maxWidth,
          textWrap: 'pretty',
        }}>
          {lead}
        </p>
      )}
    </div>
  );
}

Object.assign(window, { Eyebrow, SectionHeader });
