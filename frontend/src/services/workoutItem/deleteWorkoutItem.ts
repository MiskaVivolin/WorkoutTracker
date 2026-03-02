import { Platform } from 'react-native';
import { API_BASE_URL } from "../../../config";


const deleteWorkoutItem = async (itemId: number): Promise<void> => {

  const apiUrl = Platform.OS === 'android' ? `${API_BASE_URL}/delete/${itemId}` : `http://127.0.0.1:3001/delete/${itemId}`;

 
    const response = await fetch(apiUrl, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
    throw new Error('Failed to delete workout');
  }
  
}

export default deleteWorkoutItem;