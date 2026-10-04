import { API_BASE_URL } from '../../../config';

const deleteUser = async (username: string): Promise<void> => {
  
  const apiUrl = `${API_BASE_URL}/delete-user/${username}`;

  const response = await fetch(apiUrl, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
};

export default deleteUser;
