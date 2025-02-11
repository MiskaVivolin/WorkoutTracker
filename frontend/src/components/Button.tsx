import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { Themes } from "../../assets/styles/Themes"
import { ButtonProps } from 'types/Types';
import { useTheme } from '../context/ThemeContext';

const Button = ({ title, onPress, style }: ButtonProps) => {
  
  const { theme } = useTheme();
  
  return (
    <Pressable style={[styles.button, style, {
      backgroundColor: style?.backgroundColor || Themes[theme].secondary, borderColor: Themes[theme].defaultText}]} 
      onPress={onPress}>
    <Text style={[styles.buttonText, { color: Themes[theme].defaultText }]}>{title}</Text>
  </Pressable>
);
}

const styles = StyleSheet.create({
  button: {
    height: 35,
    width: 95,
    padding: 7,
    marginTop: 6,
    marginBottom: 10,
    marginHorizontal: 25,
    borderRadius: 10, 
    borderWidth: 1, 
    textAlign: 'center',
    fontSize: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', 
  },
  buttonText: {
    fontSize: 15, 
    fontFamily: 'MerriweatherSans',
    fontWeight: '500', 
    alignSelf: 'center', 
  },
});

export default Button;