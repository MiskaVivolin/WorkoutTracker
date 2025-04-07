import axios from "axios";
import { WorkoutItemFields, ResponseData } from "../types/workoutItemTypes";
import { Platform } from 'react-native';


const createWorkoutItem = (workoutItem: WorkoutItemFields, username: string | null): void => {

  const apiUrl = Platform.OS === 'android' ? 'http://192.168.1.119:3001/create' : 'http://127.0.0.1:3001/create';

  axios.post<ResponseData>(apiUrl, { workoutItem, username })
  .catch((error) => {
    console.error('Error creating item:', error);
  });
}

export default createWorkoutItem;