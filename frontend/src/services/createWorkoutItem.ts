import { WorkoutItemFields, ResponseData } from "../types/workoutItemTypes";
import { Platform } from 'react-native';
import { API_BASE_URL } from "../../config";


const createWorkoutItem = async (workoutItem: WorkoutItemFields, username: string): Promise<void> => {

  const apiUrl = Platform.OS === 'android' ? `${API_BASE_URL}/create` : 'http://127.0.0.1:3001/create';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ workoutItem, username })
    })
    const data: ResponseData = await response.json()
    console.log("Data Submitted:", data)
  } catch (err) {
    console.error("Error sending POST request:", err)
  }
}

export default createWorkoutItem;