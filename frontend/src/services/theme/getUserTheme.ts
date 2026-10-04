import { API_BASE_URL } from '../../../config';

const getUserTheme = async (username: string): Promise<'light' | 'dark'> => {
  const apiUrl = `${API_BASE_URL}/get-theme/${username}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch user theme');
  }

  const data = await response.json();
  return data.theme;
};

export default getUserTheme;
