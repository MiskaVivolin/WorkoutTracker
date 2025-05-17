import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavBarProps } from '../../types/componentProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Themes } from '../../../assets/styles/Themes';
import NavButton from './NavButton';
import { useTheme } from '../../context/ThemeContext';
import { useNavigationState } from '@react-navigation/native';
import Logo from '../Logo';
import ConfirmModal from '../../components/ConfirmModal';

const NavBar = ({ navigation }: NavBarProps) => {
  
    const { theme } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
  
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
    <View style={[styles.navContainer, {backgroundColor: Themes[theme].primary}]}>
      <Logo viewStyle={{marginLeft: 20}}/>
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
          onPress={() => setModalVisible(true)}
          isActive={handleHighlight('LoginScreen')}
        />
      </View>
      {modalVisible ? 
    <ConfirmModal navigation={navigation} setModalVisible={setModalVisible}  />
    :  
    <></>
    }
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-between",
    backgroundColor: 'transparent',
    position: 'relative',
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row", 
    alignItems: "center"
  }
});

export default NavBar;