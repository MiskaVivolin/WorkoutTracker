import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
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
    height: 35,
    width: 95,
    padding: 7,
    marginTop: 6,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 20, 
    textAlign: 'center',
    fontSize: 16,
  },
  buttonText: {
    fontSize: 15, 
    fontFamily: 'MerriweatherSans',
    fontWeight: '500', 
    alignSelf: 'center', 
  },
  activeButtonText: {
    fontWeight: '700',
  }
});

export default NavButton;

