import axios, { AxiosResponse } from 'axios'
import { WorkoutItem, ResponseData, SetBoolean } from '../types/Types'
import { Platform } from 'react-native';


const editWorkoutItem = (workoutItem: WorkoutItem, setIsEditMode: SetBoolean): void => {

  const apiUrl = Platform.OS === 'android' ? 'http://192.168.1.119:3001/put' : 'http://127.0.0.1:3001/put';
  
  axios.put<ResponseData>(apiUrl, workoutItem)
  .then((response: AxiosResponse<ResponseData>) => {
    if(!response.data.message) {
      setIsEditMode(false)
    }
  })
  .catch((error) => {
    console.error('Error sending put request:', error);
  });
}

export default editWorkoutItem;