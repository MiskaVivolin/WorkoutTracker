import axios, { AxiosResponse } from 'axios'
import { SetWorkoutList, ResponseData } from '../types/Types'

const deleteWorkoutItem = (itemId: number, setWorkoutList: SetWorkoutList): void => {
  axios.delete<ResponseData>(`http://127.0.0.1:3001/delete/${itemId}`)
  .then((response: AxiosResponse<ResponseData>) => {
    if(!response.data.message) {
        setWorkoutList((prevList) => prevList.filter((prevItem) => prevItem.id !== itemId));
      }
  })
  .catch((error) => {
    console.error('Error sending delete request:', error);
  });
}

export default deleteWorkoutItem;