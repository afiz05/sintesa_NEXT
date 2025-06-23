// This script prevents flash of wrong theme on page load
export function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        // First check for theme in localStorage
        const storedTheme = localStorage.getItem('sintesa-theme');
        
        if (storedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (storedTheme === 'light') {
          document.documentElement.classList.remove('dark');
        } else {
          // If no stored theme, check system preference
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (systemPrefersDark) {
            document.documentElement.classList.add('dark');
          }
        }
      } catch (e) {
        console.error('Failed to initialize theme', e);
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
