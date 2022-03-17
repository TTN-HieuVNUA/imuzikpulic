import { ThemeProvider } from 'emotion-theming';
import React, { PropsWithChildren, useContext } from 'react';

import { darkTheme, lightTheme } from '../themes';
import { useLocalStorage } from './local-storage';

export type ThemeName = 'dark' | 'light';

const ThemeManagerContext = React.createContext<{
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
} | null>(null);

export const ThemeManagerProvider = (props: PropsWithChildren<object>) => {
  const [theme, setTheme] = useLocalStorage<ThemeName>('THEME', 'dark');
  return (
    <ThemeManagerContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme} {...props} />
    </ThemeManagerContext.Provider>
  );
};

export const useThemeManager = () => useContext(ThemeManagerContext);
