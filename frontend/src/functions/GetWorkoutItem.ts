import axios, { AxiosResponse } from 'axios'
import { ResponseData, SetWorkoutItem } from '../types/Types'
import { Platform } from 'react-native';


const getWorkoutItem = (itemId: number, setWorkoutItem: SetWorkoutItem): void => {

  const apiUrl = Platform.OS === 'android' ? `http://192.168.1.119:3001/get/${itemId}` : `http://127.0.0.1:3001/get/${itemId}`;

  axios.get<ResponseData>(apiUrl)
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