import axios, { AxiosResponse } from "axios";
import { SetWorkoutList, WorkoutItemFields, ResponseData, WorkoutItem } from "../types/Types";
import { Platform } from 'react-native';


const createWorkoutItem = (workoutItem: WorkoutItemFields, setWorkoutList: SetWorkoutList, username: string | null): void => {

  const apiUrl = Platform.OS === 'android' ? 'http://192.168.1.119:3001/create' : 'http://127.0.0.1:3001/create';

  axios.post<ResponseData>(apiUrl, { workoutItem, username })
  .then((response: AxiosResponse<ResponseData>) => {
    const { data } = response;
    const newObj = {
      id: data.id,
      name: data.name,
      date: data.date,
      exercise: data.exercise,
      result: data.result,
    }
    setWorkoutList((prevList: WorkoutItem[]) => [...prevList, newObj]);
  })
  .catch((error) => {
    console.error('Error creating item:', error);
  });
}

export default createWorkoutItem;