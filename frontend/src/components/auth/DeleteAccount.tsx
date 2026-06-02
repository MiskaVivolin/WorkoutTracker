import { Platform, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
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
      <Text style={[styles.title, {color: Themes[theme].defaultText}]}>Delete your account</Text>
      <View style={styles.buttonContainer}>
        <Button
        buttonStyle={{ width: 90 }}
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:  50,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: Platform.OS === 'android' || Platform.OS === 'ios' ? "space-evenly" : "center",
  }, 
  title: {
    marginBottom: Platform.OS === 'android' || Platform.OS === 'ios' ? 20 : 30, 
    fontFamily: 'Inter24',
    fontSize: Platform.OS === 'android' || Platform.OS === 'ios' ? 18 : 20, 
  }
})