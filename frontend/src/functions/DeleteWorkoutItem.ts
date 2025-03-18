import axios, { AxiosResponse } from 'axios'
import { SetWorkoutList, ResponseData } from '../types/Types'
import { Platform } from 'react-native';


const deleteWorkoutItem = (itemId: number, setWorkoutList: SetWorkoutList): void => {

  const apiUrl = Platform.OS === 'android' ? `http://192.168.1.119:3001/delete/${itemId}` : `http://127.0.0.1:3001/delete/${itemId}`;

  axios.delete<ResponseData>(apiUrl)
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