import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { NavBarProps } from '../types/Types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navbar: React.FC<NavBarProps> = ({ navigation, showButtons, addButtonToggle}) => {
  

  return (
    <View style={styles.divContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.labelHeader}>Workout Tracker</Text>
      </View>
      {showButtons ? (
      <View style={styles.listButtonContainer}>
          
          {addButtonToggle ?
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate('AddExerciseScreen')
            }}
          >
            <Text style={styles.labelButton}>Add</Text>
          </Pressable>
          :
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate('ResultScreen')
            }}
          >
            <Text style={styles.labelButton}>List</Text>
          </Pressable>
          }

        </View>
        ) : null}
      {showButtons ? (
        <View style={styles.logoutButtonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              AsyncStorage.removeItem('userInputFields');
              navigation.navigate('LoginScreen');
            }}
          >
            <Text style={styles.labelButton}>Log out</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  divContainer: {
    flexDirection: 'column',
    position: 'relative',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    maxHeight: Dimensions.get('window').width < 330 ? 54 : 58,
  },
  logoutButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    position: Dimensions.get('window').width < 550 ? 'relative' : 'absolute',
  },
  listButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  labelHeader: {
    fontSize: Dimensions.get('window').width < 330 ? 28 : 32,
    fontFamily: 'BlackOpsOne-Regular',
    color: '#303030',
  },
  labelButton: {
    fontSize: 15,
    fontFamily: 'MerriweatherSans',
    fontWeight: '500',
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    width: 95,
    padding: 7,
    paddingBottom: 7,
    margin: 12,
    marginHorizontal: 25,
    backgroundColor: '#6aa9a9',
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#678e8e',
    textAlign: 'center',
    fontSize: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  }
});

export default Navbar;