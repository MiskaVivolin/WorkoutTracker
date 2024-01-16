import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import useAuthenticationValidation from '../hooks/useAuthenticationValidation';
import { LoginScreenProps } from '../types/Types';
import { useUserToken } from '../context/UserTokenContext';
import Navbar from '../components/Navbar';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {

  const { setToken } = useUserToken()
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
      <Navbar />
      <View style={styles.container}>
        <Text style={styles.labelHeader}>Log in to your account</Text>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={validationFields.username}
          onChangeText={(text) => setValidationFields((prev) => ({ ...prev, username: text }))}
        />
        <Text style={styles.label2}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={validationFields.password}
          onChangeText={(text) => setValidationFields((prev) => ({ ...prev, password: text }))}
          />
          {validationInit && !validUsername && (
            <Text style={styles.labelError}>{validationErrors.username}</Text>
          )}
        <View style={{flexDirection: 'row'}}>
          <Pressable
            style={styles.button2}
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
              style={styles.button} 
              onPress={() => {
                setToken(validationFields.username)
                useAuthenticationValidation(navigation, 'login', setValidationInit, setValidUsername, setValidPassword, validationFields, setValidationErrors, setValidationFields)}}>
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
  label: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans',
    color: '#606060',
    marginBottom: 2,
    paddingRight: 280,
  },
  label2: {
    fontSize: 13,
    fontFamily: 'MerriweatherSans',
    color: '#606060',
    marginBottom: 2,
    paddingRight: 284,
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
    width: 350,
    borderColor: '#A9A9A9',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 8,
    borderRadius: 3
  },
  button: {
    marginLeft: 95,
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
    ...Platform.select({
      ios: {
        shadowColor: '#696969',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
        shadowColor: '#696969',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      }
    })
  },
  button2: {
    width: 155,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 70,
    textAlign: 'center',
    fontSize: 16
  },
});


export default LoginScreen;