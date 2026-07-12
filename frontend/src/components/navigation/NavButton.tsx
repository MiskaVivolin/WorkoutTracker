import { Text, StyleSheet, Pressable, Dimensions } from 'react-native';
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
    height: Dimensions.get('window').width < 500 ? 32 : 35,
    width: Dimensions.get('window').width < 500 ? 80 : 90,
    padding: Dimensions.get('window').width < 500 ? 7 : 8,
    marginHorizontal: 4,
    borderRadius: 20, 
    textAlign: 'center',
    fontSize: 16,
  },
  buttonText: {
    fontSize: Dimensions.get('window').width < 500 ? 14 : 15, 
    fontFamily: 'Inter24',
    fontWeight: Dimensions.get('window').width < 500 ? '700' : '500',
    alignSelf: 'center', 
  }
});

export default NavButton;