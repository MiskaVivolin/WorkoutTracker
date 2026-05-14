import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserTokenProvider } from './src/context/UserTokenContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { Provider as PaperProvider, MD3LightTheme  } from 'react-native-paper';
import { Themes } from "../../assets/styles/Themes";
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import AppContent from './src/app/AppContent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function App() {
  
  // jatka täältä

  const [appIsReady, setAppIsReady] = useState(false);
  const { theme } = useTheme();
  const queryClient = new QueryClient();

  const paperTheme = {
  ...MD3LightTheme,
  colors: {
    primary: ,
    surface: '#1E1E1E',
    onSurface: '#FFFFFF',
    background: '#2c2c2c',
  },
};
  
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          'BlackOpsOne-Regular': require('./assets/fonts/BlackOpsOne-Regular.ttf'),
          'MerriweatherSans': require('./assets/fonts/MerriweatherSans-VariableFont_wght.ttf')
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <UserTokenProvider>
            <PaperProvider theme={paperTheme}>
              <AppContent/>
            </PaperProvider>
          </UserTokenProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}