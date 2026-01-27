import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Button from '../Button';
import { Themes } from '../../../assets/styles/Themes';
import { useTheme } from '../../context/ThemeContext';
import ConfirmDeleteAccount from './ConfirmDeleteAccount';
import { NavBarProps } from '../../types/componentProps';

const DeleteAccount = ({ navigation }: NavBarProps) => {

  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();
    

  return (
    <View style={styles.deleteAccountContainer}>
      <Text style={[styles.title, {color: Themes[theme].defaultText}]}>Delete your Account</Text>
      <View style={styles.buttonContainer}>
        <Button
        buttonStyle={{marginRight: Platform.OS === 'android' || Platform.OS === 'ios' ? 0 : 50, width: 90}}
        title="Delete" 
        onPress={() => setModalVisible(true)}
        />
      </View>
      {modalVisible ? 
      <ConfirmDeleteAccount navigation={navigation} setModalVisible={setModalVisible}  />
      :  
      <></>
      }
    </View>
  )
}

export default DeleteAccount

const styles = StyleSheet.create({
  deleteAccountContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: Platform.OS === 'android' || Platform.OS === 'ios' ? "space-evenly" : "center",
  }, 
  title: {
    marginBottom: Platform.OS === 'android' || Platform.OS === 'ios' ? 20 : 50, 
    fontFamily: 'MerriweatherSans',
    fontSize: Platform.OS === 'android' || Platform.OS === 'ios' ? 18 : 20, 
  }
})