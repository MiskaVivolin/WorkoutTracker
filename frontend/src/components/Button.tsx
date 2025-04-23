import React from 'react';
import { Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Themes } from "../../assets/styles/Themes"
import { ButtonProps } from '../types/componentProps';
import { useTheme } from '../context/ThemeContext';

const Button = ({ title, onPress, buttonStyle, textStyle }: ButtonProps) => {
  
  const { theme } = useTheme();
  
  return (
    <Pressable style={[styles.button, buttonStyle, {
      backgroundColor: buttonStyle?.backgroundColor || Themes[theme].secondary}]} 
      onPress={onPress}>
    <Text style={[styles.buttonText, textStyle, { 
      color: textStyle?.color || Themes[theme].secondaryText }]}>
      {title}
    </Text>
  </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    height: Platform.OS === 'android' || Platform.OS === 'ios' ? 30 : 32,
    width: Platform.OS === 'android' || Platform.OS === 'ios' ? 80 : 80,
    padding: Platform.OS === 'android' || Platform.OS === 'ios' ? 5 : 6,
    borderRadius: 20, 
    textAlign: 'center',
    fontSize: 16,
  },
  buttonText: {
    fontSize: Platform.OS === 'android' || Platform.OS === 'ios' ? 13 : 15, 
    fontFamily: 'MerriweatherSans',
    fontWeight: Platform.OS === 'android' || Platform.OS === 'ios' ? '700' : '500',
    alignSelf: 'center', 
  },
});

export default Button;