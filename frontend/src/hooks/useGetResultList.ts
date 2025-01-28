import axios, { AxiosResponse } from 'axios'
import { SetWorkoutList, ResponseData, WorkoutItem } from '../types/Types'
import { useUserToken } from '../context/UserTokenContext'
import { useEffect } from 'react'

const useGetResultList = (setResultList: SetWorkoutList): void => {
  
  const { userToken } = useUserToken();

  useEffect(() => {
    console.log("usertoken: ", userToken)
    const fetchData = async () => {
      axios.get('http://127.0.0.1:3001/get')
        .then((response: AxiosResponse<ResponseData>) => {
          const { data } = response;
          const dataItems: WorkoutItem[] = data.map((item) => ({
            _id: item._id,
            user: item.user,
            name: item.name,
            date: item.date,
            exercise: item.exercise,
            result: item.result
          }))
          if(response.data.message) {
            alert(response.data.message)
          }
          const resultList: WorkoutItem[] = []
          dataItems.forEach(item => {
            if(item.user === userToken) {
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

export default useGetResultList;