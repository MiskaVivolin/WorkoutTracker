import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext';
import Button from './Button';
import { Themes } from '../../assets/styles/Themes';

const ThemeSwitcher = () => {

    const { theme, setTheme } = useTheme();
    
    return (
    <View style={{ alignItems: 'center' }}>
        <Text style={{ marginBottom: 20, fontFamily: 'MerriweatherSans', color: Themes[theme].defaultText}}>Current Theme: {theme}</Text>
        <Button title="Light" onPress={() => setTheme('light')} />
        <Button title="Dark" onPress={() => setTheme('dark')} />
    </View>
  )
}



export default ThemeSwitcher