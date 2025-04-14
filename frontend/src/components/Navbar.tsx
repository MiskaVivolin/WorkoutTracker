import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { NavBarProps } from '../types/componentProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Themes } from '../../assets/styles/Themes';
import NavButton from './NavButton';
import { useTheme } from '../context/ThemeContext';
import { useNavigationState } from '@react-navigation/native';

const Navbar = ({ navigation, showButtons }: NavBarProps) => {
  
    const { theme } = useTheme();
  
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
    <View style={[styles.divContainer, {backgroundColor: Themes[theme].background}]}>
      <View style={[styles.headerContainer, {backgroundColor: Themes[theme].primary}]}>
        <Text style={[styles.header, {color: Themes[theme].secondaryText}]}>Workout Tracker</Text>
      </View>
      {showButtons ? (
      <View style={styles.buttonContainer}> 
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
          onPress={() => {
            AsyncStorage.removeItem('userInputFields');
            navigation.navigate('LoginScreen');
          }}
          isActive={handleHighlight('LoginScreen')}
          />
      </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  divContainer: {
    flexDirection: Dimensions.get('window').width < 550 ? 'column' : 'row',
    position: 'relative',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 25,
    maxHeight: Dimensions.get('window').width < 330 ? 54 : 58,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: Platform.OS === 'android' ? 'space-evenly' : 'flex-end',
    backgroundColor: 'transparent',
    position: Dimensions.get('window').width < 550 ? 'relative' : 'absolute',
    marginTop: 5,
  },
  header: {
    fontSize: Dimensions.get('window').width < 330 ? 28 : 32,
    fontFamily: 'BlackOpsOne-Regular',
  }
});

export default Navbar;