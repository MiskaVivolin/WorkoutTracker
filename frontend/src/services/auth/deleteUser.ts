import { Platform } from 'react-native';
import { API_BASE_URL } from '../../../config';

const deleteUser = async (username: string): Promise<void> => {
  
  const apiUrl = Platform.OS === 'android' ? `${API_BASE_URL}/delete-user/${username}` : `http://127.0.0.1:3001/delete-user/${username}`;

  const response = await fetch(apiUrl, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
};

export default deleteUser;