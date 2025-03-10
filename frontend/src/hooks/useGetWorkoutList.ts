import axios, { AxiosResponse } from 'axios'
import { SetWorkoutList, ResponseData, WorkoutItem } from '../types/Types'
import { useUserToken } from '../context/UserTokenContext'
import { useEffect } from 'react'

const useGetWorkoutList = (setWorkoutList: SetWorkoutList): void => {
  
  const { userToken } = useUserToken();

  useEffect(() => {
    const fetchData = async () => {
      axios.get('http://127.0.0.1:3001/get', { params: { token: userToken } })
        .then((response: AxiosResponse<ResponseData>) => {
          const { data } = response;
          console.log("data: ", data)
          const dataItems: WorkoutItem[] = data.map((item) => ({
            id: item.id,
            name: item.name,
            date: item.date,
            exercise: item.exercise,
            result: item.result,
          }))
          if(data.message) {
            alert(data.message)
          }
          const responseList: WorkoutItem[] = []
          dataItems.forEach(item => {
            responseList.push(item)
          })
          setWorkoutList(responseList)
        })
        .catch((error) => {
          console.error("Error sending get request:", error)
        })
      }

    fetchData();
  }, [setWorkoutList, userToken])
}

export default useGetWorkoutList;