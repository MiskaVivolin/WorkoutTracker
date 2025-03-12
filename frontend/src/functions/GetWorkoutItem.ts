import axios, { AxiosResponse } from 'axios'
import { ResponseData, SetWorkoutItem } from '../types/Types'

const getWorkoutItem = (itemId: number, setWorkoutItem: SetWorkoutItem): void => {

  axios.get<ResponseData>(`http://127.0.0.1:3001/get/${itemId}`)
  .then((response: AxiosResponse<ResponseData>) => {
    if(response.data.message) {
      alert(response.data.message)
    } else {
      setWorkoutItem(response.data)
    }
  })
  .catch((error) => {
    console.error('Error sending get request:', error);
  });
}

export default getWorkoutItem;