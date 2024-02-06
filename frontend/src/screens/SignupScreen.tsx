import React, { useState } from 'react';
import { SignupScreenProps } from '../types/Types';
import { View, Text, TextInput, StyleSheet, Pressable, Platform, Dimensions } from 'react-native';
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
      <Navbar navigation={navigation} showButton={false}/>
      <View style={styles.container}>
        <Text style={styles.labelHeader}>Create a new account</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput 
            style={styles.input}
            value={validationFields.username}
            onChangeText={(text) => setValidationFields((prev) => ({ ...prev, username: text }))}/>
          {validationInit && !validUsername && (
            <Text style={styles.labelError}>{validationErrors.username}</Text>
          )}
          <Text style={styles.label}>Password</Text>
          <TextInput secureTextEntry 
            style={styles.input}
            value={validationFields.password} 
            onChangeText={(text) => setValidationFields((prev) => ({ ...prev, password: text }))} 
            />
          {validationInit && !validPassword && (
            <Text style={styles.labelError}>{validationErrors.password}</Text>
          )}
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable 
            style={styles.button}
            onPress={() => navigation.navigate('LoginScreen')}
            ><Text style={styles.labelLink}>Back</Text></Pressable>
          <Pressable 
            style={styles.buttonNext}
            onPress={() => useAuthenticationValidation(navigation, 'signup', setValidationInit, validationFields, setValidationErrors, setValidationFields, setValidUsername, setValidPassword,)}
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


export default SignupScreen;