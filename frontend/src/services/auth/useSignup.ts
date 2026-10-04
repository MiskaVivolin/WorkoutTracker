import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "types/utilTypes";
import { API_BASE_URL } from "../../../config";
import { useMutation } from '@tanstack/react-query';



export const useSignup = (navigation: StackNavigationProp<RootStackParamList>) => {
  return useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const apiUrl = `${API_BASE_URL}/signup`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 409) {
        throw new Error('This username is already taken');
      }

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      navigation.navigate('LoginScreen');
    },
  });
};