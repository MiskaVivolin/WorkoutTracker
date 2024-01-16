import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';


const Navbar: React.FC = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={styles.headerContainer}>
        <Text style={styles.labelHeader}>Workout Tracker</Text>
      </View>
      <View style={{backgroundColor: '#f0f0f0'}}>
        <Pressable style={styles.button}>
          <Text style={styles.labelButton}>Log out</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  labelHeader: {
    fontSize: 32, 
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
    margin: 12,
    marginHorizontal: 25,
    backgroundColor: '#6aa9a9',
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#678e8e',
    textAlign: 'center',
    fontSize: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', 
    ...Platform.select({
      ios: {
        shadowColor: '#696969',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
        shadowColor: '#696969',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      }
    })
  }
});

export default Navbar;