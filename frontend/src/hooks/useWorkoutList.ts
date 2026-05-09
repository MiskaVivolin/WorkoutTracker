import { Platform } from 'react-native';
import { API_BASE_URL } from "../../config";
import { useQuery } from '@tanstack/react-query';
import { WorkoutItem } from '../types/workoutItemTypes';

const useWorkoutList = (userToken: string, exercise: string) => {
  const apiUrl = Platform.OS === 'android'
    ? `${API_BASE_URL}/get`
    : 'http://127.0.0.1:3001/get';

  return useQuery({
    queryKey: ['workouts', userToken, exercise],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}?token=${userToken}`);
      const data = await res.json();

      return data
        .filter((item: WorkoutItem) => exercise ? item.exercise === exercise : true)
        .map((item: WorkoutItem) => ({
          id: item.id,
          exercise: item.exercise,
          date: item.date,
          weight: item.weight,
          reps: item.reps
        }));
    },
    enabled: !!userToken
  });
};

export default useWorkoutList;
