import React, { PropsWithChildren, useContext } from 'react';
import { useColorScheme } from 'react-native-appearance';
import { ThemeProvider } from 'styled-components/native';

import { isWeb } from '../helpers/utils';
import { darkTheme, lightTheme } from '../themes';
import { useLocalStorage } from './local-storage';

export type ThemeName = 'dark' | 'light';

const ThemeManagerContext = React.createContext<{
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}>({ theme: 'dark', setTheme: () => {} });

export const ThemeManagerProvider = (props: PropsWithChildren<object>) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useLocalStorage<ThemeName>(
    'THEME',
    isWeb ? 'dark' : colorScheme === 'no-preference' ? 'dark' : colorScheme
  );

  return (
    <ThemeManagerContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme} {...props} />
    </ThemeManagerContext.Provider>
  );
};
export const useThemeManager = () => useContext(ThemeManagerContext);
