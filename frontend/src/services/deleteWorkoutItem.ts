import { SetWorkoutList, ResponseData } from '../types/workoutItemTypes'
import { Platform } from 'react-native';


const deleteWorkoutItem = async (itemId: number, setWorkoutList: SetWorkoutList): Promise<void> => {

  const apiUrl = Platform.OS === 'android' ? `http://192.168.1.119:3001/delete/${itemId}` : `http://127.0.0.1:3001/delete/${itemId}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
    })
    const data: ResponseData = await response.json()
    if(!data.message) {
        setWorkoutList((prevList) => prevList.filter((prevItem) => prevItem.id !== itemId));
    }
  } catch (err) {
    console.error("Error sending DELETE request:", err)
  }
}

export default deleteWorkoutItem;