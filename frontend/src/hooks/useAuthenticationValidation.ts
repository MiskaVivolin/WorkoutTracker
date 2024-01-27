import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosError} from 'axios';
import { ApiResponse, RootStackParamList, ValidationFields } from '../types/Types';
import { StackNavigationProp } from '@react-navigation/stack';

const useAuthenticationValidation = async (navigation: StackNavigationProp<RootStackParamList>, mode: string, setValidationInit: (data: boolean) => void, setValidUsername: (data: boolean) => void, setValidPassword: (data: boolean) => void, validationFields: ValidationFields, setValidationErrors: React.Dispatch<React.SetStateAction<ValidationFields>>, setValidationFields: (data: ValidationFields) => void): Promise<void> => {

  if (mode === 'login') {
    console.log(validationFields)
    setValidationInit(true)
    try {
      const response = await axios.post('http://localhost:3001/login', { validationFields });
      await AsyncStorage.setItem('userToken', response.data.token);
      const usrToken = await response.data.token
      console.log('usertoken: ', usrToken)
      navigation.navigate('HomeScreen', { username: validationFields.username });
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
        
        if (responseData.message === 'Invalid username' || 'Invalid password') {
          setValidationErrors((prevErrors: ValidationFields) => ({
            ...prevErrors,
            username: 'Invalid username or password',
          }));
        }
      }
    }
  }

  if (mode === 'signup') {
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
        const response = await axios.post('http://localhost:3001/signup', { validationFields });
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

export default useAuthenticationValidation;