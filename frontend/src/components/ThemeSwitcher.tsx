import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

const ThemeSwitcher = () => {

    const { theme, setTheme } = useTheme();
    
    return (
    <View>
        <Text>Current Theme: {theme}</Text>
        <Button title="Light theme" onPress={() => setTheme('light')} />
        <Button title="Dark theme" onPress={() => setTheme('dark')} />
    </View>
  )
}

export default ThemeSwitcher