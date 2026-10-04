import { ResponseData, WorkoutItem } from '../../types/workoutItemTypes'
import { API_BASE_URL } from "../../../config";

const getWorkoutItem = async (itemId: number): Promise<WorkoutItem> => {

  const apiUrl = `${API_BASE_URL}/get/${itemId}`;

  const response = await fetch(apiUrl, {
    method: 'GET'
  })
  
  if (!response.ok) throw new Error('Failed to fetch workout item');
  return await response.json();
}

export default getWorkoutItem;
