import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WorkoutListScreenProps } from '../types/screenProps';
import TabBar from '../components/navigation/TabBar';
import NavBar from '../components/navigation/NavBar';
import { Themes } from '../../assets/styles/Themes'
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from '../components/ThemeSwitcher';
import Logo from '../components/Logo';
import DeleteAccount from '../components/auth/DeleteAccount';


const WorkoutListScreen: React.FC<WorkoutListScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const mobileView = Dimensions.get('window').width < 500;

  return (
    <View style={[styles.container, { backgroundColor: Themes[theme].background }]}>
      {mobileView ? (
        <View style={{flex: 1}}>
          <Logo />
          <DeleteAccount navigation={navigation}/>
          <ThemeSwitcher />
          <TabBar navigation={navigation}/>
        </View>
      ) : (
        <View>
          <NavBar navigation={navigation}/>
          <DeleteAccount navigation={navigation}/>
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
  }
});

export default WorkoutListScreen;