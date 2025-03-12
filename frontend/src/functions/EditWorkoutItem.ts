import axios, { AxiosResponse } from 'axios'
import { WorkoutItem, ResponseData, SetBoolean } from '../types/Types'

const editWorkoutItem = (workoutItem: WorkoutItem, setIsEditMode: SetBoolean): void => {
  
  axios.put<ResponseData>('http://127.0.0.1:3001/put', workoutItem)
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