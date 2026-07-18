// Buttons.jsx — primary, secondary, tertiary, link
// All buttons share base typography and transitions per the IVUJUS brand:
// uppercase Montserrat 600, letter-spacing wider, 4px radius, no shadows.

const buttonBase = {
  fontFamily: 'var(--font-body)',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  borderRadius: 'var(--radius-sm)',
  cursor: 'pointer',
  transition: 'background 200ms var(--easing-standard), color 200ms var(--easing-standard), border-color 200ms var(--easing-standard), opacity 120ms',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  border: '1px solid transparent',
  lineHeight: 1,
};

const sizes = {
  sm: { fontSize: '10.5px', padding: '9px 16px' },
  md: { fontSize: '12px',   padding: '14px 24px' },
  lg: { fontSize: '13px',   padding: '17px 30px' },
};

function ButtonPrincipal({ children, size='md', as='button', href, onClick, disabled=false, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const style = {
    ...buttonBase, ...sizes[size],
    background: hover && !disabled ? 'var(--azul-900)' : 'var(--azul-800)',
    color: '#fff',
    opacity: disabled ? 0.45 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };
  const Tag = as === 'a' ? 'a' : 'button';
  return (
    <Tag style={style} href={href} onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      disabled={disabled} {...rest}>
      {children}
    </Tag>
  );
}

function ButtonSecundario({ children, size='md', as='button', href, onClick, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const style = {
    ...buttonBase, ...sizes[size],
    background: hover ? 'var(--dorado-700)' : 'var(--dorado-600)',
    color: 'var(--gris-950)',
  };
  const Tag = as === 'a' ? 'a' : 'button';
  return (
    <Tag style={style} href={href} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      {...rest}>
      {children}
    </Tag>
  );
}

function ButtonTerciario({ children, size='md', as='button', href, onClick, inverted=false, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const baseColor = inverted ? '#fff' : 'var(--azul-800)';
  const baseBorder = inverted ? 'rgba(255,255,255,0.7)' : 'var(--azul-800)';
  const style = {
    ...buttonBase, ...sizes[size],
    background: hover ? (inverted ? 'rgba(255,255,255,0.08)' : 'var(--azul-50)') : 'transparent',
    color: baseColor,
    borderColor: baseBorder,
  };
  const Tag = as === 'a' ? 'a' : 'button';
  return (
    <Tag style={style} href={href} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      {...rest}>
      {children}
    </Tag>
  );
}

// Quiet inline-link style with arrow — used for "Ver más" type calls.
function LinkArrow({ children, onClick, href, color }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={href || '#'} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: '11px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: color || 'var(--azul-800)',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        borderBottom: `1px solid ${hover ? 'var(--dorado-700)' : 'var(--dorado-600)'}`,
        paddingBottom: '3px',
        transition: 'border-color 200ms',
      }}>
      {children}
      <span style={{
        display: 'inline-block',
        transition: 'transform 200ms var(--easing-out)',
        transform: hover ? 'translateX(3px)' : 'translateX(0)',
      }}>→</span>
    </a>
  );
}

Object.assign(window, { ButtonPrincipal, ButtonSecundario, ButtonTerciario, LinkArrow });
