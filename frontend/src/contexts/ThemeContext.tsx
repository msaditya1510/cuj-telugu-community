import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('cuj-telugu-theme');
    return (saved as Theme) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('cuj-telugu-theme', theme);
    const duration = 500; // Match --theme-transition (0.5s)
    document.documentElement.style.transition = `background-color ${duration}ms ease-in-out, color ${duration}ms ease-in-out`;
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    const timer = setTimeout(() => {
      document.documentElement.style.transition = '';
    }, duration);
    return () => clearTimeout(timer);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
