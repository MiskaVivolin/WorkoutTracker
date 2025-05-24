import { Platform } from 'react-native';
import { API_BASE_URL } from '../../../config';

const setUserTheme = async (username: string, theme: 'light' | 'dark'): Promise<void> => {
  const apiUrl = Platform.OS === 'android' ? `${API_BASE_URL}/set-theme` : 'http://127.0.0.1:3001/set-theme';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, theme }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
  } catch (err) {
    console.error('Error setting theme:', err);
  }
};

export default setUserTheme;
