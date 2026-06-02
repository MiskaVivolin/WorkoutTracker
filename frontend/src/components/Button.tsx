import React from 'react';
import { Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Themes } from "../../assets/styles/Themes"
import { ButtonProps } from '../types/componentProps';
import { useTheme } from '../context/ThemeContext';


const Button = ({ title, onPress, buttonStyle, textStyle, disabled }: ButtonProps) => {
  
  const { theme } = useTheme();
  const backgroundColor = disabled ? '#ccc' : buttonStyle?.backgroundColor || Themes[theme].secondary;
  const textColor = disabled ? '#888' : textStyle?.color || Themes[theme].secondaryText;
  
  return (
    <Pressable 
      style={[styles.button, buttonStyle, { backgroundColor, opacity: disabled ? 0.6 : 1 }]} 
      onPress={disabled ? undefined : onPress}>
      <Text 
        style={[styles.buttonText, textStyle, { color: textColor }]}>
        {title}
      </Text>
  </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    height: Platform.OS === 'android' || Platform.OS === 'ios' ? 34 : 35,
    width: Platform.OS === 'android' || Platform.OS === 'ios' ? 80 : 80,
    padding: Platform.OS === 'android' || Platform.OS === 'ios' ? 6 : 8,
    borderRadius: 20, 
    textAlign: 'center',
    fontSize: 16,
  },
  buttonText: {
    fontSize: Platform.OS === 'android' || Platform.OS === 'ios' ? 16 : 16, 
    fontFamily: 'Inter24',
    fontWeight: Platform.OS === 'android' || Platform.OS === 'ios' ? '700' : '500',
    alignSelf: 'center', 
  },
});

export default Button;