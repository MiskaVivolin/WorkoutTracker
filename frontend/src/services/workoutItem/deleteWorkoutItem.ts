import { API_BASE_URL } from "../../../config";


const deleteWorkoutItem = async (itemId: number): Promise<void> => {

  const apiUrl = `${API_BASE_URL}/delete/${itemId}`;

 
    const response = await fetch(apiUrl, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
    throw new Error('Failed to delete workout');
  }
  
}

export default deleteWorkoutItem;
