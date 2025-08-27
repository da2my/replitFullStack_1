import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, lightTheme, darkTheme } from './theme';

// Platform detection
const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: 'light' | 'dark' | 'system';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = 'system',
}) => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setThemeState] = useState<Theme>(lightTheme);

  // Detect system theme
  const getSystemTheme = () => {
    if (isReactNative) {
      // For React Native, we'd need to use Appearance API
      // This is a simplified version
      return false; // Default to light
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // Initialize theme
  useEffect(() => {
    let shouldUseDark = false;

    switch (initialTheme) {
      case 'dark':
        shouldUseDark = true;
        break;
      case 'light':
        shouldUseDark = false;
        break;
      case 'system':
        shouldUseDark = getSystemTheme();
        break;
    }

    setIsDark(shouldUseDark);
    setThemeState(shouldUseDark ? darkTheme : lightTheme);

    // Apply theme to body for web
    if (!isReactNative) {
      document.body.setAttribute('data-theme', shouldUseDark ? 'dark' : 'light');
      document.body.style.backgroundColor = shouldUseDark ? darkTheme.colors.background : lightTheme.colors.background;
      document.body.style.color = shouldUseDark ? darkTheme.colors.text : lightTheme.colors.text;
    }
  }, [initialTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (!isReactNative && initialTheme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent) => {
        const shouldUseDark = e.matches;
        setIsDark(shouldUseDark);
        setThemeState(shouldUseDark ? darkTheme : lightTheme);
        document.body.setAttribute('data-theme', shouldUseDark ? 'dark' : 'light');
        document.body.style.backgroundColor = shouldUseDark ? darkTheme.colors.background : lightTheme.colors.background;
        document.body.style.color = shouldUseDark ? darkTheme.colors.text : lightTheme.colors.text;
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [initialTheme]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    setThemeState(newIsDark ? darkTheme : lightTheme);

    if (!isReactNative) {
      document.body.setAttribute('data-theme', newIsDark ? 'dark' : 'light');
      document.body.style.backgroundColor = newIsDark ? darkTheme.colors.background : lightTheme.colors.background;
      document.body.style.color = newIsDark ? darkTheme.colors.text : lightTheme.colors.text;
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const contextValue: ThemeContextType = {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };

  return React.createElement(
    ThemeContext.Provider,
    { value: contextValue },
    children
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;