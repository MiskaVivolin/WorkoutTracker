import React from 'react';
import { Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Themes } from "../../assets/styles/Themes"
import { ButtonProps } from '../types/componentProps';
import { useTheme } from '../context/ThemeContext';

const Button = ({ title, onPress, style }: ButtonProps) => {
  
  const { theme } = useTheme();
  
  return (
    <Pressable style={[styles.button, style, {
      backgroundColor: style?.backgroundColor || Themes[theme].secondary}]} 
      onPress={onPress}>
    <Text style={[styles.buttonText, { color: Themes[theme].secondaryText }]}>{title}</Text>
  </Pressable>
);
}

const styles = StyleSheet.create({
  button: {
    height: Platform.OS === 'android' ? 30 : 33,
    width: Platform.OS === 'android' ? 80 : 90,
    padding: Platform.OS === 'android' ? 5 : 7,
    marginTop: 6,
    marginBottom: 10,
    marginHorizontal: 19,
    borderRadius: 20, 
    textAlign: 'center',
    fontSize: 16,
  },
  buttonText: {
    fontSize: Platform.OS === 'android' ? 13 : 15, 
    fontFamily: 'MerriweatherSans',
    fontWeight: Platform.OS === 'android' ? '700' : '500',
    alignSelf: 'center', 
  },
});

export default Button;