import axios, { AxiosResponse } from 'axios'
import { SetWorkoutList, ResponseData, WorkoutItem } from '../types/Types'
import { useUserToken } from '../context/UserTokenContext'
import { useEffect } from 'react'

const useGetWorkoutList = (setResultList: SetWorkoutList): void => {
  
  const { userToken } = useUserToken();

  useEffect(() => {
    const fetchData = async () => {
      axios.get('http://127.0.0.1:3001/get', { params: { token: userToken } })
        .then((response: AxiosResponse<ResponseData>) => {
          const { data } = response;
          const dataItems: WorkoutItem[] = data.map((item) => ({
            username: item.username,
            name: item.name,
            date: item.date,
            exercise: item.exercise,
            result: item.result
          }))
          if(data.message) {
            alert(data.message)
          }
          const resultList: WorkoutItem[] = []
          dataItems.forEach(item => {
            if(item.username === userToken) {
              resultList.push(item)
            }  
          })
          setResultList(resultList)
        })
        .catch((error) => {
          console.error("Error sending get request:", error)
        })
      }

    fetchData();
  }, [setResultList, userToken])
}

export default useGetWorkoutList;