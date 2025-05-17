import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TabBarProps } from '../../types/componentProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavButton from './NavButton';
import { useNavigationState } from '@react-navigation/native';

const TabBar = ({ navigation }: TabBarProps) => {
    
    const currentRoute = useNavigationState(
      state => state.routes[state.index].name
    );

    const handleHighlight = (screen: string) => {
      if (screen === currentRoute) {
        return true
      } else {
        return false
      }
    }

  return (
    <View style={[styles.container]}>
      <NavButton
        title='Add new'
        onPress={() => {
          navigation.navigate('AddWorkoutScreen')
        }}
        isActive={handleHighlight('AddWorkoutScreen')}
        /> 
      <NavButton
        title='Your list'
        onPress={() => {
          navigation.navigate('WorkoutListScreen')
        }}
        isActive={handleHighlight('WorkoutListScreen')}
        />   
      <NavButton
        title='Settings'
        onPress={() => {
          navigation.navigate('SettingScreen')
        }}
        isActive={handleHighlight('SettingScreen')}
        />
      <NavButton
        title='Log out'
        onPress={async () => {
          await AsyncStorage.removeItem('userInputFields');
          navigation.navigate('LoginScreen');
        }}
        isActive={handleHighlight('LoginScreen')}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: "flex-end",
    paddingVertical: 15,
  }
});

export default TabBar;