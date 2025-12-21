import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/utilTypes";
import { API_BASE_URL } from "../../../config";
import { useMutation } from '@tanstack/react-query';


export const useLogin = (navigation: StackNavigationProp<RootStackParamList>) => {
  
  return useMutation({
    mutationFn: async ({ username, password }: {username: string; password: string}) => {

      const apiUrl = Platform.OS === 'android' ? `${API_BASE_URL}/login` : 'http://127.0.0.1:3001/login';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

    if(response.status === 401 || response.status === 403) {
      return "Invalid username or password"
    }
    
    await AsyncStorage.setItem('userInputFields', JSON.stringify({ username, password }));
      navigation.navigate('WorkoutListScreen');
    }
  })
};