import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddWorkoutScreen from '../screens/AddWorkoutScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import WorkoutListScreen from '../screens/WorkoutListScreen';
import SettingScreen from '../screens/SettingScreen';
import { UserTokenProvider } from '../context/UserTokenContext';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Themes } from '../../assets/styles/Themes';

const AppContent = () => {
    
    const { theme } = useTheme();
    const Stack = createStackNavigator();
  
    return (
      <>
        <StatusBar
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
          backgroundColor={Themes[theme].primary}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <UserTokenProvider>
              <Stack.Navigator initialRouteName="LoginScreen">
              <Stack.Screen name="AddWorkoutScreen" component={AddWorkoutScreen} options={{ headerShown: false }} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
              <Stack.Screen name="WorkoutListScreen" component={WorkoutListScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }} />
              </Stack.Navigator>
            </UserTokenProvider>
          </NavigationContainer>
        </SafeAreaView>
      </>
    );
  };

export default AppContent;