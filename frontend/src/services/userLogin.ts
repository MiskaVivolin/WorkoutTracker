import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { ApiResponse, RootStackParamList } from "../types/utilTypes";
import axios, { AxiosError } from "axios";


export const userLogin = async (navigation: StackNavigationProp<RootStackParamList>, username: string, password: string): Promise<boolean | undefined> => {

      const apiUrl = Platform.OS === 'android' ? 'http://192.168.1.119:3001/login' : 'http://127.0.0.1:3001/login';
    
      try {
      const response = await axios.post(apiUrl, { username, password });
  
      // await AsyncStorage.setItem('userToken', response.data.token);
      await AsyncStorage.setItem('userInputFields', JSON.stringify({ username, password }));
      navigation.navigate('AddWorkoutScreen');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const responseData = axiosError.response?.data as ApiResponse;
  
        // if (axiosError.response?.status === 401) {
        //   throw new Error('Invalid username or password');
        // }
        if (responseData?.message) {
          return true
        }
        } else {
        console.error('Unexpected error:', error);
      }
    }
  };