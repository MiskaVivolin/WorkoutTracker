import React from 'react';
import { Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Themes } from "../../../assets/styles/Themes"
import { NavButtonProps } from '../../types/componentProps';
import { useTheme } from '../../context/ThemeContext';


const NavButton = ({ title, onPress, style, isActive = false }: NavButtonProps) => {
  
  const { theme } = useTheme();
  
  return (
    <Pressable 
      style={[styles.button, style, { backgroundColor: style?.backgroundColor || Themes[theme].primary },
        isActive && { backgroundColor: Themes[theme].background }]} 
      onPress={onPress}
      >
      <Text style={[ styles.buttonText, { color: Themes[theme].defaultText }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: Platform.OS === 'android' || Platform.OS === 'ios' ? 30 : 33,
    width: Platform.OS === 'android' || Platform.OS === 'ios' ? 80 : 90,
    padding: Platform.OS === 'android' || Platform.OS === 'ios' ? 5 : 8,
    marginHorizontal: Platform.OS === 'android' || Platform.OS === 'ios' ? 0 : 10,
    borderRadius: 20, 
    textAlign: 'center',
    fontSize: 16,
  },
  buttonText: {
    fontSize: Platform.OS === 'android' || Platform.OS === 'ios' ? 13 : 14, 
    fontFamily: 'MerriweatherSans',
    fontWeight: Platform.OS === 'android' || Platform.OS === 'ios' ? '700' : '500',
    alignSelf: 'center', 
  }
});

export default NavButton;