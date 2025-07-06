import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserTokenProvider } from './src/context/UserTokenContext';
import { ThemeProvider } from './src/context/ThemeContext';
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import AppContent from './src/app/AppContent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function App() {
  
  const [appIsReady, setAppIsReady] = useState(false);
  
  const queryClient = new QueryClient();
  
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
            <AppContent/>
          </UserTokenProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}