import { ResponseData, SetWorkoutItem } from '../types/workoutItemTypes'
import { Platform } from 'react-native';
import { API_BASE_URL } from "../../config";


const getWorkoutItem = async (itemId: number, setWorkoutItem: SetWorkoutItem): Promise<void> => {

  const apiUrl = Platform.OS === 'android' ? `${API_BASE_URL}/get/${itemId}` : `http://127.0.0.1:3001/get/${itemId}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET'
    })
    const data: ResponseData = await response.json()
    setWorkoutItem(data)
  } catch (err) {
    console.error("Error sending GET by ID request:", err)
  }
}

export default getWorkoutItem;