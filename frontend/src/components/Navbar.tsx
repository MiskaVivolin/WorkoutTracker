import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { NavBarProps } from '../types/Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Themes } from '../../assets/styles/Themes';
import Button from './Button';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ navigation, showButtons, addButtonToggle }: NavBarProps) => {
  
    const { theme } = useTheme();

  return (
    <View style={[styles.divContainer, {backgroundColor: Themes[theme].background}]}>
      <View style={[styles.headerContainer , {backgroundColor: Themes[theme].primary}]}>
        <Text style={[styles.header, {color: Themes.dark.secondaryText}]}>Workout Tracker</Text>
      </View>

      {showButtons ? (
        <View style={styles.logoutButtonContainer}>
          <Button
            title='Log out'
            onPress={() => {
              AsyncStorage.removeItem('userInputFields');
              navigation.navigate('LoginScreen');
            }}/>
        </View>
      ) : null}

      {showButtons ? (
      <View style={styles.listButtonContainer}>
          
          {addButtonToggle ?
          <Button
            title='Add new'
            onPress={() => {
              navigation.navigate('AddWorkoutScreen')
            }}/>
          :
          <Button
            title='Your list'
            onPress={() => {
              navigation.navigate('WorkoutListScreen')
            }}/>
          }

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
    justifyContent: 'center',
    padding: 10,
    maxHeight: Dimensions.get('window').width < 330 ? 54 : 58,
  },
  logoutButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    position: Dimensions.get('window').width < 550 ? 'relative' : 'absolute',
  },
  listButtonContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width < 550 ? '100%' : '50%',
    justifyContent: Dimensions.get('window').width < 550 ? 'flex-end' : 'flex-start',
    backgroundColor: 'transparent',
    position: Dimensions.get('window').width < 550 ? 'relative' : 'absolute',
  },
  header: {
    fontSize: Dimensions.get('window').width < 330 ? 28 : 32,
    fontFamily: 'BlackOpsOne-Regular',
  }
});

export default Navbar;