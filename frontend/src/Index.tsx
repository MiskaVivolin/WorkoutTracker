import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';


const Stack = createStackNavigator();

export default function Index() {
  
  // TODO: 
  // Typet kuntoon backista
  // Errorit ja varoitukset kuntoon käyttöliittymästä
  // Auth paremmaksi niin että jokaisella käyttäjällä on omat tiedot
  // Laajennusta esim search, filter, kaaviot, profiilitiedot jne.
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}