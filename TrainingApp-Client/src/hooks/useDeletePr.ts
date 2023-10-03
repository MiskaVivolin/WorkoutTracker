import axios, { AxiosResponse } from 'axios'
import { SetResultList, DataItem, ResponseData } from 'types/Types'
import useGetList from './useGetList'

const useDeletePr = (item: DataItem, setResultList: SetResultList) => {

  axios.delete<ResponseData>('http://127.0.0.1:3001/delete', {params: { id: item.id }})
  .then((response: AxiosResponse<ResponseData>) => {
    console.log("item id: ", item.id)
    if(response.data.message.toLowerCase().includes('error')) {
        alert(response.data.message)
      } else {
        console.log(response.data.message)
        useGetList(setResultList)
    }
  })
}

export default useDeletePr;