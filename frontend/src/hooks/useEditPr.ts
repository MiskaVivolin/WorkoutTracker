import axios, { AxiosResponse } from 'axios'
import { DataItem, ResponseData, SetEditItem } from 'types/Types'
import useGetList from './useGetList'

const useEditPr = (prObject: DataItem, setEditItem: SetEditItem): void => {

  axios.put<ResponseData>(`http://127.0.0.1:3001/put/${prObject._id}`, prObject)
  .then((response: AxiosResponse<ResponseData>) => {
    if(response.data.message) {
      if(response.data.message.toLowerCase().includes('error')) {
          alert(response.data.message)
        } else {
          console.log(response.data.message)
        }
      } else {
        console.log("My data: ", response.data)
        // setEditItem(response.data)
      }
  })
}

export default useEditPr;