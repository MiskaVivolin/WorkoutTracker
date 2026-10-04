import { API_BASE_URL } from '../../../config';

const setUserTheme = async (username: string, theme: 'light' | 'dark'): Promise<void> => {
  const apiUrl = `${API_BASE_URL}/set-theme`;

  
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
  }


export default setUserTheme;
