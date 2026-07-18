// BlogList.jsx — recent posts as editorial-style cards. Theme + i18n aware.

const POST_IDS = ['p1', 'p2', 'p3'];

function BlogPostCard({ id, featured = false, onOpen }) {
  const { t } = useT();
  const [hover, setHover] = React.useState(false);
  const post = {
    cat: t(`${id}.cat`),
    date: t(`${id}.date`),
    title: t(`${id}.title`),
    summary: t(`${id}.summary`),
    readingTime: t(`${id}.reading`),
  };
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen && onOpen(post)}
      style={{
        background: 'var(--ui-bg-surface)',
        border: '1px solid var(--ui-border)',
        borderRadius: 'var(--radius-md)',
        padding: featured ? '36px 36px 32px' : '26px 28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        cursor: 'pointer',
        boxShadow: hover ? 'var(--ui-shadow-3)' : 'var(--ui-shadow-1)',
        transition: 'box-shadow 200ms var(--easing-standard), background 300ms',
        gridColumn: featured ? 'span 2' : 'auto',
      }}>
      <div style={{
        display: 'flex', gap: 14, alignItems: 'center',
        fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase',
      }}>
        <span style={{ color: 'var(--ui-accent-ink)', fontWeight: 600 }}>{post.cat}</span>
        <span style={{ width: 4, height: 4, borderRadius: 999, background: 'var(--ui-ink-4)', opacity: 0.5 }} />
        <span style={{ color: 'var(--ui-ink-4)' }}>{post.date}</span>
      </div>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: featured ? '26px' : '19px',
        lineHeight: 1.2,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: hover ? 'var(--ui-link)' : 'var(--ui-display-ink)',
        margin: 0,
        textWrap: 'balance',
        transition: 'color 120ms',
      }}>{post.title}</h3>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: featured ? '16px' : '14px',
        lineHeight: 1.65,
        color: 'var(--ui-ink-3)',
        margin: 0,
        flex: 1,
        textWrap: 'pretty',
      }}>{post.summary}</p>
      <div style={{
        marginTop: 4,
        fontSize: '11px',
        color: 'var(--ui-ink-4)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span>{post.readingTime}</span>
        <span style={{
          fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'var(--ui-link)',
        }}>{t('blog.read')} →</span>
      </div>
    </article>
  );
}

function BlogList({ onOpen }) {
  const { t } = useT();
  return (
    <section id="blog" style={{ background: 'var(--ui-blog-bg)', padding: '112px 0 112px', transition: 'background 300ms' }}>
      <div style={{ maxWidth: 'var(--container-default)', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, gap: 32, flexWrap: 'wrap' }}>
          <SectionHeader
            eyebrow={t('blog.eyebrow')}
            title={t('blog.title')}
            lead={t('blog.lead')}
          />
          <LinkArrow>{t('blog.link')}</LinkArrow>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 24,
        }}>
          <BlogPostCard id="p3" featured onOpen={onOpen} />
          <BlogPostCard id="p1" onOpen={onOpen} />
          <BlogPostCard id="p2" onOpen={onOpen} />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { BlogList, BlogPostCard, POST_IDS });
