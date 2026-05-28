import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserTokenProvider } from './src/context/UserTokenContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { Provider as PaperProvider  } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import AppContent from './src/app/AppContent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function App() {
  
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppProviders/>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function AppProviders() {

  const [appIsReady, setAppIsReady] = useState(false);
  const { paperTheme } = useTheme();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          'BlackOpsOne-Regular': require('./assets/fonts/BlackOpsOne-Regular.ttf'),
          'Inter18': require('./assets/fonts/Inter_18pt-Regular.ttf'),
          'Inter24': require('./assets/fonts/Inter_24pt-Regular.ttf'),
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
      <UserTokenProvider>
        <PaperProvider theme={paperTheme}>
          <AppContent />
        </PaperProvider>
      </UserTokenProvider>
    </SafeAreaProvider>
  );
}