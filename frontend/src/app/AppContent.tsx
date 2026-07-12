import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';import AddWorkoutScreen from '../screens/AddWorkoutScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import WorkoutListScreen from '../screens/WorkoutListScreen';
import SettingScreen from '../screens/SettingScreen';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Themes } from '../../assets/styles/Themes';

const AppContent = () => {
    
    const { theme } = useTheme();
    const Stack = createNativeStackNavigator();  
    
    return (
      <>
        <StatusBar
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
          backgroundColor={Themes[theme].primary}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen">
              <Stack.Screen name="AddWorkoutScreen" component={AddWorkoutScreen} options={{ headerShown: false }} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
              <Stack.Screen name="WorkoutListScreen" component={WorkoutListScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </>
    );
  };

export default AppContent;