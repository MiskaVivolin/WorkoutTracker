import { Modal, StyleSheet, Text, View } from 'react-native'
import Button from '../Button';
import React from 'react'
import { Themes } from '../../../assets/styles/Themes';
import { useTheme } from '../../context/ThemeContext';
import { ConfirmModalProps } from '../../types/componentProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import deleteUser from '../../services/auth/deleteUser';
import { useUserToken } from '../../context/UserTokenContext';


const ConfirmDeleteAccount = ({ navigation, setModalVisible, }: ConfirmModalProps) => {

  const { theme } = useTheme();
  const { userToken, setToken } = useUserToken();

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      
      setToken(null);
      setModalVisible(false);

      navigation.navigate('LoginScreen');

    },
    onError: (error) => {
      console.error('Delete account failed:', error);
    },
  });

  const handleDeleteAccount = async () => {
    console.log("Deleting account for user:", userToken);
    if (!userToken) {
      console.error('No user token found');
      return;
    }

    deleteUserMutation.mutate(userToken);
  };

  return (
    <Modal transparent>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: Themes[theme].background }]}>
          <Text style={[styles.modalTitle, { color: Themes[theme].defaultText }]}>
            Are you sure you want to delete your account?
          </Text>
          <View style={styles.modalButtons}>
            <Button
              title={deleteUserMutation.isPending ? 'Deleting...' : 'Yes'}
              onPress={handleDeleteAccount}
              disabled={deleteUserMutation.isPending}
              buttonStyle={{ marginHorizontal: 5, alignItems: 'center', width: 110,backgroundColor: Themes[theme].secondaryButton }}
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
    width: 360,
    paddingVertical: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  modalButton: {
    marginHorizontal: 5,
    alignItems: 'center',
    width: 110,
  },
});

export default ConfirmDeleteAccount;