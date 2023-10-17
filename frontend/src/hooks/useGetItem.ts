import axios, { AxiosResponse } from 'axios'
import { ResponseData, SetEditItem } from 'types/Types'
import useGetList from './useGetList'

const useGetItem = (id: number, setEditItem: SetEditItem): void => {

  axios.get<ResponseData>(`http://127.0.0.1:3001/get/${id}`)
  .then((response: AxiosResponse<ResponseData>) => {
    if(response.data.message) {
      if(response.data.message.toLowerCase().includes('error')) {
          alert(response.data.message)
        } else {
          console.log(response.data.message)
        }
      } else {
        console.log("My data: ", response.data)
        setEditItem(response.data)
      }
  })
}

export default useGetItem;