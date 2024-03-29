import axios, { AxiosResponse } from "axios";
import { SetResultList, PrFields, ResponseData, DataItem } from "../types/Types";

const useCreatePr = (prObject: PrFields, setResultList: SetResultList, username: string | null): void => {

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
      setResultList((prevList: DataItem[]) => [...prevList, newObj]);
    }
  })
  .catch((error) => {
    console.error('Error creating item:', error);
  });
}

export default useCreatePr;