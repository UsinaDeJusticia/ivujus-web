// App.jsx — composes the IVUJUS institutional landing prototype.
// Wraps the tree in <ThemeProvider> + <LanguageProvider> so any component
// can call useTheme()/useT().

function AppShell() {
  const [activeNav, setActiveNav] = React.useState('instituto');
  const [campusOpen, setCampusOpen] = React.useState(false);
  const [courseOpen, setCourseOpen] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const { t } = useT();

  const navigate = (id) => {
    setActiveNav(id);
    const map = {
      diplomaturas: '#diplomaturas',
      simposio: '#simposio',
      blog: '#blog',
      contacto: '#contacto',
    };
    if (id === 'instituto') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(map[id]);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const flash = (msg) => {
    setToast(msg);
    clearTimeout(window.__ivujusToast);
    window.__ivujusToast = setTimeout(() => setToast(null), 2800);
  };

  return (
    <>
      <Header active={activeNav} onNavigate={navigate} onCampus={() => setCampusOpen(true)} />
      <main>
        <HeroSection
          onCursos={() => navigate('diplomaturas')}
          onSimposio={() => navigate('simposio')}
        />
        <CoursesGrid onOpen={(c) => setCourseOpen(c)} />
        <EventBanner onInscribir={() => flash(t('toast.event.ok'))} />
        <BlogList onOpen={(p) => flash(t('toast.blog.opening', { title: p.title }))} />
        <NewsletterStrip onSubscribe={(email) => flash(t('toast.newsletter.ok', { email }))} />
      </main>
      <Footer />

      <CourseModal
        course={courseOpen}
        onClose={() => setCourseOpen(null)}
        onInscribir={() => { setCourseOpen(null); flash(t('toast.course.ok')); }}
      />
      <CampusModal
        open={campusOpen}
        onClose={() => setCampusOpen(false)}
      />

      {toast && (
        <div style={{
          position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--azul-900)', color: '#fff',
          padding: '14px 22px', borderRadius: 'var(--radius-md)',
          boxShadow: '0 8px 24px rgba(13,59,102,0.30)',
          fontSize: '13px', fontFamily: 'var(--font-body)',
          maxWidth: 'min(90vw, 480px)', textAlign: 'center', lineHeight: 1.5,
          borderLeft: '2px solid var(--dorado-600)',
          zIndex: 200,
          animation: 'slideUp 220ms var(--easing-out)',
        }}>
          {toast}
          <style>{`@keyframes slideUp { from { opacity: 0; transform: translate(-50%, 12px); } to { opacity: 1; transform: translate(-50%, 0); } }`}</style>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppShell />
      </LanguageProvider>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
