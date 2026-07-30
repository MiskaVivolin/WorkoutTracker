import { Dimensions, StyleSheet, Text, View } from 'react-native'
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
    justifyContent: Dimensions.get('window').width < 500 ? "space-evenly" : "center",
  }, 
  title: {
    marginBottom: Dimensions.get('window').width < 500 ? 20 : 30, 
    fontFamily: 'Inter24',
    fontSize: 20, 
  }
})