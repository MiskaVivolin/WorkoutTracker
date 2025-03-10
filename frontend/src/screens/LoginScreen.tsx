import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Dimensions } from 'react-native';
import authenticationValidation from '../functions/authenticationValidation';
import { LoginScreenProps } from '../types/Types';
import { useUserToken } from '../context/UserTokenContext';
import Navbar from '../components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Themes } from '../../assets/styles/Themes';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/Button';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  
  const { setToken } = useUserToken();
  const { theme } = useTheme();
  const isFirstRender = useRef(true);
  const [validationInit, setValidationInit] = useState(false)
  const [validationFields, setValidationFields] = useState({
    username: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    password: '',
  });
  let storedUser = {
    username: '',
    password: '',
  }

  useEffect(() => {
    AsyncStorage.getItem('userInputFields')
      .then((storedUserJSON) => {
        if(storedUserJSON) {
          storedUser = JSON.parse(storedUserJSON);
          if(storedUser) {
            setValidationFields(storedUser)
          }
          console.log('Stored user:', storedUser);
        }
      })
  }, []);

  useEffect(() => {
    if(isFirstRender.current) {
      setTimeout(() => {
        handleLogin();
      }, 500);
    }
  }, [validationFields]);
  
  const handleLogin = () => {
    if(storedUser.username !== '') {
      setToken(storedUser.username)
    } else {
      if(!isFirstRender.current) {
        setToken(validationFields.username);
      }
    }
    authenticationValidation({
      navigation,
      mode: 'login',
      setValidationInit,
      validationFields,
      setValidationErrors,
      setValidationFields,
      isFirstRender: isFirstRender.current,
    });
  };
  
  return (
    <View style={{flex: 1}}>
      <Navbar navigation={navigation} showButtons={false}/>
      <View style={[styles.container, {backgroundColor: Themes[theme].background}]}>
        <Text style={[styles.labelHeader, {color: Themes[theme].defaultText}]}>Log in to your account</Text>
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Username</Text>
          <TextInput
            style={[styles.inputField, {backgroundColor: Themes[theme].inputField, color: Themes[theme].defaultText, borderColor: Themes[theme].border}]}
            value={validationFields.username}
            onChangeText={(text) => {
              isFirstRender.current = false
              setValidationFields((prev) => ({ ...prev, username: text }))}
            } 
          />
          <Text style={[styles.label, {color: Themes[theme].defaultText}]}>Password</Text>
          <TextInput
            style={[styles.inputField, {backgroundColor: Themes[theme].inputField, color: Themes[theme].defaultText, borderColor: Themes[theme].border}]}
            secureTextEntry
            value={validationFields.password}
            onChangeText={(text) => {
              isFirstRender.current = false;
              setValidationFields((prev) => ({ ...prev, password: text }))}
            }
            />
            {validationInit && (
              <Text style={[styles.inputFieldError, {color: Themes[theme].errorText}]}>{validationErrors.username}</Text>
            )}
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            style={styles.accountButton}
            onPress={() => {
              setValidationFields({
                username: '',
                password: ''
              })
              setValidationErrors({
                username: '',
                password: ''
              })
              navigation.navigate('SignupScreen')}}>
              <Text style={[styles.labelLink, {color: Themes[theme].defaultText}]}>Create an account</Text>
            </Pressable>
            <Button
              title='Log in'
              onPress={() => handleLogin()}/>
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
    backgroundColor: 'white'
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
  accountButton: {
    width: 155,
    paddingVertical: 15,
    paddingLeft: 25,
    marginRight: 90,
    textAlign: 'center',
    fontSize: 16
  },
});

export default LoginScreen;