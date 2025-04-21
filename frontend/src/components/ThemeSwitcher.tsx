import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext';
import Button from './Button';
import { Themes } from '../../assets/styles/Themes';

const ThemeSwitcher = () => {

    const { theme, setTheme } = useTheme();
    
    return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 20, fontFamily: 'MerriweatherSans', color: Themes[theme].defaultText}}>Current Theme: {theme}</Text>
      <View style={styles.buttonContainer}>
        <Button
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
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: '30%',
  },
  buttonContainer: {
    flexDirection: 'row', 
    width: '80%', 
    justifyContent: 'space-evenly'
  }
})

export default ThemeSwitcher