import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Theme, ThemeContextType } from '../types/utilTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getUserTheme from '../services/theme/getUserTheme';
import setUserTheme from '../services/theme/setUserTheme';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MD3LightTheme } from 'react-native-paper';
import { Themes } from '../../assets/styles/Themes';


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);

  const useUserThemeQuery = (username: string | null) => {
    return useQuery<'light' | 'dark'>({
      queryKey: ['userTheme', username],
      queryFn: () => getUserTheme(username!),
      enabled: !!username,
      staleTime: Infinity,
    });
  };

  const setThemeMutation = useMutation({
    mutationFn: ({ username, theme }: { username: string; theme: Theme }) =>
      setUserTheme(username, theme),

    onSuccess: (_, { username, theme }) => {
      queryClient.setQueryData(['userTheme', username], theme);
    },
  });

  useEffect(() => {
    const loadUsername = async () => {
      const stored = await AsyncStorage.getItem('userInputFields');
      const parsed = stored ? JSON.parse(stored) : null;
      if (parsed?.username) {
        setUsername(parsed.username);
      }
    };

    loadUsername();
  }, []);

  const queryClient = useQueryClient();

  const { data: theme = 'dark' } = useUserThemeQuery(username);

  const paperTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: Themes[theme].secondary,
      surface: Themes[theme].primary,
      onSurface: Themes[theme].defaultText,
      background: Themes[theme].primary,
      onSurfaceVariant: Themes[theme].defaultText,
      surfaceVariant: Themes[theme].errorText,
      backdrop: 'rgba(0, 0, 0, 0.2)',
    },
  };

  const setTheme = async (newTheme: Theme) => {
    if (!username) return;

    await setThemeMutation.mutateAsync({
      username,
      theme: newTheme,
    });
  };

  const refreshTheme = async (): Promise<void> => {
    if (!username) return;
    await queryClient.invalidateQueries({ queryKey: ['userTheme', username] });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, refreshTheme, paperTheme }}>
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