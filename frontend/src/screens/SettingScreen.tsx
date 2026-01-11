import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { WorkoutListScreenProps } from '../types/screenProps';
import TabBar from '../components/navigation/TabBar';
import NavBar from '../components/navigation/NavBar';
import { Themes } from '../../assets/styles/Themes'
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from '../components/ThemeSwitcher';
import Logo from '../components/Logo';
import Button from '../components/Button';

const WorkoutListScreen: React.FC<WorkoutListScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const mobileView = Platform.OS === 'android' || Platform.OS === 'ios';

  return (
    <View style={[styles.container, { backgroundColor: Themes[theme].background }]}>
      {mobileView ? (
        <View style={{ flex: 1 }}>
          <Logo />
          <ThemeSwitcher />
          <TabBar navigation={navigation}/>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <NavBar navigation={navigation}/>
          <View style={styles.deleteAccountContainer}>
            <Text style={[styles.title, {color: Themes[theme].defaultText}]}>Delete your Account</Text>
            <View style={styles.buttonContainer}>
              <Button
                buttonStyle={{marginRight: Platform.OS === 'android' || Platform.OS === 'ios' ? 0 : 50, width: 90}}
                title="Delete" 
                onPress={() => console.log("placeholder")}
                />
            </View>
          </View>
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
  deleteAccountContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: Platform.OS === 'android' || Platform.OS === 'ios' ? "space-evenly" : "center",
  }, 
  title: {
    marginBottom: Platform.OS === 'android' || Platform.OS === 'ios' ? 20 : 50, 
    fontFamily: 'MerriweatherSans',
    fontSize: Platform.OS === 'android' || Platform.OS === 'ios' ? 18 : 20, 
  }
});

export default WorkoutListScreen;