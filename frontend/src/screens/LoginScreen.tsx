import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import useAuthenticationValidation from '../hooks/useAuthenticationValidation';
import { LoginScreenProps } from '../types/Types';
import { useUserToken } from '../context/UserTokenContext';

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
    <View style={styles.container}>
      <Text style={{fontSize: 24, marginBottom: 50, fontFamily: 'Daniels'}}>Record Tracker</Text>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={validationFields.username}
        onChangeText={(text) => setValidationFields((prev) => ({ ...prev, username: text }))}
      />
      {validationInit && !validUsername && (
        <Text style={{ color: 'red', paddingBottom: 10 }}>{validationErrors.username}</Text>
      )}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={validationFields.password}
        onChangeText={(text) => setValidationFields((prev) => ({ ...prev, password: text }))}
      />
      {validationInit && !validPassword && (
        <Text style={{ color: 'red', paddingBottom: 10}}>{validationErrors.password}</Text>
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
            <Text style={{color: '#2e7d7d', fontWeight: '500', fontSize: 16}}>Create an account</Text>
          </Pressable>
          <Pressable
            style={styles.button} 
            onPress={() => {
              setToken(validationFields.username)
              useAuthenticationValidation(navigation, 'login', setValidationInit, setValidUsername, setValidPassword, validationFields, setValidationErrors, setValidationFields)}}>
              <Text style={{color: 'white', fontWeight: '500', fontSize: 16, alignSelf: 'center'}}>Log in</Text>
          </Pressable>
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
    color: '#505050',
    fontSize: 14,
    marginBottom: 2,
    paddingRight: 280,
    
  },
  input: {
    height: 35,
    backgroundColor: '#F8F8F8',
    width: 350,
    borderColor: '#A9A9A9',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 3
  },
  button: {
    marginLeft: 95,
    width: 100,
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 50,
    backgroundColor: '#6aa9a9',
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#668585',
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
    marginTop: 50,
    textAlign: 'center',
    fontSize: 16
  },
});


export default LoginScreen;