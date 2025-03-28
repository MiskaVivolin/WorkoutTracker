import React, { useState } from 'react';
import { SignupScreenProps } from '../types/screenProps';
import { View, Text, TextInput, StyleSheet, Pressable, Dimensions } from 'react-native';
import authenticationValidation from '../services/authenticationValidation';
import { useTheme } from '../context/ThemeContext';
import { Themes } from '../../assets/styles/Themes';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {

  const { theme } = useTheme();
  const [validationInit, setValidationInit] = useState(false)
  const [validUsername, setValidUsername] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [validationFields, setValidationFields] = useState({
    username: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    password: '',
  });

  return (
    <View style={{flex: 1}}>
      <Navbar navigation={navigation} showButtons={false}/>
      <View style={[styles.container, {backgroundColor: Themes[theme].background}]}>
        <Text style={[styles.labelHeader, {color: Themes[theme].defaultText}]}>Create a new account</Text>
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Username</Text>
          <TextInput 
            style={[styles.inputField, {color: Themes[theme].defaultText, backgroundColor: Themes[theme].inputField, borderColor: Themes[theme].border}]}
            value={validationFields.username}
            onChangeText={(text) => setValidationFields((prev) => ({ ...prev, username: text }))}/>
          {validationInit && !validUsername && (
            <Text style={[styles.inputFieldError, {color: Themes[theme].errorText}]}>{validationErrors.username}</Text>
          )}
          <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Password</Text>
          <TextInput secureTextEntry 
            style={[styles.inputField, {color: Themes[theme].defaultText, backgroundColor: Themes[theme].inputField, borderColor: Themes[theme].border}]}
            value={validationFields.password} 
            onChangeText={(text) => setValidationFields((prev) => ({ ...prev, password: text }))} 
            />
          {validationInit && !validPassword && (
            <Text style={[styles.inputFieldError, {color: Themes[theme].errorText}]}>{validationErrors.password}</Text>
          )}
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable 
            style={styles.backButton}
            onPress={() => navigation.navigate('LoginScreen')}
            ><Text style={[styles.labelLink, {color: Themes[theme].defaultText}]}>Back</Text></Pressable>
          <Button
            title='Sign up'
            onPress={() => authenticationValidation({navigation, mode: 'signup', setValidationInit, validationFields, setValidationErrors, setValidationFields, setValidUsername, setValidPassword})}
            />
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    fieldContainer: {
      justifyContent: 'center',
      maxWidth: Dimensions.get('window').width < 370 ? 270 : 350,
      marginBottom: 50
    },
    label: {
      fontSize: 13,
      fontFamily: 'MerriweatherSans',
      marginBottom: 2,
    },
    labelHeader: {
      fontSize: 24, 
      fontFamily: 'MerriweatherSans', 
      marginBottom: 100, 
    },
    inputFieldError: {
      fontSize: 13,
      fontFamily: 'MerriweatherSans', 
      marginBottom: 10
    },
    labelLink: {
      fontSize: 15,
      fontFamily: 'MerriweatherSans',
      fontWeight: '500', 
    },
    inputField: {
      fontFamily: 'MerriweatherSans',
      fontSize: 12,
      height: 35,
      width: Dimensions.get('window').width < 370 ? 270 : 350,
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 8,
      borderRadius: 3
    },
    backButton: {
      width: 155,
      paddingVertical: 15,
      paddingLeft: 25,
      marginRight: 90,
      textAlign: 'center',
      fontSize: 16
    },
  });


export default SignupScreen;