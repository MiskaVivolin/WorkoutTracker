import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
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
            <Pressable
              style={[styles.modalButton, { backgroundColor: Themes[theme].primary }]}
              onPress={async () => {
              await AsyncStorage.removeItem('userInputFields');
              navigation.navigate('LoginScreen')}}
              >
              <Text style={{ color: Themes[theme].secondaryText }}>Yes</Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, { backgroundColor: Themes[theme].inputField }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: Themes[theme].defaultText }}>Cancel</Text>
            </Pressable>
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
    width: '80%',
    padding: 20,
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
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default ConfirmModal