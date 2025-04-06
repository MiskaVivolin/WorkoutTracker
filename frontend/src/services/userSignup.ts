import { Platform } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "types/utilTypes";
import axios from "axios";


export const userSignup = async ( navigation: StackNavigationProp<RootStackParamList>, username: string, password: string ): Promise<void> => {
    
    const apiUrl = Platform.OS === 'android' ? 'http://192.168.1.119:3001/signup' : 'http://127.0.0.1:3001/signup';
    
    if (username.length < 4) {
      throw new Error('Username must be at least 4 characters');
    }
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
  
    try {
      const response = await axios.post(apiUrl, { username, password });
  
      if (response.data.isTaken) {
        throw new Error('This username is already taken');
      }
  
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };