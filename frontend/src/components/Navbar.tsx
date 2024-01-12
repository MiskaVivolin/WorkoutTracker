import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CustomNavbarProps {
  navigation: any; 
}

const Navbar: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelHeader}>Workout Tracker</Text>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.navItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.navItem}>Profile</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f0f0f0', // Adjust the background color as needed
  },
  navItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Adjust the text color as needed
  },
  labelHeader: {
    fontSize: 32, 
    fontFamily: 'BlackOpsOne-Regular', 
    color: '#303030',
    marginBottom: 100, 
  },
});

export default Navbar;