import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    
    if (!username || !password) {
      console.error('Please enter both username and password');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });
      await AsyncStorage.setItem('userToken', response.data.token);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, marginBottom: 50}}>Login to your account</Text>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button} 
        onPress={handleLogin}>
          Login
        </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}>
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
