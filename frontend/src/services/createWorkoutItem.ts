import { WorkoutItemFields, ResponseData } from "../types/workoutItemTypes";
import { Platform } from 'react-native';


const createWorkoutItem = async (workoutItem: WorkoutItemFields, username: string | null): Promise<void> => {

  const apiUrl = Platform.OS === 'android' ? 'http://192.168.1.119:3001/create' : 'http://127.0.0.1:3001/create';

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