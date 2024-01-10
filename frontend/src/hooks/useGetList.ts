import axios, { AxiosResponse } from 'axios'
import { SetResultList, ResponseData, DataItem } from '../types/Types'
import { useUserToken } from '../context/UserTokenContext'
import { useEffect } from 'react'

const useGetList = (setResultList: SetResultList): void => {
  
  const {userToken} = useUserToken()

  useEffect(() => {
    const fetchData = async () => {
      axios.get('http://127.0.0.1:3001/get')
        .then((response: AxiosResponse<ResponseData>) => {
          const { data } = response;
          const dataItems: DataItem[] = data.map((item) => ({
            _id: item._id,
            user: item.user,
            name: item.name,
            date: item.date,
            lift: item.lift,
            result: item.result
          }))
          if(response.data.message) {
            console.log(response.data.message)
          }
          const resultList: DataItem[] = []
          dataItems.forEach(item => {
            console.log('item: ', item)
            console.log('username: ', userToken)
            if(item.user === userToken) {
              resultList.push(item)
            }  
          })
          console.log('List: ', resultList)
          setResultList(resultList)
        })
        .catch(() => {
          console.error("Error sending get request")
        })
      }

    fetchData();
  }, [setResultList, userToken])
}

export default useGetList;