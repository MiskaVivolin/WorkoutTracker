import { useTheme } from '../context/ThemeContext';
import { Themes } from '../../assets/styles/Themes';
import { View, StyleSheet, Text } from 'react-native';
import { PopUpProps } from '../types/componentProps';

const PopUp = ({popupVisible, message}: PopUpProps)  => {

  const { theme } = useTheme()

  if (!popupVisible) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      <View
        style={[
          styles.toast,
          { backgroundColor: Themes[theme].inputField },
        ]}
      >
        <Text style={[styles.text, { color: Themes[theme].defaultText }]}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 80,
    width: '100%',
    alignItems: 'center',
    zIndex: 999,
  },
  toast: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 6,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Inter18',
  },
});

export default PopUp;