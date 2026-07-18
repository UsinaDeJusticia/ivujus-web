// CoursesGrid.jsx — diplomatura + cursos card grid. Theme + i18n aware.

const COURSE_IDS = ['c1', 'c2', 'c3'];

function CourseCard({ id, onOpen }) {
  const { t } = useT();
  const [hover, setHover] = React.useState(false);
  const course = {
    id,
    tag:      t(`${id}.tag`),
    title:    t(`${id}.title`),
    desc:     t(`${id}.desc`),
    duration: t(`${id}.duration`),
    cert:     t(`${id}.cert`),
    level:    t(`${id}.level`),
  };
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--ui-bg-surface)',
        border: '1px solid var(--ui-border)',
        borderRadius: 'var(--radius-md)',
        padding: '28px 28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        boxShadow: hover ? 'var(--ui-shadow-3)' : 'var(--ui-shadow-1)',
        transition: 'box-shadow 200ms var(--easing-standard), transform 200ms var(--easing-standard), background 300ms',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        position: 'relative',
        overflow: 'hidden',
      }}>
      <span style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'var(--color-dorado-acento)',
        transform: hover ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 320ms var(--easing-out)',
      }} />
      <span style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 600, fontSize: '10px', letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--ui-accent-ink)',
      }}>{course.tag}</span>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: '19px',
        lineHeight: 1.25,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--ui-display-ink)',
        margin: 0,
        textWrap: 'balance',
        minHeight: '3em',
      }}>{course.title}</h3>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        lineHeight: 1.6,
        color: 'var(--ui-ink-3)',
        margin: 0,
        flex: 1,
      }}>{course.desc}</p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 8,
        fontSize: '11px',
        color: 'var(--ui-ink-4)',
        letterSpacing: '0.04em',
        paddingTop: 8,
        borderTop: '1px solid var(--ui-border)',
      }}>
        <span>{course.duration}</span>
        <span style={{ textAlign: 'right' }}>{course.level}</span>
        <span style={{ gridColumn: '1 / -1' }}>{course.cert}</span>
      </div>
      <div style={{ marginTop: 4 }}>
        <LinkArrow onClick={(e) => { e.preventDefault(); onOpen(course); }}>
          {t('courses.card.cta')}
        </LinkArrow>
      </div>
    </article>
  );
}

function CoursesGrid({ onOpen }) {
  const { t } = useT();
  return (
    <section id="diplomaturas" style={{ background: 'var(--ui-bg-page)', padding: '112px 0 96px', transition: 'background 300ms' }}>
      <div style={{ maxWidth: 'var(--container-default)', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, marginBottom: 56, flexWrap: 'wrap' }}>
          <SectionHeader
            eyebrow={t('courses.eyebrow')}
            title={t('courses.title')}
            lead={t('courses.lead')}
          />
          <LinkArrow>{t('courses.link')}</LinkArrow>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {COURSE_IDS.map(id => <CourseCard key={id} id={id} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CoursesGrid, CourseCard, COURSE_IDS });
