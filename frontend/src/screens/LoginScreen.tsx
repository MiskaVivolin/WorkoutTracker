import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Dimensions } from 'react-native';
import AuthenticationValidation from '../functions/AuthenticationValidation';
import { LoginScreenProps } from '../types/Types';
import { useUserToken } from '../context/UserTokenContext';
import Navbar from '../components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  
  const { setToken } = useUserToken();
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
    AuthenticationValidation({
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
      <View style={styles.container}>
        <Text style={styles.labelHeader}>Log in to your account</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={validationFields.username}
            onChangeText={(text) => {
              isFirstRender.current = false
              setValidationFields((prev) => ({ ...prev, username: text }))}
            } 
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={validationFields.password}
            onChangeText={(text) => {
              isFirstRender.current = false;
              setValidationFields((prev) => ({ ...prev, password: text }))}
            }
            />
            {validationInit && (
              <Text style={styles.labelError}>{validationErrors.username}</Text>
            )}
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            style={styles.button}
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
              <Text style={styles.labelLink}>Create an account</Text>
            </Pressable>
            <Pressable
              style={styles.buttonNext} 
              onPress={() => handleLogin()}>
                <Text style={styles.labelButton}>Log in</Text>
            </Pressable>
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
  },
  label: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans',
    color: '#606060',
    marginBottom: 2,
  },
  labelHeader: {
    fontSize: 24, 
    fontFamily: 'MerriweatherSans', 
    color: '#505050',
    marginBottom: 100, 
  },
  labelError: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans', 
    color: 'red',
  },
  labelLink: {
    fontSize: 15,
    fontFamily: 'MerriweatherSans',
    color: '#2e7d7d', 
    fontWeight: '500', 
  },
  labelButton: {
    fontSize: 15, 
    fontFamily: 'MerriweatherSans',
    fontWeight: '500', 
    color: 'white', 
    alignSelf: 'center', 
  },
  input: {
    fontFamily: 'MerriweatherSans',
    fontSize: 12,
    color: '#606060',
    height: 35,
    backgroundColor: '#F8F8F8',
    width: Dimensions.get('window').width < 370 ? 270 : 350,
    borderColor: '#A9A9A9',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 8,
    borderRadius: 3
  },
  button: {
    width: 155,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 70,
    textAlign: 'center',
    fontSize: 16
  },
  buttonNext: {
    marginLeft: Dimensions.get('window').width < 370 ? 15 : 95,
    width: 95,
    padding: 7,
    marginTop: 70,
    backgroundColor: '#6aa9a9',
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#678e8e',
    textAlign: 'center',
    fontSize: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', 
  },
});

export default LoginScreen;