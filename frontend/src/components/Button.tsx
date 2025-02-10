import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { Themes } from "../../assets/styles/Themes"
import { ButtonProps } from 'types/Types';

const Button = ({ title, onPress, style }: ButtonProps) => (
    <Pressable style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    height: 35,
    width: 95,
    padding: 7,
    marginTop: 6,
    marginBottom: 10,
    marginHorizontal: 25,
    backgroundColor: Themes.dark.secondary,
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: Themes.dark.buttonText,
    textAlign: 'center',
    fontSize: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', 
  },
  buttonText: {
    fontSize: 15, 
    fontFamily: 'MerriweatherSans',
    fontWeight: '500', 
    color: Themes.dark.buttonText, 
    alignSelf: 'center', 
  },
});

export default Button;