import React, { useState } from 'react';
import { SignupScreenProps } from '../types/Types';
import { View, Text, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import useAuthenticationValidation from '../hooks/useAuthenticationValidation';
import Navbar from '../components/Navbar';

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {

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
        <Text style={styles.labelHeader}>Create a new account</Text>
        <Text style={styles.label}>Username</Text>
        <TextInput 
          style={styles.input}
          value={validationFields.username}
          onChangeText={(text) => setValidationFields((prev) => ({ ...prev, username: text }))}/>
        {validationInit && !validUsername && (
          <Text style={styles.labelError}>{validationErrors.username}</Text>
        )}
        <Text style={styles.label2}>Password</Text>
        <TextInput secureTextEntry 
          style={styles.input}
          value={validationFields.password} 
          onChangeText={(text) => setValidationFields((prev) => ({ ...prev, password: text }))} 
          />
        {validationInit && !validPassword && (
          <Text style={styles.labelError}>{validationErrors.password}</Text>
        )}
        <View style={{flexDirection: 'row'}}>
          <Pressable 
            style={styles.button2}
            onPress={() => navigation.navigate('LoginScreen')}
            ><Text style={styles.labelLink}>Back</Text></Pressable>
          <Pressable 
            style={styles.button}
            onPress={() => useAuthenticationValidation(navigation, 'signup', setValidationInit, setValidUsername, setValidPassword, validationFields, setValidationErrors, setValidationFields)}
            ><Text style={styles.labelButton}>Sign up</Text></Pressable>
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
      marginBottom: 10
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
      width: 100,
      padding: 6,
      paddingHorizontal: 10,
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


export default SignupScreen;