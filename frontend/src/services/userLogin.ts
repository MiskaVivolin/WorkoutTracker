import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/utilTypes";
import { API_BASE_URL } from "../../config";


export const userLogin = async (navigation: StackNavigationProp<RootStackParamList>, username: string, password: string): Promise<string | undefined> => {

      const apiUrl = Platform.OS === 'android' ? `${API_BASE_URL}/login` : 'http://127.0.0.1:3001/login';
    
      try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      if(response.status === 401 || response.status === 403) {
        return "Invalid username or password"
      } else {
        await AsyncStorage.setItem('userInputFields', JSON.stringify({ username, password }));
        navigation.navigate('WorkoutListScreen');
      }
    } catch (err) {
      console.error("Error sending login API call:", err)
    }
  };