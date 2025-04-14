import React from 'react';
import { Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Themes } from "../../assets/styles/Themes"
import { NavButtonProps } from '../types/componentProps';
import { useTheme } from '../context/ThemeContext';

const NavButton = ({ title, onPress, style, isActive = false }: NavButtonProps) => {
  
  const { theme } = useTheme();
  
  const buttonStyles = [
    styles.button,
    style,
    { backgroundColor: style?.backgroundColor || Themes[theme].primary },
    isActive && { backgroundColor: Themes[theme].background }
  ];
  
  const textStyles = [
    styles.buttonText, 
    { color: Themes[theme].defaultText },
    
  ];
  
  return (
    <Pressable 
      style={buttonStyles} 
      onPress={onPress}
      >
      <Text style={textStyles}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: Platform.OS === 'android' ? 30 : 33,
    width: Platform.OS === 'android' ? 80 : 90,
    padding: Platform.OS === 'android' ? 5 : 8,
    marginTop: 6,
    marginBottom: 10,
    marginHorizontal: Platform.OS === 'android' ? 0 : 10,
    borderRadius: 20, 
    textAlign: 'center',
    fontSize: 16,
  },
  buttonText: {
    fontSize: Platform.OS === 'android' ? 13 : 14, 
    fontFamily: 'MerriweatherSans',
    fontWeight: Platform.OS === 'android' ? '700' : '500',
    alignSelf: 'center', 
  }
});

export default NavButton;

