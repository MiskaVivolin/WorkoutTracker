import { WorkoutItemFields } from "../../types/workoutItemTypes";
import { API_BASE_URL } from "../../../config";


const createWorkoutItem = async (workoutItem: WorkoutItemFields, username: string): Promise<void> => {

  const apiUrl = `${API_BASE_URL}/create`;

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
