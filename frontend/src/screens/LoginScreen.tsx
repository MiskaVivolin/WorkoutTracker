import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useAuthenticationValidation from '../hooks/useAuthenticationValidation';

const LoginScreen = ({ navigation }) => {
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
      <Text style={{fontSize: 24, marginBottom: 50}}>Login to your account</Text>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={validationFields.username}
        onChangeText={(text) => setValidationFields((prev) => ({ ...prev, username: text }))}
      />
      {validationInit && !validUsername && (
        <Text style={{ color: 'red', paddingBottom: 10 }}>{validationErrors.username}</Text>
      )}
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={validationFields.password}
        onChangeText={(text) => setValidationFields((prev) => ({ ...prev, password: text }))}
      />
      {validationInit && !validPassword && (
        <Text style={{ color: 'red', paddingBottom: 10}}>{validationErrors.password}</Text>
      )}
      <TouchableOpacity
        style={styles.button} 
        onPress={() => useAuthenticationValidation(navigation, 'login', setValidationInit, setValidUsername, setValidPassword, validationFields, setValidationErrors, setValidationFields)}>
          Login
        </TouchableOpacity>
      <TouchableOpacity
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
          navigation.navigate('Signup')}}>
          Signup
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 25,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5
  },
  button: {
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#70db70',
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#606060',
    textAlign: 'center',
    fontSize: 16
  }
});

export default LoginScreen;
