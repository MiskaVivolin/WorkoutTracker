import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useAuthenticationValidation from '../hooks/useAuthenticationValidation';

const SignupScreen = ({ navigation }) => {

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


  const handleSignup = async () => {

    useAuthenticationValidation(validUsername, setValidUsername, validPassword, setValidPassword, validationFields, setValidationFields, validationErrors, setValidationErrors)
    setValidationInit(true)
    if(validPassword && validUsername) {
      try {
        // Check if the username is already taken
        const response = await axios.post('http://localhost:3001/signup', { validationFields });
        console.log(response.data)
        if (response.data.isTaken) {
          console.log("user is taken")
            setValidUsername(false);
            setValidationErrors(() => ({
              username: 'This username is already taken',
              password: ''
            }));
          return;
        } 
        navigation.navigate('Login');
      } catch (error) {
        console.error('Signup failed', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, marginBottom: 50}}>Create a new account</Text>
      <Text style={styles.label}>Username:</Text>
      <TextInput 
        style={styles.input}
        value={validationFields.username}
        onChangeText={(text) => setValidationFields((prev) => ({ ...prev, username: text }))}/>
      {validationInit && !validUsername && (
        <Text style={{ color: 'red', paddingBottom: 10 }}>{validationErrors.username}</Text>
      )}
      <Text style={styles.label}>Password:</Text>
      <TextInput secureTextEntry 
        style={styles.input}
        value={validationFields.password} 
        onChangeText={(text) => setValidationFields((prev) => ({ ...prev, password: text }))} 
        />
      {validationInit && !validPassword && (
        <Text style={{ color: 'red', paddingBottom: 10}}>{validationErrors.password}</Text>
      )}
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSignup}
        >Signup</TouchableOpacity>
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
      marginBottom: 10,
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


export default SignupScreen;