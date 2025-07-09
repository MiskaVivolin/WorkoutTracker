import { WorkoutItemFields, ResponseData } from "../../types/workoutItemTypes";
import { Platform } from 'react-native';
import { API_BASE_URL } from "../../../config";


const createWorkoutItem = async (workoutItem: WorkoutItemFields, username: string): Promise<void> => {

  const apiUrl = Platform.OS === 'android' ? `${API_BASE_URL}/create` : 'http://127.0.0.1:3001/create';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ workoutItem, username })
    })
    if (!response.ok) throw new Error('Failed to submit workout item')

    return await response.json();
}

export default createWorkoutItem;