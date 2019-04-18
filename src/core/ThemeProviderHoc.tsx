import AsyncStorage from '@react-native-community/async-storage';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { STORAGE_KEY, Theme, ThemeContext } from './themeProvider';
import THEMES from './themes';

interface Props {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: Props) {
  const [themeID, setThemeID] = useState();

  useEffect(() => {
    (async () => {
      const storedThemeID = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedThemeID) {
        setThemeID(storedThemeID);
      } else {
        setThemeID(THEMES[0].key);
      }
    })();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeID, setThemeID }}>
      {!!themeID ? children : null}
    </ThemeContext.Provider>
  );
}

export interface ThemeProps {
  theme: Theme;
  themes: Theme[];
  setTheme: (key: string) => void;
}

export function withTheme<T>(Component: React.FC<T>) {
  return (props: any) => {
    const { themeID, setThemeID } = useContext(ThemeContext);

    const getTheme = (id: string) => THEMES.find((t: Theme) => t.key === id);

    const setTheme = (id: string) => {
      AsyncStorage.setItem(STORAGE_KEY, id);
      setThemeID(id);
    };

    return (
      <Component
        {...props}
        themes={THEMES}
        theme={getTheme(themeID)}
        setTheme={setTheme}
      />
    );
  };
}
