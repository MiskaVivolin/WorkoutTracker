import { ResponseData, SetWorkoutItem } from '../../types/workoutItemTypes'
import { Platform } from 'react-native';
import { API_BASE_URL } from "../../../config";






const getWorkoutItem = async (itemId: number): Promise<ResponseData> => {

  const apiUrl = Platform.OS === 'android' ? `${API_BASE_URL}/get/${itemId}` : `http://127.0.0.1:3001/get/${itemId}`;

  const response = await fetch(apiUrl, {
    method: 'GET'
  })
  if (!response.ok) throw new Error('Failed to fetch workout item');
  return await response.json();
}

export default getWorkoutItem;