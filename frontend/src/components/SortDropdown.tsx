import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { Themes } from "../../assets/styles/Themes";
import { useTheme } from '../context/ThemeContext';
import { SortDropdownProps } from '../types/componentProps';

const SortDropdown = ({ options, onSelect }: SortDropdownProps) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string>('Newest');

  const handleSelect = (value: string) => {
    setSelected(value);
    setVisible(false);
    onSelect(value);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, { backgroundColor: Themes[theme].primary, borderColor: Themes[theme].border }]}
        onPress={() => setVisible(!visible)}
      >
        <Text style={[styles.buttonText, { color: Themes[theme].defaultText }]}>
          {selected ? selected : 'Filter'}
        </Text>
      </Pressable>

      {visible && (
        <View style={[styles.dropdown, { backgroundColor: Themes[theme].primary, borderColor: Themes[theme].border }]}>
          {options.map((option) => (
            <Pressable
              key={option.value}
              style={styles.dropdownItem}
              onPress={() => handleSelect(option.value)}
            >
              <Text style={[styles.dropdownItemText, { color: Themes[theme].defaultText }]}>
                {option.label}
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
    marginBottom: 20,
    zIndex: 100,
    elevation: 6, 
  },
  button: {
    height: Platform.OS === 'android' || Platform.OS === 'ios' ? 30 : 32,
    width: 80,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
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
  },
});

export default SortDropdown;
