import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Themes } from "../../assets/styles/Themes";
import { useTheme } from '../context/ThemeContext';

type FilterDropdownProps = {
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
};

const FilterDropdown = ({ options, onSelect }: FilterDropdownProps) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    setVisible(false);
    onSelect(value);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, { backgroundColor: Themes[theme].primary }]}
        onPress={() => setVisible(!visible)}
      >
        <Text style={[styles.buttonText, { color: Themes[theme].defaultText }]}>
          {selected ? `Filtered by ${selected}` : 'Filter'}
        </Text>
      </Pressable>

      {visible && (
        <View style={[styles.dropdown, { backgroundColor: Themes[theme].primary }]}>
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
    marginBottom: 20,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
  },
  dropdown: {
    position: 'absolute',
    top: 36,
    left: 0,
    width: 150,
    borderRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  dropdownItemText: {
    fontSize: 14,
  },
});

export default FilterDropdown;
