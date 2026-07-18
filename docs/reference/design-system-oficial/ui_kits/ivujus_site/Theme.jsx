// Theme.jsx — three-mode color theme provider for IVUJUS.
// 'light' (default) · 'sepia' (reading / cream) · 'dark'
// Theme is held on document.documentElement[data-theme] and in localStorage.

const ThemeContext = React.createContext(null);

const THEMES = [
  { id: 'light', icon: '☀', label: 'a11y.theme.light' },
  { id: 'sepia', icon: '◐', label: 'a11y.theme.sepia' },
  { id: 'dark',  icon: '☾', label: 'a11y.theme.dark'  },
];

function ThemeProvider({ children }) {
  const [theme, setThemeState] = React.useState(() => {
    const saved = localStorage.getItem('ivujus-theme');
    if (saved && ['light','sepia','dark'].includes(saved)) return saved;
    return 'light';
  });

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ivujus-theme', theme);
  }, [theme]);

  const setTheme = (t) => { if (['light','sepia','dark'].includes(t)) setThemeState(t); };
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

Object.assign(window, { THEMES, ThemeProvider, useTheme, ThemeContext });
