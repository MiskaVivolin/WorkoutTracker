import axios, { AxiosResponse } from 'axios'
import { WorkoutItem, ResponseData } from '../types/workoutItemTypes'
import { SetBoolean } from '../types/utilTypes'
import { Platform } from 'react-native';


const editWorkoutItem = (workoutItem: WorkoutItem): void => {

  const apiUrl = Platform.OS === 'android' ? 'http://192.168.1.119:3001/put' : 'http://127.0.0.1:3001/put';
  
  axios.put<ResponseData>(apiUrl, workoutItem)
  .then((response: AxiosResponse<ResponseData>) => {
    if(!response.data.message) {
      console.log(response.data)    }
  })
  .catch((error) => {
    console.error('Error sending put request:', error);
  });
}

export default editWorkoutItem;