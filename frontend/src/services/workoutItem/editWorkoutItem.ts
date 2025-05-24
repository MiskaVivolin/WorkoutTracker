import { WorkoutItem } from '../../types/workoutItemTypes'
import { Platform } from 'react-native';
import { API_BASE_URL } from "../../../config";


const editWorkoutItem = async (workoutItem: WorkoutItem): Promise<void> => {

  const apiUrl = Platform.OS === 'android' ? `${API_BASE_URL}/put` : 'http://127.0.0.1:3001/put';
  
  try {
    await fetch(apiUrl, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workoutItem)
    })
  } catch (err) {
    console.error("Error sending PUT request ")
  }
}

export default editWorkoutItem;