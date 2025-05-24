import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Theme, ThemeContextType } from '../types/utilTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getUserTheme from '../services/theme/getUserTheme';
import setUserTheme from '../services/theme/setUserTheme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [username, setUsername] = useState<string>('');


    useEffect(() => {
    const fetchTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem('userInputFields');
        const parsed = stored ? JSON.parse(stored) : null;

        if (parsed?.username) {
          setUsername(parsed.username);
          const storedTheme = await getUserTheme(parsed.username);
          if (storedTheme) {
            setThemeState(storedTheme);
          }
        }
      } catch (err) {
        console.error('Failed to initialize theme from AsyncStorage:', err);
      }
    };

    fetchTheme();
  }, []);

    const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    await setUserTheme(username, newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};