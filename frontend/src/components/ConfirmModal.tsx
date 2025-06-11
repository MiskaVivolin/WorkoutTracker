import { Modal, StyleSheet, Text, View } from 'react-native'
import Button from './Button';
import React from 'react'
import { Themes } from '../../assets/styles/Themes';
import { useTheme } from '../context/ThemeContext';
import { ConfirmModalProps } from '../types/componentProps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfirmModal = ({ navigation, setModalVisible, }: ConfirmModalProps) => {

  const { theme } = useTheme();

  return (
    <Modal transparent>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: Themes[theme].background }]}>
          <Text style={[styles.modalTitle, { color: Themes[theme].defaultText }]}>
            Are you sure you want to log out?
          </Text>
          <View style={styles.modalButtons}>
            <Button
              title="Yes"
              onPress={async () => {
              await AsyncStorage.removeItem('userInputFields');
              navigation.navigate('LoginScreen')}}
              buttonStyle={styles.modalButton}
            />
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              buttonStyle={styles.modalButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '40%',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
});

export default ConfirmModal