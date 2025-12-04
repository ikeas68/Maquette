import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';
import { themes, ThemeName } from './presets';

interface ThemeContextValue {
  themeName: ThemeName;
  theme: Theme;
  setThemeName: (name: ThemeName) => void;
}

export const ThemeSwitcherContext = createContext<ThemeContextValue>({
  themeName: 'modernDark',
  theme: themes.modernDark,
  setThemeName: () => undefined
});

const STORAGE_KEY = 'maquette-theme';

export const ThemeSwitcherProvider = ({ children }: { children: ReactNode }) => {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    return stored || (prefersDark ? 'modernDark' : 'lightCorporate');
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, themeName);
  }, [themeName]);

  const theme = useMemo(() => themes[themeName], [themeName]);

  return (
    <ThemeSwitcherContext.Provider value={{ themeName, theme, setThemeName }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
};
