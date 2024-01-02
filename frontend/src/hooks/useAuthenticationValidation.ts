import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const useAuthenticationValidation = async (navigation: any, mode: string, setValidationInit: any, setValidUsername: any, setValidPassword: any, validationFields: any, setValidationErrors: any, setValidationFields: any): Promise<void> => {


  if (mode === 'login') {
    console.log(validationFields)
    setValidationInit(true)
    try {
      const response = await axios.post('http://localhost:3001/login', { validationFields });
      await AsyncStorage.setItem('userToken', response.data.token);
      navigation.navigate('Home');
      setValidationFields({
        username: '',
        password: ''
      })
      setValidationErrors({
        username: '',
        password: ''
      })
    } catch (error) {
      console.error('Login failed', error);
      console.log('error response: ', error.response)
      if(error.response.data.message === 'Invalid username' || 'Invalid password') {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          username: 'Invalid username or password',
        }));
      }
    }
  }

  if (mode === 'signup') {
    if (validationFields.username.length < 4) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        username: 'Username must be 4 characters minimum',
      }));
      setValidUsername(false)
    } else {
      setValidUsername(true)
    }
    if (validationFields.password.length < 10) {
      setValidationErrors((prevErrors) => ({
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
        navigation.navigate('Login');
      } catch (error) {
        console.error('Signup failed', error);
      }
    }
  }
};

export default useAuthenticationValidation;