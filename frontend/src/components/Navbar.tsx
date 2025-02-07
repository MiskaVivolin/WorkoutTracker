import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { NavBarProps } from '../types/Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../assets/styles/Colors';
import Button from './Button';

const Navbar = ({ navigation, showButtons, addButtonToggle }: NavBarProps) => {
  

  return (
    <View style={styles.divContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.labelHeader}>Workout Tracker</Text>
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
    backgroundColor: Colors.background
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: Colors.background,
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
  labelHeader: {
    fontSize: Dimensions.get('window').width < 330 ? 28 : 32,
    fontFamily: 'BlackOpsOne-Regular',
    color: Colors.primary,
  }
});

export default Navbar;