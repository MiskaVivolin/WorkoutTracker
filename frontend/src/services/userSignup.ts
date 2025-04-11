import { Platform } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "types/utilTypes";


export const userSignup = async ( navigation: StackNavigationProp<RootStackParamList>, username: string, password: string ): Promise<void | string> => {
    
    const apiUrl = Platform.OS === 'android' ? 'http://192.168.1.119:3001/signup' : 'http://127.0.0.1:3001/signup';
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      })
      if (response.status === 409) {
        return "This username is already taken";
      }
  
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };