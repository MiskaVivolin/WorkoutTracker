import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

const ThemeSwitcher = () => {

    const { theme, setTheme } = useTheme();
    
    return (
    <View>
        <Text>Current Theme: {theme}</Text>
        <Button title="Switch to Light" onPress={() => setTheme('light')} />
        <Button title="Switch to Dark" onPress={() => setTheme('dark')} />
    </View>
  )
}

export default ThemeSwitcher