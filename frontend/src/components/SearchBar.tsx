import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { Themes } from "../../assets/styles/Themes";
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { SearchBarProps } from '../types/componentProps';

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: Themes[theme].primary }]}>
      <Ionicons name="search" size={16} color={Themes[theme].defaultText} />
      
      <TextInput
        style={[styles.input, { color: Themes[theme].defaultText }]}
        placeholder="Search..."
        placeholderTextColor={Themes[theme].greyText}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    width: 220,
    paddingHorizontal: 10,
    borderRadius: 10,
   
  },
  input: {
    height: 40,
    marginLeft: 6,
    flex: 1,
    fontSize: 14,
  },
});

export default SearchBar;
