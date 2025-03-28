import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import { ApiResponse, ValidationFields } from '../types/utilTypes';
import { AuthenticationValidationProps } from '../types/Types';
import { Platform } from 'react-native';


const authenticationValidation = async ({ navigation, mode, setValidationInit, validationFields, setValidationErrors, setValidationFields, setValidUsername, setValidPassword, isFirstRender }: AuthenticationValidationProps): Promise<void> => {

  const apiUrl = Platform.OS === 'android' ? 'http://192.168.1.119:3001/login' : 'http://127.0.0.1:3001/login';


  if (mode === 'login') {
    setValidationInit(true)
    try {
      const response = await axios.post(apiUrl, { validationFields });
      await AsyncStorage.setItem('userToken', response.data.token);
      await AsyncStorage.setItem('userInputFields', JSON.stringify(validationFields))
      navigation.navigate('AddWorkoutScreen');
      setValidationFields({
        username: '',
        password: ''
      })
      setValidationErrors({
        username: '',
        password: ''
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const responseData = axiosError.response?.data as ApiResponse;
        if (axiosError.response?.status !== 401) {
          console.error(error)
        }
        if(!isFirstRender) {
          if (responseData.message === 'Invalid username' || 'Invalid password') {
            console.error("error logging in")
            setValidationErrors((prevErrors: ValidationFields) => ({
              ...prevErrors,
              username: 'Invalid username or password',
            }));
          }
        }
      }
    }
  }

  if (mode === 'signup' && setValidUsername && setValidPassword) {
    if (validationFields.username.length < 4) {
      setValidationErrors((prevErrors: ValidationFields) => ({
        ...prevErrors,
        username: 'Username must be 4 characters minimum',
      }));
      setValidUsername(false)
    } else {
      setValidUsername(true)
    }
    if (validationFields.password.length < 10) {
      setValidationErrors((prevErrors: ValidationFields) => ({
        ...prevErrors,
        password: 'Password must be 10 characters minimum',
      }));
      setValidPassword(false)
    } else {
      setValidPassword(true)
    }
    setValidationInit(true)
    if (validationFields.username.length > 3 && validationFields.password.length > 9) {
      try {  
        const response = await axios.post(apiUrl, { validationFields });
        if (response.data.isTaken) {
          setValidUsername(false);
          setValidationErrors(() => ({
            username: 'This username is already taken',
            password: ''
          }));
        return;
        } 
        navigation.navigate('LoginScreen');
      } catch (error) {
        console.error('Signup failed', error);
      }
    }
  }
};

export default authenticationValidation;