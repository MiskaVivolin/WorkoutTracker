import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext';
import Button from './Button';
import { Themes } from '../../assets/styles/Themes';

const ThemeSwitcher = () => {

    const { theme, setTheme } = useTheme();
    
    return (
    <View style={styles.themeContainer}>
      <Text style={[styles.header, {color: Themes[theme].defaultText}]}>Current theme: {theme}</Text>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={{marginRight: Platform.OS === 'android' || Platform.OS === 'ios' ? 0 : 50}}
          title="Light" 
          onPress={() => setTheme('light')} 
          />
        <Button
          title="Dark"
          onPress={() => setTheme('dark')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  themeContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: '30%',
  },
  buttonContainer: {
    flexDirection: 'row', 
    width: '80%',
    justifyContent: Platform.OS === 'android' || Platform.OS === 'ios' ? "space-evenly" : "center",
    
  }, 
  header: {
    marginBottom: Platform.OS === 'android' || Platform.OS === 'ios' ? 20 : 50, 
    fontFamily: 'MerriweatherSans',
    fontSize: Platform.OS === 'android' || Platform.OS === 'ios' ? 16 : 20, 
  }
})

export default ThemeSwitcher