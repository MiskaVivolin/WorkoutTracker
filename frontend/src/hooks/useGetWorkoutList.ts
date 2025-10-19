import { SetWorkoutList, ResponseData, WorkoutItem } from '../types/workoutItemTypes'
import { useUserToken } from '../context/UserTokenContext'
import { useEffect } from 'react'
import { Platform } from 'react-native';
import { API_BASE_URL } from "../../config";


const useGetWorkoutList = (setWorkoutList: SetWorkoutList, exercise: string): void => {
  
  const apiUrl = Platform.OS === 'android' ? `${API_BASE_URL}/get` : 'http://127.0.0.1:3001/get';
  const { userToken } = useUserToken();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}?token=${userToken}`);
        const data = await response.json();

        console.log("API Response:", data);
        if (!exercise){
          const responseList: WorkoutItem[] = data
          .map((item: WorkoutItem) => ({
            id: item.id,
            name: item.name,
            date: item.date,
            exercise: item.exercise,
            result: item.result,
          }));
        console.log("Filtered responseList:", responseList);
        setWorkoutList(responseList);
        } else {
        const responseList: WorkoutItem[] = data
          .filter((item: WorkoutItem) => item.exercise === exercise)
          .map((item: WorkoutItem) => ({
            id: item.id,
            name: item.name,
            date: item.date,
            exercise: item.exercise,
            result: item.result,
          }));
        console.log("Filtered responseList:", responseList);
        setWorkoutList(responseList);
        }

      } catch (err) {
        console.error("Error sending GET request:", err);
      }
    }

    fetchData();
  }, [setWorkoutList, userToken, exercise]);
}

export default useGetWorkoutList;
