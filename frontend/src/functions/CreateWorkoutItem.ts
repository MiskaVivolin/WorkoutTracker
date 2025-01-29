import axios, { AxiosResponse } from "axios";
import { SetWorkoutList, WorkoutItemFields, ResponseData, WorkoutItem } from "../types/Types";

const CreateWorkoutItem = (prObject: WorkoutItemFields, setWorkoutList: SetWorkoutList, username: string | null): void => {

  axios.post<ResponseData>('http://127.0.0.1:3001/create', { prObject, username })
  .then((response: AxiosResponse<ResponseData>) => {
    if (response.data.message){
      alert(response.data.message)
    } else {
      const newObj = {
        _id: response.data._id,
        user: response.data.user,
        name: response.data.name,
        date: response.data.date,
        exercise: response.data.exercise,
        result: response.data.result
      }
      setWorkoutList((prevList: WorkoutItem[]) => [...prevList, newObj]);
    }
  })
  .catch((error) => {
    console.error('Error creating item:', error);
  });
}

export default CreateWorkoutItem;