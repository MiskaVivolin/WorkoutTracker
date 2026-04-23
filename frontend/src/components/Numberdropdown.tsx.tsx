import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { Themes } from "../../assets/styles/Themes";
import { useTheme } from '../context/ThemeContext';
import { NumberDropdownProps } from '../types/componentProps';

const NumberDropdown = ({ value, onSelect, options, placeholder }: NumberDropdownProps) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, { backgroundColor: Themes[theme].primary, borderColor: Themes[theme].border }]}
        onPress={() => setVisible(!visible)}
      >
        <Text style={[styles.buttonText, { color: Themes[theme].defaultText }]}>
          {value ?? placeholder ?? 'Select'}
        </Text>
      </Pressable>

      {visible && (
        <View style={[styles.dropdown, { backgroundColor: Themes[theme].primary, borderColor: Themes[theme].border }]}>
          {options.map((num) => (
            <Pressable
              key={num}
              style={styles.dropdownItem}
              onPress={() => {
                onSelect(num);
                setVisible(false);
              }}
            >
              <Text style={[styles.dropdownItemText, { color: Themes[theme].defaultText }]}>
                {num}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'flex-start',
    marginHorizontal: Platform.OS === 'android' || Platform.OS === 'ios' ? 0 : 8,
    marginRight: 8,
    marginBottom: 20,
    zIndex: 100,
    elevation: 6, 
  },
  button: {
    height: 32,
    width: 80,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 500,

  },
  dropdown: {
    position: 'absolute',
    top: 36,
    left: 0,
    width: 150,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 10,
    zIndex: 200,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  dropdownItemText: {
    fontSize: 14,
    fontWeight: 500,
  },
});

export default NumberDropdown;