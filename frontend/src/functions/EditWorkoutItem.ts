import axios, { AxiosResponse } from 'axios'
import { WorkoutItem, ResponseData, SetBoolean } from '../types/Types'

const editWorkoutItem = (workoutItem: WorkoutItem, setIsEditMode: SetBoolean): void => {
  
  axios.put<ResponseData>(`http://127.0.0.1:3001/put/${workoutItem.id}`, workoutItem)
  .then((response: AxiosResponse<ResponseData>) => {
    if(response.data.message.toLowerCase().includes('error')) {
      alert(response.data.message)
    } else {
      setIsEditMode(false)
      console.log(response.data.message)
    }
  })
  .catch((error) => {
    console.error('Error sending put request:', error);
  });
}

export default editWorkoutItem;