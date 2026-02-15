import { useTheme } from '../context/ThemeContext';
import { Themes } from '../../assets/styles/Themes';
import React from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import { PopUpProps } from '../types/componentProps';

const PopUp = ({successVisible}: PopUpProps)  => {

  const { theme } = useTheme()

  if (!successVisible) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      <View
        style={[
          styles.toast,
          { backgroundColor: Themes[theme].inputField },
        ]}
      >
        <Text style={[styles.text, { color: Themes[theme].defaultText }]}>
          Workout added successfully!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    marginTop: "10%",
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
    fontFamily: 'MerriweatherSans',
  },
});

export default PopUp;