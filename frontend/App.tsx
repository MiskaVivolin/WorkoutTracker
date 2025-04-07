import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddWorkoutScreen from './src/screens/AddWorkoutScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import WorkoutListScreen from './src/screens/WorkoutListScreen';
import SettingScreen from './src/screens/SettingScreen';
import { UserTokenProvider } from './src/context/UserTokenContext';
import { ThemeProvider } from './src/context/ThemeContext';
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'


SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
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
    <NavigationContainer>
      <ThemeProvider>
        <UserTokenProvider>
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="AddWorkoutScreen" component={AddWorkoutScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="WorkoutListScreen" component={WorkoutListScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </UserTokenProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}