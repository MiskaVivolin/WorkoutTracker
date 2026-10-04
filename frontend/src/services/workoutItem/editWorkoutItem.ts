import { WorkoutItem } from '../../types/workoutItemTypes'
import { API_BASE_URL } from "../../../config";


const editWorkoutItem = async (workoutItem: WorkoutItem): Promise<void> => {

  const apiUrl = `${API_BASE_URL}/put`;
  
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workoutItem)
    })
    if (!response.ok) {
      throw new Error('Failed to edit workout item');
    }
}

export default editWorkoutItem;
