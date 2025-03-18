import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WorkoutListScreenProps } from '../types/Types';
import Navbar from '../components/Navbar';
import { Themes } from '../../assets/styles/Themes'
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from '../components/ThemeSwitcher';

const WorkoutListScreen: React.FC<WorkoutListScreenProps> = ({ navigation }) => {
  
  const { theme } = useTheme();
  
  return (
    <View style={{flex: 1, backgroundColor: Themes[theme].background}}>
      <Navbar navigation={navigation} showButtons={true} addButtonToggle={false}/>
      <View style={{alignItems: 'center', margin: 50}}>
        <ThemeSwitcher />
      </View>
    </View>
  )
}

export default WorkoutListScreen;