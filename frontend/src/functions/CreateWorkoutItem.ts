import axios, { AxiosResponse } from "axios";
import { SetWorkoutList, WorkoutItemFields, ResponseData, WorkoutItem } from "../types/Types";

const CreateWorkoutItem = (workoutItem: WorkoutItemFields, setWorkoutList: SetWorkoutList, username: string | null): void => {

  axios.post<ResponseData>('http://127.0.0.1:3001/create', { workoutItem, username })
  .then((response: AxiosResponse<ResponseData>) => {
    const { data } = response;
    if (data.message){
      alert(data.message)
  } else {
    const newObj = {
      _id: data._id,
      username: data.username,
      name: data.name,
      date: data.date,
      exercise: data.exercise,
      result: data.result
    }
    setWorkoutList((prevList: WorkoutItem[]) => [...prevList, newObj]);
  }
  })
  .catch((error) => {
    console.error('Error creating item:', error);
  });
}

export default CreateWorkoutItem;