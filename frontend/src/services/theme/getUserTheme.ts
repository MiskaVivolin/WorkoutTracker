import { Platform } from 'react-native';
import { API_BASE_URL } from '../../../config';

const getUserTheme = async (username: string): Promise<'light' | 'dark' | null> => {
  const apiUrl = Platform.OS === 'android' ? `${API_BASE_URL}/get-theme/${username}` : `http://127.0.0.1:3001/get-theme/${username}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Status ${response.status}`);
    
    const data = await response.json();
    return data.theme;
  } catch (err) {
    console.error('Error fetching user theme:', err);
    return null;
  }
};

export default getUserTheme;