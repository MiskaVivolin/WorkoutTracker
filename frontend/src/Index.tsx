import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { UserTokenProvider } from './context/UserTokenContext';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'


const getFonts = () => Font.loadAsync({
    'BlackOpsOne-Regular': require('../assets/fonts/BlackOpsOne-Regular.ttf'),
    'MerriweatherSans-Italic': require('../assets/fonts/MerriweatherSans-Italic-VariableFont_wght.ttf'),
    'MerriweatherSans': require('../assets/fonts/MerriweatherSans-VariableFont_wght.ttf')
  })

const Stack = createStackNavigator();

export default function Index() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <UserTokenProvider>
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </UserTokenProvider>
      </NavigationContainer>
    )
  } else {
    return (
      <AppLoading 
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(error) => console.error(error)}
      />
    )
  }
}