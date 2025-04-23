import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { WorkoutListScreenProps } from '../types/screenProps';
import TabBar from '../components/navigation/TabBar';
import NavBar from '../components/navigation/NavBar';
import { Themes } from '../../assets/styles/Themes'
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from '../components/ThemeSwitcher';
import Logo from '../components/Logo';

const WorkoutListScreen: React.FC<WorkoutListScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const mobileView = Platform.OS === 'android' || Platform.OS === 'ios';

  return (
    <View style={[styles.container, { backgroundColor: Themes[theme].background }]}>
      {mobileView ? (
        <View style={{ flex: 1 }}>
          <Logo textStyle={{marginBottom: 5}}/>
          <ThemeSwitcher />
          <TabBar navigation={navigation}/>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <NavBar navigation={navigation}/>
          <ThemeSwitcher/>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default WorkoutListScreen;